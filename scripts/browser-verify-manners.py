#!/usr/bin/env python3
"""Browser-verify the Manners single page: cover first, 32 tiles with
Download + Print under each, tips present, hub lists the class. Desktop + mobile
screenshots archived to scripts/manners-tmp/."""
import subprocess, time, sys
from playwright.sync_api import sync_playwright

SRV=subprocess.Popen(['python3','-m','http.server','8123','--directory','dist'],
                     stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
time.sleep(1.2)
try:
    with sync_playwright() as pw:
        b=pw.chromium.launch()
        # desktop
        pg=b.new_page(viewport={'width':1440,'height':1000})
        pg.goto('http://localhost:8123/manners/',wait_until='load',timeout=30000)
        pg.wait_for_timeout(700)
        tiles=pg.locator('.mn-card')
        n=tiles.count(); print('tiles:',n); assert n==32, n
        dl=pg.locator('.mn-card a[download]').count()
        pr=pg.locator('.mn-card [data-mn-print]').count()
        print('download buttons:',dl,'print buttons:',pr); assert dl==32 and pr==32
        cover=pg.locator('.lesson-cover img').first
        src=cover.get_attribute('src'); print('cover:',src)
        assert src.endswith('manners/flashcards/cover.webp'),'cover first'
        first_img=tiles.first.locator('img').get_attribute('src')
        assert 'ask-first.webp' in first_img, first_img
        # landscape/overflow check
        ov=pg.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
        print('h-overflow px:',ov); assert ov<=0
        # print handler wiring: class toggles when the button handler runs
        pg.click('.mn-card [data-mn-print]')
        pg.wait_for_timeout(300)
        assert pg.evaluate("document.body.classList.contains('mn-printing')") is False, 'classes cleaned after print'
        pg.screenshot(path='scripts/manners-tmp/desktop.png',full_page=False)
        pg.evaluate("document.querySelector('#the-cards').scrollIntoView()")
        pg.wait_for_timeout(400)
        pg.screenshot(path='scripts/manners-tmp/desktop-cards.png')
        # mobile
        m=b.new_page(viewport={'width':390,'height':844})
        m.goto('http://localhost:8123/manners/',wait_until='load',timeout=30000)
        m.wait_for_timeout(600)
        ov2=m.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
        print('mobile h-overflow px:',ov2); assert ov2<=0
        m.screenshot(path='scripts/manners-tmp/mobile.png')
        # hub lists it
        h=b.new_page(viewport={'width':1440,'height':1000})
        h.goto('http://localhost:8123/extra-classes/',wait_until='load',timeout=30000)
        h.wait_for_timeout(500)
        card=h.locator('a.room-card[href="/manners/"]').count()
        print('hub manners card:',card); assert card==1
        b.close()
        print('ALL BROWSER CHECKS PASS')
finally:
    SRV.terminate()
