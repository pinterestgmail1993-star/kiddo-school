export const newbornBase='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/black-and-white-baby-cards/';
export const hcLesson={
 path:'/newborn/0-6-weeks/high-contrast-cards/',
 seoTitle:'High Contrast Cards for Newborns (0–6 Weeks)',
 title:'High-Contrast Cards for Newborns (Birth–6 Weeks)',
 h1:'High-Contrast Cards for Newborns',
 description:'Explore black-and-white high-contrast cards for newborns from birth to 6 weeks, with simple activities for early looking, focusing and visual tracking.',
 ogAlt:'Black and white high-contrast smiling face card for newborns from the Kiddo.school Newborn 1 class',
 lede1:'Newborns see the world in bold shapes long before they see details. These twelve black and white baby flashcards use strong, high-contrast patterns — circles, stripes, checkerboards and friendly faces — because bold contrast is exactly what catches a brand-new baby’s attention. It is the classic newborn visual stimulation activity, turned into a calm two-to-five-minute class: no printing, no setup, just you, your baby and one card at a time.',
 lede2:'Show a card, watch, talk softly, and stop when your baby is done. That is the whole class. Nothing to teach and nothing to test — just an easy first step into Kiddo.school, from birth onward.',
 cards:[
  {file:'newborn-high-contrast-circle-card.webp',word:'Circle',n:'01',w:1080,h:1350,alt:'Black and white high-contrast circle card for newborns'},
  {file:'newborn-high-contrast-square-card.webp',word:'Square',n:'02',w:1080,h:1350,alt:'Black and white high-contrast square card for newborns'},
  {file:'newborn-high-contrast-vertical-stripes.webp',word:'Vertical stripes',n:'03',w:1080,h:1350,alt:'Black and white high-contrast vertical stripes card for newborns'},
  {file:'newborn-high-contrast-horizontal-stripes.webp',word:'Horizontal stripes',n:'04',w:1080,h:1350,alt:'Black and white high-contrast horizontal stripes card for newborns'},
  {file:'newborn-high-contrast-checkerboard.webp',word:'Checkerboard',n:'05',w:1080,h:1350,alt:'Black and white checkerboard pattern card for newborns'},
  {file:'newborn-high-contrast-concentric-circles.webp',word:'Concentric circles',n:'06',w:1080,h:1350,alt:'Black and white concentric circles card for newborns'},
  {file:'newborn-high-contrast-spiral.webp',word:'Spiral',n:'07',w:1080,h:1350,alt:'Black and white high-contrast spiral card for newborns'},
  {file:'newborn-high-contrast-triangle.webp',word:'Triangle',n:'08',w:1080,h:1350,alt:'Black and white high-contrast triangle card for newborns'},
  {file:'newborn-high-contrast-target.webp',word:'Target',n:'09',w:1080,h:1350,alt:'Black and white bullseye target card for newborns'},
  {file:'newborn-high-contrast-eyes.webp',word:'Eyes',n:'10',w:1080,h:1350,alt:'Black and white high-contrast eyes card for newborns'},
  {file:'newborn-high-contrast-face.webp',word:'Face',n:'11',w:1080,h:1350,alt:'Black and white high-contrast smiling face card for newborns'},
  {file:'newborn-high-contrast-symmetrical-face.webp',word:'Symmetrical face',n:'12',w:1080,h:1350,alt:'Black and white symmetrical baby face card for newborns'}
 ],
 steps:[
  ['Hold the card close','Hold the card about 8–12 inches (20–30 cm) from your baby’s face — roughly the distance from your elbow to your fingers. Close, bold and steady is easiest for brand-new eyes.'],
  ['Let your baby look','Let your baby study the image. Some babies stare hard, some go very still, some wiggle with excitement. All of that counts as looking.'],
  ['Move it slowly','When your baby is alert and interested, slowly move a card from side to side, a few centimetres each way, and watch their eyes follow.'],
  ['Stop in time','Stop when your baby looks away, yawns or loses interest. Looking away is how a newborn says “enough for now” — and that is a complete class.'],
  ['Keep it short and calm','Keep the experience short, calm and parent-led. Two to five minutes is plenty at this age, and you can always come back tomorrow.']
 ],
 note:'Every baby develops differently. Ages on Kiddo School are guides, not tests or deadlines. If you ever have a question about your baby’s vision or development, your doctor or health visitor is the right person to ask.',
 why:'In the first weeks, most of what a newborn sees is soft and blurry, and strong black and white shapes are the easiest images for young eyes to notice. That is why high contrast cards and black and white baby flashcards have been a favourite newborn visual stimulation activity for generations. Following a slow-moving card gives your baby practice at focusing and tracking, and your voice turns the looking into language: circle, stripes, hello face. Nothing here is a lesson or a test — it is a calm minute of shared looking, at exactly your baby’s pace.'
};
export function lessonSchema(site){
 return [
  {'@context':'https://schema.org','@type':'LearningResource',name:hcLesson.title,description:hcLesson.description,url:site+hcLesson.path,image:newbornBase+'newborn-high-contrast-face.webp',inLanguage:'en',learningResourceType:'Interactive baby class',educationalLevel:'Newborn (birth–6 weeks)',isAccessibleForFree:true,educationalUse:'Home learning activity',teaches:'Visual attention, focusing and visual tracking',audience:{'@type':'Audience',audienceType:'Parents of newborns'},keywords:'high contrast cards, black and white baby flashcards, newborn visual stimulation, newborn flashcards'},
  {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[['Home','/'],['Baby','/baby/'],['Newborn','/newborn/'],['0–6 Weeks','/newborn/0-6-weeks/'],['High-Contrast Cards',hcLesson.path]].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:site+path}))}
 ];
}
const cardImg=(c,eager)=>`<img src="${newbornBase}${c.file}" width="${c.w}" height="${c.h}" alt="${c.alt}"${eager?' fetchpriority="high"':' loading="lazy"'}>`;
export function lessonBody(){
 return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/baby/">Baby</a><span aria-hidden="true">/</span><a href="/newborn/">Newborn</a><span aria-hidden="true">/</span><a href="/newborn/0-6-weeks/">0–6 Weeks</a><span aria-hidden="true">/</span><span aria-current="page">High-Contrast Cards</span></nav>
 <article class="wrap lesson-hero">
  <span class="eyebrow">NEWBORN 1 · LESSON 1</span>
  <h1>${hcLesson.h1}</h1>
  <div class="fc-chips lesson-chips"><span><strong>Age</strong> Birth–6 Weeks</span><span><strong>Subject</strong> See</span><span><strong>Class</strong> Newborn 1</span><span><strong>Time</strong> 2–5 minutes</span></div>
  <p class="lesson-lede">${hcLesson.lede1}</p>
  <p class="lesson-lede">${hcLesson.lede2}</p>
  <div class="lesson-start"><a class="button" href="#todays-class" data-lv-start>Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Twelve cards, one at a time. Works beautifully on a phone at arm’s length.</span></div>
 </article>
 <section class="wrap lesson-section" id="todays-class" aria-label="Today’s class: twelve high-contrast cards">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>Twelve cards, one at a time.</h2>
  <div class="lv-frame" data-lesson-viewer>
   <div class="lv-stage" data-lv-stage></div>
   <div class="lv-controls" data-lv-controls><button type="button" class="lv-btn" data-lv-prev>Previous</button><span class="lv-count" data-lv-count aria-live="polite" aria-atomic="true">Card 1 of 12</span><button type="button" class="lv-btn" data-lv-next>Next</button></div>
   <div class="lv-actions" data-lv-actions><button type="button" class="lv-btn lv-ghost" data-lv-full>Full screen</button><button type="button" class="lv-btn lv-ghost" data-lv-finish>Finish</button></div>
   <div class="lv-begin"><button type="button" class="button" data-lv-start>Start Today’s Class</button><span class="lv-beginhint">Or simply scroll: all twelve cards are below.</span></div>
   <p class="lv-done" data-lv-done hidden><strong>Class complete — well done.</strong> However many cards your baby saw, however long it took, that was a full class. Rest is part of it too.</p>
  </div>
  <div class="lv-grid" data-lv-grid>${hcLesson.cards.map((c,i)=>`<figure class="lv-card">${cardImg(c,i===0)}</figure>`).join('')}</div>
 </section>
 <section class="wrap lesson-section" id="how-to">
  <span class="eyebrow">PARENT INSTRUCTIONS</span>
  <h2>How to use these cards</h2>
  <ol class="fc-steps">${hcLesson.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${String(i+1).padStart(2,'0')}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
  <p class="lesson-note"><strong>Every baby develops differently.</strong> Ages on Kiddo School are guides, not tests or deadlines. If you ever have a question about your baby’s vision or development, your doctor or health visitor is the right person to ask.</p>
 </section>
 <section class="wrap lesson-section fc-why">
  <span class="eyebrow">THE LITTLE BIT OF LEARNING</span>
  <h2>Why black and white?</h2>
  <p>${hcLesson.why}</p>
 </section>
 <section class="wrap lesson-section">
  <span class="eyebrow">KEEP EXPLORING</span>
  <h2>Where to next?</h2>
  <div class="lesson-linkrow"><a class="lesson-pill-link" href="/newborn/">Newborn Learning</a><a class="lesson-pill-link" href="/newborn/0-6-weeks/">0–6 Weeks</a><a class="lesson-pill-link" href="/subjects/see/">See</a></div>
  <p class="lesson-next"><strong>Next Class →</strong> Faces &amp; Eye Contact — coming soon.</p>
 </section>`;
}
const lessonStageCard=()=>`<a class="fc-stage lesson-card-link" href="${hcLesson.path}"><div class="fc-stage-pills"><span class="fc-age">Lesson 1</span><span class="fc-class">See</span></div><h3>High-Contrast Cards</h3><p>Twelve black and white cards, shown one at a time. Two to five minutes, no printing, no setup — just look together.</p><span class="fc-open">Start today’s class <span aria-hidden="true">↗</span></span></a>`;
const soonStageCard=(title,subjects,desc)=>`<div class="fc-stage lesson-soon"><div class="fc-stage-pills"><span class="fc-age">Coming soon</span><span class="fc-class">${subjects}</span></div><h3>${title}</h3><p>${desc}</p></div>`;
export function babyBody(){
 return `<section class="wrap section compact"><p class="lesson-lede">Kiddo.school began as hands-on activities for curious kids. It is growing into a whole school for parents: tiny, calm classes you can do at home in two to five minutes, sequenced from birth onward. Every class shows the exact age, the class name and the subjects it supports, so you always know what your little one is working on — and what comes next.</p>
 <div class="fc-stages">
  <a class="fc-stage lesson-card-link" href="/newborn/"><div class="fc-stage-pills"><span class="fc-age">Birth–6 weeks</span><span class="fc-class">Newborn 1</span></div><h3>Newborn learning</h3><p>High-contrast cards, simple faces and gentle parent-voice moments for the very first weeks. Start with Lesson 1: High-Contrast Cards.</p><span class="fc-open">Open Newborn Learning <span aria-hidden="true">↗</span></span></a>
  ${soonStageCard('The next stages','Newborn 2 · Infant 1','Visual tracking and faces at 6–12 weeks, then movement and communication at 3–4 months — followed by a full path through toddler, preschool and kindergarten years.')}
 </div></section>`;
}
export function newbornBody(){
 return `<section class="wrap section compact"><p class="lesson-lede">In the first weeks, your baby’s favourite sights are strong shapes and your face, and their favourite sound is you. Newborn classes on Kiddo.school are short, high-contrast and parent-led: one card, one voice, one quiet moment at a time — sized to fit around feeds and naps. Newborn 1 covers birth to 6 weeks; Newborn 2 at 6–12 weeks will add visual tracking and parent-voice games.</p>
 <h2 class="lesson-classheading">Newborn 1 · Birth–6 weeks</h2>
 <div class="fc-stages">${lessonStageCard()}${soonStageCard('Faces &amp; Eye Contact','See · Bond','Lesson 2 is on the way: gentle face-to-face games that turn gazing into your baby’s first conversation.')}</div>
 <p class="lesson-note"><strong>Every baby develops differently.</strong> Ages on Kiddo School are guides, not tests or deadlines — follow your baby’s cues.</p></section>`;
}
export function weeksBody(){
 return `<section class="wrap section compact"><div class="fc-chips lesson-chips"><span><strong>Age</strong> Birth–6 Weeks</span><span><strong>Class</strong> Newborn 1</span><span><strong>Subjects</strong> Vision, bonding, sound</span></div>
 <div class="fc-stages">${lessonStageCard()}${soonStageCard('Faces &amp; Eye Contact','See · Bond','Lesson 2 is coming soon. In the meantime, today’s class is the perfect daily rhythm: one card, one calm minute.')}</div>
 <p class="lesson-note"><strong>What Newborn 1 is for:</strong> black and white bold shapes, stripes, circles and simple faces — vision, bonding and sound in two-to-five-minute moments. Ages are guides, not tests or deadlines.</p></section>`;
}
export function seeBody(){
 return `<section class="wrap section compact"><p class="lesson-lede">See is the subject behind your baby’s visual world: noticing bold shapes, focusing on what interests them, following things with their eyes and meeting your face. Classes in this subject start with plain high-contrast cards and grow with your baby — tracking games, faces, and eventually colours and pictures. Every See class is short, calm and designed to be led by you.</p>
 <div class="fc-stages">${lessonStageCard()}${soonStageCard('More See classes','Tracking · Faces · Colour','As your baby grows, See continues with visual tracking at 6–12 weeks, faces and familiar objects at 3–4 months, and colour play beyond that.')}</div>
 <p class="fc-hint">Browse the whole path in <a href="/newborn/">Newborn Learning</a>.</p></section>`;
}
