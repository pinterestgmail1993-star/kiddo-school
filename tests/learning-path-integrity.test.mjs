// Learning Path integrity (owner decisions, 2026-10-11 / 2026-10-12 / 2026-10-14):
//  - the displayed class sequence is unique, strictly increasing and exactly
//    the approved set (1–37, no gap). Class 23 = the Music Room, owner-approved
//    2026-10-14 ("class 23 ... we dont have class 24 so numbering them correct")
//    — it lives outside the age bands at /music-room/. Class 24 stayed empty
//    "until a complete class is planned" — Class 24 · Transportation &
//    Vehicles is that complete class (32 spotter lessons + 32 flashcards + the
//    class page), so the sequence now runs 1–37 with no gap. Classes 33, 34,
//    35, 36 and 37 joined on owner approval — this lock means any future class
//    addition is a deliberate, reviewed change.
//  - the Toddler Room and the Kitchen are EXTRA CLASSES (bonus rooms beside
//    the core path at /extra-classes/): their lessons build at /toddler-room/
//    /learn/ and /kitchen/learn/ but they take NO Learning Path row — dip in
//    any order, skipping never means falling behind.
//  - every row link (class page, stage hub, flashcards, worksheets) resolves
//    to a real built page.
//  - the intro count word ("Thirty classes are ready now") must equal the
//    REAL number of published classes — the copy can never silently drift
//    from the sequence again.
//  - Class 24 was printables-only by owner Option A until Transportation &
//    Vehicles completed it; the maths printables stay live at /worksheets/maths/.
//    Class 23 is no longer invented — it is the Music Room, owner-built.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

const read=p=>readFileSync('dist/'+p,'utf8');
const lp=()=>read('learning-path/index.html');

// The approved published sequence — Classes 1–40, no gap. Update ONLY
// when the owner approves a new class (23 = Music Room, owner-approved
// 2026-10-14; 24 = Transportation & Vehicles, the complete class that filled
// the reserved slot; 33, 34, 35, 36, 37 approved & built; 38 = Feelings &
// Kindness, owner-directed 2026-10-23 to the END of the path so Classes
// 33–37 keep their numbers and links; 39 = Staying Safe, owner-directed
// 2026-10-30 at /staying-safe/ under the no-skip rule — Classes 39/40 were
// free, so the next free number was 39).
const APPROVED=[...Array(40).keys()].map(i=>i+1);

const WORDS={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,
 eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,
 eighteen:18,nineteen:19,twenty:20,'twenty-one':21,'twenty-two':22,'twenty-three':23,
 'twenty-four':24,'twenty-five':25,'twenty-six':26,'twenty-seven':27,'twenty-eight':28,
 'twenty-nine':29,thirty:30,'thirty-one':31,'thirty-two':32,'thirty-three':33,
 'thirty-four':34,'thirty-five':35,'thirty-seven':36,'thirty-seven':37,'thirty-eight':38,
 'thirty-nine':39,forty:40,'forty-one':41,'forty-two':42,'forty-three':43,'forty-four':44,
 'forty-five':45,'forty-six':46,'forty-seven':47,'forty-eight':48,'forty-nine':49,fifty:50};

test('the Learning Path shows exactly the approved classes — unique, strictly increasing, no gap (1–40)',()=>{
 const html=lp();
 const nums=[...html.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.equal(nums.length,APPROVED.length,'row count matches the approved registry ('+nums.length+' rows)');
 assert.deepEqual(nums,APPROVED,'sequence is exactly Classes 1–40, no gap');
 assert.equal(new Set(nums).size,nums.length,'no duplicate class numbers');
 for(let i=1;i<nums.length;i++)assert.ok(nums[i]>nums[i-1],'strictly increasing at position '+i);
});

test('every Learning Path row link resolves to a real built page',()=>{
 const html=lp();
 const rows=html.split('<div class="lp-row"').slice(1);
 assert.ok(rows.length>=APPROVED.length,'rows parsed: '+rows.length);
 const broken=[];
 for(const r of rows){
  const end=r.indexOf('</div></div>');
  const seg=end>-1?r.slice(0,end):r;
  for(const m of seg.matchAll(/href="(\/[a-z0-9][a-z0-9\-\/]*\/)"/g)){
   const t=m[1].replace(/^\//,'');
   if(/^(assets|downloads|api)\b/.test(t))continue;
   if(!existsSync('dist/'+t+'index.html'))broken.push(m[1]);
  }
 }
 assert.deepEqual(broken,[],'broken row links: '+broken.join(', '));
});

test('the intro count word equals the real number of published classes (LP page + homepage)',()=>{
 const html=lp();
 const nums=[...html.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 const m=html.match(/([A-Za-z]+(?:-[A-Za-z]+)?) classes are ready now/);
 assert.ok(m,'intro count phrase found on the Learning Path');
 const word=m[1].toLowerCase(),n=WORDS[word];
 assert.ok(n,'count word is in the known word list: '+m[1]);
 assert.equal(n,nums.length,'intro says "'+m[1]+'" ('+n+') but the page shows '+nums.length+' classes');
 const title=html.match(/<title>(.*?)<\/title>/)[1].toLowerCase();
 assert.ok(title.includes(word),'the Learning Path title carries the same count word');
 const home=read('index.html');
 assert.ok(home.includes(m[1]+' classes are ready now'),'the homepage section carries the same verified count');
});

test('Class 24 is complete: Transportation & Vehicles fills the reserved slot; Class 23 is the Music Room',()=>{
 const html=lp();
 assert.ok(html.includes('Class 23: <a href="/music-room/">'),'Class 23 row = the Music Room (owner-approved 2026-10-14)');
 assert.ok(html.includes('Class 24: <a href="/preschool/4-years/transportation-and-vehicles/">'),'Class 24 row = Transportation & Vehicles — the complete class that fills the reserved slot');
 assert.ok(existsSync('dist/worksheets/maths/index.html'),'the old Class 24 maths printables stay live at /worksheets/maths/');
 assert.ok(existsSync('dist/preschool/4-years/transportation-and-vehicles/index.html'),'the Class 24 class page is built');
 assert.ok(existsSync('dist/flashcards/transportation-and-vehicles/index.html'),'the Class 24 flashcard set is built');
});
