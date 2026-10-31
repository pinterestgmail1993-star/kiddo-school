/* Kiddo School — CLASS 42 · Measuring & Money (Ages 4–5): the Learning Path
   class page at /measuring-and-money/ (owner brief 2026-10-31, numbered 42 by
   the no-skip rule: Class 41 · Time & Daily Routine is live at
   /time-and-daily-routine/). The deck was probed LIVE on R2 on 2026-10-31:
   29/29 files HTTP 200 image/webp at school/learning-path/measuring-and-money/
   flashcards/ — 28 cards + the cover, every file 800×1132, 38–74 kB. File
   names ride EXACTLY as uploaded (owner: "they are SEO names for Google Image
   search"); the owner's seo.csv was not present, so page slugs ride the file
   names (minus the shared -flashcard-for-kids suffix) and card titles + alt
   text were transcribed verbatim off the artwork via 4 labeled contact sheets
   (scripts/mm-lab-contactsheets.py — every card face read).
   ONE PAGE ONLY (standing owner rule 2026-10-31: "remember no indiviual
   pages"): the class page IS the deck — five sections, every card with its
   image (loading="lazy" + width/height), age/subject/level/skill pills, a
   small kid-directed description under the picture, and Download + Print
   buttons (manners.js per-card print isolation). Level pills name school
   grades (owner: "levels are grade 1, grade 2, preschool"): Preschool ·
   Grade 1 · Grade 2 — 17/6/5, guarded below. Copy uses what USA parents
   search (printable math flashcards, counting, measuring, money math) and
   talks to kids directly; the owner's word-ban ("no sign up", "no paywall",
   "free to use", "no account", "free forever") is a lock. The cover file is
   the class page's main image (owner rule) and fronts the og:image so the
   deck joins the image sitemap. Inbound links: Class 35 (Numbers, Counting &
   Early Math), Class 19 (Opposites & Comparing) and Class 31 (Science,
   Nature & Discovery) point here; the class page links back to all three,
   the Learning Path and the class count goes forty-one → forty-two. */
import {R2} from './adventure-kit.mjs';

export const MM_PATH='/measuring-and-money/';
export const MM_BASE=R2+'school/learning-path/measuring-and-money/flashcards/';

/* File order, exactly as the owner uploaded them (sorted); the page slug is
   the file name minus the shared -flashcard-for-kids suffix; cover.webp is
   the class page's own main image, not a card. */
export const MM_ORDER=['addition-adding-groups','counting-1-to-10','day-and-night','equal-same-amount',
 'full-and-empty-capacity','heavy-and-light-comparing-weight','in-front-and-behind','inside-and-outside',
 'left-and-right','long-and-short-comparing-length','measuring-height','measuring-length-ruler',
 'money-coins-price-change','more-and-less-comparing-groups','near-and-far-distance','number-bonds',
 'numbers-1-to-20','odd-and-even-numbers','same-and-different','shapes-circle-square-triangle-rectangle',
 'simple-fractions-whole-half-quarter','sorting-and-grouping','subtraction-taking-away','tens-and-ones',
 'thick-and-thin','top-and-bottom','weight-and-balance-scale','wide-and-narrow'];

export const MM_COVER={file:'measuring-and-money-flashcards-for-kids-cover.webp',w:800,h:1132,
 alt:'Cover of the Kiddo School Measuring & Money flashcards: a smiling ruler, a happy balance scale, gold and silver coins and a boy holding a 123 sign above the words "Measuring & Money Flashcards — Early Math Concepts".'};

const W=800,H=1132;
/* slug → word (the card's printed title), sub (subject pill), say (the card's
   rule + one kid-directed job, transcribed/composed from the artwork — the
   description under the image), alt (SEO alt from the verified artwork). */
const CARDS=[
 ['addition-adding-groups','Addition','Numbers','Addition means putting groups together to find how many there are altogether. Count the first group, then the next — put them together and say the total!','A Kiddo School Measuring & Money card titled Addition: two groups of apples, balloons, cars and beach balls joined by plus signs, with the words add, plus and altogether and the sum 3 + 2 = 5.'],
 ['counting-1-to-10','Counting 1 to 10','Numbers','Counting tells us how many things there are. Touch or point to each thing once as you say the numbers in order — count each thing one time.','A Kiddo School Measuring & Money card titled Counting 1 to 10: one apple, two balloons, three ducks, four cats, five stars and ten frogs beside the numerals, with the words count, how many and 1–10.'],
 ['day-and-night','Day and Night','Time words','Day is when the sun is up and we can see light. Night is when the sun is down and the sky is dark. Which one is out your window right now?','A Kiddo School Measuring & Money card titled Day and Night: a boy playing soccer in the sunshine beside a sleeping boy under the moon and stars, with a clock between the day and night scenes.'],
 ['equal-same-amount','Equal','Sorting & matching','Equal means the same amount — both sides have the same value. Line up two groups: do they match, or does one side have more?','A Kiddo School Measuring & Money card titled Equal: plates of cookies, block towers, balloon-carrying kids and teddy bears on a balance, each pair joined by the equals sign with the words equal and same.'],
 ['full-and-empty-capacity','Full and Empty','Measuring & comparing','Full means there is no more space left. Empty means there is nothing inside. Look inside your cup — is it full, empty, or in between?','A Kiddo School Measuring & Money card titled Full and Empty: a full smiling cup beside an empty sad cup, a fishbowl, a lunchbox and a jar of apples labeled more, none and more.'],
 ['heavy-and-light-comparing-weight','Heavy and Light','Measuring & comparing','Heavy things need more effort to lift; light things are easier to lift. Pick up two things nearby — which one is heavier? A big thing is not always heavy!','A Kiddo School Measuring & Money card titled Heavy and Light: a mouse lifting a feather and a mouse straining under a watermelon, a balance weighing lighter and heavier, and a boy holding a balloon and a backpack.'],
 ['in-front-and-behind','In Front and Behind','Position words','In front means an object is closer to the person looking. Behind means it is farther back or partly covered. Look at your toys — which one is in front?','A Kiddo School Measuring & Money card titled In Front and Behind: a rabbit in front of a tree, a boy in front of a chair, a backpack behind a boy and a car in front of a teddy, each scene labeled.'],
 ['inside-and-outside','Inside and Outside','Position words','Inside means something is within a space or container. Outside means it is not. Check where things are — is the cat inside or outside?','A Kiddo School Measuring & Money card titled Inside and Outside: a dinosaur popping out of a box, a cat inside a doghouse beside a dog outside it, and a boy sorting blocks into baskets labeled in, out and inside.'],
 ['left-and-right','Left and Right','Position words','Your left hand and your right hand are on different sides of your body. Look at each object — which side is it on, left or right?','A Kiddo School Measuring & Money card titled Left and Right: two boys pointing left and right, a monkey left of a tree and an elephant right of it, a ball left of a box, and two hands marking this side and that side.'],
 ['long-and-short-comparing-length','Long and Short','Measuring & comparing','Long means it reaches far; short means it does not reach as far. Compare two things and look at the ends — which one is longer?','A Kiddo School Measuring & Money card titled Long and Short: a long giraffe scarf and a short one, a long pencil and a short one, and a long worm and a short worm labeled longer and shorter.'],
 ['measuring-height','Measuring Height','Measuring & comparing','Height tells us how tall something is from the bottom to the top. Stand up straight against a wall — can you measure from the bottom to the top?','A Kiddo School Measuring & Money card titled Measuring Height: a tall giraffe and a boy against a height chart, a short penguin, and block towers labeled tall and short above a bottom-to-top arrow.'],
 ['measuring-length-ruler','Measuring Length','Measuring & comparing','Measuring tells us how long or short something is. Put the ruler at the very beginning of the object, then count the marks from one end to the other.','A Kiddo School Measuring & Money card titled Measuring Length: a boy measuring a banana, a ruler beside a toy train, a measuring tape beside a sneaker and a book labeled ruler, measure and long.'],
 ['money-coins-price-change','Money','Money','Money helps us buy things. A price tells how much something costs, and change is the money back when you pay too much. Count the money before you pay!','A Kiddo School Measuring & Money card titled Money: a boy paying a grocer for an apple, a smiling coin, a price tag marked 5, coins being counted and a piggy bank labeled price, counting and save.'],
 ['more-and-less-comparing-groups','More and Less','Sorting & matching','More means a bigger amount; less means a smaller amount. Count two groups — the bigger number has more. Which group wins?','A Kiddo School Measuring & Money card titled More and Less: two monkeys with big and small banana bunches, five apples beside two, and a tall block tower beside two blocks labeled more and less.'],
 ['near-and-far-distance','Near and Far','Position words','Near means close to us; far means a long distance away. Look at the space between things — less space means near, more space means far.','A Kiddo School Measuring & Money card titled Near and Far: kids close to a tree and far away from one, a teddy close and away, birds near and far from a nest, and houses near and far on a road.'],
 ['number-bonds','Number Bonds','Numbers','A number bond shows how a whole number can be split into smaller parts. The parts join together to make the whole — 2 and 3 make 5!','A Kiddo School Measuring & Money card titled Number Bonds: apples, balloons and blocks split into parts with the number bonds 2 + 3 = 5, 1 + 5 = 6 and 4 + 6 = 10, labeled whole, part and make.'],
 ['numbers-1-to-20','Numbers 1 to 20','Numbers','Numbers tell us how many. Say the numbers in order and match each number to one object — after 10 come 11, 12, 13, all the way to 20.','A Kiddo School Measuring & Money card titled Numbers 1 to 20: the numerals 1, 5, 10, 15 and 20 beside one apple, five balloons, ten stars, fifteen leaves and twenty flowers, with a boy counting to 20.'],
 ['odd-and-even-numbers','Odd and Even','Numbers','Even numbers split into pairs with none left over; odd numbers have one left over. Two, four, six are even — make pairs to check!','A Kiddo School Measuring & Money card titled Odd and Even: two socks and four apples in pairs, six smiling balloons, three cookies with one left over, and boxes sorting even 2-4-6 and odd 1-3-5.'],
 ['same-and-different','Same and Different','Sorting & matching','Same means two things match in one or more ways; different means they do not. Compare color, shape or size — look closely and compare!','A Kiddo School Measuring & Money card titled Same and Different: matching caps and stars labeled same, a sneaker and a boot labeled different, and a boy sorting toys into same and different bins.'],
 ['shapes-circle-square-triangle-rectangle','Shapes','Shapes & money','A shape is the form or outline of something: a circle is round, a square has four equal sides, a triangle has three, a rectangle has two long and two short sides. Look at the sides and corners!','A Kiddo School Measuring & Money card titled Shapes: four smiling shapes — circle, square, triangle and rectangle — labeled by name, with a boy building with shape blocks below.'],
 ['simple-fractions-whole-half-quarter','Simple Fractions','Shapes & money','A fraction shows equal parts of a whole: one half is one of two equal parts, one quarter is one of four. Share a snack — parts make the whole!','A Kiddo School Measuring & Money card titled Simple Fractions: a whole pizza and a halved apple, quartered sandwiches and a chocolate bar labeled whole, half and quarter, and three kids sharing pizza in equal parts.'],
 ['sorting-and-grouping','Sorting','Sorting & matching','Sorting means putting things into groups that belong together — by color, shape, size or type. Find what belongs together!','A Kiddo School Measuring & Money card titled Sorting: cars, animals, balls and fruit sorted into groups by arrows, with the words sort, group, same and different and a boy tidying toys into bins.'],
 ['subtraction-taking-away','Subtraction','Numbers','Subtraction means taking some things away to find how many are left. Count what you have, take some away, and count what remains.','A Kiddo School Measuring & Money card titled Subtraction: five cookies minus two taken away leaves three, four balloons with one popped leaves three, and six blocks minus three leaves three, labeled take away, left and minus.'],
 ['tens-and-ones','Tens and Ones','Numbers','A ten is a group of ten ones. In 24, the 2 means two tens and the 4 means four ones — together they make twenty-four. Bundle ten ones to make one ten!','A Kiddo School Measuring & Money card titled Tens and Ones: bundles of ten sticks beside single blocks, a tens-and-ones chart building the number 24, and the numerals 10, 20 and 24.'],
 ['thick-and-thin','Thick and Thin','Measuring & comparing','Thick means more space from side to side; thin means less space. Compare the width of two books — look at the sides to compare thickness.','A Kiddo School Measuring & Money card titled Thick and Thin: a thick book and a thin one, a thick tree trunk and a thin sapling, thick rope and thin string, thick and thin pancake stacks, labeled more width and less width.'],
 ['top-and-bottom','Top and Bottom','Position words','Top means the highest part; bottom means the lowest part. Look up and down — top is highest, bottom is lowest!','A Kiddo School Measuring & Money card titled Top and Bottom: a star on top of a ring stack, a bird on top of a tree with a worm at the bottom, a teddy on a box, and a boy beside a high and low tower.'],
 ['weight-and-balance-scale','Weight and Balance','Measuring & comparing','Weight tells us how heavy or light something is. A balance compares weight: the side that goes down is heavier, the side that goes up is lighter.','A Kiddo School Measuring & Money card titled Weight and Balance: a balance dipping under a rock against a feather, a boy lighter than his backpack, and an elephant weighing down a balance against a mouse, ending level at 2 kg and 2 kg.'],
 ['wide-and-narrow','Wide and Narrow','Measuring & comparing','Wide means a lot of space from side to side; narrow means less space. Look from one side to the other — which road is wider?','A Kiddo School Measuring & Money card titled Wide and Narrow: a wide road and a narrow path, a wide doorway and a narrow one, a wide plate and a narrow bowl, a wide whale and a narrow fish, and wider and narrower ribbons.'],
].map(([slug,word,sub,say,alt])=>({slug,file:slug+'-flashcard-for-kids.webp',pageSlug:slug,word,sub,say,alt}));

/* Guards: exactly the owner's 28 cards in file order, every entry complete,
   all unique. */
if(CARDS.length!==28)throw Error('measuring-and-money: expected 28 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==MM_ORDER.join('|'))throw Error('measuring-and-money: card order does not match MM_ORDER');
for(const c of CARDS){
 if(!c.file.endsWith('-flashcard-for-kids.webp'))throw Error('measuring-and-money: SEO file name broken for '+c.slug);
 if(c.alt.length<80)throw Error('measuring-and-money: thin alt for '+c.slug);
 if(c.say.length<60)throw Error('measuring-and-money: thin say for '+c.slug);
 if(!c.sub)throw Error('measuring-and-money: missing subject for '+c.slug);
}

export const MM_CARDS=CARDS;
export const mmBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

/* Five shelves, in day-plan order: count and add first, then measuring, the
   position words, sorting, and the shapes-fractions-money finish. */
export const MM_SHELVES=[
 {id:'count-add',label:'THE COUNT &amp; ADD SHELF \u00b7 7 CARDS',h2:'Count it, add it, take it away.',
  hint:'The number cards families print first: counting to 10 and to 20, number bonds, tens and ones, odd and even, and the plus-and-minus pair. Counting flashcards for preschool math that start at one apple.',
  slugs:['counting-1-to-10','numbers-1-to-20','number-bonds','tens-and-ones','odd-and-even-numbers','addition-adding-groups','subtraction-taking-away']},
 {id:'measure',label:'THE MEASURE &amp; COMPARE SHELF \u00b7 9 CARDS',h2:'How long, how heavy, how much fits.',
  hint:'Measurement for beginners: long and short, the ruler, height, heavy and light, the balance scale, thick and thin, wide and narrow, full and empty, near and far — measuring activities for kids that use the whole house.',
  slugs:['long-and-short-comparing-length','measuring-length-ruler','measuring-height','heavy-and-light-comparing-weight','weight-and-balance-scale','thick-and-thin','wide-and-narrow','full-and-empty-capacity','near-and-far-distance']},
 {id:'position',label:'THE POSITION WORDS SHELF \u00b7 4 CARDS',h2:'Where is it? Say it like a treasure map.',
  hint:'Position words for kindergarten: left and right, inside and outside, in front and behind, top and bottom — the words that turn "over there!" into a map you can follow.',
  slugs:['left-and-right','inside-and-outside','in-front-and-behind','top-and-bottom']},
 {id:'sort',label:'THE SORT &amp; MATCH SHELF \u00b7 4 CARDS',h2:'Same or different? More or less?',
  hint:'Comparing and classifying: same and different, sorting and grouping, more and less, and equal — the matching games that quietly build logic.',
  slugs:['same-and-different','sorting-and-grouping','more-and-less-comparing-groups','equal-same-amount']},
 {id:'shapes-money',label:'THE SHAPES, FRACTIONS &amp; MONEY SHELF \u00b7 4 CARDS',h2:'Shapes, fair shares and the piggy bank.',
  hint:'The big-kid finish: circle, square, triangle and rectangle, simple fractions with pizza and chocolate, money math with coins, price and change — and the day-and-night clock that times it all.',
  slugs:['shapes-circle-square-triangle-rectangle','simple-fractions-whole-half-quarter','money-coins-price-change','day-and-night']}];
{
 const shelved=MM_SHELVES.flatMap(s=>s.slugs).sort().join('|');
 if(shelved!==MM_ORDER.slice().sort().join('|'))throw Error('measuring-and-money: shelves must cover the deck exactly once');
}

/* Level pills name school grades (owner 2026-10-31): Preschool = name it
   (17), Grade 1 = do it (6), Grade 2 = own it (5). 17/6/5 guarded. */
const MM_LEVEL={
 'counting-1-to-10':1,'numbers-1-to-20':1,'same-and-different':1,'sorting-and-grouping':1,
 'more-and-less-comparing-groups':1,'equal-same-amount':1,'long-and-short-comparing-length':1,
 'thick-and-thin':1,'wide-and-narrow':1,'full-and-empty-capacity':1,'inside-and-outside':1,
 'left-and-right':1,'top-and-bottom':1,'in-front-and-behind':1,'near-and-far-distance':1,
 'day-and-night':1,'shapes-circle-square-triangle-rectangle':1,
 'addition-adding-groups':2,'subtraction-taking-away':2,'measuring-length-ruler':2,
 'measuring-height':2,'heavy-and-light-comparing-weight':2,'weight-and-balance-scale':2,
 'number-bonds':3,'tens-and-ones':3,'odd-and-even-numbers':3,
 'simple-fractions-whole-half-quarter':3,'money-coins-price-change':3};
/* Skill pill per card (owner: "age, skill if any, level pill, subject pill"). */
const MM_SKILL={
 'counting-1-to-10':'Counting','numbers-1-to-20':'Counting','number-bonds':'Number sense',
 'tens-and-ones':'Place value','odd-and-even-numbers':'Sorting','addition-adding-groups':'Adding',
 'subtraction-taking-away':'Subtracting','long-and-short-comparing-length':'Comparing',
 'measuring-length-ruler':'Measuring','measuring-height':'Measuring',
 'heavy-and-light-comparing-weight':'Comparing','weight-and-balance-scale':'Measuring',
 'thick-and-thin':'Comparing','wide-and-narrow':'Comparing','full-and-empty-capacity':'Comparing',
 'near-and-far-distance':'Comparing','left-and-right':'Position words','inside-and-outside':'Position words',
 'in-front-and-behind':'Position words','top-and-bottom':'Position words','same-and-different':'Comparing',
 'sorting-and-grouping':'Sorting','more-and-less-comparing-groups':'Comparing','equal-same-amount':'Comparing',
 'shapes-circle-square-triangle-rectangle':'Shapes','simple-fractions-whole-half-quarter':'Fractions',
 'money-coins-price-change':'Money skills','day-and-night':'Time words'};
/* Owner 2026-10-31: "levels are grade 1, grade 2, preschool" — the level pill
   names the school grade, not "Level 1/2/3". */
const MM_LEVEL_NAMES={1:'Preschool \u00b7 Name it',2:'Grade 1 \u00b7 Do it',3:'Grade 2 \u00b7 Own it'};
const MM_LEVEL_BLURB={
 1:'the seventeen cards to start with — counting, the position words, the comparing pairs and the shapes a four-year-old names on sight',
 2:'the six doing cards — adding groups, taking away, and measuring for real with a ruler, a height chart and a balance',
 3:'the five bigger ideas — number bonds, tens and ones, odd and even, fair-share fractions, and counting out money'};
const MM_LEVEL_COUNTS=Object.fromEntries([1,2,3].map(l=>[l,CARDS.filter(c=>MM_LEVEL[c.slug]===l).length]));
if(MM_LEVEL_COUNTS[1]!==17||MM_LEVEL_COUNTS[2]!==6||MM_LEVEL_COUNTS[3]!==5)throw Error('measuring-and-money: level sizes drifted '+JSON.stringify(MM_LEVEL_COUNTS));
if(Object.keys(MM_SKILL).length!==28)throw Error('measuring-and-money: skill deck must cover 28 cards');
for(const c of CARDS){if(!MM_SKILL[c.slug])throw Error('measuring-and-money: missing skill for '+c.slug);if(!MM_LEVEL[c.slug])throw Error('measuring-and-money: missing level for '+c.slug);}

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

/* ---- The class page — the WHOLE deck on this one page --------------------- */
function tile(c){
 const pills=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 4\u20135</span><span class="fc-pill fc-pill-subject">${esc(c.sub)}</span><span class="fc-pill fc-pill-level">${MM_LEVEL_NAMES[MM_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(MM_SKILL[c.slug])}</span></span>`;
 return `<figure class="mn-card"><img src="${MM_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong>${pills}<figcaption class="mn-tip">${esc(c.say)}</figcaption><div class="mn-actions"><a class="button" href="${MM_BASE}${c.file}" download="${c.pageSlug}.webp">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function mmClassBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">LEARNING PATH \u00b7 CLASS 42 \u00b7 MEASURING &amp; MONEY \u00b7 AGES 4\u20135</span><h1>Measuring &amp; Money — twenty-eight printable math cards to download and print.</h1><p class="lesson-lede">Twenty-eight printable math flashcards for ages four to five, all on this one page, in five shelves: counting and adding, measuring and comparing, position words, sorting and matching, and the shapes-fractions-money finish. Every card carries its rule in words YOU can say back — count each thing one time; parts make the whole; the side that goes down is heavier — with Download and Print buttons right under the picture. Pick a card, print it, and the math walks off the page: a ruler at breakfast, coins at the store, pairs of socks on the bed.</p><div class="lesson-start"><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${MM_BASE}${MM_COVER.file}" width="${MM_COVER.w}" height="${MM_COVER.h}" alt="${esc(MM_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>One math idea. The child says it. Then the day does the teaching.</h2><p class="lesson-copy">Every card prints one early-math idea the way a four-year-old meets it: how many things there are, how long the table is, which backpack is heavier, how many coins make a treat. The small words under each picture are the rule itself, said kid-first — count each thing one time, take away to find what is left, make pairs to check. The Download button saves the full-size card; Print runs just that one card through the printer. Math words grow the same way the cards run — small, happy and repeated.</p><p class="lesson-copy">The shelves follow a math day. The count-and-add shelf counts to 10 and to 20, splits numbers into bonds and bundles, sorts odd from even, and puts groups together and takes them away. The measure-and-compare shelf weighs, measures and sizes up the whole house. The position-words shelf is the treasure map — left, right, inside, outside, in front, behind, top, bottom. The sort-and-match shelf compares groups and finds what belongs together. And the last shelf is the big finish: shapes, fair-share fractions, money math and the day-and-night clock.</p></section>`;
 const shelfSections=MM_SHELVES.map(sh=>`<section class="wrap lesson-section" id="shelf-${sh.id}"><span class="eyebrow">${sh.label}</span><h2>${sh.h2}</h2><p class="fc-hint">${sh.hint} Download takes the full-size card; Print runs just that one card through the printer. Every pill answers one question: the age, the subject, the grade level, the skill it builds.</p><div class="mn-cards">${sh.slugs.map(s=>tile(mmBySlug[s])).join('')}</div></section>`).join('');
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where the math learning grows.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/4-years/numbers-counting-and-early-math/">Counting lessons in Class 35 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/3-years/opposites-and-comparing/">Comparing words in Class 19 <span>\u00b7 Ages 3\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/science-nature-and-discovery/">Measuring like a scientist in Class 31 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/time-and-daily-routine/">Time &amp; Daily Routine in Class 41 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Class 35 counts one apple to twenty figs, Class 19 races the opposites — big and small, full and empty — and Class 31 measures like a scientist with balances and rulers in the Science, Nature &amp; Discovery class. This class adds the measuring tools, the money and the position words to the same skills. And when the day needs a schedule, Class 41 \u00b7 Time &amp; Daily Routine prints the clock and the routine cards beside these.</p></section>`;
 return `${hero}${how}${shelfSections}${around}<p class="lesson-note"><strong>Math is not a worksheet — it is a measuring cup.</strong> Every card here hands the math words to you — the counting, the comparing, the coins — and your grown-up\u2019s whole job is to hand you the ruler.</p>`;
}

/* ---- Inbound-link blocks, appended at the three class pages' page() calls -- */
/* Appended to Class 35 · Numbers, Counting & Early Math. */
export const MM_NUMBERS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">MEASURE, COUNT, SPEND</span><h2>Class 42 \u00b7 Measuring &amp; Money.</h2><p class="lesson-copy">Class 35 counts from one apple to twenty figs — and the <a href="/measuring-and-money/">Measuring &amp; Money class</a> puts those numbers to work: twenty-eight printable math cards for ages 4\u20135 with number bonds, tens and ones, odd and even, adding groups, taking away, measuring with a ruler and a balance, and counting out coins, price and change. Every card downloads and prints straight from the class page with its rule and a way to try it today right beneath the image.</p></section>`;
/* Appended to Class 19 · Opposites & Comparing. */
export const MM_OPPOSITES_LINK=`<section class="wrap lesson-section"><span class="eyebrow">FROM OPPOSITES TO MATH WORDS</span><h2>Class 42 \u00b7 Measuring &amp; Money.</h2><p class="lesson-copy">Class 19 races the opposites — big and small, hot and cold — and the <a href="/measuring-and-money/">Measuring &amp; Money class</a> measures the same world with math words: long and short, heavy and light, thick and thin, wide and narrow, full and empty, more and less. Twenty-eight printable cards for ages 4\u20135, every one downloadable and printable straight from the class page — the comparing your child just practiced, now with numbers on it.</p></section>`;
/* Appended to Class 31 · Science, Nature & Discovery. */
export const MM_SCIENCE_LINK=`<section class="wrap lesson-section"><span class="eyebrow">MEASURE LIKE A SCIENTIST</span><h2>Class 42 \u00b7 Measuring &amp; Money.</h2><p class="lesson-copy">Class 31 predicts, tests and writes down what happened — and the <a href="/measuring-and-money/">Measuring &amp; Money class</a> hands the scientist a toolkit: twenty-eight printable math cards for ages 4\u20135 with the ruler, the height chart, the balance scale, the timer words and the money math that pays for the materials. Every card prints straight from the class page — measuring is where math and science hold hands.</p></section>`;
