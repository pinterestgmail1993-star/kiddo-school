#!/usr/bin/env python3
"""Probe the 42 plants-and-how-they-grow masters on R2: HTTP status,
content-type, byte size vs the owner's panel, then download + record real
dimensions. Owner panel bytes are the truth for 'file unchanged'; dims feed
honest width/height. THE JPG MASTERS RIDE EXACTLY AS UPLOADED — no
conversion, no re-compression, file names char-for-char."""
import os, json, hashlib, urllib.request

BASE = 'https://assets.kiddo.school/school/learning-path/plants-and-how-they-grow/flashcards/'
D = '/tmp/plants'
os.makedirs(D, exist_ok=True)

FILES = [
    "a-plants-life-cycle-flashcard-for-kids.jpg",
    "a-plants-water-path-flashcard-for-kids.jpg",
    "bud-bloom-flower-pollen-growth-stages-flashcard-for-kids.jpg",
    "bulbs-and-tubers-plant-flashcard-for-kids.jpg",
    "flower-fruit-seed-new-plant-growth-stages-flashcard-for-kids.jpg",
    "flower-parts-plant-flashcard-for-kids.jpg",
    "flowers-make-seeds-plant-flashcard-for-kids.jpg",
    "garden-helpers-plant-flashcard-for-kids.jpg",
    "how-cacti-survive-plant-flashcard-for-kids.jpg",
    "how-plants-make-food-flashcard-for-kids.jpg",
    "how-plants-reproduce-flashcard-for-kids.jpg",
    "how-seeds-travel-plant-flashcard-for-kids.jpg",
    "how-vines-grow-plant-flashcard-for-kids.jpg",
    "inside-a-leaf-plant-flashcard-for-kids.jpg",
    "inside-a-seed-plant-flashcard-for-kids.jpg",
    "leaf-shapes-plant-flashcard-for-kids.jpg",
    "mosses-and-ferns-plant-flashcard-for-kids.jpg",
    "parts-of-a-tree-plant-flashcard-for-kids.jpg",
    "plant-clues-flashcard-for-kids.jpg",
    "plant-defenses-flashcard-for-kids.jpg",
    "plant-homes-flashcard-for-kids.jpg",
    "plant-life-in-winter-flashcard-for-kids.jpg",
    "plant-neighbors-flashcard-for-kids.jpg",
    "plant-protection-flashcard-for-kids.jpg",
    "plants-and-how-they-grow-flashcards-for-kids-cover.jpg",
    "plants-and-soil-flashcard-for-kids.jpg",
    "plants-in-the-desert-flashcard-for-kids.jpg",
    "plants-in-the-pond-flashcard-for-kids.jpg",
    "plants-in-the-rainforest-flashcard-for-kids.jpg",
    "plants-that-eat-insects-flashcard-for-kids.jpg",
    "plants-that-spread-flashcard-for-kids.jpg",
    "plants-through-the-seasons-flashcard-for-kids.jpg",
    "root-jobs-plant-flashcard-for-kids.jpg",
    "seed-crack-root-sprout-growth-stages-flashcard-for-kids.jpg",
    "seed-root-grows-water-strong-roots-growth-stages-flashcard-for-kids.jpg",
    "seed-root-shoot-sprout-growth-stages-flashcard-for-kids.jpg",
    "sprout-stem-leaf-young-plant-growth-stages-flashcard-for-kids.jpg",
    "stem-jobs-plant-flashcard-for-kids.jpg",
    "the-pollination-path-plant-flashcard-for-kids.jpg",
    "trees-through-time-plant-flashcard-for-kids.jpg",
    "what-plants-need-flashcard-for-kids.jpg",
    "why-plants-make-fruit-flashcard-for-kids.jpg",
]

PANEL_KB = {  # from the owner's R2 panel, kB
    "a-plants-life-cycle-flashcard-for-kids.jpg": 174,
    "a-plants-water-path-flashcard-for-kids.jpg": 161,
    "bud-bloom-flower-pollen-growth-stages-flashcard-for-kids.jpg": 173,
    "bulbs-and-tubers-plant-flashcard-for-kids.jpg": 180,
    "flower-fruit-seed-new-plant-growth-stages-flashcard-for-kids.jpg": 149,
    "flower-parts-plant-flashcard-for-kids.jpg": 154,
    "flowers-make-seeds-plant-flashcard-for-kids.jpg": 179,
    "garden-helpers-plant-flashcard-for-kids.jpg": 193,
    "how-cacti-survive-plant-flashcard-for-kids.jpg": 178,
    "how-plants-make-food-flashcard-for-kids.jpg": 159,
    "how-plants-reproduce-flashcard-for-kids.jpg": 172,
    "how-seeds-travel-plant-flashcard-for-kids.jpg": 193,
    "how-vines-grow-plant-flashcard-for-kids.jpg": 165,
    "inside-a-leaf-plant-flashcard-for-kids.jpg": 193,
    "inside-a-seed-plant-flashcard-for-kids.jpg": 189,
    "leaf-shapes-plant-flashcard-for-kids.jpg": 158,
    "mosses-and-ferns-plant-flashcard-for-kids.jpg": 206,
    "parts-of-a-tree-plant-flashcard-for-kids.jpg": 161,
    "plant-clues-flashcard-for-kids.jpg": 207,
    "plant-defenses-flashcard-for-kids.jpg": 205,
    "plant-homes-flashcard-for-kids.jpg": 215,
    "plant-life-in-winter-flashcard-for-kids.jpg": 227,
    "plant-neighbors-flashcard-for-kids.jpg": 225,
    "plant-protection-flashcard-for-kids.jpg": 223,
    "plants-and-how-they-grow-flashcards-for-kids-cover.jpg": 200,
    "plants-and-soil-flashcard-for-kids.jpg": 237,
    "plants-in-the-desert-flashcard-for-kids.jpg": 229,
    "plants-in-the-pond-flashcard-for-kids.jpg": 194,
    "plants-in-the-rainforest-flashcard-for-kids.jpg": 232,
    "plants-that-eat-insects-flashcard-for-kids.jpg": 177,
    "plants-that-spread-flashcard-for-kids.jpg": 198,
    "plants-through-the-seasons-flashcard-for-kids.jpg": 224,
    "root-jobs-plant-flashcard-for-kids.jpg": 200,
    "seed-crack-root-sprout-growth-stages-flashcard-for-kids.jpg": 137,
    "seed-root-grows-water-strong-roots-growth-stages-flashcard-for-kids.jpg": 182,
    "seed-root-shoot-sprout-growth-stages-flashcard-for-kids.jpg": 131,
    "sprout-stem-leaf-young-plant-growth-stages-flashcard-for-kids.jpg": 147,
    "stem-jobs-plant-flashcard-for-kids.jpg": 180,
    "the-pollination-path-plant-flashcard-for-kids.jpg": 169,
    "trees-through-time-plant-flashcard-for-kids.jpg": 196,
    "what-plants-need-flashcard-for-kids.jpg": 154,
    "why-plants-make-fruit-flashcard-for-kids.jpg": 188,
}

assert len(FILES) == 42, len(FILES)
assert set(FILES) == set(PANEL_KB), 'panel/file name mismatch'
out = {}
bad = []
for f in FILES:
    url = BASE + f
    req = urllib.request.Request(url, headers={'User-Agent': 'kiddo-probe/1'})
    data = None
    for attempt in range(3):  # retry: a custom-domain 404 can be a stale cache
        try:
            r = urllib.request.urlopen(req, timeout=30)
            data = r.read()
            ct = r.headers.get('Content-Type')
            code = r.status
            break
        except Exception as e:
            if attempt == 2:
                bad.append((f, str(e)))
            else:
                import time; time.sleep(2)
    if data is None:
        continue
    p = os.path.join(D, f)
    with open(p, 'wb') as fh:
        fh.write(data)
    from PIL import Image
    with Image.open(p) as im:
        w, h = im.size
        fmt = im.format
    kb = len(data) / 1000  # the owner's panel reports decimal kB
    panel = PANEL_KB[f]
    match = abs(kb - panel) <= 1.5
    out[f] = {'code': code, 'ct': ct, 'w': w, 'h': h, 'fmt': fmt,
              'bytes': len(data), 'kb': round(kb, 1), 'panel_kb': panel, 'panel_match': match,
              'md5': hashlib.md5(data).hexdigest()[:10]}
    flag = '' if (code == 200 and ct == 'image/jpeg' and match) else '  <<< CHECK'
    print(f"{code} {ct} {w}x{h} {fmt} {round(kb,1)}kB panel={panel} {f}{flag}")

print('\nBAD:', bad if bad else 'none')
print('TOTAL:', len(out), '| all 200:', all(v['code'] == 200 for v in out.values()))
print('FORMATS:', {v['fmt'] for v in out.values()})
print('CT SET:', {v['ct'] for v in out.values()})
print('PANEL MISMATCHES:', [k for k, v in out.items() if not v['panel_match']] or 'none')
dims = {}
for k, v in out.items():
    dims.setdefault((v['w'], v['h']), []).append(k)
for d, ks in sorted(dims.items()):
    print(f"DIMS {d[0]}x{d[1]}: {len(ks)} files")
    if d[0] > d[1]:
        for k in sorted(ks):
            print('   landscape:', k)

with open('/home/z/my-project/kiddo-school/scripts/plants-dims.json', 'w') as fh:
    json.dump(out, fh, indent=1, sort_keys=True)
print('\nwrote scripts/plants-dims.json')
