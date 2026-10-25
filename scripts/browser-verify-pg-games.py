# Playground x Games shelf — headless browser verification (desktop 1440x900 +
# mobile 390x844) against the LOCAL build at localhost:4173. Pattern follows
# browser-verify-gr.py.
from playwright.sync_api import sync_playwright

BASE='http://localhost:4173'
PG=BASE+'/playground/'
DDG=BASE+'/games/duck-duck-goose/'
results=[]
def check(name, ok, extra=''):
    results.append((name, ok))
    print(('PASS ' if ok else 'FAIL ')+name+(('  -- '+extra) if extra and not ok else ''))

def settle(page, timeout=20000):
    # load event, then walk the page so loading="lazy" tiles actually start,
    # then wait until every <img> is complete, then a quiet beat.
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
        page.wait_for_function("""() => [...document.images].every(i => i.complete)""", timeout=8000)
    except Exception:
        pass  # soft settle: the strict per-tile naturalWidth checks below decide
    page.wait_for_timeout(1200)

with sync_playwright() as p:
    b=p.chromium.launch()
    d=b.new_context(viewport={'width':1440,'height':900})
    pg=d.new_page()

    # 1. Room page, desktop
    pg.goto(PG, wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    check('room: one h1 = Welcome to the Playground.', pg.eval_on_selector_all('h1','els=>els.length')==1 and 'Welcome to the Playground.' in pg.locator('h1').inner_text())
    check('room: games shelf section present', pg.locator('text=GAMES WE PLAY HERE').count()>=1)
    tiles=pg.eval_on_selector_all('.lp-tile','els=>els.map(e=>e.getAttribute("href"))')
    lessons=[h for h in tiles if h and h.startswith('/playground/learn/')]
    games=[h for h in tiles if h and h.startswith('/games/')]
    check('room: 32 lesson tiles intact', len(lessons)==32, str(len(lessons)))
    check('room: 12 game tiles', len(games)==12, str(games))
    need={'/games/duck-duck-goose/','/games/tag/','/games/red-light-green-light/','/games/hopscotch/','/games/four-square/','/games/follow-the-leader/','/games/obstacle-course/','/games/tunnel-crawl/','/games/sack-race/','/games/three-legged-race/','/games/relay-race/','/games/bubble-chase/'}
    check('room: exactly the 12 playground games', set(games)==need, str(set(games)^need))
    gimgs=pg.eval_on_selector_all('.lp-tile[href^="/games/"] img','els=>els.map(e=>e.naturalWidth)')
    check('room: all 12 game images loaded', len(gimgs)==12 and all(w>0 for w in gimgs), str([w for w in gimgs if w==0]))
    check('room: hub link in shelf copy', pg.locator('p.fc-hint a[href="/games/"]').count()>=1)
    check('room: set link intact', pg.locator('a[href="/flashcards/playground/"]').count()>=1)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('room: no horizontal overflow (desktop)', ov<=0, str(ov))

    # 2. A game tile opens its /games/ rules page
    pg.click('a.lp-tile[href="/games/duck-duck-goose/"]')
    pg.wait_for_load_state('load', timeout=45000)
    check('room → tile click lands on /games/duck-duck-goose/', pg.url.endswith('/games/duck-duck-goose/') and 'How to Play Duck Duck Goose.' in pg.locator('h1').inner_text())
    pg.goto(PG, wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    pg.close()

    # 3. Mobile 390
    m=b.new_context(viewport={'width':390,'height':844}); mp=m.new_page()
    mp.goto(PG, wait_until='domcontentloaded', timeout=45000)
    settle(mp)
    ov=mp.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('room: no horizontal overflow (mobile 390)', ov<=0, str(ov))
    check('room (mobile): 12 game tiles render', mp.eval_on_selector_all('.lp-tile[href^="/games/"]','els=>els.length')==12)
    mp.close(); m.close()
    b.close()

fails=[n for n,ok in results if not ok]
print(f'\n{len(results)-len(fails)}/{len(results)} checks passed'+('' if not fails else ' — FAILURES: '+', '.join(fails)))
raise SystemExit(1 if fails else 0)
