import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {flashcardSets,babySet} from '../src/flashcards-project.mjs';
import {join,resolve} from 'node:path';
import {existsSync} from 'node:fs';
import {fcSets} from '../src/flashcards/index.mjs';
import LIBCOPY from '../src/flashcards/libcopy/index.mjs';
const root=resolve('dist');
const read=f=>readFileSync(f,'utf8');
const page=f=>readFileSync(join(root,f,'index.html'),'utf8');

test('flashcards hub lists every set and links from home nav and footer',()=>{
 const hub=readFileSync('dist/flashcards/index.html','utf8');
 for(const s of flashcardSets)assert.match(hub,new RegExp('/flashcards/'+s.slug+'/'));
 assert.match(hub,/first-discoveries-look-together-cutout-sheet\.webp/);
 const home=readFileSync('dist/index.html','utf8');
 assert.match(home,/href="\/flashcards\/"/);
});

test('black and white baby cards page shows flashcards, stages grid, guide and safety',()=>{
 const s=flashcardSets[0];
 const html=readFileSync(`dist/flashcards/${s.slug}/index.html`,'utf8');
 assert.match(html,/Black and White Baby Flashcards – Printable Cards/);
 for(const c of s.cards){assert.match(html,new RegExp(c.file));assert.match(html,new RegExp(c.word));}
 /* 'cutout' must never appear in the BODY — the look-together sheet is the
    set's og:image cover, but it must not be rendered as one of the cards. */
 const bodyHtml=html.slice(html.indexOf('<body'));
 assert.doesNotMatch(bodyHtml,/cutout/i);
 assert.match(html,/Newborn 1/);
 assert.match(html,/Newborn 2/);
 assert.match(html,/Infant 1/);
 assert.match(html,/0–6 weeks/);
 assert.match(html,/Visual tracking/);
 assert.match(html,/first-discoveries-look-together-parent-guide\.webp/);
 assert.match(html,/FOR THE GROWN-UPS/);
 assert.match(html,/The parents guide\./);
 assert.match(html,/shared looking, not a test\./i);
 assert.match(html,/25 to 40 centimetres/);
 assert.match(html,/out of sleep spaces/i);
 const urls=[...html.matchAll(/<img[^>]+src="(https:\/\/assets\.kiddo\.school[^"]+)"/g)].map(m=>m[1]);
 assert.ok(urls.length>=16,'set page should embed the fifteen flashcards plus the parents guide');
});

test('flashcard data: fifty-two flashcard sets (every learning-path class 1-22 covered, plus Class 23 the Music Room, the Playground, My Classroom, the Art Room, the Clubs and the Cafeteria school rooms, Classes 24, 28, 31-37 and Class 38 Feelings & Kindness, plus the Toddler Room, Kitchen, Doctor Visit, Home and Daily Life, Kids Games, Places in the Community, Animal Categories and Colors extra classes, the Nature Club Animals club and the Dinosaurs extra class), every card complete and linked to its real lesson',()=>{
 assert.equal(fcSets.length,52);
 for(const s of fcSets){
  assert.ok(s.cards.length>=10,`${s.slug} has ${s.cards.length} cards`);
  assert.ok(existsSync(join(root,s.url.slice(1),'index.html')),`${s.url} missing`);
  for(const c of s.cards){
   assert.ok(c.intro.length>80,`${s.slug}/${c.slug} intro too thin`);
   assert.ok(c.say.length>5,`${s.slug}/${c.slug} missing say line`);
   assert.ok(c.try.length>40,`${s.slug}/${c.slug} missing try activity`);
   assert.ok(c.note.length>40,`${s.slug}/${c.slug} missing parent note`);
   // Card art lives in the set's own R2 folder: /flashcards/ for the lesson
   // sets, /school/ for Class 32 (the owner's upload location — never moved).
   // Sight Words are self-hosted (public/assets/sight-words/, 600×800 webp).
   assert.match(c.img,/^(https:\/\/assets\.kiddo\.school\/(flashcards|school)\/|\/assets\/sight-words\/)/);
  }
 }
});





test('library: every set is listed, baby collection included, no orphan sets',()=>{
 const html=page('flashcards');
 for(const s of fcSets)assert.ok(html.includes(`href="${s.url}"`),`library missing ${s.url}`);
 assert.ok(html.includes('/flashcards/black-and-white-baby-cards/'),'baby collection still listed');
});









test('set pages never repeat the library cover thumbnail, and landscape covers keep their real ratio on the library wall',()=>{
 const css=read('dist/assets/style.css');
 for(const s of fcSets){
  const html=page(s.url.slice(1));
  assert.ok(!html.includes('fc2-cover'),`${s.url} still repeats the set cover — it was just shown on the library wall`);
  assert.ok(!html.includes('aspect-ratio="1414/2000"')&&!/<figure class="fc2-cover"/.test(html),`${s.url} cover figure leaked back in`);
 }
 assert.ok(!/\.fc2-cover img\{[^}]*aspect-ratio/.test(css),'no CSS may force 1414/2000 onto covers again');
 // The three landscape covers must carry their true intrinsic dims so the
 // browser reserves the right box before the file loads (no squash-then-jump).
 const lib=page('flashcards');
 for(const [slug,w,h] of [['emotions-and-feelings',2000,1414],['vehicles-and-sounds',2000,1294],['garden-bugs-and-friends',2000,1294]]){
  const set=fcSets.find(x=>x.slug===slug);
  assert.ok(set,'set exists: '+slug);
  assert.ok(lib.includes(`<img src="${set.coverUrl}" width="${w}" height="${h}"`),`library wall uses true ${w}×${h} cover dims for ${slug}`);
 }
});

test('reactions, reviews and comments are three separate systems',()=>{
 const mount=page('flashcards/animals-and-sounds');
 assert.ok(mount.includes('data-fc-reactions'),'reactions block');
 assert.ok(mount.includes('data-fc-review-form'),'reviews form');
 assert.ok(mount.includes('data-fc-comment-form'),'comments form');
 const js=read('dist/assets/flashcards-community.js');
 assert.ok(js.includes('/api/community/reaction'),'reaction API call');
 assert.ok(js.includes('/api/community/review'),'review API call');
 assert.ok(js.includes('/api/community/comment'),'comment API call');
 assert.ok(js.includes("reaction: 'star'"),'star reviews flagged with reaction=star');
 const api=read('functions/api/community/[[route]].js');
 assert.ok(api.includes("INSERT INTO page_reactions"),'reactions go to their own table');
 assert.ok(api.includes("rating"),"reviews accept a rating");
 assert.ok(api.includes("'Ratings go from 1 to 5 stars.'"),'rating is validated 1-5');
});

test('migration 0002 creates the reactions table and the rating column safely',()=>{
 const sql=read('migrations/0002_reactions_reviews.sql');
 assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS page_reactions'));
 assert.ok(sql.includes('reaction TEXT NOT NULL'));
 assert.ok(sql.includes('ALTER TABLE page_reviews ADD COLUMN rating INTEGER'));
 assert.ok(!/DROP TABLE|DELETE FROM/i.test(sql),'nothing is dropped or deleted');
});

test('lesson pages link to their flashcard sets and the links resolve',()=>{
 const checks={'/toddler/2-years/animals-and-sounds/':'/flashcards/animals-and-sounds/','/toddler/2-years/vehicles-and-sounds/':'/flashcards/vehicles-and-sounds/','/toddler/2-years/colors-and-shapes/':'/flashcards/colors-and-shapes/','/toddler/2-years/matching-and-sorting/':'/flashcards/matching-and-sorting/','/toddler/2-years/emotions-and-feelings/':'/flashcards/emotions-and-feelings/','/toddler/18-24-months/first-concepts-big-small-up-down/':'/flashcards/first-concepts/','/toddler/2-years/garden-bugs-and-friends/':'/flashcards/garden-bugs-and-friends/','/toddler/2-years/school-garden/garden-friends/':'/flashcards/garden-friends/'};
 for(const [lesson,set] of Object.entries(checks)){
  const html=page(lesson.slice(1));
  assert.ok(html.includes(`href="${set}"`),`${lesson} missing flashcards link`);
  assert.ok(existsSync(join(root,set.slice(1),'index.html')),`${set} does not exist`);
 }
});
