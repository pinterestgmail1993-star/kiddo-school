#!/usr/bin/env python3
"""Probe both new R2 decks (owner 2026-11-01 round):
- school/learning-path/position-and-direction-words/flashcards/ (23 files: 22 cards + cover)
- school/nature-club/flashcards/ (41 files, no cover)
Confirms HTTP 200 + image/webp + real pixel dimensions (carried per file so
nothing lies), and downloads every file for the labeled contact sheets."""
import json, os, struct, urllib.request

BASE = 'https://assets.kiddo.school'
OUT = '/home/z/my-project/kiddo-school/scripts/pd44-assets'
os.makedirs(OUT + '/pd', exist_ok=True)
os.makedirs(OUT + '/nature', exist_ok=True)

PD = ['above-position-word-flashcard-for-kids.webp','across-position-word-flashcard-for-kids.webp',
'around-position-word-flashcard-for-kids.webp','away-from-position-word-flashcard-for-kids.webp',
'back-behind-position-word-flashcard-for-kids.webp','below-position-word-flashcard-for-kids.webp',
'between-position-word-flashcard-for-kids.webp','down-position-word-flashcard-for-kids.webp',
'far-position-word-flashcard-for-kids.webp','in-front-of-position-word-flashcard-for-kids.webp',
'inside-position-word-flashcard-for-kids.webp','left-position-word-flashcard-for-kids.webp',
'near-position-word-flashcard-for-kids.webp','next-to-position-word-flashcard-for-kids.webp',
'on-position-word-flashcard-for-kids.webp','outside-position-word-flashcard-for-kids.webp',
'over-position-word-flashcard-for-kids.webp','position-and-direction-words-flashcards-for-kids-cover.webp',
'right-position-word-flashcard-for-kids.webp','through-position-word-flashcard-for-kids.webp',
'toward-position-word-flashcard-for-kids.webp','under-position-word-flashcard-for-kids.webp',
'up-position-word-flashcard-for-kids.webp']

NATURE = ['acorn-plant-flashcard-for-kids.webp','bamboo-plant-flashcard-for-kids.webp',
'bee-insect-flashcard-for-kids.webp','bird-animal-flashcard-for-kids.webp',
'butterfly-insect-flashcard-for-kids.webp','cactus-plant-flashcard-for-kids.webp',
'cloud-weather-flashcard-for-kids.webp','coconut-plant-flashcard-for-kids.webp',
'deer-animal-flashcard-for-kids.webp','dragonfly-insect-flashcard-for-kids.webp',
'fern-plant-flashcard-for-kids.webp','firefly-insect-flashcard-for-kids.webp',
'flower-plant-flashcard-for-kids.webp','fox-animal-flashcard-for-kids.webp',
'frog-animal-flashcard-for-kids.webp','frozen-lake-nature-flashcard-for-kids.webp',
'hedgehog-animal-flashcard-for-kids.webp','ladybug-insect-flashcard-for-kids.webp',
'leaf-plant-flashcard-for-kids.webp','maple-leaf-plant-flashcard-for-kids.webp',
'moss-plant-flashcard-for-kids.webp','mountain-nature-flashcard-for-kids.webp',
'mushroom-nature-flashcard-for-kids.webp','ocean-nature-flashcard-for-kids.webp',
'otter-animal-flashcard-for-kids.webp','penguin-animal-flashcard-for-kids.webp',
'pinecone-plant-flashcard-for-kids.webp','puddle-weather-flashcard-for-kids.webp',
'rabbit-animal-flashcard-for-kids.webp','rainbow-weather-flashcard-for-kids.webp',
'rainforest-nature-flashcard-for-kids.webp','river-nature-flashcard-for-kids.webp',
'sea-turtle-animal-flashcard-for-kids.webp','seed-plant-flashcard-for-kids.webp',
'snail-animal-flashcard-for-kids.webp','sunflower-plant-flashcard-for-kids.webp',
'sunset-sky-flashcard-for-kids.webp','tree-plant-flashcard-for-kids.webp',
'volcano-nature-flashcard-for-kids.webp','waterfall-nature-flashcard-for-kids.webp',
'whale-animal-flashcard-for-kids.webp']

def webp_size(b):
    # RIFF....WEBP VP8/VP8L/VP8X — parse the common lossy/lossless containers
    if b[:4] != b'RIFF' or b[8:12] != b'WEBP': return None
    fourcc = b[12:16]
    try:
        if fourcc == b'VP8 ':
            w = struct.unpack('<H', b[26:28])[0] & 0x3FFF
            h = struct.unpack('<H', b[28:30])[0] & 0x3FFF
            return w, h
        if fourcc == b'VP8L':
            bits = struct.unpack('<I', b[21:25])[0]
            w = (bits & 0x3FFF) + 1
            h = ((bits >> 14) & 0x3FFF) + 1
            return w, h
        if fourcc == b'VP8X':
            w = int.from_bytes(b[24:27], 'little') + 1
            h = int.from_bytes(b[27:30], 'little') + 1
            return w, h
    except Exception:
        return None
    return None

def probe(folder, name, dest):
    url = f'{BASE}/{folder}/{name}'
    req = urllib.request.Request(url, headers={'User-Agent': 'kiddo-deck-probe/1.0'})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read()
            ct = r.headers.get('Content-Type', '')
            size = webp_size(body)
            open(dest, 'wb').write(body)
            return {'url': url, 'status': r.status, 'ct': ct, 'kb': round(len(body)/1024), 'dims': size}
    except Exception as e:
        return {'url': url, 'status': 0, 'err': str(e)[:80]}

results = {'pd': [], 'nature': []}
for i, n in enumerate(PD):
    r = probe('school/learning-path/position-and-direction-words/flashcards', n, f'{OUT}/pd/{i:02d}-{n}')
    results['pd'].append({'file': n, **r}); print('PD ', n, r.get('status'), r.get('ct'), str(r.get('dims')), str(r.get('kb'))+'kB')
for i, n in enumerate(NATURE):
    r = probe('school/nature-club/flashcards', n, f'{OUT}/nature/{i:02d}-{n}')
    results['nature'].append({'file': n, **r}); print('NAT', n, r.get('status'), r.get('ct'), str(r.get('dims')), str(r.get('kb'))+'kB')

json.dump(results, open(OUT + '/probe.json', 'w'), indent=1)
bad = [r for r in results['pd'] + results['nature'] if r.get('status') != 200 or r.get('ct') != 'image/webp' or not r.get('dims')]
print(f"\n{len(results['pd'])} PD + {len(results['nature'])} NATURE probed; {len(bad)} BAD")
for r in bad: print('BAD', r)
