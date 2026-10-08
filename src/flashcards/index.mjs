// Kiddo School — Flashcards library: data-driven set + card pages.
// Sources: the eight toddler lessons already in lessons.mjs provide every real
// card (file, dimensions, alt text); the data-* files beside this module add
// the parent-facing words. Nothing is invented: a card exists here only if its
// image exists on R2 and its lesson exists on the site.
import {anLesson,vhLesson,csLesson,msLesson,emLesson,fcLesson,gbLesson,gfLesson} from '../lessons.mjs';
import * as anData from './data-animals-and-sounds.mjs';
import * as vhData from './data-vehicles-and-sounds.mjs';
import * as csData from './data-colors-and-shapes.mjs';
import * as msData from './data-matching-and-sorting.mjs';
import * as emData from './data-emotions-and-feelings.mjs';
import * as fcData from './data-first-concepts.mjs';
import * as gbData from './data-garden-bugs-and-friends.mjs';
import * as gfData from './data-garden-friends.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cardSlug=file=>file.replace(/^\d+-/,'').replace(/\.webp$/,'');
const titleWord=slug=>slug.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
// The four reactions use EXACTLY these values (same values as the class pages).
const REACTIONS=[['love','😍','Loved it'],['like','😊','Liked it'],['okay','😐','It was okay'],['not_for_us','😕','Not for us']];

const SOURCES=[
 [anData,anLesson],[vhData,vhLesson],[csData,csLesson],[msData,msLesson],
 [emData,emLesson],[fcData,fcLesson],[gbData,gbLesson],[gfData,gfLesson]
];

function buildSet([data,lesson]){
 const base=lesson.r2Base+lesson.folder;
 const slug=data.meta.slug;
 const url='/flashcards/'+slug+'/';
 const cards=lesson.cards.map((c,i)=>{
  const s=cardSlug(c.file);
  const d=data.cards[s];
  if(!d) throw Error('flashcards: missing content for '+slug+'/'+s);
  return {slug:s,word:d.word||titleWord(s),file:c.file,w:c.w,h:c.h,alt:c.alt,
   intro:d.intro,say:d.say,try:d.try,note:d.note,url:url+s+'/',img:base+c.file,n:i+1};
 });
 const coverFile=data.meta.coverFile||'cover.webp';
 return {
  slug,url,
  name:data.meta.name,
  seoTitle:data.meta.seoTitle,
  h1:data.meta.h1,
  metaDescription:data.meta.metaDescription,
  lede:data.meta.lede,
  hubBlurb:data.meta.hubBlurb,
  ageLabel:data.meta.ageLabel,
  useIdeas:data.meta.useIdeas,
  printPath:data.meta.printPath||null,
  relatedSlugs:data.meta.relatedSets||[],
  lessonPath:lesson.path,
  lessonTitle:lesson.seoTitle||lesson.title,
  base,
  cover:{file:coverFile,w:1414,h:2000,alt:data.meta.coverAlt||('Cover of the '+data.meta.name+' flashcards set from Kiddo School')},
  coverUrl:base+coverFile,
  cards
 };
}

export const fcSets=SOURCES.map(buildSet);
export const fcSetBySlug=Object.fromEntries(fcSets.map(s=>[s.slug,s]));

function crumbNav(parts){
 return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
}
const heading=(eyebrow,title,desc)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>`;

// ---- Reactions + reviews + comments (three separate things, kept separate) --
// Reactions: one tap, no text, counted live. Reviews: star rating + optional
// text, moderated. Comments: text only, moderated. Each has its own storage
// (page_reactions / page_reviews / page_comments) and its own block here.
export function fcCommunityMount(path){
 return `<section class="wrap lesson-section cm" data-fc-root data-page-path="${esc(path)}" aria-label="Family feedback">
 <span class="eyebrow">REACTIONS</span>
 <h2>How did your kiddo like this?</h2>
 <p class="lesson-copy">One tap, no writing, no name. Pick the face that matches how it went — reactions are counted instantly and stay anonymous.</p>
 <noscript><p class="fc-hint">Tapping a reaction needs JavaScript. Everything else on this page works without it — and you are always welcome to write to the <a href="/principals-office/">Principal&rsquo;s Office</a> instead.</p></noscript>
 <div class="fc2-reactions" data-fc-reactions hidden role="group" aria-label="How did your kiddo like this? Choose one.">
  ${REACTIONS.map(([v,emoji,label])=>`<button type="button" class="cm-btn" data-fc-reaction="${v}" aria-pressed="false"><span class="cm-emoji" aria-hidden="true">${emoji}</span><span>${label}</span><span class="fc2-count" data-fc-count="${v}" hidden aria-hidden="true"></span></button>`).join('')}
 </div>
 <p class="fc2-inline" data-fc-reacted hidden role="status" aria-live="polite"></p>

 <div class="fc2-block">
  <span class="eyebrow">PARENT REVIEWS</span>
  <h2>Parent reviews.</h2>
  <p class="lesson-copy">A different thing from the quick faces above: a star rating for the grown-ups, plus an optional line about how it went. Every review is read by the school office before it appears.</p>
  <noscript><p class="fc-hint">Sending a review needs JavaScript. The cards themselves work fine without it.</p></noscript>
  <div class="fc2-listwrap" data-fc-reviews-box hidden>
   <ul class="cm-list" data-fc-reviews></ul>
  </div>
  <p class="cm-empty" data-fc-reviews-empty>No parent reviews yet — yours could be the first.</p>
  <form class="cm-form" data-fc-review-form hidden novalidate>
   <fieldset class="fc2-stars">
    <legend>Your rating <span class="cm-optional">(required)</span></legend>
    <div class="fc2-star-row" role="radiogroup" aria-label="Rating from 1 to 5 stars">
     ${[1,2,3,4,5].map(n=>`<label class="fc2-star"><input type="radio" name="fc-rating" value="${n}" data-fc-star><span aria-hidden="true">★</span><span class="fc2-star-text">${n} star${n>1?'s':''}</span></label>`).join('')}
    </div>
   </fieldset>
   <label for="fc-review-text">Anything to add? <span class="cm-optional">(optional)</span></label>
   <textarea id="fc-review-text" name="comment" data-fc-review-comment rows="3" maxlength="300" placeholder="What worked, what did not — a sentence or two is plenty."></textarea>
   <label for="fc-review-name">Your name <span class="cm-optional">(optional — a first name, nickname or initials)</span></label>
   <input type="text" id="fc-review-name" name="displayName" data-fc-review-name maxlength="40" autocomplete="off">
   <p class="fc-hint">Reviews are read by the school office before they appear. Don&rsquo;t include private information — no surnames, ages or addresses.</p>
   <label class="cm-confirm"><input type="checkbox" data-fc-review-confirm> I&rsquo;m the grown-up, and I&rsquo;m okay with this review being read for the Kiddo School community.</label>
   <p class="cm-status" data-fc-review-status role="status" aria-live="polite"></p>
   <button type="submit" class="button" data-fc-review-send>Send review</button>
  </form>
 </div>

 <div class="fc2-block">
  <span class="eyebrow">PARENT COMMENTS</span>
  <h2>Parent comments.</h2>
  <p class="lesson-copy">How did you use these cards? Share the game, the moment or the trick that worked in your house. Comments are read by the school office before they appear, and they are about your ideas — never about your child.</p>
  <noscript><p class="fc-hint">Sending a comment needs JavaScript. The cards themselves work fine without it.</p></noscript>
  <div class="fc2-listwrap" data-fc-comments-box hidden>
   <ul class="cm-list" data-fc-comments></ul>
  </div>
  <p class="cm-empty" data-fc-comments-empty>No parent comments yet — yours could be the first.</p>
  <form class="cm-form" data-fc-comment-form hidden novalidate>
   <label for="fc-comment-text">Your comment <span class="cm-optional">(required)</span></label>
   <textarea id="fc-comment-text" name="comment" data-fc-comment-text rows="3" maxlength="300" placeholder="A sentence or two is plenty."></textarea>
   <label for="fc-comment-name">Your name <span class="cm-optional">(optional — a first name, nickname or initials)</span></label>
   <input type="text" id="fc-comment-name" name="displayName" data-fc-comment-name maxlength="40" autocomplete="off">
   <p class="fc-hint">Please don&rsquo;t include private information — no surnames, ages, addresses or anything private about your child.</p>
   <label class="cm-confirm"><input type="checkbox" data-fc-comment-confirm> I&rsquo;m the grown-up, and I&rsquo;m okay with this comment being read for the Kiddo School community.</label>
   <p class="cm-status" data-fc-comment-status role="status" aria-live="polite"></p>
   <button type="submit" class="button" data-fc-comment-send>Send comment</button>
  </form>
 </div>
 </section>`;
}

// ---- The library card for /flashcards/ --------------------------------------
export function fcSetCard(s){
 return `<a class="fc-setcard" href="${s.url}"><div class="fc-setcard-visual"><img src="${s.coverUrl}" width="640" height="900" alt="${esc(s.cover.alt)}" loading="lazy"></div><div class="fc-setcard-copy"><span class="eyebrow">AGES ${esc(s.ageLabel.toUpperCase())}</span><h2>${esc(s.name)}</h2><p>${esc(s.hubBlurb)}</p><span class="fc-open">Open this set · ${s.cards.length} cards <span aria-hidden="true">↗</span></span></div></a>`;
}

// ---- Set page ----------------------------------------------------------------
export function fcSetPageBody(s){
 const cover=`<figure class="fc2-cover"><img src="${s.coverUrl}" width="1414" height="2000" alt="${esc(s.cover.alt)}" loading="lazy"><figcaption><strong>${esc(s.name)}</strong><span>${s.cards.length} cards · free to print</span></figcaption></figure>`;
 const grid=`<div class="fc-grid fc2-cards">${s.cards.map(c=>`<a class="fc-card fc2-cardlink" href="${c.url}"><span class="fc2-cardimg"><img src="${c.img}" width="440" height="622" alt="${esc(c.alt)}" loading="lazy"></span><span class="fc2-cardword"><strong>${esc(c.word)}</strong><span>Card ${c.n} of ${s.cards.length}</span></span></a>`).join('')}</div>`;
 const ideas=`<ol class="fc-steps">${s.useIdeas.map(([t,d],i)=>`<li><span class="fc-stepnum">${String(i+1).padStart(2,'0')}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('')}</ol>`;
 const related=s.relatedSlugs.map(k=>fcSetBySlug[k]).filter(Boolean);
 const relatedRow=related.length?`<div class="fc2-relrow">${related.map(r=>`<a class="fc2-relcard" href="${r.url}"><strong>${esc(r.name)}</strong><span>${r.cards.length} cards</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a>`).join('')}</div>`:'';
 const printBtn=s.printPath?`<a class="button" href="${s.printPath}">Print the full set</a>`:'';
 return `${crumbNav([['Flashcards','/flashcards/'],[s.name]])}
 ${heading('FLASHCARD SET · AGES '+esc(s.ageLabel.toUpperCase()),s.h1,esc(s.lede))}
 <section class="wrap fc-section">${cover}</section>
 <section class="wrap fc-section"><span class="eyebrow">THE CARDS</span><h2>Every card in the set.</h2><p class="fc-hint">Each card has its own page with the picture, the words to say and one thing to try together. Tap any card to open it.</p>${grid}</section>
 <section class="wrap fc-section"><span class="eyebrow">HOW TO USE THESE CARDS</span><h2>Four ways that work.</h2><p class="fc-hint">You do not need a plan or a printer schedule. Pick one idea, try it for two minutes and see what happens.</p>${ideas}</section>
 <section class="wrap fc-section"><span class="eyebrow">PRINT &amp; DOWNLOAD</span><h2>Print the set, download a card.</h2><div class="fc2-actions"><a class="button" href="${s.lessonPath}">View the class these cards come from <span aria-hidden="true">↗</span></a>${printBtn}<a class="button" href="/flashcards/">All flashcard sets</a></div><p class="fc-hint">Every card page has its own download button with the full-size image. ${s.printPath?'The full set has a print-ready page too.':'This set is printed straight from its class page.'}</p></section>
 ${relatedRow?`<section class="wrap fc-section"><span class="eyebrow">MORE CARDS LIKE THESE</span><h2>Families of cards that pair well.</h2>${relatedRow}</section>`:''}
 ${fcCommunityMount(s.url)}`;
}

// ---- Card page ----------------------------------------------------------------
export function fcCardPageBody(set,card,ctx){
 const {prev,next,related}=ctx;
 const figure=`<figure class="fc2-hero"><img src="${card.img}" width="${card.w}" height="${card.h}" alt="${esc(card.alt)}"><figcaption><strong>${esc(card.word)}</strong><span>Card ${card.n} of ${set.cards.length} · ${esc(set.name)}</span></figcaption></figure>`;
 const say=`<div class="fc2-do"><h2>Say it together</h2><p class="fc2-say">&ldquo;${esc(card.say)}&rdquo;</p><p class="fc-hint">Say it naturally, then wait. Whatever comes back — the word, the sound, a point, a giggle — is the right answer.</p></div>`;
 const tryThis=`<div class="fc2-do"><h2>Try this</h2><p>${esc(card.try)}</p></div>`;
 const note=`<div class="fc2-do fc2-note"><h2>Quick parent note</h2><p>${esc(card.note)}</p></div>`;
 const actions=`<div class="fc2-actions"><a class="button" href="${card.img}" download="${esc(card.word.toLowerCase().replace(/[^a-z0-9]+/g,'-'))}.webp">Download card <span aria-hidden="true">↓</span></a><a class="button" href="${set.url}">View full set</a>${set.printPath?`<a class="button" href="${set.printPath}">Print full set</a>`:''}</div>`;
 const lesson=`<p class="fc2-lesson">These cards come from the <a href="${set.lessonPath}">${esc(set.lessonTitle)}</a> — the full interactive class with games, sounds and a print view.</p>`;
 const relGrid=related&&related.length?`<section class="wrap fc-section"><span class="eyebrow">RELATED CARDS</span><h2>More cards to try.</h2><p class="fc-hint">${esc(ctx.relatedHint||'Nearby cards from this set and its closest friends.')}</p><div class="fc-grid fc2-cards">${related.map(r=>`<a class="fc-card fc2-cardlink" href="${r.card.url}"><span class="fc2-cardimg"><img src="${r.card.img}" width="440" height="622" alt="${esc(r.card.alt)}" loading="lazy"></span><span class="fc2-cardword"><strong>${esc(r.card.word)}</strong><span>From ${esc(r.setName)}</span></span></a>`).join('')}</div></section>`:'';
 const prevNext=`<nav class="fc2-pn" aria-label="Previous and next card"><a class="fc2-pn-btn" href="${prev.url}" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.word)}</strong><span>Previous card</span></a><a class="fc2-pn-btn fc2-pn-next" href="${next.url}" rel="next"><strong>${esc(next.word)}</strong> <span aria-hidden="true">→</span><span>Next card</span></a></nav>`;
 return `${crumbNav([['Flashcards','/flashcards/'],[set.name,set.url],[card.word]])}
 <div class="page-heading wrap"><span class="eyebrow">FLASHCARD · ${esc(set.name.toUpperCase())} · AGES ${esc(set.ageLabel.toUpperCase())}</span><h1>${esc(card.word)} Flashcard for Toddlers</h1><p>${esc(card.intro)}</p></div>
 <section class="wrap fc-section">${figure}</section>
 <section class="wrap fc-section">${say}${tryThis}${note}</section>
 <section class="wrap fc-section"><span class="eyebrow">TAKE IT WITH YOU</span><h2>Download, print, keep going.</h2>${actions}${lesson}</section>
 ${relGrid}
 <section class="wrap fc-section"><h2 class="fc2-visually-hidden">Previous and next card</h2>${prevNext}</section>
 ${fcCommunityMount(card.url)}`;
}

// Related cards for a card: the next two in the set (wrapping) plus one
// cross-set pick — same slug in a sibling set when there is one (bird→bird,
// frog→frog), otherwise the sibling set's first card. Deterministic, honest.
export function fcRelatedFor(set,card){
 const n=set.cards.length;
 const inSet=[set.cards[(card.n)%n],set.cards[(card.n+1)%n]];
 let cross=null;
 for(const rel of set.relatedSlugs){
  const rset=fcSetBySlug[rel];
  if(!rset) continue;
  const twin=rset.cards.find(c=>c.slug===card.slug);
  const pick=twin||rset.cards[0];
  if(pick&&pick.url!==card.url){cross={card:pick,setName:rset.name};break;}
 }
 const related=[...inSet.map(c=>({card:c,setName:set.name}))];
 if(cross) related.push(cross);
 return related.slice(0,3);
}
