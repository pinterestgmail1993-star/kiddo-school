/* QA screenshots for Class 46 · Early Addition & Subtraction (house pattern). */
const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();
 const shots=[
  ['early-addition-and-subtraction/','eas-class-desktop',1440],
  ['early-addition-and-subtraction/10-minus-3/','eas-dual-desktop',1440],
  ['early-addition-and-subtraction/1-plus-2/','eas-short-desktop',1440],
  ['learning-path/','eas-lp-desktop',1440],
  ['early-addition-and-subtraction/','eas-class-mobile',390],
 ];
 for(const [path,name,w] of shots){
  const pg=await b.newPage({viewport:{width:w,height:1000}});
  const errors=[];
  pg.on('pageerror',e=>errors.push(e.message));
  await pg.goto('http://localhost:4173/'+path,{waitUntil:'networkidle',timeout:45000});
  await pg.screenshot({path:'/tmp/render/qa-'+name+'.png',fullPage:false});
  if(path==='early-addition-and-subtraction/'){
   await pg.locator('#shelf-subtraction').scrollIntoViewIfNeeded();
   await pg.screenshot({path:'/tmp/render/qa-'+name+'-sub.png',fullPage:false});
  }
  console.log(name,'jsErrors:',errors.length?errors.join(' | '):'none');
  await pg.close();
 }
 const pg=await b.newPage({viewport:{width:1440,height:1000}});
 await pg.goto('http://localhost:4173/early-addition-and-subtraction/10-minus-3/',{waitUntil:'networkidle'});
 const imgs=await pg.locator('.fc2-hero img').count();
 const dls=await pg.locator('a[download]').count();
 console.log('10-minus-3: hero figures',imgs,'| download links',dls);
 await b.close();
})();
