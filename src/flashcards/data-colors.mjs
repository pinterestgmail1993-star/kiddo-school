// Kiddo School — Preschool 4 (Age 3): Colors & Color Mixing.
// Twenty-four real cards uploaded by the owner to R2
// (flashcards/preschool-learning-cards/colors-and-color-mixing-age-3/):
// twelve color splash cards (01–12) and twelve matching picture cards
// (13–24). Dimensions probed from the actual files on 8 Oct 2026: every
// file is 1414×2000 portrait. The splash and picture for each color are
// kept as a pair — the flashcard set has twelve cards (one per color),
// and every color card page shows BOTH faces.
// NOTE: this folder has no cover.webp — the set cover is the owner's
// 12-rainbow-splash.webp card (a real file from the same folder).
// Nothing here is invented: each card points at its real file with its
// real pixels and its own parent-facing words.

const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='flashcards/preschool-learning-cards/colors-and-color-mixing-age-3/';

export const colorsMeta={
 slug:'colors',
 group:'preschool',
 name:'Colors & Color Mixing',
 seoTitle:'Color Flashcards for Preschoolers | 12 Colors',
 h1:'Color Flashcards for Preschoolers',
 metaDescription:'Twelve color flashcards for preschoolers: a color splash and a real-world picture for red, blue, yellow, green and more, with color hunts, mixing games and activities for home.',
 lede:'Twelve color cards with two faces each: a big paint splash with the color word, and a matching picture from real life — a red apple, a blue car, a yellow sun. Name the color, find the picture, then go find the color in your house.',
 hubBlurb:'Twelve colors from red to rainbow, each with a splash card, a matching picture card and its own page.',
 ageLabel:'3–4 years',
 noun:'Preschoolers',
 useIdeas:[
  ['One color a day is plenty','Show the red splash in the morning, find red things all day, and let the set rest. A color that gets a whole day of spotting sticks far better than twelve colors in one sitting.'],
  ['Start from the splash, land on the picture','Say the color at the splash — a pure, unmissable red — then move to the picture card, where the same color sits on a real thing. Splash first, world second, is the whole method.'],
  ['Let your child play the teacher','Hand your child the cards and let them quiz YOU. Getting one wrong on purpose — “is this blue? no, it’s green!” — is the game three-year-olds never tire of.'],
  ['Give the color a home','Tape today’s color card to the fridge at child height. Every trip past the fridge is one more quiet repetition, and repetitions — not sessions — are what make color words stick.']
 ],
 printPath:'/preschool/3-years/colors-and-color-mixing/print/',
 relatedSets:['colors-and-shapes','shapes','numbers-and-counting'],
 coverFile:'12-rainbow-splash.webp',
 coverAlt:'The Colors flashcard set cover: a rainbow paint splash with every color of the rainbow and the word rainbow'
};

export const colorsLesson={
 path:'/preschool/3-years/colors-and-color-mixing/',
 seoTitle:'Colors & Color Mixing for 3 Year Olds',
 title:'Colors & Color Mixing for 3 Year Olds',
 h1:'Colors & Color Mixing',
 description:'Learn colors with your preschooler using color splash and picture cards, a rainbow to explore, printable color sheets to solve and color hunts to try at home.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 4',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Colors & Color Mixing','/preschool/3-years/colors-and-color-mixing/']],
 schemaImage:R2+P+'12-rainbow-splash.webp',
 ogImage:R2+P+'12-rainbow-splash.webp',
 ogAlt:'The rainbow splash cover of the Kiddo School Colors & Color Mixing class: every rainbow color flowing in one paint splash',
 schema:{resourceType:'Interactive preschool class',level:'Preschool (age 3)',teaches:['Naming colors: red, blue, yellow, green, orange, purple, pink, brown, black, white, gray','Matching a color to real-world objects','Mixing paint colors: red + yellow = orange, blue + yellow = green, red + blue = purple','The six rainbow colors in order'],audience:'Parents and their three-year-olds',keywords:'colors for preschoolers, colors for 3 year olds, color flashcards, color recognition activities, color mixing for kids, preschool color games, rainbow colors for kids'},
 cover:{file:'12-rainbow-splash.webp',w:1414,h:2000,alt:'The rainbow splash card — every color of the rainbow in one paint splash with the word rainbow'},
 folder:P,
 r2Base:R2,
 printables:{
  printEyebrow:'PRINTABLE COLOR CARDS',
  pack:'Color Flashcards: print all twelve color pairs',
  meta:'Twelve colors, each printed as a paint splash card beside its matching picture card, from red to rainbow.',
  audience:'Made for age 3 and up — one color per page, splash and picture side by side.',
  printAria:'The twelve color flashcard pairs, splash and picture together, from red to rainbow'
 },
 cards:[
  {order:1,file:'01-red-splash.webp',w:1414,h:2000,slug:'red',picFile:'13-red-apple.webp',picAlt:'Red picture flashcard: a shiny red apple with a green leaf and the word red, from the Kiddo School colors set',alt:'Red color splash flashcard: one big red paint splash with the word red, from the Kiddo School colors set'},
  {order:2,file:'02-blue-splash.webp',w:1414,h:2000,slug:'blue',picFile:'14-blue-car.webp',picAlt:'Blue picture flashcard: a little blue car with the word blue, from the Kiddo School colors set',alt:'Blue color splash flashcard: one big blue paint splash with the word blue, from the Kiddo School colors set'},
  {order:3,file:'03-yellow-splash.webp',w:1414,h:2000,slug:'yellow',picFile:'15-yellow-sun.webp',picAlt:'Yellow picture flashcard: a big smiling yellow sun with the word yellow, from the Kiddo School colors set',alt:'Yellow color splash flashcard: one big yellow paint splash with the word yellow, from the Kiddo School colors set'},
  {order:4,file:'04-green-splash.webp',w:1414,h:2000,slug:'green',picFile:'16-green-leaf.webp',picAlt:'Green picture flashcard: one big green leaf with the word green, from the Kiddo School colors set',alt:'Green color splash flashcard: one big green paint splash with the word green, from the Kiddo School colors set'},
  {order:5,file:'05-orange-splash.webp',w:1414,h:2000,slug:'orange',picFile:'17-orange-fruit.webp',picAlt:'Orange picture flashcard: a round orange fruit with a green leaf and the word orange, from the Kiddo School colors set',alt:'Orange color splash flashcard: one big orange paint splash with the word orange, from the Kiddo School colors set'},
  {order:6,file:'06-purple-splash.webp',w:1414,h:2000,slug:'purple',picFile:'18-purple-flower.webp',picAlt:'Purple picture flashcard: a five-petal purple flower with the word purple, from the Kiddo School colors set',alt:'Purple color splash flashcard: one big purple paint splash with the word purple, from the Kiddo School colors set'},
  {order:7,file:'07-pink-splash.webp',w:1414,h:2000,slug:'pink',picFile:'19-pink-flower.webp',picAlt:'Pink picture flashcard: a five-petal pink flower with the word pink, from the Kiddo School colors set',alt:'Pink color splash flashcard: one big pink paint splash with the word pink, from the Kiddo School colors set'},
  {order:8,file:'08-brown-splash.webp',w:1414,h:2000,slug:'brown',picFile:'20-brown-teddy-bear.webp',picAlt:'Brown picture flashcard: a smiling brown teddy bear with the word brown, from the Kiddo School colors set',alt:'Brown color splash flashcard: one big brown paint splash with the word brown, from the Kiddo School colors set'},
  {order:9,file:'09-black-splash.webp',w:1414,h:2000,slug:'black',picFile:'21-black-cat.webp',picAlt:'Black picture flashcard: a black cat with yellow eyes and the word black, from the Kiddo School colors set',alt:'Black color splash flashcard: one big black paint splash with the word black, from the Kiddo School colors set'},
  {order:10,file:'10-white-splash.webp',w:1414,h:2000,slug:'white',picFile:'22-white-cloud.webp',picAlt:'White picture flashcard: one puffy white cloud with the word white, from the Kiddo School colors set',alt:'White color splash flashcard: one big white paint splash with the word white, from the Kiddo School colors set'},
  {order:11,file:'11-gray-splash.webp',w:1414,h:2000,slug:'gray',picFile:'23-gray-elephant.webp',picAlt:'Gray picture flashcard: a gentle gray elephant with the word gray, from the Kiddo School colors set',alt:'Gray color splash flashcard: one big gray paint splash with the word gray, from the Kiddo School colors set'},
  {order:12,file:'12-rainbow-splash.webp',w:1414,h:2000,slug:'rainbow',picFile:'24-rainbow.webp',picAlt:'Rainbow picture flashcard: a big arched rainbow across the sky with the word rainbow, from the Kiddo School colors set',alt:'Rainbow color splash flashcard: one big paint splash striped with every rainbow color and the word rainbow, from the Kiddo School colors set'}
 ]
};

/* Parent-facing words, keyed by card slug. Each color gets its own intro,
   its own line to say together, one real-world activity and one parent
   note — written for that color, never copied between cards. sayPic is
   the line for the picture card inside the class viewer. */
export const colorsCardContent={
 red:{
  word:'Red',
  cardTitle:'Red Flashcard — Red Splash and Red Apple for Preschoolers',
  picWord:'Red apple',
  intro:'Red is usually the first color a child names — it is loud, warm and everywhere: strawberries, fire trucks, stop signs and this big shiny apple. The splash card gives your child the pure color, and the apple gives it something real to hold onto.',
  say:'Red! Can you find something red near you?',
  try:'Snack-time red hunt: an apple, a strawberry, a tomato. Line up the red things and say “red” each time — then eat the evidence.',
  note:'Red is a high-energy color, so red play often gets loud. That is fine — naming colors while wiggling is still naming colors.',
  sayPic:'A red apple! Red like the splash — can you say red?',
  metaDescription:'Meet the red color flashcard: a big red splash and a shiny red apple, with a find-something-red snack hunt for home. Free to download and print.'
 },
 blue:{
  word:'Blue',
  cardTitle:'Blue Flashcard — Blue Splash and Blue Car for Preschoolers',
  picWord:'Blue car',
  intro:'Blue is the color of the biggest things your child can see — the sky and the sea — and of small everyday things too: blueberries, jeans and this little blue car. It is a calm color, and an easy one to spot on any walk.',
  say:'Blue! Look up — the sky is blue today.',
  try:'On your next walk, count blue cars together. One blue car is a win; five is a parade.',
  note:'Sky blue and car blue are both “blue” at this age. The fine differences between shades can wait years — the big word comes first.',
  sayPic:'A blue car, beep beep! Blue like the splash.',
  metaDescription:'Meet the blue color flashcard: a big blue splash and a little blue car, with a blue-car-spotting walk to try together. Free to download.'
 },
 yellow:{
  word:'Yellow',
  cardTitle:'Yellow Flashcard — Yellow Splash and Yellow Sun for Preschoolers',
  picWord:'Yellow sun',
  intro:'Yellow is the color children announce at full volume: the sun, bananas, ducklings and school buses. This card pairs the brightest splash in the set with the sun — the biggest yellow thing there is.',
  say:'Yellow! Like the sun — can you make a big round sun with your arms?',
  try:'Yellow snack hunt: a banana, sweetcorn, a yellow pepper. Name each one — “yellow banana!” — before it disappears.',
  note:'Yellow can look pale on white paper but leaps out in the real world — sun, egg yolks, dandelions. Real things teach this color best.',
  sayPic:'The yellow sun, high in the sky! Yellow like the splash.',
  metaDescription:'Meet the yellow color flashcard: a big yellow splash and a smiling yellow sun, plus a yellow-snack hunt for home. Free to download and print.'
 },
 green:{
  word:'Green',
  cardTitle:'Green Flashcard — Green Splash and Green Leaf for Preschoolers',
  picWord:'Green leaf',
  intro:'Green is the color of growing things — grass, leaves, broccoli and peas. It is also the color children meet with their whole body: rolling down a grassy hill absolutely counts as green practice.',
  say:'Green! Like grass and leaves — can you stomp like you are walking on grass?',
  try:'Find five green things outside: a leaf, the grass, a bush, a green door, a beetle if you are lucky. One color, one walk, five finds.',
  note:'Dark green and light green are both green for now. If your child asks why, enjoy it — “greens like to hide inside each other” is a fine answer.',
  sayPic:'A green leaf! Green like the splash.',
  metaDescription:'Meet the green color flashcard: a big green splash and a green leaf, with a five-green-things walk to try together. Free to download.'
 },
 orange:{
  word:'Orange',
  cardTitle:'Orange Flashcard — Orange Splash and Orange Fruit for Preschoolers',
  picWord:'Orange fruit',
  intro:'Orange is the color named after its own fruit, which makes it the easiest color to teach: hold up an orange and the word does half the work. Carrots, pumpkins and this card’s orange fruit keep it company.',
  say:'Orange! An orange is orange — the fruit gave the color its name.',
  try:'Peel an orange together and name the color at every step: the orange peel, the orange segments, the orange juice fingers afterwards.',
  note:'Orange is a mixing star — red paint and yellow paint make orange. Keep this card handy for the mixing game later in the class.',
  sayPic:'An orange! The fruit that gave orange its name.',
  metaDescription:'Meet the orange color flashcard: a big orange splash and a real orange fruit, with a peel-and-name snack activity for home. Free to download.'
 },
 purple:{
  word:'Purple',
  cardTitle:'Purple Flashcard — Purple Splash and Purple Flower for Preschoolers',
  picWord:'Purple flower',
  intro:'Purple is the rarest color in everyday life — grapes, plums, lavender and the odd flower — which makes spotting one feel like a small treasure hunt. This purple flower is exactly that kind of find.',
  say:'Purple! A fancy word — can you say pur-ple?',
  try:'Purple is rare, so hunt in pictures as well as rooms: find every purple thing in a favorite book. Grapes and flowers count double.',
  note:'Purple is the hardest mixing color to find in real life. One purple thing in a whole day is a genuine achievement — celebrate it.',
  sayPic:'A purple flower! Purple like the splash.',
  metaDescription:'Meet the purple color flashcard: a big purple splash and a purple flower, with a purple treasure hunt for home. Free to download and print.'
 },
 pink:{
  word:'Pink',
  cardTitle:'Pink Flashcard — Pink Splash and Pink Flower for Preschoolers',
  picWord:'Pink flower',
  intro:'Pink is red’s softer twin — piglets, bubblegum, ballet shoes and this friendly flower. Children often meet pink early because so many favorite things come in it, and this card gives the color its proper name.',
  say:'Pink! Light and soft — like bubblegum.',
  try:'Play pink spy: “I spy something pink” with three pink things set out in the room — a toy, a sock, a book cover. Swap roles and let your child spy.',
  note:'Pink is another mixing star: red paint with a spoonful of white makes pink. Try it at the craft table after the screens go off.',
  sayPic:'A pink flower! Pink like the splash.',
  metaDescription:'Meet the pink color flashcard: a big pink splash and a pink flower, with an I-spy-something-pink game for home. Free to download.'
 },
 brown:{
  word:'Brown',
  cardTitle:'Brown Flashcard — Brown Splash and Brown Teddy Bear for Preschoolers',
  picWord:'Brown teddy bear',
  intro:'Brown is the color of the best cuddles: teddy bears, dogs, chocolate and the crust of fresh bread. It is everywhere once you start looking — which is lucky, because brown is also the color that mixing makes when many colors meet.',
  say:'Brown! Like your teddy bear — can you hug something brown?',
  try:'Go find your child’s brownest friend: a teddy, a dog, a wooden block. Say hello to it from the card — “brown bear, brown bear!”',
  note:'Mixing lots of paint colors together makes brown, not a mess — tell your child that the day all the paints swirl into one. It is chemistry, not an accident.',
  sayPic:'A brown teddy bear! The best color to hug.',
  metaDescription:'Meet the brown color flashcard: a big brown splash and a brown teddy bear to hug, plus a find-your-brownest-friend activity. Free to download.'
 },
 black:{
  word:'Black',
  cardTitle:'Black Flashcard — Black Splash and Black Cat for Preschoolers',
  picWord:'Black cat',
  intro:'Black is the color of night, tires, pandas and — on this card — a very handsome cat. Children often love black for its drama: black cats, the night sky, big black boots. This card keeps the drama friendly.',
  say:'Black! Like the night sky — can you stretch your arms wide like the dark?',
  try:'At bathtime or dinner, hunt black things: shoes, a chair, the cat if it holds still. Black is easy to spot — three finds is a quick win.',
  note:'Here is a secret worth sharing: mixing many paints makes brown, not black — real black comes from a tube. Kids who test this never forget it.',
  sayPic:'A black cat! Black like the splash.',
  metaDescription:'Meet the black color flashcard: a big black splash and a friendly black cat, with a quick black-things hunt for home. Free to download.'
 },
 white:{
  word:'White',
  cardTitle:'White Flashcard — White Splash and White Cloud for Preschoolers',
  picWord:'White cloud',
  intro:'White is the color of clouds, milk, snow and clean paper — the color everything starts from. On the splash card it is the quietest member of the set, and the cloud gives it a shape your child sees almost every day.',
  say:'White! Look up — can you find a white cloud today?',
  try:'Cloud spotting: lie back and find white clouds — a bunny cloud, a boat cloud, a fast cloud. Any shape is correct; the color is the lesson.',
  note:'White is the great lightener: add white to red and you get pink, add it to blue and you get sky. White is the magic ingredient for pale colors.',
  sayPic:'A white cloud, floating by! White like the splash.',
  metaDescription:'Meet the white color flashcard: a big white splash and a puffy white cloud, with a cloud-spotting sky activity for home. Free to download.'
 },
 gray:{
  word:'Gray',
  cardTitle:'Gray Flashcard — Gray Splash and Gray Elephant for Preschoolers',
  picWord:'Gray elephant',
  intro:'Gray is the color of elephants, rain clouds, pigeons and rainy-day pavements. It is often the color children name last — and then cannot stop finding, because elephants and pigeons are everywhere once you know them.',
  say:'Gray! Like a big elephant — can you stomp like an elephant?',
  try:'Elephant march around the room: big slow gray steps, one big gray arm for a trunk. Then find gray things — the sofa, a pigeon, a rainy cloud.',
  note:'Gray is black and white’s baby: black paint plus white paint makes gray. It is the friendliest mixer of all — let your child mix it themselves.',
  sayPic:'A gray elephant! Stomp, stomp — gray like the splash.',
  metaDescription:'Meet the gray color flashcard: a big gray splash and a gentle gray elephant, with an elephant-march activity for home. Free to download.'
 },
 rainbow:{
  word:'Rainbow',
  cardTitle:'Rainbow Flashcard — Rainbow Splash and Rainbow Picture for Preschoolers',
  picWord:'Rainbow in the sky',
  intro:'The grand finale: every color in the set at once. Red, orange, yellow, green, blue and purple, in their famous order. The rainbow splash shows them flowing together, and the picture card shows the real thing in the sky.',
  say:'A rainbow! Red, orange, yellow, green, blue, purple — say them with me.',
  try:'Say the six rainbow colors in order while pointing, then draw a rainbow together — six crayons, six arcs, any size of paper.',
  note:'Real rainbows need sun plus rain, so rainbow spotting is a patience game. Any rainbow your child draws from memory counts as a find.',
  sayPic:'A real rainbow in the sky! Every color together.',
  metaDescription:'Meet the rainbow color flashcard: a rainbow splash and a real rainbow in the sky, with all six colors to name in order. Free to download and print.'
 }
};

/* The print view prints each color as ONE pair: the splash card beside its
   matching picture card. printCardsBody lays its `cards` two-up in order,
   so an interleaved splash→picture list yields one color pair per page —
   twelve printed pages, red to rainbow, without any new print code. */
export const colorsPrintLesson={
 ...colorsLesson,
 printables:{
  ...colorsLesson.printables,
  printAria:'The twelve color flashcard pairs — splash and picture side by side — from red to rainbow'
 },
 cards:colorsLesson.cards.flatMap(c=>[
  {order:c.order*2-1,file:c.file,w:c.w,h:c.h,slug:c.slug,alt:c.alt},
  {order:c.order*2,file:c.picFile,w:c.w,h:c.h,slug:c.slug,alt:c.picAlt}
 ])
};
