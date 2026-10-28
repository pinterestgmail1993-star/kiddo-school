// Kiddo School — EXTRA CLASSES: the bonus shelf beside the core Learning Path.
// The Toddler Room (/toddler-room/) and the Kitchen (/kitchen/) are EXTRA
// CLASSES (owner decision 2026-10-15): they sit in their own section, never
// inside the class sequence — parents skip them without their child falling
// "behind". The EXTRA_CLASSES constant is the single source of truth: the
// /extra-classes/ hub page and the Learning Path bonus row are both built
// from it, so names, covers and links can never drift.
import {lesson as trLesson} from './flashcards/data-toddler-room.mjs';
import {lesson as ktLesson} from './flashcards/data-kitchen.mjs';
import {lesson as dvLesson} from './flashcards/data-doctor-visit.mjs';
import {lesson as hdLesson} from './flashcards/data-home-daily-life.mjs';
import {lesson as kgLesson} from './flashcards/data-kids-games.mjs';
import {lesson as acLesson} from './flashcards/data-animal-categories.mjs';
import {lesson as colLesson} from './flashcards/data-colors-and-shades.mjs';
import {lesson as pcLesson} from './flashcards/data-places-in-community.mjs';
import {LL_BASE,LL_COVER} from './look-and-learn.mjs';
import {DINO_BASE,DINO_COVER} from './flashcards/data-dinosaurs.mjs';
import {MAN_BASE,MAN_COVER} from './manners.mjs';
import {QW_BASE,QW_COVER} from './question-words.mjs';

export const EXTRA_CLASSES=[
 {name:'The Toddler Room',href:'/toddler-room/',cover:trLesson.r2Base+'cover.webp',w:1414,h:2000,
  alt:'Cover of the Toddler Room flashcards set: a big letter block beside the words "Toddler Room Flashcards".',
  blurb:'Thirty-five cards for one- to three-year-olds: the toys, the mealtimes, the sleep corner and the care routines of the toddler room, each with an age pill and its own lesson.',
  link:'Visit the Toddler Room'},
 {name:'Kitchen Helper',href:'/kitchen/',cover:ktLesson.r2Base+'cover.webp',w:800,h:1132,
  alt:'Cover of the Kitchen Things flashcards set: pans and a bowl with the words "Kitchen Things Flashcards".',
  blurb:'Thirty-five kitchen cards with age pills — everyday things, helper tools, grown-up tools and the one rule card: knives are for grown-ups. Lessons teach the hot-don\u2019t-touch crew too.',
  link:'Visit the Kitchen'},
 {name:'Manners',href:'/manners/',cover:MAN_BASE+MAN_COVER.file,w:MAN_COVER.w,h:MAN_COVER.h,
  alt:MAN_COVER.alt,
  blurb:'Thirty-two printable manners cards for ages 3–5 — kind words, patient waits, gentle hands and table manners — every card with a practice tip, a download button and one-tap printing, all on one page.',
  link:'Practise the manners'},
 {name:'Question Words',href:'/question-words/',cover:QW_BASE+QW_COVER.file,w:QW_COVER.w,h:QW_COVER.h,
  alt:QW_COVER.alt,
  blurb:'Sixteen question word cards for ages 3–5 — who, what, when, where, why and how lead the deck, then how many, whose turn and what happens next — every card with an ask-it-tonight tip, a download button and one-tap printing, all on one page.',
  link:'Ask the questions'},
 {name:'Doctor Visit',href:'/extra-classes/doctor-visit/',cover:dvLesson.r2Base+'cover.webp',w:800,h:1132,
  alt:'Cover of the Doctor Visit flashcards set: a doctor greeting a child hugging a teddy bear, with the words "Doctor Visit Flashcards — a gentle guide for kids".',
  blurb:'Twenty-two doctor-visit cards in visit order for ages 3–5 — a teddy bear on every step of a check-up, from the appointment to the proud goodbye. Lessons walk the visit step by step; the one rule said kindly: medicine is only taken from a grown-up.',
  link:'Take the Doctor Visit'},
 {name:'Home and Daily Life',href:'/extra-classes/home-and-daily-life/',cover:hdLesson.r2Base+'cover.webp',w:1100,h:778,
  alt:'Cover of the Home and Daily Life flashcards set: the words "Home and Daily Life Flashcards" over a little blue house with an open book, a mug and a potted plant.',
  blurb:'Forty-one cards for the words of home — rooms and furniture, wash-and-bedtime routines, kitchen actions, chores and tools, the door, the sounds and the green habits. Lessons walk the real house; US and UK words ride together: tap and faucet, torch and flashlight, trolley and cart.',
  link:'Walk through the home'},
 {name:'Kids Games',href:'/extra-classes/kids-games/',cover:kgLesson.r2Base+'cover.webp',w:800,h:1132,
  alt:'Cover of the Kids Games flashcards set: the words "Kids Games Flashcards" over a board game with a pawn, a big die and a dotted arrow.',
  blurb:'Twenty-six classic games with a simple how-to-play guide a kid can follow — balloons and beanbags, hiding and hopping, boards, mazes and treasure maps — with US/UK names taught side by side.',
  link:'Open the games'},
 {name:'Places in the Community',href:'/extra-classes/places-in-the-community/',cover:pcLesson.r2Base+'cover.webp',w:800,h:1132,
  alt:'Cover of the Places in the Community flashcards set: the words "Places in the Community" over a little house with a tree.',
  blurb:'Twenty-eight places a town is made of, each with a simple lesson a kid can follow — the library, the fire station, the bakery, the bus stop, the park and the zoo — with US/UK names taught side by side.',
  link:'Walk the town'},
 {name:'Animal Categories',href:'/extra-classes/animal-categories/',cover:acLesson.r2Base+'cover.webp',w:800,h:1277,
  alt:'Cover of the Animal Categories flashcards set: the words "Animal Category Flashcards" over a little bat, a crocodile, an ant and a pink salamander.',
  blurb:'Twenty-three animal families on spotter sheets — pets and farm friends, the crawly crews, feathers, fins and scales, the big wild ones, four habitats and the giants of the ocean — each with a simple lesson a kid can follow. The sorting class: ninety-two labeled animals, one deck. (The dinosaurs now have their own class.)',
  link:'Sort the animals'},
 {name:'Colors',href:'/extra-classes/colors/',cover:colLesson.r2Base+'flashcards/cover.webp',w:600,h:849,
  alt:'Cover of the Colors flashcards set: the words "Color Flashcards" over five round color dots.',
  blurb:'Fifteen color spotter sheets for ages 2–5 — the eleven first colors, red to gold, each a two-by-two sheet of four labeled things, then four make-it-yourself shades for ages 4–5 with their mixing recipes. Sixty labeled pictures, every card with its own lesson.',
  link:'Hunt the colors'},
 {name:'Look & Learn',href:'/look-and-learn/',cover:LL_BASE+'flashcards/'+LL_COVER.file,w:LL_COVER.w,h:LL_COVER.h,
  alt:LL_COVER.alt,
  blurb:'Fifteen picture cards, four words each, and one tiny move on every picture — point at the moon, waddle like a duck, balance like a flamingo. The school\u2019s lightest class: look, say, move — nothing to print first, ages 2–5.',
  link:'Open Look & Learn'},
 {name:'Dinosaurs',href:'/dinosaurs/',cover:DINO_BASE+DINO_COVER.file,w:DINO_COVER.w,h:DINO_COVER.h,
  alt:DINO_COVER.alt,
  blurb:'Thirty-three dinosaur cards with a move-and-play action on every one — stomp like a T. rex, swing your club tail, glide like a giant flyer. The six favorites lead, every dinosaur has its own short page and lesson, and the printable twins live in the library. Ages 3–5.',
  link:'Meet the dinosaurs'}
];

const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* The /extra-classes/ hub: the bonus classes of the school, on one shelf. */
export function extraClassesHubBody(){
 return `<section class="wrap section compact"><div class="room-grid room-grid-hub">${EXTRA_CLASSES.map(r=>`<a class="room-card" href="${r.href}"><span class="room-cover"><img src="${r.cover}" width="${r.w}" height="${r.h}" alt="${esc(r.alt)}" loading="lazy"></span><span class="room-body"><span class="explore-eyebrow">EXTRA CLASS</span><h2>${esc(r.name)}</h2><p>${esc(r.blurb)}</p><span class="text-link">${esc(r.link)} <span aria-hidden="true">↗</span></span></span></a>`).join('')}</div><p class="fc-hint">Every extra class keeps its own card set in the <a href="/flashcards/">flashcards library</a> — the Toddler Room cards on the toddler shelf, and the Kitchen, Doctor Visit, Home and Daily Life, Kids Games, Places in the Community, Animal Categories and Colors cards on the Ages 4–5 shelf, with the <a href="/flashcards/nature-club-animals/">Nature Club Animals</a> cards beside them — and every card opens its own lesson inside the class. Manners (owner rule) builds no card pages at all: its thirty-two cards download and print straight from the class page and from their <a href="/flashcards/manners/">parents’ shelf in the library</a>. Question Words prints the same one-page way: sixteen question cards straight from <a href="/question-words/">the class page</a> and from their <a href="/flashcards/question-words/">parents’ shelf</a>. The core <a href="/learning-path/">Learning Path</a> runs its own sequence, untouched.</p></section>`;
}

/* The Learning Path bonus row: one row, pointing at the hub. */
export function extraClassesLpRow(){
 return `<div class="lp-row lp-magic"><div class="lp-marker" aria-hidden="true"><span>+</span></div><div class="lp-stage-card"><div class="fc-stage-pills"><span class="fc-age">Bonus</span><span class="fc-class">Extra classes</span></div><h2>Extra Classes — a bonus shelf beside the path</h2><p class="lp-class">Play: <a href="/toddler-room/">The Toddler Room</a> (ages 1–3) · <a href="/kitchen/">Kitchen Helper</a> (ages 3–6) · <a href="/manners/">Manners</a> (ages 3–5) · <a href="/question-words/">Question Words</a> (ages 3–5) · <a href="/extra-classes/doctor-visit/">Doctor Visit</a> (ages 3–5) · <a href="/extra-classes/home-and-daily-life/">Home and Daily Life</a> (ages 3–5) · <a href="/extra-classes/kids-games/">Kids Games</a> (ages 3–5) · <a href="/extra-classes/places-in-the-community/">Places in the Community</a> (ages 3–5) · <a href="/extra-classes/animal-categories/">Animal Categories</a> (ages 3–5) · <a href="/extra-classes/colors/">Colors</a> (ages 2–5) · <a href="/look-and-learn/">Look &amp; Learn</a> (ages 2–5) · <a href="/nature-club/">Nature Club</a> (ages 3–6)</p><p class="lp-hublink">Every one of them carries its own flashcards and its own lessons, and every one of them is optional — the core path never depends on them. Browse the whole shelf at <a href="/extra-classes/">Extra Classes</a>, or step next door to the <a href="/nature-club/">Nature Club</a>.</p></div></div>`;
}
