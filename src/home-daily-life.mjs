// Kiddo School — EXTRA CLASS · Home and Daily Life: the class page. A bonus
// class beside the core Learning Path (like the Toddler Room, the Kitchen and
// the Doctor Visit). The page walks the whole home in the set's tour order —
// ROOMS OF THE HOME → WASH AND GET READY → IN THE KITCHEN → CHORES AND TOOLS
// → AROUND THE HOME → SOUNDS AND TECHNOLOGY → SAFE AND GREEN — the same order
// a family really meets its house. Every tile opens one
// /extra-classes/home-and-daily-life/learn/ lesson; every lesson's card twin
// lives in the flashcards library. THE US/UK/CA PAIRS are taught in the open:
// tap and faucet, torch and flashlight, wardrobe and closet, trolley and cart
// — one home, two names, both right. All 41 cards ride at their true probed
// dims (1100×778 landscape) and NO inline styles.
import {lesson as hdLesson} from './flashcards/data-home-daily-life.mjs';
import {lpContent as hdLp} from './flashcards/lp-home-daily-life.mjs';

export const HD_PATH='/extra-classes/home-and-daily-life/';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* The seven groups of the tour — headings and blurbs written fresh for the
   class page (never reused from the set page's pillGroups). */
const GROUPS=[
 ['Rooms of the home','Start the tour where every tour starts: the rooms themselves, the parts that hold the house up, and the furniture that fills it.',['rooms-at-home','parts-of-a-home-inside','parts-of-a-home-outside','living-room-words','furniture-words','bedroom-words','bedroom-objects','storage-words','household-objects']],
 ['Wash and get ready','From wake-up to lights-out: the bathroom words, the bath, the teeth, and the bedtime book that closes the day.',['daily-routines','bedroom-routines','bathroom-words','more-bathroom-words','bathroom-routines','washing-and-bathing','personal-care']],
 ['In the kitchen','The verbs of the busiest room — cook, set, pour — plus the machines that help and the shopping that fills the fridge.',['kitchen-actions','home-appliances','shopping-words']],
 ['Chores and tools','The jobs that keep a home humming: sweeping, mopping, the laundry line, the garden tools and the fix-it box.',['cleaning-and-tidying','cleaning-tools','laundry-words','outdoor-chores','garden-tools','tools-and-fix-it','more-tools']],
 ['Around the home','The launchpad and the edges: keys by the door, letters in the mailbox, the yard beyond the fence — and the pets who rule it.',['by-the-door','letters-and-parcels','outside-the-home','outdoor-home-words','pets-at-home']],
 ['Sounds and technology','Ding-dong, creak, tick-tock — the house talks all day long. Then the glowing machines, and the charger that feeds them.',['sounds-at-home','sounds-around-home','technology-at-home']],
 ['Safe and green','The guardians and the growers: smoke alarm, first-aid box, recycling bin, seeds on the windowsill — the habits that keep a home kind.',['safe-at-home','home-safety','water-and-energy','recycling-words','care-for-earth','plants-at-home','caring-for-plants']]
];

export function homeDailyLifeBody(){
 const base=hdLesson.r2Base;
 const bySlug=Object.fromEntries(hdLesson.cards.map(c=>[c.slug,c]));
 const group=(title,blurb,slugs)=>`<div class="fc-pillgroup"><div class="fc-pillgroup-head"><span class="fc-pill fc-pill-age fc-pill-big">${esc(title)}</span><p class="fc-hint">${esc(blurb)}</p></div><div class="lp-tiles">${slugs.map(s=>{const c=bySlug[s];const l=hdLp[s];return `<a class="lp-tile" href="${HD_PATH}learn/${c.slug}/"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title.replace(/^The | Lesson$/g,''))}</strong></a>`;}).join('')}</div></div>`;
 return `<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>A house is a child’s first country. This is its phrasebook.</h2><p class="lesson-copy">The Home and Daily Life class is a bonus class, kept beside the main learning path like the Toddler Room and the Kitchen: the regular classes stay the core sequence, and this one is for families with a curious house-mouse in residence — the child who wants to know what the broom is for, where the mail sleeps, and what the tap is called when it runs. Forty-one cards walk the whole home, and your actual house is the classroom: every word on every card is standing somewhere within reach of you right now.</p><p class="lesson-copy">The cards run in tour order on purpose. The rooms come first, because rooms hold everything else; then the routines that open and close the day; then the kitchen, the chores and the tools; then the edges of home — the door, the mail, the pets — and the sounds the house makes when nobody is watching; and the last group is the quiet one: the safety words and the green habits that keep a home kind.</p></section>
 <section class="wrap lesson-section" id="the-home"><span class="eyebrow">THE HOME, ROOM BY ROOM</span><h2>Forty-one cards, seven rooms and edges of the house.</h2><p class="fc-hint">Forty-one cards in seven groups, in the order a family really meets its house. Tap any picture and it opens its own step-by-step lesson — the original artwork on the left, and the teaching on the right.</p>
  ${group(...GROUPS[0])}
  ${group(...GROUPS[1])}
  ${group(...GROUPS[2])}
  ${group(...GROUPS[3])}
  ${group(...GROUPS[4])}
  ${group(...GROUPS[5])}
  ${group(...GROUPS[6])}
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">THE CLASS GAME</span><h2>The house hunt.</h2><p class="lesson-copy">Call a word from the cards — <strong>"sink!" "cushion!" "doormat!"</strong> — and your child runs to touch the real thing. That is the whole game, and it never gets old, because your home is the answer key: every word is findable, every find is a sprint, and every sprint burns the word in deep. Play it room by room, or whole-house championship rules; the vacuum cleaner card is always requested first.</p></section>
 <section class="wrap lesson-section"><span class="eyebrow">SAME HOME, TWO WORDS</span><h2>Tap and faucet. Torch and flashlight. Both are right.</h2><p class="lesson-copy">English grew up on several shores, and this class says so out loud. The cards carry the everyday words of the US, UK and Canada — and where the countries differ, both words ride along in the teaching: the <strong>tap</strong> and the <strong>faucet</strong>, the <strong>torch</strong> and the <strong>flashlight</strong>, the <strong>wardrobe</strong> and the <strong>closet</strong>, the <strong>trolley</strong> and the <strong>shopping cart</strong>, the <strong>bin</strong> and the <strong>trash can</strong>, the <strong>parcel</strong> and the <strong>package</strong>, the <strong>garden</strong> and the <strong>yard</strong>. Whichever your family says, your child hears both — and learns early that words, like homes, come in kinds.</p></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Print the home-and-daily-life cards.</h2><p class="fc-hint">Every lesson has a matching flashcard in the library: the original artwork as a printable card with a download button and short notes for grown-ups. Stick the bedroom card on the bedroom door and the kitchen card on the fridge — the word lives where the thing lives.</p><div class="fc2-actions"><a class="button" href="/flashcards/home-and-daily-life/">Open the Home and Daily Life flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/extra-classes/">Back to Extra Classes <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${base}cover.webp" width="1100" height="778" alt="Cover of the Home and Daily Life flashcards set: the words Home and Daily Life Flashcards over a little blue house with an open book, a mug and a potted plant." loading="lazy"></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>More rooms, more helpers.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/kitchen/">Open the Kitchen Helper class <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/extra-classes/doctor-visit/">Take the Doctor Visit class <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/preschool/4-years/life-skills-and-good-habits/">More good habits <span>· Class 32</span> <span aria-hidden="true">↗</span></a></div></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> Start with the room your child loves best, follow the house, follow the child — and say the words where the things live: the bedroom words in the bedroom, the bathroom words by the sink, and both names wherever your family says either.</p>`;
}
