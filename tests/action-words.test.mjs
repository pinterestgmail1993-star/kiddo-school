// Class 49 · Action Words (/action-words/) — the owner's brief 2026-11-02:
// the class page + ONE SHORT PAGE PER CARD at /action-words/<slug>/ with a
// link back, the owner's words verbatim: "Create one short page per card at
// /action-words/<slug>/ with a link back, where <slug> is the file name
// without '-action-words-flashcard-for-kids.jpg', for example
// /action-words/run-jump-climb-push/." The short-page shape is the site's
// own Class 39 · Staying Safe precedent. NUMBERING (owner gate verbatim:
// "Add Class 49 'Action Words' (ages 4-5) to the Learning Path as the next
// class number after Class 48. If Class 48 is not live, tell me before
// assigning numbers."): Class 48 · Plants & How They Grow WAS probed LIVE
// (LP row 48, count word forty-eight) before 49 was assigned — the honest
// next number by the no-skip rule; the number rides display copy only (the
// URL carries no class number). Deck probed LIVE on R2 at
// school/learning-path/action-words/ (24/24 — HTTP 200 image/jpeg, every
// file exactly 1414×2000 portrait, byte sizes matching the owner's panel to
// the kB); THE JPG MASTERS RIDE EXACTLY AS UPLOADED (owner: "The images are
// JPG, so do not convert or re-compress them, and keep the file names
// exactly as they are"). FOLDER: the brief said …/flashcards/ but the live
// bucket keeps the deck at the folder ROOT (probed 404 at …/flashcards/,
// 200 at the root — the Class-39 quirk); the real R2 location is the truth
// and the owner is told. Titles/words/alts transcribed off 4 labeled
// contact sheets (scripts/aw-sheets.py — all 24 faces read; every card
// prints four or five labeled action scenes, no title banner). The FIRST
// card of the deck (bite-chew-smell-touch-feel, the owner's R2 panel row 1)
// is the class page's main image. Inbound links: Classes 37, 6, 32 — all
// three link back. LP count forty-eight → forty-nine.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {AW_PATH,AW_BASE,AW_ORDER,AW_CARDS,awBySlug,awShortTitle,awShortDesc} from '../src/action-words.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('action-words/index.html');
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

test('deck integrity: exactly 24 cards, every file name untouched per the owner slug rule, all portrait',()=>{
 assert.equal(AW_CARDS.length,24,'24 cards');
 assert.equal(AW_ORDER.length,24,'order covers the deck');
 for(const c of AW_CARDS){
  assert.equal(c.file,c.slug+'-action-words-flashcard-for-kids.jpg','owner slug rule, char-for-char: '+c.slug);
  assert.equal(c.w,1414,'portrait width: '+c.slug);
  assert.equal(c.h,2000,'portrait height: '+c.slug);
  assert.ok(c.words.length>=4&&c.words.length<=5,'four or five labeled actions on the face: '+c.slug);
 }
 assert.equal(new Set(AW_ORDER).size,24,'slugs unique');
 assert.equal(new Set(AW_CARDS.map(c=>c.title)).size,24,'titles unique');
 assert.equal(new Set(AW_CARDS.map(c=>c.alt)).size,24,'alts unique');
 assert.equal(AW_ORDER[0],'bite-chew-smell-touch-feel','the deck leads with the owner\u2019s first uploaded file (R2 panel row 1) — the class main image');
 assert.ok(AW_ORDER.includes('run-jump-climb-push'),'the owner\u2019s example slug is a real card');
 assert.ok(existsSync('dist/action-words/run-jump-climb-push/index.html'),'the owner\u2019s example URL is a real page');
 assert.equal(AW_CARDS.reduce((a,c)=>a+c.words.length,0),118,'118 labeled actions across the deck');
});

test('the class page plus all 24 short pages exist — one page per card, all linking back',()=>{
 assert.ok(existsSync('dist/action-words/index.html'),'class page exists');
 for(const s of AW_ORDER)assert.ok(existsSync('dist/action-words/'+s+'/index.html'),'short page: '+s);
 const short=read('action-words/run-jump-climb-push/index.html');
 assert.ok(short.includes('href="/action-words/"'),'the short page links back to the class');
 assert.ok(short.includes('Back to Action Words'),'rail link back');
 assert.ok(short.includes('href="/learning-path/"'),'and to the Learning Path');
});

test('numbering: Class 49 sits after Class 48 on the LP, the count says forty-nine everywhere',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(49).keys()].map(i=>i+1),'LP sequence is exactly 1\u201349, no gap');
 const i48=lp.indexOf('Class 48: <a href="/plants-and-how-they-grow/">'),i49=lp.indexOf('Class 49: <a href="/action-words/">');
 assert.ok(i48>0&&i49>i48,'row 49 sits after row 48');
 assert.ok(lp.includes('forty-nine age-guided classes')&&lp.includes('Forty-nine classes are ready now'),'LP count words say forty-nine');
 assert.ok(read('index.html').includes('Forty-nine classes are ready now, from birth to age five'),'homepage lede says forty-nine');
 assert.ok(read('about/index.html').includes('Forty-nine classes'),'About page says forty-nine');
});

test('R2 assets: JPG masters ride exactly as uploaded, the FIRST card is the main image, lazy + honest dims everywhere',()=>{
 assert.ok(html.includes(AW_BASE+AW_CARDS[0].file+'" width="'+AW_CARDS[0].w+'" height="'+AW_CARDS[0].h+'"'),'the first card is the class page\u2019s main image');
 assert.ok(html.includes('og:image" content="'+AW_BASE+AW_CARDS[0].file),'class og:image is the first card');
 for(const c of AW_CARDS){
  const tile=`src="${AW_BASE}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"`;
  assert.ok(html.includes(tile),'class tile, exact name + honest dims + lazy: '+c.slug);
  const sp=read('action-words/'+c.slug+'/index.html');
  assert.ok(sp.includes('og:image" content="'+AW_BASE+c.file),'short page og:image is its own card: '+c.slug);
  assert.ok(sp.includes(`src="${AW_BASE}${c.file}" width="${c.w}" height="${c.h}"`),'short-page hero at full size: '+c.slug);
 }
});

test('image sitemap: the class page carries all 24 masters first-card-first; every short page carries its own',()=>{
 const xml=read('sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/action-words/</loc>'),'class page in the sitemap');
 const classEntry=xml.split('<loc>https://kiddo.school/action-words/</loc>')[1]?.split('</url>')[0]||'';
 const imgs=[...classEntry.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map(m=>m[1]);
 assert.equal(imgs.length,24,'24 image entries on the class page');
 assert.equal(imgs[0],AW_BASE+AW_CARDS[0].file,'the first card leads');
 assert.deepEqual(imgs,AW_ORDER.map(s=>AW_BASE+awBySlug[s].file),'then every master in deck order — no duplicate lead (this deck has no separate cover: the first master IS the main image)');
 for(const s of AW_ORDER){
  const entry=xml.split('<loc>https://kiddo.school/action-words/'+s+'/</loc>')[1]?.split('</url>')[0]||'';
  assert.ok(entry.includes('<image:loc>'+AW_BASE+awBySlug[s].file+'</image:loc>'),'short-page image entry: '+s);
 }
});

test('class-page contract: eyebrow CLASS 49, five shelves x 24 tiles, kid voice, links back',()=>{
 assert.ok(html.includes('CLASS 49 \u00b7 ACTION WORDS \u00b7 AGES 4\u20135'),'eyebrow');
 for(const [shelf,n] of [['EVERY-DAY SHELF',6],['BIG MOVES SHELF',6],['MAKE &amp; DO SHELF',4],['GO &amp; PLAY SHELF',3],['PEOPLE SHELF',5]])
  assert.ok(html.includes(shelf+' \u00b7 '+n+' CARDS'),'shelf honest count: '+shelf);
 assert.equal((html.match(/class="lp-tile"/g)||[]).length,24,'24 tiles on the class page');
 assert.equal((html.match(/loading="lazy"/g)||[]).length,24,'lazy on every tile image (the hero leads eager)');
 const levels=html.match(/Preschool \u00b7 Name it|Grade 1 \u00b7 Do it|Grade 2 \u00b7 Own it/g)||[];
 assert.equal(levels.length,0,'the class page keeps the Class 39 tile shape — pills live on the one-page classes, the tiles here name the card');
 for(const [p,label] of [['/preschool/4-years/sports-movement-and-play/','Class 37'],['/baby/9-12-months/first-actions-body-parts/','Class 6'],['/preschool/4-years/life-skills-and-good-habits/','Class 32'],['/learning-path/','the LP']])
  assert.ok(html.includes('href="'+p+'"'),'links back to '+label);
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html),'word-ban holds');
 assert.ok(!html.includes('your child'),'kid voice on the class page');
 for(const s of AW_ORDER)assert.ok(html.includes('href="'+AW_PATH+s+'/"'),'a tile opens the short page: '+s);
});

test('short-page contract: the card, its printed words quoted, a try-it, prev/next, card N of 24',()=>{
 for(let i=0;i<AW_ORDER.length;i++){
  const s=AW_ORDER[i],c=awBySlug[s],sp=read('action-words/'+s+'/index.html');
  assert.ok(sp.includes('CARD '+(i+1)+' OF 24'),'card numbering honest: '+s);
  assert.ok(sp.includes('\u201c'+c.words.map(esc).join(' \u00b7 ')+'\u201d \u2014 printed on the card.'),'the printed words quoted verbatim: '+s);
  assert.ok(sp.includes('Try it today'),'a try-it on the page: '+s);
  assert.ok(sp.includes('href="'+AW_PATH+AW_ORDER[(i+23)%24]+'/"'),'prev link: '+s);
  assert.ok(sp.includes('href="'+AW_PATH+AW_ORDER[(i+1)%24]+'/"'),'next link: '+s);
  assert.ok(sp.includes('download="'+s+'.jpg"'),'download keeps the master: '+s);
  assert.ok(sp.includes('<title>'+esc(c.title)+' — Action Words Flashcard for Kids (Class 49, Ages 4\u20135) | Kiddo.school</title>'),'SEO title: '+s);
  assert.ok(sp.includes('aria-label="Breadcrumb"'),'breadcrumb: '+s);
 }
 const t=awShortTitle('run-jump-climb-push'),d=awShortDesc('run-jump-climb-push');
 assert.ok(t.startsWith('Run, Jump, Climb & Push'),'title leads with the card name');
 assert.ok(d.includes('Run, Jump, Climb, Push.')&&d.includes('Part of the 24-card Action Words class'),'description names the actions and the class');
});

test('the say/intro/try copy is unique — no sentence shared between the class page and the short pages',()=>{
 const says=AW_CARDS.map(c=>c.say);
 assert.equal(new Set(says).size,24,'24 unique tile descriptions');
 const pages=AW_ORDER.map(s=>read('action-words/'+s+'/index.html'));
 const intros=pages.map(p=>(p.match(/OF 24<\/span><h1>[^<]*<\/h1><p>([\s\S]*?)<\/p>/)||[])[1]||'');
 assert.equal(new Set(intros).size,24,'24 unique short-page intros');
 assert.deepEqual(intros.filter(x=>says.includes(x)),[],'no intro shared with the class-page tiles');
 const tries=pages.map(p=>(p.match(/<h2>Try it today<\/h2><p>([\s\S]*?)<\/p>/)||[])[1]||'');
 assert.equal(new Set(tries).size,24,'24 unique try-its');
});

test('inbound links: Class 37, Class 6 and Class 32 each carry their Class 49 block',()=>{
 assert.ok(read('preschool/4-years/sports-movement-and-play/index.html').includes('href="/action-words/"'),'Class 37 points here');
 assert.ok(read('baby/9-12-months/first-actions-body-parts/index.html').includes('href="/action-words/"'),'Class 6 points here');
 assert.ok(read('preschool/4-years/life-skills-and-good-habits/index.html').includes('href="/action-words/"'),'Class 32 points here');
});

test('discoverable: search kind Class on all 25 pages, all-pages registration, sitemap locs',()=>{
 const search=JSON.parse(read('assets/search-index.json'));
 const cls=search.filter(x=>x.u.startsWith('/action-words/'));
 assert.equal(cls.length,25,'all 25 pages in search (class + 24 cards)');
 assert.ok(cls.every(x=>x.k==='Class'),'kind Class');
 const xml=read('sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/action-words/</loc>'),'class page loc');
 for(const s of AW_ORDER)assert.ok(xml.includes('<loc>https://kiddo.school/action-words/'+s+'/</loc>'),'short-page loc: '+s);
 const ap=read('all-pages/index.html');
 assert.ok(ap.includes('href="/action-words/"'),'all-pages registers the class');
});
