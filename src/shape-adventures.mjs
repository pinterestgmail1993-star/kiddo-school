// Kiddo School — Shape Adventures (Class 25 · Shapes, Patterns & Sorting).
// Eighteen draw-on-the-picture adventures at /preschool/shapes/adventures/
// built on the owner's eighteen Canva illustrations (verified on R2 under
// school/maths/adventures/, where the shape collection actually lives).
// The owner's spec, followed exactly: the original Canva artwork sits on
// the LEFT with the transparent Write & Color drawing layer laid directly
// over it (aligned 1:1 at every screen size), and plain TEXT instructions
// plus the drawing tools sit on the RIGHT. No coded scenes, no sound, no
// scoring, no fake games. Completion counts only when the child's own
// work is really saved; the shapes band keeps its existing flat-map
// localStorage shape, so nothing already earned is lost.
import {SHAPE_BASE,C,crumbNav,heading,esc} from './adventure-kit.mjs';
import {imageActivitySection} from './image-activity.mjs';
import {artFor} from './adventure-dims.mjs';

const S=(shape,color)=>({shape,color});
const P=(shape,color,label,x,y,o={})=>({shape,color,label,x,y,...o});

export const shapeAdventures=[
 {
  num:1,slug:'build-a-shape-spaceship',img:'shape-spaceship.webp',
  title:'Build a Shape Spaceship',h1:'Build a Shape Spaceship',
  tag: 'Match every shape piece to its rocket hole — draw the line and blast off.',
  skill:'Shape matching',engine:'slotmatch',backdrop:'space',
  say: 'Match each shape piece to the rocket hole it fits — draw a line from piece to hole. Four parts and we blast off!',
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
  tag: 'Draw shape eyes, horns, arms and feet — your monster, your rules.',
  skill:'Building with shapes',engine:'builder',backdrop:'room',
  say: 'Draw shape eyes, horns, arms and feet right on your monster — then invent a monster friend beside it. Every monster is a good monster!',
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
  tag: 'Say the pattern, then draw or color what comes next in the sky.',
  skill:'AB and AAB patterns',engine:'pattern',backdrop:'sky',
  say: 'Say the pattern out loud — then draw or color the shape that comes next.',
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
  tag: 'Draw a line from every candy to its shape jar.',
  skill:'Sorting by shape',engine:'sort',backdrop:'market',
  say: 'Draw a line from each candy to the jar that matches its shape.',
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
  tag: 'Draw a line from every fruit to the basket where it belongs.',
  skill:'Sorting by kind, color and size',engine:'sort',backdrop:'market',
  say: 'Help the market! Draw a line from each fruit to the basket where it belongs.',
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
  tag: 'Read the spell, then circle the shape that finishes it.',
  skill:'AB, AAB and ABC patterns',engine:'pattern',backdrop:'night',
  say: 'Read the spell out loud with me, then circle the shape that finishes it.',
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
  tag: 'Read the scarf pattern, then color the stripe that comes next.',
  skill:'AB and AAB color patterns',engine:'pattern',backdrop:'sky',
  say: 'Read the scarf pattern out loud — red, blue, red, blue — then color the stripe that comes next.',
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
  tag: 'Read the garden pattern, then circle what comes next.',
  skill:'AB, AAB and ABC patterns',engine:'pattern',backdrop:'garden',
  say: 'Look at the pattern on the mushroom cap. Say it out loud, then circle what comes next.',
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
  tag:'The detective needs help — find and circle the objects that match each shape.',
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
 const art=artFor('shapes/'+g.slug,SHAPE_BASE+g.img);
 const board=imageActivitySection({band:'shapes',slug:g.slug,title:g.title,skill:g.skill,
  say:g.say,hint:g.hint,doneTitle:g.doneTitle,alt:g.alt,
  imgUrl:SHAPE_BASE+g.img,w:art.w,h:art.h,
  wsPath:'/worksheets/shapes/'+g.slug+'/'});
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
 ${board}
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
