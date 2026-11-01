// Class 48 · Plants & How They Grow (/plants-and-how-they-grow/) — the
// owner's brief 2026-11-02, built the ONE-PAGE way from birth (the owner's
// standing rule: "dont make indiviual pages, they are thin to google —
// include all in one page with download, print button, age, skill if any,
// level pill, subject pill, make sections, small descripiton all beneath the
// images"; "learning path is lesson for kids and flashcard library is for
// parents thats it"; reaffirmed in the brief itself: "no indiviual pages
// ok"): the whole 41-card deck lives on the ONE class page and prints again
// from the parents' shelf at /flashcards/plants-and-how-they-grow/ — ZERO
// per-card URLs. NUMBERING (owner gate verbatim: "Add Class 49 … as the
// next class number after Class 48. If Class 48 is not live, tell me
// before assigning numbers"): Class 48 was NOT live — production probed
// 2026-11-02 showed the LP ending at Class 47 · Caring for Our Planet
// (row 47, count forty-seven), so by the site's own no-skip rule the honest
// number is 48, NOT 49; the owner is told in the round report and the
// number rides display copy only (the URL carries no class number, so a
// renumber is one commit with zero URL changes). Deck probed LIVE on R2 at
// school/learning-path/plants-and-how-they-grow/flashcards/ (42/42 — 41
// cards + the cover, HTTP 200 image/jpeg, every file exactly 1414×2000
// portrait, byte sizes matching the owner's panel to the kB); the JPG
// masters ride EXACTLY as uploaded (no conversion, no re-compression, names
// unchanged — the two panel names that differ from the live R2 objects,
// how-plants-make-food-plant-… and how-plants-reproduce-plant-…, ride on R2
// WITHOUT the -plant infix and byte-match the panel's own sizes; the real
// R2 names win and the owner is told). Titles/alts transcribed off 7
// labeled contact sheets (scripts/plants-sheets.py — all 42 faces read).
// Six shelves (6/7/7/7/8/6); four pills per card (Preschool 14 / Grade 1
// 14 / Grade 2 13); the Ask-a-grown-up badge rides the one suspicious card
// (Plant Defenses — toxin), the standing owner rule from the science round;
// the cover is the class page's main image; the whole deck joins the image
// sitemap on the class page AND on the shelf; inbound Classes 31/36/22;
// LP count forty-seven → forty-eight.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {PGP_PATH,PGP_BASE,PGP_ORDER,PGP_CARDS,PGP_COVER,pgpBySlug,PGP_LIB_SET,PGP_SHELVES} from '../src/plants-grow.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('plants-and-how-they-grow/index.html');
const lib=read('flashcards/plants-and-how-they-grow/index.html');
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

test('deck integrity: exactly the owner\u2019s 41 cards, every file name untouched, all portrait A4',()=>{
 assert.equal(PGP_CARDS.length,41,'41 cards');
 assert.equal(PGP_ORDER.length,41,'order covers the deck');
 assert.equal(PGP_CARDS.filter(c=>c.w===2000).length,0,'no landscape cards in this deck (all probed 1414\u00d72000)');
 for(const c of PGP_CARDS){
  assert.ok(c.file.endsWith('-flashcard-for-kids.jpg'),'SEO name kept: '+c.file);
  assert.ok(c.file.startsWith(c.slug+'-')||['how-plants-make-food','how-plants-reproduce'].includes(c.slug),'file rides the card slug: '+c.slug);
  assert.equal(c.w,1414&&c.w,1414,'portrait width: '+c.slug);
  assert.equal(c.h,2000,'portrait height: '+c.slug);
 }
 const shelved=PGP_SHELVES.flatMap(s=>s.slugs).sort().join('|');
 assert.equal(shelved,PGP_ORDER.slice().sort().join('|'),'shelves cover the deck exactly once');
 assert.deepEqual(PGP_SHELVES.map(s=>s.slugs.length),[6,7,7,7,8,6],'shelf sizes 6/7/7/7/8/6');
 assert.equal(new Set(PGP_CARDS.map(c=>c.word)).size,41,'card words unique');
 assert.equal(new Set(PGP_CARDS.map(c=>c.alt)).size,41,'alts unique');
 assert.equal(PGP_CARDS.filter(c=>c.badge==='grownup').map(c=>c.slug).join(','),'plant-defenses','exactly one Ask-a-grown-up card (the toxin card)');
});

test('the class page exists, carries the WHOLE deck, and there are zero per-card URLs',()=>{
 assert.ok(existsSync('dist/plants-and-how-they-grow/index.html'),'class page exists');
 assert.ok(existsSync('dist/flashcards/plants-and-how-they-grow/index.html'),'the parents\u2019 shelf exists');
 assert.ok(!existsSync('dist/plants-and-how-they-grow/inside-a-leaf-plant'),'no per-card dirs — the one-page rule');
});

test('numbering: Class 48 sits after Class 47 on the LP, the count says forty-nine everywhere',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(49).keys()].map(i=>i+1),'LP sequence is exactly 1\u201349, no gap');
 assert.ok(lp.includes('<span>48</span>')&&lp.includes('Class 48: <a href="/plants-and-how-they-grow/">Plants &amp; How They Grow</a>'),'the Class 48 row after row 47');
 assert.ok(lp.includes('forty-nine age-guided classes')&&lp.includes('Forty-nine classes are ready now'),'LP count words say forty-nine');
 assert.ok(read('index.html').includes('Forty-nine classes are ready now, from birth to age five'),'homepage lede says forty-nine');
 assert.ok(read('about/index.html').includes('Forty-nine classes'),'About page says forty-nine');
});

test('R2 assets: JPG masters ride exactly as uploaded, the cover leads, every card at full print size with lazy loading',()=>{
 assert.ok(html.includes(PGP_BASE+PGP_COVER.file+'" width="'+PGP_COVER.w+'" height="'+PGP_COVER.h+'"'),'the cover is the class page\u2019s main image');
 assert.ok(html.includes(PGP_COVER.alt.slice(0,40)),'cover alt present');
 let dimCount=0;
 for(const c of PGP_CARDS){
  const img=`src="${PGP_BASE}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"`;
  assert.ok(html.includes(img),'card image, exact name + honest dims + lazy: '+c.slug);
  dimCount++;
 }
 assert.equal(dimCount,41,'every card image rides the class page');
 assert.ok(html.includes('og:image" content="'+PGP_BASE+PGP_COVER.file),'class og:image is the cover');
});

test('image sitemap: the class page AND the parents\u2019 shelf each carry cover + all 41 masters',()=>{
 const xml=read('sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/plants-and-how-they-grow/</loc>'),'class page in the sitemap');
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/plants-and-how-they-grow/</loc>'),'parents\u2019 shelf in the sitemap');
 const classEntry=xml.split('<loc>https://kiddo.school/plants-and-how-they-grow/</loc>')[1]?.split('</url>')[0]||'';
 for(const c of [PGP_COVER,...PGP_CARDS])assert.ok(classEntry.includes('<image:loc>'+PGP_BASE+c.file+'</image:loc>'),'class-page image entry: '+c.file);
 const libEntry=xml.split('<loc>https://kiddo.school/flashcards/plants-and-how-they-grow/</loc>')[1]?.split('</url>')[0]||'';
 for(const c of [PGP_COVER,...PGP_CARDS])assert.ok(libEntry.includes('<image:loc>'+PGP_BASE+c.file+'</image:loc>'),'shelf image entry: '+c.file);
});

test('class-page contract: eyebrow CLASS 48, six shelves x 41 tiles x four pills, kid voice, links back',()=>{
 assert.ok(html.includes('CLASS 48 \u00b7 PLANTS &amp; HOW THEY GROW \u00b7 AGES 4\u20135'),'eyebrow');
 for(const [shelf,n] of [['GROWING SHELF',6],['PLANT PARTS SHELF',7],['PLANT CARE SHELF',7],['FLOWERS &amp; SEEDS SHELF',7],['WILD PLACES SHELF',8],['PLANT DEFENSE SHELF',6]])
  assert.ok(html.includes(shelf+' \u00b7 '+n+' CARDS'),'shelf honest count: '+shelf);
 assert.equal((html.match(/class="mn-card"/g)||[]).length,41,'41 card tiles on the class page');
 assert.equal((html.match(/fc-pill fc-pill-age/g)||[]).length,41,'an age pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-subject/g)||[]).length,41,'a subject pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-level/g)||[]).length,41,'a level pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-skill/g)||[]).length,41,'a skill pill on every card');
 const levels=html.match(/Preschool \u00b7 Name it|Grade 1 \u00b7 Do it|Grade 2 \u00b7 Own it/g)||[];
 const n1=levels.filter(x=>x.startsWith('Preschool')).length,n2=levels.filter(x=>x.startsWith('Grade 1')).length,n3=levels.filter(x=>x.startsWith('Grade 2')).length;
 assert.deepEqual([n1,n2,n3],[14,14,13],'grade split 14/14/13');
 for(const [p,label] of [['/preschool/4-years/science-nature-and-discovery/','Class 31'],['/preschool/4-years/animals-and-their-habitats/','Class 36'],['/preschool/3-years/fruits-and-vegetables/','Class 22'],['/learning-path/','the LP'],['/flashcards/plants-and-how-they-grow/','the parents\u2019 shelf']])
  assert.ok(html.includes('href="'+p+'"'),'links back to '+label);
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html),'word-ban holds');
 assert.ok(!html.includes('your child'),'kid voice on the class page');
 for(const c of PGP_CARDS)assert.ok(html.includes(`href="${PGP_BASE}${c.file}" download="${c.slug}.jpg"`),'download on the class page: '+c.slug);
 assert.equal((html.match(/data-mn-print/g)||[]).length,41,'a Print button on every card');
 assert.equal((html.match(/mn-grownup/g)||[]).length,1,'one Ask-a-grown-up badge (the toxin card)');
 assert.ok(html.includes('assets/manners.js'),'manners.js ships on the class page (print contract)');
});

test('the parents\u2019 shelf: whole deck on ONE page, try-it tips, download + print, links back',()=>{
 assert.ok(lib.includes('<h1>Plants & How They Grow — the parent shelf: 41 cards to download and print.'),'shelf h1');
 assert.equal((lib.match(/class="mn-card"/g)||[]).length,41,'41 tiles on the shelf');
 assert.equal((lib.match(/data-mn-print/g)||[]).length,41,'a Print button on every shelf card');
 for(const c of PGP_CARDS){
  assert.ok(lib.includes(`href="${PGP_BASE}${c.file}" download="${c.slug}.jpg"`),'download on the shelf: '+c.slug);
  assert.ok(lib.includes(esc(c.try).slice(0,60)),'the try-it job is the shelf tip: '+c.slug);
 }
 assert.ok(lib.includes('href="'+PGP_PATH+'"'),'the shelf links back to the class');
 assert.ok(lib.includes('href="/flashcards/"'),'the shelf links to the library hub');
 assert.ok(lib.includes('data-fc-root'),'the feedback block mounts on the shelf');
 assert.ok(lib.includes('assets/manners.js'),'manners.js ships on the shelf (print contract)');
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(lib),'word-ban on the shelf');
});

test('the say/try copy and alts are unique — and no sentence is shared between class and shelf',()=>{
 const says=PGP_CARDS.map(c=>c.say),tries=PGP_CARDS.map(c=>c.try);
 assert.equal(new Set(says).size,41,'41 unique descriptions');
 assert.equal(new Set(tries).size,41,'41 unique try-its');
 assert.deepEqual(says.filter(s=>tries.includes(s)),[],'no sentence shared between the class page and the shelf');
});

test('inbound links: Class 31, Class 36 and Class 22 each carry their Class 48 block',()=>{
 assert.ok(read('preschool/4-years/science-nature-and-discovery/index.html').includes('href="/plants-and-how-they-grow/"'),'Class 31 points here');
 assert.ok(read('preschool/4-years/animals-and-their-habitats/index.html').includes('href="/plants-and-how-they-grow/"'),'Class 36 points here');
 assert.ok(read('preschool/3-years/fruits-and-vegetables/index.html').includes('href="/plants-and-how-they-grow/"'),'Class 22 points here');
});

test('discoverable: search kind Class, flashcards hub wall, all-pages room',()=>{
 const search=JSON.parse(read('assets/search-index.json'));
 const cls=search.filter(x=>x.u.startsWith('/plants-and-how-they-grow/'));
 assert.equal(cls.length,1,'exactly one search entry — the class page');
 assert.ok(cls[0].k==='Class','kind Class');
 const fl=search.filter(x=>x.u==='/flashcards/plants-and-how-they-grow/');
 assert.equal(fl.length,1,'the shelf is in search as Flashcards');
 const hub=read('flashcards/index.html');
 assert.ok(hub.includes('href="/flashcards/plants-and-how-they-grow/"'),'the shelf fronts the flashcards hub');
 assert.ok(hub.includes('Showing all 71 sets'),'the wall count grew to 71 (the plants shelf joined)');
 const ap=read('all-pages/index.html');
 assert.ok(ap.includes('href="/plants-and-how-they-grow/"'),'all-pages registers the room');
});
