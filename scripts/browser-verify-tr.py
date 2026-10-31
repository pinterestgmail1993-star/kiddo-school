#!/usr/bin/env python3
"""Browser QA for the one-page round (owner 2026-10-31): the Class 41
/ time-and-daily-routine/ class page carries the WHOLE 41-card deck (five
shelves, four pills per card, Download + Print under every image, kid-voice
descriptions) with ZERO per-card pages; Class 42 /measuring-and-money/ does
the same for its 28-card deck; the 53-card science-lab shelf lives on
/science/ with the Ask-a-grown-up / SOS badges; the float-to-top button, the
both-glances header, the LP row 42 and the FG pointers. Headless Chrome at
1440 + 390."""
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

def dismiss_consent(pg):
    if pg.locator('#consent-banner').count():
        try:
            pg.get_by_role('button', name='Essential only').click(timeout=3000)
            pg.wait_for_timeout(300)
        except Exception:
            pass

def check_deck_page(pg, label, path, title_prefix, n_cards, shelves, eyebrow):
    r = pg.goto(BASE + path, wait_until='load', timeout=30000)
    ck(f'[{label}] {path} 200', r.status == 200, r.status)
    if title_prefix: ck(f'[{label}] title', pg.title().startswith(title_prefix), pg.title()[:60])
    dismiss_consent(pg)
    ck(f'[{label}] cover hero', pg.locator('.lesson-hero-cover img').count() == 1)
    tiles = pg.locator('figure.mn-card')
    ck(f'[{label}] {n_cards} card tiles', tiles.count() == n_cards, tiles.count())
    ck(f'[{label}] shelf eyebrows', pg.locator('span.eyebrow:has-text("SHELF")').count() == shelves,
       pg.locator('span.eyebrow:has-text("SHELF")').count())
    ck(f'[{label}] pills x4 per card', pg.locator('.mn-card .fc-pill-age').count() == n_cards
       and pg.locator('.mn-card .fc-pill-level').count() == n_cards
       and pg.locator('.mn-card .fc-pill-skill').count() == n_cards
       and pg.locator('.mn-card .fc-pill-subject').count() == n_cards)
    ck(f'[{label}] download + print under every image', pg.locator('.mn-card a[download]').count() == n_cards
       and pg.locator('.mn-card [data-mn-print]').count() == n_cards)
    ck(f'[{label}] eyebrow', pg.locator(f'span.eyebrow:has-text("{eyebrow}")').count() >= 1)
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
    loaded = pg.evaluate('[...document.querySelectorAll("figure.mn-card img")].filter(i => i.naturalWidth > 0).length')
    ck(f'[{label}] all {n_cards} card images load from R2', loaded == n_cards, f'{loaded}/{n_cards}')
    return pg

with sync_playwright() as p:
    b = p.chromium.launch()
    for w, label in [(1440, 'desktop'), (390, 'mobile')]:
        pg = b.new_page(viewport={'width': w, 'height': 950})
        # Class 41 — the one-page deck, zero per-card pages
        pg = check_deck_page(pg, label, '/time-and-daily-routine/', 'Class 41 · Time & Daily Routine', 41, 5, 'MY-DAY SHELF')
        ck(f'[{label}] kid-voice descriptions present', pg.locator('.mn-card .mn-tip').count() == 41)
        # the old short-page URL 301s to the class page (node serve serves dist; check _redirects intent via direct nav)
        r = pg.goto(BASE + '/time-and-daily-routine/morning-routine/', wait_until='load')
        ck(f'[{label}] removed short page is gone (404 from static dist)', r.status == 404, r.status)
        # parents' shelf
        sh = b.new_page(viewport={'width': w, 'height': 950})
        r = sh.goto(BASE + '/flashcards/time-and-daily-routine/', wait_until='load')
        ck(f'[{label}] shelf 200', r.status == 200)
        cards = sh.locator('figure.mn-card')
        ck(f'[{label}] 41 shelf cards', cards.count() == 41, cards.count())
        ck(f'[{label}] pills x4 per shelf card', sh.locator('.mn-card .fc-pill-age').count() == 41 and sh.locator('.mn-card .fc-pill-level').count() == 41 and sh.locator('.mn-card .fc-pill-skill').count() == 41)
        ck(f'[{label}] download + print under every shelf image', sh.locator('.mn-card a[download]').count() == 41 and sh.locator('.mn-card [data-mn-print]').count() == 41)
        sh.close()
        # Class 42 — the one-page deck
        pg = check_deck_page(pg, label, '/measuring-and-money/', 'Measuring & Money Flashcards', 28, 5, 'COUNT & ADD SHELF')
        # Science Lab shelf on /science/
        sci = b.new_page(viewport={'width': w, 'height': 950})
        r = sci.goto(BASE + '/science/', wait_until='load')
        ck(f'[{label}] science lab 200', r.status == 200)
        dismiss_consent(sci)
        cards = sci.locator('figure.mn-card')
        ck(f'[{label}] 53 lab cards on /science/', cards.count() == 53, cards.count())
        ck(f'[{label}] age pills on the lab deck', sci.locator('.mn-card .fc-pill-age:has-text("Ages 4–8")').count() == 53)
        ck(f'[{label}] grown-up badges', sci.locator('.mn-card .mn-grownup').count() == 9, sci.locator('.mn-card .mn-grownup').count())
        ck(f'[{label}] SOS variant', sci.locator('.mn-card .mn-grownup.mn-sos').count() == 1)
        ck(f'[{label}] download + print under every lab image', sci.locator('.mn-card a[download]').count() == 53 and sci.locator('.mn-card [data-mn-print]').count() == 53)
        ov = sci.evaluate('document.scrollingElement.scrollWidth - window.innerWidth')
        ck(f'[{label}] lab no horizontal overflow', ov <= 1, ov)
        sci.close()
        pg.close()

    # header both chips + LP row 42 + FG pointers (desktop)
    pg = b.new_page(viewport={'width': 1440, 'height': 950})
    pg.goto(BASE + '/', wait_until='load')
    ck('[home] both header chips', pg.locator('a.header-fg').count() == 2, pg.locator('a.header-fg').count())
    ck('[home] First Glance chip 58', pg.locator('.header-fg[href="/first-glance/"] .header-fg-sub').inner_text().startswith('58'))
    ck('[home] Science chip 65', pg.locator('.header-fg[href="/science-at-a-glance/"] .header-fg-sub').inner_text().startswith('65'))
    lp = b.new_page(viewport={'width': 1440, 'height': 950})
    lp.goto(BASE + '/learning-path/', wait_until='load')
    ck('[lp] row 42', lp.locator('.lp-marker:has-text("42")').count() == 1)
    ck('[lp] Class 42 row links the class', lp.locator('a[href="/measuring-and-money/"]').count() >= 1)
    ck('[lp] row 41 stays', lp.locator('a[href="/time-and-daily-routine/"]').count() >= 1)
    ck('[lp] Dinosaurs row', lp.locator('a[href="/dinosaurs/"]').count() >= 1)
    fg = b.new_page(viewport={'width': 1440, 'height': 950})
    fg.goto(BASE + '/first-glance/', wait_until='load')
    ck('[fg] two Class-41 pointers', fg.locator('.fg-more[href="/time-and-daily-routine/"]').count() == 2, fg.locator('.fg-more[href="/time-and-daily-routine/"]').count())
    pg.screenshot(path=OUT + '/onepage-home-header.png')
    lp.screenshot(path=OUT + '/onepage-lp.png')
    b.close()
srv.terminate()
print('---')
print('FAILS:', len(fails), fails)
