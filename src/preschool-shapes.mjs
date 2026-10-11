// Kiddo School — Preschool 3 (Age 3): Shapes & Patterns.
// Full class at /preschool/3-years/shapes-and-patterns/, built on the twelve
// owner-uploaded shape cards. Reuses the site's existing interactive pieces:
// the lesson card viewer (data-lesson-viewer in site.js) for Learn Shapes and
// the calm find-it game engine (data-tc-round) for Find the Shape, Match
// Shapes and Complete a Pattern. Shape tiles are programmatic CSS shapes —
// no new images are invented, and the pattern games never depend on
// nonexistent assets.
import {shapesLesson,shapesCardContent} from './flashcards/data-shapes.mjs';
import {age3SolveSheets} from './lessons.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const base=shapesLesson.r2Base+shapesLesson.folder;
const CARDS=shapesLesson.cards;
const cardBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));
const contentOf=slug=>shapesCardContent[slug];
const SET_URL='/flashcards/shapes/';
const CLASS_PATH=shapesLesson.path;
const SHAPE_NAME={circle:'circle',square:'square',triangle:'triangle',rectangle:'rectangle',oval:'oval',star:'star',heart:'heart',diamond:'diamond',crescent:'crescent',pentagon:'pentagon',hexagon:'hexagon',octagon:'octagon'};

const crumbNav=parts=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const heading=(eyebrow,title,desc)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>`;
const shapeFace=(s,{correct=false,asChoice=false}={})=>asChoice
 ?`<button type="button" class="tc-choice tc-shape"${correct?' data-tc-correct="true"':''} aria-label="The ${esc(SHAPE_NAME[s])} shape"><span class="shape-face sf-${s}" aria-hidden="true"></span></button>`
 :`<span class="shape-face sf-${s}${correct?' is-target':''}" role="img" aria-label="A ${esc(SHAPE_NAME[s])}"></span>`;
const picChoice=(c,correct=false)=>`<button type="button" class="tc-choice"${correct?' data-tc-correct="true"':''} aria-label="${esc(contentOf(c.slug).word)}"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"></button>`;

/* ---------- Class game data ---------- */

// PLAY — FIND THE SHAPE. One target shape tile, three big choices, calm
// feedback. Distractors are visually distinct first, then closer.
const findRounds=[
 {say:'Can you find the circle? Round and round, no corners!',shape:'circle',choices:[['circle',true],['square',false],['triangle',false]]},
 {say:'Where is the star? Five pointy points!',shape:'star',choices:[['heart',false],['star',true],['circle',false]]},
 {say:'Find the square. Four sides, all the same!',shape:'square',choices:[['triangle',false],['circle',false],['square',true]]},
 {say:'Where is the heart? The shape that means I love you!',shape:'heart',choices:[['heart',true],['star',false],['diamond',false]]},
 {say:'Now a tricky one — find the diamond. A square standing on its point!',shape:'diamond',choices:[['square',false],['diamond',true],['oval',false]]},
 {say:'Find the crescent — the moon’s shape!',shape:'crescent',choices:[['crescent',true],['circle',false],['star',false]]}
];

// PRACTICE — MATCH SHAPES. A big shape tile on the left; three real shape
// card pictures to choose from. Every target is one of the twelve real cards.
const matchRounds=[
 {shape:'circle',say:'A circle is round like a ball. Tap the circle!',target:'circle',choices:['circle','square','star']},
 {shape:'square',say:'Four sides, all the same — find the square!',target:'square',choices:['square','triangle','heart']},
 {shape:'triangle',say:'Three sides, three corners. Tap the triangle!',target:'triangle',choices:['triangle','rectangle','circle']},
 {shape:'star',say:'Five points! Where is the star?',target:'star',choices:['star','oval','diamond']},
 {shape:'heart',say:'Round on top, pointy at the bottom — find the heart!',target:'heart',choices:['heart','octagon','square']},
 {shape:'rectangle',say:'A square that got stretched — tap the rectangle!',target:'rectangle',choices:['rectangle','square','crescent']}
];

// PRACTICE — COMPLETE A PATTERN. Simple shape tiles, AB first, then AAB.
// The pattern row is read aloud together; the child taps what comes next.
const patternRounds=[
 {pattern:['circle','square','circle','square'],say:'Circle, square, circle, square... what comes next? Say the pattern out loud, then tap it!',answer:'square',choices:['square','circle']},
 {pattern:['star','heart','star','heart'],say:'Star, heart, star, heart... what lands next?',answer:'star',choices:['heart','star','square']},
 {pattern:['triangle','circle','triangle','circle'],say:'Triangle, circle, triangle, circle... keep the pattern going!',answer:'triangle',choices:['circle','triangle','square']},
 {pattern:['circle','circle','square','circle','circle'],say:'Now a bouncier one: circle, circle, square. Circle, circle... what comes next?',answer:'square',choices:['circle','square','triangle']},
 {pattern:['star','star','heart','star','star'],say:'Star, star, heart. Star, star... what lands next?',answer:'heart',choices:['star','heart','diamond']},
 {pattern:['triangle','triangle','diamond','triangle','triangle'],say:'Triangle, triangle, diamond — one more time! Triangle, triangle...',answer:'diamond',choices:['triangle','diamond','circle']}
];

/* ---------- The class page ---------- */

export function shapesClassBody(L){
 const chips=[['Age','3 Years'],['Class','Preschool 3'],['Subjects','Shapes &amp; patterns']];
 const ledes=[
  'Twelve shape cards, printable shape sheets to solve and a house full of shapes waiting to be found. This class follows Numbers &amp; Counting on the preschool path — same calm pacing, now with circles, stars and simple patterns.',
  'Two shapes are a fine first day. Start with the ones your child will spot around the house — circle and star are the classics — and let the rest of the set wait its turn.'
 ];
 const heroInner=`<span class="eyebrow">${esc(L.eyebrow)}</span>
  <h1>${esc(L.h1)}</h1>
  <div class="fc-chips lesson-chips">${chips.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>
  ${ledes.map(p=>`<p class="lesson-lede">${p}</p>`).join('\n  ')}
  <div class="lesson-start"><a class="button" href="#todays-class">Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Grown-up nearby, little one on the lap or wandering the room — both work.</span></div>`;

 // Learn Shapes: 12 real cards in order, each with its own line to say.
 const slides=CARDS.map((c,i)=>{
  const d=contentOf(c.slug);
  return `<figure class="lv-card"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"${i===0?'':' loading="lazy"'} data-lv-say="${esc(d.say)}" data-lv-find="${esc('Can you say '+d.word.toLowerCase()+' and trace its shape in the air?')}"></figure>`;
 }).join('');
 /* SOLVE THE SHEETS — the class's real printable work: the owner asked for
    worksheet-solving guidance here instead of coded games. */
 const solveSection=age3SolveSheets({
  heading:'Solve the shape sheets together.',
  copy:'The twelve shape cards print two to a page, straight from your browser. Printed, cut and named, they are the class\u2019s real worksheets — and on screen, every card page can be drawn on directly.',
  steps:[
   ['Print the cards','Open the printable cards and print all twelve, two to a page. Cut them out together, naming each shape as it is cut.'],
   ['Name the shape','Hold up a card and name the shape, then count its sides together — one, two, three. Sides and names grow up side by side.'],
   ['Hunt the twins','Find each shape\u2019s real twin in the room: the clock is a circle, the book is a rectangle. One real twin per shape is plenty.'],
   ['Trace the edge','Trace around each card\u2019s edge with one finger, then a crayon. On screen, the card page\u2019s Write & Color layer does the same job.']
  ],
  printHref:'/preschool/3-years/shapes-and-patterns/print/',fcHref:'/flashcards/shapes/'
 });
 const learnSection=`<section class="wrap lesson-section" id="learn-shapes" aria-label="Learn shapes">
  <span class="eyebrow">LEARN SHAPES</span>
  <h2>Twelve shapes, from circle to octagon.</h2>
  <p class="lesson-copy">Every card shows one big, friendly shape with its name underneath. Use the arrows to wander through them in order — or simply scroll. Name each shape, trace it in the air with one big finger movement, and stop whenever the wiggles start.</p>
  <div class="lv-frame" data-lesson-viewer>
   <div class="lv-stage" data-lv-stage></div>
   <p class="lv-caption" data-lv-caption hidden></p>
   <div class="lv-controls" data-lv-controls><button type="button" class="lv-btn" data-lv-prev>Previous</button><span class="lv-count" data-lv-count aria-live="polite" aria-atomic="true">Card 1 of ${CARDS.length}</span><button type="button" class="lv-btn" data-lv-next>Next</button></div>
   <div class="lv-actions" data-lv-actions><button type="button" class="lv-btn lv-ghost" data-lv-full>Full screen</button></div>
   <div class="lv-begin"><button type="button" class="button" data-lv-start>Start the shape cards</button><span class="lv-beginhint">Or simply scroll: all ${CARDS.length} cards are below.</span></div>
  </div>
  <div class="lv-grid" data-lv-grid>${slides}</div>
 </section>`;

 const findSection=`<section class="wrap lesson-section tc-game" id="find-the-shape" aria-label="Play: find the shape" data-tc-correct="You found it!|Great spotting!|Shape found!" data-tc-incorrect="Let’s look together.">
  <span class="eyebrow">PLAY · FIND THE SHAPE</span>
  <h2>Find the shape.</h2>
  <p class="lesson-copy">One shape at a time, three big choices. Say the shape’s name together, then let your child tap it. A miss is just a look-again — there are no points, no timers and nothing to lose.</p>
  ${findRounds.map(r=>`<div class="tc-round" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${r.choices.map(([s,ok])=>shapeFace(s,{correct:ok,asChoice:true})).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('')}
 </section>`;

 const matchSection=`<section class="wrap lesson-section tc-game" id="match-shapes" aria-label="Practice: match shapes" data-tc-correct="That’s the one!|Perfect match!|You matched it!" data-tc-incorrect="Try another picture — say the shape’s name slowly.">
  <span class="eyebrow">PRACTICE · MATCH SHAPES</span>
  <h2>Match the shape.</h2>
  <p class="lesson-copy">A shape tile on the left, three real shape cards on the right. Say the shape’s name, trace it in the air, then tap the card that shows the same shape.</p>
  ${matchRounds.map(r=>`<div class="tc-round tc-match" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><figure class="tc-target tc-target-shape"><span class="eyebrow">THE SHAPE</span>${shapeFace(r.shape)}</figure><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${r.choices.map(s=>picChoice(cardBySlug[s],s===r.target)).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('')}
 </section>`;

 const patternSection=`<section class="wrap lesson-section tc-game" id="complete-a-pattern" aria-label="Practice: complete a pattern" data-tc-correct="The pattern goes on!|Perfect pattern!|You finished it!" data-tc-incorrect="Say the pattern out loud together — then try again.">
  <span class="eyebrow">PRACTICE · COMPLETE A PATTERN</span>
  <h2>Complete a pattern.</h2>
  <p class="lesson-copy">Patterns are shapes with a rhythm. Say the pattern out loud together — “circle, square, circle, square” — and let the rhythm tell your child what lands next. Three gentle AB patterns first, then three bouncier AAB ones. No score, no hurry.</p>
  ${patternRounds.map(r=>`<div class="tc-round pat-round" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><div class="pat-row" role="img" aria-label="A pattern of shapes: ${r.pattern.map(s=>SHAPE_NAME[s]).join(', ')} — and one more to choose.">${r.pattern.map(s=>shapeFace(s)).join('')}<span class="pat-gap" aria-hidden="true">?</span></div><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${r.choices.map(s=>shapeFace(s,{correct:s===r.answer,asChoice:true})).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('')}
 </section>`;

 const offScreenSection=`<section class="wrap lesson-section" id="off-screen" aria-label="Take it off screen">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>Shapes that live in your house.</h2>
  <p class="lesson-copy">Shape names stick best away from the screen, in short playful hunts with real things. Pick one of these — two minutes is plenty — and follow your child’s lead.</p>
  <div class="tc-hunt"><h3>Plate shapes</h3><ul class="lesson-prompts"><li>At snack time, look at the food: round cucumber slices, square crackers, oval eggs.</li><li>Name each shape as you serve it — “a circle of cucumber for you!”</li></ul></div>
  <div class="tc-hunt"><h3>Doors and windows</h3><ul class="lesson-prompts"><li>Wander one room together and find rectangles: the door, a book, a window.</li><li>Tap each one gently and say “rectangle” — the shape your child touches all day, finally with a name.</li></ul></div>
  <div class="tc-hunt"><h3>Shapes on a walk</h3><ul class="lesson-prompts"><li>Outside, wheels are circles, signs can be octagons, and the sun is a circle in the sky.</li><li>One or two shapes per outing is exactly right; the world will still be there tomorrow.</li></ul></div>
  <div class="tc-hunt"><h3>Playdough shapes</h3><ul class="lesson-prompts"><li>Roll a ball (circle!), squash it into an egg (oval!), stretch it long (rectangle!).</li><li>Shapes your hands have made are shapes your memory keeps.</li></ul></div>
  <div class="tc-hunt"><h3>Make a pattern together</h3><ul class="lesson-prompts"><li>Line up blocks, buttons or pasta: circle, square, circle, square... and ask what comes next.</li><li>Let your child build the pattern and YOU be the one who guesses — getting it wrong on purpose is the fun part.</li></ul></div>
  <p class="lesson-note">Stay close, keep it playful and stop while it is still fun. There is nothing to finish here.</p>
 </section>`;

 const printSection=`<section class="wrap lesson-section tc-printables" id="printables" aria-label="Print the cards">
  <span class="eyebrow">PRINT THE CARDS</span>
  <h2>Take the shapes to the kitchen table.</h2>
  <p class="lesson-copy">All twelve shape cards can be printed two to a page, in order, straight from your browser — no PDF, no sign-up, nothing to install.</p>
  <div class="hero-actions tc-print-actions"><a class="button" href="${CLASS_PATH}print/">View Printable Cards <span aria-hidden="true">↗</span></a><button type="button" class="button button-ghost" data-tc-print-open="${CLASS_PATH}print/?print=1">Print Cards</button></div>
  <p class="lesson-note">Printed cards love fridges, bedroom doors and kitchen tables. The same cards also live in the <a href="${SET_URL}">flashcards library</a>, each with its own page.</p>
 </section>`;

 const teacherNoteSection=`<section class="wrap lesson-section"><span class="eyebrow">TEACHER NOTE</span><h2>One last word from class.</h2><div class="tc-note-block tc-teacher"><p class="tc-say">“Shapes are hiding everywhere — in plates, doors, wheels and the night sky. Keep spotting them together, and a plain old walk becomes a shape hunt. See you in class!”</p><p class="tc-who">— Your Kiddo School teacher</p></div></section>`;
 const principalSection=`<section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2><p class="lesson-copy">At three, shape play is naming and noticing, not geometry lessons: a “diamond” that is really a kite, an “oval” that is really an egg — all of it is exactly on track. The pattern games here are rhythm games in disguise; saying the pattern out loud matters more than tapping the right tile. Everything gives calm feedback with no scores, and the pattern tiles are drawn by the page itself, so the game never depends on a picture that might not load.</p><p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p></section>`;

 const completeSection=`<section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>Wonderful shape spotting!</h2>
  <p class="lesson-copy">Whether you met two shapes or all twelve, that was the whole class — and stopping early is always allowed. The shapes will be right here, and so will the hunts, whenever you come back.</p>
  <div class="hero-actions"><a class="button" href="#todays-class">Explore Again <span aria-hidden="true">↑</span></a><a class="button button-ghost" href="${SET_URL}">View Shape Flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
  <div class="lesson-path"><a class="fc-stage lesson-card-link" href="/learning-path/"><div class="fc-stage-pills"><span class="fc-age">Where next</span><span class="fc-class">The path so far</span></div><h3>Back to the Learning Path</h3><p>See the whole journey from birth to age three, and revisit any class your child loved.</p><span class="fc-open">Open the Learning Path <span aria-hidden="true">↗</span></span></a></div>
 </section>`;

 const tipsSection=`<section class="wrap lesson-section" id="how-to">
  <span class="eyebrow">TIPS FOR PARENTS</span>
  <h2>How to use this class.</h2>
  <p class="lesson-copy">Sit together for the card viewing, and let your child do the tapping in the games — even when the answer looks obvious to you. Naming a shape and tracing it in the air at the same time is twice as sticky as either one alone.</p>
  <p class="lesson-copy">Keep shape words casual and plentiful: “round plate”, “square window”, “that long rectangle of a rug”. The shapes do not need a quiz — they need to show up in ordinary chat until they feel like old friends.</p>
  <p class="lesson-note">Age 3 is a guide, not a deadline. If today’s class was a circle, a star and a snack, today’s class was a success.</p>
 </section>`;

 // Classroom activities: this class's Age 3 magic game.
 const magicGameSection=`<section class="wrap lesson-section" id="classroom-activities" aria-label="Classroom activities">
  <span class="eyebrow">CLASSROOM ACTIVITIES</span>
  <h2>Draw with shapes — for real.</h2>
  <p class="lesson-copy">The shapes from this class have a drawing activity of their own. Look &amp; Draw — Magic Shapes shows a picture — a house, a rocket, a tree, a robot or a butterfly — beside a big white canvas where your child draws their own version with six big colors, easy tools and gentle “Show me how” steps. Look at the shapes, then draw them.</p>
  <div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/3-years/magic-shape-builder/">Play Look &amp; Draw — Magic Shapes <span aria-hidden="true">↗</span></a></div>
 </section>`;

 return `${crumbNav([['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Shapes & Patterns']])}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">${heroInner}</div></article>
 ${`<section class="wrap lesson-section" id="todays-class" aria-label="Today’s class">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>How today’s class works.</h2>
  <p class="lesson-copy">Four little steps, in any order that suits you: a welcome from your teacher, the shape cards, solving the shape sheets together, an off-screen hunt, and a warm goodbye. Stop after any step — that is a complete class, and there is never a score at the end.</p>
  <ol class="tc-flow">
   <li><span>1</span> Teacher welcome</li>
   <li><span>2</span> Learn shapes</li>
   <li><span>3</span> Solve the sheets</li>
   <li><span>4</span> Take it off screen</li>
   <li><span>5</span> Class complete</li>
  </ol>
  <div class="tc-note-block tc-teacher"><span class="eyebrow">TEACHER WELCOME</span><p class="tc-say">“Hello, my friend — and hello to you, grown-up helper! Today we’re playing with shapes. Start with the ones your child already loves — circles and stars are old friends — and let the rest introduce themselves.”</p><p class="tc-who">— Your Kiddo School teacher</p></div>
  <div class="lesson-start"><a class="button" href="#learn-shapes">Begin the class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">First stop: the shape cards.</span></div>
 </section>`}
 ${learnSection}
 ${solveSection}
 ${offScreenSection}
 ${printSection}
 ${teacherNoteSection}
 ${principalSection}
 ${magicGameSection}
 ${completeSection}
 ${tipsSection}`;
}
