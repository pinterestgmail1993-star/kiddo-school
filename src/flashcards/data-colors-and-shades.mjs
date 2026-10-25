// Kiddo School — EXTRA CLASS · Colors: flashcard content. The 15 cards are
// the owner's original uploads, verified live on R2 under
// school/extra-classes/colors/ (16/16 objects HTTP 200 image/webp — 11 color
// cards + 4 shade cards + 1 cover — probed per file: EVERY file at 600×849
// portrait). Filenames are used exactly as uploaded — nothing renamed,
// nothing invented. Every card is a 2×2 SPOTTER SHEET of four labeled
// things in one color; the alts name all four from the actual artwork,
// inspected image by image (red: apple, fire truck, ladybug, strawberry …
// gold: crown, sunflower, trophy, honey pot; shades: kite, raindrop,
// helmet, cloud …). OWNER BRIEF: the 11 colors ride in file order 01–11 as
// the class tour order; the 4 shades are a separate section, "More colors
// (ages 4-5)". AGE SPLIT per card, not per set: the first colors ride
// Ages 2+ (first words a toddler points at), the shades ride Ages 4–5
// (each one is a MIXING result — navy, peach and lavender are made, not
// found). US/UK pairs ride in the copy: gray/grey, eggplant/aubergine.
// Library card pages answer WHAT the color is and WHERE it hides; the
// /extra-classes/colors/learn/ lessons (lp-colors-and-shades.mjs via
// LP_REGISTRY) keep the full kid guide on their own pages. No text is
// shared between the two.
import {R2} from '../adventure-kit.mjs';

export const lesson={
 r2Base:R2+'school/extra-classes/colors/',
 folder:'',
 path:'/extra-classes/colors/',
 seoTitle:'Colors (Extra Class)',
 cover:{w:600,h:849},
 cards:[
  {slug:'red',file:'flashcards/01-red.webp',w:600,h:849,alt:'A Colors flashcard titled Red: a two-by-two sheet of four labeled red things — Apple, Fire Truck, Ladybug and Strawberry.'},
  {slug:'blue',file:'flashcards/02-blue.webp',w:600,h:849,alt:'A Colors flashcard titled Blue: a two-by-two sheet of four labeled blue things — Whale, Umbrella, Balloon and Bluebird.'},
  {slug:'yellow',file:'flashcards/03-yellow.webp',w:600,h:849,alt:'A Colors flashcard titled Yellow: a two-by-two sheet of four labeled yellow things — Sun, Banana, Duck and Star.'},
  {slug:'green',file:'flashcards/04-green.webp',w:600,h:849,alt:'A Colors flashcard titled Green: a two-by-two sheet of four labeled green things — Leaf, Frog, Cucumber and Turtle.'},
  {slug:'orange',file:'flashcards/05-orange.webp',w:600,h:849,alt:'A Colors flashcard titled Orange: a two-by-two sheet of four labeled orange things — Orange, Tiger, Carrot and Fox.'},
  {slug:'purple',file:'flashcards/06-purple.webp',w:600,h:849,alt:'A Colors flashcard titled Purple: a two-by-two sheet of four labeled purple things — Grapes, Eggplant, Butterfly and Plum.'},
  {slug:'pink',file:'flashcards/07-pink.webp',w:600,h:849,alt:'A Colors flashcard titled Pink: a two-by-two sheet of four labeled pink things — Flamingo, Cupcake, Flower and Pig.'},
  {slug:'brown',file:'flashcards/08-brown.webp',w:600,h:849,alt:'A Colors flashcard titled Brown: a two-by-two sheet of four labeled brown things — Bear, Pretzel, Mushroom and Coffee Cup.'},
  {slug:'black',file:'flashcards/09-black.webp',w:600,h:849,alt:'A Colors flashcard titled Black: a two-by-two sheet of four labeled black things — Penguin, Piano, Black Cat and Tire.'},
  {slug:'grey',file:'flashcards/10-grey.webp',w:600,h:849,alt:'A Colors flashcard titled Grey: a two-by-two sheet of four labeled grey things — Elephant, Cloud, Rock and Koala.'},
  {slug:'gold',file:'flashcards/11-gold.webp',w:600,h:849,alt:'A Colors flashcard titled Gold: a two-by-two sheet of four labeled gold things — Crown, Sunflower, Trophy and Honey Pot.'},
  {slug:'light-blue',file:'shades/01-light-blue.webp',w:600,h:849,alt:'A Colors flashcard titled Light Blue: a two-by-two sheet of four labeled light-blue things — Kite, Raindrop, Helmet and Cloud.'},
  {slug:'navy',file:'shades/02-navy.webp',w:600,h:849,alt:'A Colors flashcard titled Navy: a two-by-two sheet of four labeled navy things — Whale, Moon, Bow Tie and Cap.'},
  {slug:'peach',file:'shades/03-peach.webp',w:600,h:849,alt:'A Colors flashcard titled Peach: a two-by-two sheet of four labeled peach things — Peach, Seashell, Kitten and Ballet Slipper.'},
  {slug:'lavender',file:'shades/04-lavender.webp',w:600,h:849,alt:'A Colors flashcard titled Lavender: a two-by-two sheet of four labeled lavender things — Lavender, Fairy, Teapot and Butterfly.'}
 ]
};

export const meta={
 slug:'colors-and-shades',
 name:'Colors & Shades',
 // The cover lives in the flashcards/ subfolder (owner's upload layout),
 // so meta.coverFile carries the prefix — the default 'cover.webp' would
 // 404 against the bucket root.
 coverFile:'flashcards/cover.webp',
 seoTitle:'Colors & Shades Flashcards — 11 Color and 4 Shade Spotter Sheets with Lessons (Ages 2–5)',
 h1:'Colors & Shades flashcards.',
 metaDescription:'Fifteen printable color flashcards for ages 2–5: red, blue, yellow, green, orange, purple, pink, brown, black, grey, gold — plus four shades, light blue, navy, peach and lavender, as a More colors section for ages 4–5. Every card is a spotter sheet of four labeled things in one color, sixty labeled pictures in the deck, with a simple lesson kids can follow, age pills and a download button. US/UK spellings taught side by side (gray and grey, eggplant and aubergine).',
 lede:'Fifteen spotter sheets, sixty labeled things, one color at a time. Each card gathers four things that share a color — the red apple, the yellow sun, the grey elephant, the gold trophy — so a child meets the color word four times before moving on. The first eleven cards are the colors toddlers name first; the last four are the shades older kids can mix themselves: light blue, navy, peach and lavender. Every card page carries a simple guide — what the color is, where it hides in your house, and one way to hunt it tonight.',
 hubBlurb:'Fifteen color spotter sheets — the eleven first colors plus four mix-it-yourself shades — four labeled things on every card, from the red apple to the gold honey pot.',
 ageLabel:'2–5 years',
 noun:'Colors',
 group:'preschool',
 stageName:null,
 stageHref:null,
 classUrl:'/extra-classes/colors/',
 classBtn:'Open the Colors class',
 lessonCrumb:[['Extra Classes','/extra-classes/']],
 lessonEyebrow:'COLORS LESSON',
 lessonLine:'extra class — every color opens its own simple lesson.',
 pillGroups:[
  ['The first colors','The eleven colors a child names first, in the deck’s own order: the red apple to the gold honey pot. Four labeled things on every card — name the color, then hunt it in the room.',['red','blue','yellow','green','orange','purple','pink','brown','black','grey','gold']],
  ['More colors (ages 4-5)','Four shades for bigger spotters — each one a color you can MAKE: light blue is blue plus white, navy is blue gone dark, peach is orange gone soft, lavender is purple gone pale.',['light-blue','navy','peach','lavender']]
 ],
 useIdeas:[
  ['The color hunt','Pick one card, then hunt its color all day — clothes, cups, cars, cushions. Every find is a point, said out loud: "red car, two!" The deck turns the whole house into the game.'],
  ['Sixty things, one floor','Lay all the cards face up. Sixty labeled things sit there — a whale, a pretzel, a koala, a crown. Ask: "what on this floor is red?" and watch the sorting begin.'],
  ['I spy, card edition','Hold up three cards and spy something in the room that matches one of them. "I spy with my little eye… something GOLD." The trophy card wins when the door handle does.'],
  ['Mix talk','The shade cards are made, not found: blue plus white makes light blue, blue plus a night sky makes navy. Ask "how do you think they MADE this one?" — that is real color theory, age four style.'],
  ['One color a day','Read one card at breakfast — a twenty-second color visit. At that pace the deck lasts three weeks, and every color gets its own morning.']
 ],
 downloadHint:'Every card page has its own download button with the full-size image.',
 coverAlt:'Cover of the Colors flashcards set from Kiddo School: the words "Color Flashcards" over five round color dots — crimson, blue, green, orange and pink.',
 lessonBlurb:'the Colors extra class, where every color comes with its own simple lesson',
 relatedSets:['colors','colors-and-shapes']
};

export const cards={
 'red':{word:'Red',ages:'Ages 2+',pill:'First colors',
  cardTitle:'Red Flashcard for Kids — Apple, Fire Truck, Ladybug and Strawberry',
  intro:'Red is the color that shouts first: the loudest fruit in the bowl, the biggest truck on the street, the hungriest color in the garden. On the card, four famous reds sit in their squares — an apple, a fire truck, a ladybug and a strawberry — every one a red a child has already met somewhere real.',
  say:'Red! The apple is red, the fire truck is red, the ladybug is red, the strawberry is red. Can you find something red in this room? Look — your cup is red too!',
  try:'Red hunt: walk the house naming every red thing you pass. Ten finds and the hunt is won — and dinner plates, door frames and book spines all count. Red is everywhere once you start looking.',
  note:'Red is usually the FIRST color word a child learns, which is why it leads the deck — and the card’s apple and strawberry are red in every country of the world.'},
 'blue':{word:'Blue',ages:'Ages 2+',pill:'First colors',
  cardTitle:'Blue Flashcard for Kids — Whale, Umbrella, Balloon and Bluebird',
  intro:'Blue is the color of big things: the sky, the ocean, the whale. On the card, four friendly blues wait in their squares — a whale, an umbrella, a balloon and a bluebird — the sky’s own color, living on four very different things.',
  say:'Blue! The whale is blue, the umbrella is blue, the balloon is blue, the bluebird is blue. What else is blue? The sky! Look up — the whole sky is blue today.',
  try:'Balloon blue: blow up one blue balloon (or draw one) and keep it off the floor with color call-outs — every tap needs the word "blue!" said first. Wiggly, giggly, and the word sticks.',
  note:'The bluebird is the card’s built-in joke — a bird NAMED for its color, the same way the blue whale is. Blue is the favorite color question in every preschool survey, and this card shows why.'},
 'yellow':{word:'Yellow',ages:'Ages 2+',pill:'First colors',
  cardTitle:'Yellow Flashcard for Kids — Sun, Banana, Duck and Star',
  intro:'Yellow is the color that smiles: the sun in the sky, the duck in the tub, the star on the fridge chart. On the card, four sunny yellows sit in their squares — a sun, a banana, a duck and a star — every one a yellow that starts a game.',
  say:'Yellow! The sun is yellow, the banana is yellow, the duck is yellow, the star is yellow. Can you quack like the yellow duck? Can you stretch tall like the yellow sun?',
  try:'Banana count: peel a real banana at snack time and say "yellow" three times on the way to the first bite — then count the bites. Snack math plus color naming in one go.',
  note:'The rubber duck is the yellow a child meets youngest — tub time is color time. Yellow is also the color of the Kiddo School logo tile, which this card’s fans usually spot before the grown-ups do.'},
 'green':{word:'Green',ages:'Ages 2+',pill:'First colors',
  cardTitle:'Green Flashcard for Kids — Leaf, Frog, Cucumber and Turtle',
  intro:'Green is the color of growing things: the leaf on the tree, the frog on the log, the cucumber in the lunchbox. On the card, four growing greens sit in their squares — a leaf, a frog, a cucumber and a turtle — the garden’s favorite color, above ground and below.',
  say:'Green! The leaf is green, the frog is green, the cucumber is green, the turtle is green. Hop like the green frog! Crawl slow like the green turtle! Snack time: let’s crunch a green cucumber.',
  try:'Frog hops: every time you say "green", your child does one frog hop across the room. Four squares, four hops — and a cucumber crunch at the finish line. Colors plus wiggles, both won.',
  note:'Green is the color of GO at every crossing in the US, UK and Canada — this card pairs perfectly with the walk to the park. And the turtle carries green on its shell AND its name-sake soup, which is the grown-up fact of the day.'},
 'orange':{word:'Orange',ages:'Ages 2+',pill:'First colors',
  cardTitle:'Orange Flashcard for Kids — Orange, Tiger, Carrot and Fox',
  intro:'Orange is the color with a trick up its sleeve: it is a color AND a fruit with the same name. On the card, four bright oranges sit in their squares — an orange, a tiger, a carrot and a fox — stripes, fur and fruit all sharing one color.',
  say:'Orange! The orange is orange, the tiger is orange, the carrot is orange, the fox is orange. An orange you can eat, a tiger you can roar at! Can you prowl like the orange tiger?',
  try:'Tiger stripes: tape or draw paper stripes on a orange t-shirt and prowl the hallway on all fours, roaring "ORANGE!" at each corner. The fox trot home is the cool-down.',
  note:'The color and the fruit arrived in English together — the fruit came first, and the color borrowed its name. A carrot a day makes this card a snack, and the tiger is everybody’s favorite square by a roar.'},
 'purple':{word:'Purple',ages:'Ages 2+',pill:'First colors',
  cardTitle:'Purple Flashcard for Kids — Grapes, Eggplant, Butterfly and Plum',
  intro:'Purple is the fancy one — the color of grapes on the vine and wings in the garden. On the card, four royal purples sit in their squares — grapes, an eggplant, a butterfly and a plum — three snacks and one insect, all dressed in the same deep color.',
  say:'Purple! The grapes are purple, the eggplant is purple, the butterfly is purple, the plum is purple. Snack time: purple grapes! Garden time: let’s find a purple flower.',
  try:'Grape counting: pile ten purple grapes and count them before eating — one to ten, one purple at a time. Then flap arms like the purple butterfly between every third grape. Counts, colors, wiggles.',
  note:'US families say eggplant; UK families say aubergine — same glossy purple vegetable, two passports. Purple is also the Kiddo School uniform color, which makes this card the school’s own shade.'},
 'pink':{word:'Pink',ages:'Ages 2+',pill:'First colors',
  cardTitle:'Pink Flashcard for Kids — Flamingo, Cupcake, Flower and Pig',
  intro:'Pink is the color of celebrations: a cupcake with a heart on top, a flower in the garden, a flamingo standing on one leg. On the card, four cheerful pinks sit in their squares — a flamingo, a cupcake, a flower and a pig — two animals, one bloom and one treat.',
  say:'Pink! The flamingo is pink, the cupcake is pink, the flower is pink, the pig is pink. Stand on one leg like the pink flamingo! Snuffle like the pink pig!',
  try:'Flamingo stand: hold up the card and everyone balances on one leg like the flamingo — the last one standing picks the next color card. Giggly balance practice with a color name attached.',
  note:'Flamingos really are pink from the shrimp they eat — born grey, pinkened by dinner, which is the fact that flips every grown-up’s face. Pink, the word, is one of the first a toddler adds after red.'},
 'brown':{word:'Brown',ages:'Ages 2+',pill:'First colors',
  cardTitle:'Brown Flashcard for Kids — Bear, Pretzel, Mushroom and Coffee Cup',
  intro:'Brown is the color of cozy things: the teddy in the bed, the pretzel at the market, the mushroom in the storybook. On the card, four warm browns sit in their squares — a bear, a pretzel, a mushroom and a coffee cup — three snacks and one very huggable bear.',
  say:'Brown! The bear is brown, the pretzel is brown, the mushroom is brown, the coffee cup is brown. Hug your teddy — is your teddy brown too? Grown-ups: whose cup looks like the coffee cup?',
  try:'Teddy picnic: every brown toy comes to the picnic blanket, and each one gets a "brown" said out loud on arrival. The pretzel square gets a real pretzel if the pantry cooperates.',
  note:'Brown is what mixing makes when ALL the colors meet — the forest floor color. The coffee cup square is the grown-up’s square: every parent at the table has exactly that cup in hand.'},
 'black':{word:'Black',ages:'Ages 2+',pill:'First colors',
  cardTitle:'Black Flashcard for Kids — Penguin, Piano, Black Cat and Tire',
  intro:'Black is the color of striking things: a penguin’s suit, a piano’s shine, a cat in the night. On the card, four bold blacks sit in their squares — a penguin, a piano, a black cat and a tire — two animals, one instrument and one wheel.',
  say:'Black! The penguin is black, the piano is black, the cat is black, the tire is black. Waddle like the black penguin! Tinkle pretend piano keys! Vroom goes the tire!',
  try:'Penguin waddle race: waddle across the room with feet together saying "black, black, black" — then three pretend piano plinks at the finish. The cat gets a quiet, sneaky lap back.',
  note:'The piano has black keys AND white keys, which makes it a color lesson you can play. And the penguin’s suit is black on the BACK and white on the front — camo from the ocean, explained simply.'},
 'grey':{word:'Grey',ages:'Ages 2+',pill:'First colors',
  cardTitle:'Grey Flashcard for Kids — Elephant, Cloud, Rock and Koala',
  intro:'Grey is the color of gentle giants and quiet things: the elephant, the cloud, the rock, the koala asleep in the tree. On the card, four soft greys sit in their squares — an elephant, a cloud, a rock and a koala — the calmest card in the deck.',
  say:'Grey! The elephant is grey, the cloud is grey, the rock is grey, the koala is grey. Stomp slow like the grey elephant! Yawn like the sleepy grey koala! What does the cloud do? Float!',
  try:'Elephant stomp: slow, heavy, grey stomps across the room — then float to a chair like the cloud when the music stops. Loud and quiet, same color. The koala nap at the end is mandatory.',
  note:'US spelling is GRAY; the card (and this page) use the UK GREY — both are correct, and this is the honest place a child can meet both. The koala is not a bear, it is a marsupial — the koala square’s grown-up fact.'},
 'gold':{word:'Gold',ages:'Ages 2+',pill:'First colors',
  cardTitle:'Gold Flashcard for Kids — Crown, Sunflower, Trophy and Honey Pot',
  intro:'Gold is the shiny one — the color of prizes and treasure: a crown, a sunflower standing tall, a trophy, a honey pot dripping with sweetness. On the card, four golden things sit in their squares — the deck’s grand finale, shining all together.',
  say:'Gold! The crown is gold, the sunflower is gold, the trophy is gold, the honey pot is gold. Gold is yellow’s shiny cousin! Who wears a crown? Who wins a trophy? YOU do — every color you name is a win!',
  try:'Golden treasure hunt: hide one gold thing (a spoon, a button, the card itself) and hunt it like treasure — the finder is crowned with paper and wears it to lunch. Sunflower snack: seeds, counted by twos for the older kids.',
  note:'Gold is yellow’s shiny cousin — it looks like yellow but SHINES: metal versus color, the first sparkle distinction a child makes. And honey never spoils: the honey pot square’s amazing fact.'},
 'light-blue':{word:'Light Blue',ages:'Ages 4–5',pill:'More colors',
  cardTitle:'Light Blue Flashcard for Kids — Kite, Raindrop, Helmet and Cloud',
  intro:'Light blue is blue with white stirred in — the color of the sky on a soft day. On the card, four airy light blues float in their squares — a kite, a raindrop, a bike helmet and a cloud — things that live up high or go fast outside.',
  say:'Light blue! It is blue plus white — sky blue! The kite is light blue, the raindrop is light blue, the helmet is light blue, the cloud is light blue. Who has ridden a bike with a helmet on?',
  try:'Mix it for real: blue paint plus white paint, stirred slow — light blue arrives and it is MAGIC every time. Then paint a raindrop or cut a paper kite from the fresh batch.',
  note:'This is the first shade card — the section where colors stop being just FOUND and start being MADE. Ask before revealing: "how do you think they made this one?" The answer (blue + white) is a four-year-old’s first color recipe.'},
 'navy':{word:'Navy',ages:'Ages 4–5',pill:'More colors',
  cardTitle:'Navy Flashcard for Kids — Whale, Moon, Bow Tie and Cap',
  intro:'Navy is blue gone dark — the color of the night sea and a sailor’s uniform. On the card, four deep navies sit in their squares — a whale, a crescent moon, a bow tie and a cap — the smartest, quietest color on the shelf.',
  say:'Navy! It is blue with a little black — night blue! The whale is navy, the moon is navy, the bow tie is navy, the cap is navy. Navy is the color of sailors’ clothes — that is HOW it got its name!',
  try:'Day and night: hold the blue card and the navy card side by side — day sky, night sky. Then draw one sky in each color on one folded paper. Two blues, two times of day, one artist.',
  note:'Navy is named for the NAVY — the sailors who wore dark blue uniforms, in every fleet in the world. A color named after people at work: that is a word-history lesson hiding in a shade card.'},
 'peach':{word:'Peach',ages:'Ages 4–5',pill:'More colors',
  cardTitle:'Peach Flashcard for Kids — Peach, Seashell, Kitten and Ballet Slipper',
  intro:'Peach is orange gone soft and sweet — the color of the fruit, a seashell, a sleepy kitten. On the card, four gentle peaches sit in their squares — a peach, a seashell, a kitten and a ballet slipper — the softest card in the whole deck.',
  say:'Peach! It is orange plus white and a hug of pink. The peach is peach, the seashell is peach, the kitten is peach, the ballet slipper is peach. Soft like a kitten’s ear — can you stroke your arm that gently?',
  try:'Fuzzy feel: peaches are fuzzy — pass a real one around and name the color with eyes closed, by touch. Then the whole family tiptoes like ballet dancers in peach slippers.',
  note:'The color is named after the FRUIT, exactly like orange — peach came first, the color borrowed the name. And the card hides its own joke: the fruit square IS the color’s name-tag.'},
 'lavender':{word:'Lavender',ages:'Ages 4–5',pill:'More colors',
  cardTitle:'Lavender Flashcard for Kids — Lavender, Fairy, Teapot and Butterfly',
  intro:'Lavender is purple gone pale and powdery — the color of the flower it is named after. On the card, four dreamy lavenders sit in their squares — a lavender sprig, a fairy mid-flight, a teapot and a butterfly — the garden at dusk, on a card.',
  say:'Lavender! It is purple plus white — pale purple, like the flower. The lavender is lavender, the fairy is lavender, the teapot is lavender, the butterfly is lavender. Smell the word: lavender smells like Grannie’s drawer!',
  try:'Smell and spell: if a lavender plant (or sachet) is nearby, smell it FIRST, then name the color — a color with a scent sticks twice as deep. Then mix purple + white paint to brew the shade at the table.',
  note:'Lavender is the only color in the deck named after a FLOWER — and the card carries the flower itself in square one, name-tag and all. A color you can smell: the grand finale of the shade section.'}
};
