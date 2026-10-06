// Kiddo School curriculum engine: one reusable, data-driven lesson system.
// Every lesson (and future ones) is pure data: slug/path, age, class, subject,
// cover, R2 folder, cards, parent instructions, previous/next lesson, SEO.
export const lessonsBase='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/black-and-white-baby-cards/';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const img=(folder,file,w,h,alt,eager)=>`<img src="${lessonsBase}${folder}${file}" width="${w}" height="${h}" alt="${alt}"${eager?' fetchpriority="high"':' loading="lazy"'}>`;
export const hcLesson={
 path:'/newborn/0-6-weeks/high-contrast-cards/',
 seoTitle:'High Contrast Cards for Newborns (0–6 Weeks)',
 title:'High-Contrast Cards for Newborns (Birth–6 Weeks)',
 h1:'High-Contrast Cards for Newborns',
 description:'Explore black-and-white high-contrast cards for newborns from birth to 6 weeks, with simple activities for early looking, focusing and visual tracking.',
 ogAlt:'Black and white high-contrast smiling face card for newborns from the Kiddo.school Newborn 1 class',
 ogImage:'https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/black-and-white-baby-cards/newborn-high-contrast-face.webp',
 schemaImage:'https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/black-and-white-baby-cards/newborn-high-contrast-face.webp',
 eyebrow:'NEWBORN 1 · LESSON 1',
 crumbs:[['Baby','/baby/'],['Newborn','/newborn/'],['0–6 Weeks','/newborn/0-6-weeks/'],['High-Contrast Cards','/newborn/0-6-weeks/high-contrast-cards/']],
 chips:[['Age','Birth–6 Weeks'],['Subject','See'],['Class','Newborn 1'],['Time','2–5 minutes']],
 ledes:['Newborns see the world in bold shapes long before they see details. These twelve black and white baby flashcards use strong, high-contrast patterns — circles, stripes, checkerboards and friendly faces — because bold contrast is exactly what catches a brand-new baby’s attention. It is the classic newborn visual stimulation activity, turned into a calm two-to-five-minute class: no printing, no setup, just you, your baby and one card at a time.',
  'Show a card, watch, talk softly, and stop when your baby is done. That is the whole class. Nothing to teach and nothing to test — just an easy first step into Kiddo.school, from birth onward.'],
 startHint:'Twelve cards, one at a time. Works beautifully on a phone at arm’s length.',
 viewerLabel:'Today’s class: twelve high-contrast cards',
 viewerHeading:'Twelve cards, one at a time.',
 folder:'',
 eagerFirst:true,
 cards:[
  {order:1,file:'newborn-high-contrast-circle-card.webp',w:1080,h:1350,alt:'Black and white high-contrast circle card for newborns'},
  {order:2,file:'newborn-high-contrast-square-card.webp',w:1080,h:1350,alt:'Black and white high-contrast square card for newborns'},
  {order:3,file:'newborn-high-contrast-vertical-stripes.webp',w:1080,h:1350,alt:'Black and white high-contrast vertical stripes card for newborns'},
  {order:4,file:'newborn-high-contrast-horizontal-stripes.webp',w:1080,h:1350,alt:'Black and white high-contrast horizontal stripes card for newborns'},
  {order:5,file:'newborn-high-contrast-checkerboard.webp',w:1080,h:1350,alt:'Black and white checkerboard pattern card for newborns'},
  {order:6,file:'newborn-high-contrast-concentric-circles.webp',w:1080,h:1350,alt:'Black and white concentric circles card for newborns'},
  {order:7,file:'newborn-high-contrast-spiral.webp',w:1080,h:1350,alt:'Black and white high-contrast spiral card for newborns'},
  {order:8,file:'newborn-high-contrast-triangle.webp',w:1080,h:1350,alt:'Black and white high-contrast triangle card for newborns'},
  {order:9,file:'newborn-high-contrast-target.webp',w:1080,h:1350,alt:'Black and white bullseye target card for newborns'},
  {order:10,file:'newborn-high-contrast-eyes.webp',w:1080,h:1350,alt:'Black and white high-contrast eyes card for newborns'},
  {order:11,file:'newborn-high-contrast-face.webp',w:1080,h:1350,alt:'Black and white high-contrast smiling face card for newborns'},
  {order:12,file:'newborn-high-contrast-symmetrical-face.webp',w:1080,h:1350,alt:'Black and white symmetrical baby face card for newborns'}
 ],
 howTo:{heading:'How to use these cards',steps:[
  ['Hold the card close','Hold the card about 8–12 inches (20–30 cm) from your baby’s face — roughly the distance from your elbow to your fingers. Close, bold and steady is easiest for brand-new eyes.'],
  ['Let your baby look','Let your baby study the image. Some babies stare hard, some go very still, some wiggle with excitement. All of that counts as looking.'],
  ['Move it slowly','When your baby is alert and interested, slowly move a card from side to side, a few centimetres each way, and watch their eyes follow.'],
  ['Stop in time','Stop when your baby looks away, yawns or loses interest. Looking away is how a newborn says “enough for now” — and that is a complete class.'],
  ['Keep it short and calm','Keep the experience short, calm and parent-led. Two to five minutes is plenty at this age, and you can always come back tomorrow.']
 ],note:'<strong>Every baby develops differently.</strong> Ages on Kiddo School are guides, not tests or deadlines. If you ever have a question about your baby’s vision or development, your doctor or health visitor is the right person to ask.'},
 why:'In the first weeks, most of what a newborn sees is soft and blurry, and strong black and white shapes are the easiest images for young eyes to notice. That is why high contrast cards and black and white baby flashcards have been a favourite newborn visual stimulation activity for generations. Following a slow-moving card gives your baby practice at focusing and tracking, and your voice turns the looking into language: circle, stripes, hello face. Nothing here is a lesson or a test — it is a calm minute of shared looking, at exactly your baby’s pace.',
 pills:{heading:'Where to next?',items:[['Newborn Learning','/newborn/'],['0–6 Weeks','/newborn/0-6-weeks/'],['See','/subjects/see/']],after:'<p class="lesson-next"><strong>Next Class →</strong> <a href="/newborn/6-12-weeks/faces-and-visual-tracking/">Faces &amp; Visual Tracking</a> — the next class on your path.</p>'},
 hubBlurb:'Twelve black and white cards, shown one at a time. Two to five minutes, no printing, no setup — just look together.',
 schema:{level:'Newborn (birth–6 weeks)',teaches:'Visual attention, focusing and visual tracking',audience:'Parents of newborns',keywords:'high contrast cards, black and white baby flashcards, newborn visual stimulation, newborn flashcards'}
};
export const fvLesson={
 path:'/newborn/6-12-weeks/faces-and-visual-tracking/',
 seoTitle:'Faces & Visual Tracking for Babies 6–12 Weeks',
 title:'Faces & Visual Tracking for Babies 6–12 Weeks',
 h1:'Faces & Visual Tracking for Babies 6–12 Weeks',
 description:'Explore simple high-contrast faces, patterns and early color cards designed for babies 6–12 weeks, with a short parent-led visual activity.',
 ogAlt:'Cover of the Kiddo School Newborn 2 class Faces and Visual Tracking for babies 6 to 12 weeks, with a bold black spiral card',
 ogImage:lessonsBase+'faces-and-visual-tracking-6-12-weeks/cover.webp',
 schemaImage:lessonsBase+'faces-and-visual-tracking-6-12-weeks/cover.webp',
 eyebrow:'NEWBORN 2 · LESSON 2',
 crumbs:[['Newborn','/newborn/'],['6–12 Weeks','/newborn/6-12-weeks/'],['Faces & Visual Tracking','/newborn/6-12-weeks/faces-and-visual-tracking/']],
 chips:[['Age','6–12 Weeks'],['Subject','See'],['Class','Newborn 2'],['Duration','2–5 minutes']],
 ledes:['Between 6 and 12 weeks, your baby starts to hold a gaze a little longer and follows movement with their eyes. This class uses simple high-contrast faces, gentle patterns and a first taste of strong colour — twelve cards you show one at a time, in a calm two-to-five-minute session whenever it suits you both.',
  'Faces are a baby’s favourite thing to look at, and moving a card slowly from side to side turns that looking into early visual tracking practice. Nothing to teach and nothing to test — just an easy next step from your first class.'],
 startHint:'Twelve cards, one at a time. The cover stays on this page; the class is one tap away.',
 viewerLabel:'Today’s class: twelve faces, patterns and early colour cards',
 viewerHeading:'Twelve cards, one at a time.',
 folder:'faces-and-visual-tracking-6-12-weeks/',
 eagerFirst:false,
 cover:{file:'cover.webp',w:1414,h:2000,alt:'Cover of the Faces and Visual Tracking class for babies 6 to 12 weeks: a bold black spiral card with the Newborn 2 See label from Kiddo School'},
 cards:[
  {order:1,file:'01-eyes.webp',w:1414,h:2000,alt:'Simple high-contrast eyes card for babies'},
  {order:2,file:'02-happy-face.webp',w:1414,h:2000,alt:'Simple high-contrast happy face card for babies'},
  {order:3,file:'03-different-face.webp',w:1414,h:2000,alt:'High-contrast face card for babies'},
  {order:4,file:'04-face-pattern.webp',w:1414,h:2000,alt:'High-contrast symmetrical face pattern for babies'},
  {order:5,file:'05-concentric-circles.webp',w:1414,h:2000,alt:'Black and white concentric circles card for babies'},
  {order:6,file:'06-wavy-lines.webp',w:1414,h:2000,alt:'Black and white wavy line card for babies'},
  {order:7,file:'07-zigzag.webp',w:1414,h:2000,alt:'Black and white zigzag card for babies'},
  {order:8,file:'08-large-dots.webp',w:1414,h:2000,alt:'Large high-contrast dots card for babies'},
  {order:9,file:'09-curved-path.webp',w:1414,h:2000,alt:'High-contrast curved path card for babies'},
  {order:10,file:'10-red-circle.webp',w:1414,h:2000,alt:'Simple red circle visual card for babies'},
  {order:11,file:'11-red-and-black.webp',w:1414,h:2000,alt:'Red and black high-contrast visual card for babies'},
  {order:12,file:'12-red-face-detail.webp',w:1414,h:2000,alt:'Simple face card with red visual detail for babies'}
 ],
 howTo:{heading:'How to use this activity',paragraphs:[
  'Choose a time when your baby is awake, calm and comfortable. Hold the card where your baby can comfortably see it and allow time to look. For tracking activities, move the card slowly from side to side. There is no need to complete every card in one session. Stop when your baby looks away, becomes tired or loses interest.',
  'At this stage, Kiddo School introduces simple faces, high-contrast patterns and a small amount of strong color.'
 ],note:'<strong>Every baby develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.'},
 pills:{heading:'Where to next?',items:[['Newborn Learning','/newborn/'],['6–12 Weeks','/newborn/6-12-weeks/'],['See','/subjects/see/']]},
 pathNav:{prev:{title:'High-Contrast Cards',range:'Birth–6 Weeks',href:'/newborn/0-6-weeks/high-contrast-cards/'},next:{title:'Colors & First Objects',range:'3–4 Months',href:'/baby/3-4-months/colors-and-first-objects/'}},
 hubBlurb:'Simple faces, gentle patterns and a first taste of colour, with slow side-to-side tracking. Two to five calm minutes at a time.',
 schema:{level:'Newborn (6–12 weeks)',teaches:'Visual attention, faces and early visual tracking',audience:'Parents of babies',keywords:'faces and visual tracking, high contrast cards for babies, baby visual tracking, newborn visual stimulation'}
};
export const cfoLesson={
 path:'/baby/3-4-months/colors-and-first-objects/',
 seoTitle:'Colors & First Objects for Babies 3–4 Months',
 title:'Colors & First Objects for Babies 3–4 Months',
 h1:'Colors & First Objects for Babies 3–4 Months',
 description:'Explore simple color and first-object flashcards for babies 3–4 months, featuring bold red, yellow and blue visuals and familiar everyday objects.',
 ogAlt:'Cover of the Kiddo School Infant 1 class Colors and First Objects for babies 3 to 4 months, with red, blue and yellow shapes',
 ogImage:lessonsBase+'colors-and-first-objects-3-4-months/cover.webp',
 schemaImage:lessonsBase+'colors-and-first-objects-3-4-months/cover.webp',
 eyebrow:'INFANT 1 · LESSON 3',
 crumbs:[['Baby','/baby/'],['3–4 Months','/baby/3-4-months/'],['Colors & First Objects','/baby/3-4-months/colors-and-first-objects/']],
 chips:[['Age','3–4 Months'],['Subject','See'],['Class','Infant 1'],['Duration','2–5 minutes']],
 ledes:['Around three to four months, many babies begin to notice colour and reach toward the world. This class pairs bold red, yellow and blue with a few familiar objects — a ball, a cup, a spoon, an apple, a teddy — shown one at a time in short, parent-led sessions.',
  'Name what you see if you like, and let your baby look for as long as they want. There is no need to test anything or expect a response: this is shared looking, not a quiz.'],
 startHint:'Twelve cards, one at a time. Short sessions win at this age.',
 viewerLabel:'Today’s class: twelve colour and first-object cards',
 viewerHeading:'Twelve cards, one at a time.',
 folder:'colors-and-first-objects-3-4-months/',
 eagerFirst:false,
 cover:{file:'cover.webp',w:1414,h:2000,alt:'Cover of the Colors and First Objects class for babies 3 to 4 months: red, blue and yellow shapes with the Infant 1 See label from Kiddo School'},
 cards:[
  {order:1,file:'01-red-circle.webp',w:1414,h:2000,alt:'Large red circle visual card for babies'},
  {order:2,file:'02-yellow-circle.webp',w:1414,h:2000,alt:'Large yellow circle visual card for babies'},
  {order:3,file:'03-blue-circle.webp',w:1414,h:2000,alt:'Large blue circle visual card for babies'},
  {order:4,file:'04-three-colors.webp',w:1414,h:2000,alt:'Red yellow and blue color card for babies'},
  {order:5,file:'05-ball.webp',w:1414,h:2000,alt:'Simple colorful ball visual card for babies'},
  {order:6,file:'06-cup.webp',w:1414,h:2000,alt:'Simple blue cup visual card for babies'},
  {order:7,file:'07-spoon.webp',w:1414,h:2000,alt:'Simple spoon visual card for babies'},
  {order:8,file:'08-apple.webp',w:1414,h:2000,alt:'Simple red apple visual card for babies'},
  {order:9,file:'09-sun.webp',w:1414,h:2000,alt:'Simple yellow sun visual card for babies'},
  {order:10,file:'10-ball-and-cup.webp',w:1414,h:2000,alt:'Ball and cup visual card for babies'},
  {order:11,file:'11-teddy-bear.webp',w:1414,h:2000,alt:'Simple teddy bear visual card for babies'},
  {order:12,file:'12-simple-face.webp',w:1414,h:2000,alt:'Simple human face visual card for babies'}
 ],
 howTo:{heading:'How to use this activity',paragraphs:[
  'Choose a time when your baby is awake, calm and comfortable. Show one card at a time and give your baby time to look. You can name familiar objects naturally as you show them, but there is no need to test your baby or expect a response.',
  'This lesson introduces bold red, yellow and blue alongside simple familiar objects. Keep sessions short and follow your baby’s interest.',
  'Stop when your baby looks away, becomes tired, fussy or loses interest.'
 ],note:'<strong>Every baby develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.'},
 tryTogether:['Look at the red circle.','Here is the ball.','Can you see the cup?','This is an apple.','Where is the sun?','Hello, teddy.'],
 pills:{heading:'Where to next?',items:[['Baby classes','/baby/'],['3–4 Months','/baby/3-4-months/'],['See','/subjects/see/']]},
 pathNav:{prev:{title:'Faces & Visual Tracking',range:'6–12 Weeks',href:'/newborn/6-12-weeks/faces-and-visual-tracking/'},next:null},
 hubBlurb:'Bold red, yellow and blue alongside familiar objects — a ball, a cup, a spoon, a teddy. Name them if you like; there is nothing to test.',
 schema:{level:'Infant (3–4 months)',teaches:'Colour noticing, focusing and shared attention',audience:'Parents of babies',keywords:'baby colour cards, first objects flashcards, red yellow blue baby cards, visual activities for infants'}
};
export const lessons=[hcLesson,fvLesson,cfoLesson];
export function classLessonSchema(site,L){
 return [
  {'@context':'https://schema.org','@type':'LearningResource',name:L.title,description:L.description,url:site+L.path,image:L.schemaImage,inLanguage:'en',learningResourceType:'Interactive baby class',educationalLevel:L.schema.level,isAccessibleForFree:true,educationalUse:'Home learning activity',teaches:L.schema.teaches,audience:{'@type':'Audience',audienceType:L.schema.audience},keywords:L.schema.keywords},
  {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[['Home','/'],...L.crumbs].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:site+path}))}
 ];
}
const crumbNav=crumbs=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${crumbs.map(([label,href],i)=>`<span aria-hidden="true">/</span>${i===crumbs.length-1?`<span aria-current="page">${esc(label)}</span>`:`<a href="${href}">${esc(label)}</a>`}`).join('')}</nav>`;
export function classLessonBody(L){
 const heroInner=`<span class="eyebrow">${L.eyebrow}</span>
  <h1>${esc(L.h1)}</h1>
  <div class="fc-chips lesson-chips">${L.chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
  ${L.ledes.map(p=>`<p class="lesson-lede">${p}</p>`).join('\n  ')}
  <div class="lesson-start"><a class="button" href="#todays-class" data-lv-start>Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">${L.startHint}</span></div>`;
 const hero=L.cover?`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy">${heroInner}</div><figure class="lesson-cover"><img src="${L.ogImage}" width="${L.cover.w}" height="${L.cover.h}" alt="${L.cover.alt}"></figure></article>`:`<article class="wrap lesson-hero">${heroInner}</article>`;
 const viewer=`<section class="wrap lesson-section" id="todays-class" aria-label="${L.viewerLabel}">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>${L.viewerHeading}</h2>
  <div class="lv-frame" data-lesson-viewer>
   <div class="lv-stage" data-lv-stage></div>
   <div class="lv-controls" data-lv-controls><button type="button" class="lv-btn" data-lv-prev>Previous</button><span class="lv-count" data-lv-count aria-live="polite" aria-atomic="true">Card 1 of ${L.cards.length}</span><button type="button" class="lv-btn" data-lv-next>Next</button></div>
   <div class="lv-actions" data-lv-actions><button type="button" class="lv-btn lv-ghost" data-lv-full>Full screen</button><button type="button" class="lv-btn lv-ghost" data-lv-finish>Finish</button></div>
   <div class="lv-begin"><button type="button" class="button" data-lv-start>Start Today’s Class</button><span class="lv-beginhint">Or simply scroll: all ${L.cards.length} cards are below.</span></div>
   <p class="lv-done" data-lv-done hidden><strong>Class complete — well done.</strong> However many cards your baby saw, however long it took, that was a full class. Rest is part of it too.</p>
  </div>
  <div class="lv-grid" data-lv-grid>${L.cards.map(c=>`<figure class="lv-card">${img(L.folder,c.file,c.w,c.h,c.alt,L.eagerFirst&&c.order===1)}</figure>`).join('')}</div>
 </section>`;
 const howTo=`<section class="wrap lesson-section" id="how-to">
  <span class="eyebrow">PARENT INSTRUCTIONS</span>
  <h2>${L.howTo.heading}</h2>
  ${L.howTo.steps?`<ol class="fc-steps">${L.howTo.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${String(i+1).padStart(2,'0')}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>`:''}
  ${L.howTo.paragraphs?L.howTo.paragraphs.map(p=>`<p class="lesson-copy">${p}</p>`).join('\n  '):''}
  <p class="lesson-note">${L.howTo.note}</p>
 </section>`;
 const tryTogether=L.tryTogether?`<section class="wrap lesson-section">
  <span class="eyebrow">TRY TOGETHER</span>
  <h2>Little things to say.</h2>
  <p class="fc-hint">Prompts for you, not for the cards — say them softly while your baby looks.</p>
  <ul class="lesson-prompts">${L.tryTogether.map(p=>`<li>${p}</li>`).join('')}</ul>
 </section>`:'';
 const why=L.why?`<section class="wrap lesson-section fc-why"><span class="eyebrow">THE LITTLE BIT OF LEARNING</span><h2>Why black and white?</h2><p>${L.why}</p></section>`:'';
 const pills=L.pills?`<section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>${L.pills.heading}</h2><div class="lesson-linkrow">${L.pills.items.map(([label,href])=>`<a class="lesson-pill-link" href="${href}">${label}</a>`).join('')}</div>${L.pills.after||''}</section>`:'';
 const pathCard=(kind,n)=>n?`<a class="fc-stage lesson-card-link" href="${n.href}"><div class="fc-stage-pills"><span class="fc-age">${kind}</span><span class="fc-class">${esc(n.range)}</span></div><h3>${esc(n.title)}</h3><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a>`:`<div class="fc-stage lesson-soon"><div class="fc-stage-pills"><span class="fc-age">Next lesson</span><span class="fc-class">Coming soon</span></div><h3>Coming soon</h3><p>The next class on this path is still on the drawing table.</p></div>`;
 const pathNav=L.pathNav?`<section class="wrap lesson-section"><span class="eyebrow">YOUR CLASS PATH</span><h2>Keep going, step by step.</h2><div class="lesson-path">${pathCard('Previous lesson',L.pathNav.prev)}${pathCard('Next lesson',L.pathNav.next)}</div></section>`:'';
 return `${crumbNav(L.crumbs)}
 ${hero}
 ${viewer}
 ${howTo}
 ${tryTogether}
 ${why}
 ${pills}
 ${pathNav}`;
}
export function lessonStageCard(L,pillLeft,pillRight){
 return `<a class="fc-stage lesson-card-link" href="${L.path}"><div class="fc-stage-pills"><span class="fc-age">${pillLeft}</span><span class="fc-class">${pillRight}</span></div><h3>${esc(L.h1.split(' for ')[0])}</h3><p>${L.hubBlurb}</p><span class="fc-open">Start today’s class <span aria-hidden="true">↗</span></span></a>`;
}
export function stagePageBody({chips,stageLessons,soon}){
 return `<section class="wrap section compact"><div class="fc-chips lesson-chips">${chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
 <div class="fc-stages">${stageLessons.map(L=>lessonStageCard(L,'Lesson '+(lessons.indexOf(L)+1),'See')).join('')}${soon||''}</div>
 <p class="lesson-note"><strong>Every baby develops differently.</strong> Kiddo School age ranges are guides, not tests or developmental deadlines.</p></section>`;
}
