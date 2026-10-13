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

test('all 63 new pages exist with unique titles and self-matching canonicals',()=>{
 const pages=[[MS_WS_BASE]];
 for(const s of SLUGS){pages.push([MS_WS_BASE+s+'/'],[MS_ACT_PATH+s+'/']);}
 const titles=new Set(),canons=new Set();
 for(const [u] of pages){
  assert.ok(existsSync(join(root,u,'index.html')),u+' exists on disk');
  const html=page(u.slice(1));
  const t=(html.match(/<title>([^<]+)<\/title>/)||[])[1];
  assert.ok(t&&!titles.has(t),'unique title for '+u+': '+t);
  titles.add(t);
  const c=(html.match(/rel="canonical" href="([^"]+)"/)||[])[1];
  assert.ok(c&&c.endsWith(u),'canonical matches '+u);
  assert.ok(!canons.has(c),'canonical unique: '+c);
  canons.add(c);
 }
 assert.equal(pages.length,63,'category + 62 pages');
});

test('activity pages: original image + drawing layer + ?draw=1 + restore key + twin link',()=>{
 for(const a of msPages){
  const html=page('toddler/2-years/matching-and-sorting/'+a.slug);
  assert.ok(html.includes(`data-wc data-wc-src="${MS_BASE}${a.img}?draw=1"`),'original R2 picture feeds the drawing layer with its own cache key: '+a.slug);
  assert.ok(html.includes(`src="${MS_BASE}${a.img}?draw=1"`),'the sheet img shares the CORS-safe cache key: '+a.slug);
  assert.ok(html.includes('crossorigin="anonymous"'),'sheet loads in CORS mode so saves can compose: '+a.slug);
  assert.ok(html.includes('data-wc-w="1414" data-wc-h="2000"'),'natural proportions declared: '+a.slug);
  assert.ok(html.includes(`data-wc-restore="matching-sorting/${a.slug}"`),'per-child save & restore key: '+a.slug);
  assert.ok(html.includes('data-wc-toolbar="#ms-tools"'),'tools live in the right rail: '+a.slug);
  assert.ok(html.includes('rel="prev"')&&html.includes('rel="next"'),'prev/next: '+a.slug);
  assert.ok(html.includes(`href="${MS_WS_BASE}${a.slug}/"`),'links the printable twin: '+a.slug);
  assert.ok(!html.includes('data-ms-download'),'activity page is not a download page: '+a.slug);
  assert.ok(html.includes(`href="${MS_ACT_PATH}${msPages[(msPages.indexOf(a)+1)%31].slug}/"`),'next activity wired: '+a.slug);
  assert.ok(!html.includes('cover.webp'),'activity '+a.slug+' never touches the cover');
 }
});

test('printable pages: no canvas, download + print + feedback + solve online',()=>{
 for(const a of msPages){
  const html=page('worksheets/toddler/matching-and-sorting/'+a.slug);
  assert.ok(!html.includes('data-wc '),'printable must not carry a drawing mount: '+a.slug);
  assert.ok(!html.includes('?draw=1'),'printable keeps the plain URL (no canvas cache key needed): '+a.slug);
  assert.ok(html.includes(`data-ms-download="${MS_BASE}${a.img}"`),'original image download: '+a.slug);
  assert.ok(html.includes('data-ms-print'),'print button: '+a.slug);
  assert.ok(html.includes('data-fc-root'),'existing family feedback mount: '+a.slug);
  assert.ok(html.includes(`href="${MS_ACT_PATH}${a.slug}/"`),'Solve it online: '+a.slug);
  assert.ok(html.includes('Solve it online'),'the button is labelled: '+a.slug);
  assert.ok(html.includes('rel="prev"')&&html.includes('rel="next"'),'prev/next: '+a.slug);
  assert.ok(html.includes('MORE MATCHING &amp; SORTING'),'related pages: '+a.slug);
  assert.ok(html.includes('href="/worksheets/"'),'breadcrumb to the library: '+a.slug);
  assert.ok(!html.includes('cover.webp'),'printable '+a.slug+' never touches the cover');
 }
});

test('the worksheet grid is tap-through: 31 whole-card links, zero buttons',()=>{
 const html=page('worksheets/toddler/matching-and-sorting');
 assert.equal((html.match(/class="ws-card" href="/g)||[]).length,31,'thirty-one whole-card links');
 assert.equal((html.match(/data-ms-download|data-fc-dl/g)||[]).length,0,'no download buttons on the grid');
 assert.equal((html.match(/ws-card-open/g)||[]).length,31,'every card has its label');
 assert.ok(html.includes(`class="lesson-cover"`),'category hero uses the cover figure');
 assert.ok(html.includes(`src="${MS_COVER.url}"`),'category hero wears the cover');
 const hub=page('worksheets');
 assert.ok(hub.includes(`href="${MS_WS_BASE}"`),'library hub links the new category');
});

test('Class 10 carries the Matching & Sorting section with 31 ribbon cards',()=>{
 const cls=page('toddler/2-years/matching-and-sorting');
 assert.ok(cls.includes('MATCHING &amp; SORTING ACTIVITIES'),'the section is there');
 assert.equal((cls.match(/data-ms-card="/g)||[]).length,31,'thirty-one activity cards');
 assert.ok(cls.includes(`href="${MS_ACT_PATH}match-same-colors/"`),'first activity linked');
 assert.ok(cls.includes(`href="${MS_WS_BASE}"`),'printable collection linked');
 assert.ok(cls.includes('id="off-screen"'),'the rest of the class page stays intact');
 // the other classes stay untouched — no matching cards anywhere else
 const cs=page('toddler/2-years/colors-and-shapes');
 assert.equal((cs.match(/data-ms-card/g)||[]).length,0,'Class 9 untouched');
});

test('no new top-level header entry: the collection lives under Worksheets',()=>{
 for(const u of ['','toddler/2-years/matching-and-sorting','worksheets','worksheets/toddler/matching-and-sorting/match-same-colors']){
  const html=page(u);
  const nav=html.slice(html.indexOf('<nav'),html.indexOf('</nav>'));
  assert.ok(!nav.includes(MS_WS_BASE),'no top-level nav link to the collection on /'+u);
  assert.ok(nav.includes('href="/worksheets/"'),'header keeps the Worksheets entry on /'+u);
 }
 // and the Worksheets header link is current across the new printables
 const nav=page('worksheets/toddler/matching-and-sorting/sort-red-and-blue').slice(
  page('worksheets/toddler/matching-and-sorting/sort-red-and-blue').indexOf('<nav'),page('worksheets/toddler/matching-and-sorting/sort-red-and-blue').indexOf('</nav>'));
 assert.ok(nav.includes('aria-current="page"'),'Worksheets marked current on a printable page');
});

test('sitemap and search index carry every new URL with honest kinds',()=>{
 const xml=read('sitemap.xml');
 const search=JSON.parse(read('assets/search-index.json'));
 const urls=[MS_WS_BASE];
 for(const s of SLUGS){urls.push(MS_WS_BASE+s+'/',MS_ACT_PATH+s+'/');}
 for(const u of urls){
  assert.ok(xml.includes(`<loc>https://kiddo.school${u}</loc>`),'sitemap: '+u);
 }
 const ws=search.filter(e=>e.u.startsWith(MS_WS_BASE));
 const acts=search.filter(e=>e.u.startsWith(MS_ACT_PATH)&&e.u!==MS_CLASS_PATH&&!e.u.includes('/learn/'));
 const learns=search.filter(e=>e.u.startsWith(MS_ACT_PATH)&&e.u.includes('/learn/'));
 assert.equal(ws.length,32,'category + 31 printables in search');
 assert.equal(acts.length,31,'31 activities in search');
 assert.equal(learns.length,15,'15 Learning Path lessons in search');
 assert.ok(ws.every(e=>e.k==='Worksheet')&&acts.every(e=>e.k==='Matching activity')&&learns.every(e=>e.k==='Matching activity'||e.k==='Class'),'honest kinds');
});

test('restore stays opt-in per page family: flashcards none, activities their own key',()=>{
 for(const u of ['flashcards/alphabet-lowercase/letter-a','flashcards/matching-and-sorting/same-balls','worksheets/life-skills/wash-your-hands']){
  const html=page(u);
  assert.ok(!html.includes('data-wc '),'printable/flashcard page carries no drawing mount at all: '+u);
 }
 // every Learning Path activity restores its own per-child slot
 for(const [u,key] of [
  ['toddler/2-years/matching-and-sorting/match-same-animals','data-wc-restore="matching-sorting/match-same-animals"'],
  ['preschool/life-skills/wash-your-hands','data-wc-restore="life-skills/wash-your-hands"'],
  ['toddler/2-years/colors-and-shapes/coloring/circle','data-wc-restore="coloring/circle"'],
  ['preschool/3-years/alphabet-and-letter-sounds/letter-a','data-wc-restore="alphabet/letter-a"']]){
  const html=page(u);
  assert.ok(html.includes(key),'restore keeps its own family key: '+u+' -> '+key);
 }
 // the flashcards set for this very class stays exactly as it was
 const fc=page('flashcards/matching-and-sorting');
 assert.ok(existsSync(join(root,'flashcards/matching-and-sorting/index.html')),'the existing flashcards set is untouched');
});

test('the Learning Path Class 10 row links straight to the worksheet category',()=>{
 const lp=page('learning-path');
 const rows=lp.split('<p class="lp-hublink">').filter(r=>r.includes(MS_WS_BASE));
 assert.equal(rows.length,1,'exactly one Learning Path row carries the worksheets link');
 assert.ok(rows[0].includes('Stage hub: <a href="/toddler/2-years/">Toddler 4</a>'),'it is the Toddler 4 row');
 assert.ok(rows[0].indexOf('/flashcards/matching-and-sorting/')<rows[0].indexOf(MS_WS_BASE),'flashcards link comes first, worksheets second');
 assert.ok(rows[0].includes('>matching &amp; sorting printables</a>'),'label reads like the Age 4 rows');
});
