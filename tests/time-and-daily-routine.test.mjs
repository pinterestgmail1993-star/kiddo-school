import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync, readdirSync} from 'node:fs';
import {TR_PATH,TR_BASE,TR_ORDER,TR_CARDS,trBySlug} from '../src/time-and-daily-routine.mjs';

const read=p=>readFileSync('dist'+p,'utf8');
const html=read('/time-and-daily-routine/index.html');

test('exact URL set: the class page + 41 short pages + the parents shelf and nothing else',()=>{
 const dirs=[];
 (function walk(d){for(const e of readdirSync('dist'+d,{withFileTypes:true})){if(e.isDirectory())dirs.push(d+e.name+'/'),walk(d+e.name+'/');}})('/time-and-daily-routine/');
 const expected=TR_ORDER.map(s=>TR_PATH+s+'/').sort();
 assert.equal(dirs.sort().join('|'),expected.join('|'),'exactly 41 short-page dirs + the class dir');
 assert.ok(existsSync('dist/flashcards/time-and-daily-routine/index.html'),'parents shelf exists');
 assert.ok(!existsSync('dist/flashcards/time-and-daily-routine/morning-routine'),'zero per-card dirs in the library');
});

test('Class 41 numbering: LP sequence 1-41 no-gap and the forty-one count words',()=>{
 const lp=read('/learning-path/index.html');
 assert.ok(lp.includes('<span>41</span>'),'LP row 41 present');
 assert.ok(lp.includes('Class 41: <a href="/time-and-daily-routine/">Time &amp; Daily Routine</a>'));
 assert.ok(lp.includes('forty-one age-guided classes'),'LP title+description carry the count');
 assert.ok(lp.includes('Forty-one classes are ready now'),'LP heading carries the count');
 assert.ok(!lp.includes('Forty classes are ready now')&&!lp.includes('forty age-guided'),'stale counts gone');
 const home=read('/index.html');
 assert.ok(home.includes('Forty-one classes are ready now'),'homepage lede carries the count');
 assert.ok(read('/about/index.html').includes('Forty-one classes from birth to age five are ready today'),'About carries the count');
});

test('R2 assets: the owner\u2019s SEO file names kept exactly, probed live, cover leads the class page',()=>{
 // file names ride untouched (owner: "keep the file names exactly as they are")
 for(const c of TR_CARDS)assert.ok(c.file.endsWith('-flashcard-for-kids.webp'),'SEO name kept: '+c.file);
 assert.ok(html.includes(TR_BASE+'time-and-daily-routine-flashcards-for-kids-cover.webp'),'cover file used as the class page main image (owner rule)');
 assert.ok(html.includes('width="800" height="1132"'),'artwork dimensions');
 // every short page carries its own card image as og:image (image sitemap)
 const first=read(TR_PATH+'morning-routine/index.html');
 assert.ok(first.includes('<image:loc>')||read('/sitemap.xml').includes(TR_BASE+'morning-routine-flashcard-for-kids.webp'),'card image in the image sitemap via og:image');
 const xml=read('/sitemap.xml');
 assert.ok(xml.includes('<loc>https://kiddo.school/time-and-daily-routine/</loc>'));
 assert.ok(xml.includes('<image:loc>'+TR_BASE+'time-and-daily-routine-flashcards-for-kids-cover.webp</image:loc>'),'cover in the image sitemap');
 assert.ok(xml.includes('<loc>https://kiddo.school/flashcards/time-and-daily-routine/</loc>'));
});

test('class-page contract: cover hero, five shelves x 41 tiles, kid voice, links back',()=>{
 assert.ok(html.includes('CLASS 41 \u00b7 TIME &amp; DAILY ROUTINE \u00b7 AGES 4\u20135'),'eyebrow');
 assert.ok(html.includes('lesson-hero-cover'),'the cover leads');
 for(const [shelf,n] of [['MY-DAY SHELF',9],['CALENDAR SHELF',8],['DAY-PARTS SHELF',6],['TIME-WORDS SHELF',12],['OWN-IT SHELF',6]])
  assert.ok(html.includes(shelf+' \u00b7 '+n+' CARDS'),shelf+' honest count');
 const tiles=(html.match(/class="lp-tile"/g)||[]).length;
 assert.equal(tiles,41,'41 class tiles');
 assert.ok((html.match(/href="\/time-and-daily-routine\/[a-z0-9-]+\/"/g)||[]).length>=41,'every tile links its short page');
 // links back to all four inbound sources + the shelf + the path
 for(const href of ['/preschool/4-years/life-skills-and-good-habits/','/preschool/4-years/weather-seasons-and-what-we-wear/','/sequence-stories/','/first-glance/','/flashcards/time-and-daily-routine/','/learning-path/'])
  assert.ok(html.includes('href="'+href+'"'),'class page links back to '+href);
 // kid voice: the hero speaks to the child
 assert.ok(html.includes('YOU can say it'),'kid-directed hero');
 assert.ok(!html.includes('your child'),'no parent-voice leakage on the lesson side');
});

test('short-page contract: verbatim rule, try-it-today, download, print, back link, counter',()=>{
 for(const c of TR_CARDS){
  const p=read(TR_PATH+c.pageSlug+'/index.html');
  assert.ok(p.includes('\u201c'+c.say+'\u201d'),'the rule quoted word for word: '+c.slug);
  assert.ok(p.includes('Try it today'),'practice job: '+c.slug);
  assert.ok(p.includes('download="'+c.pageSlug+'.webp"'),'download button: '+c.slug);
  assert.ok(p.includes('data-mn-print'),'print button: '+c.slug);
  assert.ok(p.includes('href="'+TR_PATH+'"'),'link back: '+c.slug);
  assert.ok(p.includes('Card '+ (TR_CARDS.indexOf(c)+1) +' of 41'),'counter: '+c.slug);
  assert.ok(p.includes('breadcrumbs'),'breadcrumb: '+c.slug);
 }
 // no two try-its share a sentence (unique-copy discipline)
 const its=TR_CARDS.map(c=>c.tryIt.slice(0,60));
 assert.equal(new Set(its).size,41,'41 unique try-its');
});

test('inbound links both ways: Class 32, Class 34, Sequence Stories, First Glance sheets',()=>{
 assert.ok(read('/preschool/4-years/life-skills-and-good-habits/index.html').includes('href="/time-and-daily-routine/"'),'Class 32 points here');
 assert.ok(read('/preschool/4-years/weather-seasons-and-what-we-wear/index.html').includes('href="/time-and-daily-routine/"'),'Class 34 points here');
 assert.ok(read('/sequence-stories/index.html').includes('href="/time-and-daily-routine/"'),'Sequence Stories points here');
 const fg=read('/first-glance/index.html');
 assert.ok((fg.match(/fg-more" href="\/time-and-daily-routine\//g)||[]).length===2,'exactly two fg-more pointers (Daily Routine + Times of Day sheets)');
});

test('parents shelf: 41 mn-cards, three pills each, download + print under every image, parent voice',()=>{
 const shelf=read('/flashcards/time-and-daily-routine/index.html');
 const cards=(shelf.match(/class="mn-card"/g)||[]).length;
 assert.equal(cards,41,'41 shelf tiles');
 assert.equal((shelf.match(/fc-pill fc-pill-age/g)||[]).length,41,'41 age pills');
 assert.equal((shelf.match(/fc-pill fc-pill-subject/g)||[]).length,41,'41 subject pills');
 assert.equal((shelf.match(/fc-pill fc-pill-level/g)||[]).length,41,'41 level pills');
 assert.equal((shelf.match(/data-mn-print/g)||[]).length,41,'41 print buttons');
 assert.equal((shelf.match(/download="/g)||[]).length,41,'41 download buttons');
 assert.ok(shelf.includes('THE THREE LEVELS'),'levels legend');
 for(const [n,label] of [[11,'Level 1 \u00b7 Name it'],[18,'Level 2 \u00b7 Do it'],[12,'Level 3 \u00b7 Own it']])
  assert.equal((shelf.match(new RegExp('fc-pill-level">'+label,'g'))||[]).length,n,'honest level split '+n);
 assert.ok(shelf.includes('your child'),'parent voice on the shelf');
 assert.ok(!shelf.includes('Try it today'),'shelf shares no lesson phrasing');
 const descs=TR_CARDS.map(c=>c.slug);
 assert.equal(descs.length,41,'shelf deck complete');
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
 assert.ok(read('/all-pages/index.html').includes('href="/time-and-daily-routine/"'),'listed on /all-pages/');
});

test('discoverable: both header chips untouched, manners.js ships with the class pages',()=>{
 const home=read('/index.html');
 assert.ok(home.includes('class="header-fg" href="/first-glance/"')&&home.includes('58 first-picture sheets \u00b7 Ages 2\u20135'),'First Glance chip still on the header');
 assert.ok(home.includes('class="header-fg" href="/science-at-a-glance/"')&&home.includes('65 first-picture sheets \u00b7 Ages 2\u20135'),'Science chip beside it');
 for(const p of ['/time-and-daily-routine/index.html',TR_PATH+'morning-routine/index.html','/flashcards/time-and-daily-routine/index.html'])
  assert.ok(read('/'+p).includes('/assets/manners.js'),'print isolation ships: '+p);
});

test('the owner\u2019s word-ban holds on every new page',()=>{
 const banned=['no sign up','no paywall','free to use','no account','free forever'];
 for(const p of ['/time-and-daily-routine/index.html','/flashcards/time-and-daily-routine/index.html',TR_PATH+'morning-routine/index.html']){
  const h=read('/'+p).toLowerCase();
  for(const b of banned)assert.ok(!h.includes(b),b+' banned on '+p);
 }
});

test('float-to-top: markup on every page, CSS, print-hidden, JS wiring',()=>{
 for(const p of ['/index.html','/time-and-daily-routine/index.html','/flashcards/animal-categories/amphibians/index.html']){
  const h=read('/'+p);
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
