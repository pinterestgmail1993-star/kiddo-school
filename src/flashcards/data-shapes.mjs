// Kiddo School — Preschool 3 (Age 3): Shapes & Patterns.
// Twelve real shape cards uploaded by the owner to R2
// (flashcards/preschool-learning-cards/shapes-and-patterns-age-3/).
// Dimensions probed from the actual files on 8 Oct 2026: all twelve cards
// and the cover are 1414×2000 portrait. Every card was visually inspected:
// each shows one clean, well-formed shape (circle → octagon) with its name.
// Nothing here is invented: each card points at its real file, with its
// real pixels and its own parent-facing words.

const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='flashcards/preschool-learning-cards/shapes-and-patterns-age-3/';

export const shapesMeta={
 slug:'shapes',
 group:'preschool',
 name:'Shapes & Patterns',
 seoTitle:'Shape Flashcards for Preschoolers | 12 Shapes',
 h1:'Shape Flashcards for Preschoolers',
 metaDescription:'Twelve shape flashcards for preschoolers: circle, square, triangle, star, heart and more, with shape hunts, naming games and simple pattern play for home.',
 lede:'Twelve shape cards, from the everyday circle to the eight-sided octagon. One big friendly shape per card, its name to read together, and a shape hunt to try — pick a card, name it and go find it in your house.',
 hubBlurb:'Twelve shapes from circle to octagon, each with its own card, its own page and a shape hunt to try.',
 ageLabel:'3–4 years',
 noun:'Preschoolers',
 useIdeas:[
  ['Two shapes are a fine first day','Circle and star, or circle and heart — start with the two your child will spot most around the house. Naming two shapes well beats rushing through twelve.'],
  ['Hunt first, flashcards second','Shape names stick when they are attached to real things. Find a plate-circle or a door-rectangle first, then show the card — the card confirms what your child already discovered.'],
  ['Say the shape, then trace it','Name the shape and draw it in the air with one big finger movement. Round for circle, three sharp turns for triangle — the hand helps the word land.'],
  ['Let the shapes live somewhere','Tape today’s shape near a real example: the circle card by the clock, the heart card on the family noticeboard. Passing them together all day is quiet, powerful practice.']
 ],
 printPath:'/preschool/3-years/shapes-and-patterns/print/',
 relatedSets:['colors-and-shapes','numbers-and-counting','alphabet'],
 coverFile:'cover.webp',
 coverAlt:'The Shapes flashcard set cover — twelve smiling colored shapes around the words Shapes: learn and identify shapes'
};

export const shapesLesson={
 path:'/preschool/3-years/shapes-and-patterns/',
 seoTitle:'Shapes & Patterns for 3 Year Olds',
 title:'Shapes & Patterns for 3 Year Olds',
 h1:'Shapes & Patterns',
 description:'Play with circles, squares, stars and simple repeating patterns with your preschooler using colorful shape cards, find-and-match games and pattern play to try at home.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 3',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Shapes & Patterns','/preschool/3-years/shapes-and-patterns/']],
 schemaImage:R2+P+'cover.webp',
 ogImage:R2+P+'cover.webp',
 ogAlt:'The Shapes cover of the Kiddo School Shapes & Patterns class: twelve smiling colored shapes around the words Shapes',
 schema:{resourceType:'Interactive preschool class',level:'Preschool (age 3)',teaches:['Naming 2D shapes: circle, square, triangle, rectangle, oval, star, heart, diamond, crescent, pentagon, hexagon, octagon','Spotting shapes in everyday life','Matching shapes','Continuing simple repeating patterns (AB and AAB)'],audience:'Parents and their three-year-olds',keywords:'shapes for preschoolers, shapes for 3 year olds, shape flashcards, 2D shapes, shape recognition activities, simple patterns for preschoolers'},
 cover:{file:'cover.webp',w:1414,h:2000,alt:'The Shapes set cover — twelve smiling colored shapes gathered around the words Shapes: learn and identify shapes'},
 folder:P,
 r2Base:R2,
 printables:{
  printEyebrow:'PRINTABLE SHAPE CARDS',
  pack:'Shape Flashcards: print all twelve cards',
  meta:'Twelve shape cards, two to a printed page, from circle to octagon.',
  audience:'Made for age 3 and up — one big, friendly shape per card.',
  printAria:'The twelve shape flashcards, two to a page from circle to octagon'
 },
 cards:[
  {order:1,file:'01-circle.webp',w:1414,h:2000,slug:'circle',alt:'Shape flashcard for circle: one big red circle with a shiny highlight and the word circle, from the Kiddo School shapes set'},
  {order:2,file:'02-square.webp',w:1414,h:2000,slug:'square',alt:'Shape flashcard for square: one big yellow square with a shiny highlight and the word square, from the Kiddo School shapes set'},
  {order:3,file:'03-triangle.webp',w:1414,h:2000,slug:'triangle',alt:'Shape flashcard for triangle: one big green triangle with a shiny highlight and the word triangle, from the Kiddo School shapes set'},
  {order:4,file:'04-rectangle.webp',w:1414,h:2000,slug:'rectangle',alt:'Shape flashcard for rectangle: one big green rectangle, stretched long, with the word rectangle, from the Kiddo School shapes set'},
  {order:5,file:'05-oval.webp',w:1414,h:2000,slug:'oval',alt:'Shape flashcard for oval: one big purple oval, stretched like a balloon, with the word oval, from the Kiddo School shapes set'},
  {order:6,file:'06-star.webp',w:1414,h:2000,slug:'star',alt:'Shape flashcard for star: one big yellow star with five points and the word star, from the Kiddo School shapes set'},
  {order:7,file:'07-heart.webp',w:1414,h:2000,slug:'heart',alt:'Shape flashcard for heart: one big red heart with a shiny highlight and the word heart, from the Kiddo School shapes set'},
  {order:8,file:'08-diamond.webp',w:1414,h:2000,slug:'diamond',alt:'Shape flashcard for diamond: one big purple diamond standing on its point with the word diamond, from the Kiddo School shapes set'},
  {order:9,file:'09-crescent.webp',w:1414,h:2000,slug:'crescent',alt:'Shape flashcard for crescent: one big yellow crescent moon with the word crescent, from the Kiddo School shapes set'},
  {order:10,file:'10-pentagon.webp',w:1414,h:2000,slug:'pentagon',alt:'Shape flashcard for pentagon: one big pink pentagon with five straight sides and the word pentagon, from the Kiddo School shapes set'},
  {order:11,file:'11-hexagon.webp',w:1414,h:2000,slug:'hexagon',alt:'Shape flashcard for hexagon: one big teal hexagon with six straight sides and the word hexagon, from the Kiddo School shapes set'},
  {order:12,file:'12-octagon.webp',w:1414,h:2000,slug:'octagon',alt:'Shape flashcard for octagon: one big orange octagon with eight straight sides and the word octagon, from the Kiddo School shapes set'}
 ]
};

/* Parent-facing words, keyed by card slug. Each card gets its own intro,
   its own line to say together, one real-world shape hunt and one parent
   note — written for the shape it describes, never copied between cards. */
export const shapesCardContent={
 circle:{
  word:'Circle',
  intro:'The circle is the perfect first shape: no corners, no sides, just round and round. Wheels, plates, clocks, cookies — your home is full of them, which means your child can meet this card’s shape fifty times before lunch.',
  say:'A circle is round like a ball — no corners at all!',
  try:'Go on a circle hunt: find three round things together — a plate, a clock, a wheel — and tap each one gently. “Round and round, it’s a circle!”',
  note:'If your child calls every shape “circle”, enjoy the enthusiasm and name the others casually in play. The differences sort themselves out with repetition, not correction.',
  metaDescription:'Meet the circle shape flashcard: one big red circle, the word circle and a round-things hunt to try at home. Free to download and print.'
 },
 square:{
  word:'Square',
  intro:'Four sides, four corners, all the same length — the square is the shape of crackers, windows and sticky notes. It is usually the second shape children name, right after circle, because corners are so easy to count on it.',
  say:'A square has four sides — one, two, three, four!',
  try:'Count a square’s four sides with one finger, then hunt for four squares: a window, a cracker, a cushion, a book cover. Trace each one as you name it.',
  note:'Squares that are tilted still count. If a leaning square confuses your child, turn a cracker slowly in the air — “still a square!” — and watch the idea click.',
  metaDescription:'Meet the square shape flashcard: one big yellow square, four sides to count together and a four-squares hunt for home. Free to download.'
 },
 triangle:{
  word:'Triangle',
  intro:'Three sides, three corners, pointy and proud. Triangles are roofs, pizza slices and mountains in children’s drawings — and the word itself is a mouthful that three-year-olds love to get right.',
  say:'A triangle has three sides — point, point, point. Triangle!',
  try:'Make a triangle with your fingers (two thumbs and a pointer), then find triangles at home: a slice of pizza, a roof in a picture book, a triangle of cheese cut from a square.',
  note:'Long, skinny triangles still count. The rule is “three straight sides”, and saying that rule out loud once is plenty at this age.',
  metaDescription:'Meet the triangle shape flashcard: one big green triangle, three sides to count and a triangle hunt through books and lunch. Free to download.'
 },
 rectangle:{
  word:'Rectangle',
  intro:'A square’s long cousin: four sides, four corners, stretched out wide. Doors, books, tables and screens are rectangles, so this is the shape your child has been touching all day without knowing its name.',
  say:'A rectangle is a square that got stretched! Long and wide.',
  try:'Lay your hand flat on a table, then on a book — which feels longer? Hunt for rectangles: a door, a book, a phone or tablet, a rug. Say “rectangle” for each one.',
  note:'“A stretched square” is honest shape-talk at three — a real rectangle is a square with unequal sides, but the friendly version builds the idea perfectly for now.',
  metaDescription:'Meet the rectangle shape flashcard: one big stretched green rectangle, a stretched-square saying and a rectangle hunt around the house. Free to download.'
 },
 oval:{
  word:'Oval',
  intro:'The oval is a circle that has been gently stretched — egg-shaped, balloon-shaped, relaxed. It often arrives hand-in-hand with the circle in a child’s mind, as the shape that is “almost round but not quite”.',
  say:'An oval is a squished circle — like an egg!',
  try:'Roll an egg or a ball of playdough on the table: round, round... stretch! Now it is an oval. Then hunt for ovals — an egg, a balloon, a teaspoon bowl.',
  note:'Circle or oval mix-ups are completely normal — they are near twins. Stretching playdough from circle to oval with your hands makes the difference something your child can feel.',
  metaDescription:'Meet the oval shape flashcard: one big purple oval, the squished-circle saying and an egg-and-balloon oval hunt. Free to download and print.'
 },
 star:{
  word:'Star',
  intro:'Five points, sparkly reputation, instant favourite. The star may be the shape your child already knows best — stickers, drawings, night-sky books — which makes it the confidence-booster of this set.',
  say:'A star has five points! Count them with me: one, two, three, four, five.',
  try:'Count the star’s five points slowly, then draw stars in the air together. Tonight, look for the first star that appears out of the window — real stars are the best reward.',
  note:'Counting points on a star is sneaky fine-motor practice: pointing at skinny tips takes concentration. Wobbles are fine — the pointing is the point.',
  metaDescription:'Meet the star shape flashcard: one big five-pointed yellow star, points to count together and a first-star-of-the-night activity. Free to download.'
 },
 heart:{
  word:'Heart',
  intro:'The shape of love, drawings and handmade cards. Most three-year-olds meet the heart before any other shape because it comes attached to affection — and this card keeps that feeling: soft, warm and simple.',
  say:'A heart means I love you! Round on top, pointy at the bottom.',
  try:'Draw a heart on paper and let your child color it in for someone they love — a grandparent, a friend, the cat. Delivering it is part of the lesson.',
  note:'The heart is also a gentle feelings-word. If your child says “I love you” back mid-lesson, that IS the lesson working — drop the flashcards and enjoy it.',
  metaDescription:'Meet the heart shape flashcard: one big red heart, the shape that means I love you, plus a draw-and-deliver heart card activity. Free to download.'
 },
 diamond:{
  word:'Diamond',
  intro:'A square standing on its corner — pointy at the top, pointy at the bottom, like a kite climbing the wind. Preschoolers often meet this shape as the gem in a treasure chest or the pattern on socks.',
  say:'A diamond is a square standing on its point! Like a kite.',
  try:'Draw a simple kite on paper — the diamond shape with a little tail — and let your child color it. Then hunt for diamonds: kite pictures, gem drawings, patterns on clothes.',
  note:'This diamond is the kite shape (four equal sides), not a playing-card suit — though if your child spots diamonds on cards or socks, that counts too. Any real diamond found is a win.',
  metaDescription:'Meet the diamond shape flashcard: one big purple diamond standing on its point, a kite-drawing activity and a diamond hunt. Free to download.'
 },
 crescent:{
  word:'Crescent',
  intro:'The moon shape: a circle with a sleepy bite taken out of it. Bananas curve this way, moons in storybooks shine this way, and the word crescent is a lovely new sound for little mouths to try.',
  say:'A crescent is the moon’s shape — round with a bite out of it!',
  try:'At bathtime or dinner, curve a banana slice or a cucumber into view: “Crescent!” Then check tonight’s real moon — if it is crescent-shaped, you have found your shape in the sky.',
  note:'The moon is not always a crescent — it changes all month. Looking up together and asking “crescent tonight or circle tonight?” is the game, whatever the answer.',
  metaDescription:'Meet the crescent shape flashcard: one big yellow crescent moon, the circle-with-a-bite saying and a look-at-the-real-moon activity. Free to download.'
 },
 pentagon:{
  word:'Pentagon',
  intro:'Five straight sides, five corners — the biggest shape most three-year-olds have ever met. The word is a glorious mouthful, and getting “pentagon” out loud is half the fun and half the achievement.',
  say:'Pen-ta-gon! Five sides — count them: one, two, three, four, five.',
  try:'Count the pentagon’s five sides with one slow finger trip around the edge, then draw a five-sided house together — a pentagon house for a very lucky toy.',
  note:'Pentagons rarely appear in daily life, so this card is about the counting adventure, not spotting them at the shop. Five careful sides is the whole lesson.',
  metaDescription:'Meet the pentagon shape flashcard: one big pink pentagon with five sides to count and a five-sided-house drawing activity. Free to download.'
 },
 hexagon:{
  word:'Hexagon',
  intro:'Six sides, six corners — the bee’s favourite shape. Honeycombs are built from hexagons because they fit together perfectly, and that one fact turns this card into a story your child may retell for weeks.',
  say:'A hexagon has six sides — bees build with hexagons!',
  try:'Count the six sides slowly, then look at a honeycomb picture or the honey jar label together. Build a hexagon with six craft sticks or six blocks on the table.',
  note:'If six-sided building proves tricky, trace a coin six times in a ring — six touching circles leave a hexagon-shaped space in the middle. Bees would approve.',
  metaDescription:'Meet the hexagon shape flashcard: one big teal hexagon with six sides to count, the bees-build-with-hexagons story and a stick-building activity.'
 },
 octagon:{
  word:'Octagon',
  intro:'Eight sides — and one very famous job. The stop sign is an octagon, which makes this the shape with the best real-world game attached: every walk can become an octagon hunt.',
  say:'An octagon has eight sides — like a STOP sign!',
  try:'Count all eight sides together, then play stop-sign spotter on your next walk or drive. Every red octagon your child shouts “octagon!” at is a shape lesson in the wild.',
  note:'Eight is a big count and may run out of steam around six — finish the count yourself with a cheerful “...seven, eight!” and let your child chime in on the last side.',
  metaDescription:'Meet the octagon shape flashcard: one big orange octagon with eight sides, the stop-sign connection and a stop-sign spotting game. Free to download.'
 }
};
