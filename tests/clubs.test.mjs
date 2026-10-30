// clubs — the SCHOOL ROOM · The Clubs (owner 2026-10-25): 45 extra-curricular
// activity cards on R2 at school/club/ (the owner's real upload location —
// the brief's school/rooms/clubs/flashcards/ is empty), cover first, then
// the 15 Ages 3+ clubs in the owner's order and the 30 Ages 6+ clubs in file
// order, one short page per activity at /clubs/<slug>/ (slug = file name)
// showing the card, the card's SKILL pill verbatim and a link back to
// /clubs/, individual /learn/ lessons via LP_REGISTRY, individual library
// cards at /flashcards/extra-curricular-activities/ — the deck's printed
// name (owner 2026-10-26 renamed the set URL: "who will search for club?") —
// with honest per-card age pills (Ages 3+ /
// Ages 6+), the trained-coach line on fencing and archery (owner safety
// rule), Explore the School (/rooms/) and the Learning Path's Growing-up
// classrooms row linked both ways, games-shelf links per the owner's
// standing rule, no existing URL changed.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CLUBS_ORDER,CLUBS_YOUNG,CLUBS_OLDER,CLUBS_SKILLS,CLUBS_COVER,CLUBS_COACH} from '../src/flashcards/data-clubs.mjs';
import {lpContent as clubsLp} from '../src/flashcards/lp-clubs.mjs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {ROOMS} from '../src/school-rooms.mjs';
const read=f=>readFileSync(f,'utf8');
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');
const set=fcSetBySlug['extra-curricular-activities'];
const R2BASE='https://assets.kiddo.school/school/club/';

const YOUNG=['art','music','dance','sports','drama','gardening','cooking','ballet','yoga','swimming','reading','crafts','drawing','baking','singing'];
const OLDER=['archery','astronomy','bird-watching','calligraphy','chess','choir','climbing','coding','cycling','debate','fencing','fashion-design','filmmaking','first-aid','gymnastics','horse-riding','journaling','lego','martial-arts','nature-crafts','photography','poetry','pottery','puppetry','robotics','science','skateboarding','table-tennis','tennis','volunteering'];

test('clubs set: 45 cards, slug = file name, owner age split, real R2 art',()=>{
 assert.equal(set.cards.length,45,'45 club cards, cover never counted');
 assert.deepEqual(CLUBS_YOUNG,YOUNG,'the 15 Ages 3+ clubs, in the owner\u2019s own order');
 assert.deepEqual(CLUBS_OLDER,OLDER,'the 30 Ages 6+ clubs, in file order');
 assert.deepEqual(CLUBS_ORDER,[...YOUNG,...OLDER],'display order = young shelf then older shelf');
 for(const c of set.cards){
  assert.match(c.file,new RegExp('^'+c.slug+'\\.webp$'),c.slug+' file matches slug');
  assert.match(c.img,/^https:\/\/assets\.kiddo\.school\/school\/club\//,c.slug+' serves from the owner folder');
  assert.equal(c.w,800);assert.equal(c.h,1131);
  assert.ok(c.alt.length>=80,c.slug+' alt written from the artwork');
  assert.ok(['Ages 3+','Ages 6+'].includes(c.ages),c.slug+' carries an honest age pill');
  assert.ok(c.pill,c.slug+' carries its shelf pill');
 }
 assert.equal(set.cards.filter(c=>c.ages==='Ages 3+').length,15,'exactly 15 Ages 3+ cards');
 assert.equal(set.cards.filter(c=>c.ages==='Ages 6+').length,30,'exactly 30 Ages 6+ cards');
 for(const y of YOUNG)assert.equal(set.cards.find(c=>c.slug===y).ages,'Ages 3+',y+' is a young-shelf club');
 assert.equal(CLUBS_COVER.w,800);assert.equal(CLUBS_COVER.h,1131);
 assert.ok(CLUBS_COVER.alt.includes('Extra-Curricular Activities'),'cover alt honest');
});

test('every card carries its own SKILL pill, transcribed verbatim from the artwork',()=>{
 // The exact pills read off the labeled contact sheets (scripts/club-sheets.py):
 const exact={'art':'Painting & Creativity','music':'Rhythm & Sound','dance':'Movement & Expression',
  'sports':'Teamwork & Fitness','drama':'Stories & Confidence','gardening':'Nature & Care',
  'cooking':'Food & Independence','ballet':'Balance & Grace','yoga':'Calm & Wellbeing',
  'swimming':'Confidence & Safety','reading':'Imagine & Learn','crafts':'Make & Explore',
  'drawing':'See & Create','baking':'Measure & Create','singing':'Voice & Confidence',
  'archery':'Aim & Focus','astronomy':'Wonder & Discovery','bird-watching':'Observe & Discover',
  'calligraphy':'Letters & Patience','chess':'Focus & Strategy','choir':'Voice & Harmony',
  'climbing':'Courage & Movement','coding':'Logic & Discovery','cycling':'Balance & Adventure',
  'debate':'Speak & Listen','fencing':'Agility & Focus','fashion-design':'Imagine & Create',
  'filmmaking':'Imagine & Tell','first-aid':'Help & Care','gymnastics':'Strength & Flexibility',
  'horse-riding':'Courage & Care','journaling':'Reflect & Express','lego':'Build & Create',
  'martial-arts':'Discipline & Strength','nature-crafts':'Collect & Create','photography':'Observe & Create',
  'poetry':'Words & Feelings','pottery':'Shape & Imagine','puppetry':'Create & Perform',
  'robotics':'Build & Invent','science':'Explore & Experiment','skateboarding':'Balance & Confidence',
  'table-tennis':'React & Play','tennis':'Move & Compete','volunteering':'Share & Support'};
 assert.deepEqual(CLUBS_SKILLS,exact,'all 45 skill pills verbatim');
 for(const c of set.cards)assert.ok(CLUBS_SKILLS[c.slug].length>8,c.slug+' skill present');
});

test('/clubs/ hub: cover FIRST, young shelf then older shelf, cross-links + games shelf',()=>{
 const html=readPage('/clubs/');
 const iCover=html.indexOf('club/cover.webp'), iFirst=html.indexOf('club/art.webp');
 assert.ok(iCover>-1&&iFirst>-1,'cover + first card render');
 assert.ok(iCover<iFirst,'cover fronts the room');
 const positions=CLUBS_ORDER.map(s=>html.indexOf('club/'+s+'.webp'));
 assert.deepEqual(positions,[...positions].sort((a,b)=>a-b),'45 tiles: 15 Ages 3+ first, then 30 Ages 6+');
 assert.equal((html.match(/class="lp-tile"/g)||[]).length,45,'45 tiles');
 assert.ok(html.includes('THE YOUNG CLUB SHELF'),'young shelf section');
 assert.ok(html.toUpperCase().includes('AGES 3–12'),'age pill on the room');
 assert.ok(html.includes('href="/rooms/"'),'links Explore the School');
 assert.ok(html.includes('href="/learning-path/"'),'links the Learning Path (Growing-up classrooms)');
 assert.ok(html.includes('href="/flashcards/extra-curricular-activities/"'),'links the printable set');
 for(const g of ['/games/animal-walks/','/games/musical-statues/','/games/relay-race/','/games/obstacle-course/','/games/simon-says/'])
  assert.ok(html.includes('href="'+g+'"'),'games-shelf link (owner standing rule) '+g);
});

test('/clubs/<slug>/: all 45 short pages show card + skill + back link + both deeper links',()=>{
 for(const s of CLUBS_ORDER){
  const html=readPage('/clubs/'+s+'/');
  const word=set.cards.find(c=>c.slug===s).word;
  const age=set.cards.find(c=>c.slug===s).ages;
  assert.ok(html.includes('<h1>'+word+'</h1>'),s+' H1 is the name');
  assert.ok(html.includes(R2BASE+s+'.webp'),s+' shows the owner card');
  assert.ok(html.includes(CLUBS_SKILLS[s]),s+' quotes the card\u2019s skill pill verbatim');
  assert.ok(html.toUpperCase().includes(age.toUpperCase()),s+' eyebrow carries its age tag ('+age+')');
  assert.ok(html.includes('href="/clubs/"'),s+' links back to /clubs/');
  assert.ok(html.includes('href="/clubs/learn/'+s+'/"'),s+' links its lesson');
  assert.ok(html.includes('href="/flashcards/extra-curricular-activities/'+s+'/"'),s+' links its printable twin');
 }
});

test('fencing and archery carry "Ask a grown-up and a trained coach" (owner safety rule)',()=>{
 for(const s of CLUBS_COACH){
  const short=readPage('/clubs/'+s+'/');
  assert.ok(short.includes('Ask a grown-up and a trained coach'),s+' short page carries the coach line');
  const card=readPage('/flashcards/extra-curricular-activities/'+s+'/');
  assert.ok(card.includes('Ask a grown-up and a trained coach'),s+' card page carries the coach line');
  assert.ok(clubsLp[s].know.includes('trained coach'),s+' lesson knows the trained-coach rule');
  assert.ok(clubsLp[s].safety&&clubsLp[s].safety.includes('coach'),s+' lesson has a Staying-safe block');
 }
 const art=readPage('/clubs/art/');
 assert.ok(!art.includes('trained coach'),'non-coach clubs do not carry the line');
});

test('/clubs/learn/<slug>/: all 45 lessons build with the full teaching contract',()=>{
 for(const s of CLUBS_ORDER){
  const html=readPage('/clubs/learn/'+s+'/');
  const l=clubsLp[s];
  assert.ok(html.includes(l.title),s+' lesson title renders');
  assert.ok(html.includes(R2BASE+s+'.webp'),s+' lesson shows the card');
  assert.ok(html.includes('href="/flashcards/extra-curricular-activities/'+s+'/"'),s+' lesson pairs its library card');
  for(const f of ['what','mean','know','why','dev','say','notice','real','play','check'])
   assert.ok(l[f]&&l[f].length>30,s+' lesson field '+f);
  assert.ok(l.teach.includes('\n2)'),s+' teach is a numbered walkthrough');
 }
 assert.ok(readPage('/clubs/learn/chess/').includes('think'),'chess lesson teaches the think-first rule');
 assert.ok(readPage('/clubs/learn/swimming/').includes('grown-up'),'swimming lesson keeps the water rules');
});

test('/flashcards/extra-curricular-activities/: set page + 45 card pages with honest age pills and group pills',()=>{
 const setHtml=readPage('/flashcards/extra-curricular-activities/');
 assert.ok(setHtml.includes('<h1>Extra-curricular activity flashcards.</h1>'),'set H1');
 assert.ok(setHtml.includes('href="/clubs/"'),'set links its room');
 assert.ok(setHtml.toUpperCase().includes('AGES 3–12 YEARS'),'set age label');
 for(const s of CLUBS_ORDER){
  const html=readPage('/flashcards/extra-curricular-activities/'+s+'/');
  const age=set.cards.find(c=>c.slug===s).ages;
  assert.ok(html.includes(age),s+' card page age pill ('+age+')');
  assert.ok(html.includes('/clubs/learn/'+s+'/'),s+' card page links its lesson');
  assert.ok(html.includes(R2BASE+s+'.webp'),s+' card page shows the art');
 }
 const ch=readPage('/flashcards/extra-curricular-activities/chess/');
 assert.ok(ch.includes('Think &amp; solve')||ch.includes('Think & solve'),'group pill renders');
 const yg=readPage('/flashcards/extra-curricular-activities/baking/');
 assert.ok(yg.includes('Cook, grow &amp; help')||yg.includes('Cook, grow & help'),'young card carries its group pill');
});

test('owner cross-links both ways: Explore the School + the Growing-up classrooms row',()=>{
 // Explore the School: /rooms/ lists six rooms and the homepage section carries the Clubs card
 const rooms=readPage('/rooms/');
 assert.ok(rooms.includes('href="/clubs/"'),'/rooms/ links the Clubs');
 assert.ok(rooms.includes('Eight rooms'),'/rooms/ copy says eight rooms — the School Hall joined (owner 2026-10-30)');
 assert.ok(rooms.includes('school/club/cover.webp'),'/rooms/ carries the Clubs cover');
 const home=read('dist/index.html');
 const sec=home.slice(home.indexOf('id="school-rooms"'),home.indexOf('id="school-rooms"')+14000);
 assert.ok(sec.includes('href="/clubs/"'),'homepage School Rooms section links the Clubs');
 assert.ok(ROOMS.some(r=>r.name==='Clubs'&&r.href==='/clubs/'),'ROOMS carries the Clubs');
 // The Learning Path Growing-up row links the room — and the room links back
 const lp=readPage('/learning-path/');
 assert.ok(lp.includes('href="/clubs/"'),'Growing-up classrooms row links /clubs/');
 assert.ok(readPage('/clubs/').includes('href="/learning-path/"'),'Clubs links the Learning Path back');
 assert.ok(readPage('/clubs/').includes('href="/rooms/"'),'Clubs links Explore the School back');
});

test('wiring: rooms hub card, filter tags, search index, /all-pages/, sitemap, honest counts',()=>{
 const fcHub=readPage('/flashcards/');
 assert.ok(fcHub.includes('href="/flashcards/extra-curricular-activities/"'),'flashcards wall carries the set');
 assert.ok(fcHub.includes('data-filters="age-3 age-4-5 lvl-rooms subj-sports subj-music subj-thinking subj-science subj-people skill-movement skill-talking skill-thinking"'),'set ships with filter tokens');
 assert.ok(fcHub.includes('The Clubs · School Rooms'),'the Clubs shelf is on the hub');
 const idx=read('dist/assets/search-index.json');
 for(const p of ['/clubs/','/clubs/chess/','/clubs/learn/baking/','/flashcards/extra-curricular-activities/yoga/'])
  assert.ok(idx.includes('"u":"'+p+'"'),'search index carries '+p);
 const all=readPage('/all-pages/');
 assert.ok(all.includes('href="/clubs/"'),'directory lists the room');
 assert.ok(all.includes('href="/clubs/fencing/"'),'directory lists short pages');
 const xml=read('dist/sitemap.xml');
 for(const p of ['/clubs/','/clubs/volunteering/','/clubs/learn/pottery/','/flashcards/extra-curricular-activities/reading/'])
  assert.ok(xml.includes('<loc>https://kiddo.school'+p+'</loc>'),'sitemap: '+p);
});
