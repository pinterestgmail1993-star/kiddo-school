# Art Room — headless browser verification (desktop 1440x900 + mobile 390x844)
# against the LOCAL build at localhost:4173. Pattern follows the dinosaur /
# playground verify scripts: settle() = load + scroll-through (lazy images) +
# soft img.complete wait; strict checks via naturalWidth / counts / hrefs.
from playwright.sync_api import sync_playwright

BASE='http://localhost:4173'
HUB=BASE+'/art-room/'
results=[]
def check(name, ok, extra=''):
    results.append((name, ok))
    print(('PASS ' if ok else 'FAIL ')+name+(('  -- '+extra) if extra and not ok else ''))

def settle(page, timeout=20000):
    page.wait_for_load_state('load', timeout=timeout)
    page.evaluate("""async () => {
        const step = Math.round(window.innerHeight * 0.8);
        for (let y = 0; y <= document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
    }""")
    try:
        page.wait_for_function("() => [...document.images].every(i => i.complete)", timeout=8000)
    except Exception:
        pass
    page.wait_for_timeout(1200)

with sync_playwright() as p:
    b=p.chromium.launch()
    d=b.new_context(viewport={'width':1440,'height':900})
    pg=d.new_page()

    # 1. Room hub, desktop
    pg.goto(HUB, wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    h1s=pg.eval_on_selector_all('h1','els=>els.map(e=>e.textContent.trim())')
    check('hub: one h1', len(h1s)==1 and h1s[0].startswith('The Art Room'), str(h1s))
    order=pg.evaluate("""() => {
        const imgs=[...document.querySelectorAll('img')].map(i=>i.getAttribute('src'));
        const c=imgs.findIndex(s=>s&&s.includes('art-room/cover.webp'));
        const f=imgs.findIndex(s=>s&&s.includes('art-room/chalk.webp'));
        return [c,f,c>-1&&f>-1&&c<f];
    }""")
    check('hub: cover fronts the grid (cover before chalk)', order[2], str(order))
    tiles=pg.eval_on_selector_all('.lp-tile','els=>els.map(e=>e.getAttribute("href"))')
    check('hub: exactly 27 tiles, all /art-room/<slug>/', len(tiles)==27 and all(t and t.startswith('/art-room/') and t.endswith('/') for t in tiles), str(len(tiles)))
    imgs=pg.eval_on_selector_all('.lp-tile img','els=>els.map(e=>e.naturalWidth)')
    check('hub: all 27 card images loaded', len(imgs)==27 and all(w>0 for w in imgs), str([w for w in imgs if w==0]))
    for link in ['/rooms/','/coloring-pages/','/extra-classes/colors/','/flashcards/art-room/','/games/colour-hunt/','/games/shape-hunt/','/games/shadow-shapes/','/games/follow-the-leader/']:
        check('hub: links '+link, pg.locator(f'a[href="{link}"]').count()>=1)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('hub: no horizontal overflow (desktop)', ov<=0, str(ov))

    # 2. Tile click → short page
    pg.click('a.lp-tile[href="/art-room/chalk/"]')
    pg.wait_for_load_state('load', timeout=45000)
    check('hub → chalk tile lands on /art-room/chalk/', pg.url.endswith('/art-room/chalk/'))
    check('chalk: h1 is Chalk', 'Chalk' in pg.locator('h1').inner_text())
    check('chalk: card image loaded', pg.evaluate("()=>{const i=document.querySelector('.fc2-hero img');return i&&i.naturalWidth>0}"))
    body=pg.locator('main').inner_text()
    check('chalk: activity quoted verbatim', 'Draw a picture with shapes' in body)
    check('chalk: back link to /art-room/', pg.locator('a[href="/art-room/"]').count()>=1)
    check('chalk: links lesson + print twin', pg.locator('a[href="/art-room/learn/chalk/"]').count()>=1 and pg.locator('a[href="/flashcards/art-room/chalk/"]').count()>=1)

    # 3. Lesson page
    pg.goto(BASE+'/art-room/learn/crayon/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    lh=' '.join(pg.locator('h1').first.inner_text().split())
    check('lesson crayon: h1 present', 'Crayon' in lh, lh)
    check('lesson crayon: card image renders', pg.evaluate("()=>{const i=document.querySelector('.fcl-art img');return i&&i.naturalWidth>0}"))
    lbody=pg.locator('main').inner_text()
    check('lesson crayon: parent script present', 'crayons' in lbody.lower() or 'crayon' in lbody.lower())
    check('lesson crayon: pairs with library card', pg.locator('a[href="/flashcards/art-room/crayon/"]').count()>=1)

    # 4. Library set + card page
    pg.goto(BASE+'/flashcards/art-room/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    check('set: h1 Art activity flashcards.', 'Art activity flashcards.' in pg.locator('h1').first.inner_text())
    check('set: links the room', pg.locator('a[href="/art-room/"]').count()>=1)
    pg.goto(BASE+'/flashcards/art-room/clay/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    cbody=pg.locator('main').inner_text()
    check('card clay: age pill Ages 2+', 'Ages 2+' in cbody)
    check('card clay: shows the art', pg.evaluate("()=>{const i=document.querySelector('.fc2-hero img, .fc-card img, main img');return i&&i.naturalWidth>0}"))

    # 5. Cross-link pages
    pg.goto(BASE+'/rooms/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    rc=pg.eval_on_selector_all('.room-card','els=>els.map(e=>e.getAttribute("href"))')
    check('rooms: five room cards incl. art room', len(rc)==5 and '/art-room/' in rc, str(rc))
    pg.goto(BASE+'/coloring-pages/', wait_until='domcontentloaded', timeout=45000)
    check('coloring hub: links the Art Room', pg.locator('a[href="/art-room/"]').count()>=1)
    pg.goto(BASE+'/extra-classes/colors/', wait_until='domcontentloaded', timeout=45000)
    check('colors class: links the Art Room', pg.locator('a[href="/art-room/"]').count()>=1)
    pg.close()

    # 6. Mobile 390
    m=b.new_context(viewport={'width':390,'height':844}); mp=m.new_page()
    mp.goto(HUB, wait_until='domcontentloaded', timeout=45000)
    settle(mp)
    ov=mp.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('hub: no horizontal overflow (mobile 390)', ov<=0, str(ov))
    check('hub (mobile): 27 tiles render', mp.eval_on_selector_all('.lp-tile','els=>els.length')==27)
    check('hub (mobile): tiles loaded', all(w>0 for w in mp.eval_on_selector_all('.lp-tile img','els=>els.map(e=>e.naturalWidth)')))
    mp.goto(BASE+'/art-room/stencil/', wait_until='domcontentloaded', timeout=45000)
    settle(mp)
    ov=mp.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('short page (mobile): no overflow, art loaded', ov<=0 and mp.evaluate("()=>{const i=document.querySelector('.fc2-hero img');return i&&i.naturalWidth>0}"), str(ov))
    mp.close()
    b.close()

fails=[n for n,ok in results if not ok]
print(f"\n{len(results)-len(fails)}/{len(results)} checks passed")
if fails:
    raise SystemExit('FAILURES: '+', '.join(fails))
print('ART ROOM BROWSER QA: ALL PASS')
