#!/usr/bin/env python3
"""Browser QA for Class 39 · Staying Safe: /staying-safe/ + the 19 short pages.
Serves dist/ locally, checks layout, tiles, navigation, images and overflow in
headless Chrome at 1440 + 390, saves screenshots to scripts/manners-tmp/ss/."""
import subprocess, time, os
from playwright.sync_api import sync_playwright

ROOT = '/home/z/my-project/kiddo-school'
OUT = '/home/z/my-project/kiddo-school/scripts/manners-tmp/ss'
os.makedirs(OUT, exist_ok=True)
srv = subprocess.Popen(['node', 'scripts/serve.mjs'], cwd=ROOT,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                       preexec_fn=os.setsid)
time.sleep(2)
fails = []
def ck(name, ok):
    print(('PASS ' if ok else 'FAIL ') + name)
    if not ok: fails.append(name)

with sync_playwright() as p:
    b = p.chromium.launch()
    for w, label in [(1440, 'desktop'), (390, 'mobile')]:
        pg = b.new_page(viewport={'width': w, 'height': 950})
        # --- the class page ---
        pg.goto('http://localhost:4173/staying-safe/', wait_until='load')
        pg.wait_for_timeout(600)
        ck(f'[{label}] class h1 is Staying Safe', pg.locator('h1').first.inner_text().strip().startswith('Staying Safe'))
        ck(f'[{label}] eyebrow says CLASS 39', 'CLASS 39' in pg.locator('.page-heading .eyebrow').first.inner_text())
        ck(f'[{label}] 19 tiles', pg.locator('.lp-tile').count() == 19)
        ck(f'[{label}] four shelves', pg.locator('[id^="shelf-"]').count() == 4)
        imgs_ok = pg.evaluate('''async () => {
          // lazy tiles load on scroll — walk the page, then await every image
          const imgs = Array.from(document.querySelectorAll(".lp-tile img"));
          for (let y = 0; y <= document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
          await Promise.all(imgs.map(i => i.complete ? null : new Promise(r => { i.addEventListener('load', r, {once:true}); i.addEventListener('error', r, {once:true}); setTimeout(r, 5000); })));
          return imgs.every(i => i.complete && i.naturalWidth > 0);
        }''')
        ck(f'[{label}] all 19 tile images load', imgs_ok)
        ck(f'[{label}] around-the-school has 5 doors', pg.locator('.lesson-linkrow .lesson-pill-link').count() == 5)
        hscroll = pg.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth')
        ck(f'[{label}] no horizontal overflow', not hscroll)
        pg.screenshot(path=f'{OUT}/class-{label}.png', full_page=False)
        # tile click navigates
        pg.locator('.lp-tile').first.click()
        pg.wait_for_load_state('load')
        ck(f'[{label}] first tile lands on a short page', '/staying-safe/' in pg.url and pg.url != 'http://localhost:4173/staying-safe/')
        pg.go_back(wait_until='load')
        # --- short pages: first, a middle one, last ---
        for slug in ['buckle-up', 'safety-hero', 'zebra-crossing']:
            pg.goto(f'http://localhost:4173/staying-safe/{slug}/', wait_until='load')
            pg.wait_for_timeout(500)
            ck(f'[{label}] {slug}: card image loads', pg.evaluate('document.querySelector(".fc2-hero img") && document.querySelector(".fc2-hero img").naturalWidth > 0'))
            ck(f'[{label}] {slug}: verbatim rule quoted', pg.locator('.dino-action').count() == 1)
            ck(f'[{label}] {slug}: back button present', pg.locator(f'a.button[href="/staying-safe/"]').count() >= 1)
            ck(f'[{label}] {slug}: prev/next present', pg.locator('.lesson-linkrow a.button-ghost').count() == 2)
            ck(f'[{label}] {slug}: download attr', pg.locator('a[download]').count() >= 1)
            hs = pg.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth')
            ck(f'[{label}] {slug}: no overflow', not hs)
            if slug == 'safety-hero':
                pg.screenshot(path=f'{OUT}/card-{label}.png', full_page=False)
            # next-button navigation really moves
            if slug == 'buckle-up':
                pg.locator('.lesson-linkrow a.button-ghost').nth(1).click()
                pg.wait_for_load_state('load')
                ck(f'[{label}] next button lands on hold-hands-near-roads', pg.url.endswith('/staying-safe/hold-hands-near-roads/'))
        # --- the First Glance cross-link ---
        pg.goto('http://localhost:4173/first-glance/', wait_until='load')
        pg.wait_for_timeout(400)
        fg_link = pg.locator('a.fg-more[href="/staying-safe/"]')
        ck(f'[{label}] first-glance safety sheet carries exactly one fg-more', fg_link.count() == 1)
        # --- the three class pages carry their inbound blocks ---
        for path, name in [('/preschool/4-years/life-skills-and-good-habits/', 'Class 32'),
                           ('/preschool/4-years/community-helpers-and-our-neighborhood/', 'Class 33'),
                           ('/preschool/4-years/transportation-and-vehicles/', 'Class 24')]:
            pg.goto('http://localhost:4173' + path, wait_until='load')
            ck(f'[{label}] {name} shows its Staying Safe section', pg.locator(f'a[href="/staying-safe/"]').count() >= 1)
        # --- the Learning Path row ---
        pg.goto('http://localhost:4173/learning-path/', wait_until='load')
        lp39 = pg.locator('.lp-row', has_text='Class 39')
        ck(f'[{label}] LP has the Class 39 row', lp39.count() == 1)
        pg.close()
    b.close()

srv.terminate()
print(f'\n{"ALL PASS" if not fails else "FAILURES: " + ", ".join(fails)}')
raise SystemExit(1 if fails else 0)
