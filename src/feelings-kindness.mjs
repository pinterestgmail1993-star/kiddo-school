// Kiddo School — Class 38 · Feelings & Kindness: the Learning Path class
// page. Same process as every class (owner instruction, repeated 2026-10-14
// "the process is the same"): the class hub shows the whole set as PICTURES and
// every picture opens its own /learn/ teaching lesson — original card on the
// left, step-by-step teaching on the right (built from lp-feelings-kindness.mjs
// via LP_REGISTRY). The flashcard library pages stay the download/print shelf
// behind ONE supporting resource section. Class 38 sits at the END of the path
// by owner decision (2026-10-23): beside Class 32 was the logical home, but
// inserting it there would renumber Classes 33–37 and break their links — so
// it continues after Class 37 (Sports, Movement & Play) and Class 32 points
// forward to it. CSP-safe rendering: every image carries its own width/height
// (all 36 files 800×1131) and NO inline styles.
import {lesson as fkLesson} from './flashcards/data-feelings-kindness.mjs';
import {lpContent as fkLp} from './flashcards/lp-feelings-kindness.mjs';

export const FK_CLASS_PATH='/preschool/4-years/feelings-and-kindness/';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function feelingsKindnessClassBody(){
 const base=fkLesson.r2Base;
 const cards=fkLesson.cards.map(c=>({...c,img:base+'flashcards/'+c.file}));
 const learnRows=cards.map(c=>{
  const l=fkLp[c.file.replace(/^\d+-/,'').replace(/\.webp$/,'')];
  return `<a class="lp-tile" href="${FK_CLASS_PATH}learn/${c.file.replace(/^\d+-/,'').replace(/\.webp$/,'')}/"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title.replace(/^The | Lesson$/g,''))}</strong></a>`;
 }).join('');
 return `<section class="wrap lesson-section"><div class="page-heading"><span class="eyebrow">CLASS 38 · AGES 4–5 · 35 FEELINGS &amp; KINDNESS LESSONS</span><h1>Feelings &amp; Kindness.</h1></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Thirty-five cards, four words each, one kinder vocabulary.</h2><p class="lesson-copy">Every card in this class teaches four words a four-year-old actually needs: the feeling faces (happy, sad, angry, calm — then the bigger ones), the kind habits (share, help, take turns, include), the calm-down skills (breathe, pause, count to ten, reset) and the belonging words (you matter, I am here, we care). Each card opens its own step-by-step lesson — what the words mean, the three ideas your child needs, the parent script, one game for the living room and the moment in your real day where the words already live. The order is deliberate: feelings first, kindness second, the tricky words honestly in the middle, and the choice at the end.</p><p class="lesson-copy">One card a sitting is plenty — the whole class is a term of five-minute feelings talks. The vocabulary is the one early-years teachers use in the US, Canada, Australia and New Zealand: social-emotional learning, emotion vocabulary, feelings check-ins and calm-down skills — the same words preschools teach as the heart of the early curriculum. By the last card, your child holds a whole vocabulary for the weather inside — and the standing rule that kindness is a choice, freely made, every time.</p></section>
 <section class="wrap lesson-section"><span class="eyebrow">WHY FEELINGS FIRST</span><h2>A feeling with a name is a feeling with a door.</h2><p class="lesson-copy">The research keeps landing in the same place: children who can name their feelings need fewer meltdowns to say the same thing, recover faster when the storm lands and ask for help sooner. This class does not train happiness — every feeling on these cards is allowed, from lonely to jealous to embarrassed. It hands your child the words for ALL of them, plus the calm-down skills that make the big ones survivable and the kindness habits that make other people glad your child came.</p><p class="lesson-copy">And the class keeps its place in the Learning Path honestly: it grew out of Class 32 (Life Skills &amp; Good Habits) — the habits shelf — and it is the older cousin of the first feeling faces your child met in the toddler years. Class 32 points here as its next step; the age-two <a href="/toddler/2-years/emotions-and-feelings/">Emotions &amp; Feelings class</a> remains the gentle way in for younger siblings.</p></section>
 <section class="wrap fc-section" id="learn"><span class="eyebrow">LEARN WITH FLASHCARDS</span><h2>Learn the words, one card at a time.</h2><p class="fc-hint">Thirty-five feelings-and-kindness cards, four words each. Tap any picture and it opens its own lesson page — the original artwork on the left, and the step-by-step teaching on the right: what the words mean, the three ideas your child needs, the script to say and one game to play tonight.</p><div class="lp-tiles">${learnRows}</div></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Print the feelings &amp; kindness cards.</h2><p class="fc-hint">Every lesson has a matching flashcard in the library: the original artwork as a printable card with a download button, print size and short notes on using the words at home. When your child owns the feelings words, the <a href="/flashcards/life-skills-and-good-habits/">Life Skills &amp; Good Habits cards</a> and the <a href="/preschool/4-years/community-helpers-and-our-neighborhood/">Community Helpers class</a> make fine revisiting.</p><div class="fc2-actions"><a class="button" href="/flashcards/feelings-and-kindness/">Open the Feelings &amp; Kindness flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${base}flashcards/cover.webp" width="800" height="1131" alt="Cover of the Feelings &amp; Kindness flashcards set: the title over a big pink heart with two children hugging beneath it." loading="lazy"></div></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> Follow your child\u2019s weather from the happy faces to the kindness graduation — every lesson stands on its own.</p>`;
}
