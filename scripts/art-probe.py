#!/usr/bin/env python3
"""OWNER 2026-10-31 — probe the Art Room flashcard deck LIVE on R2 before the
/art/ page picks it up (the Class 43 rule: probe first, then build).

Bucket: kiddo-school-assets, prefix school/art-room/flashcards/ — 14 files the
owner pasted from the Cloudflare panel (no cover file in this deck; the Art
Studio page already leads with its own activity covers).

Every file must answer HTTP 200 with image/webp; the real pixel dimensions
come off the RIO chunk so the page can carry honest width/height (no CLS).
Paced GETs, one try, results printed as a table + a JSON line for the builder.
"""
import json, time, struct, urllib.request

BASE='https://assets.kiddo.school/school/art-room/flashcards/'
FILES=[
 'beads-craft-wire-pipe-cleaner-flashcard-for-kids.webp',
 'canvas-brush-cleaner-masking-tape-flashcard-for-kids.webp',
 'cardboard-tissue-paper-foam-sheet-flashcard-for-kids.webp',
 'clay-rolling-pin-modeling-tool-flashcard-for-kids.webp',
 'colored-paper-cardboard-tube-tissue-paper-flashcard-for-kids.webp',
 'crayons-colored-pencils-marker-flashcard-for-kids.webp',
 'glue-stick-tape-paper-flashcard-for-kids.webp',
 'glue-stick-washi-tape-craft-punch-flashcard-for-kids.webp',
 'ink-bottle-dip-pen-charcoal-flashcard-for-kids.webp',
 'light-box-tracing-paper-clipboard-flashcard-for-kids.webp',
 'paintbrush-paint-palette-paint-tube-flashcard-for-kids.webp',
 'scissors-glue-ruler-flashcard-for-kids.webp',
 'stamp-ink-pad-brayer-flashcard-for-kids.webp',
 'water-cup-sponge-mixing-tray-flashcard-for-kids.webp',
]

def webp_dims(b):
    # RIFF....WEBP + chunk: VP8 / VP8L / VP8X
    if b[0:4]!=b'RIFF' or b[8:12]!=b'WEBP': return None
    fourcc=b[12:16]
    if fourcc==b'VP8 ':
        w,h=struct.unpack('<H',b[26:28])[0],struct.unpack('<H',b[28:30])[0]
        return (w&0x3fff,h&0x3fff)
    if fourcc==b'VP8L':
        bits=struct.unpack('<I',b[21:25])[0]
        return ((bits>>0)&0x3fff)+1,((bits>>14)&0x3fff)+1
    if fourcc==b'VP8X':
        w=int.from_bytes(b[24:27],'little')+1
        h=int.from_bytes(b[27:30],'little')+1
        return (w,h)
    return None

rows=[]
for i,f in enumerate(FILES):
    url=BASE+f
    req=urllib.request.Request(url,headers={'User-Agent':'kiddo-probe/1.0'})
    try:
        with urllib.request.urlopen(req,timeout=30) as r:
            body=r.read(64)
            ct=r.headers.get('Content-Type')
            cl=r.headers.get('Content-Length')
            dims=webp_dims(body) if ct and 'webp' in ct else None
            rows.append({'file':f,'status':r.status,'type':ct,'bytes':cl,'dims':dims})
            print(f"{r.status} {ct} {cl:>6}B {dims} {f}")
    except Exception as e:
        rows.append({'file':f,'error':str(e)})
        print('FAIL',f,e)
    if i<len(FILES)-1: time.sleep(0.7)

ok=[r for r in rows if r.get('status')==200]
print(f"\n{len(ok)}/{len(FILES)} live")
dims={(r['dims'][0],r['dims'][1]) for r in ok if r.get('dims')}
print('distinct dims:',dims)
with open('scripts/art-probe.json','w') as fh: json.dump(rows,fh,indent=1)
