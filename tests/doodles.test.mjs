// Animated doodle characters — guards for placement, honesty and calm mode.
// The six user-uploaded R2 PNGs appear only where the spec assigns them,
// always as small in-flow images (never absolute, so they cannot cover
// content), aria-hidden, lazy-loaded, with calm-mode + reduced-motion
// guarantees. Flashcard pages stay completely doodle-free.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root=resolve('dist');
const read=p=>readFileSync(resolve(root,p),'utf8');
const D='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/animated-doodles/';

const home=read('index.html');
const c7=read('preschool/3-years/body-parts-and-five-senses/index.html');
const c8=read('preschool/3-years/fruits-and-vegetables/index.html');
const c1=read('toddler/2-years/colors-and-shapes/index.html');
const ct=read('toddler/2-years/circle-time/hello-school/index.html');
const baby=read('baby/index.html');
const newborn=read('newborn/index.html');
const babyStage=read('baby/3-4-months/index.html');
const lib=read('learning-library/index.html');
const nature=read('nature/index.html');
const natureLeaf=read('nature/leaf-rubbing/index.html');
const about=read('about/index.html');
const flashSet=read('flashcards/fruits-and-vegetables/index.html');
const flashCard=read('flashcards/body-parts-and-five-senses/head/index.html');
const js=read('assets/doodles.js');
const css=read('assets/style.css');

test('each doodle appears exactly where the spec assigns it',()=>{
 // Happy Pencil waves at the start of every class page
 for(const [name,html] of [['class 7',c7],['class 8',c8],['toddler class',c1],['circle time',ct]]){
  assert.ok(html.includes('</nav><img class="doodle doodle-pencil" src="'+D+'01-happy-pencil.png"'),name+' opens with the Happy Pencil');
  assert.ok(html.includes('CLASS COMPLETE</span><img class="doodle doodle-star" src="'+D+'02-smiling-star.png"')||html.includes('ct-stamp">Circle Time Complete</p><img class="doodle doodle-star"'),name+' completes with the Smiling Star');
  assert.equal([...html.matchAll(/class="doodle doodle-/g)].length,2,name+' has exactly two doodles');
 }
 // Smiling Star only in class-complete; no star on non-class pages
 assert.ok(!about.includes('doodle-star')&&!flashSet.includes('doodle-star'));
 // Friendly Book in the Learning Library
 assert.ok(lib.includes('doodle doodle-book')&&lib.includes('03-friendly-book.png'));
 // Playful Butterfly in the nature lessons
 assert.ok(nature.includes('doodle doodle-butterfly'));
 assert.ok(natureLeaf.includes('doodle doodle-butterfly'));
 // Little Rainbow floats on the homepage only
 assert.ok(home.includes('START WHERE YOU ARE</span><img class="doodle doodle-rainbow"')&&home.includes('05-little-rainbow.png'));
 assert.ok(!c7.includes('doodle-rainbow')&&!lib.includes('doodle-rainbow'));
 // Sleepy Moon in the baby learning area
 for(const [name,html] of [['baby hub',baby],['newborn hub',newborn],['baby stage',babyStage]]){
  assert.ok(html.includes('doodle doodle-moon')&&html.includes('06-sleepy-moon.png'),name+' has the Sleepy Moon');
 }
 // flashcards stay completely doodle-free (spec: keep flashcards unchanged)
 assert.ok(!flashSet.includes('doodle doodle-')&&!flashCard.includes('doodle doodle-'));
});

test('doodles are honest, small, non-blocking and accessible',()=>{
 for(const [name,html] of [['home',home],['class 8',c8],['baby',baby],['library',lib],['nature',nature]]){
  for(const m of html.matchAll(/<img class="doodle[^>]*>/g)){
   const tag=m[0];
   assert.ok(tag.includes('alt=""'),'doodle on '+name+' is decorative (empty alt)');
   assert.ok(tag.includes('aria-hidden="true"'),'doodle on '+name+' is aria-hidden');
   assert.ok(tag.includes('loading="lazy"'),'doodle on '+name+' is lazy');
   assert.ok(tag.includes('width="1080" height="1080"'),'doodle on '+name+' declares real dims');
  }
 }
 assert.ok(!c8.includes('position:absolute')&&!css.includes('.doodle{position'),'no absolutely-positioned doodles');
});

test('calm mode and reduced motion really stop the movement',()=>{
 // CSS: every animation rule is gated on .doodle-live, and both calm-mode
 // and prefers-reduced-motion force animation:none
 assert.match(css,/body\.calm-mode \.doodle\{animation:none!important/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{\.doodle\{animation:none!important/);
 for(const kind of ['wave','bounce','wiggle','flutter','float','sway']){
  assert.ok(css.includes('@keyframes doodle-'+kind),'keyframes for '+kind);
 }
 assert.ok(!/\n\.doodle-pencil\{animation/.test(css),'no doodle animates without .doodle-live');
 assert.ok(css.includes('.doodle-live.doodle-pencil'),'wave is gated on live');
 // JS: observer gated on reduced motion + calm mode, choice persisted
 assert.match(js,/matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
 assert.match(js,/calm-mode/);
 assert.match(js,/localStorage\.setItem\(calmKey/);
 assert.match(js,/localStorage\.getItem\(calmKey/);
 assert.match(js,/aria-pressed/);
 assert.ok(!js.includes('fetch(')&&!js.includes('XMLHttpRequest'),'no network in doodles.js');
});

test('every page loads doodles.js and the calm toggle lands in the footer',()=>{
 for(const [name,html] of [['home',home],['class 8',c8],['about',about],['baby',baby]]){
  assert.ok(html.includes('<script src="/assets/doodles.js" defer></script>'),name+' loads doodles.js');
 }
 assert.match(js,/\.wrap\.footer-bottom/,'calm button mounts in the footer bottom bar');
});
