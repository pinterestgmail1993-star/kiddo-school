// Class 47 · Caring for Our Planet (/caring-for-our-planet/) — the owner's
// brief 2026-11-01, built the ONE-PAGE way from birth (the owner's standing
// rule: "dont make indiviual pages, they are thin to google — include all
// in one page with download, print button, age, skill if any, level pill,
// subject pill, make sections, small descripiton all beneath the images";
// "learning path is lesson for kids and flashcard library is for parents
// thats it"): the whole 30-card deck lives on the ONE class page and prints
// again from the parents' shelf at /flashcards/caring-for-our-planet/ —
// ZERO per-card URLs. NUMBERING: Class 46 was probed LIVE (LP row 46,
// count forty-six) before 47 was assigned. Deck probed LIVE on R2 at
// school/learning-path/caring-for-our-planet/flashcards/ (31/31 — 30 cards
// + the cover, HTTP 200 image/jpeg); the JPG masters ride EXACTLY as
// uploaded (no conversion, no re-compression, names unchanged); dims probed
// per file — twenty-three portrait cards at 1414×2000 and SEVEN landscape
// cards at 2000×1414 (owner: "Show each card at its own size, because
// seven are landscape"), every <img> carrying its own honest width/height.
// Titles/alts transcribed off 6 labeled contact sheets
// (scripts/cfp-sheets.py — all 31 faces read; every card prints five
// labeled eco actions in one color family). Five shelves (6/5/6/6/7); four
// pills per card (Preschool 10 / Grade 1 10 / Grade 2 10); the cover is
// the class page's main image; the whole deck joins the image sitemap on
// the class page AND on the shelf; inbound Classes 31/36/43; LP count
// forty-six → forty-seven.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {CFP_PATH,CFP_BASE,CFP_ORDER,CFP_CARDS,CFP_COVER,cfpBySlug,CFP_LIB_SET,CFP_SHELVES} from '../src/caring-planet.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('caring-for-our-planet/index.html');
const lib=read('flashcards/caring-for-our-planet/index.html');
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const LANDSCAPE=CFP_CARDS.filter(c=>c.w===2000);

test('deck integrity: exactly the owner\u2019s 30 cards, seven landscape, every file name untouched',()=>{
 assert.equal(CFP_CARDS.length,30,'30 cards');
 assert.equal(CFP_ORDER.length,30,'order covers the deck');
 assert.equal(LANDSCAPE.length,7,'seven landscape cards (owner\u2019s own count)');
 for(const c of CFP_CARDS){
  assert.ok(c.file.endsWith('-eco-flashcard-for-kids.jpg'),'SEO name kept: '+c.file);
  assert.ok(c.file.startsWith(c.slug+'-'),'file rides the card slug: '+c.slug);
  assert.ok([1414,2000].includes(c.w)&&[1414,2000].includes(c.h),'honest dims: '+c.slug);
  if(c.w===2000)assert.equal(c.h,1414,'landscape orientation: '+c.slug);
 }
 const shelved=CFP_SHELVES.flatMap(s=>s.slugs).sort().join('|');
 assert.equal(shelved,CFP_ORDER.slice().sort().join('|'),'shelves cover the deck exactly once');
});

test('the class page exists, carries the WHOLE deck, and there are zero per-card URLs',()=>{
 assert.ok(existsSync('dist/caring-for-our-planet/index.html'),'class page exists');
 assert.ok(existsSync('dist/flashcards/caring-for-our-planet/index.html'),'the parents\u2019 shelf exists');
 assert.ok(!existsSync('dist/caring-for-our-planet/plant-a-tree-pick-up-litter-walk-more'),'no per-card dirs — the one-page rule');
});

test('numbering: Class 47 sits after Class 46 on the LP, the count says forty-nine everywhere',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(49).keys()].map(i=>i+1),'LP sequence is exactly 1–49, no gap');
 assert.ok(lp.includes('<span>47</span>')&&lp.includes('Class 47: <a href="/caring-for-our-planet/">Caring for Our Planet</a>'),'the Class 47 row after row 46');
 assert.ok(lp.includes('forty-nine age-guided classes')&&lp.includes('Forty-nine classes are ready now'),'LP count words say forty-seven');
 assert.ok(read('index.html').includes('Forty-nine classes are ready now, from birth to age five'),'homepage lede says forty-seven');
 assert.ok(read('about/index.html').includes('Forty-nine classes'),'About page says forty-eight');
});

test('R2 assets: JPG masters ride exactly as uploaded, the cover leads, every card at its OWN size with lazy loading',()=>{
 assert.ok(html.includes(CFP_BASE+CFP_COVER.file+'" width="'+CFP_COVER.w+'" height="'+CFP_COVER.h+'"'),'the cover is the class page\u2019s main image');
 assert.ok(html.includes(CFP_COVER.alt.slice(0,40)),'cover alt present');
 let dimCount=0;
 for(const c of CFP_CARDS){
  const img=`src="${CFP_BASE}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"`;
  assert.ok(html.includes(img),'card image at its own size, exact name + dims + lazy: '+c.slug);
  dimCount++;
 }
 assert.equal(dimCount,30,'every card image rides the class page at its own size');
 assert.ok(html.includes('og:image" content="'+CFP_BASE+CFP_COVER.file),'class og:image is the cover');
});

test('image sitemap: the class page AND the parents\u2019 shelf each carry cover + all 30 masters',()=>{
 const xml=read('sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/caring-for-our-planet/</loc>'),'class page in the sitemap');
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/caring-for-our-planet/</loc>'),'parents\u2019 shelf in the sitemap');
 const classEntry=xml.split('<loc>https://kiddo.school/caring-for-our-planet/</loc>')[1]?.split('</url>')[0]||'';
 for(const c of [CFP_COVER,...CFP_CARDS])assert.ok(classEntry.includes('<image:loc>'+CFP_BASE+c.file+'</image:loc>'),'class-page image entry: '+c.file);
 const libEntry=xml.split('<loc>https://kiddo.school/flashcards/caring-for-our-planet/</loc>')[1]?.split('</url>')[0]||'';
 for(const c of [CFP_COVER,...CFP_CARDS])assert.ok(libEntry.includes('<image:loc>'+CFP_BASE+c.file+'</image:loc>'),'shelf image entry: '+c.file);
});

test('class-page contract: eyebrow CLASS 47, five shelves x 30 tiles x four pills, kid voice, links back',()=>{
 assert.ok(html.includes('CLASS 47 \u00b7 CARING FOR OUR PLANET \u00b7 AGES 4\u20135'),'eyebrow');
 for(const [shelf,n] of [['PLANTING SHELF',6],['CRITTER SHELF',5],['RECYCLE SHELF',6],['POWER-DOWN SHELF',6],['EVERY-DAY SHELF',7]])
  assert.ok(html.includes(shelf+' \u00b7 '+n+' CARDS'),'shelf honest count: '+shelf);
 assert.equal((html.match(/class="mn-card"/g)||[]).length,30,'30 card tiles on the class page');
 assert.equal((html.match(/fc-pill fc-pill-age/g)||[]).length,30,'an age pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-subject/g)||[]).length,30,'a subject pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-level/g)||[]).length,30,'a level pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-skill/g)||[]).length,30,'a skill pill on every card');
 const levels=html.match(/Preschool \u00b7 Name it|Grade 1 \u00b7 Do it|Grade 2 \u00b7 Own it/g)||[];
 const n1=levels.filter(x=>x.startsWith('Preschool')).length,n2=levels.filter(x=>x.startsWith('Grade 1')).length,n3=levels.filter(x=>x.startsWith('Grade 2')).length;
 assert.deepEqual([n1,n2,n3],[10,10,10],'grade split 10/10/10');
 for(const [p,label] of [['/preschool/4-years/science-nature-and-discovery/','Class 31'],['/preschool/4-years/animals-and-their-habitats/','Class 36'],['/earth-and-space/','Class 43'],['/learning-path/','the LP'],['/flashcards/caring-for-our-planet/','the parents\u2019 shelf']])
  assert.ok(html.includes('href="'+p+'"'),'links back to '+label);
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html),'word-ban holds');
 assert.ok(!html.includes('your child'),'kid voice on the class page');
 for(const c of CFP_CARDS)assert.ok(html.includes(`href="${CFP_BASE}${c.file}" download="${c.slug}.jpg"`),'download on the class page: '+c.slug);
 assert.equal((html.match(/data-mn-print/g)||[]).length,30,'a Print button on every card');
 assert.ok(html.includes('assets/manners.js'),'manners.js ships on the class page (print contract)');
});

test('the parents\u2019 shelf: whole deck on ONE page, try-it tips, download + print, links back',()=>{
 assert.ok(lib.includes('Caring for Our Planet Flashcards to Print'),'shelf title');
 assert.equal((lib.match(/class="mn-card"/g)||[]).length,30,'30 tiles on the shelf');
 assert.equal((lib.match(/data-mn-print/g)||[]).length,30,'a Print button on every shelf card');
 for(const c of CFP_CARDS){
  assert.ok(lib.includes(`href="${CFP_BASE}${c.file}" download="${c.slug}.jpg"`),'download on the shelf: '+c.slug);
  assert.ok(lib.includes(esc(c.try).slice(0,60)),'the try-it job is the shelf tip: '+c.slug);
 }
 assert.ok(lib.includes('href="'+CFP_PATH+'"'),'the shelf links back to the class');
 assert.ok(lib.includes('href="/flashcards/"'),'the shelf links to the library hub');
 assert.ok(lib.includes('data-fc-root'),'the feedback block mounts on the shelf');
 assert.ok(lib.includes('assets/manners.js'),'manners.js ships on the shelf (print contract)');
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(lib),'word-ban on the shelf');
});

test('the say/try copy and alts are unique — and no sentence is shared between class and shelf',()=>{
 const says=CFP_CARDS.map(c=>c.say),tries=CFP_CARDS.map(c=>c.try);
 assert.equal(new Set(says).size,30,'30 unique descriptions');
 assert.equal(new Set(tries).size,30,'30 unique try-its');
 const alts=CFP_CARDS.map(c=>c.alt);
 assert.equal(new Set(alts).size,30,'30 unique alts (Google Images)');
 assert.deepEqual(says.filter(s=>tries.includes(s)),[],'no sentence shared between the class page and the shelf');
});

test('inbound links: Class 31, Class 36 and Class 43 each carry their Class 47 block',()=>{
 assert.ok(read('preschool/4-years/science-nature-and-discovery/index.html').includes('href="/caring-for-our-planet/"'),'Class 31 points here');
 assert.ok(read('preschool/4-years/animals-and-their-habitats/index.html').includes('href="/caring-for-our-planet/"'),'Class 36 points here');
 assert.ok(read('earth-and-space/index.html').includes('href="/caring-for-our-planet/"'),'Class 43 points here');
});

test('discoverable: search kind Class, flashcards hub wall, all-pages room',()=>{
 const search=JSON.parse(read('assets/search-index.json'));
 const cls=search.filter(x=>x.u.startsWith('/caring-for-our-planet/'));
 assert.equal(cls.length,1,'exactly one search entry — the class page');
 assert.ok(cls[0].k==='Class','kind Class');
 const fl=search.filter(x=>x.u==='/flashcards/caring-for-our-planet/');
 assert.equal(fl.length,1,'the shelf is in search as Flashcards');
 const hub=read('flashcards/index.html');
 assert.ok(hub.includes('href="/flashcards/caring-for-our-planet/"'),'the shelf fronts the flashcards hub');
 const ap=read('all-pages/index.html');
 assert.ok(ap.includes('href="/caring-for-our-planet/"'),'all-pages registers the room');
});
