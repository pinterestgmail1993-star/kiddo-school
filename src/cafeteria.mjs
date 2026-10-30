// Kiddo School — SCHOOL ROOM · The Cafeteria: the room page /cafeteria/, the
// owner's short pages /cafeteria/<slug>/ (card + the card's activity + back
// link), and the cross-links the owner asked for (2026-10-26): Explore the
// School (/rooms/), Class 22 Fruits & Vegetables and the Kitchen Helper class
// point here, and this room links back to all three. The hub shows cover.webp
// FIRST, then the first 29 cards (apple through ham-sandwich) on the main
// shelf and the remaining 33 under "More foods". Landscape cards (six of
// them) letterbox with object-fit: contain, never crop (owner rule). Short
// pages keep the house two-home doctrine: the card's ACTIVITY line is quoted
// verbatim here; the teaching words live on the /cafeteria/learn/ lessons and
// the library pages — no sentence shared between shelves. Owner standing rule
// (2026-10-24): the room body carries games-shelf links where they honestly
// fit — Hot Potato, Simon Says and the Treasure Hunt are all games a
// cafeteria table plays between courses. Five words already live in the
// Fruits & Vegetables set (apple, banana, carrot, grapes, strawberry): their
// pages keep their URLs and gain a link to the cafeteria version — the
// friend-link pattern — and each cafeteria short page links back to its twin.
import {CAF_BASE,CAF_ORDER,CAF_YOUNG,CAF_MORE,CAF_ACTIONS,CAF_LANDSCAPE,CAF_COVER} from './flashcards/data-cafeteria.mjs';
import {fcSetBySlug} from './flashcards/index.mjs';

export {CAF_YOUNG,CAF_MORE,CAF_ORDER};

export const CAF_PATH='/cafeteria/';
const cafSet=fcSetBySlug['cafeteria'];
if(!cafSet)throw Error('cafeteria: set missing from flashcards SOURCES');
const bySlug=Object.fromEntries(cafSet.cards.map(c=>[c.slug,c]));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* Words that already live in the Fruits & Vegetables set — the owner-pinned
   friend pairs (URL kept there, links added both ways, no duplicates made). */
const WORD_COUSINS={
 'apple':['Apple in Fruits & Vegetables','/flashcards/fruits-and-vegetables/apple/'],
 'banana':['Banana in Fruits & Vegetables','/flashcards/fruits-and-vegetables/banana/'],
 'grapes':['Grapes in Fruits & Vegetables','/flashcards/fruits-and-vegetables/grapes/'],
 'carrots':['Carrot in Fruits & Vegetables','/flashcards/fruits-and-vegetables/carrot/'],
 'strawberries':['Strawberry in Fruits & Vegetables','/flashcards/fruits-and-vegetables/strawberry/']
};

/* Short-page copy: one fresh intro per food (authored here so the short
   pages, the card pages and the lessons never drift or repeat). By slug. */
const CAF_INTRO={
 'apple':'The fruit that starts most lunchboxes: red, round, and the first food most children point at before they name it. The tray keeps a bowl of them by the milk.',
 'applesauce':'The apple with the crunch removed — soft, spoonable and golden in its little cup. It is the gentlest thing on the tray and the first dessert new eaters earn.',
 'bagel':'The breakfast with a window in the middle. Chewy where bread is soft, shiny where bread is pale, and the only ring on the morning shelf.',
 'banana':'The fruit a child can open alone: pinch the stem, pull the strips down, breakfast achieved. It arrives curved, yellow and proud of it.',
 'blueberries':'The smallest food in the whole room — a blue cup of little marbles, each one a finger exercise that ends in sweetness.',
 'bread':'The loaf that everything else borrows from: the sandwich halves, the toast, the roll beside the soup. Warm bakery smell included at no charge.',
 'broccoli':'The vegetable that looks like a tiny tree, stalk and crown and all. Some children eat the trees; all of them can point to them.',
 'burrito':'A whole meal rolled into a blanket — beans and rice tucked inside a tortilla with the ends folded in. The open end shows the hiding filling.',
 'cafeteria-tray':'The one card that is the room itself: five compartments and a round plate, everything parked in its own spot. Every other card lands on this one.',
 'carrots':'Three orange carrots lying side by side, green tops still on — the countable vegetable with the loudest crunch in the building.',
 'celery':'Two green sticks crossed like an X, full of ribs and ready to snap. Cool, crisp and mostly water — the vegetable you can hear yourself eat.',
 'cereal':'Rings floating in a big bowl, milk poured over by a grown-up and stirred by a small hand. Breakfast as a counting game.',
 'cheese':'One yellow square angled like a diamond — the slice that rides crackers, melts into sandwiches and stacks into towers before it is eaten.',
 'chicken-nuggets':'Five golden pieces piled together, each sized for two bites. The friendliest counting food on the tray and the dip cups\u2019 best customer.',
 'chicken':'Dinner with a handle: a roasted drumstick, golden and crinkled, held by the little bone exactly the way the card shows.',
 'chocolate-milk':'The brown carton with the words printed right on it — the drink children can name from across the whole cafeteria.',
 'cookie':'Round, brown and wavy at the edge, with chocolate chips scattered like a pattern to be found. The tray\u2019s little celebration.',
 'corn':'One yellow cob in a rocket\u2019s diagonal, rows of kernels running its whole length — a vegetable with a pattern built in.',
 'crackers':'Three flat squares stacked like tiles, dotted with tiny holes that keep them snappy. The crunchiest thing that ever carried cheese.',
 'cucumber':'Dark green outside, pale and juicy inside, shown whole with three round slices fanned beside it — the coolest customer on the shelf.',
 'egg':'One smooth white oval standing upright — the simplest shape in the case and the breakfast that hides the kitchen\u2019s best peeling job.',
 'fish':'A cooked white fillet with golden seasoning, soft enough to flake with a fork. The sea\u2019s gentlest arrival on a lunch tray.',
 'french-fries':'A white carton of golden fries standing at different heights like a tiny city skyline — the most famous silhouette in childhood.',
 'fruit-salad':'The whole fruit shelf in one pink bowl: strawberries, kiwi, grapes, melon and pineapple, cut small enough to share a spoon.',
 'granola-bar':'Oats pressed with honey into a rectangle that rides in pockets without crumbling — a picnic small enough to travel anywhere.',
 'grapes':'A full purple bunch hanging from one curly stem, every grape a round bead. The prettiest counting picture in the deck.',
 'green-beans':'Long slim beans crossed every which way, like a game of pick-up sticks. Fresh ones snap with a click — the loudest green on the tray.',
 'grilled-cheese':'Two slices of bread hugging melted cheese, toasted gold with the filling just showing at the corner. The drippy edge is the famous part.',
 'ham-sandwich':'Soft bread, pink ham and a ruffle of lettuce — the classic, built in layers and pressed down gentle. Lunch as the world packs it.',
 'juice':'The tray\u2019s smallest package: a little orange box with an apple on the front and one straw waiting in its sleeve to be punched through.',
 'lemonade':'Pale yellow with ice cubes clinking and a lemon slice riding the rim — summer\u2019s signature drink, sour and sweet at the same time.',
 'mac-and-cheese':'An orange bowl heaped with curly macaroni in cheese sauce — the comfort food children request by name before they can say please.',
 'mashed-potatoes':'A lavender bowl of creamy white clouds with one gentle swirl on top. No chewing required — the softest landing on the tray.',
 'meatballs':'Three round brown balls in a red bowl, sized for one bite and rolling if you let them. Dinner shaped like toys.',
 'melon':'Cubes of pale green honeydew in a green cup — the quietest fruit in the room, cool and mild and easy to stack.',
 'milk':'The blue and white carton with one word printed large — the drink that lands on every tray, every day, beside everything else.',
 'muffin':'A golden dome with blueberries baked in, riding a paper wrapper that peels down in one strip. Breakfast wearing a cupcake\u2019s shape.',
 'oatmeal':'A cream-colored bowl of gentle swirls, warm and spoonable — the breakfast that holds a smiley face for sixty glorious seconds.',
 'orange':'One perfect orange sphere with a single green leaf — the fruit and the color wearing the same name, which is the best word joke on the shelf.',
 'pancake':'A flat golden circle with a lacy, bubbled top, seen from above exactly as it lands on the plate. Breakfast\u2019s biggest circle.',
 'pasta':'A red bowl of little curved noodles in light sauce — dinner as a pile of shapes, each curl built to hold a bit more flavor.',
 'peach':'The velvet fruit: red-gold with a soft crease and one green leaf, fuzzy to the touch in a room full of shiny skin.',
 'pear':'Narrow at the stem, round at the bottom — a teardrop with a brown stem, the only silhouette on the shelf shaped quite that way.',
 'peas':'A teal bowl heaped with bright green balls, each one a pincer-grip exercise. The smallest food here and the finest finger workout.',
 'pineapple':'Golden chunks in an orange cup — sweet, tangy and juicy, with the spiky crown left in the story instead of on the plate.',
 'pizza':'One triangle slice with red pepperoni circles and a golden crust — the world\u2019s most famous triangle, served at every birthday since forever.',
 'potato':'A baked potato split open: brown jacket outside, fluffy white cloud inside. The humblest card on the tray and the one with three costumes.',
 'pretzel':'The only food on the tray that is also a knot — one long rope looped and twisted, baked brown and salted.',
 'pudding':'A clear cup of chocolate with a soft peak on top — dessert that wobbles when the table bumps and holds a finger-drawn road for exactly one minute.',
 'rice':'A teal bowl mounded with steamed white rice — thousands of tiny grains pretending to be one soft white hill.',
 'salad':'The garden in a green bowl: leaves, cucumber rounds and tomato wedges tossed together — lunch that was growing this morning.',
 'sandwich':'A triangle half with white bread and yellow cheese at the edge — any food between two breads earns the name, and this one shows the shape.',
 'soup':'An orange bowl of golden broth with little round pieces floating like boats — the food that arrives with its own rule: blow first.',
 'spaghetti':'A white plate of long noodles in red sauce with cheese dusted on top — dinner that requires a twirl, a slurp or both.',
 'strawberries':'Four glossy red hearts with green tops in a pink bowl — the fruit that wears its seeds on the outside, like tiny freckles.',
 'taco':'A yellow corn shell folded in half, holding seasoned meat, lettuce and tomato in an open cradle — a meal with its contents on display.',
 'toast':'One square slice of golden-brown toast with a crispy dotted face — bread that visited the fire and came back with new flavors.',
 'tomato':'Round, red and glossy with a green star-shaped stem on top like a little crown — the fruit-or-vegetable debate in its shiniest form.',
 'waffle':'A golden square with a deep grid of squares, seen from above — breakfast with a map on it and pockets that hold syrup like tiny cups.',
 'water':'A simple blue line-drawn cup, half full — no label, no color, no competition. The quietest card in the deck and the one the body asks for by itself.',
 'watermelon':'A red wedge with black seeds, white rind and green skin — the summer fruit whose name is also its recipe: mostly water.',
 'yogurt':'A pink-rimmed cup with the word Yogurt and a strawberry on the label — the creamy, tangy snack that turns banana slices into frozen coins.'};
if(Object.keys(CAF_INTRO).length!==62)throw Error('cafeteria: expected 62 short-page intros, got '+Object.keys(CAF_INTRO).length);
for(const s of CAF_ORDER)if(!CAF_INTRO[s])throw Error('cafeteria: no intro for '+s);

/* ---- The /cafeteria/ room page ------------------------------------------- */
function tile(s){const c=bySlug[s];const land=CAF_LANDSCAPE.includes(s);
 return `<a class="lp-tile${land?' caf-land':''}" href="${CAF_PATH}${s}/"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong></a>`;}

export function cafeteriaBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">SCHOOL ROOM \u00b7 THE CAFETERIA \u00b7 62 CARDS \u00b7 AGES 2\u20135</span><h1>The Cafeteria — every card carries a food on the tray.</h1><p class="lesson-lede">Sixty-two foods, sixty-two little activities: point to the apple, count the peas, match the sandwich, find the water. Every card names one cafeteria food and prints one activity under its name; every food has its own short page, its own lesson and a printable twin — and the room runs on the lunchroom\u2019s oldest rule: taste a little, name a lot, try the next one tomorrow.</p><div class="lesson-start"><a class="button" href="#the-foods">Open the food shelves <span aria-hidden="true">\u2193</span></a><a class="button button-ghost" href="/flashcards/cafeteria/">The printable set <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${CAF_BASE}${CAF_COVER.file}" width="${CAF_COVER.w}" height="${CAF_COVER.h}" alt="${esc(CAF_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS ROOM WORKS</span><h2>Read the card. Do the tiny activity. Then lunch tastes louder.</h2><p class="lesson-copy">Every card in this deck does two jobs: it names one food and it prints one activity — a pointing, counting, matching or finding game the card means literally. The short pages on this shelf show each card, quote its activity word for word, and add one way to set the food up tonight. When one food becomes a favorite, its <strong>lesson page</strong> carries the full teaching — what the food is, what the activity secretly trains, the parent script, the questions to ask — and the <strong>library page</strong> holds the printable twin with a download button.</p><p class="lesson-copy">The shelves run in file order like a real serving line: the first twenty-nine cards, apple through ham-sandwich, sit on the main shelf; the rest of the line — juice through yogurt — waits under <strong>More foods</strong>. For the foods\u2019 naming cousins, the <a href="/preschool/3-years/fruits-and-vegetables/">Fruits &amp; Vegetables class</a> names eight fruits and eight vegetables with their own lessons, and the <a href="/kitchen/">Kitchen Helper class</a> names the tools that prepare all of it.</p></section>`;
 const shelf1=`<section class="wrap lesson-section" id="the-foods"><span class="eyebrow">THE MAIN SHELF \u00b7 29 FOODS</span><h2>Meet the first shelf — apple to ham sandwich.</h2><p class="fc-hint">The first twenty-nine cards in file order: fruits and vegetables up front, the breakfast line and the mains right behind. Tap any card to open its short page.</p><div class="lp-tiles">${CAF_YOUNG.map(tile).join('')}</div></section>`;
 const shelf2=`<section class="wrap lesson-section" id="more-foods"><span class="eyebrow">MORE FOODS \u00b7 33 MORE</span><h2>The rest of the line — juice to yogurt.</h2><p class="fc-hint">Drinks, sides, sweets and the last mains: thirty-three more foods, same file order, same one-activity rule.</p><div class="lp-tiles">${CAF_MORE.map(tile).join('')}</div></section>`;
 const games=`<section class="wrap lesson-section"><span class="eyebrow">GAMES THE CAFETERIA PLAYS</span><h2>Between courses, play.</h2><p class="lesson-copy">Lunch tables run on games the way kitchens run on timers, and the school\u2019s <a href="/games/">games shelf</a> holds the rules for the ones this room plays best: <a href="/games/hot-potato/">Hot Potato</a> passes a pretend spud round the table to real music, <a href="/games/simon-says/">Simon Says</a> turns chew-like-a-rabbit and stir-like-a-spoon into listening practice, and the <a href="/games/treasure-hunt/">Treasure Hunt</a> hides food cards all over the room for a hungry little detective. Full rules on every page — dessert can wait.</p></section>`;
 const fit=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where to wander next.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/rooms/">Explore the School — every room, one door each <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/3-years/fruits-and-vegetables/">Name the fruits &amp; vegetables in Class 22 <span>· Ages 3–5</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/kitchen/">Meet the Kitchen Helper\u2019s tools <span>· Ages 3–6</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/healthy-food/">Eating well in Class 40 <span>· Ages 4–5</span> <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">The Cafeteria sits on the school\u2019s room shelf beside the Library, the Garden, the Playground, the Music Room, the Art Room and the Clubs. Class 22 is its naming cousin — the fruits and vegetables this room serves — the Kitchen Helper class is its tools-and-safety twin: what chops, pours and stirs the food this room dishes out, and the <a href="/healthy-food/">Healthy Food &amp; Eating Well class</a> is its eating-well shelf: twenty-one food-habit cards for ages 4–5, from the balanced plate to trying new foods, for families ready to turn the tray into the table.</p></section>`;
 return `${hero}${how}${shelf1}${shelf2}${games}${fit}<p class="lesson-note"><strong>Tasting is the curriculum.</strong> Every activity on these cards hides real work — pointing, counting, matching, waiting — inside something the child thinks is just lunch. Name the food first; the bravery follows the spoon.</p>`;
}

/* ---- One short page per food: card + activity + back link ---------------- */
export function cafShortBody(slug){
 const c=bySlug[slug];
 if(!c)throw Error('cafeteria: no card for '+slug);
 const action=CAF_ACTIONS[slug];
 const land=CAF_LANDSCAPE.includes(slug);
 const cousin=WORD_COUSINS[slug];
 const cousinBlock=cousin?`<p class="fc-hint">This food also stars in the Fruits &amp; Vegetables class — the <a href="${cousin[1]}">${esc(cousin[0])}</a> names it with its own lesson and printable card.</p>`:'';
 return `${crumbCaf(c.word)}
 <div class="page-heading wrap"><span class="eyebrow">THE CAFETERIA \u00b7 SCHOOL ROOM \u00b7 AGES 2\u20135</span><h1>${esc(c.word)}</h1><p>${CAF_INTRO[slug]}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main"><figure class="fc2-hero"><img class="${land?'caf-land':''}" src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}"><figcaption><strong>The ${esc(c.word)} card</strong><span>School Cafeteria Flashcards \u00b7 the card\u2019s own activity</span></figcaption></figure>
  <section class="fc2-learn" aria-label="The ${esc(c.word)} card\u2019s activity">
   <div class="fc2-do"><h2>The card\u2019s activity</h2><p class="dino-action">\u201c${esc(action)}\u201d — printed on the ${esc(c.word.toLowerCase())} card.</p></div>
   <div class="fc2-do"><h2>Do it now</h2><p>Put the card on the table and run the activity twice — once slow, once with full lunchroom confidence. The card is the assignment; the rest of this page is bonus.</p></div>
   <div class="fc2-do fc2-note"><h2>Keep going</h2><p>The ${esc(c.word)} has its own full lesson — what the food is, what the activity trains, the parent script and the questions to ask — plus a printable card page in the library.</p>${cousinBlock}</div>
  </section></div>
  <aside class="fc2-rail" aria-label="More cafeteria foods"><section class="fc2-block fc2-first-block"><span class="eyebrow">PART OF THE CAFETERIA</span><h2>Sixty-one more foods.</h2><p class="fc-hint">${esc(c.word)} is one of 62 foods on the Cafeteria shelf.</p><a class="button" href="${CAF_PATH}">Back to the Cafeteria <span aria-hidden="true">\u2197</span></a><a class="button button-ghost" href="/cafeteria/learn/${slug}/">The ${esc(c.word)} lesson <span aria-hidden="true">\u2197</span></a><a class="button button-ghost" href="/flashcards/cafeteria/${slug}/">Print the card <span aria-hidden="true">\u2197</span></a></section></aside>
 </div>`;
}
function crumbCaf(name){return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/rooms/">School Rooms</a><span aria-hidden="true">/</span><a href="${CAF_PATH}">Cafeteria</a><span aria-hidden="true">/</span><span aria-current="page">${esc(name)}</span></nav>`;}

/* ---- Cross-links the owner asked for (2026-10-26) ------------------------ */
/* Appended to the Kitchen Helper class: the tools room meets the food room. */
export const CAF_KITCHEN_LINK=`<section class="wrap lesson-section"><span class="eyebrow">WHERE THE FOOD COMES FROM</span><h2>Visit the Cafeteria.</h2><p class="lesson-copy">The Kitchen class names the tools — and the school\u2019s <a href="/cafeteria/">Cafeteria room</a> names what those tools make: sixty-two food cards for ages 2\u20135, from the apple to the yogurt cup, each with its own pointing, counting or matching activity. The knife chops, the tray serves, and every food on the tray has a short page, a full lesson and a printable twin. Tools here, lunch there — the two rooms finish each other.</p></section>`;
/* Appended to Class 22 Fruits & Vegetables: the naming class meets the lunch room. */
export const CAF_FRUITS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">AT LUNCHTIME</span><h2>Step into the Cafeteria.</h2><p class="lesson-copy">Class 22 names eight fruits and eight vegetables — and the school\u2019s <a href="/cafeteria/">Cafeteria room</a> serves them: sixty-two food cards for ages 2\u20135, where the apple, the banana, the grapes and the strawberry ride a whole tray of mains, sides, breakfasts and drinks. Every card carries its own activity — point, count, match, find — and every food has a short page, a lesson and a printable twin. Naming here, tasting there: the two shelves finish each other.</p></section>`;
