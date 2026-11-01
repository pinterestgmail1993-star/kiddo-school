// Class 45 · Family & Friends (/family-and-friends/) — the owner's brief
// (2026-11-01): "Add Class 46 'Family & Friends' (ages 4-5) … as the next
// class number after Class 45. If Class 45 is not live, tell me before
// assigning numbers." The production probes found NO Class 45 — the live
// Learning Path said forty-four and the latest live class was Class 44 ·
// Position & Direction Words at /prepositions/ (HTTP 200) — so the honest
// next number by the site's own no-skip rule is 45; the literal "46" was
// rejected because it would leave a permanent gap in the sequence and break
// the class count. The owner is told this in the round report, and the
// number rides display copy only — the URLs carry no class number, so a
// renumber is one commit with zero URL changes. The class page PLUS one
// short page per card at /family-and-friends/<word>/, where <word> is the
// start of the file name before "-family-member-flashcard-for-kids" or
// "-flashcard-for-kids" (the owner's examples: /family-and-friends/mum/ and
// /family-and-friends/best-friend/). The deck was probed LIVE on R2 at
// school/learning-path/family-and-friends/flashcards/ (36/36 — 35 cards +
// the cover, all 1414×2000 master JPGs, 149–227 kB); THE JPG MASTERS RIDE
// EXACTLY AS UPLOADED (owner: "The images are JPG, so do not convert or
// re-compress them, and keep the file names exactly as they are") — one
// full-resolution master serves the web image, the Download button and the
// Print button. Four shelves; four pills per card (age, subject, grade
// level, skill — Preschool 8 / Grade 1 12 / Grade 2 15); the cover is the
// class page's main image; loading="lazy" + width/height everywhere; link
// from Classes 38, 33 and 32 and back; LP count forty-four → forty-five
// everywhere (LP, homepage, About); alt text and meta written for Google
// Images / Search Console (transcribed off 2 labeled contact sheets,
// scripts/ff46-sheets.py); kid-directed copy, word-ban locked. The same
// message shipped the high-resolution master-assets print contract: the
// [Print] button prints the full-resolution source image paper-fit
// (max-width:100%; max-height:100%; object-fit:contain, centered).
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {FF_PATH,FF_BASE,FF_ORDER,FF_CARDS,FF_COVER,ffBySlug} from '../src/family-friends.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('family-and-friends/index.html');
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

test('the class page exists and EXACTLY 35 short pages — one per word, nothing else',()=>{
 assert.ok(existsSync('dist/family-and-friends/index.html'),'class page exists');
 const dirs=readdirSync('dist/family-and-friends').filter(d=>d!=='index.html').sort();
 assert.deepEqual(dirs,FF_ORDER.slice().sort(),'short-page dirs are exactly the 35 word slugs');
 for(const s of FF_ORDER)assert.ok(existsSync('dist/family-and-friends/'+s+'/index.html'),'word page exists: '+s);
});

test('numbering: Class 45 follows Class 44 on the LP — no gap, no skipped 46 — and the count says forty-five everywhere',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(45).keys()].map(i=>i+1),'LP sequence is exactly 1–45, no gap, no skipped 46');
 assert.ok(lp.includes('<span>45</span>')&&lp.includes('Class 45: <a href="/family-and-friends/">Family &amp; Friends</a>'),'the Class 45 row after row 44');
 assert.ok(lp.includes('forty-five age-guided classes')&&lp.includes('Forty-five classes are ready now'),'LP count words say forty-five');
 assert.ok(read('index.html').includes('Forty-five classes are ready now, from birth to age five'),'homepage lede says forty-five');
 assert.ok(read('about/index.html').includes('Forty-five classes'),'About page says forty-five');
});

test('R2 assets: master JPG file names kept EXACTLY, no re-compression, the cover leads, lazy + honest dims everywhere, image sitemap',()=>{
 for(const c of FF_CARDS){
  assert.ok(c.file.endsWith('.jpg'),'master stays JPG (no webp conversion): '+c.file);
  assert.ok(c.file.endsWith('-family-member-flashcard-for-kids.jpg')||c.file.endsWith('-flashcard-for-kids.jpg'),'SEO name kept: '+c.file);
  assert.ok(c.w===1414&&c.h===2000,'honest probed dims 1414×2000: '+c.slug);
 }
 assert.ok(html.includes(FF_BASE+FF_COVER.file+'" width="'+FF_COVER.w+'" height="'+FF_COVER.h+'"'),'the cover is the class page\'s main image');
 assert.ok(html.includes(FF_COVER.alt.slice(0,40)),'cover alt present');
 // every card image: exact R2 URL + honest dims + lazy, on its short page
 let dimCount=0;
 for(const c of FF_CARDS){
  const short=read('family-and-friends/'+c.slug+'/index.html');
  const img=`src="${FF_BASE}${c.file}" width="1414" height="2000" alt="${esc(c.alt)}" loading="lazy"`;
  assert.ok(short.includes(img),'card image rides the exact SEO file name with dims + lazy: '+c.slug);
  assert.ok(short.includes(`og:image" content="${FF_BASE}${c.file}`),'og:image is the card: '+c.slug);
  assert.ok(short.includes(`og:image:alt" content="${esc(c.alt)}`),'og:image:alt is the transcribed alt: '+c.slug);
  dimCount++;
 }
 assert.equal(dimCount,35,'every card has its short page image wiring');
 assert.ok(html.includes('og:image" content="'+FF_BASE+FF_COVER.file),'class og:image is the cover');
 const xml=read('sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/family-and-friends/</loc>'),'class page in the sitemap');
 for(const s of FF_ORDER)assert.ok(xml.includes('<loc>https://kiddo.school/family-and-friends/'+s+'/</loc>'),'short page in the sitemap: '+s);
 assert.ok(xml.includes('<image:loc>'+FF_BASE+FF_COVER.file+'</image:loc>'),'cover in the image sitemap');
 assert.ok(xml.includes('<image:loc>'+FF_BASE+FF_CARDS[0].file+'</image:loc>'),'card image in the image sitemap');
});

test('class-page contract: eyebrow CLASS 45, four shelves x 35 tiles x four pills, kid voice, links back',()=>{
 assert.ok(html.includes('CLASS 45 \u00b7 FAMILY &amp; FRIENDS \u00b7 AGES 4\u20135'),'eyebrow');
 for(const [shelf,n] of [['PEOPLE IN MY HOUSE SHELF',10],['BIGGER FAMILY SHELF',10],['MARRIED-IN &amp; PARTNERS SHELF',7],['FRIENDS &amp; NEIGHBORS SHELF',8]])
  assert.ok(html.includes(shelf+' \u00b7 '+n+' CARDS'),'shelf honest count: '+shelf);
 assert.equal((html.match(/class="mn-card"/g)||[]).length,35,'35 card tiles on the class page');
 assert.equal((html.match(/fc-pill fc-pill-age/g)||[]).length,35,'an age pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-subject/g)||[]).length,35,'a subject pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-level/g)||[]).length,35,'a level pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-skill/g)||[]).length,35,'a skill pill on every card');
 const levels=html.match(/Preschool \u00b7 Name it|Grade 1 \u00b7 Do it|Grade 2 \u00b7 Own it/g)||[];
 const n1=levels.filter(x=>x.startsWith('Preschool')).length,n2=levels.filter(x=>x.startsWith('Grade 1')).length,n3=levels.filter(x=>x.startsWith('Grade 2')).length;
 assert.deepEqual([n1,n2,n3],[8,12,15],'grade split 8/12/15');
 for(const [p,label] of [['/preschool/4-years/feelings-and-kindness/','Class 38'],['/preschool/4-years/community-helpers-and-our-neighborhood/','Class 33'],['/preschool/4-years/life-skills-and-good-habits/','Class 32'],['/learning-path/','the LP']])
  assert.ok(html.includes('href="'+p+'"'),'links back to '+label);
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html),'word-ban holds');
 assert.ok(!html.includes('your child'),'kid voice on the class page (zero "your child")');
});

test('short-page contract: breadcrumb, word h1, the card scene, who-they-are, try-it, counter, back, download + print',()=>{
 for(const c of FF_CARDS){
  const p=read('family-and-friends/'+c.slug+'/index.html');
  assert.ok(p.includes('<h1>'+esc(c.word)+'</h1>'),'h1 is the word: '+c.word);
  assert.ok(p.includes('CARD '+(FF_ORDER.indexOf(c.slug)+1)+' OF 35'),'card counter: '+c.slug);
  assert.ok(p.includes('\u201c'+esc(c.word)+'\u201d — printed in big '+esc(c.color)+' letters over '+esc(c.group)+'.'),'the card scene quoted verbatim: '+c.slug);
  assert.ok(p.includes('Who they are'),'who-they-are section: '+c.slug);
  assert.ok(p.includes(esc(c.who)),'the who line present: '+c.slug);
  assert.ok(p.includes('Try it today'),'try-it section: '+c.slug);
  assert.ok(p.includes('href="'+FF_PATH+'"'),'link back to the class page: '+c.slug);
  assert.ok(p.includes('download="'+c.slug+'.jpg"'),'download attribute rides the JPG: '+c.slug);
  assert.ok(p.includes('data-mn-print'),'print button: '+c.slug);
  assert.ok(p.includes('breadcrumbs'),'breadcrumb: '+c.slug);
  assert.ok(!p.includes('your child'),'kid voice on the short page: '+c.slug);
  assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(p),'word-ban: '+c.slug);
 }
});

test('the try-it jobs, who-lines and descriptions are unique — no sentence repeats across the deck',()=>{
 const says=FF_CARDS.map(c=>c.say),tries=FF_CARDS.map(c=>c.try),whos=FF_CARDS.map(c=>c.who),alts=FF_CARDS.map(c=>c.alt);
 assert.equal(new Set(says).size,35,'35 unique descriptions');
 assert.equal(new Set(tries).size,35,'35 unique try-its');
 assert.equal(new Set(whos).size,35,'35 unique who-lines');
 assert.equal(new Set(alts).size,35,'35 unique alts (Google Images)');
});

test('inbound links: Class 38, Class 33 and Class 32 each carry their Class 45 block',()=>{
 assert.ok(read('preschool/4-years/feelings-and-kindness/index.html').includes('href="/family-and-friends/"'),'Class 38 points here');
 assert.ok(read('preschool/4-years/community-helpers-and-our-neighborhood/index.html').includes('href="/family-and-friends/"'),'Class 33 points here');
 assert.ok(read('preschool/4-years/life-skills-and-good-habits/index.html').includes('href="/family-and-friends/"'),'Class 32 points here');
});

test('high-resolution master-assets print contract (owner 2026-11-01, same message)',()=>{
 const css=readFileSync('public/assets/style.css','utf8');
 // the owner's exact spec on the per-card print isolation
 assert.match(css,/body\.mn-printing \.mn-print-card img\{max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;border:none\}/,'print isolation fits the master to the paper, centered');
 // the short-page (fc2 chain) print path fits and centers the master too
 assert.match(css,/\.fc2-hero img\{max-height:94vh;width:auto;max-width:100%;object-fit:contain;margin:0 auto\}/,'short-page hero prints paper-fit');
 // manners.js: short-page buttons (no .mn-card ancestor) print via the page's own print block
 const mn=readFileSync('public/assets/manners.js','utf8');
 assert.match(mn,/if \(!card\) \{ window\.print\(\); return; \}/,'short-page print fallback');
 // every master is reachable — the img src IS the master (no separate print asset)
 for(const c of [FF_CARDS[0],FF_CARDS[19],FF_CARDS[34]]){
  const p=read('family-and-friends/'+c.slug+'/index.html');
  assert.ok(p.includes(`src="${FF_BASE}${c.file}"`),'the printed image IS the master URL: '+c.slug);
 }
 // the R2 remote-pattern equivalent: the CSP allow-lists the R2 custom domain
 const headers=read('_headers');
 assert.ok(headers.includes("img-src 'self' data: https://*.adtrafficquality.google https://assets.kiddo.school"),'CSP img-src allows the R2 asset domain (jpg/jpeg/png/webp ride it)');
});

test('discoverable: search kind Class, all-pages room, manners.js on every new page',()=>{
 const search=JSON.parse(read('assets/search-index.json'));
 const cls=search.filter(x=>x.u.startsWith('/family-and-friends/'));
 assert.equal(cls.length,36,'class + 35 short pages in search');
 assert.ok(cls.every(x=>x.k==='Class'),'kind Class');
 const ap=read('all-pages/index.html');
 assert.ok(ap.includes('href="/family-and-friends/"'),'all-pages registers the room');
 for(const s of ['family-and-friends/index.html','family-and-friends/mum/index.html','family-and-friends/best-friend/index.html'])
  assert.ok(read(s).includes('assets/manners.js'),'manners.js ships: '+s);
});
