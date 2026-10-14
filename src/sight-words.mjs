import {fcCommunityMount} from './flashcards/community.mjs';
// Sight Word Flashcards: 52 picture cards (Dolch pre-primer, primer and a few grade-1 words).
// Images live in public/assets/sight-words/<word>.webp (600x800).
const GROUPS=[
 ['Pre-primer words','The first and most useful words: short, common and easy to point at in a picture book.',
  'a and away big blue can come down find for funny go help here i in is it jump little look make me my not one play run said see the three to two up we where yellow you'.split(' ')],
 ['Primer words','A step up once the first set feels easy, with colours, simple verbs and small joining words.',
  'all am are at ate be black brown but came did'.split(' ')],
 ['Grade 1 words','Two extra words that turn up in first stories.',
  'by could'.split(' ')],
];
export const SIGHT_WORD_COUNT=GROUPS.reduce((n,g)=>n+g[2].length,0);
const cap=w=>w==='i'?'I':w;
export const sightWordsCoverUrl='/assets/sight-words/cover.webp';
export function sightWordsBody(){
 const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
 const groups=GROUPS.map(([t,b,ws])=>`<section class="wrap section compact" aria-label="${e(t)}"><h2>${e(t)} <span class="sw-count">(${ws.length} cards)</span></h2><p class="fc-hint">${e(b)}</p><div class="sw-grid">${ws.map(w=>`<figure class="sw-card"><img src="/assets/sight-words/${w}.webp" width="600" height="800" loading="lazy" decoding="async" alt="Sight word flashcard: ${e(cap(w))}"><figcaption>${e(cap(w))}</figcaption></figure>`).join('')}</div></section>`).join('');
 return `<section class="wrap section compact">
  <div class="sw-cover"><img src="${sightWordsCoverUrl}" width="600" height="800" alt="Sight Word Flashcards cover: a child reading a book" decoding="async"></div>
  <h2>What are sight words?</h2>
  <p class="lesson-copy">Sight words are the small, very common words that appear on almost every page of a children’s book: <em>the</em>, <em>and</em>, <em>is</em>, <em>can</em>, <em>see</em>. Many of them do not sound the way they are spelled, and many cannot be shown in a picture, so they are best learned by seeing them again and again until the child knows each one at a glance. When a child recognises these words instantly, reading stops being a slow puzzle and becomes a smooth, enjoyable story.</p>
  <p class="lesson-copy">These ${SIGHT_WORD_COUNT} picture cards use words from the Dolch lists, which teachers have used for decades to build early reading. Each card shows one word in large, clear letters with a friendly picture to hold on to.</p>
  <h2>How to use the cards</h2>
  <p class="lesson-copy">Keep it short and happy: five minutes a day works better than one long session. Pick three to five new cards, read each word aloud together, and let your child point to it and say it back. Add a new card only when the old ones feel easy. If a word is hard, put it aside and bring it back tomorrow. There is no test and no rush.</p>
  <h2>Three simple games</h2>
  <p class="lesson-copy"><strong>Hide and find.</strong> Tape the cards around the room and ask your child to find the word you call out. <strong>Word hop.</strong> Lay cards on the floor like stepping stones and hop to each word while reading it. <strong>Spot it in a story.</strong> Choose a word, then look for it together on the pages of a favourite book and give a cheer every time you find one.</p>
  <p class="lesson-copy">Sight words work best next to letter sounds and plenty of stories. If your child is still learning letters, start with the <a href="/flashcards/alphabet/">alphabet flashcards</a> and the <a href="/preschool/4-years/phonics-and-beginning-sounds/">phonics and beginning sounds class</a>, then share books from the <a href="/learning-library/">Library</a> and the <a href="/preschool/4-years/storytime-and-pre-reading/">storytime class</a>.</p>
 </section>${groups}
 <section class="wrap section compact"><h2>More reading help</h2><p class="lesson-copy">Find printable practice in the <a href="/worksheets/phonics/">phonics worksheets</a> and <a href="/worksheets/reading/">reading worksheets</a>, or visit <a href="/literacy/">Story Corner</a> for writing and story activities.</p></section>${fcCommunityMount('/flashcards/sight-words/')}`;
}
