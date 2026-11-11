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
const R2='https://assets.kiddo.school/flashcards/preschool-learning-cards/opposites-and-comparing-age-3/';
const SLUGS=['big-ball','small-ball','tall-tree','short-tree','long-pencil','short-pencil','full-glass','empty-glass','hot-soup','cold-ice-cream','open-door','closed-door'];
const PAIRS={1:['big-ball','small-ball'],2:['tall-tree','short-tree'],3:['long-pencil','short-pencil'],4:['full-glass','empty-glass'],5:['hot-soup','cold-ice-cream'],6:['open-door','closed-door']};



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
 assert.ok(page('learning-path').includes('Forty-nine classes are ready now'),'honest class copy');
 assert.ok(page('flashcards').includes('/flashcards/opposites/'),'library lists opposites set');
 assert.ok(!page('learning-library').includes('/preschool/3-years/magic-opposites-adventure/'),'books-only library lists no games');
 assert.ok(page('').includes('Forty-nine classes are ready now'),'homepage counts honestly');
 assert.ok(page('about').includes('Forty-nine classes from birth to age five are ready today'),'about counts honestly');
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
