export const flashcardsBase='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/';
export const flashcardSets=[
 {
  slug:'black-and-white-baby-cards',
  setLabel:'First Discoveries 01',
  title:'Black and White Baby Flashcards – Free Printable Cards',
  h1:'Black and white baby flashcards.',
  subtitle:'Free printable high-contrast cards, made for newborn eyes.',
  hubTitle:'Black and White Baby Cards',
  metaDescription:'Free printable black and white baby flashcards: eight high-contrast animal cards for newborns 0–6 months. Print at home, no sign-up.',
  ageLabel:'0–6 months',
  cover:'first-discoveries-look-together-cutout-sheet.webp',
  coverAlt:'Cover of the Black and White Baby Cards set: the First Discoveries 01 look-together sheet showing four black and white baby cards — bear, bird, fish and butterfly',
  guide:'first-discoveries-look-together-parent-guide.webp',
  guideAlt:'Printable one-page parents guide for the black and white baby cards: print the cards, show one at a time, talk softly and pause, follow your baby’s cues',
  blurb:'Eight bold animal cards for the very first months. Print, show one at a time and watch your baby stare, track and smile.',
  intro:'Newborn eyes see the world in black and white first. These eight animal cards use bold, high-contrast shapes that are easy for a baby to focus on, so early looking becomes calm, shared play. Print them at home, hold one up close and talk softly as your baby meets the bear, the bird, the butterfly, the fish, the cat, the elephant, the rabbit and the turtle. There is nothing to teach and nothing to test: the whole point is a quiet minute of looking together.',
  cards:[
   {file:'first-discoveries-bear-card.webp',word:'Bear',n:'01',alt:'Black and white baby flashcard of a bear face with the word Bear, from Kiddo.school First Discoveries set 01'},
   {file:'first-discoveries-bird-card.webp',word:'Bird',n:'02',alt:'Black and white baby flashcard of a bird with the word Bird, from Kiddo.school First Discoveries set 01'},
   {file:'first-discoveries-butterfly-card.webp',word:'Butterfly',n:'03',alt:'Black and white baby flashcard of a butterfly with the word Butterfly, from Kiddo.school First Discoveries set 01'},
   {file:'first-discoveries-fish-card.webp',word:'Fish',n:'04',alt:'Black and white baby flashcard of a fish with the word Fish, from Kiddo.school First Discoveries set 01'},
   {file:'black-and-white-baby-card-cat.webp',word:'Cat',n:'05',alt:'Black and white baby flashcard of a cat face with the word Cat, from Kiddo.school First Discoveries set 01'},
   {file:'black-and-white-baby-card-elephant.webp',word:'Elephant',n:'06',alt:'Black and white baby flashcard of an elephant with the word Elephant, from Kiddo.school First Discoveries set 01'},
   {file:'black-and-white-baby-card-rabbit.webp',word:'Rabbit',n:'07',alt:'Black and white baby flashcard of a rabbit with the word Rabbit, from Kiddo.school First Discoveries set 01'},
   {file:'black-and-white-baby-card-turtle.webp',word:'Turtle',n:'08',alt:'Black and white baby flashcard of a turtle with the word Turtle, from Kiddo.school First Discoveries set 01'}
  ],
  steps:[
   ['Print the cards','Print on A4 or Letter paper using fit to page. Plain paper works; cardstock or a photo setting makes the cards last longer.'],
   ['Find a calm moment','Pick a time when your baby is awake, fed and settled, such as after a feed or a nappy change. A few minutes is plenty: little ones work hard just by looking.'],
   ['Hold one card close','Hold a card about 25 to 40 centimetres from your baby’s face, roughly the distance from your chest to your face during a cuddle. An adult always holds the cards.'],
   ['Talk softly and pause','Name the animal in a gentle voice: bear. Then wait. Babies answer with stares, wiggles, coos or wide eyes, and the pause is where the conversation happens.'],
   ['Follow your baby’s cues','When your baby looks away, yawns or wriggles, the session is over. Try a different card another day; the bear will still be there tomorrow.']
  ],
  why:'A newborn’s vision is still under construction, and contrast is what develops first. Black shapes on a white background are the easiest thing for brand-new eyes to lock onto, which is why high-contrast cards hold a baby’s attention longer than colourful toys. Following a card with their eyes builds early tracking and focus, and hearing you name each animal wires words to what they see. Shared looking is not a lesson: it is your baby’s first conversation.',
  younger:'Newborns to three months love the simplest, boldest shapes. Hold the card still at first, then move it slowly from side to side a few centimetres so your baby can practise following it.',
  older:'From around three months, babies reach and bat. Let them touch the card, tap the bear’s nose and crumple a spare sheet to explore. Around this age, black, white and red pictures become extra interesting.',
  safety:'An adult always holds the cards. Keep paper away from little mouths and out of sleep spaces, and choose a calm moment for card time. Stop when your baby looks away or becomes unsettled: shared looking, not a test.'
 }
];
const setUrl=s=>`/flashcards/${s.slug}/`;
const imgUrl=(s,f)=>flashcardsBase+s.slug+'/'+f;
export function fcSetCard(set){
 return `<a class="fc-setcard" href="${setUrl(set)}"><div class="fc-setcard-visual"><img src="${imgUrl(set,set.cover)}" width="1024" height="1536" alt="${set.coverAlt}" loading="lazy"></div><div class="fc-setcard-copy"><span class="eyebrow">${set.setLabel} · AGES ${set.ageLabel}</span><h2>${set.hubTitle}</h2><p>${set.blurb}</p><span class="fc-open">Open this set <span aria-hidden="true">↗</span></span></div></a>`;
}
export function fcSoon(){
 return `<div class="fc-soon"><h2>More sets are on the drawing table.</h2><p>Parents tell us they want first words, animals, alphabet and number flashcards next, all in the same print-at-home style. If there is a set you are waiting for, the kitchen table decides what gets made first: tell someone at Kiddo.school what your little one is learning right now.</p></div>`;
}
export function fcSetBody(set){
 return `<section class="wrap fc-intro"><div class="fc-chips"><span>Ages ${set.ageLabel}</span><span>${set.cards.length} cards</span><span>Free to print</span></div><p class="fc-lede">${set.intro}</p></section>
 <section class="wrap fc-section"><span class="eyebrow">THE EIGHT CARDS</span><h2>Meet the animals.</h2><p class="fc-hint">Tap a card to open it full-size, then print from your browser. One card per page keeps every shape big and bold.</p><div class="fc-grid">${set.cards.map(c=>`<figure class="fc-card"><a href="${imgUrl(set,c.file)}" aria-label="Open full-size ${c.word} card"><img src="${imgUrl(set,c.file)}" width="1024" height="1536" alt="${c.alt}" loading="lazy"></a><figcaption><strong>${c.word}</strong><span>Card ${c.n}</span></figcaption></figure>`).join('')}</div></section>
 <section class="wrap fc-section"><span class="eyebrow">FOR THE GROWN-UPS</span><h2>The parents guide.</h2><p class="fc-hint">One printable page for you, not for the baby: how to print, how to hold the cards, and when to stop. Handy to keep on the fridge or hand to babysitters and grandparents.</p><figure class="fc-guide-figure"><a href="${imgUrl(set,set.guide)}" aria-label="Open full-size parents guide"><img src="${imgUrl(set,set.guide)}" width="1024" height="1536" alt="${set.guideAlt}" loading="lazy"></a><figcaption><strong>Parents guide</strong><span>One page, free to print, big text, zero jargon.</span></figcaption></figure></section>
 <section class="wrap fc-section"><span class="eyebrow">HOW TO LOOK TOGETHER</span><h2>One card, one quiet minute.</h2><ol class="fc-steps">${set.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${String(i+1).padStart(2,'0')}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol></section>
 <section class="wrap fc-section fc-why"><span class="eyebrow">THE LITTLE BIT OF LEARNING</span><h2>Why black and white?</h2><p>${set.why}</p></section>
 <section class="wrap fc-section"><h2>Make it work for you.</h2><div class="fc-adapt"><div><h3>Keep it simple</h3><p>${set.younger}</p></div><div><h3>Take it further</h3><p>${set.older}</p></div></div><p class="fc-safety"><strong>A note for grown-ups:</strong> ${set.safety}</p></section>
 <section class="wrap fc-section fc-back"><a class="button" href="/flashcards/">All flashcard sets <span aria-hidden="true">↗</span></a></section>`;
}
