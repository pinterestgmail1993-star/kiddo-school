// Kiddo School — Class 30 · Logic, Thinking & Problem-Solving (ages 4–5).
// Thirty real, playable logic games at
// /preschool/logic/adventures/{slug}/, built on the owner's Canva
// illustrations (all 30 verified on R2 under school/logic/adventures/ —
// the fox artwork ships under 'foxes-…' filenames, audited and mapped).
// Games play the REAL artwork: patterns, odd-one-outs, shadow matches, size
// orders, clue hunts, secret codes, routes and one fully traceable maze.
// Where the artwork repeats one answer position, the game reshuffles the
// cards so the skill — not the position — is what gets practised.
import {crumbNav,esc} from './adventure-kit.mjs';
import {LOGIC_BASE,LOGIC_LIB,C30_PATH,WS30_PATH,board} from './story-kit.mjs';
export {LOGIC_LIB_PATH,WS30_PATH,C30_PATH} from './story-kit.mjs';
const LOGIC_LIB_PATH=LOGIC_LIB;

const W=1748,H=1240;

export const LOGIC_TOTAL=30;
export const LOGIC_READY=30;
export const LOGIC_PENDING=[];

/* the traceable acorn maze: 7x5 cells, walls hand-set, solvable (BFS-verified
   in tests). Start at the squirrel (top-left), finish at the golden acorn. */
const MAZE={cols:7,rows:5,cell:120,start:[0,2],goal:[6,2],alt:'A seven-by-five ice maze. Draw a path from the squirrel at the left to the golden acorn at the right.',
 walls:[
  // outer ring with opening at start (W of 0,2) and goal (E of 6,2)
  [0,0,'N'],[1,0,'N'],[2,0,'N'],[3,0,'N'],[4,0,'N'],[5,0,'N'],[6,0,'N'],
  [0,4,'S'],[1,4,'S'],[2,4,'S'],[3,4,'S'],[4,4,'S'],[5,4,'S'],[6,4,'S'],
  [0,0,'W'],[0,1,'W'],[0,3,'W'],[0,4,'W'],
  [6,0,'E'],[6,1,'E'],[6,3,'E'],[6,4,'E'],
  // inner walls (hand-designed, one true route + dead ends)
  [1,0,'S'],[3,0,'S'],[5,0,'S'],
  [2,1,'E'],[4,1,'E'],
  [0,2,'S'],[2,2,'S'],[4,2,'S'],
  [1,3,'E'],[3,3,'E'],[5,3,'E'],
  [0,3,'N'],[2,3,'N'],[4,3,'N'],
  [6,1,'W'],[6,3,'W']
 ]};

const G=o=>o;
export const logicAdventures=[
G({num:1,slug:'foxs-spot-the-difference',img:'01-foxes-spot-the-difference.webp',title:'Fox\u2019s Spot the Difference',skill:'Spot the difference',
 tag:'Two picnic pictures, five sneaky changes — tap every difference you can spot.',
 say:'Fox and Rabbit are having a picnic in both pictures, but five things are different! Look closely and tap each difference on Picture 2.',
 hint:'Look closely — tap what is different!',doneTitle:'All 5 differences found!',doneSub:'Hat, butterfly, snack, apple and mushroom — sharp eyes, detective!',
 alt:'Two picnic scenes side by side: Fox in a cap with a magnifying glass and Rabbit on a blanket. Five differences hide between them: the cap colour, the butterfly colour, the carrot versus a flower, the apple colour and one mushroom spot.',
 artNote:'The printed art asks for 5 differences and truly contains exactly 5: the cap is blue then red, the butterfly yellow then pink, Rabbit holds a carrot then a flower, the apple is red then green, and one mushroom spot turns pink. The pink spot is the sneakiest — celebrate it loudest.',
 parentNote:'Spot-the-difference trains visual discrimination — the same eye-for-detail that later tells b from d on a page. Let your child point before tapping, and compare pictures aloud together: “In this one the hat is…?”',
 steps:[{type:'find',ask:'Five things are different in Picture 2. Tap every one you find!',
  scenes:[[2.5,21,49.5,94],[51,21,98,94]],
  hots:[
   {c:[30,18,51,38],say:'The hat changed from blue to red!'},
   {c:[54,5,78,24],say:'The butterfly changed from yellow to pink!'},
   {c:[59,48,80,72],say:'Rabbit holds a carrot in one picture and a flower in the other!'},
   {c:[45,74,62,92],say:'The apple changed from red to green!'},
   {c:[1,52,24,82],say:'The sneakiest one — a mushroom spot turned pink!'}
  ]}]}),
G({num:2,slug:'robots-rainbow-logic',img:'02-robots-rainbow-logic.webp',title:'Robot\u2019s Rainbow Logic',skill:'Pattern completion',
 tag:'Red, blue, red, blue\u2026 what comes next? Finish three of Robot\u2019s picture patterns.',
 say:'Look at each pattern and tap what comes next!',
 hint:'The pattern continues!',doneTitle:'Pattern pro!',doneSub:'Three patterns finished \u2014 Robot is dazzled.',
 alt:'The robot beside three pattern rows: red and blue circles, yellow stars and green hearts, small and big robots, each with three choice cards.',
 parentNote:'Pattern rows teach the reading-readiness skill of predicting what comes next. Say the pattern aloud together \u2014 "red, blue, red, blue\u2026" \u2014 and let the rhythm point to the answer.',
 steps:[
  {type:'ask',ask:'Red circle, blue circle, red circle, blue circle\u2026 what comes next?',ctx:[17,25,52,42],ctxLabel:'The pattern: red circle, blue circle, red circle, blue circle, question mark',
   cards:[{label:'A red circle',crop:[52.75,23.87,63.22,40.16],ok:true,say:'Red circle \u2014 the pattern goes on!'},
          {label:'A yellow star',crop:[62.76,23.71,73.17,42.82],ok:false,say:'No star in this pattern.'},
          {label:'A green triangle',crop:[72.77,23.71,83.18,42.02],ok:false,say:'Triangles aren\u2019t in this pattern.'}]},
  {type:'ask',ask:'Yellow star, green heart, yellow star, green heart\u2026 what comes next?',ctx:[17,44.5,52,61.5],ctxLabel:'The pattern: yellow star, green heart, yellow star, green heart, question mark',
   cards:[{label:'A blue square',crop:[52.75,43.23,63.22,62.9],ok:false,say:'No square in this pattern.'},
          {label:'A yellow star',crop:[62.76,43.06,73.17,62.9],ok:true,say:'Yellow star \u2014 the pattern repeats!'},
          {label:'A pink circle',crop:[72.77,43.55,83.18,62.9],ok:false,say:'No circle in this pattern.'}]},
  {type:'ask',ask:'Small robot, big robot, small robot, big robot\u2026 what comes next?',ctx:[17,63,52,80.5],ctxLabel:'The pattern: small robot, big robot, small robot, big robot, question mark',
   cards:[{label:'A big robot',crop:[52.75,62.02,63.22,81.85],ok:false,say:'A big robot just went \u2014 who follows it?'},
          {label:'A small robot',crop:[62.76,62.02,73.17,81.85],ok:true,say:'Small robot \u2014 the pattern keeps dancing!'},
          {label:'A red apple',crop:[72.77,62.02,83.18,81.85],ok:false,say:'An apple? The robot would like that, but no!'}]}]}),
G({num:3,slug:'lions-shadow-safari',img:'03-lions-shadow-safari.webp',title:'Lion\u2019s Shadow Safari',skill:'Shadow matching',
 tag:'A giraffe, an elephant, a crocodile \u2014 match every animal to its shadow on the safari.',
 say:'Match each animal to its shadow. Tap the animal, then the shadow.',
 hint:'A perfect shadow match!',doneTitle:'Safari complete!',doneSub:'Giraffe, elephant and crocodile all found their shadows.',
 alt:'A giraffe, an elephant and a crocodile beside three shadows labelled A, B and C.',
 steps:[{type:'match',ask:'Tap an animal, then tap its shadow.',
  cards:[{label:'The giraffe',crop:[12.59,18.15,32.32,57.02],group:'a',pair:'g',say:'The giraffe\u2019s long neck!'},
         {label:'The elephant',crop:[9.15,50.4,34.55,75],group:'a',pair:'e',say:'The elephant with big ears!'},
         {label:'The crocodile',crop:[6.81,71.77,36.04,96.13],group:'a',pair:'c',say:'The snappy crocodile!'},
         {label:'Shadow A \u2014 the crocodile\u2019s shadow',crop:[58.24,22.82,95.59,45.08],group:'b',pair:'c'},
         {label:'Shadow B \u2014 the giraffe\u2019s shadow',crop:[58.58,39.6,84.44,74.11],group:'b',pair:'g'},
         {label:'Shadow C \u2014 the elephant\u2019s shadow',crop:[58.58,68.23,88.04,96.45],group:'b',pair:'e'}]}]}),
G({num:4,slug:'squirrels-acorn-maze',img:'04-squirrels-acorn-maze.webp',title:'Squirrel\u2019s Acorn Maze',skill:'Maze tracing',
 tag:'Help Squirrel reach the golden acorn \u2014 draw a real path through the maze with your finger.',
 say:'Help Squirrel find the golden acorn! Draw a line through the maze \u2014 and stay on the path.',
 hint:'Good path-keeping!',doneTitle:'Acorn reached!',doneSub:'You drew the whole way through the maze. Steady hands!',
 alt:'A square maze with Squirrel at the start on the left and a golden acorn at the finish on the right.',
 parentNote:'Maze tracing builds planning and pencil control in one. Fingers work best to start; a stylus is a lovely bridge toward pencil-and-paper mazes. Hitting a wall just stops the line \u2014 no penalty, redraw any time.',
 maze:MAZE,steps:[]}),
G({num:5,slug:'bears-big-to-small-parade',img:'05-bears-big-to-small-parade.webp',title:'Bear\u2019s Big-to-Small Parade',skill:'Size ordering',
 tag:'Four bears, one parade \u2014 tap them from biggest to smallest so the parade can march.',
 say:'The bears march biggest to smallest! Tap the biggest bear first, then the next, until the littlest.',
 hint:'The parade is lining up!',doneTitle:'Parade ordered!',doneSub:'Biggest to smallest \u2014 what a tidy parade.',
 alt:'A parade leader bear and four teddy bears of different sizes, each with a number box below.',
 parentNote:'Comparing sizes across a whole set is harder than comparing two. Ask "which is the biggest one left?" each round \u2014 the words biggest and smallest do the teaching.',
 steps:[{type:'order',ask:'Tap the bears from biggest to smallest.',
  cards:[{label:'The small bear',crop:[16.59,38.15,29.35,77.82],seq:2,say:'Small bear marches third!'},
         {label:'The biggest bear',crop:[27.75,31.61,45.19,82.82],seq:0,say:'Biggest bear leads the parade!'},
         {label:'The tiny bear',crop:[43.25,46.13,53.72,80.81],seq:3,say:'Tiny bear finishes the line!'},
         {label:'The big bear',crop:[52.29,31.61,69.11,82.82],seq:1,say:'Big bear marches second!'}]}]}),
G({num:6,slug:'owls-memory-magic',img:'06-owls-memory-magic.webp',title:'Owl\u2019s Memory Magic',skill:'Spotting what\u2019s missing',
 tag:'Apple, star, car, leaf, cupcake \u2014 one flew away. Look closely and tap what is missing.',
 say:'The right panel copied the left one, but one thing is missing! Tap what disappeared.',
 hint:'You caught the missing one!',doneTitle:'Magic eye!',doneSub:'The blue toy car vanished \u2014 you spotted it.',
 alt:'Two panels: the first with an apple, star, blue car, leaf and cupcake; the copy with the car missing, and three choice cards below.',
 steps:[{type:'ask',ask:'Something is missing from the second panel. What is it?',ctx:[2,29,73.5,78],ctxLabel:'Two panels: the full set and the copy with one item missing',
  cards:[{label:'The blue toy car',crop:[12.64,76.77,23.51,97.02],ok:true,say:'The blue toy car is missing!'},
         {label:'The orange ball',crop:[31.5,79,44.5,97.5],ok:false,say:'The ball isn\u2019t in either panel \u2014 look for what vanished.'},
         {label:'The purple book',crop:[51.43,76.77,58.92,96.94],ok:false,say:'The book is new here too \u2014 compare the panels!'}]}]}),
G({num:7,slug:'bunnys-puzzle-blocks',img:'07-bunnys-puzzle-blocks.webp',title:'Bunny\u2019s Puzzle Blocks',skill:'Completing puzzles',
 tag:'A color grid, a shape pattern, a growing tower \u2014 tap the block that completes each puzzle.',
 say:'Three block puzzles! Tap the block that completes each one.',
 hint:'That completes it!',doneTitle:'All puzzles complete!',doneSub:'A green square, a yellow star, and the littlest blue block on top.',
 artNote:'The printed art gives each row its own rule (all-different colors; the star-heart pattern; a tower that shrinks). The game spells the rule out in every prompt so nothing stays a guess.',
 steps:[
  {type:'ask',ask:'Every square in the grid is a different color. Red, blue, yellow\u2026 which color is missing?',ctx:[16.5,27.5,31.5,48.5],ctxLabel:'The 2x2 grid: red, blue, yellow and one empty square',
   cards:[{label:'The green square',crop:[40.62,25.32,53.38,49.19],ok:true,say:'Green \u2014 now all four are different!'},
          {label:'The yellow square',crop:[53.6,28.06,66.36,49.19],ok:false,say:'Yellow is already in the grid.'},
          {label:'The red square',crop:[66.59,28.06,79.35,49.19],ok:false,say:'Red is already there too \u2014 pick the new color!'}]},
  {type:'ask',ask:'Star, heart, star, heart\u2026 what comes next?',ctx:[16.5,55.5,41.5,70],ctxLabel:'The pattern: star, heart, star, heart, question mark',
   cards:[{label:'A yellow star',crop:[47.88,54.27,56.01,71.13],ok:true,say:'Star \u2014 the pattern goes star, heart, star, heart!'},
          {label:'A blue circle',crop:[55.89,54.27,64.02,71.13],ok:false,say:'No circle in this pattern.'},
          {label:'A green triangle',crop:[63.9,54.27,72.03,71.13],ok:false,say:'No triangle in this pattern.'}]},
  {type:'ask',ask:'The tower gets smaller as it grows. Red base, yellow middle\u2026 which block sits on top?',ctx:[16.5,77,28,99.5],ctxLabel:'The block tower: big red base, yellow middle, empty top',
   cards:[{label:'The small blue cube',crop:[31.98,77.74,39.47,97.02],ok:true,say:'The littlest block goes on top!'},
          {label:'The yellow cube',crop:[39.93,77.74,47.48,97.02],ok:false,say:'Yellow is already on the tower.'},
          {label:'The big pink cube',crop:[47.83,84.52,57.09,97.02],ok:false,say:'Too big! Towers shrink as they grow.'}]}]}),
G({num:8,slug:'dinosaur-egg-detective',img:'08-dinosaur-egg-detective.webp',title:'Dinosaur Egg Detective',skill:'Odd one out',
 tag:'Five eggs match, one does not \u2014 tap the odd egg in every nest row.',
 say:'Five eggs match and one is different. Tap the egg that does not belong!',
 hint:'Odd egg found!',doneTitle:'Every odd egg found!',doneSub:'A red egg, a spotty green egg, and one very big egg.',
 alt:'Rows of blue spotted eggs with one red egg, green zigzag eggs with one dotted egg, and purple eggs with one giant egg.',
 parentNote:'The printed sheet always hides the odd egg last in its row, so the game deals the eggs out in mixed order \u2014 the detective work is comparing eggs, not remembering positions.',
 steps:[
  {type:'ask',ask:'Five blue eggs with yellow spots\u2026 one egg is different. Tap it!',shuffle:true,
   cards:[{label:'A blue egg with yellow spots',crop:[15.85,31.61,25.11,51.53],ok:false,say:'That egg matches the others.'},
          {label:'A blue egg with yellow spots',crop:[25.86,27.34,34.61,51.53],ok:false,say:'That one matches too.'},
          {label:'A blue egg with yellow spots',crop:[38.62,27.34,45.14,51.53],ok:false,say:'Still a match!'},
          {label:'A blue egg with yellow spots',crop:[45.82,28.06,55.09,51.53],ok:false,say:'Matchy matchy!'},
          {label:'A red egg with yellow spots',crop:[55.49,27.34,69.45,51.53],ok:true,say:'The red egg is the odd one!'}]},
  {type:'ask',ask:'Green eggs with zigzag stripes\u2026 one is different. Tap it!',shuffle:true,
   cards:[{label:'A green zigzag egg',crop:[15.85,51.77,25.11,79.68],ok:false,say:'Zigzags all the way.'},
          {label:'A green zigzag egg',crop:[25.86,51.77,35.13,79.68],ok:false,say:'Another matching egg.'},
          {label:'A green zigzag egg',crop:[39.13,51.77,45.14,79.68],ok:false,say:'Still matching!'},
          {label:'A green zigzag egg',crop:[45.82,51.77,55.09,79.68],ok:false,say:'Same zigzags.'},
          {label:'A green egg with polka dots',crop:[55.49,51.77,69.45,79.68],ok:true,say:'Dots instead of zigzags \u2014 odd egg!'}]},
  {type:'ask',ask:'Purple eggs with dark spots\u2026 one is different. Tap it!',shuffle:true,
   cards:[{label:'A small purple spotted egg',crop:[16.5,78,24.5,99.5],ok:false,say:'A regular-sized egg.'},
          {label:'A small purple spotted egg',crop:[25.86,75.65,34.5,92.42],ok:false,say:'Matches the row.'},
          {label:'A small purple spotted egg',crop:[36.5,78,44.5,99.5],ok:false,say:'Same size, same spots.'},
          {label:'A small purple spotted egg',crop:[45.82,76.29,55.09,92.02],ok:false,say:'Still a match!'},
          {label:'A giant purple spotted egg',crop:[55.09,75.65,74.83,92.42],ok:true,say:'That egg is HUGE \u2014 the odd one!'}]}]}),
G({num:9,slug:'penguins-ice-path',img:'09-penguins-ice-path.webp',title:'Penguin\u2019s Ice Path',skill:'Following a key',
 tag:'Circle, triangle, square \u2014 hop the ice floes in the key\u2019s order and reach the fish.',
 say:'Follow the key: blue circle, yellow triangle, red square. Tap the ice floes in that order!',
 hint:'Hopping the path!',doneTitle:'Fish reached!',doneSub:'Circle, triangle, square \u2014 Penguin hops to lunch.',
 alt:'A key showing blue circle, yellow triangle, red square, and six ice floes with shapes between Penguin at START and a fish at FINISH.',
 steps:[{type:'order',ask:'Tap the floes in the key\u2019s order: circle, triangle, square.',ctx:[17,23.5,56,41],ctxLabel:'The key: blue circle, then yellow triangle, then red square',
  cards:[{label:'The red square floe (top row)',crop:[58.58,42.66,71.34,64.92],seq:2,say:'Red square \u2014 the last hop before the fish!'},
         {label:'The yellow triangle floe (bottom row)',crop:[58.58,60.97,71.34,86.45],bad:true,say:'That\u2019s a triangle, but the key wants the yellow triangle \u2014 there are two triangles here!'},
         {label:'The blue circle floe (top row)',crop:[31.58,42.66,44.34,64.92],seq:0,say:'Blue circle first!'},
         {label:'The yellow triangle floe (top row)',crop:[45.08,42.66,57.84,64.92],seq:1,say:'Yellow triangle next!'},
         {label:'The red square floe (bottom row)',crop:[31.58,60.97,44.34,86.45],bad:true,say:'A red square \u2014 but the key\u2019s square is in the top row!'},
         {label:'The blue circle floe (bottom row)',crop:[45.08,60.97,57.84,86.45],bad:true,say:'A circle, but not the key\u2019s blue circle at the start of the path.'}]}]}),
G({num:10,slug:'monkeys-odd-one-out-market',img:'10-monkeys-odd-one-out-market.webp',title:'Monkey\u2019s Odd-One-Out Market',skill:'Odd one out',
 tag:'Three apples and a banana \u2014 at Monkey\u2019s market, tap the picture that is different.',
 say:'At Monkey\u2019s market, one thing in each box is different. Tap the odd one out!',
 hint:'Spotted it!',doneTitle:'Market inspected!',doneSub:'A banana among apples, a cupcake among carrots, a car among teddies.',
 alt:'Monkey beside three rows: apples with a banana, carrots with a cupcake, teddy bears with a red car.',
 parentNote:'The printed sheet puts the odd item third in every row, so the game shuffles the stalls \u2014 your child compares the items themselves.',
 steps:[
  {type:'ask',ask:'One of these fruits is not an apple. Tap it!',shuffle:true,
   cards:[{label:'A red apple',crop:[24.6,25.32,37.36,44.84],ok:false,say:'Apple!'},
          {label:'A red apple',crop:[37.59,26.29,50.34,44.84],ok:false,say:'Another apple.'},
          {label:'A yellow banana',crop:[50.11,26.21,62.3,44.84],ok:true,say:'The banana is the odd one!'},
          {label:'A red apple',crop:[61.61,30.65,74.37,44.84],ok:false,say:'Apple again \u2014 three of a kind!'}]},
  {type:'ask',ask:'One of these is not a carrot. Tap it!',shuffle:true,
   cards:[{label:'An orange carrot',crop:[24.6,48.39,37.36,68.71],ok:false,say:'Carrot!'},
          {label:'An orange carrot',crop:[37.59,49.27,50.34,68.79],ok:false,say:'Another carrot.'},
          {label:'An orange carrot',crop:[50.11,49.27,62.3,68.79],ok:false,say:'Crunchy carrot number three.'},
          {label:'A pink cupcake',crop:[61.61,49.27,74.37,68.79],ok:true,say:'The cupcake is the odd one!'}]},
  {type:'ask',ask:'One of these toys is not a teddy bear. Tap it!',shuffle:true,
   cards:[{label:'A teddy bear',crop:[28.43,71.29,37.36,93.63],ok:false,say:'Teddy!'},
          {label:'A teddy bear',crop:[37.59,71.29,50.34,92.42],ok:false,say:'Another teddy.'},
          {label:'A red toy car',crop:[50.11,71.29,62.3,92.42],ok:true,say:'The car is the odd one!'},
          {label:'A teddy bear',crop:[61.61,71.29,74.37,91.77],ok:false,say:'Teddy number three.'}]}]}),
G({num:11,slug:'elephants-size-sorting-circus',img:'11-elephants-size-sorting-circus.webp',title:'Elephant\u2019s Size Sorting Circus',skill:'Size matching',
 tag:'A mouse, a dog, an elephant \u2014 match every circus friend to the right-sized tent.',
 say:'Match each animal to the right-sized tent. Tap the animal, then the tent.',
 hint:'A perfect fit!',doneTitle:'The circus is sorted!',doneSub:'Mouse in the small tent, dog in the medium, elephant in the large.',
 alt:'A small mouse, a medium dog and a large elephant beside three tents labelled large, small and medium.',
 steps:[{type:'match',ask:'Tap an animal, then tap the tent that fits.',
  cards:[{label:'The small mouse',crop:[6.58,26.37,19.34,45.73],group:'a',pair:'small',say:'A little mouse needs a little tent!'},
         {label:'The medium dog',crop:[9.15,44.84,21.34,72.1],group:'a',pair:'medium',say:'A medium dog for a medium tent!'},
         {label:'The large elephant',crop:[10.81,66.61,27.63,97.58],group:'a',pair:'large',say:'A big elephant needs a big tent!'},
         {label:'The large tent',crop:[61.84,19.84,76.37,57.1],group:'b',pair:'large'},
         {label:'The small tent',crop:[60.5,54.5,76,71.5],group:'b',pair:'small'},
         {label:'The medium tent',crop:[64.19,68.87,76.37,96.77],group:'b',pair:'medium'}]}]}),
G({num:12,slug:'owls-secret-code',img:'12-owls-secret-code.webp',title:'Owl\u2019s Secret Code',skill:'Simple codes',
 tag:'Red star = 1, blue heart = 2, yellow sun = 3 \u2014 crack the code and finish every row.',
 say:'Use the picture code! Star means one, heart means two, sun means three. Tap the number that finishes each row.',
 hint:'Code cracked!',doneTitle:'Secret code cracked!',doneSub:'Star is 1, heart is 2, sun is 3 \u2014 you read the whole code.',
 alt:'Owl with a code key \u2014 red star equals one, blue heart equals two, yellow sun equals three \u2014 and three rows waiting for the right number.',
 parentNote:'Symbol-substitution is early abstract thinking: this picture stands for that number. Read the key aloud together, then let your child decode each row.',
 steps:[
  {type:'ask',ask:'The red star\u2026 which number does the code say?',ctx:[19.5,21.5,70,41],ctxLabel:'The code key: red star = 1, blue heart = 2, yellow sun = 3',
   cards:[{label:'Number 1',crop:[28.78,41.53,39.19,64.27],ok:true,say:'Red star means 1!'},
          {label:'Number 2',crop:[40.73,41.53,51.2,64.27],ok:false,say:'2 is the heart\u2019s number.'},
          {label:'Number 3',crop:[52.75,41.53,63.22,64.27],ok:false,say:'3 is the sun\u2019s number.'}]},
  {type:'ask',ask:'The blue heart\u2026 which number?',ctx:[19.5,21.5,70,41],ctxLabel:'The code key',
   cards:[{label:'Number 3',crop:[28.78,58.39,39.19,82.34],ok:false,say:'3 is the sun \u2014 the heart is another number.'},
          {label:'Number 2',crop:[40.73,58.39,51.2,82.34],ok:true,say:'Blue heart means 2!'},
          {label:'Number 1',crop:[52.75,58.39,63.22,82.34],ok:false,say:'1 is the star\u2019s number.'}]},
  {type:'ask',ask:'The yellow sun\u2026 which number?',ctx:[19.5,21.5,70,41],ctxLabel:'The code key',
   cards:[{label:'Number 2',crop:[28.78,76.05,39.19,97.5],ok:false,say:'2 is the heart \u2014 keep decoding!'},
          {label:'Number 1',crop:[40.73,76.05,51.2,97.5],ok:false,say:'1 is the star.'},
          {label:'Number 3',crop:[52.75,76.05,63.22,97.5],ok:true,say:'Yellow sun means 3!'}]}]}),
G({num:13,slug:'pandas-missing-puzzle',img:'13-pandas-missing-puzzle.webp',title:'Panda\u2019s Missing Puzzle',skill:'Missing pieces',
 tag:'A wing, a roof, a wheel \u2014 find the piece that completes each of Panda\u2019s pictures.',
 say:'Each picture is missing a piece! Tap the piece that completes it.',
 hint:'It fits!',doneTitle:'All puzzles complete!',doneSub:'A wing for the butterfly, a roof for the house, a wheel for the train.',
 alt:'A butterfly missing its right wing, a house missing its roof and a train missing a wheel, each with three piece choices.',
 artNote:'The Canva title reads "Panda\u2019s Mising Puzzle" \u2014 a missing S. The site always shows the corrected spelling; the artwork itself is reported for regeneration.',
 steps:[
  {type:'ask',ask:'The butterfly is missing a piece. Tap it!',ctx:[15.5,22.5,37.5,49.5],ctxLabel:'The butterfly with a dashed empty wing',
   cards:[{label:'The butterfly wing piece',crop:[36.84,22.74,46.11,50.65],ok:true,say:'A wing \u2014 now the butterfly can fly!'},
          {label:'A blue square',crop:[45.31,24.92,54.63,49.52],ok:false,say:'A square won\u2019t make a wing.'},
          {label:'A green leaf',crop:[53.78,23.79,64.19,49.52],ok:false,say:'Close \u2014 leaves are green, but wings are pink!'}]},
  {type:'ask',ask:'The house is missing a piece. Tap it!',ctx:[15,51,37.5,79],ctxLabel:'The house with a dashed empty roof',
   cards:[{label:'A wheel',crop:[36.78,50.56,46.62,80.32],ok:false,say:'Wheels go on trains and cars!'},
          {label:'The red roof',crop:[45.71,58.55,56.75,80.32],ok:true,say:'A roof over the house!'},
          {label:'A flower',crop:[55.72,50.65,66.7,79.6],ok:false,say:'Pretty \u2014 but roofs keep rain out!'}]},
  {type:'ask',ask:'The train is missing a piece. Tap it!',ctx:[15,79,37.5,100],ctxLabel:'The train with a dashed empty wheel',
   cards:[{label:'A yellow star',crop:[36.78,77.58,46.62,98.47],ok:false,say:'Stars are for the night sky!'},
          {label:'A purple triangle',crop:[45.71,79.68,56.75,98.47],ok:false,say:'Triangles can\u2019t roll.'},
          {label:'The round wheel',crop:[55.72,77.58,66.7,98.47],ok:true,say:'A wheel! Chugga chugga!'}]}]}),
G({num:14,slug:'raccoons-clue-hunt',img:'14-raccoons-clue-hunt.webp',title:'Raccoon\u2019s Clue Hunt',skill:'Clue reading',
 tag:'A wheel, handlebars, a bell \u2014 follow the clues and tap the object they describe.',
 say:'Read the clues, then tap the object they describe!',
 hint:'The clues fit!',doneTitle:'Clue hunt complete!',doneSub:'A bicycle, a giraffe, and a clock \u2014 the clues never lied.',
 alt:'Three clue boxes \u2014 bike parts, giraffe neck and legs, a face and hands and clock \u2014 with three object cards each.',
 parentNote:'Clue hunts ask the earliest inference: parts that add up to a whole. Name each clue, then wonder together \u2014 "what has all of those?"',
 steps:[
  {type:'ask',ask:'A wheel, handlebars, and a bell. What object is this?',ctx:[4.5,26.5,32.5,47],ctxLabel:'The clues: a wheel, handlebars and a bell',
   cards:[{label:'A bicycle',crop:[32.27,22.74,49.66,50.65],ok:true,say:'A bicycle \u2014 wheel, handlebars, bell!'},
          {label:'A boat',crop:[48.34,22.74,64.59,48.63],ok:false,say:'Boats have sails, not handlebars.'},
          {label:'An airplane',crop:[63.27,22.74,80.66,50.65],ok:false,say:'Airplanes have wings, not bells!'}]},
  {type:'ask',ask:'A long neck, four legs, and patches. Who is this?',ctx:[4.5,50,32.5,71.5],ctxLabel:'The clues: a long neck, legs and patches',
   cards:[{label:'An elephant',crop:[32.27,46.77,49.66,74.11],ok:false,say:'Elephants have trunks, not long necks.'},
          {label:'A giraffe',crop:[48.34,46.77,64.59,74.03],ok:true,say:'A giraffe \u2014 patches and a very long neck!'},
          {label:'A penguin',crop:[63.27,46.77,80.66,74.03],ok:false,say:'Penguins waddle \u2014 no long necks!'}]},
  {type:'ask',ask:'A smiley face, two hands, and numbers in a circle. What is this?',ctx:[4.5,73.5,32.5,96],ctxLabel:'The clues: a face, hands and a number circle',
   cards:[{label:'A book',crop:[32.27,70.16,49.66,98.55],ok:false,say:'Books have pages, not hands!'},
          {label:'An apple',crop:[48.34,70.16,64.59,98.55],ok:false,say:'Apples have no numbers inside.'},
          {label:'A clock',crop:[63.27,70.16,80.66,98.55],ok:true,say:'A clock \u2014 a face, two hands, twelve numbers!'}]}]}),
G({num:15,slug:'dragons-treasure-logic',img:'15-dragons-treasure-logic.webp',title:'Dragon\u2019s Treasure Logic',skill:'Two-clue logic',
 tag:'A splash and a shape \u2014 follow both clues to the one treasure chest that matches.',
 say:'Two clues point to one chest! Find the chest with the right color AND the right shape.',
 hint:'Both clues match!',doneTitle:'Treasures found!',doneSub:'Every chest matched both its clues.',
 alt:'Three clue cards \u2014 each a colored splash plus a shape \u2014 above three rows of three treasure chests.',
 artNote:'In the printed sheet every answer chest happens to sit at position B. The game deals the chests in mixed order so children match the clues, not the middle spot.',
 steps:[
  {type:'ask',ask:'A blue splash and a pink heart. Which chest matches both clues?',ctx:[5,40,32.5,69],ctxLabel:'The clues: blue splash + pink heart',shuffle:true,
   cards:[{label:'The orange chest with a star',crop:[4.81,67.18,14.13,96.94],ok:false,say:'Orange and a star \u2014 neither clue fits.'},
          {label:'The blue chest with a heart',crop:[13.33,67.18,22.6,96.94],ok:true,say:'Blue AND a heart \u2014 both clues fit!'},
          {label:'The green chest with a circle',crop:[21.85,67.18,31.12,96.94],ok:false,say:'Green and a circle \u2014 not the clues.'}]},
  {type:'ask',ask:'A purple splash and a yellow star. Which chest matches both clues?',ctx:[34.5,40,62,69],ctxLabel:'The clues: purple splash + yellow star',shuffle:true,
   cards:[{label:'The yellow chest with a triangle',crop:[34.1,66.94,43.14,97.02],ok:false,say:'Yellow helps \u2014 but a triangle is not a star.'},
          {label:'The purple chest with a star',crop:[42.33,67.18,51.6,97.02],ok:true,say:'Purple AND a star \u2014 both clues fit!'},
          {label:'The orange chest with a heart',crop:[50.86,67.18,60.13,97.02],ok:false,say:'Orange and a heart \u2014 not the clues.'}]},
  {type:'ask',ask:'A red splash and a green circle. Which chest matches both clues?',ctx:[63.5,40,91,69],ctxLabel:'The clues: red splash + green circle',shuffle:true,
   cards:[{label:'The green chest with a heart',crop:[62.81,66.94,72.14,97.02],ok:false,say:'Green helps \u2014 but a heart is not a circle.'},
          {label:'The red chest with a circle',crop:[71.34,67.18,80.61,97.02],ok:true,say:'Red AND a circle \u2014 both clues fit!'},
          {label:'The blue chest with a star',crop:[79.81,67.18,89.13,97.02],ok:false,say:'Blue and a star \u2014 not the clues.'}]}]}),
G({num:16,slug:'turtles-bridge-builder',img:'16-turtles-bridge-builder.webp',title:'Turtle\u2019s Bridge Builder',skill:'Pattern completion',
 tag:'Square, circle, square\u2026 tap the shape that fills the gap in each bridge.',
 say:'Each bridge has a shape pattern with a gap! Tap the shape that fills the gap.',
 hint:'The bridge is whole!',doneTitle:'All bridges built!',doneSub:'Circle, circle, yellow \u2014 Turtle crossed them all.',
 alt:'Three bridges with shape patterns and gaps, each with three shape choices below.',
 steps:[
  {type:'ask',ask:'Square, circle, square\u2026 what fills the gap?',ctx:[19.5,16.5,66.5,32],ctxLabel:'The bridge: cyan square, pink circle, cyan square, gap',
   cards:[{label:'A pink circle',crop:[22.77,35.81,32.67,52.58],ok:true,say:'Circle \u2014 the pattern goes square, circle, square, circle!'},
          {label:'A purple triangle',crop:[35.3,36.13,45.14,52.58],ok:false,say:'No triangles on this bridge.'},
          {label:'A yellow star',crop:[46.8,36.29,56.64,52.58],ok:false,say:'No stars on this bridge.'}]},
  {type:'ask',ask:'Triangle, triangle, circle, triangle, triangle\u2026 what fills the gap?',ctx:[7.5,49.5,71.5,65.5],ctxLabel:'The bridge: triangle, triangle, circle, triangle, triangle, gap',
   cards:[{label:'A cyan square',crop:[18.82,66.37,28.09,82.5],ok:false,say:'No squares in this pattern.'},
          {label:'A pink circle',crop:[33.81,66.37,43.65,82.5],ok:true,say:'Circle \u2014 after two triangles comes the circle!'},
          {label:'A pink heart',crop:[48.28,66.37,58.12,82.5],ok:false,say:'No hearts in this pattern.'}]},
  {type:'ask',ask:'Red, blue, yellow, red, blue\u2026 what fills the gap?',ctx:[7.5,75.5,71.5,89],ctxLabel:'The bridge: red, blue, yellow, red, blue, gap',
   cards:[{label:'A green square',crop:[19.5,96.5,28,99.5],ok:false,say:'Green isn\u2019t in this color pattern.'},
          {label:'A yellow square',crop:[35,96.5,43.5,99.5],ok:true,say:'Yellow \u2014 the color pattern starts again!'},
          {label:'A red square',crop:[49.77,96.13,55.15,99.11],ok:false,say:'Red just went \u2014 the pattern wants yellow.'}]}]}),
G({num:17,slug:'giraffes-tallest-tower',img:'17-giraffes-tallest-tower.webp',title:'Giraffe\u2019s Tallest Tower',skill:'Comparing heights',
 tag:'Three towers in every row \u2014 tap the tallest one so Giraffe can cheer.',
 say:'Look at each row and tap the tallest tower!',
 hint:'The tallest one!',doneTitle:'Three tallest found!',doneSub:'Middle, right, left \u2014 you compared them all.',
 alt:'Three rows of three block towers, each row with one clearly tallest tower.',
 parentNote:'Towers are counted and compared in one look. Ask "how do you know it\u2019s the tallest?" \u2014 counting the blocks aloud is the proof.',
 steps:[
  {type:'ask',ask:'Which tower in this row is the tallest?',ctx:[30,19.5,65,46],ctxLabel:'Row one: towers A, B and C',
   cards:[{label:'Tower A',crop:[31.92,35.65,40.05,46.05],ok:false,say:'Tower A has only two blocks.'},
          {label:'Tower B',crop:[31.5,34.5,38,44],ok:true,say:'Tower B climbs highest!'},
          {label:'Tower C',crop:[55.5,25.5,62,44],ok:false,say:'Tower C is the middle one.'}]},
  {type:'ask',ask:'Which tower in this row is the tallest?',ctx:[30,46.5,65,71],ctxLabel:'Row two: towers A, B and C',
   cards:[{label:'Tower A',crop:[79.5,31.5,86,44],ok:false,say:'Tall \u2014 but one neighbor climbs higher!'},
          {label:'Tower B',crop:[43.5,61.5,50.5,70],ok:false,say:'Tower B is the shortest here.'},
          {label:'Tower C',crop:[31.5,53.5,38,69.5],ok:true,say:'Tower C is the tallest!'}]},
  {type:'ask',ask:'Which tower in this row is the tallest?',ctx:[30,71.5,65,98.5],ctxLabel:'Row three: towers A, B and C',
   cards:[{label:'Tower A',crop:[55.5,60.5,62,69.5],ok:true,say:'Tower A reaches the top!'},
          {label:'Tower B',crop:[79.5,50,86,69.5],ok:false,say:'Tower B is the middle one.'},
          {label:'Tower C',crop:[53.89,85.08,62.01,97.02],ok:false,say:'Tower C is the shortest.'}]}]}),
G({num:19,slug:'koalas-sorting-station',img:'19-koalas-sorting-station.webp',title:'Koala\u2019s Sorting Station',skill:'Sorting by shape',
 tag:'Six toys, three boxes \u2014 sort every toy by its shape, not its color!',
 say:'Sort the toys by shape! Tap a toy, then tap the box with the matching shape.',
 hint:'Sorted by shape!',doneTitle:'The station is sorted!',doneSub:'Triangles to the triangle box, squares to the square box, circles to the circle box.',
 alt:'Three shape boxes \u2014 red circle, blue triangle, yellow square \u2014 and six toys: blue triangle, yellow square, red circle, red triangle, blue square, yellow circle.',
 parentNote:'The trick here is deliberate: colors clash on purpose (a red toy does NOT go in the red box). Say the shape aloud with each tap \u2014 "triangle goes to the triangle box!"',
 steps:[{type:'match',ask:'Tap a toy, then tap the box with the same shape.',
  cards:[{label:'A blue triangle',crop:[3.2,72.26,13.27,90.56],group:'a',pair:'tri',say:'A triangle \u2014 shape over color!'},
         {label:'A yellow square',crop:[13.67,73.79,25.29,90.56],group:'a',pair:'sq',say:'A square toy!'},
         {label:'A red circle',crop:[26.5,69.5,36,93.5],group:'a',pair:'cir',say:'A circle toy!'},
         {label:'A red triangle',crop:[36.96,73.31,47.71,91.21],group:'a',pair:'tri',say:'Red, yes \u2014 but the SHAPE is a triangle!'},
         {label:'A blue square',crop:[47.71,72.34,58.75,90.56],group:'a',pair:'sq',say:'Blue, yes \u2014 but the SHAPE is a square!'},
         {label:'A yellow circle',crop:[58.7,72.26,70.25,90.56],group:'a',pair:'cir',say:'Yellow, yes \u2014 but the SHAPE is a circle!'},
         {label:'The blue triangle box',crop:[27,23.23,48.46,66.61],group:'b',pair:'tri'},
         {label:'The yellow square box',crop:[46.51,23.23,67.96,66.61],group:'b',pair:'sq'},
         {label:'The red circle box',crop:[7.84,23.23,27.92,66.61],group:'b',pair:'cir'}]}]}),
G({num:18,slug:'foxs-logic-picnic',img:'18-foxes-logic-picnic.webp',title:'Fox\u2019s Logic Picnic',skill:'Two-clue logic',
 tag:'A puzzle piece and a food each name one basket — match both clues to find it.',
 say:'Fox packed three picnics! Each clue shows a puzzle piece and a food. The piece\u2019s colour matches the basket, and the food tells you what\u2019s inside. Tap the basket that fits both clues!',
 hint:'Match the colour AND the food!',doneTitle:'Three picnics matched!',doneSub:'Green apple basket, yellow cupcake basket, red cookie basket — both clues every time!',
 alt:'Three clue boxes each show a coloured puzzle piece plus a food — green with an apple, yellow with a cupcake, red with a cookie — above three lettered baskets to choose from.',
 artNote:'The real logic is two clues at once: the puzzle piece gives the basket colour and the food gives the contents. Each row always offers one right-colour-wrong-food and one right-food-wrong-colour basket, so both clues are needed.',
 parentNote:'This is early deductive reasoning: neither clue alone picks the basket, and saying it aloud — “green… and an apple… so the green apple basket!” — is the skill. The game mixes the baskets so the answer never sits in the same spot.',
 steps:[
  {type:'ask',ask:'A green piece and an apple. Which basket fits both clues?',ctx:[4,39.5,31.5,59],ctxLabel:'Clue: a green puzzle piece plus a red apple',shuffle:true,
   cards:[{label:'The red basket with an apple',crop:[2,66.5,13.2,96],ok:false,say:'Right food — but the clue piece is green!'},
          {label:'The blue basket with a banana',crop:[14.2,66.5,23,96],ok:false,say:'No banana in these clues!'},
          {label:'The green basket with an apple',crop:[23.8,66.5,32.5,96],ok:true,say:'Green piece, apple inside — both clues fit!'}]},
  {type:'ask',ask:'A yellow piece and a cupcake. Which basket fits both clues?',ctx:[36,39.5,64.5,59],ctxLabel:'Clue: a yellow puzzle piece plus a pink cupcake',shuffle:true,
   cards:[{label:'The yellow basket with a sandwich',crop:[35,66.5,45,96],ok:false,say:'Right colour — but where is the cupcake?'},
          {label:'The purple basket with a cupcake',crop:[46,66.5,55,96],ok:false,say:'Right food — but the piece is yellow!'},
          {label:'The yellow basket with a cupcake',crop:[56,66.5,65.5,96],ok:true,say:'Yellow piece, cupcake inside — both clues fit!'}]},
  {type:'ask',ask:'A red piece and a cookie. Which basket fits both clues?',ctx:[68,39.5,96.5,59],ctxLabel:'Clue: a red puzzle piece plus a chocolate-chip cookie',shuffle:true,
   cards:[{label:'The blue basket with a cookie',crop:[67.8,66.5,77.8,96],ok:false,say:'Right food — but the piece is red!'},
          {label:'The red basket with a cookie',crop:[78.8,66.5,88,96],ok:true,say:'Red piece, cookie inside — both clues fit!'},
          {label:'The red basket with a carrot',crop:[89,66.5,97.5,96],ok:false,say:'Right colour — but no carrot in these clues!'}]}]}),
G({num:20,slug:'octopuss-shell-mystery',img:'20-octopuss-shell-mystery.webp',title:'Octopus\u2019s Shell Mystery',skill:'Pattern completion',
 tag:'Pink, blue, pink, blue\u2026 tap the shell that comes next in every pattern.',
 say:'Look at each shell pattern and tap what comes next!',
 hint:'The pattern continues!',doneTitle:'Shell mysteries solved!',doneSub:'Pink, big purple, and the swirly shell \u2014 all patterns finished.',
 alt:'The octopus beside three shell pattern rows, each with an empty box and three choice shells.',
 steps:[
  {type:'ask',ask:'Pink shell, blue shell, pink shell, blue shell\u2026 what comes next?',ctx:[7,25.5,50,45],ctxLabel:'The pattern: pink, blue, pink, blue, empty box',
   cards:[{label:'A pink shell',crop:[51.83,26.61,61.1,46.05],ok:true,say:'Pink \u2014 the pattern goes on!'},
          {label:'A green starfish',crop:[60.81,26.61,70.65,46.53],ok:false,say:'No starfish in this pattern.'},
          {label:'A yellow shell',crop:[70.31,26.53,80.15,46.53],ok:false,say:'No yellow shells here.'}]},
  {type:'ask',ask:'Small yellow, small blue, big purple, small yellow, small blue\u2026 what comes next?',ctx:[4,52.5,44.5,71],ctxLabel:'The pattern: small yellow, small blue, big purple, small yellow, small blue, empty box',
   cards:[{label:'A small yellow shell',crop:[45.94,53.87,54,70],ok:false,say:'The small shells just finished their turn.'},
          {label:'A big purple shell',crop:[53.78,52.1,64.19,70.48],ok:true,say:'Big purple \u2014 after the two little ones comes the big one!'},
          {label:'A small blue shell',crop:[63.9,53.87,72.03,70],ok:false,say:'Blue just went \u2014 who follows the pair?'}]},
  {type:'ask',ask:'Swirly, cone, cone, swirly, cone, cone\u2026 what comes next?',ctx:[4,75.5,54,95.5],ctxLabel:'The pattern: swirly shell, cone, cone, swirly shell, cone, cone, empty box',
   cards:[{label:'A pink cone shell',crop:[55.89,76.53,64.59,94.11],ok:false,say:'Two cones just went \u2014 who follows the pair?'},
          {label:'A swirly yellow shell',crop:[64.3,76.53,74.14,94.11],ok:true,say:'Swirly! After two cones comes the swirl.'},
          {label:'A green starfish',crop:[73.74,76.53,84.21,94.11],ok:false,say:'No starfish in this pattern.'}]}]}),
G({num:21,slug:'unicorns-rainbow-route',img:'21-unicorns-rainbow-route.webp',title:'Unicorn\u2019s Rainbow Route',skill:'Following a color key',
 tag:'Red, blue, yellow \u2014 hop the rainbow colors in order and lead the unicorn to the castle.',
 say:'Follow the key: red, then blue, then yellow. Tap the colors in that order to reach the castle!',
 hint:'On the rainbow route!',doneTitle:'Castle reached!',doneSub:'Red, blue, yellow \u2014 the unicorn prances to the castle.',
 alt:'A unicorn at START, six colored circles in two rows, and a castle at FINISH, with the key red, blue, yellow.',
 steps:[{type:'order',ask:'Tap the route colors in the key\u2019s order: red, blue, yellow.',ctx:[16,24.5,62.5,38],ctxLabel:'The key: red, then blue, then yellow',
  cards:[{label:'The green circle',crop:[18.76,62.9,28.66,88.95],bad:true,say:'Green is not in the key \u2014 stay on the rainbow route!'},
         {label:'The red circle',crop:[18.76,37.1,28.66,63.55],seq:0,say:'Red first!'},
         {label:'The orange circle',crop:[30.78,63.31,40.68,88.23],bad:true,say:'Orange is not in the key!'},
         {label:'The blue circle',crop:[30.78,39.11,40.68,63.55],seq:1,say:'Blue next!'},
         {label:'The purple circle',crop:[43.02,63.39,52.63,88.15],bad:true,say:'Purple is not in the key!'},
         {label:'The yellow circle',crop:[42.79,39.11,52.63,63.55],seq:2,say:'Yellow last \u2014 to the castle!'}]}]}),
G({num:22,slug:'hedgehogs-odd-shape-garden',img:'22-hedgehogs-odd-shape-garden.webp',title:'Hedgehog\u2019s Odd Shape Garden',skill:'Odd one out',
 tag:'Four shapes match, one does not \u2014 tap the odd flower, pot and butterfly in Hedgehog\u2019s garden.',
 say:'In every row one shape does not belong. Tap the odd one out!',
 hint:'Spotted the odd shape!',doneTitle:'Garden inspected!',doneSub:'A pointed flower, a round pot, and a mixed-up butterfly.',
 alt:'Rows of five: round-petal flowers with one pointed red flower, square pots with one round pot, and butterflies with one mixed-shape butterfly.',
 parentNote:'This garden moves beyond color: the odd ones differ by SHAPE. Ask "what is different about it?" \u2014 naming the difference is the skill.',
 steps:[
  {type:'ask',ask:'Four flowers have round petals\u2026 one does not. Tap it!',shuffle:true,
   cards:[{label:'A pink round-petal flower',crop:[6.75,25.56,17.22,48.15],ok:false,say:'Round petals!'},
          {label:'An orange round-petal flower',crop:[17.5,28,26.5,48],ok:false,say:'Round petals again.'},
          {label:'A blue round-petal flower',crop:[28.49,28.39,37.19,48.06],ok:false,say:'Round petals too!'},
          {label:'A purple round-petal flower',crop:[36.73,31.29,47.2,45.16],ok:false,say:'Round petals, same as the rest.'},
          {label:'A red pointed-petal flower',crop:[46.68,28.06,55.89,47.74],ok:true,say:'Pointed petals \u2014 the odd flower!'}]},
  {type:'ask',ask:'Four pots are square\u2026 one is not. Tap it!',shuffle:true,
   cards:[{label:'A square orange pot',crop:[9.67,52.5,18.25,71.85],ok:false,say:'A square pot.'},
          {label:'A square blue pot',crop:[17.68,52.5,29.29,71.85],ok:false,say:'Square again.'},
          {label:'A square pot with a pink flower',crop:[28.78,52.5,37.99,71.85],ok:false,say:'Still square!'},
          {label:'A round purple pot',crop:[39.5,53.5,48.5,75],ok:true,say:'Round! All the others are square.'},
          {label:'A square pink pot',crop:[48.68,52.5,55.78,71.85],ok:false,say:'Square \u2014 same as most.'}]},
  {type:'ask',ask:'Four butterflies have circle spots\u2026 one does not. Tap it!',shuffle:true,
   cards:[{label:'An orange butterfly with circle spots',crop:[7.32,78.06,18.25,94.6],ok:false,say:'Circles on its wings.'},
          {label:'A blue butterfly with circle spots',crop:[17.68,78.95,29.29,94.6],ok:false,say:'Circles again.'},
          {label:'A green butterfly with circle spots',crop:[28.66,78.06,40.27,94.6],ok:false,say:'Circle spots too!'},
          {label:'A two-tone butterfly with mixed shapes',crop:[39.65,78.06,51.83,94.6],ok:true,say:'A heart, a diamond, a triangle \u2014 no circles! The odd butterfly!'},
          {label:'A pink butterfly with circle spots',crop:[50.69,78.15,62.3,94.6],ok:false,say:'Circle spots \u2014 matches the row.'}]}]}),
G({num:23,slug:'bears-picnic-order',img:'23-bears-picnic-order.webp',title:'Bear\u2019s Picnic Order',skill:'Story sequencing',
 tag:'Basket, play, eat, wash \u2014 put Bear\u2019s picnic day back in the right order.',
 say:'Bear\u2019s picnic is mixed up! Tap the pictures in story order: first, next, then, and last.',
 hint:'The picnic plan grows!',doneTitle:'Picnic ordered!',doneSub:'Carry the basket, play on the blanket, eat a sandwich, wash the plate.',
 alt:'Four picnic panels \u2014 Bear eating a sandwich, Bear carrying the picnic basket, Bear crawling on the blanket, Bear washing the plate \u2014 with number boxes below.',
 steps:[{type:'order',ask:'Tap the picnic story in order \u2014 first to last.',
  cards:[{label:'Bear eats a sandwich',crop:[1.26,24.03,21.97,79.84],seq:2,say:'Eating comes after playing!'},
         {label:'Bear carries the picnic basket',crop:[19.51,24.03,40.96,79.84],seq:0,say:'First: carry the basket!'},
         {label:'Bear crawls on the blanket',crop:[38.5,24.03,59.95,79.84],seq:1,say:'Next: play on the blanket!'},
         {label:'Bear washes the plate',crop:[57.49,24.03,78.95,79.84],seq:3,say:'Last: wash the dishes!'}]}]}),
G({num:24,slug:'raccoons-secret-object',img:'24-raccoons-secret-object.webp',title:'Raccoon\u2019s Secret Object',skill:'Two-clue logic',
 tag:'Color plus shape \u2014 follow both clues and tap Raccoon\u2019s secret object in every row.',
 say:'Two clues name a secret object: a color AND a shape. Tap the object that matches both!',
 hint:'Both clues fit!',doneTitle:'Every secret found!',doneSub:'A blue ball, a big green star, and a red circle.',
 alt:'Three clue rows \u2014 color plus shape \u2014 each above four objects: red ball, blue ball, red car, blue car; small and big yellow and green stars; red and blue triangles and circles.',
 parentNote:'Two clues at once (color AND shape) is real deductive logic. Say both clues aloud, test each object together, and let your child reject the near-misses.',
 steps:[
  {type:'ask',ask:'The secret object is BLUE and ROUND. Tap it!',ctx:[50.5,26.5,69.5,39],ctxLabel:'The clues: the plus sign and a blue circle',shuffle:true,
   cards:[{label:'A red ball',crop:[6.01,34.76,19.91,51.61],ok:false,say:'Round \u2014 but is it blue?'},
          {label:'A blue ball',crop:[10,33.5,20.5,49],ok:true,say:'Blue AND round \u2014 the secret object!'},
          {label:'A red car',crop:[31.5,33.5,42,49],ok:false,say:'Red and not round \u2014 neither clue fits.'},
          {label:'A blue car',crop:[53,33.5,69.5,49],ok:false,say:'Blue \u2014 but cars aren\u2019t round!'}]},
  {type:'ask',ask:'The secret object is GREEN and BIG. Tap it!',ctx:[50.5,53,69.5,65.5],ctxLabel:'The clues: a small yellow star, plus and a green star',shuffle:true,
   cards:[{label:'A small yellow star',crop:[76,33.5,92.5,49],ok:false,say:'Small \u2014 and yellow!'},
          {label:'A big yellow star',crop:[18.94,62.5,34.04,76.29],ok:false,say:'Big \u2014 but yellow, not green.'},
          {label:'A small green star',crop:[10,55,20.5,76.5],ok:false,say:'Green \u2014 but the clues want BIG.'},
          {label:'A big green star',crop:[31.5,54,42,76.5],ok:true,say:'Green AND big \u2014 the secret object!'}]},
  {type:'ask',ask:'The secret object is RED and ROUND. Tap it!',ctx:[50.5,79,69.5,91],ctxLabel:'The clues: the plus sign and a red circle',shuffle:true,
   cards:[{label:'A red triangle',crop:[53,56,69.5,76.5],ok:false,say:'Red \u2014 but triangles have corners!'},
          {label:'A blue triangle',crop:[76,54,92.5,76.5],ok:false,say:'Neither clue fits this one.'},
          {label:'A red circle',crop:[50.92,77.58,66.02,98.63],ok:true,say:'Red AND round \u2014 the secret object!'},
          {label:'A blue circle',crop:[9.5,82.5,21.5,97.5],ok:false,say:'Round \u2014 but the clues want red.'}]}]}),
G({num:25,slug:'foxs-gear-workshop',img:'25-foxes-gear-workshop.webp',title:'Fox\u2019s Gear Workshop',skill:'Shape and size matching',
 tag:'Round spots, gear-shaped spots, a missing colour — fit the right gear into all three machines.',
 say:'Welcome to Fox\u2019s workshop! Look at each machine\u2019s empty spot, then tap the gear that fits.',
 hint:'Which gear really fits?',doneTitle:'All machines running!',doneSub:'Round gear, big gear, blue gear — the workshop is whirring again!',
 alt:'Three machines with empty spots — a round hole, a large gear-shaped hole and a light-blue gear hole — each above three pieces to choose from.',
 artNote:'Machine 1\u2019s spot is round, so the round gear fits and the triangle and star cannot spin there. Machine 2\u2019s spot is gear-shaped and big — the big green gear fits, the tiny purple gear is too small and a square cannot spin. Machine 3 is missing one gear colour: its empty spot is blue, so the blue gear completes the pair.',
 parentNote:'Fitting pieces into machines rehearses shape-and-size reasoning. Say the WHY together: “the spot is round, so…”, “the spot is big, so…” — the explanation is the learning, and the game mixes the pieces every round.',
 steps:[
  {type:'ask',ask:'Machine 1 has a round empty spot. Which piece fits?',ctx:[2.5,30,32.5,71],ctxLabel:'Machine 1 with a round white hole',shuffle:true,
   cards:[{label:'The yellow round gear',crop:[3,73,13.5,91],ok:true,say:'A round gear spins in a round spot!'},
          {label:'The purple triangle',crop:[14.5,73,24.5,91],ok:false,say:'A triangle pokes out — the spot is round!'},
          {label:'The pink star',crop:[25,73,32.5,91],ok:false,say:'The star\u2019s points stick out. It cannot spin!'}]},
  {type:'ask',ask:'Machine 2\u2019s empty spot is big and gear-shaped. Which gear fits?',ctx:[34.5,30,64.5,71],ctxLabel:'Machine 2 with a large gear-shaped white hole',shuffle:true,
   cards:[{label:'The big green gear',crop:[35,73,45.5,91],ok:true,say:'Big spot, big gear — it fits and it spins!'},
          {label:'The tiny purple gear',crop:[46.5,73,54.5,91],ok:false,say:'Too tiny — the spot is much bigger!'},
          {label:'The blue square',crop:[57.5,73,64.5,91],ok:false,say:'A square cannot spin like a gear!'}]},
  {type:'ask',ask:'Machine 3 is missing one gear. Which colour fits the empty spot?',ctx:[67,30,97,71],ctxLabel:'Machine 3 with one blue gear and one empty light-blue gear spot',shuffle:true,
   cards:[{label:'The red gear',crop:[68,73,76,91],ok:false,say:'Red is a lovely gear — but look at the empty spot\u2019s colour!'},
          {label:'The green gear',crop:[78,73,85.5,91],ok:false,say:'Not green — match the empty spot\u2019s colour!'},
          {label:'The blue gear',crop:[88,73,96,91],ok:true,say:'The blue gear completes the pair — the machine runs!'}]}]}),
G({num:26,slug:'pandas-balloon-logic',img:'26-pandas-balloon-logic.webp',title:'Panda\u2019s Balloon Logic',skill:'Two-clue logic',
 tag:'Blue + heart, small + green, red + triangle \u2014 follow both clues to Panda\u2019s balloon.',
 say:'Two clues point to one balloon! Tap the balloon that matches both clues.',
 hint:'Both clues fit!',doneTitle:'All balloons found!',doneSub:'A blue heart balloon, a small green balloon, and a red triangle balloon.',
 alt:'Three clue cards above groups of four balloons: red and blue with stars and hearts; big and small yellow and green; red and blue with circles and triangles.',
 steps:[
  {type:'ask',ask:'The balloon is BLUE with a HEART. Tap it!',ctx:[6.5,32,25,53],ctxLabel:'The clues: a blue circle + a blue heart',shuffle:true,
   cards:[{label:'A red balloon with a star',crop:[5.61,52.18,15.79,75.73],ok:false,say:'A star \u2014 and red too!'},
          {label:'A blue balloon with a star',crop:[14.65,52.18,26.83,75.73],ok:false,say:'Blue helps \u2014 but that\u2019s a star!'},
          {label:'A red balloon with a heart',crop:[3.6,71.77,15.79,94.6],ok:false,say:'A heart \u2014 but red, not blue!'},
          {label:'A blue balloon with a heart',crop:[14.65,71.77,26.83,94.6],ok:true,say:'Blue AND a heart \u2014 the balloon!'}]},
  {type:'ask',ask:'The balloon is GREEN and SMALL. Tap it!',ctx:[30.5,32,49,53],ctxLabel:'The clues: small + green',shuffle:true,
   cards:[{label:'A big yellow balloon',crop:[27.63,52.18,39.82,75.73],ok:false,say:'Big \u2014 and yellow!'},
          {label:'A small yellow balloon',crop:[38.73,52.18,49.49,75.73],ok:false,say:'Small \u2014 but yellow.'},
          {label:'A big green balloon',crop:[27.63,71.77,39.82,94.6],ok:false,say:'Green \u2014 but big!'},
          {label:'A small green balloon',crop:[38.73,71.77,49.71,94.6],ok:true,say:'Green AND small \u2014 the balloon!'}]},
  {type:'ask',ask:'The balloon is RED with a TRIANGLE. Tap it!',ctx:[54.5,32,73.5,53],ctxLabel:'The clues: a red circle + a red triangle',shuffle:true,
   cards:[{label:'A red balloon with a circle',crop:[54.35,54.03,62.13,75.73],ok:false,say:'Red helps \u2014 but that\u2019s a circle!'},
          {label:'A red balloon with a triangle',crop:[65.45,52.18,74.83,75.73],ok:true,say:'Red AND a triangle \u2014 the balloon!'},
          {label:'A blue balloon with a circle',crop:[51.66,74.92,63.79,94.6],ok:false,say:'A blue circle \u2014 neither clue fits.'},
          {label:'A blue balloon with a triangle',crop:[62.64,71.77,74.83,94.6],ok:false,say:'A triangle \u2014 but blue!'}]}]}),
G({num:27,slug:'dragons-crystal-challenge',img:'27-dragons-crystal-challenge.webp',title:'Dragon\u2019s Crystal Challenge',skill:'Pattern completion',
 tag:'Red, blue, red, blue\u2026 find the missing crystal in every one of Dragon\u2019s patterns.',
 say:'A crystal is missing from each pattern! Tap the crystal that completes it.',
 hint:'The pattern shines!',doneTitle:'Crystals complete!',doneSub:'A red gem, a big purple crystal, and a pink circle gem.',
 alt:'Dragon beside three crystal pattern rows, each ending in a question mark, with choice crystals.',
 steps:[
  {type:'ask',ask:'Red, blue, red, blue\u2026 which crystal comes next?',ctx:[4.5,28,53,52],ctxLabel:'The pattern: red, blue, red, blue, question mark',
   cards:[{label:'A red crystal',crop:[51.5,30.5,58,50],ok:true,say:'Red \u2014 the pattern goes on!'},
          {label:'A green crystal',crop:[58.5,30.5,65.5,50],ok:false,say:'No green in this pattern.'},
          {label:'A yellow crystal',crop:[66,30.5,73,50],ok:false,say:'No yellow in this pattern.'}]},
  {type:'ask',ask:'Small, medium, big, small, medium\u2026 which crystal comes next?',ctx:[3.5,54.5,50,77],ctxLabel:'The pattern: small, medium, big, small, medium, question mark',
   cards:[{label:'A small purple crystal',crop:[51.5,55,58,76],ok:false,say:'The small ones just had their turn.'},
          {label:'A big purple crystal',crop:[58,54,66,76.5],ok:true,say:'BIG \u2014 after small and medium comes the big one!'},
          {label:'A medium purple crystal',crop:[66,55,73.5,76],ok:false,say:'Medium just went \u2014 the pattern wants big!'}]},
  {type:'ask',ask:'Triangle, square, circle, triangle, square\u2026 which crystal comes next?',ctx:[3,76,49,89.5],ctxLabel:'The pattern: triangle, square, circle, triangle, square, question mark',
   cards:[{label:'A yellow star',crop:[51.5,77.5,59.5,89],ok:false,say:'No stars in this pattern.'},
          {label:'A pink circle',crop:[60,77.5,67.5,89],ok:true,say:'Circle \u2014 after triangle and square comes the circle!'},
          {label:'A green triangle',crop:[67.5,77.5,74.5,89],ok:false,say:'Triangles just had their turn.'}]}]}),
G({num:28,slug:'penguins-ice-block-builder',img:'28-penguins-ice-block-builder.webp',title:'Penguin\u2019s Ice Block Builder',skill:'Completing towers',
 tag:'Each tower misses its top block \u2014 tap the block that completes every ice tower.',
 say:'Each tower needs one more block! Tap the block that completes it.',
 hint:'The tower stands!',doneTitle:'All towers built!',doneSub:'A little blue block, a yellow block, and a pink circle block.',
 artNote:'The printed sheet shows one shared block pile for three towers with three different completion rules (blues shrink, red-yellow alternates, shapes alternate). The game presents each tower with its own three blocks and spells the rule in the prompt.',
 steps:[
  {type:'ask',ask:'The blue tower: big blue, medium blue\u2026 which block goes on top?',ctx:[3,34.5,21,80],ctxLabel:'The blue tower: big dark blue base, lighter blue block, empty top',
   cards:[{label:'The small blue square',crop:[2.4,85.4,8.58,94.35],ok:true,say:'The littlest blue block \u2014 the tower shrinks as it grows!'},
          {label:'The red block',crop:[10.47,84.92,19.16,95.56],ok:false,say:'Red? The tower is all blue!'},
          {label:'The green square',crop:[18.36,84.92,27.06,95.56],ok:false,say:'Green isn\u2019t in this tower.'}]},
  {type:'ask',ask:'The red-yellow tower: red, yellow, red\u2026 which block goes on top?',ctx:[28,34.5,46,94],ctxLabel:'The tower: red, yellow, red blocks',
   cards:[{label:'A green square',crop:[26.37,85.48,33.7,94.35],ok:false,say:'No green in this tower.'},
          {label:'The yellow block',crop:[35,86.5,42.5,99.5],ok:true,say:'Yellow \u2014 red, yellow, red, yellow!'},
          {label:'The light blue block',crop:[42.39,85.48,51.09,94.35],ok:false,say:'No blue in this tower.'}]},
  {type:'ask',ask:'The shape tower: rectangle, circle, square\u2026 which block goes on top?',ctx:[53,34.5,70,91],ctxLabel:'The tower: purple rectangle, pink circle, teal square',
   cards:[{label:'A purple triangle',crop:[51.32,84.68,60.58,94.35],ok:false,say:'A triangle \u2014 but look at the shapes the tower uses!'},
          {label:'A pink circle',crop:[60.5,85.5,68.5,99.5],ok:true,say:'A circle \u2014 the tower\u2019s shapes take turns!'},
          {label:'A yellow star',crop:[69.45,84.19,77.63,95.4],ok:false,say:'No stars on this tower.'}]}]}),
G({num:29,slug:'bunnys-path-detective',img:'29-bunnys-path-detective.webp',title:'Bunny\u2019s Path Detective',skill:'Following a key',
 tag:'Red circle, yellow star, purple heart \u2014 hop the clues in order and find the carrot!',
 say:'Follow the key: red circle, yellow star, purple heart. Tap the path circles in that order!',
 hint:'Following the clues!',doneTitle:'Carrot found!',doneSub:'Circle, star, heart \u2014 Bunny munched the carrot.',
 alt:'Bunny the detective beside the key \u2014 red circle, yellow star, purple heart \u2014 and six path circles with a carrot at the finish.',
 steps:[{type:'order',ask:'Tap the path in the key\u2019s order: red circle, yellow star, purple heart.',ctx:[27,23.5,75,40.5],ctxLabel:'The key: red circle, then yellow star, then purple heart',
  cards:[{label:'The red circle',crop:[29.98,38.39,44.45,65],seq:0,say:'Red circle first!'},
         {label:'The blue square',crop:[29.98,60.73,44.45,89.19],bad:true,say:'The key wants a circle, not a square!'},
         {label:'The yellow star',crop:[43.99,38.39,58.35,65],seq:1,say:'Yellow star next!'},
         {label:'The green triangle',crop:[43.99,60.73,58.47,89.19],bad:true,say:'No triangles on this path!'},
         {label:'The purple heart',crop:[57.95,38.39,72.48,65],seq:2,say:'Purple heart \u2014 to the carrot!'},
         {label:'The orange diamond',crop:[57.95,60.73,72.48,89.19],bad:true,say:'Diamonds sparkle, but they\u2019re not in the key!'}]}]}),
G({num:30,slug:'logic-castle-graduation',img:'30-logic-castle-graduation.webp',title:'Logic Castle Graduation',skill:'The grand logic challenge',
 tag:'Three final puzzles guard the castle: finish a pattern, spot the odd one, find the biggest.',
 say:'Three last puzzles! What comes next, what\u2019s the odd one out, and which is biggest?',
 hint:'Puzzle solved!',doneTitle:'LOGIC GRADUATE!',doneSub:'Pattern, odd one, biggest \u2014 you solved the castle\u2019s final puzzles. Hats off!',
 alt:'The graduation castle with three puzzle rows: a red-blue dot pattern with choices, an odd-one-out fruit row, and three teddy bears of different sizes.',
 parentNote:'A gentle graduation: three mini-puzzles that revisit the class\u2019s core skills. Celebrate each one \u2014 the third click earns the applause.',
 steps:[
  {type:'ask',ask:'Red, blue, red, blue\u2026 what comes next?',ctx:[9,44,39,59.5],ctxLabel:'The pattern: red, blue, red, blue, question mark',
   cards:[{label:'A red circle',crop:[41.88,49.19,50.57,60.73],ok:true,say:'Red \u2014 the pattern goes on!'},
          {label:'A green triangle',crop:[50.34,43.55,59.1,60.73],ok:false,say:'No triangles in this pattern.'},
          {label:'A yellow star',crop:[58.87,46.21,67.56,60.73],ok:false,say:'No stars in this pattern.'}]},
  {type:'ask',ask:'One fruit is not an apple. Tap the odd one out!',shuffle:true,
   cards:[{label:'A red apple',crop:[22.65,64.35,34.27,79.52],ok:false,say:'Apple!'},
          {label:'A red apple',crop:[33.7,62.98,45.25,79.52],ok:false,say:'Another apple.'},
          {label:'A yellow banana',crop:[44.74,63.06,55.72,81.94],ok:true,say:'The banana is the odd one!'},
          {label:'A red apple',crop:[55.15,63.23,66.76,81.94],ok:false,say:'Apple number three.'}]},
  {type:'ask',ask:'Which teddy is the BIGGEST?',ctx:[21,81,58,99.5],ctxLabel:'Three teddy bears of different sizes',
   cards:[{label:'The small teddy',crop:[22.77,82.82,33.18,98.47],ok:false,say:'Small \u2014 but is it the biggest?'},
          {label:'The big teddy',crop:[32.61,78.87,44.79,98.47],ok:true,say:'The big teddy in the middle!'},
          {label:'The medium teddy',crop:[44.22,82.82,55.21,98.47],ok:false,say:'Medium \u2014 one more look!'}]}]})
];

export const logicBySlug=Object.fromEntries(logicAdventures.map(g=>[g.slug,g]));
/* every logic adventure that ships a maze board exports it for tests */
export const LOGIC_MAZE=MAZE;

/* ---------- pages ---------- */
export function logicClassBody(){
 const shelves=[
  [1,'Patterns and puzzles','What comes next, what completes the picture \u2014 Robot, Bunny and Turtle lead the way.',2,7],
  [2,'Odd ones and matching','Spot the impostor, match shadows, sizes and tents.',8,11],
  [3,'Codes and clues','Secret codes, clue hunts and two-clue logic.',12,15],
  [4,'Sorting and routes','Shape sorting, shell patterns, rainbow routes and one traceable maze.',16,21],
  [5,'Order, clues and the castle','Sequencing, secret objects, balloon logic \u2014 and the graduation castle.',22,30]];
 const pending=LOGIC_PENDING.map(p=>`<li><strong>${p.num}. ${esc(p.title)}</strong> \u2014 artwork on its way; the game and worksheet appear here the day it lands.</li>`).join('');
 return `${crumbNav([['Preschool','/preschool/'],['Age 4','/preschool/4-years/'],['Logic, Thinking &amp; Problem-Solving']])}
 <article class="wrap lesson-hero"><div class="lesson-hero-copy">
  <span class="eyebrow">CLASS 30 · PRESCHOOL AGES 4–5</span>
  <h1>Logic, Thinking &amp; Problem-Solving</h1>
  <div class="fc-chips lesson-chips"><span><strong>Age</strong> 4–5 Years</span><span><strong>Class</strong> 30 of 30</span><span><strong>Adventures</strong> 30 logic games</span><span><strong>Subjects</strong> Patterns · clues · sorting</span></div>
  <p class="lesson-lede">Build early reasoning, observation, memory, matching, sequencing, sorting, and problem-solving skills through playful picture puzzles. Thirty real games \u2014 every one played on its own puzzle illustration, with spoken instructions and a printable worksheet twin in the <a href="${WS30_PATH}">Logic worksheet library</a>.</p>
  <p class="lesson-lede">Patterns to finish, odd ones to catch, shadows to match, mazes to trace and codes to crack \u2014 every puzzle spoken aloud, every answer a picture.</p>
  <div class="lesson-start"><a class="button" href="#adventures">Meet the adventures <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Puzzles are best in short, happy sittings.</span></div>
 </div></article>
 <section class="wrap lesson-section" id="adventures" aria-label="The logic adventures">
  <span class="eyebrow">PLAY · THE ${LOGIC_READY} LOGIC ADVENTURES</span>
  <h2>Thirty puzzle adventures.</h2>
  <p class="lesson-copy">Start anywhere. The shelves climb gently \u2014 finish-a-pattern before two-clue logic \u2014 but every game stands alone. Each adventure twins with a printable worksheet at <a href="${WS30_PATH}">/worksheets/logic/</a>.</p>
  ${shelves.map((sh,i)=>{const [t,d,a,b]=sh;const items=logicAdventures.filter(g=>g.num>=a&&g.num<=b);
   return `<div class="wa-shelf"><h3>${i+1}. ${t}</h3><p class="lesson-copy">${d}</p><div class="sa-grid">${items.map(g=>`<a class="sa-card sa-card-slim" href="${LOGIC_LIB}${g.slug}/"><img src="${LOGIC_BASE}${g.img}" width="400" height="284" alt="${esc(g.alt)}" loading="lazy"><span class="sa-card-body"><strong>${g.num}. ${esc(g.title)}</strong><span class="sa-card-skill">${esc(g.skill)}</span></span><span class="sa-card-play">Play <span aria-hidden="true">→</span></span></a>`).join('')}</div></div>`;}).join('')}
  <p class="lesson-note">All ${LOGIC_READY} planned adventures are playable and printed today — Class 30 is complete, and every game was audited against its own artwork before it shipped.</p>
 </section>
 <section class="wrap lesson-section" id="off-screen" aria-label="Off-screen logic play">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>Little puzzles in big kitchens.</h2>
  <div class="tc-hunt"><h3>Sock-drawer sorting</h3><ul class="lesson-prompts"><li>Sort socks by size or pattern \u2014 real objects, real sorting, real pride.</li><li>Ask \u201chow did you decide?\u201d and let the rule be theirs.</li></ul></div>
  <div class="tc-hunt"><h3>What comes next, snack edition</h3><ul class="lesson-prompts"><li>Line up apple, grape, apple, grape\u2026 and let your child place the next one.</li><li>Swap in crackers, berries or cheese cubes once the pattern clicks.</li></ul></div>
  <p class="lesson-note">Logic at four is playful rules: same and different, first and last, big and small. The kitchen is full of all three.</p>
 </section>
 <section class="wrap lesson-section tc-principal"><span class="eyebrow">A NOTE FROM THE PRINCIPAL</span><h2>For the grown-ups.</h2>
  <p class="lesson-copy">Logic games teach children that rules are things you can spot, name and use. Every puzzle here shows its rule in pictures, speaks its question aloud, and answers a wrong tap with a hint instead of a buzzer \u2014 the habit being built is trying a rule again, not fear of getting it wrong.</p>
  <p class="lesson-copy">The printable worksheets twin every game with room to draw, sort and circle. <a href="${WS30_PATH}">Browse the logic worksheets</a> \u2014 and remember, downloading never marks a class complete; only finished games do, and only for the child chosen in <a href="/my-classroom/">My Classroom</a>.</p>
  <p class="lesson-copy"><a href="/about/#principal">More from the Principal\u2019s Office <span aria-hidden="true">↗</span></a></p>
 </section>
 <section class="wrap lesson-section tc-complete" id="class-complete" aria-label="Class complete">
  <span class="eyebrow">CLASS COMPLETE</span>
  <h2>A true puzzle thinker!</h2>
  <p class="lesson-copy">Every solved puzzle sharpens the reasoning that maths and reading will lean on. The shelves remember where you left off for your chosen child.</p>
  <div class="hero-actions"><a class="button" href="${LOGIC_LIB}">Play more Logic Adventures <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="${WS30_PATH}">Print the logic worksheets <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
 </section>`;
}

export function logicLibraryBody(){
 return `${crumbNav([['Preschool','/preschool/'],['Logic Adventures']])}
 <div class="page-heading wrap"><span class="eyebrow">LOGIC ADVENTURES</span><h1>Thirty picture puzzles you really play.</h1><p>Patterns, odd-one-outs, shadow matches, size orders, mazes, secret codes and clue hunts \u2014 real logic games played on our own puzzle artwork, with spoken instructions and no reading required.</p></div>
 <div class="lesson-start"><a class="button" href="${C30_PATH}">This way to Class 30 <span aria-hidden="true">→</span></a><span class="lesson-start-hint">The class that goes with these adventures: Logic, Thinking &amp; Problem-Solving.</span></div>
 <section class="wrap section compact" data-st-lib aria-label="All logic adventures">
  <div class="sa-grid">
  ${logicAdventures.map(g=>`<a class="sa-card" href="${LOGIC_LIB}${g.slug}/" data-st-libcard="${g.slug}">
    <span class="sa-card-num" aria-hidden="true">${g.num}</span>
    <span class="sa-card-done" data-sa-done hidden>Cleared!</span>
    <img src="${LOGIC_BASE}${g.img}" width="800" height="568" alt="${esc(g.alt)}" loading="lazy">
    <span class="sa-card-body"><strong>${esc(g.title)}</strong><span class="sa-card-tag">${esc(g.tag)}</span><span class="sa-card-skill">${esc(g.skill)}</span></span>
    <span class="sa-card-play">Play <span aria-hidden="true">→</span></span>
  </a>`).join('')}
  </div>
  <p class="lesson-note">Every card is one real game. ${LOGIC_READY} of the planned ${LOGIC_TOTAL} adventures are playable now \u2014 01, 18 and 25 join the moment their artwork is uploaded. Progress is saved on this device for the child chosen in <a href="/my-classroom/">My Classroom</a>.</p>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>What each game practises.</h2>
  <p class="lesson-copy">The collection climbs one slope: finishing patterns (Robot\u2019s rainbow, Turtle\u2019s bridges, Octopus\u2019s shells, Dragon\u2019s crystals), catching odd ones (Dinosaur eggs, Monkey\u2019s market, Hedgehog\u2019s garden), matching shadows and sizes (Lion\u2019s safari, Elephant\u2019s circus, Giraffe\u2019s towers), following keys and routes (Penguin\u2019s ice path, Unicorn\u2019s rainbow route, Bunny\u2019s path detective \u2014 plus one fully traceable acorn maze), and combining two clues (Owl\u2019s secret code, Raccoon\u2019s clue hunt and secret object, Dragon\u2019s treasure, Panda\u2019s balloons) \u2014 up to the Logic Castle graduation that mixes them all.</p>
  <p class="lesson-copy">Ask \u201chow did you know?\u201d after every solve \u2014 explaining a rule out loud is the highest level of this whole class.</p>
 </section>`;
}

export function logicAdventureBody(g){
 const list=logicAdventures;
 const i=list.findIndex(x=>x.slug===g.slug);
 const prev=list[(i-1+list.length)%list.length];
 const next=list[(i+1)%list.length];
 const ws=WS30_PATH+g.slug+'/';
 return `${crumbNav([['Preschool','/preschool/'],['Logic Adventures',LOGIC_LIB],[g.num+'. '+esc(g.title)]])}
 <article class="wrap lesson-hero sa-hero">
  <div class="sa-hero-art"><img src="${LOGIC_BASE}${g.img}" width="800" height="568" alt="${esc(g.alt)}" fetchpriority="high"></div>
  <div class="lesson-hero-copy">
   <span class="eyebrow">LOGIC ADVENTURE ${g.num} · CLASS 30</span>
   <h1>${esc(g.title)}</h1>
   <div class="fc-chips lesson-chips"><span><strong>Age</strong> 4–5 Years</span><span><strong>Class</strong> 30 · Logic</span><span><strong>Skill</strong> ${esc(g.skill)}</span></div>
   <p class="lesson-lede">${esc(g.tag)}</p>
   <div class="lesson-start"><a class="button" href="#play">Play the puzzle game <span aria-hidden="true">↓</span></a><a class="button button-ghost" href="${ws}">Print the worksheet <span aria-hidden="true">↓</span></a><span class="lesson-start-hint">Play with a finger, a stylus or a mouse. Instructions are spoken aloud.</span></div>
  </div>
 </article>
 <section class="wrap lesson-section" id="play" aria-label="Play ${esc(g.title)}">
  <span class="eyebrow">PLAY · ${esc(g.skill).toUpperCase()}</span>
  <h2>${esc(g.title)}</h2>
  <p class="lesson-copy">${esc(g.say)}</p>
  ${board(LOGIC_BASE,{...g,band:"logic"},W,H)}
  <noscript><p class="sa-noscript">The puzzle game needs JavaScript. Everything else on this page works without it \u2014 and the <a href="${ws}">matching worksheet</a> brings this adventure to paper.</p></noscript>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>Why this adventure helps.</h2>
  <p class="lesson-copy">${esc(g.parentNote||'This game trains '+g.skill.toLowerCase()+' on the puzzle picture itself: the question is spoken aloud, the answers are pictures, and a miss brings a gentle hint instead of a penalty. Ask your child to explain the rule out loud \u2014 saying the \u201cwhy\u201d is the whole skill.')}</p>
  ${g.artNote?`<p class="lesson-copy"><strong>Illustration note:</strong> ${esc(g.artNote)}</p>`:''}
  <p class="lesson-copy">Prefer paper? The <a href="${ws}">${esc(g.title)} worksheet</a> prints the same puzzle with room to draw, sort and circle \u2014 and a grown-up answer line. Printing never marks anything complete.</p>
 </section>
 <nav class="wrap lesson-section sa-prevnext" aria-label="More logic adventures">
  <a class="sa-navcard" href="${LOGIC_LIB}${prev.slug}/"><span class="eyebrow">Previous</span><strong>${esc(prev.title)}</strong></a>
  <a class="sa-navcard" href="${LOGIC_LIB}"><span class="eyebrow">All adventures</span><strong>Logic Library</strong></a>
  <a class="sa-navcard" href="${LOGIC_LIB}${next.slug}/"><span class="eyebrow">Next</span><strong>${esc(next.title)}</strong></a>
 </nav>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP GOING</span><h2>Where next?</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${C30_PATH}"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Class 30</span></div><h3>Logic, Thinking &amp; Problem-Solving</h3><p>The class behind these adventures \u2014 all puzzle games plus off-screen sorting ideas.</p><span class="fc-open">Open Class 30 <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="${ws}"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Worksheet</span></div><h3>${esc(g.title)} worksheet</h3><p>The printable twin of this game \u2014 free PDF, print button, parent guide.</p><span class="fc-open">Open the worksheet <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/preschool/reading/adventures/"><div class="fc-stage-pills"><span class="fc-age">Age 4–5</span><span class="fc-class">Class 29</span></div><h3>Storytime Adventures</h3><p>Twenty-nine story games with spoken instructions \u2014 the comprehension side of getting ready to read.</p><span class="fc-open">Open the Storytime Library <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}
