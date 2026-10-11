// Automated guards for the Coloring Pages category — "Shape Coloring Fun"
// (Toddler 3 · Age 2 · Class 9 Colors and Shapes) plus the new main
// category /coloring-pages/. Locked in:
//   1. the registry is EXACTLY the twenty owner-uploaded R2 files — every
//      image used once, every slug unique, every picture points at R2
//   2. all 42 new pages exist on disk (hub, category, 20 activities,
//      20 printables) with unique titles and self-matching canonicals
//   3. activity pages: drawing layer over the original image with the
//      per-child restore key, tools rail, prev/next, printable twin link
//   4. printable pages: NO drawing canvas, download + print + share +
//      family feedback + Start Coloring Online + prev/next + related
//   5. the printable grid is tap-through — whole card links, zero buttons
//   6. Class 9 carries the Shape Coloring Fun section with 20 ribbons
//   7. the header link exists everywhere and is aria-current on category pages
//   8. sitemap + search index carry every new URL
//   9. the write-color restore is opt-in: no existing mount gained it
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import {coloringPages,CP_BASE,CP_COVER,CP_ACT_PATH,CP_LIB,CP_HUB,CP_CLASS_PATH} from '../src/coloring-pages.mjs';

const root='dist';
const read=p=>readFileSync(join(root,p),'utf8');
const page=p=>read(join(p,'index.html').replace(/\/\//g,'/'));
const SLUGS=coloringPages.map(a=>a.slug);
/* the exact bucket listing the owner posted — verified one image at a time */
const R2_FILES=['apple-and-banana.webp','book-and-phone.webp','circle-and-beach-ball.webp','circle.webp','egg-shape.webp','heart.webp','oval.webp','pillow-and-square.webp','rectangle-and-bus.webp','rectangle.webp','square-and-gift-box.webp','square.webp','star.webp','tall-rectangle.webp','tall-triangle.webp','triangle-and-house.webp','triangle-sandwich-and-mountain.webp','triangle.webp','two-circles.webp','two-ovals.webp'];
/* the category cover is drawn in code and ships from /assets/coloring/ —
   deliberately absent from R2_FILES and from the registry. */

test('the registry is exactly the twenty owner-uploaded R2 files, each once',()=>{
 assert.equal(coloringPages.length,20,'twenty coloring pages — the cover is not one of them');
 assert.deepEqual([...coloringPages.map(a=>a.img)].sort(),[...R2_FILES].sort(),'every R2 file matched, none invented');
 assert.equal(new Set(SLUGS).size,20,'slugs unique');
 assert.equal(new Set(coloringPages.map(a=>a.img)).size,20,'images unique');
 assert.ok(!R2_FILES.includes(CP_COVER.file),'the coded cover stays out of the activity files');
 for(const a of coloringPages){
  assert.ok(a.img.endsWith('.webp')&&!a.img.includes('/'),'plain filename');
  assert.ok(a.alt&&a.alt.length>20,'honest alt text for '+a.slug);
  assert.ok(a.steps.length>=3&&a.steps.length<=4,'three-ish text steps for '+a.slug);
  assert.ok(a.meta.length>80,'real meta description for '+a.slug);
 }
});

test('all 42 new pages exist with unique titles and self-matching canonicals',()=>{
 const pages=[[CP_HUB],[CP_LIB]];
 for(const s of SLUGS){pages.push([CP_LIB+s+'/'],[CP_ACT_PATH+s+'/']);}
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
 assert.equal(pages.length,42,'hub + category + 40 pages');
});

test('activity pages: original image + drawing layer + restore key + twin link',()=>{
 for(const a of coloringPages){
  const html=page('toddler/2-years/colors-and-shapes/coloring/'+a.slug);
  assert.ok(html.includes(`data-wc data-wc-src="${CP_BASE}${a.img}?draw=1"`),'original R2 picture feeds the drawing layer with its own CORS cache key: '+a.slug);
  assert.ok(html.includes(`src="${CP_BASE}${a.img}?draw=1"`),'the sheet img shares the CORS-safe cache key (fill and save need a clean canvas): '+a.slug);
  assert.ok(html.includes('data-wc-w="1545" data-wc-h="2000"'),'natural proportions declared: '+a.slug);
  assert.ok(html.includes(`data-wc-restore="coloring/${a.slug}"`),'per-child save & restore key: '+a.slug);
  assert.ok(html.includes('data-wc-toolbar="#cp-tools"'),'tools live in the right rail: '+a.slug);
  assert.ok(html.includes('rel="prev"')&&html.includes('rel="next"'),'prev/next: '+a.slug);
  assert.ok(html.includes(`href="${CP_LIB}${a.slug}/"`),'links the printable twin: '+a.slug);
  assert.ok(!html.includes('data-cp-download'),'activity page is not a download page: '+a.slug);
  assert.ok(html.includes(`href="${CP_ACT_PATH}${coloringPages[(coloringPages.indexOf(a)+1)%20].slug}/"`),'next activity wired: '+a.slug);
 }
});

test('printable pages: no canvas, download + print + feedback + color online',()=>{
 for(const a of coloringPages){
  const html=page('coloring-pages/shapes/'+a.slug);
  assert.ok(!html.includes('data-wc '),'printable must not carry a drawing mount: '+a.slug);
  assert.ok(html.includes(`data-cp-download="${CP_BASE}${a.img}"`),'original image download: '+a.slug);
  assert.ok(html.includes('data-cp-print'),'print button: '+a.slug);
  assert.ok(html.includes('data-fc-root'),'existing family feedback mount: '+a.slug);
  assert.ok(html.includes(`href="${CP_ACT_PATH}${a.slug}/"`),'Start Coloring Online: '+a.slug);
  assert.ok(html.includes('Start Coloring Online'),'the button is labelled: '+a.slug);
  assert.ok(html.includes('rel="prev"')&&html.includes('rel="next"'),'prev/next: '+a.slug);
  assert.ok(html.includes('MORE SHAPES TO COLOR'),'related pages: '+a.slug);
  assert.ok(html.includes('Coloring Pages','breadcrumbs'),'breadcrumb to the category: '+a.slug);
 }
});

test('the printable grid is tap-through: 20 whole-card links, zero buttons',()=>{
 const html=page('coloring-pages/shapes');
 assert.equal((html.match(/class="ws-card" href="/g)||[]).length,20,'twenty whole-card links');
 assert.equal((html.match(/data-fc-dl/g)||[]).length,0,'no download buttons on the grid');
 assert.equal((html.match(/ws-card-open/g)||[]).length,20,'every card has its label');
 const hub=page('coloring-pages');
 assert.ok(hub.includes(`href="${CP_LIB}"`),'hub links the Shapes category');
});

test('Class 9 carries the Shape Coloring Fun section with 20 ribbon cards',()=>{
 const cls=page('toddler/2-years/colors-and-shapes');
 assert.ok(cls.includes('SHAPE COLORING FUN'),'the section is there');
 assert.equal((cls.match(/data-coloring-card="/g)||[]).length,20,'twenty activity cards');
 assert.ok(cls.includes(`href="${CP_ACT_PATH}circle/"`),'first activity linked');
 assert.ok(cls.includes(`href="${CP_LIB}"`),'printable collection linked');
 // the other classes stay untouched — no coloring cards anywhere else
 const ms=page('toddler/2-years/matching-and-sorting');
 assert.equal((ms.match(/data-coloring-card/g)||[]).length,0,'Class 10 untouched');
});

test('the Learning Path links Coloring Pages from the Class 9 row only',()=>{
 const lp=page('learning-path');
 assert.ok(lp.includes(' · Coloring Pages: <a href="/coloring-pages/shapes/">Shapes</a></p>'),'Class 9 row carries the coloring link');
 assert.equal((lp.match(/href="\/coloring-pages\/shapes\//g)||[]).length,1,'exactly one coloring link on the path');
 assert.equal((lp.match(/Coloring Pages: <a/g)||[]).length,1,'no other row gained a coloring link');
});

test('the coded cover is the category face — never an activity',()=>{
 assert.equal(CP_COVER.file,'/assets/coloring/shapes-cover.webp');
 assert.ok(existsSync(join('public',CP_COVER.file)),'the cover is drawn in code and ships from the repo');
 const webp=readFileSync(join('public',CP_COVER.file));
 assert.ok(webp.length>20000,'the cover is a real rendered image, not a stub');
 assert.equal(webp.slice(0,4).toString('ascii'),'RIFF','RIFF container');
 assert.equal(webp.slice(8,12).toString('ascii'),'WEBP','…in WebP format');
 // the hub card wears the cover
 const site=JSON.parse(read('build-info.json')).siteUrl;
 const hub=page('coloring-pages');
 assert.ok(hub.includes(`src="${CP_COVER.url}"`),'hub card uses the cover');
 assert.ok(hub.includes(`<meta property="og:image" content="${site}${CP_COVER.url}">`),'hub og:image is the absolute cover URL');
 // the category page wears the cover as its hero AND keeps exactly 20 grid cards
 const cat=page('coloring-pages/shapes');
 assert.ok(cat.includes(`class="lesson-cover"`),'category hero uses the cover figure');
 assert.ok(cat.includes(`src="${CP_COVER.url}"`),'category hero uses the cover');
 assert.ok(cat.includes(`<meta property="og:image" content="${site}${CP_COVER.url}">`),'category og:image is the absolute cover URL');
 assert.equal((cat.match(/class="ws-card" href="/g)||[]).length,20,'grid still lists exactly the 20 activities');
 assert.ok(!/class="ws-card" href="[^"]*cover\//.test(cat),'no grid card points at a cover page');
 // no activity or printable page uses the cover as its sheet
 for(const a of coloringPages){
  const act=page('toddler/2-years/colors-and-shapes/coloring/'+a.slug);
  const prn=page('coloring-pages/shapes/'+a.slug);
  assert.ok(!act.includes('shapes-cover'),'activity '+a.slug+' never touches the cover');
  assert.ok(!prn.includes('shapes-cover'),'printable '+a.slug+' never touches the cover');
 }
});

test('the coloring tools ship the full set: pencil, pen, fill, sizes, eraser',()=>{
 const js=read('assets/write-color.js');
 for(const t of ["'Pencil'","'Pen'","'Fill'","'Eraser'","'Undo'","'Redo'","'Clear'","'Save my work'"])assert.ok(js.includes(t),'tool button '+t+' exists');
 assert.ok(js.includes('wc-fill'),'a dedicated fill layer sits under the strokes');
 assert.ok(js.includes('wc-size')&&js.includes('Thin')&&js.includes('Medium')&&js.includes('Thick'),'three line sizes');
 assert.ok(js.includes('getImageData')&&js.includes('putImageData'),'fill really reads and paints pixels');
 const css=read('assets/style.css');
 assert.match(css,/\.wc-fill\{[^}]*pointer-events:none/,'the fill layer never steals the pointer');
 assert.match(css,/\.wc-size \.wc-dot\[data-size="3\.2"\]/,'the thick dot renders');
 const act=page('toddler/2-years/colors-and-shapes/coloring/circle');
 assert.match(act,/Pencil, pen, fill, three line sizes/,'the pencil-case copy names the full set');
});

test('the header link works everywhere and is current on category pages',()=>{
 for(const [u,current] of [['worksheets',false],['flashcards',false],['toddler/2-years/colors-and-shapes',false],['coloring-pages',true],['coloring-pages/shapes/star',true]]){
  const html=page(u);
  assert.ok(html.includes('href="/coloring-pages/"'),'header link on '+u);
  const nav=html.slice(html.indexOf('<nav'),html.indexOf('</nav>'));
  if(current)assert.ok(nav.includes('aria-current="page"'),'nav marks the current category on '+u);
 }
});

test('sitemap and search index carry every new URL',()=>{
 const xml=read('sitemap.xml');
 const search=JSON.parse(read('assets/search-index.json'));
 const urls=[CP_HUB,CP_LIB];
 for(const s of SLUGS){urls.push(CP_LIB+s+'/',CP_ACT_PATH+s+'/');}
 for(const u of urls){
  assert.ok(xml.includes(`<loc>https://kiddo-school.pages.dev${u}</loc>`),'sitemap: '+u);
 }
 const kinds=search.filter(e=>e.u.startsWith('/coloring-pages/'));
 const acts=search.filter(e=>e.u.startsWith(CP_ACT_PATH));
 assert.equal(kinds.length,22,'hub + category + 20 printables in search');
 assert.equal(acts.length,20,'20 activities in search');
 assert.ok(kinds.every(e=>e.k==='Coloring page')&&acts.every(e=>e.k==='Coloring activity'),'honest kinds');
});

test('the restore feature is opt-in: flashcards and printables stay off, activities own their key',()=>{
 for(const u of ['flashcards/alphabet-lowercase/letter-a','flashcards/colors-and-shapes/circle','worksheets/life-skills/wash-your-hands','coloring-pages/shapes/circle']){
  const html=page(u);
  assert.ok(!html.includes('data-wc-restore'),'restore stays off on paper pages: '+u);
 }
 const act=page('toddler/2-years/colors-and-shapes/coloring/circle');
 assert.ok(act.includes('data-wc-restore="coloring/circle"'),'the coloring twin keeps its per-child restore');
});
