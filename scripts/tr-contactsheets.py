#!/usr/bin/env python3
"""Labeled contact sheets for the 41 Time & Daily Routine cards — the house
transcription play (Class 39/Science rounds): every card face is read off the
artwork via labeled grids, never invented. 9 cards per sheet, 3x3, each cell
labeled with its 1-based index + R2 file name."""
import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(__file__)
ASSETS = os.path.join(HERE, 'tr-assets')
OUT = os.path.join(HERE, 'tr-sheets')
os.makedirs(OUT, exist_ok=True)
CARDS = sorted(f for f in os.listdir(ASSETS) if f.endswith('.webp') and 'cover' not in f)
CELL_W, LABEL_H = 360, 30
try:
    FONT = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 17)
except Exception:
    FONT = ImageFont.load_default()

per, n = 9, (len(CARDS) + 8) // 9
for s in range(n):
    chunk = CARDS[s * per:(s + 1) * per]
    cols, rows = 3, (len(chunk) + 2) // 3
    cell_h = CELL_W * 1132 // 800
    sheet = Image.new('RGB', (cols * CELL_W, rows * (cell_h + LABEL_H)), '#111111')
    d = ImageDraw.Draw(sheet)
    for i, name in enumerate(chunk):
        idx = s * per + i + 1
        img = Image.open(os.path.join(ASSETS, name)).convert('RGB').resize((CELL_W, cell_h))
        x, y = (i % cols) * CELL_W, (i // cols) * (cell_h + LABEL_H)
        sheet.paste(img, (x, y + LABEL_H))
        d.text((x + 6, y + 5), f'#{idx:02d} {name[:44]}', fill='#ffffff', font=FONT)
    p = os.path.join(OUT, f'tr-sheet-{s + 1}.png')
    sheet.save(p)
    print(p, sheet.size, f'cards #{s * per + 1}-#{s * per + len(chunk)}')
