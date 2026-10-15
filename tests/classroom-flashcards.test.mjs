import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
const read=f=>readFileSync(f,'utf8');
const site='https://kiddo.school';
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');

/* ---------------------------------------------- THE CLASSROOM SET */
const set=fcSetBySlug['classroom'];
const setHtml=readPage('/flashcards/classroom/');
const cover=set.cover;

test('classroom set: 30 cards in two groups, room link, honest grid',()=>{
 assert.equal(set.cards.length,30);
 assert.equal(set.cards.filter(c=>c.slug.startsWith('object-')).length,18);
 assert.equal(set.cards.filter(c=>c.slug.startsWith('rule-')).length,12);
 // All 30 art files probed at 800×1132 — nothing assumed
 for(const c of set.cards){assert.equal(c.w,800);assert.equal(c.h,1132);assert.match(c.img,/^(https:\/\/assets\.kiddo\.school\/school\/my-classroom\/flashcards\/)/);}
 assert.equal(cover.w,800);assert.equal(cover.h,1132);
 // The set links its ROOM (/my-classroom/), never a class or the Learning
 // Path; the room hosts the page the cards describe.
 assert.equal(set.classUrl,'/my-classroom/');
 assert.equal(set.lessonPath,'/my-classroom/');
 assert.ok(!set.stageName&&!set.stageHref,'classroom set has no class stage');
 assert.ok(setHtml.includes('href="/my-classroom/"'),'set page links the My Classroom room');
 assert.ok(setHtml.includes('Step into the room these cards come from'),'room-labelled button');
 assert.ok(!setHtml.includes('on the Kiddo School learning path'),'no learning-path claim for a room set');
 assert.ok(!setHtml.includes('View the class'),'no class wording for a room set');
 // the owner's two groups render as pill-headed sections, 18 + 12
 assert.equal((setHtml.match(/class="fc-pillgroup"/g)||[]).length,2);
 assert.ok(setHtml.includes('Classroom objects')&&setHtml.includes('Good habits'),'both group headings');
 // every card page exists on disk
 for(const c of set.cards)assert.ok(existsSync('dist'+c.url+'index.html'),c.url+' missing');
 // slugs keep their category prefix (object-, rule-) — no collisions
 const slugs=new Set(set.cards.map(c=>c.slug));
 assert.equal(slugs.size,30,'all 30 slugs unique');
});

test('classroom card pages: classic blocks, download, honest room framing, unique titles',()=>{
 const titles=new Set();
 for(const c of set.cards){
  const html=readPage(c.url);
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!titles.has(title),`duplicate title: ${title}`);titles.add(title);
  assert.ok(html.includes('Say it together'),`${c.url} missing say`);
  assert.ok(html.includes('Try this'),`${c.url} missing try`);
  assert.ok(html.includes('Quick parent note'),`${c.url} missing note`);
  assert.ok(html.includes(`href="${c.img}" download=`),`${c.url} download button`);
  assert.ok(html.includes('href="/flashcards/classroom/"'),`${c.url} set back-link`);
  assert.ok(html.includes('href="/my-classroom/"'),`${c.url} room link`);
  assert.ok(!html.includes('class on the Learning Path'),`${c.url} must not claim a class`);
  // per-card category pills: age pill + object/habit pill
  assert.ok(html.includes('Classroom object')||html.includes('Good habit'),`${c.url} category pill`);
 }
});

test('scissors card teaches cutting safety, not hidden fear',()=>{
 const html=readPage('/flashcards/classroom/object-scissors/');
 assert.ok(html.includes('paper only'),'paper-only rule stated');
 assert.ok(html.includes('grown-up'),'grown-up supervision stated');
});

test('my-classroom page carries the categorized flashcards panel',()=>{
 const mc=readPage('/my-classroom/');
 assert.ok(mc.includes('href="/flashcards/classroom/"'),'panel links the set');
 assert.ok(mc.includes('Classroom objects')&&mc.includes('Good habits'),'two categories on the room page');
 let links=0;
 for(const c of set.cards){assert.ok(mc.includes(`href="${c.url}"`),'room page links '+c.url);links++;}
 assert.equal(links,30,'all 30 card pages linked from My Classroom');
});

test('flashcards hub lists the classroom set under its own school-rooms shelf',()=>{
 const hub=readPage('/flashcards/');
 assert.ok(hub.includes('href="/flashcards/classroom/"'),'hub links the classroom set');
 assert.ok(hub.includes('My Classroom · School Rooms'),'dedicated shelf heading');
 assert.ok(hub.includes('30 cards'),'honest card count on the wall card');
});
