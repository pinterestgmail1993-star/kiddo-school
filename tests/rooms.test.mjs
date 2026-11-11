import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {csLesson,msLesson,anLesson,vhLesson,emLesson,fwftLesson,aeoLesson,fwfhLesson,fabLesson,fcLesson} from '../src/lessons.mjs';
import {myWorkHub,drawScribble,traceFollow} from '../src/my-work.mjs';
import {playHub,matchIt,sortIt,whatsDifferent} from '../src/play-practice.mjs';
import {schoolBag,learningLibrary} from '../src/school-spaces.mjs';
import {ourClassroom,letsExplore,stickyWall} from '../src/classroom-life.mjs';
const read=f=>readFileSync(f,'utf8');
const site='https://kiddo.school';
const mw=read('dist/toddler/2-years/my-work/index.html');


const pp=read('dist/toddler/2-years/play-and-practice/index.html');



const bag=read('dist/my-school-bag/index.html');
const lib=read('dist/learning-library/index.html');
const oc=read('dist/toddler/2-years/our-classroom/index.html');
const le=read('dist/toddler/2-years/lets-explore/index.html');
const wall=read('dist/sticky-note-wall/index.html');
const visible=html=>html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'').replace(/<[^>]+>/g,' ');
const noBanned=(html,words,label)=>{const text=visible(html);for(const w of words)assert.ok(!new RegExp(w,'i').test(text),label+' shows banned word: '+w);};

/* ------------------------------------------------------------- MY WORK */




/* ------------------------------------------------------ PLAY & PRACTICE */







/* -------------------------------------------------------- MY SCHOOL BAG */

test('drawings stay private: no sitemap entry, no public ids',()=>{
 const xml=read('dist/sitemap.xml');
 assert.ok(!xml.includes('/my-school-bag/'),'school bag is not in the sitemap');
 assert.ok(!bag.includes('IndexedDB'),'no technical storage words shown');
});

/* ------------------------------------------------------ LEARNING LIBRARY */
test('the library is a books-only bookshelf: real books only, empty shelves hidden, no coming-soon placeholders',()=>{
 assert.ok(lib.includes(`rel="canonical" href="${site}/learning-library/"`));
 assert.ok(lib.includes('<title>Library — Picture Books to Read Online | Kiddo.school</title>'));
 // scope content checks to the page body: the footer and header are sitewide
 const body=lib.match(/<main id="main">[\s\S]*<\/main>/)[0];
 assert.ok(lib.includes('<h1>Library</h1>'));
 assert.ok(lib.includes('data-library'),'filter root present');
 // books only: no classes, games, flashcards, circle time or activities listed
 assert.ok(!body.includes('href="/preschool/3-years/'),'no class listings');
 assert.ok(!/href="\/flashcards\/(?!music-room\/)[a-z-]+\//.test(body),'no flashcard set listings (the Music Room instrument shelf, owner-approved 2026-10-14, is the only set allowed)');
 assert.ok(!body.includes('href="/toddler/2-years/play-and-practice/'),'no game listings');
 assert.ok(!body.includes('href="/toddler/2-years/my-work/'),'no activity listings');
 assert.ok(!body.includes('href="/toddler/2-years/circle-time/'),'no circle time listings');
 // only shelves with books render; each book card points at a real readable book
 for(const c of ['storybooks','educational'])assert.ok(lib.includes(`data-cat="${c}"`),'shelf '+c);
 for(const c of ['activity','life-skills'])assert.ok(!lib.includes(`data-cat="${c}"`),'empty shelf hidden '+c);
 // ONE-PAGE (owner 2026-11-11): the books fold into the library itself
 assert.ok(lib.includes('id="bunny-finds-a-friend"'),'the real book is folded into the library');
 assert.ok(!lib.includes('href="/library/books/'),'no book-page links left');
 assert.ok(read('dist/_redirects').includes('/library/books/age-2/bunny-finds-a-friend/ /learning-library/ 301'),'book URL 301s to the library');
 assert.ok(lib.includes('Read Book'),'free reading CTA');
 assert.ok(!/coming soon/i.test(lib),'no coming-soon placeholder');
 assert.ok(!/\$\d|Buy now|checkout/i.test(lib),'no fake checkout or invented prices');
 assert.ok(lib.includes('href="/my-classroom/"')&&lib.includes('Back to My Classroom'));
 assert.ok(lib.includes('BreadcrumbList')&&lib.includes('"name":"Library"'));
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
 assert.match(wall,/src="\/assets\/community-api\.js(\?v=[0-9]+)?"/);
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
