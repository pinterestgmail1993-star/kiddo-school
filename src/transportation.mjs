// Kiddo School — Class 24 · Transportation & Vehicles: the Learning Path
// class page. Same process as every class (owner instruction, repeated
// 2026-10-14 "the process is the same"): the class hub shows the whole set as
// PICTURES and every picture opens its own /learn/ teaching lesson — original
// spotter card on the left, step-by-step teaching on the right (built from
// lp-transportation.mjs via LP_REGISTRY). Class 24 was reserved since the
// school opened; the owner assigned it to Transportation & Vehicles on
// 2026-10-15, so the Learning Path runs 1–24 + 25–37 with no gap. CSP-safe
// rendering: every image carries its own width/height (all 32 cards
// 900×1273) and NO inline styles.
import {lesson as tvLesson} from './flashcards/data-transportation.mjs';
import {lpContent as tvLp} from './flashcards/lp-transportation.mjs';

export const TV_CLASS_PATH='/preschool/4-years/transportation-and-vehicles/';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function transportationClassBody(){
 const base=tvLesson.r2Base;
 const cards=tvLesson.cards.map(c=>({...c,img:base+'flashcards/'+c.file}));
 const learnRows=cards.map(c=>{
  const l=tvLp[c.slug];
  return `<a class="lp-tile" href="${TV_CLASS_PATH}learn/${c.slug}/"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title.replace(/^The | Lesson$/g,''))}</strong></a>`;
 }).join('');
 return `<section class="wrap lesson-section"><div class="page-heading"><span class="eyebrow">CLASS 24 · AGES 4–5 · 32 SPOTTER-CARD LESSONS</span><h1>Transportation &amp; Vehicles.</h1></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Thirty-two spotter cards, four vehicles each, one spotting habit.</h2><p class="lesson-copy">Every card in this class is a spotter sheet: a group heading — Land, Water, Air or Construction Vehicles — over four labeled vehicles, and every tile below opens its own step-by-step lesson teaching all four. The order is deliberate: the rides your child already takes come first (car, bus, train, bicycle), then the helper trucks that keep a town running, the rails and the long giants, the boats, the flyers and eleven sheets of construction giants from road roller to tower crane. Each lesson ends with one spotting idea — a hunt, a count, a sort — that carries the words out to real traffic.</p><p class="lesson-copy">Class 24 has been reserved since the school opened; the owner assigned it to Transportation &amp; Vehicles, so the learning path now runs from Class 1 to Class 37 with no gap. One card a sitting is plenty — the whole class is a term of five-minute spotting visits, and the words go with the art: every vehicle named in a lesson is printed on its card.</p></section>
 <section class="wrap lesson-section"><span class="eyebrow">WHY VEHICLES MATTER</span><h2>Things that go, thinking that grows.</h2><p class="lesson-copy">Vehicles are the friendliest gateway to reasoning a preschooler meets: every body is the answer to a job. Why is the race car pointy? Speed. Why is the armored vehicle slow? Protection. Why does the bus bend in the middle? Corners. The class teaches the questions, and the questions travel — to spoons, chairs, raincoats and every shaped thing the world hands over next.</p><p class="lesson-copy">And the spotting habit is the quiet engine: a child who hunts buses, tractors and tower cranes from the window is doing observation, classification and counting in one game. By the end, your child has thirty-two spotter cards, one hundred and twenty-eight named vehicles and a street that has become a field trip.</p></section>
 <section class="wrap fc-section" id="learn"><span class="eyebrow">LEARN WITH FLASHCARDS</span><h2>Learn the vehicles, one spotter card at a time.</h2><p class="fc-hint">Thirty-two spotter cards, one picture each. Tap any picture and it opens its own lesson page — the original artwork on the left, and the step-by-step teaching on the right: the four vehicles named, the big idea behind them and one game to play tonight.</p><div class="lp-tiles">${learnRows}</div></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Print the vehicles cards.</h2><p class="fc-hint">Every lesson has a matching flashcard in the library: the original spotter art as a printable card with a download button, print size and short notes on the four vehicles it names. When your child owns the everyday rides, the <a href="/flashcards/vehicles-and-sounds/">vehicles-and-sounds cards</a> take the theme down to age two, and the <a href="/preschool/4-years/community-helpers-and-our-neighborhood/">community helpers lessons</a> introduce the people who drive the trucks.</p><div class="fc2-actions"><a class="button" href="/flashcards/transportation-and-vehicles/">Open the Transportation &amp; Vehicles flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${base}flashcards/cover.webp" width="900" height="1273" alt="Cover of the Transportation &amp; Vehicles flashcards set: an airplane, a truck, a ship and a bus under the words Vehicles &amp; Transportation." loading="lazy"></div></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> Start with the rides your child already takes — the age pills on every card mark the everyday vehicles Ages 3+ and the specialist machines Ages 4–5 — and follow their eyes from cars to cranes.</p>`;
}
