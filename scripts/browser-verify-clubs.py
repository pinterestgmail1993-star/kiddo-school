# Clubs — headless browser verification (desktop 1440x900 + mobile 390x844)
# against the LOCAL build at localhost:4173. Pattern follows the art-room /
# dinosaur verify scripts: settle() = load + scroll-through (lazy images) +
# soft img.complete wait; strict checks via naturalWidth / counts / hrefs.
from playwright.sync_api import sync_playwright

BASE='http://localhost:4173'
HUB=BASE+'/clubs/'
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
            await new Promise(r => setTimeout(r, 180));
        }
        window.scrollTo(0, 0);
    }""")
    try:
        page.wait_for_function("() => [...document.images].every(i => i.complete)", timeout=15000)
    except Exception:
        pass
    page.wait_for_timeout(1500)

COACH='Ask a grown-up and a trained coach'

with sync_playwright() as p:
    b=p.chromium.launch()
    d=b.new_context(viewport={'width':1440,'height':900})
    pg=d.new_page()

    # 1. Room hub, desktop
    pg.goto(HUB, wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    h1s=pg.eval_on_selector_all('h1','els=>els.map(e=>e.textContent.trim())')
    check('hub: one h1', len(h1s)==1 and h1s[0].startswith('The Clubs'), str(h1s))
    order=pg.evaluate("""() => {
        const imgs=[...document.querySelectorAll('img')].map(i=>i.getAttribute('src'));
        const c=imgs.findIndex(s=>s&&s.includes('club/cover.webp'));
        const f=imgs.findIndex(s=>s&&s.includes('club/art.webp'));
        return [c,f,c>-1&&f>-1&&c<f];
    }""")
    check('hub: cover fronts the grid (cover before art)', order[2], str(order))
    tiles=pg.eval_on_selector_all('.lp-tile','els=>els.map(e=>e.getAttribute("href"))')
    check('hub: exactly 45 tiles, all /clubs/<slug>/', len(tiles)==45 and all(t and t.startswith('/clubs/') and t.endswith('/') for t in tiles), str(len(tiles)))
    imgs=pg.eval_on_selector_all('.lp-tile img','els=>els.map(e=>e.naturalWidth)')
    check('hub: all 45 card images loaded', len(imgs)==45 and all(w>0 for w in imgs), str([w for w in imgs if w==0]))
    shelf=pg.locator('#the-club-shelves').inner_text()
    check('hub: young shelf named Ages 3+','AGES 3+' in shelf.upper())
    mainTxt=pg.locator('main').inner_text()
    check('hub: older shelf named Ages 6+','OLDER CLUB SHELF · AGES 6+' in mainTxt)
    for link in ['/rooms/','/learning-path/','/flashcards/clubs/','/games/animal-walks/','/games/musical-statues/','/games/relay-race/','/games/obstacle-course/','/games/simon-says/']:
        check('hub: links '+link, pg.locator(f'a[href="{link}"]').count()>=1)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('hub: no horizontal overflow (desktop)', ov<=0, str(ov))

    # 2. Tile click → short page (chess: Ages 6+)
    pg.click('a.lp-tile[href="/clubs/chess/"]')
    pg.wait_for_load_state('load', timeout=45000)
    check('hub → chess tile lands on /clubs/chess/', pg.url.endswith('/clubs/chess/'))
    check('chess: h1 is Chess', 'Chess' in pg.locator('h1').inner_text())
    check('chess: card image loaded', pg.evaluate("()=>{const i=document.querySelector('.fc2-hero img');return i&&i.naturalWidth>0}"))
    body=pg.locator('main').inner_text()
    check('chess: skill pill quoted verbatim', 'Focus & Strategy' in body)
    check('chess: age tag Ages 6+ in eyebrow', 'AGES 6+' in pg.locator('.page-heading .eyebrow').first.inner_text().upper())
    check('chess: back link to /clubs/', pg.locator('a[href="/clubs/"]').count()>=1)
    check('chess: links lesson + print twin', pg.locator('a[href="/clubs/learn/chess/"]').count()>=1 and pg.locator('a[href="/flashcards/clubs/chess/"]').count()>=1)

    # 3. Coach pages: fencing + archery
    for club,skill in [('fencing','Agility & Focus'),('archery','Aim & Focus')]:
        pg.goto(BASE+'/clubs/'+club+'/', wait_until='domcontentloaded', timeout=45000)
        settle(pg)
        cbody=pg.locator('main').inner_text()
        check(club+': coach line present', COACH in cbody)
        check(club+': skill quoted', skill in cbody)

    # 4. A young-shelf short page (swimming: Ages 3+)
    pg.goto(BASE+'/clubs/swimming/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    check('swimming: age tag Ages 3+ in eyebrow','AGES 3+' in pg.locator('.page-heading .eyebrow').first.inner_text().upper())
    check('swimming: no coach line','Ask a grown-up and a trained coach' not in pg.locator('main').inner_text())

    # 5. Lesson page
    pg.goto(BASE+'/clubs/learn/baking/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    lh=' '.join(pg.locator('h1').first.inner_text().split())
    check('lesson baking: h1 present','Baking' in lh, lh)
    check('lesson baking: card image renders', pg.evaluate("()=>{const i=document.querySelector('.fcl-art img, main img');return i&&i.naturalWidth>0}"))
    lbody=pg.locator('main').inner_text()
    check('lesson baking: parent script present','baking' in lbody.lower())
    check('lesson baking: pairs with library card', pg.locator('a[href="/flashcards/clubs/baking/"]').count()>=1)

    # 6. Library set + card pages (young + older age pills)
    pg.goto(BASE+'/flashcards/clubs/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    check('set: h1 Extra-curricular activity flashcards.','Extra-curricular activity flashcards.' in pg.locator('h1').first.inner_text())
    check('set: links the room', pg.locator('a[href="/clubs/"]').count()>=1)
    pg.goto(BASE+'/flashcards/clubs/swimming/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    cbody=pg.locator('main').inner_text()
    check('card swimming: age pill Ages 3+','Ages 3+' in cbody)
    check('card swimming: shows the art', pg.evaluate("()=>{const i=document.querySelector('.fc2-hero img, .fc-card img, main img');return i&&i.naturalWidth>0}"))
    pg.goto(BASE+'/flashcards/clubs/debate/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    check('card debate: age pill Ages 6+','Ages 6+' in pg.locator('main').inner_text())

    # 7. Cross-link pages
    pg.goto(BASE+'/rooms/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    rc=pg.eval_on_selector_all('.room-card','els=>els.map(e=>e.getAttribute("href"))')
    check('rooms: six room cards incl. clubs', len(rc)==6 and '/clubs/' in rc, str(rc))
    pg.goto(BASE+'/learning-path/', wait_until='domcontentloaded', timeout=45000)
    check('learning path: Growing-up row links /clubs/', pg.locator('a[href="/clubs/"]').count()>=1)
    pg.goto(BASE+'/clubs/', wait_until='domcontentloaded', timeout=45000)
    check('clubs: links back to /rooms/ and /learning-path/', pg.locator('a[href="/rooms/"]').count()>=1 and pg.locator('a[href="/learning-path/"]').count()>=1)
    pg.close()

    # 8. Mobile 390
    m=b.new_context(viewport={'width':390,'height':844}); mp=m.new_page()
    mp.goto(HUB, wait_until='domcontentloaded', timeout=45000)
    settle(mp)
    ov=mp.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('hub: no horizontal overflow (mobile 390)', ov<=0, str(ov))
    check('hub (mobile): 45 tiles render', mp.eval_on_selector_all('.lp-tile','els=>els.length')==45)
    check('hub (mobile): tiles loaded', all(w>0 for w in mp.eval_on_selector_all('.lp-tile img','els=>els.map(e=>e.naturalWidth)')))
    mp.goto(BASE+'/clubs/pottery/', wait_until='domcontentloaded', timeout=45000)
    settle(mp)
    ov=mp.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('short page (mobile): no overflow, art loaded', ov<=0 and mp.evaluate("()=>{const i=document.querySelector('.fc2-hero img');return i&&i.naturalWidth>0}"), str(ov))
    mp.goto(BASE+'/clubs/fencing/', wait_until='domcontentloaded', timeout=45000)
    settle(mp)
    check('fencing (mobile): coach line present', COACH in mp.locator('main').inner_text())
    mp.close()
    b.close()

fails=[n for n,ok in results if not ok]
print(f"\n{len(results)-len(fails)}/{len(results)} checks passed")
if fails:
    raise SystemExit('FAILURES: '+', '.join(fails))
print('CLUBS BROWSER QA: ALL PASS')
