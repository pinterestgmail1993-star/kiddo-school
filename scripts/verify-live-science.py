#!/usr/bin/env python3
"""Live probe for the Science at a Glance round (owner 2026-10-31) —
production checks after the push: the page 200 with 65 tiles/pills/buttons,
the header chip swapped, First Glance + Classes 39/40 untouched and live,
sitemap 3923 (+1, zero removed), R2 assets 200 image/webp."""
import time, urllib.request, sys

BASE = 'https://kiddo.school'
R2 = 'https://assets.kiddo.school/school/extra-classes/science-at-a-glance/'
UA = {'User-Agent': 'Mozilla/5.0 (live-probe)'}
fails = []
def ck(name, ok, extra=''):
    print(('PASS ' if ok else 'FAIL ') + name + (('  ' + str(extra)) if extra else ''))
    if not ok: fails.append(name)

def get(url, timeout=30):
    """GET with one retry and pacing — bursting gets rate-limited at the edge."""
    last = (0, b'', '')
    for attempt in range(3):
        time.sleep(1.6)
        last = _get_once(url, timeout)
        if last[0] == 200:
            return last
        time.sleep(4 * (attempt + 1))
    return last

def _get_once(url, timeout=30):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout) as r:
            return r.status, r.read(), r.headers.get('Content-Type', '')
    except Exception as e:
        code = getattr(e, 'code', None)
        return code or 0, b'', ''

# wait for the deploy (the page is new, so a 200 means it shipped)
html = b''
for i in range(40):
    code, html, _ = get(BASE + '/science-at-a-glance/')
    if code == 200 and b'Science at a Glance' in html:
        print(f'deploy live after ~{i*10}s')
        break
    time.sleep(10)
ck('/science-at-a-glance/ 200', code == 200, code)
if code != 200:
    print('DEPLOY NOT LIVE — aborting remaining checks'); sys.exit(1)

main = html.split(b'</main>')[0].decode('utf8', 'replace')
ck('title carries the new collection', 'Science at a Glance — 65 printable science picture sheets for kids' in html.decode('utf8', 'replace'))
ck('65 tiles', main.count('class="mn-card sg-card"') == 65, main.count('class="mn-card sg-card"'))
ck('65 age pills', main.count('fc-pill fc-pill-age">Ages 2–5') == 65)
ck('65 level pills', main.count('fc-pill fc-pill-level">Level') == 65)
ck('65 skill pills', main.count('fc-pill fc-pill-skill">') == 65)
ck('65 download buttons', main.count('download="') >= 65)
ck('65 print buttons', main.count('data-mn-print') == 65)
ck('level split 22/25/18', main.count('fc-pill fc-pill-level">Level 1 · Name it') == 22 and main.count('fc-pill fc-pill-level">Level 2 · Tell it') == 25 and main.count('fc-pill fc-pill-level">Level 3 · Ask why') == 18, (main.count('fc-pill fc-pill-level">Level 1 · Name it'), main.count('fc-pill fc-pill-level">Level 2 · Tell it'), main.count('fc-pill fc-pill-level">Level 3 · Ask why')))
ck('header count line', '65 first-picture sheets · Ages 2–5' in html.decode('utf8', 'replace'))
ck('chip swapped (aria-current)', 'class="header-fg" href="/science-at-a-glance/" aria-current="page"' in html.decode('utf8', 'replace'))
ck('manners.js ships', '/assets/manners.js' in html.decode('utf8', 'replace'))
ck('no robotic phrases', not any(p in html.decode('utf8', 'replace').lower() for p in ['no sign up', 'no paywall', 'free to use', 'no account', 'free forever']))
# tiles carry zero per-card URLs: every tile link is a .webp (download/open)
import re
bad_links = [m.group(1) for m in re.finditer(r'<figure class="mn-card sg-card"[\s\S]*?</figure>', main) if re.search(r'href="(?!https://assets[^"]*\.webp)[^"]+"', m.group(0))]
ck('zero per-card URLs in tiles', not bad_links, bad_links[:3])

# BOTH header chips on home (owner 2026-10-31 correction: First Glance stays
# beside Science at a Glance) + First Glance untouched + classes 39/40 still live
c2, home, _ = get(BASE + '/')
ck('home 200', c2 == 200, c2)
ck('home science chip', 'class="header-fg" href="/science-at-a-glance/"' in home.decode('utf8', 'replace'))
ck('home science chip count', '65 first-picture sheets · Ages 2–5' in home.decode('utf8', 'replace'))
ck('home First Glance chip back', 'class="header-fg" href="/first-glance/"' in home.decode('utf8', 'replace'))
ck('home First Glance chip count', '58 first-picture sheets · Ages 2–5' in home.decode('utf8', 'replace'))
ck('home footer keeps First Glance', '<a href="/first-glance/">First Glance sheets</a>' in home.decode('utf8', 'replace'))
ck('home footer adds Science at a Glance', '<a href="/science-at-a-glance/">Science at a Glance sheets</a>' in home.decode('utf8', 'replace'))
c3, fg, _ = get(BASE + '/first-glance/')
ck('/first-glance/ 200', c3 == 200, c3)
ck('first-glance links the sibling', 'href="/science-at-a-glance/"' in fg.decode('utf8', 'replace'))
ck('first-glance own chip aria-current', 'class="header-fg" href="/first-glance/" aria-current="page"' in fg.decode('utf8', 'replace'))
# Classes 39/40 untouched: class pages tile with .lp-tile, parents' shelves with .mn-card
for path, n, cls in [('/staying-safe/', 19, 'lp-tile'), ('/healthy-food/', 21, 'lp-tile'), ('/flashcards/staying-safe/', 19, 'mn-card'), ('/flashcards/healthy-food/', 21, 'mn-card')]:
    c4, body, _ = get(BASE + path)
    ck(f'{path} 200 (Class 39/40 untouched)', c4 == 200, c4)
    tiles = body.split(b'</main>')[0].count(f'class="{cls}"'.encode())
    ck(f'{path} still carries {n} {cls} tiles', tiles == n, tiles)

# sitemap: 3923 locs, the new URL in, the old set intact
c5, sm, _ = get(BASE + '/sitemap.xml')
locs = sm.decode('utf8', 'replace').count('<loc>')
ck('sitemap 3923 locs', locs == 3923, locs)
ck('science page in sitemap', '<loc>https://kiddo.school/science-at-a-glance/</loc>' in sm.decode('utf8', 'replace'))
smx = sm.decode('utf8', 'replace')
ck('staying-safe still in sitemap', '<loc>https://kiddo.school/staying-safe/</loc>' in smx)
ck('image sitemap carries water-cycle', '<image:loc>https://assets.kiddo.school/school/extra-classes/science-at-a-glance/water-cycle.webp</image:loc>' in smx)

# R2: spot-check three sheets incl. the og:image one
for slug in ['water-cycle', 'volcano-anatomy', 'solar-system']:
    c6, body, ct = get(R2 + slug + '.webp')
    ck(f'R2 {slug}.webp 200 image/webp', c6 == 200 and ct == 'image/webp' and len(body) > 10000, f'{c6} {ct} {len(body)}B')

print('---')
print(('ALL PASS' if not fails else f'{len(fails)} FAILURES: ' + ', '.join(fails)))
