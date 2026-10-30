#!/usr/bin/env python3
"""Live production probe for the parents' shelves round (2026-10-31).
Both shelves: 200, parent shelf title, tiles with pills + download + print,
manners.js, no per-card URLs, class⇄shelf cross-links live, wall count 63,
lesson pages still live with kid voice, sitemap +2."""
import re, time, urllib.request

def get(u):
    last = None
    for attempt in range(4):
        try:
            r = urllib.request.Request(u, headers={'User-Agent': 'kiddo-qa'})
            with urllib.request.urlopen(r, timeout=60) as resp:
                return resp.status, resp.read().decode('utf-8', 'replace')
        except Exception as e:
            last = e
            time.sleep(3 + attempt * 4)
    raise last

fails = []
def ck(name, ok, extra=''):
    print(('PASS ' if ok else 'FAIL ') + name + (('  ' + str(extra)) if extra else ''))
    if not ok: fails.append(name)

SHELVES = [
    ('https://kiddo.school/flashcards/staying-safe/', 19, 'Staying Safe', '/staying-safe/'),
    ('https://kiddo.school/flashcards/healthy-food/', 21, 'Healthy Food', '/healthy-food/'),
]
for url, n, name, cls in SHELVES:
    st, html = get(url)
    ck(f'{name} shelf: 200', st == 200, st)
    ck(f'{name} shelf: parent-shelf title', 'the parent shelf' in html or 'parent shelf' in html)
    ck(f'{name} shelf: {n} tiles', len(re.findall(r'class="mn-card"', html)) == n,
       len(re.findall(r'class="mn-card"', html)))
    ck(f'{name} shelf: {n} pill rows', len(re.findall(r'fc-pillrow', html)) == n)
    ck(f'{name} shelf: {n} download + print', len(re.findall(r'data-mn-print', html)) >= n and len(re.findall(r' download="', html)) >= n)
    ck(f'{name} shelf: level pills present', 'fc-pill-level' in html and f'Level 3' in html)
    ck(f'{name} shelf: manners.js rides along', '/assets/manners.js' in html)
    ck(f'{name} shelf: parent voice', 'your child' in html)
    ck(f'{name} shelf: links back to the class', f'href="{cls}"' in html)
    ck(f'{name} shelf: zero per-card URLs on the shelf', not re.search(r'href="[^"]*flashcards/(staying-safe|healthy-food)/[a-z0-9-]+/"', html.replace('/flashcards/staying-safe/','').replace('/flashcards/healthy-food/','')))

st, cls_html = get('https://kiddo.school/staying-safe/')
ck('Class 39 still live', st == 200, st)
ck('Class 39 links to its parents\u2019 shelf', 'href="/flashcards/staying-safe/"' in cls_html)
ck('Class 39 lesson talks to kids', 'YOU can own' in cls_html and 'your child' not in cls_html)
st, cls_html = get('https://kiddo.school/healthy-food/')
ck('Class 40 still live', st == 200, st)
ck('Class 40 links to its parents\u2019 shelf', 'href="/flashcards/healthy-food/"' in cls_html)
ck('Class 40 lesson talks to kids', 'plate YOU are proud of' in cls_html and 'your child' not in cls_html)
# one per-card class short page still serves (the class keeps its lesson pages)
st, _ = get('https://kiddo.school/staying-safe/buckle-up/')
ck('Class 39 short page still live (lesson side untouched)', st == 200, st)
st, _ = get('https://kiddo.school/healthy-food/water/')
ck('Class 40 short page still live (lesson side untouched)', st == 200, st)
# the wall carries both + count 63
st, wall = get('https://kiddo.school/flashcards/')
ck('library wall 200', st == 200, st)
ck('wall count says 63 sets', 'Showing all 63 sets' in wall)
ck('wall card: Staying Safe', 'href="/flashcards/staying-safe/"' in wall)
ck('wall card: Healthy Food', 'href="/flashcards/healthy-food/"' in wall)
# sitemap carries both, total 3922
st, xml = get('https://kiddo.school/sitemap.xml')
ck('sitemap 200', st == 200, st)
locs = re.findall(r'<loc>(.*?)</loc>', xml)
ck('sitemap has 3922 locs', len(locs) == 3922, len(locs))
ck('sitemap carries both shelves', 'https://kiddo.school/flashcards/staying-safe/' in locs and 'https://kiddo.school/flashcards/healthy-food/' in locs)
# a random old URL still 200 (no existing URL touched)
st, _ = get('https://kiddo.school/flashcards/manners/')
ck('manners shelf untouched', st == 200, st)

print(('ALL PASS' if not fails else f'{len(fails)} FAILURES: ' + ', '.join(fails)))
raise SystemExit(0 if not fails else 1)
