// Class 32 flashcards — regression guards for the owner's correction:
// the 28 life-skills Canva images are FLASHCARDS (paper), never worksheets,
// never interactive drawing pages, and cover.webp is never a card.
//   1. the set registry locks the EXACT 28 R2 filenames, in order
//   2. 29 built pages (set + 28 cards), unique SEO, real artwork
//   3. card pages are PAPER: no canvas, no tools — download/print/share,
//      prev/next, community feedback, honest schema
//   4. the set page: 28 whole-card links (no download buttons in the grid),
//      class-page link, cover fronts the set but is not a card
//   5. the Class 32 Learning Path page teaches all 28 skills with links to
//      every individual flashcard, and its ACTIVITY grid stays activities
//   6. the flashcards wall, Learning Path hub row, sitemap and search all
//      carry the set
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import {execSync} from 'node:child_process';
import {lesson,meta,cards as lsCards} from '../src/flashcards/data-life-skills-and-good-habits.mjs';
import {fcSets,fcSetBySlug} from '../src/flashcards/index.mjs';

const root='dist';
const read=p=>readFileSync(join(root,p),'utf8');
const page=p=>readFileSync(join(root,p.replace(/\/+$/,''),'index.html'),'utf8');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SET_URL='/flashcards/life-skills-and-good-habits/';
const CLASS_PAGE='preschool/4-years/life-skills-and-good-habits';

// The 28 filenames exactly as uploaded by the owner to
// school/preschool/4-years/life-skills-and-good-habits/ — probed live on R2
// (HEAD 200) and audited image-by-image against their artwork. Order is the
// set's teaching order, not the alphabetical folder order.
const R2_FILES=['wash-your-hands','brush-your-teeth','use-the-toilet','blow-your-nose','clean-up-after-eating','eat-healthy-food','get-dressed','put-on-your-shoes','pack-your-bag','put-clothes-away','sort-the-laundry','tidy-up-toys','water-the-plants','use-an-inside-voice','say-please-and-thank-you','say-excuse-me','use-gentle-hands','be-kind','share-your-toys','share-and-take-turns','wait-your-turn','listen-carefully','follow-directions','ask-for-help','take-deep-breaths','keep-your-room-safe','stay-with-a-grown-up','wear-your-seat-belt'];

const set=fcSetBySlug['life-skills-and-good-habits'];

test('the set is registered with exactly the 28 uploaded filenames — cover.webp is not a card',()=>{
 assert.ok(set,'life-skills-and-good-habits set registered');
 assert.equal(set.cards.length,28);
 assert.deepEqual(set.cards.map(c=>c.slug),R2_FILES,'card slugs are the uploaded filenames, in teaching order');
 assert.ok(!set.cards.some(c=>c.file==='cover.webp'),'cover is never a card');
 assert.ok(!existsSync(join(root,'flashcards/life-skills-and-good-habits/cover','index.html')),'no cover card page');
 for(const c of set.cards){assert.equal(c.w,1414);assert.equal(c.h,2000);}
 // every content block is present for every card
 for(const slug of R2_FILES){
  const d=lsCards[slug];
  assert.ok(d.word,'word for '+slug);
  assert.ok(d.intro.length>60,'intro for '+slug);
  assert.ok(d.say.length>20,'say for '+slug);
  assert.ok(d.try.length>40,'try for '+slug);
  assert.ok(d.note.length>40,'note for '+slug);
  assert.ok(d.teach.length>40,'teach blurb for '+slug);
  assert.ok(d.metaDescription.length>80,'unique meta for '+slug);
 }
 // no duplicate words or descriptions across the set
 const words=R2_FILES.map(s=>lsCards[s].word);
 assert.equal(new Set(words).size,28,'card words unique');
 assert.equal(new Set(R2_FILES.map(s=>lsCards[s].metaDescription)).size,28,'card metas unique');
});









test('the flashcards wall and the Learning Path row carry the set',()=>{
 const wall=page('flashcards');
 assert.ok(wall.includes('Preschool · Ages 4–5'),'wall section for Ages 4–5');
 assert.ok(wall.includes('href="/flashcards/life-skills-and-good-habits/"'),'wall set card');
 assert.ok(wall.includes('cover.webp'),'wall card fronts the real cover');
 const lp=read('learning-path/index.html');
 const rowPos=lp.indexOf('/flashcards/life-skills-and-good-habits/');
 const wsPos=lp.indexOf('/worksheets/life-skills/');
 assert.ok(rowPos>-1,'LP row has the flashcards link');
 assert.ok(wsPos>-1,'LP row keeps the worksheets link');
 assert.ok(rowPos<wsPos,'flashcards before worksheets on the Class 32 row');
});




