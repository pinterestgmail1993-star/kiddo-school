#!/usr/bin/env python3
"""Browser QA for the Science at a Glance round (owner 2026-10-31):
/science-at-a-glance/ — 65 first-picture science sheets on ONE page, six
sections, age/subject/level/skill pills, kid-directed descriptions,
Download + Print buttons under every image, zero per-card URLs; the site
header features BOTH glances (owner's same-day correction): First Glance's
chip restored beside the Science chip; First Glance keeps its footer link
+ sibling cross-link. Headless Chrome at 1440 + 390."""
import subprocess, time, os
from playwright.sync_api import sync_playwright

ROOT = '/home/z/my-project/kiddo-school'
OUT = '/home/z/my-project/kiddo-school/scripts/sg-tmp'
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
        pg = b.new_page(viewport={'width': w, 'height': 950})
        r = pg.goto(BASE + '/science-at-a-glance/', wait_until='load', timeout=30000)
        ck(f'[{label}] page 200', r.status == 200, r.status)
        ck(f'[{label}] title', pg.title().startswith('Science at a Glance — 65'), pg.title()[:60])
        # header: BOTH glances (owner 2026-10-31 correction) — First Glance's
        # chip restored beside this collection; aria-current on the science chip here
        nchip = pg.locator('a.header-fg').count()
        ck(f'[{label}] two header chips', nchip == 2, nchip)
        ck(f'[{label}] First Glance chip back', pg.locator('a.header-fg[href="/first-glance/"]').count() == 1)
        chip = pg.locator('a.header-fg[href="/science-at-a-glance/"]')
        ck(f'[{label}] science chip present', chip.count() == 1, chip.count())
        subs = pg.evaluate('[...document.querySelectorAll(".header-fg-sub")].map(e => e.textContent.trim())')
        ck(f'[{label}] both chip counts (DOM)', subs == ['58 first-picture sheets · Ages 2–5', '65 first-picture sheets · Ages 2–5'], subs)
        ck(f'[{label}] chip aria-current on self', chip.get_attribute('aria-current') == 'page')
        # tiles + pills + buttons
        tiles = pg.locator('figure.mn-card.sg-card')
        ck(f'[{label}] 65 tiles', tiles.count() == 65, tiles.count())
        ck(f'[{label}] 65 age pills', pg.locator('.sg-card .fc-pill-age').count() == 65)
        ck(f'[{label}] 65 subject pills', pg.locator('.sg-card .fc-pill-subject').count() == 65)
        ck(f'[{label}] 65 level pills', pg.locator('.sg-card .fc-pill-level').count() == 65)
        ck(f'[{label}] 65 skill pills', pg.locator('.sg-card .fc-pill-skill').count() == 65)
        dl = pg.locator('.sg-card a.button[download]')
        ck(f'[{label}] 65 download buttons', dl.count() == 65, dl.count())
        first = dl.first.get_attribute('href')
        ck(f'[{label}] download hrefs are the real R2 webp', first and first.startswith('https://assets.kiddo.school/school/extra-classes/science-at-a-glance/'), first)
        ck(f'[{label}] 65 print buttons', pg.locator('.sg-card [data-mn-print]').count() == 65)
        ck(f'[{label}] 0 per-card links', pg.locator('.sg-card a[href]:not([href$=".webp"]):not([href^="#"])').count() == 0)
        # sections + legend + kid voice
        for hid in ['sg-body','sg-nature','sg-plants','sg-earth','sg-space','sg-matter','sg-levels','sg-why','sg-how']:
            ck(f'[{label}] section #{hid}', pg.locator(f'#{hid}').count() == 1)
        tip = pg.locator('.sg-card .mn-tip').first.inner_text()
        ck(f'[{label}] kid-voice sample', ('you' in tip.lower()), tip[:70])
        # no horizontal overflow
        ov = pg.evaluate('document.scrollingElement.scrollWidth - window.innerWidth')
        ck(f'[{label}] no horizontal overflow', ov <= 1, ov)
        # lazy-load pass: scroll to bottom, then count loaded imgs
        pg.evaluate('''async () => {
            for (let y = 0; y <= document.body.scrollHeight; y += 800) {
                window.scrollTo(0, y);
                await new Promise(r => setTimeout(r, 60));
            }
        }''')
        pg.wait_for_timeout(2500)
        loaded = pg.evaluate('[...document.querySelectorAll(".sg-card img")].filter(i => i.naturalWidth > 0).length')
        ck(f'[{label}] images load from R2', loaded == 65, f'{loaded}/65')
        # print isolation handler runs on this page: headless print() returns
        # instantly (afterprint fires inside the click task), so prove the run
        # by instrumenting classList.add during the click, then check cleanup
        pg.evaluate('window.scrollTo(0,0)')
        ran = pg.evaluate('''() => {
          const added = [];
          const orig = document.body.classList.add.bind(document.body.classList);
          document.body.classList.add = c => { added.push(c); return orig(c); };
          document.querySelector("[data-mn-print]").click();
          return { ran: added.includes("mn-printing"), added };
        }''')
        ck(f'[{label}] print handler ran on the card', ran['ran'], ran['added'])
        pg.wait_for_timeout(2100)
        cleaned = pg.evaluate('!document.body.classList.contains("mn-printing") && !document.querySelector(".mn-print-card")')
        ck(f'[{label}] print isolation cleans up', cleaned)
        pg.close()

    # desktop screenshot pass for the visual check
    pg = b.new_page(viewport={'width': 1440, 'height': 950})
    pg.goto(BASE + '/science-at-a-glance/', wait_until='load')
    pg.wait_for_timeout(1500)
    pg.screenshot(path=OUT + '/sg-desktop-top.png')
    pg.locator('#sg-earth').scroll_into_view_if_needed()
    pg.wait_for_timeout(1200)
    pg.screenshot(path=OUT + '/sg-desktop-earth.png')
    m = b.new_page(viewport={'width': 390, 'height': 844})
    m.goto(BASE + '/science-at-a-glance/', wait_until='load')
    m.wait_for_timeout(1500)
    m.screenshot(path=OUT + '/sg-mobile-top.png')
    # sibling links both ways + footer
    fg = b.new_page(viewport={'width': 1440, 'height': 950})
    fg.goto(BASE + '/first-glance/', wait_until='load')
    ck('[first-glance] links the science page', fg.locator('a[href="/science-at-a-glance/"]').count() >= 1)
    ck('[first-glance] chip IS first-glance (both glances on the header)', fg.locator('a.header-fg[href="/first-glance/"]').count() == 1)
    ck('[first-glance] science chip beside it', fg.locator('a.header-fg[href="/science-at-a-glance/"]').count() == 1)
    home = b.new_page(viewport={'width': 1440, 'height': 950})
    home.goto(BASE + '/', wait_until='load')
    ck('[home] footer science link', home.locator('footer a[href="/science-at-a-glance/"]').count() == 1)
    ck('[home] both header chips', home.locator('a.header-fg').count() == 2, home.locator('a.header-fg').count())
    ck('[home] First Glance chip + count', home.locator('a.header-fg[href="/first-glance/"]').count() == 1 and '58 first-picture sheets · Ages 2–5' in home.content())
    b.close()
srv.terminate()
print('---')
print('FAILS:', len(fails), fails)
