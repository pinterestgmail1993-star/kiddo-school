// Kiddo School — NATURE CLUB: the new top-level club beside Extra Classes.
// The owner's R2 layout (school/nature-club/animals/flashcards/) mirrors the
// site: /nature-club/ is the club hub, /nature-club/animals/ is its first
// class, and the flashcards library holds the printable twins at
// /flashcards/nature-club-animals/. The Animals class walks all 22 spotter
// sheets in walk order — BIRDS OF THE WORLD → BY THE WATER → LITTLE CRAWLIES
// → FUR FAMILIES → WILD HOMES — the deeper deck after Animal Categories:
// same 2×2 sheets, closer study. Every tile opens one
// /nature-club/animals/learn/ lesson: a simple spotter guide a KID can
// follow (what the group is, who belongs, how to tell look-alikes apart).
// The set has no cover file of its own, so the class fronts with the
// Animal Categories cover (owner: "include the cover in both").
// THE US/UK/CA PAIRS are taught in the open: reindeer/caribou, moose/elk,
// shrimp/prawn, buzzard/vulture. All 22 cards ride at their true probed dims
// (800×1132 portrait, three landscape at 1100×778) and NO inline styles.
import {lesson as ncLesson} from './flashcards/data-nature-club-animals.mjs';
import {lpContent as ncLp} from './flashcards/lp-nature-club-animals.mjs';
import {lesson as acLesson} from './flashcards/data-animal-categories.mjs';

export const NC_PATH='/nature-club/';
export const NCA_PATH='/nature-club/animals/';
export const NC_COVER=acLesson.r2Base+'cover.webp';
export const NC_COVER_W=800,NC_COVER_H=1277;
export const NC_COVER_ALT='Cover of the Nature Club Animals flashcards set: the words Animal Category Flashcards over a little bat, a crocodile, an ant and a pink salamander.';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* The five walks of the Animals class — headings and blurbs written fresh
   for the class page (never reused from the set page's pillGroups). */
const GROUPS=[
 ['Birds of the world','The hunters and the singers of the sky: the raptors with their famous eyes, the birds at the backyard feeder, the desert’s runners and the strange birds of Australia.',['birds-of-prey','garden-birds','desert-birds','australian-birds']],
 ['By the water','Life along the shore, in the rivers and under the waves: the seal cousins, the river builders, the marsh of patient legs, the shell-backed swimmers, the houses that hinge and the creatures of the deep, deep dark.',['coastal-animals','river-animals','wetland-animals','crustaceans','shellfish','deep-sea-animals']],
 ['Little crawlies','The small crews that keep the world running: the carriers of the pollen, the animals with no bones at all, and the eight-legged web-spinners.',['pollinators','invertebrates','spiders-and-ticks']],
 ['Fur families','The gnawers and the grazers: the whole dog family from wolf to dingo, the deer and the big grazers with their ocean-crossing names, and the rodents with their never-stopping teeth.',['dog-family','deer-and-grazers','rodents']],
 ['Wild homes','Six wild addresses: the African grasslands, the forests of South America, the high Arctic a second time, the world under the rock, and two mountainsides of climbers.',['african-grassland-animals','south-american-animals','arctic-animals-2','cave-animals','mountain-animals-1','mountain-animals-2']]
];

/* The /nature-club/ hub: the club shelf (Animals is the first collection). */
export function natureClubHubBody(){
 return `<section class="wrap section compact"><p class="mw-lede">The Nature Club is the school’s wild side — spotter classes for children who want to know <em>what exactly was that?</em> One collection is open, with more to come: grab a card, take the walk, and meet the wild where it actually lives.</p><div class="room-grid room-grid-hub"><a class="room-card" href="${NCA_PATH}"><span class="room-cover"><img src="${NC_COVER}" width="${NC_COVER_W}" height="${NC_COVER_H}" alt="${esc(NC_COVER_ALT)}" loading="lazy"></span><span class="room-body"><span class="explore-eyebrow">NATURE CLUB CLASS</span><h2>Animals</h2><p>Twenty-two deeper animal spotter sheets — birds of prey, garden and desert birds, coastal and river animals, crustaceans and shellfish, pollinators, invertebrates, the dog family, deer and grazers, rodents, and six wild homes — each with its own spotter lesson a kid can follow.</p><span class="text-link">Open the Animals class <span aria-hidden="true">↗</span></span></span></a></div><p class="fc-hint">Start with the <a href="/extra-classes/animal-categories/">Animal Categories</a> extra class first if the animal families are new — then come here for the deeper deck. Every Nature Club card keeps its printable twin in the <a href="/flashcards/nature-club-animals/">flashcards library</a>.</p></section>`;
}

/* The Animals class page: five walks, the Spotter's Walk, two-names. */
export function natureClubAnimalsBody(){
 const base=ncLesson.r2Base;
 const bySlug=Object.fromEntries(ncLesson.cards.map(c=>[c.slug,c]));
 const group=(title,blurb,slugs)=>`<div class="fc-pillgroup"><div class="fc-pillgroup-head"><span class="fc-pill fc-pill-age fc-pill-big">${esc(title)}</span><p class="fc-hint">${esc(blurb)}</p></div><div class="lp-tiles">${slugs.map(s=>{const c=bySlug[s];const l=ncLp[s];return `<a class="lp-tile" href="${NCA_PATH}learn/${c.slug}/"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title.replace(/^The | Lesson$/g,''))}</strong></a>`;}).join('')}</div></div>`;
 return `<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Every animal group — with a spotter lesson on its card.</h2><p class="lesson-copy">The Nature Club Animals class is the deeper deck: where <a href="/extra-classes/animal-categories/">Animal Categories</a> teaches the big families, this one goes specialist — birds of prey, crustaceans, pollinators, the dog family, rodents, and the wild homes from grassland to mountaintop. Twenty-two spotter sheets, each with four labeled animals, and each card opens a simple lesson a kid can follow: what the group is, who belongs, how to tell the look-alikes apart, and one way to spot them on a real walk.</p><p class="lesson-copy">The walks run in study order on purpose. The birds come first — hunters before singers; then the water, from the shore to the deep; then the small crews that run the world; the fur families with their famous cousins; and the wild homes, six addresses from grassland to cave to mountaintop. The age pills lean Ages 4–5 on purpose too: this is the step-up deck, and the friendliest five cards ride Ages 3+ for confident younger spotters.</p></section>
 <section class="wrap lesson-section" id="the-walks"><span class="eyebrow">THE SPOTTER SHEETS, FIVE WALKS</span><h2>Twenty-two cards, five walks of the wild.</h2><p class="fc-hint">Twenty-two animal groups in five walks, in the order a young spotter meets them. Tap any picture and it opens its own spotter lesson — the original card on the left, and the kid-followable guide on the right.</p>
  ${group(...GROUPS[0])}
  ${group(...GROUPS[1])}
  ${group(...GROUPS[2])}
  ${group(...GROUPS[3])}
  ${group(...GROUPS[4])}
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">THE CLASS GAME</span><h2>The Spotter’s Walk: one card, one walk, one met animal.</h2><p class="lesson-copy">Take one card on your walk — <em>garden-birds</em> on any day, <em>birds-of-prey</em> for the park with the big trees, <em>river-animals</em> for the stream. The job is simple: spot ONE real creature that belongs to the card’s family, and watch it long enough to say one true thing about it. At home, draw what you met next to the card version and write the date. A notebook of met animals is the Nature Club badge of honor — one page per walk, no rush, and the deck decides where next week’s walk goes.</p></section>
 <section class="wrap lesson-section"><span class="eyebrow">SAME ANIMAL, TWO NAMES</span><h2>Reindeer and caribou. Both are right.</h2><p class="lesson-copy">Animals carry their names across oceans like passports — and this class says so out loud. The <strong>reindeer</strong> of Lapland is the <strong>caribou</strong> of Canada and Alaska — same animal, two names. The <strong>moose</strong> is called the <strong>elk</strong> in Britain. A <strong>shrimp</strong> in America is a <strong>prawn</strong> in Britain. And the <strong>buzzard</strong> is the trickiest of all: in North America it means a <strong>vulture</strong>, but in Britain it means a <strong>hawk</strong> — one word, two birds, and this class teaches both. Whichever your family says, your child hears both — and learns early that animals, like words, come in kinds.</p></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Print the Nature Club Animals cards.</h2><p class="fc-hint">Every lesson has a matching flashcard in the library: the original artwork as a printable card with a download button and short notes for grown-ups. Keep the deck by the front door — the next walk is already chosen.</p><div class="fc2-actions"><a class="button" href="/flashcards/nature-club-animals/">Open the Nature Club Animals flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/nature-club/">Back to the Nature Club <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${NC_COVER}" width="${NC_COVER_W}" height="${NC_COVER_H}" alt="${esc(NC_COVER_ALT)}" loading="lazy"></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>More animals, more classes.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/extra-classes/animal-categories/">Start with the Animal Categories class <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/extra-classes/">Browse the Extra Classes <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/flashcards/animals-and-their-habitats/">Meet the animals where they live <span>· Habitats set</span> <span aria-hidden="true">↗</span></a></div></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> The age pill on every card is an honest hint: this is the deeper deck, so most cards ride Ages 4–5 — but the friendliest groups (garden birds, the seashore, the river, the pollinators, the dog family) ride Ages 3+. Start where your child’s curiosity already points; the card in their hand is always the right card.</p>`;
}
