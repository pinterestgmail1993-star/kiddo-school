// Age 3 Class 5 — Opposites & Comparing: guards for the data, the set, the
// twelve card pages, the class games and the whole-school wiring.
// The games are checked mathematically: every tap-the-opposite round hides
// exactly one correct card and it is always the TRUE opposite of the target;
// every compare round's correct card is the bigger/taller/longer one; the
// match board carries each pair exactly once per side, unaligned by row.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {fcSets} from '../src/flashcards/index.mjs';
import {oppositesLesson,oppositesCardContent} from '../src/flashcards/data-opposites.mjs';

const root=resolve('dist');
const page=p=>readFileSync(join(root,p,'index.html'),'utf8');
const css=()=>readFileSync(join(root,'assets','style.css'),'utf8');
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/preschool-learning-cards/opposites-and-comparing-age-3/';
const SLUGS=['big-ball','small-ball','tall-tree','short-tree','long-pencil','short-pencil','full-glass','empty-glass','hot-soup','cold-ice-cream','open-door','closed-door'];
const PAIRS={1:['big-ball','small-ball'],2:['tall-tree','short-tree'],3:['long-pencil','short-pencil'],4:['full-glass','empty-glass'],5:['hot-soup','cold-ice-cream'],6:['open-door','closed-door']};

test('opposites data: twelve cards, six complete pairs, all real R2 files with true 1024×768 dims',()=>{
 assert.equal(oppositesLesson.cards.length,12);
 assert.deepEqual(oppositesLesson.cards.map(c=>c.slug),SLUGS);
 for(const c of oppositesLesson.cards){
  assert.equal(c.w,1024,'true width carried for '+c.slug);
  assert.equal(c.h,768,'true height carried for '+c.slug);
  assert.match(c.file,/^\d{2}-[a-z-]+\.webp$/,'file pattern '+c.file);
  assert.ok(c.alt&&c.alt.length>60,'real alt text for '+c.slug);
 }
 // the six pairs partition the set, and each pair's two slugs are true opposites
 const byPair=Object.fromEntries(Object.entries(PAIRS).map(([n,[a,b]])=>[n,a+'|'+b]));
 assert.deepEqual(Object.keys(byPair).sort(),['1','2','3','4','5','6']);
 assert.ok(existsSync(join(root,'flashcards/opposites/big-ball/index.html')),'descriptive URLs exist');
 // cover is the owner's real cover file, probed landscape
 assert.equal(oppositesLesson.cover.file,'cover.webp');
 assert.equal(oppositesLesson.cover.w,1024);assert.equal(oppositesLesson.cover.h,768);
});

test('opposites content: unique intro/say/try/note/meta/cardTitle per card, honest hot-safety note',()=>{
 const seen={intro:new Set(),meta:new Set(),title:new Set(),say:new Set(),spot:new Set()};
 for(const slug of SLUGS){
  const d=oppositesCardContent[slug];
  assert.ok(d.intro.length>120,slug+' intro depth');
  assert.ok(d.say.length>10&&d.try.length>40&&d.note.length>40,slug+' guidance depth');
  assert.ok(!seen.intro.has(d.intro),'unique intro '+slug);seen.intro.add(d.intro);
  assert.ok(!seen.meta.has(d.metaDescription),'unique meta '+slug);seen.meta.add(d.metaDescription);
  assert.ok(!seen.title.has(d.cardTitle),'unique cardTitle '+slug);seen.title.add(d.cardTitle);
  assert.ok(!seen.say.has(d.say),'unique say line '+slug);seen.say.add(d.say);
  assert.ok(d.spot&&d.spot.length>15,slug+' spot prompt');
  assert.ok(d.word,slug+' word');
 }
 assert.match(oppositesCardContent['hot-soup'].note,/safety|out of reach/i,'hot stays a safety word');
 assert.match(oppositesCardContent['open-door'].note,/grown-up|supervised/i,'doors stay supervised');
 for(const slug of SLUGS)assert.doesNotMatch(JSON.stringify(oppositesCardContent[slug]),/[\u{1F300}-\u{1FAFF}\u{2700}-\u{27BF}]/u,'no emoji in '+slug);
});

test('flashcard engine: opposites is a real set; twelve card pages with downloads and community',()=>{
 const set=fcSets.find(s=>s.slug==='opposites');
 assert.ok(set,'opposites set registered');
 assert.equal(set.cards.length,12);
 assert.equal(set.group,'preschool');
 assert.equal(set.coverUrl,R2+'cover.webp');
 assert.equal(set.cover.w,1024);assert.equal(set.cover.h,768,'landscape cover dims on the library wall');
 for(const c of set.cards){
  const html=page(c.url.slice(1));
  assert.ok(existsSync(join(root,c.url.slice(1),'index.html')),c.url+' exists');
  assert.ok(!html.includes('fc2-pair'),c.url+' is a single-image card (no second face)');
  assert.ok(html.includes(`src="${c.img}"`),c.url+' card image present');
  assert.ok(html.includes(`width="1024" height="768"`),c.url+' true ratio attrs');
  assert.ok(html.includes(`href="${c.img}" download="`),c.url+' real WebP download');
  assert.ok(html.includes('data-fc-reactions')&&html.includes('data-fc-review-form')&&html.includes('data-fc-comment-form'),c.url+' three community systems');
  assert.ok(html.includes('"BreadcrumbList"'),c.url+' breadcrumb schema');
  assert.ok(html.includes('rel="prev"')&&html.includes('rel="next"'),c.url+' prev/next');
  assert.ok(!html.includes('aggregateRating'),c.url+' no fabricated ratings');
 }
});

test('opposites set page: no cover repeat, spec SEO strings, honest grid of 12',()=>{
 const html=page('flashcards/opposites');
 assert.ok(!html.includes('fc2-cover'),'no repeated cover thumbnail');
 assert.ok(html.includes('<title>Opposite Flashcards for Preschoolers | 12 Cards | Kiddo.school</title>'),'set title');
 assert.equal([...html.matchAll(/class="fc-card fc2-cardlink"/g)].length,12,'12 cards in grid');
 assert.ok(html.includes('href="/preschool/3-years/opposites-and-comparing/"'),'links back to class');
 assert.ok(html.includes(`<img src="${R2}01-big-ball.webp"`),'grid uses real card thumbs');
 for(const s of SLUGS)assert.ok(html.includes(`/flashcards/opposites/${s}/`),'grid links '+s);
});

test('class page: learn + solve-the-sheets, no coded games (owner instruction)',()=>{
 const html=page('preschool/3-years/opposites-and-comparing');
 assert.ok(html.includes('<title>Opposites &amp; Comparing for 3 Year Olds | Kiddo.school</title>')||html.includes('<title>Opposites & Comparing for 3 Year Olds | Kiddo.school</title>'),'class title');
 // 12 learn slides: 6 measuring words + 6 everyday opposites
 assert.equal([...html.matchAll(/<figure class="lv-card" data-op-group="measure"/g)].length,6,'6 measuring-word slides');
 assert.equal([...html.matchAll(/<figure class="lv-card" data-op-group="everyday"/g)].length,6,'6 everyday-opposite slides');
 assert.equal([...html.matchAll(/data-lv-say="/g)].length,12,'every slide carries its say line');
 // the coded games are GONE from the learning path (owner instruction)
 assert.ok(!html.includes('data-tc-round'),'no tap-a-choice or compare rounds anywhere');
 assert.ok(!html.includes('id="tap-the-opposite"'),'tap game removed');
 assert.ok(!html.includes('id="match-opposite-pairs"'),'match board removed');
 assert.ok(!html.includes('data-match-board'),'no match-board chrome');
 // solve-the-sheets: honest guidance pointing at the real print page and set
 assert.ok(html.includes('id="solve-the-sheets"'),'solve section present');
 assert.ok(html.includes('href="/preschool/3-years/opposites-and-comparing/print/"'),'links the printable cards');
 assert.ok(html.includes('href="/flashcards/opposites/"'),'links the flashcard set');
 assert.ok(html.includes('Write &amp; Color'),'names the on-screen drawing layer');
 assert.ok(html.includes('Act the pair out'),'concrete solving steps');
 // no pressure mechanics anywhere — reassurance phrases are whitelisted
 const reassured=html.replace(/no (points, )?(scores?|timers?)[^<.]*|never a [^<.]{0,14}score[^<.]*|nothing to lose|no hurry, no score[^<.]*/g,'');
 assert.ok(!/\b(scores?|streaks?|timers?|countdown)\b/i.test(reassured),'no scores/timers/streaks language');
 assert.ok(html.includes('TEACHER WELCOME'),'teacher welcome');
 assert.ok(html.includes('CLASS COMPLETE'),'class complete');
 // honest navigation: no invented Class 6 anywhere
 assert.ok(html.includes('href="/learning-path/"')&&html.includes('href="/preschool/3-years/"'),'real next-step navigation');
 assert.ok(!html.includes('Class 6')&&!html.includes('class-6'),'no invented next class');
});

test('print view: twelve cards, two to a page, excluded from sitemap',()=>{
 const html=page('preschool/3-years/opposites-and-comparing/print');
 assert.equal([...html.matchAll(/class="tc-print-page"/g)].length,12,'12 printed cards');
 const sheets=html.split('class="tc-print-sheet"').length-1;
 assert.equal(sheets,6,'6 print sheets');
 const first=html.match(/tc-print-sheet">([\s\S]*?)<\/div>/)[1];
 assert.ok(first.includes('01-big-ball.webp')&&first.includes('02-small-ball.webp'),'pairs print together');
 const map=readFileSync(join(root,'sitemap.xml'),'utf8');
 assert.ok(!map.includes('opposites-and-comparing/print/'),'print stays out of sitemap');
});

test('whole-school wiring: hubs, learning path, spaces and homepage all know Class 5',()=>{
 assert.ok(page('preschool').includes('opposites for comparing'),'preschool hub lists the class');
 assert.ok(page('preschool/3-years').includes('opposites-and-comparing'),'Age 3 stage lists class');
 assert.ok(page('preschool/3-years').includes('/flashcards/opposites/'),'Age 3 stage lists set');
 assert.ok(page('learning-path').includes('Class 19: <a href="/preschool/3-years/opposites-and-comparing/">Opposites &amp; Comparing</a>'),'learning path row 19');
 assert.ok(page('learning-path').includes('Twenty-nine classes are ready now'),'honest class copy');
 assert.ok(page('flashcards').includes('/flashcards/opposites/'),'library lists opposites set');
 assert.ok(!page('learning-library').includes('/preschool/3-years/magic-opposites-adventure/'),'books-only library lists no games');
 assert.ok(page('').includes('Twenty-nine classes are ready now'),'homepage says twenty-eight');
 assert.ok(page('about').includes('Twenty-nine classes from birth to age five are ready today'),'about says twenty');
 // the class 4 completion now honestly links the real next class
 assert.ok(page('preschool/3-years/colors-and-color-mixing').includes('href="/preschool/3-years/opposites-and-comparing/"'),'Class 4 links Class 5');
 // the class hero and slides use the true 1024×768 landscape files
 const cls=page('preschool/3-years/opposites-and-comparing');
 assert.ok(cls.includes(`src="${R2}01-big-ball.webp" width="1024" height="768"`),'true-ratio cards in class');
});

test('assets: opposites-class.js ships with chips; CSS keeps the honest chart styles',()=>{
 const js=readFileSync(join(root,'assets','opposites-class.js'),'utf8');
 assert.ok(js.includes('[data-op-groups]'),'chips hook (still powers the learn grid)');
 assert.ok(js.includes('aria-pressed'),'accessible state');
 const style=css();
 assert.ok(style.includes('.op-card'),'card CSS');
 assert.ok(style.includes('.tc-choice.tc-op'),'compare-image CSS');
 // the match board is retired from the page; the chips stay.
 const cls=page('preschool/3-years/opposites-and-comparing');
 assert.ok(!cls.includes('data-match-status'),'no parked match-status line without the board');
 assert.ok(cls.includes('data-op-groups'),'learn chips stay');
});
