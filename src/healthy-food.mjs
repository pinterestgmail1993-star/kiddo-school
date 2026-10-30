// Kiddo School — LEARNING PATH · Class 40 · Healthy Food & Eating Well
// (Ages 4–5) at /healthy-food/ with one short page per card at
// /healthy-food/<slug>/ (owner brief 2026-10-30). Class 39 · Staying Safe is
// live at /staying-safe/, so this is the next class number in sequence: 40.
//
// DECK: 22 files probed live on R2 at school/learning-path/healthy-food/
// flashcards/ (22/22 HTTP 200 image/webp, every card 800×1131 portrait) —
// cover.webp (the deck's own "Healthy Food & Eating Well" cover, which leads
// the class page) + 21 cards. Unlike the Staying Safe deck these cards carry
// no rule banner: the big printed title IS the habit, so the short pages turn
// each title into the child's sentence and add one "try it tonight" idea.
//
// SHELVES: what's on the plate (the food groups), meals & drinks, and how we
// eat (the table habits). Download serves the full-size webp; Print isolates
// just that card (assets/manners.js is deck-agnostic).
//
// Owner cross-links: Class 22 (Fruits & Vegetables), Class 32 (Life Skills &
// Good Habits) and the Cafeteria room point here; the class page links back
// to all three. No Etsy mention anywhere (standing rule); no anchor jump
// links (owner rule); no existing URL changed.
import {R2} from './adventure-kit.mjs';

export const HF_PATH='/healthy-food/';
export const HF_BASE=R2+'school/learning-path/healthy-food/flashcards/';

/* File order, exactly as the owner uploaded them (cover.webp excluded — it
   is the class page's own cover). */
export const HF_ORDER=[
 'balanced-plate','breakfast','chew-well','dairy','dinner','eat-a-rainbow',
 'eat-slowly','eat-together','feel-full','fruit','good-energy',
 'healthy-choice','healthy-snack','lunch','protein','sit-down',
 'try-new-foods','vegetables','wash-your-hands','water','whole-grains'];

export const HF_COVER={file:'cover.webp',w:800,h:1131,
 alt:'Cover of the Kiddo School Healthy Food & Eating Well flashcards: a smiling green apple character giving a thumbs up above the words "Healthy Food & Eating Well".'};

const W=800,H=1131;
/* slug → display word, the card's say (the habit in a child's sentence —
   these cards carry no rule banner, the title is the message), the alt
   (authored from labeled contact sheets of the real artwork) and one
   try-it-tonight idea. No two ideas share a sentence. */
const CARDS=[
 ['balanced-plate','Balanced Plate','My plate has a little of everything','A Kiddo School Healthy Food card titled Balanced Plate: a strong-armed orange circle plate divided in four sections holding broccoli, a carrot, a chicken leg, bread, an apple and orange slices.','Try it tonight: build one real plate the card\u2019s way — a little from this shelf, a little from that — and let your child name each section before the first bite lands.'],
 ['breakfast','Breakfast','Breakfast starts my day','A Kiddo School Healthy Food card titled Breakfast: a flexing orange circle character behind a bowl of cereal, a slice of bread, a banana and a glass of milk.','Try it tonight: tonight\u2019s job is choosing tomorrow\u2019s breakfast — lay out two good options at bedtime and the morning eats itself.'],
 ['chew-well','Chew Well','I chew my food well','A Kiddo School Healthy Food card titled Chew Well: an orange carrot character thinks it over with a finger on its chin.','Try it tonight: one meal eaten at tortoise speed — count the chews together for one mouthful, then let your child teach the tortoise pace to the next bite.'],
 ['dairy','Dairy','Dairy builds me up','A Kiddo School Healthy Food card titled Dairy: a flexing blue circle character behind a milk carton, a glass of milk, a yogurt bowl and a wedge of cheese.','Try it tonight: name the dairy in the fridge — milk, cheese, yogurt — and pick which one joins tonight\u2019s plate; the strong arms on the card say what dairy does.'],
 ['dinner','Dinner','Dinner brings us together','A Kiddo School Healthy Food card titled Dinner: a smiling orange plate character holds a fork beside chicken and broccoli, giving a thumbs up.','Try it tonight: one fork carried to the table by the eater — dinner\u2019s job tonight is setting the plate, sitting down and starting together.'],
 ['eat-a-rainbow','Eat a Rainbow','I eat a rainbow of colors','A Kiddo School Healthy Food card titled Eat a Rainbow: a running bell-pepper character striped in rainbow colors, flexing as it goes.','Try it tonight: count the colors on tonight\u2019s plate out loud — two is a start, three is a rainbow night — and let your child pick the color the plate is missing for tomorrow.'],
 ['eat-slowly','Eat Slowly','I eat slowly','A Kiddo School Healthy Food card titled Eat Slowly: a peaceful green broccoli meditates cross-legged with a fork and spoon, eyes closed.','Try it tonight: the spoon takes the slow road — one calm mouthful at a time, spoons resting between bites, the broccoli\u2019s peaceful face as the pace to match.'],
 ['eat-together','Eat Together','We eat together','A Kiddo School Healthy Food card titled Eat Together: an orange carrot character holds up a fork, ready to share the meal.','Try it tonight: one meal where everybody sits at the same time — the eater who is ready first calls the family to the table, carrot fork raised.'],
 ['feel-full','Feel Full','Full is a good feeling to notice','A Kiddo School Healthy Food card titled Feel Full: a content green avocado half hugs its own belly with a happy, satisfied smile.','Try it tonight: the belly check — halfway through the meal ask \u201chow does your tummy feel?\u201d and practise noticing the difference between still-hungry and comfortably full.'],
 ['fruit','Fruit','Fruit is sweet all by itself','A Kiddo School Healthy Food card titled Fruit: a confident red apple with a big smile stands hands on hips.','Try it tonight: fruit after dinner as the pudding it is — the apple\u2019s proud stance is the whole point: sweet needs no wrapper.'],
 ['good-energy','Good Energy','Good food gives me energy','A Kiddo School Healthy Food card titled Good Energy: a green banana character runs along flexing its arms.','Try it tonight: run the banana\u2019s race — after a good snack, jump three jumps and feel the energy arrive; food goes in, zoom comes out.'],
 ['healthy-choice','Healthy Choice','I can make the healthy choice','A Kiddo School Healthy Food card titled Healthy Choice: a magenta apple character gives a big thumbs up.','Try it tonight: offer two options you are happy to say yes to — apple or banana, yogurt or cheese — and let your child make the healthy call all by themselves.'],
 ['healthy-snack','Healthy Snack','Snacks can be healthy too','A Kiddo School Healthy Food card titled Healthy Snack: a green apple character with thumbs up behind a bowl of berries, a yogurt cup and a banana.','Try it tonight: park the snack bowl where hands can reach it — washed berries, cut banana, a yogurt cup — and the between-meals choice makes itself.'],
 ['lunch','Lunch','Lunch refills me at midday','A Kiddo School Healthy Food card titled Lunch: a friendly orange sandwich character stands waving hello.','Try it tonight: build tomorrow\u2019s lunch sandwich together at tonight\u2019s counter — bread, filling, top on — and the midday refill is already made.'],
 ['protein','Protein','Protein makes me strong','A Kiddo School Healthy Food card titled Protein: a purple bean character flexes both arms with a determined grin.','Try it tonight: find tonight\u2019s strong food — the beans, the egg, the chicken — and name it the plate\u2019s muscle-maker before the first bite.'],
 ['sit-down','Sit Down','I sit down to eat','A Kiddo School Healthy Food card titled Sit Down: a blue broccoli character sits properly on a small chair, hands waiting.','Try it tonight: bottoms on chairs before forks move — the broccoli\u2019s patient pose is the rule, and the eating starts when the sitting does.'],
 ['try-new-foods','Try New Foods','I am brave enough to try','A Kiddo School Healthy Food card titled Try New Foods: a purple eggplant character gives an encouraging thumbs up.','Try it tonight: one no-thank-you bite — a real taste, not a swallow — of something new, and the thumbs-up stays on the table win, however the chewing goes.'],
 ['vegetables','Vegetables','Vegetables come from the garden','A Kiddo School Healthy Food card titled Vegetables: a bright yellow carrot with a leafy top smiles up from the shelf.','Try it tonight: pick tonight\u2019s vegetable and let your child be its wash-and-carry helper — a vegetable you prepared yourself is the easiest one to eat.'],
 ['wash-your-hands','Wash Your Hands','Clean hands before every meal','A Kiddo School Healthy Food card titled Wash Your Hands: a bubbly blue water-drop character gives a thumbs up covered in soap bubbles.','Try it tonight: the bubbles are the checkpoint — soap, scrub, rinse before the plate arrives, and the thumbs-up means hands passed inspection.'],
 ['water','Water','Water is my drink','A Kiddo School Healthy Food card titled Water: a big smiling blue water drop with bright eyes.','Try it tonight: pour the water together — the drop on the card is the family drink, and the child who pours it drinks proudest.'],
 ['whole-grains','Whole Grains','Whole grains keep me going','A Kiddo School Healthy Food card titled Whole Grains: a cheerful green bread slice character stands hands on hips.','Try it tonight: spot the brown bread in the basket and give it a job — the sandwich, the toast, the side — the little seeds on the card\u2019s bread are the tell.']]
 .map(([slug,word,say,alt,tryIt])=>({slug,file:slug+'.webp',w:W,h:H,word,say,alt,tryIt}));

export const HF_CARDS=CARDS;
export const hfBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

/* The three shelves — what's on the plate, meals & drinks, how we eat. */
export const HF_PLATE=['balanced-plate','fruit','vegetables','dairy','protein','whole-grains','eat-a-rainbow'];
export const HF_MEALS=['breakfast','lunch','dinner','healthy-snack','water','wash-your-hands'];
export const HF_HABITS=['sit-down','eat-slowly','chew-well','try-new-foods','healthy-choice','feel-full','eat-together','good-energy'];

/* Guards: exactly the owner's 21 cards in file order, shelves covering the
   deck with no gaps and no doubles, every entry complete. */
if(CARDS.length!==21)throw Error('healthy-food: expected 21 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==HF_ORDER.join('|'))throw Error('healthy-food: card order does not match HF_ORDER');
const shelved=[...HF_PLATE,...HF_MEALS,...HF_HABITS].sort().join('|');
if(shelved!==HF_ORDER.slice().sort().join('|'))throw Error('healthy-food: shelves must cover the deck exactly once');
for(const c of CARDS){
 if(c.alt.length<80)throw Error('healthy-food: thin alt for '+c.slug);
 if(c.say.length<3)throw Error('healthy-food: no say for '+c.slug);
 if(c.tryIt.length<60)throw Error('healthy-food: thin try-it for '+c.slug);
}

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

/* ---- The class page (Class 40) -------------------------------------------- */
function shelf(title,hint,slugs){
 return `<section class="wrap lesson-section"><span class="eyebrow">${esc(title)}</span><h2>${esc(hint)}</h2><div class="lp-tiles">${slugs.map(s=>{const c=hfBySlug[s];return `<a class="lp-tile" href="${HF_PATH}${s}/"><img src="${HF_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong></a>`;}).join('')}</div></section>`;
}

export function healthyFoodClassBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">LEARNING PATH \u00b7 CLASS 40 \u00b7 HEALTHY FOOD &amp; EATING WELL \u00b7 AGES 4\u20135</span><h1>Healthy Food &amp; Eating Well — twenty-one happy food habits.</h1><p class="lesson-lede">Twenty-one printable food cards for ages four to five, in three shelves: what\u2019s on the plate, meals &amp; drinks, and how we eat. Every card wears one big food habit in words a child can say back — and every card has its own short page that turns the habit into tonight\u2019s job. It all starts with the smiling cover apple: healthy food is not a lecture, it is a plate a child is proud of.</p><div class="lesson-start"><a class="button" href="${HF_PATH}balanced-plate/">Start with the Balanced Plate <span aria-hidden="true">\u2192</span></a><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${HF_BASE}${HF_COVER.file}" width="${HF_COVER.w}" height="${HF_COVER.h}" alt="${esc(HF_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>One habit. The child says it. Then the plate does the teaching.</h2><p class="lesson-copy">These cards carry no lectures — each one prints a single big habit: the balanced plate, chewing well, trying new foods, sitting down, washing hands first. The short pages turn every title into the child\u2019s own sentence and add one thing to try tonight that takes less than a minute to set up: two breakfast options laid out at bedtime, a tummy check halfway through dinner, one brave no-thank-you bite of something new. Food habits grow the same way the cards run — small, happy and repeated.</p><p class="lesson-copy">The shelves follow the meal. The plate shelf names the food groups a four-year-old actually sees — fruit, vegetables, dairy, protein, whole grains — and the rainbow rule that paints them. The meals shelf walks the day: breakfast, lunch, dinner, the healthy snack in between, water to drink and clean hands first. The habits shelf is how the table works: sit down, eat slowly, chew well, try new foods, notice full, eat together, make the healthy choice, feel the energy.</p></section>`;
 const plate=shelf('THE PLATE SHELF \u00b7 7 CARDS','What\u2019s on the plate — the food groups.','balanced-plate fruit vegetables dairy protein whole-grains eat-a-rainbow'.split(' '));
 const meals=shelf('THE MEALS SHELF \u00b7 6 CARDS','Meals & drinks — the day, plate by plate.','breakfast lunch dinner healthy-snack water wash-your-hands'.split(' '));
 const habits=shelf('THE HABITS SHELF \u00b7 8 CARDS','How we eat — the table habits.','sit-down eat-slowly chew-well try-new-foods healthy-choice feel-full eat-together good-energy'.split(' '));
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where the food learning grows.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/3-years/fruits-and-vegetables/">Name the fruits &amp; vegetables in Class 22 <span>\u00b7 Ages 3–5</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/life-skills-and-good-habits/">Everyday habits in Class 32 <span>\u00b7 Ages 4–5</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/cafeteria/">The Cafeteria\u2019s sixty-two food cards <span>\u00b7 Ages 2–5</span> <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Class 22 names the fruits and vegetables this class serves; Class 32 builds the hand-washing and helping habits this table runs on; and the school\u2019s Cafeteria room keeps sixty-two food cards with their own activities — every tray food named, counted and pointed at. Naming here, tasting there: the shelves finish each other.</p></section>`;
 return `${hero}${how}${plate}${meals}${habits}${around}<p class="lesson-note"><strong>A plate a child helped build is a plate a child will eat.</strong> Every card here hands the habit to the child — the choosing, the washing, the trying — and the grown-up\u2019s whole job is to keep the options worthy of a yes.</p>`;
}

/* ---- One short page per card: card + habit + tonight + back link ---------- */
export function hfShortBody(slug){
 const c=hfBySlug[slug];
 if(!c)throw Error('healthy-food: no card for '+slug);
 return `${crumbHf(c.word)}
 <div class="page-heading wrap"><span class="eyebrow">HEALTHY FOOD &amp; EATING WELL \u00b7 CLASS 40 \u00b7 AGES 4\u20135</span><h1>${esc(c.word)}</h1><p>The ${esc(c.word.toLowerCase())} card from Class 40 \u00b7 Healthy Food &amp; Eating Well — one happy habit, said by the child, tried tonight.</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main"><figure class="fc2-hero mn-card"><img src="${HF_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}"><figcaption><strong>${esc(c.word)}</strong><span>Class 40 \u00b7 Healthy Food \u00b7 the card\u2019s own habit</span></figcaption><div class="mn-actions"><a class="button" href="${HF_BASE}${c.file}" download="${c.slug}.webp">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>
  <section class="fc2-learn" aria-label="The ${esc(c.word)} habit">
   <div class="fc2-do"><h2>The card\u2019s habit</h2><p class="dino-action">\u201c${esc(c.say)}\u201d — the ${esc(c.word.toLowerCase())} card\u2019s big words, in the child\u2019s voice.</p></div>
   <div class="fc2-do"><h2>Try it tonight</h2><p>${esc(c.tryIt).replace(/^Try it tonight: /,'')}</p></div>
   <div class="fc2-do fc2-note"><h2>Keep going</h2><p>This page is one of twenty-one cards in <a href="${HF_PATH}">Class 40 \u00b7 Healthy Food &amp; Eating Well</a> — the whole plate, the meals shelf and the table habits are one click away. For more foods to name, the <a href="/cafeteria/">Cafeteria room</a> keeps sixty-two food cards with activities of their own.</p></div>
  </section></div>
  <aside class="fc2-rail" aria-label="More Healthy Food cards"><section class="fc2-block fc2-first-block"><span class="eyebrow">PART OF CLASS 40</span><h2>Twenty more cards.</h2><p class="fc-hint">${esc(c.word)} is one of 21 cards on the Healthy Food shelf.</p><a class="button" href="${HF_PATH}">Back to Healthy Food <span aria-hidden="true">\u2197</span></a><a class="button button-ghost" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a></section></aside>
 </div>`;
}
function crumbHf(name){return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/learning-path/">Learning Path</a><span aria-hidden="true">/</span><a href="${HF_PATH}">Healthy Food</a><span aria-hidden="true">/</span><span aria-current="page">${esc(name)}</span></nav>`;}

/* ---- Cross-links the owner asked for (2026-10-30) ------------------------- */
/* Appended to Class 22 · Fruits & Vegetables. */
export const HF_FRUITS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">FROM NAMING TO EATING WELL</span><h2>Class 40 \u00b7 Healthy Food &amp; Eating Well.</h2><p class="lesson-copy">Class 22 names the fruits and vegetables — and the <a href="/healthy-food/">Healthy Food &amp; Eating Well class</a> serves them: twenty-one printable food cards for ages 4–5 in three shelves (the plate, the meals, the table habits), every card wearing one big habit a child can say back — the balanced plate, eat a rainbow, try new foods — each with its own short page and one thing to try at tonight\u2019s table. Naming the food is step one; this class is what happens at the table next.</p></section>`;
/* Appended to Class 32 · Life Skills & Good Habits. */
export const HF_LIFE_SKILLS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">HABITS AT THE TABLE</span><h2>Class 40 \u00b7 Healthy Food &amp; Eating Well.</h2><p class="lesson-copy">Class 32 builds the daily habits — hand-washing, helping, asking for help — and the <a href="/healthy-food/">Healthy Food &amp; Eating Well class</a> grows the same skills at the table: twenty-one printable food cards for ages 4–5, from wash-your-hands and sit-down to try-new-foods and feel-full, each with its own short page and one tiny thing to try tonight. Same habit method, happier plates.</p></section>`;
