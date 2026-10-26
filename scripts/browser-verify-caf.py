# Cafeteria — headless browser verification (desktop 1440x900 + mobile 390x844)
# against the LOCAL build at localhost:4173. Same pattern as the clubs/art-room
# verify scripts: settle() = load + scroll-through (lazy images) + img wait.
from playwright.sync_api import sync_playwright

BASE='http://localhost:4173'
HUB=BASE+'/cafeteria/'
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

with sync_playwright() as p:
    b=p.chromium.launch()
    d=b.new_context(viewport={'width':1440,'height':900})
    pg=d.new_page()

    # 1. Room hub, desktop
    pg.goto(HUB, wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    h1s=pg.eval_on_selector_all('h1','els=>els.map(e=>e.textContent.trim())')
    check('hub: one h1', len(h1s)==1 and h1s[0].startswith('The Cafeteria'), str(h1s))
    order=pg.evaluate("""() => {
        const imgs=[...document.querySelectorAll('img')].map(i=>i.getAttribute('src'));
        const c=imgs.findIndex(s=>s&&s.includes('cafeteria/cover.webp'));
        const f=imgs.findIndex(s=>s&&s.includes('cafeteria/apple.webp'));
        return [c,f,c>-1&&f>-1&&c<f];
    }""")
    check('hub: cover fronts the shelves (cover before apple)', order[2], str(order))
    tiles=pg.eval_on_selector_all('.lp-tile','els=>els.map(e=>e.getAttribute("href"))')
    check('hub: exactly 62 tiles, all /cafeteria/<slug>/', len(tiles)==62 and all(t and t.startswith('/cafeteria/') and t.endswith('/') for t in tiles), str(len(tiles)))
    imgs=pg.eval_on_selector_all('.lp-tile img','els=>els.map(e=>e.naturalWidth)')
    check('hub: all 62 card images loaded', len(imgs)==62 and all(w>0 for w in imgs), str([w for w in imgs if w==0]))
    mainTxt=pg.locator('main').inner_text()
    check('hub: main shelf named (29 foods)','THE MAIN SHELF · 29 FOODS' in mainTxt)
    check('hub: More foods named (33 more)','MORE FOODS · 33 MORE' in mainTxt)
    for link in ['/rooms/','/preschool/3-years/fruits-and-vegetables/','/kitchen/','/flashcards/cafeteria/','/games/hot-potato/','/games/simon-says/','/games/treasure-hunt/']:
        check('hub: links '+link, pg.locator(f'a[href="{link}"]').count()>=1)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('hub: no horizontal overflow (desktop)', ov<=0, str(ov))
    landfit=pg.evaluate("""() => {
        const img=document.querySelector('.lp-tile.caf-land img');
        return img?getComputedStyle(img).objectFit:'none';
    }""")
    check('hub: landscape tile uses object-fit contain', landfit=='contain', landfit)

    # 2. Tile click → short page (apple: landscape + word twin)
    pg.click('a.lp-tile[href="/cafeteria/apple/"]')
    pg.wait_for_load_state('load', timeout=45000)
    check('hub → apple tile lands on /cafeteria/apple/', pg.url.endswith('/cafeteria/apple/'))
    check('apple: h1 is Apple', 'Apple' in pg.locator('h1').inner_text())
    check('apple: card image loaded', pg.evaluate("()=>{const i=document.querySelector('.fc2-hero img');return i&&i.naturalWidth>0}"))
    check('apple: hero img carries caf-land (landscape)', pg.evaluate("()=>{const i=document.querySelector('.fc2-hero img');return i&&i.classList.contains('caf-land')}"))
    body=pg.locator('main').inner_text()
    check('apple: activity quoted verbatim', '“Point to the apple”' in body)
    check('apple: back link to /cafeteria/', pg.locator('a[href="/cafeteria/"]').count()>=1)
    check('apple: links lesson + print twin', pg.locator('a[href="/cafeteria/learn/apple/"]').count()>=1 and pg.locator('a[href="/flashcards/cafeteria/apple/"]').count()>=1)
    check('apple: friend link to its fruits twin', pg.locator('a[href="/flashcards/fruits-and-vegetables/apple/"]').count()>=1)

    # 3. A portrait short page (bagel) has NO caf-land hook
    pg.goto(BASE+'/cafeteria/bagel/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    check('bagel: portrait card has no caf-land', pg.evaluate("()=>{const i=document.querySelector('.fc2-hero img');return i&&!i.classList.contains('caf-land')}"))

    # 4. Lesson page
    pg.goto(BASE+'/cafeteria/learn/apple/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    check('lesson: eyebrow is CAFETERIA LESSON','CAFETERIA LESSON' in pg.locator('main').inner_text())
    check('lesson: breadcrumb through School Rooms', pg.locator('a[href="/rooms/"]').count()>=1)
    check('lesson: teaches the pointing game', 'point' in pg.locator('main').inner_text().lower())

    # 5. Library set page + one card page
    pg.goto(BASE+'/flashcards/cafeteria/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    cards=pg.eval_on_selector_all('a[href*="/flashcards/cafeteria/"]','els=>els.length')
    check('set page: carries the cafeteria deck', cards>=62, str(cards))
    pg.goto(BASE+'/flashcards/cafeteria/spaghetti/', wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    check('card page: real R2 art', pg.evaluate("()=>{const i=document.querySelector('img[src*=\"school/cafeteria/spaghetti\"]');return i&&i.naturalWidth>0}"))
    check('card page: age pill Ages 2–5', 'Ages 2–5' in pg.locator('main').inner_text())

    # 6. The three linking pages point back
    for path,name in [('/rooms/','rooms hub'),('/kitchen/','kitchen class'),('/preschool/3-years/fruits-and-vegetables/','Class 22')]:
        pg.goto(BASE+path, wait_until='domcontentloaded', timeout=45000)
        settle(pg)
        check(name+' links the Cafeteria', pg.locator('a[href="/cafeteria/"]').count()>=1)
    pg.goto(BASE+'/rooms/', wait_until='domcontentloaded', timeout=45000)
    check('rooms hub: seven room cards', pg.eval_on_selector_all('.room-card','els=>els.length')==7)
    pg.goto(BASE+'/flashcards/fruits-and-vegetables/banana/', wait_until='domcontentloaded', timeout=45000)
    check('banana card: friend link to cafeteria version', pg.locator('a[href="/cafeteria/banana/"]').count()>=1)
    check('banana card: Look & Learn link kept', pg.locator('a[href="/look-and-learn/"]').count()>=1)

    # 7. Mobile 390
    m=b.new_context(viewport={'width':390,'height':844})
    mp=m.new_page()
    mp.goto(HUB, wait_until='domcontentloaded', timeout=45000)
    settle(mp)
    ov=mp.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('mobile hub: no horizontal overflow', ov<=0, str(ov))
    mtiles=mp.eval_on_selector_all('.lp-tile img','els=>els.map(e=>e.naturalWidth)')
    check('mobile hub: tiles render with images', len(mtiles)==62 and all(w>0 for w in mtiles), str([w for w in mtiles if w==0]))
    mp.goto(BASE+'/cafeteria/apple/', wait_until='domcontentloaded', timeout=45000)
    settle(mp)
    ov=mp.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('mobile apple: no horizontal overflow', ov<=0, str(ov))
    check('mobile apple: hero image loaded', mp.evaluate("()=>{const i=document.querySelector('.fc2-hero img');return i&&i.naturalWidth>0}"))

    b.close()

fails=[n for n,ok in results if not ok]
print(f"\n{len(results)-len(fails)}/{len(results)} passed")
if fails:
    print('FAILURES:', fails)
    raise SystemExit(1)
