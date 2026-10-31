#!/usr/bin/env python3
"""Browser QA for the owner 2026-11-01 round — TWO decks:
A) CLASS 44 · Position & Direction Words: /prepositions/ (cover
   leads, four shelves, 22 tiles with four pills + word-page links +
   Download/Print) and the short pages at /prepositions/<word>/
   (word h1, verbatim labels, try-it, counter, back, prev/next, R2 image);
   LP row 44 + forty-four; inbound sections on Classes 19/33/42.
B) The Nature Club deck: 41 cards on the EXISTING /nature/ page (five
   shelves, four pills per card, Download + Print, R2 images really load),
   zero new URLs, manners.js shipping.
Headless Chrome at 1440 + 390."""
import subprocess, time, os
from playwright.sync_api import sync_playwright

ROOT = '/home/z/my-project/kiddo-school'
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

def imgs_loaded(pg, locator, n):
    # lazy images: walk the page so every card enters the viewport, then
    # POLL until all have decoded or the window closes (R2 latency from the
    # QA sandbox is the variable here — 63 remote images per run)
    pg.evaluate("""async () => {
      const step = window.innerHeight * 0.7;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 120));
      }
    }""")
    best = 0
    for _ in range(24):
        best = pg.evaluate("""(sel) => {
          const imgs = [...document.querySelectorAll(sel)].slice(0, %d);
          return imgs.filter(i => i.complete && i.naturalWidth > 0).length;
        }""" % n, locator)
        if best >= n: break
        pg.wait_for_timeout(500)
    return best

def run(pw, width):
    browser = pw.chromium.launch()
    context = browser.new_context(viewport={'width': width, 'height': 900})
    pg = context.new_page()
    console_fail = []
    pg.on('console', lambda m: console_fail.append(m.text) if m.type == 'error' and 'Failed to load resource' not in m.text and '/api/' not in m.text else None)
    tag = f'{width}'

    # --- Class 44 class page ---
    r = pg.goto(BASE + '/prepositions/', wait_until='load', timeout=30000)
    ck(f'[{tag}] /prepositions/ 200', r.status == 200, r.status)
    dismiss_consent(pg)
    ck(f'[{tag}] eyebrow CLASS 44', pg.locator('.eyebrow', has_text='CLASS 44').count() >= 1)
    ck(f'[{tag}] cover hero leads', pg.locator('.lesson-hero-cover img').count() == 1)
    tiles = pg.locator('.mn-card')
    ck(f'[{tag}] 22 tiles', tiles.count() == 22, tiles.count())
    ck(f'[{tag}] 88 pills (4 x 22)', pg.locator('.mn-card .fc-pill').count() == 88, pg.locator('.mn-card .fc-pill').count())
    # two word-page links per tile: the picture AND the "The <word> page" button
    ck(f'[{tag}] 44 word-page links (picture + button per tile)', pg.locator('.mn-card a[href^="/prepositions/"]').count() == 44, pg.locator('.mn-card a[href^="/prepositions/"]').count())
    ck(f'[{tag}] 22 download + 22 print', pg.locator('.mn-actions a[download]').count() == 22 and pg.locator('[data-mn-print]').count() == 22,
       f"{pg.locator('.mn-actions a[download]').count()}/{pg.locator('[data-mn-print]').count()}")
    for shelf in ['UP & DOWN SHELF', 'WHERE THINGS ARE SHELF', 'WAY THINGS MOVE SHELF', 'SIDES & DISTANCE SHELF']:
        ck(f'[{tag}] shelf {shelf}', pg.locator('.eyebrow', has_text=shelf).count() == 1)
    loaded = imgs_loaded(pg, '.mn-card img', 22)
    ck(f'[{tag}] R2 card images really load', loaded == 22, loaded)
    ck(f'[{tag}] links back to 19/33/42 + LP',
       pg.locator('a[href="/preschool/3-years/opposites-and-comparing/"]').count() >= 1 and
       pg.locator('a[href="/preschool/4-years/community-helpers-and-our-neighborhood/"]').count() >= 1 and
       pg.locator('a[href="/measuring-and-money/"]').count() >= 1 and
       pg.locator('.lesson-start a[href="/learning-path/"]').count() >= 1)
    body = pg.locator('main').inner_text()
    ck(f'[{tag}] word-ban clean', 'no sign up' not in body.lower() and 'no paywall' not in body.lower())
    overflow = pg.evaluate('() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1')
    ck(f'[{tag}] no horizontal overflow', not overflow)

    # --- a short page (the owner's own example: /above/) ---
    r = pg.goto(BASE + '/prepositions/above/', wait_until='load', timeout=30000)
    ck(f'[{tag}] /prepositions/above/ 200', r.status == 200, r.status)
    ck(f'[{tag}] h1 Above', pg.locator('h1').first.inner_text().strip() == 'Above')
    ck(f'[{tag}] counter CARD 1 OF 22', 'CARD 1 OF 22' in pg.locator('.eyebrow').first.inner_text())
    oncard = pg.locator('main').inner_text()
    ck(f'[{tag}] verbatim labels quoted', 'Balloon above' in oncard and 'Star above' in oncard)
    ck(f'[{tag}] try-it present (case-insensitive — the h2 renders uppercase)', 'try it today' in oncard.lower())
    ck(f'[{tag}] back to class + prev/next', pg.locator('a[href="/prepositions/"]').count() >= 1 and pg.locator('a[href="/prepositions/across/"]').count() >= 1)
    ck(f'[{tag}] download + print on the short page',
       pg.locator('a[download]').count() >= 1 and pg.locator('[data-mn-print]').count() >= 1)
    hero_img = pg.evaluate('() => { const i = document.querySelector(".fc2-hero img"); return i && i.complete && i.naturalWidth === 800 && i.naturalHeight === 1132; }')
    ck(f'[{tag}] R2 card loads at 800x1132', bool(hero_img))
    pg.close(); context.close(); browser.close()

def run_nature(pw, width):
    browser = pw.chromium.launch()
    context = browser.new_context(viewport={'width': width, 'height': 900})
    pg = context.new_page()
    tag = f'{width}-nature'
    r = pg.goto(BASE + '/nature/', wait_until='load', timeout=30000)
    ck(f'[{tag}] /nature/ 200', r.status == 200, r.status)
    dismiss_consent(pg)
    ck(f'[{tag}] shelf family leads with 41', pg.locator('.eyebrow', has_text='THE NATURE CLUB SHELF · 41 FLASHCARDS').count() == 1)
    tiles = pg.locator('.mn-card')
    ck(f'[{tag}] 41 tiles', tiles.count() == 41, tiles.count())
    ck(f'[{tag}] 164 pills (4 x 41)', pg.locator('.mn-card .fc-pill').count() == 164, pg.locator('.mn-card .fc-pill').count())
    ck(f'[{tag}] 41 download + 41 print', pg.locator('.mn-actions a[download]').count() == 41 and pg.locator('[data-mn-print]').count() == 41,
       f"{pg.locator('.mn-actions a[download]').count()}/{pg.locator('[data-mn-print]').count()}")
    for shelf in ['PLANT SHELF', 'ANIMAL SHELF', 'BUG SHELF', 'SKY & WEATHER SHELF', 'WILD PLACES SHELF']:
        ck(f'[{tag}] shelf {shelf}', pg.locator('.eyebrow', has_text=shelf).count() == 1)
    loaded = imgs_loaded(pg, '.mn-card img', 41)
    ck(f'[{tag}] R2 images load (41/41)', loaded == 41, loaded)
    ck(f'[{tag}] manners.js ships', pg.evaluate('() => [...document.querySelectorAll("script")].some(s => (s.src||"").includes("manners.js"))'))
    overflow = pg.evaluate('() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1')
    ck(f'[{tag}] no horizontal overflow', not overflow)
    pg.close(); context.close(); browser.close()

with sync_playwright() as pw:
    try:
        run(pw, 1440)
        run(pw, 390)
        run_nature(pw, 1440)
    finally:
        try: os.killpg(os.getpgid(srv.pid), 15)
        except Exception: pass

print(f"\n{len(fails)} fails" + ((': ' + ', '.join(fails)) if fails else ''))
raise SystemExit(1 if fails else 0)
