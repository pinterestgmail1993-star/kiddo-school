// Kiddo School — Class 36 · Animals & Their Habitats: the Learning Path class
// page. Same process as every class (owner instruction, repeated 2026-10-12
// "the process is the same"): the class hub shows the whole set as PICTURES and
// every picture opens its own /learn/ teaching lesson — original habitat card
// on the left with the drawing canvas over it, step-by-step teaching on the
// right (built from lp-animals-habitats.mjs via LP_REGISTRY). The flashcard
// library pages stay the download/print shelf behind ONE supporting resource
// section. NO worksheets are shown or promised: none were uploaded, so nothing
// is invented. CSP-safe rendering: every image carries its own width/height
// attributes (mixed 1587×2245 and 1414×2000 per file) and NO inline styles.
import {lesson as ahLesson} from './flashcards/data-animals-habitats.mjs';
import {lpContent as ahLp} from './flashcards/lp-animals-habitats.mjs';

export const AH_CLASS_PATH='/preschool/4-years/animals-and-their-habitats/';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function animalsHabitatsClassBody(){
 const base=ahLesson.r2Base;
 const cards=ahLesson.cards.map(c=>({...c,img:base+'flashcards/'+c.file}));
 const learnRows=cards.map(c=>{
  const l=ahLp[c.slug];
  return `<a class="lp-tile" href="${AH_CLASS_PATH}learn/${c.slug}/"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title)}</strong></a>`;
 }).join('');
 return `<section class="wrap lesson-section"><div class="page-heading"><span class="eyebrow">CLASS 36 · AGES 4–5 · 22 HABITAT LESSONS</span><h1>Animals &amp; Their Habitats.</h1></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Twenty-two animals, twenty-two right homes.</h2><p class="lesson-copy">Every animal in this class has its own step-by-step lesson: open the card together, find the animal and its home, say the habitat word, follow the teaching steps, ask the questions and finish with a game that puts your child inside that home — hopping the grassland, huddling like penguins, hanging like a bat. The order is gentle: homes near home first — the meadow and the pond — then the forests, the warm grasslands and the desert, the fresh and salt water, the freezing poles, and finally the dark cave.</p><p class="lesson-copy">One card a sitting is plenty; the whole class is a month of five-minute animal visits. By the end, the big question of early science — where does this animal live, and why THERE? — has twenty-two answered examples, from a rabbit in the tall grass to a whale in the deep blue.</p></section>
 <section class="wrap lesson-section"><span class="eyebrow">A HOME FOR EVERY ANIMAL</span><h2>Matching animals to their addresses.</h2><p class="lesson-copy">Habitats are the first matching game in science: every animal carries its home in its body. The camel carries the desert in its feet and lashes, the polar bear wears the arctic as camouflage, the koala holds one tree in its tummy and its arms. Once your child can ask "could the whale live in the desert?" — and laugh at the answer — the whole set has done its work.</p><p class="lesson-copy">The cards love to be sorted. Lay them out and make home-piles: grass homes, tree homes, water homes, ice homes, the cave. Every sort is a different lesson, and no two children sort them quite the same way — all of them are right.</p></section>
 <section class="wrap fc-section" id="learn"><span class="eyebrow">LEARN WITH FLASHCARDS</span><h2>Learn the animals and the homes that fit them.</h2><p class="fc-hint">Twenty-two habitat cards, one picture each. Tap any picture and it opens its own lesson page — the original artwork with a drawing canvas on the left, and what the habitat is and why this animal fits it, taught step by step, on the right.</p><div class="lp-tiles">${learnRows}</div></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Print the habitat cards.</h2><p class="fc-hint">Every lesson has a matching flashcard in the library: the original artwork as a printable card with a download button, print size and short notes on playing that animal home at home. When your child owns twenty-two homes, the <a href="/flashcards/animal-sounds/">animal friends</a> and <a href="/flashcards/animals-and-sounds/">animals &amp; their sounds</a> sets make fine revisiting.</p><div class="fc2-actions"><a class="button" href="/flashcards/animals-and-their-habitats/">Open the Animals &amp; Their Habitats flashcards <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${base}flashcards/cover.webp" width="1587" height="2245" alt="Cover of the Animals &amp; Their Habitats flashcards set: the title over a smiling giraffe beside an acacia tree in savanna grass." loading="lazy"></div></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> Follow your child\u2019s curiosity from the meadow to the poles — every lesson stands on its own.</p>`;
}
