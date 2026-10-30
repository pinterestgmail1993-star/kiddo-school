#!/usr/bin/env python3
"""Browser QA for the Class 40 round on the merged base: /healthy-food/ (+ a
short page with print isolation), the remote Class 39 /staying-safe/ still
rendering its own structure, both inbound sections on Class 32, the Class 22
+ Cafeteria inbounds, and the LP sequence 1..40. Desktop 1440 + mobile 390."""
import subprocess, time, os, signal
from playwright.sync_api import sync_playwright

ROOT = '/home/z/my-project/kiddo-school'
OUT = '/home/z/my-project/kiddo-school/scripts/manners-tmp/shots40'
os.makedirs(OUT, exist_ok=True)
srv = subprocess.Popen(['node', 'scripts/serve.mjs'], cwd=ROOT,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                       preexec_fn=os.setsid)
time.sleep(2)
fails = []
def ck(name, ok):
    print(('PASS ' if ok else 'FAIL ') + name)
    if not ok: fails.append(name)

def scroll_all(pg):
    pg.evaluate('''async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 420) {
        window.scrollTo(0, y); await new Promise(r => setTimeout(r, 160));
      }
      window.scrollTo(0, 0);
    }''')

def wait_images(pg, sel, want=800, tries=14):
    for _ in range(tries):
        if pg.evaluate(f'''() => [...document.querySelectorAll('{sel}')].every(i => i.naturalWidth === {want})'''): return True
        pg.wait_for_timeout(700)
    return False

try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for w, label in [(1440, 'desktop'), (390, 'mobile')]:
            # --- Class 40 · Healthy Food ---
            pg = b.new_page(viewport={'width': w, 'height': 950})
            pg.goto('http://localhost:4173/healthy-food/', wait_until='load')
            pg.wait_for_timeout(700)
            ck(f'[{label}] c40 h1', 'Healthy Food' in pg.locator('h1').first.inner_text())
            ck(f'[{label}] c40 21 shelf tiles', pg.locator('a.lp-tile').count() == 21)
            scroll_all(pg)
            pg.wait_for_timeout(600)
            ck(f'[{label}] c40 cover loads from R2', pg.evaluate('document.querySelector(".lesson-cover img").naturalWidth') == 800)
            ck(f'[{label}] c40 all 21 tiles load', wait_images(pg, 'a.lp-tile img'))
            ck(f'[{label}] c40 no overflow', not pg.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth'))
            pg.screenshot(path=f'{OUT}/hf-class-{label}.png')
            pg.goto('http://localhost:4173/healthy-food/try-new-foods/', wait_until='load')
            pg.wait_for_timeout(700)
            ck(f'[{label}] c40 short h1', 'Try New Foods' in pg.locator('h1').first.inner_text())
            learn = pg.locator('.fc2-learn').inner_text().lower()
            ck(f'[{label}] c40 short habit + tonight', 'i am brave enough to try' in learn and 'try it tonight' in learn)
            ck(f'[{label}] c40 short download+print', pg.locator('.fc2-hero a.button[download]').count() == 1 and pg.locator('.fc2-hero button[data-mn-print]').count() == 1)
            pg.evaluate('window.print = function(){};')
            pg.locator('.fc2-hero button[data-mn-print]').first.click()
            pg.wait_for_timeout(200)
            ck(f'[{label}] c40 print isolation toggles', pg.evaluate('document.body.classList.contains("mn-printing")'))
            pg.wait_for_timeout(2200)
            ck(f'[{label}] c40 print isolation cleans', pg.evaluate('!document.body.classList.contains("mn-printing")'))
            pg.screenshot(path=f'{OUT}/hf-short-{label}.png')
            # inbounds
            pg.goto('http://localhost:4173/preschool/3-years/fruits-and-vegetables/', wait_until='load')
            ck(f'[{label}] c40 inbound from Class 22', pg.locator('a[href="/healthy-food/"]').count() >= 1)
            pg.goto('http://localhost:4173/preschool/4-years/life-skills-and-good-habits/', wait_until='load')
            both = pg.locator('a[href="/healthy-food/"]').count() >= 1 and pg.locator('a[href="/staying-safe/"]').count() >= 1
            ck(f'[{label}] Class 32 carries BOTH Class 39 and Class 40 sections', both)
            pg.goto('http://localhost:4173/cafeteria/', wait_until='load')
            ck(f'[{label}] c40 inbound from the Cafeteria room', pg.locator('a[href="/healthy-food/"]').count() >= 1)
            # --- the remote Class 39 still renders its own structure ---
            pg.goto('http://localhost:4173/staying-safe/', wait_until='load')
            pg.wait_for_timeout(700)
            ck(f'[{label}] c39 (remote) h1', 'Staying Safe' in pg.locator('h1').first.inner_text())
            ck(f'[{label}] c39 (remote) 19 tiles', pg.locator('a.lp-tile').count() == 19)
            scroll_all(pg)
            pg.wait_for_timeout(500)
            ck(f'[{label}] c39 (remote) all tiles load', wait_images(pg, 'a.lp-tile img'))
            ck(f'[{label}] c39 (remote) no overflow', not pg.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth'))
            # --- LP sequence 1..40 ---
            pg.goto('http://localhost:4173/learning-path/', wait_until='load')
            rows = pg.locator('p.lp-class').all_inner_texts()
            nums = [int(r.split(':')[0].replace('Class','').strip()) for r in rows if r.strip().startswith('Class') and ':' in r]
            ck(f'[{label}] LP sequence 1..40 in order', nums == list(range(1, 41)))
            pg.close()
        b.close()
finally:
    os.killpg(os.getpgid(srv.pid), signal.SIGTERM)

print('----')
print('TOTAL FAILED: ' + str(len(fails)))
for f in fails: print('  ' + f)
