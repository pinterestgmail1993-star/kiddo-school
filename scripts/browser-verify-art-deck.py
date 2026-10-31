#!/usr/bin/env python3
"""Browser QA for the Art Room deck (owner 2026-10-31: "include these
https://kiddo.school/art/"): the /art/ Art Studio page carries the WHOLE
14-card deck (four shelves, four pills per card, Download + Print under
every image, kid-voice descriptions, the Ask-a-grown-up badge on the
craft-knife card) with ZERO new URLs and zero per-card pages; the landscape
card keeps its honest 800x566; the studio's own activities still lead the
page; manners.js print isolation rides along. Headless Chrome at 1440 + 390.
"""
import subprocess, time, os
from playwright.sync_api import sync_playwright

ROOT = '/home/z/my-project/kiddo-school'
OUT = '/home/z/my-project/kiddo-school/scripts/art-tmp'
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

    r = pg.goto(BASE + '/art/', wait_until='load', timeout=30000)
    ck(f'[{tag}] /art/ 200', r.status == 200, r.status)
    dismiss_consent(pg)
    ck(f'[{tag}] title', pg.title().startswith('Art Studio'), pg.title()[:60])
    ck(f'[{tag}] H1 Art Studio', pg.locator('h1').first.inner_text().strip() == 'Art Studio')
    ck(f'[{tag}] shelf intro eyebrow', pg.locator('.eyebrow', has_text='THE ART ROOM SHELF · 14 FLASHCARDS').count() == 1)
    tiles = pg.locator('.mn-card')
    ck(f'[{tag}] 14 tiles', tiles.count() == 14, tiles.count())
    ck(f'[{tag}] 14 print buttons', pg.locator('[data-mn-print]').count() == 14, pg.locator('[data-mn-print]').count())
    ck(f'[{tag}] 14 download links', pg.locator('.mn-actions a[download]').count() == 14, pg.locator('.mn-actions a[download]').count())
    pills = pg.locator('.mn-card .fc-pill')
    ck(f'[{tag}] 56 pills (4 x 14)', pills.count() == 56, pills.count())
    ck(f'[{tag}] 14 age pills Ages 3–12', pg.locator('.mn-card .fc-pill-age', has_text='Ages 3–12').count() == 14,
       pg.locator('.mn-card .fc-pill-age', has_text='Ages 3–12').count())
    pres = pg.locator('.fc-pill-level', has_text='Preschool').count()
    g1 = pg.locator('.fc-pill-level', has_text='Grade 1').count()
    g2 = pg.locator('.fc-pill-level', has_text='Grade 2').count()
    ck(f'[{tag}] grade split 4/5/5', pres == 4 and g1 == 5 and g2 == 5, f'{pres}/{g1}/{g2}')
    for s in ['DRAW & COLOR SHELF', 'PAINT & MIX SHELF', 'CUT, GLUE & TAPE SHELF', 'BUILD, SHAPE & PRINT SHELF']:
        ck(f'[{tag}] shelf {s}', pg.locator('.eyebrow', has_text=s).count() == 1)
    # honest dims: 13 portrait + 1 landscape
    dims = pg.eval_on_selector_all('.mn-card img', 'els=>els.map(e=>e.getAttribute("width")+"x"+e.getAttribute("height"))')
    ck(f'[{tag}] 13 portrait dims', dims.count('800x1131') == 13, dims.count('800x1131'))
    ck(f'[{tag}] 1 landscape dims', dims.count('800x566') == 1, dims.count('800x566'))
    ck(f'[{tag}] all 14 lazy', pg.eval_on_selector_all('.mn-card img', 'els=>els.every(e=>e.loading==="lazy")'))
    # first + the landscape card actually load from R2
    ok_img = pg.evaluate("() => new Promise(res=>{const i=document.querySelector('.mn-card img');if(i.complete&&i.naturalWidth>0)return res(true);i.onload=()=>res(true);i.onerror=()=>res(false);setTimeout(()=>res(false),9000);})")
    ck(f'[{tag}] R2 card image really loads', ok_img)
    ok_land = pg.evaluate("() => new Promise(res=>{const im=[...document.querySelectorAll('.mn-card img')].find(i=>i.getAttribute('height')==='566');if(!im)return res(false);im.scrollIntoView({block:'center'});if(im.complete&&im.naturalWidth===800&&im.naturalHeight===566)return res(true);im.onload=()=>res(im.naturalWidth===800&&im.naturalHeight===566);im.onerror=()=>res(false);setTimeout(()=>res(false),9000);})")
    pg.wait_for_timeout(400)
    ck(f'[{tag}] landscape card renders 800x566', ok_land)
    # the grown-up badge on the knife card only
    ck(f'[{tag}] one Ask-a-grown-up badge', pg.locator('.mn-card .mn-grownup').count() == 1, pg.locator('.mn-card .mn-grownup').count())
    kn = pg.locator('.mn-card', has_text='Glue Stick').filter(has=pg.locator('.mn-grownup'))
    ck(f'[{tag}] badge rides the craft-knife card', kn.count() == 1)
    # the studio's own sections still lead
    ck(f'[{tag}] studio activity cards still present', pg.locator('.cards .card, .card-grid .card').count() >= 2 or pg.locator('a[href="/art/paper-shape-collage/"]').count() >= 1)
    ck(f'[{tag}] manners.js ships', pg.locator('script[src*="/assets/manners.js"]').count() == 1)
    # zero per-card links (beyond the studio's own two activity families)
    percard = pg.evaluate("[...document.querySelectorAll('a[href^=\"/art/\"]')].map(e=>e.getAttribute('href')).filter(h=>h!=='/art/'&&h.startsWith('/art/')&&h.endsWith('/')&&!h.startsWith('/art/paper-shape-collage/')&&!h.startsWith('/art/mixing-colours/'))")
    ck(f'[{tag}] zero new per-card links', len(percard) == 0, percard[:3])
    # word-ban
    body_txt = pg.locator('main').inner_text()
    ck(f'[{tag}] word-ban holds', not any(b in body_txt.lower() for b in ['no sign up', 'no paywall', 'free to use', 'no account', 'free forever']))
    # no horizontal overflow
    ovf = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    ck(f'[{tag}] no horizontal overflow', ovf <= 0, ovf)
    pg.screenshot(path=OUT + f'/art-{width}.png', full_page=(width == 1440))
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
