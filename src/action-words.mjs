/* Kiddo School — CLASS 49 · Action Words (Ages 4–5): the Learning Path class
   page at /action-words/ (the first card of the deck is its main image) plus
   ONE SHORT PAGE PER CARD at /action-words/<slug>/, every short page linking
   back — the owner's Class 49 brief, 2026-11-02, verbatim: "Create one short
   page per card at /action-words/<slug>/ with a link back, where <slug> is
   the file name without '-action-words-flashcard-for-kids.jpg', for example
   /action-words/run-jump-climb-push/." The slug rule is followed exactly;
   the per-card shape is the Class 39 · Staying Safe pattern (the site's own
   short-page precedent, built the same way: the card, its printed words, one
   way to try it today, prev/next, and a link back on every page).

   NUMBERING (owner gate verbatim: "Add Class 49 'Action Words' (ages 4-5) to
   the Learning Path as the next class number after Class 48. If Class 48 is
   not live, tell me before assigning numbers."): Class 48 · Plants & How They
   Grow WAS probed LIVE at /plants-and-how-they-grow/ before 49 was assigned
   (LP row 48, count word forty-eight, production 2026-11-02), so 49 is the
   honest next number by the site's no-skip rule (unique, strictly increasing,
   no gap); the number rides DISPLAY COPY ONLY — the URL carries no class
   number.

   DECK: 24/24 files probed LIVE on R2 at
   school/learning-path/action-words/ (HTTP 200 image/jpeg, every file
   exactly 1414×2000 portrait, byte sizes matching the owner's R2 panel to
   the kB — panel kB are decimal). THE JPG MASTERS RIDE EXACTLY AS UPLOADED
   (owner: "The images are JPG, so do not convert or re-compress them, and
   keep the file names exactly as they are") — no conversion, no
   re-compression, names char-for-char. FOLDER NOTE (owner told in the round
   report): the brief said "internal R2 folder
   school/learning-path/action-words/flashcards/" but the live bucket keeps
   this deck at the FOLDER ROOT (probed 404 at …/flashcards/, 200 at the
   root — the dinosaurs/art-room/Class-39 quirk), so AW_BASE points at the
   root; the real R2 location is the truth. Titles/words/alts transcribed
   verbatim off 4 labeled contact sheets (scripts/aw-sheets.py — all 24 faces
   read; every card prints four or five labeled action scenes, no title
   banner). Inbound links: Classes 37, 6, 32 — all three link back, and this
   class page links back to all three + the Learning Path. */

import {R2} from './adventure-kit.mjs';

export const AW_PATH='/action-words/';
export const AW_BASE=R2+'school/learning-path/action-words/';
if(!AW_BASE.endsWith('/'))throw Error('action-words: base must end with /');

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* File order = the deck's teaching order (the every-day shelf first, its
   lead card being the deck's FIRST file as uploaded — bite-chew-smell-touch-
   feel, the owner's R2 panel row 1 — which also serves as the class page's
   main image). `title` = the page/tile name; `words` = the labeled words
   printed on the card face, verbatim off the contact sheets; `sub` = the
   subject pill; `say` = the kid-voice line under the tile image on the class
   page. The card's printed words are quoted word-for-word on its short
   page. Every card is portrait 1414×2000. */
const CARDS=[
 {slug:'bite-chew-smell-touch-feel',file:'bite-chew-smell-touch-feel-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Bite, Chew, Smell, Touch & Feel',sub:'Senses & mouth',level:1,skill:'Naming actions',
  words:['BITE','CHEW','SMELL','TOUCH','FEEL'],
  say:'Bite the apple, chew it up, smell the flower, touch the puppy, feel the soft towel — your mouth, your nose and your hands all have their own jobs.',
  alt:'A Kiddo School Action Words flashcard for kids titled Bite, Chew, Smell, Touch & Feel: the words BITE, CHEW, SMELL, TOUCH and FEEL beside a boy biting a red apple, a girl chewing her food, a boy smelling a pink flower, a girl petting a golden puppy and a boy hugging a soft blue towel.'},
 {slug:'eat-drink-sleep-wake-rest',file:'eat-drink-sleep-wake-rest-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Eat, Drink, Sleep, Wake & Rest',sub:'Day routine',level:1,skill:'Day routine',
  words:['EAT','DRINK','SLEEP','WAKE','REST'],
  say:'Eat your cereal, drink your milk, sleep at night, wake in the morning, rest in the chair — the five moves of a whole day.',
  alt:'A Kiddo School Action Words flashcard for kids titled Eat, Drink, Sleep, Wake & Rest: the words EAT, DRINK, SLEEP, WAKE and REST beside a boy eating cereal from a bowl, a girl drinking a glass of milk, a boy asleep in bed, a girl waking with a big stretch and a boy resting in a blue armchair.'},
 {slug:'look-listen-talk-smile-laugh',file:'look-listen-talk-smile-laugh-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Look, Listen, Talk, Smile & Laugh',sub:'Talking',level:1,skill:'Listening',
  words:['LOOK','LISTEN','TALK','SMILE','LAUGH'],
  say:'Look over there, listen a moment, talk it out, smile at a friend, laugh at the joke — the five moves of a good conversation.',
  alt:'A Kiddo School Action Words flashcard for kids titled Look, Listen, Talk, Smile & Laugh: the words LOOK, LISTEN, TALK, SMILE and LAUGH beside a boy shading his eyes to look far away, a girl listening with her hand cupped to her ear, a boy talking, a girl smiling and a boy laughing out loud.'},
 {slug:'open-close-give-take-help',file:'open-close-give-take-help-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Open, Close, Give, Take & Help',sub:'Kindness',level:1,skill:'Opposites',
  words:['OPEN','CLOSE','GIVE','TAKE','HELP'],
  say:'Open the box, close the lid, give a gift, take a turn, help a friend up — five words that open doors and hearts.',
  alt:'A Kiddo School Action Words flashcard for kids titled Open, Close, Give, Take & Help: the words OPEN, CLOSE, GIVE, TAKE and HELP beside a boy opening a yellow box, a girl closing a blue box, a boy giving a wrapped gift to a girl, a girl taking it with both hands and a boy helping a smaller boy up from the ground.'},
 {slug:'clean-sweep-dry-fix-pack',file:'clean-sweep-dry-fix-pack-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Clean, Sweep, Dry, Fix & Pack',sub:'Helping out',level:2,skill:'Helping out',
  words:['CLEAN','SWEEP','DRY','FIX','PACK'],
  say:'Clean the table, sweep the floor, dry the plate, fix the toy car, pack the toys away — five jobs that make a room shine.',
  alt:'A Kiddo School Action Words flashcard for kids titled Clean, Sweep, Dry, Fix & Pack: the words CLEAN, SWEEP, DRY, FIX and PACK beside a girl wiping the floor with a spray bottle and cloth, a boy sweeping with a broom, a boy drying a plate with a towel, a boy fixing a red toy car and a girl packing toys into a box.'},
 {slug:'tie-untie-fold-carry-hold',file:'tie-untie-fold-carry-hold-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Tie, Untie, Fold, Carry & Hold',sub:'Careful hands',level:2,skill:'Self-care',
  words:['TIE','UNTIE','FOLD','CARRY','HOLD'],
  say:'Tie the lace, untie the knot, fold the paper, carry the box, hold your book tight — five careful-hands words.',
  alt:'A Kiddo School Action Words flashcard for kids titled Tie, Untie, Fold, Carry & Hold: the words TIE, UNTIE, FOLD, CARRY and HOLD beside a boy tying a red necktie, a girl untying a blue scarf, a boy folding a green mat, a girl carrying a cardboard box and a boy holding a blue book to his chest.'},
 {slug:'sit-stand-walk-hop-skip',file:'sit-stand-walk-hop-skip-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Sit, Stand, Walk, Hop & Skip',sub:'Body moves',level:1,skill:'Naming actions',
  words:['SIT','STAND','WALK','HOP','SKIP'],
  say:'Sit for the story, stand for the song, walk to school, hop on one foot, skip the rest of the way — five speeds every body loves.',
  alt:'A Kiddo School Action Words flashcard for kids titled Sit, Stand, Walk, Hop & Skip: the words SIT, STAND, WALK, HOP and SKIP beside a boy sitting cross-legged, a girl standing tall, a boy walking, a boy hopping on one leg and a girl skipping.'},
 {slug:'run-jump-climb-push',file:'run-jump-climb-push-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Run, Jump, Climb & Push',sub:'Playground',level:1,skill:'Moving',
  words:['RUN','JUMP','CLIMB','PUSH'],
  say:'Run to the tree, jump the crack, climb the ladder, push the block — four moves that make your legs famous.',
  alt:'A Kiddo School Action Words flashcard for kids titled Run, Jump, Climb & Push: the words RUN, JUMP, CLIMB and PUSH beside a boy running in a blue shirt, a girl jumping in yellow, a boy climbing a green ladder and a boy pushing a big red block.'},
 {slug:'run-jump-climb-push-pull',file:'run-jump-climb-push-pull-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Run, Jump, Climb, Push & Pull',sub:'Playground',level:3,skill:'Team play',
  words:['RUN','JUMP','CLIMB','PUSH','PULL'],
  say:'Run, jump, climb, push — and pull the rope too! The four-move card with one extra power.',
  alt:'A Kiddo School Action Words flashcard for kids titled Run, Jump, Climb, Push & Pull: the words RUN, JUMP, CLIMB, PUSH and PULL beside a boy in a green shirt running, a girl jumping in pink, a boy climbing a blue ladder, a boy pushing an orange box and a girl pulling a rope.'},
 {slug:'crawl-kneel-point-clap-wave',file:'crawl-kneel-point-clap-wave-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Crawl, Kneel, Point, Clap & Wave',sub:'Body moves',level:1,skill:'Naming actions',
  words:['CRAWL','KNEEL','POINT','CLAP','WAVE'],
  say:'Crawl like a baby, kneel down low, point it out, clap for the show, wave bye-bye — five moves you already know by heart.',
  alt:'A Kiddo School Action Words flashcard for kids titled Crawl, Kneel, Point, Clap & Wave: the words CRAWL, KNEEL, POINT, CLAP and WAVE beside a boy crawling on hands and knees, a girl kneeling, a boy pointing, a girl clapping and a boy waving.'},
 {slug:'turn-spin-stop-start-wait',file:'turn-spin-stop-start-wait-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Turn, Spin, Stop, Start & Wait',sub:'Game words',level:2,skill:'Taking turns',
  words:['TURN','SPIN','STOP','START','WAIT'],
  say:'Turn around, spin in a circle, stop on a dime, start on your mark, wait your turn — the five moves games are made of.',
  alt:'A Kiddo School Action Words flashcard for kids titled Turn, Spin, Stop, Start & Wait: the words TURN, SPIN, STOP, START and WAIT beside a boy turning with a blue arrow, a girl twirling in her skirt, a boy holding his palm out, a boy bursting off a start line and a girl waiting patiently.'},
 {slug:'blow-wave-shake-stretch-bend',file:'blow-wave-shake-stretch-bend-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Blow, Wave, Shake, Stretch & Bend',sub:'Body moves',level:1,skill:'Body control',
  words:['BLOW','WAVE','SHAKE','STRETCH','BEND'],
  say:'Blow the pinwheel, wave hello, shake the maraca, stretch up tall, bend down low — five moves that all start with you.',
  alt:'A Kiddo School Action Words flashcard for kids titled Blow, Wave, Shake, Stretch & Bend: the words BLOW, WAVE, SHAKE, STRETCH and BEND beside a boy blowing a pinwheel, a girl waving hello, a boy shaking a maraca, a girl stretching her arms up high and a boy bending to touch his toes.'},
 {slug:'build-draw-cook-wash-read',file:'build-draw-cook-wash-read-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Build, Draw, Cook, Wash & Read',sub:'Everyday skills',level:2,skill:'Making',
  words:['BUILD','DRAW','COOK','WASH','READ'],
  say:'Build with blocks, draw a house, cook in a pot, wash your hands, read a book — the five things big kids do all day.',
  alt:'A Kiddo School Action Words flashcard for kids titled Build, Draw, Cook, Wash & Read: the words BUILD, DRAW, COOK, WASH and READ beside a boy stacking colorful blocks, a girl drawing a house, a boy in a chef hat stirring a pot, a girl washing her hands at a sink and a boy reading a green book.'},
 {slug:'read-write-count-match-sort',file:'read-write-count-match-sort-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Read, Write, Count, Match & Sort',sub:'School skills',level:2,skill:'School skills',
  words:['READ','WRITE','COUNT','MATCH','SORT'],
  say:'Read the book, write your name, count one-two-three, match the apples, sort the bins — five ready-for-school words.',
  alt:'A Kiddo School Action Words flashcard for kids titled Read, Write, Count, Match & Sort: the words READ, WRITE, COUNT, MATCH and SORT beside a boy reading a blue book, a girl writing at a desk, a boy counting 1-2-3 blocks, a girl matching apple picture cards and a boy sorting toys into blue, red and yellow bins.'},
 {slug:'pull-build-draw-cook',file:'pull-build-draw-cook-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Pull, Build, Draw & Cook',sub:'Making',level:3,skill:'Motor skills',
  words:['PULL','BUILD','DRAW','COOK'],
  say:'Pull the rope, build the tower, draw the flower, cook the soup — four strong hands, four busy words.',
  alt:'A Kiddo School Action Words flashcard for kids titled Pull, Build, Draw & Cook: the words PULL, BUILD, DRAW and COOK beside a boy pulling a rope, a boy stacking blocks, a girl drawing a flower and a girl in a pink chef hat stirring a pot.'},
 {slug:'plant-water-dig-cut-mix',file:'plant-water-dig-cut-mix-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Plant, Water, Dig, Cut & Mix',sub:'Garden & kitchen',level:3,skill:'Care taking',
  words:['PLANT','WATER','DIG','CUT','MIX'],
  say:'Plant a seed, water the pot, dig the hole, cut the paper, mix the batter — five getting-things-grown words.',
  alt:'A Kiddo School Action Words flashcard for kids titled Plant, Water, Dig, Cut & Mix: the words PLANT, WATER, DIG, CUT and MIX beside a girl planting a seedling in soil, a boy watering a potted plant with a blue can, a boy digging with a shovel, a girl cutting yellow paper with scissors and a boy whisking batter in a bowl.'},
 {slug:'ride-drive-fly-sail-row',file:'ride-drive-fly-sail-row-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Ride, Drive, Fly, Sail & Row',sub:'Going places',level:2,skill:'Getting around',
  words:['RIDE','DRIVE','FLY','SAIL','ROW'],
  say:'Ride the bike, drive the car, fly like a hero, sail the boat, row the oars — five ways to go, go, go.',
  alt:'A Kiddo School Action Words flashcard for kids titled Ride, Drive, Fly, Sail & Row: the words RIDE, DRIVE, FLY, SAIL and ROW beside a boy in a helmet riding a red bicycle, a boy driving a red car, a boy flying in a superhero cape, a girl in a life vest steering a sailboat and a boy rowing a wooden boat.'},
 {slug:'sing-dance-swim-throw-catch',file:'sing-dance-swim-throw-catch-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Sing, Dance, Swim, Throw & Catch',sub:'Performing',level:2,skill:'Performing',
  words:['SING','DANCE','SWIM','THROW','CATCH'],
  say:'Sing a song, dance a jig, swim a lap, throw the ball, catch the throw — five show-off words.',
  alt:'A Kiddo School Action Words flashcard for kids titled Sing, Dance, Swim, Throw & Catch: the words SING, DANCE, SWIM, THROW and CATCH beside a girl singing into a microphone, a boy dancing, a boy in a cap and goggles swimming, a boy throwing a red ball and a girl catching an orange ball.'},
 {slug:'win-miss-score-kick-hit',file:'win-miss-score-kick-hit-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Win, Miss, Score, Kick & Hit',sub:'Game words',level:3,skill:'Good sports',
  words:['WIN','MISS','SCORE','KICK','HIT'],
  say:'Win the trophy, miss the goal, score the basket, kick the ball, hit the baseball — five game-day words, every one fair.',
  alt:'A Kiddo School Action Words flashcard for kids titled Win, Miss, Score, Kick & Hit: the words WIN, MISS, SCORE, KICK and HIT beside a boy lifting a gold trophy, a boy watching a soccer ball sail past, a girl scoring a basketball into a hoop, a boy kicking a soccer ball and a girl swinging a bat at a baseball.'},
 {slug:'shout-whisper-ask-answer-think',file:'shout-whisper-ask-answer-think-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Shout, Whisper, Ask, Answer & Think',sub:'Voice words',level:2,skill:'Speaking up',
  words:['SHOUT','WHISPER','ASK','ANSWER','THINK'],
  say:'Shout across the yard, whisper the secret, ask the question, answer the caller, think it through — your voice has five settings.',
  alt:'A Kiddo School Action Words flashcard for kids titled Shout, Whisper, Ask, Answer & Think: the words SHOUT, WHISPER, ASK, ANSWER and THINK beside a boy shouting with his hands around his mouth, a girl whispering to a boy, a boy raising his hand, a girl with a finger raised and a boy thinking with his hand on his chin.'},
 {slug:'enjoy-love-like-hate-need',file:'enjoy-love-like-hate-need-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Enjoy, Love, Like, Hate & Need',sub:'Feelings',level:3,skill:'Feelings talk',
  words:['ENJOY','LOVE','LIKE','HATE','NEED'],
  say:'Enjoy the ice cream, love your teddy, like your snack, hate the yucky bite, need your hug — five feeling words for five big moments.',
  alt:'A Kiddo School Action Words flashcard for kids titled Enjoy, Love, Like, Hate & Need: the words ENJOY, LOVE, LIKE, HATE and NEED beside a boy enjoying an ice-cream cone with a thumbs-up, a girl hugging her teddy bear, a boy giving a thumbs-up, a boy frowning with his palms out and a girl with her hands clasped.'},
 {slug:'find-lose-choose-share-show',file:'find-lose-choose-share-show-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Find, Lose, Choose, Share & Show',sub:'Play words',level:3,skill:'Decision making',
  words:['FIND','LOSE','CHOOSE','SHARE','SHOW'],
  say:'Find the car, lose the backpack, choose a ball, share the book, show your drawing — five words for playing together.',
  alt:'A Kiddo School Action Words flashcard for kids titled Find, Lose, Choose, Share & Show: the words FIND, LOSE, CHOOSE, SHARE and SHOW beside a boy finding a toy car in a yellow box, a girl searching her pink backpack, a boy choosing between a red car and a striped ball, two kids sharing one blue book and a boy holding up his drawing.'},
 {slug:'borrow-return-buy-sell-pay',file:'borrow-return-buy-sell-pay-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Borrow, Return, Buy, Sell & Pay',sub:'People & trading',level:3,skill:'Money words',
  words:['BORROW','RETURN','BUY','SELL','PAY'],
  say:'Borrow a book, give it back, buy at the market, sell your teddy, pay the helper — the five trades every shop and library runs on.',
  alt:'A Kiddo School Action Words flashcard for kids titled Borrow, Return, Buy, Sell & Pay: the words BORROW, RETURN, BUY, SELL and PAY beside a boy borrowing a red book, a boy returning it to a girl, a boy paying a cashier at a market stall, a girl selling a teddy bear and a boy handing over a banknote.'},
 {slug:'knock-ring-answer-hang-unhang',file:'knock-ring-answer-hang-unhang-action-words-flashcard-for-kids.jpg',w:1414,h:2000,
  title:'Knock, Ring, Answer, Hang & Unhang',sub:'Doors & phones',level:3,skill:'Safe routines',
  words:['KNOCK','RING','ANSWER','HANG','UNHANG'],
  say:'Knock on the door, ring the bell, answer the phone, hang the receiver up, unhang it to call again — the door-and-phone card.',
  alt:'A Kiddo School Action Words flashcard for kids titled Knock, Ring, Answer, Hang & Unhang: the words KNOCK, RING, ANSWER, HANG and UNHANG beside a boy knocking on a brown door, a girl pressing a doorbell, a boy answering a desk phone, a boy replacing a handset and a girl lifting a handset off a blue desk phone.'},
];

export const AW_CARDS=CARDS;
export const awBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));
export const AW_ORDER=CARDS.map(c=>c.slug);
if(AW_ORDER.length!==24)throw Error('action-words: expected 24 cards, got '+AW_ORDER.length);
if(new Set(AW_ORDER).size!==24)throw Error('action-words: duplicate slugs');
/* Slugs are the file names minus the common suffix — the owner's rule,
   spot-checked against his own example (/action-words/run-jump-climb-push/). */
for(const c of CARDS)if(c.file!==c.slug+'-action-words-flashcard-for-kids.jpg')throw Error('action-words: file name does not follow the owner slug rule: '+c.file);

/* Five shelves, in a four-year-old's day order: the every-day verbs first
   (their lead card is the deck's first upload), then the big moves, the
   making, the going and the people words. Every card appears exactly once. */
const SHELVES=[
 {id:'everyday',label:'THE EVERY-DAY SHELF \u00b7 6 CARDS',h2:'The moves a day is made of.',
  hint:'Six cards for the clock of a day: bite and chew the snack, eat and drink the meal, sleep and wake and rest, look and listen and talk, open and close and give and take and help, clean and sweep and dry and fix and pack, then tie and untie and fold and carry and hold. All right here on this page!'},
 {id:'moves',label:'THE BIG MOVES SHELF \u00b7 6 CARDS',h2:'Sit, stand, run — the body in motion.',
  hint:'Six cards for wiggly bodies: sit and stand and walk and hop and skip, run and jump and climb and push, the same four with a pull on top, crawl and kneel and point and clap and wave, turn and spin and stop and start and wait, and blow and wave and shake and stretch and bend. All right here on this page!'},
 {id:'make',label:'THE MAKE &amp; DO SHELF \u00b7 4 CARDS',h2:'Hands that build, write and stir.',
  hint:'Four cards for busy hands: build and draw and cook and wash and read, read and write and count and match and sort, pull and build and draw and cook, and plant and water and dig and cut and mix. All right here on this page!'},
 {id:'go',label:'THE GO &amp; PLAY SHELF \u00b7 3 CARDS',h2:'Wheels, water, balls and songs.',
  hint:'Three cards for going and showing off: ride and drive and fly and sail and row, sing and dance and swim and throw and catch, and the game-day words win and miss and score and kick and hit. All right here on this page!'},
 {id:'people',label:'THE PEOPLE SHELF \u00b7 5 CARDS',h2:'The words that need another person.',
  hint:'Five cards for playing with people: shout and whisper and ask and answer and think, enjoy and love and like and hate and need, find and lose and choose and share and show, borrow and return and buy and sell and pay, and knock and ring and answer and hang and unhang. All right here on this page!'},
];
const shelfCount=Object.fromEntries(SHELVES.map(s=>[s.id,0]));
SHELVES.forEach(s=>{s.slugs=[];});
/* slugs assigned below in card order so the deck order and the page order
   never disagree */
for(const c of CARDS){const id=
 c.slug==='bite-chew-smell-touch-feel'||c.slug==='eat-drink-sleep-wake-rest'||c.slug==='look-listen-talk-smile-laugh'||c.slug==='open-close-give-take-help'||c.slug==='clean-sweep-dry-fix-pack'||c.slug==='tie-untie-fold-carry-hold'?'everyday':
 c.slug==='sit-stand-walk-hop-skip'||c.slug==='run-jump-climb-push'||c.slug==='run-jump-climb-push-pull'||c.slug==='crawl-kneel-point-clap-wave'||c.slug==='turn-spin-stop-start-wait'||c.slug==='blow-wave-shake-stretch-bend'?'moves':
 c.slug==='build-draw-cook-wash-read'||c.slug==='read-write-count-match-sort'||c.slug==='pull-build-draw-cook'||c.slug==='plant-water-dig-cut-mix'?'make':
 c.slug==='ride-drive-fly-sail-row'||c.slug==='sing-dance-swim-throw-catch'||c.slug==='win-miss-score-kick-hit'?'go':
 c.slug==='shout-whisper-ask-answer-think'||c.slug==='enjoy-love-like-hate-need'||c.slug==='find-lose-choose-share-show'||c.slug==='borrow-return-buy-sell-pay'||c.slug==='knock-ring-answer-hang-unhang'?'people':
 null;
 if(!id)throw Error('action-words: card not shelved: '+c.slug);
 shelfCount[id]++;SHELVES.find(s=>s.id===id).slugs.push(c.slug);}
if(shelfCount.everyday!==6||shelfCount.moves!==6||shelfCount.make!==4||shelfCount.go!==3||shelfCount.people!==5)throw Error('action-words: shelf sizes drifted '+JSON.stringify(shelfCount));

/* Level pills name school grades (the Class 47/48 owner rule): Preschool ·
   Name it (8), Grade 1 · Do it (8), Grade 2 · Own it (8). 8/8/8 guarded. */
const LEVEL_NAMES={1:'Preschool \u00b7 Name it',2:'Grade 1 \u00b7 Do it',3:'Grade 2 \u00b7 Own it'};
const LEVEL_BLURB={
 1:'the eight naming cards — bite, eat, look, open, sit, run, crawl, blow — the moves a four-year-old is already doing while you say the word',
 2:'the eight doing cards — clean, tie, turn, build, read, sing, ride, shout — each one a job small hands and loud voices finish today',
 3:'the eight owning-it cards — pull the rope, plant the seed, borrow the book, win and miss the game — the bigger moves that grow with the child'};
const LEVEL_COUNTS=Object.fromEntries([1,2,3].map(l=>[l,CARDS.filter(c=>c.level===l).length]));
if(LEVEL_COUNTS[1]!==8||LEVEL_COUNTS[2]!==8||LEVEL_COUNTS[3]!==8)throw Error('action-words: level sizes drifted '+JSON.stringify(LEVEL_COUNTS));
for(const c of CARDS){if(!c.skill)throw Error('action-words: missing skill '+c.slug);}

/* Short-page copy: one fresh intro and one fresh practice step per card,
   authored here so the 24 pages never share a sentence with each other or
   with the class page. TONE (owner rule): the lesson talks DIRECTLY TO KIDS
   — every line says "you" and means the four-year-old holding the card. */
const INTRO={
 'bite-chew-smell-touch-feel':'Your body has five little workers and this card names each one: your teeth BITE and CHEW, your nose SMELLS, your fingers TOUCH, and your skin FEELS the softness of a towel. Five words, one you — every one of them already working before breakfast.',
 'eat-drink-sleep-wake-rest':'This card is your day from sunrise to lights-out: EAT the breakfast, DRINK the milk, SLEEP the big night sleep, WAKE with a morning stretch, and REST when your body asks for a break. Your body runs on these five words — every single day.',
 'look-listen-talk-smile-laugh':'This card is how friends talk: LOOK with your eyes, LISTEN with your ears, TALK with your words, SMILE to show you are glad, and LAUGH when something is truly funny. Two people and these five moves make a friendship.',
 'open-close-give-take-help':'The kindest mechanics card: OPEN unboxes the surprise, CLOSE keeps the pieces together, GIVE hands the gift over, TAKE receives it with a thank-you, and HELP pulls a friend back onto their feet. Give and take make every playdate work.',
 'clean-sweep-dry-fix-pack':'The helping-hands card: CLEAN wipes things spotless, SWEEP gathers the crumbs into a pile, DRY chases the water off the plate, FIX repairs the broken wheel, and PACK sends every toy home to its box. Grown-ups do these all day — and so can you.',
 'tie-untie-fold-carry-hold':'Careful hands, five jobs: TIE makes the lace or the scarf neat, UNTIE undoes the knot gently, FOLD turns paper into a card, CARRY holds the box steady on a walk, and HOLD keeps the book safe against your chest. These are the quiet-strong moves.',
 'sit-stand-walk-hop-skip':'From slowest to fastest, this card is your legs in order: SIT still for the story, STAND up tall, WALK one foot then the other, HOP on one leg like a flamingo, and SKIP with a little jump in every step. Five speeds, one kid, all of them yours.',
 'run-jump-climb-push':'The playground classic: RUN fast, JUMP high, CLIMB up, PUSH strong. Four words, four powers your legs and arms already have — this card just names them so you can call your own moves.',
 'run-jump-climb-push-pull':'The four-move playground card grew a fifth: RUN, JUMP, CLIMB, PUSH — and now PULL, tugging the rope hand over hand. Same strong legs, one extra arm move. This is the deck\u2019s own sequel, and the pull is the power-up.',
 'crawl-kneel-point-clap-wave':'You did this card before you could even talk: CRAWL across the floor, KNEEL down to reach the low shelf, POINT at the thing you want, CLAP when you are proud, and WAVE bye-bye at the door. Now you get to name them.',
 'turn-spin-stop-start-wait':'Every game you play uses this card: TURN when the music says so, SPIN until the room giggles, STOP when the whistle blows, START on the magic word, and WAIT while it gets to your turn. Musical chairs, red-light-green-light, board games — this card runs them all.',
 'blow-wave-shake-stretch-bend':'Wind, hello, music, tall and small: this card shows five moves your whole body can make. BLOW pushes the air out of YOU, WAVE says hi with your hand, SHAKE makes the maraca rattle, STRETCH reaches for the ceiling and BEND folds you down to your toes.',
 'build-draw-cook-wash-read':'Five make-it-happen words: BUILD stacks the blocks up, DRAW puts your idea on paper, COOK turns food into dinner, WASH gets your hands clean first, and READ takes you into a book without moving your feet. This card is a whole busy afternoon on one page.',
 'read-write-count-match-sort':'The big-kid-school card: READ opens a book, WRITE puts your name on your art, COUNT lines up one-two-three, MATCH finds the twin card, and SORT sends every toy to its own bin. These five are the exact moves your classroom will ask for.',
 'pull-build-draw-cook':'Four do-it words with your hands: PULL hauls the rope in, BUILD stacks it high, DRAW sketches the flower, and COOK stirs the soup. The four-hands card — everything on it happens because your arms made it happen.',
 'plant-water-dig-cut-mix':'Little-gardener words: DIG makes the hole, PLANT tucks the seed in, WATER gives it its first drink, CUT snips the paper label, and MIX stirs up the pancake batter for after. Half this card grows in a garden and half of it grows in a kitchen.',
 'ride-drive-fly-sail-row':'The going-places card: RIDE pedals the bike, DRIVE steers the car, FLY zooms through the air in a cape, SAIL catches the wind, and ROW pulls the oars through the water. Five vehicles, five moves — and every one of them starts with a kid in motion.',
 'sing-dance-swim-throw-catch':'The talent-show card: SING with your whole voice, DANCE with your whole body, SWIM with paddling arms, THROW with an aimed hand, and CATCH with quick ones. Every word on this card gets applause somewhere.',
 'win-miss-score-kick-hit':'Game day has five words and you need them ALL: KICK sends the soccer ball, HIT swings the bat, SCORE lands the basket, WIN lifts the trophy — and MISS? Miss is what happens right before the next try. Every player on this card does all five, and that is the secret.',
 'shout-whisper-ask-answer-think':'Your voice is a dial with five settings, and this card names them all: SHOUT for across the playground, WHISPER for the secret, ASK when you wonder, ANSWER when someone wonders at you, and THINK before any of them come out. Loud, soft, curious, helpful, careful — all five are yours.',
 'enjoy-love-like-hate-need':'Feelings have words, and this card names the big five: ENJOY when the treat is wonderful, LOVE when the teddy is yours forever, LIKE when it is just nice, HATE when it is absolutely not your favorite, and NEED when you truly must have it. Every one of them is okay to say.',
 'find-lose-choose-share-show':'Playtime has its own words: FIND when the toy turns up, LOSE when it hides, CHOOSE when two toys both look good, SHARE when one book becomes two happy kids, and SHOW when your drawing gets an audience. This card is how friends play fair.',
 'borrow-return-buy-sell-pay':'This card is a whole market day: BORROW when you take a book for a while, RETURN when you give it back, BUY when money gets a toy, SELL when the toy gets money, and PAY when the money changes hands. Every store you will ever walk into runs on these five moves.',
 'knock-ring-answer-hang-unhang':'The politest card in the deck: KNOCK before you enter, RING the doorbell when your hands are full, ANSWER when the phone calls, HANG the receiver back when the talk is done, and UNHANG it when it is your turn to call. Doors and phones open for kids who know these words.'};
const TRY={
 'bite-chew-smell-touch-feel':'Snack time is the drill: bite, chew, then sniff the snack before the second bite. Then a pet or a blanket for touch and feel — all five card words before the plate is empty.',
 'eat-drink-sleep-wake-rest':'Tonight, say the card backwards at bedtime: rest done, wake coming, sleep next. In the morning, wake, eat, drink — the card is a day, and now you can read it.',
 'look-listen-talk-smile-laugh':'At the table tonight, run the card in order: look at the person, listen to their story, talk about yours, smile, and laugh if it lands. That is a whole conversation, five words long.',
 'open-close-give-take-help':'Wrap any small toy in paper and run the whole card: give the gift, watch it be taken, help close the paper again — then open it one more time. Bonus points for helping with the wrap-up.',
 'clean-sweep-dry-fix-pack':'Choose your one job from the card — sweeper, dryer or packer — and do it for real today. The room looks better, and the job on the card just became YOUR job.',
 'tie-untie-fold-carry-hold':'Fold one piece of paper into a card for somebody, carry it to them without peeking, and hold it out with both hands. Tie the ribbon if there is one — untie it when they open it.',
 'sit-stand-walk-hop-skip':'On any short walk, do the card in order: walk one block, hop five times, skip to the corner, stand tall at the door, then sit for the story. The whole deck in one trip.',
 'run-jump-climb-push':'At the park, call your own card: run to the slide, jump off the last step, climb the ladder, push the swing (gently!) for a friend. Four words, one happy lap.',
 'run-jump-climb-push-pull':'Obstacle course, family edition: run ten steps, jump twice, climb one stair, push a chair (gently), pull a tied rope across the line. Five stations — one for every word on the card.',
 'crawl-kneel-point-clap-wave':'Play the card game: your grown-up calls a word — crawl, kneel, point, clap, wave — and YOU do the move. Five calls, five moves, then swap so you get to be the caller.',
 'turn-spin-stop-start-wait':'Play red light, green light with card words: start on green, stop on red, spin on yellow, turn on blue, and wait your turn in line. Five words, one game, everybody plays.',
 'blow-wave-shake-stretch-bend':'Stand up and run the whole card: blow at your fingers, wave at a window, shake an invisible maraca, stretch up, bend down. Five moves, one minute, all yours.',
 'build-draw-cook-wash-read':'Pick one block tower, one crayon house, one pot of pretend soup, one hand-wash and one story — five card words, five small jobs, one proud kid by dinner.',
 'read-write-count-match-sort':'Five-minute school tonight: read one book page, write your first letter, count the cups, match the socks, sort them into two piles. The whole card, done before bed.',
 'pull-build-draw-cook':'Helper hour: pull the blanket straight, build a block tower beside the cook, draw the menu on paper, then stir the real or pretend pot. Four words, one helpful kid.',
 'plant-water-dig-cut-mix':'Plant one seed in a cup today — dig, plant, water, done — then MIX the snack while it sits. Two card words growing on the windowsill and two in the bowl.',
 'ride-drive-fly-sail-row':'Next walk, play the going game: pedal legs like a bike, steer around a tree, fly with arms out, sail on the straight path, row through the grassy part. The whole card, traveled on foot.',
 'sing-dance-swim-throw-catch':'Pick your one card-word show tonight — a song, a wiggle, a ball toss across the room — and perform it. Throwing and catching count double if a grown-up plays too.',
 'win-miss-score-kick-hit':'Backyard three-try rule: kick three, hit three (with a grown-up pitching or a balloon), and count every miss out loud and proud — because on this card, a miss is just the word before the next try.',
 'shout-whisper-ask-answer-think':'Play the five settings today: shout the countdown outside, whisper the next word, ask one real question, answer one, and think for three slow seconds before talking. The dial works best when you move it on purpose.',
 'enjoy-love-like-hate-need':'At dinner, play the feeling game with your own plate: I like the noodles, I hate the peppers, I need a napkin, I love this. Four card words said out loud — that is the whole lesson.',
 'find-lose-choose-share-show':'Play hide-the-toy today: somebody hides, you FIND it. Then pick TWO toys and CHOOSE one to SHARE with a friend or sibling — and SHOW them how the game goes.',
 'borrow-return-buy-sell-pay':'Play shop today: one teddy, a few coins or buttons, one shopkeeper. Sell it, buy it back, pay, borrow it for naptime and return it in the morning — the whole card, acted out.',
 'knock-ring-answer-hang-unhang':'Practise the door first: knock knock, wait, come in. Then a pretend phone call on a toy phone — dial, answer, talk, hang up, unhang and call grandma back.'};
if(Object.keys(INTRO).length!==24||Object.keys(TRY).length!==24)throw Error('action-words: copy decks must cover 24 cards');
for(const s of AW_ORDER){if(!INTRO[s]||!TRY[s])throw Error('action-words: missing copy for '+s);}

const imgOf=slug=>AW_BASE+awBySlug[slug].file;

/* ---- The class page /action-words/ — the first card of the deck is its
   main image (hero figure + og:image), five shelves of tiles open the
   short pages ------------------------------------------------------------ */
export function awClassBody(){
 const first=CARDS[0];
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">LEARNING PATH \u00b7 CLASS 49 \u00b7 ACTION WORDS \u00b7 AGES 4\u20135</span><h1>Action Words — twenty-four printable verb flashcards for kids.</h1><p class="lesson-lede">Twenty-four printable action-word flashcards for ages four to five, in five shelves: the every-day shelf, the big-moves shelf, the make-and-do shelf, the go-and-play shelf and the people shelf. Every card shows four or five labeled actions a child can DO while naming them — bite the apple, run to the tree, mix the batter, wait your turn — and every card comes with one way to try it today, right here. The first card of the deck leads, right here.</p><div class="lesson-start"><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><a href="${AW_PATH}${first.slug}/" aria-label="Open the ${esc(first.title)} card page"><img src="${imgOf(first.slug)}" width="${first.w}" height="${first.h}" alt="${esc(first.alt)}"></a></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>One card. Four or five actions. A body that is already doing them.</h2><p class="lesson-copy">Verbs are the words you ACT OUT before you read them — and this class turns 118 of them into moves a body can rehearse. Every card prints a small cast of kids doing one thing each: the every-day cards walk a whole day from bite to bed, the big-moves cards run and jump and spin, the make-and-do cards build and stir and sort, the go-and-play cards ride and throw and win, and the people cards borrow and share and wait a turn. Say the word, do the move, and the verb sticks — because it was never a word to begin with. It was a thing your legs already knew.</p><p class="lesson-copy">One card a sitting is plenty. Start with the Every-Day Shelf — it opens with the deck\u2019s own first card and the day you already live — then let the Big-Moves Shelf spend the wiggles, the Make &amp; Do Shelf hand you the small jobs, the Go &amp; Play Shelf take you outdoors and the People Shelf finish with the words that need a friend. Every card is right here: the card itself, its labeled words quoted and one way to try it today.</p></section>`;
 const shelfSections=SHELVES.map(sh=>`<section class="wrap lesson-section" id="shelf-${sh.id}"><span class="eyebrow">${sh.label}</span><h2>${sh.h2}</h2><p class="fc-hint">${sh.hint} Every tile below shows the card at full print size, its words and one way to try it today.</p><div class="lp-tiles">${sh.slugs.map(sl=>{const c=awBySlug[sl];return `<a class="lp-tile" href="${AW_PATH}${c.slug}/"><img src="${imgOf(c.slug)}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.title)}</strong><span class="lp-tile-sub">${c.words.map(esc).join(' \u00b7 ')}</span></a>`;}).join('')}</div></section>`).join('');
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where the action words already live.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/4-years/sports-movement-and-play/">Sports, Movement &amp; Play in Class 37 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/baby/9-12-months/first-actions-body-parts/">First Actions &amp; Body Parts in Class 6 <span>\u00b7 Ages 9\u201312 months</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/life-skills-and-good-habits/">Life Skills &amp; Good Habits in Class 32 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Class 37 runs the sports — and the Big-Moves Shelf here names the moves the warm-ups ride on: run, jump, kick, throw, catch. Class 6 was where the baby first stacked and pointed and waved; this class is where the big kid NAMES all of it. Class 32 builds the good habits — and the every-day and helping words here (clean, sweep, tie, pack) are the verbs those habits are made of. And when you want the next class, the Learning Path holds all forty-nine in order.</p></section>`;
 return `${hero}${how}${shelfSections}${around}<p class="lesson-note"><strong>Say the word, do the move.</strong> Every card here works the moment a body joins in — pick one, act it out, and the verb is yours for keeps.</p>`;
}

/* ---- One short page per card: /action-words/<slug>/ ---------------------- */
function awCrumb(word){return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/learning-path/">Learning Path</a><span aria-hidden="true">/</span><a href="${AW_PATH}">Action Words</a><span aria-hidden="true">/</span><span aria-current="page">${esc(word)}</span></nav>`;}

export function awShortBody(slug){
 const c=awBySlug[slug];
 if(!c)throw Error('action-words: no card for '+slug);
 const idx=AW_ORDER.indexOf(slug);
 const prev=AW_ORDER[(idx+AW_ORDER.length-1)%AW_ORDER.length];
 const next=AW_ORDER[(idx+1)%AW_ORDER.length];
 const prevC=awBySlug[prev],nextC=awBySlug[next];
 const wordsLine=c.words.map(esc).join(' \u00b7 ');
 return `${awCrumb(c.title)}
 <div class="page-heading wrap"><span class="eyebrow">ACTION WORDS \u00b7 CLASS 49 \u00b7 AGES 4\u20135 \u00b7 CARD ${idx+1} OF 24</span><h1>${esc(c.title)}</h1><p>${INTRO[slug]}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main"><figure class="fc2-hero"><img src="${imgOf(slug)}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"><figcaption><strong>The ${esc(c.title)} card</strong><span>Action Words \u00b7 the labeled actions as the card prints them</span></figcaption></figure>
  <section class="fc2-learn" aria-label="The ${esc(c.title)} card">
   <div class="fc2-do"><h2>The card says</h2><p class="dino-action">\u201c${wordsLine}\u201d \u2014 printed on the card.</p></div>
   <div class="fc2-do"><h2>Try it today</h2><p>${TRY[slug]}</p></div>
   <div class="fc2-do fc2-note"><h2>Keep going</h2><p>${esc(c.title)} is one of the twenty-four cards in <a href="${AW_PATH}">Class 49 \u00b7 Action Words</a> \u2014 the class page holds the whole set, one shelf per part of the day. Next up: <a href="${AW_PATH}${next}/">${esc(nextC.title)}</a>.</p></div>
  </section></div>
  <aside class="fc2-rail" aria-label="More Action Words cards"><section class="fc2-block"><span class="eyebrow">PART OF CLASS 49</span><h2>Twenty-three more cards.</h2><p class="fc-hint">Card ${idx+1} of 24 \u00b7 Ages 4\u20135. Every card has its own page, and every page leads back to the class.</p><a class="button" href="${AW_PATH}">Back to Action Words <span aria-hidden="true">\u2197</span></a><div class="lesson-linkrow"><a class="button button-ghost" href="${AW_PATH}${prev}/">Previous \u00b7 ${esc(prevC.title)}</a><a class="button button-ghost" href="${AW_PATH}${next}/">Next \u00b7 ${esc(nextC.title)}</a></div><a class="button button-ghost" href="${imgOf(slug)}" download="${slug}.jpg">Download the card <span aria-hidden="true">\u2193</span></a><a class="button button-ghost" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a></section></aside>
 </div>`;
}

/* ---- SEO strings for the 24 short pages (keyword-first titles, the card's
   own intro plus the class tail for descriptions, the artwork alt for og) - */
export function awShortTitle(slug){
 const c=awBySlug[slug];if(!c)throw Error('action-words: no card for '+slug);
 return c.title+' — Action Words Flashcard for Kids (Class 49, Ages 4\u20135)';
}
export function awShortDesc(slug){
 const c=awBySlug[slug];if(!c)throw Error('action-words: no card for '+slug);
 return INTRO[slug]+' The card prints '+c.words.length+' labeled actions: '+c.words.map(w=>w.charAt(0)+w.slice(1).toLowerCase()).join(', ')+'. Part of the 24-card Action Words class (Class 49, ages 4\u20135) on the Kiddo.school Learning Path.';
}
export function awShortAlt(slug){
 const c=awBySlug[slug];if(!c)throw Error('action-words: no card for '+slug);
 return c.alt;
}

/* ---- Inbound-link blocks, appended at the three classes' page() calls;
   each card page links back via its rail, and the class page's AROUND THE
   SCHOOL section links back to all three. --------------------------------- */
/* Appended to Class 37 · Sports, Movement & Play. */
export const AW_SPORTS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">THE WORDS BEHIND THE WARM-UP</span><h2>Class 49 \u00b7 Action Words.</h2><p class="lesson-copy">Class 37 runs the sports — the drills, the games, the forty big moves; <a href="/action-words/">Class 49 \u00b7 Action Words</a> names the verbs underneath them: twenty-four printable action-word flashcards for ages 4\u20135, with run, jump, climb, push, throw, catch, kick and hit right there on the cards. Each card is right here with one way to try the move today — name it here, then go run it there.</p></section>`;
/* Appended to Class 6 · First Actions & Body Parts. */
export const AW_FIRST_ACTIONS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">FROM FIRST ACTIONS TO ACTION WORDS</span><h2>Class 49 \u00b7 Action Words.</h2><p class="lesson-copy">Class 6 was where the baby first stacked, pointed, clapped and waved along; <a href="/action-words/">Class 49 \u00b7 Action Words</a> is where the big kid NAMES all of it: twenty-four printable verb flashcards for ages 4\u20135 — crawl, point, clap, wave, blow, build — each card right here, the labeled actions quoted and one way to try them today. The same little moves, grown up enough to say out loud.</p></section>`;
/* Appended to Class 32 · Life Skills & Good Habits. */
export const AW_LIFE_SKILLS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">THE HABITS HAVE VERBS</span><h2>Class 49 \u00b7 Action Words.</h2><p class="lesson-copy">Class 32 builds the habits a good day runs on; <a href="/action-words/">Class 49 \u00b7 Action Words</a> names the verbs those habits are made of: twenty-four printable action-word flashcards for ages 4\u20135 — clean, sweep, dry, fix, pack, wash, tie, wait your turn — every card showing the action as a kid does it, right here with one way to try it today. The habit names the what; the verb names the how.</p></section>`;
