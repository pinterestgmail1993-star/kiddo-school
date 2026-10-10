// Kiddo School — Alphabet flashcard VARIANTS: uppercase, lowercase, the pair
// and silhouette cards. Every variant image is CUT from the owner's own 26
// alphabet cards (same frame colour per letter, nothing re-drawn): the big
// letter, the little letter, the two together, and a solid deep-purple
// silhouette of the card's object. These are SET-level pages — each card
// carries its own download button on the set page and links to the main
// alphabet card page for the teaching words. The owner asked for these as
// individual pages with clean, different URLs.
import {alphabetCardContent, alphabetMeta} from './data-alphabet.mjs';

const A = '/assets/fc-variants/';
const LETTERS = 'abcdefghijklmnopqrstuvwxyz';
export const VARIANT_SLUGS = ['apple','ball','cat','dog','elephant','fish','grapes','house','ice-cream','juice','kite','lion','moon','nest','orange','pig','queen','rainbow','sun','turtle','umbrella','van','whale','xylophone','yo-yo','zebra'];

const KINDS = {
  uppercase: {
    slug: 'alphabet-uppercase',
    name: 'Uppercase Alphabet',
    short: 'big letters',
    folder: 'upper',
    seoTitle: 'Uppercase Alphabet Flashcards A–Z: Free Big Letter Cards',
    h1: 'Uppercase Alphabet Flashcards A–Z',
    metaDescription: 'Free uppercase alphabet flashcards A–Z: 26 big letter cards cut from our picture alphabet, each with its own download button. Print them for the kitchen table.',
    lede: 'Twenty-six big letters, one to a card. Each one is cut from our picture alphabet — same colours, same letters your preschooler already knows — now alone on its own card, ready to download.',
    hubBlurb: 'Just the big letters A–Z, one per card, each with a download button.',
    downloadHint: 'Every card below has its own download button — the full-size letter card, straight from this page.'
  },
  lowercase: {
    slug: 'alphabet-lowercase',
    name: 'Lowercase Alphabet',
    short: 'little letters',
    folder: 'lower',
    seoTitle: 'Lowercase Alphabet Flashcards a–z: Free Little Letter Cards',
    h1: 'Lowercase Alphabet Flashcards a–z',
    metaDescription: 'Free lowercase alphabet flashcards a–z: 26 little letter cards cut from our picture alphabet, each with its own download button. No sign-up, just print and play.',
    lede: 'Twenty-six little letters, one to a card. The same friendly letters from the picture alphabet, on their own — for children who are ready to meet the smaller half of the alphabet.',
    hubBlurb: 'Just the little letters a–z, one per card, each with a download button.',
    downloadHint: 'Every card below has its own download button — the full-size letter card, straight from this page.'
  },
  pair: {
    slug: 'alphabet-letters',
    name: 'Big & Little Letters',
    short: 'big and little letters together',
    folder: 'pair',
    seoTitle: 'Alphabet Flashcards: Big & Little Letters Together (Aa–Zz)',
    h1: 'Big & Little Letters Together',
    metaDescription: 'Free alphabet flashcards showing uppercase and lowercase together: 26 Aa–Zz pair cards cut from our picture alphabet, each with its own download button.',
    lede: 'Twenty-six cards showing each big letter and its little letter side by side — Aa to Zz — the classic first matching pair for preschool hands and eyes.',
    hubBlurb: 'Big and little letters together on one card, Aa–Zz.',
    downloadHint: 'Every card below has its own download button — the full-size pair card, straight from this page.'
  },
  silhouette: {
    slug: 'alphabet-silhouette',
    name: 'Silhouette Cards',
    short: 'shadow shapes',
    folder: 'silh',
    seoTitle: 'Alphabet Silhouette Flashcards: 26 Shadow Shape Cards A–Z',
    h1: 'Alphabet Silhouette Cards',
    metaDescription: 'Free silhouette flashcards for preschoolers: 26 shadow-shape cards of the alphabet objects — apple, ball, cat — a guessing game of shapes, each with a download button.',
    lede: 'Twenty-six shadow shapes, one for every object in our picture alphabet. Show a silhouette, let your child guess what it is, then check the matching picture card together.',
    hubBlurb: 'Shadow shapes of all 26 alphabet objects — guess first, check after.',
    downloadHint: 'Every card below has its own download button — the full-size silhouette card, straight from this page.'
  }
};

function cardWord(slug) {
  const d = alphabetCardContent[slug];
  return d ? d.word : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export const alphabetVariantSets = Object.entries(KINDS).map(([kind, k]) => ({
  kind,
  slug: k.slug,
  variant: true,
  group: 'preschool',
  stageName: 'Preschool · Age 3',
  stageHref: '/preschool/3-years/',
  name: k.name,
  seoTitle: k.seoTitle,
  h1: k.h1,
  metaDescription: k.metaDescription,
  lede: k.lede,
  hubBlurb: k.hubBlurb,
  ageLabel: '3–4 years',
  noun: 'Preschoolers',
  downloadHint: k.downloadHint,
  useIdeas: [
    ['Guessing first', kind === 'silhouette'
      ? 'Show a shadow and ask “what could this be?” — wrong guesses are the fun part. Check the answer on the picture card together.'
      : 'Pick three cards, lay them face up and say each letter sound together. Three cards is a lovely little class.'],
    ['Keep it short', 'A few cards a day beats the whole alphabet in one go. Stop while your preschooler is still having fun.'],
    ['Tape one up', 'Put today’s card at eye level — the fridge, a door. Passing it again and again is quietly powerful practice.'],
    ['Match with the picture set', 'Lay a variant card beside its picture card from the Alphabet A–Z set and let your child find the pair.']
  ],
  relatedSets: kind === 'silhouette' ? ['alphabet', 'alphabet-letters'] : ['alphabet', kind === 'uppercase' ? 'alphabet-lowercase' : 'alphabet-uppercase'],
  cards: VARIANT_SLUGS.map((slug, i) => ({
    slug,
    n: i + 1,
    letter: LETTERS[i],
    word: cardWord(slug),
    img: A + k.folder + '/' + slug + '.webp',
    w: 1414,
    h: 2000,
    alt: `${kind === 'silhouette' ? 'Silhouette shadow card of the ' : kind === 'uppercase' ? 'Uppercase letter card with the big letter ' : kind === 'lowercase' ? 'Lowercase letter card with the little letter ' : 'Big and little letter card with ' + LETTERS[i].toUpperCase() + LETTERS[i] + ' for the word '}${cardWord(slug)}, cut from the Kiddo School alphabet set`,
    url: '/flashcards/alphabet/' + slug + '/',
    dl: 'kiddo-alphabet-' + kind + '-' + slug + '.webp'
  })),
  url: '/flashcards/' + k.slug + '/',
  cover: {file: VARIANT_SLUGS[0] + '.webp', w: 1414, h: 2000, alt: k.hubBlurb},
  coverUrl: A + k.folder + '/' + VARIANT_SLUGS[0] + '.webp',
  mainSetUrl: '/flashcards/alphabet/',
  mainSetName: 'Alphabet A–Z'
}));

export const alphabetVariantBySlug = Object.fromEntries(alphabetVariantSets.map(s => [s.slug, s]));

// The set page body for the four variant sets: card wall where every card
// carries its own download button, plus sharing, ideas and the link back to
// the main picture set. Deliberately simple — flashcards are about the cards
// and the downloads.
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

export function fcVariantSetPageBody(s, shareUrl) {
  const enc = encodeURIComponent;
  const shareTitle = s.seoTitle + ' — Kiddo School';
  const cards = s.cards.map(c => `<figure class="fcv-card"><a class="fcv-img" href="${esc(c.url)}" aria-label="Open the ${esc(c.word)} picture card"><img src="${esc(c.img)}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"></a><figcaption><strong>${esc(c.word)}</strong><span class="fcv-letter">${esc(c.letter.toUpperCase())}</span></figcaption><div class="fcv-actions"><a class="button" href="${esc(c.img)}" download="${esc(c.dl)}">Download <span aria-hidden="true">↓</span></a><a class="fcv-link" href="${esc(c.url)}">Picture card <span aria-hidden="true">↗</span></a></div></figure>`).join('');
  const ideas = s.useIdeas.map(([t, d], i) => `<li><span class="fc-stepnum">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
  return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/flashcards/">Flashcards</a><span aria-hidden="true">/</span><span aria-current="page">${esc(s.name)}</span></nav>
<div class="page-heading wrap"><span class="eyebrow">FLASHCARD SET · AGES 3–4 YEARS</span><h1>${esc(s.h1)}</h1><p>${esc(s.lede)}</p></div>
<section class="wrap fc-section"><span class="eyebrow">THE CARDS</span><h2>All twenty-six, ready to download.</h2><p class="fc-hint">Tap any card to open its picture page with the words to say together — or tap Download to keep the letter card itself. ${esc(s.downloadHint)}</p><div class="fcv-grid">${cards}</div></section>
<section class="wrap fc-section"><span class="eyebrow">HOW TO USE THESE CARDS</span><h2>Little ways that work.</h2><ol class="fc-steps">${ideas}</ol></section>
<section class="wrap fc-section"><span class="eyebrow">MORE ALPHABET SETS</span><h2>Pick your letters.</h2><div class="fc2-relrow">${alphabetVariantSets.filter(v => v.slug !== s.slug).map(v => `<a class="fc2-relcard" href="${v.url}"><strong>${esc(v.name)}</strong><span>26 cards</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a>`).join('')}<a class="fc2-relcard" href="${s.mainSetUrl}"><strong>${esc(s.mainSetName)}</strong><span>picture cards</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></a></div></section>
<section class="wrap fc-section"><div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS SET</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(shareUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this set on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}" target="_blank" rel="noopener" aria-label="Share this set on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle + ' ' + shareUrl)}" target="_blank" rel="noopener" aria-label="Share this set on WhatsApp">WhatsApp</a><a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(shareUrl)}&media=${enc(s.coverUrl)}&description=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Save this set on Pinterest">Pinterest</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page&rsquo;s address — nothing is tracked.</p></div></section>`;
}
