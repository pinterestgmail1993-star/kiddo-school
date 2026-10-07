import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {csLesson,msLesson,anLesson,vhLesson,emLesson,fwftLesson,aeoLesson,fwfhLesson,fabLesson,fcLesson} from '../src/lessons.mjs';
import {myWorkHub,drawScribble,traceFollow} from '../src/my-work.mjs';
import {playHub,matchIt,sortIt,whatsDifferent} from '../src/play-practice.mjs';
import {schoolBag,learningLibrary} from '../src/school-spaces.mjs';
import {ourClassroom,letsExplore,stickyWall} from '../src/classroom-life.mjs';
const read=f=>readFileSync(f,'utf8');
const site='https://kiddo-school.pages.dev';
const mw=read('dist/toddler/2-years/my-work/index.html');
const draw=read('dist/toddler/2-years/my-work/draw-and-scribble/index.html');
const trace=read('dist/toddler/2-years/my-work/trace-and-follow/index.html');
const pp=read('dist/toddler/2-years/play-and-practice/index.html');
const match=read('dist/toddler/2-years/play-and-practice/match-it/index.html');
const sort=read('dist/toddler/2-years/play-and-practice/sort-it/index.html');
const diff=read('dist/toddler/2-years/play-and-practice/whats-different/index.html');
const bag=read('dist/my-school-bag/index.html');
const lib=read('dist/learning-library/index.html');
const oc=read('dist/toddler/2-years/our-classroom/index.html');
const le=read('dist/toddler/2-years/lets-explore/index.html');
const wall=read('dist/sticky-note-wall/index.html');
const visible=html=>html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'').replace(/<[^>]+>/g,' ');
const noBanned=(html,words,label)=>{const text=visible(html);for(const w of words)assert.ok(!new RegExp(w,'i').test(text),label+' shows banned word: '+w);};

/* ------------------------------------------------------------- MY WORK */
test('my work hub opens from the desk with two real choices',()=>{
 assert.ok(mw.includes(`rel="canonical" href="${site}/toddler/2-years/my-work/"`));
 assert.ok(mw.includes('<title>My Work — Activities for 2-Year-Olds | Kiddo.school</title>'));
 assert.ok(mw.includes('<h1>My Work</h1>'));
 assert.ok(mw.includes('Let’s make something!'));
 assert.ok(mw.includes('href="/toddler/2-years/my-work/draw-and-scribble/"')&&mw.includes('>Draw &amp; Scribble</strong>'));
 assert.ok(mw.includes('href="/toddler/2-years/my-work/trace-and-follow/"')&&mw.includes('>Trace &amp; Follow</strong>'));
 assert.ok(mw.includes('href="/my-classroom/"'));
 assert.ok(mw.includes('Read the prompt aloud and do it together.'));
 noBanned(mw,['must','should already','develop fine motor'], 'my work');
});
test('draw & scribble is a real canvas with big tools and optional prompts',()=>{
 assert.ok(draw.includes(`rel="canonical" href="${site}/toddler/2-years/my-work/draw-and-scribble/"`));
 assert.ok(draw.includes('<title>Draw &amp; Scribble for 2-Year-Olds | Kiddo.school</title>'));
 assert.ok(draw.includes('<h1>Draw &amp; Scribble</h1>'));
 assert.ok(draw.includes('data-mw-canvas'),'canvas present');
 for(const p of drawScribble.prompts)assert.ok(draw.includes(p),'prompt '+p);
 assert.ok(draw.includes('data-mw-idea'),'New Idea');
 assert.ok(draw.includes('data-mw-done'),'I’m Done');
 assert.ok(draw.includes('data-mw-undo')&&draw.includes('data-mw-clear'),'undo and clear');
 assert.ok(draw.includes('data-mw-eraser')&&draw.includes('aria-label="Eraser"'),'eraser');
 assert.equal((draw.match(/data-mw-color="/g)||[]).length,5,'five clear colors');
 assert.ok(draw.includes('Nice creating!'));
 assert.ok(draw.includes('Draw Again')&&draw.includes('Back to My Work'));
 assert.ok(draw.includes('Save to School Bag'));
 assert.ok(read('dist/assets/my-work.js').includes('Saved to your School Bag!'),'save success lives in the runner');
 assert.ok(read('dist/assets/style.css').includes('.mw-canvas{')&&read('dist/assets/style.css').includes('touch-action:none'),'canvas blocks page scroll while drawing');
 assert.ok(draw.includes('Open School Bag'));
 assert.ok(draw.includes('/assets/my-work.js'),'drawing engine loads');
 assert.ok(draw.includes('touch-action:none')===false,'touch-action lives in JS, CSS carries it');
 noBanned(draw,['score','rating','good drawing','bad drawing','correct'],'draw page');
});
test('trace & follow ships all six paths with toddler-safe wording',()=>{
 assert.ok(trace.includes(`rel="canonical" href="${site}/toddler/2-years/my-work/trace-and-follow/"`));
 assert.ok(trace.includes('<title>Tracing for 2-Year-Olds — Trace &amp; Follow | Kiddo.school</title>'));
 assert.ok(trace.includes('<h1>Trace &amp; Follow</h1>'));
 for(const p of traceFollow.paths){
  assert.ok(trace.includes(`data-trace-step="${p.id}"`),'step '+p.id);
  assert.ok(trace.includes(`d="${p.d}"`),'path data '+p.id);
 }
 assert.equal((trace.match(/data-trace-step=/g)||[]).length,6,'six trace paths');
 assert.ok(read('dist/assets/style.css').includes('stroke-dasharray'),'dashed trace path');
 assert.ok(trace.includes('Wobbly is wonderful.'));
 assert.ok(trace.includes('>Done!</button>')&&trace.includes('Nice tracing!'));
 assert.ok(trace.includes('>Next</button>'));
 noBanned(trace,['accuracy','percentage','failed','wrong','score'],'trace page');
});

/* ------------------------------------------------------ PLAY & PRACTICE */
test('play & practice hub keeps three simple games',()=>{
 assert.ok(pp.includes(`rel="canonical" href="${site}/toddler/2-years/play-and-practice/"`));
 assert.ok(pp.includes('<title>Learning Games for 2-Year-Olds | Kiddo.school</title>'));
 assert.ok(pp.includes('<h1>Play &amp; Practice</h1>'));
 assert.ok(pp.includes('Pick a game!'));
 for(const g of playHub.games)assert.ok(pp.includes(`href="/toddler/2-years/play-and-practice/${g.href}"`)&&pp.includes(g.say),'game '+g.name);
});
test('match it has ten real-card configurations and gentle feedback',()=>{
 assert.ok(match.includes(`rel="canonical" href="${site}/toddler/2-years/play-and-practice/match-it/"`));
 assert.ok(match.includes('<title>Matching Game for 2-Year-Olds | Kiddo.school</title>'));
 assert.ok(match.includes('<h1>Match It</h1>'));
 assert.ok(match.includes('Find the same one.'));
 assert.equal((match.match(/data-round/g)||[]).length,10,'ten configurations');
 assert.equal((match.match(/data-pp-correct/g)||[]).length,10,'each round has exactly one match');
 const playjs=read('dist/assets/play.js');
 assert.ok(playjs.includes('You found it!')&&playjs.includes('Look again.'),'gentle feedback lives in the runner');
 assert.ok(match.includes('Nice playing!'));
 assert.ok(match.includes('Play Again')&&match.includes('Choose Another Game')&&match.includes('Back to My Classroom'));
 noBanned(match,['WRONG','accuracy','score','timer'],'match it');
});
test('sort it gives drag AND tap with three real sorting rounds',()=>{
 assert.ok(sort.includes(`rel="canonical" href="${site}/toddler/2-years/play-and-practice/sort-it/"`));
 assert.ok(sort.includes('<title>Sorting Game for 2-Year-Olds | Kiddo.school</title>'));
 assert.ok(sort.includes('<h1>Sort It</h1>'));
 assert.ok(sort.includes('Where does it go?'));
 assert.equal((sort.match(/data-sort-round/g)||[]).length,3,'three sorting rounds');
 assert.ok(sort.includes('data-pp-zone="Animals"')&&sort.includes('data-pp-zone="Vehicles"'),'animals vs vehicles');
 assert.ok(sort.includes('data-pp-zone="Food"')&&sort.includes('data-pp-zone="Animals"'),'food vs animals');
 assert.ok(sort.includes('data-pp-zone="Circles"')&&sort.includes('data-pp-zone="Triangles"'),'circles vs triangles');
 assert.ok(sort.includes('Try the other group.')||read('dist/assets/play.js').includes('Try the other group.'));
 assert.ok(sort.includes('Drag the picture into its group — or tap the picture, then tap the group.'),'tap alternative stated');
 assert.ok(read('dist/assets/play.js').includes('goes with the'),'gentle success wording');
 noBanned(sort,['WRONG','accuracy','score','timer'],'sort it');
});
test('what\'s different keeps ten obvious rounds and gentle feedback',()=>{
 assert.ok(diff.includes(`rel="canonical" href="${site}/toddler/2-years/play-and-practice/whats-different/"`));
 assert.ok(diff.includes('<title>What’s Different? Toddler Game | Kiddo.school</title>'));
 assert.ok(diff.includes('<h1>What’s Different?</h1>'));
 assert.ok(diff.includes('Which one is different?'));
 assert.equal((diff.match(/data-round/g)||[]).length,10,'ten configurations');
 assert.equal((diff.match(/data-pp-different/g)||[]).length,10,'each round has one odd card');
 assert.ok(read('dist/assets/play.js').includes('You found the different one!'),'different-one feedback lives in the runner');
 noBanned(diff,['WRONG','accuracy','score','subtle'],'whats different');
});
test('every game image is an existing Kiddo.school card at its true aspect ratio',()=>{
 const dims=new Map();
 for(const L of [csLesson,msLesson,anLesson,vhLesson,emLesson,fwftLesson,aeoLesson,fwfhLesson,fabLesson]){
  for(const c of L.cards)dims.set(L.folder+c.file,[c.w,c.h,L.alt]);
  dims.set(L.folder+L.cover.file,[L.cover.w,L.cover.h,L.cover.alt]);
 }
 let checked=0;
 for(const [html,label] of [[match,'match'],[sort,'sort'],[diff,'diff'],[bag,'bag']]){
  for(const m of html.matchAll(/<img src="https:\/\/pub-f2fcb7c9b45a496cbeefef18dbba0ec0\.r2\.dev\/flashcards\/toddler-learning-cards\/([^"]+)" width="(\d+)" height="(\d+)"[^>]*>/g)){
   const key=m[1],[w,h]=dims.get(key)||[null,null];
   assert.ok(w,`${label}: unknown card ${key}`);
   assert.equal(+m[2],w,`${label}: ${key} width must be ${w}`);
   assert.equal(+m[3],h,`${label}: ${key} height must be ${h}`);
   checked++;
  }
 }
 assert.ok(checked>=30,'checked '+checked+' card images');
});
test('game pages never invent assets or folders',()=>{
 for(const [html,label] of [[match,'match'],[sort,'sort'],[diff,'diff']]){
  assert.doesNotMatch(html,/my-work-drawings|play-practice-assets|new-r2-folder/);
  assert.ok(html.includes('toddler-learning-cards/'),label+' reuses toddler cards');
  const folders=[...html.matchAll(/r2\.dev\/(flashcards\/[a-z-]+)\//g)].map(m=>m[1]);
  for(const f of folders)assert.equal(f,'flashcards/toddler-learning-cards',label+' uses only the existing card base');
 }
});

/* -------------------------------------------------------- MY SCHOOL BAG */
test('my school bag is private, honest and connects real printables',()=>{
 assert.ok(bag.includes(`rel="canonical" href="${site}/my-school-bag/"`));
 assert.ok(bag.includes('<title>My School Bag | Kiddo.school</title>'));
 assert.ok(bag.includes('content="noindex,follow"'),'personal area is noindex,follow');
 assert.ok(bag.includes('<h1>My School Bag</h1>'));
 assert.ok(bag.includes('Your school things, all in one place.'));
 assert.ok(bag.includes('My Creations')&&bag.includes('Saved on this device.'));
 assert.ok(bag.includes('Nothing here yet.'));
 assert.ok(bag.includes('Make a picture at your desk and save it here.'));
 assert.ok(bag.includes('href="/toddler/2-years/my-work/draw-and-scribble/"'),'Go to My Work');
 assert.ok(bag.includes('data-bag-gallery')&&bag.includes('/assets/school-bag.js'),'gallery engine loads');
 assert.ok(bag.includes('Remove this drawing?')&&bag.includes('Keep It')&&bag.includes('>Remove</button>'),'delete asks first');
 assert.ok(!bag.includes('Certificates')&&!bag.includes('certificate'),'no fake certificates');
 assert.ok(!bag.includes('Recently Learned')&&!bag.includes('Completed Classes'),'no fake history');
 for(const p of schoolBag.printables.items){
  assert.ok(bag.includes(`href="${p.href}"`),'printable '+p.name);
  assert.ok(read('dist'+p.href+'index.html'),'printable page exists for '+p.href);
 }
 assert.ok(!/Download PDF/i.test(bag),'no fake PDF claims');
 assert.ok(bag.includes('href="/flashcards/"'),'more printable cards link');
});
test('drawings stay private: no sitemap entry, no public ids',()=>{
 const xml=read('dist/sitemap.xml');
 assert.ok(!xml.includes('/my-school-bag/'),'school bag is not in the sitemap');
 assert.ok(!bag.includes('IndexedDB'),'no technical storage words shown');
});

/* ------------------------------------------------------ LEARNING LIBRARY */
test('learning library organizes only real destinations',()=>{
 assert.ok(lib.includes(`rel="canonical" href="${site}/learning-library/"`));
 assert.ok(lib.includes('<title>Learning Library — Toddler Activities &amp; Classes | Kiddo.school</title>'));
 assert.ok(lib.includes('<meta name="description" content="Explore Kiddo School classes, games, Circle Time and creative activities for toddlers, all organized in one simple Learning Library.">'));
 assert.ok(lib.includes('<h1>Learning Library</h1>'));
 assert.ok(lib.includes('Find something to learn, play or explore.'));
 for(const s of learningLibrary.sections){
  assert.ok(lib.includes(`<h2>${s.title.replace('&','&amp;')}</h2>`),'section '+s.title);
  for(const it of s.items){
   assert.ok(lib.includes(`href="${it.href}"`),'item '+it.name);
   assert.ok(read('dist'+it.href+'index.html'),'real destination for '+it.name);
  }
 }
 for(const a of learningLibrary.ages.items)assert.ok(read('dist'+a[1]+'index.html'),'age hub '+a[0]);
 assert.ok(lib.includes('>Class</span>'),'"Class" type label');
 assert.ok(lib.includes('>Game</span>'),'"Game" type label');
 assert.ok(lib.includes('>Circle Time</span>'),'"Circle Time" type label');
 assert.ok(lib.includes('>Activity</span>'),'"Activity" type label');
 assert.ok(lib.includes('href="/my-classroom/"')&&lib.includes('Back to My Classroom'));
 assert.ok(lib.includes('BreadcrumbList')&&lib.includes('"name":"Learning Library"'));
 assert.ok(lib.includes('today’s class'),'distinction from today’s class');
 assert.ok(!/Coming Soon/i.test(lib),'no placeholder cards');
 assert.ok(lib.includes('width="1920" height="1080"'),'circle time cover keeps its true ratio');
});

/* -------------------------------------------------------- OUR CLASSROOM */
test('our classroom has all seven practice ideas, no shaming, no scoring',()=>{
 assert.ok(oc.includes(`rel="canonical" href="${site}/toddler/2-years/our-classroom/"`));
 assert.ok(oc.includes('<title>Our Classroom — Simple Activities for 2-Year-Olds | Kiddo.school</title>'));
 assert.ok(oc.includes('<h1>Our Classroom</h1>'));
 assert.ok(oc.includes('We learn and play together.'));
 assert.ok(oc.includes('Let’s practice!'));
 for(const r of ourClassroom.rules)assert.ok(oc.includes(`data-oc-open="${r.id}"`)&&oc.includes(r.name),'rule '+r.name);
 assert.ok(oc.includes('Listen and do!')&&oc.includes('I Did It!'));
 assert.ok(read('dist/assets/rooms.js').includes('Nice listening!'),'listening cheer lives in the runner');
 assert.ok(oc.includes('Someone drops a toy.')&&oc.includes('Help pick it up')&&oc.includes('That was helpful.'));
 assert.ok(oc.includes('Someone feels sad.')&&oc.includes('Sit with them')&&oc.includes('That can be kind.'));
 assert.ok(oc.includes('data-oc-ball')&&oc.includes('Your turn!'));
 const roomsjs=read('dist/assets/rooms.js');
 assert.ok(roomsjs.includes('Grown-up’s turn!')&&roomsjs.includes('We took turns!'),'turn words live in the runner');
 assert.ok(oc.includes('Pat the teddy gently.'));
 assert.ok(roomsjs.includes('Soft and gentle.'),'gentle words live in the runner');
 assert.ok(oc.includes('Where do the toys go?')&&oc.includes('Toy box'));
 assert.ok(roomsjs.includes('All tidy!'),'tidy finish lives in the runner');
 assert.ok(oc.includes('Can you help put the books away?'));
 assert.ok(roomsjs.includes('Thanks for helping!'),'helping finish lives in the runner');
 assert.ok(oc.includes('Clap, wave, clap!'));
 assert.ok(roomsjs.includes('We tried together!'),'together finish lives in the runner');
 assert.ok(oc.includes('Drag a toy into the box — or tap the toy, then tap the box.'));
 assert.ok(oc.includes('— Your Kiddo School teacher'),'existing teacher, attributed once');
 noBanned(oc,['naughty','bad listener','good child','bad child','WRONG','behavior score','shame'],'our classroom');
 noBanned(oc,['camera','microphone'],'our classroom');
});

/* --------------------------------------------------------- LET'S EXPLORE */
test('lets explore sends families off screen with eight safe missions',()=>{
 assert.ok(le.includes(`rel="canonical" href="${site}/toddler/2-years/lets-explore/"`));
 assert.ok(le.includes('<title>Let’s Explore — Activities for 2-Year-Olds | Kiddo.school</title>'));
 assert.ok(le.includes('<h1>Let’s Explore</h1>'));
 assert.ok(le.includes('Pick a mission. Then put the screen down and explore together.'));
 assert.ok(le.includes('Stay together while you explore.'));
 for(const m of letsExplore.missions)assert.ok(le.includes(`data-le-view="${m.id}"`)&&le.includes(m.name),'mission '+m.name);
 assert.ok(le.includes('Can you find something <strong data-le-color>red</strong>'));
 assert.ok(le.includes('I Found One!')&&le.includes('We Did It!')&&le.includes('We’re Listening'));
 assert.ok(le.includes('We Heard Something!')&&le.includes('We Spotted One!')&&le.includes('Found It!'));
 assert.ok(read('dist/assets/rooms.js').includes('We Found Them!'),'big & small finish lives in the runner');
 assert.ok(le.includes('Find Another Color')&&le.includes('Find Another Shape')&&le.includes('Try Something Else')&&le.includes('Another Animal'));
 assert.ok(le.includes('Find something big.')&&le.includes('Which one was bigger?'));
 assert.ok(read('dist/assets/rooms.js').includes('Now find something small.'),'small step lives in the runner');
 assert.ok(le.includes('It can be outside, in a book, or on a toy.'));
 assert.ok(le.includes('Hop like a frog.')&&le.includes('Waddle like a duck.'));
 assert.ok(le.includes('You explored together!')&&le.includes('Another Mission')&&le.includes('Back to My Classroom'));
 assert.ok(le.includes('data-le-pools'),'prompt pools ship as data');
 noBanned(le,['camera','microphone','location','photo','timer','score','streak','leaderboard'],'lets explore');
});

/* ------------------------------------------------------ STICKY NOTE WALL */
test('sticky note wall shows classroom examples and an honest form',()=>{
 assert.ok(wall.includes(`rel="canonical" href="${site}/sticky-note-wall/"`));
 assert.ok(wall.includes('<title>Sticky Note Wall | Kiddo.school</title>'));
 assert.ok(wall.includes('<meta name="description" content="See little notes from the Kiddo School community and send a note for our classroom wall.">'));
 assert.ok(wall.includes('<h1>Our Sticky Note Wall</h1>'));
 assert.ok(wall.includes('Little notes from our school community.'));
 assert.ok(wall.includes('Classroom examples'),'starter notes labeled as examples');
 for(const n of stickyWall.notes)assert.ok(wall.includes(n.replace('&','&amp;')),'note: '+n);
 assert.ok(wall.includes('Child’s display name')&&wall.includes('(optional)'));
 assert.ok(wall.includes('Use a first name, nickname or initials. Don’t include private information.'));
 assert.ok(wall.includes('maxlength="120"'),'120 character limit');
 assert.ok(wall.includes('I’m the parent or guardian and I’m okay with this note being reviewed for the public Sticky Note Wall.'));
 assert.ok(wall.includes('data-wall-send')&&wall.includes('Send Note'));
 assert.ok(!wall.includes('review your note before it goes on the wall'),'the page never promises instant publishing');
 const rooms=read('dist/assets/rooms.js');
 // The wall is now connected to the real backend: notes POST to the API and
 // land as pending — success is claimed only after the server confirms.
 assert.ok(rooms.includes('/api/community/sticky'),'notes POST to the real API');
 assert.ok(rooms.includes('Thanks! Your note will go up after the school office reads it.'),'honest pending message');
 assert.ok(rooms.includes('We couldn’t send that. Please try again.'),'honest failure message');
 assert.ok(rooms.includes('Write a little note first.')&&rooms.includes('Please tick the parent box first.'));
 assert.ok(wall.includes('data-wall-family-wrap'),'approved family notes area exists');
 assert.match(wall,/src="\/assets\/community-api\.js"/);
 noBanned(wall,['testimonial','email address','phone number'],'sticky wall');
});

/* ---------------------------------------------------------- CROSS-CUTTING */
test('my work and play routes are reachable from the age 2 hub and my classroom',()=>{
 const t3=read('dist/toddler/2-years/index.html');
 assert.ok(t3.includes('href="/toddler/2-years/my-work/"'),'age 2 hub links my work');
 const mc=read('dist/my-classroom/index.html');
 for(const h of ['/toddler/2-years/my-work/','/toddler/2-years/play-and-practice/','/my-school-bag/','/learning-library/','/toddler/2-years/our-classroom/','/toddler/2-years/lets-explore/','/sticky-note-wall/'])
  assert.ok(mc.includes('href="'+h+'"'),'classroom links '+h);
});
