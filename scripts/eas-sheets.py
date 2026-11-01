#!/usr/bin/env python3
"""Build 2 labeled contact sheets of the 32 early-addition-and-subtraction
master JPGs (every card face read for honest alt text + display words)."""
import os
from PIL import Image, ImageDraw

D = '/tmp/eas'
files = sorted(f for f in os.listdir(D) if f.endswith('.jpg'))
CW, CH = 300, 424
LAB = 26
COLS = 6
sheets = [files[i:i+16] for i in range(0, len(files), 16)]
for si, group in enumerate(sheets):
    rows = (len(group) + COLS - 1) // COLS
    W, H = COLS * CW, rows * (CH + LAB)
    sheet = Image.new('RGB', (W, H), 'white')
    dr = ImageDraw.Draw(sheet)
    for i, f in enumerate(group):
        im = Image.open(os.path.join(D, f)).convert('RGB')
        im.thumbnail((CW - 8, CH - 8))
        x = (i % COLS) * CW
        y = (i // COLS) * (CH + LAB)
        sheet.paste(im, (x + 4, y + 4))
        dr.text((x + 6, y + CH + 4), f[:46], fill='black')
    p = os.path.join(D, f'eas-sheet-{si+1}.png')
    sheet.save(p)
    print(p, sheet.size, len(group), 'cards')
