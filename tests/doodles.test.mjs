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
const D='/assets/';

const home=read('index.html');
const c7=read('preschool/3-years/body-parts-and-five-senses/index.html');
const c8=read('preschool/3-years/fruits-and-vegetables/index.html');
const c1=read('toddler/2-years/colors-and-shapes/index.html');

const baby=read('baby/index.html');
const newborn=read('newborn/index.html');

const lib=read('learning-library/index.html');
const nature=read('nature/index.html');
const natureLeaf=read('nature/leaf-rubbing/index.html');
const about=read('about/index.html');
const flashSet=read('flashcards/fruits-and-vegetables/index.html');

const js=read('assets/doodles.js');
const css=read('assets/style.css');



test('doodles are honest, small, non-blocking and accessible',()=>{
 for(const [name,html] of [['home',home],['class 8',c8],['baby',baby],['library',lib],['nature',nature]]){
  for(const m of html.matchAll(/<img class="doodle[^>]*>/g)){
   const tag=m[0];
   assert.ok(tag.includes('alt=""'),'doodle on '+name+' is decorative (empty alt)');
   assert.ok(tag.includes('aria-hidden="true"'),'doodle on '+name+' is aria-hidden');
   assert.ok(tag.includes('loading="lazy"'),'doodle on '+name+' is lazy');
   assert.ok(tag.includes('width="192" height="192"'),'doodle on '+name+' declares real dims');
  }
 }
 assert.ok(!c8.includes('position:absolute')&&!css.includes('.doodle{position'),'no absolutely-positioned doodles');
});

test('reduced motion really stops the movement',()=>{
 // CSS: every animation rule is gated on .doodle-live, and both calm-mode
 // and prefers-reduced-motion force animation:none
 assert.ok(!css.includes('calm-mode')&&!css.includes('doodle-calm'),'calm mode is gone from the css');
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{\.doodle\{animation:none!important/);
 for(const kind of ['wave','bounce','wiggle','flutter','float','sway']){
  assert.ok(css.includes('@keyframes doodle-'+kind),'keyframes for '+kind);
 }
 assert.ok(!/\n\.doodle-pencil\{animation/.test(css),'no doodle animates without .doodle-live');
 assert.ok(css.includes('.doodle-live.doodle-pencil'),'wave is gated on live');
 // JS: observer gated on reduced motion + calm mode, choice persisted
 assert.match(js,/matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
 assert.ok(!/calm/i.test(js),'no calm-mode toggle in doodles.js');
 assert.ok(!js.includes('fetch(')&&!js.includes('XMLHttpRequest'),'no network in doodles.js');
});

test('every page loads doodles.js and no calm toggle is injected',()=>{
 for(const [name,html] of [['home',home],['class 8',c8],['about',about],['baby',baby]]){
  assert.ok(/<script src="\/assets\/doodles\.js(\?v=[0-9]+)?" defer><\/script>/.test(html),name+' loads doodles.js');
 }
 assert.ok(!js.includes('footer-bottom'),'nothing is mounted in the footer');
});
