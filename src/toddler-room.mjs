// Kiddo School — EXTRA CLASS · The Toddler Room: the class page. A bonus
// class beside the core Learning Path (owner decision 2026-10-15): the page
// shows the whole set as PICTURES and every picture opens its own
// /toddler-room/learn/ teaching lesson. Room-framed wording throughout — it
// never claims a class number or a place in the sequence. CSP-safe: every
// image carries its own width/height (all 35 cards 1414×2000) and NO inline
// styles.
import {lesson as trLesson} from './flashcards/data-toddler-room.mjs';
import {lpContent as trLp} from './flashcards/lp-toddler-room.mjs';

export const TR_PATH='/toddler-room/';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function toddlerRoomBody(){
 const base=trLesson.r2Base;
 const cards=trLesson.cards.map(c=>({...c,img:base+c.file}));
 const learnRows=cards.map(c=>{
  const l=trLp[c.slug];
  return `<a class="lp-tile" href="${TR_PATH}learn/${c.slug}/"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title.replace(/^The | Lesson$/g,''))}</strong></a>`;
 }).join('');
 return `<section class="wrap lesson-section"><span class="eyebrow">HOW THIS ROOM WORKS</span><h2>Thirty-five words, one room, no schedule.</h2><p class="lesson-copy">The Toddler Room is a bonus class, kept deliberately beside the main learning path: the regular classes stay the core sequence, and this room is here whenever a one- to three-year-old wants more. Every card names something the child already touches every day — the ball, the crib, the sippy cup, the teddy — and every tile below opens its own step-by-step lesson: the word, the routine it lives in, the parent script and one small game.</p><p class="lesson-copy">The room is laid out the way toddlers live: play time first, then mealtimes, the sleep corner, the care routines, getting dressed, and the furniture that holds it all together. Every card carries an age pill — Ages 1+ for first words, Ages 2–3 for routines and pretend play — so you can start where your child is today and let the set grow with them. Dip in any order, in any mood, for two minutes at a time. Skipping this room leaves nobody behind; that is what a bonus is for.</p></section>
 <section class="wrap fc-section" id="learn"><span class="eyebrow">LEARN WITH FLASHCARDS</span><h2>Learn the toddler room, word by word.</h2><p class="fc-hint">Thirty-five cards, one picture each. Tap any picture and it opens its own lesson page — the original artwork on the left, and the step-by-step teaching on the right: what the word is, where the routine lives and the game to play tonight.</p><div class="lp-tiles">${learnRows}</div></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Print the toddler room cards.</h2><p class="fc-hint">Every lesson has a matching flashcard in the library: the original artwork as a printable card with a download button, print size and short notes for grown-ups. The same shelf keeps the <a href="/flashcards/first-words-familiar-things/">first-words cards</a> and the <a href="/flashcards/first-concepts/">first concepts</a> from the core path, if you want the toddler years in one basket.</p><div class="fc2-actions"><a class="button" href="/flashcards/toddler-room/">Open the Toddler Room flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/extra-classes/">Back to Extra Classes <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${base}cover.webp" width="1414" height="2000" alt="Cover of the Toddler Room flashcards set: a big letter block beside the words Toddler Room Flashcards." loading="lazy"></div></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> Follow the age pills or follow the child — every lesson stands on its own, and the room never closes.</p>`;
}
