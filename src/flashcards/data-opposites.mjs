// Kiddo School — Preschool 5 (Age 3): Opposites & Comparing.
// Twelve real cards uploaded by the owner to R2
// (flashcards/preschool-learning-cards/opposites-and-comparing-age-3/):
// six honest opposite pairs — big/small balls, tall/short trees,
// long/short pencils, full/empty glasses, hot soup/cold ice cream,
// open/closed doors. Dimensions probed from the actual files on
// 8 Oct 2026: every card AND the cover are 1024×768 landscape (4:3) —
// a different shape from every earlier preschool folder, which is exactly
// why the probe runs before any layout code. Nothing here is invented:
// each card points at its real file with its real pixels and its own
// parent-facing words.

const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='flashcards/preschool-learning-cards/opposites-and-comparing-age-3/';

export const oppositesMeta={
 slug:'opposites',
 group:'preschool',
 name:'Opposites & Comparing',
 seoTitle:'Opposite Flashcards for Preschoolers | 12 Cards',
 h1:'Opposite Flashcards for Preschoolers',
 metaDescription:'Twelve opposite flashcards for preschoolers: big and small balls, tall and short trees, full and empty glasses and more, with comparing games and household hunts to play at home.',
 lede:'Twelve cards in six honest opposite pairs: a big ball beside a small ball, a tall tree beside a short one, a full glass beside an empty one. Show each pair side by side, say both words together, then go find the opposites hiding in your house.',
 hubBlurb:'Six opposite pairs from big and small to open and closed — every card has its own page, a comparing game and a download.',
 ageLabel:'3–4 years',
 noun:'Preschoolers',
 useIdeas:[
  ['Always show the pair together','Opposites are comparison words, so a single card teaches only half the idea. Show the big ball and the small ball side by side, say both words in one breath — “big ball, small ball” — and let your child point to each as you go.'],
  ['Start with the pair your child already feels','Full and empty happens at every snack, and open and closed happens at every door. Begin there — a word attached to something your child did five minutes ago sticks far better than a new word on a screen.'],
  ['Let your child be the quiz master','Once two pairs feel easy, hand the cards over: your child shows a card and asks YOU for the opposite. Getting one wrong on purpose — “the opposite of hot is… a tree?” — keeps the game alive for weeks.'],
  ['Put today’s pair somewhere useful','Tape the full and empty cards by the snack cupboard, or open and closed by the door. Every trip past them is one more quiet repetition, and repetitions — not sessions — are what make comparing words stick.']
 ],
 printPath:'/preschool/3-years/opposites-and-comparing/print/',
 relatedSets:['first-concepts','matching-and-sorting','colors'],
 coverFile:'cover.webp',
 coverAlt:'The Opposites flashcard set cover: big and small, tall and short, full and empty cards gathered around the words Opposites'
};

export const oppositesLesson={
 path:'/preschool/3-years/opposites-and-comparing/',
 seoTitle:'Opposites & Comparing for 3 Year Olds',
 title:'Opposites & Comparing for 3 Year Olds',
 h1:'Opposites & Comparing',
 description:'Play with opposites and your preschooler: six opposite pairs on real picture cards, printable opposite sheets to compare at the table, bigger-taller-longer word play and household hunts to try at home.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 5',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Opposites & Comparing','/preschool/3-years/opposites-and-comparing/']],
 schemaImage:R2+P+'cover.webp',
 ogImage:R2+P+'cover.webp',
 ogAlt:'The Opposites & Comparing cover of the Kiddo School preschool class: opposite pairs gathered around the word opposites',
 schema:{resourceType:'Interactive preschool class',level:'Preschool (age 3)',teaches:['Naming six opposite pairs: big and small, tall and short, long and short, full and empty, hot and cold, open and closed','Comparing two things by size: bigger, taller, longer','Matching opposite pairs','Using comparing words on real household objects'],audience:'Parents and their three-year-olds',keywords:'opposites for preschoolers, opposites for 3 year olds, opposite flashcards, big and small activities, comparing sizes for kids, preschool opposite games, full and empty activities, comparing words for toddlers'},
 cover:{file:'cover.webp',w:1024,h:768,alt:'The Opposites set cover — opposite pairs gathered around the words Opposites: big and small, tall and short, full and empty'},
 folder:P,
 r2Base:R2,
 printables:{
  printEyebrow:'PRINTABLE OPPOSITE CARDS',
  pack:'Opposite Flashcards: print all twelve cards',
  meta:'Twelve opposite cards, two to a printed page — six pairs from big and small to open and closed.',
  audience:'Made for age 3 and up — one clear picture per card, pairs kept together in order.',
  printAria:'The twelve opposite flashcards, two to a page, from big ball to closed door'
 },
 cards:[
  {order:1,file:'01-big-ball.webp',w:1024,h:768,slug:'big-ball',alt:'Big ball opposite flashcard: one big striped ball filling most of the card with the words big ball, from the Kiddo School opposites set'},
  {order:2,file:'02-small-ball.webp',w:1024,h:768,slug:'small-ball',alt:'Small ball opposite flashcard: one tiny ball beside a big word card with the words small ball, from the Kiddo School opposites set'},
  {order:3,file:'03-tall-tree.webp',w:1024,h:768,slug:'tall-tree',alt:'Tall tree opposite flashcard: one tree stretching up to the top of the card with the words tall tree, from the Kiddo School opposites set'},
  {order:4,file:'04-short-tree.webp',w:1024,h:768,slug:'short-tree',alt:'Short tree opposite flashcard: one little tree standing low on the card with the words short tree, from the Kiddo School opposites set'},
  {order:5,file:'05-long-pencil.webp',w:1024,h:768,slug:'long-pencil',alt:'Long pencil opposite flashcard: one yellow pencil stretching across the card with the words long pencil, from the Kiddo School opposites set'},
  {order:6,file:'06-short-pencil.webp',w:1024,h:768,slug:'short-pencil',alt:'Short pencil opposite flashcard: one little pencil stub with the words short pencil, from the Kiddo School opposites set'},
  {order:7,file:'07-full-glass.webp',w:1024,h:768,slug:'full-glass',alt:'Full glass opposite flashcard: one glass filled right to the top with juice and the words full glass, from the Kiddo School opposites set'},
  {order:8,file:'08-empty-glass.webp',w:1024,h:768,slug:'empty-glass',alt:'Empty glass opposite flashcard: one glass with every drop gone and the words empty glass, from the Kiddo School opposites set'},
  {order:9,file:'09-hot-soup.webp',w:1024,h:768,slug:'hot-soup',alt:'Hot soup opposite flashcard: one steaming bowl of soup with the words hot soup, from the Kiddo School opposites set'},
  {order:10,file:'10-cold-ice-cream.webp',w:1024,h:768,slug:'cold-ice-cream',alt:'Cold ice cream opposite flashcard: one bowl with three scoops of frosty ice cream and the words cold ice cream, from the Kiddo School opposites set'},
  {order:11,file:'11-open-door.webp',w:1024,h:768,slug:'open-door',alt:'Open door opposite flashcard: one door standing wide open with the words open door, from the Kiddo School opposites set'},
  {order:12,file:'12-closed-door.webp',w:1024,h:768,slug:'closed-door',alt:'Closed door opposite flashcard: one door shut tight with the words closed door, from the Kiddo School opposites set'}
 ]
};

/* Parent-facing words, keyed by card slug. Every card gets its own intro,
   its own line to say together, one real-world activity, one parent note
   and one "spot it" prompt for the class viewer — written for the pair it
   belongs to, never copied between cards. */
export const oppositesCardContent={
 'big-ball':{
  word:'Big ball',
  cardTitle:'Big Ball Flashcard — the big half of the ball pair for Preschoolers',
  intro:'The big ball fills its whole card — and “big” only means something next to something small, which is why this card is always shown beside the small ball. Big is one of the first comparing words children truly own, because they live it all day: big spoons, big boxes, big hugs.',
  say:'Big ball! Stretch your arms out wide — THIS big!',
  try:'Bigger and smaller hands: lay your hand on the card, then your child’s, then a teddy’s paw. Three sizes, one word — and big wins every time.',
  note:'Big always means “bigger than something”. If your child calls every ball big, hold the small ball card next to it and let the two cards do the teaching.',
  spot:'Find something BIG in this room — something bigger than your shoe!',
  metaDescription:'Meet the big ball opposite flashcard: one big ball filling the card, with a bigger-and-smaller hands game to try at home. Free to download and print.'
 },
 'small-ball':{
  word:'Small ball',
  cardTitle:'Small Ball Flashcard — the small half of the ball pair for Preschoolers',
  intro:'The small ball is the little half of the pair — same round shape, same ball-ness, a completely different size. “Small” lands best right after “big”, when the two cards sit side by side and the difference is impossible to miss.',
  say:'Small ball! Tiny enough to hide in one hand.',
  try:'Play find-something-small: “bring me a small thing!” A sock, a spoon, a bottle cap. Small things are hiding in every room, and your child knows exactly where.',
  note:'Children often decide the small card is “the baby one”. That is lovely comparing talk — run with it: the baby ball and the papa ball are both correct size science.',
  spot:'Find something SMALL — small enough to hide in your hand!',
  metaDescription:'Meet the small ball opposite flashcard: one tiny ball and a find-something-small hunt to play at home. Free to download.'
 },
 'tall-tree':{
  word:'Tall tree',
  cardTitle:'Tall Tree Flashcard — the tall half of the tree pair for Preschoolers',
  intro:'The tall tree reaches right to the top of its card, the way tall things reach past everything around them. Tall is a comparing word children meet with their whole body: they stand up tall, they stretch up tall, and they line up against the door frame to find out just how tall they are.',
  say:'Tall tree! Stand up tall like a tree — reach for the sky!',
  try:'Stand back to back and ask “who is taller?” Then let a teddy join the line-up. Being measured against the fridge with a book mark is the bonus round.',
  note:'Tall and long get mixed up at three, and that is fine — both mean “stretches out more than the other one”. The measuring games matter far more than the rule.',
  spot:'Reach UP high like the tall tree — can you touch the sky?',
  metaDescription:'Meet the tall tree opposite flashcard: one tree reaching for the sky, with a back-to-back who-is-taller game for home. Free to download and print.'
 },
 'short-tree':{
  word:'Short tree',
  cardTitle:'Short Tree Flashcard — the short half of the tree pair for Preschoolers',
  intro:'The short tree stands low and friendly, about the height a tree would be if it came up to your child’s chin. Beside the tall tree the comparison is instant — and “short” becomes a word children happily use on themselves, on pets, on the step stool.',
  say:'Short tree! Crouch down low — can you make yourself small?',
  try:'Measure everyone against the wall with a book: mark each height and say “tall… taller… shortest!” The shortest family member gets to be the short tree.',
  note:'Short stays a comparing word about trees, pencils and cups in this house — never about people. Trees are the safest place to practise it, and your child will keep it that way.',
  spot:'Crouch down LOW like the short tree — how small can you be?',
  metaDescription:'Meet the short tree opposite flashcard: one little tree and a measure-the-family game to play at home. Free to download.'
 },
 'long-pencil':{
  word:'Long pencil',
  cardTitle:'Long Pencil Flashcard — the long half of the pencil pair for Preschoolers',
  intro:'The long pencil stretches across its whole card from tip to end — the clearest “long” a three-year-old ever meets, because pencils are already the most important long things in a preschooler’s life. Beside the short pencil, the comparing is easy to see and easy to say.',
  say:'Long pencil! Stretch your arms out wide — looong!',
  try:'Line up three things on the table — a crayon, a spoon, a sock — and order them from longest to shortest together. Rearranging the line is half the fun.',
  note:'Long is about the stretch, not the overall size: a snake is long, a train is long, a piece of spaghetti is very long. Anything that stretches out gives the word a home.',
  spot:'Find something LONG — something longer than your foot!',
  metaDescription:'Meet the long pencil opposite flashcard: one pencil stretching across the card, with a line-them-up long-to-short game for home. Free to download and print.'
 },
 'short-pencil':{
  word:'Short pencil',
  cardTitle:'Short Pencil Flashcard — the short half of the pencil pair for Preschoolers',
  intro:'The short pencil is the well-loved stub every household owns — sharpened down to a friendly little fellow with many drawings behind it. It is “short” in the most honest way: it used to be long, and holding the two cards together tells that whole story without a single extra word.',
  say:'Short pencil! A little stub — like it got sharpened away.',
  try:'Line up crayons from longest to shortest, then hold the two pencil cards side by side and say both words in one breath: “long pencil… short pencil!”',
  note:'If your child calls the short pencil “the little one”, that is real comparing talk too — big, little, long and short all live on the same street at three.',
  spot:'Find something SHORT — shorter than your hand!',
  metaDescription:'Meet the short pencil opposite flashcard: one little pencil stub and a crayon line-up game to play at home. Free to download.'
 },
 'full-glass':{
  word:'Full glass',
  cardTitle:'Full Glass Flashcard — the full half of the glass pair for Preschoolers',
  intro:'The full glass is filled right to the top — a picture your child knows from every mealtime. Full is one of the easiest opposites to act out, because cups fill and empty all day long: water at the sink, milk at the table, bathwater everywhere.',
  say:'Full glass! Right to the top — every single drop is in.',
  try:'Fill a cup together at the sink and stop right at the top: “full!” Then pour it out slowly and watch it turn into the next card — empty.',
  note:'Water play is the whole lesson here, so put a towel down and let the spilling happen. Full and empty are sink words and bath words, not flashcard words.',
  spot:'Look for something FULL — a full cup, a full bowl, a full bathtub!',
  metaDescription:'Meet the full glass opposite flashcard: one glass filled to the top, with a fill-and-pour sink game to try at home. Free to download.'
 },
 'empty-glass':{
  word:'Empty glass',
  cardTitle:'Empty Glass Flashcard — the empty half of the glass pair for Preschoolers',
  intro:'The empty glass has given everything away — and children adore this word, because “all gone!” is already one of their favourite announcements. This card gives that everyday exclamation its proper name: not just gone, but empty.',
  say:'Empty glass! All gone — not one drop left.',
  try:'Drink up together and announce the words as they happen: “full… sipping… empty!” Then fill the glass again and tell the whole story in reverse.',
  note:'All done, all gone and empty are the same discovery at three. Accept every version — your child is comparing quantities, and that is real maths.',
  spot:'Find something EMPTY — an empty cup, an empty box, your empty hands!',
  metaDescription:'Meet the empty glass opposite flashcard: one glass with all-gone emptiness and a fill-it-again game for home. Free to download.'
 },
 'hot-soup':{
  word:'Hot soup',
  cardTitle:'Hot Soup Flashcard — the hot half of the hot-and-cold pair for Preschoolers',
  intro:'The hot soup steams right off the card — the warmest picture in the set. Hot is a word children learn carefully, because grown-ups say it in a serious voice: hot soup, hot tea, hot stove. This card lets them own the word safely, from a comfortable distance.',
  say:'Hot soup — careful, hot! Blow on it gently: whoosh, whoosh.',
  try:'Blow on pretend soup together: hands cupped around nothing, big gentle blows. Then at real mealtime your child gets to announce “hot!” — from a safe seat at the table.',
  note:'Hot is a safety word as well as a comparing word. Play the blowing game with imaginary soup, and keep every real hot thing well out of reach while the word settles in.',
  spot:'Rub your hands together to make them WARM — pretend hands are much safer than soup!',
  metaDescription:'Meet the hot soup opposite flashcard: one steaming bowl and a blow-on-the-pretend-soup game to play safely at home. Free to download and print.'
 },
 'cold-ice-cream':{
  word:'Cold ice cream',
  cardTitle:'Cold Ice Cream Flashcard — the cold half of the hot-and-cold pair for Preschoolers',
  intro:'The cold ice cream is the chilliest card in the set — a scoop that has to be eaten quickly before the opposite of cold happens. Children meet cold with their whole body: cold spoons, cold milk, cold hands from the freezer, and this very urgent dessert.',
  say:'Cold ice cream — brrr! Give me your best little shiver.',
  try:'Hold a cold spoon from the freezer and say “cold!” Then wrap both hands around a warm mug and say “warm!” Your child just felt the whole opposite pair in ten seconds.',
  note:'Ice cream melts on flashcards and on tables alike — if the game runs long, a cold spoon or an ice cube in a bowl plays the part just as well.',
  spot:'Give your biggest shiver — BRRR! Cold like ice cream!',
  metaDescription:'Meet the cold ice cream opposite flashcard: one frosty scoop and a cold-hands-warm-hands feeling game for home. Free to download.'
 },
 'open-door':{
  word:'Open door',
  cardTitle:'Open Door Flashcard — the open half of the door pair for Preschoolers',
  intro:'The open door stands wide, inviting — the picture of “come in”. Open is a doing word as much as a comparing word: children open doors, boxes, books and lids all day long, so this card names something their hands already know by heart.',
  say:'Open door! Push it wide — hello, come in!',
  try:'Play open-and-shut with a book: “open the book… close the book” with big arm motions. Then a box lid, then — with you beside them — the real door.',
  note:'Doors and three-year-olds need a grown-up standing in the middle. Keep the real door game slow and supervised — the card can do the fast opening for them.',
  spot:'Open your hands wide like the open door… now shut them!',
  metaDescription:'Meet the open door opposite flashcard: one door standing wide open, with an open-and-shut book game to play at home. Free to download.'
 },
 'closed-door':{
  word:'Closed door',
  cardTitle:'Closed Door Flashcard — the closed half of the door pair for Preschoolers',
  intro:'The closed door is shut tight — the other half of the pair, and a word your child meets a dozen times a day at home. Beside the open door the comparison tells the whole story: one stands wide, one is shut, and both words name what the door is doing right now.',
  say:'Closed door — all shut. Knock knock! Who is there?',
  try:'Play open-and-shut with a cupboard or a book: shout “open!” and “closed!” together as it happens. The switching is the whole game, and your child gets every turn.',
  note:'Some children love choosing open or closed; others love knocking first and waiting. Follow whichever version your child invents — both of them are comparing.',
  spot:'Knock knock on the table — who is there? A closed door!',
  metaDescription:'Meet the closed door opposite flashcard: one door shut tight and an open-shut knock-knock game for home. Free to download.'
 }
};
