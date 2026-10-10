// Kiddo School — Preschool 6 (Age 3): Animals & Their Sounds.
// Twelve real cards uploaded by the owner to R2
// (flashcards/preschool-learning-cards/animals-and-their-sounds-age-3/):
// a dog, a cat, a cow, a sheep, a duck, a chicken, a horse, a pig, a lion,
// an elephant, a frog and a bird, plus the set cover. Dimensions probed from
// the actual files on 9 Oct 2026: cards 01–06 and the cover are 1414×2000
// portrait, cards 07–12 are 1240×1748 portrait. Nine of the twelve animals
// have a real recording in /assets/sounds/animals/ (duck, elephant and frog
// are still pending — every page says so honestly; nothing is faked).
// Nothing here is invented: each card points at its real file with its real
// pixels and its own parent-facing words.

const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='flashcards/preschool-learning-cards/animals-and-their-sounds-age-3/';

export const animalsMeta={
 slug:'animal-sounds',
 group:'preschool',
 name:'Animals & Their Sounds',
 seoTitle:'Animal Flashcards for Preschoolers | 12 Cards',
 h1:'Animal Flashcards for Preschoolers',
 metaDescription:'Twelve animal flashcards for preschoolers: dog, cat, cow, sheep, duck, chicken, horse, pig, lion, elephant, frog and bird, with real sounds to hear and games to play at home.',
 lede:'Twelve animal friends from dog to bird — every card has its own page with the picture, the sound it makes and one thing to try together, and nine of the sounds play right on the page.',
 hubBlurb:'Twelve animal friends with real sounds to hear — press play on nine of them, then make the rest yourselves.',
 ageLabel:'3–4 years',
 noun:'Preschoolers',
 downloadHint:'Every card page has its own download button with the full-size image — and its own play button wherever a recording is ready.',
 useIdeas:[
  ['Say the name, then make the sound','The pair is the whole lesson: “dog… woof!” Say both in one breath, then let your child take over the sound. The animal name gets the quiet word; the sound gets the fun one.'],
  ['Press play, then answer it yourself','On the pages with a play button, listen to the real animal once — then answer it in your own voice. Your child will copy you long before they copy the speaker.'],
  ['Play the guessing game backwards','Once three or four cards feel easy, your child holds the cards and makes a sound; you point at the animal it belongs to. Getting one wrong on purpose keeps the game alive for weeks.'],
  ['Take one card on the road','Tape the dog card by the window or the bird card by the door. Every real woof or tweet you spot together is one more quiet repetition — and repetitions are what make animal words stick.']
 ],
 printPath:'/preschool/3-years/animals-and-their-sounds/print/',
 relatedSets:['animals-and-sounds','vehicles-and-sounds','first-concepts'],
 coverFile:'cover.webp',
 coverAlt:'Cover of the Animals & Their Sounds flashcards set: a cow, a sheep, a cat, a chicken and a puppy under the words Preschool Animal Flashcards'
};

export const animalsLesson={
 path:'/preschool/3-years/animals-and-their-sounds/',
 seoTitle:'Animals & Their Sounds for 3 Year Olds',
 title:'Animals & Their Sounds for 3 Year Olds',
 h1:'Animals & Their Sounds',
 description:'Play with animals and your preschooler: twelve picture cards with real animal sounds to hear, printable animal sheets to solve at the table, off-screen barnyard play and a print view — no scores, no sign-up.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 6',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Animals & Their Sounds','/preschool/3-years/animals-and-their-sounds/']],
 schemaImage:R2+P+'cover.webp',
 ogImage:R2+P+'cover.webp',
 ogAlt:'The Animals & Their Sounds cover of the Kiddo School preschool class: a cow, a sheep, a cat, a chicken and a puppy gathered under the words Preschool Animal Flashcards',
 schema:{resourceType:'Interactive preschool class',level:'Preschool (age 3)',teaches:['Naming twelve animals: dog, cat, cow, sheep, duck, chicken, horse, pig, lion, elephant, frog and bird','Matching each animal to the sound it makes','Recognizing animal sounds by listening','Making animal sounds in play, on and off screen'],audience:'Parents and their three-year-olds',keywords:'animal sounds for preschoolers, animals for 3 year olds, animal flashcards, animal sounds game, guess the animal, matching animals and sounds, farm animals for kids, animal sounds activities'},
 cover:{file:'cover.webp',w:1414,h:2000,alt:'The Animals & Their Sounds set cover — a cow, a sheep, a cat, a chicken and a puppy gathered under the words Preschool Animal Flashcards'},
 folder:P,
 r2Base:R2,
 printables:{
  printEyebrow:'PRINTABLE ANIMAL CARDS',
  pack:'Animal Flashcards: print all twelve cards',
  meta:'Twelve animal cards, two to a printed page — twelve friends from dog to bird, each with its sound to make.',
  audience:'Made for age 3 and up — one clear picture per card, animals kept in card order.',
  printAria:'The twelve animal flashcards, two to a page, from dog to bird'
 },
 cards:[
  {order:1,file:'01-dog.webp',w:1414,h:2000,slug:'dog',audio:'dog',alt:'Dog animal flashcard: a happy brown puppy with the word dog, from the Kiddo School animals and their sounds set'},
  {order:2,file:'02-cat.webp',w:1414,h:2000,slug:'cat',audio:'cat',alt:'Cat animal flashcard: an orange kitten sitting up with the word cat, from the Kiddo School animals and their sounds set'},
  {order:3,file:'03-cow.webp',w:1414,h:2000,slug:'cow',audio:'cow',alt:'Cow animal flashcard: a black and white spotted cow with the word cow, from the Kiddo School animals and their sounds set'},
  {order:4,file:'04-sheep.webp',w:1414,h:2000,slug:'sheep',audio:'sheep',alt:'Sheep animal flashcard: a fluffy white sheep with the word sheep, from the Kiddo School animals and their sounds set'},
  {order:5,file:'05-duck.webp',w:1414,h:2000,slug:'duck',alt:'Duck animal flashcard: a yellow duckling with the word duck, from the Kiddo School animals and their sounds set'},
  {order:6,file:'06-chicken.webp',w:1414,h:2000,slug:'chicken',audio:'chicken',alt:'Chicken animal flashcard: a white hen with a red comb with the word chicken, from the Kiddo School animals and their sounds set'},
  {order:7,file:'07-horse.webp',w:1240,h:1748,slug:'horse',audio:'horse',alt:'Horse animal flashcard: a brown horse standing tall with the word horse, from the Kiddo School animals and their sounds set'},
  {order:8,file:'08-pig.webp',w:1240,h:1748,slug:'pig',audio:'pig',alt:'Pig animal flashcard: a smiling pink pig with the word pig, from the Kiddo School animals and their sounds set'},
  {order:9,file:'09-lion.webp',w:1240,h:1748,slug:'lion',audio:'lion',alt:'Lion animal flashcard: a friendly lion with a shaggy mane with the word lion, from the Kiddo School animals and their sounds set'},
  {order:10,file:'10-elephant.webp',w:1240,h:1748,slug:'elephant',alt:'Elephant animal flashcard: a gray elephant with big ears with the word elephant, from the Kiddo School animals and their sounds set'},
  {order:11,file:'11-frog.webp',w:1240,h:1748,slug:'frog',alt:'Frog animal flashcard: a green frog sitting on its front legs with the word frog, from the Kiddo School animals and their sounds set'},
  {order:12,file:'12-bird.webp',w:1240,h:1748,slug:'bird',audio:'bird',alt:'Bird animal flashcard: a little bluebird with one wing up with the word bird, from the Kiddo School animals and their sounds set'}
 ]
};

/* Parent-facing words, keyed by card slug. Every card gets its own intro,
   its own line to say together, one real-world activity, one parent note
   and its own search description — written for the animal it belongs to,
   never copied between cards. The sound is the word a three-year-old can
   already say perfectly, so every "say" line hands the sound over. */
export const animalsCardContent={
 'dog':{
  word:'Dog',
  cardTitle:'Dog Flashcard — the woof card for Preschoolers',
  intro:'The dog says woof — most children meet this sound first, from storybooks to the neighbour’s puppy. On this card the word dog sits under a happy brown puppy, and the woof is ready to play the moment you press play.',
  say:'Woof! Woof! The dog says woof — can you say woof?',
  try:'Puppy pats: tap your knees gently, twice — pat, pat — like a wagging tail.',
  note:'Dogs bark differently all over the world. In English we say woof — and that is the right answer here.',
  metaDescription:'Meet the dog animal flashcard: a happy brown puppy with the word dog, with a puppy-pats game and the woof sound to hear. Free to download and print.'
 },
 'cat':{
  word:'Cat',
  cardTitle:'Cat Flashcard — the meow card for Preschoolers',
  intro:'A soft meee-ow is one of the first sounds children make up themselves. This card pairs the word cat with an orange kitten, and the meow recording is one tap away.',
  say:'Meow! A soft meow — stretch it out: meee-ow!',
  try:'Pretend to lap milk with your hand — cats are quiet drinkers and quiet walkers.',
  note:'If a real cat passes by, listen together. Some cats meow loudly; some barely squeak.',
  metaDescription:'Meet the cat animal flashcard: an orange kitten with the word cat, a quiet-cat-feet game and the meow sound to hear. Free to download and print.'
 },
 'cow':{
  word:'Cow',
  cardTitle:'Cow Flashcard — the moo card for Preschoolers',
  intro:'Moo is a whole-body sound: open wide, let it rumble, make it last. The word cow sits under a spotted farm cow, and a real moo is ready to hear together.',
  say:'Moo! Open wide and let it rumble: moooo!',
  try:'Moo high, moo low, moo slow — which moo is the most cow-ish one in the room?',
  note:'Cows moo to talk to their calves and to their farmer. Your child already speaks a little cow.',
  metaDescription:'Meet the cow animal flashcard: a black and white spotted cow with the word cow, a moo-high-moo-low game and the moo sound to hear. Free to download and print.'
 },
 'sheep':{
  word:'Sheep',
  cardTitle:'Sheep Flashcard — the baa card for Preschoolers',
  intro:'The sheep’s baa wobbles at the end — baa-aa-aa — which makes it irresistible to copy. This card shows a fluffy white sheep with the word sheep, and the baa is one tap away.',
  say:'Baa! A baa wobbles at the end — baa-aa-aa!',
  try:'Baa while hopping — sheep move in a little bounce, so the sound bounces too.',
  note:'Sheep stay with the flock. Saying baa together, in a group, is exactly how a flock sounds.',
  metaDescription:'Meet the sheep animal flashcard: a fluffy white sheep with the word sheep, a bouncy baa game and the baa sound to hear. Free to download and print.'
 },
 'duck':{
  word:'Duck',
  cardTitle:'Duck Flashcard — the quack card for Preschoolers',
  intro:'Quack is a short, sharp, funny sound — three waddles and one quack is already a game. The word duck sits under a yellow duckling, ready for the kitchen table.',
  say:'Quack! A short, sharp quack — quack, quack!',
  try:'Waddle in a line with quacks between steps — three waddles, one quack.',
  note:'Real ducks are chatty: at the pond, count the quacks out loud together.',
  metaDescription:'Meet the duck animal flashcard: a yellow duckling with the word duck and a waddle-and-quack game to try at home. Free to download and print.'
 },
 'chicken':{
  word:'Chicken',
  cardTitle:'Chicken Flashcard — the cluck card for Preschoolers',
  intro:'The hen clucks all day — bok, bok, bok — a busy sound for busy little people. This card pairs the word chicken with a white hen, and the cluck recording plays on tap.',
  say:'Cluck, cluck! The hen clucks — bok, bok, bok!',
  try:'Peck like a hen: little fast nods of the head while you cluck.',
  note:'Hens cluck all day to stay in touch. A rooster crows cock-a-doodle-doo — a different job.',
  metaDescription:'Meet the chicken animal flashcard: a white hen with a red comb, the word chicken, a pecking game and the cluck sound to hear. Free to download and print.'
 },
 'horse':{
  word:'Horse',
  cardTitle:'Horse Flashcard — the neigh card for Preschoolers',
  intro:'A horse’s neigh starts high and slides down — a sound children love to ride. The word horse sits under a tall brown horse, with the whinny ready to hear.',
  say:'Neigh! A big whinny — start high and slide down: nneigh!',
  try:'Clip-clop your tongue while tapping a steady beat — a trot around the room.',
  note:'Horses neigh to find their friends. A loud neigh from you gets a loud neigh back.',
  metaDescription:'Meet the horse animal flashcard: a brown horse standing tall, the word horse, a clip-clop game and the neigh sound to hear. Free to download and print.'
 },
 'pig':{
  word:'Pig',
  cardTitle:'Pig Flashcard — the oink card for Preschoolers',
  intro:'Oink comes straight from the nose — sniff, sniff, snort! This card shows a smiling pink pig with the word pig, and a real pig grunt plays on tap.',
  say:'Oink, oink! Snort it from the nose: oink-oink!',
  try:'Pig sniffing: wrinkle your nose and sniff-sniff-snort — pigs find food with their snout.',
  note:'Pigs are clean, clever and chatty — the mud is just sunscreen. Oink is the polite hello.',
  metaDescription:'Meet the pig animal flashcard: a smiling pink pig with the word pig, a sniff-and-snort game and the oink sound to hear. Free to download and print.'
 },
 'lion':{
  word:'Lion',
  cardTitle:'Lion Flashcard — the roar card for Preschoolers',
  intro:'Every child has a roar in them — this one starts soft and ends loud. The word lion sits under a shaggy-maned lion, and a real roar plays at the press of a button.',
  say:'Roooaaar! Start soft, end loud — a friendly roar!',
  try:'Paws up, big breath, roar together — then whisper-roar so a cub could sleep.',
  note:'A lion’s roar carries for kilometres — it means “here I am”. Whisper-roars carry across the rug.',
  metaDescription:'Meet the lion animal flashcard: a friendly lion with a shaggy mane, the word lion, a whisper-roar game and the roar sound to hear. Free to download and print.'
 },
 'elephant':{
  word:'Elephant',
  cardTitle:'Elephant Flashcard — the trumpet card for Preschoolers',
  intro:'The elephant’s trumpet is the silliest sound in the set: Pbbbfft! The word elephant sits under a gray giant, and the arm-trunk game is waiting in the say-it-together box.',
  say:'Pfffft! Elephants trumpet — blow a big airy Pbbbfft!',
  try:'Arm trunk: swing your arm in front of your nose and trumpet as you swing it up.',
  note:'Real elephants also rumble so low we can barely hear it — a secret elephant whisper.',
  metaDescription:'Meet the elephant animal flashcard: a gray elephant with big ears, the word elephant and a swing-your-trunk trumpet game. Free to download and print.'
 },
 'frog':{
  word:'Frog',
  cardTitle:'Frog Flashcard — the ribbit card for Preschoolers',
  intro:'Ribbit is a bouncy little sound made for hopping: one hop, one ribbit. The word frog sits under a bright green frog, ready for the kitchen table.',
  say:'Ribbit, ribbit! A bouncy little ribbit!',
  try:'Crouch and hop — one hop, one ribbit. How far can the two of you hop?',
  note:'Frogs croak loudest in the evening. If you live near water, take the game outside at dusk.',
  metaDescription:'Meet the frog animal flashcard: a green frog on its front legs, the word frog and a hop-and-ribbit game to try at home. Free to download and print.'
 },
 'bird':{
  word:'Bird',
  cardTitle:'Bird Flashcard — the tweet card for Preschoolers',
  intro:'Tweet, tweet — the smallest voice on the cards, and the one your child can hear for real outside the window. The word bird sits under a little bluebird, with a real tweet on tap.',
  say:'Tweet, tweet! A little high tweet-tweet-tweet!',
  try:'Bird listening: be silent for ten seconds and count the tweets you hear together.',
  note:'Birds sing most at sunrise. One quiet minute of listening is a whole bird class.',
  metaDescription:'Meet the bird animal flashcard: a little bluebird with one wing up, the word bird, a listening game and the tweet sound to hear. Free to download and print.'
 }
};
