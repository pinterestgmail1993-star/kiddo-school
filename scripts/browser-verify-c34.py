# Class 34 + lesson-canvas browser verification (desktop 1440x900 + mobile 390x844).
# Checks the owner's spec end to end on the LOCAL build served at localhost:4173.
from playwright.sync_api import sync_playwright
import json, sys

BASE='http://localhost:4173'
C34=BASE+'/preschool/4-years/weather-seasons-and-what-we-wear/'
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

    # 1. Class 34 hub
    pg.goto(C34, wait_until='networkidle')
    check('hub: one h1', pg.eval_on_selector_all('h1','els=>els.length')==1)
    check('hub: LEARN WITH FLASHCARDS label', pg.locator('text=LEARN WITH FLASHCARDS').count()>=1)
    check('hub: 29 lesson nav links', pg.eval_on_selector_all('a[href*="'+C34.replace(BASE,'')+'learn/"]','els=>new Set(els.map(e=>e.href)).size')==29)
    check('hub: honest worksheets note', pg.locator('text=Worksheets are on the way, not yet here').count()==1)
    check('hub: no canvas mount', pg.locator('[data-wc]').count()==0)
    check('hub: resource section links collection', pg.locator('a.button[href="/flashcards/weather-seasons-and-what-we-wear/"]').count()==1)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('hub: no horizontal overflow (desktop)', ov<=0, str(ov))

    # 2. Sun lesson — the owner's spec: canvas + tools left, teaching right
    pg.goto(C34+'learn/sun/', wait_until='networkidle')
    pg.wait_for_timeout(1200)  # write-color mounts
    check('lesson: exactly one drawing mount', pg.locator('.wc-mount').count()==1)
    check('lesson: restore key per child+lesson', pg.locator('[data-wc-restore="learn/weather-seasons-and-what-we-wear/sun"]').count()==1)
    check('lesson: toolbar rendered under the card', pg.locator('.wc-toolbar').count()>=1)
    check('lesson: save button', pg.locator('.wc-save').count()==1)
    check('lesson: R2 artwork loaded', pg.evaluate("()=>{const i=document.querySelector('.wc-mount img');return i&&i.complete&&i.naturalWidth>0}"))
    check('lesson: canvas overlay present', pg.locator('.wc-canvas').count()==1)
    # draw a stroke
    box=pg.locator('.wc-canvas').bounding_box()
    pg.mouse.move(box['x']+box['width']*0.3, box['y']+box['height']*0.3)
    pg.mouse.down(); pg.mouse.move(box['x']+box['width']*0.6, box['y']+box['height']*0.45, steps=12); pg.mouse.up()
    painted=pg.evaluate("()=>{const c=document.querySelector('.wc-canvas');const x=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let n=0;for(let i=3;i<x.length;i+=997*4)if(x[i]>0)n++;return n>0}")
    check('lesson: stroke lands on the canvas layer', painted)
    check('lesson: teaching blocks in order', pg.eval_on_selector_all('.fcl-copy h2','els=>els.map(e=>e.textContent).join("|")').startswith('What is this?'))
    check('lesson: exactly one library cross-link', pg.eval_on_selector_all('.fcl-copy a[href^="/flashcards/weather-seasons-and-what-we-wear/"]','els=>els.length')==1)
    check('lesson: prev/next', pg.locator('nav[aria-label="Previous and next lesson"] a').count()==2)
    # save → download event
    with pg.expect_download() as dl:
        pg.locator('.wc-save').click()
    check('lesson: save downloads a PNG', dl.value.suggested_filename.endswith('.png'), dl.value.suggested_filename)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('lesson: no horizontal overflow (desktop)', ov<=0, str(ov))

    # 3. Library card is paper
    pg.goto(BASE+'/flashcards/weather-seasons-and-what-we-wear/sun/', wait_until='networkidle')
    pg.wait_for_timeout(500)
    check('library card: NO canvas', pg.locator('[data-wc]').count()==0)
    check('library card: download button', pg.locator('a[download="sun.webp"]').count()==1)
    check('library card: print button', pg.locator('[data-tc-print-view]').count()>=1)
    check('library card: share row', pg.locator('.fc2-share').count()>=1)
    check('library card: reaction block', pg.locator('[data-fc-reaction]').count()>=1)
    check('library card: teach-it cross-link to lesson', pg.locator('a[href="'+C34.replace(BASE,'')+'learn/sun/"]').count()==1)

    # 4. Collection page
    pg.goto(BASE+'/flashcards/weather-seasons-and-what-we-wear/', wait_until='networkidle')
    check('collection: 29 whole-card links', pg.eval_on_selector_all('a.fc-card[href]','els=>els.filter(e=>/weather-seasons-and-what-we-wear\\/[a-z-]+\\/$/.test(e.href)).length')==29)
    check('collection: no canvas', pg.locator('[data-wc]').count()==0)

    # 5. Learning Path + hubs regression
    pg.goto(BASE+'/learning-path/', wait_until='networkidle')
    check('LP: row 34 with link', pg.locator('a[href="'+C34.replace(BASE,'')+'"]').count()>=1)
    check('LP: intro says Thirty-two', pg.locator('text=Thirty-two classes are ready now').count()>=1)
    pg.goto(C34.replace(BASE,'') and BASE+'/preschool/4-years/community-helpers-and-our-neighborhood/', wait_until='networkidle')
    check('C33 hub: LEARN WITH FLASHCARDS + PRACTISE WITH WORKSHEETS', pg.locator('text=LEARN WITH FLASHCARDS').count()>=1 and pg.locator('text=PRACTISE WITH WORKSHEETS').count()>=1)
    # C33 doctor lesson canvas (regression: shared engine)
    pg.goto(BASE+'/preschool/4-years/community-helpers-and-our-neighborhood/learn/doctor/', wait_until='networkidle')
    pg.wait_for_timeout(1000)
    check('C33 lesson: canvas + tools present', pg.locator('.wc-mount').count()==1 and pg.locator('.wc-toolbar').count()>=1)
    # library pages stay paper
    pg.goto(BASE+'/flashcards/community-helpers-and-our-neighborhood/doctor/', wait_until='networkidle')
    check('C33 library card: still paper', pg.locator('[data-wc]').count()==0)
    # Magic games untouched
    r=pg.goto(BASE+'/preschool/3-years/magic-shape-builder/', wait_until='domcontentloaded')
    check('magic shape builder: 200', r.status==200)
    d.close()

    # ---------- MOBILE ----------
    m=b.new_context(viewport={'width':390,'height':844}, is_mobile=True, has_touch=True)
    pm=m.new_page()
    pm.on('pageerror', lambda e: errors.append('mobile: '+str(e)))
    pm.goto(C34, wait_until='networkidle')
    ov=pm.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('mobile hub: no horizontal overflow', ov<=0, str(ov))
    pm.goto(C34+'learn/rainbow/', wait_until='networkidle')
    pm.wait_for_timeout(1200)
    check('mobile lesson: canvas mounted', pm.locator('.wc-mount .wc-canvas').count()==1)
    check('mobile lesson: toolbar present', pm.locator('.wc-toolbar').count()>=1)
    ov=pm.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('mobile lesson: no horizontal overflow', ov<=0, str(ov))
    check('mobile lesson: image first (stacked)', pm.evaluate("()=>{const a=document.querySelector('.wc-mount').getBoundingClientRect();const b=document.querySelector('.fcl-copy').getBoundingClientRect();return a.top<b.top}"))
    pm.goto(BASE+'/flashcards/weather-seasons-and-what-we-wear/', wait_until='networkidle')
    ov=pm.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('mobile collection: no horizontal overflow', ov<=0, str(ov))
    m.close(); b.close()

fails=[r for r in results if not r[1]]
print('\n==== SUMMARY: %d checks, %d failed ====' % (len(results), len(fails)))
for n,ok,extra in fails: print('  FAILED:', n, extra)
if errors: print('\nCONSOLE/PAGE ERRORS:'); [print('  ', e[:200]) for e in errors[:10]]
sys.exit(1 if fails or errors else 0)
