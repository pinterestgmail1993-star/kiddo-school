#!/usr/bin/env python3
"""Contact sheets for the 31 caring-for-our-planet masters — 6 sheets,
3x2 grid, each cell labeled with its file (minus the common suffix) and
its orientation. Titles/alts get transcribed off these faces."""
import os
from PIL import Image, ImageDraw, ImageFont

D = '/tmp/cfp'
OUT = '/tmp/cfp-sheets'
os.makedirs(OUT, exist_ok=True)
SUF = '-eco-flashcard-for-kids.jpg'

files = sorted(f for f in os.listdir(D) if f.endswith('.jpg'))
order = [f for f in files if 'cover' not in f] + [f for f in files if 'cover' in f]
# keep the owner's uploaded order (panel) instead: alphabetical is fine for labeling
per = 6
COLS, ROWS = 3, 2
CW, CH = 640, 760  # cell: image fits 600 wide, label band 34px
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 20)
except Exception:
    font = ImageFont.load_default()

sheets = []
for i in range(0, len(order), per):
    batch = order[i:i+per]
    img = Image.new('RGB', (COLS*CW, ROWS*CH), 'white')
    dr = ImageDraw.Draw(img)
    for j, f in enumerate(batch):
        p = os.path.join(D, f)
        im = Image.open(p).convert('RGB')
        im.thumbnail((CW-40, CH-70))
        cx, cy = (j % COLS)*CW, (j//COLS)*CH
        label = f.replace(SUF, '').replace('-flashcards-for-kids', '')
        dr.text((cx+10, cy+6), f"{i+j+1}. {label}  [{im.size[0]}x{im.size[1]}]", fill='black', font=font)
        img.paste(im, (cx+20, cy+44))
        dr.rectangle([cx, cy, cx+CW-1, cy+CH-1], outline='#cccccc')
    out = f'{OUT}/cfp-sheet-{len(sheets)+1}.jpg'
    img.save(out, quality=82)
    sheets.append(out)
    print(out, img.size, '->', [f.replace(SUF, '')[:44] for f in batch])
print('TOTAL', len(order), 'files on', len(sheets), 'sheets')
