/* Verify the APPLIED print spec under print-media emulation: click Print,
   then read the computed style of the isolated .mn-print-card img while the
   @media print rules are live (the owner's exact contract: max-width:100%;
   max-height:100%; object-fit:contain, centered). */
const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();
 for(const path of ['caring-for-our-planet/','flashcards/caring-for-our-planet/','prepositions/','flashcards/prepositions/','family-and-friends/','early-addition-and-subtraction/','measuring-and-money/','earth-and-space/']){
  const pg=await b.newPage({viewport:{width:1440,height:1000}});
  await pg.goto('http://localhost:4173/'+path,{waitUntil:'networkidle',timeout:60000});
  await pg.emulateMedia({media:'print'});
  await pg.evaluate(()=>{window.print=()=>{};});
  await pg.evaluate(()=>document.querySelector('[data-mn-print]').click());
  const r=await pg.evaluate(()=>{
   const card=document.querySelector('.mn-card.mn-print-card');
   const img=card?card.querySelector('img'):null;
   const is=img?getComputedStyle(img):null;
   return {isolated:!!card,
    spec:is?{maxW:is.maxWidth,maxH:is.maxHeight,fit:is.objectFit,margin:is.margin}:null};
  });
  console.log('PRINT-MEDIA',path,':',JSON.stringify(r));
  await pg.close();
 }
 await b.close();
})();
