#!/usr/bin/env python3
"""Browser QA for Class 43 · Our Earth & Space (owner 2026-10-31): the
/earth-and-space/ class page carries the WHOLE 24-card deck (six shelves,
four pills per card, Download + Print under every image, kid-voice
descriptions) with ZERO per-card pages; the cover leads; LP row 43; the
forty-three counts; the magic-games labels say Class 17/20; the inbound
links from Classes 31/34/41 and Science at a Glance render; the both-glances
header holds. Headless Chrome at 1440 + 390."""
import subprocess, time, os
from playwright.sync_api import sync_playwright

ROOT = '/home/z/my-project/kiddo-school'
OUT = '/home/z/my-project/kiddo-school/scripts/es-tmp'
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

def run(pw, width):
    pg = pw.chromium.launch().new_page(viewport={'width': width, 'height': 900})
    tag = f'{width}'

    # --- the Class 43 page ---
    r = pg.goto(BASE + '/earth-and-space/', wait_until='load', timeout=30000)
    ck(f'[{tag}] /earth-and-space/ 200', r.status == 200, r.status)
    dismiss_consent(pg)
    ck(f'[{tag}] title', pg.title().startswith('Our Earth & Space Flashcards'), pg.title()[:60])
    ck(f'[{tag}] eyebrow CLASS 43', pg.locator('.eyebrow', has_text='CLASS 43').count() >= 1)
    ck(f'[{tag}] cover hero leads', pg.locator('.lesson-hero-cover img').count() == 1)
    tiles = pg.locator('.mn-card')
    ck(f'[{tag}] 24 tiles', tiles.count() == 24, tiles.count())
    ck(f'[{tag}] 24 print buttons', pg.locator('[data-mn-print]').count() == 24, pg.locator('[data-mn-print]').count())
    ck(f'[{tag}] 24 download links', pg.locator('.mn-actions a[download]').count() == 24, pg.locator('.mn-actions a[download]').count())
    pills = pg.locator('.mn-card .fc-pill')
    ck(f'[{tag}] 96 pills (4 x 24)', pills.count() == 96, pills.count())
    ages = pg.locator('.mn-card .fc-pill-age', has_text='Ages 4–5')
    ck(f'[{tag}] 24 age pills', ages.count() == 24, ages.count())
    ck(f'[{tag}] grade pills present', pg.locator('.fc-pill-level', has_text='Preschool').count() == 8 and pg.locator('.fc-pill-level', has_text='Grade 1').count() == 9 and pg.locator('.fc-pill-level', has_text='Grade 2').count() == 7,
       f"{pg.locator('.fc-pill-level', has_text='Preschool').count()}/{pg.locator('.fc-pill-level', has_text='Grade 1').count()}/{pg.locator('.fc-pill-level', has_text='Grade 2').count()}")
    six_shelves = ['MY BLUE PLANET SHELF', 'SUN’S FAMILY SHELF', 'SPINNING DAY SHELF', 'WEATHER & WORLD SHELF', 'ROCKETS & ASTRONAUTS SHELF', 'STARS & FAR SPACE SHELF']
    for s in six_shelves:
        ck(f'[{tag}] shelf {s}', pg.locator('.eyebrow', has_text=s).count() == 1)
    # lazy images from R2 with real loads
    imgs = pg.locator('.mn-card img')
    ck(f'[{tag}] 24 lazy card images', imgs.count() == 24, imgs.count())
    ck(f'[{tag}] card images carry width/height', pg.eval_on_selector_all('.mn-card img', 'els=>els.every(e=>e.getAttribute("width")==="800"&&e.getAttribute("height")==="1132")'))
    # first tile image actually loads from R2
    ok_img = pg.evaluate("() => new Promise(res=>{const i=document.querySelector('.mn-card img');if(i.complete&&i.naturalWidth>0)return res(true);i.onload=()=>res(true);i.onerror=()=>res(false);setTimeout(()=>res(false),9000);})")
    ck(f'[{tag}] R2 card image really loads', ok_img)
    ok_cover = pg.evaluate("() => new Promise(res=>{const i=document.querySelector('.lesson-hero-cover img');if(i.complete&&i.naturalWidth>0)return res(true);i.onload=()=>res(true);i.onerror=()=>res(false);setTimeout(()=>res(false),9000);})")
    ck(f'[{tag}] R2 cover really loads', ok_cover)
    # links back to the four inbound sources + LP
    for href in ['/preschool/4-years/science-nature-and-discovery/', '/preschool/4-years/weather-seasons-and-what-we-wear/', '/time-and-daily-routine/', '/science-at-a-glance/', '/learning-path/']:
        ck(f'[{tag}] links back to {href}', pg.locator(f'a[href="{href}"]').count() >= 1)
    # zero per-card links
    ck(f'[{tag}] zero per-card links', pg.locator('a[href^="/earth-and-space/"]').count() == 0, pg.locator('a[href^="/earth-and-space/"]').count())
    # word-ban
    body_txt = pg.locator('main').inner_text()
    ck(f'[{tag}] word-ban holds', not any(b in body_txt.lower() for b in ['no sign up', 'no paywall', 'free to use', 'no account', 'free forever']))
    # no horizontal overflow
    ovf = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    ck(f'[{tag}] no horizontal overflow', ovf <= 0, ovf)
    pg.screenshot(path=OUT + f'/es-{width}.png', full_page=(width == 1440))

    # --- Learning Path row 43 + counts ---
    r = pg.goto(BASE + '/learning-path/', wait_until='load', timeout=30000)
    dismiss_consent(pg)
    ck(f'[{tag}] LP has Class 43 row', pg.locator('p.lp-class', has_text='Class 43').count() == 1)
    ck(f'[{tag}] LP count word forty-three', 'orty-three' in pg.locator('main').inner_text())
    magic_txt = pg.locator('.lp-magic').last.inner_text()
    ck(f'[{tag}] LP magic games say 17/20', 'Class 17' in magic_txt and 'Class 20' in magic_txt)

    # --- Age 3 hub magic labels ---
    r = pg.goto(BASE + '/preschool/3-years/', wait_until='load', timeout=30000)
    dismiss_consent(pg)
    hub_txt = pg.locator('main').inner_text()
    ck(f'[{tag}] Age3 hub magic labels 17/20', 'Plays with Class 17' in hub_txt and 'Plays with Class 20' in hub_txt)
    ck(f'[{tag}] Age3 hub no stale 3/6', 'Plays with Class 3' not in hub_txt and 'Plays with Class 6' not in hub_txt)

    # --- inbound link sections render ---
    for path, marker in [('/preschool/4-years/science-nature-and-discovery/', 'Class 43 · Our Earth & Space.'),
                         ('/preschool/4-years/weather-seasons-and-what-we-wear/', 'Class 43 · Our Earth & Space.'),
                         ('/time-and-daily-routine/', 'Class 43 · Our Earth & Space.'),
                         ('/science-at-a-glance/', 'Class 43 · Our Earth & Space.')]:
        r = pg.goto(BASE + path, wait_until='load', timeout=30000)
        dismiss_consent(pg)
        ck(f'[{tag}] inbound section on {path}', marker in pg.locator('main').inner_text())
    pg.close()

with sync_playwright() as pw:
    try:
        run(pw, 1440)
        run(pw, 390)
    finally:
        try: os.killpg(os.getpgid(srv.pid), 15)
        except Exception: pass

print(f"\n{len(fails)} fails" + ((': ' + ', '.join(fails)) if fails else ''))
raise SystemExit(1 if fails else 0)
