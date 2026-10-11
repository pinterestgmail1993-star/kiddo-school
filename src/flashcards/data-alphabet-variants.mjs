// Kiddo School — Alphabet flashcard VARIANTS, rebuilt on the owner's own
// uploads. Every letter a–z has six real files on R2 (school/alphabet/{l}/):
// uppercase, lowercase, pair (Aa), object (the flat-colour picture — this is
// the set that used to be faked with coded silhouettes), sound (letters plus
// the picture) and tracing (dotted letters with numbered stroke arrows).
// Each set is its own page and every card has its OWN page with its OWN
// identity. The old build reused the apple/ball/cat word list as the slug and
// label of every set, so the uppercase A page lived at /apple/ and was titled
// "(Apple)". Fixed at the root: each kind now has its own slug rule —
//   letter sets (uppercase, lowercase, pair, sounds, tracing) → /letter-a/
//   picture sets (objects) keep the word slug → /apple/
// and the label, heading, description and alt text always describe what the
// card really shows. Words like Apple appear ONLY where the card shows one.
import {alphabetCardContent} from './data-alphabet.mjs';
import {alphaVariantSrc} from './data-alphabet-r2.mjs';

const LETTERS='abcdefghijklmnopqrstuvwxyz'.split('');
// The real object for each letter — used ONLY by the sets whose cards really
// show that object (the main Alphabet A–Z set and the Alphabet Object Cards).
export const OBJECT_SLUGS=['apple','ball','cat','dog','elephant','fish','grapes','house','ice-cream','juice','kite','lion','moon','nest','orange','pig','queen','rainbow','sun','turtle','umbrella','van','whale','xylophone','yo-yo','zebra'];
const objectSlugFor=Object.fromEntries(LETTERS.map((l,i)=>[l,OBJECT_SLUGS[i]]));
const AGE='3–4 years';
const lcs=s=>s.toLowerCase();
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);

function cardWord(slug){
        const d=alphabetCardContent[slug];
        return d?d.word:slug.split('-').map(w=>cap(w)).join(' ');
}

// Per-kind identity + copy. cardSlug(letter) is the URL slug rule, label is
// the short name used in grids, breadcrumbs and prev/next, and every string
// describes what the card actually shows — words appear only on sets whose
// cards really show the object.
const KINDS={
 uppercase:{
  slug:'alphabet-uppercase',kind:'uppercase',name:'Uppercase Alphabet',
  seoTitle:'Uppercase Alphabet Flashcards A–Z: Free Big Letter Cards',
  h1:'Uppercase Alphabet Flashcards A–Z',
  metaDescription:'Free uppercase alphabet flashcards A–Z: 26 big letter cards in their own colours, each with its own page. Tap a card to open, download, print and share it.',
  lede:'Twenty-six big letters, one to a card — A to Z, each in its own bright colour, exactly as they look on our picture alphabet. One big shape per page, so nothing competes for attention.',
  hubBlurb:'Just the big letters A–Z, one per card.',
  downloadHint:'Open any card for its own page — the download, print and share buttons live there.',
  cardSlug:l=>`letter-${l}`,
  cardLabel:l=>`Letter ${l.toUpperCase()}`,
  cardSub:l=>'Big letter',
  cardH1:l=>`Uppercase Letter ${l.toUpperCase()} Flashcard`,
  cardIntro:l=>`The big letter ${l.toUpperCase()} on its own card — one bright capital shape on a clean page, so all your child’s eyes see is the letter itself.`,
  cardMeta:l=>`Free uppercase letter ${l.toUpperCase()} flashcard: the big letter ${l.toUpperCase()} on its own card, with download, print and share, and a two-minute way to use it. Part of the A–Z big letter set.`,
  cardSay:l=>`This is the big letter ${l.toUpperCase()}. Say its name — “${l.toUpperCase()}!”`,
  cardTry:l=>`After the card, hunt for the letter: “can you find a big ${l.toUpperCase()} on the cereal box?” Letters spotted on real things around the house stick better than any printable.`,
  alt:l=>`Uppercase letter card: the big letter ${l.toUpperCase()} in its own colour on a white card, from the Kiddo School alphabet`
 },
 lowercase:{
  slug:'alphabet-lowercase',kind:'lowercase',name:'Lowercase Alphabet',
  seoTitle:'Lowercase Alphabet Flashcards a–z: Free Little Letter Cards',
  h1:'Lowercase Alphabet Flashcards a–z',
  metaDescription:'Free lowercase alphabet flashcards a–z: 26 little letter cards, each with its own page. Tap a card to open, download, print and share it.',
  lede:'Twenty-six little letters, one to a card. These are the real lowercase cards a–z from our alphabet — the shapes your child will meet on almost every page of every book, now alone on their own cards.',
  hubBlurb:'Just the little letters a–z, one per card.',
  downloadHint:'Open any card for its own page — the download, print and share buttons live there.',
  cardSlug:l=>`letter-${l}`,
  cardLabel:l=>`Letter ${l}`,
  cardSub:l=>'Little letter',
  cardH1:l=>`Lowercase Letter ${l} Flashcard`,
  cardIntro:l=>`The little letter ${l} on its own card — the shape your child will meet on almost every page of every book, now all alone, nothing else to look at.`,
  cardMeta:l=>`Free lowercase letter ${l} flashcard: the little letter ${l} on its own card, with download, print and share, and a two-minute way to use it. Part of the a–z little letter set.`,
  cardSay:l=>`This is the little letter ${l}. Big ${l.toUpperCase()}, little ${l} — the same letter, smaller.`,
  cardTry:l=>`Little letters are everywhere — most words in a book are little letters. After the card, open any picture book and let your child be the one who spots a little ${l}.`,
  alt:l=>`Lowercase letter card: the little letter ${l} in its own colour on a white card, from the Kiddo School alphabet`
 },
 pair:{
  slug:'alphabet-letters',kind:'pair',name:'Big & Little Letters',
  seoTitle:'Alphabet Flashcards: Big & Little Letters Together (Aa–Zz)',
  h1:'Big & Little Letters Together',
  metaDescription:'Free alphabet flashcards showing uppercase and lowercase together: 26 Aa–Zz pair cards, each with its own page. Tap a card to open, download, print and share it.',
  lede:'Twenty-six cards showing each big letter and its little letter side by side — Aa to Zz — the classic first matching pair for preschool hands and eyes.',
  hubBlurb:'Big and little letters together on one card, Aa–Zz.',
  downloadHint:'Open any card for its own page — the download, print and share buttons live there.',
  cardSlug:l=>`letter-${l}`,
  cardLabel:l=>`Letter ${l.toUpperCase()}${l}`,
  cardSub:l=>'Big and little',
  cardH1:l=>`Letter ${l.toUpperCase()}${l} Flashcard — Big and Little ${l.toUpperCase()} Together`,
  cardIntro:l=>`Big ${l.toUpperCase()}, little ${l} — the two faces of the same letter, side by side on one card. Say the letter’s name, then spot the big one and the little one.`,
  cardMeta:l=>`Free ${l.toUpperCase()}${l} letter pair flashcard: big ${l.toUpperCase()} and little ${l} together on one card, with download, print and share, and a matching game to try. Part of the Aa–Zz set.`,
  cardSay:l=>`Big ${l.toUpperCase()}, little ${l}. Say the letter’s name together — “${l.toUpperCase()}!”`,
  cardTry:l=>`Say the letter’s name, then ask “which one is the little ${l}?” Matching big to little is a real pre-reading skill — and a quiet two-minute game.`,
  alt:l=>`Big and little letter card: ${l.toUpperCase()} and ${l} together on a white card, from the Kiddo School alphabet`
 },
 objects:{
  slug:'alphabet-objects',kind:'object',name:'Alphabet Object Cards',
  seoTitle:'Alphabet Object Cards A–Z: Free Picture Flashcards for Guessing Games',
  h1:'Alphabet Object Cards A–Z',
  metaDescription:'Free alphabet object cards A–Z: all 26 pictures — apple, dog, moon — as bold flat-colour cards for guessing games, each with its own page and download button.',
  lede:'Twenty-six objects, one to a card — the apple, the dog, the moon — as bold, flat-colour pictures with no letters beside them. Perfect for guessing games: hide the card, reveal it slowly, and let the guesses run before anyone names it.',
  hubBlurb:'All 26 alphabet pictures on their own cards — guess first, name after.',
  downloadHint:'Every card below has its own download button — the full-size object card, straight from this page.',
  // The cards here really ARE the objects, so the word slug is correct.
  cardSlug:l=>objectSlugFor[l],
  cardLabel:l=>cardWord(objectSlugFor[l]),
  cardSub:l=>`${l.toUpperCase()} is for ${lcs(cardWord(objectSlugFor[l]))}`,
  cardH1:l=>{const w=cardWord(objectSlugFor[l]);return `${w} Object Card — the Letter ${l.toUpperCase()} Picture (${l.toUpperCase()} is for ${w})`;},
  cardIntro:l=>{const w=lcs(cardWord(objectSlugFor[l]));return `Just the ${w} — no letters next to it. Cover the card, reveal it slowly and play “what could this be?” — then say the real word together.`;},
  cardMeta:l=>{const w=cardWord(objectSlugFor[l]);return `Free ${lcs(w)} picture flashcard: the ${lcs(w)} as a bold flat-colour object card for the letter ${l.toUpperCase()}, with a download button and a guessing game to try.`;},
  cardSay:l=>{const d=alphabetCardContent[objectSlugFor[l]];return d&&d.say?d.say:`${l.toUpperCase()} is for ${lcs(cardWord(objectSlugFor[l]))}.`;},
  cardTry:l=>`Guessing first, naming after. Whatever the guess is, take it — “a moon!” “a banana!” — then say the real word together and move on while it is still a game.`,
  alt:l=>`Object card for the letter ${l.toUpperCase()}: the ${lcs(cardWord(objectSlugFor[l]))} as a bold flat-colour picture on a white card, from the Kiddo School alphabet`
 },
 sounds:{
  slug:'alphabet-sounds',kind:'sound',name:'Letter Sound Cards',
  seoTitle:'Alphabet Letter Sound Cards A–Z: Free “A is for Apple” Cards',
  h1:'Alphabet Letter Sound Cards A–Z',
  metaDescription:'Free letter-sound flashcards A–Z: big letter, little letter and the picture together — Aa apple, Bb ball — each with its own page. Tap a card to open, download, print and share it.',
  lede:'Twenty-six cards that put the letter and its sound together: big A, little a and the apple. Say “aaa — apple” while your child points at the picture, and the picture does half the teaching.',
  hubBlurb:'Big letter, little letter and the sound picture together, Aa apple to Zz zebra.',
  downloadHint:'Open any card for its own page — the download, print and share buttons live there.',
  cardSlug:l=>`letter-${l}`,
  cardLabel:l=>`${l.toUpperCase()} is for ${cardWord(objectSlugFor[l])}`,
  cardSub:l=>`Letter ${l.toUpperCase()} sound`,
  cardH1:l=>`${l.toUpperCase()} is for ${cardWord(objectSlugFor[l])} — Letter ${l.toUpperCase()} Sound Card for Preschoolers`,
  cardIntro:l=>{const w=lcs(cardWord(objectSlugFor[l]));return `The letter and its sound on one card: big ${l.toUpperCase()}, little ${l}, and the ${w} that carries the sound. Say them together and let the picture do half the teaching.`;},
  cardMeta:l=>{const w=lcs(cardWord(objectSlugFor[l]));return `Free ${l.toUpperCase()} is for ${w} sound card: the letter ${l.toUpperCase()}${l} with its ${w} picture, with download, print and share, and a sound game to try.`;},
  cardSay:l=>{const d=alphabetCardContent[objectSlugFor[l]];return d&&d.say?d.say:`${l.toUpperCase()} is for ${lcs(cardWord(objectSlugFor[l]))}.`;},
  cardTry:l=>{const w=lcs(cardWord(objectSlugFor[l]));return `Say “${l.toUpperCase()} is for ${w}” slowly, then just the first sound. Stop while it is still a game — one card is a lovely little class.`;},
  alt:l=>`Letter sound card for ${l.toUpperCase()}: big ${l.toUpperCase()}, little ${l} and the ${lcs(cardWord(objectSlugFor[l]))} together on a white card, from the Kiddo School alphabet`
 },
 tracing:{
  slug:'alphabet-tracing',kind:'tracing',name:'Alphabet Tracing Cards',
  seoTitle:'Alphabet Tracing Cards A–Z: Free Dotted Letter Cards with Stroke Arrows',
  h1:'Alphabet Tracing Cards A–Z',
  metaDescription:'Free alphabet tracing cards A–Z: dotted big and little letters with numbered stroke arrows, each with its own page. Trace a finger first, then a crayon.',
  lede:'Twenty-six dotted tracing cards, one for every letter. Numbered arrows show the strokes: start at 1, follow the arrow, lift at the dot. Trace with a finger first — then a crayon, right on the card.',
  hubBlurb:'Dotted Aa–Zz with numbered stroke arrows — trace a finger first, then a crayon.',
  downloadHint:'Open any card for its own page — the download, print and share buttons live there.',
  cardSlug:l=>`letter-${l}`,
  cardLabel:l=>`Trace ${l.toUpperCase()} ${l}`,
  cardSub:l=>'Dotted letters',
  cardH1:l=>`Letter ${l.toUpperCase()} Tracing Card — Trace ${l.toUpperCase()} and ${l}`,
  cardIntro:l=>`${l.toUpperCase()} and ${l} in dotted lines, with numbered arrows showing every stroke: start at 1, follow the arrow, lift at the dot. Trace with a finger first — then a crayon. You can draw right on this card.`,
  cardMeta:l=>`Free letter ${l.toUpperCase()} tracing card: dotted ${l.toUpperCase()} and ${l} with numbered stroke arrows, with download, print and share, and a finger-tracing way in. Part of the A–Z tracing set.`,
  cardSay:l=>`Trace the letter ${l.toUpperCase()}: start at the dot, follow the arrow, lift at the end.`,
  cardTry:l=>`Finger first, crayon second: trace the dotted ${l.toUpperCase()} while you say the stroke out loud, then let your child try. The crayons under the picture draw right on the card — save the work when you are done.`,
  alt:l=>`Letter tracing card for ${l.toUpperCase()}: dotted ${l.toUpperCase()} and ${l} with numbered stroke arrows, from the Kiddo School alphabet`
 }
};

export const alphabetVariantSets=Object.values(KINDS).map(k=>({
 kind:k.kind,
 slug:k.slug,
 variant:true,
 group:'preschool',
 stageName:'Preschool · Age 3',
 stageHref:'/preschool/3-years/',
 name:k.name,
 seoTitle:k.seoTitle,
 h1:k.h1,
 metaDescription:k.metaDescription,
 lede:k.lede,
 hubBlurb:k.hubBlurb,
 ageLabel:AGE,
 noun:'Preschoolers',
 downloadHint:k.downloadHint,
 useIdeas:[
  ['Start small','Pick three cards and lay them face up. Three cards is a lovely little class — the whole alphabet can wait.'],
  ['Follow the arrows',k.kind==='tracing'
   ?'Start at the number 1 dot and follow the arrow to the end of the stroke, saying the movement out loud. Then hand the crayon over.'
   :k.kind==='object'
    ?'Reveal the card slowly and let the guesses fly. Wrong guesses are the fun part — the naming comes after.'
    :'Say the letter, say its sound, then say it again on the way to snack. All three in under ten seconds is exactly right.'],
  ['Tape one up','Put today’s card at eye level — the fridge, a door. Passing it again and again is quietly powerful practice.'],
  ['Match the sets','Lay a card from this set beside the same card from another letter set and let your child find the pair. The same letter keeps showing up, wearing different clothes.']
 ],
 relatedSets:['alphabet'],
 cards:LETTERS.map((letter,i)=>{
  const word=cardWord(objectSlugFor[letter]);
  const content=alphabetCardContent[objectSlugFor[letter]]||{};
  const img=alphaVariantSrc(letter,k.kind);
  const slug=k.cardSlug(letter);
  const c={slug,letter,word,
   label:k.cardLabel(letter),
   sub:k.cardSub(letter),
   img:img.src,w:img.w,h:img.h,
   alt:k.alt(letter),
   say:k.cardSay(letter),
   url:'/flashcards/'+k.slug+'/'+slug+'/',
   dl:`kiddo-alphabet-${k.kind}-${slug}.png`,
   objectSlug:objectSlugFor[letter],n:i+1};
  c.cardTitle=k.cardH1(letter);
  c.intro=k.cardIntro(letter);
  c.metaDescription=k.cardMeta(letter);
  c.tryLine=k.cardTry(letter);
  return c;
 }),
 url:'/flashcards/'+k.slug+'/',
 coverUrl:alphaVariantSrc('a',k.kind).src,
 cover:{file:'apple.png',w:alphaVariantSrc('a',k.kind).w,h:alphaVariantSrc('a',k.kind).h,alt:k.hubBlurb},
 mainSetUrl:'/flashcards/alphabet/',
 mainSetName:'Alphabet A–Z'
}));

export const alphabetVariantBySlug=Object.fromEntries(alphabetVariantSets.map(s=>[s.slug,s]));

// Rows for the main Alphabet set page and the hub: the six letter sets with
// their one-line pitches. Single source of truth.
export const LETTER_SET_REFS=[
 ['/flashcards/alphabet-uppercase/','Uppercase cards','just the big letters'],
 ['/flashcards/alphabet-lowercase/','Lowercase cards','just the little letters'],
 ['/flashcards/alphabet-letters/','Big & little together','Aa–Zz on one card'],
 ['/flashcards/alphabet-objects/','Object cards','the picture on its own'],
 ['/flashcards/alphabet-sounds/','Letter sounds','letters plus the picture'],
 ['/flashcards/alphabet-tracing/','Tracing cards','dotted letters to trace']
];

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
import {fcCommunityMount} from './community.mjs';

// The set page: a wall of 26 cards, every card one big tap target that opens
// its own page. Deliberately simple — the download, print and share buttons
// live on each card's own page, not in the grid.
export function fcVariantSetPageBody(s,shareUrl){
        const enc=encodeURIComponent;
        const shareTitle=s.seoTitle+' — Kiddo School';
        const cards=s.cards.map(c=>`<a class="fcv-card" href="${esc(c.url)}" aria-label="Open the ${esc(c.label)} card page"><span class="fcv-img"><img src="${esc(c.img)}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"></span><span class="fcv-cap"><strong>${esc(c.label)}</strong><span class="fcv-sub">${esc(c.sub)}</span></span></a>`).join('');
        const ideas=s.useIdeas.map(([t,d],i)=>`<li><span class="fc-stepnum">${String(i+1).padStart(2,'0')}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
        return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/flashcards/">Flashcards</a><span aria-hidden="true">/</span><span aria-current="page">${esc(s.name)}</span></nav>
<div class="page-heading wrap"><span class="eyebrow">FLASHCARD SET · AGES ${esc(AGE.toUpperCase())}</span><h1>${esc(s.h1)}</h1><p>${esc(s.lede)}</p></div>
<section class="wrap fc-section"><span class="eyebrow">THE CARDS</span><h2>All twenty-six.</h2><p class="fc-hint">Tap any card to open its own page — the full-size card, the words to say together, and the download, print and share buttons.</p><div class="fcv-grid">${cards}</div></section>
<section class="wrap fc-section"><span class="eyebrow">HOW TO USE THESE CARDS</span><h2>Little ways that work.</h2><ol class="fc-steps">${ideas}</ol></section>
<section class="wrap fc-section"><span class="eyebrow">MORE ALPHABET SETS</span><h2>Pick your letters.</h2><div class="fc2-relrow">${alphabetVariantSets.filter(v=>v.slug!==s.slug).map(v=>`<a class="fc2-relcard" href="${v.url}"><strong>${esc(v.name)}</strong><span>26 cards</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a>`).join('')}<a class="fc2-relcard" href="${s.mainSetUrl}"><strong>${esc(s.mainSetName)}</strong><span>picture cards</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a></div></section>
<section class="wrap fc-section"><div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS SET</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(shareUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this set on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}" target="_blank" rel="noopener" aria-label="Share this set on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+shareUrl)}" target="_blank" rel="noopener" aria-label="Share this set on WhatsApp">WhatsApp</a><a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(shareUrl)}&media=${enc(s.coverUrl)}&description=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Save this set on Pinterest">Pinterest</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page&rsquo;s address — nothing is tracked.</p></div></section>
${fcCommunityMount(s.url)}`;
}

// The individual variant card page: the card, its download / print / share,
// the words to say, prev/next through the set, and the same card in the other
// five sets. Every string matches what this card really shows.
export function fcVariantCardPageBody(set,card,ctx){
        const {prev,next}=ctx;
        const site=String(ctx.site||'').replace(/\/$/,'');
        const enc=encodeURIComponent;
        const pageUrl=site+card.url;
        const shareTitle=`${card.cardTitle} · Kiddo School`;
        const isObjectSet=set.kind==='object';
        // Flashcards are paper: the card image is shown plain — no drawing
        // canvas, no toolbar. Drawing lives on the Learning Path activities.
        const figure=`<figure class="fc2-hero"><img src="${esc(card.img)}" width="${card.w}" height="${card.h}" alt="${esc(card.alt)}"><figcaption><strong>${esc(card.label)}</strong><span>Card ${card.n} of ${set.cards.length} · ${esc(set.name)}</span></figcaption></figure>`;
        const pn=`<nav class="fc2-pn" aria-label="Previous and next card"><a class="fc2-pn-btn" href="${esc(prev.url)}" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.label)}</strong><span>Previous card</span></a><a class="fc2-pn-btn fc2-pn-next" href="${esc(next.url)}" rel="next"><strong>${esc(next.label)}</strong> <span aria-hidden="true">→</span><span>Next card</span></a></nav>`;
        const say=`<div class="fc2-do"><h2>Say it together</h2><p class="fc2-say">&ldquo;${esc(card.say)}&rdquo;</p><p class="fc-hint">Say it naturally, then wait. Whatever comes back — the letter, the word, a point, a giggle — is the right answer.</p></div>`;
        const tryThis=`<div class="fc2-do"><h2>Try this</h2><p>${esc(card.tryLine)}</p></div>`;
        const actions=`<div class="fc2-actions"><a class="button" href="${esc(card.img)}" download="${esc(card.dl)}" data-fc-dl>Download card <span aria-hidden="true">↓</span></a><button type="button" class="button" data-tc-print-view>Print this card</button><a class="button" href="${esc(set.url)}">View full set</a>${isObjectSet?`<a class="button" href="/flashcards/alphabet-sounds/letter-${card.letter}/">Open the sound card</a>`:`<a class="button" href="/flashcards/alphabet/${esc(card.objectSlug)}/">Open the picture card</a>`}</div>`;
        const share=`<div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS CARD</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this card on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this card on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this card on WhatsApp">WhatsApp</a><a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(pageUrl)}&media=${enc(card.img)}&description=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Save this card on Pinterest">Pinterest</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page&rsquo;s address — nothing is tracked.</p></div>`;
        const otherWays=alphabetVariantSets.filter(v=>v.slug!==set.slug).map(v=>{
                const twin=v.cards.find(c=>c.letter===card.letter);
                return `<a class="fc2-relcard" href="${twin.url}"><strong>${esc(v.name)}</strong><span>${esc(twin.label)}</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a>`;
        }).join('')+`<a class="fc2-relcard" href="/flashcards/alphabet/${esc(card.objectSlug)}/"><strong>Alphabet A–Z</strong><span>the picture card</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a>`;
        const twinWord=isObjectSet?card.word:`Letter ${card.letter.toUpperCase()}`;
        return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/flashcards/">Flashcards</a><span aria-hidden="true">/</span><a href="${esc(set.url)}">${esc(set.name)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(card.label)}</span></nav>
<div class="page-heading wrap"><span class="eyebrow">FLASHCARD · ${esc(set.name.toUpperCase())} · AGES ${esc(AGE.toUpperCase())}</span><h1>${esc(card.cardTitle)}</h1><p>${esc(card.intro)}</p></div>
<div class="fc2-dual wrap">
 <div class="fc2-main">${figure}${pn}<section class="fc2-learn" aria-label="How to use this card">${say}${tryThis}</section></div>
 <aside class="fc2-rail" aria-label="Download, share and family feedback"><section class="fc2-block fc2-first-block"><span class="eyebrow">TAKE IT WITH YOU</span><h2>Download, print, keep going.</h2>${actions}<p class="fc-hint">The download saves the full-size card straight from our library — free, no sign-up.</p></section>${share}${fcCommunityMount(card.url)}</aside>
</div>
<section class="wrap fc-section"><span class="eyebrow">THE SAME CARD, OTHER WAYS</span><h2>${esc(twinWord)} in every set.</h2><p class="fc-hint">${esc(twinWord)} appears in five more letter sets — same card family, different job.</p><div class="fc2-relrow">${otherWays}</div></section>`;
}
