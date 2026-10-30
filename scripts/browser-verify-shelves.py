#!/usr/bin/env python3
"""Browser QA for the parents' shelves round (owner 2026-10-31):
/flashcards/staying-safe/ + /flashcards/healthy-food/ — image + description +
age/subject/level pill + Download/Print under every card, zero per-card URLs,
the tone split (shelf = parents), the library wall cards, and the two class
pages' new library links. Headless Chrome at 1440 + 390."""
import subprocess, time, os
from playwright.sync_api import sync_playwright

ROOT = '/home/z/my-project/kiddo-school'
OUT = '/home/z/my-project/kiddo-school/scripts/manners-tmp/shelves'
os.makedirs(OUT, exist_ok=True)
srv = subprocess.Popen(['node', 'scripts/serve.mjs'], cwd=ROOT,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                       preexec_fn=os.setsid)
time.sleep(2)
fails = []
def ck(name, ok, extra=''):
    print(('PASS ' if ok else 'FAIL ') + name + (('  ' + str(extra)) if extra else ''))
    if not ok: fails.append(name)

SHELVES = [
    ('/flashcards/staying-safe/', 19, 'Staying Safe', '/staying-safe/'),
    ('/flashcards/healthy-food/', 21, 'Healthy Food', '/healthy-food/'),
]

with sync_playwright() as p:
    b = p.chromium.launch()
    for w, label in [(1440, 'desktop'), (390, 'mobile')]:
        pg = b.new_page(viewport={'width': w, 'height': 950})
        for url, n, name, class_url in SHELVES:
            pg.goto('http://localhost:4173' + url, wait_until='load')
            pg.wait_for_timeout(500)
            ck(f'[{label}] {name} shelf: h1 names the parent shelf',
               'parent shelf' in pg.locator('h1').first.inner_text())
            tiles = pg.locator('.mn-card')
            ck(f'[{label}] {name} shelf: {n} tiles', tiles.count() == n, tiles.count())
            ck(f'[{label}] {name} shelf: {n} images with download attr',
               pg.locator(f'.mn-card a[download]').count() == n)
            ck(f'[{label}] {name} shelf: {n} print buttons',
               pg.locator('.mn-card [data-mn-print]').count() == n)
            # three pills per tile: age + subject + level
            pills = pg.evaluate('''() => Array.from(document.querySelectorAll('.mn-card')).map(c => ({
                age: !!c.querySelector('.fc-pill-age'),
                subject: !!c.querySelector('.fc-pill-subject'),
                level: !!c.querySelector('.fc-pill-level'),
                tip: !!c.querySelector('.mn-tip'),
                link: c.querySelector('a.fc2-cardlink, a.lp-tile')  // tiles must NOT be per-card links
            }))''')
            ck(f'[{label}] {name} shelf: every tile has age+subject+level pills and a tip',
               all(x['age'] and x['subject'] and x['level'] and x['tip'] for x in pills))
            ck(f'[{label}] {name} shelf: zero per-card links on tiles (no thin pages)',
               all(not x['link'] for x in pills))
            # images load at 800×1131
            imgs_ok = pg.evaluate('''async () => {
              const imgs = Array.from(document.querySelectorAll('.mn-card img'));
              for (let y = 0; y <= document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
              await Promise.all(imgs.map(i => i.complete ? null : new Promise(r => { i.addEventListener('load', r, {once:true}); i.addEventListener('error', r, {once:true}); setTimeout(r, 5000); })));
              return imgs.every(i => i.complete && i.naturalWidth > 0);
            }''')
            ck(f'[{label}] {name} shelf: all {n} card images load', imgs_ok)
            # print isolation (manners precedent): classes clean after the print
            pg.locator('.mn-card [data-mn-print]').first.click()
            pg.wait_for_timeout(300)
            cleaned = pg.evaluate("!document.body.classList.contains('mn-printing')")
            pg.wait_for_timeout(2000)
            cleaned = cleaned and pg.evaluate("!document.body.classList.contains('mn-printing')")
            ck(f'[{label}] {name} shelf: print handler ran and cleaned up', cleaned)
            # download href serves the real R2 file (spot check first tile)
            dl = pg.locator('.mn-card a[download]').first
            href = dl.get_attribute('href')
            ck(f'[{label}] {name} shelf: download href is the full-size R2 webp',
               href and href.startswith('https://assets.kiddo.school/school/learning-path/') and href.endswith('.webp'), href)
            # level legend
            ck(f'[{label}] {name} shelf: the three levels legend', pg.locator('.fc-steps li').count() == 3)
            # back door to the class + sibling shelf
            ck(f'[{label}] {name} shelf: links to the class lesson', pg.locator(f'a[href="{class_url}"]').count() > 0)
            # tone: shelf speaks to parents
            body_txt = pg.locator('main').inner_text()
            ck(f'[{label}] {name} shelf: parent voice (your child / print)', 'your child' in body_txt and 'print' in body_txt.lower())
            # no overflow
            hscroll = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
            ck(f'[{label}] {name} shelf: no horizontal overflow', hscroll <= 0, hscroll)
            pg.screenshot(path=f'{OUT}/{name.lower().replace(" ","-")}-{label}.png', full_page=False)
            # the class page links back to this shelf
            pg.goto('http://localhost:4173' + class_url, wait_until='load')
            pg.wait_for_timeout(400)
            ck(f'[{label}] {name} class page links to its parents\u2019 shelf',
               pg.locator(f'a[href="{url}"]').count() > 0)
        # --- the library wall carries both new wall cards ---
        pg.goto('http://localhost:4173/flashcards/', wait_until='load')
        pg.wait_for_timeout(500)
        ck(f'[{label}] library wall: 63 sets counted',
           'Showing all 63 sets' in pg.locator('[data-filter-count]').first.inner_text())
        for url, n, name, _ in SHELVES:
            card = pg.locator(f'a.fc-setcard[href="{url}"]')
            ck(f'[{label}] library wall: {name} wall card', card.count() == 1)
            txt = card.inner_text() if card.count() else ''
            ck(f'[{label}] library wall: {name} card says Open this set · {n} cards', f'{n} cards' in txt, txt[:60])
            ck(f'[{label}] library wall: {name} blurb mentions no card pages', 'no card pages' in txt)
        pg.screenshot(path=f'{OUT}/wall-{label}.png', full_page=False)
    b.close()

srv.terminate()
print(('ALL PASS' if not fails else f'{len(fails)} FAILURES: ' + ', '.join(fails)))
raise SystemExit(0 if not fails else 1)
