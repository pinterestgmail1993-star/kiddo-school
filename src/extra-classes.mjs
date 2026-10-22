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

export const EXTRA_CLASSES=[
 {name:'The Toddler Room',href:'/toddler-room/',cover:trLesson.r2Base+'cover.webp',w:1414,h:2000,
  alt:'Cover of the Toddler Room flashcards set: a big letter block beside the words "Toddler Room Flashcards".',
  blurb:'Thirty-five cards for one- to three-year-olds: the toys, the mealtimes, the sleep corner and the care routines of the toddler room, each with an age pill and its own lesson.',
  link:'Visit the Toddler Room'},
 {name:'Kitchen Helper',href:'/kitchen/',cover:ktLesson.r2Base+'cover.webp',w:800,h:1132,
  alt:'Cover of the Kitchen Things flashcards set: pans and a bowl with the words "Kitchen Things Flashcards".',
  blurb:'Thirty-five kitchen cards with age pills — everyday things, helper tools, grown-up tools and the one rule card: knives are for grown-ups. Lessons teach the hot-don\u2019t-touch crew too.',
  link:'Visit the Kitchen'},
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
  blurb:'Twenty-four animal families on spotter sheets — pets and farm friends, the crawly crews, feathers, fins and scales, the big wild ones, four habitats, dinosaurs and the giants of the ocean — each with a simple lesson a kid can follow. The sorting class: ninety-six labeled animals, one deck.',
  link:'Sort the animals'},
 {name:'Colors',href:'/extra-classes/colors/',cover:colLesson.r2Base+'flashcards/cover.webp',w:600,h:849,
  alt:'Cover of the Colors flashcards set: the words "Color Flashcards" over five round color dots.',
  blurb:'Fifteen color spotter sheets for ages 2–5 — the eleven first colors, red to gold, each a two-by-two sheet of four labeled things, then four make-it-yourself shades for ages 4–5 with their mixing recipes. Sixty labeled pictures, every card with its own lesson.',
  link:'Hunt the colors'}
];

const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* The /extra-classes/ hub: the bonus classes of the school, on one shelf. */
export function extraClassesHubBody(){
 return `<section class="wrap section compact"><p class="mw-lede">Eight bonus classes sit beside the core learning path — never inside it. The regular classes stay the main sequence; the extras are a bonus shelf for families who want more. Skip them freely: no one falls behind.</p><div class="room-grid room-grid-hub">${EXTRA_CLASSES.map(r=>`<a class="room-card" href="${r.href}"><span class="room-cover"><img src="${r.cover}" width="${r.w}" height="${r.h}" alt="${esc(r.alt)}" loading="lazy"></span><span class="room-body"><span class="explore-eyebrow">EXTRA CLASS</span><h2>${esc(r.name)}</h2><p>${esc(r.blurb)}</p><span class="text-link">${esc(r.link)} <span aria-hidden="true">↗</span></span></span></a>`).join('')}</div><p class="fc-hint">Every extra class keeps its own card set in the <a href="/flashcards/">flashcards library</a> — the Toddler Room cards on the toddler shelf, and the Kitchen, Doctor Visit, Home and Daily Life, Kids Games, Places in the Community, Animal Categories and Colors cards on the Ages 4–5 shelf, with the <a href="/flashcards/nature-club-animals/">Nature Club Animals</a> cards beside them — and every card opens its own lesson inside the class. The core <a href="/learning-path/">Learning Path</a> runs its own sequence, untouched.</p></section>`;
}

/* The Learning Path bonus row: one row, pointing at the hub. */
export function extraClassesLpRow(){
 return `<div class="lp-row lp-magic"><div class="lp-marker" aria-hidden="true"><span>+</span></div><div class="lp-stage-card"><div class="fc-stage-pills"><span class="fc-age">Bonus</span><span class="fc-class">Extra classes</span></div><h2>Extra Classes — a bonus shelf beside the path</h2><p class="lp-class">Play: <a href="/toddler-room/">The Toddler Room</a> (ages 1–3) · <a href="/kitchen/">Kitchen Helper</a> (ages 3–6) · <a href="/extra-classes/doctor-visit/">Doctor Visit</a> (ages 3–5) · <a href="/extra-classes/home-and-daily-life/">Home and Daily Life</a> (ages 3–5) · <a href="/extra-classes/kids-games/">Kids Games</a> (ages 3–5) · <a href="/extra-classes/places-in-the-community/">Places in the Community</a> (ages 3–5) · <a href="/extra-classes/animal-categories/">Animal Categories</a> (ages 3–5) · <a href="/extra-classes/colors/">Colors</a> (ages 2–5) · <a href="/nature-club/">Nature Club</a> (ages 3–6)</p><p class="lp-hublink">Eight bonus classes with their own lessons and flashcards — kept separate from the main sequence on purpose: the regular classes stay the core path, and skipping the extras never leaves a child behind. All extras live at <a href="/extra-classes/">Extra Classes</a>, and the Nature Club waits beside the shelf at <a href="/nature-club/">/nature-club/</a>.</p></div></div>`;
}
