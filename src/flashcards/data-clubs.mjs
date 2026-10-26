// Kiddo School — SCHOOL ROOM · The Clubs: flashcard content. The 45 cards
// are the owner's uploads, verified live on R2 under school/club/ (46/46
// objects HTTP 200 image/webp — 45 activity cards + 1 cover — every file
// probed at 800×1131 portrait; the owner uploaded the deck directly into the
// club/ folder rather than the brief's school/rooms/clubs/flashcards/, so
// r2Base points at the real location — the same quirk as the dinosaurs and
// art-room decks). Filenames are used exactly as uploaded — nothing renamed,
// nothing invented. The cover ("Extra-Curricular Activities" over five
// smiling children with a guitar, a soccer ball, a paint palette and a
// paintbrush) fronts the set and is never counted as a card.
//
// AGES (owner rule, 2026-10-25 — "take care of ages carefully"): these are
// NOT preschool cards. Fifteen clubs work for the youngest children and are
// tagged Ages 3+: art, music, dance, sports, drama, gardening, cooking,
// ballet, yoga, swimming, reading, crafts, drawing, baking and singing. All
// thirty others are tagged Ages 6+. The deck therefore belongs to the
// school's "Growing up" classrooms (ages 3–12) as a new room at /clubs/ —
// it must NOT join the ages 2–5 Learning Path or the Extra Classes shelf.
//
// DISPLAY ORDER: cover first, then the 15 Ages 3+ cards in the owner's own
// listed order, then the 30 Ages 6+ cards in file order. Every card prints
// one SKILL pill under its name; the pill text below is transcribed VERBATIM
// from the artwork (labeled contact sheets, scripts/club-sheets.py).
//
// SAFETY (owner rule): fencing and archery need a trained adult and proper
// equipment — their pages carry "Ask a grown-up and a trained coach".
//
// Three shelves, one deck: the room page /clubs/ hosts the short pages at
// /clubs/<slug>/ (card + the card's skill + back link), the /clubs/learn/
// lessons (this module's path) carry the step-by-step teaching, and the
// library holds the printable twins at /flashcards/extra-curricular-activities/
// — the deck's own printed name (owner 2026-10-26: "who will search for
// club?" — nobody does, so the library set carries the search phrase while
// the room keeps the school's name at /clubs/). No text is shared
// between the three shelves. Owner cross-links (2026-10-25): Explore the
// School (/rooms/) and the Learning Path's Growing-up classrooms row point
// here, and this room links back to both.
import {R2} from '../adventure-kit.mjs';
import {CLUBS_LIB_A} from './clubs-lib-a.mjs';
import {CLUBS_LIB_B} from './clubs-lib-b.mjs';
import {CLUBS_LIB_C} from './clubs-lib-c.mjs';
import {CLUBS_LIB_D} from './clubs-lib-d.mjs';
import {CLUBS_LIB_E} from './clubs-lib-e.mjs';

export const CLUBS_BASE=R2+'school/club/';

/* The 15 clubs the owner tagged Ages 3+, in the owner's own order. */
export const CLUBS_YOUNG=[
 'art','music','dance','sports','drama','gardening','cooking','ballet','yoga',
 'swimming','reading','crafts','drawing','baking','singing'];

/* The 30 Ages 6+ clubs, in file order (alphabetical, as uploaded). */
export const CLUBS_OLDER=[
 'archery','astronomy','bird-watching','calligraphy','chess','choir','climbing',
 'coding','cycling','debate','fencing','fashion-design','filmmaking','first-aid',
 'gymnastics','horse-riding','journaling','lego','martial-arts','nature-crafts',
 'photography','poetry','pottery','puppetry','robotics','science','skateboarding',
 'table-tennis','tennis','volunteering'];

/* Full display order: cover first, then young shelf, then older shelf. */
export const CLUBS_ORDER=[...CLUBS_YOUNG,...CLUBS_OLDER];

/* The two clubs that always need a trained coach beside the grown-up. */
export const CLUBS_COACH=['fencing','archery'];
export const CLUBS_COACH_LINE='Ask a grown-up and a trained coach';

/* slug → the card's own SKILL pill, transcribed verbatim from the artwork. */
export const CLUBS_SKILLS={
 'art':'Painting & Creativity',
 'music':'Rhythm & Sound',
 'dance':'Movement & Expression',
 'sports':'Teamwork & Fitness',
 'drama':'Stories & Confidence',
 'gardening':'Nature & Care',
 'cooking':'Food & Independence',
 'ballet':'Balance & Grace',
 'yoga':'Calm & Wellbeing',
 'swimming':'Confidence & Safety',
 'reading':'Imagine & Learn',
 'crafts':'Make & Explore',
 'drawing':'See & Create',
 'baking':'Measure & Create',
 'singing':'Voice & Confidence',
 'archery':'Aim & Focus',
 'astronomy':'Wonder & Discovery',
 'bird-watching':'Observe & Discover',
 'calligraphy':'Letters & Patience',
 'chess':'Focus & Strategy',
 'choir':'Voice & Harmony',
 'climbing':'Courage & Movement',
 'coding':'Logic & Discovery',
 'cycling':'Balance & Adventure',
 'debate':'Speak & Listen',
 'fencing':'Agility & Focus',
 'fashion-design':'Imagine & Create',
 'filmmaking':'Imagine & Tell',
 'first-aid':'Help & Care',
 'gymnastics':'Strength & Flexibility',
 'horse-riding':'Courage & Care',
 'journaling':'Reflect & Express',
 'lego':'Build & Create',
 'martial-arts':'Discipline & Strength',
 'nature-crafts':'Collect & Create',
 'photography':'Observe & Create',
 'poetry':'Words & Feelings',
 'pottery':'Shape & Imagine',
 'puppetry':'Create & Perform',
 'robotics':'Build & Invent',
 'science':'Explore & Experiment',
 'skateboarding':'Balance & Confidence',
 'table-tennis':'React & Play',
 'tennis':'Move & Compete',
 'volunteering':'Share & Support',
 'yoga':'Calm & Wellbeing'};

export const CLUBS_COVER={file:'cover.webp',w:800,h:1131,
 alt:'Cover of the Extra-Curricular Activities flashcards set: the words "Extra-Curricular Activities" over five smiling children holding a guitar, a soccer ball, a paintbrush and a paint palette.'};

const A3='Ages 3+',A6='Ages 6+';

const CARDS=[
 {slug:'art',file:'art.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Art: a boy in an apron painting a red picture on a canvas set in a wooden easel, palette in hand.'},
 {slug:'music',file:'music.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Music: a boy in a blue shirt playing a black portable keyboard with both hands.'},
 {slug:'dance',file:'dance.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Dance: a girl in a yellow top and black pants leaping mid-step with one arm reaching high.'},
 {slug:'sports',file:'sports.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Sports: a boy in a green jersey holding a black-and-white soccer ball at his chest.'},
 {slug:'drama',file:'drama.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Drama: a boy in a purple shirt acting out a story, one hand on his chest and the other open wide.'},
 {slug:'gardening',file:'gardening.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Gardening: a boy in a green apron watering a small potted seedling with a teal watering can.'},
 {slug:'cooking',file:'cooking.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Cooking: a girl in an orange apron whisking a big white mixing bowl.'},
 {slug:'ballet',file:'ballet.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Ballet: a girl in a pink tutu holding an arabesque pose up on one pointed foot.'},
 {slug:'yoga',file:'yoga.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Yoga: a boy in a teal shirt standing in tree pose, palms pressed together over his head.'},
 {slug:'swimming',file:'swimming.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Swimming: a boy in teal trunks with goggles pushed up on his forehead.'},
 {slug:'reading',file:'reading.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Reading: a girl with a purple headband holding an open book with a castle on its pages.'},
 {slug:'crafts',file:'crafts.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Crafts: a girl with scissors, a glue stick and a paper house ready to build.'},
 {slug:'drawing',file:'drawing.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Drawing: a boy in a yellow shirt holding a pencil beside a sketch pad with a house on it.'},
 {slug:'baking',file:'baking.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Baking: a boy in a baker\u2019s apron holding a tray of six frosted cupcakes and two cookies.'},
 {slug:'singing',file:'singing.webp',w:800,h:1131,ages:A3,alt:'An Extra-Curricular Activities flashcard titled Singing: a girl in a purple shirt singing into a black microphone, one hand out mid-song.'},
 {slug:'archery',file:'archery.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Archery: a boy in a red shirt aiming a red bow, an arm guard on one arm.'},
 {slug:'astronomy',file:'astronomy.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Astronomy: a boy in a green hoodie winking while looking through a telescope on a tripod.'},
 {slug:'bird-watching',file:'bird-watching.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Bird Watching: a boy in a green shirt raising binoculars to his eyes.'},
 {slug:'calligraphy',file:'calligraphy.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Calligraphy: a girl with a blue headband writing a flowing letter A with a dip pen and an ink pot.'},
 {slug:'chess',file:'chess.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Chess: a boy in a red shirt reaching to move a black piece on a full chess board.'},
 {slug:'choir',file:'choir.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Choir: a boy in a blue polo singing happily from an open blue songbook.'},
 {slug:'climbing',file:'climbing.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Climbing: a boy in a blue helmet and harness gripping a climbing rope.'},
 {slug:'coding',file:'coding.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Coding: a boy in a purple shirt typing on an open gray laptop.'},
 {slug:'cycling',file:'cycling.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Cycling: a boy in a green helmet standing over a green bicycle.'},
 {slug:'debate',file:'debate.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Debate: a boy in a blue shirt speaking into a microphone with one finger raised to make a point.'},
 {slug:'fencing',file:'fencing.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Fencing: a boy in a white jacket holding a fencing sword in one hand and a mask in the other.'},
 {slug:'fashion-design',file:'fashion-design.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Fashion Design: a girl in a purple apron holding pink fabric beside a sketch of a dress.'},
 {slug:'filmmaking',file:'filmmaking.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Filmmaking: a boy in a blue shirt filming with a black video camera held up to his eye.'},
 {slug:'first-aid',file:'first-aid.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled First Aid: a boy in a red-and-white vest holding a red first-aid kit with a white cross.'},
 {slug:'gymnastics',file:'gymnastics.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Gymnastics: a girl in a pink leotard split low to the floor with one arm waving high.'},
 {slug:'horse-riding',file:'horse-riding.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Horse Riding: a girl in a riding helmet hugging the neck of a brown horse.'},
 {slug:'journaling',file:'journaling.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Journaling: a boy in a yellow shirt writing in an open notebook with a black pen.'},
 {slug:'lego',file:'lego.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Lego: a boy in an orange shirt stacking yellow, green, red and blue building bricks.'},
 {slug:'martial-arts',file:'martial-arts.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Martial Arts: a boy in a white gi with a black belt bowing with pressed hands.'},
 {slug:'nature-crafts',file:'nature-crafts.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Nature Crafts: a boy in an orange shirt holding up a leaf-and-bird collage on paper.'},
 {slug:'photography',file:'photography.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Photography: a boy in an orange shirt holding a black camera up to his face.'},
 {slug:'poetry',file:'poetry.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Poetry: a boy in a purple hoodie holding a notebook, the other hand raised mid-recital.'},
 {slug:'pottery',file:'pottery.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Pottery: a boy in a purple apron shaping a tall pot on a spinning wheel.'},
 {slug:'puppetry',file:'puppetry.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Puppetry: a boy in a yellow shirt holding up a friendly lion hand puppet.'},
 {slug:'robotics',file:'robotics.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Robotics: a boy in an orange shirt standing beside a small white robot with a heart on its chest.'},
 {slug:'science',file:'science.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Science: a boy in a lab coat holding a magnifying glass and a flask of green liquid.'},
 {slug:'skateboarding',file:'skateboarding.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Skateboarding: a boy in a blue hoodie holding a blue skateboard upright.'},
 {slug:'table-tennis',file:'table-tennis.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Table Tennis: a boy in a blue shirt ready to serve with a red paddle.'},
 {slug:'tennis',file:'tennis.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Tennis: a boy in a green shirt holding a green racket in both hands.'},
 {slug:'volunteering',file:'volunteering.webp',w:800,h:1131,ages:A6,alt:'An Extra-Curricular Activities flashcard titled Volunteering: a boy in a purple Volunteer shirt holding out his hand beside a donations box.'}];

/* Guards: full order must hold, every card complete, every skill present,
   every age tag present, exactly 15/30 by the owner's split. */
if(CARDS.length!==45)throw Error('clubs: expected 45 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==CLUBS_ORDER.join('|'))throw Error('clubs: card order does not match CLUBS_ORDER');
if(new Set(CARDS.map(c=>c.slug)).size!==45)throw Error('clubs: duplicate slug');
for(const c of CARDS){
 if(!CLUBS_SKILLS[c.slug])throw Error('clubs: missing skill for '+c.slug);
 if(!c.ages)throw Error('clubs: missing age tag for '+c.slug);
 if(!c.alt||c.alt.length<80)throw Error('clubs: thin alt for '+c.slug);
}
if(CARDS.filter(c=>c.ages===A3).length!==15)throw Error('clubs: expected 15 Ages 3+ cards');
if(CARDS.filter(c=>c.ages===A6).length!==30)throw Error('clubs: expected 30 Ages 6+ cards');
for(const s of CLUBS_COACH)if(!CLUBS_ORDER.includes(s))throw Error('clubs: coach club missing '+s);

export const lesson={
 r2Base:CLUBS_BASE,
 folder:'',
 path:'/clubs/',
 seoTitle:'Extra-Curricular Activities Flashcards (School Room)',
 cover:{w:800,h:1131},
 cards:CARDS
};

export const meta={
 slug:'extra-curricular-activities',
 name:'Extra-Curricular Activities',
 seoTitle:'Extra-Curricular Activities for Kids — 45 Printable Flashcards with Skills (Ages 3–12)',
 h1:'Extra-curricular activity flashcards.',
 metaDescription:'Forty-five printable extra-curricular activity flashcards for ages 3–12: art, music, dance, chess, coding, fencing and thirty-eight more — every card carries its own skill pill, an age tag, a short page and a download button. Find a hobby, name its skill, and start this week.',
 lede:'Forty-five clubs, forty-five first steps. Each card names one activity — chess, baking, pottery, robotics — and prints the two skills the club trains under its name, from Aim & Focus to Calm & Wellbeing. The fifteen youngest-friendly clubs are tagged Ages 3+; the rest are Ages 6+. Every club has a short page, a full lesson and a printable twin in the library — pick the club, learn the skill, and let the hobby grow.',
 hubBlurb:'Chess, coding, ballet and baking — forty-five after-school clubs, each card printing the two skills it trains.',
 ageLabel:'3–12 years',
 noun:'Kids',
 group:'preschool',
 stageName:null,
 stageHref:null,
 classUrl:'/clubs/',
 classBtn:'Open the Clubs',
 // Lesson-page framing: the Clubs host lessons but sit OFF the Learning
 // Path, so their /learn/ pages breadcrumb through School Rooms.
 lessonCrumb:[['School Rooms','/rooms/']],
 lessonEyebrow:'CLUBS LESSON',
 lessonLine:'room — with every lesson one tap away.',
 pillGroups:[
  ['Make & build','The clubs that make things: pencils, bricks, fabric, clay and the ideas they become.',['art','crafts','drawing','nature-crafts','pottery','lego','robotics','coding','fashion-design']],
  ['Move & play','The clubs that move bodies: from first ballet arms to helmet-and-coach sports.',['ballet','dance','sports','swimming','gymnastics','yoga','cycling','skateboarding','martial-arts','climbing','tennis','table-tennis','fencing','archery','horse-riding']],
  ['Perform & sing','The clubs that take a stage: songs, stories, shows and films.',['music','singing','choir','drama','puppetry','filmmaking']],
  ['Think & solve','The clubs that train the thinker: boards, lenses, questions and experiments.',['chess','science','astronomy','bird-watching','photography','debate']],
  ['Read & write','The clubs for word people: readers, poets and the patient letter artists.',['reading','poetry','journaling','calligraphy']],
  ['Cook, grow & help','The clubs that feed, grow and care: kitchens, gardens and the helping hands.',['cooking','baking','gardening','first-aid','volunteering']]
 ],
 useIdeas:[
  ['One club, one week','Pick a single card — say, chess — and give it one honest week: learn one opening trick, play three games, teach someone the rules. A week of trying beats a month of deciding.'],
  ['Club fair night','Deal five cards face down. Everyone draws one, names its two skills and pitches the club to the family in one minute — then vote on the one to try first.'],
  ['Skill scavenger hunt','Read a card\u2019s skill pill — Balance & Grace, Aim & Focus — and hunt for where the family already uses it: stairs, spoons, drawing straight lines. Every club trains something the house already does.'],
  ['Hobby diary','After each club try-out, one journaling page: what we did, the best moment, keep or swap. Three honest entries later, the right club picks itself.']
 ],
 downloadHint:'Every card page has its own download button with the full-size image.',
 coverAlt:CLUBS_COVER.alt,
 lessonBlurb:'the Clubs, where every card opens a hobby and names its skill',
 relatedSets:['sports','music-room']
};

/* Card-page content (WHAT the card is, HOW to run its club) — authored
   fresh, never shared with the /learn/ lessons or the /clubs/ short
   pages. Split across five modules to keep each file honest to edit. */
export const cards={...CLUBS_LIB_A,...CLUBS_LIB_B,...CLUBS_LIB_C,...CLUBS_LIB_D,...CLUBS_LIB_E};
if(Object.keys(cards).length!==45)throw Error('clubs: expected 45 card copies, got '+Object.keys(cards).length);
