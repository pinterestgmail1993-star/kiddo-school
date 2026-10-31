// Class 41 · Time & Daily Routine (/time-and-daily-routine/) — the owner's
// 41 time-and-routine cards, reworked ONE-PAGE (owner correction 2026-10-31:
// "dont make indiviual pages, they are thin to google — include all in one
// page with download, print button, take care of age, skill if any, level
// pill, subject pill, make sections, small descripiton all beneath the
// images"; "use usa wods… use dialogues talk to kids directly"; "levels are
// grade, 1 , grade, 2 preschool"; "check only daily routine" — Staying Safe
// and Healthy Food keep their pages this round). The 41 per-card short pages
// are GONE: the class page carries the whole deck — five shelves, every card
// with its image, age/subject/level/skill pills, a kid-directed description
// under the picture and Download + Print buttons — and the old URLs 301 to
// the class page. The parents' shelf at /flashcards/time-and-daily-routine/
// keeps its one-page printing wall (parent voice). TONE SPLIT (owner rule):
// the class talks to the child; the shelf talks to parents. The owner's
// word-ban ("no sign up", "no paywall", "free to use", "no account", "free
// forever") is a lock. Both header chips stay (both-glances round).
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync, readdirSync} from 'node:fs';
import {TR_PATH,TR_BASE,TR_ORDER,TR_CARDS,trBySlug} from '../src/time-and-daily-routine.mjs';

const read=p=>readFileSync('dist'+p,'utf8');
const html=read('/time-and-daily-routine/index.html');

test('ONE page only: the class page + the parents shelf, zero per-card URLs, 301s for the old short pages',()=>{
 const dirs=[];
 (function walk(d){for(const e of readdirSync('dist'+d,{withFileTypes:true})){if(e.isDirectory())dirs.push(d+e.name+'/'),walk(d+e.name+'/');}})('/time-and-daily-routine/');
 assert.equal(dirs.join('|'),'','the class dir is the ONLY dir under /time-and-daily-routine/ (zero subdirectories)');
 assert.ok(existsSync('dist/flashcards/time-and-daily-routine/index.html'),'parents shelf exists');
 assert.ok(!existsSync('dist/flashcards/time-and-daily-routine/morning-routine'),'zero per-card dirs in the library');
 const red=read('/_redirects');
 for(const c of TR_CARDS)assert.ok(red.includes('/time-and-daily-routine/'+c.pageSlug+'* /time-and-daily-routine/ 301'),'301 for '+c.pageSlug);
});

test('Class 42 numbering: LP sequence 1-42 no-gap and the forty-two count words',()=>{
 const lp=read('/learning-path/index.html');
 assert.ok(lp.includes('<span>42</span>'),'LP row 42 present');
 assert.ok(lp.includes('Class 42: <a href="/measuring-and-money/">Measuring &amp; Money</a>'),'the Class 42 row');
 assert.ok(lp.includes('Class 41: <a href="/time-and-daily-routine/">Time &amp; Daily Routine</a>'),'LP row 41 stays');
 assert.ok(lp.includes('forty-two age-guided classes'),'LP title+description carry the count');
 assert.ok(lp.includes('Forty-two classes are ready now'),'LP heading carries the count');
 assert.ok(!lp.includes('Forty-one classes are ready now')&&!lp.includes('forty-one age-guided'),'stale counts gone');
 const home=read('/index.html');
 assert.ok(home.includes('Forty-two classes are ready now'),'homepage lede carries the count');
 assert.ok(read('/about/index.html').includes('Forty-two classes from birth to age five are ready today'),'About carries the count');
});

test('R2 assets: the owner\u2019s SEO file names kept exactly, cover leads the class page',()=>{
 // file names ride untouched (owner: "keep the file names exactly as they are")
 for(const c of TR_CARDS)assert.ok(c.file.endsWith('-flashcard-for-kids.webp'),'SEO name kept: '+c.file);
 assert.ok(html.includes(TR_BASE+'time-and-daily-routine-flashcards-for-kids-cover.webp'),'cover file used as the class page main image (owner rule)');
 assert.ok(html.includes('width="800" height="1132"'),'artwork dimensions');
 const xml=read('/sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/time-and-daily-routine/</loc>'));
 assert.ok(xml.includes('<image:loc>'+TR_BASE+'time-and-daily-routine-flashcards-for-kids-cover.webp</image:loc>'),'cover in the image sitemap');
 assert.ok(!xml.includes('https://kiddo.school/time-and-daily-routine/morning-routine/'),'no short-page URLs in the sitemap');
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/time-and-daily-routine/</loc>'));
 assert.ok(xml.includes('<loc>https://kiddo.school/measuring-and-money/</loc>'),'Class 42 in the sitemap');
});

test('class-page contract: cover hero, five shelves x 41 full tiles, kid voice, links back',()=>{
 assert.ok(html.includes('CLASS 41 \u00b7 TIME &amp; DAILY ROUTINE \u00b7 AGES 4\u20135'),'eyebrow');
 assert.ok(html.includes('lesson-hero-cover'),'the cover leads');
 for(const [shelf,n] of [['MY-DAY SHELF',9],['CALENDAR SHELF',8],['DAY-PARTS SHELF',6],['TIME-WORDS SHELF',12],['OWN-IT SHELF',6]])
  assert.ok(html.includes(shelf+' \u00b7 '+n+' CARDS'),shelf+' honest count');
 const tiles=(html.match(/class="mn-card"/g)||[]).length;
 assert.equal(tiles,41,'41 card tiles on the one class page');
 assert.equal((html.match(/loading="lazy"/g)||[]).length,41,'every card image lazy');
 assert.equal((html.match(/data-mn-print/g)||[]).length,41,'a Print button under every card');
 assert.equal((html.match(/download="/g)||[]).length,41,'a Download button under every card');
 for(const c of TR_CARDS){
  const at=html.indexOf(TR_BASE+c.file+'" width="800"');
  assert.ok(at>0,'tile image for '+c.slug);
  const tile=html.slice(at,at+3200);
  assert.ok(tile.includes('fc-pill-age'),'age pill: '+c.slug);
  assert.ok(tile.includes('fc-pill-subject'),'subject pill: '+c.slug);
  assert.ok(tile.includes('fc-pill-level'),'level pill: '+c.slug);
  assert.ok(tile.includes('fc-pill-skill'),'skill pill: '+c.slug);
  assert.ok(tile.includes('\u201c'+c.say+'\u201d'),'the rule quoted under the image: '+c.slug);
  assert.ok(tile.includes('download="'+c.pageSlug+'.webp"'),'download name: '+c.slug);
 }
 // links back to all four inbound sources + the shelf + the path
 for(const href of ['/preschool/4-years/life-skills-and-good-habits/','/preschool/4-years/weather-seasons-and-what-we-wear/','/sequence-stories/','/first-glance/','/flashcards/time-and-daily-routine/','/learning-path/'])
  assert.ok(html.includes('href="'+href+'"'),'class page links back to '+href);
 // kid voice: the hero speaks to the child, zero parent-voice leakage
 assert.ok(html.includes('YOU can say it'),'kid-directed hero');
 assert.ok(!html.includes('your child'),'no parent-voice leakage on the lesson side');
 // no link to any short page remains anywhere on the page
 assert.ok(!/href="\/time-and-daily-routine\/[a-z0-9-]+\/"/.test(html),'zero per-card links (no individual pages)');
});

test('honest levels + skills: the grade pills split 11/18/12 and every card wears a skill',()=>{
 const levels={1:['Preschool \u00b7 Name it',11],2:['Grade 1 \u00b7 Do it',18],3:['Grade 2 \u00b7 Own it',12]};
 for(const [n,[label,count]] of Object.entries(levels))
  assert.equal((html.match(new RegExp('fc-pill-level">'+label,'g'))||[]).length,count,'level '+n+' = '+count+' cards');
 assert.equal((html.match(/fc-pill-skill">[^<]+</g)||[]).length,41,'41 skill pills');
});

test('inbound links both ways: Class 32, Class 34, Sequence Stories, First Glance sheets',()=>{
 assert.ok(read('/preschool/4-years/life-skills-and-good-habits/index.html').includes('href="/time-and-daily-routine/"'),'Class 32 points here');
 assert.ok(read('/preschool/4-years/weather-seasons-and-what-we-wear/index.html').includes('href="/time-and-daily-routine/"'),'Class 34 points here');
 assert.ok(read('/sequence-stories/index.html').includes('href="/time-and-daily-routine/"'),'Sequence Stories points here');
 const fg=read('/first-glance/index.html');
 assert.ok((fg.match(/fg-more" href="\/time-and-daily-routine\//g)||[]).length===2,'exactly two fg-more pointers (Daily Routine + Times of Day sheets)');
});

test('parents shelf: 41 mn-cards, four pills each, download + print under every image, parent voice',()=>{
 const shelf=read('/flashcards/time-and-daily-routine/index.html');
 const cards=(shelf.match(/class="mn-card"/g)||[]).length;
 assert.equal(cards,41,'41 shelf tiles');
 assert.equal((shelf.match(/fc-pill fc-pill-age/g)||[]).length,41,'41 age pills');
 assert.equal((shelf.match(/fc-pill fc-pill-subject/g)||[]).length,41,'41 subject pills');
 assert.equal((shelf.match(/fc-pill fc-pill-level/g)||[]).length,41,'41 level pills');
 assert.equal((shelf.match(/fc-pill fc-pill-skill/g)||[]).length,41,'41 skill pills');
 assert.equal((shelf.match(/data-mn-print/g)||[]).length,41,'41 print buttons');
 assert.equal((shelf.match(/download="/g)||[]).length,41,'41 download buttons');
 assert.ok(shelf.includes('THE THREE LEVELS'),'levels legend');
 for(const [n,label] of [[11,'Preschool \u00b7 Name it'],[18,'Grade 1 \u00b7 Do it'],[12,'Grade 2 \u00b7 Own it']])
  assert.equal((shelf.match(new RegExp('fc-pill-level">'+label,'g'))||[]).length,n,'honest level split '+n);
 assert.ok(shelf.includes('your child'),'parent voice on the shelf');
 assert.ok(!shelf.includes('Try it today'),'shelf shares no lesson phrasing');
 const descs=TR_CARDS.map(c=>c.slug);
 assert.equal(descs.length,41,'shelf deck complete');
 assert.ok(!/href="\/time-and-daily-routine\/[a-z0-9-]+\/"/.test(shelf),'zero per-card links on the shelf');
});

test('fresh copy: the 41 class-page descriptions are unique and never reuse a shelf tip',()=>{
 const classTips=[...html.matchAll(/class="mn-tip">(.*?)<\/figcaption>/g)].map(m=>m[1]);
 assert.equal(classTips.length,41,'41 class-page descriptions');
 assert.equal(new Set(classTips.map(t=>t.slice(0,60))).size,41,'class descriptions unique (first 60 chars)');
 const shelf=read('/flashcards/time-and-daily-routine/index.html');
 const shelfTips=[...shelf.matchAll(/class="mn-tip">(.*?)<\/figcaption>/g)].map(m=>m[1]);
 assert.equal(new Set(classTips.concat(shelfTips).map(t=>t.slice(0,60))).size,82,'class and shelf descriptions never share an opening');
});

test('flashcards wall: the deck joins the library with its cover fronting the wall card',()=>{
 const wall=read('/flashcards/index.html');
 assert.ok(wall.includes('href="/flashcards/time-and-daily-routine/"'),'wall card present');
 assert.ok(wall.includes('Open this set \u00b7 41 cards'),'wall card count');
 const idx=JSON.parse(read('/assets/search-index.json'));
 assert.ok(idx.find(p=>p.u===TR_PATH),'class in search index');
 assert.equal(idx.find(p=>p.u===TR_PATH).k,'Class');
 assert.ok(idx.find(p=>p.u==='/flashcards/time-and-daily-routine/'),'shelf in search index');
 assert.equal(idx.find(p=>p.u==='/flashcards/time-and-daily-routine/').k,'Flashcards');
 assert.ok(idx.every(p=>!p.u.startsWith('/time-and-daily-routine/'))===false||idx.filter(p=>p.u&&p.u.startsWith('/time-and-daily-routine/')).length===1,'only the class page is indexed (no short pages)');
 assert.ok(read('/all-pages/index.html').includes('href="/time-and-daily-routine/"'),'listed on /all-pages/');
});

test('discoverable: both header chips untouched, manners.js ships with the class + shelf',()=>{
 const home=read('/index.html');
 assert.ok(home.includes('class="header-fg" href="/first-glance/"')&&home.includes('58 first-picture sheets \u00b7 Ages 2\u20135'),'First Glance chip still on the header');
 assert.ok(home.includes('class="header-fg" href="/science-at-a-glance/"')&&home.includes('65 first-picture sheets \u00b7 Ages 2\u20135'),'Science chip beside it');
 for(const p of ['/time-and-daily-routine/index.html','/flashcards/time-and-daily-routine/index.html'])
  assert.ok(read(p).includes('/assets/manners.js'),'print isolation ships: '+p);
});

test('the owner\u2019s word-ban holds on every new page',()=>{
 const banned=['no sign up','no paywall','free to use','no account','free forever'];
 for(const p of ['/time-and-daily-routine/index.html','/flashcards/time-and-daily-routine/index.html','/measuring-and-money/index.html','/science/index.html']){
  const h=read(p).toLowerCase();
  for(const b of banned)assert.ok(!h.includes(b),b+' banned on '+p);
 }
});

test('float-to-top: markup on every page, CSS, print-hidden, JS wiring',()=>{
 for(const p of ['/index.html','/time-and-daily-routine/index.html','/measuring-and-money/index.html']){
  const h=read(p);
  assert.ok(h.includes('class="to-top" data-to-top'),'to-top button present: '+p);
  assert.ok(h.includes('aria-label="Back to top"'),'accessible label: '+p);
 }
 const js=read('/assets/site.js');
 assert.ok(js.includes("querySelector('[data-to-top]')")&&js.includes("scrollY > 500")&&js.includes('prefers-reduced-motion'),'site.js wiring');
 const css=read('/assets/style.css');
 assert.ok(css.includes('.to-top{position:fixed')&&css.includes('@media print{.to-top{display:none}}'),'CSS + print hide');
});

test('LP fixes: magic games say Class 17 and Class 20, Dinosaurs joins the Extra Classes row',()=>{
 const lp=read('/learning-path/index.html');
 assert.ok(lp.includes('Magic Shapes</a> (Class 17)')&&lp.includes('Animal Sound Safari</a> (Class 20)'),'magic games renumbered');
 assert.ok(!lp.includes('(Class 3)')&&!lp.includes('(Class 6)'),'stale numbers gone from the LP');
 const shapes=read('/preschool/3-years/magic-shape-builder/index.html');
 const animals=read('/preschool/3-years/magic-animal-playground/index.html');
 assert.ok(shapes.includes('<span class="fc-class">Class 17</span>'),'shape game pill says Class 17');
 assert.ok(animals.includes('<span class="fc-class">Class 20</span>'),'animal game pill says Class 20');
 assert.ok(lp.includes('href="/dinosaurs/">Dinosaurs</a> (ages 3\u20135)'),'Dinosaurs in the Extra Classes row');
});
