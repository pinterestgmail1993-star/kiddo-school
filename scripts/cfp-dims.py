#!/usr/bin/env python3
"""Probe the 31 caring-for-our-planet masters on R2: HTTP status, content-type,
byte size vs the owner's panel, then download + record real dimensions.
Owner panel bytes are the truth for 'file unchanged'; dims feed honest width/height."""
import os, json, hashlib, urllib.request

BASE = 'https://assets.kiddo.school/school/learning-path/caring-for-our-planet/flashcards/'
D = '/tmp/cfp'
os.makedirs(D, exist_ok=True)

FILES = [
    "bike-safely-use-rainwater-plant-a-garden-eco-flashcard-for-kids.jpg",
    "caring-for-our-planet-flashcards-for-kids-cover.jpg",
    "choose-wooden-toys-share-clothes-make-seed-paper-eco-flashcard-for-kids.jpg",
    "clean-your-bike-use-cloth-napkins-protect-ponds-eco-flashcard-for-kids.jpg",
    "close-the-tap-share-a-ride-use-both-sides-eco-flashcard-for-kids.jpg",
    "collect-rain-rescue-a-plant-reuse-jars-eco-flashcard-for-kids.jpg",
    "eat-local-grow-herbs-use-a-mug-eco-flashcard-for-kids.jpg",
    "make-a-bat-box-care-for-earthworms-save-riverbanks-eco-flashcard-for-kids.jpg",
    "make-a-bird-feeder-use-fallen-leaves-choose-local-flowers-eco-flashcard-for-kids.jpg",
    "make-a-worm-farm-use-a-library-choose-refill-packs-eco-flashcard-for-kids.jpg",
    "plant-a-pollinator-patch-keep-soil-covered-make-a-nature-journal-eco-flashcard-for-kids.jpg",
    "plant-a-tree-pick-up-litter-walk-more-eco-flashcard-for-kids.jpg",
    "plant-bulbs-recycle-cardboard-protect-nests-eco-flashcard-for-kids.jpg",
    "plant-shrubs-save-scraps-repair-socks-eco-flashcard-for-kids.jpg",
    "protect-birds-save-the-bees-respect-wildlife-eco-flashcard-for-kids.jpg",
    "protect-trees-keep-water-clean-respect-the-soil-eco-flashcard-for-kids.jpg",
    "recycle-glass-protect-butterflies-share-homegrown-food-eco-flashcard-for-kids.jpg",
    "recycle-metal-eat-all-your-food-use-a-bike-bell-eco-flashcard-for-kids.jpg",
    "recycle-textiles-catch-dripping-water-choose-unpackaged-food-eco-flashcard-for-kids.jpg",
    "recycle-tubes-use-a-solar-cooker-repair-backpacks-eco-flashcard-for-kids.jpg",
    "rescue-insects-grow-beans-swap-clothes-eco-flashcard-for-kids.jpg",
    "restore-habitats-sort-batteries-use-wind-power-eco-flashcard-for-kids.jpg",
    "ride-the-bus-recycle-cartons-use-old-boxes-eco-flashcard-for-kids.jpg",
    "save-seeds-mend-clothes-use-less-plastic-eco-flashcard-for-kids.jpg",
    "sort-waste-clean-a-beach-use-solar-power-eco-flashcard-for-kids.jpg",
    "take-a-train-choose-secondhand-save-rain-eco-flashcard-for-kids.jpg",
    "turn-it-off-save-water-use-less-eco-flashcard-for-kids.jpg",
    "turn-off-heat-use-daylight-wash-full-loads-eco-flashcard-for-kids.jpg",
    "turn-off-the-computer-build-a-compost-bin-save-cooking-water-eco-flashcard-for-kids.jpg",
    "unplug-devices-air-dry-clothes-take-the-stairs-eco-flashcard-for-kids.jpg",
    "use-a-lunchbox-turn-off-fans-grow-your-own-eco-flashcard-for-kids.jpg",
]

PANEL_KB = {  # from the owner's R2 panel screenshot, kB
    "bike-safely-use-rainwater-plant-a-garden-eco-flashcard-for-kids.jpg": 239,
    "caring-for-our-planet-flashcards-for-kids-cover.jpg": 242,
    "choose-wooden-toys-share-clothes-make-seed-paper-eco-flashcard-for-kids.jpg": 244,
    "clean-your-bike-use-cloth-napkins-protect-ponds-eco-flashcard-for-kids.jpg": 258,
    "close-the-tap-share-a-ride-use-both-sides-eco-flashcard-for-kids.jpg": 240,
    "collect-rain-rescue-a-plant-reuse-jars-eco-flashcard-for-kids.jpg": 229,
    "eat-local-grow-herbs-use-a-mug-eco-flashcard-for-kids.jpg": 244,
    "make-a-bat-box-care-for-earthworms-save-riverbanks-eco-flashcard-for-kids.jpg": 252,
    "make-a-bird-feeder-use-fallen-leaves-choose-local-flowers-eco-flashcard-for-kids.jpg": 242,
    "make-a-worm-farm-use-a-library-choose-refill-packs-eco-flashcard-for-kids.jpg": 235,
    "plant-a-pollinator-patch-keep-soil-covered-make-a-nature-journal-eco-flashcard-for-kids.jpg": 237,
    "plant-a-tree-pick-up-litter-walk-more-eco-flashcard-for-kids.jpg": 236,
    "plant-bulbs-recycle-cardboard-protect-nests-eco-flashcard-for-kids.jpg": 237,
    "plant-shrubs-save-scraps-repair-socks-eco-flashcard-for-kids.jpg": 248,
    "protect-birds-save-the-bees-respect-wildlife-eco-flashcard-for-kids.jpg": 242,
    "protect-trees-keep-water-clean-respect-the-soil-eco-flashcard-for-kids.jpg": 238,
    "recycle-glass-protect-butterflies-share-homegrown-food-eco-flashcard-for-kids.jpg": 246,
    "recycle-metal-eat-all-your-food-use-a-bike-bell-eco-flashcard-for-kids.jpg": 259,
    "recycle-textiles-catch-dripping-water-choose-unpackaged-food-eco-flashcard-for-kids.jpg": 246,
    "recycle-tubes-use-a-solar-cooker-repair-backpacks-eco-flashcard-for-kids.jpg": 250,
    "rescue-insects-grow-beans-swap-clothes-eco-flashcard-for-kids.jpg": 255,
    "restore-habitats-sort-batteries-use-wind-power-eco-flashcard-for-kids.jpg": 246,
    "ride-the-bus-recycle-cartons-use-old-boxes-eco-flashcard-for-kids.jpg": 246,
    "save-seeds-mend-clothes-use-less-plastic-eco-flashcard-for-kids.jpg": 226,
    "sort-waste-clean-a-beach-use-solar-power-eco-flashcard-for-kids.jpg": 255,
    "take-a-train-choose-secondhand-save-rain-eco-flashcard-for-kids.jpg": 236,
    "turn-it-off-save-water-use-less-eco-flashcard-for-kids.jpg": 233,
    "turn-off-heat-use-daylight-wash-full-loads-eco-flashcard-for-kids.jpg": 226,
    "turn-off-the-computer-build-a-compost-bin-save-cooking-water-eco-flashcard-for-kids.jpg": 247,
    "unplug-devices-air-dry-clothes-take-the-stairs-eco-flashcard-for-kids.jpg": 235,
    "use-a-lunchbox-turn-off-fans-grow-your-own-eco-flashcard-for-kids.jpg": 242,
}

assert len(FILES) == 31, len(FILES)
out = {}
bad = []
for f in FILES:
    url = BASE + f
    req = urllib.request.Request(url, headers={'User-Agent': 'kiddo-probe/1'})
    try:
        r = urllib.request.urlopen(req, timeout=30)
        data = r.read()
        ct = r.headers.get('Content-Type')
        code = r.status
    except Exception as e:
        bad.append((f, str(e)))
        continue
    p = os.path.join(D, f)
    with open(p, 'wb') as fh:
        fh.write(data)
    from PIL import Image
    with Image.open(p) as im:
        w, h = im.size
        fmt = im.format
    kb = len(data) / 1024
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

with open('/home/z/my-project/scripts/cfp-dims.json', 'w') as fh:
    json.dump(out, fh, indent=1, sort_keys=True)
print('\nwrote scripts/cfp-dims.json')
