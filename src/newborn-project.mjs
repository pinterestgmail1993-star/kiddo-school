import {lessons,lessonStageCard} from './lessons.mjs';
export const newbornBase='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/black-and-white-baby-cards/';
export const [hcLesson,fvLesson,cfoLesson,fwftLesson]=lessons;
export function babyBody(){
 return `<section class="wrap section compact"><p class="lesson-lede">Kiddo.school began as hands-on activities for curious kids. It is growing into a whole school for parents: tiny, calm classes you can do at home in two to five minutes, sequenced from birth onward. Every class shows the exact age, the class name and the subjects it supports, so you always know what your little one is working on — and what comes next.</p>
 <div class="fc-stages">
  <a class="fc-stage lesson-card-link" href="/newborn/"><div class="fc-stage-pills"><span class="fc-age">Birth–6 weeks</span><span class="fc-class">Newborn 1</span></div><h3>Newborn learning</h3><p>High-contrast cards, simple faces and gentle parent-voice moments for the very first weeks. Start with Lesson 1: High-Contrast Cards.</p><span class="fc-open">Open Newborn Learning <span aria-hidden="true">↗</span></span></a>
  <a class="fc-stage lesson-card-link" href="/newborn/6-12-weeks/"><div class="fc-stage-pills"><span class="fc-age">6–12 weeks</span><span class="fc-class">Newborn 2</span></div><h3>Faces &amp; tracking</h3><p>Simple faces, high-contrast patterns and a first taste of strong colour, with slow side-to-side tracking games.</p><span class="fc-open">Open Newborn 2 <span aria-hidden="true">↗</span></span></a>
  <a class="fc-stage lesson-card-link" href="/baby/3-4-months/"><div class="fc-stage-pills"><span class="fc-age">3–4 months</span><span class="fc-class">Infant 1</span></div><h3>Colours &amp; first objects</h3><p>Bold red, yellow and blue alongside a ball, a cup, a spoon, an apple and a teddy.</p><span class="fc-open">Open Infant 1 <span aria-hidden="true">↗</span></span></a>
  <a class="fc-stage lesson-card-link" href="/baby/4-6-months/"><div class="fc-stage-pills"><span class="fc-age">4–6 months</span><span class="fc-class">Infant 2</span></div><h3>First words &amp; familiar things</h3><p>Everyday objects, foods, animals and a friendly face, named with simple natural words as first words grow.</p><span class="fc-open">Open Infant 2 <span aria-hidden="true">↗</span></span></a>
 </div></section>`;
}
export function newbornBody(){
 return `<section class="wrap section compact"><p class="lesson-lede">In the first weeks, your baby’s favourite sights are strong shapes and your face, and their favourite sound is you. Newborn classes on Kiddo.school are short, high-contrast and parent-led: one card, one voice, one quiet moment at a time — sized to fit around feeds and naps.</p>
 <h2 class="lesson-classheading">Newborn 1 · Birth–6 weeks</h2>
 <div class="fc-stages">${lessonStageCard(hcLesson,'Lesson 1','See')}</div>
 <h2 class="lesson-classheading">Newborn 2 · 6–12 weeks</h2>
 <div class="fc-stages">${lessonStageCard(fvLesson,'Lesson 2','See')}</div>
 <p class="lesson-note"><strong>Every baby develops differently.</strong> Ages on Kiddo School are guides, not tests or deadlines — follow your baby’s cues. When your baby is ready for more, the path continues at <a href="/baby/3-4-months/">3–4 months · Infant 1</a>.</p></section>`;
}
export function weeksBody(){
 return `<section class="wrap section compact"><div class="fc-chips lesson-chips"><span><strong>Age</strong> Birth–6 Weeks</span><span><strong>Class</strong> Newborn 1</span><span><strong>Subjects</strong> Vision, bonding, sound</span></div>
 <div class="fc-stages">
  ${lessonStageCard(hcLesson,'Lesson 1','See')}
  <a class="fc-stage lesson-card-link" href="${fvLesson.path}"><div class="fc-stage-pills"><span class="fc-age">Next class</span><span class="fc-class">6–12 Weeks</span></div><h3>Faces &amp; Visual Tracking</h3><p>Simple faces, patterns and a first taste of colour, with slow tracking games for when your baby is ready for more.</p><span class="fc-open">Preview the next class <span aria-hidden="true">↗</span></span></a>
 </div>
 <p class="lesson-note"><strong>What Newborn 1 is for:</strong> black and white bold shapes, stripes, circles and simple faces — vision, bonding and sound in two-to-five-minute moments. Ages are guides, not tests or deadlines.</p></section>`;
}
export function seeBody(){
 return `<section class="wrap section compact"><p class="lesson-lede">See is the subject behind your baby’s visual world: noticing bold shapes, focusing on what interests them, following things with their eyes and meeting your face. Classes in this subject start with plain high-contrast cards and grow with your baby — faces and tracking, then strong single colours and familiar objects. Every See class is short, calm and designed to be led by you.</p>
 <div class="fc-stages">${lessonStageCard(hcLesson,'Lesson 1 · Birth–6 weeks','See')}${lessonStageCard(fvLesson,'Lesson 2 · 6–12 weeks','See')}${lessonStageCard(cfoLesson,'Lesson 3 · 3–4 months','See')}</div>
 <p class="fc-hint">Browse the whole path in <a href="/newborn/">Newborn Learning</a> and <a href="/baby/">Baby classes</a>.</p></section>`;
}
export function talkBody(){
 return `<section class="wrap section compact"><p class="lesson-lede">Talk is the subject behind your baby’s first words. Long before babies speak, they listen: to your voice, to the rhythm of everyday speech and to the little names you give the world — ball, cup, dog, hello. Classes in this subject pair simple familiar pictures with natural parent talk, so language grows at your baby’s own pace. Every Talk class is short, calm and designed to be led by you.</p>
 <div class="fc-stages">${lessonStageCard(fwftLesson,'Lesson 4 · 4–6 months','Talk')}</div>
 <p class="fc-hint">More Talk classes are on the drawing table. Browse the whole path in <a href="/newborn/">Newborn Learning</a> and <a href="/baby/">Baby classes</a>.</p></section>`;
}
