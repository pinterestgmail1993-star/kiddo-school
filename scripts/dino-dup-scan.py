#!/usr/bin/env python3
"""Sentence-repeat scan: the 36 new /dinosaurs/ pages vs every other dist page.
Authored-sentence repeats outside the games shelf = failure (house rule)."""
import re, os, sys, html
from pathlib import Path

DIST = Path('dist')
NEW = ["dinosaurs"]
TAG = re.compile(r'<(script|style|header|footer)[^>]*>.*?</\1>', re.S)
TXT = re.compile(r'<[^>]+>')
def sentences(page):
    t = TAG.sub(' ', page)
    t = TXT.sub(' ', t)
    t = html.unescape(t)
    out = set()
    for s in re.split(r'(?<=[.!?])\s+', t):
        s = ' '.join(s.split()).strip().lower()
        if len(s) > 40 and not s.startswith(('skip to content', '©', 'made for curious', 'their first school')) and not s.startswith('the cards from this class also live in the flashcards library'):
            out.add(s)
    return out

new_sents = {}
for root, dirs, files in os.walk(DIST):
    parts = Path(root).parts
    if len(parts) > 1 and parts[1] in NEW:
        for f in files:
            if f == 'index.html':
                p = Path(root) / f
                new_sents[str(p)] = sentences(p.read_text(encoding='utf8', errors='ignore'))

print(f'new pages: {len(new_sents)}, sentences: {sum(map(len, new_sents.values()))}')

bad = []
checked = 0
for root, dirs, files in os.walk(DIST):
    parts = Path(root).parts
    if len(parts) > 1 and parts[1] in NEW:
        continue
    for f in files:
        if f != 'index.html':
            continue
        p = Path(root) / f
        old = sentences(p.read_text(encoding='utf8', errors='ignore'))
        checked += 1
        for np, ns in new_sents.items():
            hit = ns & old
            if hit:
                bad.append((np, str(p), sorted(hit)[:2]))

print(f'scanned vs {checked} other pages')
if bad:
    for np, op, hits in bad[:15]:
        print('REPEAT', np, '<->', op)
        for h in hits:
            print('   ', h[:110])
    sys.exit(1)
print('OK: zero authored-sentence repeats between /dinosaurs/ pages and the rest of the site')
