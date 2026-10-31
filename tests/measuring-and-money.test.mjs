// Class 42 · Measuring & Money (/measuring-and-money/) — the owner's brief
// (2026-10-31): the next class after Class 41 on the Learning Path; ONE page
// only ("remember no indiviual pages") — the whole 28-card deck lives on the
// class page with age/subject/level/skill pills, kid-voice descriptions under
// every image and Download + Print buttons; the cover file is the main image;
// SEO file names kept exactly; loading="lazy" + width/height on the card
// images; link from Classes 35/19/31 and back; LP count forty-one →
// forty-two. Deck probed LIVE on R2 at school/learning-path/measuring-and-
// money/flashcards/ (29/29 incl. cover, 800×1132); the owner's seo.csv was
// not provided, so slugs ride the file names and titles/alts were transcribed
// off labeled contact sheets. Level pills name school grades (owner: "levels
// are grade 1, grade 2, preschool") — Preschool 17 / Grade 1 6 / Grade 2 5.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {MM_PATH,MM_BASE,MM_ORDER,MM_CARDS,MM_COVER} from '../src/measuring-and-money.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('measuring-and-money/index.html');

test('ONE page only: the class page, zero per-card URLs, nothing else under /measuring-and-money/',()=>{
 assert.ok(existsSync('dist/measuring-and-money/index.html'),'class page exists');
 assert.equal(readdirSync('dist/measuring-and-money').filter(d=>d!=='index.html').length,0,'zero per-card URLs (the standing no-individual-pages rule)');
 assert.ok(!html.includes('href="'+MM_PATH.slice(0,-1)+'/'+MM_ORDER[0]),'no links to per-card pages');
});

test('the LP counts say forty-three and row 42 follows row 41 with no gap',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(43).keys()].map(i=>i+1),'LP sequence is exactly 1–43');
 assert.ok(lp.includes('<span>42</span>')&&lp.includes('Class 42: <a href="/measuring-and-money/">Measuring &amp; Money</a>'),'the Class 42 row');
});

test('R2 assets: SEO file names kept exactly, the cover is the main image, lazy + dims on every card',()=>{
 for(const c of MM_CARDS)assert.ok(c.file.endsWith('-flashcard-for-kids.webp'),'SEO name kept: '+c.file);
 assert.ok(html.includes(MM_BASE+MM_COVER.file+'" width="'+MM_COVER.w+'" height="'+MM_COVER.h+'"'),'the cover leads as the main image');
 assert.equal((html.match(/loading="lazy"/g)||[]).length,28,'loading="lazy" on all 28 card images');
 assert.ok((html.match(/width="800" height="1132"/g)||[]).length>=28,'width and height on every card image');
 const xml=read('sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/measuring-and-money/</loc>'),'class page in the sitemap');
 assert.ok(xml.includes('<image:loc>'+MM_BASE+MM_COVER.file+'</image:loc>'),'cover in the image sitemap');
});

test('class-page contract: hero + how + five shelves x 28 full tiles, kid voice, links back',()=>{
 assert.ok(html.includes('CLASS 42 \u00b7 MEASURING &amp; MONEY \u00b7 AGES 4\u20135'),'eyebrow');
 assert.ok(html.includes('lesson-hero-cover'),'the cover leads');
 for(const [shelf,n] of [['COUNT &amp; ADD SHELF',7],['MEASURE &amp; COMPARE SHELF',9],['POSITION WORDS SHELF',4],['SORT &amp; MATCH SHELF',4],['SHAPES, FRACTIONS &amp; MONEY SHELF',4]])
  assert.ok(html.includes(shelf+' \u00b7 '+n+' CARDS'),shelf+' honest count');
 assert.equal((html.match(/class="mn-card"/g)||[]).length,28,'28 card tiles on the one page');
 assert.equal((html.match(/data-mn-print/g)||[]).length,28,'a Print button under every card');
 assert.equal((html.match(/download="/g)||[]).length,28,'a Download button under every card');
 for(const c of MM_CARDS){
  const at=html.indexOf(MM_BASE+c.file+'" width="800"');
  assert.ok(at>0,'tile image for '+c.slug);
  const tile=html.slice(at,at+3400);
  for(const pill of ['fc-pill-age','fc-pill-subject','fc-pill-level','fc-pill-skill'])
   assert.ok(tile.includes(pill),pill+' on '+c.slug);
  assert.ok(tile.includes('download="'+c.slug+'.webp"'),'download name on '+c.slug);
  assert.ok(tile.includes('class="mn-tip"'),'description under the image on '+c.slug);
 }
 for(const href of ['/preschool/4-years/numbers-counting-and-early-math/','/preschool/3-years/opposites-and-comparing/','/preschool/4-years/science-nature-and-discovery/','/time-and-daily-routine/','/learning-path/'])
  assert.ok(html.includes('href="'+href+'"'),'class page links back to '+href);
 assert.ok(!/href="\/measuring-and-money\/[a-z0-9-]+\/"/.test(html),'zero per-card links');
 assert.ok(html.includes('YOU can say back')||html.includes('YOU'),'kid-directed copy');
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html),'word-ban holds');
});

test('honest levels + skills: grade pills split 17/6/5, a skill pill on every card',()=>{
 for(const [label,count] of [['Preschool \u00b7 Name it',17],['Grade 1 \u00b7 Do it',6],['Grade 2 \u00b7 Own it',5]])
  assert.equal((html.match(new RegExp('fc-pill-level">'+label,'g'))||[]).length,count,label+' = '+count);
 assert.equal((html.match(/fc-pill-skill">[^<]+</g)||[]).length,28,'28 skill pills');
 assert.equal((html.match(/fc-pill-age">Ages 4–5/g)||[]).length,28,'28 age pills');
});

test('inbound links: Classes 35, 19 and 31 each point here',()=>{
 assert.ok(read('preschool/4-years/numbers-counting-and-early-math/index.html').includes('href="/measuring-and-money/"'),'Class 35 links the class');
 assert.ok(read('preschool/3-years/opposites-and-comparing/index.html').includes('href="/measuring-and-money/"'),'Class 19 links the class');
 assert.ok(read('preschool/4-years/science-nature-and-discovery/index.html').includes('href="/measuring-and-money/"'),'Class 31 links the class');
});

test('discoverable: search kind Class, all-pages directory, sitemap + LP hublink',()=>{
 const idx=JSON.parse(read('assets/search-index.json'));
 const mine=idx.find(x=>x.u===MM_PATH);
 assert.ok(mine&&mine.k==='Class','search carries the class as Class');
 assert.ok(read('all-pages/index.html').includes('href="/measuring-and-money/"'),'listed on /all-pages/');
 const lp=read('learning-path/index.html');
 assert.ok(lp.includes('href="/measuring-and-money/"'),'LP row links the class');
 assert.ok(read('/assets/manners.js')&&html.includes('/assets/manners.js'),'print isolation ships with the class page');
});

test('fresh copy: the 28 descriptions are unique kid-voice lines',()=>{
 const tips=[...html.matchAll(/class="mn-tip">(.*?)<\/figcaption>/g)].map(m=>m[1]);
 assert.equal(tips.length,28,'28 descriptions');
 assert.equal(new Set(tips.map(t=>t.slice(0,60))).size,28,'descriptions are unique');
});
