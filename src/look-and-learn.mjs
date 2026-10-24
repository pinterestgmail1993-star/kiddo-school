// Kiddo School — Look & Learn: the extra class page at /look-and-learn/ and
// one short page per word at /flashcards/<word>/ (owner 2026-10-24). The
// class page shows cover.webp FIRST, then cards 01–15 in file order, each
// card opening the pages of its four words. Five words already own pages
// elsewhere on the school (duck, banana, carrot, grapes, strawberry) — per
// the owner, their URLs stay untouched and they are LINKED, never rebuilt.
// Every new word page links back to /look-and-learn/. Cross-links: Classes
// 31, 22 and 11 point here (LL_CLASS_LINKS, appended to their class bodies
// in scripts/build.mjs) and this page points back to all three.
import {LL_CARDS,LL_COVER,LL_EXISTING,LL_BASE} from './ll-cards.mjs';
import {WORDS_A} from './ll-words-a.mjs';
import {WORDS_B} from './ll-words-b.mjs';
import {fcCommunityMount} from './flashcards/community.mjs';

export {LL_COVER,LL_BASE};

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export const LL_PATH='/look-and-learn/';

const CONTENT=Object.fromEntries([...WORDS_A,...WORDS_B].map(x=>[x.w,x]));
const cardFile=n=>LL_CARDS[n-1].file;
const cardImg=n=>LL_BASE+'flashcards/'+cardFile(n);
const cardAlt=n=>LL_CARDS[n-1].alt;

// The 48 words in FILE ORDER (card 01 panels first … card 15 panels last),
// each with every card it appears on and the URL it lives at. Twelve words
// ride TWO cards (moon, tree, star, ladybug, raindrop, turtle, kite, frog,
// leaf, butterfly, carrot, balloon) — deduped to ONE entry each, `n` =
// the FIRST card, so /flashcards/<word>/ is registered exactly once.
const llSeen=new Set();
export const LL_WORDS=LL_CARDS.flatMap(c=>c.panels.map(p=>({w:p.w,n:c.n,a:p.a,l:p.l})))
 .filter(x=>!llSeen.has(x.w)&&llSeen.add(x.w))
 .map(x=>({w:x.w,n:x.n,a:x.a,l:x.l,
  cards:LL_CARDS.filter(k=>k.panels.some(q=>q.w===x.w)).map(k=>k.n),
  existing:LL_EXISTING[x.w]||null}))
 .map(x=>({...x,url:x.existing||'/flashcards/'+x.w+'/'}))
 .map((x,i)=>({...x,k:i+1}));
if(LL_WORDS.length!==48)throw Error('look-and-learn: expected 48 unique words, got '+LL_WORDS.length);
if(new Set(LL_WORDS.filter(x=>!x.existing).map(x=>x.url)).size!==43)throw Error('look-and-learn: expected 43 unique new word URLs');
export const LL_NEW=LL_WORDS.filter(x=>!x.existing);
export const llByWord=Object.fromEntries(LL_WORDS.map(x=>[x.w,x]));

const sayLead=['The card\u2019s own move:','Your move on this card:','How the card says to play it:','The move printed on the card:'];
const titleOf=w=>w.charAt(0).toUpperCase()+w.slice(1);

/* ---- The class page ---------------------------------------------------- */
export function lookAndLearnBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">EXTRA CLASS \u00b7 AGES 2\u20135 \u00b7 15 CARDS \u00b7 48 WORDS</span><h1>Look &amp; Learn.</h1><p class="lesson-lede">Fifteen picture cards, four words each, and one tiny move on every picture \u2014 point at the moon, waddle like a duck, balance like a flamingo. This is the school\u2019s lightest class: no sequence, no worksheets, just looking, saying and a little moving, for children from two to five.</p><div class="lesson-start"><a class="button" href="#cards">Start with card 01 <span aria-hidden="true">\u2193</span></a><span class="lesson-start-hint">Cover first, then cards 01\u201315 in order.</span></div></div><figure class="lesson-cover"><img src="${LL_BASE}flashcards/${LL_COVER.file}" width="${LL_COVER.w}" height="${LL_COVER.h}" alt="${LL_COVER.alt}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW LOOK &amp; LEARN WORKS</span><h2>Look at the picture, say the word, do the move.</h2><p class="lesson-copy">Every card is a sheet of four mini-cards, and every mini-card does the same three things: shows one big clear picture, names it in one word, and hands you a move \u2014 the little action pill in the middle. Look &amp; Point. Move &amp; Count. Smell &amp; Describe. You read the move, your child does it, and the word rides along on the action. Nothing here needs reading, printing or setting up; the whole method fits in the gap between lunch and shoes.</p><p class="lesson-copy">One card a sitting is plenty, and the order below is simply the order the cards were drawn. Each word on each card has its own short page \u2014 what the word names, where your child already meets it and one way to try it today \u2014 so you can land straight on the word your child just pointed at. Five of the forty-eight words (duck, banana, carrot, grapes and strawberry) already have their own flashcard pages in the school\u2019s library; their links lead there, because a word should live in one home, not two.</p></section>`;
 const cells=LL_CARDS.map(c=>{
  const first=c.panels[0].w,fw=llByWord[first];
  const words=c.panels.map(p=>{const x=llByWord[p.w];return `<a href="${x.url}">${esc(p.w)}</a>`;}).join(' \u00b7 ');
  return `<div class="ll-cell"><a class="lp-tile" href="${fw.url}"><img src="${LL_BASE}flashcards/${c.file}" width="800" height="1131" alt="${esc(c.alt)}" loading="lazy"><strong>Card ${String(c.n).padStart(2,'0')}</strong></a><p class="fc-hint ll-words">${words}</p></div>`;
 }).join('');
 const tiles=`<section class="wrap lesson-section" id="cards"><span class="eyebrow">THE FIFTEEN CARDS</span><h2>Cards 01\u201315, in order.</h2><p class="fc-hint">Every card opens the pages of its four words \u2014 tap the card or tap a word.</p><div class="lp-tiles">${cells}</div></section>`;
 const idx=LL_WORDS.map(x=>`<a href="${x.url}">${esc(x.w)}</a>`).join(' \u00b7 ');
 const index=`<section class="wrap lesson-section"><span class="eyebrow">ALL FORTY-EIGHT WORDS</span><h2>Pick a word, any word.</h2><p class="fc-hint">Every word in the deck, in card order, one short page each: ${idx}.</p></section>`;
 const fits=`<section class="wrap lesson-section"><span class="eyebrow">WHERE THIS CLASS FITS</span><h2>Three classes grow into these cards.</h2><p class="lesson-copy">Look &amp; Learn collects first words from three places on the Learning Path. The animal words (duck, bird, dog, cat, bee, owl) began in <a href="/toddler/2-years/animals-and-sounds/">Animals and Sounds for 2-Year-Olds \u2014 Class 11</a>. The fruit-and-vegetable words (banana, carrot, grapes, strawberry, pear, lemon, tomato, pumpkin) grew out of <a href="/preschool/3-years/fruits-and-vegetables/">Fruits &amp; Vegetables \u2014 Class 22</a>. And the sky-and-season words (moon, star, cloud, raindrop, sun, leaf, acorn) belong beside <a href="/preschool/4-years/science-nature-and-discovery/">Science, Nature &amp; Discovery \u2014 Class 31</a>. If your child is working through any of those classes, these cards are the pocket version \u2014 and if you are only here to look and say, that is the whole point.</p></section>`;
 return `${hero}${how}${tiles}${index}${fits}<p class="lesson-note"><strong>Ages are a guide, not a test.</strong> Two-year-olds point and name; four-year-olds describe and count. Both are doing it right.</p>`;
}

/* ---- One short page per word ------------------------------------------- */
export function llWordBody(w){
 const x=llByWord[w], c=CONTENT[w];
 const main=LL_CARDS[x.n-1];
 const sayLeadTxt=sayLead[(x.k-1)%sayLead.length];
 const sibs=main.panels.filter(p=>p.w!==w).map(p=>{const s=llByWord[p.w];return `<a href="${s.url}">${esc(p.w)}</a>`;}).join(' \u00b7 ');
 const other=x.cards.filter(n=>n!==x.n).map(n=>{
  const osibs=LL_CARDS[n-1].panels.map(p=>{const s=llByWord[p.w];return `<a href="${s.url}">${esc(p.w)}</a>`;}).join(' \u00b7 ');
  return `<p class="fc-hint ll-words">Also on card ${String(n).padStart(2,'0')}: ${osibs}</p>`;
 }).join('');
 const sibBlock=`<div class="fc2-do fc2-note"><h2>More Look &amp; Learn words</h2><p class="fc-hint ll-words">Also on card ${String(x.n).padStart(2,'0')}: ${sibs}</p>${other}</div>`;
 return `${crumbLL(x.w)}
 <div class="page-heading wrap"><span class="eyebrow">LOOK &amp; LEARN \u00b7 CARD ${String(x.n).padStart(2,'0')} OF 15 \u00b7 AGES 2\u20135</span><h1>${esc(titleOf(w))} Flashcard for Kids</h1><p>${c.intro}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main"><figure class="fc2-hero"><img src="${cardImg(x.n)}" width="800" height="1131" alt="${esc(cardAlt(x.n))}"><figcaption><strong>${esc(titleOf(w))}</strong><span>Card ${String(x.n).padStart(2,'0')} of 15 \u00b7 Look &amp; Learn</span></figcaption></figure>
  <section class="fc2-learn" aria-label="How to use this word">
   <div class="fc2-do"><h2>Say it together</h2><p class="fc2-say">&ldquo;${esc(x.l)}&rdquo;</p><p class="fc-hint">${sayLeadTxt} <strong>${esc(x.a)}</strong>.</p></div>
   <div class="fc2-do"><h2>Try it now</h2><p>${c.try}</p></div>
   ${sibBlock}
  </section></div>
  <aside class="fc2-rail" aria-label="Back to the class"><section class="fc2-block fc2-first-block"><span class="eyebrow">PART OF LOOK &amp; LEARN</span><h2>One game, fifteen cards.</h2><p class="fc-hint">Card ${String(x.n).padStart(2,'0')} of 15 \u00b7 word ${x.k} of 48.</p><a class="button" href="${LL_PATH}">Open Look &amp; Learn <span aria-hidden="true">\u2197</span></a><a class="button button-ghost" href="/flashcards/">All flashcards <span aria-hidden="true">\u2197</span></a></section>${fcCommunityMount('/flashcards/'+w+'/')}</aside>
 </div>`;
}
function crumbLL(w){return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/flashcards/">Flashcards</a><span aria-hidden="true">/</span><a href="${LL_PATH}">Look &amp; Learn</a><span aria-hidden="true">/</span><span aria-current="page">${esc(titleOf(w))}</span></nav>`;}

/* Helpers for scripts/build.mjs page() registrations. */
export const llWordTitle=w=>`${titleOf(w)} Flashcard for Kids \u2014 Look & Learn`;
export const llWordDesc=w=>{const m=CONTENT[w].intro.match(/^[^.]+\./);return (m?m[0]:CONTENT[w].intro).trim();};
export const llCardImg=n=>cardImg(n);
export const llCardAlt=n=>cardAlt(n);

/* ---- Cross-links appended to Classes 11, 22 and 31 (owner 2026-10-24) --- */
export const LL_CLASS_LINKS={
 '/toddler/2-years/animals-and-sounds/':`<section class="wrap lesson-section"><span class="eyebrow">MORE TO SPOT</span><h2>The animals keep going in Look &amp; Learn.</h2><p class="lesson-copy">The animal words from this class \u2014 duck, bird, dog, cat, bee, owl \u2014 all reappear in <a href="/look-and-learn/">Look &amp; Learn</a>, the school\u2019s fifteen-card look-and-say deck: four pictures on a card, one tiny move each, from \u201cwaddle like a duck\u201d to \u201cflap your arms and listen.\u201d Two-year-olds can play it before any longer class, and the duck card is a fine first stop after this one.</p></section>`,
 '/preschool/3-years/fruits-and-vegetables/':`<section class="wrap lesson-section"><span class="eyebrow">FROM THE FRUIT BOWL</span><h2>Four of this class\u2019s words play in Look &amp; Learn.</h2><p class="lesson-copy">Banana, carrot, grapes and strawberry all appear in <a href="/look-and-learn/">Look &amp; Learn</a>, the fifteen-card deck where every picture carries a move: peel the banana, pull the carrot from the ground, step in a puddle by the boot. A fruit word your child can name here often lands there first as a game \u2014 and the pear, lemon and tomato cards make a good second bowl.</p></section>`,
 '/preschool/4-years/science-nature-and-discovery/':`<section class="wrap lesson-section"><span class="eyebrow">LOOK UP, THEN LOOK &amp; LEARN</span><h2>The sky words come back down in Look &amp; Learn.</h2><p class="lesson-copy">Moon, star, cloud, raindrop, sun, leaf and acorn \u2014 the everyday science of this class \u2014 come back as pictures in <a href="/look-and-learn/">Look &amp; Learn</a>, fifteen cards with a look-and-say move on every one: point at the moon, stretch toward the sun, match something green to the leaf. It is the gentlest way to hand this class to a toddler sibling tonight.</p></section>`
};
