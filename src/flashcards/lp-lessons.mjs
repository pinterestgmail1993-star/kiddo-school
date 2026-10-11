// Kiddo School — Learning Path flashcard lessons (owner doctrine, 2026-10-12):
// TYPE 1 teaching lesson — the original Canva flashcard on the LEFT (no canvas,
// no tools), unique step-by-step teaching content on the RIGHT. Each lesson has
// its own route under the class path: {lessonPath}learn/{slug}/. This module is
// the registry + page body; the library card pages (flashcards/index.mjs) stay a
// separate WHAT/WHY/PRACTISE experience — no text is shared between the two.
import {fcSetBySlug} from './index.mjs';
import {lpContent as ch33} from './lp-community-helpers.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Registry: one entry per flashcard set that carries Learning Path lessons.
// The class hub renders its compact nav from the same source (single truth).
export const LP_REGISTRY=[
 {slug:'community-helpers-and-our-neighborhood',content:ch33,
  navTitle:'Learn about our community helpers',
  navIntro:'Twenty-nine helpers, one lesson each — five to ten minutes together at a time. Open a lesson, look at the picture, follow the steps, then play the practice game. The lessons follow a gentle order: health helpers first, then safety, learning, food and growing, and the builders and fixers.'}
].map(r=>({...r,set:fcSetBySlug[r.slug]})).filter(r=>r.set);

export const lpSetBySlug=Object.fromEntries(LP_REGISTRY.map(r=>[r.slug,r]));

// The teaching blocks, in the owner's fixed order. `teach` renders as a numbered
// list; `vocab` as chips; everything else as prose. All fields are authored
// fresh per card — nothing here is copied from the library pages.
const BLOCKS=[
 ['what','What is this?'],['mean','What does it mean?'],['know','What does the child need to know?'],
 ['why','Why this matters'],['dev','What it teaches'],['vocab','Words to learn'],
 ['say','Say this to your child'],['teach','Step by step'],['notice','Look closer at the picture'],
 ['ask','Ask your child'],['childSay','What your child can say or do'],['real','Out in the real world'],
 ['play','Try it together'],['check','Understanding check'],['tips','Parent tips'],['safety','Staying safe']
];

export function lpLessonBody(set,card,lesson,ctx){
 const {prev,next}=ctx;
 const blocks=BLOCKS.filter(([k])=>lesson[k]).map(([k,label])=>{
  if(k==='teach'){
   const steps=lesson[k].split('\n').map(s=>`<li>${esc(s.replace(/^\d+\)\s*/,''))}</li>`).join('');
   return `<div class="fc2-do fcl-steps"><h2>${esc(label)}</h2><ol>${steps}</ol></div>`;
  }
  if(k==='vocab'){
   const chips=lesson[k].split(',').map(w=>`<span class="fcl-chip">${esc(w.trim())}</span>`).join('');
   return `<div class="fc2-do"><h2>${esc(label)}</h2><p class="fcl-vocab">${chips}</p></div>`;
  }
  if(k==='say') return `<div class="fc2-do fcl-say"><h2>${esc(label)}</h2><p>&ldquo;${esc(lesson[k])}&rdquo;</p></div>`;
  if(k==='safety') return `<div class="fc2-do fc2-note fcl-safety"><h2>${esc(label)}</h2><p>${esc(lesson[k])}</p></div>`;
  return `<div class="fc2-do"><h2>${esc(label)}</h2><p>${esc(lesson[k])}</p></div>`;
 }).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next lesson"><a class="fc2-pn-btn" href="${prev.url}" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.title)}</strong><span>Previous lesson</span></a><a class="fc2-pn-btn fc2-pn-next" href="${next.url}" rel="next"><strong>${esc(next.title)}</strong> <span aria-hidden="true">→</span><span>Next lesson</span></a></nav>`;
 const cls=(set.stageName||'').split(' · ')[0];
 const pair=`<p class="fcl-pair">This lesson pairs with the <a href="${esc(card.url)}">${esc(card.word)} flashcard</a> in the library — print it, show it, keep it on the fridge. Back to <a href="${esc(set.lessonPath)}">${esc(set.name)}${cls?` (${esc(cls)})`:''}</a>.</p>`;
 return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/learning-path/">Learning Path</a><span aria-hidden="true">/</span><a href="${esc(set.stageHref||set.lessonPath)}">${esc(set.name)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(card.word)}</span></nav>
 <div class="page-heading wrap"><span class="eyebrow">LEARNING PATH LESSON · ${esc(set.name.toUpperCase())} · AGES ${esc(set.ageLabel.toUpperCase())}</span><h1>${esc(card.word)} — a step-by-step lesson for grown-up and child</h1><p>${esc(lesson.intro)}</p></div>
 <div class="fcl wrap">
  <figure class="fcl-art"><img src="${esc(card.img)}" width="${card.w}" height="${card.h}" alt="${esc(card.alt)}"><figcaption><strong>${esc(card.word)}</strong><span>Original Canva flashcard · Card ${card.n} of ${set.cards.length}</span></figcaption></figure>
  <div class="fcl-copy">${blocks}${pair}</div>
 </div>
 <div class="wrap">${pn}</div>`;
}
