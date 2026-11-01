/* Kiddo School — CLASS 44 · Position & Direction Words (Ages 4–5): the
   Learning Path class page at /prepositions/ carrying the WHOLE 22-card deck
   on that one page, plus the parents' shelf at /flashcards/prepositions/.
   ZERO per-card URLs — the owner's standing rule ("dont make indiviual
   pages, they are thin to google — include all in one page with download,
   print button, age, skill if any, level pill, subject pill, make sections,
   small descripiton all beneath the images"; "learning path is lesson for
   kids and flashcard library is for parents thats it"), the same one-page
   shape as Classes 41–43. URL ROUND (owner 2026-11-01, after
   the first build): "forget the cloudflare folders structure — you make
   the clean urls what parents really search … for position and directions
   this is best or the prepositions is best? answer" — the answer is
   PREPOSITIONS: it is the head keyword family parents actually type
   ("prepositions for kids", "preposition flashcards"), it is short and
   guessable, and the R2 file names already carry the position-words family
   (-position-word-flashcard-for-kids.webp), so the class catches BOTH
   keyword families while the LP row keeps the class name; the old
   folder-shaped URLs 301 in _redirects to their twins (they lived for
   hours, zero equity lost). Numbered 44 by
   the no-skip rule: Class 43 · Our Earth & Space is LIVE on production at
   https://kiddo.school/earth-and-space/ — probed HTTP 200 before the number
   was assigned. The deck was probed LIVE on R2 on 2026-11-01: 23/23 files
   HTTP 200 image/webp at school/learning-path/position-and-direction-words/
   flashcards/ — 22 cards + the cover, every file exactly 800×1132, 24–39 kB.
   File names ride EXACTLY as uploaded (owner: "they are SEO names for Google
   Image search"); no seo.csv came with the deck, so the short-page slug is
   the card's own word at the start of the file name (the owner's example:
   above-position-word-… → /prepositions/above/) and card titles +
   alt text were transcribed verbatim off the artwork via 3 labeled contact
   sheets (scripts/pd44-sheets.py — every card face read, all five labeled
   scenes per card). The cover is the class page's main image (owner rule)
   and fronts the og:image so the deck joins the image sitemap; every short
   page carries its own card as og:image with the transcribed alt.
   Copy uses what USA parents search (position words for kids, positional
   words preschool, direction flashcards, prepositions printable) and talks
   to kids directly; the owner's word-ban ("no sign up", "no paywall",
   "free to use", "no account", "free forever") is a lock, and the owner
   asked for the most humane language the school has — every line below was
   written the way a grown-up actually talks to a four-year-old.
   Inbound links: Class 19 (Opposites & Comparing), Class 33 (Community
   Helpers & Our Neighborhood) and Class 42 (Measuring & Money — whose own
   deck carries the position-words shelf) point here; the class page links
   back to all three and the Learning Path, and every short page links back
   to the class page. The class count goes forty-three → forty-four. */
import {R2} from './adventure-kit.mjs';
import {fcCommunityMount} from './flashcards/community.mjs';

export const PD_PATH='/prepositions/';
export const PD_BASE=R2+'school/learning-path/position-and-direction-words/flashcards/';

/* File order, exactly as the owner uploaded them (sorted); the slug is the
   card's word at the start of the file name — the owner's own URL rule. */
export const PD_ORDER=['above','across','around','away-from','back-behind','below','between',
 'down','far','in-front-of','inside','left','near','next-to','on','outside','over','right',
 'through','toward','under','up'];

export const PD_COVER={file:'position-and-direction-words-flashcards-for-kids-cover.webp',w:800,h:1132,
 alt:'Cover of the Kiddo School Position & Direction Words flashcards: happy kids crawling into a box, jumping in the air and pointing along arrows, over the words "Position & Direction Words — Learn where things are and how they move".'};

const W=800,H=1132;
/* slug → word (the card's printed lead, from the artwork), sub (subject
   pill), say (the description under the image — kid-directed, one job),
   labels (the card's five labeled scenes, verbatim, quoted on the short
   page), try (the short page's TRY IT TODAY), alt (SEO alt from the
   verified artwork). Every face read off the contact sheets. */
const CARDS=[
 ['above','Above','Position words','Something above you is higher than you are. The balloon floats above her head, the book is held above his, the bird flies above them all. Look up right now — name one thing above you!','Balloon above, Book above, Bird above, Hat above, Star above','Stand under a doorway and say "the frame is above me." Then hold your favorite toy above your head and freeze like a statue.','A Kiddo School Position & Direction Words card titled Above: the word Above with five labeled scenes — Balloon above, Book above, Bird above, Hat above and Star above.'],
 ['across','Across','Direction words','Across means going from one side to the other. The boy walks across the bridge, the frog hops across the pond, the cat strolls across the rug. Walk across your room — that is the whole word, felt in your feet!','Across the bridge, Across the pond, Across the rug, Across the road, Across the table','Lay a scarf on the floor and step across it. Then carry a spoon across the kitchen without dropping it — slow feet win.','A Kiddo School Position & Direction Words card titled Across: the word Across with five labeled scenes — Across the bridge, Across the pond, Across the rug, Across the road and Across the table.'],
 ['around','Around','Direction words','Around means following a curved path that circles something. The kids walk around the tree, the scarf wraps around his neck, the ring sits around her finger. Run one small circle around a chair and you just went around!','Around the tree, Around my neck, Around the garden, Around my finger, Around the table','Walk around the kitchen table three times — once slow, once fast, once with silly giant steps. Count them out loud!','A Kiddo School Position & Direction Words card titled Around: the word Around with five labeled scenes — Around the tree, Around my neck, Around the garden, Around my finger and Around the table.'],
 ['away-from','Away From','Direction words','Away from means each step takes you farther. The girl walks away from the puddle, the dog sneaks away from the loud vacuum, the bird flies away from the tree. Take five steps away from the door and feel yourself getting farther!','Walk away from the puddle, Move away from the vacuum, Fly away from the tree, Move away from the drum, Sail away from shore','Pick a spot, then take five giant steps away from it and shout "farther, farther, farther!" Turn around and walk back.','A Kiddo School Position & Direction Words card titled Away From: the word Away From with five labeled scenes — Walk away from the puddle, Move away from the vacuum, Fly away from the tree, Move away from the drum and Sail away from shore.'],
 ['back-behind','Back & Behind','Position words','Behind means at the back of something, where you cannot see it. The kitten hides behind the curtain, the ball rolls in back of the dog, the friends wait at the back of the line. What is behind you right now? Turn and see!','Behind the curtain, Cat in back, On my back, Back of the line, Ball in back','Stand very still and name three things behind you without peeking. Then check — how many did you get right?','A Kiddo School Position & Direction Words card titled Back: the word Back with five labeled scenes — Behind the curtain, Cat in back, On my back, Back of the line and Ball in back.'],
 ['below','Below','Position words','Below means lower than you. The fish swims below the boat, the ball rolls below the table edge, the cloud drifts below the sun. Crouch down low and whisper "I am below the ceiling!"','Shoe below, Fish below, Book below, Cloud below, Ball below','Lie on the floor and look up — everything you can see is above you, and you are below all of it. Say hi to the ceiling!','A Kiddo School Position & Direction Words card titled Below: the word Below with five labeled scenes — Shoe below, Fish below, Book below, Cloud below and Ball below.'],
 ['between','Between','Position words','Between means right in the middle of two things. The friends stand between each other, the cupcake sits between two plates, the kitten squeezes between the pillows. Put one hand between your chair and the wall — that is between!','Between friends, Between plates, Between cones, Between pillows, Between houses','Squeeze between two couch cushions and be the sandwich filling. Then line up three toys and slide one right between the others.','A Kiddo School Position & Direction Words card titled Between: the word Between with five labeled scenes — Between friends, Between plates, Between cones, Between pillows and Between houses.'],
 ['down','Down','Direction words','Down is the way gravity pulls everything. The leaf falls down, the rain drops down, the elevator carries you down, you slide down the slide. Touch your toes — your fingers just went down!','Point down, Leaf falls down, Slide down, Rain falls down, Elevator goes down','Stretch tall like a tree, then flop down like a falling leaf — slowly! Do it three times: up goes the tree, down goes the leaf.','A Kiddo School Position & Direction Words card titled Down: the word Down with five labeled scenes — Point down, Leaf falls down, Slide down, Rain falls down and Elevator goes down.'],
 ['far','Far','Direction words','Far means a long, long way away. The mountains are far, the little boat sails far from shore, the doghouse can be far from the ball. Name something far away from your window — then something very close!','Far from the mountain, Far from shore, Far from the house, Far from me, Far from the doghouse','Cup your hands and shout to the farthest thing you can see. Then whisper to your own hand — near and far, felt in your voice.','A Kiddo School Position & Direction Words card titled Far: the word Far with five labeled scenes — Far from the mountain, Far from shore, Far from the house, Far from me and Far from the doghouse.'],
 ['in-front-of','In Front Of','Position words','In front of means straight ahead, closer than everything else. The puppy sits in front of its doghouse, the bus stops in front of the kids, the bear peeks in front of the box. Put a hand in front of your nose and wave hello!','In front of a bus, Puppy in front, Toy in front, In front of a mirror, Bird in front','Set a toy in front of the door, then stand behind it and march around it — behind, beside, in front of — like the toy is a maypole.','A Kiddo School Position & Direction Words card titled Front: the word Front with five labeled scenes — In front of a bus, Puppy in front, Toy in front, In front of a mirror and Bird in front.'],
 ['inside','Inside','Position words','Inside means in the inner part of something. The kid sits inside a box, the campers are inside the tent, the ball hides inside the basket. Your voice is inside your body right now — say "inside!" and feel it!','Inside a box, Inside a tent, Inside a basket, Inside a cup, Inside a book','Climb inside a big cardboard box if you have one — or blanket-fort it — and read one book page from inside your hideout.','A Kiddo School Position & Direction Words card titled Inside: the word Inside with five labeled scenes — Inside a box, Inside a tent, Inside a basket, Inside a cup and Inside a book.'],
 ['left','Left','Map skills','Left is one side of your body — the side your left hand is on. Point left with your whole arm. Which is your left ear? Touch it! Left and right make a team you will use for maps, dancing and crossing streets.','Point left, Cat left, Cup left, Turn left, Balloon left','Sticky-note your left hand, then follow directions: turn left at the couch, two steps, turn left again. Where did you end up?','A Kiddo School Position & Direction Words card titled Left: the word Left with five labeled scenes — Point left, Cat left, Cup left, Turn left and Balloon left.'],
 ['near','Near','Comparing','Near means close by — just an arm stretch away. The puppy sits near its friend, the cup waits near the plate, the rabbit nibbles near the carrot. What is the nearest thing to your hand right now?','Near the dog, Near the plate, Near the tree, Near the carrot, Near the bed','Pick a toy and move it nearer and nearer to you until it touches your toes, saying "nearer… nearer… near!"','A Kiddo School Position & Direction Words card titled Near: the word Near with five labeled scenes — Near the dog, Near the plate, Near the tree, Near the carrot and Near the bed.'],
 ['next-to','Next To','Position words','Next to means right beside, shoulder to shoulder. The bike leans next to the boy, the cat sits next to its bowl, the pencil rests next to the notebook. Sit next to somebody you love — you just did the word!','Next to the bicycle, Next to the bowl, Next to the notebook, Next to a friend, Next to the watering can','Line up your shoes next to each other, then put one sock next to another. Everything in a row — next to, next to, next to.','A Kiddo School Position & Direction Words card titled Next To: the words Next To with five labeled scenes — Next to the bicycle, Next to the bowl, Next to the notebook, Next to a friend and Next to the watering can.'],
 ['on','On','Position words','On means resting right on top. The kid stands on the skateboard, the book lies on the desk, the kitten sits on the cushion, the cupcake waits on the plate. You are sitting ON something this very second — what is it?','On the skateboard, On the desk, On the cushion, On the branch, On the plate','Balance a book on your head and walk five steps without letting it fall. On your mark — go!','A Kiddo School Position & Direction Words card titled On: the word On with five labeled scenes — On the skateboard, On the desk, On the cushion, On the branch and On the plate.'],
 ['outside','Outside','Position words','Outside means out beyond the walls. The tent campers are outside, the puppy plays outside its doghouse, the ball bounces outside the box. The whole sky is outside — the biggest word on this card!','Outside a tent, Outside a doghouse, Outside a door, Outside a box, Outside a book','Step outside (a balcony counts!) and name three things that could never fit inside your house.','A Kiddo School Position & Direction Words card titled Outside: the word Outside with five labeled scenes — Outside a tent, Outside a doghouse, Outside a door, Outside a box and Outside a book.'],
 ['over','Over','Direction words','Over means up and across the top of something. The kid jumps over the puddle, the bridge stretches over the river, the plane flies over the city. Toss a sock over your shoulder — it went over!','Jump over the puddle, Bridge over the river, Blanket over me, Plane over the city, Hat over my head','Lay a rope or ribbon on the floor and jump over it five times. Make it wiggle like a river for the last jump!','A Kiddo School Position & Direction Words card titled Over: the word Over with five labeled scenes — Jump over the puddle, Bridge over the river, Blanket over me, Plane over the city and Hat over my head.'],
 ['right','Right','Map skills','Right is your other side — the side your right hand is on. Point right, turn right, give a right-hand high five. Left and right together make you the captain of every treasure map.','Point right, Dog right, Spoon right, Turn right, Kite right','Sticky-note your right hand, then mirror your grown-up: they point left, you point right. Silly mirror mode!','A Kiddo School Position & Direction Words card titled Right: the word Right with five labeled scenes — Point right, Dog right, Spoon right, Turn right and Kite right.'],
 ['through','Through','Direction words','Through means in one side and out the other. The kid walks through the tunnel, the train roars through the bridge, the ball sails through the hoop. Crawl through a doorway on your hands and knees — you went through!','Through the tunnel, Through the bridge, Through the flowers, Through the window, Through the hoop','Make a tunnel with your arms and let a toy car drive through. Then you be the car and crawl through a real hallway!','A Kiddo School Position & Direction Words card titled Through: the word Through with five labeled scenes — Through the tunnel, Through the bridge, Through the flowers, Through the window and Through the hoop.'],
 ['toward','Toward','Direction words','Toward means getting closer with every step. The girl walks toward her friend, the puppy runs toward the ball, the boat sails toward the island. Walk toward the window and watch the world get bigger!','Walk toward a friend, Run toward the ball, Fly toward the flower, Move toward the door, Sail toward the island','Pick two spots across the room. March toward the first one counting your steps, then tiptoe toward the second one — quiet feet only.','A Kiddo School Position & Direction Words card titled Toward: the word Toward with five labeled scenes — Walk toward a friend, Run toward the ball, Fly toward the flower, Move toward the door and Sail toward the island.'],
 ['under','Under','Position words','Under means beneath — with something covering the space above you. The kid crawls under the table, the puppy naps under the umbrella, the cat peeks under the bed. Where are your feet right now? Under you!','Under the table, Under the umbrella, Under the chair, Under the bed, Under the tree','Crawl under the table like a secret spy — slow and silent. Then pop out and announce: "I was UNDER the table the whole time!"','A Kiddo School Position & Direction Words card titled Under: the word Under with five labeled scenes — Under the table, Under the umbrella, Under the chair, Under the bed and Under the tree.'],
 ['up','Up','Direction words','Up is the way rockets, balloons and sunflowers go. The rocket blasts up, the balloon floats up, you climb up the stairs one step at a time. Stretch your arms up right now — hello, up!','Point up, Rocket goes up, Balloon goes up, Climb up, Flower grows up','Countdown: three, two, one — jump UP! Land softly. Do it three times and finish with your arms stretched up like a rocket.','A Kiddo School Position & Direction Words card titled Up: the word Up with five labeled scenes — Point up, Rocket goes up, Balloon goes up, Climb up and Flower grows up.'],
].map(([slug,word,sub,say,labels,tryIt,alt])=>({slug,file:slug+'-position-word-flashcard-for-kids.webp',pageSlug:slug,word,sub,say,labels,try:tryIt,alt}));

/* Guards: exactly the owner's 22 cards in file order, every entry complete,
   all unique — and every SEO file name riding untouched. */
if(CARDS.length!==22)throw Error('position-direction: expected 22 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==PD_ORDER.join('|'))throw Error('position-direction: card order does not match PD_ORDER');
for(const c of CARDS){
 if(!c.file.endsWith('-position-word-flashcard-for-kids.webp'))throw Error('position-direction: SEO file name broken for '+c.slug);
 if(c.alt.length<80)throw Error('position-direction: thin alt for '+c.slug);
 if(c.say.length<60)throw Error('position-direction: thin say for '+c.slug);
 if(c.try.length<40)throw Error('position-direction: thin try for '+c.slug);
 if(!c.sub)throw Error('position-direction: missing subject for '+c.slug);
}

export const PD_CARDS=CARDS;
export const pdBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

/* Four shelves, in a kid's day order: up-and-down first (the words your body
   already knows), then where things are, then the way things move, and the
   sides-and-distance finish. */
export const PD_SHELVES=[
 {id:'up-down',label:'THE UP &amp; DOWN SHELF \u00b7 7 CARDS',h2:'Words your body already knows.',
  hint:'Printable position word flashcards for preschool and up: up, down, above, below, over, under and on — the first positional words kids act out with their whole bodies, one card each with a way to try it today.',
  slugs:['up','down','above','below','over','under','on']},
 {id:'where',label:'THE WHERE THINGS ARE SHELF \u00b7 6 CARDS',h2:'Inside, outside, in between.',
  hint:'Where-things-are flashcards for ages 4–5: inside and outside, between and next to, in front of and back-behind — the position words that turn "where is it?" into a game a four-year-old wins.',
  slugs:['inside','outside','between','next-to','in-front-of','back-behind']},
 {id:'move',label:'THE WAY THINGS MOVE SHELF \u00b7 5 CARDS',h2:'Direction words with feet on them.',
  hint:'Printable direction flashcards: across, around, through, toward and away from — movement words for preschool and kindergarten that turn the hallway into an obstacle course of words.',
  slugs:['across','around','through','toward','away-from']},
 {id:'sides',label:'THE SIDES &amp; DISTANCE SHELF \u00b7 4 CARDS',h2:'Near, far and your two sides.',
  hint:'Left and right, near and far — the comparison words that grow into map skills, dancing directions and crossing the street safely, each on its own printable card.',
  slugs:['near','far','left','right']}];
{
 const shelved=PD_SHELVES.flatMap(s=>s.slugs).sort().join('|');
 if(shelved!==PD_ORDER.slice().sort().join('|'))throw Error('position-direction: shelves must cover the deck exactly once');
}

/* Level pills name school grades (owner 2026-10-31): Preschool = name it
   (8), Grade 1 = do it (7), Grade 2 = own it (7). 8/7/7 guarded. */
const PD_LEVEL={
 above:1,below:1,on:1,up:1,down:1,inside:1,outside:1,near:1,
 over:2,under:2,'next-to':2,'in-front-of':2,left:2,right:2,far:2,
 across:3,around:3,through:3,toward:3,'away-from':3,'back-behind':3,between:3};
/* Skill pill per card (owner: "age, skill if any, level pill, subject pill"). */
const PD_SKILL={
 above:'Comparing',below:'Comparing',on:'Position words',up:'Movement',down:'Movement',
 inside:'Position words',outside:'Position words',near:'Comparing',over:'Movement',
 under:'Position words','next-to':'Position words','in-front-of':'Position words',
 left:'Map skills',right:'Map skills',far:'Comparing',across:'Movement',around:'Movement',
 through:'Movement',toward:'Movement','away-from':'Movement','back-behind':'Position words',
 between:'Sorting'};
/* Owner 2026-10-31: "levels are grade 1, grade 2, preschool" — the level pill
   names the school grade, not "Level 1/2/3". */
const PD_LEVEL_NAMES={1:'Preschool \u00b7 Name it',2:'Grade 1 \u00b7 Do it',3:'Grade 2 \u00b7 Own it'};
const PD_LEVEL_BLURB={
 1:'the eight words to start with — up, down, on, above, below, inside, outside and near — the ones a four-year-old already acts out every day',
 2:'the seven doing words — over, under, next to, in front of, left, right and far — each one with a job your feet can finish',
 3:'the seven bigger words — across, around, through, toward, away from, back-behind and between — the direction words that grow into map skills'};
const PD_LEVEL_COUNTS=Object.fromEntries([1,2,3].map(l=>[l,CARDS.filter(c=>PD_LEVEL[c.slug]===l).length]));
if(PD_LEVEL_COUNTS[1]!==8||PD_LEVEL_COUNTS[2]!==7||PD_LEVEL_COUNTS[3]!==7)throw Error('position-direction: level sizes drifted '+JSON.stringify(PD_LEVEL_COUNTS));
if(Object.keys(PD_SKILL).length!==22)throw Error('position-direction: skill deck must cover 22 cards');
for(const c of CARDS){if(!PD_SKILL[c.slug])throw Error('position-direction: missing skill for '+c.slug);if(!PD_LEVEL[c.slug])throw Error('position-direction: missing level for '+c.slug);}

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const wordIndex=slug=>PD_ORDER.indexOf(slug)+1;

/* ---- The class page: cover leads, four shelves carry the whole deck on
   ONE page, zero per-card URLs — the owner's standing rule ----------------- */
function tile(c){
 const pills=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 4\u20135</span><span class="fc-pill fc-pill-subject">${esc(c.sub)}</span><span class="fc-pill fc-pill-level">${PD_LEVEL_NAMES[PD_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(PD_SKILL[c.slug])}</span></span>`;
 return `<figure class="mn-card"><img src="${PD_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong>${pills}<figcaption class="mn-tip">${esc(c.say)}</figcaption><div class="mn-actions"><a class="button" href="${PD_BASE}${c.file}" download="${c.slug}.webp">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function pdClassBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">LEARNING PATH \u00b7 CLASS 44 \u00b7 POSITION &amp; DIRECTION WORDS \u00b7 AGES 4\u20135</span><h1>Prepositions for kids — twenty-two printable position &amp; direction word cards to act out.</h1><p class="lesson-lede">Twenty-two printable position and direction flashcards for ages four to five, all on this one page, in four shelves. Up and down, above and below, over and under, inside and outside, across and through: the words that tell you WHERE. Every card shows the word five ways with labeled pictures, so the word sticks the way a game sticks — and every word has something your body can do right now, downloading and printing straight from this page. Pick a card, print it, and the hallway becomes a treasure map.</p><div class="lesson-start"><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${PD_BASE}${PD_COVER.file}" width="${PD_COVER.w}" height="${PD_COVER.h}" alt="${esc(PD_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>One little word. Your whole body does it. That is the lesson.</h2><p class="lesson-copy">Position words are the first math words a child ever uses — before numbers, comes WHERE. Every card in this class prints one word five ways: the word big at the top, then five labeled pictures showing it — balloon above, book above, bird above. You do not need a desk for this class. You need a floor, a table to crawl under, and maybe a sock to toss over your shoulder. Say the word, do the word, and the word is yours.</p><p class="lesson-copy">The shelves follow how the words grow. The Up &amp; Down shelf starts with the ones your body already knows — jumping up, flopping down, hiding under. Where Things Are adds the hiding words — inside, outside, between, next to, in front of, back-behind. The Way Things Move puts directions in your feet — across, around, through, toward, away from. And Sides &amp; Distance finishes with the two tricky teams — left and right, near and far — that later become maps, dances and driving directions.</p></section>`;
 const shelfSections=PD_SHELVES.map(sh=>`<section class="wrap lesson-section" id="shelf-${sh.id}"><span class="eyebrow">${sh.label}</span><h2>${sh.h2}</h2><p class="fc-hint">${sh.hint} Every card carries its four pills — age, subject, grade level, skill — and its Download + Print buttons right under the picture, straight from this page.</p><div class="mn-cards">${sh.slugs.map(s=>tile(pdBySlug[s])).join('')}</div></section>`).join('');
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where the position words grow up.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/3-years/opposites-and-comparing/">Opposite pairs in Class 19 <span>\u00b7 Age 3</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/community-helpers-and-our-neighborhood/">Neighborhood walks in Class 33 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/measuring-and-money/">Measuring &amp; Money in Class 42 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Class 19 compares — big and little, more and less, over and under in its own opposite pairs — and this class hands those pairs their real names. Class 33 walks the neighborhood, where every walk is a direction word: toward the mailbox, across the street, next to the park. Class 42 measures and sorts, and its own shelf already keeps a few position words — this class is where those words get a whole school day. And when you want the next class, the Learning Path holds all forty-eight in order — and the whole deck prints again from the <a href="/flashcards/prepositions/">Prepositions parents\u2019 shelf</a>.</p></section>`;
 return `${hero}${how}${shelfSections}${around}<p class="lesson-note"><strong>Position words are caught, not taught.</strong> Every card here hands you a word your body can try before your brain has to — and your grown-up\u2019s whole job is to say it out loud with you while you do it.</p>`;
}

/* ---- The parents' shelf: the whole deck on ONE library page. The lib tips
   are the cards' try-it jobs (the class page's tiles carry the say lines)
   — no sentence shared between the two pages. ------------------------------ */
export const PD_LIB_SET={slug:'prepositions',url:'/flashcards/prepositions/',name:'Prepositions & Position Words',
 ageLabel:'4–5',stageName:null,
 hubBlurb:'The parents\u2019 shelf for Class 44: all twenty-two position-and-direction word cards with a download and a print button under every image — age, subject, level and skill pills on each card, printing straight from the shelf, no card pages. The child\u2019s lesson lives in the Prepositions class.',
 coverUrl:PD_BASE+PD_COVER.file,
 cover:{w:PD_COVER.w,h:PD_COVER.h,alt:PD_COVER.alt},
 cards:CARDS.map(c=>({slug:c.slug,word:c.word}))};

function libTile(c){
 const pillRow=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 4–5</span><span class="fc-pill fc-pill-subject">${esc(c.sub)}</span><span class="fc-pill fc-pill-level">${PD_LEVEL_NAMES[PD_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(PD_SKILL[c.slug])}</span></span>`;
 return `<figure class="mn-card"><img src="${PD_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong>${pillRow}<figcaption class="mn-tip">${esc(c.try)}</figcaption><div class="mn-actions"><a class="button" href="${PD_BASE}${c.file}" download="${c.slug}.webp">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function pdLibBody(){
 const intro=`<section class="wrap lesson-section"><p class="lesson-copy">This is the parents\u2019 copy of <a href="/prepositions/">Class 44 \u00b7 Position &amp; Direction Words</a>: all twenty-two position word cards on one shelf, ready to print. You do not need a plan — pick the word today\u2019s game needs, download the card, and print it full size on A4 or Letter paper. Every card carries one try-it job underneath and four pills on top: the age it suits, the subject it teaches, the grade level to start at, and the skill it builds. The download button takes the full-size card; the print button runs a single card through your printer with nothing else on the page. There are no card pages to hop through: the shelf is the whole set.</p><p class="lesson-copy">The shelf is yours; the lesson is your child\u2019s. The class page at <a href="/prepositions/">Prepositions for kids</a> teaches each word the way a teacher would — spoken to your child, the word shown five labeled ways, one thing to try today — while this wall simply holds the deck for printing. Same twenty-two cards, two jobs: the lesson lives in the class, the library is where parents print.</p></section>`;
 const levels=`<section class="wrap lesson-section"><span class="eyebrow">THE THREE LEVELS</span><h2>Preschool, Grade 1, Grade 2.</h2><p class="fc-hint">Every card wears a level pill so tonight\u2019s card takes one glance to choose. The levels are a suggested order, not a test — the word your game needs most is always the right card.</p><ol class="fc-steps"><li><span class="fc-stepnum">01</span><div><h3>${PD_LEVEL_NAMES[1]}</h3><p>${PD_LEVEL_BLURB[1]}.</p></div></li><li><span class="fc-stepnum">02</span><div><h3>${PD_LEVEL_NAMES[2]}</h3><p>${PD_LEVEL_BLURB[2]}.</p></div></li><li><span class="fc-stepnum">03</span><div><h3>${PD_LEVEL_NAMES[3]}</h3><p>${PD_LEVEL_BLURB[3]}.</p></div></li></ol></section>`;
 const heads={'up-down':'Words your body already knows.',where:'Inside, outside, in between.',move:'Direction words with feet on them.',sides:'Near, far and your two sides.'};
 const deck=PD_SHELVES.map(sh=>{const cards=sh.slugs.map(s=>pdBySlug[s]);return `<section class="wrap lesson-section"><span class="eyebrow">${sh.label}</span><h2>${heads[sh.id]}</h2><p class="fc-hint">${sh.hint} Download takes the full-size card; Print runs just that one card through the printer.</p><div class="mn-cards">${cards.map(libTile).join('')}</div></section>`;}).join('');
 const next=`<section class="wrap lesson-section"><span class="eyebrow">WHERE TO NEXT</span><h2>The lesson, the path, the rest of the library.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/prepositions/">The Prepositions class <span>\u00b7 The child\u2019s lesson</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/flashcards/">All flashcard sets <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/flashcards/measuring-and-money/">The Measuring &amp; Money parents\u2019 shelf <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Print a card here, teach the word there: the <a href="/prepositions/">Prepositions for kids class</a> is the lesson side of this deck — one word a sitting, spoken to your child, acted out with the whole body. Once the deck is up on the fridge, the class page is the manual that makes each word stick.</p></section>`;
 return `${intro}${levels}${deck}${next}${fcCommunityMount('/flashcards/prepositions/')}`;
}

/* ---- Inbound-link blocks, appended at the three classes' page() calls ----- */
/* Appended to Class 19 · Opposites & Comparing. */
export const PD_OPPOSITES_LINK=`<section class="wrap lesson-section"><span class="eyebrow">FROM OPPOSITE PAIRS TO POSITION WORDS</span><h2>Class 44 \u00b7 Position &amp; Direction Words.</h2><p class="lesson-copy">Class 19 plays in opposite pairs — big and little, more and less, open and shut — and the <a href="/prepositions/">Prepositions for kids class</a> gives those pairs their everyday names: up and down, over and under, above and below. Twenty-two printable position word cards for ages 4\u20135, every card on the one class page, each with the word shown five ways and something your body can try today.</p></section>`;
/* Appended to Class 33 · Community Helpers & Our Neighborhood. */
export const PD_HELPERS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">WORDS FOR EVERY WALK</span><h2>Class 44 \u00b7 Position &amp; Direction Words.</h2><p class="lesson-copy">Class 33 walks the neighborhood — the doctor, the mailbox, the fire station — and every single walk runs on direction words: toward the corner, across the street, next to the park, away from home. The <a href="/prepositions/">Prepositions for kids class</a> prints those walking words as cards: twenty-two position and direction flashcards for ages 4\u20135, all on the one class page, each with a way to act it out before the next walk.</p></section>`;
/* Appended to Class 42 · Measuring & Money. */
export const PD_MEASURE_LINK=`<section class="wrap lesson-section"><span class="eyebrow">THE POSITION WORDS GET A WHOLE CLASS</span><h2>Class 44 \u00b7 Position &amp; Direction Words.</h2><p class="lesson-copy">Class 42 keeps a little position-words shelf among its measuring cards — and the <a href="/prepositions/">Prepositions for kids class</a> is where those words get a school day of their own: twenty-two printable position and direction flashcards for ages 4\u20135, from up, down and on to through, toward and between, each shown five labeled ways with one thing to try today.</p></section>`;
