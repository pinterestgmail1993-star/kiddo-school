// Kiddo School — Look & Draw — Magic Shapes (Age 3 interactive activity).
// /preschool/3-years/magic-shape-builder/ — the URL is permanent; the old
// shape-placement puzzle is gone. This is now a free drawing activity built
// on the same five owner-uploaded reference illustrations in
// school/interactive-activities/magic-shape-builder-age-3/ (all probed
// 1080×1080) plus the cover. Each round shows the reference picture beside
// a large blank WHITE canvas: children draw freely with finger, mouse or
// stylus (HTML Canvas + Pointer Events), with six big color buttons, three
// brush sizes, Eraser, Undo, Clear and Save Drawing. Drawings stay per
// picture while the page is open. "Show me how" gives simple spoken/written
// steps — never overlays, never auto-correct. A parent prompt asks
// "Can you find the shapes in your drawing?" Save downloads ONLY the
// child's own canvas, never the reference image. No grading, no scores, no
// timers, no shape detection. Without JavaScript the references and written
// steps still show — draw on real paper instead.
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='school/interactive-activities/magic-shape-builder-age-3/';
const W=1080,H=1080;

/* The six big colors (school palette), the three brush sizes, and the five
   reference pictures with their simple how-to steps. */
const COLORS=[['red','#e04b3f'],['yellow','#f5c531'],['blue','#5aa7d6'],['green','#4a9e4f'],['orange','#f07f28'],['purple','#8f4fc0']];
const SIZES=[[1,'Thin'],[2,'Medium'],[3,'Thick']];

const DESIGNS=[
 {slug:'house',file:'01-shape-house.webp',name:'House',next:'tree',
  find:'A square wall, a triangle roof and a rectangle door.',
  steps:['A house is a square with a triangle on top.',
   'Draw a big square in the middle of your page.',
   'Draw a triangle sitting on top — that is the roof.',
   'Add a small rectangle at the bottom for the door.',
   'Draw a little square window, and anything else your house needs.']},
 {slug:'tree',file:'03-shape-tree.webp',name:'Tree',next:'rocket',
  find:'Circles of leaves and a rectangle trunk.',
  steps:['A tree is circles above a rectangle.',
   'Draw a tall rectangle for the trunk.',
   'Draw three big circles on top for the leaves.',
   'Add apples, birds or a swing — it is your tree.']},
 {slug:'rocket',file:'02-shape-rocket.webp',name:'Rocket',next:'robot',
  find:'A rectangle body, a triangle nose, a round window and two fins.',
  steps:['A rocket flies up, up, up!',
   'Draw a tall rectangle for the body.',
   'Draw a triangle on top for the nose.',
   'Add a circle in the middle for the window.',
   'Draw two triangles at the bottom for fins, and flames below.']},
 {slug:'robot',file:'04-shape-robot.webp',name:'Robot',next:'butterfly',
  find:'Squares, circles, rectangles and triangles — a whole shape family.',
  steps:['A robot is built from shapes, just like yours.',
   'Draw a square for the head. Add two circle eyes and a smile.',
   'Draw a bigger square below for the body. Add a round button.',
   'Draw two rectangles for the legs.',
   'Add triangle feet — and arms if your robot needs them.']},
 {slug:'butterfly',file:'05-shape-butterfly.webp',name:'Butterfly',next:'house',
  find:'Oval wings, a circle head and a long oval body.',
  steps:['A butterfly has wings on both sides.',
   'Draw a long oval in the middle for the body.',
   'Draw a circle on top for the head.',
   'Draw two big ovals on each side for the wings.',
   'Add dots, lines and flowers — butterflies love flowers.']}
];

const crumbLast='Look & Draw — Magic Shapes';

export const magicShape={
 path:'/preschool/3-years/magic-shape-builder/',
 seoTitle:'Look & Draw — Magic Shapes — a Drawing Activity for 3 Year Olds',
 h1:'Look & Draw — Magic Shapes',
 description:'Look at a house, a tree, a rocket, a robot or a butterfly, then draw your own on a big white canvas with six big colors, easy tools and gentle "Show me how" steps. A calm draw-together activity for 3-year-olds.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 3 MAGIC ACTIVITY',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Shapes & Patterns','/preschool/3-years/shapes-and-patterns/'],['Look & Draw — Magic Shapes',null]],
 ogImage:R2+P+'06-magic-shape-builder-cover.webp',
 ogAlt:'Cover of Look & Draw — Magic Shapes: a house, rocket, tree, robot and butterfly built from colorful shapes',
 classPath:'/preschool/3-years/shapes-and-patterns/',
 classTitle:'Shapes &amp; Patterns'
};

function toolBar(){
 return `<div class="ld-tools" role="toolbar" aria-label="Drawing tools">
   ${COLORS.map(([n,hex])=>`<button type="button" class="ld-color" data-ld-color="${hex}" data-ld-color-name="${n}" aria-pressed="false" aria-label="${n} color" style="--lc:${hex}"><span aria-hidden="true"></span></button>`).join('')}
   <span class="ld-sep" aria-hidden="true"></span>
   ${SIZES.map(([v,n])=>`<button type="button" class="ld-size" data-ld-size="${v}" aria-pressed="false" aria-label="${n} brush"><i aria-hidden="true" data-ld-dot="${v}"></i></button>`).join('')}
   <span class="ld-sep" aria-hidden="true"></span>
   <button type="button" class="ld-tool" data-ld-eraser aria-pressed="false">Eraser</button>
   <button type="button" class="ld-tool" data-ld-undo>Undo</button>
   <button type="button" class="ld-tool" data-ld-clear>Clear</button>
   <button type="button" class="ld-tool" data-ld-save>Save Drawing</button>
  </div>`;
}

export function magicShapeBody(G){
 const hero=`<section class="wrap section compact">
  <span class="eyebrow">${G.eyebrow}</span>
  <h1>${G.h1}</h1>
  <p class="mw-lede">Look at a picture, then draw your own — right on the page. A house, a tree, a rocket, a robot and a butterfly are waiting, each with simple "Show me how" steps. Six big colors, an eraser, undo, and a Save button for your very own artwork. Grown-ups stay close; little artists lead.</p>
  <div class="mg-game" data-mg-game="look-draw">
   <p class="mg-live" data-mg-live aria-live="polite"></p>
   <div class="mg-screens">`;

 const welcome=`<section class="mg-screen" data-mg-screen="welcome" aria-label="Welcome to Look and Draw">
   <figure class="mg-cover"><img src="${R2+P}06-magic-shape-builder-cover.webp" width="${W}" height="${H}" alt="The Look and Draw cover: a house, rocket, tree, robot and butterfly built from colorful shapes" fetchpriority="high"><figcaption class="fc-hint">Welcome, little artist!</figcaption></figure>
   <div class="mg-actions" style="justify-content:center"><button type="button" class="button" data-mg-go="choose">Start Drawing <span aria-hidden="true">↗</span></button></div>
   <p class="mg-hint" style="text-align:center">No scores, no timers — just you, the shapes and your drawing. Your drawings stay on this page until you close it, and Save keeps one forever.</p>
  </section>`;

 const choose=`<section class="mg-screen" data-mg-screen="choose" aria-label="Choose a picture">
   <span class="eyebrow">CHOOSE A PICTURE</span>
   <h2>What shall we draw first?</h2>
   <p class="lesson-copy">Pick a picture, look closely at it, then draw your own on the big white canvas. Your drawing waits for you if you switch pictures — and you can start over any time.</p>
   <div class="mg-tiles ld-choose">${DESIGNS.map(d=>`<button type="button" class="mg-tile ld-choose-tile" data-mg-go="draw-${d.slug}" aria-label="Draw the ${d.name.toLowerCase()} — ${d.find}"><img src="${R2+P}${d.file}" width="${W}" height="${H}" alt="Reference picture of the ${d.name.toLowerCase()}: ${d.find}" loading="lazy"><span class="mg-tile-word">${d.name}</span><span class="ld-tile-sub">${d.find}</span></button>`).join('')}</div>
   <p class="mg-hint" data-ld-choose-note>Drawings you have already made stay saved while this page is open — switching pictures never erases them.</p>
  </section>`;

 const draws=DESIGNS.map(d=>{
  return `<section class="mg-screen" data-mg-screen="draw-${d.slug}" aria-label="Draw the ${d.name.toLowerCase()}">
   <span class="eyebrow">LOOK &amp; DRAW · THE ${d.name.toUpperCase()}</span>
   <h2>Draw the ${d.name.toLowerCase()}.</h2>
   <p class="lesson-copy">Look at the picture: ${d.find} Now draw your own on the big white canvas. Every drawing is right — this is your artwork.</p>
   <div class="ld-layout" data-ld-draw="${d.slug}">
    <figure class="ld-ref">
     <img src="${R2+P}${d.file}" width="${W}" height="${H}" alt="Reference picture of the ${d.name.toLowerCase()}: ${d.find}" loading="lazy">
     <figcaption>Look at this — then draw your own.</figcaption>
     <button type="button" class="ld-tool ld-how" data-ld-how aria-expanded="false" hidden>Show me how <span aria-hidden="true">▾</span></button>
     <ol class="ld-steps" data-ld-steps>
      ${d.steps.map(s=>`<li>${s}</li>`).join('')}
     </ol>
    </figure>
    <div class="ld-playcol">
     <div class="ld-canvas-wrap">
      <canvas data-ld-canvas width="900" height="900" role="img" aria-label="Your ${d.name.toLowerCase()} drawing on a white canvas. Use the color, brush and eraser buttons to draw."></canvas>
     </div>
     ${toolBar()}
     <p class="ld-status" data-ld-status aria-live="polite">Pick a color, then draw with your finger, mouse or stylus.</p>
     <p class="ld-parent">For grown-ups: ask your artist — “Can you find the shapes in your drawing?”</p>
     <div class="mg-actions">
      <button type="button" class="button button-ghost" data-mg-go="choose">Choose another picture <span aria-hidden="true">↺</span></button>
      <button type="button" class="button" data-mg-go="draw-${d.next}">Next picture: the ${DESIGNS.find(x=>x.slug===d.next).name.toLowerCase()} <span aria-hidden="true">→</span></button>
     </div>
    </div>
   </div>
  </section>`;
 }).join('\n');

 const offscreen=`<section class="mg-screen" data-mg-screen="offscreen" aria-label="Off-screen drawing play">
   <span class="eyebrow">OFF-SCREEN PLAY</span>
   <h2>Shapes you can draw anywhere.</h2>
   <p class="lesson-copy">The best drawing table costs nothing. Pick one of these and let your child lead — the shapes do the teaching all by themselves.</p>
   <div class="tc-hunt"><h3>Big paper, big shapes</h3><ul class="lesson-prompts"><li>Tape a big sheet of paper to the table and draw the house together with crayons — triangle roof, square wall, rectangle door. Say each shape name out loud as you draw it.</li></ul></div>
   <div class="tc-hunt"><h3>Chalk shapes outside</h3><ul class="lesson-prompts"><li>Draw giant shapes on the pavement with chalk, then walk, hop or jump along the outline of each one. Big movements make shape words stick.</li></ul></div>
   <div class="tc-hunt"><h3>Draw what you see</h3><ul class="lesson-prompts"><li>Hunt the house for circles, squares, triangles and rectangles — a plate, a book, a slice of toast — and draw the best ones in your own shape museum.</li></ul></div>
   <p class="lesson-note"><strong>One safety word for this game:</strong> chunky crayons and washable chalk only, and grown-ups handle any sticky tape. Keep pencils away from little mouths — artists this age still explore with them.</p>
   <div class="mg-next"><button type="button" class="button" data-mg-go="complete">Finish the Magic <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const complete=`<section class="mg-screen" data-mg-screen="complete" aria-label="Activity complete">
   <span class="eyebrow">ACTIVITY COMPLETE</span>
   <h2>Shapes everywhere you look!</h2>
   <p class="lesson-copy">Circles, squares, triangles, rectangles and ovals are now things your child draws on purpose — on the canvas, on paper and in the pavement. Whether you drew one picture or all five, that was real shape practice, and every drawing was already right.</p>
   <div class="mg-actions"><button type="button" class="button" data-mg-replay>Play Again <span aria-hidden="true">↺</span></button><a class="button button-ghost" href="${G.classPath}">Back to Shapes &amp; Patterns <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/my-classroom/">My Classroom <span aria-hidden="true">↗</span></a></div>
   <div class="lesson-path">
    <a class="fc-stage lesson-card-link" href="${G.classPath}"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Class 3</span></div><h3>Shapes &amp; Patterns</h3><p>The full class: twelve shape cards, find-the-shape, match shapes and complete-a-pattern games.</p><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a>
    <a class="fc-stage lesson-card-link" href="/preschool/3-years/"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Magic games</span></div><h3>More magic games</h3><p>Try Magic Fruit Basket, Magic Color Lab or Animal Sound Safari — every Age 3 game lives on the stage shelf.</p><span class="fc-open">Choose another game <span aria-hidden="true">↗</span></span></a>
   </div>
  </section>`;

 return `${hero}
${welcome}
${choose}
${draws}
${offscreen}
${complete}
   </div>
   <noscript><p class="fc-hint">No JavaScript? The five reference pictures and their step lists are right here — read the steps together, name the shapes, and draw the pictures on real paper. The drawing canvas and its tools need JavaScript.</p></noscript>
  </div>
 </section>
 <section class="wrap lesson-section" id="for-grown-ups" aria-label="About this activity">
  <span class="eyebrow">FOR GROWN-UPS</span>
  <h2>How drawing teaches shapes.</h2>
  <p class="lesson-copy">This activity deliberately has no wrong answers. The reference picture stays beside the canvas so your child can look back and forth — noticing that a roof is a triangle or a wheel is a circle is the whole lesson, and it happens inside ordinary drawing. "Show me how" reads a few short steps aloud and shows them as plain text you can follow together; nothing is ever drawn for your child and nothing is graded.</p>
  <p class="lesson-copy">The tools are honest: six colors, three brush sizes, a real eraser, undo for oops-moments, clear for fresh starts, and Save — which downloads your child&rsquo;s own canvas only, never the reference picture. Drawings for each picture stay while the page stays open, so switching to the rocket and back will not erase the house. Nothing is uploaded anywhere, and closing the tab lets the gallery go — that is what Save is for.</p>
  <p class="lesson-note">Works with finger, mouse or stylus on phones, tablets and desktops. The Calm Mode toggle in the footer (or your device&rsquo;s reduced-motion setting) stills every animation while drawing, tools and steps keep working.</p>
 </section>`;
}
