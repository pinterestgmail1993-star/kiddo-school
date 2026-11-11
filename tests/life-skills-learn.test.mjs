// Class 32 · Life Skills & Good Habits — the 28 individual Learning Path
// teaching lessons (owner doctrine: the class page keeps only a compact nav;
// every skill teaches on its own /learn/ page — original flashcard LEFT,
// step-by-step teaching RIGHT, NO canvas; the 29 activities, the 29 printable
// worksheets and the 28 library card pages are untouched separate experiences).
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {lesson as lsLesson,cards as lsCards} from '../src/flashcards/data-life-skills-and-good-habits.mjs';
import {lpContent} from '../src/flashcards/lp-life-skills.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const CLASS='/preschool/4-years/life-skills-and-good-habits/';
const LIB='/flashcards/life-skills-and-good-habits/';

test('the 28 lessons match the 28 uploaded flashcards exactly',()=>{
 const slugs=lsLesson.cards.map(c=>c.file.replace(/\.webp$/,'')).sort();
 assert.equal(slugs.length,28,'28 cards');
 assert.equal(Object.keys(lpContent).length,28,'28 lessons');
 assert.deepEqual(Object.keys(lpContent).sort(),slugs,'lesson slugs match the real filenames');
});



test('lesson teaching content is genuinely unique per skill — no word-swapped clones',()=>{
 const sig=new Map();
 for(const s of Object.keys(lpContent)){
  const m=lpContent[s].mean;
  assert.ok(!sig.has(m),'two lessons share identical "What does it mean?" text: '+s+' vs '+sig.get(m));
  sig.set(m,s);
  assert.ok(lpContent[s].teach.split('\n').length>=5,'at least 5 teaching steps for '+s);
  assert.ok(lpContent[s].play&&lpContent[s].play.length>60,'practice activity for '+s);
  assert.ok(lpContent[s].say&&lpContent[s].say.length>40,'parent script for '+s);
 }
});



test('no inaccurate reassurances anywhere in the Class 32 lessons',()=>{
 for(const s of Object.keys(lpContent)){
  assert.ok(!/never hurt/.test(JSON.stringify(lpContent[s]).toLowerCase()),'banned reassurance in '+s);
 }
});


