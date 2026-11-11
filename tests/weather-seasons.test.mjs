// Class 34 · Weather, Seasons & What We Wear — the regression suite.
// Locks what the owner ordered:
//  - exactly 29 flashcards (not 30) from the owner's verified R2 upload,
//    cover.webp excluded and never counted;
//  - 29 Learning Path /learn/ lessons: original artwork left with the DRAWING
//    CANVAS + tools (owner law: the Learning Path is where children learn AND
//    practise), unique step-by-step teaching right, honest weather safety;
//  - 29 library card pages + collection: PAPER for parents (download, print,
//    share, no canvas);
//  - the class hub is a compact classroom: LEARN WITH FLASHCARDS nav + ONE
//    collection link, and an honest "worksheets not yet" note (no invented
//    worksheets, no flashcard image reused as one);
//  - whole-school wiring: class page, LP row 34, count words thirty-five,
//    flashcards hub, sitemap and search.
import {readFileSync,existsSync} from 'node:fs';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lesson} from '../src/flashcards/data-weather-seasons.mjs';
import {meta,cards} from '../src/flashcards/data-weather-seasons.mjs';
import {lpContent} from '../src/flashcards/lp-weather-seasons.mjs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {LP_REGISTRY,lpSetBySlug} from '../src/flashcards/lp-lessons.mjs';

const CLASS='/preschool/4-years/weather-seasons-and-what-we-wear/';
const SET_URL='/flashcards/weather-seasons-and-what-we-wear/';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read=p=>readFileSync('dist'+p,'utf8');
const pageFile=p=>readFileSync('dist'+p+'index.html','utf8');

test('data: exactly 29 weather cards from the owner’s verified R2 upload, cover excluded, true dims',()=>{
 const FILES=['autumn','clouds','cloudy-day','cold-weather','cool-weather','foggy-day','hot-weather','rain-boots','rain','rainbow','raincoat','rainy-day','scarf-and-gloves','snow','snowy-day','spring','stormy-day','summer','sun-hat','sun','sunglasses','sunny-day','umbrella','warm-weather','weather-forecast','wind','windy-day','winter-coat','winter'].sort();
 const slugs=lesson.cards.map(c=>c.file.replace(/\.webp$/,'')).sort();
 assert.deepEqual(slugs,FILES,'the 29 cards are EXACTLY the owner’s upload — nothing invented, nothing missing');
 assert.equal(lesson.cards.length,29,'29 cards, not 30 — the owner confirmed the count');
 assert.ok(!slugs.includes('cover'),'cover.webp is never counted as a card');
 assert.equal(lesson.r2Base,'https://assets.kiddo.school/school/preschool/4-years/weather-seasons-and-what-we-wear/','R2 base is the owner’s class folder');
 assert.equal(lesson.cover.w,1414,'cover width (probed on R2)');
 assert.equal(lesson.cover.h,2000,'cover height (probed on R2)');
 for(const c of lesson.cards){
  assert.equal(c.w,1414,c.file+' width (probed on R2)');
  assert.equal(c.h,2000,c.file+' height (probed on R2)');
  assert.ok(c.alt.length>60,c.file+' carries a real artwork alt');
 }
 assert.equal(Object.keys(cards).length,29,'29 library card contents');
 assert.equal(Object.keys(lpContent).length,29,'29 Learning Path lessons');
 assert.deepEqual(Object.keys(lpContent).sort(),slugs,'lesson slugs match the real filenames');
 assert.deepEqual(Object.keys(cards).sort(),slugs,'library slugs match the real filenames');
 assert.equal(meta.slug,'weather-seasons-and-what-we-wear');
});













test('whole-school wiring: LP row 34, stage card, flashcards hub, count words thirty-five',()=>{
 const lp=read('/learning-path/index.html');
 assert.ok(lp.includes('Class 34: <a href="/preschool/4-years/weather-seasons-and-what-we-wear/">'),'LP row 34 present');
 assert.ok(lp.includes('forty-nine age-guided classes'),'LP title count (Class 41 joined, owner 2026-10-31);');
 assert.ok(lp.includes('Forty-nine classes are ready now'),'LP intro count');
 assert.ok(read('/index.html').includes('Forty-nine classes are ready now'),'homepage count');
 assert.ok(read('/about/index.html').includes('Forty-nine classes from birth to age five are ready today'),'About count');
 const hub4=read('/preschool/4-years/index.html');
 assert.ok(hub4.includes('/preschool/4-years/weather-seasons-and-what-we-wear/'),'Age 4 stage card links Class 34');
 assert.ok(hub4.includes('Class 34'),'Class 34 chip on the stage hub');
 const fcHub=read('/flashcards/index.html');
 assert.ok(fcHub.includes(SET_URL),'flashcards hub lists the set');
 assert.ok(fcHub.includes('twenty-nine weather-and-clothes cards'),'hub copy names the weather cards');
 const reg=lpSetBySlug['weather-seasons-and-what-we-wear'];
 assert.ok(reg,'the set is in the shared LP_REGISTRY');
});


