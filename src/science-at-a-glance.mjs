/* Science at a Glance — the owner's 65 first-picture science sheets
   (R2 bucket kiddo-school-assets/school/extra-classes/science-at-a-glance/,
   probed LIVE 2026-10-31: 65/65 HTTP 200 image/webp, every file 800×1035,
   29–83 kB). 2026-10-31, after the first push, the owner asked: "why did
   you remove the other glance? told you put the science with it" — so the
   sheets live ON the First Glance page (/first-glance/) as its THIRD BAND,
   not on a separate URL: the standalone page is gone, /science-at-a-glance/
   301s to /first-glance/, and the site header's featured chip is back on
   First Glance ("New · First Glance · 123 first-picture sheets · Ages 2–5").
   Every sheet still carries Download + Print buttons under the image with
   a description and age / subject / level / skill pills, grouped in six
   sections; sheet descriptions talk DIRECTLY TO THE KID (the owner's
   dialogue rule), while the framing copy uses the words USA parents search.
   The owner's word-ban holds: no "no sign up", "no paywall", "free to use",
   "no account", "free forever" anywhere. Card words are read off the
   artwork via labeled contact sheets, so alts can never drift from the
   real images. */
import {R2} from './adventure-kit.mjs';

export const SG_PATH='/science-at-a-glance/';
export const SG_BASE=R2+'school/extra-classes/science-at-a-glance/';
export const SG_W=800,SG_H=1035;
export const SG_LEVEL_NAMES={1:'Level 1 · Name it',2:'Level 2 · Tell it',3:'Level 3 · Ask why'};

/* card fields: slug file name · t title printed on the artwork ·
   w labels shown on the sheet (drives the alt text) · d one short
   kid-directed description (dialogue: it talks to the child) ·
   sk skill pill · lvl 1 Name it / 2 Tell it / 3 Ask why. */

const BODY=[
 {slug:'blood-components',t:'Blood Components',w:['Red blood cells','White blood cells','Platelets','Plasma'],lvl:1,sk:'naming',
  d:'Say hi to your blood team! Red cells carry oxygen, white cells fight germs, and platelets patch your scrapes. Which one is the biggest?'},
 {slug:'circulatory-system',t:'Circulatory System',w:['Heart','Veins','Arteries','Capillaries','Oxygen-rich blood','Oxygen-poor blood'],lvl:2,sk:'sequencing',
  d:'Your heart is a pump that never stops! Follow the arrows: blood leaves the heart, visits your toes, and comes right back. Can you trace one full trip with your finger?'},
 {slug:'digestive-system',t:'Digestive System',w:['Mouth','Esophagus','Stomach','Small intestine','Large intestine','Rectum'],lvl:2,sk:'sequencing',
  d:'Follow your apple on its trip! You chew it in your mouth, it slides down the tube, and your stomach squeezes it around. Where does the trip start?'},
 {slug:'endocrine-system',t:'Endocrine System',w:['Pituitary gland','Thyroid gland','Adrenal glands','Pancreas','Hormones'],lvl:3,sk:'vocabulary',
  d:'Your body has tiny messengers called hormones! They tell you to grow taller, sleep deeper and run faster. Can you say “hormones”?'},
 {slug:'human-brain',t:'Human Brain',w:['Cerebrum','Frontal lobe','Cerebellum','Brain stem','Spinal cord'],lvl:1,sk:'naming',
  d:'This is your brain — the boss of everything you do! It thinks, remembers and even blinks for you. Put your hand on your head and say hello to it.'},
 {slug:'human-skeleton',t:'Human Skeleton',w:['Skull','Spine','Rib cage','Humerus','Pelvis','Femur'],lvl:1,sk:'naming',
  d:'Bones hold you up all day long! Your skull guards your brain and your ribs make a cage for your heart. Can you touch your own ribs?'},
 {slug:'muscular-system',t:'Muscular System',w:['Biceps','Triceps','Abdominals','Quadriceps','Hamstrings','Tendons'],lvl:1,sk:'body awareness',
  d:'Your muscles move you everywhere! Bend your arm and feel your biceps squeeze. Can you make a strong arm like the kid on the card?'},
 {slug:'nervous-system',t:'Nervous System',w:['Brain','Spinal cord','Nerves','Sensory input','Motor response'],lvl:2,sk:'cause and effect',
  d:'Your body has a speedy mail service! Touch something warm and the news zips up your nerves to your brain, then zips right back: “move your hand!” How fast was that?'},
 {slug:'respiratory-system',t:'Respiratory System',w:['Nose and mouth','Trachea','Bronchi','Lungs','Diaphragm'],lvl:2,sk:'observing',
  d:'Take a big breath in — your lungs are filling like two balloons! Now blow it all out. That is oxygen going in and carbon dioxide coming out.'},
 {slug:'the-ear',t:'The Ear',w:['Outer ear','Middle ear bones','Cochlea','Ear canal','Eardrum','Auditory nerve'],lvl:1,sk:'naming',
  d:'Your ears catch sounds all day! Sound travels down the tunnel, taps the eardrum, and your brain hears it. Can you wiggle your ears?'},
 {slug:'the-eye',t:'The Eye',w:['Cornea','Iris','Pupil','Lens','Retina','Optic nerve'],lvl:1,sk:'naming',
  d:'Look in a mirror — that dark circle in your eye is the pupil, and it opens and closes like a tiny door! Blink twice if you can see this.'},
 {slug:'urinary-system',t:'Urinary System',w:['Kidneys','Ureters','Bladder','Urethra'],lvl:2,sk:'naming',
  d:'Your kidneys are two little cleaners! They wash your blood and make pee, your bladder holds it, and out it goes. Everybody pees — it is how your body takes out the trash!'}];

const NATURE=[
 {slug:'animal-adaptations',t:'Animal Adaptations',w:['Camouflage','Thick fur','Webbed feet','Sharp claws','Long beak','Blubber'],lvl:2,sk:'matching',
  d:'Every animal wears its own super suit! The duck’s webbed feet paddle, the polar bear’s thick fur keeps him toasty, and the chameleon almost disappears. Which super suit would you pick?'},
 {slug:'animal-classification',t:'Animal Classification',w:['Mammals','Birds','Fish','Reptiles','Amphibians','Invertebrates'],lvl:2,sk:'sorting',
  d:'Scientists sort animals into teams! Mammals drink milk, birds have feathers, and fish live underwater. Which team do YOU belong to?'},
 {slug:'butterfly-life-cycle',t:'Butterfly Life Cycle',w:['Egg','Caterpillar','Chrysalis','Adult butterfly'],lvl:2,sk:'sequencing',
  d:'A butterfly used to be a tiny egg on a leaf! It became a caterpillar, slept in a chrysalis, and came out with beautiful wings. Can you say the four steps in order?'},
 {slug:'carbon-cycle',t:'Carbon Cycle',w:['Carbon dioxide','Respiration','Combustion','Plants','Animals','Fossil fuels'],lvl:3,sk:'cycling',
  d:'Carbon atoms never sit still! They float in the air, get eaten with your food, and drift back out again. Follow one carbon atom around the loop — where does it go next?'},
 {slug:'carbon-dioxide-and-oxygen-cycle',t:'Carbon Dioxide and Oxygen Cycle',w:['Atmosphere','Carbon dioxide','Oxygen','Photosynthesis','Respiration'],lvl:3,sk:'cycling',
  d:'You and the plants swap air all day! You breathe out carbon dioxide, the plants breathe it in, and they hand you back fresh oxygen. Take a breath and say thank you to a plant!'},
 {slug:'ecological-pyramid',t:'Ecological Pyramid',w:['Producer','Primary consumers','Secondary consumers','Tertiary consumers'],lvl:3,sk:'ordering',
  d:'Look at the energy ladder! Grass grows at the bottom, the rabbit eats the grass, and the eagle sits on top. Why do you think only one eagle fits up there?'},
 {slug:'ecosystem',t:'Ecosystem',w:['Sun','Producer','Herbivore','Carnivore','Decomposer','Soil'],lvl:2,sk:'connections',
  d:'A backyard is a whole team! The sun feeds the grass, the rabbit eats the grass, the fox eats the rabbit, and the mushrooms clean up after everyone. What team lives near your house?'},
 {slug:'food-chain',t:'Food Chain',w:['Sun','Producer','Primary consumer','Secondary consumer','Decomposer'],lvl:2,sk:'sequencing',
  d:'The sun feeds the plant, the caterpillar eats the plant, the bird eats the caterpillar — that is a food chain! Can you say it in order, fast?'},
 {slug:'food-web',t:'Food Web',w:['Hawk','Snake','Fox','Mouse','Rabbit','Caterpillar','Grass','Decomposer'],lvl:3,sk:'connections',
  d:'Real animals do not eat just one thing — they weave a food web! The hawk chases the mouse, the mouse nibbles the grass, and everyone is connected. How many arrows can you follow?'},
 {slug:'frog-life-cycle',t:'Frog Life Cycle',w:['Egg','Tadpole','Tadpole with legs','Froglet','Adult frog'],lvl:2,sk:'sequencing',
  d:'A tadpole does not look like a frog at all! It hatches from jelly eggs, grows legs, loses its tail, and hops away. Can you count all five steps out loud?'},
 {slug:'microorganisms',t:'Microorganisms',w:['Bacteria','Fungi','Protozoa','Algae','Virus'],lvl:3,sk:'sorting',
  d:'Tiny living things are everywhere — too small to see! Some help your tummy digest snacks, and some make you sneeze so you rest and heal. Can you say “microorganism” three times fast?'},
 {slug:'natural-selection',t:'Natural Selection',w:['Variation','Survival','Reproduction','Adaptation'],lvl:3,sk:'cause and effect',
  d:'Why do birds come in different colors? The ones who fit their home best grow up, have babies, and pass it on — over many, many years. What color bird would survive in your yard?'}];

const PLANTS=[
 {slug:'cell-cycle',t:'Cell Cycle',w:['Interphase','Prophase','Metaphase','Anaphase','Telophase','Cytokinesis'],lvl:3,sk:'sequencing',
  d:'You grew from ONE tiny cell! Cells take turns copying themselves and splitting in two, over and over. Can you clap the rhythm — grow… copy… split!'},
 {slug:'dna-structure',t:'DNA Structure',w:['Double helix','Nucleotide','Base pairs','Genetic information'],lvl:3,sk:'vocabulary',
  d:'Inside almost every cell is a twisted ladder called DNA — the recipe for YOU! It helps decide if your hair is curly and your eyes are brown. Say “double helix”!'},
 {slug:'genetic-inheritance',t:'Genetic Inheritance',w:['Genes','Alleles','Offspring','Inherited traits'],lvl:3,sk:'predicting',
  d:'You got your genes from two people — your parents! Maybe you have Dad’s curly hair and Mom’s straight hair. What did you inherit from your family?'},
 {slug:'plant-and-animal-cells',t:'Plant and Animal Cells',w:['Plant cell','Animal cell','Cell wall','Nucleus','Chloroplast','Vacuole'],lvl:3,sk:'comparing',
  d:'Plant cells and animal cells are neighbors with different houses! Only plant cells have a sturdy cell wall, like a brick fence. Can you spot three differences on the sheet?'},
 {slug:'plant-life-cycle',t:'Plant Life Cycle',w:['Seed','Germination','Seedling','Mature plant','Flower','Fruit and seeds'],lvl:2,sk:'sequencing',
  d:'Every sunflower started as a tiny seed! It sprouts, grows leaves, opens a flower, and makes NEW seeds inside fruit. Can you plant a bean this week and watch step one happen?'},
 {slug:'plant-water-transport',t:'Plant Water Transport',w:['Roots','Xylem','Leaves','Stomata','Water vapor'],lvl:2,sk:'sequencing',
  d:'How does a tall tree drink? Water climbs up little straws from the roots, all the way to the leaves, and puffs out as vapor. Can you sip like a plant? Slurp!'},
 {slug:'photosynthesis',t:'Photosynthesis',w:['Sunlight','Water','Carbon dioxide','Leaf','Glucose','Oxygen'],lvl:2,sk:'process talk',
  d:'Plants cook their own food! Sunshine plus water plus air makes plant food — and they kindly share the leftover oxygen with you. Wave thank-you to the nearest tree.'}];

const EARTH=[
 {slug:'cloud-formation',t:'Cloud Formation',w:['Warm air rises','Cooling','Condensation','Cloud','Rain','Runoff'],lvl:2,sk:'process talk',
  d:'Clouds are born in the sky! Warm air rises up, cools down, and huddles together into a cloud — then drops rain that runs back to the sea. Look up: can you spot what the clouds are doing today?'},
 {slug:'four-seasons',t:'The Four Seasons',w:['Spring','Summer','Autumn','Winter','Tilted axis','Orbit'],lvl:1,sk:'seasons',
  d:'Earth goes on a year-long trip around the sun, tilted like a leaning top — that is why we get spring, summer, fall and winter! Which season do you love most?'},
 {slug:'layers-of-earth',t:'Layers of Earth',w:['Crust','Lithosphere','Mantle','Outer core','Inner core'],lvl:1,sk:'naming',
  d:'Earth is like a giant peach! Thin skin on the outside, a thick juicy middle, and a pit of hot metal in the very center. Can you draw the layers with your crayons?'},
 {slug:'nitrogen-cycle',t:'Nitrogen Cycle',w:['Atmospheric nitrogen','Nitrogen fixation','Decomposition','Plants','Animals'],lvl:3,sk:'cycling',
  d:'The air is full of nitrogen, but plants cannot drink it — until tiny soil helpers turn it into plant food! Cows eat the plants, and around it goes. Who are the tiny helpers? Can you say it — bacteria!'},
 {slug:'ocean-tides',t:'Ocean Tides',w:['High tide','Low tide','Moon’s gravity','Ocean bulge'],lvl:2,sk:'cause and effect',
  d:'The Moon pulls the ocean with invisible strings called gravity! The water bulges up at the beach twice a day — that is high tide. Next beach day, you be the detective: is the tide coming in or going out?'},
 {slug:'ocean-zones',t:'Ocean Zones',w:['Sunlight zone','Twilight zone','Midnight zone','Abyssal zone','Hadal zone'],lvl:1,sk:'naming',
  d:'The ocean is deeper than mountains are tall! Bright fish swim up top where the sun shines, and glow-in-the-dark creatures live way down in the dark. Which zone would YOU dive to?'},
 {slug:'plate-tectonics',t:'Plate Tectonics',w:['Divergent boundary','Convergent boundary','Transform boundary','Earthquake','Volcano'],lvl:3,sk:'cause and effect',
  d:'Earth’s outside is a puzzle of giant moving plates! They bump, spread and slide — building mountains and shaking earthquakes. Can you push two crackers together and watch what the crumbs do?'},
 {slug:'rock-cycle',t:'Rock Cycle',w:['Magma','Igneous rock','Sedimentary rock','Metamorphic rock','Weathering and erosion'],lvl:2,sk:'cycling',
  d:'Rocks never stop changing! Magma cools into one kind, crumbles into another, and squeezes down into a third — the rock cycle never ends. Can you find a rock outside and guess which kind it is?'},
 {slug:'rocks-and-minerals',t:'Rocks and Minerals',w:['Rock','Mineral','Mixture','Crystal structure'],lvl:1,sk:'comparing',
  d:'A rock is like a cookie with lots of chocolate chips — a mix of minerals! A mineral is one pure ingredient, grown into a crystal. Can you go on a rock hunt and decide: cookie or single chip?'},
 {slug:'states-of-water',t:'States of Water',w:['Ice','Liquid water','Water vapor','Melting','Freezing','Evaporation','Condensation'],lvl:1,sk:'observing',
  d:'Water is a shape-shifter! It is your ice cube, your bath, and the steam over your soup — same water, three costumes. Which costume is in your cup right now?'},
 {slug:'types-of-clouds',t:'Types of Clouds',w:['Cirrus','Cumulus','Stratus','Cumulonimbus'],lvl:1,sk:'observing',
  d:'Clouds have names, just like you! Wispy cirrus curls up high, puffy cumulus floats low, and a big gray cumulonimbus means “umbrella!”. What clouds are out your window?'},
 {slug:'volcano-anatomy',t:'Volcano Anatomy',w:['Ash cloud','Crater','Lava','Main vent','Side vent','Magma chamber'],lvl:1,sk:'naming',
  d:'Boom! A volcano is a mountain with a hot tummy. Magma waits in the chamber, then WHOOSH — it erupts as lava and ash. Can you stomp like an erupting volcano?'},
 {slug:'water-cycle',t:'Water Cycle',w:['Evaporation','Condensation','Precipitation','Collection','Transpiration'],lvl:2,sk:'cycling',
  d:'The ocean’s water goes on a trip! The sun lifts it up as vapor, clouds catch it, rain drops it on the mountains, and rivers carry it home. The same water the dinosaurs drank is in your cup!'},
 {slug:'weather-fronts',t:'Weather Fronts',w:['Cold front','Warm front','Occluded front','Stationary front'],lvl:3,sk:'predicting',
  d:'Weather is air pushing air! A cold front shoves the warm air up and builds big clouds; a warm front tiptoes in with gentle rain. You can be tonight’s weather reporter — who wins the pushing game?'},
 {slug:'weather-instruments',t:'Weather Instruments',w:['Thermometer','Rain gauge','Anemometer','Wind vane'],lvl:1,sk:'measuring',
  d:'Be the family weather scientist! A thermometer checks how warm it is, a rain gauge catches drops, an anemometer spins in the wind, and a wind vane points where it blows. Which one will you make?'}];

const SPACE=[
 {slug:'moon-phases',t:'Moon Phases',w:['New moon','Waxing crescent','First quarter','Full moon','Waning crescent'],lvl:1,sk:'observing',
  d:'The moon plays dress-up all month! It grows from a skinny sliver to a big round circle, then shrinks back again. Tonight you be the moon spy: which costume is it wearing?'},
 {slug:'solar-and-lunar-eclipses',t:'Solar and Lunar Eclipses',w:['Solar eclipse','Lunar eclipse','Umbra','Light blocked'],lvl:2,sk:'cause and effect',
  d:'Sometimes the moon hides the sun, and sometimes Earth’s shadow sneaks over the moon! It is a game of blocks in space. You can play it tonight with a ball and a lamp.'},
 {slug:'solar-system',t:'Solar System',w:['Sun','Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'],lvl:1,sk:'naming',
  d:'Eight planets race around our sun, and we live on the third one! Mars is red, Saturn wears rings, and Jupiter is the biggest of all. Say their names in order — can you get all eight?'}];

const MATTER=[
 {slug:'classification-of-matter',t:'Classification of Matter',w:['Matter','Pure substance','Element','Compound','Mixture'],lvl:3,sk:'sorting',
  d:'Everything is made of matter, and matter sorts into teams! Pure things like gold, and mixtures like your lemonade. Is your juice a mixture? Of course — that is what makes it yummy!'},
 {slug:'conductors-and-insulators',t:'Conductors and Insulators',w:['Conductor','Insulator','Metal','Copper wire','Rubber','Plastic'],lvl:2,sk:'sorting',
  d:'Electricity loves some materials and bumps into others! Metal wires let it zoom to your lamp; rubber and plastic stop it cold. That is why your plugs wear plastic coats.'},
 {slug:'density',t:'Density',w:['Mass','Volume','Density','Float','Sink'],lvl:2,sk:'predicting',
  d:'Time for float or sink! Things that are heavy for their size sink; light-for-their-size things float. Try it yourself at bath time: does the soap float or sink? Why?'},
 {slug:'electric-circuits',t:'Electric Circuits',w:['Closed circuit','Open circuit','Battery','Switch','Light bulb'],lvl:2,sk:'cause and effect',
  d:'Electricity needs a complete circle to travel! Close the loop and the bulb glows; break the loop and it stops. Your light switch opens and closes the circle — flip!'},
 {slug:'forces-and-motion',t:'Forces and Motion',w:['Push','Pull','Friction','Gravity','Balanced forces'],lvl:1,sk:'movement words',
  d:'Push the door, pull the wagon, drop the ball — you are a force scientist! Gravity pulls things down and friction slows things down. Push a toy car: how far does it go?'},
 {slug:'heat-transfer',t:'Heat Transfer',w:['Conduction','Convection','Radiation'],lvl:3,sk:'observing',
  d:'Heat loves to travel three ways! It hops along the pan handle, swirls around the soup pot, and beams from the sun to your face. Can you feel all three at dinner tonight?'},
 {slug:'magnets',t:'Magnets',w:['North pole','South pole','Magnetic field','Attraction','Repulsion'],lvl:1,sk:'experimenting',
  d:'Magnets are picky friends! N hugs S, but two N’s push apart — like magic, but it is science! Can you go on a magnet hunt around the house? What sticks?'},
 {slug:'ph-scale',t:'The pH Scale',w:['Acidic','Neutral','Basic'],lvl:3,sk:'comparing',
  d:'Lemons are acidic, soap is basic, and plain water sits right in the middle at 7. Sour things are usually acids — what is the sourest thing you have ever tried?'},
 {slug:'properties-of-matter',t:'Properties of Matter',w:['Mass','Volume','Density','State','Solubility','Magnetism'],lvl:2,sk:'describing',
  d:'Every thing has properties — its report card! How heavy, how big, does it dissolve, does it stick to a magnet? Can you pick two objects and describe three properties each?'},
 {slug:'reflection-and-refraction',t:'Reflection and Refraction',w:['Reflection','Refraction','Incident ray','Reflected ray','Refracted ray'],lvl:2,sk:'observing',
  d:'Light plays games! It bounces off mirrors — that is reflection — and bends when it dives into water — that is refraction. That is why your straw looks broken in a glass!'},
 {slug:'renewable-energy',t:'Renewable Energy',w:['Solar energy','Wind energy','Hydropower','Geothermal energy','Electricity'],lvl:1,sk:'eco habits',
  d:'The sun, the wind and moving water never run out of juice — and we can turn all of them into electricity! Point at the sun: you can tell everyone it is charging the whole world right now.'},
 {slug:'simple-machines',t:'Simple Machines',w:['Lever','Pulley','Wheel and axle','Inclined plane','Wedge','Screw'],lvl:1,sk:'spotting',
  d:'Six simple machines do the heavy lifting! The seesaw is a lever, the flagpole rope is a pulley, and the slide is an inclined plane. How many can you spot at the playground?'},
 {slug:'sound-waves',t:'Sound Waves',w:['Vibration','Compression','Rarefaction','Amplitude','Frequency'],lvl:2,sk:'observing',
  d:'Every sound is a wiggle in the air! Hum a song and touch your throat — that tickle is vibration. Hum louder: can you feel the difference?'},
 {slug:'states-of-matter',t:'States of Matter',w:['Solid','Liquid','Gas'],lvl:1,sk:'sorting',
  d:'Ice, water and steam — one thing, three states! Solid particles hug tight, liquid particles slide around, and gas particles fly free. Name one solid, one liquid and one gas in your kitchen!'},
 {slug:'visible-light-spectrum',t:'Visible Light Spectrum',w:['White light','Prism','Red','Orange','Yellow','Green','Blue','Violet'],lvl:1,sk:'naming colors',
  d:'White light hides a rainbow inside! A prism fans it out into red, orange, yellow, green, blue and violet. Can you sing the colors of the rainbow in order?'},
 {slug:'water-molecule',t:'Water Molecule',w:['Oxygen atom','Hydrogen atoms','Covalent bond','Polar molecule'],lvl:3,sk:'vocabulary',
  d:'One little drop of water holds zillions of tiny teams: two hydrogen atoms holding hands with one oxygen atom! Can you say it out loud? H-two-O!'}];

export const SG_SECTIONS=[
 {id:'sg-body',band:'My body',sub:'Human body',folder:'body',cards:BODY,
  intro:'Twelve body sheets, from the brain down to the toes. Little kids love naming body parts — these science posters grow with your child, from “where is your nose?” to real organ names for kindergarten show-and-tell.'},
 {id:'sg-nature',band:'Animals & ecosystems',sub:'Life science',folder:'nature',cards:NATURE,
  intro:'Animal life, food chains and the cycles that keep nature running. Perfect for animal-loving kids, backyard nature walks, and the endless “why?” that starts right around age three.'},
 {id:'sg-plants',band:'Plants, cells & DNA',sub:'Plants & cells',folder:'plants',cards:PLANTS,
  intro:'From a sprouting seed to the DNA recipe inside every cell — the plant and life-science sheets families reach for during garden projects, science fairs and homeschool units.'},
 {id:'sg-earth',band:'Earth, weather & water',sub:'Earth science',folder:'earth',cards:EARTH,
  intro:'Weather charts, the rock cycle, the water cycle and the layers of the earth — the sheets that turn a rainy sidewalk day into a science lesson.'},
 {id:'sg-space',band:'Sun, moon & space',sub:'Space',folder:'space',cards:SPACE,
  intro:'The moon phases, eclipses and all eight planets — bedtime sky-watching with a picture to point at.'},
 {id:'sg-matter',band:'Matter, energy & motion',sub:'Physical science',folder:'matter',cards:MATTER,
  intro:'States of matter, magnets, simple machines and light — the physical-science basics behind every kitchen-sink experiment and playground question.'}];

/* ---- module-level honesty guards: the manifest must equal the probed
   bucket exactly; every description is kid-voice and unique. ---- */
export const SG_CARDS=SG_SECTIONS.flatMap(s=>s.cards);
export const SG_TOTAL=SG_CARDS.length;
if(SG_TOTAL!==65)throw Error('science-at-a-glance: expected 65 sheets, got '+SG_TOTAL);
{
 const slugs=SG_CARDS.map(c=>c.slug);
 if(new Set(slugs).size!==65)throw Error('science-at-a-glance: duplicate slug');
 for(const c of SG_CARDS){
  if(!c.d||c.d.length<60)throw Error('science-at-a-glance: thin description for '+c.slug);
  if(!/you/i.test(c.d))throw Error('science-at-a-glance: not kid-voice for '+c.slug);
  if(!c.w||!c.w.length||!c.sk||![1,2,3].includes(c.lvl))throw Error('science-at-a-glance: incomplete card '+c.slug);
 }
 const starts=new Set(SG_CARDS.map(c=>c.d.slice(0,60)));
 if(starts.size!==65)throw Error('science-at-a-glance: duplicate description opening');
}
export const SG_LEVEL_COUNTS={1:SG_CARDS.filter(c=>c.lvl===1).length,2:SG_CARDS.filter(c=>c.lvl===2).length,3:SG_CARDS.filter(c=>c.lvl===3).length};
export const SG_LEVEL_BLURB={
 1:'Point and name. One big picture, big friendly words, zero reading needed — the sheets a two-year-old can lead.',
 2:'Tell the story back. Life cycles, the water cycle, food chains: your child says what happens next, in order.',
 3:'Ask why together. The bigger-idea sheets — DNA, gravity, the pH scale — best with a grown-up asking the questions.'};

/* ---- the science band inside /first-glance/ (2026-10-31 merge: owner
   "why did you remove the other glance? told you put the science with it"
   — the 65 sheets live ON the First Glance page as its third band; the
   standalone page is gone and 301s to /first-glance/) ---- */
const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const num=n=>n.toLocaleString('en-US');

const altFor=c=>`Science at a Glance “${c.t}” sheet: ${c.w.join(', ')} — a labeled science poster for kids.`;

/* One sheet tile — the parents'-shelf pattern the owner approved
   (image, word, pills, description, Download + Print under the image):
   plus the First Glance tap-to-open link on the artwork. The four pills
   are age / subject / level / skill; Print isolates the one card through
   the shared manners.js handler; the print snapshot keeps artwork + word. */
const tile=c=>`<figure class="mn-card sg-card"><a class="sg-imagelink" href="${SG_BASE}${c.slug}.webp" target="_blank" rel="noopener" aria-label="Open the ${e(c.t)} sheet full size in a new tab"><img src="${SG_BASE}${c.slug}.webp" width="${SG_W}" height="${SG_H}" alt="${e(altFor(c))}" loading="lazy"></a><strong>${e(c.t)}</strong><span class="fc-pillrow"><span class="fc-pill fc-pill-age">Ages 2–5</span><span class="fc-pill fc-pill-subject">${e(c.sub)}</span><span class="fc-pill fc-pill-level">${SG_LEVEL_NAMES[c.lvl]}</span><span class="fc-pill fc-pill-skill">${e(c.sk)}</span></span><figcaption class="mn-tip">${e(c.d)}</figcaption><div class="mn-actions"><a class="button" href="${SG_BASE}${c.slug}.webp" download="${c.slug}.webp">Download <span aria-hidden="true">↓</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">⌘</span></button></div></figure>`;

export function scienceBandBody(){
 const intro=`One big science idea on every sheet — the human body, animals and ecosystems, plants and DNA, weather and water, space, and the physical-science basics. These printable science picture sheets for preschool and kindergarten are drawn big and labeled clearly, so a two-year-old can point and name and a five-year-old can tell the story back and ask why. Download the full-size sheet or print a clean single card for the fridge, the kitchen wall or the homeschool binder.`;
 const levels=`<div class="sg-levels" id="sg-levels"><span class="eyebrow">THE THREE LEVELS</span><p class="fc-hint">Every sheet wears a level pill so tonight’s pick takes one glance. The levels are a suggested order, not a rule — the question your child asked at breakfast is always the right sheet.</p><ol class="fc-steps"><li><span class="fc-stepnum">01</span><div><h3>${SG_LEVEL_NAMES[1]}</h3><p>${SG_LEVEL_BLURB[1]}</p></div></li><li><span class="fc-stepnum">02</span><div><h3>${SG_LEVEL_NAMES[2]}</h3><p>${SG_LEVEL_BLURB[2]}</p></div></li><li><span class="fc-stepnum">03</span><div><h3>${SG_LEVEL_NAMES[3]}</h3><p>${SG_LEVEL_BLURB[3]}</p></div></li></ol></div>`;
 const groups=SG_SECTIONS.map(s=>`<section class="sg-group" id="${s.id}" aria-labelledby="${s.id}-h"><span class="eyebrow">${e(s.band.toUpperCase())} · ${s.cards.length} SHEETS</span><h3 id="${s.id}-h">${e(s.band)}</h3><p class="fc-hint">${e(s.intro)}</p><div class="mn-cards">${s.cards.map(c=>tile({...c,sub:s.sub})).join('')}</div></section>`).join('');
 return `<section class="fg-sec wrap fg-science" id="fg-science" aria-labelledby="fg-science-h"><header class="fg-sec-head"><span class="fg-dot" style="background:var(--rose)"></span><div><h2 id="fg-science-h">Science at a Glance</h2><p>${intro}</p><span class="fc-pill fc-pill-big fc-pill-age">${SG_TOTAL} first-picture sheets · Ages 2–5</span></div><span class="fg-badge">${SG_TOTAL} sheets</span></header><p class="fg-sec-note">${SG_TOTAL} sheets · one big idea per sheet · Download and Print buttons under every picture</p>${levels}${groups}</section>`;
}
