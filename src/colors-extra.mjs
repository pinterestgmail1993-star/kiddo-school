// Kiddo School — EXTRA CLASS · Colors: the class page. A bonus class beside
// the core Learning Path (like the Animal Categories, the Doctor Visit, the
// Kitchen Helper). The page walks the 11 color cards in file-name order
// (owner brief: "show the 11 color cards in file-name order (01 to 11), one
// card per page") — every tile opens one /extra-classes/colors/learn/
// lesson: a simple guide a KID can follow (what the color is, where it
// hides, the mixing recipe). The 4 shade cards get their own section,
// headed "More colors (ages 4-5)" per the owner's exact wording — shades
// are colors you MAKE, which is what makes them the 4–5 shelf. The cover
// fronts the class art. CROSS-LINKS (owner brief): the Age 3 Colors & Color
// Mixing class links here with "More colors to explore" and this page links
// back; the First Glance colors sheets (colors-1, colors-2) link here and
// this page links back to First Glance. Card images render at their true
// 600×849 dims with object-fit: contain (public/assets/style.css scopes the
// rule to this class so nothing ever crops). NO inline styles.
import {lesson as colLesson} from './flashcards/data-colors-and-shades.mjs';
import {lpContent as colLp} from './flashcards/lp-colors-and-shades.mjs';

export const COLORS_PATH='/extra-classes/colors/';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* The deck in tour order — the eleven first colors (file order 01–11),
   then the four shades of the More colors section. */
const FIRST_COLORS=['red','blue','yellow','green','orange','purple','pink','brown','black','grey','gold'];
const SHADES=['light-blue','navy','peach','lavender'];

const tile=(c)=>`<a class="lp-tile" href="${COLORS_PATH}learn/${c.slug}/"><img src="${colLesson.r2Base}${c.file}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(colLp[c.slug].title.replace(/^The | Lesson$/g,''))}</strong></a>`;

export function colorsExtraBody(){
 const bySlug=Object.fromEntries(colLesson.cards.map(c=>[c.slug,c]));
 return `<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Every color — with a lesson on its card.</h2><p class="lesson-copy">The Colors class is a bonus class, kept beside the main learning path like the Animal Categories and the Doctor Visit: the regular classes stay the core sequence, and this one is for the days when somebody asks <em>what color is that?</em> Fifteen spotter sheets — eleven first colors and four make-it-yourself shades — each one a two-by-two sheet of four labeled things in one color. Sixty labeled pictures in one deck: the red apple, the yellow sun, the grey elephant, the gold honey pot, and every square between. Each card opens a simple lesson a kid can follow: what the color is, where it hides in your house, and one way to hunt it tonight.</p><p class="lesson-copy">The deck runs in file order on purpose. It starts with <strong>red</strong> — usually the first color word a child learns — and walks through blue, yellow, green, orange, purple, pink, brown, black, grey and gold, ending on the shiny treasure card. Then the deck grows up: four shades that are not found but <em>made</em> — light blue, navy, peach and lavender — each with its own mixing recipe, for bigger spotters.</p></section>
 <section class="wrap lesson-section" id="the-colors"><span class="eyebrow">THE FIRST COLORS, ELEVEN WALKS</span><h2>Eleven color cards, file order one to eleven.</h2><p class="fc-hint">The eleven colors a child names first, in the deck&rsquo;s own order — red to gold, one card per page. Tap any picture and it opens its own simple lesson: the original card on the left, the kid-followable guide on the right.</p>
  <div class="lp-tiles">${FIRST_COLORS.map(s=>tile(bySlug[s])).join('')}</div>
 </section>
 <section class="wrap lesson-section" id="more-colors"><span class="eyebrow">MORE COLORS (AGES 4-5)</span><h2>More colors (ages 4-5)<span class="title-dot">.</span></h2><p class="fc-hint">Four shades for bigger spotters — and a bigger idea: these colors are not found, they are MADE. Light blue is blue plus white, navy is blue gone dark, peach is orange gone soft, lavender is purple gone pale. Every shade lesson teaches its recipe — and mixing them for real is the whole game.</p>
  <div class="lp-tiles">${SHADES.map(s=>tile(bySlug[s])).join('')}</div>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">THE CLASS GAME</span><h2>The Color Hunt: turn the house into the deck.</h2><p class="lesson-copy">Pick one card — say, the red one — and hunt its color all day: clothes, cups, cars, cushions, the crust on toast. Every find is called out loud: <em>red car! red cup! red sock!</em> Count the finds as you go and try to beat yesterday&rsquo;s total. Then swap cards tomorrow — gold days hunt crowns and door handles, grey days hunt elephants and pavement. The house reshuffles itself into a new color lesson every single morning — and the day&rsquo;s winner picks dinner&rsquo;s plate color, which is exactly as powerful as it sounds.</p></section>
 <section class="wrap lesson-section"><span class="eyebrow">SAME COLOR, TWO NAMES</span><h2>Grey and gray. Both are right.</h2><p class="lesson-copy">Colors carry their names across oceans like passports, and this class says so out loud. The card says <strong>grey</strong> — the UK spelling — while families in the US write <strong>gray</strong>: same gentle elephant-cloud color, two spellings, both correct. The glossy purple vegetable is an <strong>eggplant</strong> in the US and an <strong>aubergine</strong> in the UK. Whichever your family says, your child hears both — and learns early that colors, like words, come in families.</p></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Print the color cards.</h2><p class="fc-hint">Every lesson has a matching flashcard in the library: the original artwork as a printable card with a download button and short notes for grown-ups. Keep the deck in the play corner — all fifteen colors, sorted and ready.</p><div class="fc2-actions"><a class="button" href="/flashcards/colors-and-shades/">Open the Colors &amp; Shades flashcards <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/extra-classes/">Back to Extra Classes <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${colLesson.r2Base}flashcards/cover.webp" width="600" height="849" alt="Cover of the Colors flashcards set: the words Color Flashcards over five round color dots." loading="lazy"></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>More colors, more places.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/3-years/colors-and-color-mixing/">Mix colors in the Colors &amp; Color Mixing class <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/first-glance/">Start even earlier with the First Glance sheets <span>· Ages 2–5</span> <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/extra-classes/animal-categories/">Sort the Animal Categories class <span aria-hidden="true">↗</span></a><a class="lesson-pill-link" href="/flashcards/colors/">Meet the paint-splash Colors set <span>· Ages 1–3</span> <span aria-hidden="true">↗</span></a></div></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> The age pill on every card is an honest hint, not a rule: the eleven first colors ride Ages 2+ — they are pointing-and-naming cards, the first words a toddler learns — and the four shades ride Ages 4–5, because each one is a mixing recipe with two ingredients to hold in mind. Any card a child loves is the right card today.</p>`;
}
