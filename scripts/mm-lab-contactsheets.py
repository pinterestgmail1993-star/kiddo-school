#!/usr/bin/env python3
"""Labeled contact sheets for the two 2026-10-31 decks — Class 42 · Measuring
& Money (28 cards + cover) and the Science Lab equipment deck (53 cards) —
the house transcription play (Class 39/40/41 + Science rounds): every card
face is read off the artwork via labeled grids, never invented. 9 cards per
sheet, 3x3, each cell labeled with its 1-based index + R2 file name."""
import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(__file__)

def sheets(assets_dir, out_dir, prefix):
    os.makedirs(out_dir, exist_ok=True)
    CARDS = sorted(f for f in os.listdir(assets_dir) if f.endswith('.webp') and 'cover' not in f)
    CELL_W, LABEL_H = 360, 30
    try:
        FONT = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 15)
    except Exception:
        FONT = ImageFont.load_default()
    per = 9
    n = (len(CARDS) + per - 1) // per
    for s in range(n):
        chunk = CARDS[s * per:(s + 1) * per]
        cols = 3
        rows = (len(chunk) + cols - 1) // cols
        cell_h = CELL_W * 1132 // 800
        sheet = Image.new('RGB', (cols * CELL_W, rows * (cell_h + LABEL_H)), '#111111')
        d = ImageDraw.Draw(sheet)
        for i, name in enumerate(chunk):
            idx = s * per + i + 1
            img = Image.open(os.path.join(assets_dir, name)).convert('RGB').resize((CELL_W, cell_h))
            x, y = (i % cols) * CELL_W, (i // cols) * (cell_h + LABEL_H)
            sheet.paste(img, (x, y + LABEL_H))
            d.text((x + 6, y + 5), f'#{idx:02d} {name[:46]}', fill='#ffffff', font=FONT)
        p = os.path.join(out_dir, f'{prefix}-sheet-{s + 1}.png')
        sheet.save(p)
        print(p, sheet.size, f'cards #{s * per + 1}-#{s * per + len(chunk)}')
    # the cover, alone, for the class page main image check
    cov = [f for f in os.listdir(assets_dir) if 'cover' in f]
    if cov:
        img = Image.open(os.path.join(assets_dir, cov[0])).convert('RGB').resize((CELL_W, CELL_W * 1132 // 800))
        p = os.path.join(out_dir, f'{prefix}-cover.png')
        img.save(p)
        print(p, 'cover')

sheets(os.path.join(HERE, 'mm-assets'), os.path.join(HERE, 'mm-sheets'), 'mm')
sheets(os.path.join(HERE, 'lab-assets'), os.path.join(HERE, 'lab-sheets'), 'lab')
