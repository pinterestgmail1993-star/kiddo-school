#!/usr/bin/env python3
"""Sentence-repeat scan: the 83 new /art-room/ + /flashcards/art-room/ pages
vs every other dist page. Authored-sentence repeats = failure (house rule).
Boilerplate filters: the site-wide feedback mounts, footer lines and the
lesson 'pairs with the …' template sentence are excluded the same way the
dinosaur and playground scans excluded them."""
import re, os, sys, html
from pathlib import Path

DIST = Path('dist')
NEW_PREFIXES = ('art-room',)
# pages of the new shelf: /art-room/* and /flashcards/art-room/*
def is_new(p):
    parts = p.parts
    return len(parts) > 1 and parts[1] == 'art-room'
FLASH_TWINS = Path('dist/flashcards/art-room')
def is_new_page(p):
    if is_new(p): return True
    return FLASH_TWINS in p.parents

TAG = re.compile(r'<(script|style|header|footer)[^>]*>.*?</\1>', re.S)
TXT = re.compile(r'<[^>]+>')
def sentences(page):
    t = TAG.sub(' ', page)
    t = TXT.sub(' ', t)
    t = html.unescape(t)
    out = set()
    for s in re.split(r'(?<=[.!?])\s+', t):
        s = ' '.join(s.split()).strip().lower()
        if len(s) > 40 and not s.startswith(('skip to content', '©', 'made for curious', 'their first school',
            'the cards from this class also live in the flashcards library',
            'this lesson pairs with the', 'every card page has its own download button',
            'every lesson has a matching flashcard',
            '(optional) your name', 'a different thing from the quick faces above',
            'don’t include private information', 'everything else on this page works without it',
            'i’m the grown-up', 'great! tell us more about what you made',
            'have a grown-up check the box', 'no parent comments yet',
            'no parent reviews yet', 'pick the face that matches how it went',
            'send review parent comments', 'share the game, the moment or the trick',
            'the cards themselves work fine without it', 'the copy button copies this page',
            'x facebook whatsapp pinterest copy link', 'your rating (required)',
            'your comment (required)', '😍', '😊', '😐', '😕',
            'download card', 'nearby cards from this set',
            'take it with you', 'send comment related cards',
            'teach it, step by step', 'whatever comes back',
            'open the ')):
            out.add(s)
    return out

new_sents = {}
for root, dirs, files in os.walk(DIST):
    p = Path(root)
    if not is_new_page(p):
        continue
    for f in files:
        if f == 'index.html':
            pp = p / f
            new_sents[str(pp)] = sentences(pp.read_text(encoding='utf8', errors='ignore'))

print(f'new pages: {len(new_sents)}, sentences: {sum(map(len, new_sents.values()))}')

bad = []
checked = 0
new_list = list(new_sents.items())
for root, dirs, files in os.walk(DIST):
    p = Path(root)
    if is_new_page(p):
        continue
    for f in files:
        if f != 'index.html':
            continue
        pp = p / f
        old = sentences(pp.read_text(encoding='utf8', errors='ignore'))
        checked += 1
        for np, ns in new_list:
            hit = ns & old
            if hit:
                bad.append((np, str(pp), sorted(hit)[:2]))

print(f'scanned vs {checked} other pages')
if bad:
    for np, op, hits in bad[:20]:
        print('REPEAT', np, '<->', op)
        for h in hits:
            print('   ', h[:110])
    sys.exit(1)
print('OK: zero authored-sentence repeats between the Art Room pages and the rest of the site')
