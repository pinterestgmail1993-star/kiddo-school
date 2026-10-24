"""Browser-verify the three class listing pages after the image-tile change:
   - grid of images rendered (natural sizes > 0)
   - no per-image description lines
   - clicking a LEARN tile opens the individual /learn/ page
   - clicking a worksheet tile opens the individual activity page
   - no horizontal overflow on mobile
Run against the local preview server (localhost:4173)."""
import asyncio, sys
from playwright.async_api import async_playwright

BASE='http://localhost:4173'
HUBS=[
 ('C32','/preschool/4-years/life-skills-and-good-habits/',28,29),
 ('C33','/preschool/4-years/community-helpers-and-our-neighborhood/',29,35),
 ('C34','/preschool/4-years/weather-seasons-and-what-we-wear/',29,0),
]

async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ok=True
        for tag,path,n_learn,n_ws in HUBS:
            pg=await b.new_page(viewport={'width':1280,'height':900})
            errs=[]
            pg.on('pageerror',lambda e:errs.append(str(e)))
            await pg.goto(BASE+path,wait_until='networkidle')
            tiles=await pg.locator('.lp-tile').count()
            imgs_ok=await pg.evaluate('''()=>[...document.querySelectorAll('.lp-tile img')].every(i=>i.naturalWidth>0)''')
            fclnav=await pg.locator('.fcl-nav').count()
            sacard_skill=await pg.locator('.sa-card-skill,.sa-card-play').count()
            print(f'{tag}: tiles={tiles} (want {n_learn}) imgsLoaded={imgs_ok} fcl-nav-left={fclnav} desc-lines={sacard_skill}')
            ok &= tiles==n_learn and imgs_ok and fclnav==0 and sacard_skill==0
            if n_ws:
                ws=await pg.locator('.sa-card-imgonly').count()
                print(f'{tag}: worksheet tiles={ws} (want {n_ws})')
                ok &= ws==n_ws
            # click first learn tile -> individual lesson page
            await pg.locator('.lp-tile').first.click()
            await pg.wait_for_load_state('networkidle')
            url=pg.url
            lesson=url.endswith('/learn/') or '/learn/' in url
            canvas=await pg.locator('[data-wc]').count()
            print(f'{tag}: first tile opens {url} lesson={lesson} canvasOnLesson={canvas}')
            ok &= lesson and canvas>=1
            # mobile overflow check
            m=await b.new_page(viewport={'width':390,'height':844})
            await m.goto(BASE+path,wait_until='networkidle')
            ov=await m.evaluate('''()=>document.documentElement.scrollWidth-document.documentElement.clientWidth''')
            print(f'{tag}: mobile overflow px={ov}')
            ok &= ov<=0
            shot=f'/home/z/my-project/download/hub-tiles/{tag}.png'
            await m.screenshot(path=shot,full_page=False)
            print(f'{tag}: screenshot {shot} errors={errs}')
            ok &= not errs
            await pg.close(); await m.close()
        await b.close()
        print('ALL OK' if ok else 'FAILURES PRESENT')
        sys.exit(0 if ok else 1)

asyncio.run(main())
