// Class 46 · Early Addition & Subtraction (/early-addition-and-subtraction/)
// — the ONE-PAGE round (owner 2026-11-01: "dont make indiviual pages, they
// are thin to google"; "learning path is lesson for kids and flashcard
// library is for parents thats it"): the whole 30-sum deck lives on the ONE
// class page (the 10 − 3 tile shows BOTH uploaded artworks) and prints
// again from the parents' shelf at
// /flashcards/early-addition-and-subtraction/ — zero per-card URLs; the 30
// sum pages of the earlier round are GONE (301s in _redirects point them at
// the class page), the Class 41 one-page treatment. Deck probed LIVE on R2
// at school/learning-path/early-addition-and-subtraction/flashcards/
// (32/32 — 31 card files + the cover, all 1414×2000 master JPGs); the JPG
// masters ride EXACTLY as uploaded (no conversion, no re-compression);
// titles/alts transcribed off 2 labeled contact sheets (scripts/eas-sheets.py).
// Two shelves (addition 16 / subtraction 14); four pills per card
// (Preschool 6 / Grade 1 12 / Grade 2 12); every answer left blank; inbound
// Classes 35/42/30; LP count forty-six → forty-seven.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {EAS_PATH,EAS_BASE,EAS_ORDER,EAS_CARDS,EAS_COVER,easBySlug,EAS_LIB_SET} from '../src/early-addition.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const html=read('early-addition-and-subtraction/index.html');
const lib=read('flashcards/early-addition-and-subtraction/index.html');
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const pair=EAS_CARDS.find(c=>c.slug==='10-minus-3');

test('the class page exists and carries the WHOLE deck — zero per-card URLs',()=>{
 assert.ok(existsSync('dist/early-addition-and-subtraction/index.html'),'class page exists');
 const dirs=readdirSync('dist/early-addition-and-subtraction').filter(d=>d!=='index.html');
 assert.deepEqual(dirs,[],'no child pages under the class path — the one-page rule');
 assert.ok(existsSync('dist/flashcards/early-addition-and-subtraction/index.html'),'the parents\u2019 shelf exists');
});

test('numbering: Class 46 sits after Class 45 on the LP, the count says forty-nine everywhere',()=>{
 const lp=read('learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(49).keys()].map(i=>i+1),'LP sequence is exactly 1–49, no gap');
 assert.ok(lp.includes('<span>46</span>')&&lp.includes('Class 46: <a href="/early-addition-and-subtraction/">Early Addition &amp; Subtraction</a>'),'the Class 46 row after row 45');
 assert.ok(lp.includes('forty-nine age-guided classes')&&lp.includes('Forty-nine classes are ready now'),'LP count words say forty-seven');
 assert.ok(!lp.includes('/early-addition-and-subtraction/1-plus-2/'),'the LP row no longer advertises per-sum pages');
});

test('R2 assets: master JPG file names kept EXACTLY, the cover leads, every sum rides the class page with honest dims + lazy',()=>{
 for(const c of EAS_CARDS){
  assert.ok(c.file.endsWith('.jpg'),'master stays JPG: '+c.slug);
  assert.ok(c.file.startsWith(c.slug+'-'),'file rides the sum: '+c.slug);
 }
 assert.ok(html.includes(EAS_BASE+EAS_COVER.file+'" width="'+EAS_COVER.w+'" height="'+EAS_COVER.h+'"'),'the cover is the class page\u2019s main image');
 let dimCount=0;
 for(const c of EAS_CARDS){
  const img=`src="${EAS_BASE}${c.file}" width="1414" height="2000" alt="${esc(c.alt)}" loading="lazy"`;
  assert.ok(html.includes(img),'card image on the class page, exact name + dims + lazy: '+c.slug);
  dimCount++;
 }
 assert.equal(dimCount,30,'every sum image rides the class page');
 assert.ok(html.includes('og:image" content="'+EAS_BASE+EAS_COVER.file),'class og:image is the cover');
});

test('the 10-minus-3 pair: BOTH artworks ride the class tile and both join the image sitemap',()=>{
 assert.ok(pair.file2==='10-minus-3-subtraction-flashcard-for-kids-2.jpg','the second artwork is on the card data');
 assert.ok(html.includes(`src="${EAS_BASE}${pair.file2}" width="1414" height="2000" alt="${esc(pair.alt2)}" loading="lazy"`),'the second drawing renders on the class tile');
 assert.ok(html.includes(`href="${EAS_BASE}${pair.file2}" download="10-minus-3-2.jpg"`),'the second drawing has its own download button');
 const xml=read('sitemap.xml');
 const classEntry=xml.split('<loc>https://kiddo.school/early-addition-and-subtraction/</loc>')[1]?.split('</url>')[0]||'';
 assert.ok(classEntry.includes('<image:loc>'+EAS_BASE+pair.file+'</image:loc>'),'first master in the class image entry');
 assert.ok(classEntry.includes('<image:loc>'+EAS_BASE+pair.file2+'</image:loc>'),'second master in the class image entry');
 const libEntry=xml.split('<loc>https://kiddo.school/flashcards/early-addition-and-subtraction/</loc>')[1]?.split('</url>')[0]||'';
 assert.ok(libEntry.includes('<image:loc>'+EAS_BASE+pair.file2+'</image:loc>'),'second master on the shelf entry too');
});

test('image sitemap: the class page AND the parents\u2019 shelf each carry cover + all 31 masters',()=>{
 const xml=read('sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/early-addition-and-subtraction/</loc>'),'class page in the sitemap');
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/early-addition-and-subtraction/</loc>'),'parents\u2019 shelf in the sitemap');
 for(const s of EAS_ORDER)assert.ok(!xml.includes('<loc>https://kiddo.school/early-addition-and-subtraction/'+s+'/</loc>'),'short page gone from the sitemap: '+s);
 const classEntry=xml.split('<loc>https://kiddo.school/early-addition-and-subtraction/</loc>')[1]?.split('</url>')[0]||'';
 const files=[EAS_COVER.file,...EAS_CARDS.flatMap(c=>[c.file,...(c.file2?[c.file2]:[])])];
 assert.equal(files.length,32,'cover + 31 masters');
 for(const f of files)assert.ok(classEntry.includes('<image:loc>'+EAS_BASE+f+'</image:loc>'),'class-page image entry: '+f);
});

test('class-page contract: eyebrow CLASS 46, two shelves x 30 tiles x four pills, the answer never printed, links back',()=>{
 assert.ok(html.includes('CLASS 46 \u00b7 EARLY ADDITION &amp; SUBTRACTION \u00b7 AGES 4\u20135'),'eyebrow');
 for(const [shelf,n] of [['ADDITION SHELF',16],['SUBTRACTION SHELF',14]])
  assert.ok(html.includes(shelf+' \u00b7 '+n+' CARDS'),'shelf honest count: '+shelf);
 assert.equal((html.match(/class="mn-card"/g)||[]).length,30,'30 card tiles on the class page');
 assert.equal((html.match(/fc-pill fc-pill-age/g)||[]).length,30,'an age pill on every card');
 assert.equal((html.match(/fc-pill fc-pill-level/g)||[]).length,30,'a level pill on every card');
 const levels=html.match(/Preschool \u00b7 Name it|Grade 1 \u00b7 Do it|Grade 2 \u00b7 Own it/g)||[];
 const n1=levels.filter(x=>x.startsWith('Preschool')).length,n2=levels.filter(x=>x.startsWith('Grade 1')).length,n3=levels.filter(x=>x.startsWith('Grade 2')).length;
 assert.deepEqual([n1,n2,n3],[6,12,12],'grade split 6/12/12');
 for(const [p,label] of [['/preschool/4-years/numbers-counting-and-early-math/','Class 35'],['/measuring-and-money/','Class 42'],['/preschool/4-years/logic-thinking-and-problem-solving/','Class 30'],['/learning-path/','the LP'],['/flashcards/early-addition-and-subtraction/','the parents\u2019 shelf']])
  assert.ok(html.includes('href="'+p+'"'),'links back to '+label);
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(html),'word-ban holds');
 assert.ok(!html.includes('your child'),'kid voice on the class page');
 for(const c of EAS_CARDS)assert.ok(html.includes(`href="${EAS_BASE}${c.file}" download="${c.slug}.jpg"`),'download on the class page: '+c.slug);
 assert.equal((html.match(/data-mn-print/g)||[]).length,30,'a Print button on every card');
 // the copy never spoils the answer: no "= 3" style reveals for any sum
 for(const c of EAS_CARDS){
  const answer=c.sum.split(/\s*[+\-]\s*/)[1].trim();
  assert.ok(!esc(c.say).includes('= '+answer),'the say line never prints the answer: '+c.slug);
 }
});

test('the parents\u2019 shelf: whole deck on ONE page, try-it tips, download + print, links back',()=>{
 assert.ok(lib.includes('Early Addition & Subtraction Flashcards to Print'),'shelf title');
 assert.equal((lib.match(/class="mn-card"/g)||[]).length,30,'30 tiles on the shelf');
 assert.equal((lib.match(/data-mn-print/g)||[]).length,30,'a Print button on every shelf card');
 for(const c of EAS_CARDS){
  assert.ok(lib.includes(`href="${EAS_BASE}${c.file}" download="${c.slug}.jpg"`),'download on the shelf: '+c.slug);
  assert.ok(lib.includes(esc(c.try).slice(0,60)),'the try-it job is the shelf tip: '+c.slug);
 }
 assert.ok(lib.includes(`src="${EAS_BASE}${pair.file2}"`),'the second 10 − 3 drawing prints from the shelf too');
 assert.ok(lib.includes('href="'+EAS_PATH+'"'),'the shelf links back to the class');
 assert.ok(lib.includes('href="/flashcards/"'),'the shelf links to the library hub');
 assert.ok(lib.includes('data-fc-root'),'the feedback block mounts on the shelf');
 assert.ok(lib.includes('assets/manners.js'),'manners.js ships on the shelf (print contract)');
 assert.ok(!/no sign up|no paywall|free to use|no account|free forever/i.test(lib),'word-ban on the shelf');
});

test('the say/try copy is unique — and no sentence is shared between class and shelf',()=>{
 const says=EAS_CARDS.map(c=>c.say),tries=EAS_CARDS.map(c=>c.try);
 assert.equal(new Set(says).size,30,'30 unique descriptions');
 assert.equal(new Set(tries).size,30,'30 unique try-its');
 const alts=EAS_CARDS.map(c=>c.alt);
 assert.equal(new Set(alts).size,30,'30 unique alts (Google Images)');
 assert.deepEqual(says.filter(s=>tries.includes(s)),[],'no sentence shared between the class page and the shelf');
});

test('inbound links: Class 35, Class 42 and Class 30 each carry their Class 46 block',()=>{
 assert.ok(read('preschool/4-years/numbers-counting-and-early-math/index.html').includes('href="/early-addition-and-subtraction/"'),'Class 35 points here');
 assert.ok(read('measuring-and-money/index.html').includes('href="/early-addition-and-subtraction/"'),'Class 42 points here');
 assert.ok(read('preschool/4-years/logic-thinking-and-problem-solving/index.html').includes('href="/early-addition-and-subtraction/"'),'Class 30 points here');
});

test('the redirects: removed sum pages 301 to the class page',()=>{
 const red=readFileSync('public/_redirects','utf8');
 for(const s of EAS_ORDER){
  assert.ok(red.includes('/early-addition-and-subtraction/'+s+' /early-addition-and-subtraction/ 301'),'removed sum 301 (no slash): '+s);
  assert.ok(red.includes('/early-addition-and-subtraction/'+s+'/ /early-addition-and-subtraction/ 301'),'removed sum 301 (slash): '+s);
 }
});

test('discoverable: search kind Class, all-pages room, manners.js on class + shelf',()=>{
 const search=JSON.parse(read('assets/search-index.json'));
 const cls=search.filter(x=>x.u.startsWith('/early-addition-and-subtraction/'));
 assert.equal(cls.length,1,'exactly one search entry — the class page');
 assert.ok(cls[0].k==='Class','kind Class');
 const fl=search.filter(x=>x.u==='/flashcards/early-addition-and-subtraction/');
 assert.equal(fl.length,1,'the shelf is in search as Flashcards');
 const ap=read('all-pages/index.html');
 assert.ok(ap.includes('href="/early-addition-and-subtraction/"'),'all-pages registers the room');
 assert.ok(read('early-addition-and-subtraction/index.html').includes('assets/manners.js'),'manners.js ships on the class page');
 assert.ok(lib.includes('assets/manners.js'),'manners.js ships on the shelf');
});
