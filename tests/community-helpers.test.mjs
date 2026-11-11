// Class 33 · Community Helpers & Our Neighborhood — page-type law and content locks.
// Owner doctrine (2026-10-12): the class page is a compact HUB; every helper
// teaches on its own /learn/ page (original flashcard LEFT, step-by-step
// teaching RIGHT, NO canvas); the 29 library card pages are a separate
// WHAT/WHY/PRACTISE experience; NO worksheets until genuine artwork arrives.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {lesson,meta,cards} from '../src/flashcards/data-community-helpers.mjs';
import {lpContent} from '../src/flashcards/lp-community-helpers.mjs';
import {CH_CLASS_PATH} from '../src/community-helpers.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const CLASS=CH_CLASS_PATH;
const LIB='/flashcards/community-helpers-and-our-neighborhood/';

test('the Class 33 data carries exactly the 29 verified R2 cards plus cover',()=>{
 const files=lesson.cards.map(c=>c.file).sort();
 assert.equal(files.length,29,'29 cards');
 assert.equal(lesson.cover.w,1414,'cover width (probed on R2)');
 assert.equal(lesson.cover.h,2000,'cover height (probed on R2)');
 for(const c of lesson.cards){
  assert.equal(c.w,1414,c.file+' width (probed on R2)');
  assert.equal(c.h,2000,c.file+' height (probed on R2)');
  assert.ok(!c.file.includes('cover'),'cover.webp is never counted as a card');
 }
 assert.equal(Object.keys(cards).length,29,'29 library card contents');
 assert.equal(Object.keys(lpContent).length,29,'29 Learning Path lessons');
 const slugs=lesson.cards.map(c=>c.file.replace(/\.webp$/,'')).sort();
 assert.deepEqual(Object.keys(lpContent).sort(),slugs,'lesson slugs match the real filenames');
 assert.deepEqual(Object.keys(cards).sort(),slugs,'library slugs match the real filenames');
 assert.ok(lesson.r2Base.endsWith('school/preschool/4-years/community-helpers-and-our-neighborhood/'),'r2 folder is the owner’s verified upload folder');
});





test('lesson teaching content is genuinely unique per helper — no word-swapped clones',()=>{
 const slugs=Object.keys(lpContent);
 const sig=new Map();
 for(const s of slugs){
  const m=lpContent[s].mean;
  assert.ok(!sig.has(m),'two lessons share identical "What does it mean?" text: '+s+' vs '+sig.get(m));
  sig.set(m,s);
 }
 for(const s of slugs){
  const steps=lpContent[s].teach;
  assert.ok(steps.split('\n').length>=5,'at least 5 teaching steps for '+s);
  assert.ok(lpContent[s].play&&lpContent[s].play.length>60,'real practice activity for '+s);
  assert.ok(lpContent[s].say&&lpContent[s].say.length>40,'parent script for '+s);
 }
});

test('no inaccurate reassurances — the owner correction is enforced',()=>{
 for(const s of Object.keys(lpContent)){
  const blob=JSON.stringify(lpContent[s]).toLowerCase();
  assert.ok(!/never hurt/.test(blob),'banned reassurance "never hurt" in '+s);
 }
 for(const s of Object.keys(cards)){
  const blob=JSON.stringify(cards[s]).toLowerCase();
  assert.ok(!/never hurt/.test(blob),'banned reassurance "never hurt" in library card '+s);
 }
});





test('Class 33 is wired into navigation: LP row, stage hub, flashcards hub',()=>{
 const lp=read('learning-path/index.html');
 assert.ok(lp.includes('Class 33: <a href="/preschool/4-years/community-helpers-and-our-neighborhood/">'),'LP row after Class 32');
 const lp32=lp.indexOf('Class 32:'),lp33=lp.indexOf('Class 33:');
 assert.ok(lp32>-1&&lp33>lp32,'Class 33 sits after Class 32');
 const hub=read('preschool/4-years/index.html');
 assert.ok(hub.includes('Class 33'),'Age 4 stage hub carries the Class 33 card');
 const fc=read('flashcards/index.html');
 assert.ok(fc.includes(LIB),'collection listed on the Flashcards hub');
});


