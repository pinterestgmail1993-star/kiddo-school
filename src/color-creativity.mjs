// Kiddo School — Colors & Creativity (Class 26 · Colors, Mixing & Creativity).
// Eighteen real, playable art activities at
// /preschool/colors/adventures/{slug}/, built on the owner's eighteen Canva
// illustrations (verified on R2 under school/colors/adventures/). The artwork
// is the story card; the interactive board below it is a real painting tool:
// tap-to-fill SVG regions with outlines that stay, a true primary-color
// mixing lab (red+yellow=orange, yellow+blue=green, blue+red=purple),
// movable decorations, a rainbow to build in order, warm/cool sorting and a
// free splatter canvas. Pointer Events throughout — finger, stylus, mouse.
// Undo, redo, clear, Save to My Classroom (existing profile, localStorage)
// and Download. No grading of creative choices, no timers, no scores.
import {COLOR_BASE,C,shapeSVG,backdrop,celebrate,controls,crumbNav,heading,esc} from './adventure-kit.mjs';
import {SHAPE_LIB_PATH} from './shape-adventures.mjs';

export const colorCreativities=[
 {
  num:1,slug:'chameleon-color-magic',img:'chameleon-color-magic.webp',
  title:'Chameleon’s Color Magic',h1:'Chameleon’s Color Magic',
  tag:'Pick a color, tap the chameleon, and watch it change.',
  skill:'Color naming',engine:'fill',backdrop:'forest',
  say:'Pick a color, then tap the chameleon’s head, body or tail to paint it.',
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
  tag:'Paint the wings — with Magic Mirror on, both sides match.',
  skill:'Symmetry and color',engine:'fill',backdrop:'garden',mirror:true,
  say:'Pick a color and tap a wing piece. With the Magic Mirror on, the other wing paints itself!',
  hint:'Beautiful wings. Ready for fluttering!',
  doneTitle:'A magnificent butterfly!',
  doneSub:'Whether the wings match or not, this butterfly is one of a kind.',
  alt:'A friendly butterfly with empty wing sections ready to paint, surrounded by flowers.'
 },
 {
  num:4,slug:'rainbow-sundae-studio',img:'rainbow-sundae-studio.webp',
  title:'Rainbow Sundae Studio',h1:'Rainbow Sundae Studio',
  tag:'Stack scoops, add toppings — build the silliest sundae in town.',
  skill:'Creating and decorating',engine:'decorate',backdrop:'room',
  say:'Tap a flavor to add a scoop. Tap a scoop on the sundae, then tap Remove if you change your mind.',
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
  tag:'Color the fish, the turtle, the coral and every corner of the reef.',
  skill:'Coloring inside the lines',engine:'fill',backdrop:'sea',
  say:'Pick a color, then tap a part of the ocean picture to paint it.',
  hint:'The reef is waking up with color!',
  doneTitle:'A rainbow reef!',
  doneSub:'The fish, the turtle and the coral all thank you.',
  alt:'An ocean scene with a clownfish, a sea turtle, coral and shells waiting for color.'
 },
 {
  num:6,slug:'little-pottery-artist',img:'little-pottery-artist.webp',
  title:'Little Pottery Artist',h1:'Little Pottery Artist',
  tag:'Paint the vase and the little pots in your own colors and patterns.',
  skill:'Coloring and design',engine:'fill',backdrop:'room',
  say:'Pick a color, then tap the vase or a pot to paint it.',
  hint:'A lovely glaze!',
  doneTitle:'A whole pottery studio of your own!',
  doneSub:'Every pot is different, just the way artists like it.',
  alt:'A pottery studio with a big vase on a wheel and little pots ready for paint.'
 },
 {
  num:7,slug:'rainbow-weather-machine',img:'rainbow-weather-machine.webp',
  title:'Rainbow Weather Machine',h1:'Rainbow Weather Machine',
  tag:'The machine asks for one color at a time — build the rainbow in order.',
  skill:'Rainbow color order',engine:'sequence',backdrop:'sky',
  say:'The weather machine shows a color chip. Pick that color, then tap the arc it asks for.',
  hint:'Right color, right arc — the machine hums happily!',
  doneTitle:'Somewhere over the rainbow!',
  doneSub:'Red, orange, yellow, green, blue, purple — you know the rainbow order!',
  alt:'A rainbow-making machine with six empty arcs, a smiling sun and paint pots.',
  order:[['#e04b3f','red'],['#f07f28','orange'],['#f5c531','yellow'],['#4a9e4f','green'],['#5aa7d6','blue'],['#8f4fc0','purple']]
 },
 {
  num:8,slug:'birdhouse-painting-workshop',img:'birdhouse-painting-workshop.webp',
  title:'Birdhouse Painting Workshop',h1:'Birdhouse Painting Workshop',
  tag:'Paint roofs, walls and doors — finish a house and a bird moves in.',
  skill:'Coloring and care',engine:'fill',backdrop:'garden',
  say:'Pick a color, then tap a roof, a wall or a round door to paint it.',
  hint:'Cozy colors! Finish a house and a bird will visit.',
  doneTitle:'Three birdhouses, three happy birds!',
  doneSub:'Painted with care — the birds approve.',
  alt:'Three wooden birdhouses with paint pots, waiting to be painted.'
 },
 {
  num:9,slug:'crystal-cave-colors',img:'crystal-cave-colors.webp',
  title:'Crystal Cave Colors',h1:'Crystal Cave Colors',
  tag:'Sort the crystals — warm colors to the fire cave, cool colors to the ice cave.',
  skill:'Warm and cool colors',engine:'sort',backdrop:'night',
  say:'Tap a crystal, then tap its cave. Warm colors like red, orange and yellow go to the fire cave.',
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
  tag:'Color the outfits — and try the stripe, dot and check patterns.',
  skill:'Colors and patterns',engine:'fill',backdrop:'room',patterns:true,
  say:'Pick a color or a pattern, then tap a part of the outfit.',
  hint:'Straight off the runway!',
  doneTitle:'A whole fashion show!',
  doneSub:'Colors, patterns, and a designer with great taste.',
  alt:'A fashion studio with a dress, a shirt-and-shorts set and a coat on mannequins.'
 },
 {
  num:11,slug:'color-changing-car-wash',img:'color-changing-car-wash.webp',
  title:'Color-Changing Car Wash',h1:'Color-Changing Car Wash',
  tag:'Repaint the car, the bus and the fire truck any color you like.',
  skill:'Color choice',engine:'fill',backdrop:'sky',
  say:'Pick a color, then tap the part of a vehicle you want to repaint.',
  hint:'Shiny as new!',
  doneTitle:'The car wash is open!',
  doneSub:'Three brand-new paint jobs. Which one drives first?',
  alt:'A car, a bus and a fire truck at a rainbow car wash, waiting for new colors.'
 },
 {
  num:12,slug:'magical-lantern-festival',img:'magical-lantern-festival.webp',
  title:'Magical Lantern Festival',h1:'Magical Lantern Festival',
  tag:'Paint the lanterns, then switch on festival night to watch them glow.',
  skill:'Color and light',engine:'fill',backdrop:'night',glow:true,
  say:'Pick a color and tap a lantern panel. Then press Festival night and watch them glow.',
  hint:'Warm and bright!',
  doneTitle:'The festival is glowing!',
  doneSub:'Every lantern shines with your colors.',
  alt:'Hanging festival lanterns with empty panels, stars and a little fox.'
 },
 {
  num:13,slug:'magic-flower-color-garden',img:'magic-flower-color-garden.webp',
  title:'Magic Flower Color Garden',h1:'Magic Flower Color Garden',
  tag:'Tap the petals one by one — grow a garden in every color you love.',
  skill:'Petal-by-petal coloring',engine:'fill',backdrop:'garden',
  say:'Pick a color, then tap one petal at a time. Every petal can be its own color!',
  hint:'Petal by petal, the garden grows.',
  doneTitle:'A magic garden in full bloom!',
  doneSub:'No two petals need to match — gardens love variety.',
  alt:'A garden of five daisies with empty petals ready for color.'
 },
 {
  num:14,slug:'jellyfish-glow-party',img:'jellyfish-glow-party.webp',
  title:'Jellyfish Glow Party',h1:'Jellyfish Glow Party',
  tag:'Give the jellyfish glowing domes and tentacles, then dim the lights.',
  skill:'Color design',engine:'fill',backdrop:'sea',glow:true,
  say:'Pick a glow color, then tap a jellyfish dome or its tentacles.',
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
  tag:'Color the four kite panels and the tail bows, then let it fly.',
  skill:'Design and color',engine:'fill',backdrop:'sky',
  say:'Pick a color, then tap a kite panel or a tail bow.',
  hint:'That kite has your name on it!',
  doneTitle:'Go fly your kite!',
  doneSub:'Four panels, three bows, one amazing design.',
  alt:'A diamond kite with four empty panels and bow ties on its tail.'
 },
 {
  num:17,slug:'rainbow-fish-aquarium',img:'rainbow-fish-aquarium.webp',
  title:'Rainbow Fish Aquarium',h1:'Rainbow Fish Aquarium',
  tag:'Place fish, plants and castles in the tank — then move them anywhere.',
  skill:'Designing a world',engine:'decorate',backdrop:'sea',
  say:'Tap a fish or a plant, then tap inside the tank to place it. Tap a fish again to pick it up.',
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
  tag:'Frost the cake, color the candles and add the decorations.',
  skill:'Coloring and decorating',engine:'fill+decorate',backdrop:'room',
  say:'First pick colors and tap the cake. Then choose a decoration and tap the cake to place it.',
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

/* ---------- scene builders ---------- */

// attribute helper for a paintable region
const reg=(id,name,mirror)=>`class="cc-region" data-cc-fill="${id}" data-cc-name="${esc(name)}"${mirror?` data-cc-mirror="${mirror}"`:''} fill="#ffffff" stroke="#3a3350" stroke-width="5" stroke-linejoin="round"`;
const fix=(fill,extra='')=>`fill="${fill}" stroke="#3a3350" stroke-width="5" stroke-linejoin="round" ${extra}`;

function chameleonScene(){
 return `<path d="M40,430 C240,360 620,360 880,420 L880,470 C620,414 240,414 52,478 Z" ${fix('#a9744f')}/>
  <path d="M610,300 C700,240 760,250 780,300 C800,350 740,390 690,370 C720,360 736,340 726,320 C716,300 680,306 664,326 Z" ${reg('tail','the curly tail')}/>
  <ellipse cx="430" cy="300" rx="180" ry="110" ${reg('body','the chameleon’s body')}/>
  <path d="M560,240 C610,210 660,220 680,250 C660,290 610,300 570,290 Z" ${reg('head','the head')}/>
  <path d="M596,196 l20,-34 l16,32 l20,-26 l12,30 Z" ${reg('crest','the crest')}/>
  <path d="M380,398 L360,452 L410,452 Z" ${reg('leg1','the front leg')}/>
  <path d="M500,400 L520,452 L470,452 Z" ${reg('leg2','the back leg')}/>
  <path d="M300,240 l16,-26 l12,24 M340,222 l14,-24 l12,22" ${reg('spikes','the back spikes')}/>
  <circle cx="646" cy="252" r="20" ${fix('#3a3350')}/><circle cx="652" cy="246" r="6" fill="#fff"/>
  <path d="M672,286 q14,10 26,2" stroke="#3a3350" stroke-width="4" fill="none" stroke-linecap="round"/>`;
}

function butterflyScene(){
 return `<path d="M450,200 C380,150 260,140 220,210 C185,272 240,330 320,330 C260,360 280,440 350,440 C410,440 444,380 450,330 Z" ${reg('wl-big','the left wing','wr-big')}/>
  <path d="M450,200 C520,150 640,140 680,210 C715,272 660,330 580,330 C640,360 620,440 550,440 C490,440 456,380 450,330 Z" ${reg('wr-big','the right wing','wl-big')}/>
  <circle cx="330" cy="235" r="26" ${reg('wl-spot','the left spot','wr-spot')}/>
  <circle cx="570" cy="235" r="26" ${reg('wr-spot','the right spot','wl-spot')}/>
  <circle cx="352" cy="386" r="18" ${reg('wl-spot2','the lower left spot','wr-spot2')}/>
  <circle cx="548" cy="386" r="18" ${reg('wr-spot2','the lower right spot','wl-spot2')}/>
  <ellipse cx="255" cy="300" rx="34" ry="22" ${reg('wl-edge','the left wing edge','wr-edge')}/>
  <ellipse cx="645" cy="300" rx="34" ry="22" ${reg('wr-edge','the right wing edge','wl-edge')}/>
  <ellipse cx="450" cy="290" rx="26" ry="110" ${fix('#f5c531')}/>
  <circle cx="450" cy="180" r="34" ${fix('#f5c531')}/>
  <circle cx="438" cy="172" r="6" fill="#3a3350"/><circle cx="462" cy="172" r="6" fill="#3a3350"/>
  <path d="M438,150 q-16,-26 -34,-30 M462,150 q16,-26 34,-30" stroke="#3a3350" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M120,470 q20,-40 40,0 M740,470 q20,-40 40,0" ${fix('#4a9e4f')}/>
  <circle cx="90" cy="440" r="16" ${fix('#f28ab5')}/><circle cx="810" cy="440" r="16" ${fix('#f28ab5')}/>`;
}

function oceanScene(){
 return `<path d="M60,470 C70,400 60,360 80,320 M120,474 C130,410 120,370 140,330" stroke="#4a9e4f" stroke-width="12" fill="none" stroke-linecap="round"/>
  <ellipse cx="420" cy="220" rx="150" ry="105" ${reg('fish-body','the fish’s body')}/>
  <path d="M262,220 C210,180 200,260 262,220" ${reg('fish-tail','the fish’s tail')}/>
  <path d="M400,116 C420,80 470,80 480,118 Z" ${reg('fish-fin','the top fin')}/>
  <path d="M380,150 C360,220 360,290 380,320 M460,140 C440,220 440,260 460,310" ${reg('fish-stripe','the white stripe')}/>
  <circle cx="380" cy="196" r="9" fill="#3a3350"/>
  <path d="M360,260 q16,14 32,0" stroke="#3a3350" stroke-width="4" fill="none" stroke-linecap="round"/>
  <ellipse cx="720" cy="380" rx="110" ry="82" ${reg('turtle-shell','the turtle’s shell')}/>
  <circle cx="620" cy="330" r="34" ${reg('turtle-head','the turtle’s head')}/>
  <path d="M700,446 q30,26 60,4" ${reg('turtle-flipper','a flipper')}/>
  <circle cx="612" cy="322" r="5" fill="#3a3350"/>
  <path d="M170,470 C150,420 180,390 160,350 C200,380 210,430 200,470 Z" ${reg('coral1','the pink coral')}/>
  <path d="M300,470 q-6,-60 30,-84 M330,470 q10,-50 -14,-76 M270,470 q-20,-40 -6,-70" ${reg('coral2','the blue coral')}/>
  <path d="M520,470 l16,-34 l16,34 l16,-38 l16,38 l14,-28 l12,28 Z" ${reg('starfish','the starfish')}/>
  <path d="M610,120 a30,26 0 0 1 60,0 l-6,18 a24,20 0 0 1 -48,0 Z" ${reg('shell','the little shell')}/>
  <circle cx="500" cy="90" r="12" fill="#fff" opacity="0.7"/><circle cx="530" cy="60" r="8" fill="#fff" opacity="0.7"/>`;
}

function potteryScene(){
 return `<rect x="60" y="430" width="780" height="26" rx="13" ${fix('#c8a06a')}/>
  <path d="M380,150 C300,180 280,300 330,400 C360,430 500,430 530,400 C580,300 560,180 480,150 Z" ${reg('vase-body','the vase’s body')}/>
  <rect x="400" y="96" width="60" height="60" rx="14" ${reg('vase-neck','the vase’s neck')}/>
  <rect x="382" y="76" width="96" height="26" rx="13" ${reg('vase-rim','the vase’s rim')}/>
  <rect x="356" y="398" width="150" height="30" rx="12" ${reg('vase-foot','the vase’s base')}/>
  <path d="M170,300 C130,310 124,380 160,398 C190,410 220,398 224,372 C228,330 210,306 170,300 Z" ${reg('pot1','the little round pot')}/>
  <rect x="640" y="330" width="90" height="72" rx="16" ${reg('pot2','the square pot')}/>
  <circle cx="120" cy="150" r="26" ${fix('#e04b3f')}/><circle cx="190" cy="150" r="26" ${fix('#f5c531')}/><circle cx="260" cy="150" r="26" ${fix('#5aa7d6')}/>
  <rect x="96" y="176" width="48" height="14" rx="7" ${fix('#a9744f')}/><rect x="166" y="176" width="48" height="14" rx="7" ${fix('#a9744f')}/><rect x="236" y="176" width="48" height="14" rx="7" ${fix('#a9744f')}/>
  <ellipse cx="440" cy="456" rx="120" ry="14" ${fix('#9aa5b1')}/>`;
}

function fashionScene(){
 return `<defs>
   <pattern id="pat-stripes" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#ffffff"/><rect width="13" height="26" fill="#e04b3f"/></pattern>
   <pattern id="pat-dots" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#ffffff"/><circle cx="9" cy="9" r="6" fill="#5aa7d6"/><circle cx="24" cy="24" r="6" fill="#5aa7d6"/></pattern>
   <pattern id="pat-checks" width="28" height="28" patternUnits="userSpaceOnUse"><rect width="28" height="28" fill="#ffffff"/><rect width="14" height="14" fill="#4a9e4f"/><rect x="14" y="14" width="14" height="14" fill="#4a9e4f"/></pattern>
  </defs>
  <path d="M180,470 L210,320 L240,470 Z" ${fix('#9aa5b1')}/><path d="M450,470 L480,320 L510,470 Z" ${fix('#9aa5b1')}/><path d="M720,470 L750,320 L780,470 Z" ${fix('#9aa5b1')}/>
  <path d="M150,180 C150,130 270,130 270,180 L280,250 C280,290 140,290 140,250 Z" ${reg('bodice','the dress top')}/>
  <path d="M140,250 C110,360 130,430 210,430 C290,430 310,360 280,250 Z" ${reg('skirt','the skirt')}/>
  <circle cx="210" cy="96" r="30" ${fix('#f2c9a0')}/><path d="M180,120 q30,26 60,0" stroke="#3a3350" stroke-width="4" fill="none"/>
  <rect x="400" y="150" width="160" height="120" rx="18" ${reg('shirt','the shirt')}/>
  <path d="M420,270 L540,270 L560,330 L400,330 Z" ${reg('shorts','the shorts')}/>
  <circle cx="480" cy="110" r="30" ${fix('#f2c9a0')}/>
  <path d="M690,140 L790,140 L810,360 C810,392 670,392 670,360 Z" ${reg('coat','the coat')}/>
  <path d="M722,140 L740,200 L758,140" ${reg('lapel','the coat’s lapels')}/>
  <path d="M156,404 C180,424 240,424 264,404 L268,428 C240,444 180,444 152,428 Z" ${reg('hem','the skirt hem')}/>
  <circle cx="740" cy="100" r="28" ${fix('#f2c9a0')}/>
  <path d="M120,80 h60 M120,104 h40" stroke="#c8a06a" stroke-width="8" stroke-linecap="round"/>`;
}

function carwashScene(){
 return `<path d="M450,60 a260,200 0 0 1 260,200" stroke="#e04b3f" stroke-width="18" fill="none"/>
  <path d="M450,60 a260,200 0 0 0 -260,200" stroke="#f5c531" stroke-width="18" fill="none"/>
  <path d="M450,96 a200,160 0 0 1 200,160" stroke="#4a9e4f" stroke-width="18" fill="none"/>
  <path d="M450,96 a200,160 0 0 0 -200,160" stroke="#5aa7d6" stroke-width="18" fill="none"/>
  <circle cx="150" cy="90" r="30" ${fix('#f5c531')} /><circle cx="150" cy="90" r="18" fill="none" stroke="#e08a2a" stroke-width="5"/>
  <g transform="translate(150 330)">
   <path d="M-110,40 C-110,-4 -70,-40 -20,-40 L40,-40 C80,-40 110,-4 110,40 Z" ${reg('car-body','the car’s body')}/>
   <path d="M-56,-40 C-40,-76 40,-76 56,-40 Z" ${reg('car-roof','the car’s roof')}/>
   <circle cx="-58" cy="44" r="24" ${fix('#3a3350')}/><circle cx="-58" cy="44" r="10" ${reg('car-hub1','a hubcap')}/>
   <circle cx="58" cy="44" r="24" ${fix('#3a3350')}/><circle cx="58" cy="44" r="10" ${reg('car-hub2','a hubcap')}/>
   <circle cx="86" cy="8" r="8" ${fix('#f5c531')}/>
  </g>
  <g transform="translate(450 340)">
   <rect x="-120" y="-52" width="240" height="92" rx="18" ${reg('bus-body','the bus’s body')}/>
   <rect x="-120" y="-52" width="240" height="26" rx="13" ${reg('bus-roof','the bus’s roof')}/>
   <rect x="-92" y="-20" width="40" height="30" rx="6" ${fix('#bfe3f7')}/><rect x="-38" y="-20" width="40" height="30" rx="6" ${fix('#bfe3f7')}/><rect x="16" y="-20" width="40" height="30" rx="6" ${fix('#bfe3f7')}/>
   <circle cx="-64" cy="44" r="24" ${fix('#3a3350')}/><circle cx="64" cy="44" r="24" ${fix('#3a3350')}/>
   <circle cx="-64" cy="44" r="9" ${reg('bus-hub','a hubcap')}/><circle cx="64" cy="44" r="9" ${reg('bus-hub2','a hubcap')}/>
  </g>
  <g transform="translate(750 350)">
   <rect x="-86" y="-30" width="150" height="70" rx="12" ${reg('truck-body','the fire truck’s body')}/>
   <path d="M-86,-30 L-86,-62 L-30,-62 L-6,-30 Z" ${reg('truck-cab','the truck’s cab')}/>
   <rect x="-40" y="-88" width="16" height="60" rx="8" ${reg('truck-ladder','the ladder')}/>
   <rect x="-46" y="-88" width="28" height="12" rx="6" ${reg('truck-top','the siren top')}/>
   <circle cx="-52" cy="44" r="22" ${fix('#3a3350')}/><circle cx="52" cy="44" r="22" ${fix('#3a3350')}/>
   <circle cx="-52" cy="44" r="9" ${reg('truck-hub','a hubcap')}/><circle cx="52" cy="44" r="9" ${reg('truck-hub2','a hubcap')}/>
  </g>`;
}

function lanternScene(){
 const lantern=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})">
   <path d="M0,-96 L0,-64" stroke="#3a3350" stroke-width="4"/>
   <ellipse cx="0" cy="0" rx="58" ry="64" ${reg('lantern-panel'+x,'a lantern panel')}/>
   <ellipse cy="-2" rx="26" ry="30" ${reg('lantern-core'+x,'a lantern medallion')}/>
   <rect x="-22" y="-72" width="44" height="14" rx="7" ${fix('#c8a06a')}/>
   <rect x="-16" y="58" width="32" height="12" rx="6" ${fix('#c8a06a')}/>
   <path d="M0,70 l0,22 M-8,70 l-4,20 M8,70 l4,20" stroke="${C.orange}" stroke-width="4"/>
   <path d="M-30,-30 a34,34 0 0 1 30,-16" stroke="#fff" stroke-width="4" fill="none" opacity="0.5"/>
  </g>`;
 return lantern(180,190,1)+lantern(430,140,0.85)+lantern(660,210,1.05)+lantern(830,120,0.7)
  +`<circle cx="80" cy="80" r="5" fill="${C.yellow}"/><circle cx="320" cy="60" r="4" fill="${C.yellow}"/><circle cx="560" cy="90" r="5" fill="${C.yellow}"/><circle cx="760" cy="60" r="4" fill="${C.yellow}"/>`;
}

function flowersScene(){
 let s='';
 const flower=(fx,fy,r)=>{
  for(let i=0;i<6;i++){
   const a=(Math.PI*2/6)*i - Math.PI/2;
   const px=fx+Math.cos(a)*r, py=fy+Math.sin(a)*r;
   s+=`<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${(r*0.62).toFixed(1)}" ry="${(r*0.4).toFixed(1)}" transform="rotate(${(a*180/Math.PI+90).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})" ${reg(`petal-${fx}-${i}`,'a petal')}/>`;
  }
  s+=`<circle cx="${fx}" cy="${fy}" r="${(r*0.36).toFixed(1)}" ${reg(`center-${fx}`,'the flower’s center')}/>`;
 };
 flower(170,250,86);flower(400,180,74);flower(620,250,86);flower(820,170,64);
 s+=`<path d="M170,340 q-6,60 10,110 M400,266 q10,60 -6,120 M620,340 q-8,64 8,116 M820,240 q6,70 -6,150" stroke="#4a9e4f" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M150,420 q-26,-4 -34,-26 q28,-2 34,26 Z" ${fix('#4a9e4f')}/><path d="M410,392 q26,-6 36,-26 q-28,-4 -36,26 Z" ${fix('#4a9e4f')}/>
  <rect x="60" y="470" width="240" height="34" rx="17" ${fix('#5aa7d6')}/><circle cx="80" cy="487" r="6" fill="#fff"/><circle cx="110" cy="487" r="6" fill="#fff"/>`;
 return s;
}

function jellyScene(){
 const jelly=(x,y,s,i)=>`<g transform="translate(${x} ${y}) scale(${s})">
   <path d="M-70,0 C-70,-72 70,-72 70,0 C40,10 -40,10 -70,0 Z" ${reg(`jdome${i}`,'a jellyfish dome')}/>
   <path d="M-52,8 q-10,44 6,84 M-20,10 q6,48 -6,92 M14,10 q10,44 0,88 M48,8 q14,40 4,78" ${reg(`jtent${i}`,'the tentacles')} fill="none" stroke="#3a3350" stroke-width="5"/>
   <circle cx="-22" cy="-22" r="7" fill="#3a3350"/><circle cx="22" cy="-22" r="7" fill="#3a3350"/>
   <path d="M-12,-6 q12,12 24,0" stroke="#3a3350" stroke-width="4" fill="none" stroke-linecap="round"/>
  </g>`;
 return jelly(210,240,1,1)+jelly(460,170,0.85,2)+jelly(700,260,1.1,3)
  +`<path d="M60,470 q-10,-50 20,-80 M100,470 q16,-44 -8,-70" ${fix('#f28ab5')}/>
  <path d="M780,470 q-6,-44 24,-64 M820,470 q14,-40 -6,-60" ${fix('#7cd8c3')}/>
  <circle cx="350" cy="480" r="16" ${fix('#5aa7d6')}/><circle cx="560" cy="500" r="12" ${fix('#5aa7d6')}/>`;
}

function kiteScene(){
 return `<g data-cc-kite>
  <path d="M430,60 L560,240 L430,420 L300,240 Z" fill="none"/>
  <path d="M430,60 L300,240 L430,240 Z" ${reg('kq1','the top-left kite panel')}/>
  <path d="M430,60 L560,240 L430,240 Z" ${reg('kq2','the top-right kite panel')}/>
  <path d="M300,240 L430,240 L430,420 Z" ${reg('kq3','the bottom-left kite panel')}/>
  <path d="M560,240 L430,240 L430,420 Z" ${reg('kq4','the bottom-right kite panel')}/>
  <path d="M430,60 L430,420 M300,240 L560,240" stroke="#3a3350" stroke-width="6"/>
  <path d="M430,420 q40,60 -10,100" stroke="#3a3350" stroke-width="4" fill="none"/>
  <path d="M436,462 l36,-14 l-8,30 Z" ${reg('bow1','a tail bow')}/>
  <path d="M420,506 l-36,12 l26,20 Z" ${reg('bow2','a tail bow')}/>
 </g>
 <path d="M120,180 q30,-40 60,0 q30,40 60,0" stroke="#3a3350" stroke-width="4" fill="none" opacity="0.4"/>
 <ellipse cx="150" cy="80" rx="48" ry="20" fill="#fff" opacity="0.9"/><ellipse cx="700" cy="70" rx="56" ry="22" fill="#fff" opacity="0.9"/>
 <ellipse cx="80" cy="480" rx="40" ry="14" ${fix('#7cc47f')}/>`;
}

function cakeScene(){
 return `<ellipse cx="450" cy="470" rx="190" ry="34" ${reg('plate','the cake plate')}/>
  <path d="M300,360 C300,330 330,318 360,330 C370,300 410,300 420,326 C440,300 480,306 486,330 C510,316 550,324 556,352 C580,346 600,362 600,380 L600,420 L300,420 Z" ${reg('frosting','the frosting drips')}/>
  <rect x="300" y="416" width="300" height="54" rx="16" ${reg('tier2','the bottom tier')}/>
  <rect x="360" y="330" width="180" height="92" rx="16" ${reg('tier1','the top tier')}/>
  <rect x="390" y="248" width="14" height="76" rx="7" ${reg('candle1','the first candle')}/>
  <rect x="443" y="248" width="14" height="76" rx="7" ${reg('candle2','the second candle')}/>
  <rect x="496" y="248" width="14" height="76" rx="7" ${reg('candle3','the third candle')}/>
  <ellipse cx="397" cy="238" rx="10" ry="14" ${fix('#f5c531')}/><ellipse cx="450" cy="238" rx="10" ry="14" ${fix('#f07f28')}/><ellipse cx="503" cy="238" rx="10" ry="14" ${fix('#e04b3f')}/>
  <path d="M120,120 q30,26 60,0 M740,140 q24,20 48,0" stroke="#f28ab5" stroke-width="5" fill="none" stroke-linecap="round"/>
  <circle cx="760" cy="90" r="7" ${fix('#f5c531')}/>
  <g data-cc-stage></g>`;
}

function rainbowMachineScene(){
 const arc=(r,w)=>`<path d="M ${450-r},430 A ${r},${r*0.78} 0 0 1 ${450+r},430" stroke="#ffffff" stroke-width="${w}" fill="none" stroke-linecap="round" class="cc-region" data-cc-fill="arc${r}" data-cc-mode="stroke" data-cc-name="the ${r}px rainbow arc"/>`;
 return arc(230,34)+arc(180,32)+arc(132,30)+arc(88,28)+arc(50,26)+arc(18,22)
  +`<circle cx="130" cy="110" r="40" ${fix('#f5c531')}/>
  <g transform="translate(760 330)">
   <rect x="-58" y="-60" width="116" height="120" rx="18" ${fix('#8fbfe8')}/>
   <rect x="-40" y="-44" width="80" height="52" rx="8" ${fix('#fff7ea')}/>
   <circle cx="-20" cy="-18" r="10" fill="#3a3350"/><circle cx="20" cy="-18" r="10" fill="#3a3350"/>
   <path d="M-16,26 h32" stroke="#3a3350" stroke-width="5" stroke-linecap="round"/>
   <path d="M0,-60 L0,-92" stroke="#3a3350" stroke-width="5"/><circle cx="0" cy="-100" r="10" ${fix('#e04b3f')}/>
   <circle cx="-66" cy="30" r="16" ${fix('#c8a06a')}/><circle cx="66" cy="30" r="16" ${fix('#c8a06a')}/>
  </g>
  <ellipse cx="240" cy="452" rx="70" ry="26" fill="#fff"/><ellipse cx="620" cy="452" rx="70" ry="26" fill="#fff"/>
  <g data-cc-sun hidden><circle cx="130" cy="110" r="52" fill="#f5c531" opacity="0.45"/></g>`;
}

function crystalScene(){
 return `<path d="M60,470 C60,250 260,220 300,300 C330,360 300,470 300,470 Z" ${fix('#e08a2a','# opacity="0.25"')}
  /><path d="M840,470 C840,250 640,220 600,300 C570,360 600,470 600,470 Z" ${fix('#8fbfe8','# opacity="0.3"')}
  /><g data-cc-bin="warm" transform="translate(230 330)" role="button" tabindex="0" aria-label="The fire cave"><ellipse rx="120" ry="130" fill="none" stroke="#e08a2a" stroke-width="6" stroke-dasharray="12 10"/><path d="M-40,60 q40,-20 80,0" stroke="#e08a2a" stroke-width="5" fill="none"/></g>
  <g data-cc-bin="cool" transform="translate(670 330)" role="button" tabindex="0" aria-label="The ice cave"><ellipse rx="120" ry="130" fill="none" stroke="#5aa7d6" stroke-width="6" stroke-dasharray="12 10"/><path d="M-40,60 q40,-20 80,0" stroke="#5aa7d6" stroke-width="5" fill="none"/></g>
  <text x="230" y="500" text-anchor="middle" font-size="26" fill="#fff7ea" font-family="inherit">Fire cave</text>
  <text x="670" y="500" text-anchor="middle" font-size="26" fill="#fff7ea" font-family="inherit">Ice cave</text>
  <circle cx="230" cy="180" r="16" ${fix('#f5c531')}/><circle cx="230" cy="180" r="24" fill="none" stroke="#f5c531" stroke-width="3" opacity="0.6"/>`;
}

/* big fixed props for decorate boards */
function sundaeScene(){
 return `<path d="M330,320 C330,300 570,300 570,320 L560,380 C550,430 350,430 340,380 Z" ${fix('#dfe9f2')}/>
  <path d="M340,380 C360,436 540,436 560,380" fill="none" stroke="#3a3350" stroke-width="5"/>
  <path d="M450,430 L450,470 M400,470 h100" stroke="#3a3350" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="450" cy="470" rx="120" ry="16" ${fix('#c8a06a')}/>
  <g data-cc-stage></g>
  <circle cx="130" cy="130" r="34" ${fix('#f28ab5')}/><circle cx="130" cy="130" r="20" fill="#f8bcd2"/>
  <circle cx="780" cy="120" r="30" ${fix('#a9744f')}/><circle cx="780" cy="120" r="18" fill="#c39163"/>
  <path d="M120,430 q20,-40 44,0 Z" ${fix('#e04b3f')}/>`;
}

function aquariumScene(){
 return `<rect x="140" y="80" width="620" height="380" rx="26" ${fix('#bfe3f7','# fill="#bfe3f7"')}/>
  <rect x="150" y="90" width="600" height="360" rx="20" fill="#a5d8f2" opacity="0.7"/>
  <path d="M170,100 q40,30 0,60 q-30,26 0,54" stroke="#fff" stroke-width="4" fill="none" opacity="0.5"/>
  <rect x="120" y="70" width="660" height="24" rx="12" ${fix('#3d7fc4')}/>
  <rect x="120" y="446" width="660" height="24" rx="12" ${fix('#3d7fc4')}/>
  <rect x="380" y="470" width="140" height="30" rx="10" ${fix('#c8a06a')}/>
  <g data-cc-stage></g>`;
}

/* item renderers for decorate engines (drawn centered at 0,0) */
export function decorItemSVG(item){
 switch(item.kind){
  case 'scoop': return `<path d="M-44,10 C-44,-34 44,-34 44,10 C44,26 -44,26 -44,10 Z" fill="${item.color}" stroke="#3a3350" stroke-width="5"/><circle cx="-16" cy="-8" r="4" fill="#fff" opacity="0.5"/><circle cx="14" cy="-14" r="4" fill="#fff" opacity="0.5"/>`;
  case 'cherry': return `<circle r="14" fill="${item.color}" stroke="#3a3350" stroke-width="4"/><path d="M0,-13 q4,-16 14,-20" stroke="#4a9e4f" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  case 'wafer': return `<rect x="-12" y="-26" width="24" height="52" rx="6" fill="${item.color}" stroke="#3a3350" stroke-width="4"/><path d="M-8,-16 h16 M-8,0 h16 M-8,16 h16" stroke="#d9b078" stroke-width="3"/>`;
  case 'fish': return `<path d="M-30,0 C-14,-22 22,-22 34,0 C22,22 -14,22 -30,0 Z" fill="${item.color}" stroke="#3a3350" stroke-width="4"/><path d="M-30,0 L-48,-16 L-44,0 L-48,16 Z" fill="${item.color}" stroke="#3a3350" stroke-width="4"/><circle cx="18" cy="-4" r="4" fill="#3a3350"/>`;
  case 'plant': return `<path d="M0,26 C-4,-6 -18,-16 -12,-38 M0,26 C6,-10 16,-18 14,-40 M0,26 C-2,-2 -2,-14 0,-24" stroke="${item.color}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  case 'castle': return `<rect x="-30" y="-24" width="60" height="50" fill="${item.color}" stroke="#3a3350" stroke-width="4"/><rect x="-38" y="-40" width="18" height="66" fill="${item.color}" stroke="#3a3350" stroke-width="4"/><rect x="20" y="-40" width="18" height="66" fill="${item.color}" stroke="#3a3350" stroke-width="4"/><path d="M-38,-40 L-29,-54 L-20,-40 M20,-40 L29,-54 L38,-40" fill="${item.color}" stroke="#3a3350" stroke-width="4"/><rect x="-7" y="-8" width="14" height="34" fill="#8a5a34"/>`;
  case 'coral': return `<path d="M0,26 C-2,-2 -14,-10 -10,-30 M0,26 C2,-8 12,-16 10,-34 M0,26 C0,-4 0,-16 0,-22" stroke="${item.color}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  case 'rock': return `<ellipse rx="24" ry="16" fill="${item.color}" stroke="#3a3350" stroke-width="4"/>`;
  case 'star': return `<path d="M0,-26 L8,-8 L27,-6 L12,7 L17,26 L0,15 L-17,26 L-12,7 L-27,-6 L-8,-8 Z" fill="${item.color}" stroke="#3a3350" stroke-width="4" stroke-linejoin="round"/>`;
  case 'heart': return `<path d="M0,22 C-20,8 -26,-4 -20,-14 C-15,-22 -5,-21 0,-13 C5,-21 15,-22 20,-14 C26,-4 20,8 0,22 Z" fill="${item.color}" stroke="#3a3350" stroke-width="4"/>`;
  case 'strawberry': return `<path d="M0,24 C-16,12 -20,-4 -14,-14 C-8,-22 8,-22 14,-14 C20,-4 16,12 0,24 Z" fill="${item.color}" stroke="#3a3350" stroke-width="4"/><path d="M-10,-16 q10,8 20,0" stroke="#4a9e4f" stroke-width="5" fill="none"/><circle cx="-6" cy="0" r="1.8" fill="#ffe1b0"/><circle cx="6" cy="6" r="1.8" fill="#ffe1b0"/>`;
 }
 return `<circle r="16" fill="${item.color}"/>`;
}

const flowerDot=(x,y,c)=>`<g transform="translate(${x} ${y})"><circle r="9" fill="#f5c531" stroke="#3a3350" stroke-width="3"/>${[0,60,120,180,240,300].map(a=>`<ellipse cx="${Math.round(Math.cos(a*Math.PI/180)*20)}" cy="${Math.round(Math.sin(a*Math.PI/180)*20)}" rx="12" ry="8" fill="${c}" stroke="#3a3350" stroke-width="3" transform="rotate(${a} ${Math.round(Math.cos(a*Math.PI/180)*20)} ${Math.round(Math.sin(a*Math.PI/180)*20)})"/>`).join('')}</g>`;
function birdhouseScene(){
 const house=(x,c)=>`<g transform="translate(${x} 240)">
  <path d="M-110,-40 L0,-130 L110,-40 Z" ${reg('roof'+x,'a roof')}/>
  <rect x="-88" y="-40" width="176" height="180" rx="10" ${reg('wall'+x,'a wall')}/>
  <circle cy="40" r="34" ${reg('door'+x,'a round door')}/>
  <rect x="-14" y="140" width="28" height="46" ${fix('#8a5a34')}/>
  <rect x="88" y="70" width="60" height="12" rx="6" ${reg('perch'+x,'a perch')}/>
 </g>`;
 return `<rect x="40" y="386" width="1520" height="20" rx="10" ${fix('#c8a06a')}/>
  ${house(300,'#')}${house(800,'#')}${house(1300,'#')}
  <g transform="translate(120,120)"><circle r="30" ${fix('#f28ab5')}/><path d="M-40,-10 q-18,-16 -8,-38" stroke="#3a3350" stroke-width="4" fill="none"/></g>
  <g transform="translate(1470,110)"><circle r="26" ${fix('#5aa7d6')}/><path d="M36,-4 q22,4 20,26" stroke="#3a3350" stroke-width="4" fill="none"/></g>
  ${flowerDot(120,470,'#f5c531')}${flowerDot(1490,470,'#f28ab5')}`;
}

/* ---------- board wrappers ---------- */

function fillBoard(a){
 const scene={ 'chameleon-color-magic':chameleonScene,'butterfly-wing-painter':butterflyScene,'paint-the-ocean':oceanScene,
  'little-pottery-artist':potteryScene,'little-fashion-designer':fashionScene,'color-changing-car-wash':carwashScene,
  'magical-lantern-festival':lanternScene,'magic-flower-color-garden':flowersScene,'jellyfish-glow-party':jellyScene,
  'kite-design-studio':kiteScene,'birthday-cake-color-studio':cakeScene,'birdhouse-painting-workshop':birdhouseScene }[a.slug];
 const svgs={};
 return `<svg class="cc-svg" viewBox="0 0 900 560" role="img" aria-label="${esc(a.alt)}" data-cc-scene>${scene()}</svg>
  <div class="cc-tools">
   <div class="cc-palette" role="group" aria-label="Colors">${(a.palette||STUDIO).map(([c,n])=>`<button type="button" class="cc-color" data-cc-color="${c}" data-cc-color-name="${n}" style="--pc:${c}" aria-label="The color ${n}"></button>`).join('')}</div>
   ${a.patterns?`<div class="cc-palette cc-patterns" role="group" aria-label="Patterns">
    <button type="button" class="cc-color" data-cc-color="url(#pat-stripes)" data-cc-color-name="red stripes" style="--pc:#e04b3f;background-image:repeating-linear-gradient(90deg,#fff 0 3px,#e04b3f 3px 6px)" aria-label="The stripe pattern"></button>
    <button type="button" class="cc-color" data-cc-color="url(#pat-dots)" data-cc-color-name="blue dots" style="--pc:#5aa7d6;background-image:radial-gradient(#fff 2px,transparent 2.6px);background-size:7px 7px" aria-label="The dot pattern"></button>
    <button type="button" class="cc-color" data-cc-color="url(#pat-checks)" data-cc-color-name="green checks" style="--pc:#4a9e4f;background-image:linear-gradient(90deg,transparent 46%,#fff 46% 54%),linear-gradient(transparent 46%,#fff 46% 54%);background-size:8px 8px" aria-label="The check pattern"></button>
   </div>`:''}
   ${a.mirror?`<button type="button" class="cc-toggle" data-cc-mirror-toggle aria-pressed="true">Magic Mirror: ON</button>`:''}
   ${a.items?`<div class="cc-tray" data-cc-tray>${a.items.map((it,i)=>`<button type="button" class="cc-piece" data-cc-item="${it.kind}" data-item-idx="${i}" data-item-color="${it.color}" aria-label="${esc(it.label)}" style="--pc:${it.color}"><svg viewBox="-60 -60 120 120" aria-hidden="true" focusable="false">${decorItemSVG(it)}</svg></button>`).join('')}</div>
   <div class="cc-toolbtns"><button type="button" class="button button-ghost" data-cc-deco-remove disabled>Remove selected</button></div>`:''}
   ${a.glow?`<button type="button" class="cc-toggle" data-cc-glow-toggle aria-pressed="false">Party lights: OFF</button>`:''}
   <div class="cc-toolbtns">
    <button type="button" class="button button-ghost" data-cc-undo>Undo</button>
    <button type="button" class="button button-ghost" data-cc-redo>Redo</button>
    <button type="button" class="button button-ghost" data-cc-clear>Clear</button>
   </div>
  </div>
  <p class="cc-save-row"><button type="button" class="button" data-cc-save>Save to My Classroom</button>
  <button type="button" class="button button-ghost" data-cc-download>Download</button>
  <span class="cc-save-note" data-cc-note aria-live="polite"></span></p>
  <div class="cc-gallery" data-cc-gallery hidden><p class="cc-gallery-title">Saved from this activity</p><div class="cc-gallery-row" data-cc-gallery-row></div></div>`;
}

function mixBoard(a){
 const jar=(key,name,c,x)=>`<g class="cc-jar" data-cc-jar="${key}" data-jar-name="${name}" transform="translate(${x} 200)" role="button" tabindex="0" aria-label="The ${name} paint jar">
   <path d="M-46,-40 C-46,-70 46,-70 46,-40 L40,66 C38,84 -38,84 -40,66 Z" ${fix(c)}/>
   <rect x="-54" y="-58" width="108" height="22" rx="11" ${fix('#a9744f')}/>
   <path d="M-30,-24 L-26,52 M0,-26 L0,58 M30,-24 L26,52" stroke="#fff" stroke-width="3" opacity="0.4" fill="none"/>
  </g>`;
 return `<svg class="cc-svg" viewBox="0 0 900 560" role="img" aria-label="${esc(a.alt)}" data-cc-scene>${backdrop('room')}
  ${jar('red','red',C.red,190)}${jar('yellow','yellow',C.yellow,450)}${jar('blue','blue',C.blue,710)}
  <ellipse cx="450" cy="420" rx="130" ry="40" ${fix('#dfe9f2')}/>
  <path d="M330,400 C330,360 570,360 570,400 C570,440 330,440 330,400" ${fix('#dfe9f2')}/>
  <g data-cc-mixbowl><path d="M338,404 C350,436 550,436 562,404 C550,428 350,428 338,404 Z" fill="#b8c9d8"/></g>
  <g data-cc-drop hidden><circle cx="450" cy="120" r="16" fill="#b8c9d8"/></g>
  </svg>
  <div class="cc-mix-ui">
   <p class="sa-ask" data-cc-mix-ask>Choose two jars, then press Mix.</p>
   <p class="cc-mix-chosen" data-cc-mix-chosen aria-live="polite">Chosen: nothing yet</p>
   <button type="button" class="button" data-cc-mix-go disabled>Mix!</button>
   <p class="cc-mix-result" data-cc-mix-result></p>
  </div>
  <div class="cc-recipes" data-cc-recipes>
   ${a.combos.map(c=>`<div class="cc-recipe" data-cc-recipe="${c.a}-${c.b}"><span class="cc-dot" style="--pc:${comboColor(c.a)}"></span><span>+</span><span class="cc-dot" style="--pc:${comboColor(c.b)}"></span><span>=</span><span class="cc-dot cc-dot-unknown" data-cc-result></span><span class="cc-recipe-name">${esc(c.name)}</span></div>`).join('')}
  </div>`;
}
const comboColor=k=>({red:C.red,yellow:C.yellow,blue:C.blue}[k]);

function sequenceBoard(a){
 return `<svg class="cc-svg" viewBox="0 0 900 560" role="img" aria-label="${esc(a.alt)}" data-cc-scene>${rainbowMachineScene()}</svg>
  <div class="cc-seq-ui">
   <p class="sa-ask" data-cc-seq-ask>The machine wants <strong>red</strong> for the biggest arc!</p>
   <div class="cc-palette" role="group" aria-label="Colors">${a.order.map(([c,n])=>`<button type="button" class="cc-color" data-cc-color="${c}" data-cc-color-name="${n}" style="--pc:${c}" aria-label="The color ${n}"></button>`).join('')}</div>
   <div class="cc-toolbtns"><button type="button" class="button button-ghost" data-cc-undo>Undo</button><button type="button" class="button button-ghost" data-cc-clear>Start over</button></div>
  </div>`;
}

function sortBoard(a){
 const crystals=a.items.map((it,i)=>`<button type="button" class="cc-piece" data-cc-item="${it.key}" data-item-idx="${i}" aria-label="${esc(it.label)}" style="--pc:${it.color}"><svg viewBox="-40 -70 80 140" aria-hidden="true" focusable="false"><path d="M-24,-40 L-24,30 L0,52 L24,30 L24,-40 L12,-56 L-12,-56 Z" fill="${it.color}" stroke="#3a3350" stroke-width="4" stroke-linejoin="round"/><path d="M-24,-40 L0,-20 L24,-40 M0,-20 L0,52" stroke="#3a3350" stroke-width="2.5" opacity="0.5" fill="none"/></svg></button>`).join('');
 return `<svg class="cc-svg" viewBox="0 0 900 560" role="img" aria-label="${esc(a.alt)}" data-cc-scene>${crystalScene()}
  <g data-cc-warmfill></g><g data-cc-coolfill></g></svg>
  <p class="sa-ask" data-cc-sort-ask>Tap a crystal, then tap its cave.</p>
  <div class="cc-tray" data-cc-tray>${crystals}</div>`;
}

function canvasBoard(a){
 return `<div class="cc-canvas-wrap" data-cc-canvas-wrap><canvas class="cc-canvas" data-cc-canvas width="900" height="560" aria-label="A blank white canvas. Draw here with a finger, stylus or mouse."></canvas></div>
  <div class="cc-tools">
   <div class="cc-palette" role="group" aria-label="Colors">${[['#e04b3f','red'],['#f07f28','orange'],['#f5c531','yellow'],['#4a9e4f','green'],['#3fb8af','teal'],['#5aa7d6','blue'],['#8f4fc0','purple'],['#f28ab5','pink']].map(([c,n])=>`<button type="button" class="cc-color" data-cc-color="${c}" data-cc-color-name="${n}" style="--pc:${c}" aria-label="The color ${n}"></button>`).join('')}</div>
   <div class="cc-modes" role="group" aria-label="Brush mode">
    <button type="button" class="cc-toggle" data-cc-mode="brush" aria-pressed="true">Brush</button>
    <button type="button" class="cc-toggle" data-cc-mode="splatter" aria-pressed="false">Splatter</button>
    <button type="button" class="cc-toggle" data-cc-eraser aria-pressed="false">Eraser</button>
   </div>
   <div class="cc-sizes" role="group" aria-label="Brush size">
    <button type="button" class="cc-size" data-cc-size="1" aria-pressed="false" aria-label="Thin brush"><span></span></button>
    <button type="button" class="cc-size" data-cc-size="2" aria-pressed="true" aria-label="Medium brush"><span></span></button>
    <button type="button" class="cc-size" data-cc-size="3" aria-pressed="false" aria-label="Thick brush"><span></span></button>
   </div>
   <div class="cc-toolbtns">
    <button type="button" class="button button-ghost" data-cc-undo>Undo</button>
    <button type="button" class="button button-ghost" data-cc-redo>Redo</button>
    <button type="button" class="button button-ghost" data-cc-clear>Clear</button>
   </div>
  </div>
  <p class="cc-save-row"><button type="button" class="button" data-cc-save>Save to My Classroom</button>
  <button type="button" class="button button-ghost" data-cc-download>Download</button>
  <span class="cc-save-note" data-cc-note aria-live="polite"></span></p>
  <div class="cc-gallery" data-cc-gallery hidden><p class="cc-gallery-title">Saved from this activity</p><div class="cc-gallery-row" data-cc-gallery-row></div></div>`;
}

function decorateBoard(a){
 const scene=a.slug==='rainbow-fish-aquarium'?aquariumScene():sundaeScene();
 return `<svg class="cc-svg" viewBox="0 0 900 560" role="img" aria-label="${esc(a.alt)}" data-cc-scene>${scene}</svg>
  <p class="sa-ask" data-cc-deco-hint>${esc(a.say)}</p>
  <div class="cc-tray" data-cc-tray>${a.items.map((it,i)=>`<button type="button" class="cc-piece" data-cc-item="${it.kind}" data-item-idx="${i}" data-item-color="${it.color}" aria-label="${esc(it.label)}" style="--pc:${it.color}"><svg viewBox="-60 -60 120 120" aria-hidden="true" focusable="false">${decorItemSVG(it)}</svg></button>`).join('')}</div>
  <div class="cc-toolbtns">
   <button type="button" class="button button-ghost" data-cc-deco-remove disabled>Remove selected</button>
   <button type="button" class="button button-ghost" data-cc-undo>Undo</button>
   <button type="button" class="button button-ghost" data-cc-clear>Start over</button>
  </div>
  <p class="cc-save-row"><button type="button" class="button" data-cc-save>Save to My Classroom</button>
  <button type="button" class="button button-ghost" data-cc-download>Download</button>
  <span class="cc-save-note" data-cc-note aria-live="polite"></span></p>
  <div class="cc-gallery" data-cc-gallery hidden><p class="cc-gallery-title">Saved from this activity</p><div class="cc-gallery-row" data-cc-gallery-row></div></div>`;
}

export function colorBoard(a){
 switch(a.engine){
  case 'fill': return fillBoard(a);
  case 'mix': return mixBoard(a);
  case 'sequence': return sequenceBoard(a);
  case 'sort': return sortBoard(a);
  case 'canvas': return canvasBoard(a);
  case 'decorate': return decorateBoard(a);
  case 'fill+decorate': return fillBoard(a);
 }
 return '';
}

/* ---------- library + activity pages ---------- */

const CLIB_PATH='/preschool/colors/adventures/';
const CCLASS_PATH='/preschool/4-years/colors-mixing-and-creativity/';

export const COLOR_LIB_PATH=CLIB_PATH;
export {COLOR_BASE};
export const COLOR_CLASS_PATH=CCLASS_PATH;

const GROUPS={
 1:'Color discovery',2:'Color discovery',3:'Color discovery',4:'Color discovery',5:'Color discovery',6:'Color discovery',
 7:'Color experiments',8:'Color experiments',9:'Color experiments',10:'Color experiments',11:'Color experiments',12:'Color experiments',
 13:'Creative art studio',14:'Creative art studio',15:'Creative art studio',16:'Creative art studio',17:'Creative art studio',18:'Creative art studio'
};

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
 const itemsAttr=a.items?` data-cc-items='${esc(JSON.stringify(a.items.map(({kind,color,label})=>({kind,color}))))}'`:'';
 const combosAttr=a.combos?` data-cc-combos='${esc(JSON.stringify(a.combos))}'`:'';
 const orderAttr=a.order?` data-cc-order='${esc(JSON.stringify(a.order))}'`:'';
 const glowLabel=a.slug==='magical-lantern-festival'?'Festival night':'Party lights';
 const board=`<section class="wrap lesson-section" id="play" aria-label="Play ${esc(a.title)}">
  <span class="eyebrow">PLAY · ${esc(a.skill).toUpperCase()}</span>
  <h2>${esc(a.title)}</h2>
  <p class="lesson-copy">${esc(a.say)}</p>
  <div class="cc-board cc-engine-${a.engine.replace('+','-')}${a.glow?' cc-glowable':''}" data-cc-board data-cc-game="${a.slug}"${itemsAttr}${combosAttr}${orderAttr}>
   <div class="sa-controls"><p class="sa-status" data-sa-status aria-live="polite"></p><div class="sa-controlbtns"><button type="button" class="button button-ghost" data-cc-again hidden>Start over</button></div></div>
   ${colorBoard(a)}
   <div class="sa-cheer" data-cc-cheer hidden><p class="sa-cheer-title">${a.doneTitle}</p><p class="sa-cheer-sub">${a.doneSub}</p></div>
  </div>
 </section>`;
 return `${crumbNav([['Preschool','/preschool/'],['Colors &amp; Creativity',CLIB_PATH],[`${a.num}. ${a.title}`]])}
 <article class="wrap lesson-hero sa-hero">
  <div class="sa-hero-art"><img src="${COLOR_BASE}${a.img}" width="800" height="600" alt="${esc(a.alt)}" fetchpriority="high"></div>
  <div class="lesson-hero-copy">
   <span class="eyebrow">COLORS &amp; CREATIVITY · ${a.num} OF 18 · ${GROUPS[a.num].toUpperCase()}</span>
   <h1>${esc(a.h1)}</h1>
   <div class="fc-chips lesson-chips"><span><strong>Age</strong> 4 Years</span><span><strong>Class</strong> 26 · Colors</span><span><strong>Skill</strong> ${esc(a.skill)}</span></div>
   <p class="lesson-lede">${esc(a.tag)}</p>
   <div class="lesson-start"><a class="button" href="#play">Start creating <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Finger, stylus or mouse. Undo, redo and save are always one tap away.</span></div>
  </div>
 </article>
 ${board}
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>Why this activity helps.</h2>
  <p class="lesson-copy">${esc(a.parentNote||('This studio turns '+a.skill.toLowerCase()+' into open-ended making. Children choose, tap and see the picture answer at once — and because nothing is graded, the choices are truly theirs. Naming colors out loud as they work doubles the learning, and the undo button means a brave choice is never a risk.'))}</p>
  <p class="lesson-copy">Finished pieces can be saved to the selected child’s My Classroom desk or downloaded as a picture to print. Save buttons appear under the board; everything stays on this device, private by design.</p>
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
