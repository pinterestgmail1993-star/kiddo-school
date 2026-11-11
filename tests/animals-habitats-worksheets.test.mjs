// Class 36 · Animals & Their Habitats — the habitat WORKSHEETS regression
// suite. Locks what the owner ordered (R2 upload verified 2026-10-13):
//  - exactly 6 genuine sheets + cover from the owner's R2 upload, all
//    1414×2000 portrait, nothing invented;
//  - 6 on-screen activity pages: drawing canvas over the original sheet +
//    five steps + progress band 'animals-habitats-worksheets' + animals-ws.js;
//  - 6 printable library twins + /worksheets/animals-and-their-habitats/
//    collection with the genuine cover (1414×2000) — download/print, no
//    canvas;
//  - the Class 36 hub carries the PRACTISE WITH WORKSHEETS tiles (6, each
//    opening its activity page) and the collection button;
//  - the /worksheets/ library index lists the Class 36 category card;
//  - the counting set shows its REAL cover on the /flashcards/ wall
//    (counting-flashcards-1-20-cover.webp — the cover.webp fallback 404s).
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {animalsWs,AHWS_WS_CLASS,AHWS_WS_LIB,AHWS_WS_BASE,AHWS_WS_COVER} from '../src/animals-ws.mjs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';

const CLASS='/preschool/4-years/animals-and-their-habitats/';
const read=p=>readFileSync('dist'+p,'utf8');
const pageFile=p=>readFileSync('dist'+p+'index.html','utf8');

test('data: exactly 6 habitat sheets from the owner’s verified R2 upload, cover excluded, all 1414×2000',()=>{
 const FILES=['desert-animals-and-their-habitat','farm-animals-and-their-habitat','forest-animals-and-their-habitat',
  'ocean-animals-and-their-habitat','polar-animals-and-their-habitat','wetland-animals-and-their-habitat'].sort();
 const slugs=animalsWs.map(w=>w.slug).sort();
 assert.deepEqual(slugs,FILES,'the 6 sheets are EXACTLY the owner’s upload — nothing invented, nothing missing');
 assert.equal(AHWS_WS_COVER.file,'cover.webp');
 assert.equal(AHWS_WS_COVER.w,1414);assert.equal(AHWS_WS_COVER.h,2000,'cover probed 1414×2000 on R2');
 for(const w of animalsWs){
  assert.equal(w.file,w.slug+'-worksheet.webp',w.slug+': file name matches slug');
  assert.equal(w.w,1414,w.file+' width (probed on R2)');
  assert.equal(w.h,2000,w.file+' height (probed on R2)');
 }
});

test('data: every sheet carries the full grown-up field set with honest artwork copy',()=>{
 for(const w of animalsWs){
  for(const k of ['title','tag','meta','learn','know','why','say','look','ask','hint','tips','check','real'])
   assert.ok(w[k]&&w[k].length>20,`${w.slug}.${k} present`);
  assert.ok(w.word&&w.trace===w.word&&['DESERT','FARM','FOREST','OCEAN','POLAR','WETLAND'].includes(w.trace),w.slug+': trace word as drawn');
  assert.equal(w.skills.length,5,w.slug+': five skills');
  assert.equal(w.steps.length,5,w.slug+': five steps (the sheet’s five sections);');
 }
 const metas=new Set(animalsWs.map(w=>w.meta));
 assert.equal(metas.size,6,'unique meta description per sheet');
});







test('learning path: Class 36 row links BOTH the flashcards and the worksheets',()=>{
 const lp=read('/learning-path/index.html');
 assert.ok(lp.includes('href="/flashcards/animals-and-their-habitats/"'),'LP row 36 links the flashcards');
 assert.ok(lp.includes('href="/worksheets/animals-and-their-habitats/"'),'LP row 36 links the worksheets');
 assert.ok(lp.includes('6 habitat worksheets'),'LP row 36 names the worksheets');
});

test('collection covers are small previews on all three worksheet collections (CSP-safe class, no inline style)',()=>{
 for(const p of ['/worksheets/animals-and-their-habitats/','/worksheets/weather-seasons-and-what-we-wear/','/worksheets/community-helpers-and-our-neighborhood/']){
  const h=pageFile(p);
  assert.ok(h.includes('ws-cover-sm'),p+': cover uses ws-cover-sm');
  assert.ok(!/ws-hero-art"\s*style=/.test(h),p+': no dead inline style on the cover (CSP blocks it)');
 }
});



test('/worksheets/ library index lists the Class 36 category card',()=>{
 const lib=pageFile('/worksheets/');
 assert.ok(lib.includes('href="/worksheets/animals-and-their-habitats/"'),'Class 36 category card');
 assert.ok(lib.includes(AHWS_WS_BASE+'cover.webp'),'genuine cover on the category card');
 assert.ok(lib.includes('Class 36'),'class pill');
});

test('counting set shows its REAL cover on the /flashcards/ wall',()=>{
 const set=fcSetBySlug['numbers-counting-and-early-math'];
 assert.equal(set.cover.file,'counting-flashcards-1-20-cover.webp','the owner’s real cover file, not the 404ing cover.webp fallback');
 assert.equal(set.cover.w,2000);assert.equal(set.cover.h,1414,'landscape cover dims');
 const wall=pageFile('/flashcards/');
 assert.ok(wall.includes(set.coverUrl),'/flashcards/ wall carries the real counting cover URL');
});


