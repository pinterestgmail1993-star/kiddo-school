/* Kiddo School — CLASS 43 · Our Earth & Space (Ages 4–5): the Learning Path
   class page at /earth-and-space/ (owner brief 2026-10-31, numbered 43 by the
   no-skip rule: Class 42 · Measuring & Money is LIVE on production at
   https://kiddo.school/measuring-and-money/ — probed HTTP 200 before the
   number was assigned). The deck was probed LIVE on R2 on 2026-10-31:
   25/25 files HTTP 200 image/webp at school/learning-path/our-earth-and-space/
   flashcards/ — 24 cards + the cover, every file exactly 800×1132, 15–27 kB.
   File names ride EXACTLY as uploaded (owner: "they are SEO names for Google
   Image search"); the owner's our-earth-and-space-image-seo.csv was not
   present anywhere reachable (13 R2 paths probed, all 404 — same as the
   Class 41/42 CSVs), so page slugs ride the file names (minus the shared
   -flashcard-for-kids suffix) and card titles + alt text were transcribed
   verbatim off the artwork via 6 labeled contact sheets
   (scripts/es-sheets.py — every card face read).
   ONE PAGE ONLY (standing owner rule 2026-10-31: "remember no indiviual
   pages", repeated for the Science Lab round): the class page IS the deck —
   six shelves, every card with its image (loading="lazy" + width/height),
   age/subject/level/skill pills, a small kid-directed description under the
   picture, and Download + Print buttons (manners.js per-card print
   isolation). Level pills name school grades (owner: "levels are grade 1,
   grade 2, preschool"): Preschool · Grade 1 · Grade 2 — 8/9/7, guarded
   below. Copy uses what USA parents search (printable space flashcards,
   planets for kids, weather flashcards, solar system) and talks to kids
   directly; the owner's word-ban ("no sign up", "no paywall", "free to use",
   "no account", "free forever") is a lock. The cover file is the class
   page's main image (owner rule) and fronts the og:image so the deck joins
   the image sitemap. Inbound links: Class 31 (Science, Nature & Discovery),
   Class 34 (Weather, Seasons & What We Wear), Class 41 (Time & Daily
   Routine) and Science at a Glance point here; the class page links back to
   all four and the Learning Path, and the class count goes forty-two →
   forty-three. */
import {R2} from './adventure-kit.mjs';

export const ES_PATH='/earth-and-space/';
export const ES_BASE=R2+'school/learning-path/our-earth-and-space/flashcards/';

/* File order, exactly as the owner uploaded them (sorted); the page slug is
   the file name minus the shared -flashcard-for-kids suffix; the cover is
   the class page's own main image, not a card. */
export const ES_ORDER=['atmosphere-continent-river','comet-asteroid-meteor','crater-satellite-space-suit','day-night-gravity',
 'eclipse-tide-season','equator-north-pole-south-pole','fossil-rock-mineral','jupiter-saturn-uranus',
 'mercury-venus-earth','ocean-mountain-volcano','planet-dwarf-planet-moon','recycle-water-air',
 'ringed-planet-space-helmet-moon-rock','rocket-astronaut-space-station','rotation-revolution-axis','rover-lander-space-mission',
 'solar-panel-wind-turbine-rain','solar-system-constellation-black-hole','space-walk-alien-moon-base','star-comet-asteroid',
 'sun-moon-earth','sunrise-sunset-cloud','tropical-polar-temperate','weather-wind-thunder'];

export const ES_COVER={file:'our-earth-and-space-flashcards-for-kids-cover.webp',w:800,h:1132,
 alt:'Cover of the Kiddo School Our Earth & Space flashcards: a smiling purple-and-gold Earth waving beside a cool sun in sunglasses and a small ringed planet, over the words "Our Earth & Space — Funny flashcards".'};

const W=800,H=1132;
/* slug → word (the card's printed lead, from the artwork), sub (subject
   pill), say (the description under the image — the card's four words worked
   into a kid-directed line + one job), alt (SEO alt from the verified
   artwork). Every face read off the contact sheets. */
const CARDS=[
 ['atmosphere-continent-river','Atmosphere','Earth science','The atmosphere is the big blanket of air wrapped around Earth, a continent is a huge piece of land, and a river is water running to the sea. Point to the sky — the air you are breathing is part of it!','A Kiddo School Our Earth & Space card titled Atmosphere: a smiling Earth wrapped in a blanket of air and clouds, a thumbs-up continent character, a winding river and three waving forest trees.'],
 ['comet-asteroid-meteor','Comet','Stars & space','A comet is an icy space snowball with a glowing tail, an asteroid is a lumpy space rock, and a meteor is the streak of light when one zooms through our sky. Draw your own comet with the longest tail you can!','A Kiddo School Our Earth & Space card titled Comet: a comet with a fiery tail and a purple head, a red lumpy asteroid waving, a purple meteor shooting flames and a smiling red crater basin.'],
 ['crater-satellite-space-suit','Crater','Space travel','A crater is a bowl-shaped dip on a moon or planet, a satellite circles Earth taking pictures, and a space suit keeps an astronaut safe out there. Count the craters on our moon tonight — which one is the deepest?','A Kiddo School Our Earth & Space card titled Crater: a blue winking crater, a satellite with a dish and solar panels, an astronaut waving in a white space suit and a space probe standing on gold legs.'],
 ['day-night-gravity','Day and Night','Day & night','Day is when our side of Earth faces the sun; night is when we face away and see the moon and stars. Gravity is the gentle pull that keeps your feet on the ground. What is outside your window right now — day or night?','A Kiddo School Our Earth & Space card titled Day and Night: a smiling sun for day, a sleepy moon and stars for night, Earth held by two gravity arrows and a ringed planet circling its orbit.'],
 ['eclipse-tide-season','Eclipse','Seasons','An eclipse is when the moon slides in front of the sun, a tide is the ocean rising and falling, and the seasons wheel from spring to winter. The four tree friends on this card show all four seasons — which one is out your window?','A Kiddo School Our Earth & Space card titled Eclipse: a moon sliding in front of a smiling sun, a purple wave with the moon pulling the tide, four little trees in spring summer fall and winter, and two thermometers reading cold and hot.'],
 ['equator-north-pole-south-pole','Equator','Geography','The equator is an invisible line around the middle of Earth, and the North Pole and South Pole are the very top and bottom, cold all year. Spin a globe and run your finger around its middle — that line is the equator!','A Kiddo School Our Earth & Space card titled Equator: Earth wearing the equator like a red belt, the North Pole with a snow cap and flag, the South Pole with snow below and a flag, and Earth split into two hemispheres.'],
 ['fossil-rock-mineral','Fossil','Rocks & soil','A fossil is what is left of a plant or animal from long, long ago pressed inside rock, a rock is a hard piece of Earth, and a mineral builds crystals. Next time you see a rock, look close — you are holding a piece of Earth!','A Kiddo School Our Earth & Space card titled Fossil: a happy dinosaur skeleton pressed in golden rock, an orange boulder flexing its arms, a yellow crystal mineral waving and a mound of soil with a green sprout.'],
 ['jupiter-saturn-uranus','Jupiter','Planets','Jupiter is the biggest planet of all, Saturn wears beautiful rings, Uranus spins on its side, and Neptune is the windiest and farthest out. Which of these four giants would you visit first?','A Kiddo School Our Earth & Space card titled Jupiter: four giant planets — Jupiter with swirling stripes, Saturn with a bright ring, Uranus with a sideways ring and deep-blue Neptune — each one smiling.'],
 ['mercury-venus-earth','Mercury','Planets','Mercury is the little planet closest to the sun, Venus is the hottest, Earth is our home, and Mars is the red one robots are exploring right now. Say the four rocky planets out loud, fastest to slowest!','A Kiddo School Our Earth & Space card titled Mercury: Mercury waving with a cratered face, Venus with soft stripes, our blue-and-gold Earth running, and Mars giving a thumbs-up.'],
 ['ocean-mountain-volcano','Ocean','Landforms','The ocean is the huge salty water around the land, a mountain reaches up to the clouds, a volcano can puff out hot lava, and a desert is dry land with cactus. Which one would you explore first — ocean, mountain, volcano or desert?','A Kiddo School Our Earth & Space card titled Ocean: a curling green ocean wave, a snow-capped mountain, a volcano puffing out an eruption and a winking cactus in a sandy desert.'],
 ['planet-dwarf-planet-moon','Planet','Sorting','A planet is a big round world circling the sun, a dwarf planet is a smaller one, and moons circle planets — ours circles Earth. Sort the pictures: which ones circle the sun, and which one circles us?','A Kiddo School Our Earth & Space card titled Planet: a blue planet with a ring waving, a small spotted dwarf planet, a sleepy crescent moon and a strong sun flexing both arms.'],
 ['recycle-water-air','Recycle','Earth care','Recycle means turning bottles, cans and paper into new things instead of trash, and clean water and clean air keep every living thing going. Be an Earth helper today: find one thing at home that can be recycled instead of thrown away.','A Kiddo School Our Earth & Space card titled Recycle: the green recycle arrows with a smiling face, a happy water drop, a soft puff of air and a glowing light bulb for energy.'],
 ['ringed-planet-space-helmet-moon-rock','Ringed Planet','Planets','A ringed planet wears rings of ice and dust, a space helmet lets you breathe out there, a moon rock is a piece of the moon you can hold, and a UFO is a fun word for something flying that nobody can name yet. Build your own moon base story with these!','A Kiddo School Our Earth & Space card titled Ringed Planet: a pink planet with a purple ring, a space helmet with a friendly face inside, a waving purple moon rock and a pink-domed UFO ready to fly.'],
 ['rocket-astronaut-space-station','Rocket','Space travel','A rocket blasts off with fire under it, an astronaut rides inside, and the space station is the house in orbit where astronauts live and work. A telescope waits on the ground to watch it all. Count down from three — blastoff!','A Kiddo School Our Earth & Space card titled Rocket: a purple-and-cream rocket zooming upward, a waving astronaut floating, a space station with big solar wings and a telescope on its tripod.'],
 ['rotation-revolution-axis','Rotation','Earth & space','Rotation is Earth spinning like a top once a day, revolution is Earth walking all the way around the sun once a year, and the axis is the make-believe line through the middle. Spin in one slow circle — you just rotated like Earth!','A Kiddo School Our Earth & Space card titled Rotation: Earth spinning with a pink arrow, Earth circling the smiling sun, Earth standing on its axis rod, and sunshine lighting up half the planet for daylight.'],
 ['rover-lander-space-mission','Rover','Space travel','A rover is a robot car that drives on another planet, a lander is the craft that sets it down softly, and a space mission is the whole plan from launch to landing. Draw the robot car you would send to Mars!','A Kiddo School Our Earth & Space card titled Rover: a six-wheeled rover with a camera eye, a lander standing on gold legs with a ladder, a rocket blasting off for the space mission and a space shuttle launching through flames.'],
 ['solar-panel-wind-turbine-rain','Solar Panel','Weather','A solar panel catches sunshine and turns it into power, a wind turbine catches the wind, and rain and snow are the weather falling from clouds. Look up: is the sun out or are the clouds dropping rain today?','A Kiddo School Our Earth & Space card titled Solar Panel: a smiling solar panel with the sun above it, a waving wind turbine, a purple cloud dropping rain and a pale cloud dropping snow.'],
 ['solar-system-constellation-black-hole','Solar System','Big ideas','The solar system is our sun and everything that circles it, a constellation is a picture made of connected stars, and a black hole pulls everything close with super-strong gravity — even light cannot get out! A light year is how far light travels in one whole year.','A Kiddo School Our Earth & Space card titled Solar System: the sun with planets circling on their orbit lines, a constellation of connected yellow stars, a swirling black hole and a green character zooming along a light-year arrow.'],
 ['space-walk-alien-moon-base','Space Walk','Pretend play','A space walk is an astronaut floating outside the ship, an alien is a make-believe friend from another planet, and a moon base is a little house built on the moon. Float around your room like a real space walk — slow bouncy steps only!','A Kiddo School Our Earth & Space card titled Space Walk: an astronaut waving while floating, a blue three-eyed alien, a moon base dome with a flag and a blue rocket zooming off for galactic travel.'],
 ['star-comet-asteroid','Star','Stars & space','A star is a giant ball of glowing gas — our sun is the closest one, a comet drags its icy tail across the sky, an asteroid is a rocky leftover from when the planets formed, and a galaxy is a huge island of billions of stars. Count the stars you can see tonight!','A Kiddo School Our Earth & Space card titled Star: a winking yellow star, a golden comet with a blazing tail, a toothy yellow asteroid and a smiling spiral galaxy.'],
 ['sun-moon-earth','Sun','Sun & moon','The sun is the star that lights our day, the moon circles our Earth, and Earth is the planet we all share — the one with oceans, forests and you. Look up and find them: which one is out right now, the sun or the moon?','A Kiddo School Our Earth & Space card titled Sun: a laughing yellow sun, a sleepy gold moon, our waving purple-and-gold Earth and red Mars waving hello.'],
 ['sunrise-sunset-cloud','Sunrise','Sky watching','A sunrise is when the sun peeks over the edge of the world in the morning, a sunset is when it waves goodnight, and clouds and rainbows float between. Catch the sunrise or the sunset tomorrow — then tell somebody what color the sky turned!','A Kiddo School Our Earth & Space card titled Sunrise: the sun rising over the horizon line, the sun setting with sleepy rays, a soft white cloud waving and a proud rainbow stretching over the sky.'],
 ['tropical-polar-temperate','Tropical','Climate','Tropical places stay hot with palm trees, polar places stay freezing with ice and polar bears, and temperate places in the middle get all four seasons. The climate card shows Earth holding its thermometer. Which kind of place do you live in?','A Kiddo School Our Earth & Space card titled Tropical: a palm tree with a coconut drink for tropical, a polar bear on an ice floe for polar, a leafy tree for temperate and Earth holding a thermometer for climate.'],
 ['weather-wind-thunder','Weather','Weather words','Weather is what the sky is doing right now, wind is air you can feel moving, thunder is the boom after lightning flashes. Play weather reporter today: look outside and say the weather out loud — sunny, windy or stormy?','A Kiddo School Our Earth & Space card titled Weather: the sun peeking behind a purple cloud, a cloud blowing curly wind, a grumpy thunder cloud flexing its arms and a bold yellow lightning bolt.'],
].map(([slug,word,sub,say,alt])=>({slug,file:slug+'-flashcard-for-kids.webp',pageSlug:slug,word,sub,say,alt}));

/* Guards: exactly the owner's 24 cards in file order, every entry complete,
   all unique. */
if(CARDS.length!==24)throw Error('earth-and-space: expected 24 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==ES_ORDER.join('|'))throw Error('earth-and-space: card order does not match ES_ORDER');
for(const c of CARDS){
 if(!c.file.endsWith('-flashcard-for-kids.webp'))throw Error('earth-and-space: SEO file name broken for '+c.slug);
 if(c.alt.length<80)throw Error('earth-and-space: thin alt for '+c.slug);
 if(c.say.length<60)throw Error('earth-and-space: thin say for '+c.slug);
 if(!c.sub)throw Error('earth-and-space: missing subject for '+c.slug);
}

export const ES_CARDS=CARDS;
export const esBySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

/* Six shelves, in a kid's day order: the ground under your feet first, then
   the sun's family, the spinning day, the weather, the rockets, and the
   stars to finish. */
export const ES_SHELVES=[
 {id:'my-planet',label:'MY BLUE PLANET SHELF \u00b7 4 CARDS',h2:'The ground, the water, the air.',
  hint:'Printable Earth flashcards for kids: landforms, rivers and forests, rocks and fossils, and taking care of the water and air — the planet science that starts in your own backyard.',
  slugs:['ocean-mountain-volcano','atmosphere-continent-river','fossil-rock-mineral','recycle-water-air']},
 {id:'sun-family',label:'THE SUN\u2019S FAMILY SHELF \u00b7 5 CARDS',h2:'Meet the planets.',
  hint:'Solar system flashcards for preschool and up: our sun and moon, the rocky planets, the four giant planets, dwarf planets and the ringed planet — planet names kids love to shout.',
  slugs:['sun-moon-earth','mercury-venus-earth','jupiter-saturn-uranus','planet-dwarf-planet-moon','ringed-planet-space-helmet-moon-rock']},
 {id:'spin',label:'THE SPINNING DAY SHELF \u00b7 4 CARDS',h2:'Why the sun comes up and goes down.',
  hint:'Day and night, sunrise and sunset, the seasons and the spin of Earth — the sky science kids ask about at bedtime, with a job to try out the window.',
  slugs:['day-night-gravity','rotation-revolution-axis','eclipse-tide-season','sunrise-sunset-cloud']},
 {id:'weather',label:'THE WEATHER &amp; WORLD SHELF \u00b7 4 CARDS',h2:'What is the sky doing today?',
  hint:'Weather flashcards plus the whole-planet map: wind, thunder and lightning, sun power and wind power, the equator and the poles, and the three climate zones — weather words for the morning routine.',
  slugs:['weather-wind-thunder','solar-panel-wind-turbine-rain','equator-north-pole-south-pole','tropical-polar-temperate']},
 {id:'travel',label:'THE ROCKETS &amp; ASTRONAUTS SHELF \u00b7 4 CARDS',h2:'Count down: three, two, one\u2026 blastoff!',
  hint:'Space travel flashcards: rockets, astronauts and space suits, rovers and landers, satellites and space stations, space walks and moon bases — pretend-play fuel for future astronauts.',
  slugs:['rocket-astronaut-space-station','crater-satellite-space-suit','rover-lander-space-mission','space-walk-alien-moon-base']},
 {id:'far-space',label:'THE STARS &amp; FAR SPACE SHELF \u00b7 3 CARDS',h2:'Stars, visitors and very big ideas.',
  hint:'Star flashcards and the deep-space finish: stars and galaxies, comets, asteroids and meteors, constellations and black holes — the big words said small enough for a five-year-old.',
  slugs:['star-comet-asteroid','comet-asteroid-meteor','solar-system-constellation-black-hole']}];
{
 const shelved=ES_SHELVES.flatMap(s=>s.slugs).sort().join('|');
 if(shelved!==ES_ORDER.slice().sort().join('|'))throw Error('earth-and-space: shelves must cover the deck exactly once');
}

/* Level pills name school grades (owner 2026-10-31): Preschool = name it
   (8), Grade 1 = do it (9), Grade 2 = own it (7). 8/9/7 guarded. */
const ES_LEVEL={
 'sun-moon-earth':1,'ocean-mountain-volcano':1,'sunrise-sunset-cloud':1,'weather-wind-thunder':1,
 'day-night-gravity':1,'planet-dwarf-planet-moon':1,'star-comet-asteroid':1,'atmosphere-continent-river':1,
 'mercury-venus-earth':2,'jupiter-saturn-uranus':2,'fossil-rock-mineral':2,'recycle-water-air':2,
 'solar-panel-wind-turbine-rain':2,'crater-satellite-space-suit':2,'rocket-astronaut-space-station':2,
 'rover-lander-space-mission':2,'space-walk-alien-moon-base':2,
 'rotation-revolution-axis':3,'eclipse-tide-season':3,'equator-north-pole-south-pole':3,
 'tropical-polar-temperate':3,'comet-asteroid-meteor':3,'ringed-planet-space-helmet-moon-rock':3,
 'solar-system-constellation-black-hole':3};
/* Skill pill per card (owner: "age, skill if any, level pill, subject pill"). */
const ES_SKILL={
 'sun-moon-earth':'Sky watching','mercury-venus-earth':'Planet names','jupiter-saturn-uranus':'Planet names',
 'planet-dwarf-planet-moon':'Sorting','ringed-planet-space-helmet-moon-rock':'Space words',
 'ocean-mountain-volcano':'Landforms','atmosphere-continent-river':'Earth words','fossil-rock-mineral':'Nature hunt',
 'recycle-water-air':'Recycling','day-night-gravity':'Time words','rotation-revolution-axis':'Earth science',
 'eclipse-tide-season':'Patterns','sunrise-sunset-cloud':'Time words','weather-wind-thunder':'Weather words',
 'solar-panel-wind-turbine-rain':'Earth care','equator-north-pole-south-pole':'Map skills',
 'tropical-polar-temperate':'Comparing','crater-satellite-space-suit':'Space words',
 'rocket-astronaut-space-station':'Pretend play','rover-lander-space-mission':'Pretend play',
 'space-walk-alien-moon-base':'Movement','star-comet-asteroid':'Sorting','comet-asteroid-meteor':'Sky watching',
 'solar-system-constellation-black-hole':'Sky watching'};
/* Owner 2026-10-31: "levels are grade 1, grade 2, preschool" — the level pill
   names the school grade, not "Level 1/2/3". */
const ES_LEVEL_NAMES={1:'Preschool \u00b7 Name it',2:'Grade 1 \u00b7 Do it',3:'Grade 2 \u00b7 Own it'};
const ES_LEVEL_BLURB={
 1:'the eight cards to start with — sun, moon and Earth, the ocean and the mountain, day and night, sunrise and sunset, and the weather words a four-year-old hears every single day',
 2:'the nine doing cards — the planet names, rocks and fossils, recycling, sun power, and the rockets, rovers and space suits that turn pretend play into a mission',
 3:'the seven bigger ideas — the spinning Earth, eclipses and tides, the equator and the poles, climate zones, and the far-space finish from comets to black holes'};
const ES_LEVEL_COUNTS=Object.fromEntries([1,2,3].map(l=>[l,CARDS.filter(c=>ES_LEVEL[c.slug]===l).length]));
if(ES_LEVEL_COUNTS[1]!==8||ES_LEVEL_COUNTS[2]!==9||ES_LEVEL_COUNTS[3]!==7)throw Error('earth-and-space: level sizes drifted '+JSON.stringify(ES_LEVEL_COUNTS));
if(Object.keys(ES_SKILL).length!==24)throw Error('earth-and-space: skill deck must cover 24 cards');
for(const c of CARDS){if(!ES_SKILL[c.slug])throw Error('earth-and-space: missing skill for '+c.slug);if(!ES_LEVEL[c.slug])throw Error('earth-and-space: missing level for '+c.slug);}

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

/* ---- The class page — the WHOLE deck on this one page --------------------- */
function tile(c){
 const pills=`<span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 4\u20135</span><span class="fc-pill fc-pill-subject">${esc(c.sub)}</span><span class="fc-pill fc-pill-level">${ES_LEVEL_NAMES[ES_LEVEL[c.slug]]}</span><span class="fc-pill fc-pill-skill">${esc(ES_SKILL[c.slug])}</span></span>`;
 return `<figure class="mn-card"><img src="${ES_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong>${pills}<figcaption class="mn-tip">${esc(c.say)}</figcaption><div class="mn-actions"><a class="button" href="${ES_BASE}${c.file}" download="${c.pageSlug}.webp">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function esClassBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">LEARNING PATH \u00b7 CLASS 43 \u00b7 OUR EARTH &amp; SPACE \u00b7 AGES 4\u20135</span><h1>Our Earth &amp; Space — twenty-four printable space flashcards to download and print.</h1><p class="lesson-lede">Twenty-four printable Earth and space flashcards for ages four to five, all on this one page, in six shelves: my blue planet, the sun\u2019s family, the spinning day, weather and world, rockets and astronauts, and the stars to finish. Every card carries its idea in words YOU can say back — the sun lights our day; Earth spins once and that makes tomorrow; gravity keeps your feet on the ground — with Download and Print buttons right under the picture. Pick a card, print it, and the universe walks into your kitchen: planets at breakfast, weather words on the walk, a countdown to blastoff before bath.</p><div class="lesson-start"><a class="button button-ghost" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${ES_BASE}${ES_COVER.file}" width="${ES_COVER.w}" height="${ES_COVER.h}" alt="${esc(ES_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>One sky idea. The child says it. Then the sky does the teaching.</h2><p class="lesson-copy">Every card prints one Earth-and-space idea the way a four-year-old meets it: what the sun is doing, why the moon changes shape, where the rain comes from, how a rocket gets off the ground. The small words under each picture are the idea itself, said kid-first — day is when our side of Earth faces the sun; a comet drags its tail; look up and count the stars you can see. The Download button saves the full-size card; Print runs just that one card through the printer. Space words grow the same way the cards run — big ideas, small words, said again and again.</p><p class="lesson-copy">The shelves follow a look-up day. My Blue Planet starts with the ground, the water and the air — the parts of Earth you can touch today. The Sun\u2019s Family lines up the planets, from our own sun and moon out to Neptune. The Spinning Day shelf answers the bedtime question — why does the sun come up? Weather &amp; World reads the sky outside the window and lays out the whole map, equator to poles. Rockets &amp; Astronauts counts down to blastoff with the gear real space travelers use. And the Stars shelf finishes far, far away — comets, constellations, galaxies and one friendly black hole.</p></section>`;
 const shelfSections=ES_SHELVES.map(sh=>`<section class="wrap lesson-section" id="shelf-${sh.id}"><span class="eyebrow">${sh.label}</span><h2>${sh.h2}</h2><p class="fc-hint">${sh.hint} Download takes the full-size card; Print runs just that one card through the printer. Every pill answers one question: the age, the subject, the grade level, the skill it builds.</p><div class="mn-cards">${sh.slugs.map(s=>tile(esBySlug[s])).join('')}</div></section>`).join('');
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where the sky learning grows.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/4-years/science-nature-and-discovery/">Science experiments in Class 31 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/weather-seasons-and-what-we-wear/">Weather lessons in Class 34 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/time-and-daily-routine/">Day &amp; night cards in Class 41 <span>\u00b7 Ages 4\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/science-at-a-glance/">Science at a Glance sheets <span>\u00b7 Ages 2\u20135</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/learning-path/">The Learning Path <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Class 31 runs the experiments — sink or float, magnets, the water cycle — and this class names the planets and the weather those experiments play with. Class 34 walks through every kind of weather day and the clothes that match it, and Class 41 prints the day-and-night routine cards that pair with the spinning Earth right here. Science at a Glance keeps the whole science wall on one page for the youngest scientists. And when the day needs a plan, the Learning Path holds all forty-three classes in order.</p></section>`;
 return `${hero}${how}${shelfSections}${around}<p class="lesson-note"><strong>Space is not far away — it starts at your window.</strong> Every card here hands the sky words to you — the planets, the weather, the countdown — and your grown-up\u2019s whole job is to look up with you.</p>`;
}

/* ---- Inbound-link blocks, appended at the four pages' page() calls -------- */
/* Appended to Class 31 · Science, Nature & Discovery. */
export const ES_SCIENCE_LINK=`<section class="wrap lesson-section"><span class="eyebrow">FROM EXPERIMENTS TO THE STARS</span><h2>Class 43 \u00b7 Our Earth &amp; Space.</h2><p class="lesson-copy">Class 31 predicts, tests and writes down what happened — and the <a href="/earth-and-space/">Our Earth &amp; Space class</a> looks all the way up: twenty-four printable space flashcards for ages 4\u20135 with the planets, the spinning Earth, the weather, rockets and astronauts, and the stars. Every card downloads and prints straight from the class page with its sky words and a way to try it today right beneath the image.</p></section>`;
/* Appended to Class 34 · Weather, Seasons & What We Wear. */
export const ES_WEATHER_LINK=`<section class="wrap lesson-section"><span class="eyebrow">FROM WEATHER DAYS TO THE WHOLE SKY</span><h2>Class 43 \u00b7 Our Earth &amp; Space.</h2><p class="lesson-copy">Class 34 dresses for every kind of day — sun hats, raincoats, winter coats — and the <a href="/earth-and-space/">Our Earth &amp; Space class</a> explains what the sky is doing up there: twenty-four printable flashcards for ages 4\u20135 with weather and wind, thunder and lightning, rain and snow, the equator and the poles, and the climate zones that decide what you wear. Every card prints straight from the class page — the weather words your child just used, now with the planets above them.</p></section>`;
/* Appended to Class 41 · Time & Daily Routine. */
export const ES_ROUTINE_LINK=`<section class="wrap lesson-section"><span class="eyebrow">WHY THE DAY TURNS</span><h2>Class 43 \u00b7 Our Earth &amp; Space.</h2><p class="lesson-copy">Class 41 plans the day — first, next, last; now, soon, later — and the <a href="/earth-and-space/">Our Earth &amp; Space class</a> shows why the day turns at all: Earth spins once for every day and night, walks around the sun once a year, and the seasons ride along. Twenty-four printable space flashcards for ages 4\u20135, every one downloadable and printable straight from the class page — the routine YOU just practiced, hung on the sky that makes it.</p></section>`;
/* Appended to Science at a Glance. */
export const ES_GLANCE_LINK=`<section class="wrap lesson-section"><span class="eyebrow">FROM THE WALL TO THE WINDOW</span><h2>Class 43 \u00b7 Our Earth &amp; Space.</h2><p class="lesson-copy">These first-picture science sheets name the parts — the water cycle, the planets, the weather — and the <a href="/earth-and-space/">Our Earth &amp; Space class</a> gives every one of those ideas a card your child can hold: twenty-four printable space flashcards for ages 4\u20135, from the ocean and the atmosphere out to comets and black holes, each with Download and Print right under the picture.</p></section>`;
