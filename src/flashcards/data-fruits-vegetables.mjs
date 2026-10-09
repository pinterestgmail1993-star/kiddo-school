// Kiddo School — Preschool 8 (Age 3): Fruits & Vegetables.
// Sixteen real cards uploaded by the owner to R2
// (flashcards/preschool-learning-cards/fruits-and-vegetables-age-3/):
// eight fruits (apple, banana, orange, strawberry, grapes, watermelon,
// pineapple, mango) and eight vegetables (carrot, potato, tomato, cucumber,
// broccoli, corn, onion, pumpkin). Dimensions probed from the actual files
// on 9 Oct 2026: every card is 1240×1748 portrait. The folder has NO cover
// file, so the set cover is the owner's real strawberry card (the same
// precedent as the Colors class). Nothing here is invented: each card points
// at its real file with its real pixels and its own parent-facing words.

const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='flashcards/preschool-learning-cards/fruits-and-vegetables-age-3/';
const W=1240,H=1748;

export const fruitsMeta={
 slug:'fruits-and-vegetables',
 group:'preschool',
 name:'Fruits & Vegetables Flashcards',
 seoTitle:'Fruit & Vegetable Flashcards for Preschoolers | 16 Cards',
 h1:'Fruit & Vegetable Flashcards for Preschoolers',
 metaDescription:'Sixteen fruit and vegetable flashcards for preschoolers: apple, banana, carrot, broccoli and more — each card has its own page with parent prompts and a free download.',
 lede:'Sixteen cards about the foods children see every day: eight fruits, eight vegetables, every one with its own page, the words to say together and one thing to try at snack time.',
 hubBlurb:'Sixteen foods children already know — eight fruits, eight vegetables — with sorting games, color rows and snack-time activities.',
 ageLabel:'3–4 years',
 noun:'Preschoolers',
 downloadHint:'Every card page has its own download button with the full-size image, ready for kitchen-table sorting games.',
 useIdeas:[
  ['Name it, then find it in the kitchen','The pair is the whole lesson: “apple!” — then hunt the fruit bowl together. The word sticks when the real food lands in your child’s hand.'],
  ['Sort the cards, then sort the snack','Fruit cards on one plate, vegetable cards on another — then do it for real with an apple and a carrot. Sorting food is a game children can eat.'],
  ['Play the color rows','Which foods are red? Which are green? Lay the cards out in color rows together — the kitchen becomes a rainbow.'],
  ['Take one card shopping','Hand your child the carrot card at the market and let them find its twin in the pile. One matched carrot is a whole class.']
 ],
 printPath:'/preschool/3-years/fruits-and-vegetables/print/',
 relatedSets:['body-parts-and-five-senses','animal-sounds','first-concepts'],
 coverFile:'04-strawberry.webp',
 coverAlt:'Cover of the Fruits & Vegetables flashcards set: the owner’s bright red strawberry card with the word strawberry'
};

export const fruitsLesson={
 path:'/preschool/3-years/fruits-and-vegetables/',
 seoTitle:'Fruits & Vegetables for 3 Year Olds',
 title:'Fruits & Vegetables for 3 Year Olds',
 h1:'Fruits & Vegetables',
 description:'Learn fruits and vegetables with your preschooler: sixteen picture cards, a fruit-or-vegetable sorting game, find-the-food and matching play, color rows, counting together and kitchen activities — no scores, no sign-up.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 8',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Fruits & Vegetables','/preschool/3-years/fruits-and-vegetables/']],
 schemaImage:R2+P+'04-strawberry.webp',
 ogImage:R2+P+'04-strawberry.webp',
 ogAlt:'The Fruits & Vegetables class cover from Kiddo School: the bright red strawberry flashcard with the word strawberry',
 schema:{resourceType:'Interactive preschool class',level:'Preschool (age 3)',teaches:['Naming eight fruits: apple, banana, orange, strawberry, grapes, watermelon, pineapple and mango','Naming eight vegetables: carrot, potato, tomato, cucumber, broccoli, corn, onion and pumpkin','Sorting foods into fruits and vegetables','Grouping foods by color and counting foods together'],audience:'Parents and their three-year-olds',keywords:'fruits and vegetables for 3 year olds, food flashcards for preschoolers, fruit and vegetable activities, healthy eating for toddlers, sorting fruits and vegetables, food games for kids, teach vegetables to preschoolers, food themed activities for preschool'},
 cover:{file:'04-strawberry.webp',w:1240,h:1748,alt:'The bright red strawberry card with the word strawberry — the cover food of the Fruits & Vegetables set'},
 folder:P,
 r2Base:R2,
 printables:{
  printEyebrow:'PRINTABLE FRUIT & VEGETABLE CARDS',
  pack:'Fruits & Vegetables Flashcards: print all sixteen cards',
  meta:'Sixteen food cards, two to a printed page — eight fruits and eight vegetables, ready for the kitchen table.',
  audience:'Made for age 3 and up — one clear picture per card, kept in card order.',
  printAria:'The sixteen fruit and vegetable flashcards, two to a page'
 },
 cards:[
  {order:1,file:'01-apple.webp',w:W,h:H,slug:'apple',alt:'Fruit flashcard: a shiny red apple with a green leaf and the word apple, from the Kiddo School fruits and vegetables set'},
  {order:2,file:'02-banana.webp',w:W,h:H,slug:'banana',alt:'Fruit flashcard: a yellow banana and the word banana, from the Kiddo School fruits and vegetables set'},
  {order:3,file:'03-orange.webp',w:W,h:H,slug:'orange',alt:'Fruit flashcard: a round orange with a green leaf and the word orange, from the Kiddo School fruits and vegetables set'},
  {order:4,file:'04-strawberry.webp',w:W,h:H,slug:'strawberry',alt:'Fruit flashcard: a bright red strawberry with seeds and a green crown and the word strawberry, from the Kiddo School fruits and vegetables set'},
  {order:5,file:'05-grapes.webp',w:W,h:H,slug:'grapes',alt:'Fruit flashcard: a bunch of purple grapes and the word grapes, from the Kiddo School fruits and vegetables set'},
  {order:6,file:'06-watermelon.webp',w:W,h:H,slug:'watermelon',alt:'Fruit flashcard: a watermelon slice with green rind, red flesh and black seeds and the word watermelon, from the Kiddo School fruits and vegetables set'},
  {order:7,file:'07-pineapple.webp',w:W,h:H,slug:'pineapple',alt:'Fruit flashcard: a yellow pineapple with a spiky green crown and the word pineapple, from the Kiddo School fruits and vegetables set'},
  {order:8,file:'08-mango.webp',w:W,h:H,slug:'mango',alt:'Fruit flashcard: a yellow-orange mango with a green leaf and the word mango, from the Kiddo School fruits and vegetables set'},
  {order:9,file:'09-carrot.webp',w:W,h:H,slug:'carrot',alt:'Vegetable flashcard: an orange carrot with a green leafy top and the word carrot, from the Kiddo School fruits and vegetables set'},
  {order:10,file:'10-potato.webp',w:W,h:H,slug:'potato',alt:'Vegetable flashcard: a brown potato with little spots and the word potato, from the Kiddo School fruits and vegetables set'},
  {order:11,file:'11-tomato.webp',w:W,h:H,slug:'tomato',alt:'Vegetable flashcard: a round red tomato with a green stem and the word tomato, from the Kiddo School fruits and vegetables set'},
  {order:12,file:'12-cucumber.webp',w:W,h:H,slug:'cucumber',alt:'Vegetable flashcard: a long green cucumber and the word cucumber, from the Kiddo School fruits and vegetables set'},
  {order:13,file:'13-broccoli.webp',w:W,h:H,slug:'broccoli',alt:'Vegetable flashcard: a green broccoli tree and the word broccoli, from the Kiddo School fruits and vegetables set'},
  {order:14,file:'14-corn.webp',w:W,h:H,slug:'corn',alt:'Vegetable flashcard: a yellow corn cob with green husk leaves and the word corn, from the Kiddo School fruits and vegetables set'},
  {order:15,file:'15-onion.webp',w:W,h:H,slug:'onion',alt:'Vegetable flashcard: a round brown onion and the word onion, from the Kiddo School fruits and vegetables set'},
  {order:16,file:'16-pumpkin.webp',w:W,h:H,slug:'pumpkin',alt:'Vegetable flashcard: a big orange pumpkin with a stem and the word pumpkin, from the Kiddo School fruits and vegetables set'}
 ]
};

/* Parent-facing words, keyed by card slug. Every card gets its own intro,
   its own line to say together, one real-world activity, one parent note
   and its own search description — written for the food it belongs to,
   never copied between cards. */
export const fruitsCardContent={
 'apple':{
  word:'Apple',
  cardTitle:'Apple Flashcard — the crunch card for Preschoolers',
  intro:'A shiny red apple with a leaf still on — the fruit most children name first. The word apple sits under it, and there is probably one within reach of your kitchen right now.',
  say:'Apple! Crunch, crunch — can you say apple?',
  try:'Hold a real apple in both hands: it is heavy, smooth and cold. Then count the apples in your fruit bowl together.',
  note:'Apples come in red, green and yellow — if your apple looks different from the card, that is a wonderful conversation, not a mistake.',
  metaDescription:'Meet the apple fruit flashcard: a shiny red apple with the word apple, a hold-and-count game and parent prompts. Free to download and print.'
 },
 'banana':{
  word:'Banana',
  cardTitle:'Banana Flashcard — the peel card for Preschoolers',
  intro:'A cheerful yellow banana, curved like a smile. The word banana sits under it — a long word that children love to stretch: ba-na-na!',
  say:'Banana! Ba-na-na — clap once for every part of the word!',
  try:'Peel a banana together, top by top like a monkey. Bananas are one of the first foods children can peel by themselves.',
  note:'A banana’s peel turns spotty as it ripens — sweeter inside. Spots are a sign, not a problem.',
  metaDescription:'Meet the banana fruit flashcard: a yellow banana with the word banana, a peel-it-like-a-monkey game and parent prompts. Free to download and print.'
 },
 'orange':{
  word:'Orange',
  cardTitle:'Orange Flashcard — the smell-first card for Preschoolers',
  intro:'A round orange with a green leaf — the only food whose name is also its color. The word orange sits under it, and the smell begins before the peel is even off.',
  say:'Orange! Sniff it first — oranges smell sunny. Now say orange!',
  try:'Roll an orange on the table, then smell your hands. The smell comes from the peel — the smelliest part of any fruit.',
  note:'One word, two meanings: the fruit and the color. When your child paints an orange orange, both meanings are working at once.',
  metaDescription:'Meet the orange fruit flashcard: a round orange with the word orange, a roll-and-smell game and parent prompts. Free to download and print.'
 },
 'strawberry':{
  word:'Strawberry',
  cardTitle:'Strawberry Flashcard — the seeds-outside card for Preschoolers',
  intro:'A bright red strawberry with its green crown and its seeds showing — the only fruit that wears its seeds on the outside. The word strawberry sits under it, looking exactly like summer.',
  say:'Strawberry! A long word for a little berry — straw-ber-ry!',
  try:'Look at a real strawberry with your eyes only: count the seeds if you can — there are too many! That is why strawberries are so bumpy.',
  note:'Strawberries are the card your child will recognize fastest in any supermarket — hand them the card and let them find the twin.',
  metaDescription:'Meet the strawberry fruit flashcard: a bright red strawberry with the word strawberry, a seed-spotting game and parent prompts. Free to download and print.'
 },
 'grapes':{
  word:'Grapes',
  cardTitle:'Grapes Flashcard — the sharing bunch card for Preschoolers',
  intro:'A whole bunch of purple grapes — one word for many little balls. The word grapes sits under them, and grapes are the classic sharing food: one for you, one for me.',
  say:'Grapes! A bunch of grapes — one, two, three… so many!',
  try:'Share a bunch: you take one, your child takes one. Count the first three together, then let the counting wander.',
  note:'Grapes are round, smooth and roll — a natural lesson in why we sit down to eat. Cut them small for little mouths.',
  metaDescription:'Meet the grapes fruit flashcard: a purple bunch with the word grapes, a sharing-and-counting game and parent prompts. Free to download and print.'
 },
 'watermelon':{
  word:'Watermelon',
  cardTitle:'Watermelon Flashcard — the summer-slice card for Preschoolers',
  intro:'A watermelon slice with green rind, red flesh and shiny black seeds — the biggest word on the biggest fruit. The word watermelon sits under it, ready for the hottest day.',
  say:'Watermel-on! A big word for a big fruit — wa-ter-mel-on!',
  try:'Tap the seeds on the card: one, two, three… then tap the red part and say red, the green part and say green.',
  note:'The rind is green, the flesh is red and the seeds are black — one slice, three colors. Watermelon is a whole color lesson wearing a snack.',
  metaDescription:'Meet the watermelon fruit flashcard: a red-and-green slice with the word watermelon, a three-color game and parent prompts. Free to download and print.'
 },
 'pineapple':{
  word:'Pineapple',
  cardTitle:'Pineapple Flashcard — the crown card for Preschoolers',
  intro:'A golden pineapple with a spiky green crown — the fanciest hat in the fruit bowl. The word pineapple sits under it, bumpy on the outside and sweet on the inside.',
  say:'Pineapple! It wears a crown — pine-apple!',
  try:'Feel a real pineapple if you can find one: bumpy, hard and heavy. Then feel a banana next to it — smooth and soft. Two fruits, two feelings.',
  note:'Pineapples grow in the ground, not in trees — the crown just looks royal. Children love knowing a secret like that.',
  metaDescription:'Meet the pineapple fruit flashcard: a golden pineapple with a green crown and the word pineapple, a bumpy-and-smooth game and parent prompts. Free to download and print.'
 },
 'mango':{
  word:'Mango',
  cardTitle:'Mango Flashcard — the golden card for Preschoolers',
  intro:'A golden-yellow mango with a green leaf — the sweetest word to say slowly: mmmm-mango. The word mango sits under it, blushing orange where the sun would have caught it.',
  say:'Mmm-mango! Say it slowly and happily — mango!',
  try:'Mangos feel soft when they are ready. Squeeze one very gently together — like a cheek. That softness means sweet inside.',
  note:'Mangos have a big flat seed inside — when your child finds it, that is the mango’s secret treasure.',
  metaDescription:'Meet the mango fruit flashcard: a golden mango with the word mango, a gentle-squeeze game and parent prompts. Free to download and print.'
 },
 'carrot':{
  word:'Carrot',
  cardTitle:'Carrot Flashcard — the crunch-underground card for Preschoolers',
  intro:'An orange carrot with a leafy green top — the vegetable that grows hiding underground. The word carrot sits under it, pointy at the bottom and leafy at the top.',
  say:'Carrot! Crunch like a rabbit — crunch, crunch!',
  try:'Munch a carrot stick like a rabbit — carrots are the classic first crunchy vegetable. Where were the carrots growing? Down in the dark soil!',
  note:'Carrots are orange because of the sunshine-colored stuff inside them — the same thing that makes them good for your eyes.',
  metaDescription:'Meet the carrot vegetable flashcard: an orange carrot with the word carrot, a crunch-like-a-rabbit game and parent prompts. Free to download and print.'
 },
 'potato':{
  word:'Potato',
  cardTitle:'Potato Flashcard — the spotty card for Preschoolers',
  intro:'A brown potato with little spots — lumpy, bumpy and proud of it. The word potato sits under it, and potatoes grow underground just like carrots, hiding from the birds.',
  say:'Potato! Say it with a bounce: po-TAY-to!',
  try:'Hold a raw potato: it is heavy, dusty and hard. Then look at a cooked one — soft and steaming. Same potato, two completely different feelings.',
  note:'Potatoes grow eyes — little spots that could become new plants. It is the friendliest vegetable fact there is.',
  metaDescription:'Meet the potato vegetable flashcard: a spotty brown potato with the word potato, a raw-versus-cooked game and parent prompts. Free to download and print.'
 },
 'tomato':{
  word:'Tomato',
  cardTitle:'Tomato Flashcard — the kitchen-vegetable card for Preschoolers',
  intro:'A round red tomato with a little green star on top — shiny as a bauble. The word tomato sits under it, and tomatoes live in salads, sauces and lunchboxes everywhere.',
  say:'Tomato! Say it twice: tomato… tomahto! Both are right.',
  try:'Find the tomato’s little green crown — every tomato wears one. Then roll it very gently across the table: round things roll.',
  note:'Scientists call the tomato a fruit because it grows from a flower; cooks call it a vegetable because it belongs in dinner. This class follows the kitchen — and now your child knows the argument too.',
  metaDescription:'Meet the tomato vegetable flashcard: a round red tomato with the word tomato, a roll-and-find-the-crown game and parent prompts. Free to download and print.'
 },
 'cucumber':{
  word:'Cucumber',
  cardTitle:'Cucumber Flashcard — the cool-green card for Preschoolers',
  intro:'A long green cucumber — the coolest vegetable in the bowl. The word cucumber sits under it, long and smooth with bumpy skin like its cousin the watermelon.',
  say:'Cucumber! A cool, crunchy cue-cum-ber!',
  try:'Cucumbers are mostly water — that is why they feel cool. Hold a slice on the back of your hand for a cool little surprise.',
  note:'Cucumber and watermelon are cousins: same bumpy green skin, same cool crunch inside. Families exist in the vegetable drawer too.',
  metaDescription:'Meet the cucumber vegetable flashcard: a long green cucumber with the word cucumber, a cool-slice game and parent prompts. Free to download and print.'
 },
 'broccoli':{
  word:'Broccoli',
  cardTitle:'Broccoli Flashcard — the little-tree card for Preschoolers',
  intro:'A green broccoli that looks exactly like a tiny tree — the vegetable children most love to pretend with. The word broccoli sits under it, all leafy and lumpy at the top.',
  say:'Broccoli! Eat a little tree — chomp, chomp!',
  try:'Hold broccoli upside down: it is a tree, and your fingers are the trunk. Take a bite off a branch — trees are for munching.',
  note:'Broccoli is a flower your child can eat — the little bumpy bits are hundreds of tiny buds. Trees, flowers and dinner all in one.',
  metaDescription:'Meet the broccoli vegetable flashcard: a green little-tree with the word broccoli, an eat-a-tree game and parent prompts. Free to download and print.'
 },
 'corn':{
  word:'Corn',
  cardTitle:'Corn Flashcard — the yellow-bricks card for Preschoolers',
  intro:'A corn cob in its green husk, kernels lined up like little yellow bricks. The word corn sits under it, and every kernel is a seed that pops or crunches.',
  say:'Corn! Count the kernels you can see — one, two, three… rows and rows!',
  try:'Look at the rows on the card: the kernels sit in straight lines. Then eat corn on the cob and munch across a row like a typewriter.',
  note:'Corn comes in its own wrapper — the husk. Peeling the green leaves back is half of the fun, like unwrapping a present.',
  metaDescription:'Meet the corn vegetable flashcard: a yellow corn cob in its husk with the word corn, a munch-a-row game and parent prompts. Free to download and print.'
 },
 'onion':{
  word:'Onion',
  cardTitle:'Onion Flashcard — the layers card for Preschoolers',
  intro:'A round brown onion, papery on the outside and full of secrets inside. The word onion sits under it — the vegetable that hides layer under layer.',
  say:'Onion! Say it from your belly: UN-yun!',
  try:'Peel an onion together, skin by skin — layers and layers! Smell your hands after: onions have the strongest smell in the drawer.',
  note:'Onions can make your eyes water — a real chemical superpower. It is the plant protecting itself, and a fascinating thing to watch from a safe step away.',
  metaDescription:'Meet the onion vegetable flashcard: a round brown onion with the word onion, a peel-the-layers game and parent prompts. Free to download and print.'
 },
 'pumpkin':{
  word:'Pumpkin',
  cardTitle:'Pumpkin Flashcard — the big-orange card for Preschoolers',
  intro:'A big orange pumpkin with a sturdy stem — the largest vegetable on the cards and a season all by itself. The word pumpkin sits under it, round and ribbed and ready.',
  say:'Pumpkin! A big round word for a big round vegetable — PUM-kin!',
  try:'Pat a pumpkin like a drum: hard and hollow. Then try to lift one — pumpkins are heavier than they look.',
  note:'Inside every pumpkin are hundreds of seeds — scoop them out, wash them and count them together. A pumpkin is a counting game wearing an orange coat.',
  metaDescription:'Meet the pumpkin vegetable flashcard: a big orange pumpkin with the word pumpkin, a pat-and-lift game and parent prompts. Free to download and print.'
 }
};
