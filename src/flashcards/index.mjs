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
import * as alData from './data-alphabet.mjs';
import * as nmData from './data-numbers.mjs';
import * as shData from './data-shapes.mjs';
import * as clData from './data-colors.mjs';
import * as opData from './data-opposites.mjs';
import * as amData from './data-animals.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cardSlug=file=>file.replace(/^\d+-/,'').replace(/\.webp$/,'');
const titleWord=slug=>slug.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
// The four reactions use EXACTLY these values (same values as the class pages).
const REACTIONS=[['love','😍','Loved it'],['like','😊','Liked it'],['okay','😐','It was okay'],['not_for_us','😕','Not for us']];

const SOURCES=[
 [anData,anLesson],[vhData,vhLesson],[csData,csLesson],[msData,msLesson],
 [emData,emLesson],[fcData,fcLesson],[gbData,gbLesson],[gfData,gfLesson],
 // The alphabet module keeps explicit export names (alphabetMeta/alphabetCardContent)
 // because it also carries the Age 3 lesson object; adapt it to the common shape.
 // The numbers and shapes modules are the same pattern (Age 3 Classes 2 and 3).
 [{meta:alData.alphabetMeta,cards:alData.alphabetCardContent},alData.alphabetLesson],
 [{meta:nmData.numbersMeta,cards:nmData.numbersCardContent},nmData.numbersLesson],
 [{meta:shData.shapesMeta,cards:shData.shapesCardContent},shData.shapesLesson],
 // Age 3 Class 4: each color card carries BOTH faces — the splash (file)
 // and the matching picture (picFile) — rendered together on its card page.
 [{meta:clData.colorsMeta,cards:clData.colorsCardContent},clData.colorsLesson],
 // Age 3 Class 5: six honest opposite pairs — one card per opposite, its own
 // page, its own words. Slugs come from the real filenames (big-ball,
 // small-ball…), exactly the URLs the owner specified.
 [{meta:opData.oppositesMeta,cards:opData.oppositesCardContent},opData.oppositesLesson],
 // Age 3 Class 6: twelve animal friends — nine with a real recording in
 // /assets/sounds/animals/ (card.audio). The play button renders only where
 // a recording exists; duck, elephant and frog say theirs are on the way.
 [{meta:amData.animalsMeta,cards:amData.animalsCardContent},amData.animalsLesson]
];

function buildSet([data,lesson]){
 const base=lesson.r2Base+lesson.folder;
 const slug=data.meta.slug;
 const url='/flashcards/'+slug+'/';
 const cards=lesson.cards.map((c,i)=>{
  // Lesson cards may carry their own slug (the alphabet files are named
  // 01-a-apple.webp but live at /flashcards/alphabet/apple/ — the data module
  // supplies the slug); everything else keeps the file-derived slug.
  const s=c.slug||cardSlug(c.file);
  const d=data.cards[s];
  if(!d) throw Error('flashcards: missing content for '+slug+'/'+s);
  return {slug:s,word:d.word||titleWord(s),file:c.file,w:c.w,h:c.h,alt:c.alt,
   img2:c.picFile?base+c.picFile:null,alt2:c.picAlt||null,picWord:d.picWord||null,
   letter:c.letter||d.letter||null,numeral:c.numeral||d.numeral||null,sound:d.sound||null,audio:c.audio||null,metaDescription:d.metaDescription||null,cardTitle:d.cardTitle||null,
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
  noun:data.meta.noun||'Toddlers',
  group:data.meta.group||'toddler',
  useIdeas:data.meta.useIdeas,
  downloadHint:data.meta.downloadHint||null,
  printPath:data.meta.printPath||null,
  relatedSlugs:data.meta.relatedSets||[],
  lessonPath:lesson.path,
  lessonTitle:lesson.seoTitle||lesson.title,
  base,
  // Cover dims come from the lesson's own probe (vehicles 2000×1294 and
  // emotions 2000×1414 are LANDSCAPE — hardcoding 1414×2000 here is what
  // squashed them on the library wall). Garden Friends has no lesson cover;
  // its cover file is the 1414×2000 bird card, so the portrait fallback holds.
  cover:{file:coverFile,w:lesson.cover?lesson.cover.w:1414,h:lesson.cover?lesson.cover.h:2000,alt:data.meta.coverAlt||('Cover of the '+data.meta.name+' flashcards set from Kiddo School')},
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
 // True cover dimensions in the HTML attrs — landscape covers (vehicles,
 // emotions, garden bugs) keep their real ratio on the library wall.
 return `<a class="fc-setcard" href="${s.url}"><div class="fc-setcard-visual"><img src="${s.coverUrl}" width="${s.cover.w}" height="${s.cover.h}" alt="${esc(s.cover.alt)}" loading="lazy"></div><div class="fc-setcard-copy"><span class="eyebrow">AGES ${esc(s.ageLabel.toUpperCase())}</span><h2>${esc(s.name)}</h2><p>${esc(s.hubBlurb)}</p><span class="fc-open">Open this set · ${s.cards.length} cards <span aria-hidden="true">↗</span></span></div></a>`;
}

// ---- Set page ----------------------------------------------------------------
export function fcSetPageBody(s){
 // No cover/thumbnail figure here: visitors just saw the set's cover on the
 // /flashcards/ library wall, and repeating it pushed the cards below the
 // fold. Landscape covers were also forced into a portrait box and cropped.
 // The page now opens straight on the cards themselves.
 const grid=`<div class="fc2-cards">${s.cards.map(c=>`<a class="fc-card fc2-cardlink" href="${c.url}"><span class="fc2-cardimg"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"></span><span class="fc2-cardword"><strong>${esc(c.word)}</strong><span>Card ${c.n} of ${s.cards.length}</span></span></a>`).join('')}</div>`;
 const ideas=`<ol class="fc-steps">${s.useIdeas.map(([t,d],i)=>`<li><span class="fc-stepnum">${String(i+1).padStart(2,'0')}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('')}</ol>`;
 const related=s.relatedSlugs.map(k=>fcSetBySlug[k]).filter(Boolean);
 const relatedRow=related.length?`<div class="fc2-relrow">${related.map(r=>`<a class="fc2-relcard" href="${r.url}"><strong>${esc(r.name)}</strong><span>${r.cards.length} cards</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a>`).join('')}</div>`:'';
 const printBtn=s.printPath?`<a class="button" href="${s.printPath}">Print the full set</a>`:'';
 return `${crumbNav([['Flashcards','/flashcards/'],[s.name]])}
 ${heading('FLASHCARD SET · AGES '+esc(s.ageLabel.toUpperCase()),s.h1,esc(s.lede))}
 <section class="wrap fc-section"><span class="eyebrow">THE CARDS</span><h2>Every card in the set.</h2><p class="fc-hint">Each card has its own page with the picture, the words to say and one thing to try together. Tap any card to open it.</p>${grid}</section>
 <section class="wrap fc-section"><span class="eyebrow">HOW TO USE THESE CARDS</span><h2>Four ways that work.</h2><p class="fc-hint">You do not need a plan or a printer schedule. Pick one idea, try it for two minutes and see what happens.</p>${ideas}</section>
 <section class="wrap fc-section"><span class="eyebrow">PRINT &amp; DOWNLOAD</span><h2>Print the set, download a card.</h2><div class="fc2-actions"><a class="button" href="${s.lessonPath}">View the class these cards come from <span aria-hidden="true">↗</span></a>${printBtn}<a class="button" href="/flashcards/">All flashcard sets</a></div><p class="fc-hint">${s.downloadHint||'Every card page has its own download button with the full-size image.'}${s.printPath?' The full set has a print-ready page too.':' This set is printed straight from its class page.'}</p></section>
 ${relatedRow?`<section class="wrap fc-section"><span class="eyebrow">MORE CARDS LIKE THESE</span><h2>Families of cards that pair well.</h2>${relatedRow}</section>`:''}
 ${fcCommunityMount(s.url)}`;
}

// ---- Card page ----------------------------------------------------------------
// Layout: the card and its teaching notes sit in the left column; downloads,
// share buttons and the three community blocks (reactions, reviews, comments)
// sit in a right-hand rail, so nothing important hides below the fold.
export function fcCardPageBody(set,card,ctx){
 const {prev,next,related}=ctx;
 const noun=ctx.noun||'Toddlers';
 const site=String(ctx.site||'').replace(/\/$/,'');
 const enc=encodeURIComponent;
 const pageUrl=site+card.url;
 const shareTitle=`${card.word} flashcard for ${noun.toLowerCase()} — ${set.name} · Kiddo School`;
 // A color card has TWO faces: the splash and the matching picture. They
 // render side by side at their true 1414×2000 ratio (stacking on mobile);
 // single-image cards keep the original hero figure untouched.
 const heroFig=(src,w,h,cap,alt,lazy)=>`<figure class="fc2-hero fc2-hero-half"><img src="${src}" width="${w}" height="${h}" alt="${esc(alt)}"${lazy?' loading="lazy"':''}><figcaption><strong>${esc(cap)}</strong><span>Card ${card.n} of ${set.cards.length} · ${esc(set.name)}</span></figcaption></figure>`;
 const figure=card.img2
  ?`<div class="fc2-pair">${heroFig(card.img,card.w,card.h,card.word+' splash',card.alt,false)}${heroFig(card.img2,card.w,card.h,card.picWord||(card.word+' in real life'),card.alt2,true)}</div>`
  :`<figure class="fc2-hero"><img src="${card.img}" width="${card.w}" height="${card.h}" alt="${esc(card.alt)}"><figcaption><strong>${esc(card.word)}</strong><span>Card ${card.n} of ${set.cards.length} · ${esc(set.name)}</span></figcaption></figure>`;
 const pn=`<nav class="fc2-pn" aria-label="Previous and next card"><a class="fc2-pn-btn" href="${prev.url}" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.word)}</strong><span>Previous card</span></a><a class="fc2-pn-btn fc2-pn-next" href="${next.url}" rel="next"><strong>${esc(next.word)}</strong> <span aria-hidden="true">→</span><span>Next card</span></a></nav>`;
 // Cards with a real recording (Age 3 Class 6) get a real play control in
 // the say block — wired to /assets/sounds/animals/ by animal-sounds-class.js.
 // Cards without a recording render nothing here; nothing is faked.
 const sayAudio=card.audio?`<button type="button" class="an-play an-play-card" data-an-sound="${esc(card.slug)}" data-an-src="/assets/sounds/animals/${esc(card.audio)}.mp3" aria-label="Play the ${esc(card.word.toLowerCase())} sound, then play it again"><span class="an-play-icon" aria-hidden="true">▶</span><span class="an-play-label">Hear the ${esc(card.word.toLowerCase())}</span><span class="an-replay">Play again</span></button>`:'';
 const say=`<div class="fc2-do"><h2>Say it together</h2><p class="fc2-say">&ldquo;${esc(card.say)}&rdquo;</p>${sayAudio}<p class="fc-hint">Say it naturally, then wait. Whatever comes back — the word, the sound, a point, a giggle — is the right answer.</p></div>`;
 const sound=card.sound?`<div class="fc2-do fc2-sound"><h2>Letter sound</h2><p>${esc(card.sound)}</p></div>`:'';
 const tryThis=`<div class="fc2-do"><h2>Try this</h2><p>${esc(card.try)}</p></div>`;
 const note=`<div class="fc2-do fc2-note"><h2>Quick parent note</h2><p>${esc(card.note)}</p></div>`;
 const dlName=f=>f.replace(/^\d+-/,'').replace(/\.webp$/,'');
 const actions=`<div class="fc2-actions">${card.img2
  ?`<a class="button" href="${card.img}" download="${dlName(card.file)}.webp">Download splash <span aria-hidden="true">↓</span></a><a class="button" href="${card.img2}" download="${dlName(card.img2.split('/').pop())}.webp">Download picture <span aria-hidden="true">↓</span></a>`
  :`<a class="button" href="${card.img}" download="${esc(card.word.toLowerCase().replace(/[^a-z0-9]+/g,'-'))}.webp">Download card <span aria-hidden="true">↓</span></a>`}${set.printPath?`<a class="button" href="${set.printPath}">Print full set</a>`:''}<a class="button" href="${set.url}">View full set</a></div>`;
 const share=`<div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS CARD</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this card on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this card on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this card on WhatsApp">WhatsApp</a><a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(pageUrl)}&media=${enc(card.img)}&description=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Save this card on Pinterest">Pinterest</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page&rsquo;s address — nothing is tracked.</p></div>`;
 const lesson=set.lessonPath?`<p class="fc2-lesson">These cards come from the <a href="${set.lessonPath}">${esc(set.lessonTitle)}</a> — the full interactive class with games, sounds and a print view.</p>`:'';
 const relGrid=related&&related.length?`<section class="wrap fc-section"><span class="eyebrow">RELATED CARDS</span><h2>More cards to try.</h2><p class="fc-hint">${esc(ctx.relatedHint||'Nearby cards from this set and its closest friends.')}</p><div class="fc2-cards">${related.map(r=>`<a class="fc-card fc2-cardlink" href="${r.card.url}"><span class="fc2-cardimg"><img src="${r.card.img}" width="${r.card.w}" height="${r.card.h}" alt="${esc(r.card.alt)}" loading="lazy"></span><span class="fc2-cardword"><strong>${esc(r.card.word)}</strong><span>From ${esc(r.setName)}</span></span></a>`).join('')}</div></section>`:'';
 return `${crumbNav([['Flashcards','/flashcards/'],[set.name,set.url],[card.word]])}
 <div class="page-heading wrap"><span class="eyebrow">FLASHCARD · ${esc(set.name.toUpperCase())} · AGES ${esc(set.ageLabel.toUpperCase())}</span><h1>${card.numeral?`Number ${esc(card.numeral)} Flashcard — ${esc(card.word)} for ${esc(noun)}`:card.letter?`${esc(card.word)} Flashcard — Letter ${esc(card.letter.toUpperCase())} for ${esc(noun)}`:`${esc(card.word)} Flashcard for ${esc(noun)}`}</h1><p>${esc(card.intro)}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main">${figure}${pn}<section class="fc2-learn" aria-label="How to use this card">${say}${sound}${tryThis}${note}</section>${lesson}</div>
  <aside class="fc2-rail" aria-label="Download, share and family feedback"><section class="fc2-block fc2-first-block"><span class="eyebrow">TAKE IT WITH YOU</span><h2>Download, print, keep going.</h2>${actions}</section>${share}${fcCommunityMount(card.url)}</aside>
 </div>
 ${relGrid}`;
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
 if(cross){related.push(cross);}
 else{const third=set.cards[(card.n+2)%n];if(third&&third.url!==card.url)related.push({card:third,setName:set.name});}
 return related.slice(0,3);
}
