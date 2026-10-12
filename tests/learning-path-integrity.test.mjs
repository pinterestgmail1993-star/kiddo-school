// Learning Path integrity (owner decisions, 2026-10-11 / 2026-10-12):
//  - the displayed class sequence is unique, strictly increasing and exactly
//    the approved set (1–22 + 25–33). Classes 23/24 are intentionally absent
//    (23 never existed; 24 = printables-only by owner Option A). Class 33
//    (Community Helpers & Our Neighborhood) joined on owner approval when its
//    29 Canva flashcards landed on R2 — this lock means any future class
//    addition is a deliberate, reviewed change.
//  - every row link (class page, stage hub, flashcards, worksheets) resolves
//    to a real built page.
//  - the intro count word ("Thirty classes are ready now") must equal the
//    REAL number of published classes — the copy can never silently drift
//    from the sequence again.
//  - Class 24 stays Option A: printables live at /worksheets/maths/, no LP
//    entry, and no Class 23 is invented.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

const read=p=>readFileSync('dist/'+p,'utf8');
const lp=()=>read('learning-path/index.html');

// The approved published sequence — Classes 1–22 then 25–34. Update ONLY
// when the owner approves a new class (33, 34, 35 approved & built 2026-10-12).
const APPROVED=[...Array(22).keys()].map(i=>i+1).concat([25,26,27,28,29,30,31,32,33,34,35]);

const WORDS={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,
 eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,
 eighteen:18,nineteen:19,twenty:20,'twenty-one':21,'twenty-two':22,'twenty-three':23,
 'twenty-four':24,'twenty-five':25,'twenty-six':26,'twenty-seven':27,'twenty-eight':28,
 'twenty-nine':29,thirty:30,'thirty-one':31,'thirty-two':32,'thirty-three':33,
 'thirty-four':34,'thirty-five':35,'thirty-six':36,'thirty-seven':37,'thirty-eight':38,
 'thirty-nine':39,forty:40,'forty-one':41,'forty-two':42,'forty-three':43,'forty-four':44,
 'forty-five':45,'forty-six':46,'forty-seven':47,'forty-eight':48,'forty-nine':49,fifty:50};

test('the Learning Path shows exactly the approved classes — unique, strictly increasing, no gaps but 23/24',()=>{
 const html=lp();
 const nums=[...html.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.equal(nums.length,APPROVED.length,'row count matches the approved registry ('+nums.length+' rows)');
 assert.deepEqual(nums,APPROVED,'sequence is exactly Classes 1–22 + 25–35 (23/24 absent by owner decision)');
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

test('Class 24 stays Option A: printables only at /worksheets/maths/, no LP entry, no invented Class 23',()=>{
 const html=lp();
 assert.ok(!html.includes('Class 23:'),'no invented Class 23 row');
 assert.ok(!html.includes('Class 24:'),'no Class 24 row until a complete class is planned');
 assert.ok(existsSync('dist/worksheets/maths/index.html'),'the Class 24 maths printables stay live at /worksheets/maths/');
});
