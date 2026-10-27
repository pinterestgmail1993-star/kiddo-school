#!/usr/bin/env python3
"""Probe the Manners deck on R2: download all files, report dims, build labeled
contact sheets so alt text and practice tips are authored from the real art."""
import json, os, struct, urllib.request

BASE='https://assets.kiddo.school/school/extra-classes/manners/flashcards/'
OUT='/home/z/my-project/kiddo-school/scripts/manners-tmp'
os.makedirs(OUT, exist_ok=True)

FILES=['ask-first','be-honest','be-kind','be-patient','cheer-for-others',
 'chew-quietly','clean-up','cover-your-sneeze','cover','do-not-interrupt',
 'gentle-hands','give-a-seat','help-others','hold-the-door',
 'keep-hands-to-yourself','knock-first','let-others-go-first','offer-to-share',
 'pay-attention','push-in-your-chair','put-things-back','quiet-voice',
 'raise-your-hand','respect-personal-space','return-what-you-borrow',
 'sit-nicely','stand-in-line','take-turns','use-the-bin','use-two-hands',
 'wait-your-turn','walk-quietly','wipe-the-table']

def webp_dims(b):
    # RIFF....WEBPVP8 /VP8L/VP8X — minimal parser for the three webp flavors
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

dims={}
for name in FILES:
    p=os.path.join(OUT,name+'.webp')
    if not os.path.exists(p):
        req=urllib.request.Request(BASE+name+'.webp',headers={'User-Agent':'probe'})
        b=urllib.request.urlopen(req,timeout=30).read()
        open(p,'wb').write(b)
    else:
        b=open(p,'rb').read()
    w,h=webp_dims(b)
    dims[name]={'w':w,'h':h,'kb':round(len(b)/1024)}
    print(f'{name:26s} {w}x{h}  {len(b)//1024} kB')

json.dump(dims,open(os.path.join(OUT,'dims.json'),'w'),indent=1)

# ---- contact sheets: 4 sheets, 2x4 grid, slug label under each card ----
try:
    from PIL import Image, ImageDraw
except ImportError:
    print('PIL missing — skipping sheets'); raise SystemExit
names=[n for n in FILES if n!='cover']
per=8
for si in range(0,len(names),per):
    chunk=names[si:si+per]
    cols,rows=2,4
    TW=460; GAP=34; PAD=22
    # uniform thumb height from first card ratio (assume mixed) — use 460x? keep aspect
    cells=[]
    for n in chunk:
        im=Image.open(os.path.join(OUT,n+'.webp')).convert('RGB')
        r=TW/im.width
        cells.append((n,im.resize((TW,int(im.height*r)))))
    th=max(c[1].height for c in cells)
    W=PAD+cols*TW+(cols-1)*GAP+PAD
    H=PAD+rows*(th+GAP+18)+PAD
    sheet=Image.new('RGB',(W,H),'#FFF8EC')
    d=ImageDraw.Draw(sheet)
    for i,(n,im) in enumerate(cells):
        x=PAD+(i%cols)*(TW+GAP); y=PAD+(i//cols)*(th+GAP+18)
        sheet.paste(im,(x,y))
        d.text((x+4,y+th+3),f'{n}  {im.width}x{im.height}',fill='#222')
    sp=os.path.join(OUT,f'sheet-{si//per+1}.png')
    sheet.save(sp)
    print('sheet:',sp)
