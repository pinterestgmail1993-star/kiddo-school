// Kiddo School — Shape Adventures (Class 25 · Shapes, Patterns & Sorting).
// Eighteen real games at /preschool/shapes/adventures/{slug}/, built on the
// owner's eighteen Canva illustrations (verified on R2 under
// school/maths/adventures/, where the shape collection actually lives).
// Each game page shows the artwork as its story card, then plays for real
// on a server-rendered SVG board: pieces into slots, patterns continued,
// candies and fruit sorted, a monster built, a feather mirrored, objects
// found. No scores, no timers, no penalties — gentle hints and a
// celebration at the end. Without JavaScript every board still shows its
// scene and every page keeps its parent guidance and links.
import {SHAPE_BASE,SHAPE_COLORS,C,shapeSVG,piece,slot,backdrop,celebrate,controls,crumbNav,heading,esc} from './adventure-kit.mjs';

const S=(shape,color)=>({shape,color});
const P=(shape,color,label,x,y,o={})=>({shape,color,label,x,y,...o});

export const shapeAdventures=[
 {
  num:1,slug:'build-a-shape-spaceship',img:'shape-spaceship.webp',
  title:'Build a Shape Spaceship',h1:'Build a Shape Spaceship',
  tag:'Match circle, triangle, square and rectangle parts to finish the rocket.',
  skill:'Shape matching',engine:'slotmatch',backdrop:'space',
  say:'Pick a shape, then tap the matching hole on the rocket. Four parts and we blast off!',
  hint:'Well done — that shape flew right in!',
  doneTitle:'Blast off! The spaceship is ready.',
  doneSub:'Every part found its matching shape. Ready for another adventure?',
  alt:'A cartoon rocket with a circle, triangle, square and rectangle cut-out waiting for matching shape pieces.',
  slots:[
   P('triangle',C.red,'nose cone',430,168,{s:1.15}),
   P('circle',C.orange,'porthole',430,285,{s:0.92}),
   P('square',C.blue,'door',430,405,{s:0.8}),
   P('rectangle',C.green,'tail fin',612,452,{s:0.85})
  ],
  pieces:[S('triangle',C.red),S('circle',C.orange),S('square',C.blue),S('rectangle',C.green)],
  decor:`<path d="M430,120 L342,226 L518,226 Z" fill="#f4f7fb" stroke="#3a3350" stroke-width="5" stroke-linejoin="round"/>
   <rect x="342" y="226" width="176" height="212" rx="26" fill="#f4f7fb" stroke="#3a3350" stroke-width="5"/>
   <path d="M342,300 C296,340 292,438 318,470 L342,452 Z" fill="${C.red}" stroke="#3a3350" stroke-width="5" stroke-linejoin="round"/>
   <path d="M518,300 C564,340 568,438 542,470 L518,452 Z" fill="${C.green}" stroke="#3a3350" stroke-width="5" stroke-linejoin="round"/>
   <path d="M392,470 q14,44 38,58 q24,-14 38,-58 Z" fill="${C.yellow}" stroke="#3a3350" stroke-width="4"/>`
 },
 {
  num:2,slug:'silly-monster-factory',img:'silly-monster-factory.webp',
  title:'Silly Monster Factory',h1:'Silly Monster Factory',
  tag:'Tap shape parts — eyes, horns, arms, feet and spots — to build a friendly monster.',
  skill:'Building with shapes',engine:'builder',backdrop:'room',
  say:'Tap a part to add it to your monster. Tap it again to take it off. Every monster is a good monster!',
  hint:'Ooh, handsome! Keep going, or press Done.',
  doneTitle:'What a wonderful monster!',
  doneSub:'You built it all by yourself. Give your monster a name!',
  alt:'A friendly blue monster with empty spots for eyes, horns, arms and feet, next to a box of shape parts.',
  parts:[
   {key:'eyes',label:'Round eyes',shape:'circle',color:C.white,max:3},
   {key:'horns',label:'Triangle horns',shape:'triangle',color:C.purple,max:2},
   {key:'arms',label:'Rectangle arms',shape:'rectangle',color:C.teal,max:2},
   {key:'feet',label:'Oval feet',shape:'oval',color:C.orange,max:2},
   {key:'spots',label:'Circle spots',shape:'circle',color:C.pink,max:3}
  ]
 },
 {
  num:3,slug:'hot-air-balloon-patterns',img:'hot-air-balloon-patterns.webp',
  title:'Hot Air Balloon Patterns',h1:'Hot Air Balloon Patterns',
  tag:'Say the pattern out loud, then tap what comes next to finish each balloon band.',
  skill:'AB and AAB patterns',engine:'pattern',backdrop:'sky',
  say:'Say the pattern out loud — then tap the shape that comes next.',
  hint:'The pattern goes on! On to the next balloon.',
  doneTitle:'Three balloons, three patterns!',
  doneSub:'The parade can fly. Listen to your pattern voice — it is getting strong.',
  alt:'Three hot air balloons with patterned bands of circles, triangles and squares.',
  prop:'balloon',
  rounds:[
   {pattern:[S('circle',C.red),S('triangle',C.yellow),S('circle',C.red),S('triangle',C.yellow)],answer:0,choices:[S('circle',C.red),S('triangle',C.yellow)],say:'Circle, triangle, circle, triangle… what comes next?'},
   {pattern:[S('circle',C.teal),S('circle',C.teal),S('square',C.orange),S('circle',C.teal),S('circle',C.teal)],answer:0,choices:[S('square',C.orange),S('circle',C.teal),S('triangle',C.pink)],say:'Circle, circle, square. Circle, circle… what lands next?'},
   {pattern:[S('star',C.orange),S('heart',C.plum),S('circle',C.green),S('star',C.orange),S('heart',C.plum)],answer:0,choices:[S('circle',C.green),S('star',C.orange),S('diamond',C.purple)],say:'Star, heart, circle. Star, heart… and then?'}
  ]
 },
 {
  num:4,slug:'candy-shape-shop',img:'candy-shape-shop.webp',
  title:'Candy Shape Shop',h1:'Candy Shape Shop',
  tag:'Sort the candies into the right jars — rounds, stars and triangles.',
  skill:'Sorting by shape',engine:'sort',backdrop:'market',
  say:'Pick up a candy, then tap the jar that matches its shape.',
  hint:'In the jar it goes! The shop looks sweet.',
  doneTitle:'The candy shop is tidy!',
  doneSub:'Every candy found its jar. Sorting is thinking — and you are good at it.',
  alt:'A candy shop with three glass jars waiting for round, star and triangle candies.',
  binLabel:'jars',
  bins:[
   {key:'circle',label:'Round candies',color:C.red,x:200,y:300},
   {key:'star',label:'Star candies',color:C.orange,x:450,y:300},
   {key:'triangle',label:'Triangle candies',color:C.yellow,x:700,y:300}
  ],
  items:[
   {shape:'circle',color:C.red,label:'Round candy',key:'circle'},
   {shape:'star',color:C.orange,label:'Star candy',key:'star'},
   {shape:'triangle',color:C.yellow,label:'Triangle candy',key:'triangle'},
   {shape:'circle',color:C.pink,label:'Round candy',key:'circle'},
   {shape:'star',color:C.yellow,label:'Star candy',key:'star'},
   {shape:'triangle',color:C.pink,label:'Triangle candy',key:'triangle'}
  ]
 },
 {
  num:5,slug:'rainbow-window-puzzle',img:'rainbow-window-puzzle.webp',
  title:'Rainbow Window Puzzle',h1:'Rainbow Window Puzzle',
  tag:'Fit the circle, triangle, square and diamond into the castle window.',
  skill:'Shape matching',engine:'slotmatch',backdrop:'sky',
  say:'The castle window has four empty holes. Match every shape to its hole.',
  hint:'One more pane and the window glows!',
  doneTitle:'The rainbow window shines!',
  doneSub:'All four shapes found their place in the castle window.',
  alt:'A pink castle window with circle, triangle, square and diamond cut-outs.',
  decor:`<rect x="150" y="60" width="600" height="460" rx="24" fill="#f2b8c6" stroke="#3a3350" stroke-width="5"/>
   <rect x="150" y="60" width="600" height="460" rx="24" fill="none" stroke="#d98ba0" stroke-width="10" opacity="0.5"/>
   <path d="M240,60 L240,20 L280,44 L240,60 M660,60 L660,20 L620,44 L660,60" fill="${C.purple}" stroke="#3a3350" stroke-width="4"/>
   <rect x="330" y="120" width="240" height="360" rx="18" fill="#fff" stroke="#3a3350" stroke-width="6"/>`,
  slots:[
   P('circle',C.red,'round pane',450,205,{s:0.75}),
   P('triangle',C.yellow,'triangle pane',405,330,{s:0.62}),
   P('square',C.green,'square pane',505,330,{s:0.62}),
   P('diamond',C.purple,'diamond pane',450,428,{s:0.62})
  ],
  pieces:[S('circle',C.red),S('triangle',C.yellow),S('square',C.green),S('diamond',C.purple)]
 },
 {
  num:6,slug:'animal-shape-houses',img:'animal-shape-houses.webp',
  title:'Animal Shape Houses',h1:'Animal Shape Houses',
  tag:'Match each door shape to its little house — the animals are waiting to get in.',
  skill:'Shape matching',engine:'slotmatch',backdrop:'forest',
  say:'Each animal house needs its door. Find the arch, the square, the triangle and the rectangle.',
  hint:'Knock knock — who lives there? A happy friend!',
  doneTitle:'Every friend is home!',
  doneSub:'Four doors, four houses, four happy animals.',
  alt:'Four little animal houses with an arch, square, triangle and rectangle door waiting to be matched.',
  decor:`<g><rect x="70" y="300" width="160" height="150" rx="14" fill="#f6b8c8" stroke="#3a3350" stroke-width="5"/><path d="M62,306 L150,236 L238,306 Z" fill="#e88aa4" stroke="#3a3350" stroke-width="5"/><circle cx="150" cy="270" r="14" fill="#fff" stroke="#3a3350" stroke-width="4"/></g>
   <g><rect x="280" y="300" width="150" height="150" rx="14" fill="#a8d8b0" stroke="#3a3350" stroke-width="5"/><path d="M272,306 L355,236 L438,306 Z" fill="#7cc47f" stroke="#3a3350" stroke-width="5"/><rect x="330" y="255" width="50" height="40" rx="8" fill="#fff" stroke="#3a3350" stroke-width="4"/></g>
   <g><path d="M490,450 L560,240 L630,450 Z" fill="#f6d38f" stroke="#3a3350" stroke-width="5"/><rect x="520" y="360" width="80" height="90" fill="#fbe9c3" stroke="#3a3350" stroke-width="5"/></g>
   <g><rect x="680" y="310" width="160" height="140" rx="14" fill="#bcd9f2" stroke="#3a3350" stroke-width="5"/><path d="M672,316 L760,240 L848,316 Z" fill="#8fbfe8" stroke="#3a3350" stroke-width="5"/><circle cx="760" cy="272" r="14" fill="#fff" stroke="#3a3350" stroke-width="4"/></g>
   <circle cx="150" cy="512" r="6" fill="#8a7a5a"/><circle cx="355" cy="516" r="5" fill="#8a7a5a"/><circle cx="560" cy="512" r="6" fill="#8a7a5a"/><circle cx="760" cy="516" r="5" fill="#8a7a5a"/>`,
  slots:[
   P('arch',C.pink,'arch door',150,392,{s:0.85}),
   P('square',C.blue,'square door',355,392,{s:0.78}),
   P('triangle',C.orange,'triangle door',560,398,{s:0.72}),
   P('rectangle',C.green,'rectangle door',760,392,{s:0.8})
  ],
  pieces:[S('arch',C.pink),S('square',C.blue),S('triangle',C.orange),S('rectangle',C.green)]
 },
 {
  num:7,slug:'submarine-window-rescue',img:'submarine-window-rescue.webp',
  title:'Submarine Window Rescue',h1:'Submarine Window Rescue',
  tag:'Repair the submarine — match the four window shapes to their frames.',
  skill:'Shape matching',engine:'slotmatch',backdrop:'sea',
  say:'The submarine needs its windows! Match the circle, square, triangle and rectangle.',
  hint:'Glug glug — that window is fixed!',
  doneTitle:'Dive, dive, dive!',
  doneSub:'All four windows are fixed. The fish wave goodbye as the submarine sails off.',
  alt:'A yellow submarine with four empty window frames of different shapes under the sea.',
  decor:`<rect x="150" y="212" width="480" height="176" rx="88" fill="${C.yellow}" stroke="#3a3350" stroke-width="5"/>
   <rect x="560" y="230" width="120" height="120" rx="30" fill="${C.yellow}" stroke="#3a3350" stroke-width="5"/>
   <path d="M580,230 L580,170 L640,170" fill="none" stroke="#3a3350" stroke-width="8" stroke-linecap="round"/>
   <path d="M640,170 q40,4 36,44" fill="none" stroke="#3a3350" stroke-width="8" stroke-linecap="round"/>
   <rect x="240" y="150" width="120" height="70" rx="24" fill="${C.yellow}" stroke="#3a3350" stroke-width="5"/>
   <path d="M150,300 l-42,-26 l0,52 Z" fill="${C.orange}" stroke="#3a3350" stroke-width="5" stroke-linejoin="round"/>
   <circle cx="120" cy="220" r="16" fill="${C.orange}" stroke="#3a3350" stroke-width="4"/><path d="M104,220 q-16,-8 -20,-24" stroke="#3a3350" stroke-width="4" fill="none" stroke-linecap="round"/>
   <path d="M770,430 q30,-24 60,0 q-30,24 -60,0" fill="${C.pink}" stroke="#3a3350" stroke-width="4"/>
   <path d="M120,470 v-46 M104,470 q16,-10 32,0 M136,470 q-8,-14 0,-24 M104,470 q8,-14 0,-24" stroke="${C.teal}" stroke-width="6" fill="none" stroke-linecap="round"/>
   <path d="M800,490 q14,-30 28,0 q-14,20 -28,0" fill="#7cc47f" stroke="#3a3350" stroke-width="3"/>`,
  slots:[
   P('circle',C.blue,'round window',280,300,{s:0.72}),
   P('square',C.green,'square window',410,300,{s:0.7}),
   P('triangle',C.pink,'triangle window',535,306,{s:0.62}),
   P('rectangle',C.purple,'long window',645,300,{s:0.55})
  ],
  pieces:[S('circle',C.blue),S('square',C.green),S('triangle',C.pink),S('rectangle',C.purple)]
 },
 {
  num:8,slug:'turtle-shell-mosaic',img:'turtle-shell-mosaic.webp',
  title:'Turtle Shell Mosaic',h1:'Turtle Shell Mosaic',
  tag:'Complete the turtle’s shell — every mosaic piece has its own spot.',
  skill:'Shape matching',engine:'slotmatch',backdrop:'garden',
  say:'The turtle’s shell is missing its pieces. Match the triangles, diamonds, square and hexagon.',
  hint:'A perfect fit! The shell sparkles.',
  doneTitle:'A magnificent shell!',
  doneSub:'Your mosaic made the whole shell glow. The turtle says thank you.',
  alt:'A smiling turtle whose shell is missing mosaic pieces — triangles, diamonds, a square and a hexagon.',
  decor:`<ellipse cx="450" cy="470" rx="270" ry="40" fill="#bfe3c2" opacity="0.7"/>
   <circle cx="160" cy="430" r="60" fill="#8fce7f" stroke="#3a3350" stroke-width="5"/>
   <circle cx="128" cy="414" r="9" fill="#3a3350"/><circle cx="196" cy="414" r="9" fill="#3a3350"/>
   <path d="M138,448 q22,16 44,0" stroke="#3a3350" stroke-width="5" fill="none" stroke-linecap="round"/>
   <path d="M160,372 q-4,-34 22,-44" stroke="#3a3350" stroke-width="6" fill="none" stroke-linecap="round"/>
   <circle cx="188" cy="322" r="10" fill="${C.teal}" stroke="#3a3350" stroke-width="4"/>
   <ellipse cx="450" cy="310" rx="230" ry="180" fill="#7cc47f" stroke="#3a3350" stroke-width="6"/>
   <rect x="220" y="480" width="44" height="30" rx="10" fill="#8fce7f" stroke="#3a3350" stroke-width="4"/>
   <rect x="620" y="480" width="44" height="30" rx="10" fill="#8fce7f" stroke="#3a3350" stroke-width="4"/>`,
  slots:[
   P('hexagon',C.yellow,'center piece',450,310,{s:0.9}),
   P('triangle',C.blue,'top piece',450,190,{s:0.62}),
   P('triangle',C.blue,'upper-left piece',330,250,{s:0.62}),
   P('diamond',C.pink,'upper-right piece',570,250,{s:0.62}),
   P('diamond',C.pink,'lower-left piece',330,380,{s:0.62}),
   P('square',C.orange,'lower-right piece',570,380,{s:0.58})
  ],
  pieces:[S('hexagon',C.yellow),S('triangle',C.blue),S('triangle',C.blue),S('diamond',C.pink),S('diamond',C.pink),S('square',C.orange)]
 },
 {
  num:9,slug:'fruit-market-sorting',img:'fruit-market-sorting.webp',
  title:'Fruit Market Sorting',h1:'Fruit Market Sorting',
  tag:'Sort the fruit into baskets — by kind, by color, then by size.',
  skill:'Sorting by kind, color and size',engine:'sort',backdrop:'market',
  say:'Help the market! Pick a fruit, then tap the basket where it belongs.',
  hint:'Lovely sorting — the baskets are filling up!',
  doneTitle:'The market is ready!',
  doneSub:'Sorted by kind, by color and by size. What a shopkeeper you are!',
  alt:'A fruit market with baskets for sorting apples, oranges and bananas by kind, color and size.',
  binLabel:'baskets',
  rounds:true,
  bins:[
   {key:'apple',label:'Apples',color:C.red,x:200,y:310,icon:'circle'},
   {key:'orange',label:'Oranges',color:C.orange,x:450,y:310,icon:'circle'},
   {key:'banana',label:'Bananas',color:C.yellow,x:700,y:310,icon:'moon'}
  ],
  items:[
   [
    {shape:'circle',color:C.red,label:'Apple',key:'apple',detail:'apple'},
    {shape:'circle',color:C.orange,label:'Orange',key:'orange',detail:'orange'},
    {shape:'moon',color:C.yellow,label:'Banana',key:'banana',detail:'banana'},
    {shape:'circle',color:C.red,label:'Apple',key:'apple',detail:'apple'},
    {shape:'circle',color:C.orange,label:'Orange',key:'orange',detail:'orange'},
    {shape:'moon',color:C.yellow,label:'Banana',key:'banana',detail:'banana'}
   ],
   [
    {shape:'circle',color:C.red,label:'Red fruit',key:'red',detail:'apple'},
    {shape:'oval',color:C.yellow,label:'Yellow fruit',key:'yellow',detail:'lemon'},
    {shape:'heart',color:C.red,label:'Red fruit',key:'red',detail:'strawberry'},
    {shape:'circle',color:C.red,label:'Red fruit',key:'red',detail:'apple'},
    {shape:'oval',color:C.yellow,label:'Yellow fruit',key:'yellow',detail:'lemon'},
    {shape:'heart',color:C.red,label:'Red fruit',key:'red',detail:'strawberry'}
   ],
   [
    {shape:'circle',color:C.orange,label:'Big orange',key:'big',detail:'orange',big:true},
    {shape:'circle',color:C.orange,label:'Small orange',key:'small',detail:'orange',big:false},
    {shape:'circle',color:C.red,label:'Big apple',key:'big',detail:'apple',big:true},
    {shape:'circle',color:C.red,label:'Small apple',key:'small',detail:'apple',big:false},
    {shape:'circle',color:C.orange,label:'Big orange',key:'big',detail:'orange',big:true},
    {shape:'circle',color:C.red,label:'Small apple',key:'small',detail:'apple',big:false}
   ]
  ],
  binRounds:[
   [
    {key:'apple',label:'Apples',color:C.red,x:200,y:310,icon:'circle'},
    {key:'orange',label:'Oranges',color:C.orange,x:450,y:310,icon:'circle'},
    {key:'banana',label:'Bananas',color:C.yellow,x:700,y:310,icon:'moon'}
   ],
   [
    {key:'red',label:'Red fruits',color:C.red,x:280,y:310,icon:'heart'},
    {key:'yellow',label:'Yellow fruits',color:C.yellow,x:620,y:310,icon:'oval'}
   ],
   [
    {key:'big',label:'Big fruit',color:C.orange,x:280,y:310,icon:'circle',big:true},
    {key:'small',label:'Small fruit',color:C.green,x:620,y:310,icon:'circle',big:false}
   ]
  ],
  roundSays:['Sort by kind: apples, oranges and bananas.','Now sort by color: red fruits and yellow fruits.','Last one — big fruit and small fruit!']
 },
 {
  num:10,slug:'wizards-magic-patterns',img:'wizard-magic-patterns.webp',
  title:'Wizard’s Magic Patterns',h1:'Wizard’s Magic Patterns',
  tag:'Finish the wizard’s spellbook patterns — stars, moons, circles and triangles.',
  skill:'AB, AAB and ABC patterns',engine:'pattern',backdrop:'night',
  say:'Read the spell out loud with me, then tap the shape that finishes it.',
  hint:'The spell glows! Turn the page.',
  doneTitle:'The magic spell is complete!',
  doneSub:'The wizard bows: "Pattern power — the strongest magic of all!"',
  alt:'A friendly wizard with an open spellbook showing shape patterns to finish.',
  prop:'book',
  rounds:[
   {pattern:[S('star',C.orange),S('moon',C.yellow),S('star',C.orange),S('moon',C.yellow)],answer:0,choices:[S('star',C.orange),S('moon',C.yellow)],say:'Star, moon, star, moon… how does the spell go on?'},
   {pattern:[S('circle',C.blue),S('circle',C.blue),S('triangle',C.pink),S('circle',C.blue),S('circle',C.blue)],answer:0,choices:[S('triangle',C.pink),S('circle',C.blue),S('square',C.green)],say:'Circle, circle, triangle. Circle, circle… what next?'},
   {pattern:[S('star',C.yellow),S('circle',C.teal),S('triangle',C.plum),S('star',C.yellow),S('circle',C.teal)],answer:0,choices:[S('triangle',C.plum),S('star',C.yellow),S('circle',C.blue)],say:'Star, circle, triangle — keep the spell marching!'}
  ]
 },
 {
  num:11,slug:'peacock-feather-symmetry',img:'peacock-feather-symmetry.webp',
  title:'Peacock Feather Symmetry',h1:'Peacock Feather Symmetry',
  tag:'The right side of the tail is empty — mirror the left side spot by spot.',
  skill:'Symmetry and matching',engine:'symmetry',backdrop:'forest',
  say:'Look at the left side of the tail. Make the right side exactly the same — spot by spot.',
  hint:'Match it to its twin on the left — that is the secret!',
  doneTitle:'A perfectly symmetrical tail!',
  doneSub:'Both sides match. The peacock fans its feathers just for you.',
  alt:'A peacock whose right tail side is empty, waiting for mirrored color spots.',
  spots:[
   {x:365,y:150,c:C.teal},{x:300,y:230,c:C.purple},{x:272,y:325,c:C.yellow},
   {x:285,y:420,c:C.pink},{x:345,y:495,c:C.blue},{x:440,y:540,c:C.green}
  ]
 },
 {
  num:12,slug:'shape-ferris-wheel',img:'shape-ferris-wheel.webp',
  title:'Shape Ferris Wheel',h1:'Shape Ferris Wheel',
  tag:'Match the heart, star, circle and triangle to their ferris wheel cabins.',
  skill:'Shape matching',engine:'slotmatch',backdrop:'sky',
  say:'Each cabin needs its shape before the wheel can turn. Match all four!',
  hint:'Tick tock, the wheel wants to spin!',
  doneTitle:'The wheel goes round!',
  doneSub:'All cabins are full. Up, up, up goes the ferris wheel!',
  alt:'A ferris wheel with four cabins showing heart, star, circle and triangle cut-outs.',
  decor:`<circle cx="450" cy="280" r="200" fill="none" stroke="#8fbfe8" stroke-width="10"/>
   <path d="M450,280 L315,140 M450,280 L585,140 M450,280 L315,420 M450,280 L585,420 M450,280 L450,80 M450,280 L450,480 M450,280 L250,280 M450,280 L650,280" stroke="#8fbfe8" stroke-width="7"/>
   <circle cx="450" cy="280" r="26" fill="${C.yellow}" stroke="#3a3350" stroke-width="5"/>
   <path d="M330,470 L450,290 L570,470" fill="none" stroke="#3a3350" stroke-width="9" stroke-linecap="round"/>
   <rect x="230" y="480" width="440" height="14" rx="7" fill="#c8a06a"/>
   <circle cx="450" cy="80" r="16" fill="${C.red}" stroke="#3a3350" stroke-width="4"/>`,
  slots:[
   P('heart',C.plum,'heart cabin',315,140,{s:0.66}),
   P('star',C.orange,'star cabin',585,140,{s:0.66}),
   P('circle',C.red,'circle cabin',315,420,{s:0.66}),
   P('triangle',C.yellow,'triangle cabin',585,420,{s:0.6})
  ],
  pieces:[S('heart',C.plum),S('star',C.orange),S('circle',C.red),S('triangle',C.yellow)],
  cabin:true
 },
 {
  num:13,slug:'dragon-scale-puzzle',img:'dragon-scale-puzzle.webp',
  title:'Dragon Scale Puzzle',h1:'Dragon Scale Puzzle',
  tag:'The dragon lost some scales — match the shapes to fill the gaps.',
  skill:'Shape matching',engine:'slotmatch',backdrop:'garden',
  say:'A friendly dragon with empty scale spots! Match the triangle, diamond, square, hexagon and rectangle.',
  hint:'Scaled and smiling!',
  doneTitle:'One shiny dragon!',
  doneSub:'Every scale found its spot. The dragon does a happy little dance.',
  alt:'A friendly green dragon with empty scale gaps shaped like a triangle, diamond, square, hexagon and rectangle.',
  decor:`<path d="M120,470 C220,320 420,300 620,340 C740,364 800,420 810,470 Z" fill="#8fce7f" stroke="#3a3350" stroke-width="6"/>
   <circle cx="170" cy="330" r="64" fill="#8fce7f" stroke="#3a3350" stroke-width="6"/>
   <circle cx="148" cy="316" r="8" fill="#3a3350"/><path d="M176,336 q12,8 24,0" stroke="#3a3350" stroke-width="5" fill="none" stroke-linecap="round"/>
   <path d="M116,282 L96,238 L140,258 Z" fill="${C.teal}" stroke="#3a3350" stroke-width="4"/>
   <path d="M190,270 L200,222 L232,260 Z" fill="${C.plum}" stroke="#3a3350" stroke-width="4"/>
   <path d="M790,392 q30,-40 6,-70" stroke="#3a3350" stroke-width="7" fill="none" stroke-linecap="round"/>
   <path d="M120,480 q-30,-16 -30,-44" stroke="#3a3350" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  slots:[
   P('triangle',C.blue,'scale',320,400,{s:0.62}),
   P('diamond',C.pink,'scale',430,390,{s:0.6}),
   P('square',C.orange,'scale',540,388,{s:0.58}),
   P('hexagon',C.purple,'scale',650,398,{s:0.62}),
   P('rectangle',C.green,'scale',745,430,{s:0.55})
  ],
  pieces:[S('triangle',C.blue),S('diamond',C.pink),S('square',C.orange),S('hexagon',C.purple),S('rectangle',C.green)]
 },
 {
  num:14,slug:'penguin-dress-up-patterns',img:'penguin-dress-up-patterns.webp',
  title:'Penguin Dress-Up Patterns',h1:'Penguin Dress-Up Patterns',
  tag:'Finish the scarf patterns — stripe by stripe, penguin by penguin.',
  skill:'AB and AAB color patterns',engine:'pattern',backdrop:'sky',
  say:'Read the scarf pattern out loud — red, blue, red, blue — then tap the stripe that comes next.',
  hint:'Cozy! That penguin loves its scarf.',
  doneTitle:'Three cozy penguins!',
  doneSub:'Patterned scarves for everyone. Brrr-illiant work!',
  alt:'Three penguins wearing scarves with red, blue and green stripe patterns to finish.',
  prop:'penguin',
  rounds:[
   {pattern:[S('rectangle',C.red),S('rectangle',C.blue),S('rectangle',C.red),S('rectangle',C.blue)],answer:0,choices:[S('rectangle',C.red),S('rectangle',C.blue)],say:'Red, blue, red, blue… what stripe comes next?'},
   {pattern:[S('rectangle',C.green),S('rectangle',C.green),S('rectangle',C.yellow),S('rectangle',C.green),S('rectangle',C.green)],answer:0,choices:[S('rectangle',C.yellow),S('rectangle',C.green),S('rectangle',C.red)],say:'Green, green, yellow. Green, green… and then?'},
   {pattern:[S('rectangle',C.plum),S('rectangle',C.teal),S('rectangle',C.orange),S('rectangle',C.plum),S('rectangle',C.teal)],answer:0,choices:[S('rectangle',C.orange),S('rectangle',C.plum),S('rectangle',C.blue)],say:'Plum, teal, orange — keep the scarf going!'}
  ]
 },
 {
  num:15,slug:'shape-clock-tower',img:'shape-clock-tower.webp',
  title:'Shape Clock Tower',h1:'Shape Clock Tower',
  tag:'Repair the magical clock tower — every window is a shape waiting to fit.',
  skill:'Shape matching',engine:'slotmatch',backdrop:'night',
  say:'The old clock tower needs fixing. Match the circle clock, triangle, square and rectangle windows.',
  hint:'Ding dong — one more shape!',
  doneTitle:'The tower strikes twelve!',
  doneSub:'All fixed! The clock chimes a happy tune for you.',
  alt:'A clock tower at night with a circle clock face and triangle, square and rectangle windows to repair.',
  decor:`<rect x="330" y="90" width="240" height="430" rx="16" fill="#f4dfc0" stroke="#3a3350" stroke-width="6"/>
   <path d="M316,100 L450,28 L584,100 Z" fill="${C.plum}" stroke="#3a3350" stroke-width="6" stroke-linejoin="round"/>
   <rect x="318" y="506" width="264" height="18" rx="9" fill="#c8a06a"/>
   <circle cx="450" cy="60" r="10" fill="${C.yellow}"/>`,
  slots:[
   P('circle',C.red,'clock face',450,180,{s:1.0}),
   P('triangle',C.yellow,'triangle window',390,330,{s:0.55}),
   P('square',C.green,'square window',510,330,{s:0.56}),
   P('rectangle',C.blue,'tall window',450,445,{s:0.62})
  ],
  pieces:[S('circle',C.red),S('triangle',C.yellow),S('square',C.green),S('rectangle',C.blue)]
 },
 {
  num:16,slug:'enchanted-mushroom-garden',img:'enchanted-mushroom-garden.webp',
  title:'Enchanted Mushroom Garden',h1:'Enchanted Mushroom Garden',
  tag:'Finish the pattern on each mushroom cap — dots, stars and moons.',
  skill:'AB, AAB and ABC patterns',engine:'pattern',backdrop:'garden',
  say:'Look at the pattern on the mushroom cap. Say it out loud, then tap what comes next.',
  hint:'The mushroom glows — pattern magic!',
  doneTitle:'The garden is enchanted!',
  doneSub:'Every cap wears its pattern. The ladybugs applaud politely.',
  alt:'A garden of mushrooms with dotted and starred caps showing patterns to complete.',
  prop:'mushroom',
  rounds:[
   {pattern:[S('circle',C.red),S('circle',C.white),S('circle',C.red),S('circle',C.white)],answer:0,choices:[S('circle',C.red),S('circle',C.white)],say:'Red dot, white dot, red dot, white dot… what comes next?'},
   {pattern:[S('star',C.yellow),S('star',C.yellow),S('moon',C.teal),S('star',C.yellow),S('star',C.yellow)],answer:0,choices:[S('moon',C.teal),S('star',C.yellow),S('circle',C.pink)],say:'Star, star, moon. Star, star… and then?'},
   {pattern:[S('heart',C.pink),S('diamond',C.purple),S('circle',C.green),S('heart',C.pink),S('diamond',C.purple)],answer:0,choices:[S('circle',C.green),S('heart',C.pink),S('star',C.orange)],say:'Heart, diamond, circle — one more round of the pattern!'}
  ]
 },
 {
  num:17,slug:'cookie-cutter-bakery',img:'cookie-cutter-bakery.webp',
  title:'Cookie Cutter Bakery',h1:'Cookie Cutter Bakery',
  tag:'Match each cookie to its shape on the baking tray — then they bake!',
  skill:'Shape matching',engine:'slotmatch',backdrop:'room',
  say:'Match the cookies to the shapes on the tray. Six cookies, six spots!',
  hint:'Smells delicious already!',
  doneTitle:'Fresh from the oven!',
  doneSub:'Six perfect cookies, six perfect shapes. Time for a pretend taste!',
  alt:'A baking tray with six shape outlines waiting for circle, square, triangle, heart, star and rectangle cookies.',
  decor:`<rect x="120" y="130" width="660" height="330" rx="26" fill="#cfd6dd" stroke="#3a3350" stroke-width="6"/>
   <rect x="140" y="150" width="620" height="290" rx="18" fill="#dde3e8" stroke="#b9c2cb" stroke-width="4"/>
   <rect x="120" y="470" width="660" height="16" rx="8" fill="#b9c2cb"/>
   <path d="M60,110 q10,-24 34,-22 q-4,26 -34,22" fill="${C.red}" stroke="#3a3350" stroke-width="3"/>
   <ellipse cx="820" cy="500" rx="46" ry="18" fill="${C.teal}" stroke="#3a3350" stroke-width="4"/>`,
  slots:[
   P('circle',C.orange,'round cookie',255,245,{s:0.8}),
   P('square',C.pink,'square cookie',405,245,{s:0.74}),
   P('triangle',C.yellow,'triangle cookie',555,255,{s:0.68}),
   P('heart',C.red,'heart cookie',695,250,{s:0.72}),
   P('star',C.green,'star cookie',330,382,{s:0.72}),
   P('rectangle',C.purple,'rectangle cookie',560,382,{s:0.6})
  ],
  pieces:[S('circle',C.orange),S('square',C.pink),S('triangle',C.yellow),S('heart',C.red),S('star',C.green),S('rectangle',C.purple)]
 },
 {
  num:18,slug:'shape-detective-mystery',img:'shape-detective-mystery.webp',
  title:'Shape Detective Mystery',h1:'Shape Detective Mystery',
  tag:'The detective needs help — find and tap the objects that match each shape.',
  skill:'Finding shapes in objects',engine:'find',backdrop:'room',
  say:'Detective Raccoon needs you! Find the objects that match the mystery shape.',
  hint:'A clue! Keep looking, detective.',
  doneTitle:'Case closed!',
  doneSub:'You found every clue. Detective Raccoon salutes you!',
  alt:'A detective raccoon in a room full of objects — a clock, a book, a flag, a mirror and more — to sort by shape.',
  rounds:[
   {shape:'circle',say:'Find the ROUND things! Tap the clock and the ball.',count:2,
    note:'A clock face and a ball are both circles.'},
   {shape:'rectangle',say:'Now find the RECTANGLES — the tall book and the little door.',count:2,
    note:'The book and the door both have four straight sides, long top to bottom.'},
   {shape:'triangle',say:'Triangles next! Tap the flag and the dollhouse roof.',count:2,
    note:'Three sides, three corners — flag and roof.'},
   {shape:'star',say:'Last clue: find the STAR.',count:1,
    note:'Five pointy points — the little star on the shelf.'}
  ]
 }
];

export const shapeBySlug=Object.fromEntries(shapeAdventures.map(g=>[g.slug,g]));

/* ---------- board builders (server-rendered SVG scenes) ---------- */

const SHAPE_NAMES={circle:'circle',square:'square',triangle:'triangle',rectangle:'rectangle',oval:'oval',diamond:'diamond',star:'star',heart:'heart',hexagon:'hexagon',arch:'arch',moon:'moon'};
const shapeName=s=>SHAPE_NAMES[s]||s;

function slotScene(g){
 const cabins=g.cabin?g.slots.map(s=>`<rect x="${s.x-50}" y="${s.y-40}" width="100" height="80" rx="16" fill="#fff" stroke="#3a3350" stroke-width="5"/><path d="M${s.x-50},${s.y+40} L${s.x},${s.y+64} L${s.x+50},${s.y+40}" fill="none" stroke="#3a3350" stroke-width="5"/>`).join(''):'';
 return `<svg class="sa-svg" viewBox="0 0 900 560" role="img" aria-label="${esc(g.alt)}">${backdrop(g.backdrop)}${g.decor||''}${cabins}${g.slots.map(s=>slot(s.shape,s.x,s.y,{s:s.s,color:'#ffffff',label:s.label})).join('')}</svg>
 <div class="sa-tray" data-sa-tray aria-label="Shape pieces">${g.pieces.map(p=>piece(p.shape,p.color,'The '+shapeName(p.shape)+' piece')).join('')}</div>`;
}

function fruitItemSVG(it){
 const d=it.detail||'';
 let extra='';
 if(d==='apple')extra=`<path d="M0,-46 q-4,-16 8,-22" stroke="#7a4a2b" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M4,-56 q18,-8 26,4 q-16,10 -26,-4" fill="${C.leaf}" stroke="#3a3350" stroke-width="3"/>`;
 if(d==='orange')extra=`<circle cx="-12" cy="-8" r="2.4" fill="#c96f1e"/><circle cx="10" cy="6" r="2.4" fill="#c96f1e"/><circle cx="2" cy="-20" r="2.4" fill="#c96f1e"/><circle cx="16" cy="-14" r="2.4" fill="#c96f1e"/><circle cx="-6" cy="16" r="2.4" fill="#c96f1e"/><path d="M0,-48 q6,-8 14,-6" stroke="#4a9e4f" stroke-width="5" fill="none" stroke-linecap="round"/>`;
 if(d==='banana')extra='';
 if(d==='lemon')extra=`<path d="M-54,0 q-6,-10 0,-18 M54,0 q6,10 0,18" stroke="#d9a61e" stroke-width="5" fill="none"/>`;
 if(d==='strawberry')extra=`<path d="M-16,-38 q16,10 32,0 l-6,14 q-10,6 -20,0 Z" fill="${C.leaf}" stroke="#3a3350" stroke-width="3"/><circle cx="-8" cy="6" r="2" fill="#ffe1b0"/><circle cx="10" cy="10" r="2" fill="#ffe1b0"/><circle cx="0" cy="22" r="2" fill="#ffe1b0"/>`;
 return shapeSVG(it.shape,it.color)+extra;
}

function sortBoard(g){
 const rounds=g.rounds?g.binRounds:[g.bins];
 const items=g.rounds?g.items:[g.items];
 const jar=bin=>`<g class="sa-bin" data-sa-bin="${bin.key}" transform="translate(${bin.x} ${bin.y})" role="button" tabindex="0" aria-label="${esc(bin.label)} jar">
   <path d="M-64,-46 C-64,-84 64,-84 64,-46 L58,66 C56,80 -56,80 -58,66 Z" fill="#ffffff" opacity="0.85" stroke="#3a3350" stroke-width="5"/>
   <rect x="-72" y="-58" width="144" height="18" rx="9" fill="${bin.color}" stroke="#3a3350" stroke-width="4"/>
   <g class="sa-bin-fill" data-sa-binfill></g>
   <path d="M-46,-30 L-40,52 M0,-32 L0,56 M46,-30 L40,52" stroke="#9db4c4" stroke-width="3" opacity="0.6" fill="none"/>
  </g>`;
 const basket=bin=>{
  const w=bin.big?128:96, h=bin.big?76:56;
  return `<g class="sa-bin" data-sa-bin="${bin.key}" transform="translate(${bin.x} ${bin.y})" role="button" tabindex="0" aria-label="${esc(bin.label)} basket">
   <path d="M${-w/2},0 C${-w/2},${h*0.2} ${-w/2+8},${h} 0,${h} C${w/2-8},${h} ${w/2},${h*0.2} ${w/2},0 Z" fill="#c8a06a" stroke="#3a3350" stroke-width="5"/>
   <path d="M${-w/2},4 q${w/2},${h*0.5} ${w},0" fill="none" stroke="#a37c47" stroke-width="4"/>
   <path d="M${-w/3},6 L${-w/3+6},${h-6} M0,6 L0,${h} M${w/3},6 L${w/3-6},${h-6}" stroke="#a37c47" stroke-width="4"/>
   <g class="sa-bin-fill" data-sa-binfill></g>
  </g>`;
 };
 const allBins=rounds.map((rs,i)=>`<g class="sa-sort-round" data-sa-sortround="${i+1}">${rs.map(b=>(g.rounds?basket(b):jar(b))).join('')}</g>`).join('');
 const trayRounds=items.map((list,i)=>`<div class="sa-items" data-sa-itemround="${i+1}" ${i?'hidden':''}>${list.map(it=>`<button type="button" class="sa-piece sa-fruit ${it.big===false?'is-small':''}" data-sa-item="${it.key}" data-item-label="${esc(it.label)}" aria-label="${esc(it.label)}" style="--pc:${it.color}"><svg viewBox="-70 -70 140 140" aria-hidden="true" focusable="false">${fruitItemSVG(it)}</svg></button>`).join('')}</div>`).join('');
 return `<svg class="sa-svg" viewBox="0 0 900 560" role="img" aria-label="${esc(g.alt)}">${backdrop(g.backdrop)}<rect x="60" y="120" width="780" height="14" rx="7" fill="#c8a06a"/>${allBins}</svg>
 ${g.rounds?`<p class="sa-round-note" data-sa-roundnote>${esc(g.roundSays[0])}</p>`:''}
 ${trayRounds}`;
}

function patternBoard(g){
 const tokens=round=>round.pattern.map(t=>`<span class="sa-token"><svg viewBox="-60 -60 120 120" aria-hidden="true" focusable="false">${shapeSVG(t.shape,t.color)}</svg></span>`).join('')
  +`<span class="sa-gap" data-sa-gap>?</span>`;
 const choicesHTML=(round,ri)=>{
  // deterministic shuffle: the correct answer moves to a rotating position
  const idx=ri%(round.choices.length||1);
  const list=round.choices.map((c,i)=>({c,ok:i===round.answer}));
  const picked=list.splice(idx,1)[0]; list.push(picked);
  return list.map(({c,ok})=>`<button type="button" class="sa-choice" data-sa-choice${ok?' data-sa-answer="true"':''} aria-label="${shapeName(c.shape)}" style="--pc:${c.color}"><svg viewBox="-60 -60 120 120" aria-hidden="true" focusable="false">${shapeSVG(c.shape,c.color)}</svg></button>`).join('');
 };
 const roundsHTML=g.rounds.map((r,i)=>`<div class="sa-pat-round" data-sa-round="${i+1}">
  <p class="sa-ask">${esc(r.say)}</p>
  <div class="sa-row" role="img" aria-label="A repeating pattern">${tokens(r)}</div>
  <div class="sa-choices" role="group" aria-label="Choices">${choicesHTML(r,i)}</div>
 </div>`).join('');
 return `<svg class="sa-svg sa-prop" viewBox="0 0 900 300" role="img" aria-label="${esc(g.alt)}">${patternProp(g)}</svg>
 <div class="sa-pat" data-sa-pat>${roundsHTML}</div>
 <noscript><p class="sa-noscript">Answers, in order: ${g.rounds.map(r=>shapeName(r.choices[r.answer].shape)).join(' &#8594; ')}.</p></noscript>`;
}

function patternProp(g){
 if(g.prop==='balloon')return `<ellipse cx="450" cy="150" rx="120" ry="132" fill="#f3b0c3" stroke="#3a3350" stroke-width="6"/>
  <path d="M330,150 a120,132 0 0 1 60,-114 M450,18 a120,132 0 0 1 60,42 M450,18 a120,132 0 0 0 -60,42 M570,150 a120,132 0 0 1 -60,114" stroke="#e08aa4" stroke-width="5" fill="none"/>
  <path d="M430,282 L470,282 L462,318 L438,318 Z" fill="#c8a06a" stroke="#3a3350" stroke-width="5"/>
  <path d="M438,318 q-16,40 12,64 q28,-24 12,-64 Z" fill="#a37c47" stroke="#3a3350" stroke-width="5"/>
  <ellipse cx="180" cy="230" rx="46" ry="20" fill="#fff" opacity="0.9"/><ellipse cx="740" cy="190" rx="52" ry="22" fill="#fff" opacity="0.9"/>`;
 if(g.prop==='book')return `<path d="M170,60 L450,110 L730,60 L730,240 L450,290 L170,240 Z" fill="#7a5ea8" stroke="#3a3350" stroke-width="6" stroke-linejoin="round"/>
  <path d="M450,110 L450,290" stroke="#3a3350" stroke-width="5"/>
  <path d="M196,80 L432,124 L432,262 L196,222 Z" fill="#fff7ea"/>
  <path d="M704,80 L468,124 L468,262 L704,222 Z" fill="#fff7ea"/>
  <circle cx="640" cy="46" r="14" fill="${C.yellow}" stroke="#3a3350" stroke-width="4"/>
  <path d="M250,30 l10,22 M310,14 l6,24" stroke="${C.yellow}" stroke-width="4" stroke-linecap="round"/>`;
 if(g.prop==='penguin')return `<g transform="translate(450 150)">
  <ellipse cx="0" cy="30" rx="120" ry="118" fill="#3f4a63" stroke="#3a3350" stroke-width="6"/>
  <ellipse cx="0" cy="44" rx="84" ry="88" fill="#fff"/>
  <circle cx="-34" cy="-8" r="10" fill="#2c2750"/><circle cx="34" cy="-8" r="10" fill="#2c2750"/>
  <path d="M-10,12 L10,12 L0,26 Z" fill="${C.orange}" stroke="#3a3350" stroke-width="3"/>
  <rect x="-96" y="66" width="192" height="34" rx="14" fill="${C.red}" stroke="#3a3350" stroke-width="5"/>
  <rect x="-96" y="40" width="192" height="26" rx="13" fill="${C.blue}" stroke="#3a3350" stroke-width="5"/>
  <ellipse cx="-118" cy="130" rx="20" ry="14" fill="${C.orange}" stroke="#3a3350" stroke-width="4"/>
  <ellipse cx="118" cy="130" rx="20" ry="14" fill="${C.orange}" stroke="#3a3350" stroke-width="4"/>
  <circle cx="-58" cy="-52" r="4" fill="#fff" opacity="0.8"/><circle cx="70" cy="-40" r="3" fill="#fff" opacity="0.8"/>
 </g>`;
 if(g.prop==='mushroom')return `<g transform="translate(450 150)">
  <rect x="-34" y="20" width="68" height="110" rx="26" fill="#fdf1dc" stroke="#3a3350" stroke-width="6"/>
  <path d="M-130,34 C-130,-92 130,-92 130,34 C130,52 -130,52 -130,34 Z" fill="${C.red}" stroke="#3a3350" stroke-width="6"/>
  <circle cx="-62" cy="-6" r="14" fill="#fff"/><circle cx="10" cy="-34" r="16" fill="#fff"/><circle cx="66" cy="0" r="12" fill="#fff"/>
  <ellipse cx="0" cy="152" rx="150" ry="18" fill="#a5d6a7"/>
 </g>`;
 return '';
}

function monsterBoard(g){
 const layers={
  eyes:(n)=>[0,1,2,3].slice(1,n+1).map((_,i)=>{const pts=[[400,236],[500,236],[450,176]];const [x,y]=pts[i];return `<circle cx="${x}" cy="${y}" r="27" fill="#fff" stroke="#3a3350" stroke-width="5"/><circle cx="${x}" cy="${y}" r="10" fill="#2c2750"/>`;}).join(''),
  horns:(n)=>n?`<path d="M352,178 L330,92 L404,140 Z" fill="${C.purple}" stroke="#3a3350" stroke-width="5" stroke-linejoin="round"/><path d="M548,178 L570,92 L496,140 Z" fill="${C.purple}" stroke="#3a3350" stroke-width="5" stroke-linejoin="round"/>`:'',
  arms:(n)=>n?`<rect x="238" y="286" width="86" height="34" rx="17" fill="${C.teal}" stroke="#3a3350" stroke-width="5" transform="rotate(-18 281 303)"/><rect x="576" y="286" width="86" height="34" rx="17" fill="${C.teal}" stroke="#3a3350" stroke-width="5" transform="rotate(18 619 303)"/>`:'',
  feet:(n)=>n?`<ellipse cx="400" cy="474" rx="42" ry="24" fill="${C.orange}" stroke="#3a3350" stroke-width="5"/><ellipse cx="500" cy="474" rx="42" ry="24" fill="${C.orange}" stroke="#3a3350" stroke-width="5"/>`:'',
  spots:(n)=>[0,1,2].slice(0,n).map((_,i)=>{const pts=[[438,330],[488,376],[420,392]];const [x,y]=pts[i];return `<circle cx="${x}" cy="${y}" r="${[16,12,10][i]}" fill="${C.pink}" stroke="#3a3350" stroke-width="4"/>`;}).join('')
 };
 const layerG=Object.keys(layers).map(k=>{
   const p=g.parts.find(x=>x.key===k);
   return `<g data-sa-layer="${k}">${Array.from({length:p.max},(_,i)=>`<g data-sa-lcount="${i+1}" hidden>${layers[k](i+1)}</g>`).join('')}</g>`;
  }).join('');
 const body=`<path d="M330,320 C330,200 400,150 450,150 C500,150 570,200 570,320 C570,420 540,470 450,470 C360,470 330,420 330,320 Z" fill="#9ed3ea" stroke="#3a3350" stroke-width="6"/>
  <path d="M404,320 q46,38 92,0" fill="none" stroke="#3a3350" stroke-width="6" stroke-linecap="round"/>
  <path d="M418,348 q32,20 64,0" fill="${C.plum}" opacity="0.85"/>`;
 return `<svg class="sa-svg" viewBox="0 0 900 560" role="img" aria-label="${esc(g.alt)}">${backdrop(g.backdrop)}${body}${layerG}</svg>
 <div class="sa-parts" data-sa-parts role="group" aria-label="Monster parts">
  ${g.parts.map(p=>`<button type="button" class="sa-part" data-sa-part="${p.key}" data-sa-max="${p.max}" aria-pressed="false"><svg viewBox="-60 -60 120 120" aria-hidden="true" focusable="false">${shapeSVG(p.shape,p.color)}</svg><span>${esc(p.label)}</span><span class="sa-part-count" data-sa-count>0/${p.max}</span></button>`).join('')}
 </div>
 <div class="sa-done"><button type="button" class="button" data-sa-finish>I am done building</button></div>`;
}

function symmetryBoard(g){
 const spotsL=g.spots.map((s,i)=>`<g transform="translate(${s.x} ${s.y})"><circle r="30" fill="${s.c}" stroke="#3a3350" stroke-width="5"/><circle r="12" fill="#fff" opacity="0.85"/></g>`).join('');
 const spotsR=g.spots.map((s,i)=>`<g class="sa-spot" data-sa-spot="${i}" data-spot-color="${s.c}" transform="translate(${900-s.x} ${s.y})" role="button" tabindex="0" aria-label="Empty spot ${i+1}"><circle r="30" fill="#ffffff" stroke="#3a3350" stroke-width="5" stroke-dasharray="10 8"/></g>`).join('');
 const palette=[...new Set(g.spots.map(s=>s.c))].map((c,i)=>`<button type="button" class="sa-color" data-sa-color="${c}" style="--pc:${c}" aria-label="Color ${i+1}"></button>`).join('');
 return `<svg class="sa-svg" viewBox="0 0 900 560" role="img" aria-label="${esc(g.alt)}">${backdrop('forest')}
  <path d="M450,540 L130,540 A320,320 0 0 1 770,540 Z" fill="#eef7ee" stroke="#7cc47f" stroke-width="6" opacity="0.9"/>
  <path d="M450,540 L190,540 A260,260 0 0 1 710,540" fill="none" stroke="#7cc47f" stroke-width="4" stroke-dasharray="4 10"/>
  ${spotsL}${spotsR}
  <ellipse cx="450" cy="430" rx="64" ry="84" fill="${C.deep}" stroke="#3a3350" stroke-width="6"/>
  <circle cx="450" cy="322" r="40" fill="${C.deep}" stroke="#3a3350" stroke-width="6"/>
  <path d="M444,296 l6,-22 l6,22 M432,300 l-4,-20 l14,12 M468,300 l4,-20 l-14,12" stroke="#3a3350" stroke-width="4" fill="none"/>
  <circle cx="436" cy="316" r="6" fill="#fff"/><circle cx="464" cy="316" r="6" fill="#fff"/>
  <path d="M436,336 q14,10 28,0" stroke="#f2b134" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M426,510 l-8,26 M474,510 l8,26" stroke="#3a3350" stroke-width="5" stroke-linecap="round"/>
 </svg>
 <div class="sa-palette" data-sa-palette role="group" aria-label="Spot colors">${palette}</div>`;
}

function findBoard(g){
 const obj=(x,y,shape,label,inner)=>`<g class="sa-find" data-sa-find="${shape}" data-find-label="${esc(label)}" transform="translate(${x} ${y})" role="button" tabindex="0" aria-label="${esc(label)}">${inner}</g>`;
 const objects=
  obj(170,170,'circle','A round wall clock',`<circle r="48" fill="#fff" stroke="#3a3350" stroke-width="6"/><circle r="40" fill="none" stroke="#c8a06a" stroke-width="4"/><path d="M0,0 L0,-26 M0,0 L18,10" stroke="#3a3350" stroke-width="5" stroke-linecap="round"/><circle r="5" fill="${C.plum}"/>`)
 +obj(700,462,'circle','A bouncy ball',`<circle r="40" fill="${C.red}" stroke="#3a3350" stroke-width="5"/><path d="M-40,0 a40,40 0 0 1 80,0" fill="#f6b8c8"/><circle r="40" fill="none" stroke="#3a3350" stroke-width="5"/><path d="M-38,-8 q38,22 76,0" stroke="#fff" stroke-width="4" fill="none"/>`)
 +obj(335,408,'rectangle','A tall storybook',`<rect x="-38" y="-56" width="76" height="112" rx="8" fill="${C.purple}" stroke="#3a3350" stroke-width="5"/><rect x="-38" y="-56" width="16" height="112" rx="8" fill="${C.plum}"/><path d="M-6,-20 q16,-12 30,0 M-6,4 q16,-12 30,0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>`)
 +obj(800,296,'rectangle','A little door',`<rect x="-40" y="-66" width="80" height="132" rx="6" fill="#b98a5a" stroke="#3a3350" stroke-width="5"/><circle cx="24" cy="6" r="6" fill="${C.yellow}" stroke="#3a3350" stroke-width="3"/>`)
 +obj(520,120,'triangle','A waving flag',`<path d="M-34,66 L-34,-58 L64,-30 L-34,-2" fill="${C.orange}" stroke="#3a3350" stroke-width="5" stroke-linejoin="round"/><path d="M-34,66 q4,10 -2,18" stroke="#3a3350" stroke-width="5" fill="none" stroke-linecap="round"/>`)
 +obj(660,180,'triangle','A dollhouse roof',`<path d="M-58,44 L0,-40 L58,44 Z" fill="${C.red}" stroke="#3a3350" stroke-width="5" stroke-linejoin="round"/><rect x="-40" y="44" width="80" height="52" fill="#fbe9c3" stroke="#3a3350" stroke-width="4"/><rect x="-12" y="58" width="24" height="38" fill="${C.plum}" stroke="#3a3350" stroke-width="3"/>`)
 +obj(440,250,'square','A square window',`<rect x="-42" y="-42" width="84" height="84" rx="8" fill="#bfe3f7" stroke="#3a3350" stroke-width="5"/><path d="M0,-42 L0,42 M-42,0 L42,0" stroke="#3a3350" stroke-width="4"/>`)
 +obj(235,470,'square','A present',`<rect x="-40" y="-34" width="80" height="68" rx="8" fill="${C.teal}" stroke="#3a3350" stroke-width="5"/><path d="M-40,0 L40,0 M0,-34 L0,34" stroke="${C.yellow}" stroke-width="8"/><path d="M0,-34 q-16,-22 -26,-8 q8,12 26,8 q16,-22 26,-8 q-8,12 -26,8" fill="${C.yellow}" stroke="#3a3350" stroke-width="3"/>`)
 +obj(560,420,'oval','A standing mirror',`<ellipse rx="34" ry="52" fill="#d8ecf7" stroke="#c8a06a" stroke-width="7"/><ellipse rx="34" ry="52" fill="none" stroke="#3a3350" stroke-width="4"/><path d="M-16,-30 q-8,16 -4,30" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>`)
 +obj(395,516,'star','A little star',`<path d="M0,-34 L10,-10 L36,-8 L16,8 L22,32 L0,18 L-22,32 L-16,8 L-36,-8 L-10,-10 Z" fill="${C.yellow}" stroke="#3a3350" stroke-width="4" stroke-linejoin="round"/>`);
 return `<svg class="sa-svg" viewBox="0 0 900 560" role="img" aria-label="${esc(g.alt)}">${backdrop('room')}${objects}</svg>
 <div class="sa-find-ui" data-sa-findui>
  ${g.rounds.map((r,i)=>`<div class="sa-find-round" data-sa-fround="${i+1}" data-sa-fshape="${r.shape}" data-sa-fcount="${r.count}" ${i?'hidden':''}><p class="sa-ask">${esc(r.say)}</p><p class="sa-find-progress" data-sa-fprogress aria-live="polite">Found 0 of ${r.count}</p></div>`).join('')}
 </div>
 <noscript><p class="sa-noscript">Answers: the clock and the ball are circles; the book and the door are rectangles; the flag and the dollhouse roof are triangles; the star on the floor is the star.</p></noscript>`;
}

export function shapeBoard(g){
 switch(g.engine){
  case 'slotmatch': return slotScene(g);
  case 'pattern': return patternBoard(g);
  case 'sort': return sortBoard(g);
  case 'builder': return monsterBoard(g);
  case 'symmetry': return symmetryBoard(g);
  case 'find': return findBoard(g);
 }
 return '';
}

/* ---------- library + game pages ---------- */

const LIB_PATH='/preschool/shapes/adventures/';
const CLASS_PATH='/preschool/4-years/shapes-patterns-and-sorting/';

export const SHAPE_LIB_PATH=LIB_PATH;
export {SHAPE_BASE};
export const SHAPE_CLASS_PATH=CLASS_PATH;

export function shapeLibraryBody(){
 return `${crumbNav([['Preschool','/preschool/'],['Shape Adventures']])}
 ${heading('SHAPE ADVENTURES','Eighteen shape games, one grand adventure.','Match pieces, finish patterns, sort candies, build a monster and find hidden shapes — eighteen real games made from our own storybook artwork. Every game plays on the screen with a tap or a drag: finger, stylus or mouse. No scores, no timers, nothing to install.')}
 <div class="lesson-start"><a class="button" href="${CLASS_PATH}">This way to Class 25 <span aria-hidden="true">→</span></a><span class="lesson-start-hint">The class that goes with these adventures: Shapes, Patterns &amp; Sorting.</span></div>
 <section class="wrap section compact" data-sa-lib aria-label="All shape adventures">
  <div class="sa-grid">
  ${shapeAdventures.map(g=>`<a class="sa-card" href="${LIB_PATH}${g.slug}/" data-sa-libcard="${g.slug}">
    <span class="sa-card-num" aria-hidden="true">${g.num}</span>
    <span class="sa-card-done" data-sa-done hidden>Cleared!</span>
    <img src="${SHAPE_BASE}${g.img}" width="800" height="568" alt="${esc(g.alt)}" loading="lazy">
    <span class="sa-card-body"><strong>${esc(g.title)}</strong><span class="sa-card-tag">${esc(g.tag)}</span><span class="sa-card-skill">${esc(g.skill)}</span></span>
    <span class="sa-card-play">Play <span aria-hidden="true">→</span></span>
  </a>`).join('')}
  </div>
  <p class="lesson-note">Every card is one real game — not a picture to look at. Progress is saved on this device for the child chosen in <a href="/my-classroom/">My Classroom</a>.</p>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>What each game practises.</h2>
  <p class="lesson-copy">The eighteen adventures circle one big idea: shapes are things you can see, match, sort and predict. Slot games (spaceship, castle window, submarine, clock tower and friends) practise shape recognition and matching. Pattern games (balloons, spellbook, scarves, mushrooms) build the rhythm sense behind early maths. Sorting games (candy shop, fruit market) grow comparing and grouping. The monster factory is pure creative building, the peacock teaches mirror symmetry, and Detective Raccoon sends children hunting for shapes in everyday objects.</p>
  <p class="lesson-copy">Sit nearby for the first game or two, hand over the tapping, and let your child lead. A miss is never a mark against them — every wrong tap comes back with a gentle hint instead of a score.</p>
  <p class="lesson-copy">The adventures belong to <a href="${CLASS_PATH}">Class 25 — Shapes, Patterns &amp; Sorting</a> on the Age 4 learning path, and they live beside the other collections: <a href="/preschool/writing/adventures/">Writing Adventures</a> and <a href="/preschool/colors/adventures/">Colors &amp; Creativity</a>.</p>
 </section>`;
}

export function shapeAdventureBody(g){
 const prev=shapeAdventures[(g.num-2+18)%18];
 const next=shapeAdventures[g.num%18];
 const INTRO={slotmatch:'Pick a piece from the tray, then tap its matching hole.',pattern:'Say the pattern out loud, then tap what comes next.',sort:'Tap something from the table, then tap the jar or basket where it belongs.',builder:'Tap part buttons to build your monster — tap again to take a part off.',symmetry:'Tap an empty spot on the tail, then choose the color that matches its twin.',find:'Find the things that match the mystery shape — tap each one.'};
 const engineWrap=`<section class="wrap lesson-section" id="play" aria-label="Play ${esc(g.title)}">
  <span class="eyebrow">PLAY · ${esc(g.skill).toUpperCase()}</span>
  <h2>${esc(g.title)}</h2>
  <p class="lesson-copy">${esc(g.say)}</p>
  <div class="sa-board" data-sa-board data-sa-engine="${g.engine}" data-sa-game="${g.slug}"${g.roundSays?` data-sa-roundsays='${esc(JSON.stringify(g.roundSays))}'`:''}>
   ${controls(INTRO[g.engine]||g.hint)}
   ${shapeBoard(g)}
   ${celebrate(g.doneTitle,g.doneSub)}
  </div>
  <p class="sa-progress-note" data-sa-progress aria-live="polite"></p>
 </section>`;
 return `${crumbNav([['Preschool','/preschool/'],['Shape Adventures',LIB_PATH],[`${g.num}. ${g.title}`]])}
 <article class="wrap lesson-hero sa-hero">
  <div class="sa-hero-art"><img src="${SHAPE_BASE}${g.img}" width="800" height="568" alt="${esc(g.alt)}" fetchpriority="high"></div>
  <div class="lesson-hero-copy">
   <span class="eyebrow">SHAPE ADVENTURE ${g.num} OF 18</span>
   <h1>${esc(g.h1)}</h1>
   <div class="fc-chips lesson-chips"><span><strong>Age</strong> 4 Years</span><span><strong>Class</strong> 25 · Shapes</span><span><strong>Skill</strong> ${esc(g.skill)}</span></div>
   <p class="lesson-lede">${esc(g.tag)}</p>
   <div class="lesson-start"><a class="button" href="#play">Play <span aria-hidden="true">↓</span></a><a class="button button-ghost" href="/worksheets/shapes/${g.slug}/">Print the worksheet <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Works with a finger, a stylus, or a mouse. Nothing to install.</span></div>
  </div>
 </article>
 ${engineWrap}
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>Why this adventure helps.</h2>
  <p class="lesson-copy">${esc(g.parentNote||('This game turns '+g.skill.toLowerCase()+' into a small story with a clear goal. Your child chooses a piece, predicts where it belongs, and sees the scene answer them at once — the exact noticing-and-trying loop that early maths is built on. The board forgives every miss with a hint, so trying again feels like part of the game rather than a mistake.'))}</p>
  <p class="lesson-copy">Keep the words flowing while they play: name the shapes out loud, wonder together — “where does the triangle go?” — and celebrate the finish with the same applause you would give a tower of blocks. Short and happy beats long and serious, every time.</p>
 </section>
 <nav class="wrap lesson-section sa-prevnext" aria-label="More shape adventures">
  <a class="sa-navcard" href="${LIB_PATH}${prev.slug}/"><span class="eyebrow">Previous</span><strong>${esc(prev.title)}</strong></a>
  <a class="sa-navcard" href="${LIB_PATH}"><span class="eyebrow">All adventures</span><strong>Shape Adventures Library</strong></a>
  <a class="sa-navcard" href="${LIB_PATH}${next.slug}/"><span class="eyebrow">Next</span><strong>${esc(next.title)}</strong></a>
 </nav>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP GOING</span><h2>Where next?</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${CLASS_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class 25</span></div><h3>Shapes, Patterns &amp; Sorting</h3><p>The class behind these adventures — with find-it games, pattern play and easy activities for away-from-screen time.</p><span class="fc-open">Open Class 25 <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/preschool/colors/adventures/"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class 26</span></div><h3>Colors &amp; Creativity Adventures</h3><p>Paint, mix real colors and decorate — eighteen more playful activities next door.</p><span class="fc-open">Open the Colors Library <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/preschool/writing/adventures/"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class 27</span></div><h3>Early Writing Adventures</h3><p>Trace winding paths, loops and zigzags with a finger or stylus — thirty pencil-control games.</p><span class="fc-open">Open the Writing Library <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}
