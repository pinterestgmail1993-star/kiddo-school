// Kiddo School — EXTRA CLASS · Animal Categories: the class page. A bonus
// class beside the core Learning Path (like the Toddler Room, the Kitchen
// Helper, the Doctor Visit, Home and Daily Life, Kids Games and Places in
// the Community). The page walks all 24 animal families in the set's tour
// order — PETS & FARM FRIENDS → LITTLE CRAWLY CREATURES → FEATHERS, FINS &
// SCALES → BIG & WILD → WHERE ANIMALS LIVE → GIANTS & OLD WONDERS — starting
// at the animals a child already loves (pets) and walking outward to the
// wild ones. Every tile opens one /extra-classes/animal-categories/learn/
// lesson: a simple guide a KID can follow (what the family is, who belongs,
// how to spot or play it). Every lesson's card twin lives in the flashcards
// library. THE US/UK/CA PAIRS are taught in the open: ladybug/ladybird,
// cougar/mountain lion/puma, bunny/rabbit. All 24 cards ride at their true
// probed dims (800×1132 portrait, whales-and-dolphins 1100×778 landscape)
// and NO inline styles.
import {lesson as acLesson} from './flashcards/data-animal-categories.mjs';
import {lpContent as acLp} from './flashcards/lp-animal-categories.mjs';

export const AC_PATH='/extra-classes/animal-categories/';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* The six groups of the tour — headings and blurbs written fresh for the
   class page (never reused from the set page's pillGroups). */
const GROUPS=[
 ['Pets & farm friends','The animals that live with us and feed us: the pets that share our houses, the barnyard’s famous crew, the second barn crew and the birds of the henhouse.',['pets','farm-animals','more-farm-animals','farm-birds']],
 ['Little crawly creatures','The small ones under our feet: the six-legged crew with their big jobs, the garden’s quiet workers, the little furballs and the pond-hoppers who live two lives.',['insects','garden-creatures','small-animals','amphibians']],
 ['Feathers, fins & scales','The animal kingdom in its three oldest coats: the birds that fly (and one that swims), the fish that breathe water, the sea’s strange treasures and the scaly sunbathers.',['birds','fish','sea-creatures','reptiles']],
 ['Big & wild','The heavyweights and the acrobats: the big four of the wild, the safari’s famous four, every wild cat from tiger to lynx, and our own clever-handed cousins.',['big-animals','safari-animals','wild-cats','primates']],
 ['Where animals live','Four habitats, four crews: the forest, the desert, the ice and the land Down Under — every animal dressed exactly for its home.',['forest-animals','desert-animals','arctic-animals','australian-animals']],
 ['Giants & old wonders','The grand finale: the ocean’s air-breathing giants, the animals of the dark and the rainforest’s treetop crew.',['whales-and-dolphins','night-animals','rainforest-animals']]
];

export function animalCategoriesBody(){
 const base=acLesson.r2Base;
 const bySlug=Object.fromEntries(acLesson.cards.map(c=>[c.slug,c]));
 const group=(title,blurb,slugs)=>`<div class="fc-pillgroup"><div class="fc-pillgroup-head"><span class="fc-pill fc-pill-age fc-pill-big">${esc(title)}</span><p class="fc-hint">${esc(blurb)}</p></div><div class="lp-tiles">${slugs.map(s=>{const c=bySlug[s];const l=acLp[s];return `<a class="lp-tile" href="${AC_PATH}learn/${c.slug}/"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title.replace(/^The | Lesson$/g,''))}</strong></a>`;}).join('')}</div></div>`;
 return `<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Every animal family — with a lesson on its card.</h2><p class="lesson-copy">The Animal Categories class is a bonus class, kept beside the main learning path like the Kitchen Helper and the Doctor Visit: the regular classes stay the core sequence, and this one is for the days when somebody asks <em>what kind of animal is that?</em> Twenty-three animal families — the pets on the sofa, the crew in the barn, the bugs in the garden, the giants of the savanna — each one on its own spotter card with four labeled animals, and each card opens a simple lesson a kid can follow: what the family is, who belongs to it, and one way to play it at home tonight.</p><p class="lesson-copy">The families run in tour order on purpose. The deck starts with the animals your child already loves — pets, then the farm — and walks outward: the crawly crew, the feathered and scaly teams, the big wild ones, four full habitats, and the finale of giants and old wonders. By the end, ninety-two labeled animals sit in one deck, sorted and named — and the most requested family of all, the dinosaurs, moved next door into <a href="/dinosaurs/">a class of their own</a> with thirty-three cards, one per dinosaur.</p></section>
 <section class="wrap lesson-section" id="the-families"><span class="eyebrow">THE FAMILIES, SIX WALKS</span><h2>Twenty-three cards, six kinds of families.</h2><p class="fc-hint">Twenty-three animal families in six groups, in the order a young naturalist meets them. Tap any picture and it opens its own simple lesson — the original card on the left, and the kid-followable guide on the right.</p>
  ${group(...GROUPS[0])}
  ${group(...GROUPS[1])}
  ${group(...GROUPS[2])}
  ${group(...GROUPS[3])}
  ${group(...GROUPS[4])}
  ${group(...GROUPS[5])}
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">THE CLASS GAME</span><h2>The Big Sort: put the whole zoo in order.</h2><p class="lesson-copy">Lay all the cards face up on the floor. Now sort the whole zoo into teams — fur, feathers, scales, shells — calling each animal to its team out loud: <em>the dolphin is a breath-air mammal! The frog lives two lives! The crab walks sideways!</em> Count each team when the sort is done, then sort again tomorrow by size, or by where they live, or by who eats grass. The deck reshuffles itself into a new science lesson every single time — and the losing team gets to hide and be found, which is the part everybody waits for.</p></section>
 <section class="wrap lesson-section"><span class="eyebrow">SAME ANIMAL, TWO NAMES</span><h2>Ladybug and ladybird. Both are right.</h2><p class="lesson-copy">Animals carry their names across oceans like passports. This class says so out loud. The <strong>ladybug</strong> is the <strong>ladybird</strong> in Britain — same little red beetle with the black spots. The <strong>cougar</strong> goes by three names: cougar, <strong>puma</strong> and <strong>mountain lion</strong> — one cat, all correct. The <strong>rabbit</strong> is everybody’s <strong>bunny</strong> when it is being adorable. Whichever your family says, your child hears both — and learns early that animals, like words, come in families.</p></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Print the animal families cards.</h2><p class="fc-hint">Every lesson has a matching flashcard in the library: the original artwork as a printable card with a download button and short notes for grown-ups. Keep the deck in the play corner — the whole animal kingdom, sorted and ready.</p><div class="fc2-actions"><a class="button" href="/flashcards/animal-categories/">Open the Animal Categories flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/extra-classes/">Back to Extra Classes <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${base}cover.webp" width="800" height="1277" alt="Cover of the Animal Categories flashcards set: the words Animal Category Flashcards over a little bat, a crocodile, an ant and a pink salamander." loading="lazy"></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>More classes, more animals.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/dinosaurs/">Stomp into the Dinosaurs class <span>· 33 cards</span> <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/extra-classes/places-in-the-community/">Walk the Places in the Community class <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/extra-classes/kids-games/">Play the Kids Games class <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/nature-club/animals/">Go deeper with the Nature Club Animals class <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/flashcards/animals-and-their-habitats/">Meet the animals where they live <span>· Habitats set</span> <span aria-hidden="true">↗</span></a></div></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> The age pill on every card is an honest hint, not a rule: start with the animals your child already loves, follow the questions, follow the child. The familiar families ride Ages 3+, the habitat and concept families ride Ages 4–5 — and any card a child loves is the right card today.</p>`;
}
