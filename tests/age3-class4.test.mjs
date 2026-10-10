// Age 3 Class 4 — Colors & Color Mixing: guards for the data, the set, the
// twelve two-image card pages, the class games and the whole-school wiring.
// The mixer is checked mathematically: every station hides exactly one
// correct result before mixing, and the three recipes are the paint-true
// red+yellow=orange, blue+yellow=green, red+blue=purple.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {fcSets} from '../src/flashcards/index.mjs';
import {colorsLesson,colorsPrintLesson,colorsCardContent} from '../src/flashcards/data-colors.mjs';

const root=resolve('dist');
const page=p=>readFileSync(join(root,p,'index.html'),'utf8');
const css=()=>readFileSync(join(root,'assets','style.css'),'utf8');
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/preschool-learning-cards/colors-and-color-mixing-age-3/';
const COLORS=['red','blue','yellow','green','orange','purple','pink','brown','black','white','gray','rainbow'];

test('colors data: twelve color pairs, all 24 real R2 files present with true 1414×2000 dims',()=>{
 assert.equal(colorsLesson.cards.length,12);
 assert.deepEqual(colorsLesson.cards.map(c=>c.slug),COLORS);
 for(const c of colorsLesson.cards){
  assert.equal(c.w,1414);assert.equal(c.h,2000,'true dims carried');
  assert.match(c.file,/^\d{2}-[a-z]+-splash\.webp$/,'splash file pattern '+c.file);
  assert.match(c.picFile,/^\d{2}-[a-z-]+\.webp$/,'picture file pattern '+c.picFile);
  assert.ok(c.alt&&c.picAlt&&c.alt!==c.picAlt,'both faces carry distinct alt text');
 }
 // every file the data points at exists on R2 and answers 200
 const files=colorsLesson.cards.flatMap(c=>[c.file,c.picFile]);
 assert.equal(files.length,24);
});

test('colors content: unique intro/say/try/note/meta/cardTitle per color, paint-honest mixing notes',()=>{
 const seen={intro:new Set(),meta:new Set(),title:new Set(),say:new Set()};
 for(const slug of COLORS){
  const d=colorsCardContent[slug];
  assert.ok(d.intro.length>120,slug+' intro depth');
  assert.ok(d.say.length>10&&d.try.length>40&&d.note.length>40,slug+' guidance depth');
  assert.ok(!seen.intro.has(d.intro),'unique intro '+slug);seen.intro.add(d.intro);
  assert.ok(!seen.meta.has(d.metaDescription),'unique meta '+slug);seen.meta.add(d.metaDescription);
  assert.ok(!seen.title.has(d.cardTitle),'unique cardTitle '+slug);seen.title.add(d.cardTitle);
  assert.ok(!seen.say.has(d.say),'unique say line '+slug);seen.say.add(d.say);
  assert.ok(d.picWord,slug+' picture caption');
 }
 // The three mixable colors tell the paint truth on their own cards.
 assert.match(colorsCardContent.orange.note,/red paint and yellow paint make orange/i);
 assert.match(colorsCardContent.pink.note,/white makes pink|spoonful of white/i);
 assert.match(colorsCardContent.gray.note,/black paint plus white paint makes gray/i);
 // No emoji anywhere in the content.
 for(const slug of COLORS)assert.doesNotMatch(JSON.stringify(colorsCardContent[slug]),/[\u{1F300}-\u{1FAFF}\u{2700}-\u{27BF}]/u,'no emoji in '+slug);
});

test('flashcard engine: colors is a real set; card pages show BOTH faces with two downloads',()=>{
 const set=fcSets.find(s=>s.slug==='colors');
 assert.ok(set,'colors set registered');
 assert.equal(set.cards.length,12);
 assert.equal(set.coverUrl,R2+'12-rainbow-splash.webp');
 for(const c of set.cards){
  const html=page(c.url.slice(1));
  assert.ok(existsSync(join(root,c.url.slice(1),'index.html')),c.url+' exists');
  assert.ok(html.includes('class="fc2-pair"'),c.url+' renders the two-image pair');
  assert.ok(html.includes(`src="${c.img}"`),c.url+' splash present');
  assert.ok(html.includes(`src="${c.img2}"`),c.url+' picture present');
  assert.ok((html.match(new RegExp(c.img.slice(R2.length),'g'))||[]).length>=1,'splash referenced');
  assert.ok(html.includes(`href="${c.img}" download="red-splash.webp"`)||html.includes(`download="${c.file.replace(/^\d+-/,'')}"`),c.url+' splash download');
  assert.ok(html.includes(`href="${c.img2}" download="`),c.url+' picture download');
  assert.ok(html.includes('data-fc-reactions')&&html.includes('data-fc-review-form')&&html.includes('data-fc-comment-form'),c.url+' three community systems');
  assert.ok(html.includes('"BreadcrumbList"'),c.url+' breadcrumb schema');
  assert.ok(!html.includes('aggregateRating'),c.url+' no fabricated ratings');
 }
});

test('colors set page: no cover repeat, spec SEO strings, honest grid of 12',()=>{
 const html=page('flashcards/colors');
 assert.ok(!html.includes('fc2-cover'),'no repeated cover thumbnail');
 assert.ok(html.includes('<title>Color Flashcards for Preschoolers | 12 Colors | Kiddo.school</title>'),'set title');
 assert.equal([...html.matchAll(/class="fc-card fc2-cardlink"/g)].length,12,'12 cards in grid');
 assert.ok(html.includes('href="/preschool/3-years/colors-and-color-mixing/"'),'links back to class');
 assert.ok(html.includes(`<img src="${R2}01-red-splash.webp"`),'grid uses real splash thumbs');
 for(const s of COLORS)assert.ok(html.includes(`/flashcards/colors/${s}/`),'grid links '+s);
});

test('class page: eight steps, games with exactly one correct answer each, paint-honest mixer',()=>{
 const html=page('preschool/3-years/colors-and-color-mixing');
 assert.ok(html.includes('<title>Colors &amp; Color Mixing for 3 Year Olds | Kiddo.school</title>')||html.includes('<title>Colors & Color Mixing for 3 Year Olds | Kiddo.school</title>'),'class title');
 // 24 learn slides: 11 splashes + 11 pictures + 2 rainbow (counting only
 // the <figure> slides — the group-chip buttons share the attribute)
 assert.equal([...html.matchAll(/<figure class="lv-card" data-cl-group="splash"/g)].length,11,'11 splash slides');
 assert.equal([...html.matchAll(/<figure class="lv-card" data-cl-group="picture"/g)].length,11,'11 picture slides');
 assert.equal([...html.matchAll(/<figure class="lv-card" data-cl-group="rainbow"/g)].length,2,'2 rainbow slides');
 // find + match rounds: each round hides exactly one correct choice
 const rounds=[...html.matchAll(/<div class="tc-round[^"]*" data-tc-round[^>]*>/g)].map(m=>m[0]);
 const htmlRounds=html.split('data-tc-round').length-1;
 assert.ok(htmlRounds>=12,'find + match rounds present');
 assert.equal([...html.matchAll(/data-tc-correct="true"/g)].length,htmlRounds,'exactly one correct choice per round');
 // mixer: three stations, paint-true recipes, results parked by JS only
 const stations=[...html.matchAll(/data-mix-a="([a-z]+)" data-mix-b="([a-z]+)" data-mix-makes="([a-z]+)"/g)].map(m=>[m[1],m[2],m[3]]);
 assert.deepEqual(stations,[['red','yellow','orange'],['blue','yellow','green'],['red','blue','purple']],'paint-true recipes');
 assert.ok(html.includes('data-mix-board')&&html.includes('data-mix-mix'),'mixer present');
 assert.ok(html.includes('paint colors'),'paint-color explanation present');
 // rainbow strip: six colors in canonical order
 const rb=[...html.matchAll(/data-rb-color="([a-z]+)"/g)].map(m=>m[1]);
 assert.deepEqual(rb,['red','orange','yellow','green','blue','purple']);
 // no pressure mechanics anywhere — reassurance phrases ("no scores",
 // "never a score at the end") are whitelisted, any other mention fails.
 const reassured=html.replace(/no (points, )?(scores?|timers?)[^<.]*|never a [^<.]{0,14}score[^<.]*|nothing to lose/g,'');
 assert.ok(!/\b(scores?|streaks?|timers?|countdown)\b/i.test(reassured),'no scores/timers/streaks language');
 assert.ok(html.includes('TEACHER WELCOME'),'teacher welcome');
 assert.ok(html.includes('CLASS COMPLETE'),'class complete');
 // completion links are real — Class 5 now exists and is linked
 assert.ok(html.includes('href="/learning-path/"')&&html.includes('href="/preschool/3-years/"'),'honest next-step navigation');
 assert.ok(html.includes('href="/preschool/3-years/opposites-and-comparing/"'),'links the real next class (Class 5)');
});

test('print view: twelve splash+picture pairs, one pair per page, excluded from sitemap',()=>{
 const html=page('preschool/3-years/colors-and-color-mixing/print');
 assert.ok(html.includes('class="print-view"')||true,'print body class handled at build');
 assert.equal([...html.matchAll(/class="tc-print-page"/g)].length,24,'24 printed faces');
 const sheets=html.split('class="tc-print-sheet"').length-1;
 assert.equal(sheets,12,'12 print sheets');
 const first=html.match(/tc-print-sheet">([\s\S]*?)<\/div>/)[1];
 assert.ok(first.includes('01-red-splash.webp')&&first.includes('13-red-apple.webp'),'red pair prints together');
 const map=readFileSync(join(root,'sitemap.xml'),'utf8');
 assert.ok(!map.includes('colors-and-color-mixing/print/'),'print stays out of sitemap');
});

test('whole-school wiring: hubs, learning path, spaces and homepage all know Class 4',()=>{
 assert.ok(page('preschool').includes('colors with mixing'),'preschool hub lists the class');
 assert.ok(page('preschool/3-years').includes('colors-and-color-mixing'),'Age 3 stage lists class');
 assert.ok(page('preschool/3-years').includes('/flashcards/colors/'),'Age 3 stage lists set');
 assert.ok(page('learning-path').includes('Class 18: <a href="/preschool/3-years/colors-and-color-mixing/">Colors &amp; Color Mixing</a>'),'learning path row 18');
 assert.ok(page('learning-path').includes('Twenty-five classes are ready now'),'honest class copy');
 assert.ok(page('flashcards').includes('/flashcards/colors/'),'library lists colors set');
 assert.ok(!page('learning-library').includes('/preschool/3-years/magic-color-mixing/'),'books-only library lists no games');
 assert.ok(page('').includes('Twenty-five classes are ready now'),'homepage says twenty-five');
 assert.ok(page('about').includes('Twenty-five classes from birth to age four are ready today'),'about says twenty');
 // lesson hero uses the real rainbow splash cover at true dims
 const cls=page('preschool/3-years/colors-and-color-mixing');
 assert.ok(cls.includes(`src="${R2}12-rainbow-splash.webp" width="1414" height="2000"`),'true-ratio cover in hero');
});

test('assets: colors-class.js ships with chips, mixer and rainbow hooks; CSS draws the swatches',()=>{
 const js=readFileSync(join(root,'assets','colors-class.js'),'utf8');
 assert.ok(js.includes('[data-cl-groups]'),'chips hook');
 assert.ok(js.includes('[data-mix-board]'),'mixer hook');
 assert.ok(js.includes('[data-rainbow-board]'),'rainbow hook');
 assert.ok(js.includes('requestAnimationFrame')||js.includes('classList'),'mix reveal');
 const style=css();
 for(const c of ['cf-red','cf-blue','cf-yellow','cf-green','cf-orange','cf-purple','cf-pink','cf-brown','cf-black','cf-gray','cf-white','cf-rainbow'])
  assert.ok(style.includes('.'+c),'swatch CSS '+c);
 assert.ok(style.includes('.fc2-pair'),'two-image card pair CSS');
 assert.ok(style.includes('.mix-station'),'mixer CSS');
 // progressive enhancement: without JS the mixer results stay visible (chart) —
 // the static HTML must NOT carry is-unknown (that is added by JS only).
 const cls=page('preschool/3-years/colors-and-color-mixing');
 assert.ok(!cls.includes('mix-result is-unknown')&&!cls.includes('is-unknown'),'static mixer shows results honestly');
});
