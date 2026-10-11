// Kiddo School — Early Writing & Pencil Control (Class 27).
// Thirty draw-on-the-picture adventures at
// /preschool/writing/adventures/{slug}/, built on the owner's thirty Canva
// illustrations (all verified on R2 under school/writing/adventures/).
// The owner's spec, followed exactly: the original Canva artwork sits on
// the LEFT with the transparent Write & Color drawing layer laid directly
// over it (aligned 1:1 at every screen size), and plain TEXT instructions
// plus the drawing tools sit on the RIGHT. No coded scenes, no sound, no
// scoring, no fake games. Completion counts only when the child's own
// work is really saved, and progress keeps the same localStorage bands
// the site has always used, so nothing already earned is lost.
import {R2,crumbNav,heading,esc} from './adventure-kit.mjs';
import {imageActivitySection} from './image-activity.mjs';
import {artFor} from './adventure-dims.mjs';
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
 say: 'Connect the dots from 1 to 10 — say each number out loud as you draw the line from dot to dot!',
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
 say: 'Stitch the teddy together from dot 1 to dot 12 — draw each line in order, twelve careful stitches!',
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
  <p class="lesson-copy">Each adventure shows the owner's original illustration with a transparent drawing layer laid right over it. The layer is aligned to the artwork's true pixel size, so a stroke lands exactly under the finger, the stylus or the mouse on every screen size and rotation — and because the picture itself is the activity, nothing on the page pretends to be a game.</p>
  <p class="lesson-copy">Every page carries the same honest pencil case: nine crayons, an eraser, Undo, Redo and Clear, plus Save — and a child's adventure counts as cleared only when their finished picture is really saved. The worksheet twin still prints the same picture for away-from-screen practice.</p>
  <p class="lesson-copy">The collection belongs to <a href="${WCLASS_PATH}">Class 27 — Early Writing &amp; Pencil Control</a> on the Age 4 path, beside <a href="${SHAPE_LIB_PATH}">Shape Adventures</a> and <a href="${CLIB_PATH}">Colors &amp; Creativity</a>.</p>
 </section>`;
}

export function writingPageBody(a){
 const prev=writingAdventures[(a.num-2+30)%30];
 const next=writingAdventures[a.num%30];
 const art=artFor('writing/'+a.slug,WRITING_BASE+a.img);
 const board=imageActivitySection({band:'writing',slug:a.slug,title:a.title,skill:a.skill,
  say:a.say,hint:a.hint,doneTitle:a.doneTitle,alt:a.alt,
  imgUrl:WRITING_BASE+a.img,w:art.w,h:art.h,
  wsPath:'/worksheets/writing/'+a.slug+'/'});
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
