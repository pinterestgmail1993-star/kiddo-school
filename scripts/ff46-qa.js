/* QA screenshots for Class 45 · Family & Friends (house pattern). */
const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();
 const shots=[
  ['family-and-friends/','ff-class-desktop',1440],
  ['family-and-friends/mum/','ff-short-desktop',1440],
  ['learning-path/','lp-desktop',1440],
  ['family-and-friends/','ff-class-mobile',390],
  ['family-and-friends/best-friend/','ff-short-mobile',390],
 ];
 for(const [path,name,w] of shots){
  const pg=await b.newPage({viewport:{width:w,height:1000}});
  const errors=[];
  pg.on('pageerror',e=>errors.push(e.message));
  await pg.goto('http://localhost:4173/'+path,{waitUntil:'networkidle',timeout:45000});
  await pg.screenshot({path:'/tmp/render/qa-'+name+'.png',fullPage:false});
  // scroll to a shelf tile for the class page
  if(path==='family-and-friends/'){
   await pg.locator('.mn-card').first().scrollIntoViewIfNeeded();
   await pg.screenshot({path:'/tmp/render/qa-'+name+'-tile.png',fullPage:false});
  }
  console.log(name, 'jsErrors:', errors.length?errors.join(' | '):'none');
  await pg.close();
 }
 // quick console check of a short page print button presence
 const pg=await b.newPage({viewport:{width:1440,height:1000}});
 await pg.goto('http://localhost:4173/family-and-friends/mum/',{waitUntil:'networkidle'});
 const btns=await pg.locator('[data-mn-print]').count();
 const dls=await pg.locator('a[download]').count();
 const imgs=await pg.locator('img[loading="lazy"][width="1414"]').count();
 console.log('mum page: print buttons',btns,'| download links',dls,'| lazy 1414-wide imgs',imgs);
 await b.close();
})();
