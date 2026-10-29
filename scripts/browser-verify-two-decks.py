#!/usr/bin/env python3
"""Browser-verify the two new extra-class single pages (owner 2026-10-29):
/sequence-stories/ (24 tiles, cover first, Ask-a-grown-up on exactly
make-toast + make-lemonade) and /question-words/ (16 tiles, six core words
first). Print handler toggles+cleans, zero horizontal overflow desktop+mobile,
hub lists both. Screenshots archived to scripts/two-decks-tmp/."""
import subprocess, time
from playwright.sync_api import sync_playwright

SRV=subprocess.Popen(['python3','-m','http.server','8124','--directory','dist'],
                     stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
time.sleep(1.2)
try:
    with sync_playwright() as pw:
        b=pw.chromium.launch()
        # ---- /sequence-stories/ ----
        pg=b.new_page(viewport={'width':1440,'height':1000})
        pg.goto('http://localhost:8124/sequence-stories/',wait_until='load',timeout=30000)
        pg.wait_for_timeout(700)
        tiles=pg.locator('.mn-card')
        n=tiles.count(); print('ss tiles:',n); assert n==24, n
        dl=pg.locator('.mn-card a[download]').count()
        pr=pg.locator('.mn-card [data-mn-print]').count()
        print('ss download:',dl,'print:',pr); assert dl==24 and pr==24
        src=pg.locator('.lesson-cover img').first.get_attribute('src')
        print('ss cover:',src); assert src.endswith('sequence-stories/flashcards/cover.webp'),'cover first'
        assert 'bedtime.webp' in tiles.first.locator('img').get_attribute('src'),'first tile is bedtime'
        badges=pg.locator('.mn-grownup')
        bn=badges.count(); print('ss grownup badges:',bn); assert bn==2, bn
        bsrc=[badges.nth(i).locator('xpath=ancestor::figure//img').get_attribute('src') for i in range(2)]
        assert any('make-toast.webp' in s for s in bsrc) and any('make-lemonade.webp' in s for s in bsrc), bsrc
        # badge visible on screen
        assert badges.first.is_visible(),'badge visible'
        # print handler wiring: click make-toast's print button (stub window.print)
        pg.evaluate("window.print=()=>{}")
        mt=pg.locator('.mn-card').filter(has=pg.locator('img[src*="make-toast"]'))
        mt.locator('[data-mn-print]').click()
        pg.wait_for_timeout(200)
        assert pg.evaluate("document.body.classList.contains('mn-printing')"),'body.mn-printing set'
        assert pg.evaluate("document.querySelector('.mn-print-card .mn-grownup') !== null"),'badge inside the print card'
        pg.wait_for_timeout(2200)
        assert pg.evaluate("document.body.classList.contains('mn-printing')") is False,'classes cleaned after print'
        ov=pg.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
        print('ss h-overflow px:',ov); assert ov<=0
        pg.screenshot(path='scripts/two-decks-tmp/ss-desktop.png')
        m=b.new_page(viewport={'width':390,'height':844})
        m.goto('http://localhost:8124/sequence-stories/',wait_until='load',timeout=30000)
        m.wait_for_timeout(600)
        ov2=m.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
        print('ss mobile h-overflow px:',ov2); assert ov2<=0
        m.screenshot(path='scripts/two-decks-tmp/ss-mobile.png')
        # ---- /question-words/ ----
        q=b.new_page(viewport={'width':1440,'height':1000})
        q.goto('http://localhost:8124/question-words/',wait_until='load',timeout=30000)
        q.wait_for_timeout(700)
        qt=q.locator('.mn-card')
        qn=qt.count(); print('qw tiles:',qn); assert qn==16, qn
        assert qt.locator('a[download]').count()==16 and qt.locator('[data-mn-print]').count()==16
        qsrc=q.locator('.lesson-cover img').first.get_attribute('src')
        print('qw cover:',qsrc); assert qsrc.endswith('question-words/cover.webp'),'cover first (no flashcards step)'
        assert 'who.webp' in qt.first.locator('img').get_attribute('src'),'first tile is who'
        order=[qt.nth(i).locator('img').get_attribute('src').split('/')[-1] for i in range(6)]
        assert order==['who.webp','what.webp','when.webp','where.webp','why.webp','how.webp'], order
        qov=q.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
        print('qw h-overflow px:',qov); assert qov<=0
        q.screenshot(path='scripts/two-decks-tmp/qw-desktop.png')
        # ---- hub lists both ----
        h=b.new_page(viewport={'width':1440,'height':1000})
        h.goto('http://localhost:8124/extra-classes/',wait_until='load',timeout=30000)
        h.wait_for_timeout(500)
        assert h.locator('a.room-card[href="/sequence-stories/"]').count()==1,'hub card for sequence-stories'
        assert h.locator('a.room-card[href="/question-words/"]').count()==1,'hub card for question-words'
        b.close()
        print('ALL BROWSER CHECKS PASS')
finally:
    SRV.terminate()
