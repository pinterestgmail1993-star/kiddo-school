// Age 3 Class 8 — Fruits & Vegetables: guards for the lesson, the print
// view, the flashcard set, the sixteen card pages and the whole-school
// wiring. The sorting game, find-the-food and buckets all run on the shared
// find-it engine: eight sort rounds with exactly one correct bucket each,
// five find rounds with exactly one correct real-card choice each, and a
// six-pair identical-picture match board. Counting claims are verified to
// stay within what the cards actually show (8 fruits, 8 vegetables, rows of
// three). No audio exists for food and none is faked.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root=resolve('dist');
const read=p=>readFileSync(resolve(root,p),'utf8');

const c8=read('preschool/3-years/fruits-and-vegetables/index.html');
const c8p=read('preschool/3-years/fruits-and-vegetables/print/index.html');
const c8set=read('flashcards/fruits-and-vegetables/index.html');
const c8apple=read('flashcards/fruits-and-vegetables/apple/index.html');
const C8_CARDS=['01-apple.webp','02-banana.webp','03-orange.webp','04-strawberry.webp','05-grapes.webp','06-watermelon.webp','07-pineapple.webp','08-mango.webp','09-carrot.webp','10-potato.webp','11-tomato.webp','12-cucumber.webp','13-broccoli.webp','14-corn.webp','15-onion.webp','16-pumpkin.webp'];
const C8_SLUGS=['apple','banana','orange','strawberry','grapes','watermelon','pineapple','mango','carrot','potato','tomato','cucumber','broccoli','corn','onion','pumpkin'];
const C8_R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/preschool-learning-cards/fruits-and-vegetables-age-3';
const FRUITS=['apple','banana','orange','strawberry','grapes','watermelon','pineapple','mango'];
const VEGETABLES=['carrot','potato','tomato','cucumber','broccoli','corn','onion','pumpkin'];
const c7=read('preschool/3-years/body-parts-and-five-senses/index.html');
const home=read('index.html');
const about=read('about/index.html');
const lp=read('learning-path/index.html');
const stage=read('preschool/3-years/index.html');
const hub=read('preschool/index.html');
const library=read('learning-library/index.html');

test('class 8 (Fruits & Vegetables, Preschool 8) follows the preschool class spec',()=>{
 assert.ok(c8.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/fruits-and-vegetables/"'));
 assert.ok(c8.includes('<title>Fruits &amp; Vegetables for 3 Year Olds | Kiddo.school</title>'));
 assert.ok(c8.includes('<h1>Fruits &amp; Vegetables</h1>'));
 assert.ok(c8.includes('PRESCHOOL · AGE 3 · CLASS 8'));
 assert.ok(c8.includes('<strong>Class</strong> Preschool 8'));
 assert.ok(c8.includes('this class follows Body Parts &amp; My Five Senses on the preschool path'));
 for(const step of ['Teacher welcome','Meet the foods','Fruit or vegetable?','Find the food','Match &amp; remember','Colors &amp; counting','Take it off screen','Class complete'])assert.ok(c8.includes(step),step);
 for(const id of ['meet-the-foods','fruit-or-vegetable','find-the-food','match-and-remember','colors-and-counting','off-screen','printables','class-complete','how-to','todays-class'])assert.ok(c8.includes('id="'+id+'"'),id);
 for(const f of C8_CARDS)assert.ok(c8.includes('/'+f+'"'),'card file '+f);
 assert.equal([...c8.matchAll(/data-lv-grid/g)].length,1,'one learn viewer');
 assert.equal([...c8.matchAll(/data-fv-groups/g)].length,1,'one chip bar');
 for(const g of ['data-fv-group-filter="all"','data-fv-group-filter="fruit"','data-fv-group-filter="vegetable"'])assert.ok(c8.includes(g),g);
 assert.equal([...c8.matchAll(/data-lv-say=/g)].length,16,'say caption on every viewer card');
 assert.equal([...c8.matchAll(/data-lv-find=/g)].length,16);
 assert.ok(c8.includes('data-cm-root data-page-path="/preschool/3-years/fruits-and-vegetables/"'));
 assert.ok(c8.includes('href="/flashcards/fruits-and-vegetables/"'));
 assert.ok(c8.includes('Prefer printed cards?'),'flashcards pill injected');
 assert.ok(c8.includes('/assets/fruits-class.js'),'class script loads');
 assert.ok(!c8.includes('aria-label="undefined"'),'no broken aria-labels');
});

test('class 8 ships no audio controls — nothing is faked',()=>{
 assert.ok(!c8.includes('.mp3'),'no mp3 references on the class page');
 assert.ok(!c8.includes('data-an-sound'),'no play controls');
 assert.ok(!c8set.includes('.mp3'),'no mp3 references on the set page');
});

test('class 8 sorting game: eight rounds, two honest buckets, one correct each',()=>{
 assert.equal([...c8.matchAll(/data-fv-sort=/g)].length,8);
 const buckets=[...c8.matchAll(/class="tc-choice fv-bucket" aria-label="([^{"]*)"[^>]*>/g)];
 assert.equal(buckets.length,16,'two buckets per round');
 assert.equal([...c8.matchAll(/aria-label="The fruit bowl"/g)].length,8);
 assert.equal([...c8.matchAll(/aria-label="The vegetable bowl"/g)].length,8);
 for(const slug of ['apple','carrot','grapes','potato','mango','broccoli','watermelon','pumpkin']){
  const round=c8.slice(c8.indexOf('data-fv-sort="'+slug+'"'));
  const seg=round.slice(0,round.indexOf('data-tc-feedback'));
  const isFruit=FRUITS.includes(slug);
  const correctBucket=seg.includes('aria-label="The '+(isFruit?'fruit':'vegetable')+' bowl" data-tc-correct="true"');
  assert.ok(correctBucket,slug+' sorts to '+(isFruit?'fruit':'vegetable'));
  // the wrong bucket must NOT be marked correct
  assert.ok(!seg.includes('aria-label="The '+(isFruit?'vegetable':'fruit')+' bowl" data-tc-correct="true"'),slug+' wrong bucket unmarked');
 }
});

test('class 8 find rounds and match board are structurally honest',()=>{
 assert.equal([...c8.matchAll(/data-tc-round/g)].length,13,'8 sort + 5 find rounds');
 assert.equal([...c8.matchAll(/data-tc-correct="true"/g)].length,13,'exactly one correct per round');
 const findRounds=[...c8.matchAll(/data-fv-find="([a-z]+)" data-tc-ask="([^"]*)">[\s\S]*?<\/p>\s*<div class="tc-choices"[^>]*>([\s\S]*?)<\/div>/g)];
 assert.equal(findRounds.length,5);
 for(const r of findRounds){
  const ask=r[2].toLowerCase();
  const correct=[...r[3].matchAll(/class="tc-choice" aria-label="([^\"]*)" data-tc-correct="true"/g)].map(m=>m[1].toLowerCase());
  assert.equal(correct.length,1);
  assert.ok(ask.includes(correct[0].toLowerCase()),'ask names the answer: '+ask);
 }
 // match board: six pairs of the SAME six slugs, both sides
 assert.equal([...c8.matchAll(/data-match-side="left"/g)].length,6);
 assert.equal([...c8.matchAll(/data-match-side="right"/g)].length,6);
 const pair=(side)=>[...c8.matchAll(new RegExp('data-match-pair="([a-z]+)" data-match-side="'+side+'"','g'))].map(m=>m[1]).sort();
 assert.deepEqual(pair('left'),pair('right'),'same six foods on both sides');
 assert.equal(new Set(pair('left')).size,6,'six distinct pairs');
 // colors & counting: five rows built from real cards, counts stay honest
 assert.ok(c8.includes('id="colors-and-counting"'));
 assert.equal([...c8.matchAll(/class="fv-thumb"/g)].length,15,'five rows of three foods');
 assert.ok(c8.includes('eight fruits!')&&c8.includes('eight too!'),'counting says eight and eight');
 assert.ok(c8.includes('scientists sort the tomato with the fruits, cooks sort it with the vegetables'),'tomato honesty note present');
 assert.ok(c8.includes('wash foods before touching mouths'),'food hygiene guidance present');
 assert.ok(c8.includes('grown-ups do all the cutting'),'age-appropriate safety guidance present');
});

test('class 8 print view prints the same sixteen R2 assets two to a page',()=>{
 assert.ok(c8p.includes('content="noindex,follow"'));
 assert.ok(c8p.includes('<body class="print-view">'));
 assert.ok(c8p.includes('Fruits &amp; Vegetables Flashcards: print all sixteen cards'));
 assert.equal([...c8p.matchAll(/class="tc-print-sheet"/g)].length,8,'eight sheets of two');
 assert.equal([...c8p.matchAll(new RegExp(C8_R2.replaceAll('.','\\.'),'g'))].length,16,'every card asset referenced once');
 for(const f of C8_CARDS)assert.ok(c8p.includes('/'+f+'"'),'print card '+f);
});

test('class 8 flashcard set page lists all sixteen cards with their own pages',()=>{
 assert.ok(c8set.includes('rel="canonical" href="https://kiddo-school.pages.dev/flashcards/fruits-and-vegetables/"'));
 assert.ok(c8set.includes('<h1>Fruit & Vegetable Flashcards for Preschoolers</h1>'));
 assert.equal([...c8set.matchAll(/href="\/flashcards\/fruits-and-vegetables\/[a-z]+\/"/g)].length,16,'16 card links');
 for(const s of C8_SLUGS)assert.ok(c8set.includes('/flashcards/fruits-and-vegetables/'+s+'/'),'card link '+s);
 // no cover file exists in the folder — the real strawberry card fronts the set
 assert.ok(c8set.includes(C8_R2+'/04-strawberry.webp'),'set cover is the real strawberry card');
 assert.ok(c8set.includes('width="1240" height="1748"'),'cover ships true card dims');
 assert.ok(c8set.includes('data-fc-root data-page-path="/flashcards/fruits-and-vegetables/"'),'community mount on set page');
 assert.ok(c8set.includes('/preschool/3-years/fruits-and-vegetables/'),'links back to the class');
});

test('all sixteen card pages exist with unique metadata, downloads and navigation',()=>{
 const titles=new Set(),descs=new Set();
 C8_SLUGS.forEach((s,i)=>{
  const html=read('flashcards/fruits-and-vegetables/'+s+'/index.html');
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  const desc=html.match(/name="description" content="([^"]+)"/)[1];
  assert.ok(!titles.has(title),'unique title for '+s);titles.add(title);
  assert.ok(!descs.has(desc),'unique description for '+s);descs.add(desc);
  assert.ok(html.includes('<h1>'+s.charAt(0).toUpperCase()+s.slice(1)+' Flashcard for Preschoolers</h1>'),'H1 for '+s);
  const file=(i+1)<10?'0'+(i+1):String(i+1);
  assert.ok(html.includes('<a class="button" href="'+C8_R2+'/'+file+'-'+s+'.webp" download="'),'working download for '+s);
  assert.ok(html.includes('data-fc-root data-page-path="/flashcards/fruits-and-vegetables/'+s+'/"'),'community mount on '+s);
  assert.ok(html.includes('rel="prev"')&&html.includes('rel="next"'),'prev/next on '+s);
  assert.ok(html.includes('RELATED CARDS'),'related cards on '+s);
  assert.ok(html.includes('/preschool/3-years/fruits-and-vegetables/'),'lesson link on '+s);
  assert.ok(!html.includes('.mp3'),'no audio claimed on '+s);
 });
 // wrap-around: apple's previous is pumpkin (last), next is banana
 assert.ok(c8apple.includes('href="/flashcards/fruits-and-vegetables/pumpkin/" rel="prev"'));
 assert.ok(c8apple.includes('href="/flashcards/fruits-and-vegetables/banana/" rel="next"'));
});

test('class 8 is wired into the whole school honestly',()=>{
 assert.ok(lp.includes('Class 22: <a href="/preschool/3-years/fruits-and-vegetables/">Fruits &amp; Vegetables</a>'));
 assert.ok(lp.includes('twenty-nine age-guided classes'));
 assert.ok(lp.includes('Twenty-nine classes are ready now, from birth to age five, in one calm sequence.'));
 assert.ok(home.includes('Twenty-nine classes are ready now, from birth to age five'));
 assert.ok(home.includes('Letters, numbers, shapes, colors, opposites, animals, your body with all five senses — and the foods you eat.'));
 assert.ok(about.includes('Twenty-nine classes from birth to age five are ready today'));
 assert.ok(hub.includes('Eight classes ready now'));
 assert.ok(stage.includes('<strong>Status</strong> Eight classes ready now'));
 assert.ok(stage.includes('href="/preschool/3-years/fruits-and-vegetables/"'));
 assert.ok(stage.includes('Fruits &amp; Vegetables'));
 assert.ok(stage.includes('href="/flashcards/fruits-and-vegetables/"'));
 assert.ok(!library.includes('/preschool/3-years/fruits-and-vegetables/'),'books-only library lists no classes');
 // class 7 completion links class 8 as the real next stop
 assert.ok(c7.includes('href="/preschool/3-years/fruits-and-vegetables/"'));
 assert.ok(c7.includes('Go to the next class'));
 assert.ok(!c7.includes('More preschool classes</h3>'),'class 7 now points to the real next class');
 // the class 7→8 chain did not break the class 6→7 link
 assert.ok(c7.includes('this class follows Animals &amp; Their Sounds on the preschool path'));
});

test('class 8 keeps the no-score, no-timer, no-streak promises',()=>{
 const clean=h=>h
  .replace(/no scores, no timers and nothing to lose/g,'')
  .replace(/no points, no timers/g,'')
  .replace(/no scores, no sign-up/g,'')
  .replace(/no hurry, no score, just pairs/g,'')
  .replace(/there is never a score at the end/g,'')
  .replace(/no score at the end/g,'')
  .replace(/no scores, no timers, nothing stored/g,'')
  .replace(/free of scores and negotiations/g,'');
 for(const [name,htmlRaw] of [['class',c8],['set',c8set],['print',c8p]]){
  const html=clean(htmlRaw);
  assert.doesNotMatch(html,/\bscore\b|\btimer\b|\bstreak\b|leaderboard|points for|countdown/i,name+' stays score-free');
 }
 assert.ok(!c8.includes('setInterval')&&!c8.includes('countdown'),'no timers');
});
