#!/usr/bin/env python3
"""Probe the two new extra-class decks on R2 (owner 2026-10-29):
   - sequence-stories: 24 cards + cover at school/extra-classes/sequence-stories/flashcards/
   - question-words:   16 cards + cover at school/extra-classes/question-words/flashcards/
   Download all files, report dims, build labeled contact sheets so alt text
   and practice tips are authored from the real art (house standard)."""
import json, os, struct, urllib.request

DECKS = {
 'sequence-stories': ['bedtime','blow-bubbles','build-a-snowman','build-a-tower',
   'find-teddy','fly-a-kite','go-to-the-park','jump-in-the-puddle',
   'make-a-paper-boat','make-a-paper-crown','make-a-sandwich','make-lemonade',
   'make-toast','pick-up-the-banana-peel','plant-a-seed','put-on-socks-and-shoes',
   'put-on-your-coat','read-a-book','set-the-table','sock-puppet','tidy-the-toys',
   'wash-and-eat-an-apple','wash-your-hands','water-the-plant'],
 'question-words': ['how-many','how-much','how-old','how','what-happened','what-next',
   'what-time','what','when','where-are-you','where','which','who-are-you','who',
   'whose-turn','why'],
}
OUTROOT='/home/z/my-project/kiddo-school/scripts/two-decks-tmp'

BASES = {
 # probed live 2026-10-29: sequence-stories keeps the flashcards/ subfolder,
 # question-words sits directly under its class folder (no flashcards/ step)
 'sequence-stories': 'https://assets.kiddo.school/school/extra-classes/sequence-stories/flashcards/',
 'question-words': 'https://assets.kiddo.school/school/extra-classes/question-words/',
}

def webp_dims(b):
    if b[12:16]==b'VP8 ':
        w,h=struct.unpack('<HH',b[26:30]); return w&0x3fff,h&0x3fff
    if b[12:16]==b'VP8L':
        bits=struct.unpack('<I',b[21:25])[0]
        return (bits&0x3FFF)+1,((bits>>14)&0x3FFF)+1
    if b[12:16]==b'VP8X':
        w=int.from_bytes(b[24:27],'little')+1
        h=int.from_bytes(b[27:30],'little')+1
        return w,h
    return None,None

for deck,names in DECKS.items():
    base=BASES[deck]
    out=os.path.join(OUTROOT,deck); os.makedirs(out,exist_ok=True)
    files=['cover']+sorted(names)
    dims={}
    for name in files:
        p=os.path.join(out,name+'.webp')
        if not os.path.exists(p):
            req=urllib.request.Request(base+name+'.webp',headers={'User-Agent':'probe'})
            with urllib.request.urlopen(req,timeout=30) as r:
                ctype=r.headers.get('Content-Type'); code=r.status
                b=r.read()
            assert code==200, f'{deck}/{name}: HTTP {code}'
            assert 'image/webp' in (ctype or ''), f'{deck}/{name}: {ctype}'
            open(p,'wb').write(b)
        else:
            b=open(p,'rb').read()
        w,h=webp_dims(b)
        dims[name]={'w':w,'h':h,'kb':round(len(b)/1024)}
        print(f'{deck}/{name:26s} {w}x{h}  {len(b)//1024} kB')
    json.dump(dims,open(os.path.join(out,'dims.json'),'w'),indent=1)

    # ---- contact sheet: grid of labeled cards ----
    try:
        from PIL import Image, ImageDraw
    except ImportError:
        print('PIL missing — skipping sheets for',deck); continue
    per=8; TW=430; GAP=30; PAD=20; cols=2; rows=4
    for si in range(0,len(names),per):
        chunk=names[si:si+per]
        cells=[]
        for n in chunk:
            im=Image.open(os.path.join(out,n+'.webp')).convert('RGB')
            r=TW/im.width
            cells.append((n,im.resize((TW,int(im.height*r)))))
        th=max(c[1].height for c in cells)
        W=PAD+cols*TW+(cols-1)*GAP+PAD
        H=PAD+rows*(th+GAP+20)+PAD
        sheet=Image.new('RGB',(W,H),'#FFF8EC')
        d=ImageDraw.Draw(sheet)
        for i,(n,im) in enumerate(cells):
            x=PAD+(i%cols)*(TW+GAP); y=PAD+(i//cols)*(th+GAP+20)
            sheet.paste(im,(x,y))
            d.text((x+4,y+th+4),n,fill='#222')
        sp=os.path.join(out,f'sheet-{si//per+1}.png')
        sheet.save(sp)
        print('sheet:',sp)
print('PROBE OK')
