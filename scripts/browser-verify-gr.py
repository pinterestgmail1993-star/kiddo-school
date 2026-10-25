# Kids Games rules — headless browser verification (desktop 1440x900 + mobile
# 390x844) against the LOCAL build at localhost:4173. Pattern follows
# browser-verify-ll.py.
from playwright.sync_api import sync_playwright

BASE='http://localhost:4173'
HUB=BASE+'/games/'
DDG=BASE+'/games/duck-duck-goose/'
HOP=BASE+'/games/hopscotch/'
TAG=BASE+'/games/tag/'
SP=BASE+'/preschool/4-years/sports-movement-and-play/'
KG=BASE+'/extra-classes/kids-games/'
EC=BASE+'/extra-classes/'
results=[]
def check(name, ok, extra=''):
    results.append((name, ok))
    print(('PASS ' if ok else 'FAIL ')+name+(('  -- '+extra) if extra and not ok else ''))

with sync_playwright() as p:
    b=p.chromium.launch()
    d=b.new_context(viewport={'width':1440,'height':900})
    pg=d.new_page()

    # 1. /games/ hub
    pg.goto(HUB, wait_until='networkidle')
    check('hub: one h1 = How to play every game in the deck', pg.eval_on_selector_all('h1','els=>els.length')==1 and 'How to play every game' in pg.locator('h1').inner_text())
    first=pg.eval_on_selector('.lesson-cover img','e=>e.getAttribute("src")')
    check('hub: cover.webp is the FIRST artwork', first and 'kids-games/flashcards/cover.webp' in first, str(first))
    check('hub: 35 game tiles', pg.eval_on_selector_all('.lp-tile','els=>els.length')==35)
    imgs=pg.eval_on_selector_all('.lp-tile img','els=>els.map(e=>e.naturalWidth)')
    check('hub: all 35 tile images loaded', len(imgs)==35 and all(w>0 for w in imgs), str([w for w in imgs if w==0])[:80])
    check('hub: links Class 37 + Kids Games class', pg.locator('a[href="/preschool/4-years/sports-movement-and-play/"]').count()>=1 and pg.locator('a[href="/extra-classes/kids-games/"]').count()>=1)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('hub: no horizontal overflow (desktop)', ov<=0, str(ov))

    # 2. duck-duck-goose page
    pg.goto(DDG, wait_until='networkidle')
    check('ddg: h1 = How to Play Duck Duck Goose.', 'How to Play Duck Duck Goose.' in pg.locator('h1').inner_text())
    check('ddg: title targets the how-to query', 'How to Play Duck Duck Goose' in pg.title())
    check('ddg: card artwork loaded', pg.eval_on_selector('.fc2-hero img','e=>e.naturalWidth')>0)
    steps=pg.eval_on_selector_all('.fc2-learn ol li','els=>els.map(e=>e.innerText)')
    check('ddg: the card\'s three rules quoted', len(steps)==3 and 'Sit in a circle.' in steps[0], str(steps)[:90])
    check('ddg: back to /games/', pg.locator('a[href="/games/"]').count()>=1)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('ddg: no horizontal overflow (desktop)', ov<=0, str(ov))

    # 3. hopscotch + tag spot checks
    pg.goto(HOP, wait_until='networkidle')
    check('hopscotch: h1 + skill pill', 'How to Play Hopscotch.' in pg.locator('h1').inner_text() and pg.locator('text=Balance + Counting').count()>=1)
    pg.goto(TAG, wait_until='networkidle')
    check('tag: h1 + fresh-twist block', 'How to Play Tag.' in pg.locator('h1').inner_text() and pg.locator('text=Make it fresh tomorrow').count()>=1)

    # 4. Cross-links: Class 37 -> /games/, Kids Games class -> /games/, extras hub -> L&L
    pg.goto(SP, wait_until='networkidle')
    check('Class 37: links /games/', pg.locator('a[href="/games/"]').count()>=1)
    pg.goto(KG, wait_until='networkidle')
    check('Kids Games class: links /games/ + 26 old tiles intact', pg.locator('a[href="/games/"]').count()>=1 and pg.eval_on_selector_all('.lp-tile','els=>els.length')==26)
    pg.goto(EC, wait_until='networkidle')
    check('extras hub: Look & Learn tile present', pg.locator('a[href="/look-and-learn/"]').count()>=1)
    pg.close()

    # MOBILE spot check
    m=b.new_context(viewport={'width':390,'height':844})
    pm=m.new_page()
    for name,url in [('hub',HUB),('duck-duck-goose',DDG)]:
        pm.goto(url, wait_until='networkidle')
        ov=pm.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
        check(f'{name}: no horizontal overflow (mobile 390)', ov<=0, str(ov))
    pm.close()
    b.close()

fails=[n for n,ok in results if not ok]
print(f"\n{len(results)-len(fails)}/{len(results)} passed")
if fails: raise SystemExit('FAILURES: '+', '.join(fails))
