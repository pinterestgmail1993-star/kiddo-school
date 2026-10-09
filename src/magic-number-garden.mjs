// Kiddo School — Magic Counting Garden (Age 3 interactive game).
// /preschool/3-years/magic-number-garden/ — built on the six owner-uploaded
// transparent WebP illustrations in
// school/interactive-activities/magic-number-garden-age-3/ (all probed
// 1080×1080): a smiling pink flower, a blue butterfly, a yellow bee, a red
// ladybug, a green watering can and the garden cover. Seven screens:
// welcome, Count the Garden (tap each item to count aloud, the number shows
// as you tap), Plant Flowers (add the asked number of flowers to the plot),
// Find the Number (match a big numeral to the right group), Water the
// Garden (each press of the watering can blooms one flower while counting),
// off-screen counting play and a celebration. Numbers are spoken with the
// device's screen voice AND always written as digits and number words —
// the text alternative is on screen by design. Count, plant, find and
// water are genuinely playable; without JavaScript every round renders as
// an honest count-together chart. No scores, no timers, no streaks, no
// download buttons.
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='school/interactive-activities/magic-number-garden-age-3/';
const W=1080,H=1080;

const ITEMS={
 flower:{file:'01-pink-flower.webp',one:'flower',many:'flowers',alt:'A smiling pink flower with a yellow face and green leaves',bg:'#f9e8ee'},
 butterfly:{file:'02-blue-butterfly.webp',one:'butterfly',many:'butterflies',alt:'A cheerful blue butterfly with pink and yellow spots',bg:'#e8f1f9'},
 bee:{file:'03-yellow-bee.webp',one:'bee',many:'bees',alt:'A friendly yellow bee with small blue wings',bg:'#faf3d9'},
 ladybug:{file:'04-red-ladybug.webp',one:'ladybug',many:'ladybugs',alt:'A round red ladybug with black spots',bg:'#f9e4e1'}
};
const img=(k,cls='',eager=false)=>`<img src="${R2+P}${ITEMS[k].file}" width="${W}" height="${H}" alt="" aria-hidden="true" class="ng-item ${cls}"${eager?'':' loading="lazy"'}>`;
const NUMWORD={1:'one',2:'two',3:'three',4:'four',5:'five',6:'six',7:'seven',8:'eight',9:'nine',10:'ten'};

/* Ten fixed landing spots inside a 100×56 garden plot, used in order. */
const SPOTS=[[6,62],[24,18],[42,66],[60,22],[78,60],[15,38],[33,10],[51,40],[69,8],[87,34]];
const spots=n=>SPOTS.slice(0,n);

export const magicGarden={
 path:'/preschool/3-years/magic-number-garden/',
 seoTitle:'Magic Counting Garden — a Counting Game for 3 Year Olds',
 h1:'Magic Counting Garden',
 description:'Count, plant, find and water with your 3-year-old: tap flowers, butterflies, bees and ladybugs to count aloud from 1 to 10, plant what the garden asks for and match numbers to groups. A gentle counting game with off-screen play.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 2 MAGIC GAME',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Numbers & Counting','/preschool/3-years/numbers-and-counting/'],['Magic Counting Garden',null]],
 ogImage:R2+P+'06-magic-number-garden-cover.webp',
 ogAlt:'Cover of the Magic Counting Garden game: a smiling garden with flowers, a bee, a butterfly, ladybugs and a watering can',
 classPath:'/preschool/3-years/numbers-and-counting/',
 classTitle:'Numbers &amp; Counting'
};

/* ---- Count rounds: tap every item, the count shows as you go ---- */
const COUNT_ROUNDS=[
 {key:'flower',n:3,ask:'Count the flowers!'},
 {key:'butterfly',n:5,ask:'Count the butterflies!'},
 {key:'bee',n:8,ask:'Count the bees!'},
 {key:'ladybug',n:10,ask:'Count the ladybugs!'}
];
/* ---- Plant rounds: add exactly the asked number ---- */
const PLANT_ROUNDS=[{n:4},{n:2},{n:6}];
/* ---- Find-the-number rounds: the group must hold exactly n items ---- */
const FIND_ROUNDS=[
 {num:4,key:'flower',choices:[3,4,5]},
 {num:2,key:'butterfly',choices:[2,4,3]},
 {num:7,key:'bee',choices:[5,7,8]},
 {num:5,key:'ladybug',choices:[4,6,5]}
];
/* ---- Water rounds: each press blooms one flower, counted aloud ---- */
const WATER_ROUNDS=[{n:3},{n:5}];

const countRound=r=>`<div class="ng-round" data-ng-count="${r.n}" data-ng-key="${r.key}">
<p class="tc-ask">${r.ask}</p>
<p class="ng-bigword">${r.n} · ${NUMWORD[r.n]}</p>
<div class="ng-plot" data-ng-plot role="group" aria-label="${r.ask} Tap each ${ITEMS[r.key].one} to count it.">${spots(r.n).map(([x,y])=>`<button type="button" class="ng-itembtn" data-ng-tap style="left:${x}%;top:${y}%" aria-label="A ${ITEMS[r.key].one} — tap to count">${img(r.key)}<span class="ng-badge" aria-hidden="true"></span></button>`).join('')}</div>
<p class="ng-roundmsg" data-ng-countmsg aria-live="polite">Tap each ${ITEMS[r.key].one} and count with me.</p>
</div>`;

const plantRound=(r,i)=>`<div class="ng-round" data-ng-plant="${r.n}">
<p class="tc-ask">Plant ${r.n} ${r.n===1?'flower':'flowers'}!</p>
<p class="ng-bigword">${r.n} · ${NUMWORD[r.n]}</p>
<div class="ng-plot ng-plantplot" data-ng-plot2>
 ${spots(8).slice(0,8).map(([x,y],j)=>`<span class="ng-spot" style="left:${x}%;top:${y}%" data-ng-spot aria-hidden="true"></span>`).join('')}
 <span class="ng-plantedbox" data-ng-planted aria-hidden="true"></span>
</div>
<div class="mg-actions" style="justify-content:center"><button type="button" class="button button-ghost" data-ng-plantbtn aria-label="Plant one flower">Plant a flower <span aria-hidden="true">✿</span></button></div>
<p class="ng-roundmsg" data-ng-plantmsg aria-live="polite">0 of ${r.n} planted — tap the button to plant one.</p>
</div>`;

const findRound=r=>{
 const t=ITEMS[r.key];
 return `<div class="tc-round" data-tc-round data-tc-ask="Which group has ${r.num}?">
<p class="tc-ask">Which group has <strong>${r.num} ${r.num===1?t.one:t.many}</strong>? Show me the number… <span class="ng-numchip" aria-hidden="true">${r.num}</span></p>
<div class="tc-choices" role="group" aria-label="Which group has ${r.num} ${t.many}? Choose a group.">${r.choices.map(k=>`<button type="button" class="tc-choice ng-group" aria-label="A group of ${k} ${k===1?t.one:t.many}"${k===r.num?' data-tc-correct="true"':''}>${spots(k).map(([x,y])=>`<span class="ng-mini" style="left:${x}%;top:${y}%"><img src="${R2+P}${t.file}" width="${W}" height="${H}" alt="" aria-hidden="true" loading="lazy"></span>`).join('')}</button>`).join('')}</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
</div>`;
};

const waterRound=r=>`<div class="ng-round" data-ng-water="${r.n}">
<p class="tc-ask">Water ${r.n} ${r.n===1?'flower':'flowers'}!</p>
<p class="ng-bigword">${r.n} · ${NUMWORD[r.n]}</p>
<div class="ng-plot ng-plantplot" data-ng-wplot>
 ${spots(8).slice(0,8).map(([x,y])=>`<span class="ng-spot" style="left:${x}%;top:${y}%" data-ng-wspot aria-hidden="true"></span>`).join('')}
 <span class="ng-plantedbox" data-ng-wbloom aria-hidden="true"></span>
</div>
<div class="mg-actions" style="justify-content:center"><button type="button" class="button button-ghost" data-ng-waterbtn aria-label="Water one flower with the watering can"><img src="${R2+P}05-green-watering-can.webp" width="${W}" height="${H}" alt="" aria-hidden="true" class="ng-can" loading="lazy"> Water the garden</button></div>
<p class="ng-roundmsg" data-ng-watermsg aria-live="polite">0 of ${r.n} watered — press the watering can.</p>
</div>`;

export function magicGardenBody(G){
 const hero=`<section class="wrap section compact">
  <span class="eyebrow">${G.eyebrow}</span>
  <h1>${G.h1}</h1>
  <p class="mw-lede">The garden is full of things to count: flowers, butterflies, bees and ladybugs. Count them out loud, plant what the garden asks for, find the number that matches, and water the flowers until they bloom. Grown-ups read the words; little ones do the tapping — and the counting.</p>
  <div class="mg-game" data-mg-game="number-garden" data-flower-src="${R2+P}01-pink-flower.webp">
   <p class="mg-live" data-mg-live aria-live="polite"></p>
   <div class="mg-screens">`;

 const welcome=`<section class="mg-screen" data-mg-screen="welcome" aria-label="Welcome to the Magic Counting Garden">
   <figure class="mg-cover"><img src="${R2+P}06-magic-number-garden-cover.webp" width="${W}" height="${H}" alt="The Magic Counting Garden cover: a smiling garden with flowers, a bee, a butterfly, ladybugs and a watering can" fetchpriority="high"><figcaption class="fc-hint">Welcome to the number garden!</figcaption></figure>
   <div class="mg-actions" style="justify-content:center"><button type="button" class="button" data-mg-go="count">Start Playing <span aria-hidden="true">↗</span></button></div>
   <p class="mg-hint" style="text-align:center">No scores, no timers — just counting.</p>
  </section>`;

 const count=`<section class="mg-screen" data-mg-screen="count" aria-label="Count the garden">
   <span class="eyebrow">STEP 2 · COUNT THE GARDEN</span>
   <h2>Tap and count, out loud.</h2>
   <p class="lesson-copy">Tap each flower, butterfly, bee and ladybug — the number appears as you count. Say every number out loud with your grown-up!</p>
   ${COUNT_ROUNDS.map(countRound).join('')}
   <p class="mg-hint">The numbers are spoken by your device&rsquo;s friendly screen voice, and they are always written here too — both together is even better.</p>
   <div class="mg-next"><button type="button" class="button" data-mg-go="plant">Plant Flowers <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const plant=`<section class="mg-screen" data-mg-screen="plant" aria-label="Plant flowers">
   <span class="eyebrow">STEP 3 · PLANT FLOWERS</span>
   <h2>Plant what the garden asks for.</h2>
   <p class="lesson-copy">The garden wants a certain number of flowers. Press the plant button once for every flower — count out loud as each one lands!</p>
   ${PLANT_ROUNDS.map(plantRound).join('')}
   <div class="mg-next"><button type="button" class="button" data-mg-go="find">Find the Number <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const find=`<section class="mg-screen" data-mg-screen="find" aria-label="Find the number" data-tc-correct="You found the group!|That is the number!|Great counting!" data-tc-incorrect="Count that group on your fingers — then try another group.">
   <span class="eyebrow">STEP 4 · FIND THE NUMBER</span>
   <h2>Find the group that matches.</h2>
   <p class="lesson-copy">Read the big number, then tap the group that has exactly that many. Count each group together before you choose!</p>
   ${FIND_ROUNDS.map(findRound).join('')}
   <div class="mg-next"><button type="button" class="button" data-mg-go="water">Water the Garden <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const water=`<section class="mg-screen" data-mg-screen="water" aria-label="Water the garden">
   <span class="eyebrow">STEP 5 · WATER THE GARDEN</span>
   <h2>Press the watering can and count.</h2>
   <p class="lesson-copy">Every press waters one dry spot — and a flower blooms! Count each bloom out loud until the garden is done.</p>
   ${WATER_ROUNDS.map(waterRound).join('')}
   <p class="mg-hint">Real gardens drink too: you can water the plants at home with a small cup and count every pour.</p>
   <div class="mg-next"><button type="button" class="button" data-mg-go="offscreen">Off-Screen Play <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const offscreen=`<section class="mg-screen" data-mg-screen="offscreen" aria-label="Off-screen counting play">
   <span class="eyebrow">STEP 6 · OFF-SCREEN PLAY</span>
   <h2>Counting grows outside.</h2>
   <p class="lesson-copy">The garden follows you out the door. Pick one of these — five minutes is plenty.</p>
   <div class="tc-hunt"><h3>Leaf hunt</h3><ul class="lesson-prompts"><li>Gather a small pile of fallen leaves and count them one by one onto the path. Touching each leaf while saying the number is exactly how counting sticks.</li></ul></div>
   <div class="tc-hunt"><h3>Flower count on the walk</h3><ul class="lesson-prompts"><li>On a stroll, stop at every flower patch: how many can you see? Count them together, then let your child teach the number to a teddy.</li></ul></div>
   <div class="tc-hunt"><h3>Toy tea party</h3><ul class="lesson-prompts"><li>Set the table for stuffed animals: how many cups? How many plates? Add one more guest and count again — adding one is the seed of all math.</li></ul></div>
   <p class="lesson-note"><strong>One gentle word:</strong> count whatever your child is interested in — socks, stairs, dogs on the street. Three happy minutes beat ten tired ones, and stopping is always allowed.</p>
   <div class="mg-next"><button type="button" class="button" data-mg-go="complete">Finish the Magic <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const complete=`<section class="mg-screen" data-mg-screen="complete" aria-label="Activity complete">
   <span class="eyebrow">STEP 7 · ACTIVITY COMPLETE</span>
   <h2>What a growing garden!</h2>
   <p class="lesson-copy">You counted flowers, butterflies, bees and ladybugs, planted exactly what the garden asked for, matched numbers to groups and watered the flowers until they bloomed. Whether you counted to three or all the way to ten, that was real counting — and there was never a score to worry about.</p>
   <div class="mg-actions"><button type="button" class="button" data-mg-replay>Play Again <span aria-hidden="true">↺</span></button><a class="button button-ghost" href="${G.classPath}">Back to Numbers &amp; Counting <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
   <div class="lesson-path">
    <a class="fc-stage lesson-card-link" href="${G.classPath}"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Class 2</span></div><h3>Numbers &amp; Counting</h3><p>The full class: number cards from 1 to 10, counting games and everyday number play.</p><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a>
    <a class="fc-stage lesson-card-link" href="/preschool/3-years/"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Magic games</span></div><h3>More magic games</h3><p>Try Magic Fruit Basket, Animal Sound Safari or Look & Draw — Magic Shapes — every Age 3 game lives on the stage shelf.</p><span class="fc-open">Choose another game <span aria-hidden="true">↗</span></span></a>
   </div>
  </section>`;

 return `${hero}
${welcome}
${count}
${plant}
${find}
${water}
${offscreen}
${complete}
   </div>
   <noscript><p class="fc-hint">No JavaScript? Every round is right here as a count-together chart — point at each flower, butterfly and bee and say the numbers aloud together. The tapping and watering need JavaScript.</p></noscript>
  </div>
 </section>
 <section class="wrap lesson-section" id="for-grown-ups" aria-label="About this game">
  <span class="eyebrow">FOR GROWN-UPS</span>
  <h2>How the garden teaches numbers.</h2>
  <p class="lesson-copy">Every tap speaks the next number and shows it at the same time, so counting stays connected: one tap, one number, one thing. That one-to-one rhythm — not reciting — is what makes counting real at three. The Plant and Water steps ask for an exact number, which gently introduces the idea that a number names “how many,” and Find the Number asks your child to check a group against a numeral, the seed of number recognition.</p>
  <p class="lesson-copy">All the pictures come from the garden illustrations your child may already know from the Numbers &amp; Counting class. Nothing is graded and nothing is stored — misses simply mean counting that group again together, which is the good part anyway.</p>
  <p class="lesson-note">Counting out loud together is the magic ingredient. Your voice, counting slowly with a finger pointing — that is the whole method, and it works.</p>
 </section>`;
}
