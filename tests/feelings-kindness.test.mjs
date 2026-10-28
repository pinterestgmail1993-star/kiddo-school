/* feelings-kindness — CLASS 38 · FEELINGS & KINDNESS (owner 2026-10-23:
   "Add it as Class 38 at the end of the Learning Path, after Class 37
   (Sports, Movement & Play)"). 35 cards at
   school/preschool/4-years/feelings-and-kindness/flashcards/ (35 cards in
   file order 01–35 + cover, every file probed 200 at 800×1131 portrait),
   ONE class page at /preschool/4-years/feelings-and-kindness/ with the
   whole set as pictures, one /learn/ lesson per card, the library twins at
   /flashcards/feelings-and-kindness/, cover as og:image, and the two
   owner-pinned cross-links: Class 32 links forward with "Next: Feelings &
   Kindness (Class 38)" and the toddler Emotions & Feelings class (Lesson
   13) links here with "More feelings for ages 4–5". Class 38 sits at the
   END of the path by owner decision — beside Class 32 was the logical
   home, but inserting it there would renumber Classes 33–37. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=f=>readFileSync(f,'utf8');
const CARDS=['happy','share','excited','gentle','try-again','friend','lonely','patient','comfort','sorry','include','hopeful','curious','brave','give','kind','respect','pause','grateful','jealous','ask-for-help','say-hello','take-turns','kind-choice','calm-down','i-feel','speak-kindly','welcome','you-matter','be-yourself','belong','breathe','care','forgive','kind-words'];
const FILES=['01-happy-sad-angry-calm.webp','02-kind-share-help-thank-you.webp','03-excited-worried-surprised-proud.webp','04-listen-gentle-take-turns-kind-words.webp','05-breathe-brave-try-again-i-can-do-it.webp','06-smile-care-forgive-friend.webp','07-lonely-loved-frustrated-relaxed.webp','08-patient-honest-polite-fair.webp','09-notice-understand-comfort-encourage.webp','10-wait-ask-listen-carefully-say-sorry.webp','11-welcome-include-cooperate-teamwork.webp','12-hopeful-safe-problem-solver-kind-heart.webp','13-joyful-tired-confused-curious.webp','14-scared-brave-shy-confident.webp','15-share-give-care-thank.webp','16-be-kind-helpful-patient-honest.webp','17-forgive-accept-respect-include.webp','18-pause-breathe-deeply-think-choose-kindness.webp','19-proud-disappointed-grateful-peaceful.webp','20-worried-relieved-jealous-embarrassed.webp','21-notice-name-share-feelings-ask-for-help.webp','22-say-hello-make-space-be-curious-ask-nicely.webp','23-share-space-work-together-take-turns-cheer-others.webp','24-kind-choice-good-friend-try-your-best-grow-together.webp','25-calm-down-count-to-ten-use-your-words-take-a-break.webp','26-i-feel-i-need-i-want-i-choose.webp','27-listen-first-think-first-speak-kindly-solve-together.webp','28-welcome-all-be-inclusive-share-joy-make-a-friend.webp','29-you-matter-i-am-here-you-are-safe-we-care.webp','30-keep-trying-learn-celebrate-be-yourself.webp','31-welcome-belong-trust-connect.webp','32-notice-pause-breathe-reset.webp','33-care-support-encourage-comfort.webp','34-listen-understand-respond-forgive.webp','35-kind-words-kind-actions-kind-heart-choose-kindness.webp'];
const CLASS_PATH='/preschool/4-years/feelings-and-kindness/';
const R2='https://assets.kiddo.school/school/preschool/4-years/feelings-and-kindness/';
const cls=read('dist'+CLASS_PATH+'index.html');
const main=cls.split('</main>')[0];
const set=read('dist/flashcards/feelings-and-kindness/index.html');

test('class page contract: title, canonical, indexed, cover as og:image at true dims',()=>{
 assert.ok(cls.includes('<title>Class 38 · Feelings &amp; Kindness (Ages 4–5) | Kiddo.school</title>'));
 assert.ok(cls.includes(`<link rel="canonical" href="https://kiddo.school${CLASS_PATH}">`));
 assert.ok(cls.includes('content="index,follow"'));
 assert.ok(cls.includes(`property="og:image" content="${R2}flashcards/cover.webp"`),'cover.webp is the class og:image');
 assert.ok(cls.includes('property="og:image:width" content="800"')&&cls.includes('property="og:image:height" content="1131"'),'true cover dims');
 assert.ok(cls.includes('CLASS 38 · AGES 4–5 · 35 FEELINGS'),'class 38 eyebrow');
});

test('the 35 cards ride in file order 01–35, one tile per card, each opening its own lesson',()=>{
 const hrefs=[...main.matchAll(new RegExp('href="'+CLASS_PATH+'learn\\/([a-z-]+)\\/"','g'))].map(m=>m[1]);
 assert.equal(hrefs.length,35,'35 lesson tiles on the class page');
 assert.deepEqual(hrefs,CARDS,'file order 01–35: slugs are each card’s own keyword (owner 2026-10-24), images stay in file order');
 const imgs=[...main.matchAll(/src="https:\/\/assets\.kiddo\.school\/school\/preschool\/4-years\/feelings-and-kindness\/flashcards\/([0-9a-z-]+\.webp)"/g)].map(m=>m[1]);
 assert.equal(imgs[0],'01-happy-sad-angry-calm.webp');assert.equal(imgs[34],'35-kind-words-kind-actions-kind-heart-choose-kindness.webp');
 assert.equal(imgs.length,36,'35 card images on the tiles + the cover in the supporting-resource art');
 assert.equal(imgs[35],'cover.webp','the cover appears once, as the resource art — never as a tile');
});

test('all 35 /learn/ lessons exist, pair with their library twin, and link prev/next',()=>{
 for(const s of CARDS){
  const p=read(`dist${CLASS_PATH}learn/${s}/index.html`);
  assert.ok(p.includes(`<link rel="canonical" href="https://kiddo.school${CLASS_PATH}learn/${s}/">`));
  assert.ok(p.includes('LEARNING PATH LESSON · FEELINGS &amp; KINDNESS'),'lesson eyebrow on '+s);
  assert.ok(p.includes(`href="/flashcards/feelings-and-kindness/${s}/"`),'lesson pairs with its printable twin: '+s);
  assert.ok(p.includes('aria-label="Previous and next lesson"'),'prev/next on '+s);
  assert.ok(existsSync(`dist${CLASS_PATH}learn/${s}/index.html`));
 }
});

test('library: set page + 35 card pages with copy, downloads and the class link back',()=>{
 assert.ok(set.includes('<link rel="canonical" href="https://kiddo.school/flashcards/feelings-and-kindness/">'));
 assert.ok(set.includes('Class 38 · Feelings &amp; Kindness'),'set page names Class 38 as its stage');
 const cardFiles=CARDS.map((s,i)=>`dist/flashcards/feelings-and-kindness/${s}/index.html`);
 for(const [i,f] of cardFiles.entries()){
  assert.ok(existsSync(f),'card page exists: '+f);
  const c=read(f);
  assert.ok(c.includes(`href="${CLASS_PATH}learn/${CARDS[i]}/"`),'card page links its lesson: '+CARDS[i]);
  assert.ok(c.includes('Download card'),'download button on '+CARDS[i]);
  assert.ok(c.includes('Card '+(i+1)+' of 35'),'card counter on '+CARDS[i]);
 }
});

test('no text is shared between the /learn/ lessons and the library card pages',()=>{
 // duplicate-content rule: the lesson body and the card body share no long
 // sentence. Sample one distinctive sentence from each side per card pair.
 const samples={ 'happy':['Naming them is the first act of social-emotional learning','the four-faces game: you name a feeling, your child makes the face'],
  'calm-down':['A corner rehearsed in sunshine works in rain','so the place feels friendly, not like exile'],
  'kind-words':['kindness behaves like a muscle','spot one kind word, one kind action and one kind heart in your day']};
 for(const [slug,[lessonOnly,libOnly]] of Object.entries(samples)){
  const lesson=read(`dist${CLASS_PATH}learn/${slug}/index.html`);
  const card=read(`dist/flashcards/feelings-and-kindness/${slug}/index.html`);
  assert.ok(lesson.includes(lessonOnly)&&!card.includes(lessonOnly),'lesson-only copy stays on the lesson: '+slug);
  assert.ok(card.includes(libOnly)&&!lesson.includes(libOnly),'library-only copy stays on the card: '+slug);
 }
});

test('learning path: row 38 follows row 37, count words say thirty-eight',()=>{
 const lp=read('dist/learning-path/index.html');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38],'sequence is exactly Classes 1–38, no gap');
 assert.ok(lp.includes('thirty-eight age-guided classes'),'LP title count');
 assert.ok(lp.includes('Thirty-eight classes are ready now'),'LP intro count');
 assert.ok(lp.includes(`${CLASS_PATH}learn/happy/`),'LP row 38 links the first lesson');
});

test('age 4 hub lists Class 38 as the fifteenth class',()=>{
 const hub=read('dist/preschool/4-years/index.html');
 assert.ok(hub.includes('Fifteen big classes'),'hub heading counts fifteen');
 assert.ok(hub.includes('>Class 38</span>'),'Class 38 pill');
 assert.ok(hub.includes(`href="${CLASS_PATH}"`),'hub links Class 38');
});

test('owner cross-links: Class 32 says "Next: Feelings & Kindness (Class 38)" and Class 13 says "More feelings for ages 4–5"',()=>{
 const ls=read('dist/preschool/4-years/life-skills-and-good-habits/index.html');
 assert.ok(ls.includes('Next: <a href="'+CLASS_PATH+'">Feelings &amp; Kindness (Class 38)</a>'),'Class 32 next-link');
 const emo=read('dist/toddler/2-years/emotions-and-feelings/index.html');
 assert.ok(emo.includes('>More feelings for ages 4–5</a>'),'Class 13 more-feelings pill');
 assert.ok(emo.includes(`href="${CLASS_PATH}"`),'Class 13 links Class 38');
});

test('Class 38 wired across the school: flashcards wall, filter tags, Ages 4–5 shelf, homepage',()=>{
 const wall=read('dist/flashcards/index.html');
 assert.ok(wall.includes('href="/flashcards/feelings-and-kindness/"'),'library wall lists the set');
 const reds=read('dist/_redirects');
 for(const [o,n] of [['happy-sad-angry-calm','happy'],['wait-ask-listen-carefully-say-sorry','sorry'],['kind-words-kind-actions-kind-heart-choose-kindness','kind-words']]){
  assert.ok(reds.includes('/flashcards/feelings-and-kindness/'+o+'* /flashcards/feelings-and-kindness/'+n+':splat 301'),'card 301: '+o);
  assert.ok(reds.includes('/preschool/4-years/feelings-and-kindness/learn/'+o+'* /preschool/4-years/feelings-and-kindness/learn/'+n+':splat 301'),'lesson 301: '+o);
 }
 assert.ok(wall.includes('Showing all 61 sets'),'wall count is 61 — the Question Words parents’ shelf joined the library (owner 2026-10-28); Manners joined 2026-10-27, the Cafeteria set earlier (owner 2026-10-26)');
 const tag=read('dist/flashcards/index.html').match(new RegExp('href="/flashcards/feelings-and-kindness/"[\\s\\S]{0,400}?data-filters="([^"]+)"'));
 assert.ok(tag&&tag[1].includes('age-4-5')&&tag[1].includes('subj-feelings'),'filter tags ride on the set card');
 const lp=read('dist/learning-path/index.html');
 assert.ok(lp.includes('feelings-and-kindness'),'Ages 4–5 shelf lists the set');
 const home=read('dist/index.html');
 assert.ok(home.includes('Thirty-eight classes are ready now'),'homepage counts 38');
});
