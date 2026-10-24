// Kiddo School — EXTRA CLASS · Kids Games: the class page. A bonus class
// beside the core Learning Path (like the Toddler Room, the Kitchen Helper,
// the Doctor Visit and Home and Daily Life). The page walks all 26 games in
// the set's tour order — THROW, ROLL & AIM → RUN, CHASE & FREEZE → TABLE &
// TAKE TURNS → LOOK, FIND & SOLVE → ACT, GUESS & LISTEN → PLAYGROUND &
// OUTDOORS — the way a real game afternoon unfolds. Every tile opens one
// /extra-classes/kids-games/learn/ lesson: a simple how-to-play guide a KID
// can follow (owner brief). Every lesson's card twin lives in the flashcards
// library. THE US/UK/CA PAIRS are taught in the open: tic-tac-toe and
// noughts and crosses, jump rope and skipping rope, paper plane and paper
// aeroplane, freeze dance and musical statues — one game, two names, both
// right. All 26 cards ride at their true probed dims (800×1132 portrait)
// and NO inline styles.
import {lesson as kgLesson} from './flashcards/data-kids-games.mjs';
import {lpContent as kgLp} from './flashcards/lp-kids-games.mjs';

export const KG_PATH='/extra-classes/kids-games/';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* The six groups of the tour — headings and blurbs written fresh for the
   class page (never reused from the set page's pillGroups). */
const GROUPS=[
 ['Throw, roll & aim','Games where something flies: the balloon that must stay up, the beanbag, the ball, the rings and the paper plane — and the target waiting for every throw.',['balloon-keep-up','beanbag-toss','bowling','hoop-toss','paper-plane-target']],
 ['Run, chase & freeze','The big-movement classics: hiding and seeking, freezing mid-dance, passing fast, walking the chairs and stopping on a word.',['duck-duck-goose','follow-the-leader','freeze-dance','hide-and-seek','hot-potato','musical-chairs','red-light-green-light']],
 ['Table & take turns','Sit-down games that teach waiting your turn: grids and discs, cards and pairs, a magnetic pond and one very decisive hand game.',['bingo','fishing','four-in-a-row','memory-match','rock-paper-scissors','tic-tac-toe']],
 ['Look, find & solve','The quiet-power games: tracing mazes, joining pieces, catching the sneaky changes and following the clues to the treasure.',['maze','puzzle','spot-the-difference','treasure-hunt']],
 ['Act, guess & listen','Games your imagination runs: acting without a single word and obeying only the commands that carry the magic words.',['charades','simon-says']],
 ['Playground & outdoors','The sidewalk classics: chalk numbers under hopping feet and a rope that keeps swinging to its own chant.',['hopscotch','jump-rope']]
];

export function kidsGamesBody(){
 const base=kgLesson.r2Base;
 const bySlug=Object.fromEntries(kgLesson.cards.map(c=>[c.slug,c]));
 const group=(title,blurb,slugs)=>`<div class="fc-pillgroup"><div class="fc-pillgroup-head"><span class="fc-pill fc-pill-age fc-pill-big">${esc(title)}</span><p class="fc-hint">${esc(blurb)}</p></div><div class="lp-tiles">${slugs.map(s=>{const c=bySlug[s];const l=kgLp[s];return `<a class="lp-tile" href="${KG_PATH}learn/${c.slug}/"><img src="${base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title.replace(/^The | Lesson$/g,''))}</strong></a>`;}).join('')}</div></div>`;
 return `<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Every game a childhood needs — with the rules on the card.</h2><p class="lesson-copy">The Kids Games class is a bonus class, kept beside the main learning path like the Kitchen Helper and the Doctor Visit: the regular classes stay the core sequence, and this one is for the afternoons when somebody says <em>I don&rsquo;t know what to play</em>. Twenty-six classic games — balloon keep-up, hide and seek, tic-tac-toe, treasure hunt — each one on its own card, and each card opens a simple guide a kid can follow: what you need, how to play, step by step, and one way to make it fresh tomorrow.</p><p class="lesson-copy">The games run in tour order on purpose. The throwing and rolling games come first, because aiming is where little arms start; then the running-and-freezing games that empty a room of wiggles; then the table games that teach waiting a turn; the quiet find-and-solve games for the rainy shelf; the acting games for loud imaginations; and the last group belongs outside — chalk, pavement and a rope on a swing.</p></section>
 <section class="wrap lesson-section" id="the-games"><span class="eyebrow">THE GAMES, SIX WAYS TO PLAY</span><h2>Twenty-six cards, six kinds of play.</h2><p class="fc-hint">Twenty-six games in six groups, in the order a real game afternoon unfolds. Tap any picture and it opens its own how-to-play guide — the original card on the left, and the simple kid-followable steps on the right.</p>
  ${group(...GROUPS[0])}
  ${group(...GROUPS[1])}
  ${group(...GROUPS[2])}
  ${group(...GROUPS[3])}
  ${group(...GROUPS[4])}
  ${group(...GROUPS[5])}
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">THE CLASS GAME</span><h2>Game Day: let the stack decide.</h2><p class="lesson-copy">Stack the cards face down. Draw the top one, read its guide together, play the game — and the winner of each game draws the next card. That is Game Day, and it runs itself: the stack decides everything, the winning gets a crown (and the drawing job), and the afternoon ends only when the stack ends. Losing practice is built right in: short rounds, loud good-games, immediate rematches.</p></section>
 <section class="wrap lesson-section"><span class="eyebrow">SAME GAME, TWO NAMES</span><h2>Tic-tac-toe and noughts and crosses. Both are right.</h2><p class="lesson-copy">Games travel lighter than words do — the same game grows a new name on every shore, and this class says so out loud. <strong>Tic-tac-toe</strong> is <strong>noughts and crosses</strong> in the UK; the <strong>jump rope</strong> is a <strong>skipping rope</strong>; the <strong>paper plane</strong> flies as a <strong>paper aeroplane</strong>; <strong>freeze dance</strong> is <strong>musical statues</strong> across the ocean; the balloon game rides the UK playground word <strong>keepy-uppy</strong>; and the disc-dropping grid most homes call <strong>Connect Four</strong> is simply <strong>four in a row</strong> here — the generic name, playable with buttons on a drawn grid. Whichever your family says, your child hears both — and learns early that games, like words, come in kinds.</p></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Print the kids-games cards.</h2><p class="fc-hint">Every guide has a matching flashcard in the library: the original artwork as a printable card with a download button and short notes for grown-ups. Keep the five sit-down cards in a basket near the couch — on a gray afternoon, the basket is the plan.</p><div class="fc2-actions"><a class="button" href="/flashcards/kids-games/">Open the Kids Games flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/extra-classes/">Back to Extra Classes <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${base}cover.webp" width="800" height="1132" alt="Cover of the Kids Games flashcards set: the words Kids Games Flashcards over a board game with a pawn, a big die and a dotted arrow." loading="lazy"></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>More classes, more playing.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/games/">The game rules shelf <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/extra-classes/home-and-daily-life/">Walk through the Home and Daily Life class <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/extra-classes/doctor-visit/">Take the Doctor Visit class <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/flashcards/sports/">More moving & playing <span>· Sports set</span> <span aria-hidden="true">↗</span></a></div><p class="fc-hint">New rule cards for the deck live on their own shelf at <a href="/games/">/games/</a> — one short page per game with the three rules printed on the card, what you need and a fresh twist: Duck Duck Goose, Hopscotch, Simon Says, Tag and thirty-one more.</p></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> Start with the game your child loves best, follow the giggle, follow the child — and say the rule out loud before every game: a child who can say the rule can run the game with friends.</p>`;
}
