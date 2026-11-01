/* Print-media QA: verify the print contract on Class 45 pages. */
const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();
 const pg=await b.newPage({viewport:{width:1440,height:1000}});
 await pg.goto('http://localhost:4173/family-and-friends/mum/',{waitUntil:'networkidle'});
 await pg.emulateMedia({media:'print'});
 const r=await pg.evaluate(()=>{
  const vis=el=>{const s=getComputedStyle(el);return s.display!=='none'&&s.visibility!=='hidden';};
  const img=document.querySelector('.fc2-hero img');
  const rail=document.querySelector('.fc2-rail');
  const learn=document.querySelector('.fc2-learn');
  const crumbs=document.querySelector('.breadcrumbs');
  const is=img?getComputedStyle(img):null;
  return {heroVisible:img?vis(img):false, railHidden:rail?!vis(rail):null,
   learnHidden:learn?!vis(learn):null, crumbsHidden:crumbs?!vis(crumbs):null,
   imgFit:is?{maxW:is.maxWidth,maxH:is.maxHeight,fit:is.objectFit,margin:is.margin}:null};
 });
 console.log('PRINT /family-and-friends/mum/:',JSON.stringify(r));
 // class page mn isolation: click a Print button (stub window.print to avoid dialog)
 await pg.emulateMedia({media:'screen'});
 await pg.goto('http://localhost:4173/family-and-friends/',{waitUntil:'networkidle'});
 await pg.evaluate(()=>{window.__printed=0;window.print=()=>{window.__printed++;};});
 await pg.locator('[data-mn-print]').first().click();
 await pg.waitForTimeout(300);
 const r2=await pg.evaluate(()=>{
  const card=document.querySelector('.mn-card.mn-print-card');
  const img=card?card.querySelector('img'):null;
  const is=img?getComputedStyle(img):null;
  return {printed:window.__printed, isolated:!!card,
   imgFit:is?{maxW:is.maxWidth,maxH:is.maxHeight,fit:is.objectFit}:null};
 });
 console.log('PRINT class-page tile isolation:',JSON.stringify(r2));
 await b.close();
})();
