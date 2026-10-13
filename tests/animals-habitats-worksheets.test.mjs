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

test('activity pages: 6 built, canvas over the original sheet, tools, progress, neighbours',()=>{
 for(const w of animalsWs){
  const p=AHWS_WS_CLASS+w.slug+'/';
  const html=pageFile(p);
  assert.ok(html.includes(`data-ahws-activity="${w.slug}"`),p+': activity mount');
  assert.ok(html.includes(`data-wc-src="${AHWS_WS_BASE+w.file}?draw=1"`),p+': CORS-safe sheet src');
  assert.ok(html.includes(`data-wc-restore="animals-and-their-habitats/${w.slug}"`),p+': restore key namespaced per sheet');
  assert.ok(html.includes('data-wc-toolbar="#ahws-tools"'),p+': tools rail');
  assert.ok(html.includes('data-ahws-progress-block'),p+': progress block');
  assert.ok(html.includes('class="fc2-pn"'),p+': prev/next');
  assert.ok(html.includes('/assets/animals-ws.js?v='),p+': progress script versioned');
  assert.ok(html.includes(`href="${AHWS_WS_LIB}${w.slug}/"`),p+': printable twin linked');
  assert.ok(!html.includes('style="--iar'),p+': no inline layout styles (CSP law)');
 }
});

test('printable twins: 6 built, download+print, NO canvas, activity linked back',()=>{
 for(const w of animalsWs){
  const p=AHWS_WS_LIB+w.slug+'/';
  const html=pageFile(p);
  assert.ok(html.includes(`data-ahws-download="${AHWS_WS_BASE+w.file}"`),p+': download button');
  assert.ok(html.includes('data-ahws-print'),p+': print button');
  assert.ok(!html.includes('data-wc-mount')&&!html.includes('data-ahws-activity'),p+': no canvas on the printable');
  assert.ok(html.includes(`href="${AHWS_WS_CLASS}${w.slug}/"`),p+': activity twin linked');
  const more=(html.match(/class="ws-card"/g)||[]).length;
  assert.equal(more,5,p+': five sibling sheets in MORE HABITAT SHEETS');
 }
});

test('collection: 6 cards, genuine cover, cross-links, in sitemap',()=>{
 const html=pageFile(AHWS_WS_LIB);
 assert.ok(html.includes(AHWS_WS_BASE+AHWS_WS_COVER.file),'/worksheets/animals-and-their-habitats/: genuine cover');
 assert.equal((html.match(/class="ws-card"/g)||[]).length,6,'6 cards on the collection');
 assert.ok(html.includes('href="'+CLASS+'"'),'links the class hub');
 assert.ok(html.includes('/flashcards/animals-and-their-habitats/'),'links the flashcards');
 const sitemap=read('/sitemap.xml');
 assert.ok(sitemap.includes('https://kiddo-school.pages.dev'+AHWS_WS_LIB),'collection in sitemap');
 for(const w of animalsWs){
  assert.ok(sitemap.includes('https://kiddo-school.pages.dev'+AHWS_WS_LIB+w.slug+'/'),w.slug+' printable in sitemap');
  assert.ok(sitemap.includes('https://kiddo-school.pages.dev'+AHWS_WS_CLASS+w.slug+'/'),w.slug+' activity in sitemap');
 }
});

test('Class 36 hub: PRACTISE WITH WORKSHEETS section with 6 tiles + collection button',()=>{
 const hub=pageFile(CLASS);
 assert.ok(hub.includes('PRACTISE WITH WORKSHEETS'),'hub practice section');
 assert.equal([...hub.matchAll(/data-ahws-card="([a-z-]+)"/g)].length,6,'6 worksheet tiles on the hub');
 assert.equal([...hub.matchAll(/data-ahws-done/g)].length,6,'every tile carries its Cleared! ribbon hook');
 assert.ok(hub.includes('href="'+AHWS_WS_LIB+'"'),'collection button on the hub');
 for(const w of animalsWs)assert.ok(hub.includes(`href="${AHWS_WS_CLASS}${w.slug}/"`),w.slug+' tile link');
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

test('both habitat pages keep their text to themselves (duplicate-content law)',()=>{
 // The activity and printable twins of one sheet share NO long sentence:
 // the activity uses tag-based headings, the printable leads with meta.
 for(const w of animalsWs){
  const aBody=pageFile(AHWS_WS_CLASS+w.slug+'/').split('</head>')[1];
  const p=pageFile(AHWS_WS_LIB+w.slug+'/');
  assert.ok(!aBody.includes(w.meta),w.slug+': meta stays on the printable page');
  const stepsA=(aBody.match(/<ol class="fc-steps">/g)||[]).length;
  const stepsP=(p.match(/<ol class="fc-steps">/g)||[]).length;
  assert.equal(stepsA,1);assert.equal(stepsP,1,w.slug+': exactly one steps list per twin');
 }
});
