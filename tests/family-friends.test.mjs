// Class 45 · Family & Friends (/family-and-friends/) — the ONE-PAGE round
// (owner 2026-11-01: "dont make indiviual pages, they are thin to google";
// "learning path is lesson for kids and flashcard library is for parents
// thats it"): the whole 35-card deck lives on the ONE class page and prints
// again from the parents' shelf at /flashcards/family-and-friends/ — zero
// per-card URLs; the 35 word pages of the earlier round are GONE (301s in
// _redirects point them at the class page), the Class 41 one-page
// treatment. Deck probed LIVE on R2 at
// school/learning-path/family-and-friends/flashcards/ (36/36 — 35 cards +
// the cover, all 1414×2000 master JPGs); the JPG masters ride EXACTLY as
// uploaded (no conversion, no re-compression); titles/alts transcribed off
// 2 labeled contact sheets (scripts/ff46-sheets.py). Four shelves; four
// pills per card (Preschool 8 / Grade 1 12 / Grade 2 15); the cover is the
// class page's main image; the whole deck joins the image sitemap on the
// class page AND on the shelf; inbound Classes 38/33/32; LP count
// forty-six → forty-seven.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {FF_PATH,FF_BASE,FF_ORDER,FF_CARDS,FF_COVER,ffBySlug,FF_LIB_SET} from '../src/family-friends.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('family-and-friends/index.html');
const lib=read('flashcards/family-and-friends/index.html');
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

test('the class page exists and carries the WHOLE deck — zero per-card URLs',()=>{
 assert.ok(existsSync('dist/family-and-friends/index.html'),'class page exists');
 const dirs=readdirSync('dist/family-and-friends').filter(d=>d!=='index.html');
 assert.deepEqual(dirs,[],'no child pages under /family-and-friends/ — the one-page rule');
 assert.ok(existsSync('dist/flashcards/family-and-friends/index.html'),'the parents\u2019 shelf exists');
});

test('numbering: Class 45 sits after Class 44 on the LP, the count says forty-eight everywhere',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(48).keys()].map(i=>i+1),'LP sequence is exactly 1–48, no gap');
 assert.ok(lp.includes('<span>45</span>')&&lp.includes('Class 45: <a href="/family-and-friends/">Family &amp; Friends</a>'),'the Class 45 row after row 44');
 assert.ok(lp.includes('forty-eight age-guided classes')&&lp.includes('Forty-eight classes are ready now'),'LP count words say forty-seven');
 assert.ok(!lp.includes('/family-and-friends/mum/'),'the LP row no longer advertises per-person pages');
});

test('R2 assets: master JPG file names kept EXACTLY, the cover leads, every card rides the class page with honest dims + lazy',()=>{
 for(const c of FF_CARDS){
  assert.ok(c.file.endsWith('.jpg'),'master stays JPG: '+c.slug);
  assert.ok(c.file.startsWith(c.slug+'-'),'file rides the card word: '+c.slug);
 }
 assert.ok(html.includes(FF_BASE+FF_COVER.file+'" width="'+FF_COVER.w+'" height="'+FF_COVER.h+'"'),'the cover is the class page\u2019s main image');
 let dimCount=0;
 for(const c of FF_CARDS){
  const img=`src="${FF_BASE}${c.file}" width="1414" height="2000" alt="${esc(c.alt)}" loading="lazy"`;
  assert.ok(html.includes(img),'card image on the class page, exact name + dims + lazy: '+c.slug);
  dimCount++;
 }
 assert.equal(dimCount,35,'every card image rides the class page');
 assert.ok(html.includes('og:image" content="'+FF_BASE+FF_COVER.file),'class og:image is the cover');
});

test('image sitemap: the class page AND the parents\u2019 shelf each carry cover + all 35 masters',()=>{
 const xml=read('sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/family-and-friends/</loc>'),'class page in the sitemap');
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/family-and-friends/</loc>'),'parents\u2019 shelf in the sitemap');
 for(const s of FF_ORDER)assert.ok(!xml.includes('<loc>https://kiddo.school/family-and-friends/'+s+'/</loc>'),'short page gone from the sitemap: '+s);
 const classEntry=xml.split('<loc>https://kiddo.school/family-and-friends/</loc>')[1]?.split('</url>')[0]||'';
 for(const c of [FF_COVER,...FF_CARDS])assert.ok(classEntry.includes('<image:loc>'+FF_BASE+c.file+'</image:loc>'),'class-page image entry: '+c.file);
 const libEntry=xml.split('<loc>https://kiddo.school/flashcards/family-and-friends/</loc>')[1]?.split('</url>')[0]||'';
 for(const c of [FF_COVER,...FF_CARDS])assert.ok(libEntry.includes('<image:loc>'+FF_BASE+c.file+'</image:loc>'),'shelf image entry: '+c.file);
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
 for(const [p,label] of [['/preschool/4-years/feelings-and-kindness/','Class 38'],['/preschool/4-years/community-helpers-and-our-neighborhood/','Class 33'],['/preschool/4-years/life-skills-and-good-habits/','Class 32'],['/learning-path/','the LP'],['/flashcards/family-and-friends/','the parents\u2019 shelf']])
  assert.ok(html.includes('href="'+p+'"'),'links back to '+label);
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html),'word-ban holds');
 assert.ok(!html.includes('your child'),'kid voice on the class page');
 for(const c of FF_CARDS)assert.ok(html.includes(`href="${FF_BASE}${c.file}" download="${c.slug}.jpg"`),'download on the class page: '+c.slug);
 assert.equal((html.match(/data-mn-print/g)||[]).length,35,'a Print button on every card');
});

test('the parents\u2019 shelf: whole deck on ONE page, who-they-are tips, download + print, links back',()=>{
 assert.ok(lib.includes('Family & Friends Flashcards to Print'),'shelf title');
 assert.equal((lib.match(/class="mn-card"/g)||[]).length,35,'35 tiles on the shelf');
 assert.equal((lib.match(/data-mn-print/g)||[]).length,35,'a Print button on every shelf card');
 for(const c of FF_CARDS){
  assert.ok(lib.includes(`href="${FF_BASE}${c.file}" download="${c.slug}.jpg"`),'download on the shelf: '+c.slug);
  assert.ok(lib.includes(esc(c.who).slice(0,60)),'the who-they-are line is the shelf tip: '+c.slug);
 }
 assert.ok(lib.includes('href="'+FF_PATH+'"'),'the shelf links back to the class');
 assert.ok(lib.includes('href="/flashcards/"'),'the shelf links to the library hub');
 assert.ok(lib.includes('data-fc-root'),'the feedback block mounts on the shelf');
 assert.ok(lib.includes('assets/manners.js'),'manners.js ships on the shelf (print contract)');
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(lib),'word-ban on the shelf');
});

test('the say/who/try copy is unique — and no sentence is shared between class and shelf',()=>{
 const says=FF_CARDS.map(c=>c.say),whos=FF_CARDS.map(c=>c.who);
 assert.equal(new Set(says).size,35,'35 unique descriptions');
 assert.equal(new Set(whos).size,35,'35 unique who-they-are lines');
 const alts=FF_CARDS.map(c=>c.alt);
 assert.equal(new Set(alts).size,35,'35 unique alts (Google Images)');
 assert.deepEqual(says.filter(s=>whos.includes(s)),[],'no sentence shared between the class page and the shelf');
});

test('inbound links: Class 38, Class 33 and Class 32 each carry their Class 45 block',()=>{
 assert.ok(read('preschool/4-years/feelings-and-kindness/index.html').includes('href="/family-and-friends/"'),'Class 38 points here');
 assert.ok(read('preschool/4-years/community-helpers-and-our-neighborhood/index.html').includes('href="/family-and-friends/"'),'Class 33 points here');
 assert.ok(read('preschool/4-years/life-skills-and-good-habits/index.html').includes('href="/family-and-friends/"'),'Class 32 points here');
});

test('the redirects: removed word pages 301 to the class page',()=>{
 const red=readFileSync('public/_redirects','utf8');
 for(const s of FF_ORDER){
  assert.ok(red.includes('/family-and-friends/'+s+' /family-and-friends/ 301'),'removed word 301 (no slash): '+s);
  assert.ok(red.includes('/family-and-friends/'+s+'/ /family-and-friends/ 301'),'removed word 301 (slash): '+s);
 }
});

test('discoverable: search kind Class, all-pages room, manners.js on class + shelf',()=>{
 const search=JSON.parse(read('assets/search-index.json'));
 const cls=search.filter(x=>x.u.startsWith('/family-and-friends/'));
 assert.equal(cls.length,1,'exactly one search entry — the class page');
 assert.ok(cls[0].k==='Class','kind Class');
 const fl=search.filter(x=>x.u==='/flashcards/family-and-friends/');
 assert.equal(fl.length,1,'the shelf is in search as Flashcards');
 const ap=read('all-pages/index.html');
 assert.ok(ap.includes('href="/family-and-friends/"'),'all-pages registers the room');
 assert.ok(read('family-and-friends/index.html').includes('assets/manners.js'),'manners.js ships on the class page');
 assert.ok(lib.includes('assets/manners.js'),'manners.js ships on the shelf');
});
