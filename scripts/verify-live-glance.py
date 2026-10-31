#!/usr/bin/env python3
"""Live probe for the First Glance merge (owner 2026-10-31: "why did you
remove the other glance? told you put the science with it") — production
checks after the push: /first-glance/ 200 with 58 fg-card tiles + 65
science tiles (123 sheets on one page), the header chip BACK on First
Glance with the 123 count and aria-current on self, six science sections
with pills/download/print per tile, manners.js shipping, word-ban clean,
zero per-card URLs in tiles; NO stale /science-at-a-glance/ links; the
1-day-old /science-at-a-glance/ URL 301s to /first-glance/; sitemap 3922
(−1, the science URL gone, zero other removals); Classes 39–40 and both
parents' shelves still 200 with their exact tiles; three R2 sheets 200."""
import time, urllib.request, sys, re

BASE = 'https://kiddo.school'
R2 = 'https://assets.kiddo.school/school/extra-classes/science-at-a-glance/'
UA = {'User-Agent': 'Mozilla/5.0 (live-probe)'}
fails = []
def ck(name, ok, extra=''):
    print(('PASS ' if ok else 'FAIL ') + name + (('  ' + str(extra)) if extra else ''))
    if not ok: fails.append(name)

def get(url, timeout=30, allow_redirects=True):
    """GET with one retry and pacing — bursting gets rate-limited at the edge."""
    last = (0, b'', '')
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, *a, **k): return None
    opener = urllib.request.build_opener() if allow_redirects else urllib.request.build_opener(NoRedirect)
    for attempt in range(3):
        time.sleep(1.6)
        try:
            with opener.open(urllib.request.Request(url, headers=UA), timeout=timeout) as r:
                return r.status, r.read(), r.headers.get('Content-Type', '')
        except urllib.error.HTTPError as e:
            last = (e.code, b'', '')
        except Exception as e:
            last = (0, b'', '')
        time.sleep(4 * (attempt + 1))
    return last

# wait for the deploy: the merged page is an UPDATE, so poll for the new 123 title
html = b''
code = 0
for i in range(40):
    code, html, _ = get(BASE + '/first-glance/')
    if code == 200 and b'123 first-picture sheets' in html:
        print(f'deploy live after ~{i*10}s')
        break
    time.sleep(10)
ck('/first-glance/ 200 with the merged page', code == 200 and b'123 first-picture sheets' in html, code)
if code != 200:
    print('DEPLOY NOT LIVE — aborting remaining checks'); sys.exit(1)

main = html.split(b'</main>')[0].decode('utf8', 'replace')
txt = html.decode('utf8', 'replace')
ck('title carries 123', 'First Glance — 123 first-picture sheets to name together' in txt)
ck('58 fg-card tiles', main.count('class="fc-card fg-card"') == 58, main.count('class="fc-card fg-card"'))
ck('65 science tiles', main.count('class="mn-card sg-card"') == 65, main.count('class="mn-card sg-card"'))
ck('science band + header', 'id="fg-science"' in main and 'Science at a Glance' in main)
ck('six science sections', all(f'id="sg-{s}"' in main for s in ['body','nature','plants','earth','space','matter']))
ck('65 age pills', main.count('fc-pill fc-pill-age">Ages 2–5') == 65)
ck('65 level pills', main.count('fc-pill fc-pill-level">Level') == 65)
ck('65 skill pills', main.count('fc-pill fc-pill-skill">') == 65)
ck('65 download buttons', main.count('download="') >= 65)
ck('65 print buttons', main.count('data-mn-print') == 65)
ck('level split 22/25/18', main.count('fc-pill fc-pill-level">Level 1 · Name it') == 22 and main.count('fc-pill fc-pill-level">Level 2 · Tell it') == 25 and main.count('fc-pill fc-pill-level">Level 3 · Ask why') == 18)
ck('header chip BACK on First Glance (aria-current)', 'class="header-fg" href="/first-glance/" aria-current="page"' in txt)
ck('chip count 123', '123 first-picture sheets · Ages 2–5' in txt)
ck('manners.js ships', '/assets/manners.js' in txt)
ck('no robotic phrases', not any(p in txt.lower() for p in ['no sign up', 'no paywall', 'free to use', 'no account', 'free forever']))
ck('no stale science links', 'href="/science-at-a-glance/"' not in txt)
# science tiles carry zero per-card URLs: every tile link is a .webp (download/open)
bad_links = [m.group(0)[:60] for m in re.finditer(r'<figure class="mn-card sg-card"[\s\S]*?</figure>', main) if re.search(r'href="(?!https://assets[^"]*\.webp)[^"]+"', m.group(0))]
ck('zero per-card URLs in science tiles', not bad_links, bad_links[:3])

# home: chip on First Glance, footer science link gone
c2, home, _ = get(BASE + '/')
ck('home 200', c2 == 200, c2)
ck('home chip on First Glance', 'class="header-fg" href="/first-glance/"' in home.decode('utf8', 'replace'))
ck('home chip count 123', '123 first-picture sheets · Ages 2–5' in home.decode('utf8', 'replace'))
ck('home footer keeps First Glance', '<a href="/first-glance/">First Glance sheets</a>' in home.decode('utf8', 'replace'))
ck('home footer science link gone', '<a href="/science-at-a-glance/">Science at a Glance sheets</a>' not in home.decode('utf8', 'replace'))

# the 1-day-old URL 301s to the merged page
c3, _, _ = get(BASE + '/science-at-a-glance/', allow_redirects=False)
ck('/science-at-a-glance/ 301', c3 == 301, c3)
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k): return None
opener = urllib.request.build_opener(NoRedirect)
try:
    with opener.open(urllib.request.Request(BASE + '/science-at-a-glance/', headers=UA), timeout=30) as r:
        loc_hdr = r.headers.get('Location', '')
except urllib.error.HTTPError as e:
    loc_hdr = e.headers.get('Location', '')
except Exception:
    loc_hdr = ''
ck('301 Location is /first-glance/', loc_hdr.rstrip('/').endswith('/first-glance'), loc_hdr)

# Classes 39/40 untouched: class pages tile with .lp-tile, parents' shelves with .mn-card
for path, n, cls in [('/staying-safe/', 19, 'lp-tile'), ('/healthy-food/', 21, 'lp-tile'), ('/flashcards/staying-safe/', 19, 'mn-card'), ('/flashcards/healthy-food/', 21, 'mn-card')]:
    c4, body, _ = get(BASE + path)
    ck(f'{path} 200 (Class 39/40 untouched)', c4 == 200, c4)
    tiles = body.split(b'</main>')[0].count(f'class="{cls}"'.encode())
    ck(f'{path} still carries {n} {cls} tiles', tiles == n, tiles)

# sitemap: 3922 locs, science URL gone, the rest intact
c5, sm, _ = get(BASE + '/sitemap.xml')
smx = sm.decode('utf8', 'replace')
locs = smx.count('<loc>')
ck('sitemap 3922 locs', locs == 3922, locs)
ck('science URL gone from sitemap', '/science-at-a-glance' not in smx)
ck('first-glance still in sitemap', '<loc>https://kiddo.school/first-glance/</loc>' in smx)
ck('staying-safe still in sitemap', '<loc>https://kiddo.school/staying-safe/</loc>' in smx)
ck('healthy-food still in sitemap', '<loc>https://kiddo.school/healthy-food/</loc>' in smx)

# R2: spot-check three sheets
for slug in ['water-cycle', 'volcano-anatomy', 'solar-system']:
    c6, body, ct = get(R2 + slug + '.webp')
    ck(f'R2 {slug}.webp 200 image/webp', c6 == 200 and ct == 'image/webp' and len(body) > 10000, f'{c6} {ct} {len(body)}B')

print('---')
print(('ALL PASS' if not fails else f'{len(fails)} FAILURES: ' + ', '.join(fails)))
