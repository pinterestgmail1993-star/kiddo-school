// Kiddo School — SCHOOL ROOM · The Cafeteria: flashcard content. The 62 food
// cards are the owner's uploads, verified live on R2 under school/cafeteria/
// (63/63 objects HTTP 200 image/webp — 62 cards + 1 cover; the owner uploaded
// the deck directly into cafeteria/ rather than the brief's
// school/rooms/cafeteria/flashcards/, so r2Base points at the real location —
// the fourth deck in a row at the top level). Filenames are used exactly as
// uploaded — nothing renamed, nothing invented. The cover ("School Cafeteria
// Flashcards" over a line-drawn lunch tray with a milk carton, an apple, a
// sandwich and a fork) fronts the set and is never counted as a card.
// DISPLAY ORDER: cover first, then the cards in file order (apple to yogurt).
// SHELVES (owner rule): the first 29 cards (apple through ham-sandwich) are
// the main shelf; the remaining 33 (juice through yogurt) sit under "More
// foods". LANDSCAPE: apple, banana, cafeteria-tray, juice, milk and sandwich
// are 1100×778 — the room renders them with object-fit: contain (owner rule).
// Every card prints one ACTIVITY line under its name; the activity text below
// is transcribed VERBATIM from the artwork (labeled contact sheets,
// scripts/caf-sheets.py). The room page /cafeteria/ hosts the short pages at
// /cafeteria/<slug>/ (card + the card's activity + back link), the
// /cafeteria/learn/ lessons (lp-cafeteria.mjs via LP_REGISTRY) carry the
// step-by-step teaching, and the library holds the printable twins at
// /flashcards/cafeteria/. No text is shared between the three shelves.
// Owner cross-links (2026-10-26): Explore the School (/rooms/), Class 22
// Fruits & Vegetables and the Kitchen Helper class point here, and this room
// links back to all three. Five words already have pages in the Fruits &
// Vegetables set (apple, banana, carrot, grapes, strawberry): their URLs are
// kept untouched and each gains a link to its cafeteria version — the
// owner-pinned friend-link pattern.
import {R2} from '../adventure-kit.mjs';
import {CAF_LIB_A} from './caf-lib-a.mjs';
import {CAF_LIB_B} from './caf-lib-b.mjs';
import {CAF_LIB_C} from './caf-lib-c.mjs';

export const CAF_BASE=R2+'school/cafeteria/';

/* File order, exactly as the owner uploaded them (alphabetical). */
export const CAF_ORDER=[
 'apple','applesauce','bagel','banana','blueberries','bread','broccoli',
 'burrito','cafeteria-tray','carrots','celery','cereal','cheese','chicken-nuggets',
 'chicken','chocolate-milk','cookie','corn','crackers','cucumber','egg','fish',
 'french-fries','fruit-salad','granola-bar','grapes','green-beans','grilled-cheese',
 'ham-sandwich','juice','lemonade','mac-and-cheese','mashed-potatoes','meatballs',
 'melon','milk','muffin','oatmeal','orange','pancake','pasta','peach','pear','peas',
 'pineapple','pizza','potato','pretzel','pudding','rice','salad','sandwich','soup',
 'spaghetti','strawberries','taco','toast','tomato','waffle','water','watermelon',
 'yogurt'];

/* The owner's two shelves: the first 29 cards, then "More foods". */
export const CAF_YOUNG=CAF_ORDER.slice(0,29);
export const CAF_MORE=CAF_ORDER.slice(29);
if(CAF_YOUNG.length!==29)throw Error('cafeteria: expected 29 cards on the first shelf, got '+CAF_YOUNG.length);
if(CAF_MORE.length!==33)throw Error('cafeteria: expected 33 cards under More foods, got '+CAF_MORE.length);
if(CAF_YOUNG[0]!=='apple'||CAF_YOUNG[28]!=='ham-sandwich')throw Error('cafeteria: first shelf must run apple to ham-sandwich');
if(CAF_MORE[0]!=='juice'||CAF_MORE[32]!=='yogurt')throw Error('cafeteria: More foods must run juice to yogurt');

/* The six landscape cards (1100×778) — rendered with object-fit: contain. */
export const CAF_LANDSCAPE=['apple','banana','cafeteria-tray','juice','milk','sandwich'];

/* slug → the card's own ACTIVITY line, transcribed verbatim from the artwork. */
export const CAF_ACTIONS={
 'apple':'Point to the apple',
 'applesauce':'Point to the applesauce',
 'bagel':'Name the breakfast food',
 'banana':'Count one banana',
 'blueberries':'Count the berries',
 'bread':'Count one bread roll',
 'broccoli':'Match the broccoli',
 'burrito':'Find the burrito',
 'cafeteria-tray':'Match the tray',
 'carrots':'Count the carrots',
 'celery':'Count the celery sticks',
 'cereal':'Name the cereal',
 'cheese':'Match the cheese',
 'chicken-nuggets':'Count the nuggets',
 'chicken':'Match the chicken',
 'chocolate-milk':'Name the drink',
 'cookie':'Match the cookie',
 'corn':'Name the corn',
 'crackers':'Count the crackers',
 'cucumber':'Name the vegetable',
 'egg':'Match the egg',
 'fish':'Match the fish',
 'french-fries':'Count the fries',
 'fruit-salad':'Find the fruit salad',
 'granola-bar':'Find the granola bar',
 'grapes':'Point to the grapes',
 'green-beans':'Find the green beans',
 'grilled-cheese':'Match the sandwich',
 'ham-sandwich':'Point to the sandwich',
 'juice':'Point to the juice',
 'lemonade':'Point to the lemonade',
 'mac-and-cheese':'Point to the mac and cheese',
 'mashed-potatoes':'Point to the potatoes',
 'meatballs':'Find the meatballs',
 'melon':'Name the fruit',
 'milk':'Find the milk',
 'muffin':'Point to the muffin',
 'oatmeal':'Name the breakfast food',
 'orange':'Name the fruit',
 'pancake':'Point to the pancake',
 'pasta':'Point to the pasta',
 'peach':'Match the fruit',
 'pear':'Name the fruit',
 'peas':'Count the peas',
 'pineapple':'Name the fruit',
 'pizza':'Point to the pizza',
 'potato':'Find the potato',
 'pretzel':'Match the pretzel',
 'pudding':'Find the pudding',
 'rice':'Name the rice',
 'salad':'Match the salad',
 'sandwich':'Name the sandwich',
 'soup':'Point to the soup',
 'spaghetti':'Find the spaghetti',
 'strawberries':'Name the fruit',
 'taco':'Point to the taco',
 'toast':'Match the toast',
 'tomato':'Find the tomato',
 'waffle':'Find the waffle',
 'water':'Find the water',
 'watermelon':'Find the fruit',
 'yogurt':'Find the yogurt'};

export const CAF_COVER={file:'cover.webp',w:800,h:1132,
 alt:'Cover of the School Cafeteria Flashcards set: the words "School Cafeteria Flashcards" over a line-drawn lunch tray holding a milk carton, an apple, a sandwich and a fork.'};

const P=800,H=1132,LW=1100,LH=778;
const CARDS=[
 {slug:'apple',file:'apple.webp',w:LW,h:LH,alt:'A School Cafeteria flashcard titled Apple: a shiny red apple with a green leaf and a small stem, drawn in flat colors.'},
 {slug:'applesauce',file:'applesauce.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Applesauce: an open cup of smooth golden applesauce with a red wrapper.'},
 {slug:'bagel',file:'bagel.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Bagel: a plain golden-brown bagel with a shiny crust and a round hole in the middle.'},
 {slug:'banana',file:'banana.webp',w:LW,h:LH,alt:'A School Cafeteria flashcard titled Banana: one whole yellow banana beside a half-peeled banana in green-tinted peel.'},
 {slug:'blueberries',file:'blueberries.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Blueberries: a blue cup filled with round dark-blue blueberries.'},
 {slug:'bread',file:'bread.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Bread: a round golden loaf with three diagonal slashes scored across the top.'},
 {slug:'broccoli',file:'broccoli.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Broccoli: one green broccoli crown with a thick stalk and bumpy florets.'},
 {slug:'burrito',file:'burrito.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Burrito: a rolled tortilla wrap showing beans, rice and vegetables at the open end.'},
 {slug:'cafeteria-tray',file:'cafeteria-tray.webp',w:LW,h:LH,alt:'A School Cafeteria flashcard titled Cafeteria Tray: a purple five-compartment lunch tray with a round white plate in the middle.'},
 {slug:'carrots',file:'carrots.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Carrots: three whole orange carrots lying together with green leafy tops.'},
 {slug:'celery',file:'celery.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Celery: two crisp green celery stalks with pale ribs, crossed diagonally.'},
 {slug:'cereal',file:'cereal.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Cereal: a teal bowl of ring-shaped cereal pieces in a splash of milk.'},
 {slug:'cheese',file:'cheese.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Cheese: one square slice of yellow cheese angled like a diamond.'},
 {slug:'chicken-nuggets',file:'chicken-nuggets.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Chicken Nuggets: five golden breaded nuggets piled in a small cluster.'},
 {slug:'chicken',file:'chicken.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Chicken: a roasted drumstick with crinkled golden-brown skin and a bone at the end.'},
 {slug:'chocolate-milk',file:'chocolate-milk.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Chocolate Milk: a small carton with the words Chocolate Milk over a brown splash.'},
 {slug:'cookie',file:'cookie.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Cookie: a round brown cookie with wavy edges and dark chocolate chips.'},
 {slug:'corn',file:'corn.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Corn: one whole yellow corn cob with rows of kernels pointing diagonally.'},
 {slug:'crackers',file:'crackers.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Crackers: three square saltine crackers with dotted holes, stacked overlapping.'},
 {slug:'cucumber',file:'cucumber.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Cucumber: a dark green cucumber with three round slices cut from the end.'},
 {slug:'egg',file:'egg.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Egg: one smooth white egg standing upright with a soft shadow.'},
 {slug:'fish',file:'fish.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Fish: a cooked white fish fillet with golden seasoning flakes on top.'},
 {slug:'french-fries',file:'french-fries.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled French Fries: a white carton full of golden fries standing at different heights.'},
 {slug:'fruit-salad',file:'fruit-salad.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Fruit Salad: a pink bowl heaped with strawberries, kiwi, grapes, melon and pineapple chunks.'},
 {slug:'granola-bar',file:'granola-bar.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Granola Bar: one rectangular oat bar with visible oats and raisins, standing on its corner.'},
 {slug:'grapes',file:'grapes.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Grapes: a full purple bunch of round grapes hanging from a curly green stem.'},
 {slug:'green-beans',file:'green-beans.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Green Beans: a pile of long slim green beans crossed like pick-up sticks.'},
 {slug:'grilled-cheese',file:'grilled-cheese.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Grilled Cheese: a golden toasted sandwich with melted orange cheese dripping at the edge.'},
 {slug:'ham-sandwich',file:'ham-sandwich.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Ham Sandwich: two slices of soft white bread with pink ham and lettuce showing between them.'},
 {slug:'juice',file:'juice.webp',w:LW,h:LH,alt:'A School Cafeteria flashcard titled Juice: a small orange juice box with an apple on the front and a straw poking out the top.'},
 {slug:'lemonade',file:'lemonade.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Lemonade: a tall glass of pale yellow lemonade with ice cubes and a lemon slice on the rim.'},
 {slug:'mac-and-cheese',file:'mac-and-cheese.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Mac and Cheese: an orange bowl heaped with curved macaroni in cheese sauce.'},
 {slug:'mashed-potatoes',file:'mashed-potatoes.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Mashed Potatoes: a lavender bowl of creamy white mashed potatoes with a soft swirl on top.'},
 {slug:'meatballs',file:'meatballs.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Meatballs: three round brown meatballs in a red bowl with a light sauce.'},
 {slug:'melon',file:'melon.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Melon: a green cup of cubed pale-green honeydew melon chunks.'},
 {slug:'milk',file:'milk.webp',w:LW,h:LH,alt:'A School Cafeteria flashcard titled Milk: a blue and white milk carton with the word Milk and a splash of white across it.'},
 {slug:'muffin',file:'muffin.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Muffin: a golden blueberry muffin with a domed top and dark berries baked in.'},
 {slug:'oatmeal',file:'oatmeal.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Oatmeal: a cream-colored bowl filled with cooked oatmeal in soft swirls.'},
 {slug:'orange',file:'orange.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Orange: one round bright-orange orange with a green leaf on its stem.'},
 {slug:'pancake',file:'pancake.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Pancake: one thick golden pancake with a lacy browned surface seen from above.'},
 {slug:'pasta',file:'pasta.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Pasta: a red bowl filled with cooked elbow macaroni in a light sauce.'},
 {slug:'peach',file:'peach.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Peach: one round red-and-gold peach with a green leaf and a soft crease down the side.'},
 {slug:'pear',file:'pear.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Pear: one yellow-green pear with a small brown stem, standing upright.'},
 {slug:'peas',file:'peas.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Peas: a teal bowl heaped with bright green round peas.'},
 {slug:'pineapple',file:'pineapple.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Pineapple: an orange cup of golden pineapple chunks.'},
 {slug:'pizza',file:'pizza.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Pizza: one triangle slice of cheese pizza with red pepperoni circles and a golden crust.'},
 {slug:'potato',file:'potato.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Potato: one baked brown potato split open with fluffy white potato inside.'},
 {slug:'pretzel',file:'pretzel.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Pretzel: a classic twisted brown pretzel with salt speckles and a knot in the middle.'},
 {slug:'pudding',file:'pudding.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Pudding: a clear plastic cup of chocolate pudding with a soft peak on top.'},
 {slug:'rice',file:'rice.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Rice: a teal bowl mounded with steamed white rice.'},
 {slug:'salad',file:'salad.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Salad: a green bowl of leafy salad with cucumber rounds and tomato wedges.'},
 {slug:'sandwich',file:'sandwich.webp',w:LW,h:LH,alt:'A School Cafeteria flashcard titled Sandwich: a triangle sandwich half with white bread and melting yellow cheese at the edge.'},
 {slug:'soup',file:'soup.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Soup: an orange bowl of golden soup with little round pasta pieces floating on top.'},
 {slug:'spaghetti',file:'spaghetti.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Spaghetti: a white plate of spaghetti in red sauce with a dusting of grated cheese.'},
 {slug:'strawberries',file:'strawberries.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Strawberries: a pink bowl filled with four whole red strawberries with green tops.'},
 {slug:'taco',file:'taco.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Taco: a yellow corn taco shell filled with seasoned meat, lettuce and tomato.'},
 {slug:'toast',file:'toast.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Toast: one square slice of golden-brown toast with a crispy dotted surface.'},
 {slug:'tomato',file:'tomato.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Tomato: one round red tomato with a green star-shaped stem on top.'},
 {slug:'waffle',file:'waffle.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Waffle: one golden square waffle with a deep grid of squares, seen from above.'},
 {slug:'water',file:'water.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Water: a simple blue line-drawn cup half full of water, with an ellipse at the rim.'},
 {slug:'watermelon',file:'watermelon.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Watermelon: a red watermelon wedge with black seeds, white rind and green skin.'},
 {slug:'yogurt',file:'yogurt.webp',w:P,h:H,alt:'A School Cafeteria flashcard titled Yogurt: a pink-rimmed yogurt cup with the word Yogurt and a strawberry on the label.'}];

/* Guards: file order must hold, every card complete, activities present. */
if(CARDS.length!==62)throw Error('cafeteria: expected 62 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==CAF_ORDER.join('|'))throw Error('cafeteria: card order does not match CAF_ORDER');
for(const c of CARDS){
 if(!CAF_ACTIONS[c.slug])throw Error('cafeteria: missing activity for '+c.slug);
 if(!c.alt||c.alt.length<80)throw Error('cafeteria: thin alt for '+c.slug);
 const land=CAF_LANDSCAPE.includes(c.slug);
 if(land&&(c.w!==1100||c.h!==778))throw Error('cafeteria: landscape card wrong dims '+c.slug);
 if(!land&&(c.w!==800||c.h!==1132))throw Error('cafeteria: portrait card wrong dims '+c.slug);
}

export const lesson={
 r2Base:CAF_BASE,
 folder:'',
 path:'/cafeteria/',
 seoTitle:'School Cafeteria Flashcards (School Room)',
 cover:{w:800,h:1132},
 cards:CARDS
};

export const meta={
 slug:'cafeteria',
 name:'Cafeteria',
 seoTitle:'Cafeteria Food Flashcards for Kids — 62 Printable Cards with Activities (Ages 2–5)',
 h1:'Cafeteria food flashcards.',
 metaDescription:'Sixty-two printable cafeteria food flashcards for ages 2–5: fruits, vegetables, main dishes, breakfast, drinks and snacks — every card carries its own pointing, counting or matching activity, an age pill, a short page and a download button. Name lunch, count lunch, match lunch.',
 lede:'Sixty-two foods, sixty-two things to do with them. Each card names one cafeteria item — the apple, the spaghetti, the milk carton — and prints one activity under its name: point to the apple, count the peas, match the sandwich. Each food has its own short page, a full lesson and a printable twin in the library. Little lunches start with the tray card and grow one food at a time.',
 hubBlurb:'Fruits, mains, breakfast and drinks — sixty-two cafeteria foods, each with a point-and-say activity on the card.',
 ageLabel:'2–5 years',
 noun:'Toddlers',
 group:'preschool',
 stageName:null,
 stageHref:null,
 classUrl:'/cafeteria/',
 classBtn:'Open the Cafeteria',
 // Lesson-page framing: the Cafeteria hosts lessons but sits OFF the
 // Learning Path, so its /learn/ pages breadcrumb through School Rooms.
 lessonCrumb:[['School Rooms','/rooms/']],
 lessonEyebrow:'CAFETERIA LESSON',
 lessonLine:'room — with every lesson one tap away.',
 pillGroups:[
  ['Fruits','The sweet shelf: the fruits a lunch tray carries, from the apple to the watermelon wedge.',['apple','applesauce','banana','blueberries','fruit-salad','grapes','melon','orange','peach','pear','pineapple','strawberries','watermelon']],
  ['Vegetables & sides','The green and growing crew: vegetables and the sides that come with the main dish.',['broccoli','carrots','celery','corn','cucumber','green-beans','mashed-potatoes','peas','potato','salad','tomato']],
  ['Main dishes','The big middle of the tray: the meals a cafeteria ladles out at noon.',['burrito','chicken','chicken-nuggets','fish','grilled-cheese','ham-sandwich','mac-and-cheese','meatballs','pasta','pizza','rice','sandwich','soup','spaghetti','taco']],
  ['Breakfast','The morning line: everything the cafeteria serves before the bell.',['bagel','cereal','egg','muffin','oatmeal','pancake','toast','waffle']],
  ['Drinks','What pours beside the food: the milk, the water and the two sweet sips.',['chocolate-milk','juice','lemonade','milk','water']],
  ['Bakery & snacks','The crusts, crunches and little sweets around the edges of lunch.',['bread','cheese','cookie','crackers','french-fries','granola-bar','pretzel','pudding','yogurt']],
  ['The room itself','The one card that is the whole room: the tray everything lands on.',['cafeteria-tray']]
 ],
 useIdeas:[
  ['Set the real tray','Put a real plate, cup and napkin on the table, deal three cards, and let the child build a matching lunch — card to table, table to card. Real trays eat the learning.'],
  ['Cafeteria queue','Line the cards up like a serving line: main dish first, sides next, drink last. Walking a toy along the line and choosing one of each is the whole lunch ritual in miniature.'],
  ['Count the shelf','Deal five counting cards — the peas, the carrots, the berries — and count every picture out loud. Food is the friendliest counting material in the house.'],
  ['Pack the pretend lunch','Pick one main dish card, one fruit, one drink and slide them into a paper bag. Unpacking and naming the bag\u2019s lunch is a game that repeats all week.']
 ],
 downloadHint:'Every card page has its own download button with the full-size image.',
 coverAlt:CAF_COVER.alt,
 lessonBlurb:'the Cafeteria, where every card names one food on the tray',
 relatedSets:['fruits-and-vegetables','kitchen']
};

/* Card-page content (WHAT the card is, HOW to run its activity) — authored
   fresh, never shared with the /learn/ lessons or the /cafeteria/ short
   pages. Split across three modules to keep each file honest to edit. */
export const cards={...CAF_LIB_A,...CAF_LIB_B,...CAF_LIB_C};
if(Object.keys(cards).length!==62)throw Error('cafeteria: expected 62 card copies, got '+Object.keys(cards).length);
