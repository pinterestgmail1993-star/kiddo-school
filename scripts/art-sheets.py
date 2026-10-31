#!/usr/bin/env python3
"""OWNER 2026-10-31 — the Art Room flashcard deck joins /art/ (the owner:
"include these https://kiddo.school/art/"). House transcription play, same as
the Class 39/41/43 rounds: pull every card face off R2, then labeled contact
sheets so each title + the four labeled items are READ off the artwork, never
invented. 9 cards per sheet, 3x3, each cell labeled with its index + R2 name.
The landscape card (800x566) gets its own wider cell so nothing is squashed.
"""
import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(__file__)
OUT = os.path.join(HERE, 'art-sheets')
os.makedirs(OUT, exist_ok=True)
CARDS = [
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
ASSETS = os.path.join(HERE, 'art-assets')
os.makedirs(ASSETS, exist_ok=True)

# step 1 — pull the faces once (kept in scripts/art-assets like es-assets)
import time, urllib.request
for i, f in enumerate(CARDS):
    p = os.path.join(ASSETS, f)
    if os.path.exists(p) and os.path.getsize(p) > 10000:
        continue
    req = urllib.request.Request('https://assets.kiddo.school/school/art-room/flashcards/' + f,
                                 headers={'User-Agent': 'kiddo-probe/1.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        open(p, 'wb').write(r.read())
    print('pulled', f)
    if i < len(CARDS) - 1:
        time.sleep(0.5)

# step 2 — labeled contact sheets
try:
    FONT = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 17)
except Exception:
    FONT = ImageFont.load_default()

per = 8
for s in range((len(CARDS) + per - 1) // per):
    chunk = CARDS[s * per:(s + 1) * per]
    cols = 4
    CELL_W, LABEL_H = 340, 30
    portrait_h = CELL_W * 1131 // 800
    rows = (len(chunk) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * CELL_W, rows * (portrait_h + LABEL_H)), '#111111')
    d = ImageDraw.Draw(sheet)
    for i, name in enumerate(chunk):
        idx = s * per + i + 1
        img = Image.open(os.path.join(ASSETS, name)).convert('RGB')
        w, h = img.size
        ch = CELL_W * h // w  # honest aspect per card (one landscape in the deck)
        img = img.resize((CELL_W, ch))
        x, y = (i % cols) * CELL_W, (i // cols) * (portrait_h + LABEL_H)
        sheet.paste(img, (x, y + LABEL_H))
        d.text((x + 6, y + 5), f'#{idx:02d} {name[:42]}', fill='#ffffff', font=FONT)
    p = os.path.join(OUT, f'art-sheet-{s + 1}.png')
    sheet.save(p)
    print(p, sheet.size, f'cards #{s * per + 1}-#{s * per + len(chunk)}')
