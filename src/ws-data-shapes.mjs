// Kiddo School — Class 25 worksheet specs (18 Shape Adventures).
// Art, titles, alt text and the shape data come straight from the real game
// configs in shape-adventures.mjs; the worksheet copy below is written per
// activity. Each entry: what the printed sheet asks (wsType + ws) matches
// what the online game actually plays.
import {shapeAdventures,SHAPE_BASE} from './shape-adventures.mjs';
import {SUBJECTS} from './ws-common.mjs';

const S=SUBJECTS.shapes;
const bySlug=Object.fromEntries(shapeAdventures.map(g=>[g.slug,g]));

// The shapes each matching game actually uses (from its own slot config).
const gameShapes=slug=>{
 const g=bySlug[slug];
 const out=[];
 (g.slots||[]).forEach(p=>{if(!out.some(o=>o.shape===p.shape))out.push({shape:p.shape,color:p.color});});
 return out;
};

const defs={
 'build-a-shape-spaceship':{
  lede:'A rocket with four shape-shaped holes: match the pieces, color the parts, and the spaceship is ready to fly.',
  learn:'This worksheet turns the spaceship game into paper practice: your child matches shapes to the holes they fit, then colors each part. Matching a shape to a shaped hole is the same skill as recognizing a letter shape later \u2014 the eyes learn to compare outlines.',
  skills:['Matching shapes to shaped spaces','Naming circle, triangle, square and rectangle','Coloring with some care inside big regions','Talking through a plan before starting'],
  task:'Match each shape piece to the rocket hole it fits, then color the rocket.',
  wsType:'match',ws:{rightOutline:true,tip:'Draw a line from each shape to the rocket hole it fits. Then color the rocket your own way!'},
  answers:'All four pieces match one hole each: the triangle is the nose cone, the circle is the porthole, the square is the door and the rectangle is the tail fin.'
 },
 'silly-monster-factory':{
  lede:'A friendly monster with empty spots for eyes, horns, arms and feet \u2014 design him on paper with shapes.',
  learn:'The monster game is open-ended building, and the worksheet keeps that spirit: your child draws shape parts onto the monster, inventing as they go. There is no wrong monster, which makes this a favorite for children who avoid \u201cwrong answers\u201d.',
  skills:['Drawing circles, triangles and rectangles on purpose','Counting parts as they are added (how many eyes?)','Making creative choices and describing them','Fine motor control for small shapes'],
  task:'Draw shape eyes, horns, arms and feet on the monster \u2014 then invent a monster friend of your own.',
  wsType:'decorate',ws:{art:'monster',taskTitle:'Now draw a friend for your monster.',frames:2,frameHints:['A friend with different shaped eyes','Your silliest monster \u2014 more parts welcome']},
  answers:'Any monster is a correct monster. Ask your child to count the parts: how many horns, how many feet?'
 },
 'hot-air-balloon-patterns':{
  patFrom:0,
  lede:'AB and AAB patterns to finish with a pencil: say the pattern out loud, then draw what lands next.',
  learn:'Patterns are the first real maths rhythm. On paper your child reads the row left to right, says the pattern like a little song, and draws or colors the missing shape. The game plays the same way on screen \u2014 the sheet just slows it down and adds pencil control.',
  skills:['Reading a row left to right','Hearing and continuing AB and AAB patterns','Predicting what comes next and committing to it','Drawing small shapes with growing control'],
  task:'Finish each pattern row: draw or color the shape that comes next.',
  wsType:'pattern',ws:{rowH:88,sayTip:'Say the pattern out loud like a song \u2014 the rhythm tells your pencil what lands next.'},
  answers:'Row 1 continues circle, square, circle, square \u2014 the missing cell is a circle. Row 2 continues star, star, heart \u2014 the missing cell is a heart. (The game\u2019s balloon rows follow the same AB and AAB rules.)'
 },
 'candy-shape-shop':{
  lede:'Sort the shop\u2019s candy by shape: circle candies here, square candies there \u2014 with scissors practice built in.',
  learn:'Sorting by shape means your child has to decide, not just copy: each candy card gets one look, one decision, one box. Cutting the cards first adds scissor practice \u2014 a two-skills-one-sheet deal.',
  skills:['Sorting by one clear rule (shape)','Scissor control along a dotted line','Saying the sorting rule out loud','Checking a sorted pile for mistakes'],
  task:'Cut out the candy cards and glue each one in the right shape box.',
  wsType:'sort',
  ws:{items:[{icon:'candy'},{icon:'candy'},{icon:'circle'},{icon:'square'},{icon:'circle'},{icon:'square'}],bins:[{label:'Circle candies',icon:'circle'},{label:'Square candies',icon:'square'}],tip:'Cut the cards on the dotted line, then glue each candy under its shape.'},
  answers:'Circle-shaped candies go in the circle box; square candies go in the square box. If your child invents a third box for \u201cswirly\u201d candies \u2014 that is sorting too.'
 },
 'rainbow-window-puzzle':{
  lede:'The rainbow windows lost their glass: match each shape to its dashed outline and the light comes back.',
  learn:'This sheet asks your child to match solid shapes to their outlines \u2014 the exact mechanic of the window game. Outline matching is harder than it looks: the eyes must ignore color and size and read pure shape.',
  skills:['Matching solid shapes to outlines','Ignoring color to find the shape','Careful line drawing between columns','Shape vocabulary: naming each match'],
  task:'Draw a line from each shape to its matching outline.',
  wsType:'match',ws:{rightOutline:true,tip:'Say the shape\u2019s name as you draw each line.'},
  answers:'Each solid shape matches its own outline one-to-one; the shapes are the ones the game uses for the window (no trick duplicates).'
 },
 'animal-shape-houses':{
  lede:'Six animal friends, six shape houses: draw the line from each animal to the house that fits.',
  learn:'Animal homes make matching feel like a story: which house does each friend live in? Your child matches by shape, names both the animal and the shape, and practices careful pencil lines between columns.',
  skills:['Matching pairs across two columns','Naming animals and shapes together','Drawing a controlled line from A to B','Left-to-right scanning'],
  task:'Draw a line from each animal to its shape house.',
  wsType:'match',ws:{tip:'Say it out loud: \u201cthe turtle lives in the green house!\u201d'},
  answers:'Each animal matches the house whose doorway shape fits it \u2014 the pairs are the same ones the game places; no animal shares a house.'
 },
 'submarine-window-rescue':{
  lede:'The submarine\u2019s windows popped out! Match the portholes and bring the crew safely home.',
  learn:'A rescue story gives the matching a purpose, and purpose keeps four-year-olds at the table. Your child matches porthole shapes to their outlines \u2014 the same eyes-on-outlines work as the game, on paper.',
  skills:['Shape-to-outline matching under a story','Careful checking before drawing the line','Shape naming (circle, square, oval)','Fine motor: stopping the line at the dot'],
  task:'Match each window shape to the porthole it fits.',
  wsType:'match',ws:{rightOutline:true,tip:'Start your line at the dot, stop at the dot. Rescue divers are precise!'},
  answers:'Every window matches exactly one porthole \u2014 the shapes come straight from the game\u2019s slot config, so there are no duplicates.'
 },
 'turtle-shell-mosaic':{
  lede:'The turtle\u2019s shell lost its tiles: match the mosaic pieces and finish the pattern work.',
  learn:'Mosaics are shapes with a puzzle inside: each tile has exactly one home. Your child matches tiles to the dashed shell spaces, which quietly practices the outline-reading that later makes letters easy.',
  skills:['Matching shapes into a bigger picture','Working top-to-bottom like a puzzle','Patience: checking the space before the line','Shape vocabulary review'],
  task:'Match each shell tile to its space on the turtle\u2019s back.',
  wsType:'match',ws:{rightOutline:true,tip:'A tile only fits its own space \u2014 just like the game!'},
  answers:'Each tile matches its one dashed space; the set is the game\u2019s own mosaic shapes.'
 },
 'fruit-market-sorting':{
  lede:'Two market crates, one sorting rule: apples to the red crate, frogs to the green \u2014 cut, sort, glue.',
  learn:'The market game sorts by kind, color and size; the paper version keeps it to one clear rule per row so a four-year-old can own the whole decision. Cutting the cards doubles this sheet as scissor practice.',
  skills:['Sorting by kind','Scissor control and glue patience','Explaining a sorting rule in words','Checking a pile for one that does not belong'],
  task:'Cut the cards and glue each one in the right crate.',
  wsType:'sort',
  ws:{items:[{icon:'apple'},{icon:'apple'},{icon:'apple'},{icon:'frog'},{icon:'frog'},{icon:'frog'}],bins:[{label:'The apple crate',icon:'apple'},{label:'The frog crate',icon:'frog'}],tip:'Apples are fruit \u2014 frogs are jumpers. Where does each card go?'},
  answers:'All apples in the apple crate, all frogs in the frog crate. If your child asks where a tomato goes \u2014 excellent question, scientists still argue.'
 },
 'wizards-magic-patterns':{
  lede:'The wizard\u2019s spell needs three patterns finished: AB, AAB and the tricky ABC.',
  learn:'This sheet carries the wizard\u2019s full spell: three pattern rows that grow from two-shape AB patterns to three-shape ABC patterns. Your child reads, says, and draws the next shape \u2014 the ABC row is a genuine step up in working memory.',
  skills:['Continuing AB, AAB and ABC patterns','Holding three items in mind (the ABC row)','Left-to-right reading habit','Precision drawing of small shapes'],
  task:'Finish each magic pattern row.',
  wsType:'pattern',ws:{rowH:84,sayTip:'Whisper the spell: \u201ccircle, square, star\u2026 circle, square\u2026 what lands next?\u201d'},
  answers:'Row 1 (AB) ends with the first shape again. Row 2 (AAB) repeats the pair before the change. Row 3 (ABC) restarts the cycle. Say each row aloud to check.'
 },
 'peacock-feather-symmetry':{
  lede:'The peacock\u2019s left feathers are missing: finish the mirror picture so both sides match.',
  learn:'Symmetry is a matching game against yourself. Your child completes the left side of the peacock so it mirrors the drawn right side \u2014 eyes comparing two halves, pencil copying curves in reverse. It is challenging and deeply satisfying.',
  skills:['Understanding mirror symmetry','Copying curves in reverse','Checking both halves against the mirror line','Careful coloring to make both sides match'],
  task:'Finish the left side of the peacock so both sides match, then color them the same.',
  wsType:'symmetry',ws:{scale:1.9,refIcon:'peacock',half:[
   {segs:[['M',10,-46],['C',44,-46,54,-18,30,0],['C',54,18,44,46,10,46]]},
   {segs:[['M',22,-26],['C',38,-22,40,-8,26,0],['C',40,8,38,22,22,26]]},
   {segs:[['M',30,-10],['C',38,-7,38,7,30,10]]}
  ]},
  answers:'The left feathers mirror the right: big arc, middle arc, small arc. Both sides then get the same colors \u2014 the mirror checks the coloring too.'
 },
 'shape-ferris-wheel':{
  lede:'The ferris wheel cabins are empty: match each shape cabin to its outline and the ride can open.',
  learn:'The ferris wheel game matches shapes at 12 positions; the sheet keeps four of them so each match gets full attention. Your child matches cabin shapes to their dashed outlines, then colors \u2014 matching first, decisions second.',
  skills:['Shape-to-outline matching','Working one row at a time','Naming shapes while matching','Coloring after matching (a two-stage task)'],
  task:'Match each cabin to its outline, then color the wheel.',
  wsType:'match',ws:{rightOutline:true,tip:'Match first, color second \u2014 ride opens when every cabin has a shape!'},
  answers:'Each cabin shape matches its own outline; the four shapes come from the game\u2019s wheel config.'
 },
 'dragon-scale-puzzle':{
  lede:'The baby dragon lost some scales: match each scale shape to the space on its back.',
  learn:'Scales make shape matching feel gentle and brave at once \u2014 the dragon needs help and shapes are the help. Your child matches scale shapes into dashed spaces, the exact puzzle the game plays with tap and drag.',
  skills:['Fitting shapes into a picture (part-whole thinking)','Checking the space before choosing','Shape naming','Careful pencil control for short lines'],
  task:'Match each scale to the space that fits it.',
  wsType:'match',ws:{rightOutline:true,tip:'Try the shape in your mind first \u2014 does it fit the space?'},
  answers:'Each scale matches exactly one scale-shaped space; the shapes mirror the game\u2019s slot set.'
 },
 'penguin-dress-up-patterns':{
  lede:'Color patterns to finish: hats and scarves in AB and AAB rows \u2014 what color lands next?',
  learn:'This sheet swaps shapes for colors: the penguin\u2019s outfits follow color patterns, and your child finishes each row. Color patterns are a different skill from shape patterns \u2014 the eye tracks a changing attribute, not a changing outline.',
  skills:['Reading and continuing color patterns','AB and AAB rhythm in colors','Predicting and checking','Neat coloring in small cells'],
  task:'Color or draw what comes next in each pattern row.',
  wsType:'pattern',ws:{rowH:88,sayTip:'Say the colors like a chant: \u201cred, red, blue\u2026 red, red\u2026?\u201d'},
  answers:'Each row repeats its own AB or AAB color rule \u2014 say the row aloud and the missing color says itself.'
 },
 'shape-clock-tower':{
  lede:'The clock tower\u2019s gears are mixed up: match the shape gears to their outlines and the clock ticks again.',
  learn:'The clock adds a story reason for precision: gears only work when the right shape lands in the right space. Your child matches gear shapes to outlines \u2014 then counts the shapes as a bonus round.',
  skills:['Matching shapes to outlines','Bonus counting of matched shapes','Working carefully \u2014 gears are picky!','Shape vocabulary'],
  task:'Match each gear shape to its outline in the tower.',
  wsType:'match',ws:{rightOutline:true,tip:'When the clock is fixed, count your matches out loud!'},
  answers:'Each gear matches one outline. Bonus: count the matches \u2014 the same number as the game\u2019s clock slots.'
 },
 'enchanted-mushroom-garden':{
  lede:'Patterns grow in the mushroom garden: finish the AB, AAB and ABC rows to wake the garden up.',
  learn:'The garden\u2019s magic follows pattern rules, and this sheet gives your child three rows of them \u2014 from easy AB to the brain-stretching ABC. Saying each pattern aloud before drawing is the trick that makes ABC rows land.',
  skills:['AB, AAB and ABC pattern continuation','Self-checking by saying the pattern','Left-to-right reading','Small-shape drawing control'],
  task:'Finish each garden pattern.',
  wsType:'pattern',ws:{rowH:84,sayTip:'Magic words: say the pattern three times, then draw the missing shape.'},
  answers:'Row 1 repeats AB, row 2 repeats AAB, row 3 cycles ABC. Each missing cell is the next item in its own rule.'
 },
 'cookie-cutter-bakery':{
  lede:'The bakery needs shape cookies: match each cutter to its cookie outline before the oven rings.',
  learn:'Cookie cutters are shape matchers you can hold \u2014 and the sheet borrows the idea: match each cutter to its dashed cookie. Then the bonus row asks your child to draw their own shape cookie, which is where shape knowledge becomes shape production.',
  skills:['Matching shapes to outlines','Drawing a shape from memory (bonus)','Shape naming','Pencil control for curves and corners'],
  task:'Match each cookie cutter to its cookie, then invent one of your own.',
  wsType:'match',ws:{rightOutline:true,tip:'Bakers check twice: does the cutter match the cookie before it goes in the oven?'},
  answers:'Every cutter matches its own cookie outline. The invented cookie can be any shape \u2014 ask your child to name it!'
 },
 'shape-detective-mystery':{
  lede:'A scene full of mixed shapes: find them, circle them, count them \u2014 the detective\u2019s case, on paper.',
  learn:'The detective game asks children to find shapes hiding inside objects; the sheet gives a busy scene of mixed shapes to search, circle and count. Searching, circling and counting in one task is a genuine three-step workout \u2014 and the count makes your child check their own work.',
  skills:['Visual search among distractors','Circling with control','Counting a set after finding it','Recording a number in a box'],
  task:'Find and circle the shapes, then count each kind and write the number.',
  wsType:'find',
  ws:{counts:[{shape:'circle',color:'#e04b3f'},{shape:'square',color:'#5aa7d6'},{shape:'triangle',color:'#f07f28'}]},
  answers:'Count the circles, squares and triangles you circled and write each number. The game\u2019s three find-rounds use the same three shapes.'
 }
};

const patRows=(slug,take)=>{
 const g=bySlug[slug];
 return (g.rounds||[]).slice(take[0],take[1]).map(r=>({seq:r.pattern}));
};
const candyRows=()=>{
 const g=bySlug['candy-shape-shop'];
 // three real jars: circle / star / triangle -> two bins on paper
 return {items:[{icon:'candy'},{icon:'candy'},{icon:'circle'},{icon:'star'},{icon:'star'},{icon:'triangle'},{icon:'triangle'}],
  bins:[{label:'Round candies',icon:'circle'},{label:'Star & triangle candies',icon:'star'}],
  tip:'Round candies in one jar, pointy candies in the other — just like the shop.'};
};
export const shapeWorksheets=shapeAdventures.map(g=>{
 const d=defs[g.slug];
 const shapes=gameShapes(g.slug);
 // Default match data from the game's own slots; patterns derive from the game's own rounds.
 let wsType=d.wsType,ws=d.ws;
 if(wsType==='match'&&!ws.pairs){
  ws={...ws,pairs:shapes.map(s=>({a:s.shape,b:s.shape}))};
 }
 if(wsType==='pattern'){
  const rng={ 'hot-air-balloon-patterns':[0,2], 'wizards-magic-patterns':[0,3], 'penguin-dress-up-patterns':[0,3], 'enchanted-mushroom-garden':[0,3] }[g.slug]||[0,2];
  ws={...ws,rows:patRows(g.slug,rng)};
 }
 if(g.slug==='candy-shape-shop'){
  const c=candyRows(); ws={...ws,items:c.items,bins:c.bins,tip:c.tip};
 }
 return {
  slug:g.slug,num:g.num,subject:S.key,title:g.title,
  art:{img:SHAPE_BASE+g.img,alt:g.alt},
  game:{path:`${S.gameLib}${g.slug}/`,title:g.title},
  classNum:S.classNum,classPath:S.classPath,classTitle:S.classTitle,
  seoTitle:`${g.title} Worksheet \u2014 Free Printable Shapes Activity for Age 4 (Class 25)`,
  metaDescription:`Free printable ${g.title} worksheet for 4-year-olds. ${d.lede} Part of Class 25: Shapes, Patterns & Sorting at Kiddo.school \u2014 download the PDF or play the matching game online.`,
  lede:d.lede,learn:d.learn,skills:d.skills,task:d.task,
  wsType,ws,answers:d.answers
 };
});
