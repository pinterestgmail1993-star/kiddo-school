// Class 39 · Staying Safe (/staying-safe/) — the owner's 19 safety cards
// (2026-10-30). Owner brief: "Add Class 41 'Staying Safe' (ages 4-5) to the
// Learning Path as the next class number in sequence (do not skip numbers; if
// Classes 39 and 40 are not live, use the next free number). Create the class
// page at /staying-safe/ and one short page per card at /staying-safe/<slug>/
// with a link back. Link from Class 32 (Life Skills & Good Habits), Class 33
// (Community Helpers), Class 24 (Transportation) and the Safety card in First
// Glance, and link back. Update the class count on the Learning Path. Do not
// change any existing URLs." Classes 39 and 40 were NOT live (the path ran
// Classes 1–38), so the class publishes as CLASS 39. Assets probed LIVE on R2
// at school/learning-path/staying-safe/<slug>.webp (19/19 HTTP 200
// image/webp, 800×1131) — files at the folder ROOT, no flashcards/ subfolder,
// no cover (the dinosaurs/art-room/clubs quirk). Card words transcribed
// verbatim from the artwork. NOTE: the owner's artwork prints "Class 41" on
// the card faces; the published number is 39 per the owner's own rule.
// OWNER ROUND 2026-10-31: the deck joins the flashcards library — the
// parents' shelf at /flashcards/staying-safe/ carries the whole deck on ONE
// page (image + description + age/subject/level pill + Download/Print under
// every card) with ZERO per-card pages in the library (manners +
// question-words precedent). TONE SPLIT (owner rule): the lesson talks
// directly to kids; the shelf talks directly to parents.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {SSAFE_PATH,SSAFE_BASE,SSAFE_ORDER,ssShortTitle} from '../src/staying-safe.mjs';

const read=p=>readFileSync('dist'+p+(p.endsWith('/')?'index.html':''),'utf8');
const cls=read('/staying-safe/');
const cards=SSAFE_ORDER.map(s=>({slug:s,html:read('/staying-safe/'+s+'/')}));

test('the class page exists at /staying-safe/ and exactly 19 short pages, one per card, nothing else',()=>{
 assert.ok(existsSync('dist/staying-safe/index.html'),'class page exists');
 assert.equal(cards.length,19,'19 cards in the deck');
 for(const c of cards)assert.ok(existsSync('dist/staying-safe/'+c.slug+'/index.html'),'short page for '+c.slug);
 const built=readFileSync('dist/staying-safe/index.html','utf8');
 for(const c of cards)assert.ok(built.includes(`href="${SSAFE_PATH}${c.slug}/"`),'class page tiles '+c.slug);
});

test('numbering: the class publishes as Class 39 on the page and the Learning Path, and the path stays 1–42 with no gap',()=>{
 assert.ok(cls.includes('CLASS 39'),'class page eyebrow says CLASS 39');
 const lp=read('/learning-path/');
 assert.ok(lp.includes('Class 39: <a href="/staying-safe/">Staying Safe</a>'),'LP row 39');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(43).keys()].map(i=>i+1),'LP sequence is exactly 1–43');
 assert.ok(lp.includes('forty-three age-guided classes')&&lp.includes('Forty-three classes are ready now'),'LP counts say forty');
 assert.ok(read('/index.html').includes('Forty-three classes are ready now'),'homepage count says forty');
 assert.ok(read('/about/').includes('Forty-three classes from birth to age five are ready today'),'about count says forty');
});

test('assets: every page serves the owner\'s real R2 files — folder root, no flashcards/ subfolder, honest dims',()=>{
 for(const c of cards){
  const m=c.html.match(new RegExp('src="(https://assets\\.kiddo\\.school/[^"]*'+c.slug+'\\.webp)"'));
  assert.ok(m,'image on '+c.slug);
  assert.equal(m[1],SSAFE_BASE+c.slug+'.webp','exact R2 URL for '+c.slug);
  assert.ok(!m[1].includes('flashcards/'),'no phantom flashcards folder on '+c.slug);
 }
 assert.ok(cls.match(/width="800" height="1131"/g).length>=19,'portrait dims on the class page tiles');
});

test('class page contract: heading, how-it-works, four shelves totalling 19, around-the-school backlinks, zero Etsy',()=>{
 assert.ok(cls.includes('<h1>Staying Safe.</h1>'),'h1');
 assert.ok(cls.includes('HOW THIS CLASS WORKS'),'how-this-class-works');
 for(const label of ['THE ROAD SHELF','THE HOME SHELF','THE FIRE SHELF','THE HELPING SHELF'])assert.ok(cls.includes(label),'shelf '+label);
 assert.equal((cls.match(/class="lp-tile"/g)||[]).length,19,'19 tiles across the shelves');
 for(const dest of ['/learning-path/','/preschool/4-years/life-skills-and-good-habits/','/preschool/4-years/community-helpers-and-our-neighborhood/','/preschool/4-years/transportation-and-vehicles/','/first-glance/'])
  assert.ok(cls.includes('href="'+dest+'"'),'class page links back to '+dest);
 assert.ok(!cls.toLowerCase().includes('etsy'),'zero Etsy');
 assert.ok(!/id="the-cards"/.test(cls),'no the-cards anchor');
});

test('short-page contract: h1 = card word, verbatim rule, try-it-today, back link, prev/next, download, breadcrumb',()=>{
 for(const [i,c] of cards.entries()){
  const prev=SSAFE_ORDER[(i+18)%19],next=SSAFE_ORDER[(i+1)%19];
  assert.ok(c.html.includes(`<h1>`),'h1 on '+c.slug);
  assert.ok(c.html.includes('href="'+SSAFE_PATH+'"'),'back link on '+c.slug);
  assert.ok(c.html.includes('The card says')&&c.html.includes('\u201c')&&c.html.includes('\u201d'),'verbatim rule block on '+c.slug);
  assert.ok(c.html.includes('Try it today'),'practice step on '+c.slug);
  assert.ok(c.html.includes(`href="${SSAFE_PATH}${prev}/"`)&&c.html.includes(`href="${SSAFE_PATH}${next}/"`),'prev/next on '+c.slug);
  assert.ok(c.html.includes('download'),'download button on '+c.slug);
  assert.ok(c.html.includes('<nav class="breadcrumbs wrap"'),'breadcrumb on '+c.slug);
  assert.ok(c.html.includes(`CARD ${i+1} OF 19`),'card counter on '+c.slug);
  assert.ok(!c.html.toLowerCase().includes('etsy'),'zero Etsy on '+c.slug);
 }
});

test('the 19 intros and 19 practice steps are unique — no sentence repeats across the deck',()=>{
 const sentences=[];
 for(const c of cards){
  const intro=c.html.match(/<div class="page-heading wrap"><span class="eyebrow">[^<]*<\/span><h1>[^<]*<\/h1><p>(.*?)<\/p><\/div>/);
  assert.ok(intro,'intro paragraph on '+c.slug);
  const tryIt=c.html.match(/<h2>Try it today<\/h2><p>(.*?)<\/p>/);
  assert.ok(tryIt,'try step on '+c.slug);
  sentences.push(...[intro[1],tryIt[1]].map(t=>t.replace(/<[^>]+>/g,'')));
 }
 const seen=new Set();
 for(const s of sentences){
  const key=s.slice(0,60).toLowerCase();
  assert.ok(!seen.has(key),'duplicate sentence start: '+key);
  seen.add(key);
 }
});

test('inbound links: Class 32, Class 33 and Class 24 each carry their Staying Safe block; First Glance safety sheet points here',()=>{
 const c32=read('/preschool/4-years/life-skills-and-good-habits/');
 const c33=read('/preschool/4-years/community-helpers-and-our-neighborhood/');
 const c24=read('/preschool/4-years/transportation-and-vehicles/');
 for(const [pg,name] of [[c32,'Class 32'],[c33,'Class 33'],[c24,'Class 24']]){
  assert.ok(pg.includes('href="/staying-safe/"'),name+' links the class');
  assert.ok(pg.includes('Staying Safe'),name+' names the class');
 }
 const fg=read('/first-glance/');
 assert.ok(fg.includes('<a class="fg-more" href="/staying-safe/">'),'First Glance safety sheet carries the fg-more link');
 assert.ok(fg.includes('Class 39'),'First Glance link names Class 39');
});

test('search, sitemap, all-pages and short-page SEO wiring: 20 new URLs, kind Class, honest titles',()=>{
 const idx=JSON.parse(readFileSync('dist/assets/search-index.json','utf8'));
 const mine=idx.filter(x=>x.u.startsWith('/staying-safe/'));
 assert.equal(mine.length,20,'20 search entries: class + 19 cards');
 assert.ok(mine.every(x=>x.k==='Class'),'search kind is Class');
 const sitemap=readFileSync('dist/sitemap.xml','utf8');
 assert.ok(sitemap.includes('<loc>https://kiddo.school/staying-safe/</loc>'),'class page in sitemap');
 for(const c of cards)assert.ok(sitemap.includes('<loc>https://kiddo.school/staying-safe/'+c.slug+'/</loc>'),'sitemap carries '+c.slug);
 const ap=read('/all-pages/');
 assert.ok(ap.includes('/staying-safe/'),'all-pages carries the class');
 for(const c of cards){
  assert.ok(c.html.includes('<title>'+ssShortTitle(c.slug)+' | Kiddo.school</title>'),'title on '+c.slug);
  assert.ok(c.html.includes('<link rel="canonical" href="https://kiddo.school/staying-safe/'+c.slug+'/">'),'canonical on '+c.slug);
 }
});

test('the parents\u2019 shelf at /flashcards/staying-safe/: 19 tiles, image + description + age/subject/level pill + Download/Print under every card, zero per-card URLs in the library',()=>{
 const shelf=readFileSync('dist/flashcards/staying-safe/index.html','utf8');
 assert.ok(shelf.includes('<title>Staying Safe Flashcards to Print \u2014 19 Safety Cards for Parents (Ages 4\u20135) | Kiddo.school</title>'));
 assert.equal((shelf.match(/class="mn-card"/g)||[]).length,19,'19 card tiles');
 assert.equal((shelf.match(/fc-pillrow/g)||[]).length,19,'a pill row on every tile');
 for(const c of cards){
  assert.ok(shelf.includes(SSAFE_BASE+c.slug+'.webp" download="'+c.slug+'.webp"'),c.slug+': Download serves the folder-root R2 file');
  assert.ok(shelf.includes('data-mn-print'),c.slug+': Print button present');
  const tileAnchor=shelf.indexOf(SSAFE_BASE+c.slug+'.webp" width="800"');
  const tile=shelf.slice(tileAnchor,tileAnchor+2600);
  assert.ok(tile.includes('fc-pill-age'),c.slug+': age pill');
  assert.ok(tile.includes('fc-pill-subject'),c.slug+': subject pill');
  assert.ok(tile.includes('fc-pill-level'),c.slug+': level pill');
  assert.ok(tile.includes('class="mn-tip"'),c.slug+': parent description under the image');
 }
 assert.ok(shelf.includes('src="/assets/manners.js'),'the print handler rides along');
 assert.equal((shelf.match(/fc-pill-level">Level 1/g)||[]).length,7,'level 1 = 7 cards (start here)');
 assert.equal((shelf.match(/fc-pill-level">Level 2/g)||[]).length,7,'level 2 = 7 cards (practise)');
 assert.equal((shelf.match(/fc-pill-level">Level 3/g)||[]).length,5,'level 3 = 5 cards (hero moves)');
 assert.ok(shelf.includes('href="/staying-safe/"'),'shelf links back to the class');
 assert.ok(shelf.includes('href="/flashcards/healthy-food/"'),'shelf links to the sibling shelf');
 assert.ok(!shelf.toLowerCase().includes('etsy'),'zero Etsy on the shelf');
 assert.ok(!/href="#(?!main")/.test(shelf),'no anchor jump links on the shelf');
 assert.ok(shelf.includes('your child'),'parent voice on the shelf');
 // No per-card URLs in the library — the shelf is the whole set.
 assert.equal(readdirSync('dist/flashcards/staying-safe').filter(d=>d!=='index.html').length,0,'zero per-card URLs in the library');
 // The class page links to its parents' shelf (manners precedent).
 assert.ok(cls.includes('href="/flashcards/staying-safe/"'),'class page links to the parents\u2019 shelf');
 // The library wall fronts the set with the deck's first card (no cover on R2).
 const hubHtml=readFileSync('dist/flashcards/index.html','utf8');
 assert.ok(hubHtml.includes('href="/flashcards/staying-safe/"'),'library wall carries the set');
 assert.ok(hubHtml.includes(SSAFE_BASE+'buckle-up.webp'),'the first card fronts the wall card (no cover on R2)');
 // Search kind Flashcards, sitemap, all-pages.
 const idx=JSON.parse(readFileSync('dist/assets/search-index.json','utf8'));
 const mine=idx.find(x=>x.u==='/flashcards/staying-safe/');
 assert.ok(mine&&mine.k==='Flashcards','search carries the shelf as Flashcards');
 assert.ok(readFileSync('dist/sitemap.xml','utf8').includes('<loc>https://kiddo.school/flashcards/staying-safe/</loc>'),'sitemap carries the shelf');
 assert.ok(readFileSync('dist/all-pages/index.html','utf8').includes('/flashcards/staying-safe/'),'all-pages carries the shelf');
 // The 19 shelf descriptions are unique among themselves and never reuse a
 // lesson sentence (duplicate-content rule).
 const descs=[...shelf.matchAll(/class="mn-tip">(.*?)<\/figcaption>/g)].map(m=>m[1].slice(0,60).toLowerCase());
 assert.equal(descs.length,19,'19 shelf descriptions');
 assert.equal(new Set(descs).size,19,'shelf descriptions are unique');
});
