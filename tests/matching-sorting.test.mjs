// Automated guards for Matching & Sorting (Toddler 4 · Age 2 · Class 10)
// plus its printable collection under /worksheets/toddler/matching-and-sorting/.
// Locked in:
//   1. the registry is EXACTLY the thirty-one owner-uploaded R2 files —
//      every image used once, every slug unique, every picture points at R2
//   2. all 63 new pages exist on disk (category, 31 activities, 31
//      printables) with unique titles and self-matching canonicals
//   3. activity pages: drawing layer over the original image with the
//      ?draw=1 cache key (CORS-safe), per-child restore key, tools rail,
//      prev/next and one honest printable-twin link
//   4. printable pages: NO drawing canvas, download + print + share +
//      family feedback + Solve it online + prev/next + related
//   5. the worksheet grid is tap-through — whole card links, zero buttons
//   6. Class 10 carries the Matching & Sorting section with 31 ribbons;
//      no other class gained them
//   7. cover.webp is the class/category cover — never an activity
//   8. no new top-level header entry; the category lives under Worksheets
//   9. sitemap + search index carry every new URL with honest kinds
//  10. the restore feature stays opt-in: no existing mount gained it
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import {msPages,MS_BASE,MS_COVER,MS_WS_BASE,MS_ACT_PATH,MS_CLASS_PATH} from '../src/matching-sorting.mjs';

const root='dist';
const read=p=>readFileSync(join(root,p),'utf8');
const page=p=>read(join(p,'index.html').replace(/\/\//g,'/'));
const SLUGS=msPages.map(a=>a.slug);
/* the exact bucket listing the owner posted — verified one image at a time */
const R2_FILES=['find-the-matching-pair','find-the-same-picture','match-animal-homes','match-animal-to-shadow','match-baby-animals','match-big-and-small','match-kitchen-items','match-mittens','match-object-to-use','match-objects-to-colors','match-puzzle-halves','match-same-animals','match-same-clothes','match-same-colors','match-same-fruits','match-same-objects','match-same-patterns','match-same-shapes','match-same-toys','match-shape-to-outline','match-socks','sort-animals-and-vehicles','sort-big-and-small-toys','sort-circles-and-squares','sort-day-and-night','sort-flying-and-rolling','sort-food-and-clothing','sort-fruits-and-vegetables','sort-living-and-nonliving','sort-red-and-blue','which-one-is-different']
 .map(s=>s+'.webp');
/* cover.webp also lives in the same R2 folder — it is the CLASS/CATEGORY
   COVER, deliberately absent from R2_FILES and from the registry. */

test('the registry is exactly the thirty-one owner-uploaded R2 files, each once',()=>{
 assert.equal(msPages.length,31,'thirty-one sheets — the cover is not one of them');
 assert.deepEqual([...msPages.map(a=>a.img)].sort(),[...R2_FILES].sort(),'every R2 file matched, none invented');
 assert.equal(new Set(SLUGS).size,31,'slugs unique');
 assert.equal(new Set(msPages.map(a=>a.img)).size,31,'images unique');
 assert.ok(!R2_FILES.includes(MS_COVER.file),'cover.webp stays out of the activity files');
 for(const a of msPages){
  assert.ok(a.img.endsWith('.webp')&&!a.img.includes('/'),'plain filename');
  assert.ok(a.alt&&a.alt.length>20,'honest alt text for '+a.slug);
  assert.ok(a.steps.length>=3&&a.steps.length<=4,'three-ish text steps for '+a.slug);
  assert.ok(a.meta.length>80,'real meta description for '+a.slug);
 }
});

test('every per-item page is gone; its URL 301s to the main page',()=>{
 for(const s of SLUGS){
  assert.ok(!existsSync(join(root,MS_WS_BASE+s,'index.html')),s+' printable page removed');
  assert.ok(!existsSync(join(root,MS_ACT_PATH+s,'index.html')),s+' activity page removed');
 }
 const xml=read('sitemap.xml');
 assert.ok(!xml.includes(MS_ACT_PATH+'match-same-colors/'),'sitemap carries no activity page');
 assert.ok(!xml.includes(MS_WS_BASE+'match-same-colors/'),'sitemap carries no printable page');
 const red=read('_redirects');
 for(const s of [SLUGS[0],SLUGS[15],SLUGS[30]]){
  assert.ok(red.includes(MS_ACT_PATH+s+'/ '+MS_ACT_PATH+' 301'),'301: activity '+s);
 }
 assert.ok(red.includes('/worksheets/:p1/:p2/:p3 /worksheets/:p1/:p2/ 301'),'301 placeholder covers the printables');
});


test('the class page folds all 31 activities with their original artwork',()=>{
 const cls=page('toddler/2-years/matching-and-sorting');
 assert.ok(cls.includes('MATCHING &amp; SORTING ACTIVITIES'),'the section is there');
 for(const a of msPages){
  const i=cls.indexOf(`id="${a.slug}"`);
  assert.ok(i>=0,'folded article '+a.slug);
  const seg=cls.slice(i,i+6000);
  assert.ok(seg.includes(MS_BASE+a.img),'original R2 picture: '+a.slug);
  assert.ok(!seg.includes(`href="${MS_ACT_PATH}${a.slug}/"`),'no self link: '+a.slug);
 }
 assert.ok(!cls.includes('data-wc-src'),'no drawing mounts left on the class page');
 assert.ok(!cls.includes('data-wc-restore'),'no restore keys left on the class page');
});


test('the worksheet set folds all 31 printables with their artwork and downloads',()=>{
 const set=page('worksheets/toddler/matching-and-sorting');
 assert.equal([...set.matchAll(/<article class="one-page-item[\w -]*"/g)].length,31,'thirty-one folded printables');
 for(const a of msPages){
  const i=set.indexOf(`id="${a.slug}"`);
  assert.ok(i>=0,'folded printable '+a.slug);
  const seg=set.slice(i,i+6000);
  assert.ok(seg.includes(`src="${MS_BASE}${a.img}"`),'plain R2 url, no draw key: '+a.slug);
  assert.ok(seg.includes(`href="${MS_BASE}${a.img}" download`),'real download link with the SEO file name: '+a.slug);
  assert.ok(!seg.includes('data-wc '),'no drawing mount: '+a.slug);
 }
 assert.ok(!set.includes('?draw=1'),'printables keep the plain URL');
});


test('the worksheet grid is a one-page shelf: no per-sheet jump links',()=>{
 const html=page('worksheets/toddler/matching-and-sorting');
 assert.equal((html.match(/class="ws-card" href="/g)||[]).length,0,'no per-sheet jump links');
 assert.ok(html.includes('class="lesson-cover"'),'category hero uses the cover figure');
 assert.ok(html.includes(`src="${MS_COVER.url}"`),'category hero wears the cover');
 const hub=page('worksheets');
 assert.ok(hub.includes(`href="${MS_WS_BASE}"`),'library hub links the new category');
});


test('Class 10 keeps its 31 ribbon cards, now without any jump links',()=>{
 const cls=page('toddler/2-years/matching-and-sorting');
 assert.equal((cls.match(/data-ms-card="/g)||[]).length,31,'thirty-one activity cards');
 assert.ok(!cls.includes(`href="${MS_ACT_PATH}match-same-colors/"`),'no per-item links');
 assert.ok(cls.includes(`href="${MS_WS_BASE}"`),'printable collection linked');
 assert.ok(cls.includes('id="off-screen"'),'the rest of the class page stays intact');
 const cs=page('toddler/2-years/colors-and-shapes');
 assert.equal((cs.match(/data-ms-card/g)||[]).length,0,'Class 9 untouched');
});


test('no new top-level header entry: the collection lives under Worksheets',()=>{
 for(const u of ['','toddler/2-years/matching-and-sorting','worksheets','worksheets/toddler/matching-and-sorting']){
  const html=page(u);
  const nav=html.slice(html.indexOf('<nav'),html.indexOf('</nav>'));
  assert.ok(!nav.includes(MS_WS_BASE),'no top-level nav link to the collection on /'+u);
  assert.ok(nav.includes('href="/worksheets/"'),'header keeps the Worksheets entry on /'+u);
 }
 const navHtml=page('worksheets/toddler/matching-and-sorting');
 const nav=navHtml.slice(navHtml.indexOf('<nav'),navHtml.indexOf('</nav>'));
 assert.ok(nav.includes('aria-current="page"'),'Worksheets marked current on the set page');
});






test('the Learning Path Class 10 row links straight to the worksheet category',()=>{
 const lp=page('learning-path');
 const rows=lp.split('<p class="lp-hublink">').filter(r=>r.includes(MS_WS_BASE));
 assert.equal(rows.length,1,'exactly one Learning Path row carries the worksheets link');
 assert.ok(rows[0].includes('Stage hub: <a href="/toddler/2-years/">Toddler 4</a>'),'it is the Toddler 4 row');
 assert.ok(rows[0].indexOf('/flashcards/matching-and-sorting/')<rows[0].indexOf(MS_WS_BASE),'flashcards link comes first, worksheets second');
 assert.ok(rows[0].includes('>matching &amp; sorting printables</a>'),'label reads like the Age 4 rows');
});
