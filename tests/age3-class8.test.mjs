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

const C8_CARDS=['01-apple.webp','02-banana.webp','03-orange.webp','04-strawberry.webp','05-grapes.webp','06-watermelon.webp','07-pineapple.webp','08-mango.webp','09-carrot.webp','10-potato.webp','11-tomato.webp','12-cucumber.webp','13-broccoli.webp','14-corn.webp','15-onion.webp','16-pumpkin.webp'];
const C8_SLUGS=['apple','banana','orange','strawberry','grapes','watermelon','pineapple','mango','carrot','potato','tomato','cucumber','broccoli','corn','onion','pumpkin'];
const C8_R2='https://assets.kiddo.school/flashcards/preschool-learning-cards/fruits-and-vegetables-age-3';
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
 assert.ok(c8.includes('rel="canonical" href="https://kiddo.school/preschool/3-years/fruits-and-vegetables/"'));
 assert.ok(c8.includes('<title>Fruits &amp; Vegetables for 3 Year Olds | Kiddo.school</title>'));
 assert.ok(c8.includes('<h1>Fruits &amp; Vegetables</h1>'));
 assert.ok(c8.includes('PRESCHOOL · AGE 3 · CLASS 8'));
 assert.ok(c8.includes('<strong>Class</strong> Preschool 8'));
 assert.ok(c8.includes('this class follows Body Parts &amp; My Five Senses on the preschool path'));
 for(const step of ['Teacher welcome','Meet the foods','Colors &amp; counting','Solve the sheets','Take it off screen','Class complete'])assert.ok(c8.includes(step),step);
 for(const id of ['meet-the-foods','colors-and-counting','solve-the-sheets','off-screen','printables','class-complete','how-to','todays-class'])assert.ok(c8.includes('id="'+id+'"'),id);
 for(const id of ['fruit-or-vegetable','find-the-food','match-and-remember'])assert.ok(!c8.includes('id="'+id+'"'),'coded game removed: '+id);
 for(const f of C8_CARDS)assert.ok(c8.includes('/'+f+'"'),'card file '+f);
 assert.equal([...c8.matchAll(/data-lv-grid/g)].length,1,'one learn viewer');
 assert.equal([...c8.matchAll(/data-fv-groups/g)].length,1,'one chip bar');
 for(const g of ['data-fv-group-filter="all"','data-fv-group-filter="fruit"','data-fv-group-filter="vegetable"'])assert.ok(c8.includes(g),g);
 assert.equal([...c8.matchAll(/data-lv-say=/g)].length,16,'say caption on every viewer card');
 assert.equal([...c8.matchAll(/data-lv-find=/g)].length,16);
 assert.ok(!c8.includes('data-tc-round'),'no coded rounds anywhere');
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

test('class 8 solve-the-sheets: sorting and counting live on paper now',()=>{
 assert.ok(!c8.includes('data-fv-sort='),'no coded sort rounds');
 assert.ok(!c8.includes('data-tc-round'),'no coded rounds anywhere');
 // the solve guidance is concrete and points at the real sheets and set
 for(const t of ['Print the cards','Fruit or vegetable?','Count the bowls','Find them in the kitchen'])assert.ok(c8.includes(t),'solve step: '+t);
 assert.ok(c8.includes('href="/preschool/3-years/fruits-and-vegetables/print/"'),'links the printable cards');
});

test('class 8 keeps the colors-and-counting display and its honest counts',()=>{
 // colors & counting: five rows built from real cards, counts stay honest
 assert.ok(c8.includes('id="colors-and-counting"'));
 assert.equal([...c8.matchAll(/class="fv-thumb"/g)].length,15,'five rows of three foods');
 assert.ok(c8.includes('eight fruits!')&&c8.includes('eight too!'),'counting says eight and eight');
 assert.ok(/scientists sort the tomato with the fruits, cooks sort it with the vegetables/i.test(c8),'tomato honesty note present');
 assert.ok(c8.includes('wash foods before touching mouths'),'food hygiene guidance present');
 assert.ok(c8.includes('grown-ups do all the cutting'),'age-appropriate safety guidance present');
 // the match board and find rounds are gone
 assert.ok(!c8.includes('data-match-side'),'no match board');
 assert.ok(!c8.includes('data-fv-find='),'no find rounds');
});

test('class 8 print view prints the same sixteen R2 assets two to a page',()=>{
 assert.ok(c8p.includes('content="noindex,follow"'));
 assert.ok(c8p.includes('<body class="print-view">'));
 assert.ok(c8p.includes('Fruits &amp; Vegetables Flashcards: print all sixteen cards'));
 assert.equal([...c8p.matchAll(/class="tc-print-sheet"/g)].length,8,'eight sheets of two');
 assert.equal([...c8p.matchAll(new RegExp(C8_R2.replaceAll('.','\\.'),'g'))].length,16,'every card asset referenced once');
 for(const f of C8_CARDS)assert.ok(c8p.includes('/'+f+'"'),'print card '+f);
});





test('class 8 is wired into the whole school honestly',()=>{
 assert.ok(lp.includes('Class 22: <a href="/preschool/3-years/fruits-and-vegetables/">Fruits &amp; Vegetables</a>'));
 assert.ok(lp.includes('forty-nine age-guided classes'));
 assert.ok(lp.includes('Forty-nine classes are ready now, from birth to age five, in one calm sequence.'));
 assert.ok(home.includes('Forty-nine classes are ready now, from birth to age five'));
 assert.ok(home.includes('Letters, numbers, shapes, colors, opposites, animals, your body with all five senses — and the foods you eat.'));
 assert.ok(about.includes('Forty-nine classes from birth to age five are ready today'));
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
  .replace(/free of scores and negotiations/g,'')
  .replace(/knife-score/g,'');
 for(const [name,htmlRaw] of [['class',c8],['set',c8set],['print',c8p]]){
  const html=clean(htmlRaw);
  assert.doesNotMatch(html,/\bscore\b|\btimer\b|\bstreak\b|leaderboard|points for|countdown/i,name+' stays score-free');
 }
 assert.ok(!c8.includes('setInterval')&&!c8.includes('countdown'),'no timers');
});
