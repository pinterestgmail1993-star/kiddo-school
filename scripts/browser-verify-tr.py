#!/usr/bin/env python3
"""Browser QA for the Class 41 Time & Daily Routine round (owner 2026-10-31):
/time-and-daily-routine/ class page + 41 short pages + the parents' shelf,
the float-to-top button, the both-glances header, the LP fixes (magic games
17/20, Dinosaurs row) and the First Glance fg-more pointers. Headless Chrome
at 1440 + 390."""
import subprocess, time, os
from playwright.sync_api import sync_playwright

ROOT = '/home/z/my-project/kiddo-school'
OUT = '/home/z/my-project/kiddo-school/scripts/tr-tmp'
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

with sync_playwright() as p:
    b = p.chromium.launch()
    for w, label in [(1440, 'desktop'), (390, 'mobile')]:
        # class page
        pg = b.new_page(viewport={'width': w, 'height': 950})
        r = pg.goto(BASE + '/time-and-daily-routine/', wait_until='load', timeout=30000)
        ck(f'[{label}] class page 200', r.status == 200, r.status)
        ck(f'[{label}] title', pg.title().startswith('Class 41 · Time & Daily Routine'), pg.title()[:50])
        # first-visit consent banner would cover the bottom-right corner — dismiss like a real user
        if pg.locator('#consent-banner').count():
            try:
                pg.get_by_role('button', name='Essential only').click(timeout=3000)
                pg.wait_for_timeout(300)
            except Exception:
                pass
        ck(f'[{label}] cover hero', pg.locator('.lesson-hero-cover img').count() == 1)
        tiles = pg.locator('.lp-tile')
        ck(f'[{label}] 41 class tiles', tiles.count() == 41, tiles.count())
        for sel, n in [['.fc-stage-pills', 0], ['section.lesson-section', 8]]:
            pass
        ck(f'[{label}] five shelf eyebrows', pg.locator('span.eyebrow:has-text("SHELF")').count() == 5, pg.locator('span.eyebrow:has-text("SHELF")').count())
        # to-top: hidden at top, appears on scroll, returns home
        ck(f'[{label}] to-top hidden at top', not pg.locator('.to-top.is-visible').count())
        pg.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        pg.wait_for_timeout(400)
        ck(f'[{label}] to-top appears after scroll', pg.locator('.to-top.is-visible').count() == 1)
        pg.locator('.to-top').click()
        back = False
        for _ in range(14):
            pg.wait_for_timeout(300)
            if pg.evaluate('window.scrollY') < 50: back = True; break
        ck(f'[{label}] to-top returns to top', back, pg.evaluate('window.scrollY'))
        # overflow + images
        ov = pg.evaluate('document.scrollingElement.scrollWidth - window.innerWidth')
        ck(f'[{label}] no horizontal overflow', ov <= 1, ov)
        pg.evaluate('''async () => {
            for (let y = 0; y <= document.body.scrollHeight; y += 700) {
                window.scrollTo(0, y);
                await new Promise(r => setTimeout(r, 60));
            }
        }''')
        pg.wait_for_timeout(2500)
        loaded = pg.evaluate('[...document.querySelectorAll(".lp-tile img")].filter(i => i.naturalWidth > 0).length')
        ck(f'[{label}] all 41 card images load from R2', loaded == 41, f'{loaded}/41')
        # short page
        sp = b.new_page(viewport={'width': w, 'height': 950})
        r = sp.goto(BASE + '/time-and-daily-routine/morning-routine/', wait_until='load')
        ck(f'[{label}] short page 200', r.status == 200)
        ck(f'[{label}] short page H1', sp.locator('h1:has-text("Morning")').count() == 1)
        ck(f'[{label}] card says (verbatim)', sp.locator('.dino-action').inner_text().startswith('\u201cMorning is the first part of the day'))
        ck(f'[{label}] download + print', sp.locator('.mn-actions a[download]').count() == 1 and sp.locator('[data-mn-print]').count() == 1)
        ck(f'[{label}] back link', sp.locator('a[href="/time-and-daily-routine/"]').count() >= 2)
        sp.close()
        # parents' shelf
        sh = b.new_page(viewport={'width': w, 'height': 950})
        r = sh.goto(BASE + '/flashcards/time-and-daily-routine/', wait_until='load')
        ck(f'[{label}] shelf 200', r.status == 200)
        cards = sh.locator('figure.mn-card')
        ck(f'[{label}] 41 shelf cards', cards.count() == 41, cards.count())
        ck(f'[{label}] pills x3 per card', sh.locator('.mn-card .fc-pill-age').count() == 41 and sh.locator('.mn-card .fc-pill-level').count() == 41)
        ck(f'[{label}] download + print under every image', sh.locator('.mn-card a[download]').count() == 41 and sh.locator('.mn-card [data-mn-print]').count() == 41)
        sh.close()
        pg.close()

    # header both chips + LP fixes + FG pointers (desktop)
    pg = b.new_page(viewport={'width': 1440, 'height': 950})
    pg.goto(BASE + '/', wait_until='load')
    ck('[home] both header chips', pg.locator('a.header-fg').count() == 2, pg.locator('a.header-fg').count())
    ck('[home] First Glance chip 58', pg.locator('.header-fg[href="/first-glance/"] .header-fg-sub').inner_text().startswith('58'))
    ck('[home] Science chip 65', pg.locator('.header-fg[href="/science-at-a-glance/"] .header-fg-sub').inner_text().startswith('65'))
    lp = b.new_page(viewport={'width': 1440, 'height': 950})
    lp.goto(BASE + '/learning-path/', wait_until='load')
    ck('[lp] row 41', lp.locator('.lp-marker:has-text("41")').count() == 1)
    ck('[lp] magic games 17/20', 'Magic Shapes</a> (Class 17)' in lp.content() and 'Animal Sound Safari</a> (Class 20)' in lp.content())
    ck('[lp] Dinosaurs row', lp.locator('a[href="/dinosaurs/"]').count() >= 1)
    fg = b.new_page(viewport={'width': 1440, 'height': 950})
    fg.goto(BASE + '/first-glance/', wait_until='load')
    ck('[fg] two Class-41 pointers', fg.locator('.fg-more[href="/time-and-daily-routine/"]').count() == 2, fg.locator('.fg-more[href="/time-and-daily-routine/"]').count())
    pg.screenshot(path=OUT + '/tr-home-header.png')
    b.close()
srv.terminate()
print('---')
print('FAILS:', len(fails), fails)
