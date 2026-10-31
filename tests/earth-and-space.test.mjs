// Class 43 · Our Earth & Space (/earth-and-space/) — the owner's brief
// (2026-10-31): the next class after Class 42 on the Learning Path; Class 42
// was probed LIVE on production (HTTP 200) before the number 43 was assigned.
// ONE page only (standing owner rule "remember no indiviual pages") — the
// whole 24-card deck lives on the class page with age/subject/level/skill
// pills, kid-voice descriptions under every image and Download + Print
// buttons; the cover file is the main image; SEO file names kept exactly;
// loading="lazy" + width/height on the card images; link from Classes 31/34/41
// and Science at a Glance and back; LP count forty-two → forty-three; the
// magic-games labels fixed (Class 3→17, Class 6→20). Deck probed LIVE on R2
// at school/learning-path/our-earth-and-space/flashcards/ (25/25 incl. cover,
// 800×1132, 15–27 kB); the owner's our-earth-and-space-image-seo.csv was not
// present anywhere reachable (13 R2 paths probed, all 404), so slugs ride the
// file names and titles/alts were transcribed off 6 labeled contact sheets.
// Level pills name school grades (owner: "levels are grade 1, grade 2,
// preschool") — Preschool 8 / Grade 1 9 / Grade 2 7.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {ES_PATH,ES_BASE,ES_ORDER,ES_CARDS,ES_COVER} from '../src/earth-and-space.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('earth-and-space/index.html');

test('ONE page only: the class page, zero per-card URLs, nothing else under /earth-and-space/',()=>{
 assert.ok(existsSync('dist/earth-and-space/index.html'),'class page exists');
 assert.equal(readdirSync('dist/earth-and-space').filter(d=>d!=='index.html').length,0,'zero per-card URLs (the standing no-individual-pages rule)');
 assert.ok(!html.includes('href="'+ES_PATH.slice(0,-1)+'/'+ES_ORDER[0]),'no links to per-card pages');
});

test('the LP counts say forty-three and row 43 follows row 42 with no gap',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(43).keys()].map(i=>i+1),'LP sequence is exactly 1–43');
 assert.ok(lp.includes('<span>43</span>')&&lp.includes('Class 43: <a href="/earth-and-space/">Our Earth &amp; Space</a>'),'the Class 43 row');
 assert.ok(lp.includes('forty-three age-guided classes')&&lp.includes('Forty-three classes are ready now'),'LP count words say forty-three');
});

test('R2 assets: SEO file names kept exactly, the cover is the main image, lazy + dims on every card',()=>{
 for(const c of ES_CARDS)assert.ok(c.file.endsWith('-flashcard-for-kids.webp'),'SEO name kept: '+c.file);
 assert.ok(html.includes(ES_BASE+ES_COVER.file+'" width="'+ES_COVER.w+'" height="'+ES_COVER.h+'"'),'the cover leads as the main image');
 assert.equal((html.match(/loading="lazy"/g)||[]).length,24,'loading="lazy" on all 24 card images');
 assert.ok((html.match(/width="800" height="1132"/g)||[]).length>=25,'width and height on every card image');
 const xml=read('sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/earth-and-space/</loc>'),'class page in the sitemap');
 assert.ok(xml.includes('<image:loc>'+ES_BASE+ES_COVER.file+'</image:loc>'),'cover in the image sitemap');
});

test('class-page contract: hero + how + six shelves x 24 full tiles, kid voice, links back',()=>{
 assert.ok(html.includes('CLASS 43 \u00b7 OUR EARTH &amp; SPACE \u00b7 AGES 4\u20135'),'eyebrow');
 assert.ok(html.includes('lesson-hero-cover'),'the cover leads');
 for(const [shelf,n] of [['MY BLUE PLANET SHELF',4],['SUN\u2019S FAMILY SHELF',5],['SPINNING DAY SHELF',4],['WEATHER &amp; WORLD SHELF',4],['ROCKETS &amp; ASTRONAUTS SHELF',4],['STARS &amp; FAR SPACE SHELF',3]])
  assert.ok(html.includes(shelf+' \u00b7 '+n+' CARDS'),shelf+' honest count');
 assert.equal((html.match(/class="mn-card"/g)||[]).length,24,'24 card tiles on the one page');
 assert.equal((html.match(/data-mn-print/g)||[]).length,24,'a Print button under every card');
 assert.equal((html.match(/download="/g)||[]).length,24,'a Download button under every card');
 for(const c of ES_CARDS){
  const at=html.indexOf(ES_BASE+c.file+'" width="800"');
  assert.ok(at>0,'tile image for '+c.slug);
  const tile=html.slice(at,at+3400);
  for(const pill of ['fc-pill-age','fc-pill-subject','fc-pill-level','fc-pill-skill'])
   assert.ok(tile.includes(pill),pill+' on '+c.slug);
  assert.ok(tile.includes('download="'+c.slug+'.webp"'),'download name on '+c.slug);
  assert.ok(tile.includes('class="mn-tip"'),'description under the image on '+c.slug);
 }
 for(const href of ['/preschool/4-years/science-nature-and-discovery/','/preschool/4-years/weather-seasons-and-what-we-wear/','/time-and-daily-routine/','/science-at-a-glance/','/learning-path/'])
  assert.ok(html.includes('href="'+href+'"'),'class page links back to '+href);
 assert.ok(!/href="\/earth-and-space\/[a-z0-9-]+\/"/.test(html),'zero per-card links');
 assert.ok(html.includes('YOU'),'kid-directed copy');
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html),'word-ban holds');
});

test('honest levels + skills: grade pills split 8/9/7, a skill pill on every card',()=>{
 for(const [label,count] of [['Preschool \u00b7 Name it',8],['Grade 1 \u00b7 Do it',9],['Grade 2 \u00b7 Own it',7]])
  assert.equal((html.match(new RegExp('fc-pill-level">'+label,'g'))||[]).length,count,label+' = '+count);
 assert.equal((html.match(/fc-pill-skill">[^<]+</g)||[]).length,24,'24 skill pills');
 assert.equal((html.match(/fc-pill-age">Ages 4–5/g)||[]).length,24,'24 age pills');
});

test('inbound links: Classes 31, 34, 41 and Science at a Glance each point here',()=>{
 assert.ok(read('preschool/4-years/science-nature-and-discovery/index.html').includes('href="/earth-and-space/"'),'Class 31 links the class');
 assert.ok(read('preschool/4-years/weather-seasons-and-what-we-wear/index.html').includes('href="/earth-and-space/"'),'Class 34 links the class');
 assert.ok(read('time-and-daily-routine/index.html').includes('href="/earth-and-space/"'),'Class 41 links the class');
 assert.ok(read('science-at-a-glance/index.html').includes('href="/earth-and-space/"'),'Science at a Glance links the class');
});

test('discoverable: search kind Class, all-pages directory, sitemap + LP hublink',()=>{
 const idx=JSON.parse(read('assets/search-index.json'));
 const mine=idx.find(x=>x.u===ES_PATH);
 assert.ok(mine&&mine.k==='Class','search carries the class as Class');
 assert.ok(read('all-pages/index.html').includes('href="/earth-and-space/"'),'listed on /all-pages/');
 const lp=read('learning-path/index.html');
 assert.ok(lp.includes('href="/earth-and-space/"'),'LP row links the class');
 assert.ok(readFileSync('dist/assets/manners.js','utf8')&&html.includes('/assets/manners.js'),'print isolation ships with the class page');
});

test('fresh copy: the 24 descriptions are unique kid-voice lines',()=>{
 const tips=[...html.matchAll(/class="mn-tip">(.*?)<\/figcaption>/g)].map(m=>m[1]);
 assert.equal(tips.length,24,'24 descriptions');
 assert.equal(new Set(tips.map(t=>t.slice(0,60))).size,24,'descriptions are unique');
});

test('magic games labels: the Age 3 hub says Class 17 and Class 20, never Class 3 or Class 6',()=>{
 const hub=read('preschool/3-years/index.html');
 assert.ok(hub.includes('Plays with Class 17: Shapes &amp; Patterns'),'Magic Shapes wired to Class 17');
 assert.ok(hub.includes('Plays with Class 20: Animals &amp; Their Sounds'),'Animal Sound Safari wired to Class 20');
 assert.ok(!hub.includes('Plays with Class 3:'),'no stale Class 3 label');
 assert.ok(!hub.includes('Plays with Class 6:'),'no stale Class 6 label');
});
