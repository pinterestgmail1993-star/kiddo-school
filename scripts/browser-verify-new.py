#!/usr/bin/env python3
"""Browser QA for the 2026-10-30 round: /school-hall/, /halloween/,
/question-words/, /sequence-stories/ (+ /eid/ spot check). Serves dist/,
checks layout, tiles, print isolation, the Ask-a-grown-up badge, image
loading and overflow at desktop + mobile; saves screenshots."""
import subprocess, time, os, signal
from playwright.sync_api import sync_playwright

ROOT = '/home/z/my-project/kiddo-school'
OUT = '/home/z/my-project/kiddo-school/scripts/manners-tmp/shots'
os.makedirs(OUT, exist_ok=True)
srv = subprocess.Popen(['node', 'scripts/serve.mjs'], cwd=ROOT,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                       preexec_fn=os.setsid)
time.sleep(2)
fails = []
def ck(name, ok):
    print(('PASS ' if ok else 'FAIL ') + name)
    if not ok: fails.append(name)

try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for w, label in [(1440, 'desktop'), (390, 'mobile')]:
            pg = b.new_page(viewport={'width': w, 'height': 950})
            # --- the Hall hub ---
            pg.goto('http://localhost:4173/school-hall/', wait_until='load')
            pg.wait_for_timeout(500)
            ck(f'[{label}] hall h1 is the Hall', 'School Hall' in pg.locator('h1').first.inner_text())
            ck(f'[{label}] hall calendar has 5 days', pg.locator('.hall-day').count() == 5)
            first = pg.locator('.hall-day').first.inner_text()
            ck(f'[{label}] hall first day is Halloween, flagged next', 'halloween' in first.lower() and 'coming up next' in first.lower())
            order = pg.eval_on_selector_all('.hall-day a.hall-what', 'els=>els.map(e=>e.textContent)')
            ck(f'[{label}] hall calendar order', order == ['Halloween','Thanksgiving','Christmas','Valentine\u2019s Day','Eid'])
            ck(f'[{label}] hall no overflow', not pg.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth'))
            pg.screenshot(path=f'{OUT}/hall-{label}.png')
            # --- halloween ---
            pg.goto('http://localhost:4173/halloween/', wait_until='load')
            pg.wait_for_timeout(900)
            ck(f'[{label}] halloween h1', 'Halloween' in pg.locator('h1').first.inner_text())
            ck(f'[{label}] halloween 34 tiles', pg.locator('.mn-card').count() == 34)
            ck(f'[{label}] halloween 34 downloads', pg.locator('.mn-card a.button[download]').count() == 34)
            ck(f'[{label}] halloween 34 prints', pg.locator('.mn-card button[data-mn-print]').count() == 34)
            loaded = pg.evaluate('document.querySelector(".mn-card img").naturalWidth')
            ck(f'[{label}] halloween first card image loads from R2', loaded == 800)
            ck(f'[{label}] halloween no overflow', not pg.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth'))
            pg.screenshot(path=f'{OUT}/halloween-{label}.png')
            # print isolation on a card (stub print for determinism)
            pg.evaluate('window.print = function(){};')
            pg.locator('.mn-card button[data-mn-print]').first.click()
            ck(f'[{label}] halloween print toggles body.mn-printing', pg.evaluate('document.body.classList.contains("mn-printing")'))
            pg.wait_for_timeout(2300)
            ck(f'[{label}] halloween print classes clean up', pg.evaluate('!document.body.classList.contains("mn-printing")'))
            # --- question-words ---
            pg.goto('http://localhost:4173/question-words/', wait_until='load')
            pg.wait_for_timeout(700)
            ck(f'[{label}] qw 16 tiles', pg.locator('.mn-card').count() == 16)
            first_word = pg.locator('.mn-card strong').first.inner_text()
            ck(f'[{label}] qw first tile is Who?', first_word == 'Who?')
            ck(f'[{label}] qw no grown badge', pg.locator('.mn-grownup').count() == 0)
            ck(f'[{label}] qw no overflow', not pg.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth'))
            pg.screenshot(path=f'{OUT}/qw-{label}.png')
            # --- sequence-stories ---
            pg.goto('http://localhost:4173/sequence-stories/', wait_until='load')
            pg.wait_for_timeout(700)
            ck(f'[{label}] ss 24 tiles', pg.locator('.mn-card').count() == 24)
            ck(f'[{label}] ss exactly 2 grown badges', pg.locator('.mn-grownup').count() == 2)
            badge_cards = pg.eval_on_selector_all('.mn-card', '''els=>els.filter(e=>e.querySelector(".mn-grownup"))
                .map(e=>e.querySelector("img").getAttribute("src"))''')
            ck(f'[{label}] ss badges on make-lemonade + make-toast', all('make-lemonade' in s or 'make-toast' in s for s in badge_cards) and len(badge_cards)==2)
            ck(f'[{label}] ss badge visible', pg.locator('.mn-grownup').first.is_visible())
            ck(f'[{label}] ss no overflow', not pg.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth'))
            pg.screenshot(path=f'{OUT}/ss-{label}.png')
            # print make-toast: badge stays in the print snapshot
            pg.evaluate('window.print = function(){};')
            toast_btn = pg.locator('.mn-card', has=pg.locator('img[src*="make-toast"]')).locator('button[data-mn-print]')
            toast_btn.click()
            printing_card = pg.evaluate('document.querySelector(".mn-print-card img").getAttribute("src")')
            badge_in = pg.evaluate('document.querySelector(".mn-print-card").textContent.includes("Ask a grown-up")')
            ck(f'[{label}] ss print isolates make-toast', 'make-toast' in printing_card)
            ck(f'[{label}] ss badge rides into the print snapshot', badge_in)
            pg.wait_for_timeout(2300)
            # --- eid spot check ---
            pg.goto('http://localhost:4173/eid/', wait_until='load')
            pg.wait_for_timeout(400)
            ck(f'[{label}] eid h1', 'Eid' in pg.locator('h1').first.inner_text())
            ck(f'[{label}] eid links back to the Hall', pg.locator('a[href="/school-hall/"]').count() > 0)
            ck(f'[{label}] eid no overflow', not pg.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth'))
            pg.screenshot(path=f'{OUT}/eid-{label}.png')
            pg.close()
        b.close()
finally:
    os.killpg(os.getpgid(srv.pid), signal.SIGTERM)

print('\n== %d checks failed ==' % len(fails))
for f in fails: print('  -', f)
exit(1 if fails else 0)
