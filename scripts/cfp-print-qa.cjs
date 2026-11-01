/* Print + lazy-load QA for the ONE-PAGE ROUND + CLASS 47 (house pattern):
   stub window.print, click Print on a tile, verify the isolation contract
   (mn-print-card + the owner's exact img spec), then scroll the CFP class
   page to force lazy loads and confirm every master really loads. */
const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();
 // 1) print isolation on the CFP class page and on the parents' shelf
 for(const path of ['caring-for-our-planet/','flashcards/caring-for-our-planet/','prepositions/','flashcards/prepositions/']){
  const pg=await b.newPage({viewport:{width:1440,height:1000}});
  await pg.goto('http://localhost:4173/'+path,{waitUntil:'networkidle',timeout:60000});
  await pg.emulateMedia({media:'screen'});
  await pg.evaluate(()=>{window.__printed=0;window.print=()=>{window.__printed++;};});
  await pg.locator('[data-mn-print]').first().click();
  const r=await pg.evaluate(()=>{
   const card=document.querySelector('.mn-card.mn-print-card');
   const img=card?card.querySelector('img'):null;
   const is=img?getComputedStyle(img):null;
   return {printed:window.__printed,isolated:!!card,
    imgFit:is?{maxW:is.maxWidth,maxH:is.maxHeight,fit:is.objectFit}:null};
  });
  console.log('PRINT',path,':',JSON.stringify(r));
  await pg.close();
 }
 // 2) lazy images really load on the CFP class page: scroll through the deck
 let pg=await b.newPage({viewport:{width:1440,height:1000}});
 await pg.goto('http://localhost:4173/caring-for-our-planet/',{waitUntil:'networkidle',timeout:60000});
 await pg.evaluate(async()=>{
  for(let y=0;y<document.body.scrollHeight;y+=800){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}
 });
 await pg.waitForTimeout(2500);
 const imgData=await pg.evaluate(()=>[...document.querySelectorAll('.mn-card img')].map(i=>({src:i.currentSrc.split('/').pop(),w:i.naturalWidth,h:i.naturalHeight,ok:i.complete&&i.naturalWidth>0})));
 const ok=imgData.filter(i=>i.ok).length;
 const landscape=imgData.filter(i=>i.w===2000).map(i=>i.src.split('-eco')[0]);
 console.log('CFP class after scroll: loaded',ok,'/',imgData.length,'| landscape (expect 7):',landscape.length);
 console.log('   landscape cards:',landscape.join(', '));
 const bad=imgData.filter(i=>!i.ok).map(i=>i.src);
 if(bad.length)console.log('   NOT LOADED:',bad.join(', '));
 // the seven landscape cards from the deck data must be exactly these
 await pg.close();
 // 3) mobile: horizontal overflow check on both new page types
 for(const path of ['caring-for-our-planet/','flashcards/caring-for-our-planet/']){
  const m=await b.newPage({viewport:{width:390,height:844}});
  await m.goto('http://localhost:4173/'+path,{waitUntil:'networkidle',timeout:60000});
  const over=await m.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  console.log('MOBILE',path,'horizontal overflow px:',over);
  await m.close();
 }
 await b.close();
})();
