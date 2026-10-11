// Kiddo School — Preschool 2 (Age 3): Numbers & Counting (1–10).
// Ten real cards uploaded by the owner to R2
// (flashcards/preschool-learning-cards/numbers-and-counting-age-3/).
// Dimensions probed from the actual files on 8 Oct 2026: cards 1–6 are
// 1414×2000 portrait, cards 7–10 are 2000×1414 LANDSCAPE, the cover is
// 1414×2000 portrait. Every card carries its own true w and h — the mixed
// orientations are respected everywhere, never cropped.
// NOTE for the owner: the task brief listed different filenames
// (04-four-ladybugs, 05-five-stars, 06-six-strawberries, 08-eight-hearts,
// 09-nine-smiley-faces, 10-ten-carrots). The bucket really contains
// four-cars / five-ladybugs / six-stars / seven-flowers / eight-frogs /
// nine-balloons / ten-butterflies — all object counts visually verified
// correct, so the class is built around the ACTUAL files.
// Every card shows numeral + number word + matching quantity (verified).

const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='flashcards/preschool-learning-cards/numbers-and-counting-age-3/';

export const numbersMeta={
 slug:'numbers-and-counting',
 group:'preschool',
 name:'Numbers 1–10',
 seoTitle:'Number Flashcards 1–10 for Preschoolers',
 h1:'Numbers 1–10 Flashcards',
 metaDescription:'Explore numbers 1 to 10 with colorful picture flashcards, counting prompts and simple activities. View, download and practice each number together.',
 lede:'Ten counting cards, one for every number from 1 to 10. Big numerals, number words and friendly pictures to count together — pick a card, count slowly and stop whenever your preschooler has had enough.',
 hubBlurb:'One to ten with apples, ducks and butterflies — each card has its own counting prompt and a page of its own.',
 ageLabel:'3–4 years',
 noun:'Preschoolers',
 useIdeas:[
  ['Counting to three is a whole lesson','At three, a calm count to three with pointing is real maths. You do not need all ten cards in one sitting — one, two and five are plenty for a first day.'],
  ['Point at every single thing','The heart of counting is one number per object. Point to each apple, duck or butterfly as you say its number, and go slowly enough for your child to see the rule.'],
  ['Start with your child’s favourite picture','Ducks, cars, balloons — let your child pick the card. Counting a picture they love holds attention twice as long as counting the “right” next number.'],
  ['Give today’s number a home','Tape the card of the day to the fridge at your child’s eye level. Passing it again and again, and counting it once more, is quietly powerful practice.']
 ],
 printPath:'/preschool/3-years/numbers-and-counting/print/',
 relatedSets:['alphabet','colors-and-shapes','first-concepts'],
 coverFile:'cover.webp',
 coverAlt:'The Counting Friends numbers 1–10 flashcard set cover, with a smiling banana, apple, grapes and orange'
};

export const numbersLesson={
 path:'/preschool/3-years/numbers-and-counting/',
 seoTitle:'Numbers & Counting 1–10 for 3 Year Olds',
 title:'Numbers & Counting 1–10 for 3 Year Olds',
 h1:'Numbers & Counting (1–10)',
 description:'Count from 1 to 10 with your preschooler using colorful number cards, printable number sheets to solve, number ordering and simple activities to try at home.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 2',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Numbers & Counting','/preschool/3-years/numbers-and-counting/']],
 schemaImage:R2+P+'cover.webp',
 ogImage:R2+P+'cover.webp',
 ogAlt:'The Counting Friends cover of the Kiddo School Numbers & Counting class: smiling fruit friends with the words Numbers 1–10',
 schema:{resourceType:'Interactive preschool class',level:'Preschool (age 3)',teaches:['Counting from 1 to 10','Number recognition 1–10','Counting one object per number','Putting numbers in order'],audience:'Parents and their three-year-olds',keywords:'numbers 1 to 10 for preschoolers, counting 1 to 10, number flashcards, number recognition activities, counting activities for 3 year olds, preschool counting games'},
 cover:{file:'cover.webp',w:1414,h:2000,alt:'The Counting Friends numbers 1–10 set cover — a smiling banana, apple, grapes and orange under the words Numbers 1–10'},
 folder:P,
 r2Base:R2,
 printables:{
  printEyebrow:'PRINTABLE NUMBER CARDS',
  pack:'Numbers 1–10 Flashcards: print all ten cards',
  meta:'Ten number cards, two to a printed page, in counting order from one to ten.',
  audience:'Made for age 3 and up — big numerals and easy-to-count pictures.',
  printAria:'The ten number flashcards, two to a page from one to ten'
 },
 cards:[
  {order:1,file:'01-one-apple.webp',w:1414,h:2000,numeral:'1',slug:'one',alt:'Number flashcard for 1: a big red numeral 1, the word one and one smiling cartoon apple, from the Kiddo School counting set'},
  {order:2,file:'02-two-ducks.webp',w:1414,h:2000,numeral:'2',slug:'two',alt:'Number flashcard for 2: a big blue numeral 2, the word two and two yellow rubber ducks, from the Kiddo School counting set'},
  {order:3,file:'03-three-cats.webp',w:1414,h:2000,numeral:'3',slug:'three',alt:'Number flashcard for 3: a big green numeral 3, the word three and three orange cats, from the Kiddo School counting set'},
  {order:4,file:'04-four-cars.webp',w:1414,h:2000,numeral:'4',slug:'four',alt:'Number flashcard for 4: a big orange numeral 4, the word four and four little blue cars, from the Kiddo School counting set'},
  {order:5,file:'05-five-ladybugs.webp',w:1414,h:2000,numeral:'5',slug:'five',alt:'Number flashcard for 5: a big purple numeral 5, the word five and five red ladybugs, from the Kiddo School counting set'},
  {order:6,file:'06-six-stars.webp',w:1414,h:2000,numeral:'6',slug:'six',alt:'Number flashcard for 6: a big teal numeral 6, the word six and six smiling yellow stars, from the Kiddo School counting set'},
  {order:7,file:'07-seven-flowers.webp',w:2000,h:1414,numeral:'7',slug:'seven',alt:'Number flashcard for 7: a big pink numeral 7, the word seven and seven smiling pink flowers, from the Kiddo School counting set'},
  {order:8,file:'08-eight-frogs.webp',w:2000,h:1414,numeral:'8',slug:'eight',alt:'Number flashcard for 8: a big blue numeral 8, the word eight and eight green frogs, from the Kiddo School counting set'},
  {order:9,file:'09-nine-balloons.webp',w:2000,h:1414,numeral:'9',slug:'nine',alt:'Number flashcard for 9: a big orange numeral 9, the word nine and nine red balloons in three rows, from the Kiddo School counting set'},
  {order:10,file:'10-ten-butterflies.webp',w:2000,h:1414,numeral:'10',slug:'ten',alt:'Number flashcard for 10: a big green numeral 10, the word ten and ten blue butterflies in two rows, from the Kiddo School counting set'}
 ]
};

/* Parent-facing words, keyed by card slug. Every card gets its own intro,
   its own counting line to say together, one off-screen activity and one
   parent note — written separately, never templated, because One Apple and
   Ten Butterflies are different moments in a child's day. */
export const numbersCardContent={
 one:{
  word:'One Apple',
  numeral:'1',
  cardTitle:'Number 1 Flashcard — Count One Apple',
  intro:'The first counting card starts with something your child already owns: one shiny apple. Before children count groups, they learn to notice single things — one nose, one cup, one you. This card makes “one” feel like a discovery, not a lesson.',
  say:'Look, one apple! Just one. Can you say one?',
  try:'Hunt for ones around your home today — one spoon, one shoe, one nose. Say “one!” softly each time. Hearing one attached to real, touchable things is how counting begins.',
  note:'If your child answers “two!” to everything, stay relaxed. Telling one from many is the real milestone at three; the exact numbers arrive on their own schedule.',
  metaDescription:'Meet number 1 with the one-apple flashcard: a big numeral 1, the word one and a smiling apple to count. Say it together and try a one-object hunt at home.'
 },
 two:{
  word:'Two Ducks',
  numeral:'2',
  cardTitle:'Number 2 Flashcard — Count Two Ducks',
  intro:'Two yellow ducks, side by side and ready to count. Two is where counting finds its rhythm — one, then the other — and pointing at each duck once while saying the number is the classic first count for a reason.',
  say:'Let’s point to each duck. One... two! Two ducks.',
  try:'Point to each duck once as you say “one, two.” Go slowly so your child can see that each duck gets exactly one number — that one-to-one rhythm matters more than getting the answer out.',
  note:'Counting and pointing at the same time is genuinely hard for threes. If it helps, hold their little hand and tap the ducks together — the skill builds gently, with company.',
  metaDescription:'Count to 2 with the two-ducks flashcard: a big numeral 2, the word two and two yellow ducks to point at. A gentle first count to try together.'
 },
 three:{
  word:'Three Cats',
  numeral:'3',
  cardTitle:'Number 3 Flashcard — Count Three Cats',
  intro:'Three orange cats — two sitting up top, one below. Three is small enough to count at a glance but big enough to feel like proper counting, and for a three-year-old, being “three cats” is a very good joke indeed.',
  say:'One, two, three — three cats! Can you count them with me?',
  try:'Arrange three small toys in a row and count them together, touching each one. Then shuffle them around and count again — three stays three no matter where the toys wander.',
  note:'If a recount lands on a different number, simply say the count again yourself, slowly and happily. Gentle repetition teaches more than correction ever will.',
  metaDescription:'Count to 3 with the three-cats flashcard: a big numeral 3, the word three and three orange cats to touch and count, with a row-of-three toy game.'
 },
 four:{
  word:'Four Cars',
  numeral:'4',
  cardTitle:'Number 4 Flashcard — Count Four Cars',
  intro:'Four little blue cars parked in a neat square. Vehicles are dependable favourites, and the two-by-two arrangement makes counting kind: two on top, two below, nothing hiding and nothing crowded.',
  say:'Vroom, vroom! Let’s count the cars: one, two, three, four.',
  try:'Count four objects slowly, touching each one — four blocks, four crackers, four socks. Touching while counting keeps busy fingers from racing ahead of the words.',
  note:'Four and five can feel like “just lots” to a three-year-old. That is exactly on track. Accuracy grows out of slow, playful counting — never out of pressure.',
  metaDescription:'Count to 4 with the four-cars flashcard: a big numeral 4, the word four and four blue cars in a tidy square, plus a touch-while-counting activity.'
 },
 five:{
  word:'Five Ladybugs',
  numeral:'5',
  cardTitle:'Number 5 Flashcard — Count Five Ladybugs',
  intro:'Five red ladybugs in two friendly rows. Five is the hand number — a whole hand of fingers — which makes it the natural finish line for a first counting session, and a very satisfying one to reach.',
  say:'Can we count the ladybugs together? One, two, three, four, five!',
  try:'Count the fingers on one hand, starting with the thumb, then seal it with a high-five: “Five! You did it!” The clap at the end makes five unforgettable.',
  note:'Counting to five in order, even with a wobble in the middle, is a proud age-three moment. Ending today’s class at five is not stopping early — it is a complete lesson.',
  metaDescription:'Count to 5 with the five-ladybugs flashcard: a big numeral 5, the word five and five red ladybugs, with a count-one-hand high-five activity to try.'
 },
 six:{
  word:'Six Stars',
  numeral:'6',
  cardTitle:'Number 6 Flashcard — Count Six Stars',
  intro:'Six smiling yellow stars in two rows of three. Six is the first number past a whole hand, and the tidy two-rows layout invites the loveliest trick in early counting: three, then three more.',
  say:'Six smiling stars! Let’s count them: one, two, three, four, five, six.',
  try:'Count three objects, then three more, and look at all six together. Two little groups becoming one bigger group is a child’s first taste of adding — discovered by counting, not taught.',
  note:'If your child counts a star twice, smile and begin again from one. Restarting a count is the actual skill at this age; landing on six first try is not.',
  metaDescription:'Count to 6 with the six-stars flashcard: a big numeral 6, the word six and six smiling stars, with a three-plus-three counting game for home.'
 },
 seven:{
  word:'Seven Flowers',
  numeral:'7',
  cardTitle:'Number 7 Flashcard — Count Seven Flowers',
  intro:'Seven pink flowers scattered across a wide card. Seven is famously the wobbly count — the jump past five trips up almost every little counter — so this card rewards going slowly more than any other.',
  say:'Let’s count the flowers slowly, all the way to seven.',
  try:'Place seven safe blocks or pebbles in a straight line and count each one. A line keeps track of what has been counted and what is still waiting — much kinder than a pile.',
  note:'This card is wider than it is tall, with flowers side by side. If the count tangles, count the top row first, then the bottom row, then start again — wobbling at seven is completely normal.',
  metaDescription:'Count to 7 with the seven-flowers flashcard: a big numeral 7, the word seven and seven pink flowers, with a line-of-seven blocks activity for home.'
 },
 eight:{
  word:'Eight Frogs',
  numeral:'8',
  cardTitle:'Number 8 Flashcard — Count Eight Frogs',
  intro:'Eight green frogs in two tidy rows of four. The neat grid is a gift for young counters: count one row, count the other row, and suddenly eight does not feel nearly as big as it sounds.',
  say:'Eight frogs in two rows! Ribbit. Let’s count them all.',
  try:'Count four objects in one group and four in another, then count everything together — four frogs here, four frogs there, eight frogs altogether. Then hop four hops and four more!',
  note:'Frogs invite play-acting, and moving while counting is a genuine help for restless children. A child who hops and counts to eight has done real work, even if they never sit still.',
  metaDescription:'Count to 8 with the eight-frogs flashcard: a big numeral 8, the word eight and eight green frogs in two rows, with a four-plus-four counting game.'
 },
 nine:{
  word:'Nine Balloons',
  numeral:'9',
  cardTitle:'Number 9 Flashcard — Count Nine Balloons',
  intro:'Nine red balloons in three neat columns of three. Nine is the last stop before ten, and this tidy layout is perfect for spotting little groups inside a big count — three rows make nine feel friendly.',
  say:'Nine balloons in three little rows! Let’s count them all the way.',
  try:'Arrange nine safe objects in three rows of three and count all of them together. Counting a tidy layout teaches far more than counting a scattered pile — neat beats many.',
  note:'Long counts test patience, and drifting away at six is allowed. The card will wait, the balloons will wait, and coming back later is how this actually works.',
  metaDescription:'Count to 9 with the nine-balloons flashcard: a big numeral 9, the word nine and nine red balloons in three rows, with a rows-of-three activity.'
 },
 ten:{
  word:'Ten Butterflies',
  numeral:'10',
  cardTitle:'Number 10 Flashcard — Count Ten Butterflies',
  intro:'Ten blue butterflies in two rows of five — a whole counting kingdom, and the finish line of the set. Reaching ten together deserves a drumroll, or at the very least a happy wiggle.',
  say:'Ten butterflies! Let’s count them slowly — all ten.',
  try:'Count the fingers on both hands together — ten is the number your child carries everywhere. Wiggle each finger as it gets its number, and clap for ten at the end.',
  note:'If ten is too many today, count five butterflies and stop there. Some of the very best first lessons with this card end at a happy high-five.',
  metaDescription:'Count to 10 with the ten-butterflies flashcard: a big numeral 10, the word ten and ten blue butterflies, with a count-both-hands activity to finish the set.'
 }
};
