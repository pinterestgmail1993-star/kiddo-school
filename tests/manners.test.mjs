// Manners extra class (/manners/) — the owner's 32 good-manners cards
// (2026-10-27). Owner brief + standing rule from the same day: ONE page only —
// no individual pages, no lessons, no library twins; the class page carries
// the cover FIRST, then every card with its practice tip and a Download +
// Print control under each image; links in from Class 32 ("Practice good
// manners"), Class 38 ("Kind actions: manners"), the Cafeteria room and the
// Playground room, with back links from /manners/ to all four; no Greetings
// cards and no Etsy mention anywhere (owner 2026-10-27: "forget etsy — there
// is no link between etsy and website"); no existing URL changed.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {MAN_ORDER,MAN_CARDS,MN_PATH} from '../src/manners.mjs';

const page=readFileSync('dist/manners/index.html','utf8');
const read=p=>readFileSync('dist'+p+(p.endsWith('/')?'index.html':''),'utf8');

test('one page only: /manners/ exists and no per-card URL is built',()=>{
 assert.ok(existsSync('dist/manners/index.html'),'the single class page exists');
 for(const s of MAN_ORDER)assert.ok(!existsSync('dist/manners/'+s+'/'),'no individual page for '+s);
 assert.ok(!existsSync('dist/manners/learn'),'no lessons directory');
 assert.ok(!existsSync('dist/flashcards/manners'),'no library set');
});

test('32 cards in file order, cover shown first, image + tip + Download + Print under every card',()=>{
 assert.equal(MAN_ORDER.length,32);
 assert.equal(MAN_CARDS.length,32);
 assert.equal(MAN_ORDER[0],'ask-first');
 assert.equal(MAN_ORDER[31],'wipe-the-table');
 // cover first: the cover image appears before the first card image
 const coverAt=page.indexOf('manners/flashcards/cover.webp');
 const firstCard=page.indexOf('manners/flashcards/ask-first.webp');
 assert.ok(coverAt>-1&&firstCard>-1&&coverAt<firstCard,'cover.webp renders before the first card');
 for(const c of MAN_CARDS){
  assert.ok(page.includes(c.file),'tile image for '+c.slug);
  assert.ok(page.includes(c.tip),'practice tip for '+c.slug);
 }
 // download + print under every image: 32 of each, tied to the real files
 const dls=[...page.matchAll(/href="https:\/\/assets\.kiddo\.school\/school\/extra-classes\/manners\/flashcards\/([a-z-]+)\.webp" download/g)].map(m=>m[1]);
 assert.equal(dls.length,32,'32 download buttons');
 assert.equal(new Set(dls).size,32,'each download targets its own card');
 assert.equal([...page.matchAll(/data-mn-print/g)].length,32,'32 print buttons');
 // lazy-loaded, dimensioned images (no CLS)
 assert.ok(page.includes('loading="lazy"'),'tiles lazy-load');
 assert.ok(page.includes('width="800" height="1131"'),'intrinsic dimensions on tiles');
});

test('page value: intro for parents, how-it-works, all-32 tips unique, zero Etsy mentions',()=>{
 assert.ok(page.includes('HOW THIS CLASS WORKS'),'how-it-works section');
 assert.ok(page.includes('AGES 3–5'),'age eyebrow');
 const tips=[...page.matchAll(/class="mn-tip">(.*?)</g)].map(m=>m[1]);
 assert.equal(tips.length,32,'a tip per card');
 assert.equal(new Set(tips).size,32,'no repeated tip');
 // owner rule: the site and Etsy are separate — no mention, no link, anywhere
 assert.ok(!/[Ee]tsy/.test(page),'no Etsy mention on the class page');
 assert.ok(!/[Ee]tsy/.test(read('/extra-classes/')),'no Etsy mention on the hub');
 assert.ok(!page.includes('Greetings'),'no Greetings teaser on the class page');
 // single-escaped meta: no double-escaped entities anywhere
 assert.ok(!page.includes('&amp;amp;')&&!page.includes('&#39;#39'),'no double escapes');
});

test('cross-links both ways: Class 32, Class 38, Cafeteria, Playground — and back',()=>{
 // inbound (the four pages the owner named)
 const cls32=read('/preschool/4-years/life-skills-and-good-habits/');
 assert.ok(cls32.includes('Practise good manners')&&cls32.includes('href="/manners/"'),'Class 32 links to /manners/');
 const cls38=read('/preschool/4-years/feelings-and-kindness/');
 assert.ok(cls38.includes('Kind actions: manners')&&cls38.includes('href="/manners/"'),'Class 38 links to /manners/');
 const caf=read('/cafeteria/');
 assert.ok(caf.includes('Table manners, printed')&&caf.includes('href="/manners/"'),'Cafeteria links to /manners/');
 const pg=read('/playground/');
 assert.ok(pg.includes('The five manners meet thirty-two more')&&pg.includes('href="/manners/"'),'Playground links to /manners/');
 // hub + learning-path bonus row list the class (house coherence)
 const hub=read('/extra-classes/');
 assert.ok(hub.includes('href="/manners/"'),'extra-classes hub lists Manners');
 assert.ok(hub.includes('Eleven extra classes'),'hub copy counts Eleven');
 const lp=read('/learning-path/');
 assert.ok(lp.includes('<a href="/manners/">Manners</a> (ages 3–5)'),'Learning Path bonus row lists Manners');
 // back links from /manners/ to all four + the hub
 for(const href of ['/preschool/4-years/life-skills-and-good-habits/','/preschool/4-years/feelings-and-kindness/','/cafeteria/','/playground/','/extra-classes/'])
  assert.ok(page.includes(`href="${href}"`),'back link to '+href);
});

test('wiring: search index, sitemap and /all-pages/ carry the single page',()=>{
 const search=readFileSync('dist/assets/search-index.json','utf8');
 assert.ok(search.includes('/manners/'),'search index has /manners/');
 const xml=readFileSync('dist/sitemap.xml','utf8');
 assert.ok(xml.includes('<loc>https://kiddo.school/manners/</loc>'),'sitemap has /manners/');
 assert.ok(!xml.includes('/manners/ask-first'),'sitemap has no per-card manners URLs');
 const all=read('/all-pages/');
 assert.ok(all.includes('/manners/'),'all-pages directory lists /manners/');
});

test('assets: manners.js ships, script tag on the page only, print CSS present',()=>{
 assert.ok(existsSync('dist/assets/manners.js'),'dist/assets/manners.js');
 assert.ok(read('/manners/').includes('/assets/manners.js'),'page loads manners.js');
 assert.ok(!read('/kitchen/').includes('/assets/manners.js'),'other pages do not load it');
 const css=readFileSync('dist/assets/style.css','utf8');
 assert.ok(css.includes('body.mn-printing .mn-print-card'),'print isolation CSS shipped');
});

test('no existing URL changed: the four anchor pages keep their paths and titles',()=>{
 for(const [p,t] of [['/preschool/4-years/life-skills-and-good-habits/','Life Skills &amp; Good Habits — Class 32'],['/preschool/4-years/feelings-and-kindness/','Class 38 · Feelings &amp; Kindness'],['/cafeteria/','The Cafeteria'],['/playground/','The Playground']]){
  const html=read(p);
  assert.ok(html.includes(`<title>${t}`),'title intact for '+p);
 }
});
