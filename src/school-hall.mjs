// Kiddo School — SCHOOL ROOM · The School Hall (owner 2026-10-30): the
// holidays & special days room at /school-hall/, "listed under School Rooms
// with the other rooms" (it joins the ROOMS registry, so the homepage School
// Rooms section and the /rooms/ hub both carry it). A real school uses its
// hall for assemblies, parties and celebrations — children understand it.
// The hub shows a simple school calendar of the five holidays the owner
// named — Halloween, Thanksgiving, Christmas, Valentine's Day and Eid —
// with the NEXT holiday first; dates are computed at build time from the
// fixed-date table, the fourth-Thursday rule (Thanksgiving) and an expected
// Eid table (the moon decides, and the page says so), so the room stays
// useful all year and never looks empty. Each holiday keeps ONE short page
// at /halloween/, /thanksgiving/, /christmas/, /valentines-day/ and /eid/ —
// short, memorable URLs that stay the same every year — each linking back
// to the Hall. STILL zero per-card URLs anywhere (standing owner rule "no
// individual pages"): the Halloween flashcard sets — action cards,
// activities, feelings and items, probed live on R2 at school/hall/halloween/
// (34 files HTTP 200 image/webp; the owner's twelfth activities file is not
// on R2 yet, so eleven ship) — download and print straight from /halloween/
// via the shared one-page print handler. Holiday pages talk directly to
// kids (owner: "have some activities for kids on description why celebrate
// what's this — talk directly to kids"); grown-up notes speak plainly.
// Owner cross-links: Class 34 and the Art Room point at the Hall, and the
// Hall links back to both. No Etsy mention anywhere. No existing URL changed.
import {R2} from './adventure-kit.mjs';

export const HALL_PATH='/school-hall/';
export const HW_BASE=R2+'school/hall/halloween/';

/* ---- The school calendar -------------------------------------------------- */
/* Five holidays, next occurrence each, sorted at build time. URLs are
   permanent; the dates roll forward automatically with every build. */
export const HALL_HOLIDAYS=[
 {slug:'halloween',name:'Halloween',date:()=>nextFixed(10,31),
  blurb:'Dress up, say boo, carve a friendly pumpkin.'},
 {slug:'thanksgiving',name:'Thanksgiving',date:()=>nextFourthThursday(),
  blurb:'A big dinner and a thank-you list, together.'},
 {slug:'christmas',name:'Christmas',date:()=>nextFixed(12,25),
  blurb:'Lights, songs, presents and the family table.'},
 {slug:'valentines-day',name:'Valentine\u2019s Day',date:()=>nextFixed(2,14),
  blurb:'Little cards that say \u201cI like you.\u201d'},
 {slug:'eid',name:'Eid',date:()=>nextEid(),
  blurb:'New clothes, sweet treats and \u201cEid Mubarak!\u201d'}];

/* Expected Eid dates (Umm al-Qura calculations; actual sighting decides).
   Eid alternates between al-Fitr and al-Adha; the table holds both so
   \u201cthe next Eid\u201d always resolves. Extend it when years roll on —
   the page prints the honest \u201cexpected date\u201d note beside it. */
const EID_EXPECTED=['2027-03-10','2027-05-17','2028-02-26','2028-05-05',
 '2029-02-14','2029-04-24','2030-02-04','2030-04-14','2031-01-24','2031-04-03'];

function today(){const n=new Date();return new Date(n.getFullYear(),n.getMonth(),n.getDate());}
function nextFixed(month,day){
 const t=today();let d=new Date(t.getFullYear(),month-1,day);
 if(d<t)d=new Date(t.getFullYear()+1,month-1,day);return d;}
function nextFourthThursday(){
 const t=today();let y=t.getFullYear();for(;;y++){
  const first=new Date(y,10,1);const shift=(4-first.getDay()+7)%7;
  const fourth=new Date(y,10,1+shift+21);
  if(fourth>=t)return fourth;}}
function nextEid(){
 const t=today();
 for(const iso of EID_EXPECTED){const d=new Date(iso+'T00:00:00');if(d>=t)return d;}
 const last=new Date(EID_EXPECTED[EID_EXPECTED.length-1]+'T00:00:00');
 return new Date(last.getTime()+354*24*3600*1000);}
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export function hallCalendar(){
 return HALL_HOLIDAYS.map(h=>{const d=h.date();
  return {...h,path:'/'+h.slug+'/',iso:d.toISOString().slice(0,10),
   when:`${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`};})
  .sort((a,b)=>a.iso<b.iso?-1:1);
}

/* ---- The Halloween deck --------------------------------------------------- */
/* Four sets, exactly as the owner uploaded them to R2 (probed live). File
   12 of activities is not on R2 yet (404) — eleven ship; when the owner
   uploads it, add its line back and the page grows. */
const W=800,H=1131;
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

const HW_SETS=[
 {dir:'action-verbs',heading:'Halloween Action Cards',intro:'Twelve cards of friendly monsters with a move on every one \u2014 meow like a cat, shake your bones, wiggle your body. Play them one at a time, or shuffle and act them all.',
  cards:[
  ['01-cat-ghost-pumpkin-bat','Meow Like a Cat','A Kiddo School Halloween action card: a spooky cat meowing, a silly ghost saying boo, a wobbly pumpkin wiggling and a happy bat flapping its arms — four characters, four moves.'],
  ['02-skeleton-witch-spider-mummy','Shake Your Bones','A Kiddo School Halloween action card: a dancy skeleton shaking its bones, a cheeky witch cackling, a crawly spider walking its fingers and a sleepy mummy waking up slowly.'],
  ['03-vampire-werewolf-zombie-dragon','Walk Like a Zombie','A Kiddo School Halloween action card: a laughing vampire showing his fangs, a sleepy werewolf howling softly, a goofy zombie walking with stiff arms and a tiny dragon breathing pretend fire.'],
  ['04-cauldron-monster-ghost-crow','Make a Funny Face','A Kiddo School Halloween action card: a bubbly cauldron stirring pretend soup, a squishy monster making a funny face, a floating ghost tip-toeing quietly and a sneaky crow crowing like a bird.'],
  ['05-alien-scarecrow-witch-owl','Freeze Like a Statue','A Kiddo School Halloween action card: a cute alien waving to the moon, a scared scarecrow freezing like a statue, a sneezing witch going ah-ah-achoo and a hooty owl turning its head slowly.'],
  ['06-broom-goblin-frankenstein-moon','Giggle Three Times','A Kiddo School Halloween action card: a bossy broom pretending to fly, a giggly goblin giggling three times, a brainy Frankenstein thinking a silly idea and a dizzy moon spinning once.'],
  ['07-ghost-bat-pumpkin-witch-hat','Bounce Like a Ghost','A Kiddo School Halloween action card: a bouncy ghost bouncing, a sleepy bat yawning and flapping, a grumpy pumpkin making a grumpy face and a wiggly witch hat wiggling on a head.'],
  ['08-ghost-spider-monster-bat','Hide Your Face','A Kiddo School Halloween action card: a sneezing ghost, a dizzy spider turning around once, a hungry monster pretending to eat and a bashful bat hiding its face behind its wings.'],
  ['09-scarecrow-skeleton-cauldron-werewolf','Stir the Air','A Kiddo School Halloween action card: a scarecrow shivering and shaking, a touchable skeleton touching its knees, a silly cauldron stirring the air and a fluffy werewolf growling like a puppy.'],
  ['10-vampire-zombie-witch-goblin','Jump Three Times','A Kiddo School Halloween action card: a tiny vampire tip-toeing like a bat, a lazy zombie stretching its arms, a bold witch pretending to fly and a jumpy goblin jumping three times.'],
  ['11-mummy-pumpkin-monster-witch','Take Tiny Steps','A Kiddo School Halloween action card: a sneaky mummy taking tiny steps, a giggly pumpkin laughing, a polite monster waving hello and a floaty witch pretending to float.'],
  ['12-wizard-owl-ghost-frankenstein','Wave a Magic Wand','A Kiddo School Halloween action card: a wobbly wizard waving a magic wand, a scared owl blinking slowly, a hopping ghost hopping like a bunny and a frozen Frankenstein saying hello in a monster voice.']]},
 {dir:'activities',heading:'Halloween Activities',intro:'Eleven cards of party ideas \u2014 pumpkin carving, apple bobbing, a costume parade, mummy wrap and more. Each card packs four activities; the tip is on the picture, the printing is right here.',
  cards:[
  ['01-pumpkin-carving-costume-parade-apple-bobbing-trick-or-treat','Pumpkin Carving','A Kiddo School Halloween activities card: pumpkin carving with a grown-up, a costume parade, apple bobbing and trick-or-treat collecting — four party activities on one card.'],
  ['02-ghost-story-dance-costume-photo-mask-making','Ghost Story','A Kiddo School Halloween activities card: telling a ghost story, dancing to spooky music, taking a funny costume photo and making a Halloween mask.'],
  ['03-scavenger-hunt-potion-bingo-ghost-craft','Witch Potion','A Kiddo School Halloween activities card: a spooky scavenger hunt, mixing a fizzy witch potion, Halloween bingo and a paper ghost craft.'],
  ['04-haunted-house-pumpkin-toss-zombie-freeze-bat-craft','Zombie Freeze','A Kiddo School Halloween activities card: walking through a pretend haunted house, tossing pumpkins into a basket, freezing like zombies and making a paper bat.'],
  ['05-candy-sorting-puzzle-monster-mask-storybook','Candy Sorting','A Kiddo School Halloween activities card: sorting candy by color, solving a Halloween puzzle, making a monster mask and reading a spooky storybook.'],
  ['06-movie-cupcakes-parade-treasure-hunt','Spooky Movie','A Kiddo School Halloween activities card: watching a kid-friendly spooky movie, decorating cupcakes, marching in a Halloween parade and hunting for treasure.'],
  ['07-pumpkin-painting-candy-relay-ghost-bowling-hat-toss','Ghost Bowling','A Kiddo School Halloween activities card: painting a pumpkin face, running a candy relay, bowling over ghost pins and tossing rings onto a witch hat.'],
  ['08-mummy-wrap-bat-pinata-spider-web-musical-chairs','Mummy Wrap','A Kiddo School Halloween activities card: wrapping like a mummy, tapping a bat pi\u00f1ata, crawling a pretend spider web and playing spooky musical chairs.'],
  ['09-monster-dress-up-memory-game-charades-crawl-race','Monster Dress-Up','A Kiddo School Halloween activities card: dressing up like monsters, playing a pumpkin memory game, acting out spooky charades and racing a creepy crawl.'],
  ['10-puppet-show-glow-dance-i-spy-monster-relay','Puppet Show','A Kiddo School Halloween activities card: putting on a Halloween puppet show, dancing with glow sticks, playing spooky I-spy and running a monster relay.'],
  ['11-pumpkin-roll-costume-guessing-broom-race-sound-game','Pumpkin Roll','A Kiddo School Halloween activities card: rolling a pumpkin, guessing the costume, racing on broomsticks and playing a who-says-boo sound game.']]},
 {dir:'feelings-and-emotions',heading:'Halloween Feelings',intro:'Five cards of ghost feelings \u2014 happy, sad, angry, scared and everything around them. Halloween brings big feelings; these ghosts name them kindly.',
  cards:[
  ['01-happy-sad-angry-scared','Happy, Sad, Angry & Scared','A Kiddo School Halloween feelings card: four friendly ghosts showing happy, sad, angry and scared faces.'],
  ['02-excited-worried-surprised-sleepy','Excited, Worried, Surprised & Sleepy','A Kiddo School Halloween feelings card: four friendly ghosts showing excited, worried, surprised and sleepy faces.'],
  ['03-proud-shy-confused-bored','Proud, Shy, Confused & Bored','A Kiddo School Halloween feelings card: four friendly ghosts showing proud, shy, confused and bored faces.'],
  ['04-calm-silly-lonely-jealous','Calm, Silly, Lonely & Jealous','A Kiddo School Halloween feelings card: four friendly ghosts showing calm, silly, lonely and jealous faces.'],
  ['05-loved-frustrated-relaxed-curious','Loved, Frustrated, Relaxed & Curious','A Kiddo School Halloween feelings card: four friendly ghosts showing loved, frustrated, relaxed and curious faces.']]},
 {dir:'items',heading:'Halloween Items',intro:'Six spotter cards of the things October brings \u2014 silly pumpkins, sleepy ghosts, tiny bats and wobbly witches. Name them, find them, point at them.',
  cards:[
  ['01-pumpkin-ghost-bat-witch','Pumpkin, Ghost, Bat & Witch','A Kiddo School Halloween items card: a silly pumpkin, a sleepy ghost, a tiny bat and a wobbly witch, each labeled with its name.'],
  ['02-monster-owl-goblin-mummy','Monster, Owl, Goblin & Mummy','A Kiddo School Halloween items card: a friendly monster, a round owl, a cheeky goblin and a fluffy mummy, each labeled with its name.'],
  ['03-vampire-spider-skeleton-scarecrow','Vampire, Spider, Skeleton & Scarecrow','A Kiddo School Halloween items card: a sleepy vampire, a curly spider, a happy skeleton and a bashful scarecrow, each labeled with its name.'],
  ['04-werewolf-cauldron-wizard-scarecrow','Werewolf, Cauldron, Wizard & Scarecrow','A Kiddo School Halloween items card: a goofy werewolf, a bubbly cauldron, a dizzy wizard and a shy scarecrow, each labeled with its name.'],
  ['05-dragon-ghost-pumpkin-witch-hat','Dragon, Ghost, Pumpkin & Witch Hat','A Kiddo School Halloween items card: a tiny dragon, a cuddly ghost, a grumpy pumpkin and a silly witch hat, each labeled with its name.'],
  ['06-moon-frankenstein-bat-zombie','Moon, Frankenstein, Bat & Zombie','A Kiddo School Halloween items card: a mysterious moon, a friendly Frankenstein, a bouncy bat and a sleepy zombie, each labeled with its name.']]}];
for(const _s of HW_SETS)_s.cards=_s.cards.map(([file,word,alt])=>
 ({file:file.endsWith('.webp')?file:file+'.webp',word,alt}));

for(const s of HW_SETS){
 if(!s.cards.length)throw Error('school-hall: empty set '+s.dir);
 for(const c of s.cards)if(c.alt.length<60)throw Error('school-hall: thin alt for '+c.file);
}

function hwTile(set){
 return c=>`<figure class="mn-card"><img src="${HW_BASE}${set.dir}/${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong><div class="mn-actions"><a class="button" href="${HW_BASE}${set.dir}/${c.file}" download="${c.file}">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}
export const HW_SETS_N=HW_SETS;
export const HW_ALL_CARDS=HW_SETS.flatMap(s=>s.cards);

/* ---- The hub: /school-hall/ ----------------------------------------------- */
export function hallBody(){
 const cal=hallCalendar();
 const hero=`<article class="wrap lesson-hero"><div class="lesson-hero-copy"><span class="eyebrow">SCHOOL ROOM \u00b7 HOLIDAYS &amp; SPECIAL DAYS \u00b7 AGES 2\u20135</span><h1>The School Hall — where the whole school celebrates.</h1><p class="lesson-lede">Welcome to the Hall! In a real school this is the room where everybody gathers \u2014 for assemblies, for parties and for the special days on the calendar. Below is our big calendar of holidays: the next one comes first. Pick it, print its cards, and get ready together.</p><div class="lesson-start"><a class="button" href="/rooms/">Explore the other rooms <span aria-hidden="true">\u2197</span></a></div></div></article>`;
 const calendar=`<section class="wrap lesson-section" id="hall-calendar"><span class="eyebrow">COMING UP \u00b7 THE SCHOOL CALENDAR</span><h2>The next holiday first.</h2><p class="fc-hint">Five special days a year, always in date order, always starting with the next one \u2014 so this room never looks empty and never goes quiet.</p><ol class="hall-cal">${cal.map((h,i)=>`<li class="hall-day${i===0?' hall-next':''}"><span class="hall-when">${esc(h.when)}${i===0?' \u00b7 coming up next':''}</span><a class="hall-what" href="${h.path}">${esc(h.name)}</a><p>${esc(h.blurb)}</p></li>`).join('')}</ol><p class="fc-hint">Dates for Halloween, Thanksgiving (the fourth Thursday in November), Christmas and Valentine\u2019s Day are fixed; Eid dates are expected dates \u2014 the moon decides, so check with your family\u2019s calendar.</p></section>`;
 const why=`<section class="wrap lesson-section"><span class="eyebrow">WHY A HALL</span><h2>Assemblies, parties and celebrations \u2014 kid-sized.</h2><p class="lesson-copy">Every holiday page in the Hall is spoken straight to kids: what the day is, why people celebrate it, and things a two-to-five-year-old can actually do \u2014 make a card, dance, count pumpkins, taste something new. Grown-ups get the how-to notes in small print beside each idea, and every printable in the Hall downloads and prints free, straight from its holiday page, with a print button that runs one card at a time.</p></section>`;
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where the Hall joins the school day.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/4-years/weather-seasons-and-what-we-wear/">Seasons in Class 34 <span>\u00b7 Ages 4–5</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/art-room/">Holiday crafts in the Art Room <span>\u00b7 Ages 2–5</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/rooms/">All the school rooms <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">The Hall sits beside the school\u2019s everyday rooms: Class 34 watches the seasons turn outside the window, and the Art Room keeps the glue and crayons a holiday craft needs. When the calendar says a special day is near, start there, craft here \u2014 and celebrate in the Hall.</p></section>`;
 return `${hero}${calendar}${why}${around}<p class="lesson-note"><strong>Special days are how children mark time.</strong> One calendar, five celebrations, a room that stays useful all year \u2014 that is the Hall.</p>`;
}

/* ---- The holiday pages ---------------------------------------------------- */
/* Halloween: the full room day — what it is, why we celebrate, activities,
   then the four card sets. The other four holidays: short, kid-facing pages
   until their card sets upload; the URLs are already permanent. */
export function halloweenBody(){
 const hero=`<article class="wrap lesson-hero"><div class="lesson-hero-copy"><span class="eyebrow">THE SCHOOL HALL \u00b7 HALLOWEEN \u00b7 OCTOBER 31 \u00b7 AGES 2\u20135</span><h1>Halloween — dress up, say boo, print the party.</h1><p class="lesson-lede">Boo! Halloween is the night of friendly ghosts, silly pumpkins and costumes everywhere. On this page: what Halloween is, why people celebrate it, party ideas a toddler can join, and thirty-four printable cards \u2014 action moves, party activities, ghost feelings and October things to name.</p><div class="lesson-start"><a class="button button-ghost" href="/school-hall/">Back to the Hall <span aria-hidden="true">\u2197</span></a></div></div></article>`;
 const what=`<section class="wrap lesson-section"><span class="eyebrow">WHAT IS HALLOWEEN?</span><h2>What\u2019s this? Why do we celebrate it?</h2><p class="lesson-copy">A long, long time ago, people believed that on the last night of October, silly ghosts and playful goblins came out to visit. Nobody wanted to be scared \u2014 so they dressed up in costumes too, lit lanterns and shared treats to keep everything friendly. That\u2019s why Halloween looks the way it does today: we wear costumes, we carve pumpkins with smiling faces, and children knock on doors to say \u201ctrick or treat!\u201d and collect a little candy.</p><p class="lesson-copy">Today Halloween is a dress-up party for whole neighborhoods. For a two-year-old that might mean one orange pumpkin to point at; for a five-year-old, a whole costume parade. Nothing here needs to be scary \u2014 every monster on our cards is friendly, and the only thing they bite is a cookie.</p></section>`;
 const do_=`<section class="wrap lesson-section"><span class="eyebrow">TRY IT \u00b7 ACTIVITIES FOR KIDS</span><h2>Little-kid Halloween, hour by hour.</h2><p class="lesson-copy">Scoop a pumpkin with a grown-up and count the seeds. March in a costume parade around the living room. Bob for apples floating in a big bowl \u2014 or for the toddler version, fish them out with a spoon. Sort candy by color into cups. Wrap each other in toilet-paper mummies and waddle. Freeze like a zombie when the music stops. Then settle down with a not-scary ghost story and a paper bat to cut and stick.</p><p class="lesson-copy">The activity cards below carry these ideas as pictures \u2014 print them, cut them out and let your child pull the evening\u2019s plan out of a party hat, one card at a time.</p></section>`;
 const sets=HW_SETS.map(s=>`<section class="wrap lesson-section"><span class="eyebrow">THE CARDS \u00b7 ${esc(s.heading).toUpperCase()} \u00b7 ${s.cards.length} CARDS</span><h2>${esc(s.heading)}.</h2><p class="fc-hint">${esc(s.intro)} Download takes the full-size card; Print runs just that one card through your printer.</p><div class="mn-cards">${s.cards.map(hwTile(s)).join('')}</div></section>`).join('');
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>After the candy is sorted.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/school-hall/">Back to the School Hall <span>\u00b7 All holidays</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/art-room/">Make it in the Art Room <span>\u00b7 Ages 2–5</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/feelings-and-kindness/">Big feelings, kindly in Class 38 <span>\u00b7 Ages 4–5</span> <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">When the costumes come off, the Hall\u2019s calendar already knows what\u2019s next \u2014 and the ghost feelings cards make a gentle bridge back to everyday feelings: happy, sad, calm, brave. Trick or treat was the practice; naming feelings is the skill.</p></section>`;
 return `${hero}${what}${do_}${sets}${around}<p class="lesson-note"><strong>Keep it friendly.</strong> Toddler Halloween is orange food, one costume and five silly monsters \u2014 the cards below are exactly that, and every one prints free.</p>`;
}

function holidayPage(h){
 return {body:`<article class="wrap lesson-hero"><div class="lesson-hero-copy"><span class="eyebrow">THE SCHOOL HALL \u00b7 ${esc(h.name).toUpperCase()} \u00b7 AGES 2\u20135</span><h1>${esc(h.name)} — what it is and how little kids celebrate.</h1><p class="lesson-lede">${esc(h.lede)}</p><div class="lesson-start"><a class="button button-ghost" href="/school-hall/">Back to the Hall <span aria-hidden="true">\u2197</span></a></div></div></article>${h.body(esc)}<section class="wrap lesson-section"><span class="eyebrow">THE HALL CALENDAR</span><h2>What\u2019s next after ${esc(h.name)}?</h2><div class="lesson-linkrow">${hallCalendar().filter(x=>x.slug!==h.slug).slice(0,4).map(x=>`<a class="lesson-pill-link" href="${x.path}">${esc(x.name)} <span>${esc(x.when)}</span> <span aria-hidden="true">\u2197</span></a>`).join('')}<a class="lesson-pill-link" href="/school-hall/">The whole Hall calendar <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Every room of the school keeps its everyday magic going between the special days \u2014 the Hall\u2019s calendar above always shows the next holiday first, so come back whenever the seasons turn.</p></section>`};
}

const THANKSGIVING={
 slug:'thanksgiving',name:'Thanksgiving',lede:'Thanksgiving is the thank-you holiday: a big dinner, a full table and everyone naming what they are thankful for.',
 body:esc=>`<section class="wrap lesson-section"><span class="eyebrow">WHAT IS THANKSGIVING?</span><h2>What\u2019s this? Why do we celebrate it?</h2><p class="lesson-copy">Thanksgiving comes on the fourth Thursday of November, and its whole idea fits in one small word: thanks. Long ago, families who had worked hard in the fields all year gathered everything they had grown \u2014 corn, pumpkins, bread \u2014 and cooked a giant dinner to share with their neighbors. They were thankful for the food and for each other. Today families still do exactly that: they travel, they cook together, they sit down at a big table, and before eating, everyone takes a turn saying one thing they are thankful for.</p><p class="lesson-copy">For a little kid, Thanksgiving is easy to understand: it is the day we say thank you out loud, to the people who feed us, love us and help us grow.</p></section><section class="wrap lesson-section"><span class="eyebrow">TRY IT \u00b7 ACTIVITIES FOR KIDS</span><h2>Little hands at the thank-you table.</h2><p class="lesson-copy">Trace your child\u2019s hand on paper \u2014 the palm becomes a turkey body, the fingers become feathers, and on every feather someone writes one thankful thing. Make a thankful tree: cut paper leaves and add one each day of November. Let your child set the table (plates, cups, spoons \u2014 the Sequence Stories card knows the order) and fold the napkins any way they like. Ask the dinnertime question together: \u201cWhat made you smile today?\u201d That is a thank-you, too.</p></section>`};

const CHRISTMAS={
 slug:'christmas',name:'Christmas',lede:'Christmas is the December holiday of lights and songs: trees, presents, carols and a family table on December 25.',
 body:esc=>`<section class="wrap lesson-section"><span class="eyebrow">WHAT IS CHRISTMAS?</span><h2>What\u2019s this? Why do we celebrate it?</h2><p class="lesson-copy">Christmas comes every year on December 25. Many families celebrate it as the birthday of Jesus, and nearly everyone who celebrates \u2014 religious or not \u2014 shares the same cozy picture: a tree with lights, songs on the radio, special food, presents, and people who love each other gathering under one roof. The deeper idea underneath the wrapping paper is giving: we give presents because we are glad the people we love are here.</p><p class="lesson-copy">For a little kid, Christmas is a season of tiny traditions that repeat every year \u2014 the same song, the same cookies, the same star on top of the tree \u2014 and that repetition is exactly what makes it feel like magic.</p></section><section class="wrap lesson-section"><span class="eyebrow">TRY IT \u00b7 ACTIVITIES FOR KIDS</span><h2>December, kid-sized.</h2><p class="lesson-copy">Count the lights on the tree \u2014 start at ten and let your child keep going as high as they can. Sing one carol every bath time until it sticks. Make paper ornaments for the lower branches (the branches a two-year-old can actually reach). Wrap a present in scribbled paper for a grandparent. Stir the cookie dough and shake the sprinkles. And on a quiet evening, retell the night before with the Sequence Stories card in your hand: first we hang it, then we light it, then we sing.</p></section>`};

const VALENTINES={
 slug:'valentines-day',name:'Valentine\u2019s Day',lede:'Valentine\u2019s Day is the friendship holiday on February 14: little cards, kind words and telling people they matter.',
 body:esc=>`<section class="wrap lesson-section"><span class="eyebrow">WHAT IS VALENTINE\u2019S DAY?</span><h2>What\u2019s this? Why do we celebrate it?</h2><p class="lesson-copy">Every February 14, people give each other little cards that say things like \u201cI like you\u201d and \u201cYou\u2019re my friend.\u201d The day is named after Saint Valentine, a kind helper from long ago, and it grew into the day for telling people \u2014 friends, grandparents, teachers, brothers, sisters \u2014 that we love having them around. For young children it is really a kindness holiday: red hearts, paper doilies and one brave sentence spoken out loud.</p><p class="lesson-copy">You do not need a sweetheart to celebrate. You need somebody you are glad exists \u2014 and every small child has a whole list of those.</p></section><section class="wrap lesson-section"><span class="eyebrow">TRY IT \u00b7 ACTIVITIES FOR KIDS</span><h2>Hearts a two-year-old can make.</h2><p class="lesson-copy">Make one card per family member: red paint handprints folded into a card, or a heart traced from a cookie cutter. Practice the kind sentence first \u2014 \u201cI like you because\u2026\u201d \u2014 and let your child finish it their own way. Deliver the cards in person, door by door of your own house. Then play the kindness count: how many kind things can we find each other doing today? Every one gets a paper heart on the wall.</p></section>`};

const EID={
 slug:'eid',name:'Eid',lede:'Eid is a joyful Muslim holiday of new clothes, sweet treats and hugs all around \u2014 \u201cEid Mubarak!\u201d \u2014 and there are two every year.',
 body:esc=>`<section class="wrap lesson-section"><span class="eyebrow">WHAT IS EID?</span><h2>What\u2019s this? Why do we celebrate it?</h2><p class="lesson-copy">Muslim families celebrate two big holidays every year, and both are called Eid. The first, Eid al-Fitr, comes after Ramadan \u2014 a month when grown-ups fast during the day, share food with people who need it, and try to be extra kind. When Ramadan ends, the celebration bursts out: new clothes, big breakfasts, visits to family, presents and sweets for the children. The second, Eid al-Adha, comes at the time of Hajj, the great journey to the city of Makkah, and it celebrates sharing \u2014 food goes to neighbors and to families who need it most.</p><p class="lesson-copy">Both days begin the same way: dressing in new or best clothes, a special prayer, and the happy greeting that gives this page its name \u2014 \u201cEid Mubarak!\u201d, which means \u201chave a blessed Eid.\u201d The exact date moves every year because the Islamic calendar follows the moon \u2014 the calendar above shows the expected date, and the new moon decides the rest.</p></section><section class="wrap lesson-section"><span class="eyebrow">TRY IT \u00b7 ACTIVITIES FOR KIDS</span><h2>Little hands on the big day.</h2><p class="lesson-copy">Practise the greeting in the mirror until it sings: \u201cEid Mubarak!\u201d Draw a crescent moon and a star and hang them in the window. Help fill a small box of treats for a neighbor \u2014 sharing food is the heart of both Eids. Dress up in your best clothes and have a little parade around the living room. And if your family has henna, one dot on a small hand is a whole adventure.</p></section>`};

export const HALL_PAGES=[
 {path:HALL_PATH,name:'The School Hall'},
 {path:'/halloween/',name:'Halloween'},
 {path:'/thanksgiving/',name:'Thanksgiving'},
 {path:'/christmas/',name:'Christmas'},
 {path:'/valentines-day/',name:'Valentine\u2019s Day'},
 {path:'/eid/',name:'Eid'}];

/* ---- Cross-links the owner asked for (2026-10-30) ------------------------- */
/* Appended to Class 34 · Weather, Seasons & What We Wear. */
export const HALL_CLASS34_LINK=`<section class="wrap lesson-section"><span class="eyebrow">SEASONS &amp; SPECIAL DAYS</span><h2>When the season turns, the Hall celebrates.</h2><p class="lesson-copy">Weather outside the window is how a child first feels the seasons change — and the seasons bring the special days: October pumpkins, December lights, February hearts. The school\u2019s <a href="/school-hall/">School Hall</a> keeps the calendar of holidays, the next one always first, with a kid-sized page for each — what it is, why we celebrate, and printable cards to count, name and play.</p></section>`;
/* Appended to the Art Room. */
export const HALL_ART_LINK=`<section class="wrap lesson-section"><span class="eyebrow">HOLIDAY CRAFTS</span><h2>Make it for the celebration.</h2><p class="lesson-copy">Every holiday needs glue: paper ghosts and painted pumpkins for Halloween, handprint turkeys for Thanksgiving, hearts for Valentine\u2019s Day, crescent moons for Eid. The school\u2019s <a href="/school-hall/">School Hall</a> keeps the holiday calendar — the next celebration first — and every holiday page there carries printable cards that pair with the make-it activities in this room: craft here, celebrate there.</p></section>`;

export {THANKSGIVING,CHRISTMAS,VALENTINES,EID,holidayPage};
