// Class 44 · Position & Direction Words (/prepositions/) — the
// owner's brief (2026-11-01): the next class after Class 43 on the Learning
// Path; Class 43 was probed LIVE on production (HTTP 200) before the number
// 44 was assigned. The class page PLUS one short page per word at
// /prepositions/<word>/ — the owner spells the short-page pattern
// out card by card ("for example /prepositions/above/"), so this
// class rides the Class 39/40 short-page precedent. The deck was probed LIVE
// on R2 at school/learning-path/position-and-direction-words/flashcards/
// (23/23 — 22 cards + the cover, all 800×1132, 24–39 kB); the SEO file names
// ride EXACTLY as uploaded; no seo.csv came with the deck, so the slug is the
// card's own word at the start of the file name and titles/alts were
// transcribed off 3 labeled contact sheets (scripts/pd44-sheets.py — every
// card face read). Four shelves; four pills per card (age, subject, grade
// level, skill — Preschool 8 / Grade 1 7 / Grade 2 7); the cover is the class
// page's main image; loading="lazy" + width/height everywhere; link from
// Classes 19, 33 and 42 and back; LP count forty-three → forty-four; alt
// text and meta written for Google Images / Search Console; kid-directed
// copy, word-ban locked.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {PD_PATH,PD_BASE,PD_ORDER,PD_CARDS,PD_COVER,pdBySlug} from '../src/position-direction.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('prepositions/index.html');
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

test('the class page exists and EXACTLY 22 short pages — one per word, nothing else',()=>{
 assert.ok(existsSync('dist/prepositions/index.html'),'class page exists');
 const dirs=readdirSync('dist/prepositions').filter(d=>d!=='index.html').sort();
 assert.deepEqual(dirs,PD_ORDER.slice().sort(),'short-page dirs are exactly the 22 word slugs');
 for(const s of PD_ORDER)assert.ok(existsSync('dist/prepositions/'+s+'/index.html'),'word page exists: '+s);
});

test('numbering: Class 44 follows Class 43 on the LP, the count says forty-four everywhere',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(44).keys()].map(i=>i+1),'LP sequence is exactly 1–44, no gap');
 assert.ok(lp.includes('<span>44</span>')&&lp.includes('Class 44: <a href="/prepositions/">Position &amp; Direction Words</a>'),'the Class 44 row after row 43');
 assert.ok(lp.includes('forty-four age-guided classes')&&lp.includes('Forty-four classes are ready now'),'LP count words say forty-four');
 assert.ok(read('index.html').includes('Forty-four classes are ready now, from birth to age five'),'homepage lede says forty-four');
 assert.ok(read('about/index.html').includes('Forty-four classes'),'About page says forty-four');
});

test('R2 assets: SEO file names kept exactly, the cover leads, lazy + dims everywhere, image sitemap',()=>{
 for(const c of PD_CARDS)assert.ok(c.file.endsWith('-position-word-flashcard-for-kids.webp'),'SEO name kept: '+c.file);
 assert.ok(html.includes(PD_BASE+PD_COVER.file+'" width="'+PD_COVER.w+'" height="'+PD_COVER.h+'"'),'the cover is the class page\'s main image');
 assert.ok(html.includes(PD_COVER.alt.slice(0,40)),'cover alt present');
 // every card image: exact R2 URL + honest dims + lazy, on its short page
 let dimCount=0;
 for(const c of PD_CARDS){
  const short=read('prepositions/'+c.slug+'/index.html');
  const img=`src="${PD_BASE}${c.file}" width="800" height="1132" alt="${esc(c.alt)}" loading="lazy"`;
  assert.ok(short.includes(img),'card image rides the exact SEO file name with dims + lazy: '+c.slug);
  assert.ok(short.includes(`og:image" content="${PD_BASE}${c.file}`),'og:image is the card: '+c.slug);
  assert.ok(short.includes(`og:image:alt" content="${esc(c.alt)}`),'og:image:alt is the transcribed alt: '+c.slug);
  dimCount++;
 }
 assert.equal(dimCount,22,'every card has its short page image wiring');
 assert.ok(html.includes('og:image" content="'+PD_BASE+PD_COVER.file),'class og:image is the cover');
 const xml=read('sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/prepositions/</loc>'),'class page in the sitemap');
 for(const s of PD_ORDER)assert.ok(xml.includes('<loc>https://kiddo.school/prepositions/'+s+'/</loc>'),'short page in the sitemap: '+s);
 assert.ok(xml.includes('<image:loc>'+PD_BASE+PD_COVER.file+'</image:loc>'),'cover in the image sitemap');
 assert.ok(xml.includes('<image:loc>'+PD_BASE+PD_ORDER.map(x=>pdBySlug[x].file)[0]+'</image:loc>'),'card image in the image sitemap');
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
 for(const [p,label] of [['/preschool/3-years/opposites-and-comparing/','Class 19'],['/preschool/4-years/community-helpers-and-our-neighborhood/','Class 33'],['/measuring-and-money/','Class 42'],['/learning-path/','the LP']])
  assert.ok(html.includes('href="'+p+'"'),'links back to '+label);
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html),'word-ban holds');
 assert.ok(!html.includes('your child'),'kid voice on the class page (zero "your child")');
});

test('short-page contract: breadcrumb, word h1, verbatim labels, try-it, counter, back, download + print',()=>{
 for(const c of PD_CARDS){
  const p=read('prepositions/'+c.slug+'/index.html');
  assert.ok(p.includes('<h1>'+esc(c.word)+'</h1>'),'h1 is the word: '+c.word);
  assert.ok(p.includes('CARD '+(PD_ORDER.indexOf(c.slug)+1)+' OF 22'),'card counter: '+c.slug);
  assert.ok(p.includes('\u201c'+esc(c.word)+'\u201d — shown five ways: '+c.labels+'.'),'the card\'s five labels quoted verbatim: '+c.slug);
  assert.ok(p.includes('Try it today'),'try-it section: '+c.slug);
  assert.ok(p.includes('href="'+PD_PATH+'"'),'link back to the class page: '+c.slug);
  assert.ok(p.includes('download="'+c.slug+'.webp"'),'download attribute: '+c.slug);
  assert.ok(p.includes('data-mn-print'),'print button: '+c.slug);
  assert.ok(p.includes('breadcrumbs'),'breadcrumb: '+c.slug);
  assert.ok(!p.includes('your child'),'kid voice on the short page: '+c.slug);
  assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(p),'word-ban: '+c.slug);
 }
});

test('the try-it jobs and descriptions are unique — no sentence repeats across the deck',()=>{
 const says=PD_CARDS.map(c=>c.say),tries=PD_CARDS.map(c=>c.try);
 assert.equal(new Set(says).size,22,'22 unique descriptions');
 assert.equal(new Set(tries).size,22,'22 unique try-its');
 const alts=PD_CARDS.map(c=>c.alt);
 assert.equal(new Set(alts).size,22,'22 unique alts (Google Images)');
});

test('inbound links: Class 19, Class 33 and Class 42 each carry their Class 44 block',()=>{
 assert.ok(read('preschool/3-years/opposites-and-comparing/index.html').includes('href="/prepositions/"'),'Class 19 points here');
 assert.ok(read('preschool/4-years/community-helpers-and-our-neighborhood/index.html').includes('href="/prepositions/"'),'Class 33 points here');
 assert.ok(read('measuring-and-money/index.html').includes('href="/prepositions/"'),'Class 42 points here');
});

test('discoverable: search kind Class, all-pages room, manners.js on every new page',()=>{
 const search=JSON.parse(read('assets/search-index.json'));
 const cls=search.filter(x=>x.u.startsWith('/prepositions/'));
 assert.equal(cls.length,23,'class + 22 short pages in search');
 assert.ok(cls.every(x=>x.k==='Class'),'kind Class');
 const ap=read('all-pages/index.html');
 assert.ok(ap.includes('href="/prepositions/"'),'all-pages registers the room');
 for(const s of ['/prepositions/index.html','prepositions/above/index.html','prepositions/up/index.html'])
  assert.ok(read(s).includes('assets/manners.js'),'manners.js ships: '+s);
});
