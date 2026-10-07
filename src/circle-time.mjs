// Kiddo School Circle Time: a flowing, one-moment-at-a-time session — not a
// flashcard lesson. Circle Time 1 (Hello School!) lives here with its own
// body builders; the flashcard lesson engine in lessons.mjs stays untouched.
import {lessonStageCard} from './lessons.mjs';
export const circleBase='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/circle-time/age-2/hello-school/';
const classroomBase='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/my-classroom/my-classroom-age-2.webp';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
export const helloSchool={
 path:'/toddler/2-years/circle-time/hello-school/',
 seoTitle:'Circle Time for 2-Year-Olds: Hello School!',
 title:'Circle Time for 2-Year-Olds: Hello School!',
 h1:'Hello School! Circle Time',
 description:'Join a short Circle Time for 2-year-olds with movement, simple directions, a tiny story and an off-screen activity to do together.',
 ogImage:circleBase+'cover.webp',
 ogAlt:'Kiddo School teacher welcoming children to Circle Time',
 schemaImage:circleBase+'cover.webp',
 eyebrow:'CIRCLE TIME 1 · AGE 2',
 crumbs:[['Toddler','/toddler/'],['Age 2','/toddler/2-years/'],['Circle Time','/toddler/2-years/circle-time/'],['Hello School!','/toddler/2-years/circle-time/hello-school/']],
 chips:[['Age','2 Years'],['Class','Circle Time 1'],['Duration','5–8 minutes']],
 ledes:[
  'A whole circle time in one little class — the hello, the moving, the listening, a tiny story and the goodbye, just like a morning at preschool. Everything happens on one screen, one moment at a time, and the last activity sends you both off the rug and into the real world.',
  'Read the prompts aloud and do them together. Your toddler does not need to read — every word on the screen is for you.'
 ],
 startLabel:'Start Circle Time',
 startHint:'Find a comfy spot on the floor and sit together.',
 hubBlurb:'A short preschool-style circle time: hello rhythm, copy-me movement, listening games, faces, a tiny story and goodbye — then off the rug together.',
 schema:{resourceType:'Interactive circle time',level:'Toddler (age 2)',teaches:'Listening, movement and imitation through a hello rhythm, simple directions and a tiny story',audience:'Parents of toddlers',keywords:'circle time for 2 year olds, circle time activities for toddlers, toddler circle time, preschool circle time, circle time activities at home, movement activities for 2 year olds, listening activities for toddlers, following directions activities for toddlers, parent and toddler activities, at home preschool activities'},
 cover:{file:'cover.webp',w:1920,h:1080,alt:'Kiddo School teacher welcoming children to Circle Time'},
 teacherLine:'Hi! Come sit with me. Ready?',
 rhythm:'Clap, clap, wave!',
 copyLead:'Can you copy me?',
 copyPrompts:['Touch your head.','Clap your hands.','Stomp your feet.','Reach up high.','Sit down.'],
 listenLead:'Listen carefully. Can you do it?',
 listenPrompts:['Wave!','Point up!','Clap!','Touch your toes!','Give someone a high five!'],
 facesLead:'Let’s make some faces.',
 facesPrompts:['Make a happy face!','Make a silly face!','Show me sleepy.','Give me a big smile!'],
 storyParts:['A little child packed a school bag.','They came to school.','The teacher waved. “Hello!”','The child waved back. It was time to learn and play.'],
 rugAsk:['Can you find your favorite book?','Go get it and bring it back!'],
 rugBack:'Great! You brought a book.',
 goodbyeLine:'That was fun. See you next time!'
};
const scene=(file,alt)=>`<img src="${circleBase}${file}" width="1920" height="1080" alt="${alt}" loading="lazy">`;
const say=(line,who)=>`<div class="ct-sayblock"><p class="ct-say">“${line}”</p>${who?'<p class="ct-who">'+who+'</p>':''}</div>`;
const stepOpen=(id,label,eyebrow,title)=>`<section class="ct-step" id="step-${id}" data-ct-step="${id}" data-ct-label="${esc(label)}" aria-label="${esc(label)}" tabindex="-1">${eyebrow?`<span class="eyebrow">${eyebrow}</span>`:''}${title?`<h2>${title}</h2>`:''}`;
const prompts=arr=>`<div class="ct-seq" data-ct-seq>${arr.map(p=>`<div class="ct-prompt" data-ct-prompt><p class="ct-big">${p}</p><div class="ct-actions"><button type="button" class="button" data-ct-advance hidden>Done!</button></div></div>`).join('')}</div>`;
export function circleTimeBody(C){
 const steps=[
  // 1 · Teacher Hello
  stepOpen('hello','Teacher hello')+
   `<figure class="ct-scene">${scene('cover.webp',C.cover.alt)}</figure>`+
   say(C.teacherLine,'— Your Kiddo School teacher')+
   `<div class="ct-actions"><button type="button" class="button" data-ct-next hidden>I’m Ready</button></div>
  </section>`,
  // 2 · Hello Rhythm
  stepOpen('rhythm','Hello &amp; Move','HELLO RHYTHM','Hello &amp; Move')+
   `<figure class="ct-scene">${scene('01-hello-and-move.webp','Teacher and young children moving together during Circle Time')}</figure>
   <div class="ct-rhythm" data-ct-rhythm aria-hidden="true"><span>👏</span><span>👏</span><span>👋</span></div>
   <p class="ct-big">${C.rhythm}</p>
   <div class="ct-actions"><button type="button" class="button button-ghost" data-ct-replay hidden>Again</button><button type="button" class="button" data-ct-next hidden>Next</button></div>
  </section>`,
  // 3 · Copy Me
  stepOpen('copy','Copy me','COPY ME')+
   `<p class="ct-lead">${C.copyLead}</p>
   <figure class="ct-scene ct-scene-small">${scene('01-hello-and-move.webp','Teacher and young children moving together during Circle Time')}</figure>`+
   prompts(C.copyPrompts)+`
  </section>`,
  // 4 · Listen & Do
  stepOpen('listen','Listen &amp; Do',null,'Listen &amp; Do')+
   say(C.listenLead)+
   `<figure class="ct-scene">${scene('02-listen-and-do.webp','Teacher and children doing a simple listening and movement activity')}</figure>`+
   prompts(C.listenPrompts)+`
  </section>`,
  // 5 · Faces Together
  stepOpen('faces','Faces together','FACES TOGETHER')+
   `<p class="ct-lead">${C.facesLead}</p>`+
   prompts(C.facesPrompts)+`
  </section>`,
  // 6 · Tiny Story
  stepOpen('story','Story time','TINY STORY','Story Time')+
   `<figure class="ct-scene">${scene('03-story-time.webp','Young child arriving at school with a backpack and greeting the teacher')}</figure>
   <div class="ct-seq" data-ct-seq data-ct-story>${C.storyParts.map(p=>`<div class="ct-prompt" data-ct-prompt><p class="ct-big ct-big-say">${p}</p></div>`).join('')}</div>
   <div class="ct-storynav"><button type="button" class="lv-btn" data-ct-back hidden>Previous</button><span class="lv-count" data-ct-count>Part 1 of ${C.storyParts.length}</span><button type="button" class="button" data-ct-advance hidden>Next</button></div>
  </section>`,
  // 7 · Off the Rug
  stepOpen('rug','Off the rug',null,'Off the Rug')+
   `<div class="ct-rugask" data-ct-rugask>${C.rugAsk.map(l=>say(l)).join('')}
   <p class="ct-hint">Take your time.</p>
   <div class="ct-actions"><button type="button" class="button" data-ct-found hidden>I Found One!</button><button type="button" class="button button-ghost" data-ct-skip hidden>Skip</button></div></div>
   <div class="ct-rugback" data-ct-rugback hidden>${say(C.rugBack)}<div class="ct-actions"><button type="button" class="button" data-ct-next hidden>Next</button></div></div>
  </section>`,
  // 8 · Goodbye
  stepOpen('goodbye','Goodbye','GOODBYE')+
   `<figure class="ct-scene">${scene('04-goodbye.webp','Teacher and children waving goodbye at the end of Circle Time')}</figure>`+
   say(C.goodbyeLine)+`
   <div class="ct-complete"><p class="ct-stamp">Circle Time Complete</p>
   <div class="hero-actions"><a class="button" href="/my-classroom/">Back to My Classroom</a><a class="button button-ghost" href="/learning-path/">Learning Path</a></div></div>
  </section>`
 ];
 const dots=steps.map((_,i)=>`<span data-ct-dot${i===0?' class="is-on"':''}></span>`).join('');
 const crumbNav=`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${C.crumbs.map(([label,href],i)=>`<span aria-hidden="true">/</span>${i===C.crumbs.length-1?`<span aria-current="page">${esc(label)}</span>`:`<a href="${href}">${esc(label)}</a>`}`).join('')}</nav>`;
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">${C.eyebrow}</span>
  <h1>${esc(C.h1)}</h1>
  <div class="fc-chips lesson-chips">${C.chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
  ${C.ledes.map(p=>`<p class="lesson-lede">${p}</p>`).join('\n  ')}
  <div class="lesson-start"><a class="button" href="#todays-class">${C.startLabel} <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">${C.startHint}</span></div></div>
  <figure class="lesson-cover ct-cover"><img src="${C.ogImage}" width="${C.cover.w}" height="${C.cover.h}" alt="${C.cover.alt}" fetchpriority="high"></figure></article>`;
 const pills=`<section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>Where next?</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/my-classroom/">My Classroom</a><a class="lesson-pill-link" href="/toddler/2-years/">Age 2</a><a class="lesson-pill-link" href="/learning-path/">Learning Path</a></div></section>`;
 return `${crumbNav}
 ${hero}
 <div class="ct-wrap">
  <div class="ct-runner" id="todays-class" data-ct>
   <p class="ct-live" data-ct-live aria-live="polite"></p>
   <div class="ct-dots" data-ct-dots aria-hidden="true" hidden>${dots}</div>
   ${steps.join('\n')}
  </div>
 </div>
 <section class="wrap lesson-section"><p class="lesson-note"><strong>Age 2 is a guide, not a test.</strong> Join in at whatever level feels right today — and stopping early is allowed too.</p></section>
 ${pills}`;
}
export function circleTimeHubBody(C){
 return `<section class="wrap section compact"><p class="lesson-lede">Circle time is how a preschool morning starts: a hello, some moving, a story, a goodbye. It works just as well on a living-room rug — one grown-up, one toddler, about five minutes, with the class on one screen and one moment at a time.</p>
 <div class="fc-stages">${lessonStageCard(C,'Circle Time 1','Age 2')}</div>
 <p class="fc-hint">The Circle Time rug also lives in <a href="/my-classroom/">My Classroom</a>. More classes are on the path in <a href="/toddler/2-years/">Age 2</a> and <a href="/learning-path/">the Learning Path</a>.</p></section>`;
}
export function myClassroomBody(){
 const hot=(cls,label,href)=>`<a class="mc-hot ${cls}" href="${href}">${label}</a>`;
 return `<section class="wrap section compact">
 <div class="mc-stage">
  <img src="${classroomBase}" width="1366" height="768" alt="Illustrated classroom with a teacher by the blackboard, a library shelf, a toy shelf, a big circle rug, a desk and a green door" fetchpriority="high">
  <nav class="mc-hotspots" aria-label="Places in the classroom">
   ${hot('mc-hot-board','Today’s class','/learning-path/')}
   ${hot('mc-hot-library','Library','/flashcards/')}
   ${hot('mc-hot-artwall','Art Wall','/art-wall/')}
   ${hot('mc-hot-principal','Principal','/principals-office/')}
   ${hot('mc-hot-calendar','Calendar','/school-calendar/')}
   ${hot('mc-hot-door','Let’s explore','/activities/')}
   ${hot('mc-hot-rug','Circle Time','#circle-time')}
  </nav>
 </div>
 <div class="mc-panel" id="circle-time">
  <span class="eyebrow">ON THE RUG · CIRCLE TIME</span>
  <h2>Hello School!</h2>
  <p>A short circle time for two-year-olds — hello, move, listen, a tiny story, then off the rug. About five minutes.</p>
  <div class="hero-actions"><a class="button" href="/toddler/2-years/circle-time/hello-school/">Start Circle Time <span aria-hidden="true">↗</span></a></div>
 </div>
 <div class="mc-panel">
  <span class="eyebrow">ON THE WALL · ART WALL</span>
  <h2>Our Art Wall</h2>
  <p>The classroom wall where the drawings go. Eleven starter pieces are pinned up — come and look, then make something for the wall at home.</p>
  <div class="hero-actions"><a class="button button-ghost" href="/art-wall/">Visit the Art Wall <span aria-hidden="true">↗</span></a></div>
 </div>
 <div class="mc-panel">
  <span class="eyebrow">ON THE WALL · CALENDAR</span>
  <h2>School Calendar</h2>
  <p>A gentle rhythm for the week — one small, real idea for each day, from Monday’s class to Sunday’s slow together day. Miss a day? Pick up whenever you’re ready.</p>
  <div class="hero-actions"><a class="button button-ghost" href="/school-calendar/">Open the calendar <span aria-hidden="true">↗</span></a></div>
 </div>
 </section>`;
}
