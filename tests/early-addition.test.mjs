// Class 46 · Early Addition & Subtraction (/early-addition-and-subtraction/)
// — the owner's brief (2026-11-01): "Add Class 45 'Early Addition &
// Subtraction' … as the next class number after Class 44. If Class 44 is not
// live, tell me before assigning numbers." Class 44 WAS live (/prepositions/,
// HTTP 200) — but Class 45 · Family & Friends had gone LIVE earlier the same
// day (LP row 45, count forty-five), so the honest next number by the site's
// own no-skip rule is 46; the owner's literal "45" was rejected because two
// Class 45s would duplicate the sequence and break the count. The owner is
// told in the round report, and the number rides display copy only — the
// URLs carry no class number. The class page groups the deck into Addition
// and Subtraction (the owner's explicit ask for THIS class). One short page
// per sum at /early-addition-and-subtraction/<sum>/, where <sum> is the
// start of the file name before "-addition-flashcard-for-kids" or
// "-subtraction-flashcard-for-kids" (the owner's examples:
// /early-addition-and-subtraction/1-plus-2/ and
// /early-addition-and-subtraction/10-minus-3/). THE 10-MINUS-3 PAIR: the
// deck uploads TWO different artworks for one sum (…-kids.jpg and
// …-kids-2.jpg — different bytes, 31.65% of pixels differ: a second drawing,
// not a re-upload), and BOTH map to the same <sum> under the owner's URL
// rule, so they share ONE short page that shows the sum drawn two ways;
// both masters join the image sitemap on that URL. The deck was probed LIVE
// on R2 (32/32 — 31 card files + the cover, all 1414×2000 master JPGs,
// 140–219 kB); THE JPG MASTERS RIDE EXACTLY AS UPLOADED (owner: "The images
// are JPG, so do not convert or re-compress them, and keep the file names
// exactly as they are") — one full-resolution master serves the web image,
// the Download button and the Print button. Titles/alts transcribed off 2
// labeled contact sheets (scripts/eas-sheets.py — every card face read, the
// printed equation verbatim, e.g. "1 + 2 =" and "10 - 7 = ?"); the artwork
// never prints the answer and neither does the copy. Link from Classes 35,
// 42 and 30 and back; LP count forty-five → forty-six everywhere.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {EAS_PATH,EAS_BASE,EAS_ORDER,EAS_CARDS,EAS_COVER,easBySlug} from '../src/early-addition.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('early-addition-and-subtraction/index.html');
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

test('the class page exists and EXACTLY 30 short pages — one per sum, nothing else',()=>{
 assert.ok(existsSync('dist/early-addition-and-subtraction/index.html'),'class page exists');
 const dirs=readdirSync('dist/early-addition-and-subtraction').filter(d=>d!=='index.html').sort();
 assert.deepEqual(dirs,EAS_ORDER.slice().sort(),'short-page dirs are exactly the 30 sum slugs (the two 10-minus-3 artworks share ONE URL)');
 for(const s of EAS_ORDER)assert.ok(existsSync('dist/early-addition-and-subtraction/'+s+'/index.html'),'sum page exists: '+s);
});

test('numbering: Class 46 follows Class 45 on the LP — no gap, no duplicate 45 — and the count says forty-six everywhere',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(46).keys()].map(i=>i+1),'LP sequence is exactly 1–46, no gap, no duplicate 45');
 assert.ok(lp.includes('<span>46</span>')&&lp.includes('Class 46: <a href="/early-addition-and-subtraction/">Early Addition &amp; Subtraction</a>'),'the Class 46 row after row 45');
 assert.ok(lp.includes('forty-six age-guided classes')&&lp.includes('Forty-six classes are ready now'),'LP count words say forty-six');
 assert.ok(read('index.html').includes('Forty-six classes are ready now, from birth to age five'),'homepage lede says forty-six');
 assert.ok(read('about/index.html').includes('Forty-six classes'),'About page says forty-six');
});

test('R2 assets: master JPG file names kept EXACTLY, no re-compression, the cover leads, lazy + honest dims everywhere, image sitemap',()=>{
 for(const c of EAS_CARDS){
  assert.ok(c.file.endsWith('.jpg'),'master stays JPG (no webp conversion): '+c.file);
  assert.ok(c.file.endsWith('-addition-flashcard-for-kids.jpg')||c.file.endsWith('-subtraction-flashcard-for-kids.jpg'),'SEO name kept: '+c.file);
  assert.ok(c.w===1414&&c.h===2000,'honest probed dims 1414×2000: '+c.slug);
 }
 assert.ok(html.includes(EAS_BASE+EAS_COVER.file+'" width="'+EAS_COVER.w+'" height="'+EAS_COVER.h+'"'),'the cover is the class page\'s main image');
 assert.ok(html.includes(EAS_COVER.alt.slice(0,40)),'cover alt present');
 let dimCount=0;
 for(const c of EAS_CARDS){
  const short=read('early-addition-and-subtraction/'+c.slug+'/index.html');
  const img=`src="${EAS_BASE}${c.file}" width="1414" height="2000" alt="${esc(c.alt)}" loading="lazy"`;
  assert.ok(short.includes(img),'card image rides the exact SEO file name with dims + lazy: '+c.slug);
  assert.ok(short.includes(`og:image" content="${EAS_BASE}${c.file}`),'og:image is the card: '+c.slug);
  assert.ok(short.includes(`og:image:alt" content="${esc(c.alt)}`),'og:image:alt is the transcribed alt: '+c.slug);
  dimCount++;
 }
 assert.equal(dimCount,30,'every sum has its short page image wiring');
 assert.ok(html.includes('og:image" content="'+EAS_BASE+EAS_COVER.file),'class og:image is the cover');
 const xml=read('sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/early-addition-and-subtraction/</loc>'),'class page in the sitemap');
 for(const s of EAS_ORDER)assert.ok(xml.includes('<loc>https://kiddo.school/early-addition-and-subtraction/'+s+'/</loc>'),'short page in the sitemap: '+s);
 assert.ok(xml.includes('<image:loc>'+EAS_BASE+EAS_COVER.file+'</image:loc>'),'cover in the image sitemap');
 assert.ok(xml.includes('<image:loc>'+EAS_BASE+EAS_CARDS[0].file+'</image:loc>'),'card image in the image sitemap');
});

test('the 10-minus-3 pair: TWO different artworks share ONE page and both join the image sitemap',()=>{
 const c=easBySlug['10-minus-3'];
 assert.ok(c.file2,'the second artwork is wired');
 assert.notEqual(c.file,c.file2,'the two files are distinct');
 assert.ok(c.alt2&&c.alt2.length>80,'the second artwork has its own alt');
 const p=read('early-addition-and-subtraction/10-minus-3/index.html');
 assert.ok(p.includes(`src="${EAS_BASE}${c.file}"`),'the first artwork prints: '+c.file);
 assert.ok(p.includes(`src="${EAS_BASE}${c.file2}"`),'the second artwork prints on the same page: '+c.file2);
 assert.ok(p.includes(`download="${c.slug}-2.jpg"`),'the second artwork has its own download button');
 assert.ok(p.includes('The same sum, drawn twice'),'the second artwork is captioned honestly');
 const xml=read('sitemap.xml');
 const seg=xml.slice(xml.indexOf('<loc>https://kiddo.school/early-addition-and-subtraction/10-minus-3/</loc>'));
 const segEnd=seg.slice(0,seg.indexOf('</url>'));
 assert.ok(segEnd.includes('<image:loc>'+EAS_BASE+c.file+'</image:loc>'),'first artwork in the image sitemap on /10-minus-3/');
 assert.ok(segEnd.includes('<image:loc>'+EAS_BASE+c.file2+'</image:loc>'),'second artwork in the image sitemap on /10-minus-3/');
});

test('class-page contract: eyebrow CLASS 46, two shelves (Addition 16 / Subtraction 14) x 30 tiles x four pills, kid voice, links back',()=>{
 assert.ok(html.includes('CLASS 46 \u00b7 EARLY ADDITION &amp; SUBTRACTION \u00b7 AGES 4\u20135'),'eyebrow');
 assert.ok(html.includes('ADDITION SHELF \u00b7 16 CARDS'),'the Addition shelf leads with its honest count');
 assert.ok(html.includes('SUBTRACTION SHELF \u00b7 14 CARDS'),'the Subtraction shelf leads with its honest count');
 assert.equal((html.match(/class="mn-card"/g)||[]).length,30,'30 card tiles on the class page');
 assert.equal((html.match(/fc-pill fc-pill-age/g)||[]).length,30,'an age pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-subject/g)||[]).length,30,'a subject pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-level/g)||[]).length,30,'a level pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-skill/g)||[]).length,30,'a skill pill on every card');
 const levels=html.match(/Preschool \u00b7 Name it|Grade 1 \u00b7 Do it|Grade 2 \u00b7 Own it/g)||[];
 const n1=levels.filter(x=>x.startsWith('Preschool')).length,n2=levels.filter(x=>x.startsWith('Grade 1')).length,n3=levels.filter(x=>x.startsWith('Grade 2')).length;
 assert.deepEqual([n1,n2,n3],[6,12,12],'grade split 6/12/12');
 for(const [p,label] of [['/preschool/4-years/numbers-counting-and-early-math/','Class 35'],['/measuring-and-money/','Class 42'],['/preschool/4-years/logic-thinking-and-problem-solving/','Class 30'],['/learning-path/','the LP']])
  assert.ok(html.includes('href="'+p+'"'),'links back to '+label);
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html),'word-ban holds');
 assert.ok(!html.includes('your child'),'kid voice on the class page (zero "your child")');
});

test('short-page contract: breadcrumb, sum h1, the scene verbatim, try-it, counter, back, download + print — and the copy never spoils the answer',()=>{
 for(const c of EAS_CARDS){
  const p=read('early-addition-and-subtraction/'+c.slug+'/index.html');
  assert.ok(p.includes('<h1>'+esc(c.sum)+'</h1>'),'h1 is the printed sum: '+c.sum);
  assert.ok(p.includes('SUM '+(EAS_ORDER.indexOf(c.slug)+1)+' OF 30'),'sum counter: '+c.slug);
  assert.ok(p.includes(esc(c.scene)),'the artwork scene quoted verbatim: '+c.slug);
  assert.ok(p.includes('The equation prints with the answer blank on purpose'),'no-spoiler contract stated: '+c.slug);
  assert.ok(p.includes('Try it today'),'try-it section: '+c.slug);
  assert.ok(p.includes('href="'+EAS_PATH+'"'),'link back to the class page: '+c.slug);
  assert.ok(p.includes('download="'+c.slug+'.jpg"'),'download attribute rides the JPG: '+c.slug);
  assert.ok(p.includes('data-mn-print'),'print button: '+c.slug);
  assert.ok(p.includes('breadcrumbs'),'breadcrumb: '+c.slug);
  assert.ok(!p.includes('your child'),'kid voice on the short page: '+c.slug);
  assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(p),'word-ban: '+c.slug);
 }
});

test('the try-it jobs and descriptions are unique — no sentence repeats across the deck',()=>{
 const says=EAS_CARDS.map(c=>c.say),tries=EAS_CARDS.map(c=>c.try),alts=EAS_CARDS.map(c=>c.alt);
 assert.equal(new Set(says).size,30,'30 unique descriptions');
 assert.equal(new Set(tries).size,30,'30 unique try-its');
 assert.equal(new Set(alts).size,30,'30 unique alts (Google Images)');
});

test('inbound links: Class 35, Class 42 and Class 30 each carry their Class 46 block',()=>{
 assert.ok(read('preschool/4-years/numbers-counting-and-early-math/index.html').includes('href="/early-addition-and-subtraction/"'),'Class 35 points here');
 assert.ok(read('measuring-and-money/index.html').includes('href="/early-addition-and-subtraction/"'),'Class 42 points here');
 assert.ok(read('preschool/4-years/logic-thinking-and-problem-solving/index.html').includes('href="/early-addition-and-subtraction/"'),'Class 30 points here');
});

test('discoverable: search kind Class, all-pages room, manners.js on every new page',()=>{
 const search=JSON.parse(read('assets/search-index.json'));
 const cls=search.filter(x=>x.u.startsWith('/early-addition-and-subtraction/'));
 assert.equal(cls.length,31,'class + 30 short pages in search');
 assert.ok(cls.every(x=>x.k==='Class'),'kind Class');
 const ap=read('all-pages/index.html');
 assert.ok(ap.includes('href="/early-addition-and-subtraction/"'),'all-pages registers the room');
 for(const s of ['early-addition-and-subtraction/index.html','early-addition-and-subtraction/1-plus-2/index.html','early-addition-and-subtraction/10-minus-3/index.html'])
  assert.ok(read(s).includes('assets/manners.js'),'manners.js ships: '+s);
});
