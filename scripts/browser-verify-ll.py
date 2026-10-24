# Look & Learn — headless browser verification (desktop 1440x900 + mobile
# 390x844) against the LOCAL build at localhost:4173. Pattern follows
# browser-verify-c38.py.
from playwright.sync_api import sync_playwright

BASE='http://localhost:4173'
CLS=BASE+'/look-and-learn/'
WORD=BASE+'/flashcards/moon/'
C22=BASE+'/preschool/3-years/fruits-and-vegetables/'
C31=BASE+'/preschool/4-years/science-nature-and-discovery/'
BANANA=BASE+'/flashcards/fruits-and-vegetables/banana/'
results=[]
def check(name, ok, extra=''):
    results.append((name, ok))
    print(('PASS ' if ok else 'FAIL ')+name+(('  -- '+extra) if extra and not ok else ''))

with sync_playwright() as p:
    b=p.chromium.launch()
    d=b.new_context(viewport={'width':1440,'height':900})
    pg=d.new_page()

    # 1. Class page
    pg.goto(CLS, wait_until='networkidle')
    check('class: one h1 = Look & Learn', pg.eval_on_selector_all('h1','els=>els.length')==1 and 'Learn' in pg.locator('h1').inner_text())
    first=pg.eval_on_selector('.lesson-cover img','e=>e.getAttribute("src")')
    check('class: cover.webp is the FIRST artwork', first and 'cover.webp' in first, str(first))
    check('class: 15 card cells', pg.eval_on_selector_all('.ll-cell','els=>els.length')==15)
    check('class: 48 word links per row set (15×4 tiles) + 48 in the index', pg.eval_on_selector_all('.ll-words a','els=>els.length')==60 and pg.eval_on_selector_all('main a[href^="/flashcards/"]','els=>els.length')>=108, str(pg.eval_on_selector_all('.ll-words a','els=>els.length'))+'/'+str(pg.eval_on_selector_all('main a[href^="/flashcards/"]','els=>els.length')))
    imgs=pg.eval_on_selector_all('.ll-cell img','els=>els.map(e=>e.naturalWidth)')
    check('class: all 15 tile images loaded', len(imgs)==15 and all(w>0 for w in imgs))
    check('class: back-links to Classes 11/22/31', pg.locator('a[href="/toddler/2-years/animals-and-sounds/"],a[href="/preschool/3-years/fruits-and-vegetables/"],a[href="/preschool/4-years/science-nature-and-discovery/"]').count()>=3)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('class: no horizontal overflow (desktop)', ov<=0, str(ov))

    # 2. Word page (moon — card 01)
    pg.goto(WORD, wait_until='networkidle')
    check('word: h1 = Moon Flashcard for Kids', 'Moon Flashcard' in pg.locator('h1').inner_text())
    check('word: card artwork loaded', pg.eval_on_selector('.fc2-hero img','e=>e.naturalWidth')>0)
    check('word: say block quotes the card', 'Point to the moon' in pg.locator('.fc2-say').inner_text())
    check('word: back button to the class', pg.locator('a[href="/look-and-learn/"]').count()>=2)
    check('word: feedback mount present', pg.locator('[data-fc-root]').count()==1, str(pg.locator('[data-fc-root]').count()))
    check('word: sibling links row', pg.locator('.ll-words a').count()>=3)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('word: no horizontal overflow (desktop)', ov<=0, str(ov))

    # 3. Class 22 carries the cross-link
    pg.goto(C22, wait_until='networkidle')
    check('Class 22: links Look & Learn', pg.locator('a[href="/look-and-learn/"]').count()>=1)
    # 4. Class 31 carries the cross-link
    pg.goto(C31, wait_until='networkidle')
    check('Class 31: links Look & Learn', pg.locator('a[href="/look-and-learn/"]').count()>=1)
    # 5. Kept page: banana URL unchanged + friend link added
    pg.goto(BANANA, wait_until='networkidle')
    check('banana: canonical unchanged', pg.locator('link[rel="canonical"]').get_attribute('href')=='https://kiddo.school/flashcards/fruits-and-vegetables/banana/')
    check('banana: Look & Learn friend link present', pg.locator('a[href="/look-and-learn/"]').count()>=1)
    pg.close()

    # MOBILE spot check
    m=b.new_context(viewport={'width':390,'height':844})
    pm=m.new_page()
    pm.goto(CLS, wait_until='networkidle')
    ov=pm.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('class: no horizontal overflow (mobile 390)', ov<=0, str(ov))
    pm.goto(WORD, wait_until='networkidle')
    ov=pm.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('word: no horizontal overflow (mobile 390)', ov<=0, str(ov))
    b.close()

fails=[r for r in results if not r[1]]
print(f'\n{len(results)-len(fails)}/{len(results)} checks passed')
exit(1 if fails else 0)
