// Kiddo School — Look & Draw — Magic Shapes (Age 3 interactive activity).
// /preschool/3-years/magic-shape-builder/ — the URL is permanent. This is a
// free drawing activity whose reference gallery now gathers the pictures from
// the Age 3 games the owner retired: the five magic-shape illustrations in
// school/interactive-activities/magic-shape-builder-age-3/ (1080×1080), the
// garden illustrations from the former counting garden
// (magic-number-garden-age-3, 1080×1080), the opposites illustrations
// (magic-opposites-adventure-age-3, 1080×1080) and the fruit illustrations
// (magic-fruit-basket-age-3, 1264×1264) — all probed before layout code and
// shown with their true dimensions. Two opposites files carry a game banner
// inside the artwork (01-red-ball, 06-blue-door), and the glass and soup read
// best close up, so those four are shown through overflow-crop windows cut to
// the object — same files, true proportions, nothing distorted. Each round
// shows the reference picture beside a large blank WHITE canvas: children
// draw freely with finger, mouse or stylus (HTML Canvas + Pointer Events),
// with six big color buttons, three brush sizes, Eraser, Undo, Clear and Save
// Drawing. Drawings stay per picture while the page is open. "Show me how"
// gives simple spoken/written steps — never overlays, never auto-correct. A
// parent prompt asks "Can you find the shapes in your drawing?" Save
// downloads ONLY the child's own canvas, never the reference image. No
// grading, no scores, no timers, no shape detection. Without JavaScript the
// references and written steps still show — draw on real paper instead.
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P_SHAPES='school/interactive-activities/magic-shape-builder-age-3/';
const P_GARDEN='school/interactive-activities/magic-number-garden-age-3/';
const P_OPP='school/interactive-activities/magic-opposites-adventure-age-3/';
const P_FRUIT='school/interactive-activities/magic-fruit-basket-age-3/';

/* The six big colors (school palette) and the three brush sizes. */
const COLORS=[['red','#e04b3f'],['yellow','#f5c531'],['blue','#5aa7d6'],['green','#4a9e4f'],['orange','#f07f28'],['purple','#8f4fc0']];
const SIZES=[[1,'Thin'],[2,'Medium'],[3,'Thick']];

/* Twenty-five reference pictures on four shelves. crop = the measured region
   of the file that shows the object (used only where the raw file carries a
   baked-in game banner or reads best close up). */
const DESIGNS=[
 {group:'Magic shapes',folder:P_SHAPES,slug:'house',file:'01-shape-house.webp',w:1080,h:1080,name:'House',next:'tree',
  find:'A square wall, a triangle roof and a rectangle door.',
  steps:['A house is a square with a triangle on top.',
   'Draw a big square in the middle of your page.',
   'Draw a triangle sitting on top — that is the roof.',
   'Add a small rectangle at the bottom for the door.',
   'Draw a little square window, and anything else your house needs.']},
 {group:'Magic shapes',folder:P_SHAPES,slug:'tree',file:'03-shape-tree.webp',w:1080,h:1080,name:'Tree',next:'rocket',
  find:'Circles of leaves and a rectangle trunk.',
  steps:['A tree is circles above a rectangle.',
   'Draw a tall rectangle for the trunk.',
   'Draw three big circles on top for the leaves.',
   'Add apples, birds or a swing — it is your tree.']},
 {group:'Magic shapes',folder:P_SHAPES,slug:'rocket',file:'02-shape-rocket.webp',w:1080,h:1080,name:'Rocket',next:'robot',
  find:'A rectangle body, a triangle nose, a round window and two fins.',
  steps:['A rocket flies up, up, up!',
   'Draw a tall rectangle for the body.',
   'Draw a triangle on top for the nose.',
   'Add a circle in the middle for the window.',
   'Draw two triangles at the bottom for fins, and flames below.']},
 {group:'Magic shapes',folder:P_SHAPES,slug:'robot',file:'04-shape-robot.webp',w:1080,h:1080,name:'Robot',next:'butterfly',
  find:'Squares, circles, rectangles and triangles — a whole shape family.',
  steps:['A robot is built from shapes, just like yours.',
   'Draw a square for the head. Add two circle eyes and a smile.',
   'Draw a bigger square below for the body. Add a round button.',
   'Draw two rectangles for the legs.',
   'Add triangle feet — and arms if your robot needs them.']},
 {group:'Magic shapes',folder:P_SHAPES,slug:'butterfly',file:'05-shape-butterfly.webp',w:1080,h:1080,name:'Butterfly',next:'flower',
  find:'Oval wings, a circle head and a long oval body.',
  steps:['A butterfly has wings on both sides.',
   'Draw a long oval in the middle for the body.',
   'Draw a circle on top for the head.',
   'Draw two big ovals on each side for the wings.',
   'Add dots, lines and flowers — butterflies love flowers.']},
 {group:'Garden friends',folder:P_GARDEN,slug:'flower',file:'01-pink-flower.webp',w:1080,h:1080,name:'Pink Flower',next:'blue-butterfly',
  find:'Pink petals around a smiling yellow face, on a stem with two leaves.',
  steps:['A flower is petals around a round middle.',
   'Draw a small circle and give it a smiling face.',
   'Draw five or six petals around it, like fingers waving.',
   'Add a long stem and two leaves at the bottom.']},
 {group:'Garden friends',folder:P_GARDEN,slug:'blue-butterfly',file:'02-blue-butterfly.webp',w:1080,h:1080,name:'Blue Butterfly',next:'bee',
  find:'Four blue wings, a little body and two curled feelers.',
  steps:['This butterfly has spots on its wings.',
   'Draw a small oval body in the middle.',
   'Draw two big wings on top and two smaller wings below.',
   'Add two curly feelers, then spots on every wing.']},
 {group:'Garden friends',folder:P_GARDEN,slug:'bee',file:'03-yellow-bee.webp',w:1080,h:1080,name:'Bee',next:'ladybug',
  find:'A round striped body, small blue wings and a happy face.',
  steps:['A bee is a round body wearing stripes.',
   'Draw a fat oval for the body.',
   'Add stripes across the middle — one, two, three.',
   'Draw two small wings on top, a stinger at the back and a smile.']},
 {group:'Garden friends',folder:P_GARDEN,slug:'ladybug',file:'04-red-ladybug.webp',w:1080,h:1080,name:'Ladybug',next:'watering-can',
  find:'A round red body with black spots and a line down the middle.',
  steps:['A ladybug is a big red circle.',
   'Draw a circle, then a line straight down the middle for the wings.',
   'Add spots on each side — count them as you draw!',
   'Give it a small head, six little legs and two feelers.']},
 {group:'Garden friends',folder:P_GARDEN,slug:'watering-can',file:'05-green-watering-can.webp',w:1080,h:1080,name:'Watering Can',next:'ball',
  find:'A green can with a long spout, a curved handle and drops of water.',
  steps:['A watering can gives the garden a drink.',
   'Draw a boxy body with a rounded bottom.',
   'Add a long spout on one side and a big curved handle on top.',
   'Draw drops sprinkling from the spout — and a flower drinking them.']},
 {group:'Opposites',folder:P_OPP,slug:'ball',file:'01-red-ball.webp',w:1080,h:1080,crop:{x:276,y:472,w:512,h:518},name:'Red Ball',next:'tall-tree',
  find:'A shiny round ball with a bright highlight.',
  steps:['A ball is a circle — that is the whole secret.',
   'Draw a big, round circle.',
   'Add a small shiny patch near the top — that is where the light lands.',
   'Draw the ground line under it, and a shadow if you like.']},
 {group:'Opposites',folder:P_OPP,slug:'tall-tree',file:'02-green-tree.webp',w:1080,h:1080,name:'Green Tree',next:'pencil',
  find:'A leafy tree with a wide crown and a strong trunk.',
  steps:['This tree stretches up tall.',
   'Draw a strong trunk from the ground up.',
   'Draw a big fluffy crown of leaves on top — fluffy clouds work well.',
   'Add apples, a bird or a swing — it is your tree.']},
 {group:'Opposites',folder:P_OPP,slug:'pencil',file:'03-yellow-pencil.webp',w:1080,h:1080,name:'Yellow Pencil',next:'glass',
  find:'A long yellow pencil with a pink eraser and a sharp point.',
  steps:['A pencil is a long, thin rectangle.',
   'Draw two long lines side by side, close together.',
   'Close the ends: a flat end at the back, a triangle point at the front.',
   'Add a small eraser block and two curved shine lines.']},
 {group:'Opposites',folder:P_OPP,slug:'glass',file:'04-clear-glass.webp',w:1080,h:1080,crop:{x:212,y:133,w:654,h:814},name:'Glass of Water',next:'soup',
  find:'A tall clear glass with a dark outline.',
  steps:['A glass is two straight lines and a curve.',
   'Draw two tall lines that lean toward each other just a little.',
   'Join them at the bottom with a shallow curve.',
   'Draw a wavy water line inside, and a long shine up one side.']},
 {group:'Opposites',folder:P_OPP,slug:'soup',file:'05-soup-bowl.webp',w:1080,h:1080,crop:{x:173,y:136,w:734,h:794},name:'Soup Bowl',next:'door',
  find:'A blue bowl of soup with wavy steam rising.',
  steps:['A soup bowl is a half circle in a bigger half circle.',
   'Draw a wide, shallow arc for the bowl, with a little foot below.',
   'Draw a wavy line across the top for the soup.',
   'Add curly steam rising — that is how we know it is hot!']},
 {group:'Opposites',folder:P_OPP,slug:'door',file:'06-blue-door.webp',w:1080,h:1080,crop:{x:277,y:300,w:524,h:731},name:'Blue Door',next:'apple',
  find:'An arched blue door with a round golden handle.',
  steps:['A door is a tall rectangle with a curved top.',
   'Draw a tall rectangle, then round the top corners into an arch.',
   'Add panels: a smaller rectangle inside, and one more below it.',
   'Draw a round golden handle — knock knock!']},
 {group:'Fruits',folder:P_FRUIT,slug:'apple',file:'01-apple.webp',w:1264,h:1264,name:'Apple',next:'banana',
  find:'A shiny red apple with a green leaf and a brown stem.',
  steps:['An apple is almost a heart lying on its side.',
   'Draw a big round shape with a small dip at the top.',
   'Add a brown stem and one green leaf.',
   'Apples are glossy — add a shiny patch.']},
 {group:'Fruits',folder:P_FRUIT,slug:'banana',file:'02-banana.webp',w:1264,h:1264,name:'Banana',next:'orange',
  find:'A yellow banana curved like a smile.',
  steps:['A banana is a moon wearing a stem.',
   'Draw two long curves that meet at both ends, like a smile.',
   'Close the ends: a small stem at the top, a dark tip at the bottom.',
   'Color it yellow — maybe a brown spot or two.']},
 {group:'Fruits',folder:P_FRUIT,slug:'orange',file:'03-orange.webp',w:1264,h:1264,name:'Orange',next:'strawberry',
  find:'A round orange with a dimpled peel and a little green leaf.',
  steps:['The orange is the roundest fruit.',
   'Draw a big circle.',
   'Add a tiny stem star at the top and one leaf.',
   'Dot the peel all over — little dots are the dimples.']},
 {group:'Fruits',folder:P_FRUIT,slug:'strawberry',file:'04-strawberry.webp',w:1264,h:1264,name:'Strawberry',next:'grapes',
  find:'A bright red strawberry with its seeds dotted on the outside.',
  steps:['A strawberry is a heart with a green hat.',
   'Draw a rounded triangle — wide at the top, pointy at the bottom.',
   'Add a leafy crown at the top and a tiny stem.',
   'Dot the seeds all over and count them as you go.']},
 {group:'Fruits',folder:P_FRUIT,slug:'grapes',file:'05-grapes.webp',w:1264,h:1264,name:'Grapes',next:'watermelon',
  find:'A bunch of round purple grapes hanging from a stem.',
  steps:['Grapes are lots of little circles in a bunch.',
   'Draw a stem at the top, then a row of circles under it.',
   'Add another row, then another — one fewer circle each row.',
   'Give each grape a shine dot, and add a leaf at the stem.']},
 {group:'Fruits',folder:P_FRUIT,slug:'watermelon',file:'06-watermelon.webp',w:1264,h:1264,name:'Watermelon',next:'pineapple',
  find:'A slice with green rind, pink flesh and black seeds.',
  steps:['A watermelon slice is a half moon.',
   'Draw a long curve, then a straight line across the top.',
   'Add the thick rind line under the curve.',
   'Dot the seeds inside — count them as you place them.']},
 {group:'Fruits',folder:P_FRUIT,slug:'pineapple',file:'07-pineapple.webp',w:1264,h:1264,name:'Pineapple',next:'mango',
  find:'A golden pineapple wearing a spiky green crown.',
  steps:['A pineapple is an oval in a diamond suit.',
   'Draw a tall oval body.',
   'Cross it with diagonal lines both ways to make a diamond net.',
   'Add a spiky crown of leaves on top.']},
 {group:'Fruits',folder:P_FRUIT,slug:'mango',file:'08-mango.webp',w:1264,h:1264,name:'Mango',next:'basket',
  find:'A golden mango blushing orange with a small leaf.',
  steps:['A mango is an egg leaning back.',
   'Draw a plump oval, a little pointy at one end.',
   'Add a small stem and a leaf at the top.',
   'Blend yellow into orange — mangoes glow.']},
 {group:'Fruits',folder:P_FRUIT,slug:'basket',file:'09-fruit-basket.webp',w:1264,h:1264,name:'Fruit Basket',next:'house',
  find:'A woven basket with a rope handle, waiting to be filled.',
  steps:['A basket holds the harvest.',
   'Draw a wide bowl shape with a flat rim on top.',
   'Cross curved lines over it — that is the weave.',
   'Add a big arched handle, then draw your favorite fruits inside!']}
];

/* The four shelves, in the order the choose screen lists them. */
const GROUPS=['Magic shapes','Garden friends','Opposites','Fruits'];

/* Reference artwork: plain <img>, or an overflow-crop window for the four
   files where the object needs cutting out of its raw square. */
const pct=(n,d)=>(n/d*100).toFixed(3);
function refArt(d,cls){
 if(!d.crop){
  return `<img src="${R2}${d.folder}${d.file}" width="${d.w}" height="${d.h}" alt="Reference picture of the ${d.name.toLowerCase()}: ${d.find}" loading="lazy">`;
 }
 const c=d.crop;
 return `<span class="ld-crop${cls?' '+cls:''}" style="aspect-ratio:${c.w}/${c.h}" role="img" aria-label="Reference picture of the ${d.name.toLowerCase()}: ${d.find}"><img src="${R2}${d.folder}${d.file}" width="${d.w}" height="${d.h}" alt="" aria-hidden="true" loading="lazy" style="width:${pct(d.w,c.w)}%;left:${pct(-c.x,c.w)}%;top:${pct(-c.y,c.h)}%"></span>`;
}
/* Choose tiles letterbox every picture inside the same square box, so rows
   stay even whether the art is a full square or a tall crop. */
const tileArt=d=>d.crop
 ?`<span class="ld-tilebox"><span class="ld-crop" style="aspect-ratio:${d.crop.w}/${d.crop.h};${d.crop.h>=d.crop.w?`height:100%;width:${pct(d.crop.w,d.crop.h)}%`:'width:100%'}" aria-hidden="true"><img src="${R2}${d.folder}${d.file}" width="${d.w}" height="${d.h}" alt="" aria-hidden="true" loading="lazy" style="width:${pct(d.w,d.crop.w)}%;left:${pct(-d.crop.x,d.crop.w)}%;top:${pct(-d.crop.y,d.crop.h)}%"></span></span>`
 :`<span class="ld-tilebox"><img src="${R2}${d.folder}${d.file}" width="${d.w}" height="${d.h}" alt="" aria-hidden="true" loading="lazy"></span>`;

const crumbLast='Look & Draw — Magic Shapes';

export const magicShape={
 path:'/preschool/3-years/magic-shape-builder/',
 seoTitle:'Look & Draw — Magic Shapes — a Drawing Activity for 3 Year Olds',
 h1:'Look & Draw — Magic Shapes',
 description:'Look at a picture — shapes, garden friends, opposites and fruits — then draw your own on a big white canvas with six big colors, easy tools and gentle "Show me how" steps. A calm draw-together activity for 3-year-olds.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 3 MAGIC ACTIVITY',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Shapes & Patterns','/preschool/3-years/shapes-and-patterns/'],['Look & Draw — Magic Shapes',null]],
 ogImage:R2+P_SHAPES+'06-magic-shape-builder-cover.webp',
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
  <p class="mw-lede">Look at a picture, then draw your own — right on the page. Twenty-five pictures are waiting on four shelves: magic shapes, garden friends, opposites and fruits. Six big colors, an eraser, undo, and a Save button for your very own artwork. Grown-ups stay close; little artists lead.</p>
  <div class="mg-game" data-mg-game="look-draw">
   <p class="mg-live" data-mg-live aria-live="polite"></p>
   <div class="mg-screens">`;

 const welcome=`<section class="mg-screen" data-mg-screen="welcome" aria-label="Welcome to Look and Draw">
   <figure class="mg-cover"><img src="${R2}${P_SHAPES}06-magic-shape-builder-cover.webp" width="1080" height="1080" alt="The Look and Draw cover: a house, rocket, tree, robot and butterfly built from colorful shapes" fetchpriority="high"><figcaption class="fc-hint">Welcome, little artist!</figcaption></figure>
   <div class="mg-actions" style="justify-content:center"><button type="button" class="button" data-mg-go="choose">Start Drawing <span aria-hidden="true">↗</span></button></div>
   <p class="mg-hint" style="text-align:center">No scores, no timers — just you and your drawing. Your drawings stay on this page until you close it, and Save keeps one forever.</p>
  </section>`;

 const choose=`<section class="mg-screen" data-mg-screen="choose" aria-label="Choose a picture">
   <span class="eyebrow">CHOOSE A PICTURE</span>
   <h2>What shall we draw first?</h2>
   <p class="lesson-copy">Pick a picture from any shelf, look closely at it, then draw your own on the big white canvas. Your drawing waits for you if you switch pictures — and you can start over any time.</p>
   <div class="mg-tiles ld-choose">${GROUPS.map(g=>`<p class="ld-groupline">${g}</p>${DESIGNS.filter(d=>d.group===g).map(d=>`<button type="button" class="mg-tile ld-choose-tile" data-mg-go="draw-${d.slug}" aria-label="Draw the ${d.name.toLowerCase()} — ${d.find}">${tileArt(d)}<span class="mg-tile-word">${d.name}</span><span class="ld-tile-sub">${d.find}</span></button>`).join('')}`).join('')}</div>
   <p class="mg-hint" data-ld-choose-note>Drawings you have already made stay saved while this page is open — switching pictures never erases them.</p>
  </section>`;

 const draws=DESIGNS.map(d=>{
  return `<section class="mg-screen" data-mg-screen="draw-${d.slug}" aria-label="Draw the ${d.name.toLowerCase()}">
   <span class="eyebrow">LOOK &amp; DRAW · THE ${d.name.toUpperCase()}</span>
   <h2>Draw the ${d.name.toLowerCase()}.</h2>
   <p class="lesson-copy">Look at the picture: ${d.find} Now draw your own on the big white canvas. Every drawing is right — this is your artwork.</p>
   <div class="ld-layout" data-ld-draw="${d.slug}">
    <figure class="ld-ref">
     ${refArt(d)}
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
   <h2>Pictures you can draw anywhere.</h2>
   <p class="lesson-copy">The best drawing table costs nothing. Pick one of these and let your child lead — the looking and the drawing do the teaching all by themselves.</p>
   <div class="tc-hunt"><h3>Big paper, big shapes</h3><ul class="lesson-prompts"><li>Tape a big sheet of paper to the table and draw the house together with crayons — triangle roof, square wall, rectangle door. Say each shape name out loud as you draw it.</li></ul></div>
   <div class="tc-hunt"><h3>Chalk shapes outside</h3><ul class="lesson-prompts"><li>Draw giant shapes on the pavement with chalk, then walk, hop or jump along the outline of each one. Big movements make shape words stick.</li></ul></div>
   <div class="tc-hunt"><h3>Draw what you see</h3><ul class="lesson-prompts"><li>Hunt the house for circles, squares, triangles and rectangles — a plate, a book, a slice of toast — and draw the best ones in your own shape museum.</li></ul></div>
   <p class="lesson-note"><strong>One safety word for this game:</strong> chunky crayons and washable chalk only, and grown-ups handle any sticky tape. Keep pencils away from little mouths — artists this age still explore with them.</p>
   <div class="mg-next"><button type="button" class="button" data-mg-go="complete">Finish the Magic <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const complete=`<section class="mg-screen" data-mg-screen="complete" aria-label="Activity complete">
   <span class="eyebrow">ACTIVITY COMPLETE</span>
   <h2>Pictures everywhere you look!</h2>
   <p class="lesson-copy">Circles, squares, triangles, ovals — petals, wings, wheels and windows — are now things your child draws on purpose: on the canvas, on paper and in the pavement. Whether you drew one picture or twenty-five, that was real looking and real drawing, and every drawing was already right.</p>
   <div class="mg-actions"><button type="button" class="button" data-mg-replay>Play Again <span aria-hidden="true">↺</span></button><a class="button button-ghost" href="${G.classPath}">Back to Shapes &amp; Patterns <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/my-classroom/">My Classroom <span aria-hidden="true">↗</span></a></div>
   <div class="lesson-path">
    <a class="fc-stage lesson-card-link" href="${G.classPath}"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Class 3</span></div><h3>Shapes &amp; Patterns</h3><p>The full class: twelve shape cards, find-the-shape, match shapes and complete-a-pattern games.</p><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a>
    <a class="fc-stage lesson-card-link" href="/preschool/3-years/"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Magic games</span></div><h3>More magic games</h3><p>Try Animal Sound Safari — every Age 3 game lives on the stage shelf.</p><span class="fc-open">Choose another game <span aria-hidden="true">↗</span></span></a>
   </div>
  </section>`;

 return `${hero}
${welcome}
${choose}
${draws}
${offscreen}
${complete}
   </div>
   <noscript><p class="fc-hint">No JavaScript? The reference pictures and their step lists are right here — read the steps together, name the shapes, and draw the pictures on real paper. The drawing canvas and its tools need JavaScript.</p></noscript>
  </div>
 </section>
 <section class="wrap lesson-section" id="for-grown-ups" aria-label="About this activity">
  <span class="eyebrow">FOR GROWN-UPS</span>
  <h2>How drawing teaches looking.</h2>
  <p class="lesson-copy">This activity deliberately has no wrong answers. The reference picture stays beside the canvas so your child can look back and forth — noticing that a roof is a triangle or a grape is a circle is the whole lesson, and it happens inside ordinary drawing. The gallery gathers the pictures from the Age 3 games your child may already have played, so the flower, the ball, the door and the eight fruits all live here now. "Show me how" reads a few short steps aloud and shows them as plain text you can follow together; nothing is ever drawn for your child and nothing is graded.</p>
  <p class="lesson-copy">The tools are honest: six colors, three brush sizes, a real eraser, undo for oops-moments, clear for fresh starts, and Save — which downloads your child&rsquo;s own canvas only, never the reference picture. Drawings for each picture stay while the page stays open, so switching to the rocket and back will not erase the house. Nothing is uploaded anywhere, and closing the tab lets the gallery go — that is what Save is for.</p>
  <p class="lesson-note">Works with finger, mouse or stylus on phones, tablets and desktops. The Calm Mode toggle in the footer (or your device&rsquo;s reduced-motion setting) stills every animation while drawing, tools and steps keep working.</p>
 </section>`;
}
