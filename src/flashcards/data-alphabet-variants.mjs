// Kiddo School — Alphabet flashcard VARIANTS, rebuilt on the owner's own
// uploads. Every letter a–z has six real files on R2 (school/alphabet/{l}/):
// uppercase, lowercase, pair (Aa), object (the flat-colour picture — this is
// the set that used to be faked with coded silhouettes), sound (letters plus
// the picture) and tracing (dotted letters with numbered stroke arrows).
// Each set is its own page and every card has its OWN page — opening the
// lowercase a no longer lands on the same apple page as the uppercase a.
import {alphabetCardContent} from './data-alphabet.mjs';
import {alphaVariantSrc} from './data-alphabet-r2.mjs';

const LETTERS='abcdefghijklmnopqrstuvwxyz'.split('');
export const VARIANT_SLUGS=['apple','ball','cat','dog','elephant','fish','grapes','house','ice-cream','juice','kite','lion','moon','nest','orange','pig','queen','rainbow','sun','turtle','umbrella','van','whale','xylophone','yo-yo','zebra'];
const AGE='3–4 years';

function cardWord(slug){
        const d=alphabetCardContent[slug];
        return d?d.word:slug.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
}
const lcs=s=>s.toLowerCase();

// Per-kind copy. Honest about what each card shows: nothing invented.
const KINDS={
 uppercase:{
  slug:'alphabet-uppercase',kind:'uppercase',name:'Uppercase Alphabet',
  seoTitle:'Uppercase Alphabet Flashcards A–Z: Free Big Letter Cards',
  h1:'Uppercase Alphabet Flashcards A–Z',
  metaDescription:'Free uppercase alphabet flashcards A–Z: 26 big letter cards in their own colours, each with its own page and download button. Print them for the kitchen table.',
  lede:'Twenty-six big letters, one to a card — A to Z, each in its own bright colour, exactly as they look on our picture alphabet. One big shape per page, so nothing competes for attention.',
  hubBlurb:'Just the big letters A–Z, one per card, each with a download button.',
  downloadHint:'Every card below has its own download button — the full-size big-letter card, straight from this page.',
  cardH1:c=>`Letter ${c.letter.toUpperCase()} Flashcard — the Big Letter ${c.letter.toUpperCase()} (${c.word})`,
  cardIntro:c=>`${c.word} starts with the big letter ${c.letter.toUpperCase()}. This card is just that big letter — one bright shape on a clean page, so all your child’s eyes see is the letter itself.`,
  cardMeta:c=>`Free uppercase ${c.letter.toUpperCase()} flashcard: the big letter ${c.letter.toUpperCase()} on its own card, with a download button and a two-minute way to use it. Part of the A–Z big letter set.`,
  cardTry:c=>`After the card, hunt for the letter: “can you find a big ${c.letter.toUpperCase()} on the cereal box?” Letters spotted on real things around the house stick better than any printable.`,
  alt:c=>`Uppercase letter card: the big letter ${c.letter.toUpperCase()} in its own colour on a white card, from the Kiddo School alphabet`
 },
 lowercase:{
  slug:'alphabet-lowercase',kind:'lowercase',name:'Lowercase Alphabet',
  seoTitle:'Lowercase Alphabet Flashcards a–z: Free Little Letter Cards',
  h1:'Lowercase Alphabet Flashcards a–z',
  metaDescription:'Free lowercase alphabet flashcards a–z: 26 little letter cards, each with its own page and download button. No sign-up, just print and play.',
  lede:'Twenty-six little letters, one to a card. These are the real lowercase cards a–z from our alphabet — the shapes your child will meet on almost every page of every book, now alone on their own cards.',
  hubBlurb:'Just the little letters a–z, one per card, each with a download button.',
  downloadHint:'Every card below has its own download button — the full-size little-letter card, straight from this page.',
  cardH1:c=>`Letter ${c.letter} Flashcard — the Little Letter ${c.letter} (${c.word})`,
  cardIntro:c=>`${c.word} begins with the big letter ${c.letter.toUpperCase()} — and this is its little letter ${c.letter}, the shape your child will see most in books. One little letter, all alone, nothing else to look at.`,
  cardMeta:c=>`Free lowercase ${c.letter} flashcard: the little letter ${c.letter} on its own card, with a download button and a two-minute way to use it. Part of the A–Z little letter set.`,
  cardTry:c=>`Little letters are everywhere — most words in a book are little letters. After the card, open any picture book and let your child be the one who spots a little ${c.letter}.`,
  alt:c=>`Lowercase letter card: the little letter ${c.letter} in its own colour on a white card, from the Kiddo School alphabet`
 },
 pair:{
  slug:'alphabet-letters',kind:'pair',name:'Big & Little Letters',
  seoTitle:'Alphabet Flashcards: Big & Little Letters Together (Aa–Zz)',
  h1:'Big & Little Letters Together',
  metaDescription:'Free alphabet flashcards showing uppercase and lowercase together: 26 Aa–Zz pair cards, each with its own page and download button.',
  lede:'Twenty-six cards showing each big letter and its little letter side by side — Aa to Zz — the classic first matching pair for preschool hands and eyes.',
  hubBlurb:'Big and little letters together on one card, Aa–Zz.',
  downloadHint:'Every card below has its own download button — the full-size pair card, straight from this page.',
  cardH1:c=>`${c.letter.toUpperCase()}${c.letter} Flashcard — Big and Little ${c.letter.toUpperCase()}${c.letter} Together (${c.word})`,
  cardIntro:c=>`Big ${c.letter.toUpperCase()}, little ${c.letter} — the two faces of the same letter, side by side on one card. Say the letter’s name, then find the ${lcs(c.word)} that starts with it.`,
  cardMeta:c=>`Free ${c.letter.toUpperCase()}${c.letter} flashcard: the big and little letter pair on one card, with a download button and a matching game to try. Part of the Aa–Zz set.`,
  cardTry:c=>`Say the letter’s name, then ask “which one is the little ${c.letter}?” Matching big to little is a real pre-reading skill — and a quiet two-minute game.`,
  alt:c=>`Big and little letter card: ${c.letter.toUpperCase()} and ${c.letter} together on a white card, from the Kiddo School alphabet`
 },
 objects:{
  slug:'alphabet-objects',kind:'object',name:'Alphabet Object Cards',
  seoTitle:'Alphabet Object Cards A–Z: Free Picture Flashcards for Guessing Games',
  h1:'Alphabet Object Cards A–Z',
  metaDescription:'Free alphabet object cards A–Z: all 26 pictures — apple, dog, moon — as bold flat-colour cards for guessing games, each with its own page and download button.',
  lede:'Twenty-six objects, one to a card — the apple, the dog, the moon — as bold, flat-colour pictures with no letters beside them. Perfect for guessing games: hide the card, reveal it slowly, and let the guesses run before anyone names it.',
  hubBlurb:'All 26 alphabet pictures on their own cards — guess first, name after.',
  downloadHint:'Every card below has its own download button — the full-size object card, straight from this page.',
  cardH1:c=>`${c.word} Object Card — the Letter ${c.letter.toUpperCase()} Picture (${c.letter.toUpperCase()} is for ${c.word})`,
  cardIntro:c=>`Just the ${lcs(c.word)} — no letters next to it. Cover the card, reveal it slowly and play “what could this be?” — then say the real word together.`,
  cardMeta:c=>`Free ${lcs(c.word)} picture flashcard: the ${lcs(c.word)} as a bold flat-colour object card for the letter ${c.letter.toUpperCase()}, with a download button and a guessing game to try.`,
  cardTry:c=>`Guessing first, naming after. Whatever the guess is, take it — “a moon!” “a banana!” — then say the real word together and move on while it is still a game.`,
  alt:c=>`Object card for the letter ${c.letter.toUpperCase()}: the ${lcs(c.word)} as a bold flat-colour picture on a white card, from the Kiddo School alphabet`
 },
 sounds:{
  slug:'alphabet-sounds',kind:'sound',name:'Letter Sound Cards',
  seoTitle:'Alphabet Letter Sound Cards A–Z: Free “A is for Apple” Cards',
  h1:'Alphabet Letter Sound Cards A–Z',
  metaDescription:'Free letter-sound flashcards A–Z: big letter, little letter and the picture together — Aa apple, Bb ball — each with its own page and download button.',
  lede:'Twenty-six cards that put the letter and its sound together: big A, little a and the apple. Say “aaa — apple” while your child points at the picture, and the picture does half the teaching.',
  hubBlurb:'Big letter, little letter and the sound picture together, Aa apple to Zz zebra.',
  downloadHint:'Every card below has its own download button — the full-size sound card, straight from this page.',
  cardH1:c=>`${c.letter.toUpperCase()} is for ${c.word} — Letter ${c.letter.toUpperCase()} Sound Card for Preschoolers`,
  cardIntro:c=>`The letter and its ${lcs(c.word)} on one card: big ${c.letter.toUpperCase()}, little ${c.letter}, and the picture that carries the sound. Say them together and let the picture do half the teaching.`,
  cardMeta:c=>`Free ${c.letter.toUpperCase()} is for ${lcs(c.word)} sound card: the letter ${c.letter.toUpperCase()}${c.letter} with its ${lcs(c.word)} picture, with a download button and a sound game to try.`,
  cardTry:c=>`Say “${c.letter.toUpperCase()} is for ${lcs(c.word)}” slowly, then just the first sound. Stop while it is still a game — one card is a lovely little class.`,
  alt:c=>`Letter sound card for ${c.letter.toUpperCase()}: big ${c.letter.toUpperCase()}, little ${c.letter} and the ${lcs(c.word)} together on a white card, from the Kiddo School alphabet`
 },
 tracing:{
  slug:'alphabet-tracing',kind:'tracing',name:'Alphabet Tracing Cards',
  seoTitle:'Alphabet Tracing Cards A–Z: Free Dotted Letter Cards with Stroke Arrows',
  h1:'Alphabet Tracing Cards A–Z',
  metaDescription:'Free alphabet tracing cards A–Z: dotted big and little letters with numbered stroke arrows, each with its own page and download button. Trace a finger first, then a crayon.',
  lede:'Twenty-six dotted tracing cards, one for every letter. Numbered arrows show the strokes: start at 1, follow the arrow, lift at the dot. Trace with a finger first — then a crayon, right on the card.',
  hubBlurb:'Dotted Aa–Zz with numbered stroke arrows — trace a finger first, then a crayon.',
  downloadHint:'Every card below has its own download button — the full-size tracing card, straight from this page.',
  cardH1:c=>`Letter ${c.letter.toUpperCase()} Tracing Card — Trace ${c.letter.toUpperCase()} and ${c.letter} (${c.word})`,
  cardIntro:c=>`${c.letter.toUpperCase()} and ${c.letter} in dotted lines, with numbered arrows showing every stroke: start at 1, follow the arrow, lift at the dot. Trace with a finger first — then a crayon. You can draw right on this card.`,
  cardMeta:c=>`Free letter ${c.letter.toUpperCase()} tracing card: dotted ${c.letter.toUpperCase()} and ${c.letter} with numbered stroke arrows, with a download button and a finger-tracing way in.`,
  cardTry:c=>`Finger first, crayon second: trace the dotted ${c.letter.toUpperCase()} while you say the stroke out loud, then let your child try. The crayons under the picture draw right on the card — save the work when you are done.`,
  alt:c=>`Letter tracing card for ${c.letter.toUpperCase()}: dotted ${c.letter.toUpperCase()} and ${c.letter} with numbered stroke arrows, from the Kiddo School alphabet`
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
    :'Say the letter, say its sound, then say the word together. All three in under ten seconds is exactly right.'],
  ['Tape one up','Put today’s card at eye level — the fridge, a door. Passing it again and again is quietly powerful practice.'],
  ['Match the sets','Lay a card from this set beside the same card from another letter set and let your child find the pair. The same apple keeps showing up, wearing different clothes.']
 ],
 relatedSets:['alphabet'],
 cards:VARIANT_SLUGS.map((slug,i)=>{
  const letter=LETTERS[i];
  const word=cardWord(slug);
  const content=alphabetCardContent[slug]||{};
  const img=alphaVariantSrc(letter,k.kind);
  const c={slug,n:i+1,letter,word,
   img:img.src,w:img.w,h:img.h,
   alt:k.alt({letter,word}),
   say:content.say||`${letter.toUpperCase()} is for ${lcs(word)}.`,
   url:'/flashcards/'+k.slug+'/'+slug+'/',
   dl:'kiddo-alphabet-'+k.kind+'-'+letter+'-'+slug+'.png'};
  c.cardTitle=k.cardH1(c);
  c.intro=k.cardIntro(c);
  c.metaDescription=k.cardMeta(c);
  c.tryLine=k.cardTry(c);
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

// The set page: a wall of 26 cards, every card carrying its own download
// button and linking to its own page. Deliberately simple — flashcards are
// about the cards and the downloads.
export function fcVariantSetPageBody(s,shareUrl){
        const enc=encodeURIComponent;
        const shareTitle=s.seoTitle+' — Kiddo School';
        const cards=s.cards.map(c=>`<figure class="fcv-card"><a class="fcv-img" href="${esc(c.url)}" aria-label="Open the ${esc(c.word)} card page"><img src="${esc(c.img)}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"></a><figcaption><strong>${esc(c.word)}</strong><span class="fcv-letter">${esc(c.letter.toUpperCase())}</span></figcaption><div class="fcv-actions"><a class="button" href="${esc(c.img)}" download="${esc(c.dl)}" data-fc-dl>Download <span aria-hidden="true">↓</span></a><a class="fcv-link" href="${esc(c.url)}">Card page <span aria-hidden="true">↗</span></a></div></figure>`).join('');
        const ideas=s.useIdeas.map(([t,d],i)=>`<li><span class="fc-stepnum">${String(i+1).padStart(2,'0')}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
        return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/flashcards/">Flashcards</a><span aria-hidden="true">/</span><span aria-current="page">${esc(s.name)}</span></nav>
<div class="page-heading wrap"><span class="eyebrow">FLASHCARD SET · AGES ${esc(AGE.toUpperCase())}</span><h1>${esc(s.h1)}</h1><p>${esc(s.lede)}</p></div>
<section class="wrap fc-section"><span class="eyebrow">THE CARDS</span><h2>All twenty-six, ready to download.</h2><p class="fc-hint">Tap any card to open its own page with the words to say together — or tap Download to keep the card itself. ${esc(s.downloadHint)}</p><div class="fcv-grid">${cards}</div></section>
<section class="wrap fc-section"><span class="eyebrow">HOW TO USE THESE CARDS</span><h2>Little ways that work.</h2><ol class="fc-steps">${ideas}</ol></section>
<section class="wrap fc-section"><span class="eyebrow">MORE ALPHABET SETS</span><h2>Pick your letters.</h2><div class="fc2-relrow">${alphabetVariantSets.filter(v=>v.slug!==s.slug).map(v=>`<a class="fc2-relcard" href="${v.url}"><strong>${esc(v.name)}</strong><span>26 cards</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a>`).join('')}<a class="fc2-relcard" href="${s.mainSetUrl}"><strong>${esc(s.mainSetName)}</strong><span>picture cards</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a></div></section>
<section class="wrap fc-section"><div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS SET</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(shareUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this set on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}" target="_blank" rel="noopener" aria-label="Share this set on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+shareUrl)}" target="_blank" rel="noopener" aria-label="Share this set on WhatsApp">WhatsApp</a><a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(shareUrl)}&media=${enc(s.coverUrl)}&description=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Save this set on Pinterest">Pinterest</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page&rsquo;s address — nothing is tracked.</p></div></section>`;
}

// The individual variant card page: the card, its download, the words to say,
// prev/next through the set, sharing and the same word in the other five sets.
export function fcVariantCardPageBody(set,card,ctx){
        const {prev,next}=ctx;
        const site=String(ctx.site||'').replace(/\/$/,'');
        const enc=encodeURIComponent;
        const pageUrl=site+card.url;
        const shareTitle=`${card.cardTitle} · Kiddo School`;
        const figure=`<div class="wc-mount" data-wc data-wc-src="${esc(card.img)}" data-wc-name="${esc(card.word+' — '+set.name)}" data-wc-w="${card.w}" data-wc-h="${card.h}"><figure class="fc2-hero"><img src="${esc(card.img)}" width="${card.w}" height="${card.h}" alt="${esc(card.alt)}" crossorigin="anonymous"><figcaption><strong>${esc(card.word)}</strong><span>Card ${card.n} of ${set.cards.length} · ${esc(set.name)}</span></figcaption></figure></div>`;
        const pn=`<nav class="fc2-pn" aria-label="Previous and next card"><a class="fc2-pn-btn" href="${esc(prev.url)}" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.word)}</strong><span>Previous card</span></a><a class="fc2-pn-btn fc2-pn-next" href="${esc(next.url)}" rel="next"><strong>${esc(next.word)}</strong> <span aria-hidden="true">→</span><span>Next card</span></a></nav>`;
        const drawHint=`<p class="fc2-drawhint"><strong>Draw on this card:</strong> pick a crayon under the picture, write or color right on the card with a finger, a stylus or the mouse, then tap “Save my work” to keep a copy. Nothing is uploaded anywhere — the drawing stays on your device.</p>`;
        const say=`<div class="fc2-do"><h2>Say it together</h2><p class="fc2-say">&ldquo;${esc(card.say)}&rdquo;</p><p class="fc-hint">Say it naturally, then wait. Whatever comes back — the letter, the word, a point, a giggle — is the right answer.</p></div>`;
        const tryThis=`<div class="fc2-do"><h2>Try this</h2><p>${esc(card.tryLine)}</p></div>`;
        const actions=`<div class="fc2-actions"><a class="button" href="${esc(card.img)}" download="${esc(card.dl)}" data-fc-dl>Download card <span aria-hidden="true">↓</span></a><a class="button" href="${esc(set.url)}">View full set</a><a class="button" href="/flashcards/alphabet/${card.slug}/">Open the picture card</a></div>`;
        const share=`<div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS CARD</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this card on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this card on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this card on WhatsApp">WhatsApp</a><a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(pageUrl)}&media=${enc(card.img)}&description=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Save this card on Pinterest">Pinterest</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page&rsquo;s address — nothing is tracked.</p></div>`;
        const otherWays=alphabetVariantSets.filter(v=>v.slug!==set.slug).map(v=>{
                const twin=v.cards.find(c=>c.slug===card.slug);
                return `<a class="fc2-relcard" href="${twin.url}"><strong>${esc(v.name)}</strong><span>${esc(card.word)}</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a>`;
        }).join('')+`<a class="fc2-relcard" href="/flashcards/alphabet/${card.slug}/"><strong>Alphabet A–Z</strong><span>the picture card</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a>`;
        return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/flashcards/">Flashcards</a><span aria-hidden="true">/</span><a href="${esc(set.url)}">${esc(set.name)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(card.word)}</span></nav>
<div class="page-heading wrap"><span class="eyebrow">FLASHCARD · ${esc(set.name.toUpperCase())} · AGES ${esc(AGE.toUpperCase())}</span><h1>${esc(card.cardTitle)}</h1><p>${esc(card.intro)}</p></div>
<div class="fc2-dual wrap">
 <div class="fc2-main">${figure}${drawHint}${pn}<section class="fc2-learn" aria-label="How to use this card">${say}${tryThis}</section></div>
 <aside class="fc2-rail" aria-label="Download and share"><section class="fc2-block fc2-first-block"><span class="eyebrow">TAKE IT WITH YOU</span><h2>Download, print, keep going.</h2>${actions}<p class="fc-hint">The download saves the full-size card straight from our library — free, no sign-up.</p></section>${share}</aside>
</div>
<section class="wrap fc-section"><span class="eyebrow">THE SAME LETTER, OTHER WAYS</span><h2>${esc(card.word)} in every set.</h2><p class="fc-hint">The same ${lcs(card.word)} card exists in five more letter sets — same picture family, different job.</p><div class="fc2-relrow">${otherWays}</div></section>`;
}
