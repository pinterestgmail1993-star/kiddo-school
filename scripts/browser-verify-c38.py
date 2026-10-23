# Class 38 · Feelings & Kindness — headless browser verification
# (desktop 1440x900 + mobile 390x844) against the LOCAL build at localhost:4173.
from playwright.sync_api import sync_playwright

BASE='http://localhost:4173'
CLS=BASE+'/preschool/4-years/feelings-and-kindness/'
LESSON=CLS+'learn/happy-sad-angry-calm/'
CARD=BASE+'/flashcards/feelings-and-kindness/happy-sad-angry-calm/'
results=[]; errors=[]
def check(name, ok, extra=''):
    results.append((name, ok, extra))
    print(('PASS ' if ok else 'FAIL ')+name+(('  -- '+extra) if extra and not ok else ''))

with sync_playwright() as p:
    b=p.chromium.launch()
    # ---------- DESKTOP ----------
    d=b.new_context(viewport={'width':1440,'height':900})
    pg=d.new_page()
    pg.on('console', lambda m: errors.append(m.text) if m.type=='error' else None)
    pg.on('pageerror', lambda e: errors.append(str(e)))

    # 1. Class 38 hub
    pg.goto(CLS, wait_until='networkidle')
    check('hub: one h1 = Feelings & Kindness', pg.eval_on_selector_all('h1','els=>els.length')==1 and 'Feelings' in pg.locator('h1').inner_text())
    check('hub: 35 lesson tiles', pg.eval_on_selector_all('.lp-tiles a.lp-tile','els=>els.length')==35)
    check('hub: resource section links the library set', pg.locator('a[href="/flashcards/feelings-and-kindness/"]').count()>=1)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('hub: no horizontal overflow (desktop)', ov<=0, str(ov))
    imgs=pg.eval_on_selector_all('.lp-tiles img','els=>els.map(e=>e.naturalWidth)')
    check('hub: all 35 tile images loaded', len(imgs)==35 and all(w>0 for w in imgs), str(imgs[:5]))

    # 2. One lesson page
    pg.goto(LESSON, wait_until='networkidle')
    check('lesson: one h1', pg.eval_on_selector_all('h1','els=>els.length')==1)
    check('lesson: canvas mount (data-wc)', pg.locator('[data-wc]').count()==1)
    check('lesson: teaching blocks render', len(pg.eval_on_selector_all('.fcl-copy .fc2-do','els=>els'))>=10)
    check('lesson: prev/next lesson nav', pg.locator('.fc2-pn').count()==1)
    check('lesson: pairs with library twin', pg.locator('a[href="'+CARD.replace(BASE,'')+'"]').count()>=1)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('lesson: no horizontal overflow (desktop)', ov<=0, str(ov))

    # 3. One card page
    pg.goto(CARD, wait_until='networkidle')
    check('card: one h1', pg.eval_on_selector_all('h1','els=>els.length')==1)
    check('card: download button', pg.locator('a.button[download]').count()>=1)
    check('card: teach-it link to lesson', pg.locator('a[href="'+LESSON.replace(BASE,'')+'"]').count()>=1)
    check('card: no canvas (flashcards are paper)', pg.locator('[data-wc]').count()==0)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('card: no horizontal overflow (desktop)', ov<=0, str(ov))

    # 4. Learning Path row 38
    pg.goto(BASE+'/learning-path/', wait_until='networkidle')
    check('LP: Class 38 row present', pg.locator('text=Class 38:').count()==1)
    check('LP: links Class 38 hub', pg.locator('a[href="/preschool/4-years/feelings-and-kindness/"]').count()>=1)

    # 5. Age 4 hub
    pg.goto(BASE+'/preschool/4-years/', wait_until='networkidle')
    check('hub4: Class 38 stage card', pg.locator('a[href="/preschool/4-years/feelings-and-kindness/"]').count()>=1)

    # 6. Class 32 cross-link
    pg.goto(BASE+'/preschool/4-years/life-skills-and-good-habits/', wait_until='networkidle')
    check('C32: Next link present', pg.locator('text=Feelings & Kindness (Class 38)').count()>=1)

    # 7. Class 13 cross-link
    pg.goto(BASE+'/toddler/2-years/emotions-and-feelings/', wait_until='networkidle')
    check('C13: More feelings pill present', pg.locator('a:has-text("More feelings for ages 4–5")').count()>=1)

    # ---------- MOBILE ----------
    m=b.new_context(viewport={'width':390,'height':844})
    mp=m.new_page()
    for name,url in [('hub',CLS),('lesson',LESSON),('card',CARD)]:
        mp.goto(url, wait_until='networkidle')
        ov=mp.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
        check(name+': no horizontal overflow (mobile 390)', ov<=0, str(ov))

    b.close()

fails=[r for r in results if not r[1]]
print('\n%d/%d checks passed' % (len(results)-len(fails), len(results)))
if errors: print('console errors:', errors[:5])
exit(1 if fails or errors else 0)
