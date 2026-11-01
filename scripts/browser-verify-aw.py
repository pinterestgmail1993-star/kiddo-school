#!/usr/bin/env python3
"""Browser-verify the Class 49 · Action Words round: the class page (first
card as the hero main image, five shelves, 24 tiles) and two short pages
(the owner's example /action-words/run-jump-climb-push/ plus card 1),
zero JS errors, no horizontal overflow desktop+mobile, all images decode
after scroll, download buttons point at the exact R2 masters, LP row and
count word live. Screenshots archived to scripts/aw-tmp/."""
import subprocess, time
from playwright.sync_api import sync_playwright

SRV=subprocess.Popen(['python3','-m','http.server','8126','--directory','dist'],
                     stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
time.sleep(1.2)
checks=[]
def ok(name,cond=True):
    print(('PASS ' if cond else 'FAIL ')+name)
    checks.append(cond)

try:
    with sync_playwright() as pw:
        b=pw.chromium.launch()
        pg=b.new_page(viewport={'width':1440,'height':1000})
        errors=[]
        pg.on('pageerror',lambda e:errors.append(str(e)))
        pg.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
        pg.goto('http://localhost:8126/action-words/',wait_until='load',timeout=30000)
        pg.wait_for_timeout(800)
        hero=pg.locator('.lesson-cover img').first
        src=hero.get_attribute('src'); print('hero:',src)
        ok('hero main image = the deck\u2019s first card (bite-chew…)',src.endswith('action-words/bite-chew-smell-touch-feel-action-words-flashcard-for-kids.jpg'))
        ok('hero not lazy (LCP)',hero.get_attribute('loading') is None)
        tiles=pg.locator('.lp-tile'); n=tiles.count(); print('tiles:',n); ok('24 tiles on the class page',n==24)
        lazy=pg.evaluate("[...document.querySelectorAll('.lp-tile img')].every(i=>i.loading==='lazy')")
        dims=pg.evaluate("[...document.querySelectorAll('.lp-tile img')].every(i=>i.getAttribute('width')&&i.getAttribute('height'))")
        ok('every tile lazy + width/height',lazy and dims)
        subs=pg.locator('.lp-tile .lp-tile-sub').count()
        ok('word row under every tile title',subs==24)
        ov=pg.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
        print('h-overflow px:',ov); ok('no desktop overflow',ov<=0)
        pg.locator('#shelf-everyday').scroll_into_view_if_needed(); pg.wait_for_timeout(600)
        pg.locator('#shelf-people').scroll_into_view_if_needed(); pg.wait_for_timeout(900)
        imgs_ok=pg.evaluate("[...document.querySelectorAll('.lp-tile img')].every(i=>i.complete&&i.naturalWidth>0)")
        ok('all 24 tile images decode after scroll',imgs_ok)
        backs=pg.evaluate("[...document.querySelectorAll('.lesson-pill-link')].map(a=>a.getAttribute('href'))")
        ok('class page links back to Classes 37/6/32 + LP',all(u in backs for u in ['/preschool/4-years/sports-movement-and-play/','/baby/9-12-months/first-actions-body-parts/','/preschool/4-years/life-skills-and-good-habits/','/learning-path/']))
        pg.screenshot(path='scripts/aw-tmp/aw-desktop-top.png')
        pg.locator('#shelf-moves').scroll_into_view_if_needed(); pg.wait_for_timeout(500)
        pg.screenshot(path='scripts/aw-tmp/aw-desktop-shelf.png')
        # short page — the owner's own example slug
        pg2=b.new_page(viewport={'width':1440,'height':1000})
        e2=[]
        pg2.on('pageerror',lambda e:e2.append(str(e)))
        pg2.goto('http://localhost:8126/action-words/run-jump-climb-push/',wait_until='load',timeout=30000)
        pg2.wait_for_timeout(700)
        h1=pg2.locator('h1').first.inner_text(); print('h1:',h1)
        ok('short page h1 = Run, Jump, Climb & Push',h1.strip().startswith('Run, Jump, Climb & Push'))
        quote=pg2.locator('.dino-action').first.inner_text()
        ok('the card says quotes the printed words','RUN · JUMP · CLIMB · PUSH' in quote)
        hero2=pg2.locator('.fc2-hero img')
        ok('short-page hero eager (LCP, the Class 39 precedent) with honest dims',hero2.get_attribute('loading') is None and hero2.get_attribute('width')=='1414' and hero2.get_attribute('height')=='2000')
        crumb=pg2.locator('nav.breadcrumbs a').all_inner_texts()
        ok('breadcrumb: Home / Learning Path / Action Words','Action Words' in crumb and 'Learning Path' in crumb)
        dl=pg2.locator('a[download]').count(); ok('download the card button',dl==1)
        href=pg2.locator('a[download]').first.get_attribute('href')
        ok('download points at the exact R2 master',href.endswith('run-jump-climb-push-action-words-flashcard-for-kids.jpg'))
        ok('no JS errors on the short page',len(e2)==0)
        ov2=pg2.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
        ok('no overflow on the short page',ov2<=0)
        pg2.screenshot(path='scripts/aw-tmp/aw-card-desktop.png')
        # card 1 (the main-image card) renders with its number
        pg3=b.new_page(viewport={'width':1440,'height':1000})
        pg3.goto('http://localhost:8126/action-words/bite-chew-smell-touch-feel/',wait_until='load',timeout=30000)
        pg3.wait_for_timeout(500)
        ok('card 1 of 24',pg3.locator('.page-heading .eyebrow').first.inner_text().find('CARD 1 OF 24')>=0)
        # LP row + count
        lp=b.new_page(viewport={'width':1440,'height':1000})
        lp.goto('http://localhost:8126/learning-path/',wait_until='load',timeout=30000)
        lp.wait_for_timeout(500)
        body=lp.locator('body').inner_text()
        ok('LP says Forty-nine',('orty-nine classes are ready now' in body))
        ok('LP row 49 present',lp.locator('.lp-row',has_text='Class 49').count()>=1)
        i48=lp.locator('.lp-row',has_text='Class 48').first.evaluate('el=>el.getBoundingClientRect().top')
        i49=lp.locator('.lp-row',has_text='Class 49').first.evaluate('el=>el.getBoundingClientRect().top')
        ok('row 49 after row 48',i49>i48>0)
        # mobile: class page + short page
        m=b.new_page(viewport={'width':390,'height':844})
        m.goto('http://localhost:8126/action-words/',wait_until='load',timeout=30000)
        m.wait_for_timeout(600)
        ovm=m.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
        print('mobile h-overflow px:',ovm); ok('no mobile overflow on the class page',ovm<=0)
        m.screenshot(path='scripts/aw-tmp/aw-mobile-top.png')
        m2=b.new_page(viewport={'width':390,'height':844})
        m2.goto('http://localhost:8126/action-words/sing-dance-swim-throw-catch/',wait_until='load',timeout=30000)
        m2.wait_for_timeout(600)
        ovm2=m2.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
        ok('no mobile overflow on a short page',ovm2<=0)
        m2.screenshot(path='scripts/aw-tmp/aw-card-mobile.png')
        ok('zero JS errors on the class page',len(errors)==0)
        if errors: print('JS ERRORS:',errors[:4])
        b.close()
finally:
    SRV.terminate()
print('RESULT:', 'ALL PASS' if all(checks) else 'FAILURES PRESENT', f'({sum(checks)}/{len(checks)})')
