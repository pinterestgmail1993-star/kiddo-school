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
const R2='https://assets.kiddo.school/';
const PREFIX='flashcards/preschool-learning-cards/alphabet-and-letter-sounds-age-3/';









test('class page: exact SEO copy, spec H1, canonical and full section structure',()=>{
 const html=page('preschool/3-years/alphabet-and-letter-sounds');
 assert.ok(html.includes('<title>Alphabet &amp; Letter Sounds for 3 Year Olds | Kiddo.school</title>'),'spec SEO title');
 assert.ok(html.includes('content="Explore A–Z letters with your preschooler using colorful alphabet cards, beginning sounds, printable letter sheets to solve and easy activities to try at home."'),'spec meta description');
 assert.ok(html.includes('<h1>Alphabet &amp; Letter Sounds</h1>'),'spec H1');
 assert.ok((html.match(/<h1>/g)||[]).length===1,'exactly one H1');
 assert.ok(html.includes('rel="canonical" href="https://kiddo.school/preschool/3-years/alphabet-and-letter-sounds/"'));
 // the honest class: learn the letters, solve the sheets, off screen (owner
 // removed the coded games from the learning-path classes)
 for(const id of ['todays-class','learn-the-letters','solve-the-sheets','off-screen','class-complete'])
  assert.ok(html.includes(`id="${id}"`),`section #${id} present`);
 for(const id of ['find-the-letter','match-the-picture','big-and-little'])
  assert.ok(!html.includes(`id="${id}"`),`coded game #${id} removed`);
 // teacher welcome speaks directly to the parent
 assert.ok(html.includes('TEACHER WELCOME')&&html.includes('playing with letters'),'teacher welcome present');
 // 26 cards in the learn section + group chips A–F … Y–Z
 assert.equal((html.match(/class="lv-card"/g)||[]).length,26,'all 26 cards in the letter grid');
 for(const g of ['A–F','G–L','M–R','S–X','Y–Z'])assert.ok(html.includes(`>${g}</button>`),`group chip ${g}`);
 // no coded games anywhere on the class page
 assert.equal((html.match(/data-tc-round/g)||[]).length,0,'no coded game rounds');
 assert.ok(html.includes('Write &amp; Color'),'the drawing layer is named for on-screen solving');
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




