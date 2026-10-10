// Kiddo School — Age 4 preschool stage: the 4-years hub and Classes 25–27.
// Class 25 · Shapes, Patterns & Sorting   (/preschool/4-years/shapes-patterns-and-sorting/)
// Class 26 · Colors, Mixing & Creativity  (/preschool/4-years/colors-mixing-and-creativity/)
// Class 27 · Early Writing & Pencil Control (/preschool/4-years/early-writing-and-pencil-control/)
// The pages reuse the site's own game engine (data-tc-round in site.js), the
// completion bar (#class-complete picked up by school-progress.js), the
// lesson layout conventions of the Age 3 classes, and they link into the
// three adventure libraries built on the owner's R2 artwork.
import {shapeAdventures,SHAPE_BASE,SHAPE_LIB_PATH} from './shape-adventures.mjs';
import {colorCreativities,COLOR_BASE,COLOR_LIB_PATH} from './color-creativity.mjs';
import {writingAdventures,WRITING_BASE,WRITING_LIB_PATH,GROUP_NAMES} from './writing-adventures.mjs';
import {crumbNav,heading,esc} from './adventure-kit.mjs';

const HUB='/preschool/4-years/';
export const C25_PATH=HUB+'shapes-patterns-and-sorting/';
export const C26_PATH=HUB+'colors-mixing-and-creativity/';
export const C27_PATH=HUB+'early-writing-and-pencil-control/';

const chips=(rows)=>`<div class="fc-chips lesson-chips">${rows.map(([k,v])=>`<span><strong>${k}</strong> ${v}</span>`).join('')}</div>`;
const shapeFaces={circle:'circle',square:'square',triangle:'triangle',rectangle:'rectangle',oval:'oval',star:'star',heart:'heart',diamond:'diamond',hexagon:'hexagon'};
const face=(s,correct,asChoice)=>asChoice
 ?`<button type="button" class="tc-choice tc-shape"${correct?' data-tc-correct="true"':''} aria-label="The ${s} shape"><span class="shape-face sf-${s}" aria-hidden="true"></span></button>`
 :`<span class="shape-face sf-${s}" role="img" aria-label="A ${s}"></span>`;

/* ---------- the hub ---------- */
export function stage4HubBody(){
 return `${crumbNav([['Preschool','/preschool/'],['Age 4']])}
 ${heading('PRESCHOOL · AGE 4','Age 4: shapes, colors and pencil control.','Three big classes for four-year-olds — Shapes, Patterns &amp; Sorting (Class 25), Colors, Mixing &amp; Creativity (Class 26) and Early Writing &amp; Pencil Control (Class 27) — each with its own shelf of real, playable adventures built on our own storybook artwork.')}
 <section class="wrap section compact"><div class="fc-stages">
  <a class="fc-stage lesson-card-link" href="${C25_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class 25</span></div><h3>Shapes, Patterns &amp; Sorting</h3><p>Nine shapes, three pattern games and the whole <a href="${SHAPE_LIB_PATH}">Shape Adventures</a> shelf: a spaceship to build, a monster factory, candy sorting and a shape detective.</p><span class="fc-open">Open Class 25 <span aria-hidden="true">↗</span></span></a>
  <a class="fc-stage lesson-card-link" href="${C26_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class 26</span></div><h3>Colors, Mixing &amp; Creativity</h3><p>Real paint mixing, tap-to-fill coloring you can actually stay inside, movable decorations and a free splatter canvas in the <a href="${COLOR_LIB_PATH}">Colors &amp; Creativity</a> studio.</p><span class="fc-open">Open Class 26 <span aria-hidden="true">↗</span></span></a>
  <a class="fc-stage lesson-card-link" href="${C27_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class 27</span></div><h3>Early Writing &amp; Pencil Control</h3><p>Thirty on-screen tracing adventures in the <a href="${WRITING_LIB_PATH}">Writing Adventures</a> library — winding paths, loops, mazes and dot-to-dots with a finger, stylus or mouse.</p><span class="fc-open">Open Class 27 <span aria-hidden="true">↗</span></span></a>
 </div>
 <p class="lesson-note"><strong>Age ranges are guides, not tests.</strong> Start where it is fun, stop while it is fun, and come back whenever you like. Progress saves on this device for the child chosen in <a href="/my-classroom/">My Classroom</a>.</p></section>`;
}

/* ---------- shared fragments ---------- */
const adventuresGrid=(items,base,sectionAttr)=>`<div class="sa-grid">${items.map(g=>`<a class="sa-card sa-card-slim" href="${base}${g.slug}/" ${sectionAttr}="${g.slug}">
 <img src="${base}${g.img}" width="400" height="284" alt="${esc(g.alt)}" loading="lazy">
 <span class="sa-card-body"><strong>${esc(g.title)}</strong><span class="sa-card-skill">${esc(g.skill)}</span></span>
 <span class="sa-card-play">Play <span aria-hidden="true">→</span></span></a>`).join('')}</div>`;

/* ---------- Class 25 ---------- */
export function class25Body(){
 const findRounds=[
  {say:'Find the circle — round and round, no corners!',choices:[['circle',true],['square',false],['triangle',false]]},
  {say:'Find the star — five pointy points!',choices:[['heart',false],['star',true],['oval',false]]},
  {say:'Find the hexagon — six sides, like a honeycomb cell!',choices:[['hexagon',true],['circle',false],['diamond',false]]}
 ];
 const patternRounds=[
  {pattern:['circle','square','circle','square'],say:'Circle, square, circle, square… what comes next?',answer:'circle',choices:['circle','square']},
  {pattern:['star','star','heart','star','star'],say:'Star, star, heart. Star, star… what lands next?',answer:'heart',choices:['heart','star','diamond']}
 ];
 const featured=[shapeAdventures[0],shapeAdventures[2],shapeAdventures[8],shapeAdventures[9],shapeAdventures[10],shapeAdventures[17]];
 return `${crumbNav([['Preschool','/preschool/'],['Age 4',HUB],['Shapes, Patterns &amp; Sorting']])}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">
  <span class="eyebrow">CLASS 25 · PRESCHOOL AGE 4</span>
  <h1>Shapes, Patterns &amp; Sorting</h1>
  ${chips([['Age','4 Years'],['Class','25 of 27'],['Adventures','18 shape games'],['Subjects','Shapes · patterns · sorting']])}
  <p class="lesson-lede">At four, shapes stop being names and start being tools: things to match, sort, pattern and build with. This class revisits the nine core shapes, plays with pattern rhythm, and opens the door to the Shape Adventures — eighteen real games built on our own storybook artwork.</p>
  <p class="lesson-lede">Everything gives calm, gentle feedback. No scores, no timers, no penalties — a miss is just a look-again.</p>
  <div class="lesson-start"><a class="button" href="#todays-class">Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Grown-up nearby, little one in charge of the tapping.</span></div>
 </div></article>
 <section class="wrap lesson-section" id="todays-class" aria-label="Today’s class">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>How today’s class works.</h2>
  <p class="lesson-copy">Five little steps, in any order that suits you: the shape circle, two quick games, the pattern warm-up, then the grand tour of the Shape Adventures shelf. Stop after any step — that is a complete class.</p>
  <ol class="tc-flow">
   <li><span>1</span> The shape circle</li>
   <li><span>2</span> Find the shape</li>
   <li><span>3</span> What comes next?</li>
   <li><span>4</span> The Shape Adventures shelf</li>
   <li><span>5</span> Class complete</li>
  </ol>
 </section>
 <section class="wrap lesson-section" id="shape-circle" aria-label="The shape circle">
  <span class="eyebrow">LEARN · THE SHAPE CIRCLE</span>
  <h2>Nine shapes, one friendly circle.</h2>
  <p class="lesson-copy">Say each shape name together and trace it in the air with one big finger movement. Air-tracing is the secret weapon of this whole class — it wires the shape into the hand as well as the eye.</p>
  <div class="tc-shape-row" role="list">${Object.keys(shapeFaces).map(s=>`<span class="tc-shape-cell" role="listitem">${face(s)}<small>${s}</small></span>`).join('')}</div>
 </section>
 <section class="wrap lesson-section tc-game" id="find-the-shape" aria-label="Play: find the shape" data-tc-correct="You found it!|Great spotting!|Shape found!" data-tc-incorrect="Let’s look together.">
  <span class="eyebrow">PLAY · FIND THE SHAPE</span>
  <h2>Find the shape.</h2>
  <p class="lesson-copy">Three rounds, three big choices. Say the shape’s name out loud, then let your child tap it.</p>
  ${findRounds.map(r=>`<div class="tc-round" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${r.choices.map(([s,ok])=>face(s,ok,true)).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('')}
 </section>
 <section class="wrap lesson-section tc-game" id="whats-next" aria-label="Practice: what comes next" data-tc-correct="The pattern goes on!|Perfect pattern!" data-tc-incorrect="Say the pattern out loud together — then try again.">
  <span class="eyebrow">PRACTICE · WHAT COMES NEXT?</span>
  <h2>What comes next?</h2>
  <p class="lesson-copy">Patterns are shapes with a rhythm. Say the pattern out loud — the rhythm tells your child what lands next.</p>
  ${patternRounds.map(r=>`<div class="tc-round pat-round" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><div class="pat-row" role="img" aria-label="A pattern of shapes">${r.pattern.map(s=>face(s)).join('')}<span class="pat-gap" aria-hidden="true">?</span></div><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${r.choices.map(s=>face(s,s===r.answer,true)).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('')}
 </section>
 <section class="wrap lesson-section" id="adventures" aria-label="The Shape Adventures shelf">
  <span class="eyebrow">PLAY · THE SHAPE ADVENTURES SHELF</span>
  <h2>Eighteen real shape games.</h2>
  <p class="lesson-copy">Every adventure below is a full game — pieces to place, patterns to finish, candies to sort, a monster to build, a mystery to solve. Start with any card; the library keeps them all in one place.</p>
  ${adventuresGrid(featured,SHAPE_BASE,'data-c25-card')}
  <div class="lesson-linkrow"><a class="lesson-pill-link" href="${SHAPE_LIB_PATH}">Open the whole Shape Adventures Library <span aria-hidden="true">↗</span></a></div>
 </section>
 <section class="wrap lesson-section" id="off-screen" aria-label="Take it off screen">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>Sorting and patterns in your house.</h2>
  <div class="tc-hunt"><h3>Snack sorting</h3><ul class="lesson-prompts"><li>Sort crackers by shape at snack time — squares here, circles there, rectangles over there.</li><li>Count each pile together, then swap: which pile is the biggest?</li></ul></div>
  <div class="tc-hunt"><h3>Sock patterns</h3><ul class="lesson-prompts"><li>Line up socks: spotty, stripy, plain — spotty, stripy, plain. What comes next?</li><li>Let your child build the pattern and YOU guess wrong on purpose.</li></ul></div>
  <div class="tc-hunt"><h3>Shape hunt walk</h3><ul class="lesson-prompts"><li>One walk, one shape: find five circles outside (wheels, signs, puddles).</li><li>Two shapes on the way home if the energy is still there.</li></ul></div>
  <p class="lesson-note">Stay close, keep it playful, stop while it is still fun. There is nothing to finish here.</p>
 </section>
 <section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2>
  <p class="lesson-copy">At four, matching and sorting games are thinking games in disguise: each tap asks your child to notice, compare, predict and commit. The adventures never punish a wrong tap — they answer with a hint, because the habit we are building is trying again, not being right first time. Pattern play is rhythm play: say the pattern out loud together and the taps take care of themselves.</p>
  <p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p>
 </section>
 <section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>Wonderful shape work!</h2>
  <p class="lesson-copy">Whether you met three shapes or played six adventures, that was the whole class — and stopping early is always allowed. The shelf will be right here whenever you return.</p>
  <div class="hero-actions"><a class="button" href="${SHAPE_LIB_PATH}">Play more Shape Adventures <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="${C26_PATH}">Next class: Colors, Mixing &amp; Creativity <span aria-hidden="true">→</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
 </section>`;
}

/* ---------- Class 26 ---------- */
export function class26Body(){
 const mixRounds=[
  {say:'Red paint + yellow paint makes…?',choices:[['Orange',true],['Green',false],['Purple',false]]},
  {say:'Yellow paint + blue paint makes…?',choices:[['Purple',false],['Green',true],['Orange',false]]},
  {say:'Blue paint + red paint makes…?',choices:[['Green',false],['Orange',false],['Purple',true]]}
 ];
 const featured=[colorCreativities[1],colorCreativities[0],colorCreativities[2],colorCreativities[14],colorCreativities[16],colorCreativities[17]];
 return `${crumbNav([['Preschool','/preschool/'],['Age 4',HUB],['Colors, Mixing &amp; Creativity']])}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">
  <span class="eyebrow">CLASS 26 · PRESCHOOL AGE 4</span>
  <h1>Colors, Mixing &amp; Creativity</h1>
  ${chips([['Age','4 Years'],['Class','26 of 27'],['Activities','18 studios'],['Subjects','Colors · mixing · making']])}
  <p class="lesson-lede">This class turns colors from names into materials: paints that really mix, outlines that really fill, decorations that really move. The Colors &amp; Creativity studio next door holds eighteen real activities — from a chameleon that changes color to a free splatter canvas.</p>
  <p class="lesson-lede">Creative choices are never graded here. The only goal is the joy of making — and a little true color science along the way.</p>
  <div class="lesson-start"><a class="button" href="#todays-class">Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Fingers, styluses and mice all work. Aprons optional on screen.</span></div>
 </div></article>
 <section class="wrap lesson-section" id="todays-class" aria-label="Today’s class">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>How today’s class works.</h2>
  <p class="lesson-copy">Five little steps: a color review, the great mixing quiz, three real studios to try, the off-screen paint ideas, and the warm goodbye. Any order suits.</p>
  <ol class="tc-flow">
   <li><span>1</span> Color review</li>
   <li><span>2</span> The mixing quiz</li>
   <li><span>3</span> Try three studios</li>
   <li><span>4</span> Off-screen paint play</li>
   <li><span>5</span> Class complete</li>
  </ol>
 </section>
 <section class="wrap lesson-section" id="color-review" aria-label="Color review">
  <span class="eyebrow">LEARN · COLOR REVIEW</span>
  <h2>Eight colors, big and bold.</h2>
  <p class="lesson-copy">Name each color together, then hunt for it in the room — “point at something red!” Color names stick fastest when they hop off the screen onto real things.</p>
  <div class="cc-swatch-row" role="list">${[['#e04b3f','red'],['#f07f28','orange'],['#f5c531','yellow'],['#4a9e4f','green'],['#3fb8af','teal'],['#5aa7d6','blue'],['#8f4fc0','purple'],['#f28ab5','pink']].map(([c,n])=>`<span class="cc-swatch" role="listitem" style="--pc:${c}"><small>${n}</small></span>`).join('')}</div>
 </section>
 <section class="wrap lesson-section tc-game" id="mixing-quiz" aria-label="The mixing quiz" data-tc-correct="Real mixing — that’s it!|The paint pot agrees!" data-tc-incorrect="Almost! Try the pot in the studio and see.">
  <span class="eyebrow">PLAY · THE MIXING QUIZ</span>
  <h2>What do the paints make?</h2>
  <p class="lesson-copy">Three true mixtures, the same ones the Rainbow Paint Laboratory teaches. Guess together first, then go and prove it in the studio.</p>
  ${mixRounds.map(r=>`<div class="tc-round" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${r.choices.map(([t,ok])=>`<button type="button" class="tc-choice"${ok?' data-tc-correct="true"':''}>${t}</button>`).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('')}
  <div class="lesson-linkrow"><a class="lesson-pill-link" href="${COLOR_LIB_PATH}rainbow-paint-laboratory/">Prove it in the Rainbow Paint Laboratory <span aria-hidden="true">↗</span></a></div>
 </section>
 <section class="wrap lesson-section" id="studios" aria-label="Try three studios">
  <span class="eyebrow">PLAY · TRY THREE STUDIOS</span>
  <h2>Eighteen studios, start anywhere.</h2>
  <p class="lesson-copy">Every card below is a real activity: tap-to-fill coloring with outlines that stay, movable decorations, true paint mixing, a rainbow built in order and a free splatter canvas. Finished artwork saves to the child’s own My Classroom desk.</p>
  ${adventuresGrid(featured,COLOR_BASE,'data-c26-card')}
  <div class="lesson-linkrow"><a class="lesson-pill-link" href="${COLOR_LIB_PATH}">Open the whole Colors &amp; Creativity Library <span aria-hidden="true">↗</span></a></div>
 </section>
 <section class="wrap lesson-section" id="off-screen" aria-label="Off-screen paint play">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>Real paint, real mixing.</h2>
  <div class="tc-hunt"><h3>Two-pot magic</h3><ul class="lesson-prompts"><li>Two jars of water and food coloring: red + yellow, then yellow + blue, then blue + red.</li><li>Let your child predict before every pour — guessing is the fun part.</li></ul></div>
  <div class="tc-hunt"><h3>Water painting</h3><ul class="lesson-prompts"><li>A bucket of water and a big brush: paint the fence, the wall, the patio.</li><li>Big arm movements — exactly the muscles this class has been training.</li></ul></div>
  <div class="tc-hunt"><h3>Color of the day</h3><ul class="lesson-prompts"><li>Pick one color each morning and count how many times it appears before lunch.</li></ul></div>
  <p class="lesson-note">Mess is part of the curriculum. Smocks on, and enjoy it.</p>
 </section>
 <section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2>
  <p class="lesson-copy">Nothing in this class is graded on purpose. Free creative choices build something quizzes cannot: the confidence to decide, try, undo and decide again. The mixing activities are honest — red and yellow really do make orange on screen, just as they do at the kitchen table — so the science and the play reinforce each other. Save the artwork your child is proud of; pride is the best marker of progress at four.</p>
  <p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p>
 </section>
 <section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>What a colorful class!</h2>
  <p class="lesson-copy">Three studios tried, three mixtures guessed — or simply one glorious chameleon. That was the class. The studio is always open.</p>
  <div class="hero-actions"><a class="button" href="${COLOR_LIB_PATH}">Play more in the Colors Studio <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="${C27_PATH}">Next class: Early Writing &amp; Pencil Control <span aria-hidden="true">→</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
 </section>`;
}

/* ---------- Class 27 ---------- */
export function class27Body(){
 const strokeRounds=[
  {say:'Which line is straight as a soldier?',choices:[['|',true],['~',false],['S',false]],labels:['Straight','Wavy','Curvy']},
  {say:'Which one is a circle — all the way around?',choices:[['O',true],['C',false],['L',false]],labels:['Circle','Open curve','Corner line']}
 ];
 const groups=GROUP_NAMES.map((name,gi)=>({name,items:writingAdventures.filter(a=>a.group===gi)}));
 return `${crumbNav([['Preschool','/preschool/'],['Age 4',HUB],['Early Writing &amp; Pencil Control']])}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">
  <span class="eyebrow">CLASS 27 · PRESCHOOL AGE 4</span>
  <h1>Early Writing &amp; Pencil Control</h1>
  ${chips([['Age','4 Years'],['Class','27 of 27'],['Adventures','30 tracing games'],['Subjects','Strokes · paths · shapes']])}
  <p class="lesson-lede">Before letters come strokes: the winding path, the loop, the wave, the zigzag, the spiral, the careful corner. This class builds them all with thirty real on-screen tracing adventures — played with a finger on a phone, a stylus on a tablet, or a mouse on a laptop.</p>
  <p class="lesson-lede">The tracing engine asks for honest effort, never perfection: guides reward generous coverage, completed lines turn into your child’s own pencil color, and every page prints a worksheet for away-from-screen practice.</p>
  <div class="lesson-start"><a class="button" href="#todays-class">Start Today’s Class <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">The library keeps every adventure and your child’s progress in one place.</span></div>
 </div></article>
 <section class="wrap lesson-section" id="todays-class" aria-label="Today’s class">
  <span class="eyebrow">TODAY’S CLASS</span>
  <h2>How today’s class works.</h2>
  <p class="lesson-copy">Four little steps: a stroke warm-up, a quick line quiz, one or two adventures from each of the five shelves below, and the goodbye. Two or three adventures is a full session — the shelf keeps track of what is done.</p>
  <ol class="tc-flow">
   <li><span>1</span> Stroke warm-up</li>
   <li><span>2</span> The line quiz</li>
   <li><span>3</span> The five adventure shelves</li>
   <li><span>4</span> Class complete</li>
  </ol>
 </section>
 <section class="wrap lesson-section" id="warmup" aria-label="Stroke warm-up">
  <span class="eyebrow">LEARN · STROKE WARM-UP</span>
  <h2>Five strokes every writer needs.</h2>
  <p class="lesson-copy">Trace each one in the air, big as a window: the tall line down, the flat line across, the circle around, the zigzag, and the wave. Say the movement out loud — “down… across… around!” — the voice leads the hand.</p>
  <div class="wa-stroke-row" role="list">
   <span class="wa-stroke" role="listitem"><svg viewBox="0 0 60 100" aria-hidden="true"><path d="M30,10 L30,90" fill="none" stroke="#3a3350" stroke-width="8" stroke-linecap="round"/></svg><small>Tall down</small></span>
   <span class="wa-stroke" role="listitem"><svg viewBox="0 0 100 60" aria-hidden="true"><path d="M10,30 L90,30" fill="none" stroke="#3a3350" stroke-width="8" stroke-linecap="round"/></svg><small>Flat across</small></span>
   <span class="wa-stroke" role="listitem"><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="28" fill="none" stroke="#3a3350" stroke-width="8"/></svg><small>Circle</small></span>
   <span class="wa-stroke" role="listitem"><svg viewBox="0 0 100 60" aria-hidden="true"><path d="M10,45 L30,15 L50,45 L70,15 L90,45" fill="none" stroke="#3a3350" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg><small>Zigzag</small></span>
   <span class="wa-stroke" role="listitem"><svg viewBox="0 0 100 60" aria-hidden="true"><path d="M8,30 q10,-22 21,0 q10,22 21,0 q10,-22 21,0 q10,22 21,0" fill="none" stroke="#3a3350" stroke-width="8" stroke-linecap="round"/></svg><small>Wave</small></span>
  </div>
 </section>
 <section class="wrap lesson-section tc-game" id="line-quiz" aria-label="The line quiz" data-tc-correct="That’s the one!|Line spotted!" data-tc-incorrect="Look again — trace the choices in the air.">
  <span class="eyebrow">PLAY · THE LINE QUIZ</span>
  <h2>Which line is which?</h2>
  ${strokeRounds.map(r=>`<div class="tc-round" data-tc-round data-tc-ask="${esc(r.say)}"><p class="tc-ask">${r.say}</p><div class="tc-choices" role="group" aria-label="${esc(r.say)}">${r.choices.map(([t,ok],i)=>`<button type="button" class="tc-choice tc-choice-line"${ok?' data-tc-correct="true"':''} aria-label="${r.labels?r.labels[i]:t}"><strong aria-hidden="true">${t}</strong>${r.labels?`<small>${r.labels[i]}</small>`:''}</button>`).join('')}</div><p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p></div>`).join('')}
 </section>
 <section class="wrap lesson-section" id="shelves" aria-label="The five adventure shelves">
  <span class="eyebrow">PLAY · THE FIVE ADVENTURE SHELVES</span>
  <h2>Thirty adventures, five shelves.</h2>
  <p class="lesson-copy">The Writing Adventures library organizes the thirty games into five shelves, each one a stage of pencil control. Continue where you left off — opened and completed adventures are remembered for the selected child.</p>
  ${groups.map((g,i)=>`<div class="wa-shelf"><h3>${i+1}. ${g.name}</h3><div class="lesson-linkrow wa-shelf-links">${g.items.map(a=>`<a class="lesson-pill-link" href="${WRITING_LIB_PATH}${a.slug}/">${a.num}. ${esc(a.title)}</a>`).join('')}</div></div>`).join('')}
  <div class="lesson-linkrow"><a class="lesson-pill-link" href="${WRITING_LIB_PATH}">Open the illustrated Writing Adventures Library <span aria-hidden="true">↗</span></a></div>
 </section>
 <section class="wrap lesson-section" id="off-screen" aria-label="Off-screen pencil play">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>Pencil play away from the screen.</h2>
  <div class="tc-hunt"><h3>Rainbow roads</h3><ul class="lesson-prompts"><li>Draw one big looping road on paper; your child drives a toy car along it slowly, then fast.</li><li>Roads are strokes in disguise — the car keeps them on the line.</li></ul></div>
  <div class="tc-hunt"><h3>Dot-to-dot by hand</h3><ul class="lesson-prompts"><li>Draw numbered dots in a circle; your child connects 1-2-3 with a pencil.</li><li>Then swap roles — you connect, they call the numbers.</li></ul></div>
  <div class="tc-hunt"><h3>Maze on a napkin</h3><ul class="lesson-prompts"><li>Scribble a quick maze; one steady line from entrance to snack.</li><li>Hand-drawn mazes are treasure — the wobblier the better.</li></ul></div>
  <p class="lesson-note">Chunky crayons and little triangular pencils suit four-year-old hands best. Ten happy minutes is a full lesson.</p>
 </section>
 <section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2>
  <p class="lesson-copy">Handwriting begins in the shoulder, not the fingers: big sweeping arm movements come first, and that is exactly what these tracing adventures ask for. The engine celebrates generous coverage rather than perfection because at four, confidence and rhythm matter more than neatness — neatness arrives on its own once the movement is easy. Keep sessions short, celebrate every completed guide, and let the printed worksheets carry the practice to the kitchen table.</p>
  <p class="lesson-copy"><a href="/about/#principal">More from the Principal’s Office <span aria-hidden="true">↗</span></a></p>
 </section>
 <section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>Strong strokes, steady hands!</h2>
  <p class="lesson-copy">One adventure or ten, every traced line is a real step toward writing. The shelf remembers exactly where you left off.</p>
  <div class="hero-actions"><a class="button" href="${WRITING_LIB_PATH}">Play more Writing Adventures <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">↗</span></a></div>
 </section>`;
}
