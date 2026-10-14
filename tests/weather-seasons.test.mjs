// Class 34 · Weather, Seasons & What We Wear — the regression suite.
// Locks what the owner ordered:
//  - exactly 29 flashcards (not 30) from the owner's verified R2 upload,
//    cover.webp excluded and never counted;
//  - 29 Learning Path /learn/ lessons: original artwork left with the DRAWING
//    CANVAS + tools (owner law: the Learning Path is where children learn AND
//    practise), unique step-by-step teaching right, honest weather safety;
//  - 29 library card pages + collection: PAPER for parents (download, print,
//    share, no canvas);
//  - the class hub is a compact classroom: LEARN WITH FLASHCARDS nav + ONE
//    collection link, and an honest "worksheets not yet" note (no invented
//    worksheets, no flashcard image reused as one);
//  - whole-school wiring: class page, LP row 34, count words thirty-five,
//    flashcards hub, sitemap and search.
import {readFileSync,existsSync} from 'node:fs';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lesson} from '../src/flashcards/data-weather-seasons.mjs';
import {meta,cards} from '../src/flashcards/data-weather-seasons.mjs';
import {lpContent} from '../src/flashcards/lp-weather-seasons.mjs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {LP_REGISTRY,lpSetBySlug} from '../src/flashcards/lp-lessons.mjs';

const CLASS='/preschool/4-years/weather-seasons-and-what-we-wear/';
const SET_URL='/flashcards/weather-seasons-and-what-we-wear/';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read=p=>readFileSync('dist'+p,'utf8');
const pageFile=p=>readFileSync('dist'+p+'index.html','utf8');

test('data: exactly 29 weather cards from the owner’s verified R2 upload, cover excluded, true dims',()=>{
 const FILES=['autumn','clouds','cloudy-day','cold-weather','cool-weather','foggy-day','hot-weather','rain-boots','rain','rainbow','raincoat','rainy-day','scarf-and-gloves','snow','snowy-day','spring','stormy-day','summer','sun-hat','sun','sunglasses','sunny-day','umbrella','warm-weather','weather-forecast','wind','windy-day','winter-coat','winter'].sort();
 const slugs=lesson.cards.map(c=>c.file.replace(/\.webp$/,'')).sort();
 assert.deepEqual(slugs,FILES,'the 29 cards are EXACTLY the owner’s upload — nothing invented, nothing missing');
 assert.equal(lesson.cards.length,29,'29 cards, not 30 — the owner confirmed the count');
 assert.ok(!slugs.includes('cover'),'cover.webp is never counted as a card');
 assert.equal(lesson.r2Base,'https://assets.kiddo.school/school/preschool/4-years/weather-seasons-and-what-we-wear/','R2 base is the owner’s class folder');
 assert.equal(lesson.cover.w,1414,'cover width (probed on R2)');
 assert.equal(lesson.cover.h,2000,'cover height (probed on R2)');
 for(const c of lesson.cards){
  assert.equal(c.w,1414,c.file+' width (probed on R2)');
  assert.equal(c.h,2000,c.file+' height (probed on R2)');
  assert.ok(c.alt.length>60,c.file+' carries a real artwork alt');
 }
 assert.equal(Object.keys(cards).length,29,'29 library card contents');
 assert.equal(Object.keys(lpContent).length,29,'29 Learning Path lessons');
 assert.deepEqual(Object.keys(lpContent).sort(),slugs,'lesson slugs match the real filenames');
 assert.deepEqual(Object.keys(cards).sort(),slugs,'library slugs match the real filenames');
 assert.equal(meta.slug,'weather-seasons-and-what-we-wear');
});

test('the 29 library card pages are PAPER: download, print, share, parent content, NO canvas',()=>{
 const seenT=new Set(),seenD=new Set();
 for(const slug of Object.keys(cards)){
  const p=SET_URL+slug+'/';
  assert.ok(existsSync('dist'+p+'index.html'),'library page built: '+p);
  const h=pageFile(p);
  const c=cards[slug];
  assert.ok(h.includes(`src="${lesson.r2Base}${slug}.webp"`),'original artwork shown on '+slug);
  for(const bad of ['data-wc','wc-mount','wc-canvas','wc-toolbar','Save my work','pencil case'])
   assert.ok(!h.includes(bad),bad+' must not appear on paper library page '+slug);
  assert.ok(h.includes('download="'+slug+'.webp"'),'download button serves the original WebP on '+slug);
  assert.ok(h.includes('data-tc-print'),'print button on '+slug);
  assert.ok(h.includes('fc2-share'),'share buttons on '+slug);
  assert.ok(h.includes(esc(c.intro)),'what-it-is copy on '+slug);
  assert.ok(h.includes('What this card is for'),'helps block on '+slug);
  assert.ok(h.includes('A quick weather game'),'weather-game block on '+slug);
  assert.ok(h.includes('Tip of the day'),'tip block on '+slug);
  for(const gone of ['<h2>Say it together</h2>','<h2>Try this</h2>','<h2>Quick parent note</h2>','<h2>What is fog'])
   assert.ok(!h.includes(gone),gone+' must not duplicate the lesson on '+slug);
  assert.ok(h.includes('flashcard to download and print'),'print-focused description used on '+slug);
  assert.ok(!h.includes('aggregateRating'),'no fabricated ratings on '+slug);
  seenT.add(c.metaDescription);
 }
 assert.equal(seenT.size,29,'every library page has a unique description');
});

test('the collection page lists all 29 cards whole, no downloads in the grid, cover fronts the wall',()=>{
 assert.ok(existsSync('dist'+SET_URL+'index.html'),'collection built');
 const h=pageFile(SET_URL);
 const whole=(h.match(/class="fc-card fc2-cardlink" href="/g)||[]).length;
 assert.equal(whole,29,'29 whole-card links on the collection');
 assert.ok(h.includes(lesson.r2Base+'cover.webp'),'the original cover fronts the set');
 assert.ok(!h.includes('aggregateRating'),'no fabricated ratings on the collection');
 for(const slug of Object.keys(cards))assert.ok(h.includes(SET_URL+slug+'/'),'collection links '+slug);
});

test('all 29 Learning Path lessons exist: flashcard + drawing canvas left, teaching right',()=>{
 const seenT=new Set(),seenD=new Set();
 for(const slug of Object.keys(lpContent)){
  const p=CLASS+'learn/'+slug+'/';
  assert.ok(existsSync('dist'+p+'index.html'),'lesson built: '+p);
  const h=pageFile(p);
  const l=lpContent[slug];
  assert.ok(h.includes(`data-wc data-wc-src="${lesson.r2Base}${slug}.webp?draw=1"`),'drawing canvas over the original flashcard on '+slug);
  assert.ok(h.includes('crossorigin="anonymous"'),'CORS-safe image on '+slug);
  assert.ok(h.includes(`data-wc-restore="learn/weather-seasons-and-what-we-wear/${slug}"`),'per-child save & restore on '+slug);
  assert.ok(h.includes('data-wc-name='),'named drawing layer on '+slug);
  assert.ok(h.includes('width="1414" height="2000"'),'aspect ratio preserved on '+slug);
  assert.ok(h.includes('LEARNING PATH LESSON'),'lesson eyebrow on '+slug);
  for(const f of ['What is this?','What does it mean?','What does the child need to know?','Why this matters','What it teaches','Step by step','Say this to your child','Look closer at the picture','Ask your child','Try it together','Understanding check','Parent tips'])
   assert.ok(h.includes(f),`"${f}" block on ${slug}`);
  assert.ok(h.includes('Words to learn'),'vocab chips on '+slug);
  assert.ok(h.includes('rel="prev"')&&h.includes('rel="next"'),'prev/next on '+slug);
  assert.ok(h.includes(`href="${SET_URL}${slug}/"`),'exactly the one library cross-link on '+slug);
  assert.ok(!h.includes('fc2-cardlink'),'no flashcard grid on '+slug);
  seenT.add(l.seoTitle); seenD.add(l.metaDescription);
 }
 assert.equal(seenT.size,29,'unique SEO title per lesson');
 assert.equal(seenD.size,29,'unique meta description per lesson');
});

test('weather safety is age-honest: no scare tactics, no fake promises, sun rule present',()=>{
 const sun=pageFile(CLASS+'learn/sun/');
 assert.ok(/never/i.test(sun)&&/sun/i.test(sun),'the sun lesson carries the never-stare rule');
 for(const slug of Object.keys(lpContent)){
  const h=pageFile(CLASS+'learn/'+slug+'/');
  assert.ok(!/never hurt|never painful|doctors don't hurt/i.test(h),'no false comfort claims on '+slug);
  assert.ok(h.includes('Staying safe')||lpContent[slug].safety===undefined,'safety block where authored on '+slug);
 }
 const storm=lpContent['stormy-day'];
 assert.ok(storm&&storm.safety&&storm.safety.length>40,'stormy-day carries real safety guidance');
});

test('the Class 34 hub is a compact classroom: LEARN WITH FLASHCARDS nav + ONE collection link + honest worksheets note',()=>{
 assert.ok(existsSync('dist'+CLASS+'index.html'),'class page built');
 const hub=read(CLASS+'index.html');
 const learnLinks=[...hub.matchAll(/href="\/preschool\/4-years\/weather-seasons-and-what-we-wear\/learn\/([a-z-]+)\/"/g)].map(m=>m[1]);
 assert.equal(new Set(learnLinks).size,29,'29 unique lesson links on the hub');
 assert.ok(hub.includes('<a class="button" href="/flashcards/weather-seasons-and-what-we-wear/">'),'the resource section links the collection once');
 assert.ok(hub.includes('LEARN WITH FLASHCARDS'),'the learn section is labelled for children');
 // Owner doctrine 2026-10-12: 29 PICTURE tiles, each opening its own lesson —
 // no per-image description text on the listing.
 assert.equal((hub.match(/class="lp-tile"/g)||[]).length,29,'29 image tiles in the LEARN grid');
 assert.ok(!hub.includes('fc2-relcard fcl-nav'),'no text-description lesson cards on the hub');
 const wsTiles=[...hub.matchAll(/<a class="lp-tile" href="\/preschool\/4-years\/weather-seasons-and-what-we-wear\/learn\/([a-z-]+)\/"><img src="([^"]+)"/g)];
 assert.equal(wsTiles.length,29,'every lesson tile carries its original flashcard image');
 assert.ok(wsTiles.every(([,slug,src])=>src.includes('weather-seasons-and-what-we-wear/'+slug+'.webp')),'tile images are the original R2 artwork');
 assert.ok(hub.includes('PRACTISE WITH WORKSHEETS'),'the 35 genuine weather worksheets render their practice section');
 assert.ok(!hub.includes('Worksheets are on the way'),'no stale waiting note: the artwork has arrived');
 assert.ok(hub.includes('/worksheets/weather-seasons-and-what-we-wear/'),'library collection linked from the hub');
 assert.equal([...hub.matchAll(/data-wxws-card="([a-z-]+)"/g)].length,35,'35 worksheet tiles on the hub');
 assert.ok(!hub.includes('data-wc'),'no canvas on the hub');
 assert.ok(hub.includes('cover.webp'),'the original collection cover appears as the resource art');
 assert.equal((hub.match(/<h1>/g)||[]).length,1,'exactly one h1');
});

test('all 35 Class 34 worksheet pages exist (genuine artwork, two pages per sheet)',()=>{
 assert.ok(existsSync('dist'+CLASS+'worksheets'),'activity folder under the class');
 assert.ok(existsSync('dist/worksheets/weather-seasons-and-what-we-wear'),'printable library for Class 34');
 const lib=read('/worksheets/weather-seasons-and-what-we-wear/index.html');
 assert.ok(lib.includes('Weather'),'collection page renders');
 assert.equal([...lib.matchAll(/class="ws-card"/g)].length,35,'35 cards on the collection page');
 for(const slug of ['cloud-types','shadows','thermometer-temperature','thunderstorm-safety']){
  const act=read('/preschool/4-years/weather-seasons-and-what-we-wear/worksheets/'+slug+'/index.html');
  assert.ok(act.includes('data-wc-src=')&&act.includes('weather-seasons-and-what-we-wear/worksheets/'+slug+'-worksheet.webp?draw=1'),'canvas on '+slug+' activity');
  const pr=read('/worksheets/weather-seasons-and-what-we-wear/'+slug+'/index.html');
  assert.ok(pr.includes('data-wxws-download=')&&pr.includes('data-wxws-print'),'download+print on '+slug+' printable');
  assert.ok(!pr.includes('data-wc-src='),'no canvas on the '+slug+' printable');
 }
});

test('whole-school wiring: LP row 34, stage card, flashcards hub, count words thirty-five',()=>{
 const lp=read('/learning-path/index.html');
 assert.ok(lp.includes('Class 34: <a href="/preschool/4-years/weather-seasons-and-what-we-wear/">'),'LP row 34 present');
 assert.ok(lp.includes('thirty-five age-guided classes'),'LP title count');
 assert.ok(lp.includes('Thirty-five classes are ready now'),'LP intro count');
 assert.ok(read('/index.html').includes('Thirty-five classes are ready now'),'homepage count');
 assert.ok(read('/about/index.html').includes('Thirty-five classes from birth to age five are ready today'),'About count');
 const hub4=read('/preschool/4-years/index.html');
 assert.ok(hub4.includes('/preschool/4-years/weather-seasons-and-what-we-wear/'),'Age 4 stage card links Class 34');
 assert.ok(hub4.includes('Class 34'),'Class 34 chip on the stage hub');
 const fcHub=read('/flashcards/index.html');
 assert.ok(fcHub.includes(SET_URL),'flashcards hub lists the set');
 assert.ok(fcHub.includes('twenty-nine weather-and-clothes cards'),'hub copy names the weather cards');
 const reg=lpSetBySlug['weather-seasons-and-what-we-wear'];
 assert.ok(reg,'the set is in the shared LP_REGISTRY');
});

test('sitemap and search carry the new pages; the registry drives 60 new URLs',()=>{
 const xml=read('/sitemap.xml');
 assert.ok(xml.includes(`<loc>https://kiddo.school${CLASS}</loc>`),'class page in sitemap');
 assert.ok(xml.includes(`<loc>https://kiddo.school${CLASS}learn/sun/</loc>`),'sun lesson in sitemap');
 assert.ok(xml.includes(`<loc>https://kiddo.school${SET_URL}umbrella/</loc>`),'umbrella card in sitemap');
 assert.ok(xml.includes(`<loc>https://kiddo.school${SET_URL}</loc>`),'collection in sitemap');
 let n=0; for(const slug of Object.keys(lpContent))if(xml.includes(CLASS+'learn/'+slug+'/'))n++;
 assert.equal(n,29,'all 29 lessons in the sitemap');
 n=0; for(const slug of Object.keys(cards))if(xml.includes(SET_URL+slug+'/'))n++;
 assert.equal(n,29,'all 29 library cards in the sitemap');
 const search=read('/search/index.html')+read('/assets/search-index.json');
 assert.ok(search.includes('Weather, Seasons & What We Wear'),'search knows the set');
 assert.ok(search.includes(CLASS+'learn/'),'search knows the lessons');
});
