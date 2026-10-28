#!/usr/bin/env python3
"""Download the Question Words deck to scripts/qw-tmp/ and build two labeled
contact sheets (3x3 each) for authoring honest alts + tips from the artwork."""
import os, urllib.request, concurrent.futures
from PIL import Image, ImageDraw

BASE='https://assets.kiddo.school/school/extra-classes/question-words/'
FILES=['cover','how','how-many','how-much','how-old','what','what-happened',
 'what-next','what-time','when','where','where-are-you','which','who',
 'who-are-you','whose-turn','why']
OUT='scripts/qw-tmp'
os.makedirs(OUT,exist_ok=True)

def dl(name):
    dst=f'{OUT}/{name}.webp'
    if not os.path.exists(dst):
        req=urllib.request.Request(BASE+name+'.webp',headers={'User-Agent':'Mozilla/5.0'})
        with urllib.request.urlopen(req,timeout=60) as r, open(dst,'wb') as f:
            f.write(r.read())
    return name, dst

with concurrent.futures.ThreadPoolExecutor(8) as ex:
    got=list(ex.map(dl,FILES))
print('downloaded', len(got))

CELL=340
for sheet_i,chunk in enumerate([FILES[:9],FILES[9:]]):
    cols,rows=3,(len(chunk)+2)//3
    canvas=Image.new('RGB',(cols*CELL,rows*(CELL+26)),'#ffffff')
    d=ImageDraw.Draw(canvas)
    for i,name in enumerate(chunk):
        im=Image.open(f'{OUT}/{name}.webp').convert('RGB')
        im.thumbnail((CELL-8,CELL-8))
        x=(i%cols)*CELL; y=(i//cols)*(CELL+26)
        canvas.paste(im,(x+4,y+24))
        d.text((x+6,y+5),f'[{i+1}] {name}',fill='#000000')
        d.rectangle([x,y+24,x+CELL-1,y+24+CELL-1],outline='#cccccc')
    p=f'{OUT}/sheet-{sheet_i+1}.png'
    canvas.save(p)
    print('sheet', p, canvas.size)
