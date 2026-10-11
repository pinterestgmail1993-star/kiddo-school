// Kiddo School — Animal Sound Safari (Age 3 interactive game).
// /preschool/3-years/magic-animal-playground/ — built on the seven
// owner-uploaded transparent WebP illustrations in
// school/interactive-activities/magic-animal-playground-age-3/ (all probed
// 1080×1080). IMPORTANT: the R2 filenames are shifted one slot against
// their contents (verified visually from the owner's uploads — the file
// named 02-cat.webp actually contains the six-animal group illustration,
// 03-cow.webp the cat, 04-duck.webp the cow, 05-sheep.webp the duck,
// 06-frog.webp the sheep and 07-animal-playground-cover.webp the frog).
// The mapping below is BY CONTENT, so every animal card shows the right
// picture: the duck card shows a duck, the cow card a cow. Permanent R2
// filenames stay untouched. Six animals, seven screens: welcome, Meet the
// Animals, Who Made That Sound?, Find the Animal, Animal Movement,
// off-screen play and a celebration. ALL SIX animals play real recordings
// (/assets/sounds/animals/*.mp3; duck and frog recordings are Wikimedia
// Commons CC BY-SA 4.0, credited below and in sounds/animals/CREDITS.md).
// Find rounds run on the shared find-it engine; screens, playback and
// movement live in magic-animal-playground.js as progressive enhancement.
// No scores, no timers, no streaks, no download buttons for the game assets.
const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='school/interactive-activities/magic-animal-playground-age-3/';
const W=1080,H=1080;
const SND='/assets/sounds/animals/';

const ANIMALS=[
 {slug:'dog',file:'01-dog.webp',bg:'#f7ddd2',rec:true,word:'Woof, woof!',alt:'A friendly brown dog with a wagging tail',move:'trot',verb:'trots',moveLine:'The dog trots around the playground! Can you trot too?'},
 {slug:'cat',file:'03-cow.webp',bg:'#f6ecc4',rec:true,word:'Meow!',alt:'A soft orange striped cat sitting up tall',move:'stretch',verb:'stretches',moveLine:'The cat stretches long and slow! Can you stretch like a cat?'},
 {slug:'cow',file:'04-duck.webp',bg:'#dcead2',rec:true,word:'Moo!',alt:'A black-and-white spotted cow with gentle eyes',move:'sway',verb:'sways',moveLine:'The cow sways side to side! Sway along with her.'},
 {slug:'duck',file:'05-sheep.webp',bg:'#d6e4ee',rec:true,word:'Quack, quack!',alt:'A yellow duck with an orange beak',move:'waddle',verb:'waddles',moveLine:'The duck waddles left and right! Waddle like a duck!'},
 {slug:'sheep',file:'06-frog.webp',bg:'#efe9dc',rec:true,word:'Baa!',alt:'A fluffy sheep with a woolly coat',move:'bounce',verb:'bounces',moveLine:'The sheep bounces on the grass! Boing, boing — bounce too!'},
 {slug:'frog',file:'07-animal-playground-cover.webp',bg:'#e3f0d3',rec:true,word:'Ribbit, ribbit!',alt:'A small green frog ready to hop',move:'hop',verb:'hops',moveLine:'The frog hops high in the air! Can you hop like a frog?'}
];
const GROUP='02-cat.webp'; // the six-animal group illustration (content-verified)
const img=(f,extra='')=>`<img src="${R2+P+f.file}" width="${W}" height="${H}" alt="${f.alt}" loading="lazy"${extra}>`;
const cap=slug=>slug.charAt(0).toUpperCase()+slug.slice(1);
const FIND_ROUNDS=[
 {ask:'Tap the duck!',choices:['duck','cow','dog'],correct:0},
 {ask:'Tap the frog!',choices:['cat','frog','sheep'],correct:1},
 {ask:'Tap the dog!',choices:['dog','duck','frog'],correct:0},
 {ask:'Tap the sheep!',choices:['frog','duck','sheep'],correct:2},
 {ask:'Tap the cat!',choices:['sheep','cat','cow'],correct:1}
];
/* The listening game now uses ALL SIX animals — every one has a real
   recording, so nothing is faked. */
const LISTEN_ROUNDS=[
 {target:'dog',choices:['dog','cow','duck'],correct:0},
 {target:'cat',choices:['cow','cat','sheep'],correct:1},
 {target:'duck',choices:['sheep','duck','frog'],correct:1},
 {target:'cow',choices:['sheep','dog','cow'],correct:2},
 {target:'frog',choices:['cat','frog','sheep'],correct:1},
 {target:'sheep',choices:['cow','sheep','frog'],correct:1}
];
const MOVE_NAMES={trot:'trot',stretch:'stretch',sway:'sway',waddle:'waddle',bounce:'bounce',hop:'hop'};

export const magicAnimal={
 path:'/preschool/3-years/magic-animal-playground/',
 seoTitle:'Animal Sound Safari — an Animal Sound Game for 3 Year Olds',
 h1:'Animal Sound Safari',
 description:'Play at the animal playground with your 3-year-old: tap six animals to hear their real sounds, guess who made each sound, find the right animal and copy their moves — then play it off screen. No scores.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 6 MAGIC GAME',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Animals & Their Sounds','/preschool/3-years/animals-and-their-sounds/'],['Animal Sound Safari',null]],
 ogImage:R2+P+GROUP,
 ogAlt:'Six friendly animal illustrations — dog, cat, cow, duck, sheep and frog — gathered together',
 classPath:'/preschool/3-years/animals-and-their-sounds/',
 classTitle:'Animals &amp; Their Sounds'
};

export function magicAnimalBody(G){
 const hero=`<section class="wrap section compact">
  <span class="eyebrow">${G.eyebrow}</span>
  <h1>${G.h1}</h1>
  <p class="mw-lede">Six animal friends are playing on the playground today. Tap them to hear their real sounds, guess who is speaking, find them hiding and copy their moves. Grown-ups read the words; little ones do the tapping — and the hopping.</p>
  <div class="mg-game" data-mg-game="animal-playground">
   <p class="mg-live" data-mg-live aria-live="polite"></p>
   <div class="mg-screens">`;

 const welcome=`<section class="mg-screen" data-mg-screen="welcome" aria-label="Welcome to the Animal Sound Safari">
   <figure class="mg-cover"><img src="${R2+P+GROUP}" width="${W}" height="${H}" alt="The Animal Sound Safari cover: six friendly animals — dog, cat, cow, duck, sheep and frog — gathered together" fetchpriority="high"><figcaption class="fc-hint">Welcome to the animal playground!</figcaption></figure>
   <div class="mg-actions" style="justify-content:center"><button type="button" class="button" data-mg-go="meet">Start Playing <span aria-hidden="true">↗</span></button></div>
   <p class="mg-hint" style="text-align:center">No scores, no timers — just animal friends.</p>
  </section>`;

 const meet=`<section class="mg-screen" data-mg-screen="meet" aria-label="Meet the animals">
   <span class="eyebrow">STEP 2 · MEET THE ANIMALS</span>
   <h2>Six friends, six voices.</h2>
   <p class="lesson-copy">Tap an animal to hear its sound and watch it gently move. Say the sound together — animal sounds are twice as fun in two voices.</p>
   <div class="mg-playground">${ANIMALS.map(a=>`<button type="button" class="mg-animal mgm-${MOVE_NAMES[a.move]}" data-mg-sound="${a.slug}" style="background:${a.bg}" aria-label="${cap(a.slug)} — tap to hear it say ${a.word}">${img(a)}<span class="mg-tile-word">${cap(a.slug)}</span><span class="mg-tile-say">${a.word}</span></button>`).join('')}</div>
   <p class="mg-hint">Every animal plays a real recording. The sound word is written right on the card too — saying it in your own voice is the best version of all.</p>
   <div class="mg-next"><button type="button" class="button" data-mg-go="listen">Who Made That Sound? <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const listen=`<section class="mg-screen" data-mg-screen="listen" aria-label="Who made that sound">
   <span class="eyebrow">STEP 3 · WHO MADE THAT SOUND?</span>
   <h2>A listening game.</h2>
   <p class="lesson-copy">Tap the play button to hear a sound — then tap the animal who said it. Need another listen? Tap play again.</p>
   ${LISTEN_ROUNDS.map(r=>{const t=ANIMALS.find(a=>a.slug===r.target);return `<div class="tc-round" data-mg-listen="${t.slug}">
<p class="tc-ask">Who made that sound?</p>
<button type="button" class="mg-play-snd" data-mg-play="${t.slug}" aria-label="Play the mystery sound"><span class="mg-play-ic" aria-hidden="true">▶</span> Play the sound</button>
<div class="tc-choices" role="group" aria-label="Who made that sound? Choose an animal.">${r.choices.map((slug,i)=>{const a=ANIMALS.find(x=>x.slug===slug);return `<button type="button" class="tc-choice mg-listen-choice" aria-label="${cap(a.slug)}"${i===r.correct?' data-mg-correct="true"':''}>${img(a)}<span class="mg-tile-word">${cap(a.slug)}</span></button>`;}).join('')}</div>
<p class="tc-feedback" data-mg-feedback aria-live="polite" hidden></p>
</div>`;}).join('')}
   <p class="mg-hint">All six sounds come from the site&rsquo;s real recordings — the same ones the Animals &amp; Their Sounds class plays.</p>
   <div class="mg-next"><button type="button" class="button" data-mg-go="find">Find the Animal <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const find=`<section class="mg-screen" data-mg-screen="find" aria-label="Find the animal" data-tc-correct="You found it!|That’s the one!|Great looking!" data-tc-incorrect="Look again together — say the animal’s name slowly, then try another card.">
   <span class="eyebrow">STEP 4 · FIND THE ANIMAL</span>
   <h2>Find the animal.</h2>
   <p class="lesson-copy">You read the words, your child taps the animal. A miss is just another look.</p>
   ${FIND_ROUNDS.map(r=>`<div class="tc-round" data-tc-round data-tc-ask="${r.ask}">
<p class="tc-ask">${r.ask}</p>
<div class="tc-choices" role="group" aria-label="${r.ask}">${r.choices.map((slug,i)=>{const a=ANIMALS.find(x=>x.slug===slug);return `<button type="button" class="tc-choice" aria-label="${cap(a.slug)}"${i===r.correct?' data-tc-correct="true"':''}>${img(a)}</button>`;}).join('')}</div>
<p class="tc-feedback" data-tc-feedback aria-live="polite" hidden></p>
</div>`).join('')}
   <div class="mg-next"><button type="button" class="button" data-mg-go="move">Animal Movement <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const move=`<section class="mg-screen" data-mg-screen="move" aria-label="Animal movement">
   <span class="eyebrow">STEP 5 · ANIMAL MOVEMENT</span>
   <h2>Move like the animals do.</h2>
   <p class="lesson-copy">Tap an animal to see how it moves — then stand up and copy it. Frogs hop, ducks waddle, cats stretch… your living room is the playground.</p>
   <div class="mg-playground">${ANIMALS.map(a=>`<button type="button" class="mg-animal mgm-${MOVE_NAMES[a.move]}" data-mg-move="${a.slug}" style="background:${a.bg}" aria-label="${cap(a.slug)} — tap to watch how it ${a.verb}">${img(a)}<span class="mg-tile-word">${cap(a.slug)} ${a.verb}!</span></button>`).join('')}</div>
   <div class="tc-hunt"><h3>Copy me</h3><ul class="lesson-prompts"><li>After each tap, do the move together: hop for the frog, waddle for the duck, stretch for the cat. Moving is how three-year-olds remember.</li></ul></div>
   <div class="mg-next"><button type="button" class="button" data-mg-go="offscreen">Off-Screen Play <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const offscreen=`<section class="mg-screen" data-mg-screen="offscreen" aria-label="Off-screen animal play">
   <span class="eyebrow">STEP 6 · OFF-SCREEN PLAY</span>
   <h2>Your kitchen is a barnyard.</h2>
   <p class="lesson-copy">The animals follow you off the screen. Pick one of these — five minutes is plenty.</p>
   <div class="tc-hunt"><h3>Sound and move parade</h3><ul class="lesson-prompts"><li>March around the room together: each player picks an animal and does its sound AND its move while everyone guesses. “Quack, quack!” — waddle, waddle — “A duck!”</li></ul></div>
   <div class="tc-hunt"><h3>Stuffed animal choir</h3><ul class="lesson-prompts"><li>Line up stuffed animals and give each one a voice. Your child is the choir leader — point at a toy and let them bring it to life.</li></ul></div>
   <div class="tc-hunt"><h3>Bedtime barnyard</h3><ul class="lesson-prompts"><li>At story time, whisper the sounds: a sleepy cow says a slow moooo. Quiet animal sounds are a gentle way to land the day.</li></ul></div>
   <div class="mg-next"><button type="button" class="button" data-mg-go="complete">Finish the Magic <span aria-hidden="true">↓</span></button></div>
  </section>`;

 const complete=`<section class="mg-screen" data-mg-screen="complete" aria-label="Activity complete">
   <span class="eyebrow">STEP 7 · ACTIVITY COMPLETE</span>
   <h2>What a playground day!</h2>
   <p class="lesson-copy">You heard six animal voices, guessed who was speaking, found every hiding animal and hopped, waddled and swayed along. Whether you met two animals or all six, that was the whole game — and there was never a score to worry about. The barnyard will be waiting next time you visit.</p>
   <div class="mg-actions"><button type="button" class="button" data-mg-replay>Play Again <span aria-hidden="true">↺</span></button><a class="button button-ghost" href="${G.classPath}">Back to Animals &amp; Their Sounds <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="/learning-path/">Learning Path <span aria-hidden="true">↗</span></a></div>
   <div class="lesson-path">
    <a class="fc-stage lesson-card-link" href="${G.classPath}"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Class 6</span></div><h3>Animals &amp; Their Sounds</h3><p>The full class: twelve animal friends with real sounds, a match-the-sound board and barnyard play.</p><span class="fc-open">Open this class <span aria-hidden="true">↗</span></span></a>
    <a class="fc-stage lesson-card-link" href="/preschool/3-years/"><div class="fc-stage-pills"><span class="fc-age">Age 3</span><span class="fc-class">Magic games</span></div><h3>More magic games</h3><p>Try Look &amp; Draw — Magic Shapes — every Age 3 game lives on the stage shelf.</p><span class="fc-open">Choose another game <span aria-hidden="true">↗</span></span></a>
   </div>
  </section>`;

 return `${hero}
${welcome}
${meet}
${listen}
${find}
${move}
${offscreen}
${complete}
   </div>
   <noscript><p class="fc-hint">No JavaScript? Every screen is right here to read and point at together. The sound buttons need JavaScript — until then, be the duck: “Quack, quack!”</p></noscript>
  </div>
 </section>
 <section class="wrap lesson-section" id="for-grown-ups" aria-label="About this game">
  <span class="eyebrow">FOR GROWN-UPS</span>
  <h2>About the sounds.</h2>
  <p class="lesson-copy">Every animal in this game plays a real recording. Dog, cat, cow and sheep use the very same files as the Animals &amp; Their Sounds class, so the sounds stay consistent across the school. The duck recording is “Anas platyrhynchos - Mallard - XC62258” by Jonathon Jongsma (xeno-canto via Wikimedia Commons, CC BY-SA 3.0) — a close-up of a mallard giving the classic quack — and the frog is “Single Frog Croak” by MichaeltheFox8621 (Wikimedia Commons, CC BY-SA 4.0); both are trimmed and volume-matched, with the full credits kept in the sound folder. The sound word is written under every animal so you can perform it yourself, which is honestly the best version.</p>
  <p class="lesson-copy">Every movement in Step 5 is deliberately small and calm. If your child is sensitive to motion, the parent Calm Mode toggle in the footer (or your device&rsquo;s reduced-motion setting) stills every animation while all sounds, words and games keep working.</p>
  <p class="lesson-note">Being the frog is still the most popular role in this school. Assign accordingly.</p>
 </section>`;
}
