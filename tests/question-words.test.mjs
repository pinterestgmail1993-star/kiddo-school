// Question Words extra class (/question-words/) — the owner's 16 question
// word cards (2026-10-28). Owner brief: cover.webp first, then the six core
// cards (who, what, when, where, why, how), then the rest — and the owner
// restated the standing rule in one line: "same — no individual pages." So
// the class page carries EVERYTHING (cover, cards, ask-it-tonight tips, a
// Download + Print control under every image) and the deck also lives on a
// parents' shelf at /flashcards/question-words/ — the manners treatment,
// still zero per-card URLs. Links in from Class 21 (Body Parts & My Five
// Senses), Class 29 (Storytime & Pre-Reading) and Class 30 (Logic, Thinking
// & Problem-Solving), with back links from /question-words/ to all three;
// no existing URL changed. Same round: the /ages/ activity pages are
// de-indexed at the owner's instruction (noindex meta + out of the sitemap,
// pages still build).
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {QW_ORDER,QW_CORE,QW_CARDS,QW_PATH} from '../src/question-words.mjs';

const page=readFileSync('dist/question-words/index.html','utf8');
const shelf=readFileSync('dist/flashcards/question-words/index.html','utf8');
const read=p=>readFileSync('dist'+p+(p.endsWith('/')?'index.html':''),'utf8');
const BASE='https://assets.kiddo.school/school/extra-classes/question-words/';

test('two URLs only: the class page + the library shelf exist and no per-card URL is built anywhere',()=>{
 assert.ok(existsSync('dist/question-words/index.html'),'the single class page exists');
 assert.ok(existsSync('dist/flashcards/question-words/index.html'),'the library shelf exists');
 for(const s of QW_ORDER){
  assert.ok(!existsSync('dist/question-words/'+s+'/'),'no individual page for '+s);
  assert.ok(!existsSync('dist/flashcards/question-words/'+s+'/'),'no library card page for '+s);
 }
 assert.ok(!existsSync('dist/question-words/learn'),'no lessons directory');
});

test('class page: 16 cards, cover first, the six core questions lead, image + tip + Download + Print under every card',()=>{
 assert.equal(QW_ORDER.length,16);
 assert.equal(QW_CARDS.length,16);
 assert.deepEqual(QW_CORE,['who','what','when','where','why','how'],'the owner\u2019s six core questions, in order');
 assert.deepEqual(QW_ORDER.slice(0,6),QW_CORE,'the core six lead the deck');
 // cover first: the cover image appears before the first card image
 const coverAt=page.indexOf('question-words/cover.webp');
 const firstCard=page.indexOf('question-words/who.webp');
 assert.ok(coverAt>-1&&firstCard>-1&&coverAt<firstCard,'cover.webp renders before the first card');
 // the two shelves: core six first, then the ten more
 assert.ok(page.includes('Ask these six first'),'the core shelf heading');
 assert.ok(page.includes('More questions for bigger talkers'),'the more shelf heading');
 const whoAt=page.indexOf('question-words/who.webp');
 const moreAt=page.indexOf('question-words/how-many.webp');
 assert.ok(whoAt>-1&&moreAt>-1&&whoAt<moreAt,'who renders before the first more-card');
 for(const c of QW_CARDS){
  assert.ok(page.includes(c.file),'tile image for '+c.slug);
  assert.ok(page.includes(c.tip),'ask-it-tonight tip for '+c.slug);
 }
 // download + print under every image: 16 of each, tied to the real files
 const dls=[...page.matchAll(new RegExp('href="'+BASE.replace(/\./g,'\\.')+'([a-z-]+)\\.webp" download','g'))].map(m=>m[1]);
 assert.equal(dls.length,16,'16 download buttons');
 assert.equal(new Set(dls).size,16,'each download targets its own card');
 assert.equal([...page.matchAll(/data-mn-print/g)].length,16,'16 print buttons');
 // lazy-loaded, dimensioned images (no CLS)
 assert.ok(page.includes('loading="lazy"'),'tiles lazy-load');
 assert.ok(page.includes('width="800" height="1131"'),'intrinsic dimensions on tiles');
});

test('page value: how-it-works, all-16 tips unique, zero Etsy mentions, no jump links',()=>{
 assert.ok(page.includes('HOW THIS CLASS WORKS'),'how-it-works section');
 assert.ok(page.includes('AGES 3–5'),'age eyebrow');
 const tips=[...page.matchAll(/class="mn-tip">(.*?)</g)].map(m=>m[1]);
 assert.equal(tips.length,16,'a tip per card');
 assert.equal(new Set(tips).size,16,'no repeated tip');
 // owner rule: the site and Etsy are separate — no mention, no link, anywhere
 assert.ok(!/[Ee]tsy/.test(page),'no Etsy mention on the class page');
 assert.ok(!/[Ee]tsy/.test(shelf),'no Etsy mention on the shelf');
 // no in-page jump links beyond the house skip link (the manners anchor rule)
 const jumps=[...page.matchAll(/href="#([a-z][a-z-]*)"/g)].map(m=>m[1]).filter(id=>id!=='main');
 assert.deepEqual(jumps,[],'no jump links beyond the skip link — real links only');
 // single-escaped meta: no double-escaped entities anywhere
 assert.ok(!page.includes('&amp;amp;')&&!page.includes('&#39;#39'),'no double escapes');
});

test('library shelf: the parents\u2019 deck — 16 tiles, Download + Print, parent voice, lesson link, no card-page links',()=>{
 const dls=[...shelf.matchAll(new RegExp('href="'+BASE.replace(/\./g,'\\.')+'([a-z-]+)\\.webp" download','g'))].map(m=>m[1]);
 assert.equal(dls.length,16,'16 download buttons on the shelf');
 assert.equal(new Set(dls).size,16,'each download targets its own card');
 assert.equal([...shelf.matchAll(/data-mn-print/g)].length,16,'16 print buttons on the shelf');
 for(const c of QW_CARDS)assert.ok(shelf.includes(c.tip),'tip for '+c.slug+' rides on the shelf');
 // parent voice + the lesson/library split (owner doctrine)
 assert.ok(shelf.includes('parents'),'spoken to parents');
 assert.ok(shelf.includes('the lesson is your child'),'the lesson is the child\u2019s');
 assert.ok(shelf.includes('href="/question-words/"'),'shelf links the class page');
 assert.ok(shelf.includes('href="/flashcards/"'),'shelf links back to the library wall');
 // nothing links away per card: no per-card hrefs anywhere
 assert.ok(!/href="\/flashcards\/question-words\/[a-z-]+\/"/.test(shelf),'no per-card links on the shelf');
 assert.ok(!/href="\/question-words\/[a-z-]+/.test(shelf),'no per-card links under the class path');
});

test('cross-links both ways: Class 21, Class 29, Class 30 — and back',()=>{
 // inbound (the three classes the owner named)
 const cls21=read('/preschool/3-years/body-parts-and-five-senses/');
 assert.ok(cls21.includes('Where is your nose? How many fingers?')&&cls21.includes('href="/question-words/"'),'Class 21 links to /question-words/');
 const cls29=read('/preschool/4-years/storytime-and-pre-reading/');
 assert.ok(cls29.includes('Who is in the story? What happens next?')&&cls29.includes('href="/question-words/"'),'Class 29 links to /question-words/');
 const cls30=read('/preschool/4-years/logic-thinking-and-problem-solving/');
 assert.ok(cls30.includes('Why did it fall? How does it work?')&&cls30.includes('href="/question-words/"'),'Class 30 links to /question-words/');
 // hub + learning-path bonus row list the class (house coherence)
 const hub=read('/extra-classes/');
 assert.ok(hub.includes('href="/question-words/"'),'extra-classes hub lists Question Words');
 assert.ok(hub.includes('Thirteen extra classes'),'hub copy counts Twelve');
 assert.ok(hub.includes('href="/flashcards/question-words/"'),'hub hints at the parents\u2019 shelf');
 const lp=read('/learning-path/');
 assert.ok(lp.includes('<a href="/question-words/">Question Words</a> (ages 3–5)'),'Learning Path bonus row lists Question Words');
 // back links from /question-words/ to all three + the hub + the parents' shelf
 for(const href of ['/preschool/3-years/body-parts-and-five-senses/','/preschool/4-years/storytime-and-pre-reading/','/preschool/4-years/logic-thinking-and-problem-solving/','/extra-classes/','/flashcards/question-words/'])
  assert.ok(page.includes(`href="${href}"`),'back link to '+href);
 // the library wall carries the question-words set card, tagged and counted
 const fcHub=read('/flashcards/');
 assert.ok(/<a class="fc-setcard" href="\/flashcards\/question-words\/" data-filters="[^"]+">/.test(fcHub),'tagged set card on the library wall');
 assert.ok(fcHub.includes('Question Words · Extra Class'),'its own shelf heading');
 assert.ok(fcHub.includes('Showing all 64 sets'),'the wall count grew to 64 — the Time & Daily Routine parents’ shelf joined (owner 2026-10-31);');
});

test('wiring: search index, sitemap and /all-pages/ carry both pages — and nothing per card',()=>{
 const search=readFileSync('dist/assets/search-index.json','utf8');
 assert.ok(search.includes('/question-words/'),'search index has /question-words/');
 assert.ok(search.includes('/flashcards/question-words/'),'search index has the shelf');
 const xml=readFileSync('dist/sitemap.xml','utf8');
 assert.ok(xml.includes('<loc>https://kiddo.school/question-words/</loc>'),'sitemap has /question-words/');
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/question-words/</loc>'),'sitemap has the shelf');
 assert.ok(!xml.includes('/question-words/who'),'sitemap has no per-card question-words URLs');
 assert.ok(!xml.includes('/flashcards/question-words/who'),'sitemap has no per-card shelf URLs');
 const all=read('/all-pages/');
 assert.ok(all.includes('/question-words/'),'all-pages directory lists /question-words/');
 assert.ok(all.includes('/flashcards/question-words/'),'all-pages directory lists the shelf');
});

test('de-index round (owner GSC instruction): the /ages/ pages are noindex and out of the sitemap, but still build',()=>{
 for(const p of ['/ages/','/ages/3-5/','/ages/6-8/','/ages/9-12/']){
  assert.ok(existsSync('dist'+p+'index.html'),p+' still builds — no URL changed');
  assert.ok(read(p).includes('content="noindex,follow"'),p+' carries the noindex meta');
 }
 const xml=readFileSync('dist/sitemap.xml','utf8');
 for(const p of ['/ages/','/ages/3-5/','/ages/6-8/','/ages/9-12/'])
  assert.ok(!xml.includes('<loc>https://kiddo.school'+p+'</loc>'),p+' is out of the sitemap');
 const search=readFileSync('dist/assets/search-index.json','utf8');
 for(const p of ['/ages/','/ages/6-8/'])
  assert.ok(!search.includes('"u":"'+p+'"'),p+' is out of the site search index');
});

test('assets: manners.js ships on both question-words pages (the deck-agnostic print handler)',()=>{
 assert.ok(read('/question-words/').includes('/assets/manners.js'),'class page loads the print handler');
 assert.ok(shelf.includes('/assets/manners.js'),'shelf loads the print handler');
 const css=readFileSync('dist/assets/style.css','utf8');
 assert.ok(css.includes('body.mn-printing .mn-print-card'),'print isolation CSS shipped');
 assert.ok(css.includes('.mn-shelf-title'),'the core/more shelf headings have their style');
});

test('no existing URL changed: the three anchor classes keep their paths and titles',()=>{
 for(const [p,t] of [['/preschool/3-years/body-parts-and-five-senses/','Body Parts &amp; My Five Senses for 3 Year Olds'],['/preschool/4-years/storytime-and-pre-reading/','Class 29 · Storytime &amp; Pre-Reading Comprehension'],['/preschool/4-years/logic-thinking-and-problem-solving/','Class 30 · Logic, Thinking &amp; Problem-Solving']]){
  const html=read(p);
  assert.ok(html.includes(`<title>${t}`),'title intact for '+p);
 }
});
