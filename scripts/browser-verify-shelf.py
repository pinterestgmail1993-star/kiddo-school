#!/usr/bin/env python3
"""Browser QA for /flashcards/manners/ (the parents' shelf) + /manners/ anchor removal.
Serves dist/ locally, checks layout + controls in headless Chrome, saves screenshots."""
import subprocess, time, sys, os, signal
from playwright.sync_api import sync_playwright

ROOT = '/home/z/my-project/kiddo-school'
OUT = '/home/z/my-project/kiddo-school/scripts/manners-tmp'
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
            # --- the parents' shelf ---
            pg.goto('http://localhost:4173/flashcards/manners/', wait_until='load')
            pg.wait_for_timeout(700)
            ck(f'[{label}] shelf h1 is the parent shelf', 'parent shelf' in pg.title().lower() or pg.locator('h1').first.inner_text().lower().find('parent shelf') > -1)
            ck(f'[{label}] shelf has 32 tiles', pg.locator('.mn-card').count() == 32)
            ck(f'[{label}] shelf has 32 download buttons', pg.locator('.mn-card a.button[download]').count() == 32)
            ck(f'[{label}] shelf has 32 print buttons', pg.locator('.mn-card button[data-mn-print]').count() == 32)
            ck(f'[{label}] shelf links the class', pg.locator('a[href="/manners/"]').count() > 0)
            ck(f'[{label}] shelf has NO jump links (beyond skip)', pg.eval_on_selector_all('a[href^="#"]', 'els => els.filter(e => e.getAttribute("href") !== "#main").length') == 0)
            ck(f'[{label}] shelf mounts feedback', pg.locator('[data-fc-root]').count() > 0)
            hscroll = pg.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth')
            ck(f'[{label}] shelf no horizontal overflow', not hscroll)
            # print isolation actually toggles (stub window.print so the
            # class survives until the 2s backup cleanup — deterministic)
            pg.evaluate('window.print = function(){};')
            pg.locator('.mn-card button[data-mn-print]').first.click()
            ck(f'[{label}] print handler toggles body.mn-printing', pg.evaluate('document.body.classList.contains("mn-printing")'))
            pg.wait_for_timeout(2300)
            ck(f'[{label}] print handler cleans up', pg.evaluate('!document.body.classList.contains("mn-printing") && !document.querySelector(".mn-print-card")'))
            if label == 'desktop':
                pg.screenshot(path=OUT + '/shelf-top.png')
                pg.locator('.mn-cards').scroll_into_view_if_needed()
                pg.wait_for_timeout(400)
                pg.screenshot(path=OUT + '/shelf-cards.png')
            pg.close()
            # --- the class page: anchor gone ---
            pg = b.new_page(viewport={'width': w, 'height': 950})
            pg.goto('http://localhost:4173/manners/', wait_until='load')
            ck(f'[{label}] class page has no #the-cards button', pg.locator('a[href="#the-cards"]').count() == 0)
            ck(f'[{label}] class page links the parents shelf', pg.locator('a[href="/flashcards/manners/"]').count() > 0)
            if label == 'desktop':
                pg.screenshot(path=OUT + '/class-top.png')
            pg.close()
        b.close()
finally:
    os.killpg(os.getpgid(srv.pid), signal.SIGTERM)

print()
if fails:
    print('FAILED: ' + ', '.join(fails)); sys.exit(1)
print('ALL BROWSER CHECKS PASSED')
