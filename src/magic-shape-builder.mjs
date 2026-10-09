// Kiddo School — Magic Shape Builder (Age 3 interactive game), v2.
// /preschool/3-years/magic-shape-builder/ — rebuilt around the five
// owner-uploaded reference illustrations in
// school/interactive-activities/magic-shape-builder-age-3/ (all probed
// 1080×1080). Every board is a hand-defined, accurate shape layout of the
// SAME picture the reference shows — no generated outlines, no overlapping
// dashed borders. The board reveals ONE empty slot at a time (large, drawn
// in the piece's own color, with its shape word), the tray below holds big
// colorful pieces, and a piece only snaps into the slot that matches its
// shape AND color. Tap-to-place works with mouse, touch and keyboard (every
// piece and the current slot are real buttons) and pointer-drag is also
// supported. Difficulty climbs gently: house (3 pieces) → tree (4) →
// rocket (6) → butterfly (6) → robot (7); a design unlocks when the one
// before it is completed (remembered in localStorage — only which designs
// were built, never who built them). Without JavaScript each board renders
// as its finished shape picture beside the reference — a pointing game.
// No scores, no timers, no streaks, no download buttons.
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='school/interactive-activities/magic-shape-builder-age-3/';
const W=1080,H=1080;

const C={red:'#e04b3f',yellow:'#f5c531',blue:'#5aa7d6',green:'#4a9e4f',brown:'#b0713c',orange:'#f07f28',purple:'#8f4fc0',pink:'#f28ab8',teal:'#35b8b0'};
const WORD={circle:'circle',square:'square',rectangle:'rectangle',triangle:'triangle',oval:'oval'};
const CWORD=Object.fromEntries(Object.entries(C).map(([k,v])=>[v,k]));

/* Each slot: shape, color, and its true position on a 100×100 board,
   read off the real reference illustration. Placement order runs
   back-to-front so overlapped pieces land underneath correctly:
   the DOM order below is exactly the child's building order. */
const DESIGNS=[
 {slug:'house',file:'01-shape-house.webp',name:'House',pieces:3,
  blurb:'A red roof, a yellow wall and a green door. Three shapes — a good first build.',
  slots:[
   {shape:'square',color:C.yellow,x:18,y:34,w:64,h:60},
   {shape:'triangle',color:C.red,x:8,y:6,w:84,h:34},
   {shape:'rectangle',color:C.green,x:42,y:66,w:16,h:28}],
  tray:[2,0,1]},
 {slug:'tree',file:'03-shape-tree.webp',name:'Tree',pieces:4,
  blurb:'Three round green circles and one tall brown trunk.',
  slots:[
   {shape:'rectangle',color:C.brown,x:40,y:58,w:20,h:38},
   {shape:'circle',color:C.green,x:31,y:2,w:38,h:38},
   {shape:'circle',color:C.green,x:8,y:28,w:38,h:38},
   {shape:'circle',color:C.green,x:54,y:28,w:38,h:38}],
  tray:[1,3,0,2]},
 {slug:'rocket',file:'02-shape-rocket.webp',name:'Rocket',pieces:6,
  blurb:'Two green fins behind a blue body, a red nose, a round window and an orange flame.',
  slots:[
   {shape:'triangle',color:C.green,x:12,y:52,w:22,h:26},
   {shape:'triangle',color:C.green,x:66,y:52,w:22,h:26},
   {shape:'square',color:C.blue,x:32,y:30,w:36,h:44},
   {shape:'triangle',color:C.red,x:32,y:2,w:36,h:28},
   {shape:'circle',color:C.yellow,x:41,y:37,w:18,h:18},
   {shape:'oval',color:C.orange,x:41,y:76,w:18,h:20}],
  tray:[2,4,0,5,1,3]},
 {slug:'butterfly',file:'05-shape-butterfly.webp',name:'Butterfly',pieces:6,
  blurb:'Two big pink wings and two orange ones, a teal body and a yellow head.',
  slots:[
   {shape:'oval',color:C.pink,x:6,y:16,w:36,h:28},
   {shape:'oval',color:C.pink,x:58,y:16,w:36,h:28},
   {shape:'triangle',color:C.orange,x:12,y:46,w:26,h:24},
   {shape:'triangle',color:C.orange,x:62,y:46,w:26,h:24},
   {shape:'oval',color:C.teal,x:44,y:30,w:12,h:26},
   {shape:'circle',color:C.yellow,x:42,y:14,w:16,h:16}],
  tray:[4,0,2,5,1,3]},
 {slug:'robot',file:'04-shape-robot.webp',name:'Robot',pieces:7,
  blurb:'A blue square head, a yellow square body, a round belly, two legs and two triangle feet. The biggest build — you earn it.',
  slots:[
   {shape:'square',color:C.blue,x:32,y:4,w:36,h:34},
   {shape:'square',color:C.yellow,x:30,y:42,w:40,h:38},
   {shape:'circle',color:C.green,x:43,y:52,w:14,h:14},
   {shape:'rectangle',color:C.green,x:37,y:80,w:9,h:12},
   {shape:'rectangle',color:C.green,x:54,y:80,w:9,h:12},
   {shape:'triangle',color:C.red,x:31,y:89,w:16,h:9},
   {shape:'triangle',color:C.red,x:53,y:89,w:16,h:9}],
  tray:[1,3,0,5,2,4,6]}
];

/* Slot geometry drawn in a viewBox that matches the slot's own aspect, so
   squares are truly square, circles truly round and rectangles oblong —
   no preserveAspectRatio stretching anywhere. */
function slotSvg(s,extra=''){
 const vb=`0 0 ${s.w} ${s.h}`;
 let geo='';
 if(s.shape==='circle')geo=`<circle class="sb-geo" cx="${s.w/2}" cy="${s.h/2}" r="${Math.min(s.w,s.h)/2-1.5}" vector-effect="non-scaling-stroke"/>`;
 else if(s.shape==='oval')geo=`<ellipse class="sb-geo" cx="${s.w/2}" cy="${s.h/2}" rx="${s.w/2-1.5}" ry="${s.h/2-1.5}" vector-effect="non-scaling-stroke"/>`;
 else if(s.shape==='square')geo=`<rect class="sb-geo" x="1.5" y="1.5" width="${s.w-3}" height="${s.h-3}" rx="2" vector-effect="non-scaling-stroke"/>`;
 else if(s.shape==='rectangle')geo=`<rect class="sb-geo" x="1.5" y="1.5" width="${s.w-3}" height="${s.h-3}" rx="2" vector-effect="non-scaling-stroke"/>`;
 else if(s.shape==='triangle')geo=`<polygon class="sb-geo" points="${s.w/2},1.5 ${s.w-1.5},${s.h-1.5} 1.5,${s.h-1.5}" vector-effect="non-scaling-stroke"/>`;
 return `<svg viewBox="${vb}" preserveAspectRatio="none" aria-hidden="true" focusable="false" style="--sc:${s.color}">${geo}</svg>`;
}
const slotBox=(d,s,i)=>`<div class="sb-slotbox" data-sb-slot="${s.shape}" data-sb-color="${s.color}" data-sb-color-name="${CWORD[s.color]}" data-sb-index="${i}" style="left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%;--sc:${s.color}">${slotSvg(s)}<span class="sb-slot-word" aria-hidden="true">${WORD[s.shape]}</span></div>`;
const pieceBtn=(s,slug)=>{
 const vb=`0 0 100 100`;let geo='';
 if(s.shape==='circle')geo='<circle cx="50" cy="50" r="45"/>';
 else if(s.shape==='oval')geo='<ellipse cx="50" cy="50" rx="47" ry="35"/>';
 else if(s.shape==='square')geo='<rect x="6" y="6" width="88" height="88" rx="8"/>';
 else if(s.shape==='rectangle')geo='<rect x="4" y="20" width="92" height="60" rx="8"/>';
 else if(s.shape==='triangle')geo='<polygon points="50,6 94,94 6,94"/>';
 return `<button type="button" class="sb-piece" data-sb-piece="${s.shape}" data-sb-piece-color="${s.color}" data-sb-piece-color-name="${CWORD[s.color]}" aria-label="A ${CWORD[s.color]} ${WORD[s.shape]}. Tap me, then tap my spot on the board."><svg viewBox="${vb}" aria-hidden="true" focusable="false" style="--sc:${s.color}">${geo}</svg><span>${CWORD[s.color]} ${WORD[s.shape]}</span></button>`;
};

export const magicShape={
 path:'/preschool/3-years/magic-shape-builder/',
 seoTitle:'Magic Shape Builder — a Shape Game for 3 Year Olds',
 h1:'Magic Shape Builder',
 description:'Build a house, a tree, a rocket, a butterfly and a robot from big colorful shapes: tap a piece, tap its spot and watch the picture come together. A gentle shape game for 3-year-olds.',
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
  <p class="mw-lede">Five pictures are waiting to be built from shapes. Start with a three-shape house, then a tree, a rocket, a butterfly — and finally the big seven-shape robot. Tap a piece, tap its spot, and watch the picture appear. Grown-ups read the words; little ones do the building.</p>
  <div class="mg-game" data-mg-game="shape-builder">
   <p class="mg-live" data-mg-live aria-live="polite"></p>
   <div class="mg-screens">`;

 const welcome=`<section class="mg-screen" data-mg-screen="welcome" aria-label="Welcome to the Magic Shape Builder">
   <figure class="mg-cover"><img src="${R2+P}06-magic-shape-builder-cover.webp" width="${W}" height="${H}" alt="The Magic Shape Builder cover: colorful shape pictures waiting to be built" fetchpriority="high"><figcaption class="fc-hint">Welcome, little builder!</figcaption></figure>
   <div class="mg-actions" style="justify-content:center"><button type="button" class="button" data-mg-go="choose">Start Building <span aria-hidden="true">↗</span></button></div>
   <p class="mg-hint" style="text-align:center">No scores, no timers — just building.</p>
  </section>`;

 const choose=`<section class="mg-screen" data-mg-screen="choose" aria-label="Choose a design">
   <span class="eyebrow">CHOOSE A DESIGN</span>
   <h2>What shall we build first?</h2>
   <p class="lesson-copy">The house is the easiest — three shapes. Every picture you finish unlocks the next one. You can rebuild any picture as many times as you like.</p>
   <div class="mg-tiles sb-choose">${DESIGNS.map((d,i)=>{
     const prev=i===0?null:DESIGNS[i-1];
     return `<button type="button" class="mg-tile sb-choose-tile" data-mg-go="build-${d.slug}" data-sb-design="${d.slug}"${prev?` data-sb-requires="${prev.slug}" data-sb-requires-name="${prev.name}"`:''} aria-label="Build the ${d.name.toLowerCase()} — ${d.pieces} shapes${prev?`. Unlocks after the ${prev.name.toLowerCase()} is built.`:''}"><img src="${R2+P}${d.file}" width="${W}" height="${H}" alt="The ${d.name.toLowerCase()} design: ${d.blurb.toLowerCase()}" loading="lazy"><span class="mg-tile-word">${d.name}</span><span class="sb-tile-sub">${d.pieces} shapes${i===0?' · start here':''}</span></button>`;
   }).join('')}</div>
   <p class="mg-hint" data-sb-choose-note>Finishing a picture unlocks the next one — and your builds are remembered on this device.</p>
  </section>`;

 const builds=DESIGNS.map(d=>{
  const slots=d.slots;
  /* Without JavaScript the board shows the finished picture: every slot
     renders solid. magic-shape-builder.js clears it and runs the game. */
  return `<section class="mg-screen" data-mg-screen="build-${d.slug}" aria-label="Build the ${d.name.toLowerCase()}">
   <span class="eyebrow">BUILD · THE ${d.name.toUpperCase()} · ${d.pieces} SHAPES</span>
   <h2>Build the ${d.name.toLowerCase()}.</h2>
   <p class="lesson-copy">${d.blurb} Tap a piece below, then tap its spot on the board — or drag the piece onto the board.</p>
   <div class="sb-layout" data-sb-build="${d.slug}">
    <figure class="sb-refcard"><img src="${R2+P}${d.file}" width="${W}" height="${H}" alt="Reference picture of the ${d.name.toLowerCase()}: ${d.blurb.toLowerCase()}" loading="lazy"><figcaption>The picture you are building</figcaption></figure>
    <div class="sb-playcol">
     <div class="sb-board" data-sb-board role="group" aria-label="The ${d.name.toLowerCase()} board — place your shape here">${slots.map((s,i)=>slotBox(d,s,i)).join('')}</div>
     <p class="sb-progress" data-sb-progress aria-hidden="true"></p>
     <div class="sb-tray" data-sb-tray role="group" aria-label="Shape pieces for the ${d.name.toLowerCase()}">${d.tray.map(ti=>pieceBtn(slots[ti],d.slug)).join('')}</div>
     <p class="sb-status" data-sb-status aria-live="polite">Tap a colorful piece below, then tap its spot on the board.</p>
     <div class="mg-actions"><button type="button" class="button button-ghost" data-sb-reset aria-label="Reset this picture and start it again">Reset <span aria-hidden="true">↺</span></button><button type="button" class="button" data-mg-go="choose" hidden>Build Another <span aria-hidden="true">↺</span></button></div>
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
   <p class="lesson-copy">Circles, squares, rectangles, triangles and ovals are now your child&rsquo;s building blocks — on the screen, on the table and around the house. Whether you built one picture or all five, that was real shape practice, and there was never a score to worry about.</p>
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
   <noscript><p class="fc-hint">No JavaScript? The five pictures are shown here already built, right beside their reference pictures — name the shapes together, point at each one, and build the real thing from paper cutouts below. The tap-to-place boards need JavaScript.</p></noscript>
  </div>
 </section>
 <section class="wrap lesson-section" id="for-grown-ups" aria-label="About this game">
  <span class="eyebrow">FOR GROWN-UPS</span>
  <h2>How building teaches shapes.</h2>
  <p class="lesson-copy">Each board is drawn to match its reference picture: the same shapes, in the same places, one empty spot at a time. The current spot is big, outlined in the color of the piece that belongs there, and labeled with its shape word — so a child always knows where the next piece goes and can spend their attention on <em>which</em> piece that is. A piece only clicks into the spot that matches both its shape and its color; a wrong tap gets a gentle sentence, never a buzz, and after two tries the board quietly points at the piece that fits.</p>
  <p class="lesson-copy">The builds grow with your child: the house is three shapes, the robot is seven, and each finished picture unlocks the next. Finished builds are remembered on this device only — nothing is uploaded, and no name is attached. The reference picture stays beside every board on purpose: comparing the picture with the work-in-progress is the actual skill — looking carefully, checking, trying again.</p>
  <p class="lesson-note">Tap-to-place works with mouse, touch and keyboard: pieces and the current spot are real buttons, and dragging works too. And the paper-cutout version in Off-Screen Play is where the shapes become something your child can hold.</p>
 </section>`;
}
