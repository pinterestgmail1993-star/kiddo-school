#!/usr/bin/env python3
"""OWNER 2026-11-01 round — labeled contact sheets for the two new decks,
same house transcription play as art-sheets.py: every card face READ off the
artwork, never invented. Uses the files already probed+downloaded by
probe-pd44-nature.py into scripts/pd44-assets/{pd,nature} (index-prefixed)."""
import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(__file__)
ASSETS = os.path.join(HERE, 'pd44-assets')
try:
    FONT = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 17)
except Exception:
    FONT = ImageFont.load_default()

def sheets(folder, per=8):
    files = sorted(os.listdir(os.path.join(ASSETS, folder)))
    cols, CELL_W, LABEL_H = 4, 340, 30
    out = []
    for s in range((len(files) + per - 1) // per):
        chunk = files[s * per:(s + 1) * per]
        portrait_h = CELL_W * 1132 // 800
        rows = (len(chunk) + cols - 1) // cols
        sheet = Image.new('RGB', (cols * CELL_W, rows * (portrait_h + LABEL_H)), '#111111')
        d = ImageDraw.Draw(sheet)
        for i, name in enumerate(chunk):
            idx = int(name[:2])
            img = Image.open(os.path.join(ASSETS, folder, name)).convert('RGB')
            w, h = img.size
            img = img.resize((CELL_W, CELL_W * h // w))
            x, y = (i % cols) * CELL_W, (i // cols) * (portrait_h + LABEL_H)
            sheet.paste(img, (x, y + LABEL_H))
            d.text((x + 6, y + 5), f'#{idx:02d} {name[3:45]}', fill='#ffffff', font=FONT)
        p = os.path.join(ASSETS, f'{folder}-sheet-{s + 1}.png')
        sheet.save(p)
        out.append(p)
        print(p, sheet.size, f'cards #{s * per}-{s * per + len(chunk) - 1}')

sheets('pd')
sheets('nature')
