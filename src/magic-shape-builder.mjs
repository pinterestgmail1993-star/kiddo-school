// Kiddo School — Magic Shape Builder (Age 3 interactive game).
// /preschool/3-years/magic-shape-builder/ — built on the six owner-uploaded
// WebP illustrations in school/interactive-activities/magic-shape-builder-age-3/
// (all probed 1080×1080): the five shape designs (house, rocket, tree,
// robot, butterfly) are the REFERENCE pictures, and the cover fronts the
// welcome screen. The building pieces are CSS/SVG shapes — no Canva
// images. Every design is genuinely playable: each board server-renders
// dashed SLOT outlines positioned to match the reference, the tray holds
// the matching shape pieces, and magic-shape-builder.js runs tap-to-place
// (pick a piece, tap its spot), gentle hints, and completion detection.
// Without JavaScript the boards render as honest shape pictures with their
// piece lists (a pointing game), and the noscript note says so. No scores,
// no timers, no streaks, no download buttons for the game assets.
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='school/interactive-activities/magic-shape-builder-age-3/';
const W=1080,H=1080;

const C={red:'#e04b3f',yellow:'#f5c531',blue:'#5aa7d6',green:'#4a9e4f',brown:'#b0713c',orange:'#f07f28',purple:'#8f4fc0',pink:'#f28ab8',teal:'#35b8b0'};
const WORD={circle:'circle',square:'square',rectangle:'rectangle',triangle:'triangle',oval:'oval'};
const COLORS={red:'red',yellow:'yellow',blue:'blue',green:'green',brown:'brown',orange:'orange',purple:'purple',pink:'pink',teal:'teal'};

/* Slot layouts are positioned to match the real reference illustrations:
   house = red triangle roof + yellow square wall + blue circle window +
   green rectangle door; rocket = red triangle nose + blue square body +
   yellow circle window + two green triangle fins + orange oval flame;
   tree = three green circles + brown rectangle trunk; robot = blue square
   head + yellow square body + green circle + two green rectangles (legs) +
   two red triangles (feet); butterfly = yellow circle head + teal oval
   body + two pink ovals (wings) + two orange triangles (lower wings). */
const DESIGNS=[
 {slug:'house',file:'01-shape-house.webp',name:'House',blurb:'A red roof, a yellow wall, a round window and a green door.',
  slots:[
   {shape:'triangle',color:C.red,x:15,y:5,w:70,h:45},
   {shape:'square',color:C.yellow,x:27,y:50,w:46,h:46},
   {shape:'circle',color:C.blue,x:40.5,y:55,w:17,h:17},
   {shape:'rectangle',color:C.green,x:45.5,y:74,w:11,h:22}]},
 {slug:'rocket',file:'02-shape-rocket.webp',name:'Rocket',blurb:'A triangle nose, a square body, a round window, two fins and a fiery flame.',
  slots:[
   {shape:'triangle',color:C.red,x:35,y:3,w:30,h:30},
   {shape:'square',color:C.blue,x:33,y:33,w:34,h:34},
   {shape:'circle',color:C.yellow,x:42,y:40,w:16,h:16},
   {shape:'triangle',color:C.green,x:12,y:60,w:21,h:22},
   {shape:'triangle',color:C.green,x:67,y:60,w:21,h:22},
   {shape:'oval',color:C.orange,x:43,y:72,w:14,h:24}]},
 {slug:'tree',file:'03-shape-tree.webp',name:'Tree',blurb:'Three round green circles and one brown trunk.',
  slots:[
   {shape:'circle',color:C.green,x:32,y:4,w:36,h:36},
   {shape:'circle',color:C.green,x:10,y:32,w:36,h:36},
   {shape:'circle',color:C.green,x:54,y:32,w:36,h:36},
   {shape:'rectangle',color:C.brown,x:40,y:62,w:20,h:34}]},
 {slug:'robot',file:'04-shape-robot.webp',name:'Robot',blurb:'A square head and body, a round belly, two legs and two triangle feet.',
  slots:[
   {shape:'square',color:C.blue,x:33,y:6,w:34,h:34},
   {shape:'square',color:C.yellow,x:32,y:44,w:36,h:36},
   {shape:'circle',color:C.green,x:43,y:55,w:14,h:14},
   {shape:'rectangle',color:C.green,x:37,y:80,w:9,h:14},
   {shape:'rectangle',color:C.green,x:54,y:80,w:9,h:14},
   {shape:'triangle',color:C.red,x:33,y:90,w:14,h:8},
   {shape:'triangle',color:C.red,x:53,y:90,w:14,h:8}]},
 {slug:'butterfly',file:'05-shape-butterfly.webp',name:'Butterfly',blurb:'A round head, an oval body, two big wings and two triangle wings.',
  slots:[
   {shape:'circle',color:C.yellow,x:44,y:12,w:14,h:14},
   {shape:'oval',color:C.teal,x:44.5,y:26,w:11,h:22},
   {shape:'oval',color:C.pink,x:8,y:22,w:34,h:24},
   {shape:'oval',color:C.pink,x:58,y:22,w:34,h:24},
   {shape:'triangle',color:C.orange,x:14,y:50,w:28,h:26},
   {shape:'triangle',color:C.orange,x:58,y:50,w:28,h:26}]}
];
const SLOT_SVG={
 circle:'<circle class="sb-shape" cx="50" cy="50" r="46"/>',
 square:'<rect class="sb-shape" x="6" y="6" width="88" height="88" rx="10"/>',
 rectangle:'<rect class="sb-shape" x="6" y="6" width="88" height="88" rx="10"/>',
 triangle:'<polygon class="sb-shape" points="50,6 94,94 6,94"/>',
 oval:'<ellipse class="sb-shape" cx="50" cy="50" rx="46" ry="46"/>'
};
const PIECE_SVG={
 circle:{vb:'0 0 100 100',body:'<circle cx="50" cy="50" r="46"/>'},
 square:{vb:'0 0 100 100',body:'<rect x="6" y="6" width="88" height="88" rx="10"/>'},
 rectangle:{vb:'0 0 150 100',body:'<rect x="8" y="14" width="134" height="72" rx="10"/>'},
 triangle:{vb:'0 0 100 100',body:'<polygon points="50,6 94,94 6,94"/>'},
 oval:{vb:'0 0 140 100',body:'<ellipse cx="70" cy="50" rx="62" ry="42"/>'}
};
const slotBtn=(d,s,i)=>`<button type="button" class="sb-slot" data-sb-slot="${s.shape}" data-sb-color="${s.color}" data-sb-slot-index="${i}" style="left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%" aria-label="A ${WORD[s.shape]} spot on the ${d.name.toLowerCase()}. Tap to place a ${WORD[s.shape]} here."><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">${SLOT_SVG[s.shape]}</svg><span class="sb-slot-word" aria-hidden="true">${WORD[s.shape]}</span></button>`;
const pieceBtn=d=>{const p=PIECE_SVG[d.shape];return `<button type="button" class="sb-piece" data-sb-piece="${d.shape}" aria-label="A ${COLORS[d.color]} ${WORD[d.shape]}. Tap me, then tap my spot on the board."><svg viewBox="${p.vb}" aria-hidden="true" focusable="false">${p.body.replace('/>',' fill="'+d.color+'" stroke="rgba(52,59,48,.75)" stroke-width="4" opacity="0.95"/>')}</svg><span>${WORD[d.shape]}</span></button>`;};

export const magicShape={
 path:'/preschool/3-years/magic-shape-builder/',
 seoTitle:'Magic Shape Builder — a Shape Game for 3 Year Olds',
 h1:'Magic Shape Builder',
 description:'Build a house, rocket, tree, robot and butterfly from circles, squares, rectangles, triangles and ovals: tap a shape, tap its spot and watch the picture come together. A gentle shape game for 3-year-olds.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 3 MAGIC GAME',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Shapes & Patterns','/preschool/3-years/shapes-and-patterns/'],['Magic Shape Builder',null]],
 ogImage:R2+P+'06-magic-shape-builder-cover.webp',
 ogAlt:'Cover of the Magic Shape Builder game: a house, rocket, tree, robot and butterfly built from colorful shapes',
 classPath:'/preschool/3-years/shapes-and-patterns/',
 classTitle:'Shapes &amp; Patterns'
};

export function magicShapeBody(G){
 const hero=`<section class="wrap section compact">
  <span class="eyebrow">${G.eyebrow}</span>
  <h1>${G.h1}</h1>
  <p class="mw-lede">Five pictures are built from shapes: a house, a rocket, a tree, a robot and a butterfly. Pick a picture, then tap the shapes into place — circle, square, triangle and friends. Grown-ups read the words; little ones do the building.</p>
  <div class="mg-game" data-mg-game="shape-builder">
   <p class="mg-live" data-mg-live aria-live="polite"></p>
   <div class="mg-screens">`;

 const welcome=`<section class="mg-screen" data-mg-screen="welcome" aria-label="Welcome to the Magic Shape Builder">
   <figure class="mg-cover"><img src="${R2+P}06-magic-shape-builder-cover.webp" width="${W}" height="${H}" alt="The Magic Shape Builder cover: colorful shape pictures waiting to be built" fetchpriority="high"><figcaption class="fc-hint">Welcome, little builder!</figcaption></figure>
   <div class="mg-actions" style="justify-content:center"><button type="button" class="button" data-mg-go="choose">Start Building <span aria-hidden="true">↗</span></button></div>
   <p class="mg-hint" style="text-align:center">No scores, no timers — just building.</p>
  </section>`;

 const choose=`<section class="mg-screen" data-mg-screen="choose" aria-label="Choose a design">
   <span class="eyebrow">STEP 2 · CHOOSE A DESIGN</span>
   <h2>What shall we build today?</h2>
   <p class="lesson-copy">Tap a picture to build it. You can build as many as you like — the shapes never run out.</p>
   <div class="mg-tiles">${DESIGNS.map(d=>`<button type="button" class="mg-tile" data-mg-go="build-${d.slug}" aria-label="Build the ${d.name.toLowerCase()}"><img src="${R2+P}${d.file}" width="${W}" height="${H}" alt="The ${d.name.toLowerCase()} design: ${d.blurb.toLowerCase()}" loading="lazy"><span class="mg-tile-word">${d.name}</span></button>`).join('')}</div>
  </section>`;

 const builds=DESIGNS.map(d=>{
  const pieces=[...d.slots].sort((a,b)=>(a.shape>b.shape?1:a.shape<b.shape?-1:0));
  return `<section class="mg-screen" data-mg-screen="build-${d.slug}" aria-label="Build the ${d.name.toLowerCase()}">
   <span class="eyebrow">BUILD · THE ${d.name.toUpperCase()}</span>
   <h2>Build the ${d.name.toLowerCase()}.</h2>
   <p class="lesson-copy">${d.blurb} Tap a shape in the tray, then tap its spot on the board.</p>
   <div class="sb-layout" data-sb-build="${d.slug}">
    <figure class="sb-refcard"><img src="${R2+P}${d.file}" width="${W}" height="${H}" alt="Reference picture of the ${d.name.toLowerCase()}: ${d.blurb.toLowerCase()}" loading="lazy"><figcaption>The picture you are building</figcaption></figure>
    <div>
     <div class="sb-board" data-sb-board>${d.slots.map((s,i)=>slotBtn(d,s,i)).join('')}</div>
     <div class="sb-tray" data-sb-tray role="group" aria-label="Shapes for the ${d.name.toLowerCase()}">${pieces.map(pieceBtn).join('')}</div>
     <p class="sb-status" data-sb-status aria-live="polite">Tap a shape below, then tap its spot.</p>
     <div class="mg-actions"><button type="button" class="button button-ghost" data-sb-reset>Start Over</button><button type="button" class="button" data-mg-go="choose" hidden>Build Another <span aria-hidden="true">↺</span></button></div>
    </div>
   </div>
  </section>`;
 }).join('\n');

 const offscreen=`<section class="mg-screen" data-mg-screen="offscreen" aria-label="Off-screen shape building">
   <span class="eyebrow">OFF-SCREEN PLAY</span>
   <h2>Shapes you can hold.</h2>
   <p class="lesson-copy">The best shape set costs nothing: cut, sort and stack with what you already have. Pick one of these and let your child lead.</p>
   <div class="tc-hunt"><h3>Paper shape cutouts</h3><ul class="lesson-prompts"><li>Cut circles, squares, triangles and rectangles from paper or old magazines — then rebuild the house or the rocket on the table, just like on the screen.</li></ul></div>
   <div class="tc-hunt"><h3>Household shape hunt</h3><ul class="lesson-prompts"><li>Build a picture from household objects: a plate circle, a book rectangle, a corner triangle. Photograph the result for your own art wall.</li></ul></div>
   <div class="tc-hunt"><h3>Snack shapes</h3><ul class="lesson-prompts"><li>Crackers, banana slices and cheese triangles are building materials too. Build, name each shape, then eat the architecture.</li></ul></div>
   <p class="lesson-note"><strong>One safety word for this game:</strong> grown-ups handle scissors for the cutouts, and snack builds use foods your child already eats safely — cut grapes small, and sit down together to build and munch.</p>
   <div class="mg-next"><button type="button" class="button" data-mg-go="complete">Finish the Magic <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const complete=`<section class="mg-screen" data-mg-screen="complete" aria-label="Activity complete">
   <span class="eyebrow">ACTIVITY COMPLETE</span>
   <h2>Shapes in all the right places!</h2>
   <p class="lesson-copy">Circles, squares, rectangles, triangles and ovals are now your child&rsquo;s building blocks — on the screen, on the table and around the house. Whether you built one design or all five, that was real shape practice, and there was never a score to worry about.</p>
   <div class="mg-actions"><button type="button" class="button" data-mg-replay>Play Again <span aria-hidden="true">↺</span></button><a class="button button-ghost" href="${G.classPath}">Back to Shapes &amp; Patterns <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/my-classroom/">My Classroom <span aria-hidden="true">↗</span></a></div>
   <div class="lesson-path">
    <a class="fc-stage lesson-card-link" href="${G.classPath}"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Class 3</span></div><h3>Shapes &amp; Patterns</h3><p>The full class: twelve shape cards, find-the-shape, match shapes and complete-a-pattern games.</p><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a>
    <a class="fc-stage lesson-card-link" href="/preschool/3-years/"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Magic games</span></div><h3>More magic games</h3><p>Try Magic Fruit Basket, Magic Color Mixing or Magic Animal Playground — every Age 3 game lives on the stage shelf.</p><span class="fc-open">Choose another game <span aria-hidden="true">↗</span></span></a>
   </div>
  </section>`;

 return `${hero}
${welcome}
${choose}
${builds}
${offscreen}
${complete}
   </div>
   <noscript><p class="fc-hint">No JavaScript? The five reference pictures are still here — point at the shapes together, name them, and build the real thing from paper cutouts. The tap-to-place board needs JavaScript.</p></noscript>
  </div>
 </section>
 <section class="wrap lesson-section" id="for-grown-ups" aria-label="About this game">
  <span class="eyebrow">FOR GROWN-UPS</span>
  <h2>How building teaches shapes.</h2>
  <p class="lesson-copy">Every board shows dashed outlines where each shape belongs, and the tray holds exactly the shapes the design needs. A shape only clicks into a spot that matches its form — a triangle will not fit a circle spot — so every placement is a small piece of real shape reasoning. After two misses the board gently pulses an empty spot that fits the shape in hand: a hint, never a correction.</p>
  <p class="lesson-copy">The reference picture stays beside the board on purpose: comparing the picture with the work-in-progress is the actual skill — looking carefully, checking, trying again. Naming each shape out loud when it lands (the game does it; so can you) is what turns play into vocabulary.</p>
  <p class="lesson-note">Tap-to-place works with mouse, touch and keyboard: pieces and spots are real buttons. And the paper-cutout version in Off-Screen Play is where the shapes become something your child can hold.</p>
 </section>`;
}
