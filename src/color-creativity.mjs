// Kiddo School — Colors & Creativity (Class 26 · Colors, Mixing & Creativity).
// Eighteen draw-on-the-picture art activities at
// /preschool/colors/adventures/{slug}/, built on the owner's eighteen Canva
// illustrations (verified on R2 under school/colors/adventures/). The owner's
// spec, followed exactly: the original Canva artwork sits on the LEFT with
// the transparent Write & Color drawing layer laid directly over it (aligned
// 1:1 at every screen size), and plain TEXT instructions plus the drawing
// tools sit on the RIGHT. No coded scenes, no sound, no scoring, no fake
// games. Completion counts only when the child's own work is really saved;
// the colors band keeps its existing flat-map localStorage shape, so
// nothing already earned is lost.
import {COLOR_BASE,crumbNav,heading,esc} from './adventure-kit.mjs';
import {SHAPE_LIB_PATH} from './shape-adventures.mjs';
import {imageActivitySection} from './image-activity.mjs';
import {artFor} from './adventure-dims.mjs';

export const colorCreativities=[
 {
  num:1,slug:'chameleon-color-magic',img:'chameleon-color-magic.webp',
  title:'Chameleon’s Color Magic',h1:'Chameleon’s Color Magic',
  tag: 'Color the chameleon — every part a different color if you like.',
  skill:'Color naming',engine:'fill',backdrop:'forest',
  say: 'Pick a crayon and color the chameleon’s head, body and tail — every part a different color if you like.',
  hint:'A very fashionable chameleon!',
  doneTitle:'The whole chameleon is colorful!',
  doneSub:'Chameleons change colors to match their mood. What mood is yours?',
  alt:'A smiling chameleon on a branch with eight color dots waiting to be picked.',
  palette:[['#e04b3f','red'],['#f07f28','orange'],['#f5c531','yellow'],['#4a9e4f','green'],['#3fb8af','teal'],['#5aa7d6','blue'],['#f28ab5','pink'],['#8f4fc0','purple']]
 },
 {
  num:2,slug:'rainbow-paint-laboratory',img:'rainbow-paint-laboratory.webp',
  title:'Rainbow Paint Laboratory',h1:'Rainbow Paint Laboratory',
  tag:'Mix two paint jars — what new color will you discover?',
  skill:'Real color mixing',engine:'mix',backdrop:'room',
  say:'Choose two jars of paint and press Mix. Red and yellow make a surprise!',
  hint:'Real mixing, just like paints in real life.',
  doneTitle:'You discovered all three secret colors!',
  doneSub:'Red + yellow make orange. Yellow + blue make green. Blue + red make purple.',
  alt:'A young painter with red, yellow and blue paint jars and empty mixing bowls.',
  combos:[
   {a:'red',b:'yellow',result:'#f07f28',name:'orange',line:'Red + Yellow makes ORANGE!'},
   {a:'yellow',b:'blue',result:'#4a9e4f',name:'green',line:'Yellow + Blue makes GREEN!'},
   {a:'blue',b:'red',result:'#8f4fc0',name:'purple',line:'Blue + Red makes PURPLE!'}
  ]
 },
 {
  num:3,slug:'butterfly-wing-painter',img:'butterfly-wing-painter.webp',
  title:'Butterfly Wing Painter',h1:'Butterfly Wing Painter',
  tag: 'Color the butterfly — can you make both wings match?',
  skill:'Symmetry and color',engine:'fill',backdrop:'garden',mirror:true,
  say: 'Pick a color and color one wing piece at a time. Can you make both wings match?',
  hint:'Beautiful wings. Ready for fluttering!',
  doneTitle:'A magnificent butterfly!',
  doneSub:'Whether the wings match or not, this butterfly is one of a kind.',
  alt:'A friendly butterfly with empty wing sections ready to paint, surrounded by flowers.'
 },
 {
  num:4,slug:'rainbow-sundae-studio',img:'rainbow-sundae-studio.webp',
  title:'Rainbow Sundae Studio',h1:'Rainbow Sundae Studio',
  tag: 'Color and decorate the sundae, then design your own in the empty bowls.',
  skill:'Creating and decorating',engine:'decorate',backdrop:'room',
  say: 'Color the scoops and decorate the sundae with your crayons — then design your own in the empty bowls.',
  hint:'Delicious! How many scoops fit?',
  doneTitle:'One spectacular sundae!',
  doneSub:'Sweet, silly and made by you. What is on yours?',
  alt:'An ice cream parlour with a tall sundae glass and scoops of many flavors.',
  items:[
   {kind:'scoop',color:'#f28ab5',label:'Strawberry scoop'},
   {kind:'scoop',color:'#a9744f',label:'Chocolate scoop'},
   {kind:'scoop',color:'#7cd8c3',label:'Mint scoop'},
   {kind:'scoop',color:'#5aa7d6',label:'Blueberry scoop'},
   {kind:'scoop',color:'#f5e04b',label:'Banana scoop'},
   {kind:'cherry',color:'#e04b3f',label:'A cherry'},
   {kind:'wafer',color:'#f7e3c3',label:'A wafer'}
  ]
 },
 {
  num:5,slug:'paint-the-ocean',img:'paint-the-ocean.webp',
  title:'Paint the Ocean',h1:'Paint the Ocean',
  tag: 'Color the ocean picture — every wave, fish and shell.',
  skill:'Coloring inside the lines',engine:'fill',backdrop:'sea',
  say: 'Pick a color and color the ocean picture — every wave, fish and shell.',
  hint:'The reef is waking up with color!',
  doneTitle:'A rainbow reef!',
  doneSub:'The fish, the turtle and the coral all thank you.',
  alt:'An ocean scene with a clownfish, a sea turtle, coral and shells waiting for color.'
 },
 {
  num:6,slug:'little-pottery-artist',img:'little-pottery-artist.webp',
  title:'Little Pottery Artist',h1:'Little Pottery Artist',
  tag: 'Paint the pot, then design two more pots any way you like.',
  skill:'Coloring and design',engine:'fill',backdrop:'room',
  say: 'Paint the pot with your crayons, then design two more pots any way you like.',
  hint:'A lovely glaze!',
  doneTitle:'A whole pottery studio of your own!',
  doneSub:'Every pot is different, just the way artists like it.',
  alt:'A pottery studio with a big vase on a wheel and little pots ready for paint.'
 },
 {
  num:7,slug:'rainbow-weather-machine',img:'rainbow-weather-machine.webp',
  title:'Rainbow Weather Machine',h1:'Rainbow Weather Machine',
  tag: 'Color the rainbow arcs in number order with the color list.',
  skill:'Rainbow color order',engine:'sequence',backdrop:'sky',
  say: 'The weather machine shows the color list — color the rainbow arcs in number order.',
  hint:'Right color, right arc — the machine hums happily!',
  doneTitle:'Somewhere over the rainbow!',
  doneSub:'Red, orange, yellow, green, blue, purple — you know the rainbow order!',
  alt:'A rainbow-making machine with six empty arcs, a smiling sun and paint pots.',
  order:[['#e04b3f','red'],['#f07f28','orange'],['#f5c531','yellow'],['#4a9e4f','green'],['#5aa7d6','blue'],['#8f4fc0','purple']]
 },
 {
  num:8,slug:'birdhouse-painting-workshop',img:'birdhouse-painting-workshop.webp',
  title:'Birdhouse Painting Workshop',h1:'Birdhouse Painting Workshop',
  tag: 'Paint the birdhouse, then draw its new bird in the frame.',
  skill:'Coloring and care',engine:'fill',backdrop:'garden',
  say: 'Paint the birdhouse — a roof, a wall, a round door — then draw its new bird in the frame.',
  hint:'Cozy colors! Finish a house and a bird will visit.',
  doneTitle:'Three birdhouses, three happy birds!',
  doneSub:'Painted with care — the birds approve.',
  alt:'Three wooden birdhouses with paint pots, waiting to be painted.'
 },
 {
  num:9,slug:'crystal-cave-colors',img:'crystal-cave-colors.webp',
  title:'Crystal Cave Colors',h1:'Crystal Cave Colors',
  tag: 'Draw a line from every crystal to the cave it belongs in.',
  skill:'Warm and cool colors',engine:'sort',backdrop:'night',
  say: 'Draw a line from each crystal to its cave. Warm colors like red, orange and yellow go to the fire cave.',
  hint:'You found its family!',
  doneTitle:'Both caves glow!',
  doneSub:'Warm colors feel like sun and fire. Cool colors feel like water and ice.',
  alt:'A crystal cave with warm-colored and cool-colored crystals and two cave openings.',
  items:[
   {color:'#e04b3f',label:'A warm red crystal',key:'warm'},
   {color:'#f07f28',label:'A warm orange crystal',key:'warm'},
   {color:'#f5c531',label:'A warm yellow crystal',key:'warm'},
   {color:'#5aa7d6',label:'A cool blue crystal',key:'cool'},
   {color:'#3fb8af',label:'A cool teal crystal',key:'cool'},
   {color:'#8f4fc0',label:'A cool purple crystal',key:'cool'}
  ],
  bins:[
   {key:'warm',label:'Fire cave',x:230,y:330,warm:true},
   {key:'cool',label:'Ice cave',x:670,y:330,warm:false}
  ]
 },
 {
  num:10,slug:'little-fashion-designer',img:'little-fashion-designer.webp',
  title:'Little Fashion Designer',h1:'Little Fashion Designer',
  tag: 'Design the t-shirt, then create your second look.',
  skill:'Colors and patterns',engine:'fill',backdrop:'room',patterns:true,
  say: 'Design the outfit with your crayons — every color and pattern is allowed — then create your second look.',
  hint:'Straight off the runway!',
  doneTitle:'A whole fashion show!',
  doneSub:'Colors, patterns, and a designer with great taste.',
  alt:'A fashion studio with a dress, a shirt-and-shorts set and a coat on mannequins.'
 },
 {
  num:11,slug:'color-changing-car-wash',img:'color-changing-car-wash.webp',
  title:'Color-Changing Car Wash',h1:'Color-Changing Car Wash',
  tag: 'Color the car, then draw what the next wash turns it into.',
  skill:'Color choice',engine:'fill',backdrop:'sky',
  say: 'Color the car any color you like, then draw what color the next wash makes it.',
  hint:'Shiny as new!',
  doneTitle:'The car wash is open!',
  doneSub:'Three brand-new paint jobs. Which one drives first?',
  alt:'A car, a bus and a fire truck at a rainbow car wash, waiting for new colors.'
 },
 {
  num:12,slug:'magical-lantern-festival',img:'magical-lantern-festival.webp',
  title:'Magical Lantern Festival',h1:'Magical Lantern Festival',
  tag: 'Color the lantern bright, then design another for the festival.',
  skill:'Color and light',engine:'fill',backdrop:'night',glow:true,
  say: 'Color the lantern panels bright and beautiful, then design another lantern for the festival.',
  hint:'Warm and bright!',
  doneTitle:'The festival is glowing!',
  doneSub:'Every lantern shines with your colors.',
  alt:'Hanging festival lanterns with empty panels, stars and a little fox.'
 },
 {
  num:13,slug:'magic-flower-color-garden',img:'magic-flower-color-garden.webp',
  title:'Magic Flower Color Garden',h1:'Magic Flower Color Garden',
  tag: 'Color every petal, then count your different colors.',
  skill:'Petal-by-petal coloring',engine:'fill',backdrop:'garden',
  say: 'Color every petal — each one can be its own color — then count how many different colors you used.',
  hint:'Petal by petal, the garden grows.',
  doneTitle:'A magic garden in full bloom!',
  doneSub:'No two petals need to match — gardens love variety.',
  alt:'A garden of five daisies with empty petals ready for color.'
 },
 {
  num:14,slug:'jellyfish-glow-party',img:'jellyfish-glow-party.webp',
  title:'Jellyfish Glow Party',h1:'Jellyfish Glow Party',
  tag: 'Color the jellyfish and its ribbon tentacles for the glow party.',
  skill:'Color design',engine:'fill',backdrop:'sea',glow:true,
  say: 'Color the jellyfish and its ribbon tentacles for the glow party.',
  hint:'Wobbly and wonderful!',
  doneTitle:'Let the glow party start!',
  doneSub:'Press Party lights to see your jellyfish glow in the dark.',
  alt:'Three smiling jellyfish with long tentacles over a colorful reef.'
 },
 {
  num:15,slug:'splatter-paint-playground',img:'splatter-paint-playground.webp',
  title:'Splatter Paint Playground',h1:'Splatter Paint Playground',
  tag:'A big blank canvas — draw with your finger, or splatter paint everywhere!',
  skill:'Free painting',engine:'canvas',backdrop:'room',
  say:'Choose a color and draw with your finger, mouse or stylus. Or try the splatter brush!',
  hint:'There is no wrong way to make art.',
  doneTitle:'A real masterpiece!',
  doneSub:'Art is yours to keep — save it or start a new one.',
  alt:'A painter at an easel in front of a big blank canvas with colorful splats around.'
 },
 {
  num:16,slug:'kite-design-studio',img:'kite-design-studio.webp',
  title:'Kite Design Studio',h1:'Kite Design Studio',
  tag: 'Design the kite, then draw it flying in your frame.',
  skill:'Design and color',engine:'fill',backdrop:'sky',
  say: 'Design the kite with your crayons, then draw it flying high in your frame.',
  hint:'That kite has your name on it!',
  doneTitle:'Go fly your kite!',
  doneSub:'Four panels, three bows, one amazing design.',
  alt:'A diamond kite with four empty panels and bow ties on its tail.'
 },
 {
  num:17,slug:'rainbow-fish-aquarium',img:'rainbow-fish-aquarium.webp',
  title:'Rainbow Fish Aquarium',h1:'Rainbow Fish Aquarium',
  tag: 'Color the fish, then draw its aquarium home in the frame.',
  skill:'Designing a world',engine:'decorate',backdrop:'sea',
  say: 'Color the fish, then draw its aquarium home in the frame.',
  hint:'The fish wiggle their thanks!',
  doneTitle:'A beautiful aquarium!',
  doneSub:'A whole underwater world, designed by you.',
  alt:'An empty aquarium tank with colorful fish, plants and a castle waiting to be placed inside.',
  items:[
   {kind:'fish',color:'#e04b3f',label:'A red fish'},
   {kind:'fish',color:'#f5c531',label:'A yellow fish'},
   {kind:'fish',color:'#5aa7d6',label:'A blue fish'},
   {kind:'fish',color:'#4a9e4f',label:'A green fish'},
   {kind:'plant',color:'#4a9e4f',label:'A green plant'},
   {kind:'castle',color:'#c8a06a',label:'A castle'},
   {kind:'coral',color:'#f28ab5',label:'Pink coral'},
   {kind:'rock',color:'#9aa5b1',label:'A stone'}
  ]
 },
 {
  num:18,slug:'birthday-cake-color-studio',img:'birthday-cake-color-studio.webp',
  title:'Birthday Cake Color Studio',h1:'Birthday Cake Color Studio',
  tag: 'Color and decorate the cake, then draw the candles — how many?',
  skill:'Coloring and decorating',engine:'fill+decorate',backdrop:'room',
  say: 'Color and decorate the cake with your crayons, then draw the candles — how many will you add?',
  hint:'Yummy colors!',
  doneTitle:'Happy birthday to you!',
  doneSub:'Frosted, decorated and ready for the party.',
  alt:'A two-tier birthday cake on a stand with candles and decorations to place.',
  items:[
   {kind:'star',color:'#f5c531',label:'A yellow star'},
   {kind:'heart',color:'#e0568c',label:'A pink heart'},
   {kind:'cherry',color:'#e04b3f',label:'A cherry'},
   {kind:'strawberry',color:'#e04b3f',label:'A strawberry'}
  ]
 }
];

export const colorBySlug=Object.fromEntries(colorCreativities.map(a=>[a.slug,a]));

/* The shared studio palette — eight big, friendly colors with names. */
export const STUDIO=[['#e04b3f','red'],['#f07f28','orange'],['#f5c531','yellow'],['#4a9e4f','green'],['#3fb8af','teal'],['#5aa7d6','blue'],['#8f4fc0','purple'],['#f28ab5','pink']];

/* ---------- library + activity pages ---------- */

const CLIB_PATH='/preschool/colors/adventures/';
const CCLASS_PATH='/preschool/4-years/colors-mixing-and-creativity/';

export const COLOR_LIB_PATH=CLIB_PATH;
export {COLOR_BASE};
export const COLOR_CLASS_PATH=CCLASS_PATH;

export const GROUPS={
 1:'Color discovery',2:'Color discovery',3:'Color discovery',4:'Color discovery',5:'Color discovery',6:'Color discovery',
 7:'Color experiments',8:'Color experiments',9:'Color experiments',10:'Color experiments',11:'Color experiments',12:'Color experiments',
 13:'Creative art studio',14:'Creative art studio',15:'Creative art studio',16:'Creative art studio',17:'Creative art studio',18:'Creative art studio'
};
export const COLOR_GROUPS=GROUPS;

export function colorLibraryBody(){
 const groups=[['Color discovery','Six gentle ways to meet colors — change a chameleon, mix real paint, paint wings, oceans and pottery.'],['Color experiments','Warm and cool, stripes and dots, lanterns that glow: six experiments with color and light.'],['Creative art studio','A free canvas and five design studios — flowers, jellyfish, kites, aquariums and a birthday cake.']];
 return `${crumbNav([['Preschool','/preschool/'],['Colors &amp; Creativity Adventures']])}
 ${heading('COLORS &amp; CREATIVITY','Eighteen real painting and making activities.','Pick a color and tap to fill, mix true primary colors, place decorations you can move again, and paint freely on a real canvas. Built for fingers, styluses and mice — with undo, redo and a save button that keeps each creation on the child’s own My Classroom desk.')}
 <div class="lesson-start"><a class="button" href="${CCLASS_PATH}">This way to Class 26 <span aria-hidden="true">→</span></a><span class="lesson-start-hint">The class that goes with these activities: Colors, Mixing &amp; Creativity.</span></div>
 <section class="wrap section compact" data-cc-lib aria-label="All color activities">
  ${groups.map(([name,blurb],gi)=>{
   const items=colorCreativities.filter(a=>GROUPS[a.num]===name);
   return `<h2 class="sa-group-title">${name}</h2><p class="sa-group-blurb">${blurb}</p>
   <div class="sa-grid">${items.map(a=>`<a class="sa-card" href="${CLIB_PATH}${a.slug}/" data-cc-libcard="${a.slug}">
    <span class="sa-card-num" aria-hidden="true">${a.num}</span>
    <span class="sa-card-done" data-cc-done hidden>Cleared!</span>
    <img src="${COLOR_BASE}${a.img}" width="800" height="600" alt="${esc(a.alt)}" loading="lazy">
    <span class="sa-card-body"><strong>${esc(a.title)}</strong><span class="sa-card-tag">${esc(a.tag)}</span><span class="sa-card-skill">${esc(a.skill)}</span></span>
    <span class="sa-card-play">Play <span aria-hidden="true">→</span></span>
   </a>`).join('')}</div>`;
  }).join('')}
  <p class="lesson-note">Every card opens a real activity — painting, mixing or making, never a static picture. Finished artwork saves per child on this device.</p>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>Real tools, honest color.</h2>
  <p class="lesson-copy">The paint laboratory teaches exactly three true mixtures — red + yellow = orange, yellow + blue = green, blue + red = purple — and nothing fake. The fill activities are true region coloring: each tap fills one shape, and the black outlines stay crisp, just like a coloring book. The sundae, aquarium and cake let children place, move and remove decorations as many times as they like. The splatter playground is a free canvas with brush, splatter and eraser tools.</p>
  <p class="lesson-copy">There is no grading here on purpose: creative choices are never marked right or wrong. Activities complete when the artwork is genuinely finished or the experiment genuinely done — opening a page never counts.</p>
  <p class="lesson-copy">The studio belongs to <a href="${CCLASS_PATH}">Class 26 — Colors, Mixing &amp; Creativity</a> on the Age 4 path, beside <a href="${SHAPE_LIB_PATH}">Shape Adventures</a> and <a href="/preschool/writing/adventures/">Writing Adventures</a>.</p>
 </section>`;
}

export function colorActivityBody(a){
 const prev=colorCreativities[(a.num-2+18)%18];
 const next=colorCreativities[a.num%18];
 const art=artFor('colors/'+a.slug,COLOR_BASE+a.img);
 const board=imageActivitySection({band:'colors',slug:a.slug,title:a.title,skill:a.skill,
  say:a.say,hint:a.hint,doneTitle:a.doneTitle,alt:a.alt,
  imgUrl:COLOR_BASE+a.img,w:art.w,h:art.h,
  wsPath:'/worksheets/colors/'+a.slug+'/'});
 return `${crumbNav([['Preschool','/preschool/'],['Colors &amp; Creativity',CLIB_PATH],[`${a.num}. ${a.title}`]])}
 <article class="wrap lesson-hero sa-hero">
  <div class="sa-hero-art"><img src="${COLOR_BASE}${a.img}" width="800" height="600" alt="${esc(a.alt)}" fetchpriority="high"></div>
  <div class="lesson-hero-copy">
   <span class="eyebrow">COLORS &amp; CREATIVITY · ${a.num} OF 18 · ${GROUPS[a.num].toUpperCase()}</span>
   <h1>${esc(a.h1)}</h1>
   <div class="fc-chips lesson-chips"><span><strong>Age</strong> 4 Years</span><span><strong>Class</strong> 26 · Colors</span><span><strong>Skill</strong> ${esc(a.skill)}</span></div>
   <p class="lesson-lede">${esc(a.tag)}</p>
   <div class="lesson-start"><a class="button" href="#play">Start creating <span aria-hidden="true">↓</span></a><a class="button button-ghost" href="/worksheets/colors/${a.slug}/">Print the worksheet <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Finger, stylus or mouse. Undo, redo and save are always one tap away.</span></div>
  </div>
 </article>
 ${board}
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>Why this activity helps.</h2>
  <p class="lesson-copy">${esc(a.parentNote||('This studio turns '+a.skill.toLowerCase()+' into open-ended making. Children choose, tap and see the picture answer at once — and because nothing is graded, the choices are truly theirs. Naming colors out loud as they work doubles the learning, and the undo button means a brave choice is never a risk.'))}</p>
  <p class="lesson-copy">Finished pieces are saved straight from the pencil case — Save composes the child's drawing over the original artwork as one picture, and an adventure counts as cleared only when that save really happens. Everything stays on this device, private by design.</p>
 </section>
 <nav class="wrap lesson-section sa-prevnext" aria-label="More color activities">
  <a class="sa-navcard" href="${CLIB_PATH}${prev.slug}/"><span class="eyebrow">Previous</span><strong>${esc(prev.title)}</strong></a>
  <a class="sa-navcard" href="${CLIB_PATH}"><span class="eyebrow">All activities</span><strong>Colors &amp; Creativity Library</strong></a>
  <a class="sa-navcard" href="${CLIB_PATH}${next.slug}/"><span class="eyebrow">Next</span><strong>${esc(next.title)}</strong></a>
 </nav>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP GOING</span><h2>Where next?</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${CCLASS_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class 26</span></div><h3>Colors, Mixing &amp; Creativity</h3><p>The class behind this studio — with color games, mixing play and off-screen art ideas.</p><span class="fc-open">Open Class 26 <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="${SHAPE_LIB_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class 25</span></div><h3>Shape Adventures</h3><p>Spaceships, monsters, patterns and a shape detective — eighteen games of matching and sorting.</p><span class="fc-open">Open the Shapes Library <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/preschool/writing/adventures/"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class 27</span></div><h3>Early Writing Adventures</h3><p>Trace winding paths, loops and zigzags with a finger or stylus — thirty pencil-control games.</p><span class="fc-open">Open the Writing Library <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}
