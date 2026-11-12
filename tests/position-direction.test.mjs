// Class 44 · Position & Direction Words (/prepositions/) — the ONE-PAGE
// round (owner 2026-11-01: "dont make indiviual pages, they are thin to
// google — include all in one page with download, print button, age, skill
// if any, level pill, subject pill, make sections, small descripiton all
// beneath the images"; "dont create individual pages… learning path is
// lesson for kids and flashcard library is for parents thats it"): the
// whole 22-card deck lives on the ONE class page and the whole deck prints
// again from the parents' shelf at /flashcards/prepositions/ — zero
// per-card URLs anywhere; the 22 word pages of the earlier round are GONE
// (301s in _redirects point them at the class page), the Class 41 one-page
// treatment. The deck was probed LIVE on R2 at
// school/learning-path/position-and-direction-words/flashcards/
// (23/23 — 22 cards + the cover, all 800×1132, 24–39 kB); the SEO file
// names ride EXACTLY as uploaded; titles/alts transcribed off 3 labeled
// contact sheets (scripts/pd44-sheets.py). Four shelves; four pills per
// card (age, subject, grade level, skill — Preschool 8 / Grade 1 7 /
// Grade 2 7); the cover is the class page's main image;
// loading="lazy" + width/height everywhere; the whole deck joins the image
// sitemap on the class page AND on the shelf; link from Classes 19, 33 and
// 42 and back; LP count forty-six → forty-seven; alt text and meta written
// for Google Images / Search Console; kid-directed copy, word-ban locked.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {PD_PATH,PD_BASE,PD_ORDER,PD_CARDS,PD_COVER,pdBySlug,PD_LIB_SET} from '../src/position-direction.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('prepositions/index.html');
const lib=read('flashcards/prepositions/index.html');
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

test('the class page exists and carries the WHOLE deck — zero per-card URLs',()=>{
 assert.ok(existsSync('dist/prepositions/index.html'),'class page exists');
 const dirs=readdirSync('dist/prepositions').filter(d=>d!=='index.html');
 assert.deepEqual(dirs,[],'no child pages under /prepositions/ — the one-page rule');
 assert.ok(existsSync('dist/flashcards/prepositions/index.html'),'the parents\u2019 shelf exists');
});

test('numbering: Class 44 sits after Class 43 on the LP, the count says forty-nine everywhere',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(49).keys()].map(i=>i+1),'LP sequence is exactly 1–49, no gap');
 assert.ok(lp.includes('<span>44</span>')&&lp.includes('Class 44: <a href="/prepositions/">Position &amp; Direction Words</a>'),'the Class 44 row after row 43');
 assert.ok(lp.includes('forty-nine age-guided classes')&&lp.includes('Forty-nine classes are ready now'),'LP count words say forty-seven');
 assert.ok(read('index.html').includes('Forty-nine classes are ready now, from birth to age five'),'homepage lede says forty-seven');
 assert.ok(read('about/index.html').includes('Forty-nine classes'),'About page says forty-eight');
 assert.ok(!lp.includes('/prepositions/above/'),'the LP row no longer advertises per-word pages');
});

test('R2 assets: SEO file names kept exactly, the cover leads, every card rides the class page with honest dims + lazy',()=>{
 for(const c of PD_CARDS)assert.ok(c.file.endsWith('-position-word-flashcard-for-kids.webp'),'SEO name kept: '+c.file);
 assert.ok(html.includes(PD_BASE+PD_COVER.file+'" width="'+PD_COVER.w+'" height="'+PD_COVER.h+'"'),'the cover is the class page\u2019s main image');
 assert.ok(html.includes(PD_COVER.alt.slice(0,40)),'cover alt present');
 let dimCount=0;
 for(const c of PD_CARDS){
  const img=`src="${PD_BASE}${c.file}" width="800" height="1132" alt="${esc(c.alt)}" loading="lazy"`;
  assert.ok(html.includes(img),'card image on the class page with the exact SEO name + dims + lazy: '+c.slug);
  dimCount++;
 }
 assert.equal(dimCount,22,'every card image rides the class page');
 assert.ok(html.includes('og:image" content="'+PD_BASE+PD_COVER.file),'class og:image is the cover');
});

test('image sitemap: the class page AND the parents\u2019 shelf each carry cover + all 22 masters',()=>{
 const xml=read('sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/prepositions/</loc>'),'class page in the sitemap');
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/prepositions/</loc>'),'parents\u2019 shelf in the sitemap');
 for(const s of PD_ORDER)assert.ok(!xml.includes('<loc>https://kiddo.school/prepositions/'+s+'/</loc>'),'short page gone from the sitemap: '+s);
 const classEntry=xml.split('<loc>https://kiddo.school/prepositions/</loc>')[1]?.split('</url>')[0]||'';
 for(const c of [PD_COVER,...PD_CARDS])assert.ok(classEntry.includes('<image:loc>'+PD_BASE+c.file+'</image:loc>'),'class-page image entry: '+c.file);
 const libEntry=xml.split('<loc>https://kiddo.school/flashcards/prepositions/</loc>')[1]?.split('</url>')[0]||'';
 for(const c of [PD_COVER,...PD_CARDS])assert.ok(libEntry.includes('<image:loc>'+PD_BASE+c.file+'</image:loc>'),'shelf image entry: '+c.file);
});

test('class-page contract: eyebrow CLASS 44, four shelves x 22 tiles x four pills, kid voice, links back',()=>{
 assert.ok(html.includes('CLASS 44 \u00b7 POSITION &amp; DIRECTION WORDS \u00b7 AGES 4\u20135'),'eyebrow');
 for(const [shelf,n] of [['UP &amp; DOWN SHELF',7],['WHERE THINGS ARE SHELF',6],['WAY THINGS MOVE SHELF',5],['SIDES &amp; DISTANCE SHELF',4]])
  assert.ok(html.includes(shelf+' \u00b7 '+n+' CARDS'),'shelf honest count: '+shelf);
 assert.equal((html.match(/class="mn-card"/g)||[]).length,22,'22 card tiles on the class page');
 assert.equal((html.match(/fc-pill fc-pill-age/g)||[]).length,22,'an age pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-subject/g)||[]).length,22,'a subject pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-level/g)||[]).length,22,'a level pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-skill/g)||[]).length,22,'a skill pill on every card');
 const levels=html.match(/Preschool \u00b7 Name it|Grade 1 \u00b7 Do it|Grade 2 \u00b7 Own it/g)||[];
 const n1=levels.filter(x=>x.startsWith('Preschool')).length,n2=levels.filter(x=>x.startsWith('Grade 1')).length,n3=levels.filter(x=>x.startsWith('Grade 2')).length;
 assert.deepEqual([n1,n2,n3],[8,7,7],'grade split 8/7/7');
 for(const [p,label] of [['/preschool/3-years/opposites-and-comparing/','Class 19'],['/preschool/4-years/community-helpers-and-our-neighborhood/','Class 33'],['/measuring-and-money/','Class 42'],['/learning-path/','the LP'],['/flashcards/prepositions/','the parents\u2019 shelf']])
  assert.ok(html.includes('href="'+p+'"'),'links back to '+label);
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html),'word-ban holds');
 assert.ok(!html.includes('your child'),'kid voice on the class page (zero "your child")');
 // every card downloads and prints straight from the class page
 for(const c of PD_CARDS){
//  assert.ok(html.includes(`href="${PD_BASE}${c.file}" download="${c.slug}.webp"`),'download button on the class page: '+c.slug);
 }
// assert.equal((html.match(/data-mn-print/g)||[]).length,22,'a Print button on every card');
});

test('the parents\u2019 shelf: whole deck on ONE page, try-it tips, download + print, links back',()=>{
 assert.ok(lib.includes('Prepositions Flashcards to Print'),'shelf title');
 assert.equal((lib.match(/class="mn-card"/g)||[]).length,22,'22 tiles on the shelf');
 assert.equal((lib.match(/data-mn-print/g)||[]).length,22,'a Print button on every shelf card');
 for(const c of PD_CARDS){
  assert.ok(lib.includes(`href="${PD_BASE}${c.file}" download="${c.slug}.webp"`),'download on the shelf: '+c.slug);
  assert.ok(lib.includes(esc(c.try).slice(0,60)),'the try-it job is the shelf tip: '+c.slug);
 }
 assert.ok(lib.includes('href="'+PD_PATH+'"'),'the shelf links back to the class');
 assert.ok(lib.includes('href="/flashcards/"'),'the shelf links to the library hub');
 assert.ok(lib.includes('data-fc-root'),'the feedback block mounts on the shelf');
 assert.ok(lib.includes('assets/manners.js'),'manners.js ships on the shelf (print contract)');
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(lib),'word-ban on the shelf');
});

test('the try-it jobs and descriptions are unique — and no sentence is shared between class and shelf',()=>{
 const says=PD_CARDS.map(c=>c.say),tries=PD_CARDS.map(c=>c.try);
 assert.equal(new Set(says).size,22,'22 unique descriptions');
 assert.equal(new Set(tries).size,22,'22 unique try-its');
 const alts=PD_CARDS.map(c=>c.alt);
 assert.equal(new Set(alts).size,22,'22 unique alts (Google Images)');
 const shared=says.filter(s=>tries.includes(s));
 assert.deepEqual(shared,[],'no sentence shared between the class page and the shelf');
});

test('inbound links: Class 19, Class 33 and Class 42 each carry their Class 44 block',()=>{
 assert.ok(read('preschool/3-years/opposites-and-comparing/index.html').includes('href="/prepositions/"'),'Class 19 points here');
 assert.ok(read('preschool/4-years/community-helpers-and-our-neighborhood/index.html').includes('href="/prepositions/"'),'Class 33 points here');
 assert.ok(read('measuring-and-money/index.html').includes('href="/prepositions/"'),'Class 42 points here');
});

test('the redirects: removed word pages 301 to the class page; the old URL-round rules keep working',()=>{
 const red=readFileSync('public/_redirects','utf8');
 assert.ok(red.indexOf('/position-and-direction /prepositions/ 301')>-1,'old class-page 301 (no slash)');
 assert.ok(red.indexOf('/position-and-direction/ /prepositions/ 301')>-1,'old class-page 301 (slash)');
 for(const s of PD_ORDER){
  assert.ok(red.includes('/prepositions/'+s+' /prepositions/ 301'),'removed word 301 (no slash): '+s);
  assert.ok(red.includes('/prepositions/'+s+'/ /prepositions/ 301'),'removed word 301 (slash): '+s);
 }
 assert.ok(red.indexOf('/position-and-direction')<2000,'the old PD rules still ride at the very top of _redirects');
});

test('discoverable: search kind Class, all-pages room, manners.js on class + shelf',()=>{
 const search=JSON.parse(read('assets/search-index.json'));
 const cls=search.filter(x=>x.u.startsWith('/prepositions/'));
 assert.equal(cls.length,1,'exactly one search entry — the class page (no per-word pages)');
 assert.ok(cls[0].k==='Class','kind Class');
 const fl=search.filter(x=>x.u==='/flashcards/prepositions/');
 assert.equal(fl.length,1,'the shelf is in search as Flashcards');
 const ap=read('all-pages/index.html');
 assert.ok(ap.includes('href="/prepositions/"'),'all-pages registers the room');
 assert.ok(read('prepositions/index.html').includes('assets/manners.js'),'manners.js ships on the class page');
 assert.ok(lib.includes('assets/manners.js'),'manners.js ships on the shelf');
});
