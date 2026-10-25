"""Browser-verify the FIXED Age-4 hub (/preschool/4-years/).

The owner's screenshot showed each class card torn into three separate boxes
flowing out of order across the grid (illegal nested <a> + a stray early
</div>). This check locks the repaired render:
  - 15 whole <article.fc-stage> cards, none is an <a>, zero nested <a> in DOM
  - cards flow row-major in DOM order (Class 24 before 25 before 26 ...),
    all cards the same width (one grid, no full-width strays)
  - title link + Open-Class link navigate to the class page
  - paragraph cross-links present and clickable
  - no horizontal overflow at 1440 and 390
  - screenshots for the eye (desktop + mobile)
"""
import asyncio
from playwright.async_api import async_playwright

import time
BASE = 'http://localhost:4173'
HUB = '/preschool/4-years/'

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1440, 'height': 1000})
        await pg.goto(BASE + HUB, wait_until='load'); await asyncio.sleep(1.5)

        n_articles = await pg.locator('.fc-stages article.fc-stage').count()
        n_anchors = await pg.locator('.fc-stages > a.fc-stage, a.fc-stage').count()
        nested = await pg.evaluate('''()=>{
          let n=0;
          document.querySelectorAll('.fc-stages a').forEach(a=>{
            if(a.closest('.fc-stages') && a.parentElement.closest('a')) n++;
          });
          return n;
        }''')
        print(f'articles={n_articles} (want 15)  card-anchors={n_anchors} (want 0)  nested-a={nested} (want 0)')
        assert n_articles == 15 and n_anchors == 0 and nested == 0

        # DOM order == visual order: card i's left edge <= card i+1's, same row
        boxes = await pg.evaluate('''()=>[...document.querySelectorAll('.fc-stages article.fc-stage')]
            .map(c=>{const r=c.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width};})''')
        widths = {round(bb['w']) for bb in boxes}
        print(f'card widths={sorted(widths)}  first3 x/y={[(round(bb["x"]),round(bb["y"])) for bb in boxes[:3]]}')
        assert len(widths) == 1, f'all 15 cards same width, got {widths}'
        def rowmajor(prev, nxt):
            # next row may wrap back to column 1 — y growth alone proves order
            if nxt['y'] > prev['y'] + 5: return True
            return abs(prev['y'] - nxt['y']) < 5 and nxt['x'] > prev['x']
        order_ok = all(rowmajor(boxes[i], boxes[i+1]) for i in range(len(boxes)-1))
        print('row-major order 24→38:', order_ok)
        if not order_ok:
            print([(round(bb['x']), round(bb['y'])) for bb in boxes])
        assert order_ok

        # title link + open link both navigate
        await pg.locator('.fc-stages article.fc-stage h3 a').first.click()
        await asyncio.sleep(0.5)
        print('title click →', pg.url)
        assert pg.url.endswith('/preschool/4-years/transportation-and-vehicles/')
        await pg.goto(BASE + HUB, wait_until='load'); await asyncio.sleep(1.5)
        await pg.locator('.fc-stages article.fc-stage .fc-open a').first.click()
        await asyncio.sleep(0.5)
        print('open click  →', pg.url)
        assert pg.url.endswith('/preschool/4-years/transportation-and-vehicles/')

        # paragraph cross-link still there and clickable
        await pg.goto(BASE + HUB, wait_until='load'); await asyncio.sleep(1.5)
        await pg.locator('.fc-stages article.fc-stage p a', has_text='printable vehicles cards').click()
        await asyncio.sleep(0.5)
        print('inner click →', pg.url)
        assert '/flashcards/transportation-and-vehicles/' in pg.url

        # no horizontal overflow at desktop + mobile
        for w, name in [(1440, 'desktop'), (390, 'mobile')]:
            pg2 = await b.new_page(viewport={'width': w, 'height': 900})
            await pg2.goto(BASE + HUB, wait_until='load'); await asyncio.sleep(1.5)
            over = await pg2.evaluate('''()=>document.documentElement.scrollWidth
                - document.documentElement.clientWidth''')
            print(f'{name} overflow px = {over}')
            assert over <= 0
            await pg2.screenshot(path=f'/home/z/my-project/scripts/age4-hub-{name}.png',
                                 full_page=(name == 'mobile'))
            await pg2.close()
        await pg.screenshot(path='/home/z/my-project/scripts/age4-hub-desktop.png',
                            full_page=False)
        await b.close()
        print('ALL CHECKS PASS')

asyncio.run(main())
