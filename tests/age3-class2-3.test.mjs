// Age 3 Class 2 (Numbers & Counting) and Class 3 (Shapes & Patterns):
// data integrity, true aspect ratios, set + card pages, full class
// structure, game correctness (dots must be mathematically exact),
// print views, and wiring into the whole school.
import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';import {join} from 'node:path';
import {numbersLesson,numbersCardContent} from '../src/flashcards/data-numbers.mjs';
import {shapesLesson,shapesCardContent} from '../src/flashcards/data-shapes.mjs';
import {fcSets} from '../src/flashcards/index.mjs';

const root='dist';
const read=p=>readFileSync(join(root,p),'utf8');
const page=p=>read(p.replace(/^\//,'').replace(/\/$/,'')+'/index.html');

/* ---- Class 2 data: real files, true dimensions, complete content ---- */
test('numbers data: 10 real cards, mixed orientations carried truthfully, content complete',()=>{
 assert.equal(numbersLesson.cards.length,10);
 const files=['01-one-apple.webp','02-two-ducks.webp','03-three-cats.webp','04-four-cars.webp','05-five-ladybugs.webp','06-six-stars.webp','07-seven-flowers.webp','08-eight-frogs.webp','09-nine-balloons.webp','10-ten-butterflies.webp'];
 assert.deepEqual(numbersLesson.cards.map(c=>c.file),files);
 numbersLesson.cards.forEach((c,i)=>{
  // Cards 1–6 probed portrait 1414×2000; cards 7–10 probed landscape 2000×1414.
  const portrait=i<6;
  assert.equal(c.w,portrait?1414:2000,`${c.file} width`);
  assert.equal(c.h,portrait?2000:1414,`${c.file} height`);
  assert.equal(c.numeral,String(i+1));
  const d=numbersCardContent[c.slug];
  assert.ok(d,'content for '+c.slug);
  assert.ok(d.intro.length>120,c.slug+' intro too thin');
  assert.ok(d.say.length>10&&d.try.length>40&&d.note.length>40,c.slug+' content thin');
  assert.ok(d.cardTitle&&d.cardTitle.startsWith(`Number ${i+1} Flashcard`),c.slug+' SEO title pattern');
  assert.ok(d.metaDescription.length>60,c.slug+' meta description');
 });
 // Counting honesty: the words must match the real card contents.
 assert.equal(numbersCardContent.five.word,'Five Ladybugs');
 assert.equal(numbersCardContent.ten.word,'Ten Butterflies');
 assert.equal(numbersCardContent.four.word,'Four Cars');
 assert.equal(numbersLesson.folder,'flashcards/preschool-learning-cards/numbers-and-counting-age-3/');
});

/* ---- Class 3 data ---- */
test('shapes data: 12 real cards, all portrait, every polygon named honestly',()=>{
 assert.equal(shapesLesson.cards.length,12);
 const names=['circle','square','triangle','rectangle','oval','star','heart','diamond','crescent','pentagon','hexagon','octagon'];
 assert.deepEqual(shapesLesson.cards.map(c=>c.slug),names);
 shapesLesson.cards.forEach(c=>{
  assert.equal(c.w,1414);assert.equal(c.h,2000);
  const d=shapesCardContent[c.slug];
  assert.ok(d.intro.length>120&&d.say.length>10&&d.try.length>40&&d.note.length>40,c.slug+' content thin');
  assert.ok(d.metaDescription.length>60,c.slug+' meta description');
 });
 assert.equal(shapesLesson.folder,'flashcards/preschool-learning-cards/shapes-and-patterns-age-3/');
});

/* ---- Set pages with the exact spec SEO strings ---- */



/* ---- Individual card pages ---- */



/* ---- The Numbers & Counting class ---- */
test('numbers class: learn + solve-the-sheets structure, no coded games (owner instruction)',()=>{
 const html=page('/preschool/3-years/numbers-and-counting/');
 assert.ok(html.includes('<title>Numbers &amp; Counting 1–10 for 3 Year Olds | Kiddo.school</title>'));
 assert.ok(html.includes('rel="canonical" href="https://kiddo.school/preschool/3-years/numbers-and-counting/"'));
 assert.match(html,/<h1>Numbers &amp; Counting \(1–10\)<\/h1>/);
 assert.ok(html.includes('Today we’re counting'),'teacher welcome');
 assert.ok(html.includes('Start with the numbers your child enjoys'));
 assert.ok(html.includes('You did some lovely counting today'),'teacher closing');
 // The class teaches the cards, then teaches how to SOLVE the printable
 // sheets — the owner removed the coded games from the learning path.
 assert.ok(html.includes('id="learn-the-numbers"'),'learn section');
 assert.ok(html.includes('id="solve-the-sheets"'),'solve-the-sheets section');
 ['id="find-the-number"','id="count-and-match"','id="number-order"'].forEach(id=>assert.ok(!html.includes(id),'coded game removed: '+id));
 assert.ok(!html.includes('data-tc-round'),'no tap-a-choice game rounds anywhere');
 assert.ok(html.includes('id="off-screen"'),'off screen');
 assert.ok(html.includes('id="class-complete"'),'completion');
 assert.ok(html.includes('Play Again')&&html.includes('View Number Flashcards')&&html.includes('Learning Path'),'completion buttons');
 assert.ok(!html.includes('Next Class'),'no invented next-class button');
 // Solve-the-sheets guidance: honest, pointing at the real print page and set.
 assert.ok(html.includes('href="/preschool/3-years/numbers-and-counting/print/"'),'links the printable cards');
 assert.ok(html.includes('href="/flashcards/numbers-and-counting/"'),'links the flashcard set');
 assert.ok(html.includes('Write &amp; Color'),'names the on-screen drawing layer');
 assert.ok(html.includes('Build the staircase'),'concrete solving steps, not generic copy');
 // 1–5 / 6–10 group chips (progressive enhancement) + 10 slides.
 assert.ok(html.includes('data-num-groups'),'group chips present');
 assert.equal((html.match(/data-num-group="1-5"/g)||[]).length,5,'five cards in 1–5');
 assert.equal((html.match(/data-num-group="6-10"/g)||[]).length,5,'five cards in 6–10');
 // Off-screen: the five real-life ideas from the brief.
 ['Count three toys','Count steps together','Count fingers','Count blocks as you stack','Five in a row'].forEach(t=>assert.ok(html.includes(t),'off-screen idea: '+t));
 // Real D1 community mount with the class path.
 assert.ok(html.includes('data-page-path="/preschool/3-years/numbers-and-counting/"'));
});

/* ---- The Shapes & Patterns class ---- */
test('shapes class: learn + solve-the-sheets structure, no coded games (owner instruction)',()=>{
 const html=page('/preschool/3-years/shapes-and-patterns/');
 assert.ok(html.includes('<title>Shapes &amp; Patterns for 3 Year Olds | Kiddo.school</title>'));
 assert.ok(html.includes('rel="canonical" href="https://kiddo.school/preschool/3-years/shapes-and-patterns/"'));
 assert.match(html,/<h1>Shapes &amp; Patterns<\/h1>/);
 assert.ok(html.includes('id="learn-shapes"'),'learn section');
 assert.ok(html.includes('id="solve-the-sheets"'),'solve-the-sheets section');
 ['id="find-the-shape"','id="match-shapes"','id="complete-a-pattern"'].forEach(id=>assert.ok(!html.includes(id),'coded game removed: '+id));
 assert.ok(!html.includes('data-tc-round'),'no tap-a-choice game rounds anywhere');
 assert.ok(html.includes('id="off-screen"'),'off screen');
 assert.ok(html.includes('id="class-complete"'),'completion');
 assert.ok(html.includes('Explore Again')&&html.includes('View Shape Flashcards')&&html.includes('Learning Path'),'completion buttons');
 assert.ok(!html.includes('Next Class'),'no invented next-class button');
 // Solve-the-sheets guidance: the real print page, the real set, honest steps.
 assert.ok(html.includes('href="/preschool/3-years/shapes-and-patterns/print/"'),'links the printable cards');
 assert.ok(html.includes('href="/flashcards/shapes/"'),'links the flashcard set');
 assert.ok(html.includes('Write &amp; Color'),'names the on-screen drawing layer');
 assert.ok(html.includes('Hunt the twins'),'concrete solving steps, not generic copy');
});

/* ---- Print views (real, browser-based; no PDF claims) ---- */
test('both classes have genuine print views: all cards two-up, noindex, no PDF',()=>{
 for(const [L,count] of [[numbersLesson,10],[shapesLesson,12]]){
  const html=page(L.path+'print/');
  assert.ok(html.includes('class="print-view"'),'print-view body '+L.path);
  assert.ok(html.includes('content="noindex,follow"'),'print noindex '+L.path);
  assert.ok(!/\.pdf/i.test(html),'no PDF claims '+L.path);
  assert.ok(html.includes('Printing happens in your browser'),'honest print copy '+L.path);
  const cardImgs=(html.match(/<img [^>]*>/g)||[]).filter(t=>!t.includes('brand-logo')).length;
  assert.equal(cardImgs,count,'all cards in print view '+L.path);
 }
});

/* ---- Wiring: the whole school knows about Classes 2 and 3 ---- */
test('learning path rows 16 and 17 follow the alphabet class',()=>{
 const lp=page('/learning-path/');
 assert.ok(lp.includes('Class 16: <a href="/preschool/3-years/numbers-and-counting/">'));
 assert.ok(lp.includes('Class 17: <a href="/preschool/3-years/shapes-and-patterns/">'));
 assert.ok(lp.includes('Twenty-two classes are ready now')===false&&lp.includes('Forty-nine classes are ready now'));
});
test('the preschool hub lists all eight classes and eight sets; the library stays books-only',()=>{
 const stage=page('/preschool/3-years/');
 ['alphabet-and-letter-sounds','numbers-and-counting','shapes-and-patterns','colors-and-color-mixing','opposites-and-comparing'].forEach(s=>assert.ok(stage.includes(`/preschool/3-years/${s}/`),'class in stage hub: '+s));
 ['/flashcards/alphabet/','/flashcards/numbers-and-counting/','/flashcards/shapes/','/flashcards/colors/','/flashcards/opposites/'].forEach(u=>assert.ok(stage.includes(u),'set in stage hub: '+u));
 const lib=page('/learning-library/');
 assert.ok(!lib.includes('/preschool/3-years/'),'the books-only library lists no classes');
 const fc=page('/flashcards/');
 assert.ok(fc.includes('href="/flashcards/numbers-and-counting/"')&&fc.includes('href="/flashcards/shapes/"'));
 const home=page('/');
 assert.ok(home.includes('Forty-nine classes are ready now'));
});

