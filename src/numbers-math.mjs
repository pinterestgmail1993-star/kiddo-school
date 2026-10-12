// Kiddo School — Class 35 · Numbers, Counting & Early Math: the Learning Path
// class page. Same process as every class (owner instruction, repeated 2026-10-12
// "the process is the same"): the class hub shows the whole set as PICTURES and
// every picture opens its own /learn/ teaching lesson — original counting card
// on the left with the drawing canvas over it, step-by-step teaching on the
// right (built from lp-numbers-counting-early-math.mjs via LP_REGISTRY). The
// flashcard library pages stay the download/print shelf behind ONE supporting
// resource section. NO worksheets are shown or promised: none were uploaded,
// so nothing is invented.
import {lesson as nmLesson} from './flashcards/data-numbers-counting-early-math.mjs';
import {lpContent as nmLp} from './flashcards/lp-numbers-counting-early-math.mjs';

export const NM_CLASS_PATH='/preschool/4-years/numbers-counting-and-early-math/';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function numbersMathClassBody(){
 const base=nmLesson.r2Base;
 const cards=nmLesson.cards.map(c=>({...c,img:base+'flashcards/'+c.file}));
 const learnRows=cards.map(c=>{
  const l=nmLp[c.slug];
  return `<a class="lp-tile" href="${NM_CLASS_PATH}learn/${c.slug}/"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title)}</strong></a>`;
 }).join('');
 return `<section class="wrap lesson-section"><div class="page-heading"><span class="eyebrow">CLASS 35 · AGES 4–5 · 20 COUNTING LESSONS</span><h1>Numbers, Counting &amp; Early Math.</h1></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Twenty numbers, one smiling fruit at a time.</h2><p class="lesson-copy">Every number in this class has its own step-by-step lesson: open the counting card together, count the smiling fruit, say the number, follow the teaching steps, ask the questions and finish with something real to count in your own kitchen. The order is gentle: cards one to five fit on one hand, cards six to ten need both hands, and the teens repeat one quiet pattern — a full ten, plus some more.</p><p class="lesson-copy">One card a sitting is plenty; the whole class is a month of two-minute counting moments. The kitchen is the answer key, so practice arrives with every snack — and reaching twenty earns a celebration the whole family can hear.</p></section>
 <section class="wrap fc-section" id="learn"><span class="eyebrow">LEARN WITH FLASHCARDS</span><h2>Learn the numbers, one apple to twenty figs.</h2><p class="fc-hint">Twenty counting cards, one picture each. Tap any picture and it opens its own lesson page — the original artwork with a drawing canvas on the left, and what the number means and how to count it for real, taught step by step, on the right.</p><div class="lp-tiles">${learnRows}</div></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Print the counting cards.</h2><p class="fc-hint">Every lesson has a matching flashcard in the library: the original artwork as a printable card with a download button, print size and short notes on counting that number with real things at home. When your child owns 1 to 20, the first counting set and the fruit cards make fine revisiting: <a href="/flashcards/numbers-and-counting/">Numbers 1–10</a> and <a href="/flashcards/fruits-and-vegetables/">Fruits &amp; Vegetables</a>.</p><div class="fc2-actions"><a class="button" href="/flashcards/numbers-counting-and-early-math/">Open the Counting 1–20 flashcards <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${base}flashcards/counting-flashcards-1-20-cover.webp" width="2000" height="1414" alt="Cover of the Counting Flashcards 1–20 set: the title over five smiling fruits — an apple, a banana, grapes, an orange and a strawberry." loading="lazy"></div></section>`;
}
