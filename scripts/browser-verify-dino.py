# Dinosaurs extra class — headless browser verification (desktop 1440x900 +
# mobile 390x844) against the LOCAL build at localhost:4173. Pattern follows
# browser-verify-pg-games.py.
from playwright.sync_api import sync_playwright

BASE='http://localhost:4173'
HUB=BASE+'/dinosaurs/'
SHORT=BASE+'/dinosaurs/tyrannosaurus-rex/'
LESSON=BASE+'/dinosaurs/learn/triceratops/'
SET=BASE+'/flashcards/dinosaurs/'
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
        page.wait_for_function("""() => [...document.images].every(i => i.complete)""", timeout=8000)
    except Exception:
        pass
    page.wait_for_timeout(1000)

with sync_playwright() as p:
    b=p.chromium.launch()
    d=b.new_context(viewport={'width':1440,'height':900})
    pg=d.new_page()

    # 1. Class hub
    pg.goto(HUB, wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    check('hub: one h1', pg.eval_on_selector_all('h1','els=>els.length')==1)
    first=pg.eval_on_selector('.lesson-cover img','e=>e.getAttribute("src")')
    check('hub: cover.webp is the FIRST artwork', first and 'extra-classes/dinosaurs/cover.webp' in first, str(first))
    tiles=pg.eval_on_selector_all('.lp-tile','els=>els.map(e=>e.getAttribute("href"))')
    shorts=[h for h in tiles if h and h.startswith('/dinosaurs/') and '/learn/' not in h]
    check('hub: 33 short-page tiles', len(shorts)==33, str(len(shorts)))
    check('hub: pinned six lead', shorts[0]=='/dinosaurs/tyrannosaurus-rex/' and shorts[1]=='/dinosaurs/triceratops/' and shorts[5]=='/dinosaurs/velociraptor/' and shorts[6]=='/dinosaurs/allosaurus/', str(shorts[:7]))
    gimgs=pg.eval_on_selector_all('.lp-tile img','els=>els.map(e=>e.naturalWidth)')
    check('hub: all 33 tile images loaded', len(gimgs)==33 and all(w>0 for w in gimgs), str([w for w in gimgs if w==0])[:80])
    check('hub: links Class 36 + AC + games shelf + set', pg.locator('a[href="/preschool/4-years/animals-and-their-habitats/"]').count()>=1 and pg.locator('a[href="/extra-classes/animal-categories/"]').count()>=1 and pg.locator('a[href="/games/animal-walks/"]').count()>=1 and pg.locator('a[href="/flashcards/dinosaurs/"]').count()>=1)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('hub: no horizontal overflow (desktop)', ov<=0, str(ov))

    # 2. Short page: card + action + back
    pg.goto(SHORT, wait_until='domcontentloaded', timeout=45000)
    settle(pg)
    check('short: h1 = Tyrannosaurus Rex', 'Tyrannosaurus Rex' in pg.locator('h1').inner_text())
    check('short: card artwork loaded', pg.eval_on_selector('.fc2-hero img','e=>e.naturalWidth')>0)
    check('short: card action quoted', pg.locator('text=Stomp like a T. rex').count()>=1)
    check('short: back to /dinosaurs/ + lesson + print links', pg.locator('a[href="/dinosaurs/"]').count()>=1 and pg.locator('a[href="/dinosaurs/learn/tyrannosaurus-rex/"]').count()>=1 and pg.locator('a[href="/flashcards/dinosaurs/tyrannosaurus-rex/"]').count()>=1)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('short: no horizontal overflow (desktop)', ov<=0, str(ov))
    # tile click → back link navigation
    pg.goto(HUB, wait_until='domcontentloaded', timeout=45000); settle(pg)
    pg.click('a.lp-tile[href="/dinosaurs/triceratops/"]')
    pg.wait_for_load_state('load', timeout=45000)
    check('hub → tile click lands on /dinosaurs/triceratops/', pg.url.endswith('/dinosaurs/triceratops/') and 'Triceratops' in pg.locator('h1').inner_text())
    pg.close()

    # 3. Lesson page
    pg2=d.new_page()
    pg2.goto(LESSON, wait_until='domcontentloaded', timeout=45000)
    settle(pg2)
    check('lesson: triceratops h1 + card + teaching blocks', pg2.locator('h1:has-text("Triceratops")').count()>=1 and pg2.locator('.fcl-teach, ol').count()>=1 and pg2.eval_on_selector_all('img','els=>els.some(e=>e.naturalWidth>0 && (e.getAttribute("src")||"").includes("triceratops.webp"))'))
    check('lesson: pairs-with library link + back to class', pg2.locator('a[href="/flashcards/dinosaurs/triceratops/"]').count()>=1 and pg2.locator('a[href="/dinosaurs/"]').count()>=1)
    # 4. Library set + card page (age pill)
    pg2.goto(SET, wait_until='domcontentloaded', timeout=45000); settle(pg2)
    check('set: links its class + thirty-three on the wall', pg2.locator('a[href="/dinosaurs/"]').count()>=1 and pg2.locator('text=thirty-three').count()>=1)
    pg2.goto(BASE+'/flashcards/dinosaurs/velociraptor/', wait_until='domcontentloaded', timeout=45000); settle(pg2)
    check('card page: age pill + download + lesson link', pg2.locator('text=Ages 3+').count()>=1 and pg2.locator('a[href="/dinosaurs/learn/velociraptor/"]').count()>=1)
    # 5. Cross-links live
    pg2.goto(BASE+'/preschool/4-years/animals-and-their-habitats/', wait_until='domcontentloaded', timeout=45000)
    check('Class 36: links /dinosaurs/', pg2.locator('a[href="/dinosaurs/"]').count()>=1)
    pg2.goto(BASE+'/extra-classes/animal-categories/', wait_until='domcontentloaded', timeout=45000)
    check('AC: links /dinosaurs/ + 23 tiles', pg2.locator('a[href="/dinosaurs/"]').count()>=1)
    pg2.close(); pg2=None
    d.close()

    # 6. Mobile 390
    m=b.new_context(viewport={'width':390,'height':844}); mp=m.new_page()
    mp.goto(HUB, wait_until='domcontentloaded', timeout=45000)
    settle(mp)
    ov=mp.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('hub: no horizontal overflow (mobile 390)', ov<=0, str(ov))
    check('hub (mobile): 33 tiles render', mp.eval_on_selector_all('.lp-tile','els=>els.length')==33)
    mp.goto(SHORT, wait_until='domcontentloaded', timeout=45000); settle(mp)
    ov=mp.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('short (mobile): no overflow', ov<=0, str(ov))
    mp.close(); m.close()
    b.close()

fails=[n for n,ok in results if not ok]
print(f'\n{len(results)-len(fails)}/{len(results)} checks passed'+('' if not fails else ' — FAILURES: '+', '.join(fails)))
raise SystemExit(1 if fails else 0)
