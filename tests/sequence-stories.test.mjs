// Sequence Stories extra class (/sequence-stories/) — the owner's 24
// four-picture story cards (2026-10-29). Owner brief + standing rule: ONE
// page — "no individual pages" — cover first, then every card with its
// sequencing tip and a Download + Print control under each image; the
// "Ask a grown-up" badge on exactly make-toast and make-lemonade, and the
// badge prints with the card; links in from Class 29 (Storytime), Class 30
// (Logic) and Class 32 (Life Skills), with back links from the class page to
// all three plus the hub; no Etsy mention anywhere (standing rule: there is
// no link between Etsy and the website); no anchor jump links (owner: they
// are "destroying the seo"); no existing URL changed.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {SS_ORDER,SS_CARDS,SS_PATH} from '../src/sequence-stories.mjs';

const page=readFileSync('dist/sequence-stories/index.html','utf8');
const read=p=>readFileSync('dist'+p+(p.endsWith('/')?'index.html':''),'utf8');

test('one URL only: the class page exists and no per-card URL is built anywhere',()=>{
 assert.ok(existsSync('dist/sequence-stories/index.html'),'the single class page exists');
 for(const s of SS_ORDER){
  assert.ok(!existsSync('dist/sequence-stories/'+s+'/'),'no individual page for '+s);
 }
 assert.ok(!existsSync('dist/sequence-stories/learn'),'no lessons directory');
 assert.ok(!existsSync('dist/flashcards/sequence-stories/'),'no library shelf was requested or built');
});

test('class page: 24 cards in file order, cover shown first, image + tip + Download + Print under every card',()=>{
 assert.equal(SS_ORDER.length,24);
 assert.equal(SS_CARDS.length,24);
 assert.equal(SS_ORDER[0],'bedtime');
 assert.equal(SS_ORDER[23],'water-the-plant');
 // cover first: the cover image appears before the first card image
 const coverAt=page.indexOf('sequence-stories/flashcards/cover.webp');
 const firstCard=page.indexOf('sequence-stories/flashcards/bedtime.webp');
 assert.ok(coverAt>-1&&firstCard>-1&&coverAt<firstCard,'cover.webp renders before the first card');
 for(const c of SS_CARDS){
  assert.ok(page.includes(c.file),'tile image for '+c.slug);
  assert.ok(page.includes(c.tip),'sequencing tip for '+c.slug);
 }
 // download + print under every image: 24 of each, tied to the real files
 const dls=[...page.matchAll(/href="https:\/\/assets\.kiddo\.school\/school\/extra-classes\/sequence-stories\/flashcards\/([a-z-]+)\.webp" download/g)].map(m=>m[1]);
 assert.equal(dls.length,24,'24 download buttons');
 assert.equal(new Set(dls).size,24,'each download targets its own card');
 assert.equal([...page.matchAll(/data-mn-print/g)].length,24,'24 print buttons');
 // lazy-loaded, dimensioned images (no CLS)
 assert.ok(page.includes('loading="lazy"'),'tiles lazy-load');
 assert.ok(page.includes('width="800" height="1131"'),'intrinsic dimensions on tiles');
});

test('Ask a grown-up: the badge rides on make-toast and make-lemonade only — and it prints',()=>{
 // exactly two badges on the page, one per kitchen card
 const badges=[...page.matchAll(/class="mn-grownup">Ask a grown-up</g)].length;
 assert.equal(badges,2,'exactly two Ask-a-grown-up badges');
 // each badge sits inside the right card's figure — split the grid into tiles
 const tiles=page.split('<figure class="mn-card">').slice(1);
 assert.equal(tiles.length,24,'24 tiles parsed');
 const withBadge=tiles.filter(t=>t.includes('mn-grownup')).map(t=>t.match(/sequence-stories\/flashcards\/([a-z-]+)\.webp/)[1]);
 assert.deepEqual(withBadge.sort(),['make-lemonade','make-toast'],'badge on the two kitchen cards only');
 // the badge prints with the card: styled for screen AND sized for print,
 // and never display:none'd in the print block
 const css=readFileSync('dist/assets/style.css','utf8');
 assert.ok(css.includes('.mn-grownup{'),'badge styled on screen');
 assert.ok(css.includes('body.mn-printing .mn-print-card .mn-grownup'),'badge styled in the print block');
 assert.ok(!/\.mn-grownup[^}]*display:none/.test(css),'the badge is never hidden in print');
});

test('page value: intro for parents, how-it-works, all-24 tips unique, zero Etsy mentions',()=>{
 assert.ok(page.includes('HOW THIS CLASS WORKS'),'how-it-works section');
 assert.ok(page.includes('AGES 3–5'),'age eyebrow');
 const tips=[...page.matchAll(/class="mn-tip">(.*?)</g)].map(m=>m[1]);
 assert.equal(tips.length,24,'a tip per card');
 assert.equal(new Set(tips).size,24,'no repeated tip');
 // owner rule: the site and Etsy are separate — no mention, no link, anywhere
 assert.ok(!/[Ee]tsy/.test(page),'no Etsy mention on the class page');
 assert.ok(!/[Ee]tsy/.test(read('/extra-classes/')),'no Etsy mention on the hub');
 // single-escaped meta: no double-escaped entities anywhere
 assert.ok(!page.includes('&amp;amp;')&&!page.includes('&#39;#39'),'no double escapes');
});

test('no anchor jump links (owner: in-page jump links destroyed the seo)',()=>{
 assert.ok(!/#the-cards/.test(page),'no #the-cards anchor');
 const jumps=[...page.matchAll(/href="#([a-z][a-z-]*)"/g)].map(m=>m[1]).filter(id=>id!=='main');
 assert.deepEqual(jumps,[],'no jump links beyond the skip link — real links only');
});

test('cross-links both ways: Class 29, Class 30, Class 32 — and back',()=>{
 // inbound (the three classes the owner named)
 const cls29=read('/preschool/4-years/storytime-and-pre-reading/');
 assert.ok(cls29.includes('Put the story in order')&&cls29.includes('href="/sequence-stories/"'),'Class 29 links to /sequence-stories/');
 const cls30=read('/preschool/4-years/logic-thinking-and-problem-solving/');
 assert.ok(cls30.includes('First, next, last')&&cls30.includes('href="/sequence-stories/"'),'Class 30 links to /sequence-stories/');
 const cls32=read('/preschool/4-years/life-skills-and-good-habits/');
 assert.ok(cls32.includes('The habits, four steps at a time')&&cls32.includes('href="/sequence-stories/"'),'Class 32 links to /sequence-stories/');
 // hub + learning-path bonus row list the class (house coherence)
 const hub=read('/extra-classes/');
 assert.ok(hub.includes('href="/sequence-stories/"'),'extra-classes hub lists Sequence Stories');
 assert.ok(hub.includes('Thirteen extra classes'),'hub copy counts Thirteen');
 const lp=read('/learning-path/');
 assert.ok(lp.includes('<a href="/sequence-stories/">Sequence Stories</a> (ages 3–5)'),'Learning Path bonus row lists Sequence Stories');
 // back links from the class page to all three + the hub
 for(const href of ['/preschool/4-years/storytime-and-pre-reading/','/preschool/4-years/logic-thinking-and-problem-solving/','/preschool/4-years/life-skills-and-good-habits/','/extra-classes/'])
  assert.ok(page.includes(`href="${href}"`),'back link to '+href);
});

test('wiring: search index, sitemap and /all-pages/ carry the class — and nothing per card',()=>{
 const search=readFileSync('dist/assets/search-index.json','utf8');
 assert.ok(search.includes('/sequence-stories/'),'search index has /sequence-stories/');
 const xml=readFileSync('dist/sitemap.xml','utf8');
 assert.ok(xml.includes('<loc>https://kiddo.school/sequence-stories/</loc>'),'sitemap has /sequence-stories/');
 assert.ok(!xml.includes('/sequence-stories/bedtime'),'sitemap has no per-card sequence-stories URLs');
 const all=read('/all-pages/');
 assert.ok(all.includes('/sequence-stories/'),'all-pages directory lists /sequence-stories/');
});

test('assets: the per-card print handler ships on this page, print CSS present',()=>{
 assert.ok(existsSync('dist/assets/manners.js'),'dist/assets/manners.js');
 assert.ok(page.includes('/assets/manners.js'),'class page loads the print handler');
 assert.ok(!read('/kitchen/').includes('/assets/manners.js'),'other pages do not load it');
 const css=readFileSync('dist/assets/style.css','utf8');
 assert.ok(css.includes('body.mn-printing .mn-print-card'),'print isolation CSS shipped');
});

test('no existing URL changed: the three anchor pages keep their paths and titles',()=>{
 for(const [p,t] of [['/preschool/4-years/storytime-and-pre-reading/','Class 29 · Storytime'],['/preschool/4-years/logic-thinking-and-problem-solving/','Class 30 · Logic'],['/preschool/4-years/life-skills-and-good-habits/','Life Skills &amp; Good Habits — Class 32']]){
  const html=read(p);
  assert.ok(html.includes(`<title>${t}`),'title intact for '+p);
 }
});
