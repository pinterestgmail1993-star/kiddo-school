# LIVE production verification for Class 34 (kiddo-school.pages.dev).
from playwright.sync_api import sync_playwright
import sys
B='https://kiddo-school.pages.dev'
C34=B+'/preschool/4-years/weather-seasons-and-what-we-wear/'
ok=[];bad=[];errs=[]
def check(n,c,extra=''):
    (ok if c else bad).append(n); print(('PASS ' if c else 'FAIL ')+n+(('  -- '+extra) if extra and not c else ''))
with sync_playwright() as p:
    b=p.chromium.launch()
    d=b.new_context(viewport={'width':1440,'height':900}); pg=d.new_page()
    pg.on('console', lambda m: errs.append(m.type+': '+m.text[:160]) if m.type=='error' else None)
    pg.on('pageerror', lambda e: errs.append('pageerror: '+str(e)[:160]))
    pg.goto(C34+'learn/sun/', wait_until='networkidle'); pg.wait_for_timeout(1500)
    check('live lesson: R2 image loaded with CORS', pg.evaluate("()=>{const i=document.querySelector('.wc-mount img');return i&&i.complete&&i.naturalWidth>0}"))
    check('live lesson: crossorigin kept (no fallback)', pg.evaluate("()=>document.querySelector('.wc-mount img').crossOrigin==='anonymous'"))
    box=pg.locator('.wc-canvas').bounding_box()
    pg.mouse.move(box['x']+box['width']*0.3, box['y']+box['height']*0.3)
    pg.mouse.down(); pg.mouse.move(box['x']+box['width']*0.65, box['y']+box['height']*0.5, steps=15); pg.mouse.up()
    painted=pg.evaluate("()=>{const c=document.querySelector('.wc-canvas');const x=c.getContext('2d').getImageData(0,0,c.width,c.height).data;for(let i=3;i<x.length;i+=997*4)if(x[i]>0)return true;return false}")
    check('live lesson: stroke painted + canvas clean', painted)
    with pg.expect_download() as dl: pg.locator('.wc-save').click()
    fn=dl.value.suggested_filename
    check('live lesson: save composes full PNG (no -drawing fallback)', fn=='kiddo-sun-flashcard.png', fn)
    # restore: reload → stroke pixels back
    pg.reload(wait_until='networkidle'); pg.wait_for_timeout(1500)
    restored=pg.evaluate("()=>{const c=document.querySelector('.wc-canvas');const x=c.getContext('2d').getImageData(0,0,c.width,c.height).data;for(let i=3;i<x.length;i+=997*4)if(x[i]>0)return true;return false}")
    check('live lesson: per-child restore after reload', restored)
    ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('live lesson: no overflow desktop', ov<=0, str(ov))
    pg.goto(C34, wait_until='networkidle')
    check('live hub: 29 lesson links', pg.eval_on_selector_all('a[href*="learn/"]','els=>new Set(els.map(e=>e.href)).size')==29)
    check('live hub: no canvas', pg.locator('[data-wc]').count()==0)
    m=b.new_context(viewport={'width':390,'height':844}, is_mobile=True, has_touch=True); pm=m.new_page()
    pm.on('pageerror', lambda e: errs.append('mobile pageerror: '+str(e)[:160]))
    pm.goto(C34+'learn/rainbow/', wait_until='networkidle'); pm.wait_for_timeout(1500)
    bb=pm.locator('.wc-canvas').bounding_box()
    pm.touchscreen.tap(bb['x']+bb['width']*0.5, bb['y']+bb['height']*0.5)
    tp=pm.evaluate("()=>{const c=document.querySelector('.wc-canvas');const x=c.getContext('2d').getImageData(0,0,c.width,c.height).data;for(let i=3;i<x.length;i+=997*4)if(x[i]>0)return true;return false}")
    check('live mobile: touch stroke on canvas', tp)
    ov=pm.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
    check('live mobile: no overflow', ov<=0, str(ov))
    b.close()
print('\n==== LIVE: %d pass, %d fail ===='%(len(ok),len(bad)))
real=[e for e in errs if 'ERR_FAILED' not in e]
if real: print('console errors:'); [print('  ',e) for e in real[:8]]
else: print('console errors: NONE (clean production)')
sys.exit(1 if bad or real else 0)
