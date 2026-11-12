// Kiddo School — EXTRA CLASS · The Toddler Room: a TAUGHT class (owner
// directive 2026-11-12: "i want you to give the proper lesson like a teacher
// teaching the topic to kids — how to make them understand — its writing the
// normal description then there will be no difference between lesson"). The
// page is no longer a description with a card shelf underneath: it runs on the
// same classLessonBody engine as the eight Learning Path classes — hero,
// TODAY'S CLASS viewer with all 35 cards, a TEACHER'S LESSON with the exact
// words to say for every word, practice, check and close, parent instructions,
// try-together prompts and real-world reuse. The cards' printable copies live
// only in the flashcards library (/flashcards/toddler-room/); the old
// /toddler-room/learn/ per-card pages were retired (301s to this class).
import {lesson as trLesson} from './flashcards/data-toddler-room.mjs';

export const TR_PATH='/toddler-room/';

/* Teaching order = the way toddlers live: play first, then mealtimes, the
   sleep corner, care routines, getting dressed, and the furniture that holds
   the room together. The card viewer shows this order too, so "Card 7 ·
   picture book" matches what is on screen. */
const ORDER=[
 /* 1 · play time */ 'ball','building-blocks','stacking-rings','puzzle','crayons','easel','picture-book','play-mat','floor-cushion','stuffed-bunny','teddy-bear','toy-car','toy-drum','toy-train',
 /* 2 · mealtimes */ 'high-chair','bottle','sippy-cup',
 /* 3 · sleep corner */ 'crib','pillow','blanket','pajamas','night-light',
 /* 4 · care routines */ 'diaper','potty','soap','towel','toothbrush',
 /* 5 · getting dressed */ 'socks','shoes','comb',
 /* 6 · furniture */ 'table-and-chair','bookshelf','laundry-basket','changing-table','stroller'
];
const WORD={ball:'ball','building-blocks':'building blocks','stacking-rings':'stacking rings',puzzle:'puzzle',crayons:'crayons',easel:'easel','picture-book':'picture book','play-mat':'play mat','floor-cushion':'floor cushion','stuffed-bunny':'stuffed bunny','teddy-bear':'teddy bear','toy-car':'toy car','toy-drum':'toy drum','toy-train':'toy train','high-chair':'high chair',bottle:'bottle','sippy-cup':'sippy cup',crib:'crib',pillow:'pillow',blanket:'blanket',pajamas:'pajamas','night-light':'night light',diaper:'diaper',potty:'potty',soap:'soap',towel:'towel',toothbrush:'toothbrush',socks:'socks',shoes:'shoes',comb:'comb','table-and-chair':'table and chair',bookshelf:'bookshelf','laundry-basket':'laundry basket','changing-table':'changing table',stroller:'stroller'};
const bySlug=Object.fromEntries(trLesson.cards.map(c=>[c.slug,c]));
const cards=ORDER.map((slug,i)=>{const c=bySlug[slug];return {order:i+1,file:c.file,w:c.w,h:c.h,alt:c.alt};});

export const TR={
 path:TR_PATH,
 title:'The Toddler Room (Extra Class · Ages 1–3)',
 description:'The Toddler Room is a real taught class for one- to three-year-olds: thirty-five words from your child’s own room — the ball, the sippy cup, the teddy — grouped as play time, mealtimes, the sleep corner, care routines, getting dressed and furniture, each with the exact words to say and the game to play. Printable cards for every word live in the flashcards library; the class itself is right here.',
 h1:'Welcome to the Toddler Room.',
 eyebrow:'EXTRA CLASS · THE TODDLER ROOM',
 crumbs:[['Extra Classes','/extra-classes/'],['The Toddler Room','/toddler-room/']],
 chips:[['Age','1–3 Years'],['Words','35'],['Class','2–5 minutes'],['Schedule','None — dip in any order']],
 ledes:[
  'The Toddler Room is a bonus class beside the core Learning Path, and it teaches the room a one- to three-year-old already lives in: the ball, the crib, the sippy cup, the teddy — thirty-five words your child touches every single day, grouped the way toddlers live. Play time first, then mealtimes, the sleep corner, the care routines, getting dressed, and the furniture that holds it all together.',
  'This page is the class itself, not a description of it: start at Today’s Class, show one thing at a time, say the words and play the little game inside each step — the how-line under every step quietly explains why that move builds understanding. A printable card for every word lives in the flashcards library; the class itself needs nothing but the room you are sitting in. Dip in any order, two minutes at a time — a bonus class is the one nobody can fall behind in.'
 ],
 startHint:'Thirty-five words in room order. Sit on the floor, prop the screen where you can both see it, and let your child set the mood.',
 teacher:{
  goal:'your child points at, names and plays with the thirty-five things in their own room — and the daily routines behind them — one small word at a time.',
  opening:{say:'Hello! Welcome to the Toddler Room. Today we are going to name everything you love — the ball, the teddy, the sippy cup — and play with every single one.',do:'Sit on the floor at toddler height and bring the room to you: the ball, the teddy, the cup. One at a time, in any order the mood allows.'},
  parts:[
   {label:'Play time first — the words of play',steps:[
    {card:1,word:'ball',say:'A ball! Watch — the ball rolls. Roll, roll… now roll the ball to me. My turn, your turn.',how:'Word before action, then a real turn-taking game — a roll returned to you is a toddler’s first conversation.'},
    {card:2,word:'building blocks',say:'Building blocks! Let’s build a tower. My block — one, your block — two… up, up, up… TALL tower! Crash it down!',how:'Counting and turn-taking ride on the building, and the crash is the reward that makes your toddler beg for round two.'},
    {card:3,word:'stacking rings',say:'Stacking rings! The big one first — whoosh, down it goes. Then the next… and the teeny tiny one on top!',how:'Sizing by trial: the ring that will not go is what teaches big and small — better than any explanation.'},
    {card:4,word:'puzzle',say:'A puzzle! Try the piece… turn it… click! It fits! This one is tricky — turn, flip, try again… CLICK!',how:'Narrate the try-again calmly and cheer the second attempt — the lesson is persistence, not the picture.'},
    {card:5,word:'crayons',say:'Crayons! Pick a colour… I have green. Scribble, scribble! Now tell me about your drawing — oh! What is happening here?',how:'Ask about the story, never "what is it?" — the answer builds language and pride, and there is no wrong drawing.'},
    {card:6,word:'easel',say:'Easel! Stand up tall. Clip the paper — click! Big circles, round and round — your arms are the engine!',how:'Standing art builds the big arm muscles that one day hold a pencil: big movements now, small control later.'},
    {card:7,word:'picture book',say:'A picture book! Open it… point to something! Your finger says… a dog! Woof! Now a ball! What do you find?',how:'The child’s finger leads and you name — pointing first and word second is how toddlers read before they read.'},
    {card:8,word:'play mat',say:'Play mat! Roll it out — tadaaa, play time! The toys go ON the mat… and when play is done, toys home and roll it up!',how:'One visible play space gives play a start and a finish — boundaries a toddler can see, say and repeat.'},
    {card:9,word:'floor cushion',say:'Floor cushion! Your very own soft spot. Watch me — wobble, wobble… FLOP! Aaaaah. Now you… FLOP!',how:'The flop-and-sigh practises the feeling of falling asleep — quiet rest, rehearsed as a game.'},
    {card:10,word:'stuffed bunny',say:'Stuffed bunny! Soft bunny, long ears. Where are bunny’s ears? …There! And where are YOUR ears? …There!',how:'Bunny’s body maps onto the child’s body — name each part on the toy first, then on your toddler.'},
    {card:11,word:'teddy bear',say:'Teddy bear! Hug him — gentle squeeze. Teddy is hungry — feed him! Now brush teddy’s teeth… and NOW teddy is sleepy — night-night, teddy!',how:'Caring for the teddy rehearses every routine of this class — in this game, your child is the grown-up.'},
    {card:12,word:'toy car',say:'Toy car! Vroom vroom — push it! Up the cushion and down — wheee! Stop at the light… now GO! Park it — night-night, car.',how:'Fast, slow and stop are physics words in play, and parking in the garage ends the game so it can begin again.'},
    {card:13,word:'toy drum',say:'Toy drum! Bang bang BANG — loud! Now soft… soft, soft. Copy me — loud! …soft! And… STOP! Sticks up high!',how:'Loud, soft and stop are words the ear learns — and a child who can stop a game can start one tomorrow.'},
    {card:14,word:'toy train',say:'Toy train! Choo choo! Over the cushion mountain… UNDER the chair tunnel… round the rug lake… STOP at the station! All aboard!',how:'Over, under and round are position words made visible — the track through the furniture says each one in motion.'}
   ]},
   {label:'Mealtimes — the words of eating',steps:[
    {card:15,word:'high chair',say:'High chair! Time to eat. Climb up… up you go! The tray clicks on — ready! Park your cup… there. Yummy time!',how:'The chair is where eating lives — the same click-and-park ritual at every meal turns the seat into the mealtime signal.'},
    {card:16,word:'bottle',say:'Bottle! Here is your bottle of milk. Two hands… hold it tight. Drink, drink… all gone! Well done. Now, can teddy have a drink too?',how:'Name it before and after every feed, then hand the job over — a toddler who feeds the teddy is rehearsing being fed.'},
    {card:17,word:'sippy cup',say:'Sippy cup! Here is YOUR cup. Two hands… lift… sip sip sip. Tiny tips! All done? Park it in its spot.',how:'Two hands and tiny tips are the skill, and the parking spot ends the meal — cups live somewhere too.'}
   ]},
   {label:'The sleep corner — the words of sleep',steps:[
    {card:18,word:'crib',say:'Crib! This is your crib — your very own bed. Cozy crib, soft blanket. Into the crib we go… night-night. Sleep tight.',how:'The last word of the bedtime script, rehearsed by teddy first — the crib becomes where sleep lives, not where fun ends.'},
    {card:19,word:'pillow',say:'Pillow! The soft, squishy pillow. Wobble like a sleepy robot… flop! Your head lands… aaaah. Goodnight, head!',how:'The flop-and-sigh IS the falling-asleep feeling — practised in daylight so the body recognises it at night.'},
    {card:20,word:'blanket',say:'Blanket! The soft, cozy blanket. Look — teddy is cold! Tuck him in… night-night, teddy. …good MORNING, teddy! You tuck him in this time.',how:'Play the tuck-in game when nobody is tired — a word practised in daylight works at bedtime the same night.'},
    {card:21,word:'pajamas',say:'Pajamas! The sleepy clothes. Arm in… leg in… now YOUR job — the zip! Hold it… pull… ZIIIP! Bedtime team is dressed.',how:'The zip is the child’s unmissable job — one real contribution keeps a tired toddler cooperating.'},
    {card:22,word:'night light',say:'Night light! Time for your job. Click… ON! The room is dark, but the night light glows. It watches over you all night.',how:'A job at lights-out flips the dark from something done to you into something your child switched on.'}
   ]},
   {label:'Care routines — the words of clean',steps:[
    {card:23,word:'diaper',say:'Diaper! Time for a fresh one. Fetch the diaper… thank you! Lie down… fresh diaper… tabs click… ALL DONE! Take it to the bin!',how:'One small job per change — fetching, holding, binning — turns a wrestle into a two-person routine.'},
    {card:24,word:'potty',say:'Potty! This is the potty — your little chair. Teddy is sitting… well done, teddy! Want to try? Just sitting is fine.',how:'The word arrives long before training, calmly, with teddy first — no pressure, just a named little chair.'},
    {card:25,word:'soap',say:'Soap! Time to wash. Water on — wet hands. SOAP — press! Bubbles! Rub the fronts… the backs… between the fingers… RINSE! All clean!',how:'Hand-washing as a five-beat ceremony — wet, soap, rub, rinse, done — said the same way every single time.'},
    {card:26,word:'towel',say:'Towel! Time to get dry — wrap you up like a burrito! Towel dries the HEAD… the TUMMY… the TOES! Now you dry the dolly.',how:'Same order every bath — head, tummy, toes — and then the child dries the dolly, because teaching is the deepest learning.'},
    {card:27,word:'toothbrush',say:'Toothbrush! Time to brush. Your turn first — round and round… my turn — the back ones, quick quick… spit! Sparkly smile!',how:'Child first, grown-up finishes, a song as the timer — brushing ends on a sparkle, not a battle.'}
   ]},
   {label:'Getting dressed — the words of ready',steps:[
    {card:28,word:'socks',say:'Socks! One sock… over the toes… pull, pull… UP! Now find the twin! There it is! Over the toes… pull… UP. Cozy toes!',how:'The first self-dressing skill — over the toes, pull, up — and finding the twin is matching practice hiding inside it.'},
    {card:29,word:'shoes',say:'Shoes! Where are your shoes? There they are! One foot — in! Other foot — push! Now YOUR job… rip the Velcro! RIIIIP! Let’s go OUTSIDE!',how:'Shoes mean adventure: the child’s rip opens the door, so dressing becomes the start of the outing, not a delay.'},
    {card:30,word:'comb',say:'Comb! Time to comb your hair. My turn — one… two… three. Gentle, gentle. Now YOUR turn — comb teddy! Comb my hair!',how:'The my-turn-your-turn swap ends the daily battle — the child combs the teddy, then you, then sits still for their own turn.'}
   ]},
   {label:'The furniture that holds the room together',steps:[
    {card:31,word:'table and chair',say:'Table and chair! This is your work spot. Sit on the chair… scoot in… we work, we finish… and push your chair in! What a worker!',how:'A named work spot turns drawing and puzzles into real work — with a start, a finish and a chair pushed in.'},
    {card:32,word:'bookshelf',say:'Bookshelf! This is where the books live. Pick a book… good choice! Let’s read… finished! Now the book goes home — night-night, book.',how:'Pick and return are the bookends of story time — the child who puts the book back owns the whole reading loop.'},
    {card:33,word:'laundry basket',say:'Laundry basket! The clothes go IN. Fetch one thing… the socks! Socks IN. Shirt IN! Look — the basket is FULL. And where is YOU? Peekaboo!',how:'Fetch-and-drop is the toddler-sized version of tidying, and the peekaboo finish keeps the joke inside the chore.'},
    {card:34,word:'changing table',say:'Changing table! Up we go. Lie down… there you are. Hold the diaper for me… thank you, helper! Tabs… ALL CLEAN! Down you hop.',how:'The table is the changing station with roles — you change, the child helps, and a helper needs far less holding down.'},
    {card:35,word:'stroller',say:'Stroller! Climb in — up you go! Buckle the straps… and CLICK! You did it. Off we go — wheels go round! Click again — you hop out.',how:'The click is the child’s own buckle — mastering the strap makes the stroller a vehicle they climb into, not a seat they are trapped in.'}
   ]}
  ],
  practice:{say:'I spy with my little eye… something in YOUR room!',how:'Name any word from today and let your child point, fetch or push it over. Fifteen seconds of searching is thinking — do not rescue too fast.'},
  check:{say:'Where is the teddy? Show me roll! Where does the sock go?',how:'A point, a fetch or the word itself — any of the three is a pass. If the answer is a blank stare, hand it over: THIS is the teddy — now YOU show me.'},
  close:{say:'Thirty-five words — you know your room! Clap for yourself! Tonight, say goodnight to the teddy and the ball. Class dismissed.',how:'The room keeps teaching: every zip, every soap, every stroller click is tomorrow’s free repetition of today’s class.'}
 },
 viewerLabel:'Today’s class: the toddler room, word by word',
 viewerHeading:'Thirty-five things in your child’s room, one at a time.',
 folder:trLesson.folder,
 r2Base:trLesson.r2Base,
 eagerFirst:true,
 cards,
 howTo:{heading:'How to run the Toddler Room class.',steps:[
  ['Sit on the floor','This class is taught on the floor, at toddler height, with the room around you. Prop the screen where you can both see it — the words come from you, not from the phone.'],
  ['One word at a time','Show one thing, say the word, play the little game inside the step, then move on — or stay. The script is a path, not a timetable.'],
  ['Two minutes is a full class','Stop while it is still fun. A two-minute class that ends happily teaches more than a ten-minute one that ends in tears.'],
  ['Let the age pills guide you','Ages 1+ words are first words — name and play. Ages 2–3 words are routines and pretend play — let your child do the job. Follow the child, not the pill.'],
  ['Come back tomorrow','Repetition is the curriculum: the same words, the same games, tomorrow. A toddler’s favourite class is the one they already know.']
 ],note:'<strong>Age ranges are a guide, not a test.</strong> Follow the age pills or follow the child — every word stands on its own, and the room never closes.'},
 tryTogether:[
  '“Where IS the ball? …there it is!” — hiding and finding is the oldest game in the world, and it works on every word in this class.',
  '“My turn… your turn!” — say it while you hand things over; sharing grows out of the words, not the other way round.',
  '“All done!” — the two words that end every routine peacefully. Say them, then actually stop.',
  '“You did it!” — praise the try, not the result; a toddler will move mountains for that one sentence.',
  '“Night-night, teddy.” — put the words in your child’s mouth at bedtime and they come back at breakfast.'
 ],
 promptsHint:'Prompts for you, not for the cards — say them while you play, at toddler speed.',
 realWorld:{heading:'The room is the classroom.',copy:'Every word in this class lives in your child’s own room, which means every routine is a free repetition: the zip at bedtime is pajamas, the soap at the sink is soap, the click of the stroller buckle is stroller. Name the real thing the way the class names it — same word, same moment, every day — and the class keeps teaching long after the screen is off.',examples:[
  'Bath time: soap, towel, toothbrush — the whole care routine becomes a named ceremony.',
  'Getting dressed: socks, shoes, pajamas — hand over each job and say its word while your child does it.',
  'Out and about: the stroller click, shoes on, “all done” at the door.',
  'Tidy-up time: bookshelf, laundry basket, play mat — every thing goes home with its name.'
 ]},
 pills:{heading:'Where to next?',items:[['The Toddler Room flashcards','/flashcards/toddler-room/'],['Extra Classes','/extra-classes/'],['Home & Daily Life','/extra-classes/home-and-daily-life/']]},
 schema:{resourceType:'Toddler bonus class',level:'Toddler (1–3 years)',teaches:'First words for the objects and routines of the toddler room: play, mealtimes, sleep, care routines, dressing and furniture',audience:'Parents and toddlers',keywords:'toddler flashcards, toddler room, first words for toddlers, toddler routines, printable toddler cards, taught toddler class'},
 schemaImage:trLesson.r2Base+'cover.webp'
};
