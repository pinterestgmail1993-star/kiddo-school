// Alphabet Learning Center guards: data honesty, R2 asset availability,
// the 26 letter pages, the hub player, the three games, the cupboard shelf
// and the preschool letter class integration.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {LETTERS,LETTERS_BY_KEY} from '../src/alphabet-data.mjs';

const read=f=>readFileSync(f,'utf8');
const page=p=>read('dist'+p+'index.html');
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/alphabet/';
const ASSOCIATIONS={a:'Apple',b:'Ball',c:'Cat',d:'Dog',e:'Elephant',f:'Fish',g:'Giraffe',h:'House',i:'Ice Cream',j:'Jellyfish',k:'Kite',l:'Leaf',m:'Moon',n:'Nest',o:'Orange',p:'Penguin',q:'Quilt',r:'Rabbit',s:'Snake',t:'Turtle',u:'Umbrella',v:'Violin',w:'Watermelon',x:'Xylophone',y:'Yo-yo',z:'Zebra'};
// Letters whose picture cards have letters baked into the artwork (inspected).
const LETTERED_PICS=new Set(['e','f','g','s','x']);
// Beginning-sound collisions the game must never create as distractors.
const SOUND_TWIN={c:['k'],k:['c'],g:['j'],j:['g']};

const letterPage=l=>page('/flashcards/alphabet/letter-'+l+'/');

test('data: 26 letters, the owner associations, honest phonics kinds and probed asset facts',()=>{
 assert.equal(LETTERS.length,26);
 for(const L of LETTERS){
  assert.equal(L.word,ASSOCIATIONS[L.letter],L.letter+' association');
  assert.equal(L.full,R2+L.letter+'/');
  assert.ok(L.intro&&L.upperCopy&&L.lowerCopy&&L.pairCopy&&L.soundCopy,L.letter+' page copy complete');
  assert.ok(L.activity&&L.activity.title&&L.activity.steps.length>=2,L.letter+' activity');
  assert.ok(['plain','soft','long','special'].includes(L.kind),L.letter+' phonics kind');
  assert.ok(L.beginningDistractors.length===2,L.letter+' distractors');
  // the legacy object.png exists only where the owner left it: a, b, c
  if(['a','b','c'].includes(L.letter))assert.equal(L.pictureFile,'object.png',L.letter+' legacy file name');
  else assert.equal(L.pictureFile,'picture.png',L.letter+' picture file name');
  // letter a ships at its true square size, the rest portrait
  if(L.letter==='a')assert.equal(L.w+'x'+L.h,'1080x1080','a is square');
  else assert.equal(L.w+'x'+L.h,'1080x1350',L.letter+' is portrait');
 }
 assert.equal(LETTERS_BY_KEY.x.kind,'special','x is the special letter');
 assert.equal(LETTERS_BY_KEY.g.kind,'soft','g teaches its soft j sound');
 assert.equal(LETTERS_BY_KEY.i.kind,'long','i teaches its name sound');
});

test('data: beginning-sound distractors never collide with the target sound',()=>{
 for(const L of LETTERS){
  for(const d of L.beginningDistractors){
   assert.notEqual(d,L.letter,L.letter+' distractor is itself');
   const twins=SOUND_TWIN[L.letter]||[];
   assert.ok(!twins.includes(d),`${L.letter} round must not offer ${d} (same beginning sound)`);
  }
  assert.notEqual(L.beginningDistractors[0],L.beginningDistractors[1]);
 }
});

test('data: all 156 R2 files really exist (GET probe — R2 HEAD responses lie)',async()=>{
 const names=['uppercase.png','lowercase.png','pair.png','tracing.png','sound.png'];
 const urls=[];
 for(const L of LETTERS){
  for(const n of names)urls.push(R2+L.letter+'/'+n);
  urls.push(R2+L.letter+'/'+L.pictureFile);
 }
 assert.equal(urls.length,156);
 let batch=[],checked=0;
 const probe=async u=>{
  const r=await fetch(u,{headers:{Range:'bytes=0-31'}});
  const buf=new Uint8Array(await r.arrayBuffer());
  const png=buf[0]===0x89&&buf[1]===0x50&&buf[2]===0x4e&&buf[3]===0x47;
  return (r.status===200||r.status===206)&&png;
 };
 for(const u of urls){
  batch.push(probe(u).then(ok=>{checked++;assert.ok(ok,'missing or non-PNG: '+u);}));
  if(batch.length===8){await Promise.all(batch);batch=[];}
 }
 await Promise.all(batch);
 assert.equal(checked,156);
});

test('tracing sections are removed from letter pages (owner decision): no guides, no player, no leftovers',()=>{
 'abcdefghijklmnopqrstuvwxyz'.split('').forEach(l=>{
  const html=letterPage(l);
  assert.doesNotMatch(html,/TRACE THE LETTER/,'no tracing heading on '+l);
  assert.doesNotMatch(html,/data-at-block/,'no tracing mount on '+l);
  assert.doesNotMatch(html,/at-svg|at-guide|at-live/,'no tracing svg on '+l);
 });
 assert.ok(!readIfExists('dist/assets/letter-tracing.js'),'letter-tracing.js is gone from dist');
 assert.ok(!readIfExists('public/assets/letter-tracing.js'),'letter-tracing.js is gone from source');
});

function readIfExists(f){try{return readFileSync(f,'utf8');}catch(e){return null;}}

test('letter pages: all 26 built with their sections, unique SEO and correct prev/next chain',()=>{
 const seen=new Set();
 'abcdefghijklmnopqrstuvwxyz'.split('').forEach((l,i)=>{
  const html=letterPage(l);
  const prev='abcdefghijklmnopqrstuvwxyz'[(i+25)%26];
  const next='abcdefghijklmnopqrstuvwxyz'[(i+1)%26];
  assert.match(html,new RegExp('<h1>Letter '+l.toUpperCase()+' — '),'H1');
  assert.match(html,/MEET THE UPPERCASE/,'uppercase section');
  assert.match(html,/MEET THE LOWERCASE/,'lowercase section');
  assert.match(html,/THE PICTURE WORD/,'picture section');
  assert.match(html,/THE LETTER PAIR/,'pair section');
  assert.match(html,/THE LETTER SOUND/,'sound section');
  assert.match(html,/TAKE IT OFF SCREEN/,'activity section');
  assert.match(html,/PLAY & PRACTICE|PLAY &amp; PRACTICE/,'games section');
  // the four card images ship on the page
  for(const f of ['uppercase.png','lowercase.png','pair.png','sound.png'])assert.ok(html.includes(R2+l+'/'+f),l+' '+f);
  // the prev/next chain wraps z -> a
  assert.ok(html.includes('href="/flashcards/alphabet/letter-'+prev+'/"'),l+' prev link');
  assert.ok(html.includes('href="/flashcards/alphabet/letter-'+next+'/"'),l+' next link');
  // games + center back-link
  assert.ok(html.includes('href="/activities/beginning-sounds/"'),l+' sounds link');
  assert.ok(html.includes('href="/flashcards/alphabet/">'),'center back-link');
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!seen.has(title),'unique title '+title);seen.add(title);
 });
});

test('letter pages: x never pretends xylophone begins with the ks sound',()=>{
 const x=letterPage('x');
 assert.doesNotMatch(x,/xylophone[^.]{0,40}ks sound|ks sound[^.]{0,40}xylophone/i,'no false beginning-sound claim');
 assert.match(x,/z sound|says ks at the (END|end)/,'x teaches the honest rules');
 assert.match(x,/fox, box, six/,'end-of-word examples');
 const g=letterPage('g');
 assert.match(g,/j(?![a-z])/,'g names the j sound');
 assert.match(g,/goat/,'g names the hard g too');
});

test('hub: /flashcards/alphabet/ is cards and downloads, not an Alphabet Centre clone',()=>{
 const html=page('/flashcards/alphabet/');
 // The owner removed the embedded Alphabet Centre from the flashcards hub:
 // flashcards are about the individual card pages and the downloads.
 assert.ok(!html.includes('data-al-center'),'no centre mount cloned onto the hub');
 assert.ok(!html.includes('data-al-mode="say"'),'no five-mode player on the hub');
 // the set page keeps its own honest sections
 assert.match(html,/THE CARDS/,'word cards remain');
 assert.match(html,/HOW TO USE THESE CARDS/,'usage ideas remain');
 assert.equal([...html.matchAll(/class="fc-card fc2-cardlink"/g)].length,26,'all 26 word cards remain on the wall');
 // the stage link back to the learning path, and the four letter-set pages
 assert.match(html,/fc-stage-link/,'stage link to the learning path');
 for(const u of ['/flashcards/alphabet-uppercase/','/flashcards/alphabet-lowercase/','/flashcards/alphabet-letters/','/flashcards/alphabet-silhouette/'])
  assert.ok(html.includes('href="'+u+'"'),'letter-set link '+u);
});

test('beginning sounds: 26 honest rounds, exactly one correct choice, reveals aligned to rounds',()=>{
 const html=page('/activities/beginning-sounds/');
 assert.match(html,/src="\/assets\/site.js"/,'uses the existing tc-round engine (no new engine)');
 const rounds=[...html.matchAll(/<div class="tc-round" data-tc-round[^>]*>/g)];
 assert.equal(rounds.length,26,'one round per letter');
 const section=html.match(/<section class="wrap lesson-section tc-game" data-tc-correct="([^"]*)"/);
 assert.ok(section,'custom praise carries the per-round reveals');
 const reveals=section[1].split('|');
 assert.equal(reveals.length,26,'reveal per round in order');
 LETTERS.forEach((L,i)=>{
  const end=i+1<rounds.length?rounds[i+1].index:html.indexOf('</section>',rounds[i].index);
  const chunk=html.slice(rounds[i].index,end);
  const correct=[...chunk.matchAll(/data-tc-correct="true"/g)].length;
  assert.equal(correct,1,L.letter+' round has exactly one correct choice');
  // the target letter's own picture must be the correct one
  assert.ok(chunk.includes(R2+L.letter+'/'+L.pictureFile),L.letter+' round shows its own picture');
  // distractor pictures never belong to the same sound family
  for(const d of L.beginningDistractors)assert.ok(chunk.includes(R2+d+'/'),'distractor '+d+' present');
  // the round shows the letter card
  assert.ok(chunk.includes(R2+L.letter+'/uppercase.png'),L.letter+' letter card present');
 });
 // x round: letter recognition, never a /ks/ beginning claim
 const xChunk=html.slice(rounds[23].index,html.indexOf('</section>',rounds[23].index));
 assert.match(xChunk,/tricky letter/,'x round is special');
 assert.doesNotMatch(xChunk,/starts with the ks/i);
});

test('guess the picture: 26 rounds, three distinct word options, exactly one correct',()=>{
 const html=page('/activities/guess-the-picture/');
 const rounds=[...html.matchAll(/<div class="tc-round" data-tc-round[^>]*>/g)];
 assert.equal(rounds.length,26);
 rounds.forEach((m,i)=>{
  const end=i+1<rounds.length?rounds[i+1].index:html.indexOf('</section>',m.index);
  const chunk=html.slice(m.index,end);
  const words=[...chunk.matchAll(/<button type="button" class="tc-choice tc-choice-word"[^>]*>([^<]+)<\/button>/g)].map(x=>x[1]);
  assert.equal(words.length,3,'three word options in round '+i);
  assert.equal(new Set(words).size,3,'options are distinct');
  assert.equal([...chunk.matchAll(/data-tc-correct="true"/g)].length,1,'one correct answer');
 });
 assert.match(html,/MYSTERY PICTURE/,'mystery framing');
});

test('letter matching: JSON registry with 26 letters and the four-round difficulty ramp',()=>{
 const html=page('/activities/letter-matching/');
 assert.match(html,/data-amg-game hidden/,'game ships hidden until JS runs');
 assert.match(html,/data-amg-data/,'data mount');
 assert.match(html,/src="\/assets\/alphabet-match.js"/,'game script');
 const data=JSON.parse(html.match(/<script type="application\/json" data-amg-data>(.*?)<\/script>/)[1]);
 assert.equal(data.letters.length,26);
 for(const L of data.letters){
  assert.ok(L.up.src&&L.lo.src&&L.pic.src,'faces for '+L.upper);
  assert.ok(L.up.src.includes('/uppercase.png')&&L.lo.src.includes('/lowercase.png'));
 }
 assert.match(html,/3 pairs/,'starts at three pairs');
 assert.match(html,/Restart/,'restart control');
});

test('cupboard: the alphabet shelf leads /activities/ and /search/ with all four links',()=>{
 for(const p of ['/activities/','/search/']){
  const html=page(p);
  assert.match(html,/id="alphabet"/,'shelf on '+p);
  assert.ok(html.indexOf('id="alphabet"')<html.indexOf('id="drawing"'),'alphabet shelf sits with the drawing shelf');
  for(const h of ['/flashcards/alphabet/','/activities/letter-matching/','/activities/beginning-sounds/','/activities/guess-the-picture/'])
   assert.ok(html.includes('href="'+h+'"'),p+' links '+h);
 }
});

test('Class 15: the lesson opens with A, B, C and teaches solving the sheets',()=>{
 const html=page('/preschool/3-years/alphabet-and-letter-sounds/');
 assert.match(html,/TODAY’S LETTERS/,'ABC intro section');
 assert.match(html,/Start with A, B and C\./,'intro heading');
 for(const l of ['a','b','c'])assert.ok(html.includes(R2+l+'/sound.png'),'ABC card for '+l.toUpperCase());
 assert.ok(html.includes('href="/flashcards/alphabet/"'),'Alphabet set link');
 // the honest lesson machinery is preserved, the coded games are gone
 assert.match(html,/data-lesson-viewer/,'26-card viewer remains');
 assert.match(html,/id="class-complete"/,'completion section remains');
 assert.ok(!html.includes('data-tc-round'),'coded games removed (owner instruction)');
 assert.match(html,/id="learn-the-letters"/,'learn section remains');
 assert.match(html,/id="solve-the-sheets"/,'solve-the-sheets guidance remains');
});

test('search and sitemap: the whole alphabet center is findable',()=>{
 const idx=JSON.parse(read('dist/assets/search-index.json'));
 const byPath=Object.fromEntries(idx.map(e=>[e.u,e]));
 assert.equal(byPath['/flashcards/alphabet/letter-a/'].k,'Flashcards');
 assert.equal(byPath['/activities/beginning-sounds/'].k,'Activity');
 assert.equal(byPath['/activities/letter-matching/'].k,'Activity');
 assert.equal(byPath['/activities/guess-the-picture/'].k,'Activity');
 const xml=read('dist/sitemap.xml');
 assert.ok(xml.includes('/flashcards/alphabet/letter-z/'));
 assert.ok(xml.includes('/activities/letter-matching/'));
});
