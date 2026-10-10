// Kiddo School — Early Writing & Pencil Control (Class 27).
// Thirty real, on-screen tracing adventures at
// /preschool/writing/adventures/{slug}/, built on the owner's thirty Canva
// illustrations (all verified on R2 under school/writing/adventures/).
// The artwork is each page's story card; the interactive board is its own
// accurately aligned 1600×900 vector scene — guide paths that are clearly
// visible (dashed, becoming the child's own stroke color when earned),
// start and goal markers, and a real Pointer-Events drawing layer that
// works with finger, stylus, mouse and trackpad. Drawing is evaluated with
// generous four-year-old tolerance: coverage of the guide, never
// pixel-perfection. Undo, redo, stroke eraser, clear, five pencil colors,
// two sizes, a blank worksheet download and a "my drawing" download.
// Progress (opened / completed / dates) saves per selected child in the
// site's existing localStorage profile — the same store Classes 25 and 26
// use — and never marks a curriculum class complete on its own.
import {R2,crumbNav,heading,esc} from './adventure-kit.mjs';
import {SHAPE_LIB_PATH} from './shape-adventures.mjs';
import {COLOR_LIB_PATH as CLIB_PATH} from './color-creativity.mjs';

export const WRITING_BASE=R2+'school/writing/adventures/';
const W=(x1,y1,x2,y2)=>[x1,y1,x2,y2];

// guide helper: a path with explicit start/end (start also draws the dot)
const G=(d,sx,sy,ex,ey)=>({d,sx,sy,ex,ey});
// straight line guide
const L=(x1,y1,x2,y2)=>G(`M${x1},${y1} L${x2},${y2}`,x1,y1,x2,y2);
// circle guide (closed shape)
const O=(cx,cy,r)=>G(`M${cx-r},${cy} a${r},${r} 0 1 0 ${2*r},0 a${r},${r} 0 1 0 ${-2*r},0`,cx-r,cy,cx-r,cy);
// ellipse guide (closed)
const EL=(cx,cy,rx,ry)=>G(`M${cx-rx},${cy} a${rx},${ry} 0 1 0 ${2*rx},0 a${rx},${ry} 0 1 0 ${-2*rx},0`,cx-rx,cy,cx-rx,cy);
// rounded-rect guide (closed)
const RR=(x,y,w,h,r)=>G(`M${x+r},${y} h${w-2*r} a${r},${r} 0 0 1 ${r},${r} v${h-2*r} a${r},${r} 0 0 1 ${-r},${r} h${-(w-2*r)} a${r},${r} 0 0 1 ${-r},${-r} v${-(h-2*r)} a${r},${r} 0 0 1 ${r},${-r} Z`,x+r,y,x+r,y+r);

const wave=(y,x1,x2,amp,segs)=>{ // smooth repeated half-waves
 const step=(x2-x1)/segs; let d=`M${x1},${y}`;
 for(let i=0;i<segs;i++){ const dir=i%2?-1:1; d+=` q${step/2},${dir*amp} ${step},0`; }
 return G(d,x1,y,x2,y);
};
export const GROUP_NAMES=['Curves and Paths','Lines and Direction','Connect and Complete','Shapes and Outlines','Creative Stroke Practice'];

export const writingAdventures=[
{
 num:1,slug:'hedgehogs-winding-path',img:'hedgehogs-winding-path.webp',scene:'hedgehog',
 title:'Hedgehog’s Winding Path',h1:'Hedgehog’s Winding Path',
 tag:'Trace the winding road from the hedgehog to the strawberry.',
 skill:'Wavy pencil control',group:0,engine:'trace',tol:60,
 say:'Start at the green dot by the hedgehog and follow the winding road all the way to the strawberry.',
 hint:'Stay on the wiggly road — you are doing great!',
 doneTitle:'You reached the strawberry!',
 doneSub:'A long winding line, drawn all by yourself. The hedgehog is delighted.',
 alt:'A hedgehog and a strawberry joined by a long dashed winding path to trace.',
 guides:[G('M150,470 C280,470 300,270 480,270 C660,270 660,660 860,660 C1060,660 1060,250 1240,250 C1370,250 1430,360 1450,460',150,470,1450,460)]
},
{
 num:2,slug:'busy-bee-loop-practice',img:'busy-bee-loop-practice.webp',scene:'bee',
 title:'Busy Bee Loop Practice',h1:'Busy Bee Loop Practice',
 tag:'Trace the connected loops from the bee to the flowers.',
 skill:'Loop and curve control',group:0,engine:'trace',tol:58,
 say:'Start at the bee and fly in loops — up, around, and around again — until you reach the flowers.',
 hint:'Round and round — lovely loops!',
 doneTitle:'Four beautiful loops!',
 doneSub:'Loops are how cursive begins. Your pencil is learning to dance.',
 alt:'A bee and a row of flowers joined by a dashed trail of connected loops to trace.',
 guides:[G('M170,460 a140,140 0 1 1 280,0 a140,140 0 0 0 280,0 a140,140 0 1 1 280,0 a140,140 0 0 0 280,0',170,460,1290,460)]
},
{
 num:3,slug:'sailboat-wave-tracing',img:'sailboat-wave-tracing.webp',scene:'sailboat',
 title:'Sailboat Wave Tracing',h1:'Sailboat Wave Tracing',
 tag:'Draw three smooth waves to carry the boat to the lighthouse.',
 skill:'Smooth waves up and down',group:0,engine:'trace',tol:55,
 say:'Draw each wave from the boat to the lighthouse — up, down, up, down. Three calm waves.',
 hint:'Up and down, nice and smooth!',
 doneTitle:'Three smooth waves!',
 doneSub:'The boat rocks gently all the way to the lighthouse. Captain — admire your sea!',
 alt:'A sailboat and a lighthouse with three dashed wave lines to trace between them.',
 guides:[wave(300,220,1380,58,5),wave(460,220,1380,58,5),wave(620,220,1380,58,5)]
},
{
 num:4,slug:'rocket-zigzag-mission',img:'rocket-zigzag-mission.webp',scene:'rocket',
 title:'Rocket Zigzag Mission',h1:'Rocket Zigzag Mission',
 tag:'Trace the rocket’s zigzag flight up to the planet.',
 skill:'Sharp zigzag strokes',group:0,engine:'trace',tol:55,
 say:'Blast off from the rocket! Zig and zag all the way up to the little planet.',
 hint:'Zig… zag… zig… like a rocket!',
 doneTitle:'Mission complete!',
 doneSub:'A real zigzag — sharp corners and all. The planet sends its hello.',
 alt:'A rocket and a planet joined by a dashed zigzag flight path to trace.',
 guides:[G('M180,740 L430,600 L680,740 L930,600 L1180,740 L1420,560',180,740,1420,560)]
},
{
 num:5,slug:'snail-spiral-drawing',img:'snail-spiral-drawing.webp',scene:'snail',
 title:'Snail Spiral Drawing',h1:'Snail Spiral Drawing',
 tag:'Trace the big spiral on the snail’s shell, from the middle outwards.',
 skill:'Growing spirals',group:0,engine:'trace',tol:52,
 say:'Start in the middle of the shell and spin around and around, getting bigger each time.',
 hint:'Round and round, bigger and bigger!',
 doneTitle:'One perfect shell!',
 doneSub:'Spiral control is a giant step for little pencils. The snail is proud.',
 alt:'A smiling snail with a big dashed spiral shell to trace from the centre outwards.',
 guides:[G('M770,470 a45,45 0 0 1 90,0 a90,90 0 0 1 -180,0 a135,135 0 0 1 270,0 a180,180 0 0 1 -360,0 a225,225 0 0 1 450,0 a262,262 0 0 1 -440,190',770,470,735,835)]
},
{
 num:6,slug:'rainbow-arch-tracing',img:'rainbow-arch-tracing.webp',scene:'rainbow',
 title:'Rainbow Arch Tracing',h1:'Rainbow Arch Tracing',
 tag:'Draw each rainbow band — four calm arches from cloud to cloud.',
 skill:'Big curved arches',group:0,engine:'trace',tol:55,
 say:'Draw one arch at a time, from the small one to the big one. Up and over, cloud to cloud!',
 hint:'Up and over — a beautiful arch!',
 doneTitle:'A rainbow of your own!',
 doneSub:'Four arches, each drawn in one calm sweep. Rainbows love company.',
 alt:'Two smiling clouds with four dashed rainbow arches waiting to be traced.',
 guides:[
  G('M520,700 A280,280 0 0 1 1080,700',520,700,1080,700),
  G('M420,700 A380,380 0 0 1 1180,700',420,700,1180,700),
  G('M320,700 A480,480 0 0 1 1280,700',320,700,1280,700),
  G('M220,700 A580,580 0 0 1 1380,700',220,700,1380,700)]
},
{
 num:7,slug:'spider-web-builder',img:'spider-web-builder.webp',scene:'web',
 title:'Spider Web Builder',h1:'Spider Web Builder',
 tag:'Connect the anchor points with straight strokes to build the web.',
 skill:'Straight strokes between points',group:1,engine:'trace',tol:50,
 say:'Draw straight lines: first from the middle out to every anchor point, then all around the rim.',
 hint:'Straight and steady — the web grows!',
 doneTitle:'A finished web!',
 doneSub:'Eight spokes and a full rim. The spider moves in with pride.',
 alt:'A spider web with dashed spokes and rim segments connecting colored anchor points.',
 guides:[
  L(800,430,800,120),L(800,430,1046,262),L(800,430,1146,430),L(800,430,1046,598),
  L(800,430,800,740),L(800,430,554,598),L(800,430,454,430),L(800,430,554,262),
  L(800,120,1046,262),L(1046,262,1146,430),L(1146,430,1046,598),L(1046,598,800,740),
  L(800,740,554,598),L(554,598,454,430),L(454,430,554,262),L(554,262,800,120)]
},
{
 num:8,slug:'puppy-maze-adventure',img:'puppy-maze-adventure.webp',scene:'maze',
 title:'Puppy Maze Adventure',h1:'Puppy Maze Adventure',
 tag:'Draw one continuous route from the puppy’s gate to the bone — without touching the walls.',
 skill:'Planned routes and control',group:1,engine:'maze',tol:46,
 say:'Start at the puppy’s gate, then draw one line all the way to the bone. Mind the blue walls!',
 hint:'Slow and steady — the walls are friendly if you go around.',
 doneTitle:'You found the bone!',
 doneSub:'One steady line through the whole maze. The puppy is thrilled.',
 alt:'A puppy at a maze entrance and a bone at the exit, with blue walls to draw around.',
 walls:[
  W(250,150,1350,150),W(250,750,1350,750),
  W(250,150,250,400),W(250,500,250,750),
  W(1350,150,1350,400),W(1350,500,1350,750),
  W(560,150,560,580),W(860,320,860,750),W(1120,150,1120,580)]
},
{
 num:9,slug:'ladybug-dot-to-dot',img:'ladybug-dot-to-dot.webp',scene:'ladybug',
 title:'Ladybug Dot-to-Dot',h1:'Ladybug Dot-to-Dot',
 tag:'Connect the ten numbered dots in order — 1, 2, 3… all the way to 10.',
 skill:'Number order and connecting',group:1,engine:'dots',tol:50,
 say:'Tap dot 1, then dot 2, then dot 3… watch the line fly from dot to dot until you reach 10!',
 hint:'Which number comes next? You can do it!',
 doneTitle:'Dot to dot complete!',
 doneSub:'Ten dots, ten lines, one big circle around the ladybug.',
 alt:'A ladybug surrounded by ten numbered colored dots to connect in order.',
 dots:(()=>{const pts=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*(Math.PI*2/10);pts.push({x:Math.round(800+Math.cos(a)*430),y:Math.round(430+Math.sin(a)*270)});}return pts;})()
},
{
 num:10,slug:'safari-line-drawing',img:'safari-line-drawing.webp',scene:'safari',
 title:'Safari Line Drawing',h1:'Safari Line Drawing',
 tag:'Practice tall lines, flat lines and slanted lines — one animal friend per kind.',
 skill:'Vertical, horizontal and diagonal strokes',group:1,engine:'trace',tol:48,
 say:'Tall lines for the giraffe, flat lines for the zebra, slanted lines for the elephant. Draw each dashed line.',
 hint:'Tall, flat, slanted — three kinds of strong!',
 doneTitle:'A whole safari of lines!',
 doneSub:'Tall, flat and slanted — the three directions every letter needs.',
 alt:'A giraffe, a zebra and an elephant with dashed vertical, horizontal and diagonal lines to trace.',
 guides:[
  L(260,240,260,560),L(400,240,400,560),L(540,240,540,560),L(680,240,680,560),
  L(760,260,1180,260),L(760,370,1180,370),L(760,480,1180,480),L(760,590,1180,590),
  L(1260,240,1460,440),L(1400,240,1460,300),L(1260,420,1460,620),L(1260,470,1400,610)]
}
];

writingAdventures.push(
{
 num:11,slug:'octopus-curly-arms',img:'octopus-curly-arms.webp',scene:'octopus',
 title:'Octopus Curly Arms',h1:'Octopus Curly Arms',
 tag:'Draw six curly tentacles, one friendly curl at a time.',
 skill:'Curves that curl',group:1,engine:'trace',tol:52,
 say:'Draw each curly arm from the octopus down to its tip. Six arms, six curls!',
 hint:'Every curl counts — one at a time.',
 doneTitle:'Six curly arms!',
 doneSub:'Curls like these grow into cursive letters one day.',
 alt:'A purple octopus with six dashed curly tentacle outlines to trace.',
 guides:[
  G('M520,430 C470,560 420,620 460,700 a38,38 0 0 0 72,-14',520,430,532,714),
  G('M660,460 C640,580 660,660 730,700 a38,38 0 0 0 54,-40',660,460,784,690),
  G('M800,470 C800,590 790,670 830,730 a38,38 0 0 0 60,-30',800,470,890,726),
  G('M940,460 C970,580 950,660 890,710',940,460,890,710),
  G('M1080,430 C1130,560 1180,620 1140,700 a38,38 0 0 1 -72,-14',1080,430,1068,714),
  G('M1230,400 C1290,500 1300,590 1240,660 a36,36 0 0 1 -58,-24',1230,400,1182,662)]
},
{
 num:12,slug:'pencil-stroke-academy',img:'pencil-stroke-academy.webp',scene:'academy',
 title:'Pencil Stroke Academy',h1:'Pencil Stroke Academy',
 tag:'Four exercises, four kinds of strokes: tall, flat, slanted and round.',
 skill:'The four handwriting strokes',group:1,engine:'trace',tol:46,
 say:'Four little gyms for your pencil! Tall lines, flat lines, slanted lines and circles — finish each box.',
 hint:'One box at a time — every stroke makes letters easier.',
 doneTitle:'Academy graduate!',
 doneSub:'Tall, flat, slanted and round — your pencil knows them all.',
 alt:'Four practice boxes with dashed vertical, horizontal, diagonal and circle strokes to trace.',
 guides:[
  L(200,200,200,420),L(310,200,310,420),L(420,200,420,420),L(530,200,530,420),
  L(900,260,1320,260),L(900,360,1320,360),L(900,460,1320,460),
  L(1000,560,1180,720),L(1100,560,1280,720),
  O(700,640,80)]
},
{
 num:13,slug:'castle-bridge-builder',img:'castle-bridge-builder.webp',scene:'bridge',
 title:'Castle Bridge Builder',h1:'Castle Bridge Builder',
 tag:'Draw the missing bridge planks from tower to tower.',
 skill:'Straight horizontal strokes',group:2,engine:'trace',tol:46,
 say:'Draw each plank straight across the river. Five planks and the bridge is strong!',
 hint:'Straight across — the knights are waiting!',
 doneTitle:'The bridge is built!',
 doneSub:'Five strong planks. Anyone can cross to the castle now.',
 alt:'Two castle towers over a river with five dashed plank lines to draw between them.',
 guides:[L(360,260,1240,260),L(360,370,1240,370),L(360,480,1240,480),L(360,590,1240,590),L(360,700,1240,700)]
},
{
 num:14,slug:'lions-crazy-mane',img:'lions-crazy-mane.webp',scene:'lion',
 title:'Lion’s Crazy Mane',h1:'Lion’s Crazy Mane',
 tag:'Draw the mane: short strokes, long strokes and wavy strokes all around.',
 skill:'Radiating strokes',group:2,engine:'trace',tol:48,
 say:'Draw the lion’s hair! Little lines all around the face — some short, some long, some wavy.',
 hint:'Around and around — what a hairstyle!',
 doneTitle:'The craziest mane in the jungle!',
 doneSub:'Twelve proud strokes. The lion looks magnificent.',
 alt:'A friendly lion face with twelve dashed mane strokes radiating around it.',
 guides:(()=>{const gs=[];for(let i=0;i<12;i++){const a=i*(Math.PI*2/12);const r1=180,r2=i%3===2?330:290;const cx=800,cy=450;const x1=Math.round(cx+Math.cos(a)*r1),y1=Math.round(cy+Math.sin(a)*r1*0.9),x2=Math.round(cx+Math.cos(a)*r2),y2=Math.round(cy+Math.sin(a)*r2*0.9);
  if(i%3===2){const mx=Math.round(cx+Math.cos(a+0.18)*(r1+r2)/2),my=Math.round(cy+Math.sin(a+0.18)*(r1+r2)/2*0.9);gs.push(G(`M${x1},${y1} Q${mx},${my} ${x2},${y2}`,x1,y1,x2,y2));}
  else gs.push(L(x1,y1,x2,y2));}return gs;})()
},
{
 num:15,slug:'rainy-day-drawing',img:'rainy-day-drawing.webp',scene:'rain',
 title:'Rainy Day Drawing',h1:'Rainy Day Drawing',
 tag:'Trace the rain: short drops, long drops and slanted drops.',
 skill:'Short, long and slanted strokes',group:2,engine:'trace',tol:44,
 say:'Make it rain! Draw the little drops under each cloud — short ones, long ones, and slanted ones.',
 hint:'Pitter-patter — every drop counts!',
 doneTitle:'A perfect rainy day!',
 doneSub:'Short, long and slanted — the rain is entirely your work.',
 alt:'Three smiling clouds with dashed short, long and slanted rain lines to trace.',
 guides:[
  L(200,320,200,400),L(300,320,300,400),L(400,320,400,400),
  L(700,320,700,560),L(800,320,800,560),L(900,320,900,560),
  L(1200,320,1140,520),L(1300,320,1240,520),L(1400,320,1340,520)]
},
{
 num:16,slug:'dinosaur-fossil-artist',img:'dinosaur-fossil-artist.webp',scene:'dino',
 title:'Dinosaur Fossil Artist',h1:'Dinosaur Fossil Artist',
 tag:'Trace the missing bone outlines to finish the dinosaur skeleton.',
 skill:'Careful outline tracing',group:2,engine:'trace',tol:50,
 say:'Be the paleontologist! Draw the missing bones — the spine, the ribs and the leg bone.',
 hint:'Slow and careful, like a real scientist.',
 doneTitle:'The fossil is complete!',
 doneSub:'Every bone in place. Museum curators everywhere are impressed.',
 alt:'A dinosaur skeleton with dashed outlines on the missing bones to trace.',
 guides:[
  G('M300,430 C480,330 720,330 900,400 C1080,460 1240,440 1330,380',300,430,1330,380),
  G('M480,360 C500,440 500,520 470,580',480,360,470,580),
  G('M640,345 C665,430 665,510 640,585',640,345,640,585),
  G('M800,350 C830,435 830,515 800,590',800,350,800,590),
  O(1000,600,95)]
},
{
 num:17,slug:'teddy-bear-stitching-studio',img:'teddy-bear-stitching-studio.webp',scene:'teddy',
 title:'Teddy Bear Stitching Studio',h1:'Teddy Bear Stitching Studio',
 tag:'Connect the stitching dots to sew the patch onto the teddy’s tummy.',
 skill:'Connecting points in order',group:2,engine:'dots',tol:50,
 say:'Tap the numbered stitching dots in order to sew all around the patch. Twelve careful stitches!',
 hint:'Dot to dot, stitch by stitch.',
 doneTitle:'All sewn up!',
 doneSub:'Twelve even stitches. The teddy gives you a big soft hug.',
 alt:'A teddy bear with twelve numbered stitching dots around a fabric patch on its tummy.',
 dots:(()=>{const pts=[];for(let i=0;i<12;i++){const a=-Math.PI/2+i*(Math.PI*2/12);pts.push({x:Math.round(800+Math.cos(a)*270),y:Math.round(470+Math.sin(a)*190)});}return pts;})()
},
{
 num:18,slug:'penguin-figure-eight-skating',img:'penguin-figure-eight-skating.webp',scene:'penguin',
 title:'Penguin Figure-Eight Skating',h1:'Penguin Figure-Eight Skating',
 tag:'Skate one continuous figure-eight around the rink.',
 skill:'Continuous loops crossing once',group:2,engine:'trace',tol:55,
 say:'Start at the penguin and skate one big figure eight — around, cross in the middle, and around again.',
 hint:'Around… cross… and around again!',
 doneTitle:'A perfect figure eight!',
 doneSub:'One continuous line with one crossing — beautiful skating!',
 alt:'A penguin on an ice rink with a large dashed figure-eight loop to trace.',
 guides:[G('M800,450 C800,290 520,290 520,450 C520,610 800,610 800,450 C800,290 1080,290 1080,450 C1080,610 800,610 800,450',800,450,800,450)]
},
{
 num:19,slug:'little-railway-engineer',img:'little-railway-engineer.webp',scene:'railway',
 title:'Little Railway Engineer',h1:'Little Railway Engineer',
 tag:'Draw the two railway rails — two long parallel lines from station to station.',
 skill:'Long parallel lines',group:2,engine:'trace',tol:48,
 say:'Draw the top rail, then the bottom rail. Keep them straight and steady from the train to the house.',
 hint:'Straight and parallel — just like real tracks!',
 doneTitle:'The railway is open!',
 doneSub:'Two perfectly parallel rails. All aboard!',
 alt:'A toy train and a station house with two dashed parallel rail lines to draw between them.',
 guides:[L(220,400,1380,400),L(220,560,1380,560)]
},
{
 num:20,slug:'mountain-tent-builder',img:'mountain-tent-builder.webp',scene:'tent',
 title:'Mountain Tent Builder',h1:'Mountain Tent Builder',
 tag:'Trace the tent sides — slanted lines up to each peak and down.',
 skill:'Diagonal strokes',group:3,engine:'trace',tol:48,
 say:'Build the tents! Draw each slanted side — up to the peak, then down the other side.',
 hint:'Up to the peak, down to the grass.',
 doneTitle:'Camp is ready!',
 doneSub:'Six slanted sides, three cozy tents. Time for pretend marshmallows.',
 alt:'Three tents on a campsite with dashed slanted sides to trace up and down each peak.',
 guides:[
  L(260,660,410,340),L(410,340,560,660),
  L(660,660,810,340),L(810,340,960,660),
  L(1060,660,1210,340),L(1210,340,1360,660)]
},
{
 num:21,slug:'duckling-bridge-arches',img:'duckling-bridge-arches.webp',scene:'duckling',
 title:'Duckling Bridge Arches',h1:'Duckling Bridge Arches',
 tag:'Draw three arched bridges so the ducklings can cross the ponds.',
 skill:'Semicircle arches',group:3,engine:'trace',tol:52,
 say:'Draw each bridge arch — up and over in one smooth half-circle.',
 hint:'Up and over — the ducklings waddle across!',
 doneTitle:'Three bridges, three quacks of thanks!',
 doneSub:'Smooth half-circles every one. The ducklings parade across.',
 alt:'Three ponds with ducklings and dashed semicircular bridge arches to trace.',
 guides:[
  G('M310,620 A140,140 0 0 1 590,620',310,620,590,620),
  G('M660,620 A140,140 0 0 1 940,620',660,620,940,620),
  G('M1010,620 A140,140 0 0 1 1290,620',1010,620,1290,620)]
},
{
 num:22,slug:'robot-circuit-workshop',img:'robot-circuit-workshop.webp',scene:'robot',
 title:'Robot Circuit Workshop',h1:'Robot Circuit Workshop',
 tag:'Trace the circuits — right angles only! — to power up the robot.',
 skill:'Right-angle turns',group:3,engine:'trace',tol:50,
 say:'Draw each circuit with sharp corners: straight across, straight down, straight across again. Beep boop!',
 hint:'Corner, corner, corner — robots love right angles!',
 doneTitle:'Robot powered up!',
 doneSub:'Two circuits with perfect right angles. Beep boop — thank you!',
 alt:'Batteries and a robot with dashed right-angle circuit paths to trace.',
 guides:[
  G('M300,240 L760,240 L760,560 L1300,560',300,240,1300,560),
  G('M300,620 L560,620 L560,360 L1020,360 L1020,470 L1300,470',300,620,1300,470)]
},
{
 num:23,slug:'butterfly-mirror-drawing',img:'butterfly-mirror-drawing.webp',scene:'mirror',
 title:'Butterfly Mirror Drawing',h1:'Butterfly Mirror Drawing',
 tag:'The left wing is painted — draw the missing right wing to match it.',
 skill:'Mirror symmetry',group:3,engine:'trace',tol:58,
 say:'Look at the left wing. Draw the right wing so it matches — same shapes, other side!',
 hint:'Copycat drawing — make the two wings twins!',
 doneTitle:'Twin wings!',
 doneSub:'A matching right wing, drawn by you. The butterfly is symmetrical — and splendid.',
 alt:'A butterfly with a colored left wing and a dashed outline right wing to complete.',
 guides:[
  G('M800,420 C920,300 1120,290 1190,380 C1260,470 1180,560 1080,560 C1160,610 1120,700 1020,690 C930,680 850,580 800,480',800,420,800,480),
  G('M960,420 C1000,390 1060,395 1075,440',960,420,1075,440),
  G('M970,600 C1010,630 1060,620 1070,575',970,600,1070,575)]
},
{
 num:24,slug:'fluffy-sheep-wool-artist',img:'fluffy-sheep-wool-artist.webp',scene:'sheep',
 title:'Fluffy Sheep Wool Artist',h1:'Fluffy Sheep Wool Artist',
 tag:'Trace the connected fluffy humps to grow the sheep’s wool.',
 skill:'Connected bumps and humps',group:3,engine:'trace',tol:52,
 say:'Draw the woolly coat! Bump, bump, bump — trace the connected humps all around the sheep.',
 hint:'Bump by bump — fluffier and fluffier!',
 doneTitle:'One very fluffy sheep!',
 doneSub:'Two chains of perfect humps. That is an extremely cozy sheep.',
 alt:'A sheep with dashed chains of rounded wool humps around its body to trace.',
 guides:[
  G('M330,470 a95,95 0 0 1 190,0 a95,95 0 0 1 190,0 a95,95 0 0 1 190,0 a95,95 0 0 1 190,0 a95,95 0 0 1 176,-16',330,470,1266,442),
  G('M1266,505 a95,95 0 0 1 -180,20 a95,95 0 0 1 -190,0 a95,95 0 0 1 -190,0 a95,95 0 0 1 -190,0 a95,95 0 0 1 -186,-6',1266,505,330,539)]
},
{
 num:25,slug:'giraffe-necklace-designer',img:'giraffe-necklace-designer.webp',scene:'giraffe',
 title:'Giraffe Necklace Designer',h1:'Giraffe Necklace Designer',
 tag:'Trace the big circle beads to finish the giraffe’s necklace.',
 skill:'Full circles',group:3,engine:'trace',tol:50,
 say:'Draw each necklace bead — a whole circle, all the way around. Five beads make a necklace!',
 hint:'All the way around until it closes!',
 doneTitle:'A dazzling necklace!',
 doneSub:'Five whole circles. The giraffe wears it to every party.',
 alt:'A giraffe with five dashed circle beads hanging as a necklace to trace.',
 guides:[O(470,560,72),O(635,640,72),O(800,675,72),O(965,640,72),O(1130,560,72)]
},
{
 num:26,slug:'castle-brick-artist',img:'castle-brick-artist.webp',scene:'bricks',
 title:'Castle Brick Artist',h1:'Castle Brick Artist',
 tag:'Trace the missing bricks — careful rectangles that fit the wall.',
 skill:'Rectangles',group:3,engine:'trace',tol:48,
 say:'The castle wall has gaps! Draw each missing brick — four straight sides, nice corners.',
 hint:'Four sides, four corners — a proper brick!',
 doneTitle:'The wall is whole again!',
 doneSub:'Six perfect bricks. The castle builders salute you.',
 alt:'A castle wall with six dashed rectangular brick outlines to trace.',
 guides:[
  RR(430,240,220,110,10),RR(760,240,220,110,10),RR(1090,240,220,110,10),
  RR(595,400,220,110,10),RR(925,400,220,110,10),
  RR(760,560,220,110,10)]
},
{
 num:27,slug:'squirrel-acorn-drawing',img:'squirrel-acorn-drawing.webp',scene:'squirrel',
 title:'Squirrel Acorn Drawing',h1:'Squirrel Acorn Drawing',
 tag:'Trace the oval acorn bodies for the squirrel’s winter store.',
 skill:'Ovals',group:3,engine:'trace',tol:50,
 say:'Draw each acorn — a plump oval, all the way around. Four acorns for winter!',
 hint:'Around and around — a nice fat oval!',
 doneTitle:'Winter is sorted!',
 doneSub:'Four perfect acorns. The squirrel is storing them already.',
 alt:'A squirrel beside four dashed oval acorn outlines to trace.',
 guides:[EL(500,420,105,135),EL(780,420,105,135),EL(1060,420,105,135),EL(1340,420,105,135)]
},
{
 num:28,slug:'pinwheel-shape-maker',img:'pinwheel-shape-maker.webp',scene:'pinwheel',
 title:'Pinwheel Shape Maker',h1:'Pinwheel Shape Maker',
 tag:'Trace the four triangle blades to finish the pinwheel.',
 skill:'Triangles',group:3,engine:'trace',tol:50,
 say:'Draw each blade — three straight sides that close into a triangle. The wind is waiting!',
 hint:'Three sides, closed up tight — a triangle!',
 doneTitle:'Let it spin!',
 doneSub:'Four strong triangles. The pinwheel turns in the breeze.',
 alt:'A pinwheel with four dashed triangular blades to trace.',
 guides:[
  G('M800,450 L800,240 L990,345 Z',800,450,990,345),
  G('M800,450 L1010,450 L905,655 Z',800,450,905,655),
  G('M800,450 L800,660 L610,555 Z',800,450,610,555),
  G('M800,450 L590,450 L695,245 Z',800,450,695,245)]
},
{
 num:29,slug:'crab-claw-curves',img:'crab-claw-curves.webp',scene:'crab',
 title:'Crab Claw Curves',h1:'Crab Claw Curves',
 tag:'Trace the C-shaped claw and the backwards-C claw.',
 skill:'Open C curves',group:4,engine:'trace',tol:55,
 say:'Snip snip! Draw the big C for the left claw, then the backwards C for the right claw.',
 hint:'Open wide — a great big C!',
 doneTitle:'Snip snip — superb claws!',
 doneSub:'One C and one backwards C. The crab claps four times.',
 alt:'A red crab with dashed C-shaped and backwards-C claw outlines to trace.',
 guides:[
  G('M560,280 A200,200 0 1 0 560,620',560,280,560,620),
  G('M1040,280 A200,200 0 1 1 1040,620',1040,280,1040,620)]
},
{
 num:30,slug:'sunshine-stroke-challenge',img:'sunshine-stroke-challenge.webp',scene:'sun',
 title:'Sunshine Stroke Challenge',h1:'Sunshine Stroke Challenge',
 tag:'The final challenge: twelve sun rays — short and long, all around.',
 skill:'Mixed stroke lengths',group:4,engine:'trace',tol:48,
 say:'The grand finale! Draw every sun ray — six short ones and six long ones, all the way around.',
 hint:'Ray by ray — you are a stroke star now!',
 doneTitle:'You are a sunshine stroke star!',
 doneSub:'Twelve rays, every one earned. Class 27 is complete — magnificent work!',
 alt:'A smiling sun with twelve dashed rays, short and long, to trace all around.',
 guides:(()=>{const gs=[];for(let i=0;i<12;i++){const a=i*(Math.PI*2/12);const r1=190,r2=i%2?400:290;const cx=800,cy=430;
  gs.push(L(Math.round(cx+Math.cos(a)*r1),Math.round(cy+Math.sin(a)*r1),Math.round(cx+Math.cos(a)*r2),Math.round(cy+Math.sin(a)*r2)));}return gs;})()
}
);

export const writingBySlug=Object.fromEntries(writingAdventures.map(a=>[a.slug,a]));
export const writingByNum=n=>writingAdventures.find(a=>a.num===n);

/* ---------- scene painters (1600×900 viewBox) ---------- */
const FIX=(fill,extra='')=>`fill="${fill}" stroke="#3a3350" stroke-width="6" stroke-linejoin="round" ${extra}`;
const bg=(a,b)=>`<defs><linearGradient id="wbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="1600" height="900" fill="url(#wbg)"/>`;
const star=(x,y,s=1)=>`<path transform="translate(${x} ${y}) scale(${s})" d="M0,-30 L8,-9 L31,-8 L13,6 L19,28 L0,15 L-19,28 L-13,6 L-31,-8 L-8,-9 Z" fill="#f5c531" stroke="#3a3350" stroke-width="4" stroke-linejoin="round"/>`;
const flower=(x,y,c)=>`<g transform="translate(${x} ${y})"><circle r="10" fill="#f5c531" stroke="#3a3350" stroke-width="3"/>${[0,60,120,180,240,300].map(a=>`<ellipse cx="${Math.round(Math.cos(a*Math.PI/180)*22)}" cy="${Math.round(Math.sin(a*Math.PI/180)*22)}" rx="13" ry="9" fill="${c}" stroke="#3a3350" stroke-width="3" transform="rotate(${a} ${Math.round(Math.cos(a*Math.PI/180)*22)} ${Math.round(Math.sin(a*Math.PI/180)*22)})"/>`).join('')}</g>`;
const cloud=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse rx="70" ry="30" fill="#fff" stroke="#3a3350" stroke-width="5"/><ellipse cx="-34" cy="-14" rx="34" ry="22" fill="#fff" stroke="#3a3350" stroke-width="5"/><ellipse cx="30" cy="-12" rx="38" ry="24" fill="#fff" stroke="#3a3350" stroke-width="5"/><circle cx="-22" cy="0" r="4" fill="#3a3350"/><circle cx="18" cy="0" r="4" fill="#3a3350"/><path d="M-8,12 q8,8 16,0" stroke="#3a3350" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;

const SCENES={
 hedgehog:()=>bg('#eafaf0','#d2ecd8')
  +`<ellipse cx="230" cy="500" rx="120" ry="95" ${FIX('#c98d5a')}/><path d="M150,430 L130,380 L180,410 Z M200,400 L200,350 L240,395 Z M270,415 L300,370 L305,425 Z M310,450 L350,420 L340,470 Z" ${FIX('#8a5a34','# stroke-width="4"')}/>
  <circle cx="286" cy="478" r="26" ${FIX('#e8b88a')}/><circle cx="278" cy="472" r="5" fill="#3a3350"/><circle cx="298" cy="472" r="5" fill="#3a3350"/><circle cx="288" cy="486" r="4" fill="#3a3350"/>
  <g transform="translate(1450,460)"><path d="M0,52 C-42,20 -56,-14 -40,-40 C-26,-62 -4,-58 0,-38 C4,-58 26,-62 40,-40 C56,-14 42,20 0,52 Z" ${FIX('#e04b3f')}/><path d="M-26,-34 q26,14 52,0 l-8,22 q-18,10 -36,0 Z" ${FIX('#4a9e4f','# stroke-width="4"')}/></g>`
  +flower(120,760,'#f28ab5')+flower(560,800,'#8fbfe8')+flower(1000,790,'#f5c531')+flower(1430,760,'#f28ab5')+flower(760,180,'#8fbfe8'),
 bee:()=>bg('#fff9ec','#fdeecb')
  +`<g transform="translate(190,460)"><ellipse rx="58" ry="44" ${FIX('#f5c531')}/><path d="M-18,-42 v84 M10,-44 v88 M38,-40 v80" stroke="#3a3350" stroke-width="8"/><circle cx="44" cy="-14" r="16" ${FIX('#3a3350','# stroke-width="4"')}/><ellipse cx="-6" cy="-46" rx="26" ry="16" fill="#bfe3f7" stroke="#3a3350" stroke-width="4"/></g>`
  +flower(1400,300,'#f28ab5')+flower(1470,460,'#f5c531')+flower(1390,620,'#8fbfe8')
  +flower(560,180,'#c98d5a')+flower(1010,760,'#c98d5a'),
 sailboat:()=>bg('#d8f0fb','#bfe6f7')
  +`<path d="M120,560 h300 l-60,120 h-190 Z" ${FIX('#e04b3f')}/><rect x="262" y="300" width="10" height="256" ${FIX('#8a5a34')}/><path d="M272,310 C380,360 380,470 272,540 Z" ${FIX('#fff7ea')}/><path d="M258,320 C180,370 180,470 258,540 Z" ${FIX('#f28ab5')}/>
  <g transform="translate(1440,430)"><rect x="-38" y="-140" width="76" height="300" ${FIX('#e04b3f')}/><rect x="-24" y="-120" width="48" height="40" fill="#fff"/><rect x="-24" y="-60" width="48" height="40" fill="#fff"/><rect x="-24" y="0" width="48" height="40" fill="#fff"/><circle cx="0" cy="120" r="18" ${FIX('#f5c531','# stroke-width="4"')}/></g>`
  +`<path d="M60,760 q40,-26 80,0 q40,26 80,0" stroke="#3d9fd4" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M1180,790 q40,-26 80,0 q40,26 80,0" stroke="#3d9fd4" stroke-width="6" fill="none" stroke-linecap="round"/>`,
 rocket:()=>bg('#4a4272','#2c2750')
  +star(300,200,0.8)+star(1300,240,0.7)+star(500,760,0.6)+star(1100,140,0.8)+star(880,700,0.7)
  +`<g transform="translate(150,780)"><path d="M0,30 C-30,-10 -30,-80 0,-110 C30,-80 30,-10 0,30 Z" ${FIX('#e04b3f')}/><circle cx="0" cy="-46" r="14" fill="#bfe3f7"/><path d="M-22,26 q-20,16 -26,44 M22,26 q20,16 26,44" stroke="#f5c531" stroke-width="6" fill="none" stroke-linecap="round"/></g>`
  +`<circle cx="1460" cy="140" r="86" ${FIX('#8f4fc0')}/><ellipse cx="1460" cy="140" rx="120" ry="26" fill="none" stroke="#c8a06a" stroke-width="8"/>`,
 snail:()=>bg('#fdf3e0','#f3ddb7')
  +`<g transform="translate(300,600)"><path d="M-160,90 C-120,20 -40,0 40,10 L60,90 Z" ${FIX('#c98d5a')}/><circle cx="-120" cy="60" r="34" ${FIX('#e8b88a')}/><circle cx="-128" cy="52" r="5" fill="#3a3350"/><path d="M-108,34 q4,-30 18,-40 M-92,30 q10,-24 24,-30" stroke="#3a3350" stroke-width="5" fill="none" stroke-linecap="round"/></g>`
  +`<circle cx="230" cy="120" r="40" ${FIX('#f5c531','# opacity="0.6"')} opacity="0.0"/>`
  +flower(1420,780,'#f28ab5')+flower(1460,240,'#f5c531'),
 rainbow:()=>bg('#e7f6ff','#d5efdb')
  +cloud(190,690,1.1)+cloud(1410,690,1.1)
  +star(300,180,0.7)+star(1350,220,0.6)+star(820,90,0.8)
  +`<path d="M300,780 q40,-24 80,0" stroke="#7cc47f" stroke-width="8" fill="none" stroke-linecap="round"/>`,
 web:()=>bg('#f3ecff','#e2d4f7')
  +`<g transform="translate(800,430)">${[0,45,90,135,180,225,270,315].map(a=>`<circle cx="${Math.round(Math.cos(a*Math.PI/180)*430)}" cy="${Math.round(Math.sin(a*Math.PI/180)*310)}" r="16" ${FIX(['#e04b3f','#f5c531','#4a9e4f','#5aa7d6','#8f4fc0','#f07f28','#3fb8af','#f28ab5'][a/45],'# stroke-width="4"')}/>`).join('')}</g>`
  +`<g transform="translate(400,700)"><ellipse rx="40" ry="30" ${FIX('#3a3350','# stroke-width="4"')}/><circle cx="-12" cy="-8" r="5" fill="#fff"/><circle cx="10" cy="-8" r="5" fill="#fff"/><path d="M-40,10 q-30,20 -40,50 M40,10 q30,20 40,50 M-30,26 q-16,30 -10,54 M30,26 q16,30 10,54" stroke="#3a3350" stroke-width="5" fill="none" stroke-linecap="round"/></g>`,
 maze:()=>bg('#fdf9ef','#f7ecd4')
  +`<g transform="translate(160,450)"><circle r="70" ${FIX('#e8b88a')}/><circle cx="-20" cy="-14" r="7" fill="#3a3350"/><circle cx="16" cy="-14" r="7" fill="#3a3350"/><ellipse cx="-2" cy="18" rx="12" ry="9" fill="#3a3350"/><path d="M-70,30 Q-96,60 -70,86 M70,30 Q96,60 70,86" ${FIX('#a9744f','# stroke-width="4"')}/><path d="M-40,-66 q10,-26 34,-30 M40,-66 q-10,-26 -34,-30" stroke="#a9744f" stroke-width="8" fill="none" stroke-linecap="round"/></g>`
  +`<g transform="translate(1450,450) rotate(20)"><ellipse rx="64" ry="42" ${FIX('#f5c531')}/><ellipse rx="64" ry="42" fill="none" stroke="#d9a61e" stroke-width="6" stroke-dasharray="14 12"/></g>`
  +`<circle cx="240" cy="150" r="10" fill="#c98d5a" opacity="0.5"/><circle cx="1390" cy="780" r="10" fill="#c98d5a" opacity="0.5"/>`,
 ladybug:()=>bg('#eafaf0','#d2ecd8')
  +`<g transform="translate(800,430)"><circle r="90" ${FIX('#3a3350','# stroke-width="5"')}/><circle cx="-30" cy="-26" r="9" fill="#fff"/><circle cx="26" cy="-26" r="9" fill="#fff"/><path d="M-24,34 q24,18 48,0" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-90,-60 q-40,-30 -30,-70 M90,-60 q40,-30 30,-70" stroke="#3a3350" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="-122" cy="-134" r="8" fill="#3a3350"/><circle cx="122" cy="-134" r="8" fill="#3a3350"/></g>`
  +flower(150,780,'#f28ab5')+flower(1460,770,'#f5c531')+flower(200,160,'#8fbfe8')+flower(1420,150,'#f28ab5'),
 safari:()=>bg('#fdf9ef','#f0e4c4')
  +`<g transform="translate(150,240)"><path d="M0,320 C-10,220 10,140 40,90 L60,40 q20,-30 40,0 L120,90 C150,140 170,220 160,320 Z" ${FIX('#f5c531')}/><circle cx="75" cy="60" r="40" ${FIX('#f5c531')}/><path d="M45,20 q-30,-16 -20,-40 M105,20 q30,-16 20,-40" stroke="#a9744f" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="62" cy="52" r="5" fill="#3a3350"/><circle cx="88" cy="52" r="5" fill="#3a3350"/><path d="M62,76 q13,10 26,0" stroke="#3a3350" stroke-width="4" fill="none"/><path d="M40,140 h60 M50,180 h56 M40,220 h60 M50,260 h56" stroke="#a9744f" stroke-width="7"/></g>`
  +`<g transform="translate(960,180)"><rect x="0" y="60" width="190" height="110" rx="30" ${FIX('#fff')}/><rect x="10" y="75" width="170" height="80" rx="22" fill="none" stroke="#3a3350" stroke-width="4" stroke-dasharray="16 12"/><rect x="60" y="-10" width="70" height="80" rx="20" ${FIX('#fff')}/><circle cx="86" cy="20" r="6" fill="#3a3350"/><circle cx="112" cy="20" r="6" fill="#3a3350"/><rect x="20" y="170" width="22" height="80" ${FIX('#fff')}/><rect x="150" y="170" width="22" height="80" ${FIX('#fff')}/><path d="M14,240 h34 M144,240 h34" stroke="#3a3350" stroke-width="6"/></g>`
  +`<g transform="translate(1380,260)"><ellipse rx="80" ry="95" ${FIX('#8fbfe8')}/><circle cx="0" cy="-120" r="46" ${FIX('#8fbfe8')}/><path d="M-30,-140 q-20,-24 -8,-44 M30,-140 q20,-24 8,-44" stroke="#3a3350" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="-16" cy="-128" r="6" fill="#3a3350"/><circle cx="16" cy="-128" r="6" fill="#3a3350"/><path d="M-70,60 q-60,20 -70,70 M70,60 q60,20 70,70" ${FIX('#8fbfe8','# stroke-width="4"')}/></g>`,
 octopus:()=>bg('#e7f6ff','#cfe9f7')
  +`<g transform="translate(800,330)"><ellipse rx="150" ry="120" ${FIX('#9b7fd4')}/><circle cx="-46" cy="-24" r="16" fill="#fff"/><circle cx="46" cy="-24" r="16" fill="#fff"/><circle cx="-42" cy="-20" r="7" fill="#3a3350"/><circle cx="50" cy="-20" r="7" fill="#3a3350"/><path d="M-30,20 q30,26 60,0" stroke="#3a3350" stroke-width="6" fill="none" stroke-linecap="round"/></g>`
  +`<path d="M120,820 q-10,-50 24,-76 M180,826 q20,-44 -4,-70" ${FIX('#f28ab5','# stroke-width="4"')}/><path d="M1440,820 q-10,-50 24,-76 M1380,826 q20,-44 -4,-70" ${FIX('#3fb8af','# stroke-width="4"')}/>`
  +`<circle cx="300" cy="800" r="14" fill="#5aa7d6" opacity="0.5"/><circle cx="1280" cy="790" r="12" fill="#5aa7d6" opacity="0.5"/>`,
 academy:()=>bg('#fff9ec','#fdeecb')
  +`<g transform="translate(80,90)"><rect x="-20" y="-20" width="70" height="130" rx="14" ${FIX('#f5c531')}/><path d="M-20,90 L15,130 L50,90 Z" ${FIX('#f28ab5','# stroke-width="4"')}/><rect x="-8" y="6" width="46" height="70" rx="8" fill="#fff7ea"/></g>`
  +star(1450,120,0.8)+star(1520,420,0.6)+star(90,780,0.7),
 bridge:()=>bg('#e7f6ff','#cfe9f7')
  +`<rect x="180" y="180" width="120" height="480" ${FIX('#f2b8c6')}/><path d="M172,188 L240,120 L308,188 Z" ${FIX('#e88aa4')}/><rect x="1300" y="180" width="120" height="480" ${FIX('#f2b8c6')}/><path d="M1292,188 L1360,120 L1428,188 Z" ${FIX('#e88aa4')}/>`
  +`<path d="M0,730 h1600" stroke="#3d9fd4" stroke-width="90" opacity="0.45"/><path d="M100,760 q30,-16 60,0 M480,780 q30,-16 60,0 M900,760 q30,-16 60,0 M1320,780 q30,-16 60,0" stroke="#fff" stroke-width="5" fill="none" opacity="0.7"/>`
  +star(760,100,0.7),
 lion:()=>bg('#fff9ec','#fdeecb')
  +`<g transform="translate(800,450)"><circle r="170" ${FIX('#f5c531')}/><circle cx="-52" cy="-24" r="12" fill="#3a3350"/><circle cx="52" cy="-24" r="12" fill="#3a3350"/><ellipse cx="0" cy="30" rx="34" ry="26" ${FIX('#fff7ea','# stroke-width="4"')}/><ellipse cx="0" cy="16" rx="12" ry="9" fill="#3a3350"/><path d="M-34,60 q34,26 68,0" stroke="#3a3350" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="-130" cy="-90" r="24" ${FIX('#a9744f','# stroke-width="4"')}/><circle cx="130" cy="-90" r="24" ${FIX('#a9744f','# stroke-width="4"')}/></g>`
  +flower(160,780,'#f28ab5')+flower(1440,780,'#f5c531'),
 rain:()=>bg('#dfe9f2','#cfe0ec')
  +cloud(300,240,1.2)+cloud(800,240,1.2)+cloud(1300,240,1.2)
  +`<g transform="translate(1470,640)"><path d="M-70,10 a34,34 0 0 1 50,-30 a40,40 0 0 1 74,10 a30,30 0 0 1 12,58 l-120,0 q-26,-14 -16,-38 Z" ${FIX('#f07f28')}/><path d="M-40,-24 q0,-30 30,-36" stroke="#3a3350" stroke-width="6" fill="none"/><rect x="-64" y="44" width="128" height="10" ${FIX('#8a5a34','# stroke-width="4"')}/></g>`
  +`<g transform="translate(1330,700)"><rect x="-30" y="-40" width="26" height="60" rx="10" ${FIX('#f28ab5')}/><rect x="4" y="-40" width="26" height="60" rx="10" ${FIX('#f28ab5')}/><path d="M-30,-10 h60 v20 h-60 Z" ${FIX('#f28ab5','# stroke-width="4"')}/></g>`
  +`<g transform="translate(150,640)"><circle r="34" ${FIX('#4a9e4f')}/><circle cx="-12" cy="-8" r="5" fill="#3a3350"/><circle cx="12" cy="-8" r="5" fill="#3a3350"/><path d="M-12,12 q12,10 24,0" stroke="#3a3350" stroke-width="4" fill="none"/></g>`,
 dino:()=>bg('#f3ecdf','#e6d9c2')
  +`<circle cx="1420" cy="200" r="60" ${FIX('#c8a06a','# stroke-dasharray="10 8"')}/><path d="M1462,164 a60,60 0 0 1 -42,102" fill="none" stroke="#3a3350" stroke-width="4"/>`
  +`<ellipse cx="150" cy="760" rx="70" ry="40" ${FIX('#8fbfe8','# opacity="0.7"')}/><ellipse cx="320" cy="800" rx="56" ry="30" ${FIX('#4a9e4f','# opacity="0.7"')}/>`
  +`<g transform="translate(80,120)"><circle r="40" ${FIX('#a9744f','# stroke-width="4"')}/><rect x="-6" y="-70" width="12" height="50" ${FIX('#8a5a34','# stroke-width="4"')}/></g>`,
 teddy:()=>bg('#fdf3e0','#f3ddb7')
  +`<g transform="translate(800,450)">
   <circle cx="-210" cy="-240" r="66" ${FIX('#b98a5a')}/><circle cx="210" cy="-240" r="66" ${FIX('#b98a5a')}/>
   <circle cx="-330" cy="60" r="52" ${FIX('#b98a5a')}/><circle cx="330" cy="60" r="52" ${FIX('#b98a5a')}/>
   <ellipse cx="-240" cy="330" rx="70" ry="56" ${FIX('#b98a5a')}/><ellipse cx="240" cy="330" rx="70" ry="56" ${FIX('#b98a5a')}/>
   <ellipse rx="270" ry="250" ${FIX('#b98a5a')}/>
   <circle cx="-90" cy="-260" r="92" ${FIX('#c99b6e')}/><circle cx="90" cy="-260" r="92" ${FIX('#c99b6e')}/>
   <ellipse cx="0" cy="-180" rx="120" ry="100" ${FIX('#c99b6e')}/>
   <ellipse cx="0" cy="-216" rx="34" ry="26" ${FIX('#3a3350','# stroke-width="4"')}/><path d="M0,-198 v14 M0,-184 q-14,14 -28,4 M0,-184 q14,14 28,4" stroke="#3a3350" stroke-width="5" fill="none" stroke-linecap="round"/>
   <circle cx="-42" cy="-266" r="9" fill="#3a3350"/><circle cx="42" cy="-266" r="9" fill="#3a3350"/>
   <path d="M-36,-296 q10,-12 22,-4 M36,-296 q-10,-12 -22,-4" stroke="#3a3350" stroke-width="5" fill="none"/>
  </g>`
  +`<g transform="translate(1390,180)"><ellipse cx="0" cy="60" rx="36" ry="60" ${FIX('#f5c531')}/><path d="M0,0 L0,-70 M-26,-52 L0,-64 L26,-52" stroke="#8a5a34" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="-6" rx="14" ry="22" ${FIX('#e04b3f','# stroke-width="4"')}/></g>`
  +`<ellipse cx="240" cy="200" rx="44" ry="56" ${FIX('#3fb8af','# stroke-width="4"')}/><path d="M226,156 h28" stroke="#e04b3f" stroke-width="8"/>`,
 penguin:()=>bg('#dff3ff','#bfe6f7')
  +`<g transform="translate(800,760)"><ellipse rx="260" ry="34" fill="#a5d8f2" stroke="#7db8d9" stroke-width="4"/></g>`
  +`<g transform="translate(800,450)"><ellipse rx="60" ry="74" ${FIX('#3f4a63')}/><ellipse cy="14" rx="40" ry="52" fill="#fff"/><circle cx="-18" cy="-18" r="6" fill="#2c2750"/><circle cx="18" cy="-18" r="6" fill="#2c2750"/><path d="M-8,-2 L8,-2 L0,10 Z" ${FIX('#f07f28','# stroke-width="3"')}/><path d="M-34,66 q-16,14 -20,32 M34,66 q16,14 20,32" stroke="#f07f28" stroke-width="8" stroke-linecap="round"/></g>`
  +star(300,200,0.7)+star(1300,240,0.6)+star(500,150,0.5)+star(1150,130,0.5)
  +`<path d="M180,680 q30,-40 60,0 q-30,40 -60,0" ${FIX('#8fbfe8','# stroke-width="4"')}/>`,
 railway:()=>bg('#e7f6ff','#d5efdb')
  +`<g transform="translate(170,430)"><rect x="-90" y="-30" width="180" height="90" rx="24" ${FIX('#4a9e4f')}/><rect x="-64" y="-88" width="90" height="70" rx="18" ${FIX('#4a9e4f')}/><circle cx="-40" cy="-64" r="12" fill="#fff"/><rect x="-110" y="46" width="220" height="16" rx="8" ${FIX('#3a3350','# stroke-width="4"')}/><circle cx="-56" cy="74" r="24" ${FIX('#3a3350','# stroke-width="4"')}/><circle cx="56" cy="74" r="24" ${FIX('#3a3350','# stroke-width="4"')}/><path d="M60,-88 q10,-30 44,-30" stroke="#3a3350" stroke-width="6" fill="none"/><circle cx="112" cy="-122" r="10" ${FIX('#e04b3f','# stroke-width="3"')}/></g>`
  +`<g transform="translate(1430,420)"><rect x="-90" y="-120" width="180" height="240" ${FIX('#f2b8c6')}/><path d="M-104,-120 L0,-210 L104,-120 Z" ${FIX('#e88aa4')}/><rect x="-32" y="-30" width="64" height="150" ${FIX('#8a5a34','# stroke-width="4"')}/><rect x="-62" y="-84" width="40" height="40" fill="#fff"/><rect x="24" y="-84" width="40" height="40" fill="#fff"/><circle cx="0" cy="-160" r="16" fill="#fff"/></g>`
  +flower(500,800,'#f5c531')+flower(1100,810,'#f28ab5'),
 tent:()=>bg('#dff3e3','#c2e6c9')
  +`<path d="M80,180 l16,-40 l14,40 Z" ${FIX('#3d7fc4','# stroke-width="4"')}/><path d="M1460,220 l14,-36 l12,36 Z" ${FIX('#3d7fc4','# stroke-width="4"')}/>`
  +`<g transform="translate(1480,600)"><circle r="34" ${FIX('#f07f28')}/><circle cx="-10" cy="-6" r="5" fill="#3a3350"/><circle cx="12" cy="-6" r="5" fill="#3a3350"/><path d="M-10,12 q12,10 24,0" stroke="#3a3350" stroke-width="4" fill="none"/><path d="M-24,-28 q-16,-20 0,-38 M24,-28 q16,-20 0,-38" stroke="#a9744f" stroke-width="6" fill="none" stroke-linecap="round"/></g>`
  +`<g transform="translate(120,660)"><path d="M-40,0 a40,40 0 0 1 80,0 Z" ${FIX('#e04b3f','# stroke-width="4"')}/><rect x="-8" y="-20" width="16" height="20" fill="#8a5a34"/></g>`,
 duckling:()=>bg('#e7f6ff','#cfe9f7')
  +`<path d="M180,700 h320 M1100,700 h320" stroke="#8a5a34" stroke-width="12" stroke-linecap="round"/>`
  +`<g transform="translate(120,560)"><ellipse rx="40" ry="30" ${FIX('#f5c531')}/><circle cx="30" cy="-22" r="22" ${FIX('#f5c531')}/><path d="M48,-22 l24,6 l-24,6 Z" ${FIX('#f07f28','# stroke-width="3"')}/><circle cx="34" cy="-28" r="4" fill="#3a3350"/></g>`
  +`<g transform="translate(1480,540)"><ellipse rx="40" ry="30" ${FIX('#f5c531')}/><circle cx="-30" cy="-22" r="22" ${FIX('#f5c531')}/><path d="M-48,-22 l-24,6 l24,6 Z" ${FIX('#f07f28','# stroke-width="3"')}/><circle cx="-34" cy="-28" r="4" fill="#3a3350"/></g>`
  +`<g transform="translate(700,150)"><ellipse rx="44" ry="32" ${FIX('#f5c531')}/><circle cx="34" cy="-24" r="24" ${FIX('#f5c531')}/><path d="M54,-24 l26,7 l-26,7 Z" ${FIX('#f07f28','# stroke-width="3"')}/><circle cx="38" cy="-30" r="4" fill="#3a3350"/></g>`,
 robot:()=>bg('#fff9ec','#fdeecb')
  +`<g transform="translate(1420,450)"><rect x="-110" y="-90" width="220" height="180" rx="28" ${FIX('#5aa7d6')}/><rect x="-80" y="-58" width="160" height="90" rx="14" ${FIX('#bfe3f7','# stroke-width="4"')}/><circle cx="-40" cy="-16" r="12" fill="#3a3350"/><circle cx="40" cy="-16" r="12" fill="#3a3350"/><path d="M-20,10 h40" stroke="#3a3350" stroke-width="6" stroke-linecap="round"/><circle cx="0" cy="-120" r="16" ${FIX('#e04b3f','# stroke-width="4"')}/><path d="M0,-136 v-30" stroke="#3a3350" stroke-width="6"/><rect x="-140" y="-40" width="26" height="80" rx="12" ${FIX('#8fbfe8','# stroke-width="4"')}/><rect x="114" y="-40" width="26" height="80" rx="12" ${FIX('#8fbfe8','# stroke-width="4"')}/></g>`
  +`<g transform="translate(300,240)"><rect x="-40" y="-60" width="80" height="120" rx="14" ${FIX('#f5c531')}/><rect x="-26" y="-44" width="52" height="34" rx="6" fill="#fff"/><path d="M0,60 v26 M-26,86 h52" stroke="#3a3350" stroke-width="6"/></g>`
  +`<g transform="translate(300,620)"><rect x="-40" y="-60" width="80" height="120" rx="14" ${FIX('#4a9e4f')}/><rect x="-26" y="-44" width="52" height="34" rx="6" fill="#fff"/><path d="M0,60 v26 M-26,86 h52" stroke="#3a3350" stroke-width="6"/></g>`
  +`<circle cx="140" cy="780" r="18" ${FIX('#f07f28','# stroke-width="4"')}/><circle cx="200" cy="800" r="14" ${FIX('#8f4fc0','# stroke-width="4"')}/>`,
 mirror:()=>bg('#eafaf0','#d2ecd8')
  +`<g transform="translate(800,470)"><ellipse rx="34" ry="120" ${FIX('#f5c531')}/><circle cy="-150" r="44" ${FIX('#f5c531')}/><circle cx="-12" cy="-156" r="6" fill="#3a3350"/><circle cx="12" cy="-156" r="6" fill="#3a3350"/><path d="M-8,-136 q8,8 16,0" stroke="#3a3350" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-14,-192 q-10,-22 -28,-26 M14,-192 q10,-22 28,-26" stroke="#3a3350" stroke-width="4" fill="none" stroke-linecap="round"/></g>`
  +`<g transform="translate(560,380)">
   <path d="M0,-60 C-100,-130 -240,-140 -280,-70 C-315,-5 -250,60 -175,60 C-215,95 -185,160 -110,152 C-40,145 10,70 0,10 Z" ${FIX('#f28ab5','# stroke-width="5"')}/>
   <circle cx="-150" cy="-40" r="40" ${FIX('#f5c531','# stroke-width="4"')}/>
   <path d="M-120,80 q40,20 76,4" stroke="#8f4fc0" stroke-width="10" fill="none" stroke-linecap="round"/>
  </g>`
  +flower(200,760,'#f5c531')+flower(1420,760,'#f28ab5')+flower(1480,240,'#8fbfe8'),
 sheep:()=>bg('#fdf9ef','#f0e4c4')
  +`<g transform="translate(800,470)">
   <ellipse cx="-180" cy="200" rx="40" ry="26" ${FIX('#3a3350','# stroke-width="4"')}/><ellipse cx="180" cy="200" rx="40" ry="26" ${FIX('#3a3350','# stroke-width="4"')}/>
   <circle cx="-300" cy="-60" r="80" ${FIX('#3f4a63')}/>
   <circle cx="-330" cy="-96" r="34" ${FIX('#3f4a63')}/><circle cx="-312" cy="-104" r="5" fill="#fff"/><circle cx="-336" cy="-110" r="5" fill="#fff"/>
   <ellipse cx="-252" cy="-52" rx="24" ry="18" ${FIX('#3f4a63','# stroke-width="4"')}/><circle cx="-266" cy="-66" r="5" fill="#fff"/>
  </g>`
  +`<g transform="translate(240,140)"><rect x="-60" y="-40" width="120" height="90" ${FIX('#e04b3f')}/><path d="M-70,-40 L0,-100 L70,-40 Z" ${FIX('#b98a5a','# stroke-width="4"')}/><rect x="-14" y="0" width="28" height="50" fill="#fff7ea"/></g>`
  +flower(1480,180,'#f28ab5')+flower(1460,780,'#f5c531'),
 giraffe:()=>bg('#fdf9ef','#f0e4c4')
  +`<g transform="translate(800,240)">
   <path d="M-60,120 C-80,20 -60,-60 -20,-110 L-40,-190 M-44,-196 l-8,-40 l30,26 Z M4,-198 l14,-38 l6,42 Z" ${FIX('#f5c531','# stroke-width="5"')}/>
   <circle cx="-8" cy="-120" r="52" ${FIX('#f5c531')}/>
   <circle cx="-26" cy="-132" r="7" fill="#3a3350"/><circle cx="12" cy="-132" r="7" fill="#3a3350"/>
   <ellipse cx="-6" cy="-104" rx="18" ry="12" ${FIX('#a9744f','# stroke-width="3"')}/>
   <circle cx="-30" cy="-160" r="9" ${FIX('#a9744f','# stroke-width="3"')}/><circle cx="16" cy="-164" r="9" ${FIX('#a9744f','# stroke-width="3"')}/>
   <path d="M-60,120 h120 M-56,180 h112 M-48,240 h96" stroke="#a9744f" stroke-width="8"/>
  </g>`
  +flower(200,780,'#f28ab5')+flower(1420,780,'#8fbfe8')+star(260,180,0.6)+star(1380,160,0.6),
 bricks:()=>bg('#fdf3e0','#f3ddb7')
  +`<rect x="240" y="180" width="1120" height="560" ${FIX('#f2b8c6')}/>
   ${[0,1,2].map(r=>[0,1,2,3].map(c=>`<rect x="${280+c*280+(r%2?140:0)}" y="${220+r*180}" width="220" height="110" rx="10" fill="#e8a0b4" stroke="#3a3350" stroke-width="4"/>`).join('')).join('')}`
  +`<g transform="translate(150,120)"><path d="M0,140 v-100 a40,40 0 0 1 40,-40 h30 a40,40 0 0 1 40,40 v100 Z" ${FIX('#f5c531')}/><circle cx="36" cy="-60" r="22" ${FIX('#e8b88a','# stroke-width="3"')}/><circle cx="30" cy="-64" r="3.4" fill="#3a3350"/><circle cx="44" cy="-64" r="3.4" fill="#3a3350"/></g>`
  +`<g transform="translate(1450,120)"><rect x="-34" y="-40" width="68" height="140" rx="16" ${FIX('#8fbfe8')}/><circle cx="0" cy="-16" r="12" fill="#fff"/><rect x="-26" y="14" width="52" height="10" rx="5" fill="#fff"/></g>`,
 squirrel:()=>bg('#f3ecdf','#e6d9c2')
  +`<g transform="translate(200,560)">
   <ellipse rx="110" ry="90" ${FIX('#c98d5a')}/>
   <circle cx="70" cy="-80" r="54" ${FIX('#c98d5a')}/>
   <circle cx="88" cy="-92" r="7" fill="#3a3350"/><path d="M64,-104 q8,-10 18,-6" stroke="#3a3350" stroke-width="4" fill="none"/>
   <path d="M110,-60 C180,-80 210,-20 180,40 C160,80 120,80 100,50" ${FIX('#c98d5a','# stroke-width="4"')}/>
   <ellipse cx="-20" cy="30" rx="40" ry="52" ${FIX('#e8b88a','# stroke-width="4"')}/>
  </g>`
  +`<g transform="translate(100,180)"><path d="M0,80 C-80,40 -100,-60 -40,-110 C-10,-136 30,-130 50,-100 C90,-40 70,40 0,80 Z" ${FIX('#4a9e4f')}/><circle cx="-14" cy="-40" r="10" fill="#3a3350" opacity="0.3"/></g>`
  +`<path d="M1480,140 l10,22 l24,2 l-18,16 l6,24 l-22,-12 l-22,12 l6,-24 l-18,-16 l24,-2 Z" ${FIX('#f07f28','# stroke-width="3"')}/>`,
 pinwheel:()=>bg('#e7f6ff','#cfe9f7')
  +`<path d="M800,660 L800,860" stroke="#3a3350" stroke-width="10" stroke-linecap="round"/>`
  +`<path d="M760,180 q30,-30 60,0 q30,30 0,50 q-30,-20 -60,-50" ${FIX('#4a9e4f','# stroke-width="4"')}/>`
  +`<circle cx="300" cy="200" r="40" ${FIX('#f5c531','# opacity="0.5" opacity="0.5"')}/>`,
 crab:()=>bg('#dff3ff','#bfe6f7')
  +`<g transform="translate(800,620)">
   <ellipse rx="190" ry="120" ${FIX('#e04b3f')}/>
   <path d="M-120,-90 q-40,-60 -90,-60 M120,-90 q40,-60 90,-60" ${FIX('#e04b3f','# stroke-width="4"')}/>
   <circle cx="-50" cy="-30" r="14" fill="#fff"/><circle cx="50" cy="-30" r="14" fill="#fff"/>
   <circle cx="-50" cy="-26" r="7" fill="#3a3350"/><circle cx="50" cy="-26" r="7" fill="#3a3350"/>
   <path d="M-40,20 q40,30 80,0" stroke="#3a3350" stroke-width="6" fill="none" stroke-linecap="round"/>
   ${[-140,-70,0,70,140].map(x=>`<path d="M${x},110 q${x>0?18:-18},40 ${x>0?40:-40},60" stroke="#e04b3f" stroke-width="12" fill="none" stroke-linecap="round"/>`).join('')}
  </g>`
  +`<path d="M240,180 a40,44 0 1 1 4,60" ${FIX('#f28ab5','# stroke-width="4"')}/><path d="M1330,760 a36,40 0 1 0 -4,-54" ${FIX('#f5c531','# stroke-width="4"')}/>`,
 sun:()=>bg('#e7f6ff','#cfe9f7')
  +`<g transform="translate(800,430)"><circle r="160" ${FIX('#f5c531')}/><circle cx="-44" cy="-24" r="12" fill="#3a3350"/><circle cx="44" cy="-24" r="12" fill="#3a3350"/><path d="M-30,26 q30,24 60,0" stroke="#3a3350" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="-78" cy="14" r="14" ${FIX('#f28ab5','# stroke-width="3"')}/><circle cx="78" cy="14" r="14" ${FIX('#f28ab5','# stroke-width="3"')}/></g>`
  +cloud(200,720,0.9)+cloud(1400,730,0.9)
  +star(300,160,0.6)+star(1320,180,0.6)
};

/* ---------- board renderer ---------- */
const WALL_STROKE='#5aa7d6';
export function writingBoard(a){
 const scene=(SCENES[a.scene]||(()=>bg('#fff9ec','#fdeecb')))();
 const guides=(a.guides||[]).map((g,i)=>`<path class="wa-guide" data-wa-guide="${i}" d="${g.d}" fill="none" stroke="#9aa5b1" stroke-width="7" stroke-dasharray="16 14" stroke-linecap="round"/>
  <circle class="wa-start" cx="${g.sx}" cy="${g.sy}" r="15" fill="#4a9e4f" stroke="#fff" stroke-width="4" data-wa-start="${i}"/>
  <path class="wa-goal" d="M-4,-18 L16,0 L-4,18 L2,0 Z" transform="translate(${g.ex} ${g.ey})" fill="#f07f28" stroke="#fff" stroke-width="3" data-wa-goal="${i}" aria-hidden="true"></path>`).join('');
 const walls=(a.walls||[]).map(w=>`<line x1="${w[0]}" y1="${w[1]}" x2="${w[2]}" y2="${w[3]}" stroke="${WALL_STROKE}" stroke-width="20" stroke-linecap="round" data-wa-wall/>`).join('');
 const dots=(a.dots||[]).map((p,i)=>`<g class="wa-dot" data-wa-dot="${i}" transform="translate(${p.x} ${p.y})" role="button" tabindex="0" aria-label="Dot ${i+1}"><circle r="30" fill="${['#e04b3f','#f07f28','#f5c531','#4a9e4f','#3fb8af','#5aa7d6','#8f4fc0','#f28ab5','#e0568c','#3d7fc4'][i%10]}" stroke="#fff" stroke-width="5"/><text y="11" text-anchor="middle" font-size="30" font-weight="700" fill="#fff" font-family="inherit">${i+1}</text></g>`).join('');
 return `<svg class="wa-svg" viewBox="0 0 1600 900" data-wa-svg aria-label="Tracing board: ${esc(a.title)}">${scene}
  <g data-wa-walls>${walls}</g>
  <g data-wa-guides>${guides}</g>
  <g data-wa-dots>${dots}</g>
  <g data-wa-ink aria-hidden="true"></g>
 </svg>`;
}

/* ---------- library + game pages ---------- */
const WLIB_PATH='/preschool/writing/adventures/';
const WCLASS_PATH='/preschool/4-years/early-writing-and-pencil-control/';

export const WRITING_LIB_PATH=WLIB_PATH;
export const WRITING_CLASS_PATH=WCLASS_PATH;

export function writingLibraryBody(){
 const groupIntro=['Six friendly roads to trace — winding, looping, waving, zigzagging, spiralling and arching over the rainbow.','Straight lines with a purpose — build a spider web, solve a maze, connect dots and march through the safari.','Connect the points, trace the bones, sew the patch and skate the eight — careful, meaningful lines.','Shape drawing proper — arches, right angles, mirror wings, woolly humps, circles, rectangles, ovals, triangles and C-curves.','The grand finale — creative stroke practice that pulls every skill together under the sun.'];
 return `${crumbNav([['Preschool','/preschool/'],['Writing Adventures']])}
 ${heading('WRITING ADVENTURES','Thirty pencil-control games, played with a finger or a stylus.','Real on-screen tracing: winding paths, loops, waves, zigzags, spirals, mazes, dot-to-dots and shape outlines — each with its own goal, gentle feedback and a worksheet to print. Works with touch, Apple Pencil, stylus, mouse and trackpad.')}
 <div class="lesson-start"><a class="button" href="${WCLASS_PATH}">This way to Class 27 <span aria-hidden="true">→</span></a><span class="lesson-start-hint">The class that goes with these adventures: Early Writing &amp; Pencil Control.</span></div>
 <section class="wrap section compact" data-wa-lib aria-label="All writing adventures">
  ${GROUP_NAMES.map((name,gi)=>{
   const items=writingAdventures.filter(a=>a.group===gi);
   return `<h2 class="sa-group-title">${gi+1}. ${name}</h2><p class="sa-group-blurb">${groupIntro[gi]}</p>
   <div class="sa-grid">${items.map(a=>`<a class="sa-card" href="${WLIB_PATH}${a.slug}/" data-wa-libcard="${a.slug}">
    <span class="sa-card-num" aria-hidden="true">${a.num}</span>
    <span class="sa-card-done" data-wa-done hidden>Cleared!</span>
    <img src="${WRITING_BASE}${a.img}" width="800" height="568" alt="${esc(a.alt)}" loading="lazy">
    <span class="sa-card-body"><strong>${esc(a.title)}</strong><span class="sa-card-tag">${esc(a.tag)}</span><span class="sa-card-skill">${esc(a.skill)}</span></span>
    <span class="sa-card-play">Play <span aria-hidden="true">→</span></span>
   </a>`).join('')}</div>`;
  }).join('')}
  <p class="lesson-note">Every card opens one real tracing game. Progress — opened, completed and when — is saved on this device for the child chosen in <a href="/my-classroom/">My Classroom</a>.</p>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>How the drawing works.</h2>
  <p class="lesson-copy">Each adventure shows its own aligned tracing board: a clearly visible dashed guide with a green start dot and an orange finish arrow, drawn in a fixed 1600×900 coordinate system so the child's stroke and the guide can never drift apart on any screen size or rotation. The engine asks for generous coverage of the guide — never pixel-perfection — and a completed guide turns into the child's own pencil color, stroke by stroke.</p>
  <p class="lesson-copy">Alongside the tracing games there is a real maze with walls that stop sneaky shortcuts, two dot-to-dot puzzles that teach ordered connecting, and a mirror activity that asks the right wing to match the left. Every page has Undo, Redo, a stroke eraser, Clear and five pencil colors; every page downloads a blank worksheet for away-from-screen practice and a copy of the child's own drawing.</p>
  <p class="lesson-copy">The collection belongs to <a href="${WCLASS_PATH}">Class 27 — Early Writing &amp; Pencil Control</a> on the Age 4 path, beside <a href="${SHAPE_LIB_PATH}">Shape Adventures</a> and <a href="${CLIB_PATH}">Colors &amp; Creativity</a>.</p>
 </section>`;
}

export function writingPageBody(a){
 const prev=writingAdventures[(a.num-2+30)%30];
 const next=writingAdventures[a.num%30];
 const engineKind=a.engine;
 const tolAttr=` data-wa-tol="${a.tol||50}"`;
 const guidesAttr=a.guides?` data-wa-guides-data='${esc(JSON.stringify(a.guides.map(g=>({d:g.d,sx:g.sx,sy:g.sy,ex:g.ex,ey:g.ey}))))}'`:'';
 const wallsAttr=a.walls?` data-wa-walls-data='${esc(JSON.stringify(a.walls))}'`:'';
 const dotsAttr=a.dots?` data-wa-dots-data='${esc(JSON.stringify(a.dots))}'`:'';
 const board=`<section class="wrap lesson-section" id="play" aria-label="Play ${esc(a.title)}">
  <span class="eyebrow">PLAY · ${esc(a.skill).toUpperCase()}</span>
  <h2>${esc(a.title)}</h2>
  <p class="lesson-copy">${esc(a.say)}</p>
  <div class="wa-board" data-wa-board data-wa-game="${a.slug}" data-wa-engine="${engineKind}" data-wa-art="${WRITING_BASE}${a.img}"${tolAttr}${guidesAttr}${wallsAttr}${dotsAttr}>
   <div class="sa-controls"><p class="sa-status" data-sa-status aria-live="polite"></p><div class="sa-controlbtns"><button type="button" class="button button-ghost" data-wa-again hidden>Try again</button></div></div>
   ${writingBoard(a)}
   <div class="wa-tools" data-wa-tools>
    <div class="cc-palette" role="group" aria-label="Pencil colors">
     <button type="button" class="cc-color" data-wa-color="#3a3350" aria-label="The graphite pencil" style="--pc:#3a3350" aria-pressed="true"></button>
     <button type="button" class="cc-color" data-wa-color="#e04b3f" aria-label="The red pencil" style="--pc:#e04b3f"></button>
     <button type="button" class="cc-color" data-wa-color="#5aa7d6" aria-label="The blue pencil" style="--pc:#5aa7d6"></button>
     <button type="button" class="cc-color" data-wa-color="#4a9e4f" aria-label="The green pencil" style="--pc:#4a9e4f"></button>
     <button type="button" class="cc-color" data-wa-color="#f07f28" aria-label="The orange pencil" style="--pc:#f07f28"></button>
    </div>
    <div class="cc-sizes" role="group" aria-label="Pencil size">
     <button type="button" class="cc-size" data-wa-size="10" aria-pressed="true" aria-label="Thin pencil"><span></span></button>
     <button type="button" class="cc-size" data-wa-size="18" aria-pressed="false" aria-label="Thick pencil"><span></span></button>
    </div>
    <div class="cc-toolbtns">
     <button type="button" class="button button-ghost" data-wa-undo>Undo</button>
     <button type="button" class="button button-ghost" data-wa-redo>Redo</button>
     <button type="button" class="button button-ghost" data-wa-eraser aria-pressed="false">Eraser</button>
     <button type="button" class="button button-ghost" data-wa-clear>Clear</button>
     <button type="button" class="button button-ghost" data-wa-big aria-pressed="false">Bigger board</button>
    </div>
   </div>
   <p class="cc-save-row">
    <button type="button" class="button" data-wa-worksheet>Download worksheet</button>
    <button type="button" class="button button-ghost" data-wa-mydrawing>Download my drawing</button>
    <span class="cc-save-note" data-wa-note aria-live="polite"></span>
   </p>
   <div class="sa-cheer" data-wa-cheer hidden><p class="sa-cheer-title">${a.doneTitle}</p><p class="sa-cheer-sub">${a.doneSub}</p></div>
  </div>
  <p class="sa-progress-note" data-wa-progress aria-live="polite"></p>
  <noscript><p class="sa-noscript">On-screen tracing needs JavaScript. The guides, start dots and finish arrows above are ready for paper practice — and the worksheet button downloads with JavaScript turned on.</p></noscript>
 </section>`;
 return `${crumbNav([['Preschool','/preschool/'],['Writing Adventures',WLIB_PATH],[`${a.num}. ${a.title}`]])}
 <article class="wrap lesson-hero sa-hero">
  <div class="sa-hero-art"><img src="${WRITING_BASE}${a.img}" width="800" height="568" alt="${esc(a.alt)}" fetchpriority="high"></div>
  <div class="lesson-hero-copy">
   <span class="eyebrow">WRITING ADVENTURE ${a.num} OF 30 · ${GROUP_NAMES[a.group].toUpperCase()}</span>
   <h1>${esc(a.h1)}</h1>
   <div class="fc-chips lesson-chips"><span><strong>Age</strong> 4 Years</span><span><strong>Class</strong> 27 · Writing</span><span><strong>Skill</strong> ${esc(a.skill)}</span></div>
   <p class="lesson-lede">${esc(a.tag)}</p>
   <div class="lesson-start"><a class="button" href="#play">Start tracing <span aria-hidden="true">↓</span></a><a class="button button-ghost" href="/worksheets/writing/${a.slug}/">Print the worksheet <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Finger, stylus or mouse. Undo and Clear are always one tap away.</span></div>
  </div>
 </article>
 ${board}
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>Why this adventure helps.</h2>
  <p class="lesson-copy">${esc(a.parentNote||('This game builds '+a.skill.toLowerCase()+' — one of the foundation strokes behind handwriting. Tracing a clear path with a finger or a stylus teaches speed, rhythm and control long before pencils arrive on paper, and the generous engine means an honest attempt is always celebrated. Watch for the moment the whole arm starts doing the work instead of the wrist — that is the real milestone.'))}</p>
  <p class="lesson-copy">The worksheet button prints the original artwork with its tracing guides, a title and the instruction — perfect for a kitchen-table session. The my-drawing button saves exactly what your child drew on screen. Short, happy sessions of two or three adventures beat one long push, every time.</p>
 </section>
 <nav class="wrap lesson-section sa-prevnext" aria-label="More writing adventures">
  <a class="sa-navcard" href="${WLIB_PATH}${prev.slug}/"><span class="eyebrow">Previous</span><strong>${esc(prev.title)}</strong></a>
  <a class="sa-navcard" href="${WLIB_PATH}"><span class="eyebrow">All adventures</span><strong>Writing Adventures Library</strong></a>
  <a class="sa-navcard" href="${WLIB_PATH}${next.slug}/"><span class="eyebrow">Next</span><strong>${esc(next.title)}</strong></a>
 </nav>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP GOING</span><h2>Where next?</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${WCLASS_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class 27</span></div><h3>Early Writing &amp; Pencil Control</h3><p>The class behind these adventures — with the full adventure map, off-screen pencil play and parent guidance.</p><span class="fc-open">Open Class 27 <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="${SHAPE_LIB_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class 25</span></div><h3>Shape Adventures</h3><p>Spaceships, monsters, patterns and a shape detective — eighteen games of matching and sorting.</p><span class="fc-open">Open the Shapes Library <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="${CLIB_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class 26</span></div><h3>Colors &amp; Creativity</h3><p>Paint, mix real colors and decorate — eighteen studio activities next door.</p><span class="fc-open">Open the Colors Library <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}
