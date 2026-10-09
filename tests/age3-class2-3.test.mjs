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
test('numbers set page: exact title, meta, canonical, H1 and all ten card links',()=>{
 const html=page('/flashcards/numbers-and-counting/');
 assert.ok(html.includes('<title>Number Flashcards 1–10 for Preschoolers | Kiddo.school</title>'));
 assert.ok(html.includes('content="Explore numbers 1 to 10 with colorful picture flashcards, counting prompts and simple activities. View, download and practice each number together."'));
 assert.ok(html.includes('rel="canonical" href="https://kiddo-school.pages.dev/flashcards/numbers-and-counting/"'));
 assert.match(html,/<h1>Numbers 1–10 Flashcards<\/h1>/);
 const slugs=['one','two','three','four','five','six','seven','eight','nine','ten'];
 slugs.forEach(s=>assert.ok(html.includes(`href="/flashcards/numbers-and-counting/${s}/"`),'card link '+s));
 assert.ok(html.includes('href="/preschool/3-years/numbers-and-counting/"'),'set links to its class');
 assert.ok(html.includes('href="/preschool/3-years/numbers-and-counting/print/"'),'set links the real print view');
 assert.ok(!/\.pdf/i.test(html),'no fabricated PDF claims');
});
test('shapes set page: exact title, H1, twelve card links, real related sets',()=>{
 const html=page('/flashcards/shapes/');
 assert.ok(html.includes('<title>Shape Flashcards for Preschoolers | 12 Shapes | Kiddo.school</title>'));
 assert.match(html,/<h1>Shape Flashcards for Preschoolers<\/h1>/);
 ['circle','square','triangle','rectangle','oval','star','heart','diamond','crescent','pentagon','hexagon','octagon'].forEach(s=>
  assert.ok(html.includes(`href="/flashcards/shapes/${s}/"`),'card link '+s));
 assert.ok(html.includes('href="/preschool/3-years/shapes-and-patterns/"'),'set links to its class');
 assert.ok(html.includes('href="/flashcards/colors-and-shapes/"'),'related real set');
});

/* ---- Individual card pages ---- */
test('numbers card pages: 10 unique spec-pattern titles, numeral H1s, downloads, prev/next, community',()=>{
 const seen=new Set();
 const titles=new Set();
 for(let i=1;i<=10;i++){
  const slug=['one','two','three','four','five','six','seven','eight','nine','ten'][i-1];
  const html=page(`/flashcards/numbers-and-counting/${slug}/`);
  const c=numbersLesson.cards[i-1];
  assert.ok(html.includes(`rel="canonical" href="https://kiddo-school.pages.dev/flashcards/numbers-and-counting/${slug}/"`));
  assert.ok(html.includes(`data-page-path="/flashcards/numbers-and-counting/${slug}/"`),'community mount on '+slug);
  assert.ok(html.includes(`<h1>Number ${i} Flashcard — `),'numeral H1 '+slug);
  assert.ok(html.includes('Download card'),'download button '+slug);
  assert.ok(html.includes('href="https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/preschool-learning-cards/numbers-and-counting-age-3/'+c.file+'" download='),'real R2 download '+slug);
  assert.ok(html.includes('Previous card')&&html.includes('Next card'),'prev/next '+slug);
  assert.ok(html.includes('Related')||html.includes('RELATED CARDS'),'related cards '+slug);
  assert.ok(html.includes('VIEW FULL SET')||html.includes('View full set'),'view full set '+slug);
  // True aspect ratio in the hero: landscape cards must carry 2000×1414.
  assert.ok(new RegExp(`<img src="[^"]*${c.file}" width="${c.w}" height="${c.h}"`).test(html),'true dims '+slug);
  const m=html.match(/<title>(.*?)<\/title>/);
  assert.ok(m,'title '+slug);
  assert.ok(m[1].includes(`Count `),'counting title '+slug);
  titles.add(m[1]);
  const h1s=(html.match(/<h1[ >]/g)||[]).length;
  assert.equal(h1s,1,'exactly one H1 '+slug);
 }
 assert.equal(titles.size,10,'all ten titles unique');
});
test('shapes card pages: 12 unique titles, one H1 each, downloads, cross-set twins',()=>{
 const titles=new Set();
 for(const c of shapesLesson.cards){
  const html=page(`/flashcards/shapes/${c.slug}/`);
  assert.ok(html.includes(`rel="canonical" href="https://kiddo-school.pages.dev/flashcards/shapes/${c.slug}/"`));
  assert.ok(html.includes('Download card'),'download '+c.slug);
  const m=html.match(/<title>(.*?)<\/title>/);
  titles.add(m[1]);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,'one H1 '+c.slug);
  assert.ok(new RegExp(`width="${c.w}" height="${c.h}"`).test(html),'true dims '+c.slug);
 }
 assert.equal(titles.size,12,'all twelve titles unique');
 // circle/square/star/heart/rectangle/oval have real twins in colors-and-shapes.
 const circle=page('/flashcards/shapes/circle/');
 assert.ok(circle.includes('href="/flashcards/colors-and-shapes/circle/"'),'cross-set related twin');
});

/* ---- The Numbers & Counting class ---- */
test('numbers class: spec structure, welcome + closing quotes, games with exact dot counts',()=>{
 const html=page('/preschool/3-years/numbers-and-counting/');
 assert.ok(html.includes('<title>Numbers &amp; Counting 1–10 for 3 Year Olds | Kiddo.school</title>'));
 assert.ok(html.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/numbers-and-counting/"'));
 assert.match(html,/<h1>Numbers &amp; Counting \(1–10\)<\/h1>/);
 assert.ok(html.includes('Today we’re counting'),'teacher welcome');
 assert.ok(html.includes('Start with the numbers your child enjoys'));
 assert.ok(html.includes('You did some lovely counting today'),'teacher closing');
 assert.ok(html.includes('id="learn-the-numbers"'),'learn section');
 assert.ok(html.includes('id="find-the-number"'),'find game');
 assert.ok(html.includes('id="count-and-match"'),'count and match');
 assert.ok(html.includes('id="number-order"'),'number order');
 assert.ok(html.includes('id="off-screen"'),'off screen');
 assert.ok(html.includes('id="class-complete"'),'completion');
 assert.ok(html.includes('Play Again')&&html.includes('View Number Flashcards')&&html.includes('Learning Path'),'completion buttons');
 assert.ok(html.includes('Play Again'));
 // No fake next class: completion links the real Learning Path instead.
 assert.ok(!html.includes('Next Class'),'no invented next-class button');
 // 1–5 / 6–10 group chips (progressive enhancement) + 10 slides.
 assert.ok(html.includes('data-num-groups'),'group chips present');
 assert.equal((html.match(/data-num-group="1-5"/g)||[]).length,5,'five cards in 1–5');
 assert.equal((html.match(/data-num-group="6-10"/g)||[]).length,5,'five cards in 6–10');
 // Find the Number: 6 rounds of three numeral choices.
 const find=html.split('id="find-the-number"')[1].split('</section>')[0];
 assert.equal((find.match(/data-tc-round/g)||[]).length,6);
 assert.equal((find.match(/data-tc-correct="true"/g)||[]).length,6,'one right answer per round');
 // Count and Match: dots are ALWAYS mathematically correct.
 const cm=html.split('id="count-and-match"')[1].split('id="number-order"')[0];
 const rounds=cm.split('data-tc-round').slice(1);
 assert.equal(rounds.length,5);
 rounds.forEach((r,i)=>{
  const dots=(r.match(/class="dot"/g)||[]).length;
  const correct=r.match(/aria-label="The number (\d+)"[^>]*data-tc-correct="true"/)||r.match(/data-tc-correct="true"[^>]*aria-label="The number (\d+)"/);
  assert.ok(correct,'correct choice in round '+i);
  assert.equal(dots,Number(correct[1]),`round ${i+1}: ${dots} dots must equal the answer ${correct[1]}`);
 });
 // Number order: two honest boards (1–5, 1–10) rendered in order, plus the JS note.
 const ord=html.split('id="number-order"')[1].split('</section>')[0];
 assert.ok(ord.includes('data-ord-max="5"')&&ord.includes('data-ord-max="10"'));
 assert.ok(ord.includes('needs JavaScript'),'honest no-JS note');
 // Off-screen: the five real-life ideas from the brief.
 ['Count three toys','Count steps together','Count fingers','Count blocks as you stack','Five in a row'].forEach(t=>assert.ok(html.includes(t),'off-screen idea: '+t));
 // Real D1 community mount with the class path.
 assert.ok(html.includes('data-page-path="/preschool/3-years/numbers-and-counting/"'));
});

/* ---- The Shapes & Patterns class ---- */
test('shapes class: learn/find/match/pattern structure, AB + AAB rounds, shape tiles not images',()=>{
 const html=page('/preschool/3-years/shapes-and-patterns/');
 assert.ok(html.includes('<title>Shapes &amp; Patterns for 3 Year Olds | Kiddo.school</title>'));
 assert.ok(html.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/shapes-and-patterns/"'));
 assert.match(html,/<h1>Shapes &amp; Patterns<\/h1>/);
 ['id="learn-shapes"','id="find-the-shape"','id="match-shapes"','id="complete-a-pattern"','id="off-screen"','id="class-complete"'].forEach(id=>assert.ok(html.includes(id),'section '+id));
 // Pattern rounds: three AB + three AAB, built from programmatic tiles.
 const pat=html.split('id="complete-a-pattern"')[1].split('</section>')[0];
 assert.equal((pat.match(/data-tc-round/g)||[]).length,6);
 assert.equal((pat.match(/pat-gap/g)||[]).length,6,'one gap per pattern round');
 assert.equal((pat.match(/data-tc-correct="true"/g)||[]).length,6,'one right answer per round');
 // The pattern rows must NOT embed card images — tiles only.
 assert.ok(!pat.includes('<img'),'pattern rows use shape tiles, not images');
 // Find + match rounds: one correct answer each, real card pictures in match.
 const find=html.split('id="find-the-shape"')[1].split('</section>')[0];
 assert.equal((find.match(/data-tc-round/g)||[]).length,6);
 const match=html.split('id="match-shapes"')[1].split('</section>')[0];
 assert.equal((match.match(/data-tc-round/g)||[]).length,6);
 assert.ok(match.includes('01-circle.webp'),'match game uses the real card pictures');
 assert.ok(html.includes('Explore Again')&&html.includes('View Shape Flashcards')&&html.includes('Learning Path'),'completion buttons');
 assert.ok(!html.includes('Next Class'),'no invented next-class button');
});

/* ---- Print views (real, browser-based; no PDF claims) ---- */
test('both classes have genuine print views: all cards two-up, noindex, no PDF',()=>{
 for(const [L,count] of [[numbersLesson,10],[shapesLesson,12]]){
  const html=page(L.path+'print/');
  assert.ok(html.includes('class="print-view"'),'print-view body '+L.path);
  assert.ok(html.includes('content="noindex,follow"'),'print noindex '+L.path);
  assert.ok(!/\.pdf/i.test(html),'no PDF claims '+L.path);
  assert.ok(html.includes('Printing happens in your browser'),'honest print copy '+L.path);
  const imgs=(html.match(/<img /g)||[]).length;
  assert.equal(imgs,count,'all cards in print view '+L.path);
 }
});

/* ---- Wiring: the whole school knows about Classes 2 and 3 ---- */
test('learning path rows 16 and 17 follow the alphabet class',()=>{
 const lp=page('/learning-path/');
 assert.ok(lp.includes('Class 16: <a href="/preschool/3-years/numbers-and-counting/">'));
 assert.ok(lp.includes('Class 17: <a href="/preschool/3-years/shapes-and-patterns/">'));
 assert.ok(lp.includes('Twenty classes are ready now')===false&&lp.includes('Twenty-one classes are ready now'));
});
test('preschool hubs and library list all seven classes and seven sets',()=>{
 const stage=page('/preschool/3-years/');
 ['alphabet-and-letter-sounds','numbers-and-counting','shapes-and-patterns','colors-and-color-mixing','opposites-and-comparing'].forEach(s=>assert.ok(stage.includes(`/preschool/3-years/${s}/`),'class in stage hub: '+s));
 ['/flashcards/alphabet/','/flashcards/numbers-and-counting/','/flashcards/shapes/','/flashcards/colors/','/flashcards/opposites/'].forEach(u=>assert.ok(stage.includes(u),'set in stage hub: '+u));
 const lib=page('/learning-library/');
 assert.ok(lib.includes('Counting (1–10)')&&lib.includes('Shapes &amp; Patterns'));
 const fc=page('/flashcards/');
 assert.ok(fc.includes('href="/flashcards/numbers-and-counting/"')&&fc.includes('href="/flashcards/shapes/"'));
 const home=page('/');
 assert.ok(home.includes('Twenty-one classes are ready now'));
});
test('sitemap, indexing stance and lesson wiring',()=>{
 const map=read('sitemap.xml');
 ['/preschool/3-years/numbers-and-counting/','/preschool/3-years/shapes-and-patterns/','/flashcards/numbers-and-counting/','/flashcards/shapes/','/flashcards/numbers-and-counting/five/','/flashcards/shapes/octagon/'].forEach(u=>assert.ok(map.includes(`<loc>https://kiddo-school.pages.dev${u}</loc>`),'sitemap '+u));
 assert.ok(!map.includes('numbers-and-counting/print/'),'print stays out of sitemap');
 assert.ok(!map.includes('shapes-and-patterns/print/'),'print stays out of sitemap');
 // The site stays OUT of search engines: noindex meta on new pages and robots disallow.
 const html=page('/preschool/3-years/numbers-and-counting/');
 assert.ok(html.includes('content="noindex,follow"'),'class page noindex');
 const robots=read('robots.txt');
 assert.ok(robots.includes('Disallow: /'),'robots still disallows crawling');
 // Both lesson pages carry the community mount and the flashcards link row.
 const nl=page('/preschool/3-years/numbers-and-counting/');
 assert.ok(nl.includes('Open the Numbers 1–10 flashcards'),'lesson links its set');
 const sl=page('/preschool/3-years/shapes-and-patterns/');
 assert.ok(sl.includes('Open the Shapes &amp; Patterns flashcards'),'lesson links its set');
});
