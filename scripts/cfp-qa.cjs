/* QA for the ONE-PAGE ROUND + CLASS 47 · Caring for Our Planet:
   class page + parents' shelf at desktop/mobile, all images loaded,
   print-media contract on both new page types, zero JS errors. */
const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();
 const shots=[
  ['caring-for-our-planet/','cfp-class-desktop',1440],
  ['flashcards/caring-for-our-planet/','cfp-lib-desktop',1440],
  ['prepositions/','pd-class-desktop',1440],
  ['flashcards/prepositions/','pd-lib-desktop',1440],
  ['family-and-friends/','ff-class-desktop',1440],
  ['early-addition-and-subtraction/','eas-class-desktop',1440],
  ['flashcards/','fc-hub-desktop',1440],
  ['learning-path/','lp-desktop',1440],
  ['caring-for-our-planet/','cfp-class-mobile',390],
  ['flashcards/caring-for-our-planet/','cfp-lib-mobile',390],
 ];
 for(const [path,name,w] of shots){
  const pg=await b.newPage({viewport:{width:w,height:1000}});
  const errors=[];
  pg.on('pageerror',e=>errors.push(e.message));
  await pg.goto('http://localhost:4173/'+path,{waitUntil:'networkidle',timeout:60000});
  await pg.screenshot({path:'/tmp/render/qa-'+name+'.png',fullPage:false});
  if(path==='caring-for-our-planet/'&&w===1440){
   await pg.locator('#shelf-critters').scrollIntoViewIfNeeded();
   await pg.screenshot({path:'/tmp/render/qa-cfp-critters.png',fullPage:false});
  }
  console.log(name,'jsErrors:',errors.length?errors.join(' | '):'none');
  await pg.close();
 }
 // CFP class page: every image really loads, honest dims, landscape/portrait mix
 let pg=await b.newPage({viewport:{width:1440,height:1000}});
 await pg.goto('http://localhost:4173/caring-for-our-planet/',{waitUntil:'networkidle',timeout:60000});
 const imgData=await pg.evaluate(()=>[...document.querySelectorAll('.mn-card img')].map(i=>({src:i.currentSrc.split('/').pop(),w:i.naturalWidth,h:i.naturalHeight,complete:i.complete})));
 const loaded=imgData.filter(i=>i.complete&&i.naturalWidth>0).length;
 const landscape=imgData.filter(i=>i.w>i.h).length;
 console.log('CFP class tiles:',imgData.length,'| fully loaded:',loaded,'| landscape:',landscape);
 const tiles=await pg.locator('.mn-card').count();
 const prints=await pg.locator('[data-mn-print]').count();
 const downloads=await pg.locator('a[download]').count();
 console.log('CFP class: tiles',tiles,'| print buttons',prints,'| download links',downloads);
 await pg.close();
 // parents' shelf: same checks
 pg=await b.newPage({viewport:{width:1440,height:1000}});
 await pg.goto('http://localhost:4173/flashcards/caring-for-our-planet/',{waitUntil:'networkidle',timeout:60000});
 const libTiles=await pg.locator('.mn-card').count();
 const libPrints=await pg.locator('[data-mn-print]').count();
 const feedback=await pg.locator('[data-fc-root]').count();
 console.log('CFP shelf: tiles',libTiles,'| print buttons',libPrints,'| feedback mounts',feedback);
 await pg.close();
 // print-media contract: the owner's exact print spec is in style.css and
 // manners.js builds .mn-print-card on print — verify both under print emulation
 pg=await b.newPage({viewport:{width:1440,height:1000}});
 await pg.goto('http://localhost:4173/caring-for-our-planet/',{waitUntil:'networkidle'});
 const contract=await pg.evaluate(()=>{
  const rules=[];
  for(const sheet of document.styleSheets){
   try{for(const r of sheet.cssRules){if(r.media&&String(r.media.mediaText).includes('print')){
    for(const inner of r.cssRules)rules.push(inner.cssText);
   }}}catch(e){}
  }
  const hits=rules.filter(t=>t.includes('object-fit: contain'));
  const maxW=rules.some(t=>t.includes('max-width: 100%'));
  const maxH=rules.some(t=>t.includes('max-height: 100%'));
  return {printBlocks:rules.length,contain:hits.length,maxW,maxH};
 });
 console.log('print contract on CFP class: blocks',contract.printBlocks,'| object-fit:contain rules',contract.contain,'| maxW',contract.maxW,'| maxH',contract.maxH);
 // manners.js builds the print card: click Print and check the isolation node
 const printCard=await pg.evaluate(()=>new Promise(res=>{
  const btn=document.querySelector('[data-mn-print]');
  const obs=new MutationObserver(()=>{
   const el=document.querySelector('.mn-print-card');
   if(el){obs.disconnect();const img=el.querySelector('img');
    const cs=getComputedStyle(img);
    res({built:true,imgW:img.getAttribute('width'),objFit:cs.objectFit,maxW:cs.maxWidth,maxH:cs.maxHeight});
    document.querySelector('.mn-print-close')?.click();
   }
  });
  obs.observe(document.body,{childList:true,subtree:true});
  btn.click();
  setTimeout(()=>res({built:false}),4000);
 }));
 console.log('print card built on click:',JSON.stringify(printCard));
 await pg.close();
 await b.close();
})();
