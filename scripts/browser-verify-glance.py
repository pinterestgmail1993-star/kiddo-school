#!/usr/bin/env python3
"""Browser QA for the First Glance merge (owner 2026-10-31: "why did you
remove the other glance? told you put the science with it"):
/first-glance/ — 58 first-word sheets + the 65 Science at a Glance sheets
as the THIRD BAND (123 tiles on one page), six science sections, age/
subject/level/skill pills, kid-directed descriptions, Download + Print
under every science image; the header chip is BACK on First Glance ("New ·
First Glance · 123 first-picture sheets · Ages 2–5") with aria-current on
self; no stale /science-at-a-glance/ links anywhere. Headless Chrome at
1440 + 390. (The /science-at-a-glance/ → /first-glance/ 301 is a Cloudflare
Pages _redirects rule — verified live by scripts/verify-live-glance.py.)"""
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
        r = pg.goto(BASE + '/first-glance/', wait_until='load', timeout=30000)
        ck(f'[{label}] page 200', r.status == 200, r.status)
        ck(f'[{label}] title', pg.title().startswith('First Glance — 123'), pg.title()[:60])
        # header chip: back on First Glance, 123 count, aria-current on self
        chip = pg.locator('a.header-fg')
        ck(f'[{label}] header chip href', chip.get_attribute('href') == '/first-glance/')
        sub_txt = pg.evaluate('document.querySelector(".header-fg-sub")?.textContent.trim()')
        ck(f'[{label}] chip count text (DOM)', sub_txt == '123 first-picture sheets · Ages 2–5', sub_txt)
        ck(f'[{label}] chip aria-current on self', chip.get_attribute('aria-current') == 'page')
        # tiles: 58 first-word cards + 65 science shelf tiles
        ck(f'[{label}] 58 fg-card tiles', pg.locator('figure.fc-card.fg-card').count() == 58, pg.locator('figure.fc-card.fg-card').count())
        tiles = pg.locator('figure.mn-card.sg-card')
        ck(f'[{label}] 65 science tiles', tiles.count() == 65, tiles.count())
        ck(f'[{label}] 65 age pills', pg.locator('.sg-card .fc-pill-age').count() == 65)
        ck(f'[{label}] 65 subject pills', pg.locator('.sg-card .fc-pill-subject').count() == 65)
        ck(f'[{label}] 65 level pills', pg.locator('.sg-card .fc-pill-level').count() == 65)
        ck(f'[{label}] 65 skill pills', pg.locator('.sg-card .fc-pill-skill').count() == 65)
        dl = pg.locator('.sg-card a.button[download]')
        ck(f'[{label}] 65 download buttons', dl.count() == 65, dl.count())
        first = dl.first.get_attribute('href')
        ck(f'[{label}] download hrefs are the real R2 webp', first and first.startswith('https://assets.kiddo.school/school/extra-classes/science-at-a-glance/'), first)
        ck(f'[{label}] 65 print buttons', pg.locator('.sg-card [data-mn-print]').count() == 65)
        # science band structure
        ck(f'[{label}] band #fg-science', pg.locator('#fg-science').count() == 1)
        for hid in ['sg-body','sg-nature','sg-plants','sg-earth','sg-space','sg-matter','sg-levels']:
            ck(f'[{label}] section #{hid}', pg.locator(f'#{hid}').count() == 1)
        tip = pg.locator('.sg-card .mn-tip').first.inner_text()
        ck(f'[{label}] kid-voice sample', ('you' in tip.lower()), tip[:70])
        # no stale science links on the page
        ck(f'[{label}] no stale /science-at-a-glance/ links', pg.locator('a[href="/science-at-a-glance/"]').count() == 0)
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
        ck(f'[{label}] science images load from R2', loaded == 65, f'{loaded}/65')
        # print isolation handler runs on this page (manners.js ships here now)
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
    pg.goto(BASE + '/first-glance/', wait_until='load')
    pg.wait_for_timeout(1500)
    pg.screenshot(path=OUT + '/glance-desktop-top.png')
    pg.locator('#fg-science').scroll_into_view_if_needed()
    pg.wait_for_timeout(1200)
    pg.screenshot(path=OUT + '/glance-desktop-science.png')
    pg.locator('#sg-earth').scroll_into_view_if_needed()
    pg.wait_for_timeout(1200)
    pg.screenshot(path=OUT + '/glance-desktop-earth.png')
    m = b.new_page(viewport={'width': 390, 'height': 844})
    m.goto(BASE + '/first-glance/', wait_until='load')
    m.wait_for_timeout(1500)
    m.screenshot(path=OUT + '/glance-mobile-top.png')
    # home page: chip on First Glance, footer has no science link
    home = b.new_page(viewport={'width': 1440, 'height': 950})
    home.goto(BASE + '/', wait_until='load')
    ck('[home] header chip back on First Glance', home.locator('a.header-fg[href="/first-glance/"]').count() == 1)
    ck('[home] chip count text', home.locator('.header-fg-sub').inner_text().strip() == '123 first-picture sheets · Ages 2–5')
    ck('[home] footer science link gone', home.locator('footer a[href="/science-at-a-glance/"]').count() == 0)
    ck('[home] footer First Glance link', home.locator('footer a[href="/first-glance/"]').count() == 1)
    b.close()
srv.terminate()
print('---')
print('FAILS:', len(fails), fails)
