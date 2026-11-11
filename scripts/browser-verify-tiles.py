#!/usr/bin/env python3
"""Browser QA for the one-page TILE shelf (owner 2026-11-11 v2: "render them
small — there is a lot of empty — told you make horizontal — you still making
vertical"). The folded card/lesson items on the deck and class pages must
render as a horizontal grid of small tiles: picture on top, title, pills,
description and Download under the picture; teaching copy in a collapsed
details; books keep their full-width reader. Headless Chrome at 1440 + 390.
"""
import subprocess, time, os, sys
from playwright.sync_api import sync_playwright

ROOT = '/home/z/my-project/kiddo-school'
OUT = '/tmp/render-tiles'
os.makedirs(OUT, exist_ok=True)
srv = subprocess.Popen(['node', 'scripts/serve.mjs'], cwd=ROOT,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                       preexec_fn=os.setsid)
time.sleep(2)
fails = []
def ck(name, ok, extra=''):
    print(('PASS ' if ok else 'FAIL ') + name + (('  ' + str(extra)) if extra else ''))
    if not ok: fails.append(name)

BASE = 'http://localhost:4173'

def dismiss_consent(pg):
    if pg.locator('#consent-banner').count():
        try:
            pg.get_by_role('button', name='Essential only').click(timeout=3000)
        except Exception:
            pass

def no_hscroll(pg):
    return pg.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1')

PAGES = [
    ('/flashcards/colors/', 12, 'pink', 'fc2-pair'),
    ('/flashcards/transportation-and-vehicles/', 32, 'land-01', 'fc2-dual'),
    ('/preschool/4-years/sight-words/', 52, 'a', 'fcl'),
    ('/cafeteria/', 62, 'apple', 'fcl'),
]

with sync_playwright() as p:
    b = p.chromium.launch()
    for width, tag in ((1440, 'desk'), (390, 'mob')):
        pg = b.new_page(viewport={'width': width, 'height': 950})
        for url, min_tiles, anchor, shape in PAGES:
            pg.goto(BASE + url, wait_until='networkidle')
            dismiss_consent(pg)
            name = url.strip('/').replace('/', '-') or 'home'
            tiles = pg.locator('article.op-tile')
            ck(f'{tag} {name}: >= {min_tiles} tiles', tiles.count() >= min_tiles, tiles.count())
            first = tiles.first
            ck(f'{tag} {name}: media leads the tile', first.locator('.op-media img').count() >= 1)
            # the download button must sit BELOW the picture inside the tile
            order_ok = first.evaluate('''el => {
                const img = el.querySelector('.op-media img');
                const dl = el.querySelector('.item-download');
                if (!img || !dl) return 'missing';
                return dl.getBoundingClientRect().top > img.getBoundingClientRect().bottom ? 'below' : 'above';
            }''')
            ck(f'{tag} {name}: download below picture', order_ok == 'below', order_ok)
            # the tile must be narrow: a real grid column, not the old full-width block
            tw = first.evaluate('el => el.getBoundingClientRect().width')
            ck(f'{tag} {name}: tile is small', tw <= 420, f'{tw:.0f}px')
            # two tiles share a row on desktop (horizontal, not vertical)
            if width >= 1440:
                row = first.evaluate('''el => {
                    const t = el.getBoundingClientRect().top;
                    let n = 0;
                    for (const sib of el.parentElement.children) {
                        if (sib.className.includes('op-tile') && Math.abs(sib.getBoundingClientRect().top - t) < 4) n++;
                    }
                    return n;
                }''')
                ck(f'{tag} {name}: tiles share a row', row >= 3, f'{row} per row')
            # teaching copy collapsed
            more = first.locator('details.op-more')
            ck(f'{tag} {name}: details present + closed', more.count() == 1 and not more.first.evaluate('el => el.open'))
            ck(f'{tag} {name}: no horizontal scroll', no_hscroll(pg))
            if url == '/flashcards/colors/' and anchor:
                pg.evaluate('''() => {
                    const el = document.getElementById('pink');
                    const y = el.getBoundingClientRect().top + window.scrollY - 90;
                    window.scrollTo({top: y, behavior: 'instant'});
                }''')
                pg.wait_for_timeout(600)
                pg.screenshot(path=f'{OUT}/{tag}-colors.png')
            if width == 1440 and url in ('/flashcards/transportation-and-vehicles/', '/preschool/4-years/sight-words/'):
                pg.evaluate('''() => {
                    const el = document.querySelector('.one-page-items');
                    const y = el.getBoundingClientRect().top + window.scrollY + 40;
                    window.scrollTo({top: y, behavior: 'instant'});
                }''')
                pg.wait_for_timeout(600)
                pg.screenshot(path=f'{OUT}/desk' + url.replace('/', '-').rstrip('-') + '.png')
        # books keep the reader
        pg.goto(BASE + '/learning-library/', wait_until='networkidle')
        dismiss_consent(pg)
        bk = pg.locator('article.one-page-item:not(.op-tile)')
        ck(f'{tag} library: books stay full-width', bk.count() == 2, bk.count())
        ck(f'{tag} library: reader intact', pg.locator('.bk-noscript-grid').count() == 2)
        if no_hscroll(pg): ck(f'{tag} library: no horizontal scroll', True)
        else: ck(f'{tag} library: no horizontal scroll', False)
        pg.close()
    b.close()

srv.terminate()
print('\n' + ('ALL PASS' if not fails else f'{len(fails)} FAILS: ' + '; '.join(fails)))
sys.exit(1 if fails else 0)
