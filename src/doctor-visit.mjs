// Kiddo School — EXTRA CLASS · Doctor Visit: the class page. A bonus class
// beside the core Learning Path (owner decision 2026-10-15), like the Toddler
// Room and the Kitchen. The page walks the whole check-up in the owner's own
// visit order — GETTING READY → MEETING THE HELPERS → THE CHECK-UP → AFTER
// THE VISIT — with a teddy bear coming along on every card. The two cards
// most likely to worry a young child (x-ray, hospital bed) sit deep in the
// last two groups, so the page opens on the calm cards. Every tile opens one
// /extra-classes/doctor-visit/learn/ lesson; every lesson's card twin lives
// in the flashcards library. THE RULE, said kindly and often: medicine is
// only taken from a grown-up. CSP-safe: every image carries its own
// width/height (16 portrait cards 800×1132, 6 landscape cards 1000×707) and
// NO inline styles.
import {lesson as dvLesson} from './flashcards/data-doctor-visit.mjs';
import {lpContent as dvLp} from './flashcards/lp-doctor-visit.mjs';

export const DV_PATH='/extra-classes/doctor-visit/';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* The four groups of the visit, the owner's own order and headings. */
const GROUPS=[
 ['Getting ready','The visit starts before the doctor says hello: the appointment, the reception desk, the name tag, the waiting room.',['appointment','reception-desk','name-tag','waiting-room']],
 ['Meeting the helpers','The doctor and the nurse say hello first — and the scale and the exam bed are just things to stand on and sit on.',['doctor','nurse','weigh-in','exam-room']],
 ['The check-up','The listening, the looking and the checking — one step at a time, and the doctor counts what is already good.',['check-up','stethoscope','thermometer','ear-check','mouth-check','eye-chart','deep-breath','x-ray']],
 ['After the visit','The part that feels like a job well done: medicine only from a grown-up, a small bandage, clean hands, and the great-job walk home.',['medicine','bandage','hand-washing','hospital-bed','feel-better','goodbye']]
];

export function doctorVisitBody(){
 const base=dvLesson.r2Base;
 const bySlug=Object.fromEntries(dvLesson.cards.map(c=>[c.slug,c]));
 const group=(title,blurb,slugs)=>`<div class="fc-pillgroup"><div class="fc-pillgroup-head"><span class="fc-pill fc-pill-age fc-pill-big">${esc(title)}</span><p class="fc-hint">${esc(blurb)}</p></div><div class="lp-tiles">${slugs.map(s=>{const c=bySlug[s];const l=dvLp[s];return `<a class="lp-tile" href="${DV_PATH}learn/${c.slug}/"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title.replace(/^The | Lesson$/g,''))}</strong></a>`;}).join('')}</div></div>`;
 return `<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>A whole check-up, one calm card at a time.</h2><p class="lesson-copy">The Doctor Visit is a bonus class, kept beside the main learning path: the regular classes stay the core sequence, and this one is for families with a check-up coming up — or with a child who asks "what happens at the doctor?" It helps children know what to expect by walking the visit in order, and a teddy bear comes along on every step: checked, weighed, listened to and proudly discharged, right beside your child.</p><p class="lesson-copy">The cards run in visit order on purpose. The gentle steps come first — the appointment, the waiting room, the helpers’ hello — and the two big ones, the x-ray and the hospital bed, arrive late, when your child already knows the story. Nothing at a check-up is a punishment: the doctor is counting what is already good, and the last card of the day is a proud wave goodbye.</p></section>
 <section class="wrap lesson-section" id="the-visit"><span class="eyebrow">THE VISIT, IN ORDER</span><h2>From the appointment to the goodbye.</h2><p class="fc-hint">Twenty-two cards in four groups, exactly the order a check-up happens. Tap any picture and it opens its own step-by-step lesson — the original artwork on the left, and the teaching on the right.</p>
  ${group(...GROUPS[0])}
  ${group(...GROUPS[1])}
  ${group(...GROUPS[2])}
  ${group(...GROUPS[3])}
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">THE CLASS GAME</span><h2>Play doctor at home.</h2><p class="lesson-copy">Let your child be the doctor and check their teddy with a toy stethoscope — hello first, then the heart listen, the ears, the big open "aah" and one deep breath. Then swap, and your child is the patient who knows exactly what each step feels like. A child in the doctor’s seat is a child who stops worrying about the waiting room.</p></section>
 <section class="wrap lesson-section"><span class="eyebrow">THE ONE RULE, SAID KINDLY</span><h2>Medicine is only taken from a grown-up.</h2><p class="lesson-copy">The medicine card carries the rule right on its face, and the class repeats it the same way every time: <strong>grown-ups measure it, grown-ups give it — only from a grown-up.</strong> Medicine is not candy and not a toy; it lives up high, and the child’s job is the asking: "may I have my medicine, please?" Said kindly and often, the rule becomes one the child recites without being asked — which is exactly how it protects them.</p></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Print the doctor-visit cards.</h2><p class="fc-hint">Every lesson has a matching flashcard in the library: the original artwork as a printable card with a download button and short notes for grown-ups. Pack the cards for the waiting room — the visit, told in order, is the whole comfort.</p><div class="fc2-actions"><a class="button" href="/flashcards/doctor-visit/">Open the Doctor Visit flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/extra-classes/">Back to Extra Classes <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${base}cover.webp" width="800" height="1132" alt="Cover of the Doctor Visit flashcards set: a doctor greeting a child hugging a teddy bear, with the words Doctor Visit Flashcards — a gentle guide for kids." loading="lazy"></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>More helpers, more good habits.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/4-years/community-helpers-and-our-neighborhood/">Meet other community helpers <span>· Class 33</span> <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/preschool/4-years/life-skills-and-good-habits/">More good habits <span>· Class 32</span> <span aria-hidden="true">↗</span></a></div></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> Start with the calm cards, follow the visit order, follow the child — and keep the one rule louder than all of it: medicine is only taken from a grown-up.</p>`;
}
