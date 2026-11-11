// Class 40 · Healthy Food & Eating Well (owner brief 2026-10-30, executed
// 2026-10-31): the class page at /healthy-food/ + ONE short page per card at
// /healthy-food/<slug>/ (21 cards + cover.webp, probed live at
// school/learning-path/healthy-food/flashcards/ — 22/22 HTTP 200, every card
// 800×1131 portrait). Class 39 · Staying Safe is live at /staying-safe/, so
// this class is numbered 40, the next number in sequence. These cards carry
// no rule banner — the big printed title IS the habit — so the short pages
// turn each title into the child's sentence and add one try-it-tonight idea.
// OWNER ROUND 2026-10-31: both new decks join the flashcards library — the
// parents' shelf at /flashcards/healthy-food/ carries the whole deck on ONE
// page (image + description + age/subject/level pill + Download/Print under
// every card) with ZERO per-card pages (manners + question-words precedent).
// TONE SPLIT (owner rule): the lesson talks directly to kids; the shelf talks
// directly to parents. Cross-links: Class 22 (Fruits & Vegetables), Class 32
// (Life Skills) and the Cafeteria room point here; the class page links back
// to all three and to the parents' shelf. No anchor jump links, no Etsy.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';

const read=p=>readFileSync('dist/'+p,'utf8');
const BASE='https://assets.kiddo.school/school/learning-path/healthy-food/flashcards/';

const ORDER=['balanced-plate','breakfast','chew-well','dairy','dinner','eat-a-rainbow',
 'eat-slowly','eat-together','feel-full','fruit','good-energy','healthy-choice',
 'healthy-snack','lunch','protein','sit-down','try-new-foods','vegetables',
 'wash-your-hands','water','whole-grains'];
const SHELVES={plate:['balanced-plate','fruit','vegetables','dairy','protein','whole-grains','eat-a-rainbow'],
 meals:['breakfast','lunch','dinner','healthy-snack','water','wash-your-hands'],
 habits:['sit-down','eat-slowly','chew-well','try-new-foods','healthy-choice','feel-full','eat-together','good-energy']};



test('the parents\u2019 shelf: 21 tiles, image + description + age/subject/level pill + Download/Print under every card, spoken to parents',()=>{
 const shelf=read('flashcards/healthy-food/index.html');
 assert.ok(shelf.includes('<title>Healthy Food Flashcards to Print — 21 Food-Habit Cards for Parents (Ages 4–5) | Kiddo.school</title>'));
 assert.equal((shelf.match(/class="mn-card"/g)||[]).length,21,'21 card tiles');
 assert.equal((shelf.match(/fc-pillrow/g)||[]).length,21,'a pill row on every tile');
 for(const s of ORDER){
  assert.ok(shelf.includes(BASE+s+'.webp" download="'+s+'.webp"'),s+': Download serves the full-size card');
  assert.ok(shelf.includes('data-mn-print'),s+': Print button present');
  const tileAnchor=shelf.indexOf(BASE+s+'.webp" width="800"');
  const tile=shelf.slice(tileAnchor,tileAnchor+2600);
  assert.ok(tile.includes('fc-pill-age'),s+': age pill');
  assert.ok(tile.includes('fc-pill-subject'),s+': subject pill');
  assert.ok(tile.includes('fc-pill-level'),s+': level pill');
  assert.ok(tile.includes('class="mn-tip"'),s+': parent description under the image');
 }
 assert.ok(shelf.includes('src="/assets/manners.js'),'the print handler rides along');
 assert.equal((shelf.match(/fc-pill-level">Level 1/g)||[]).length,7,'level 1 = 7 cards (name it)');
 assert.equal((shelf.match(/fc-pill-level">Level 2/g)||[]).length,9,'level 2 = 9 cards (do it)');
 assert.equal((shelf.match(/fc-pill-level">Level 3/g)||[]).length,5,'level 3 = 5 cards (own it)');
 assert.ok(shelf.includes('href="/healthy-food/"'),'shelf links back to the class');
 assert.ok(shelf.includes('href="/flashcards/staying-safe/"'),'shelf links to the sibling shelf');
 assert.ok(!/href="#(?!main")/.test(shelf),'no anchor jump links on the shelf');
 assert.ok(!/etsy/i.test(shelf),'no Etsy on the shelf');
 // The shelf talks to PARENTS; the child-directed words live on the class.
 assert.ok(shelf.includes('your child'),'parent voice on the shelf');
 // The class page links to its parents' shelf (manners precedent).
 const cls=read('healthy-food/index.html');
 assert.ok(cls.includes('href="/flashcards/healthy-food/"'),'class page links to the parents\u2019 shelf');
 // The library wall fronts the set with the deck's own cover.
 const hub=read('flashcards/index.html');
 assert.ok(hub.includes('href="/flashcards/healthy-food/"'),'library wall carries the set');
 assert.ok(hub.includes(BASE+'cover.webp'),'the deck cover fronts the wall card');
 // Search kind Flashcards, sitemap, all-pages.
 const idx=JSON.parse(read('assets/search-index.json'));
 const mine=idx.find(x=>x.u==='/flashcards/healthy-food/');
 assert.ok(mine&&mine.k==='Flashcards','search carries the shelf as Flashcards');
 assert.ok(read('sitemap.xml').includes('<loc>https://kiddo.school/flashcards/healthy-food/</loc>'),'sitemap carries the shelf');
 assert.ok(read('all-pages/index.html').includes('/flashcards/healthy-food/'),'all-pages carries the shelf');
 // The 21 shelf descriptions are unique among themselves and never reuse a
 // lesson sentence (duplicate-content rule).
 const descs=[...shelf.matchAll(/class="mn-tip">(.*?)<\/figcaption>/g)].map(m=>m[1].slice(0,60).toLowerCase());
 assert.equal(descs.length,21,'21 shelf descriptions');
 assert.equal(new Set(descs).size,21,'shelf descriptions are unique');
 for(const d of descs)assert.ok(!d.startsWith('try it tonight'),'shelf copy is not the lesson\u2019s try-it text');
});





test('cross-links both ways: Classes 22/32 + the Cafeteria room point here, the class page links back',()=>{
 const c22=read('preschool/3-years/fruits-and-vegetables/index.html');
 assert.ok(c22.includes('href="/healthy-food/"'),'Class 22 links to Healthy Food');
 const c32=read('preschool/4-years/life-skills-and-good-habits/index.html');
 assert.ok(c32.includes('href="/healthy-food/"'),'Class 32 links to Healthy Food');
 const caf=read('cafeteria/index.html');
 assert.ok(caf.includes('href="/healthy-food/"'),'the Cafeteria room links to Healthy Food');
 const cls=read('healthy-food/index.html');
 for(const p of ['/preschool/3-years/fruits-and-vegetables/','/preschool/4-years/life-skills-and-good-habits/','/cafeteria/'])
  assert.ok(cls.includes('href="'+p+'"'),'the class page links back to '+p);
});

test('the Learning Path row sits after Class 38 with the copy saying forty-one',()=>{
 const lp=read('learning-path/index.html');
 assert.ok(lp.includes('Class 40: <a href="/healthy-food/">Healthy Food &amp; Eating Well</a>'),'the Class 40 row');
 const i38=lp.indexOf('Class 38: <a'),i39=lp.indexOf('Class 39: <a'),i40=lp.indexOf('Class 40: <a');
 assert.ok(i38>-1&&i39>i38&&i40>i39,'the sequence order 38 → 39 → 40 holds on the page');
 assert.ok(lp.includes('forty-nine age-guided classes'),'the LP title count says forty-one (Class 41 joined, owner 2026-10-31);');
});




