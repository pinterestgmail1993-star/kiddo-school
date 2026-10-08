// Kiddo School — Preschool 1 (Age 3): Alphabet & Letter Sounds.
// Guards the class page, the 26 individual card pages, the printable view,
// the preschool hubs and every place the class is wired into the school.
// The aspect-ratio rule is enforced here: every alphabet image must ship
// its real probed dimensions (1414×2000) — never a forced crop.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {existsSync} from 'node:fs';
import {alphabetLesson,alphabetMeta,alphabetCardContent} from '../src/flashcards/data-alphabet.mjs';
import {fcSets} from '../src/flashcards/index.mjs';
const root=resolve('dist');
const read=f=>readFileSync(f,'utf8');
const page=f=>readFileSync(join(root,f,'index.html'),'utf8');
const set=fcSets.find(s=>s.slug==='alphabet');
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const PREFIX='flashcards/preschool-learning-cards/alphabet-and-letter-sounds-age-3/';

test('alphabet set: 26 real cards, probed dimensions, clean slugs and URLs',()=>{
 assert.ok(set,'alphabet set built');
 assert.equal(set.cards.length,26);
 const expected=['apple','ball','cat','dog','elephant','fish','grapes','house','ice-cream','juice','kite','lion','moon','nest','orange','pig','queen','rainbow','sun','turtle','umbrella','van','whale','xylophone','yo-yo','zebra'];
 assert.deepEqual(set.cards.map(c=>c.slug),expected,'card slugs use the object names');
 set.cards.forEach((c,i)=>{
  assert.equal(c.letter,String.fromCharCode(97+i),`card ${i+1} is letter ${String.fromCharCode(97+i)}`);
  assert.equal(c.w,1414);assert.equal(c.h,2000,'all 26 cards are 1414×2000 portrait — probed, not guessed');
  assert.ok(c.img.startsWith(R2+PREFIX),`image points at the real R2 folder: ${c.img}`);
  assert.ok(existsSync(join(root,c.url.slice(1),'index.html')),`${c.url} built`);
  assert.ok(c.sound&&c.sound.length>60,`${c.slug} has an honest letter-sound note`);
 });
});

test('alphabet set page: exact SEO copy, card wall, print and class links',()=>{
 const html=page('flashcards/alphabet');
 assert.ok(html.includes('<title>Alphabet Flashcards for Preschoolers | A–Z Picture Cards | Kiddo.school</title>'),'spec SEO title');
 assert.ok(html.includes('content="Explore 26 alphabet flashcards with uppercase and lowercase letters, familiar pictures, simple letter-sound ideas and individual cards to download."'),'spec meta description');
 assert.ok((html.match(/<h1>/g)||[]).length===1,'exactly one H1');
 assert.ok(html.includes('<h1>Alphabet Flashcards A–Z</h1>'),'spec H1');
 assert.ok(html.includes('rel="canonical" href="https://kiddo-school.pages.dev/flashcards/alphabet/"'));
 for(const c of set.cards)assert.ok(html.includes(`href="${c.url}"`),'card wall links every card');
 assert.ok(html.includes('href="/preschool/3-years/alphabet-and-letter-sounds/"'),'set page links to its class');
 assert.ok(html.includes('href="/preschool/3-years/alphabet-and-letter-sounds/print/"'),'set page links the printable view');
 assert.ok(html.includes('data-fc-root'),'community mount present');
 // every image keeps its true aspect ratio
 const imgs=[...html.matchAll(/<img[^>]+src="[^"]*alphabet[^"]*"[^>]*>/g)].map(m=>m[0]);
 for(const tag of imgs)assert.ok(/\swidth="1414"\s+height="2000"/.test(tag)||/\swidth="707"\s+height="1000"/.test(tag),`true ratio only: ${tag.slice(0,90)}`);
});

test('26 card pages: unique letter H1s, honest titles, descriptions, sound blocks',()=>{
 const titles=new Set(),h1s=new Set(),metas=new Set();
 for(const c of set.cards){
  const html=page(c.url.slice(1));
  const up=c.letter.toUpperCase();
  assert.ok(html.includes(`<title>${c.word} Flashcard — Letter ${up} for Preschoolers | Kiddo.school</title>`),`${c.slug} title follows the spec pattern`);
  assert.ok(html.includes(`<h1>${c.word} Flashcard — Letter ${up} for Preschoolers</h1>`),`${c.slug} H1 follows the spec pattern`);
  assert.ok(html.includes(`content="${alphabetCardContent[c.slug].metaDescription}"`),`${c.slug} uses its unique meta description`);
  assert.ok(html.includes('Letter sound'),`${c.slug} has the letter-sound block`);
  assert.ok(html.includes('Say it together')&&html.includes('Try this')&&html.includes('Quick parent note'),`${c.slug} carries say/try/note`);
  assert.ok(html.includes('Download card'),`${c.slug} has a download button`);
  assert.ok(html.includes(`href="${c.img}" download`),'download points at the real WebP');
  assert.ok(html.includes('View full set')&&html.includes(`href="${set.url}"`),`${c.slug} links the full set`);
  assert.ok(html.includes('rel="prev"')&&html.includes('rel="next"'),`${c.slug} has prev/next`);
  assert.ok(html.includes('Related')||html.includes('RELATED'),`${c.slug} has related cards`);
  assert.ok(html.includes('data-fc-reaction')&&html.includes('data-fc-review-form')&&html.includes('data-fc-comment-form'),`${c.slug} mounts reactions, reviews and comments`);
  titles.add(`${c.word} Flashcard — Letter ${up} for Preschoolers`);
  h1s.add(`${c.word} Flashcard — Letter ${up} for Preschoolers`);
  metas.add(alphabetCardContent[c.slug].metaDescription);
 }
 assert.equal(titles.size,26,'26 unique titles');
 assert.equal(h1s.size,26,'26 unique H1s');
 assert.equal(metas.size,26,'26 unique meta descriptions');
});

test('phonics honesty: X ends words, I says its name here, Q brings u, no false claims',()=>{
 const x=page('flashcards/alphabet/xylophone');
 assert.ok(x.includes('end-of-word sound')&&x.includes('box'),'X card explains the ksss ending honestly');
 assert.ok(x.includes('z sound')||x.includes('starts with a z'),'X card admits xylophone starts with a z sound');
 assert.ok(!/x\s+says\s+kss[^<]*at the start/i.test(x),'no false x-starts-the-sound claim');
 const i=page('flashcards/alphabet/ice-cream');
 assert.ok(i.includes('says its own name'),'I card explains the long-i name sound');
 const q=page('flashcards/alphabet/queen');
 assert.ok(q.includes('qu'),'Q card introduces the qu partnership');
 const a=page('flashcards/alphabet/apple');
 assert.ok(a.includes('named A')&&a.includes('aaa'),'A card separates the letter name from its sound');
});

test('class page: exact SEO copy, spec H1, canonical and full section structure',()=>{
 const html=page('preschool/3-years/alphabet-and-letter-sounds');
 assert.ok(html.includes('<title>Alphabet &amp; Letter Sounds for 3 Year Olds | Kiddo.school</title>'),'spec SEO title');
 assert.ok(html.includes('content="Explore A–Z letters with your preschooler using colorful alphabet cards, beginning-sound games, letter matching and easy activities to try at home."'),'spec meta description');
 assert.ok(html.includes('<h1>Alphabet &amp; Letter Sounds</h1>'),'spec H1');
 assert.ok((html.match(/<h1>/g)||[]).length===1,'exactly one H1');
 assert.ok(html.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/alphabet-and-letter-sounds/"'));
 // the seven-step class
 for(const id of ['todays-class','learn-the-letters','find-the-letter','match-the-picture','big-and-little','off-screen','class-complete'])
  assert.ok(html.includes(`id="${id}"`),`section #${id} present`);
 // teacher welcome speaks directly to the parent
 assert.ok(html.includes('TEACHER WELCOME')&&html.includes('playing with letters'),'teacher welcome present');
 // 26 cards in the learn section + group chips A–F … Y–Z
 assert.equal((html.match(/class="lv-card"/g)||[]).length,26,'all 26 cards in the letter grid');
 for(const g of ['A–F','G–L','M–R','S–X','Y–Z'])assert.ok(html.includes(`>${g}</button>`),`group chip ${g}`);
 // games: letter tiles and picture choices, calm feedback strings
 assert.equal((html.match(/data-tc-round/g)||[]).length,20,'8 find + 6 match + 6 big-and-little rounds');
 assert.ok(html.includes('class="tc-choice tc-letter'),'programmatic letter tiles used');
 assert.ok(html.includes('no points, no timers'),'calm-play promise stated');
 // off-screen activities cover the four spec ideas
 for(const phrase of ['first letter of your child','book cover','playdough','signs'])assert.ok(html.toLowerCase().includes(phrase.toLowerCase()),`off-screen idea: ${phrase}`);
 // completion is honest: no fake next class, no certificate, no progress
 assert.ok(html.includes('Nice exploring!'),'spec completion message');
 assert.ok(html.includes('View Alphabet Flashcards')&&html.includes('Learning Path')&&html.includes('Explore Again'),'completion buttons');
 assert.ok(!/certificate/i.test(html),'no invented certificates');
 assert.ok(!html.includes('Next class'),'no fake next-class button');
 assert.ok(html.includes('data-cm-root'),'family feedback mount on the class page');
 assert.ok(html.includes(`data-page-path="/preschool/3-years/alphabet-and-letter-sounds/"`),'feedback uses the class page path');
 // the class page ships its real interactive script
 assert.ok(html.includes('/assets/alphabet-class.js'),'group-chip script included');
});

test('printable view: all 26 cards two-up, print-view body, no PDF claims',()=>{
 const html=page('preschool/3-years/alphabet-and-letter-sounds/print');
 assert.ok(html.includes('<body class="print-view">'),'print-view body class');
 assert.ok(html.includes('content="noindex,follow"'),'print view stays unindexed');
 assert.ok((html.match(/tc-print-page"/g)||[]).length===26||((html.match(/<figure class="tc-print-page">/g)||[]).length===26),'26 printable cards');
 for(const c of set.cards)assert.ok(html.includes(PREFIX+c.file),`print view embeds ${c.file}`);
 assert.ok(html.includes('data-tc-print-view'),'print button present');
 assert.ok(html.includes('No PDF is involved')||html.includes('no PDF'),'honest about printing — no invented PDF');
});

test('preschool hubs exist and link the class; class links back to the path',()=>{
 const hub=page('preschool');
 const stage=page('preschool/3-years');
 assert.ok(hub.includes('href="/preschool/3-years/"'),'preschool hub links Age 3');
 assert.ok(stage.includes('href="/preschool/3-years/alphabet-and-letter-sounds/"'),'Age 3 hub links the class');
 assert.ok(stage.includes('href="/flashcards/alphabet/"'),'Age 3 hub links the flashcards');
 assert.ok(stage.includes('href="/toddler/2-years/"'),'Age 3 hub links back to Age 2');
 for(const p of ['preschool','preschool/3-years']){
  const html=page(p);
  assert.ok(html.includes('class="breadcrumbs ')&&html.includes('href="/">Home</a>'),`${p} has breadcrumbs`);
 }
});

test('Age 3 is wired into the whole school, not a separate website',()=>{
 const home=read('dist/index.html');
 assert.ok(home.includes('href="/preschool/3-years/"'),'homepage links the Age 3 stage');
 assert.ok(home.includes('Fifteen classes are ready now, from birth to age three'),'homepage counts the new class');
 const lp=read('dist/learning-path/index.html');
 assert.ok(lp.includes('href="/preschool/3-years/alphabet-and-letter-sounds/"'),'learning path lists Class 15');
 assert.ok(lp.includes('Alphabet &amp; Letter Sounds'),'learning path names the class');
 const age2=read('dist/toddler/2-years/index.html');
 assert.ok(age2.includes('href="/preschool/3-years/"'),'Age 2 hub shows the next stage');
 const lib=read('dist/flashcards/index.html');
 assert.ok(lib.includes('For preschoolers'),'flashcards library gains a preschool shelf');
 assert.ok(lib.includes('href="/flashcards/alphabet/"'),'library lists the alphabet set');
 const library=read('dist/learning-library/index.html');
 assert.ok(library.includes('href="/preschool/3-years/alphabet-and-letter-sounds/"'),'Learning Library links the class');
 assert.ok(library.includes('>Age 3</a>'),'Learning Library has an Age 3 chip');
 const map=read('dist/sitemap.xml');
 for(const u of ['/preschool/','/preschool/3-years/','/preschool/3-years/alphabet-and-letter-sounds/','/flashcards/alphabet/','/flashcards/alphabet/apple/','/flashcards/alphabet/zebra/'])
  assert.ok(map.includes(`<loc>https://kiddo-school.pages.dev${u}</loc>`),`sitemap includes ${u}`);
 assert.ok(!map.includes('alphabet-and-letter-sounds/print/'),'print view stays out of the sitemap');
});

test('all 26 alphabet images still load from R2 with true dimensions in HTML',()=>{
 for(const c of set.cards){
  const html=page(c.url.slice(1));
  const hero=html.match(new RegExp(`<figure class="fc2-hero"><img src="${c.img}" width="(\\d+)" height="(\\d+)"`));
  assert.ok(hero,`${c.slug} hero image present`);
  assert.equal(hero[1],'1414');assert.equal(hero[2],'2000',`${c.slug} hero keeps the probed 1414×2000 ratio`);
 }
});
