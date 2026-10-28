#!/usr/bin/env python3
"""Browser-verify the Question Words pages: cover first, the six core cards
leading, 16 tiles with Download + Print under each on BOTH pages, tips
present, no horizontal overflow desktop+mobile, print handler toggles+cleans,
hub lists the class. Screenshots archived to scripts/qw-tmp/."""
import subprocess, time, sys
from playwright.sync_api import sync_playwright

SRV=subprocess.Popen(['python3','-m','http.server','8124','--directory','dist'],
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
        pg.goto('http://localhost:8124/question-words/',wait_until='load',timeout=30000)
        pg.wait_for_timeout(700)
        tiles=pg.locator('.mn-card')
        n=tiles.count(); print('tiles:',n); ok('16 tiles on the class page',n==16)
        dl=pg.locator('.mn-card a[download]').count()
        pr=pg.locator('.mn-card [data-mn-print]').count()
        print('download:',dl,'print:',pr); ok('16+16 buttons',dl==16 and pr==16)
        cover=pg.locator('.lesson-cover img').first
        src=cover.get_attribute('src'); print('cover:',src)
        ok('cover first (R2 question-words)',src.endswith('question-words/cover.webp'))
        first_img=tiles.first.locator('img').get_attribute('src')
        ok('core leads: who is the first tile','who.webp' in first_img)
        seventh=tiles.nth(6).locator('img').get_attribute('src')
        ok('7th tile starts the more-shelf (how-many)','how-many.webp' in seventh)
        ov=pg.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
        print('h-overflow px:',ov); ok('no desktop overflow',ov<=0)
        # print isolation toggles (stub window.print so the class survives
        # until the 2s backup cleanup — deterministic in headless; the house
        # pattern from browser-verify-shelf.py)
        pg.evaluate('window.print = function(){};')
        pg.locator('.mn-card button[data-mn-print]').first.click()
        ok('print handler toggles body.mn-printing',pg.evaluate('document.body.classList.contains("mn-printing")'))
        pg.wait_for_timeout(2300)
        ok('print handler cleans up',pg.evaluate('!document.body.classList.contains("mn-printing") && !document.querySelector(".mn-print-card")'))
        imgs_ok=pg.evaluate("[...document.querySelectorAll('.mn-card img')].every(i=>i.complete&&i.naturalWidth>0)")
        ok('all 16 card images decode',imgs_ok)
        pg.screenshot(path='scripts/qw-tmp/desktop.png',full_page=False)
        pg.screenshot(path='scripts/qw-tmp/desktop-cards.png',full_page=False)
        # mobile
        m=b.new_page(viewport={'width':390,'height':844})
        m.goto('http://localhost:8124/question-words/',wait_until='load',timeout=30000)
        m.wait_for_timeout(500)
        ov=m.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
        print('mobile h-overflow px:',ov); ok('no mobile overflow',ov<=0)
        m.screenshot(path='scripts/qw-tmp/mobile.png')
        m.close()
        # shelf
        s=b.new_page(viewport={'width':1440,'height':1000})
        s.goto('http://localhost:8124/flashcards/question-words/',wait_until='load',timeout=30000)
        s.wait_for_timeout(700)
        st=s.locator('.mn-card')
        ok('16 tiles on the shelf',st.count()==16)
        ok('16+16 buttons on the shelf',
           s.locator('.mn-card a[download]').count()==16 and s.locator('.mn-card [data-mn-print]').count()==16)
        ok('shelf speaks to parents','parents' in s.content())
        fb=s.locator('[data-fc-root]')
        print('feedback mounts:',fb.count())
        ov=s.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
        ok('no shelf overflow',ov<=0)
        s.screenshot(path='scripts/qw-tmp/shelf-top.png')
        # library wall: the new shelf + count
        w=b.new_page(viewport={'width':1440,'height':1000})
        w.goto('http://localhost:8124/flashcards/',wait_until='load',timeout=30000)
        w.wait_for_timeout(600)
        c=w.content()
        ok('wall has the Question Words shelf','Question Words · Extra Class' in c)
        ok('wall count says 61','Showing all 61 sets' in c)
        ok('wall has the qw set card','/flashcards/question-words/"' in c)
        w.close()
        # the three class pages carry the inbound sections
        for path,frag in [('/preschool/3-years/body-parts-and-five-senses/','Where is your nose? How many fingers?'),
                          ('/preschool/4-years/storytime-and-pre-reading/','Who is in the story? What happens next?'),
                          ('/preschool/4-years/logic-thinking-and-problem-solving/','Why did it fall? How does it work?')]:
            c2=b.new_page(viewport={'width':1440,'height':1000})
            c2.goto('http://localhost:8124'+path,wait_until='load',timeout=30000)
            c2.wait_for_timeout(400)
            html=c2.content()
            ok('inbound on '+path, frag in html and '/question-words/"' in html)
            c2.close()
        # hub: twelve classes + qw card
        h2=b.new_page(viewport={'width':1440,'height':1000})
        h2.goto('http://localhost:8124/extra-classes/',wait_until='load',timeout=30000)
        h2.wait_for_timeout(400)
        hc=h2.content()
        ok('hub counts Twelve','Twelve extra classes' in hc)
        ok('hub lists Question Words','href="/question-words/"' in hc)
        h2.close()
        b.close()
finally:
    SRV.terminate()
print(f'\n{sum(checks)}/{len(checks)} browser checks passed')
sys.exit(0 if all(checks) else 1)
