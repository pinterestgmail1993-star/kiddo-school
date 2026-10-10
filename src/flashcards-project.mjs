// Kiddo School — the original baby flashcard set (First Discoveries 01).
// Every card below points at a real image that already lives on R2, with its
// real pixel dimensions (probed from the files, never guessed) and its own
// parent-facing words for the card's individual page.
import {fcCommunityMount} from './flashcards/index.mjs';

export const flashcardsBase='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/flashcards/';
export const flashcardSets=[
 {
  slug:'black-and-white-baby-cards',
  stageName:'Newborn 1',
  stageHref:'/newborn/0-6-weeks/',
  setLabel:'First Discoveries 01',
  title:'Black and White Baby Flashcards – Free Printable Cards',
  h1:'Black and white baby flashcards.',
  subtitle:'Free printable high-contrast cards, made for newborn eyes.',
  hubTitle:'Black and White Baby Cards',
  metaDescription:'Free printable black and white baby flashcards: fifteen high-contrast cards for newborns 0–6 months. Print at home, no sign-up.',
  ageLabel:'0–6 months',
  cover:'first-discoveries-look-together-cutout-sheet.webp',
  coverAlt:'Cover of the Black and White Baby Cards set: the First Discoveries 01 look-together sheet showing four black and white baby cards — bear, bird, fish and butterfly',
  guide:'first-discoveries-look-together-parent-guide.webp',
  guideAlt:'Printable one-page parents guide for the black and white baby cards: print the cards, show one at a time, talk softly and pause, follow your baby’s cues',
  blurb:'Fifteen bold cards for the very first months. Print, show one at a time and watch your baby stare, track and smile.',
  intro:'Newborn eyes see the world in black and white first. These fifteen cards use bold, high-contrast shapes that are easy for a baby to focus on, so early looking becomes calm, shared play. Print them at home, hold one up close and talk softly as your baby meets the bear, the bird, the butterfly, the fish, the cat, the elephant, the rabbit, the turtle, the ball, the cup, the spoon — and three friendly faces. There is nothing to teach and nothing to test: the whole point is a quiet minute of looking together.',
  stages:[
   {age:'0–6 weeks',cls:'Newborn 1',subjects:['Vision','Bonding','Sound'],desc:'Black and white bold shapes, stripes, circles and simple faces.'},
   {age:'6–12 weeks',cls:'Newborn 2',subjects:['Visual tracking','Faces','Sound'],desc:'B&W patterns first, then very simple high-contrast images. Parent voice activities.'},
   {age:'3–4 months',cls:'Infant 1',subjects:['Vision','Movement','Communication'],desc:'B&W plus strong single colors, faces and familiar objects.'}
  ],
  cards:[
   {file:'first-discoveries-bear-card.webp',word:'Bear',slug:'bear',n:'01',w:1024,h:1536,
    alt:'Black and white baby flashcard of a bear face with the word Bear, from Kiddo.school First Discoveries set 01',
    intro:'A big, friendly bear face in bold black and white. Newborn eyes lock onto strong outlines first, which is why this card is a favourite first stop. Show it close, say the word softly and let your baby stare for as long as they like.',
    say:'Bear! A big, friendly bear.',
    try:'Hold the card about 30 centimetres from your baby’s face and move it very slowly from side to side. Watching their eyes follow the bear is gentle tracking practice — real work for brand-new eyes.',
    note:'Your baby may stare hard, blink or go very still. All of that is interest. When they look away, the lesson is over — a good one ends before your baby gets tired.'},
   {file:'first-discoveries-bird-card.webp',word:'Bird',slug:'bird',n:'02',w:1024,h:1536,
    alt:'Black and white baby flashcard of a bird with the word Bird, from Kiddo.school First Discoveries set 01',
    intro:'A simple bird with clear wings, drawn in the bold contrast newborns see best. Real birds flap and dart away, but this one is happy to sit still while your baby studies every line.',
    say:'Bird. A bird goes flap, flap.',
    try:'Whisper a little wing sound — flap, flap — and drift the card slowly through the air like a bird landing. Slow is the trick: quick movements are hard for new eyes to follow.',
    note:'Two to five minutes is a full session at this age. A wide-eyed stare means you have your baby’s whole attention — that is the goal, not a smile.'},
   {file:'first-discoveries-butterfly-card.webp',word:'Butterfly',slug:'butterfly',n:'03',w:1024,h:1536,
    alt:'Black and white baby flashcard of a butterfly with the word Butterfly, from Kiddo.school First Discoveries set 01',
    intro:'A bold butterfly with matching wings, perfect for a baby who is just discovering that two sides can be the same. High-contrast shapes like this hold a newborn’s attention better than any colourful toy.',
    say:'Butterfly. Hello, butterfly.',
    try:'Draw a slow figure eight in the air with the butterfly, about 30 centimetres from your baby’s face. The gentle change of direction gives their eyes something new to follow.',
    note:'Symmetry is quietly fascinating — grown-ups feel it too. If you catch yourself tracing the wings with a finger while you chat, your baby is watching that as well.'},
   {file:'first-discoveries-fish-card.webp',word:'Fish',slug:'fish',n:'04',w:1024,h:1536,
    alt:'Black and white baby flashcard of a fish with the word Fish, from Kiddo.school First Discoveries set 01',
    intro:'A friendly fish with a big round eye and a sweeping tail. The strong black outline is exactly the kind of shape a newborn’s developing vision finds easiest to lock onto.',
    say:'Fish. Swim, swim, little fish.',
    try:'Make the fish swim with a slow, wavy motion in front of your baby, then let the card rest. The rest matters: a still card is when your baby studies the details.',
    note:'Babies answer in their own way — a stare, a wiggle, a soft coo. Any of those is a conversation. There is nothing to teach and nothing to test here.'},
   {file:'black-and-white-baby-card-cat.webp',word:'Cat',slug:'cat',n:'05',w:1024,h:1536,
    alt:'Black and white baby flashcard of a cat face with the word Cat, from Kiddo.school First Discoveries set 01',
    intro:'A black and white cat face with pointed ears and wide eyes. Cats are familiar from storybooks and sofas, which gives you plenty to talk about in your own voice.',
    say:'Cat! A cat says meow.',
    try:'Say meow — softly, because babies startle easily — and see if you get a flicker of attention. Then name the ears, the eyes and the whiskers as you gently point to each one.',
    note:'Your voice is half the lesson. The same card said warmly, slowly and up close works better than a whole slideshow from far away.'},
   {file:'black-and-white-baby-card-elephant.webp',word:'Elephant',slug:'elephant',n:'06',w:1024,h:1536,
    alt:'Black and white baby flashcard of an elephant with the word Elephant, from Kiddo.school First Discoveries set 01',
    intro:'A big elephant with a long trunk, drawn bold for brand-new eyes. It is one of the most striking shapes in the set, and the trunk gives your finger somewhere to go.',
    say:'Elephant. Such a big, gentle elephant.',
    try:'Trace the trunk from top to bottom with your finger, very slowly, while you name it. Then swing your finger gently like a trunk and watch your baby follow.',
    note:'Big animals invite big, gentle words — huge, slow, soft. Descriptive words like these are lovely early vocabulary, and the elephant makes them fun to say.'},
   {file:'black-and-white-baby-card-rabbit.webp',word:'Rabbit',slug:'rabbit',n:'07',w:1024,h:1536,
    alt:'Black and white baby flashcard of a rabbit with the word Rabbit, from Kiddo.school First Discoveries set 01',
    intro:'A rabbit with long ears and a round, cheeky face, in the high contrast newborns love. Whiskers, ears and nose give you three easy things to name in one quiet minute.',
    say:'Rabbit. Hello, long ears.',
    try:'Hold two fingers above your head like ears and give them a small hop. Then bring the card close and let your baby study the rabbit’s real ears.',
    note:'Small silly gestures are not a performance — they are language. Pairing the word rabbit with movement and your happy voice is exactly how first words take root.'},
   {file:'black-and-white-baby-card-turtle.webp',word:'Turtle',slug:'turtle',n:'08',w:1024,h:1536,
    alt:'Black and white baby flashcard of a turtle with the word Turtle, from Kiddo.school First Discoveries set 01',
    intro:'A steady turtle in a bold shell. Turtles are wonderfully slow, which makes this the calmest card in the set — a good one for the wind-down part of the day.',
    say:'Turtle. Slow and steady, turtle.',
    try:'Move the turtle the way a turtle would move: barely at all. Then let the card sit perfectly still in your baby’s view and enjoy the quiet together.',
    note:'Calm card time before a nap can become a lovely ritual. The same three or four cards, the same soft voice — repetition is not boring for babies, it is reassuring.'},
   {file:'black-and-white-baby-card-ball.webp',word:'Ball',slug:'ball',n:'09',w:1080,h:1350,
    alt:'Black and white baby flashcard of a beach ball with the word Ball, from Kiddo.school First Discoveries set 01',
    intro:'A bold beach ball, round and stripey in black and white. Balls are usually a baby’s first favourite toy, so this card connects straight to play your baby already knows.',
    say:'Ball! Round and round, ball.',
    try:'From around three months, babies love to bat at things. Hold the card within gentle reach of your baby’s hands and let them tap it — an adult always holds the card.',
    note:'Reaching is a big deal: it is your baby deciding to join in, not just watch. A swipe that misses is still practice, and there is no wrong way to do this.'},
   {file:'black-and-white-baby-card-cup.webp',word:'Cup',slug:'cup',n:'10',w:1080,h:1350,
    alt:'Black and white baby flashcard of a cup with the word Cup, from Kiddo.school First Discoveries set 01',
    intro:'A simple cup, bold and clear. It is an everyday object your baby will see at every meal, which makes this card an easy bridge between card time and real life.',
    say:'Cup. You drink from a cup.',
    try:'After card time, show your baby a real cup from a safe distance and say cup again. Same word, two sizes — that jump from picture to world is the whole magic.',
    note:'You do not need a special moment for this. A card during a nappy change or after a feed is already a complete lesson at this age.'},
   {file:'black-and-white-baby-card-dog.webp',word:'Dog',slug:'dog',n:'11',w:1080,h:1350,
    alt:'Black and white baby flashcard of a dog with the word Dog, from Kiddo.school First Discoveries set 01',
    intro:'A friendly dog face in bold black and white. Dog is a lovely early word because it comes with a sound and an action attached — barking and wagging are easy to act out.',
    say:'Dog! A dog says woof.',
    try:'Say woof in your softest, silliest voice, then pause. If a family dog barks back — the four-legged kind counts — your baby gets the live version too.',
    note:'Sound effects are not silly extras. Words paired with sounds and your happy face are exactly what early language grows on.'},
   {file:'black-and-white-baby-card-happy-face.webp',word:'Happy face',slug:'happy-face',n:'12',w:1080,h:1350,
    alt:'Black and white baby flashcard of a happy smiley face with the words Happy face, from Kiddo.school First Discoveries set 01',
    intro:'A big bold smiley face. Faces are the very first thing babies love to look at — yours most of all — and this card is a friendly stand-in for when you need both hands free.',
    say:'Happy! A happy face.',
    try:'Show the card, then copy it: make the same big smile and hold it. Babies study faces endlessly, and seeing the card and your smile match up lands beautifully.',
    note:'If your baby returns even a hint of a smile, treasure it. Either way, the looking is the learning — no performance is required from either of you.'},
   {file:'black-and-white-baby-card-sleepy-face.webp',word:'Sleepy face',slug:'sleepy-face',n:'13',w:1080,h:1350,
    alt:'Black and white baby flashcard of a sleepy face with the words Sleepy face, from Kiddo.school First Discoveries set 01',
    intro:'A gentle sleepy face with closed eyes. This is the natural last card of a session, and a sweet one to make part of a wind-down or nap ritual.',
    say:'Sleepy. Time to rest, sleepy face.',
    try:'Save this card for last and lower your voice as you show it. Let the room slow down too — dimmer, quieter, slower. Babies read the pace of everything around them.',
    note:'Pairing a calm card with calm moments builds an association your baby comes to recognise. Do not be surprised if this one becomes the favourite — for you as much as for them.'},
   {file:'black-and-white-baby-card-spoon.webp',word:'Spoon',slug:'spoon',n:'14',w:1080,h:1350,
    alt:'Black and white baby flashcard of a spoon with the word Spoon, from Kiddo.school First Discoveries set 01',
    intro:'A bold spoon, plain and familiar. Like the cup, it is an everyday object — and the things a baby sees every single day are exactly the right first words.',
    say:'Spoon. Here is the spoon.',
    try:'Name the spoon on the card, then name the spoon at lunch. Hearing the same word in two places is how a baby learns that words belong to things, everywhere.',
    note:'Everyday-object cards may feel plain to you, but familiarity is the point. A baby’s first words are overwhelmingly the things they see and hear most often.'},
   {file:'black-and-white-baby-card-surprised-face.webp',word:'Surprised face',slug:'surprised-face',n:'15',w:1080,h:1350,
    alt:'Black and white baby flashcard of a surprised face with the words Surprised face, from Kiddo.school First Discoveries set 01',
    intro:'A wide-eyed surprised face, bold and funny. Exaggerated expressions are wonderful for babies, who are busy learning to read faces long before they can read anything else.',
    say:'Oh! What a surprised face.',
    try:'Make the same face back — eyes wide, mouth round — and hold it a moment, then relax. Face-reading is early people-watching, and babies love it.',
    note:'Big, slow, clear expressions are easier for a baby to read than subtle ones. This is the one place where overacting is exactly right.'}
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

// Normalised view of the baby set, shaped like the toddler sets in
// src/flashcards/index.mjs so the same card-page builder can serve both.
export const babySet=(()=>{
 const s=flashcardSets[0];
 const base=flashcardsBase+s.slug+'/';
 return {slug:s.slug,url:setUrl(s),name:s.hubTitle,ageLabel:s.ageLabel,base,
  printPath:null,lessonPath:null,lessonTitle:null,relatedSlugs:[],
  cover:{file:s.cover,w:1024,h:1536,alt:s.coverAlt},coverUrl:imgUrl(s,s.cover),
  cards:s.cards.map((c,i)=>({slug:c.slug,word:c.word,file:c.file,w:c.w,h:c.h,alt:c.alt,
   intro:c.intro,say:c.say,try:c.try,note:c.note,
   url:setUrl(s)+c.slug+'/',img:imgUrl(s,c.file),n:i+1}))};
})();

export function fcSetCard(set){
 return `<a class="fc-setcard" href="${setUrl(set)}"><div class="fc-setcard-visual"><img src="${imgUrl(set,set.cover)}" width="1024" height="1536" alt="${set.coverAlt}" loading="lazy"></div><div class="fc-setcard-copy"><span class="eyebrow">${set.setLabel} · AGES ${set.ageLabel}</span><h2>${set.hubTitle}</h2><p>${set.blurb}</p><span class="fc-open">Open this set <span aria-hidden="true">↗</span></span></div></a>`;
}
export function fcSoon(){
 return `<div class="fc-soon"><h2>More sets are on the drawing table.</h2><p>Alphabet and number flashcards are on the drawing table, in the same print-at-home style. If there is a set you are waiting for, the kitchen table decides what gets made first: tell someone at Kiddo.school what your little one is learning right now.</p></div>`;
}
export function fcSetBody(set){
 return `<section class="wrap fc-intro"><div class="fc-chips"><span>Ages ${set.ageLabel}</span><span>${set.cards.length} cards</span><span>Free to print</span></div><p class="fc-lede">${set.intro}</p></section>
 <section class="wrap fc-section"><span class="eyebrow">AGES · CLASSES · SUBJECTS</span><h2>What the cards are for, stage by stage.</h2><p class="fc-hint">The exact age, class and subjects for each stage, so you always know what your little one is working on.</p><div class="fc-stages">${set.stages.map(st=>`<div class="fc-stage"><div class="fc-stage-pills"><span class="fc-age">${st.age}</span><span class="fc-class">${st.cls}</span></div><div class="fc-stage-subjects">${st.subjects.map(su=>`<span>${su}</span>`).join('')}</div><p>${st.desc}</p></div>`).join('')}</div></section>
 <section class="wrap fc-section"><span class="eyebrow">THE FIFTEEN CARDS</span><h2>Meet the whole set.</h2><p class="fc-hint">Every card has its own page with the words to say together, one thing to try and a full-size download. Tap any card to open it.</p><div class="fc-grid">${set.cards.map(c=>`<figure class="fc-card"><a href="${setUrl(set)}${c.slug}/" aria-label="Open the ${c.word} card page"><img src="${imgUrl(set,c.file)}" width="${c.w}" height="${c.h}" alt="${c.alt}" loading="lazy"></a><figcaption><strong>${c.word}</strong><span>Card ${c.n} · Open card <span aria-hidden="true">↗</span></span></figcaption></figure>`).join('')}</div></section>
 <section class="wrap fc-section"><span class="eyebrow">FOR THE GROWN-UPS</span><h2>The parents guide.</h2><p class="fc-hint">One printable page for you, not for the baby: how to print, how to hold the cards, and when to stop. Handy to keep on the fridge or hand to babysitters and grandparents.</p><figure class="fc-guide-figure"><a href="${imgUrl(set,set.guide)}" aria-label="Open full-size parents guide"><img src="${imgUrl(set,set.guide)}" width="1024" height="1536" alt="${set.guideAlt}" loading="lazy"></a><figcaption><strong>Parents guide</strong><span>One page, free to print, big text, zero jargon.</span></figcaption></figure></section>
 <section class="wrap fc-section"><span class="eyebrow">HOW TO LOOK TOGETHER</span><h2>One card, one quiet minute.</h2><ol class="fc-steps">${set.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${String(i+1).padStart(2,'0')}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol></section>
 <section class="wrap fc-section fc-why"><span class="eyebrow">THE LITTLE BIT OF LEARNING</span><h2>Why black and white?</h2><p>${set.why}</p></section>
 <section class="wrap fc-section"><h2>Make it work for you.</h2><div class="fc-adapt"><div><h3>Keep it simple</h3><p>${set.younger}</p></div><div><h3>Take it further</h3><p>${set.older}</p></div></div><p class="fc-safety"><strong>A note for grown-ups:</strong> ${set.safety}</p></section>
 <section class="wrap fc-section fc-back"><a class="button" href="/flashcards/">All flashcard sets <span aria-hidden="true">↗</span></a></section>
 ${fcCommunityMount(setUrl(set))}`;
}
