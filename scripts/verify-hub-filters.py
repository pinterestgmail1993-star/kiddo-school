"""Browser-verify the hub filter bars on /flashcards/ and /worksheets/:
   - the bar renders with its four chip rows (age / level / subject / skill)
   - clicking chips filters the wall in place, folds empty shelves away
   - the count, the Clear button and the empty state behave
   - a filtered chip state shows in the UI (is-on) and nothing overflows on mobile
   - no page errors
Serves dist/ locally on :8143 (Functions are prod-only; none needed here)."""
import asyncio, subprocess, time, sys
from playwright.async_api import async_playwright

BASE='http://localhost:8143'
OUT='/home/z/my-project/hub-filters-verify'
import os; os.makedirs(OUT,exist_ok=True)

async def main():
    server=subprocess.Popen(['python3','-m','http.server','8143','--directory','dist'],
                            stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    time.sleep(1.0)
    ok=True
    try:
        async with async_playwright() as p:
            b=await p.chromium.launch()
            # ---- flashcards hub ----
            pg=await b.new_page(viewport={'width':1280,'height':900})
            errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
            await pg.goto(BASE+'/flashcards/',wait_until='networkidle')
            n_cards=await pg.locator('.fc-setcard').count()
            n_chips=await pg.locator('.hub-chip').count()
            rows=await pg.locator('.hub-filter-row').count()
            labels=await pg.locator('.hub-filter-label').all_text_contents()
            count0=await pg.locator('[data-filter-count]').text_content()
            print('FC: cards=%d chips=%d rows=%d labels=%s count=%r'%(n_cards,n_chips,rows,labels,count0))
            ok&= n_cards==49 and n_chips==32 and rows==4 and labels==['age','level','subject','skill'] and '49' in count0
            # click the Ages 4–5 chip
            await pg.get_by_role('link',name='Ages 4–5',exact=True).first.click()
            await pg.wait_for_timeout(250)
            vis=await pg.evaluate("()=>[...document.querySelectorAll('.fc-setcard')].filter(c=>!c.hidden).length")
            hidden_secs=await pg.evaluate("()=>[...document.querySelectorAll('[data-hub-section]')].filter(s=>s.hidden).length")
            count1=(await pg.locator('[data-filter-count]').text_content()).strip()
            clear_vis=await pg.locator('[data-filter-clear]').is_visible()
            print('FC after Ages 4–5: visible=%d shelves_hidden=%d count=%r clear=%s'%(vis,hidden_secs,count1,clear_vis))
            ok&= vis==17 and hidden_secs==5 and '17 of 49' in count1 and clear_vis
            await pg.screenshot(path=OUT+'/fc-filtered.png',clip={'x':0,'y':0,'width':1280,'height':900})
            # AND a subject chip
            await pg.get_by_role('link',name='Animals & nature',exact=True).first.click()
            await pg.wait_for_timeout(250)
            vis2=await pg.evaluate("()=>[...document.querySelectorAll('.fc-setcard')].filter(c=>!c.hidden).length")
            href2=await pg.evaluate("()=>[...document.querySelectorAll('.fc-setcard')].filter(c=>!c.hidden).map(c=>c.getAttribute('href'))")
            print('FC after + Animals & nature: visible=%d %s'%(vis2,href2))
            ok&= vis2==1 and href2==['/flashcards/animals-and-their-habitats/']
            # empty mix: clear, then Baby 0–1 + Alphabet
            await pg.get_by_role('button',name='Clear all filters').click()
            await pg.get_by_role('link',name='Baby · 0–1',exact=True).first.click()
            await pg.get_by_role('link',name='Alphabet & letters',exact=True).first.click()
            await pg.wait_for_timeout(250)
            vis3=await pg.evaluate("()=>[...document.querySelectorAll('.fc-setcard')].filter(c=>!c.hidden).length")
            empty_vis=await pg.locator('[data-filters-empty]').is_visible()
            print('FC empty mix: visible=%d empty_state=%s'%(vis3,empty_vis))
            ok&= vis3==0 and empty_vis
            await pg.screenshot(path=OUT+'/fc-empty.png',clip={'x':0,'y':0,'width':1280,'height':900})
            await pg.get_by_role('button',name='Clear all filters').click()
            # card navigation still works after all this clicking
            await pg.locator('.fc-setcard[href="/flashcards/sight-words/"]').click()
            await pg.wait_for_load_state('load')
            ok&= pg.url.endswith('/flashcards/sight-words/')
            print('FC card nav ->',pg.url)
            ok&= not errs; print('FC page errors:',errs)
            await pg.close()
            # ---- worksheets hub ----
            pg=await b.new_page(viewport={'width':1280,'height':900})
            errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
            await pg.goto(BASE+'/worksheets/',wait_until='networkidle')
            n_cards=await pg.locator('.ws-cat').count()
            count0=(await pg.locator('[data-filter-count]').text_content()).strip()
            print('WS: cards=%d count=%r'%(n_cards,count0))
            ok&= n_cards==14 and '14' in count0
            await pg.get_by_role('link',name='Toddler · Age 2',exact=True).first.click()
            await pg.wait_for_timeout(250)
            vis=await pg.evaluate("()=>[...document.querySelectorAll('.ws-cat')].filter(c=>!c.hidden).map(c=>c.getAttribute('href'))")
            print('WS after Age 2:',vis)
            ok&= vis==['/worksheets/toddler/matching-and-sorting/']
            await pg.screenshot(path=OUT+'/ws-filtered.png',clip={'x':0,'y':0,'width':1280,'height':900})
            await pg.get_by_role('button',name='Clear all filters').click()
            ok&= not errs; print('WS page errors:',errs)
            await pg.close()
            # ---- mobile: bar usable, chips scroll, no page overflow ----
            pg=await b.new_page(viewport={'width':390,'height':844})
            await pg.goto(BASE+'/flashcards/',wait_until='networkidle')
            overflow=await pg.evaluate("()=>document.documentElement.scrollWidth-document.documentElement.clientWidth")
            chip_scroll=await pg.evaluate("()=>{const r=document.querySelector('.hub-chips');return r.scrollWidth>r.clientWidth}")
            await pg.screenshot(path=OUT+'/fc-mobile.png',full_page=False)
            print('FC mobile: overflow=%dpx chips_scrollable=%s'%(overflow,chip_scroll))
            ok&= overflow<=0 and chip_scroll
            await pg.close()
            await b.close()
    finally:
        server.terminate()
    print('VERIFY:','PASS' if ok else 'FAIL')
    sys.exit(0 if ok else 1)

asyncio.run(main())
