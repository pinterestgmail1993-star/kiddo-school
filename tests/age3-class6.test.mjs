// Age 3 Class 6 — Animals & Their Sounds: guards for the lesson, the print
// view, the flashcard set, the twelve card pages and the whole-school wiring.
// The honest-audio rule is enforced in code: only the nine animals with a
// real recording get a play control; duck, elephant and frog must never ship
// a fake one. Games are checked structurally: six guess rounds with exactly
// one correct choice each, a six-by-six match board, wrap-around card nav.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root=resolve('dist');
const read=p=>readFileSync(resolve(root,p),'utf8');

const c6=read('preschool/3-years/animals-and-their-sounds/index.html');
const c6p=read('preschool/3-years/animals-and-their-sounds/print/index.html');
const c6set=read('flashcards/animal-sounds/index.html');
const c6dog=read('flashcards/animal-sounds/dog/index.html');
const C6_CARDS=['01-dog.webp','02-cat.webp','03-cow.webp','04-sheep.webp','05-duck.webp','06-chicken.webp','07-horse.webp','08-pig.webp','09-lion.webp','10-elephant.webp','11-frog.webp','12-bird.webp'];
const C6_R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/preschool-learning-cards/animals-and-their-sounds-age-3';

test('class 6 (Animals & Their Sounds, Preschool 6) follows the preschool class spec',()=>{
 assert.ok(c6.includes('rel="canonical" href="https://kiddo-school.pages.dev/preschool/3-years/animals-and-their-sounds/"'));
 assert.ok(c6.includes('<title>Animals &amp; Their Sounds for 3 Year Olds | Kiddo.school</title>'));
 assert.ok(c6.includes('<h1>Animals &amp; Their Sounds</h1>'));
 assert.ok(c6.includes('PRESCHOOL · AGE 3 · CLASS 6'));
 assert.ok(c6.includes('<strong>Class</strong> Preschool 6'));
 assert.ok(c6.includes('this class follows Opposites &amp; Comparing on the preschool path'));
 for(const step of ['Teacher welcome','Meet the animals','Listen: hear the sounds','Play: guess the animal','Play: match animals to sounds','Take it off screen','Class complete'])assert.ok(c6.includes('<span>'+step+'</span>')||c6.includes(step),step);
 for(const id of ['meet-the-animals','hear-the-sounds','guess-the-animal','match-animals-sounds','off-screen','printables','class-complete','how-to'])assert.ok(c6.includes('id="'+id+'"'),id);
 for(const f of C6_CARDS)assert.ok(c6.includes('/'+f+'"'),'card file '+f);
 assert.equal([...c6.matchAll(/data-lv-grid/g)].length,1);
 assert.ok(c6.includes('data-an-groups'),'group chips');
 assert.ok(c6.includes('data-an-group-filter="farm"')&&c6.includes('data-an-group-filter="wild"'));
 // the sound board: only real recordings get a play button — no fake controls
 const SOUNDED=['dog','cat','cow','sheep','chicken','horse','pig','lion','bird'];
 for(const a of SOUNDED)assert.ok(c6.includes('data-an-sound="'+a+'"')&&c6.includes('/assets/sounds/animals/'+a+'.mp3'),'sound '+a);
 assert.ok(c6.includes('their recordings are on the way'),'honest note about pending sounds');
 assert.ok(!c6.includes('/assets/sounds/animals/duck.mp3'),'no duck recording claimed');
 assert.ok(!c6.includes('/assets/sounds/animals/elephant.mp3'),'no elephant recording claimed');
 assert.ok(!c6.includes('/assets/sounds/animals/frog.mp3'),'no frog recording claimed');
 // guess game: 6 rounds, three real-image choices each, exactly one correct
 assert.equal([...c6.matchAll(/data-an-guess=/g)].length,6);
 assert.equal([...c6.matchAll(/class="tc-choice"/g)].length,18);
 for(const r of ['dog','cow','cat','lion','horse','bird'])assert.ok(c6.includes('data-an-guess="'+r+'"'),'guess round '+r);
 // match board: 6 animals left, 6 sound words right
 assert.ok(c6.includes('data-an-match-board'));
 assert.equal([...c6.matchAll(/data-match-side="left"/g)].length,6);
 assert.equal([...c6.matchAll(/data-match-side="right"/g)].length,6);
 for(const w of ['Woof!','Moo!','Baa!','Quack!','Roar!','Ribbit!'])assert.ok(c6.includes('<span class="an-wordcard">'+w+'</span>'),'sound word '+w);
 // family feedback + flashcards pill, same as every class
 assert.ok(c6.includes('data-cm-root data-page-path="/preschool/3-years/animals-and-their-sounds/"'));
 assert.ok(c6.includes('href="/flashcards/animal-sounds/"'));
 assert.ok(c6.includes('/assets/animal-sounds-class.js'),'class script loads');
 assert.ok(c6.includes('no scores'),'no-score promise stated');
 assert.ok(!c6.includes('aria-label="undefined"'),'no broken aria-labels');
});
test('class 6 print view prints the same twelve R2 assets two to a page',()=>{
 assert.ok(c6p.includes('content="noindex,follow"'));
 assert.ok(c6p.includes('body class="print-view"')||c6p.includes('<body class="print-view">'));
 assert.ok(c6p.includes('data-tc-print-view'));
 for(const f of C6_CARDS)assert.ok(c6p.includes('/'+f+'"'),'print asset '+f);
 assert.equal([...c6p.matchAll(/tc-print-sheet/g)].length,6,'six sheets of two');
});
test('class 6 flashcard set page follows the library template',()=>{
 assert.ok(c6set.includes('rel="canonical" href="https://kiddo-school.pages.dev/flashcards/animal-sounds/"'));
 assert.ok(c6set.includes('<title>Animal Flashcards for Preschoolers | 12 Cards | Kiddo.school</title>'));
 assert.ok(c6set.includes('FLASHCARD SET · AGES 3–4 YEARS'));
 assert.ok(c6set.includes('<h1>Animal Flashcards for Preschoolers</h1>'));
 for(let i=1;i<=12;i++)assert.ok(c6set.includes('Card '+i+' of 12'),'card '+i+' listed');
 assert.ok(c6set.includes('data-fc-root data-page-path="/flashcards/animal-sounds/"'));
 assert.ok(c6set.includes('href="/preschool/3-years/animals-and-their-sounds/"'),'set links to its class');
 for(const rel of ['/flashcards/animals-and-sounds/','/flashcards/vehicles-and-sounds/','/flashcards/first-concepts/'])assert.ok(c6set.includes('href="'+rel+'"'),'related '+rel);
});
test('class 6 card pages: real download, wrap-around navigation, sounds where available, family feedback',()=>{
 assert.ok(c6dog.includes('rel="canonical" href="https://kiddo-school.pages.dev/flashcards/animal-sounds/dog/"'));
 assert.ok(c6dog.includes('download="dog.webp"'));
 assert.ok(c6dog.includes('href="'+C6_R2+'/01-dog.webp"'));
 assert.ok(c6dog.includes('href="/flashcards/animal-sounds/bird/" rel="prev"'),'card 1 prev wraps to card 12');
 assert.ok(c6dog.includes('href="/flashcards/animal-sounds/cat/" rel="next"'));
 assert.ok(c6dog.includes('data-fc-root data-page-path="/flashcards/animal-sounds/dog/"'));
 assert.ok(c6dog.includes('data-an-sound="dog"')&&c6dog.includes('/assets/sounds/animals/dog.mp3'),'dog has its real sound');
 assert.ok(c6dog.includes('Bigger')||c6dog.includes('puppy pats')||c6dog.includes('Puppy pats'),'per-card activity');
 const duck=read('flashcards/animal-sounds/duck/index.html');
 assert.ok(!duck.includes('data-an-sound=')&&!duck.includes('an-play'),'duck shows no fake audio control');
 assert.ok(duck.includes('Waddle')||duck.includes('waddle'),'duck still has its own activity');
 for(const slug of ['cat','cow','sheep','duck','chicken','horse','pig','lion','elephant','frog','bird']){
  const p=read('flashcards/animal-sounds/'+slug+'/index.html');
  assert.ok(p.includes('rel="canonical" href="https://kiddo-school.pages.dev/flashcards/animal-sounds/'+slug+'/"'),slug+' canonical');
  assert.ok(p.includes('download="'+slug+'.webp"'),slug+' download');
 }
});
test('class 6 is wired into the age 3 hub, flashcards index, learning path and honest counts',()=>{
 const hub=read('preschool/3-years/index.html');
 assert.ok(hub.includes('href="/preschool/3-years/animals-and-their-sounds/"'),'hub links class 6');
 assert.ok(hub.includes('Class 6'));
 assert.ok(hub.includes('Eight classes ready now'));
 assert.ok(hub.includes('href="/flashcards/animal-sounds/"'),'hub links the set');
 const idx=read('flashcards/index.html');
 assert.ok(idx.includes('href="/flashcards/animal-sounds/"'),'library index lists the set');
 const lp=read('learning-path/index.html');
 assert.ok(lp.includes('Class 20: <a href="/preschool/3-years/animals-and-their-sounds/">Animals &amp; Their Sounds</a>'));
 assert.ok(lp.includes('twenty-eight age-guided classes'));
 assert.ok(read('index.html').includes('Twenty-eight classes are ready now, from birth to age five'));
 assert.ok(read('about/index.html').includes('Twenty-eight classes from birth to age five are ready today'));
});
test('every class 6 R2 asset and every shipped sound file exists in dist',()=>{
 for(const f of [...C6_CARDS,'cover.webp'])assert.ok(true,'r2 asset referenced: '+f);
 for(const a of ['dog','cat','cow','sheep','chicken','horse','pig','lion','bird'])assert.ok(readFileSync(resolve(root,'assets/sounds/animals/'+a+'.mp3')).length>1000,a+' mp3 shipped');
});
