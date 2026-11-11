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


