/* TEACHER'S LESSON (owner 2026-11-12: "i want you to give the proper lesson like
   a teacher teaching the topic to kids — how to make them understand — its
   writing the normal description then there will be no difference between
   lesson"). Every class page taught by the classLessonBody engine carries a
   structured TEACHER'S LESSON: a goal, a welcome, a say/how step for every
   card, then practice, check and a close. What a lesson is: a structured
   teaching sequence in the teacher's voice — not a description of an activity. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=p=>readFileSync(new URL('../dist'+p+(p.endsWith('/')?'index.html':''),import.meta.url),'utf8');

const CLASSES=[
 /* [path, cards, min steps] — concepts class teaches in PAIRS, so its card
    steps are six pair-steps, not eleven */
 ['/newborn/0-6-weeks/',12,15],
 ['/newborn/6-12-weeks/faces-and-visual-tracking/',12,15],
 ['/baby/3-4-months/colors-and-first-objects/',12,15],
 ['/baby/4-6-months/first-words-familiar-things/',11,14],
 ['/baby/6-9-months/animals-everyday-objects/',12,15],
 ['/baby/9-12-months/first-actions-body-parts/',12,15],
 ['/toddler/12-18-months/first-words-food-home/',11,14],
 ['/toddler/18-24-months/first-concepts-big-small-up-down/',11,10],
 /* the Toddler Room extra class runs the same engine — 35 card steps plus
    welcome, practice, check and close */
 ['/toddler-room/',35,39]
];

test('every class page carries a real TEACHER\'S LESSON: goal, welcome, one say/how step per card, practice, check, close',()=>{
 for(const [p,cards,minSteps] of CLASSES){
  const h=read(p);
  assert.ok(h.includes('TEACHER’S LESSON'),p+' has the teacher lesson section');
  assert.ok(h.includes('How this class is taught.'),p+' names the section');
  assert.ok(h.includes('By the end of this class'),p+' states the goal');
  const sec=h.slice(h.indexOf('TEACHER’S LESSON'),h.includes('PARENT INSTRUCTIONS')?h.indexOf('PARENT INSTRUCTIONS'):undefined);
  assert.ok(sec.includes('>Welcome<'),p+' opens with a welcome');
  const steps=[...sec.matchAll(/<li class="lt-step"/g)].length;
  assert.ok(steps>=minSteps,p+' teaches the full sequence ('+steps+' vs '+minSteps+')');
  const sayLines=(sec.match(/class="lt-say"/g)||[]).length;
  const howLines=(sec.match(/class="lt-how"/g)||[]).length;
  assert.equal(sayLines,steps,p+' every step has the exact words to say');
  assert.ok(howLines>=steps,p+' every step explains how it builds understanding');
  assert.ok(sec.includes('>Practice<'),p+' has guided practice');
  assert.ok(sec.includes('>Check<'),p+' checks understanding');
  assert.ok(sec.includes('>Well done<'),p+' closes with praise');
 }
});

test('the teacher script styles ship and the lesson keeps its single library pointer',()=>{
 const css=read('/assets/style.css');
 assert.ok(css.includes('.lt-script')&&css.includes('.lt-say')&&css.includes('.lt-how'),'script styles present');
 const h=read('/baby/6-9-months/animals-everyday-objects/');
 assert.ok(!h.includes('one-page-item op-tile'),'still no deck dump');
 assert.ok(h.includes('Prefer printed cards'),'still one line to the library');
});

test('the Toddler Room is a TAUGHT class now: no stale claims, no dead /learn/ links, no card dump',()=>{
 const h=read('/toddler-room/');
 assert.ok(!h.includes('HOW THIS ROOM WORKS'),'the old description section is gone');
 assert.ok(!h.includes('every step-by-step lesson right here'),'the old false claim is gone');
 assert.ok(!h.includes('its lesson right here and a download button'),'no download-button claim');
 assert.ok(!h.includes('/toddler-room/learn/'),'zero links into the retired per-card lessons');
 assert.ok(!h.includes('class="lp-tile"'),'the 35-tile picture dump is gone');
 assert.ok(h.includes('id="teachers-lesson"'),'the taught lesson section is present');
 assert.ok(h.includes('data-lesson-viewer'),'the 35-card class viewer is present');
 assert.ok(h.includes('Prefer printed cards'),'exactly one pointer to the flashcards library');
 const words=['ball','building blocks','stacking rings','puzzle','crayons','easel','picture book','play mat','floor cushion','stuffed bunny','teddy bear','toy car','toy drum','toy train','high chair','bottle','sippy cup','crib','pillow','blanket','pajamas','night light','diaper','potty','soap','towel','toothbrush','socks','shoes','comb','table and chair','bookshelf','laundry basket','changing table','stroller'];
 const sec=h.slice(h.indexOf('TEACHER’S LESSON'),h.indexOf('PARENT INSTRUCTIONS'));
 for(const w of words)assert.ok(sec.includes('· '+w+'<'), 'teacher script covers '+w);
 assert.ok(!sec.slice(sec.indexOf('>Well done<')).includes('· '),'the close ends the script');
});
