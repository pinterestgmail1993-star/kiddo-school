/* QA for CLASS 48 · Plants & How They Grow: class page + parents' shelf at
   desktop/mobile, all 42 images really loaded, honest dims (all portrait
   1414×2000), print-media contract on both new page types, zero JS errors. */
const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();
 const shots=[
  ['plants-and-how-they-grow/','pgp-class-desktop',1440],
  ['flashcards/plants-and-how-they-grow/','pgp-lib-desktop',1440],
  ['flashcards/','fc-hub-desktop',1440],
  ['learning-path/','lp-desktop',1440],
  ['plants-and-how-they-grow/','pgp-class-mobile',390],
  ['flashcards/plants-and-how-they-grow/','pgp-lib-mobile',390],
 ];
 for(const [path,name,w] of shots){
  const pg=await b.newPage({viewport:{width:w,height:1000}});
  const errors=[];
  pg.on('pageerror',e=>errors.push(e.message));
  await pg.goto('http://localhost:4173/'+path,{waitUntil:'networkidle',timeout:60000});
  await pg.screenshot({path:'/tmp/render/qa-'+name+'.png',fullPage:false});
  if(path==='plants-and-how-they-grow/'&&w===1440){
   await pg.locator('#shelf-parts').scrollIntoViewIfNeeded();
   await pg.screenshot({path:'/tmp/render/qa-pgp-parts.png',fullPage:false});
  }
  if(path==='learning-path/'&&w===1440){
   await pg.locator('div.lp-row').nth(47).scrollIntoViewIfNeeded();
   await pg.screenshot({path:'/tmp/render/qa-lp-row48.png',fullPage:false});
  }
  // mobile overflow check
  if(w===390){
   const over=await pg.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
   console.log(name,'horizontal overflow px:',over);
  }
  console.log(name,'jsErrors:',errors.length?errors.join(' | '):'none');
  await pg.close();
 }
 // class page: every image really loads, honest dims, all portrait
 let pg=await b.newPage({viewport:{width:1440,height:1000}});
 await pg.goto('http://localhost:4173/plants-and-how-they-grow/',{waitUntil:'networkidle',timeout:60000});
 // force lazy images to load by scrolling through the page, then wait for all
 await pg.evaluate(async()=>{for(let y=0;y<=document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,90));}});
 try{await pg.waitForFunction(()=>[...document.querySelectorAll('.mn-card img')].every(i=>i.complete&&i.naturalWidth>0),null,{timeout:45000});}catch(e){}
 const imgData=await pg.evaluate(()=>[...document.querySelectorAll('.mn-card img')].map(i=>({src:i.currentSrc.split('/').pop(),w:i.naturalWidth,h:i.naturalHeight,complete:i.complete})));
 const loaded=imgData.filter(i=>i.complete&&i.naturalWidth>0).length;
 const portrait=imgData.filter(i=>i.h>i.w).length;
 console.log('PGP class tiles:',imgData.length,'| fully loaded:',loaded,'| portrait:',portrait);
 const tiles=await pg.locator('.mn-card').count();
 const prints=await pg.locator('[data-mn-print]').count();
 const downloads=await pg.locator('a[download]').count();
 const badges=await pg.locator('.mn-grownup').count();
 console.log('PGP class: tiles',tiles,'| print buttons',prints,'| download links',downloads,'| ask-a-grown-up badges',badges);
 await pg.close();
 // parents' shelf: same checks
 pg=await b.newPage({viewport:{width:1440,height:1000}});
 await pg.goto('http://localhost:4173/flashcards/plants-and-how-they-grow/',{waitUntil:'networkidle',timeout:60000});
 await pg.evaluate(async()=>{for(let y=0;y<=document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,90));}});
 try{await pg.waitForFunction(()=>[...document.querySelectorAll('.mn-card img')].every(i=>i.complete&&i.naturalWidth>0),null,{timeout:45000});}catch(e){}
 const libImgs=await pg.evaluate(()=>[...document.querySelectorAll('.mn-card img')].filter(i=>i.complete&&i.naturalWidth>0).length);
 const libTiles=await pg.locator('.mn-card').count();
 const libPrints=await pg.locator('[data-mn-print]').count();
 const feedback=await pg.locator('[data-fc-root]').count();
 console.log('PGP shelf: tiles',libTiles,'| loaded',libImgs,'| print buttons',libPrints,'| feedback mounts',feedback);
 await pg.close();
 // print-media contract
 pg=await b.newPage({viewport:{width:1440,height:1000}});
 await pg.goto('http://localhost:4173/plants-and-how-they-grow/',{waitUntil:'networkidle'});
 const contract=await pg.evaluate(()=>{
  const rules=[];
  for(const sheet of document.styleSheets){
   try{for(const r of sheet.cssRules){if(r.media&&String(r.media.mediaText).includes('print')){
    for(const inner of r.cssRules)rules.push(inner.cssText);
   }}}catch(e){}
  }
  return {printBlocks:rules.length,contain:rules.filter(t=>t.includes('object-fit: contain')).length,
          maxW:rules.some(t=>t.includes('max-width: 100%')),maxH:rules.some(t=>t.includes('max-height: 100%'))};
 });
 console.log('print contract on PGP class: blocks',contract.printBlocks,'| object-fit:contain rules',contract.contain,'| maxW',contract.maxW,'| maxH',contract.maxH);
 // print contract, house pattern (cfp-print-qa.cjs): stub window.print,
 // click Print on a tile, verify the isolation class + the owner's img spec
 pg=await b.newPage({viewport:{width:1440,height:1000}});
 await pg.goto('http://localhost:4173/plants-and-how-they-grow/',{waitUntil:'networkidle'});
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
 console.log('PRINT plants-and-how-they-grow/:',JSON.stringify(r));
 await pg.close();
 pg=await b.newPage({viewport:{width:1440,height:1000}});
 await pg.goto('http://localhost:4173/flashcards/plants-and-how-they-grow/',{waitUntil:'networkidle'});
 await pg.emulateMedia({media:'screen'});
 await pg.evaluate(()=>{window.__printed=0;window.print=()=>{window.__printed++;};});
 await pg.locator('[data-mn-print]').first().click();
 const r2=await pg.evaluate(()=>{
  const card=document.querySelector('.mn-card.mn-print-card');
  const img=card?card.querySelector('img'):null;
  const is=img?getComputedStyle(img):null;
  return {printed:window.__printed,isolated:!!card,
   imgFit:is?{maxW:is.maxWidth,maxH:is.maxHeight,fit:is.objectFit}:null};
 });
 console.log('PRINT flashcards/plants-and-how-they-grow/:',JSON.stringify(r2));
 await pg.close();
 await b.close();
})();
