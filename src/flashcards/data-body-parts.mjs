// Kiddo School — Preschool 7 (Age 3): Body Parts & My Five Senses.
// Twenty-four real cards uploaded by the owner to R2
// (flashcards/preschool-learning-cards/body-parts-and-five-senses-age-3/):
// fifteen body parts (head, eyes, ears, nose, mouth, hands, feet, arms, legs,
// fingers, toes, skin, tongue, hair, chin, cheeks) and the senses words that
// go with them (see, hear, smell, touch, taste, look, listen, feel), plus the
// set cover. Dimensions probed from the actual files on 9 Oct 2026: every
// card is 1240×1748 portrait; the cover is 1264×1264 square. Nothing here is
// invented: each card points at its real file with its real pixels and its
// own parent-facing words.

const R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const P='flashcards/preschool-learning-cards/body-parts-and-five-senses-age-3/';
const W=1240,H=1748;

export const bodyPartsMeta={
 slug:'body-parts-and-five-senses',
 group:'preschool',
 name:'Body Parts & Five Senses Flashcards',
 seoTitle:'Body Parts & Five Senses Flashcards for Preschoolers | 24 Cards',
 h1:'Body Parts & Five Senses Flashcards for Preschoolers',
 metaDescription:'Twenty-four body parts and five senses flashcards for preschoolers: head, eyes, ears, hands, fingers and more — each card has its own page with parent prompts and a free download.',
 lede:'Twenty-four cards about the one thing your child knows best: their own body. Every card has its own page with the picture, the words to say together and one thing to try — from wiggling fingers to sniffing flowers.',
 hubBlurb:'Twenty-four cards about the one thing your child knows best — their own body, and the five senses that explore the world.',
 ageLabel:'3–4 years',
 noun:'Preschoolers',
 downloadHint:'Every card page has its own download button with the full-size image, ready for away-from-screen pointing games.',
 useIdeas:[
  ['Name it, then touch it','The pair is the whole lesson: “head!” — then both hands on your head. Saying the word while feeling the body part wires them together, and the touching is the fun half.'],
  ['Play the pointing game backwards','Once a few cards feel easy, your child names a body part and YOU point. Getting one wrong on purpose — pointing at your elbow when they say nose — keeps the game alive for weeks.'],
  ['Follow one sense all day','Pick a sense card at breakfast and be its helper all morning: ears day, nose day, fingers day. One sense at a time is how the five of them become friends.'],
  ['Take one card on the road','Tape the hands card by the sink or the look card by the window. Every hand-wash and every “what do you see?” becomes a quiet repetition — and repetitions are what make the words stick.']
 ],
 printPath:'/preschool/3-years/body-parts-and-five-senses/print/',
 relatedSets:['animal-sounds','first-concepts','opposites'],
 coverFile:'cover.webp',
 coverAlt:'Cover of the Body Parts & Five Senses flashcards set: a smiling child surrounded by the five sense icons — an eye, an ear, a hand, a nose and a tongue — under the words Body Parts & Five Senses'
};

export const bodyPartsLesson={
 path:'/preschool/3-years/body-parts-and-five-senses/',
 seoTitle:'Body Parts & My Five Senses for 3 Year Olds',
 title:'Body Parts & My Five Senses for 3 Year Olds',
 h1:'Body Parts & My Five Senses',
 description:'Learn body parts and the five senses with your preschooler: twenty-four picture cards, a point-and-find game, sense-matching play, off-screen activities and a print view — no scores, no sign-up.',
 eyebrow:'PRESCHOOL · AGE 3 · CLASS 7',
 crumbs:[['Preschool','/preschool/'],['Age 3','/preschool/3-years/'],['Body Parts & My Five Senses','/preschool/3-years/body-parts-and-five-senses/']],
 schemaImage:R2+P+'cover.webp',
 ogImage:R2+P+'cover.webp',
 ogAlt:'The Body Parts & Five Senses cover of the Kiddo School preschool class: a smiling child surrounded by the five sense icons under the words Body Parts & Five Senses',
 schema:{resourceType:'Interactive preschool class',level:'Preschool (age 3)',teaches:['Naming body parts: head, eyes, ears, nose, mouth, hands, feet, arms, legs, fingers, toes, skin, tongue, hair, chin and cheeks','The five senses and what each one does: eyes see, ears hear, the nose smells, the tongue tastes, the skin touches','Matching each sense to the body part that does it','Pointing games and safe sensory exploring, on and off screen'],audience:'Parents and their three-year-olds',keywords:'body parts for 3 year olds, five senses activities for preschoolers, my five senses lesson, body parts flashcards, five senses flashcards, body parts activities for kids, senses game for preschoolers, human body for toddlers, all about me theme'},
 cover:{file:'cover.webp',w:1264,h:1264,alt:'The Body Parts & Five Senses set cover — a smiling child surrounded by the five sense icons under the words Body Parts & Five Senses'},
 folder:P,
 r2Base:R2,
 printables:{
  printEyebrow:'PRINTABLE BODY PARTS CARDS',
  pack:'Body Parts & Five Senses Flashcards: print all twenty-four cards',
  meta:'Twenty-four cards, two to a printed page — every body part and every sense word, from head to feel.',
  audience:'Made for age 3 and up — one clear picture per card, kept in card order.',
  printAria:'The twenty-four body parts and five senses flashcards, two to a page'
 },
 cards:[
  {order:1,file:'01-head.webp',w:W,h:H,slug:'head',alt:'Body parts flashcard: a smiling boy\u2019s face with dark hair and the word head, from the Kiddo School body parts and five senses set'},
  {order:2,file:'02-eyes.webp',w:W,h:H,slug:'eyes',alt:'Body parts flashcard: a close-up pair of brown eyes with the word eyes, from the Kiddo School body parts and five senses set'},
  {order:3,file:'03-ears.webp',w:W,h:H,slug:'ears',alt:'Body parts flashcard: a pair of ears with the word ears, from the Kiddo School body parts and five senses set'},
  {order:4,file:'04-nose.webp',w:W,h:H,slug:'nose',alt:'Body parts flashcard: a little nose with the word nose, from the Kiddo School body parts and five senses set'},
  {order:5,file:'05-mouth.webp',w:W,h:H,slug:'mouth',alt:'Body parts flashcard: a smiling open mouth with the word mouth, from the Kiddo School body parts and five senses set'},
  {order:6,file:'06-hands.webp',w:W,h:H,slug:'hands',alt:'Body parts flashcard: two open hands in striped sweater sleeves with the word hands, from the Kiddo School body parts and five senses set'},
  {order:7,file:'07-feet.webp',w:W,h:H,slug:'feet',alt:'Body parts flashcard: two bare feet with the word feet, from the Kiddo School body parts and five senses set'},
  {order:8,file:'08-arms.webp',w:W,h:H,slug:'arms',alt:'Body parts flashcard: two arms with open hands reaching down from purple sleeves with the word arms, from the Kiddo School body parts and five senses set'},
  {order:9,file:'09-legs.webp',w:W,h:H,slug:'legs',alt:'Body parts flashcard: two legs in purple shorts with the word legs, from the Kiddo School body parts and five senses set'},
  {order:10,file:'10-see.webp',w:W,h:H,slug:'see',alt:'Five senses flashcard: a pair of eyes with a butterfly landing near them and the word see, from the Kiddo School body parts and five senses set'},
  {order:11,file:'11-hear.webp',w:W,h:H,slug:'hear',alt:'Five senses flashcard: an ear with purple sound waves and the word hear, from the Kiddo School body parts and five senses set'},
  {order:12,file:'12-smell.webp',w:W,h:H,slug:'smell',alt:'Five senses flashcard: a nose sniffing a purple flower with the word smell, from the Kiddo School body parts and five senses set'},
  {order:13,file:'13-fingers.webp',w:W,h:H,slug:'fingers',alt:'Body parts flashcard: an open hand showing all five fingers with the word fingers, from the Kiddo School body parts and five senses set'},
  {order:14,file:'14-toes.webp',w:W,h:H,slug:'toes',alt:'Body parts flashcard: ten little toes with the word toes, from the Kiddo School body parts and five senses set'},
  {order:15,file:'15-skin.webp',w:W,h:H,slug:'skin',alt:'Five senses flashcard: a close-up patch of skin with the word skin, from the Kiddo School body parts and five senses set'},
  {order:16,file:'16-tongue.webp',w:W,h:H,slug:'tongue',alt:'Body parts flashcard: an open mouth with the tongue sticking out with the word tongue, from the Kiddo School body parts and five senses set'},
  {order:17,file:'17-touch.webp',w:W,h:H,slug:'touch',alt:'Five senses flashcard: a hand gently touching something soft and blue with the word touch, from the Kiddo School body parts and five senses set'},
  {order:18,file:'18-taste.webp',w:W,h:H,slug:'taste',alt:'Five senses flashcard: a mouth with the tongue out tasting a lollipop with the word taste, from the Kiddo School body parts and five senses set'},
  {order:19,file:'19-hair.webp',w:W,h:H,slug:'hair',alt:'Body parts flashcard: a boy with dark hair with the word hair, from the Kiddo School body parts and five senses set'},
  {order:20,file:'20-chin.webp',w:W,h:H,slug:'chin',alt:'Body parts flashcard: a boy\u2019s face with an arrow pointing to his chin with the word chin, from the Kiddo School body parts and five senses set'},
  {order:21,file:'21-cheeks.webp',w:W,h:H,slug:'cheeks',alt:'Body parts flashcard: a smiling face with rosy cheeks with the word cheeks, from the Kiddo School body parts and five senses set'},
  {order:22,file:'22-look.webp',w:W,h:H,slug:'look',alt:'Five senses flashcard: a boy bending down to look closely at a red ball with the word look, from the Kiddo School body parts and five senses set'},
  {order:23,file:'23-listen.webp',w:W,h:H,slug:'listen',alt:'Five senses flashcard: a boy cupping his hand behind his ear to listen with the word listen, from the Kiddo School body parts and five senses set'},
  {order:24,file:'24-feel.webp',w:W,h:H,slug:'feel',alt:'Five senses flashcard: a hand feeling something soft and white with the word feel, from the Kiddo School body parts and five senses set'}
 ]
};

/* Parent-facing words, keyed by card slug. Every card gets its own intro,
   its own line to say together, one real-world activity, one parent note
   and its own search description — written for the card it belongs to,
   never copied between cards. Body cards hand over an action; sense cards
   hand over the sense itself. */
export const bodyPartsCardContent={
 'head':{
  word:'Head',
  cardTitle:'Head Flashcard — the nod-along card for Preschoolers',
  intro:'Your child has known their head since they first shook it to say no. On this card the word head sits under a smiling boy, ready for a game you can play without any props at all.',
  say:'Head! Where is your head? Pat, pat — there it is!',
  try:'Nod your head yes, shake your head no, tilt it side to side like a curious bird. Ask your child to copy each one.',
  note:'Hats, hoods and hairbrushes all live on the head — naming the body part while you use them turns routines into practice.',
  metaDescription:'Meet the head body parts flashcard: a smiling boy with the word head, a nod-and-shake game and parent prompts. Free to download and print.'
 },
 'eyes':{
  word:'Eyes',
  cardTitle:'Eyes Flashcard — the blink-twice card for Preschoolers',
  intro:'Two eyes, always working: watching the dog, finding the lost sock, reading the pictures. This card pairs the word eyes with a close-up pair of brown ones — very probably blinking right now.',
  say:'Eyes! Blink, blink. Can you blink like that?',
  try:'Play the staring game: who can keep their eyes open longest? Then play the closing game — eyes hidden means peek-a-boo time.',
  note:'One wink is a mystery to most three-year-olds. If both eyes blink, that is exactly right.',
  metaDescription:'Meet the eyes body parts flashcard: a close-up pair of brown eyes with the word eyes, a blinking game and parent prompts. Free to download and print.'
 },
 'ears':{
  word:'Ears',
  cardTitle:'Ears Flashcard — the listen-here card for Preschoolers',
  intro:'Ears never take a break — they catch dogs, doorbells and songs all day. The word ears sits under a simple pair of ears, ready for a pointing game that ends in listening.',
  say:'Ears! Point to your ears. Can you wiggle them?',
  try:'Cover your ears with your hands and listen to how quiet the world gets — then let go and count what you hear.',
  note:'Glasses, hats and headphones all visit the ears. If your child wears any of them, that is the sentence to say together.',
  metaDescription:'Meet the ears body parts flashcard: a pair of ears with the word ears, a cover-and-listen game and parent prompts. Free to download and print.'
 },
 'nose':{
  word:'Nose',
  cardTitle:'Nose Flashcard — the sniff-sniff card for Preschoolers',
  intro:'The nose is a sniffer first and a wiggle second. This card shows a little nose with the word nose — and the sniffing game that goes with it is a guaranteed giggle.',
  say:'Nose! Sniff, sniff! Can you smell something from here?',
  try:'Sniff three things nearby: a snack, a sleeve, the air outside. Which one gets the biggest sniff?',
  note:'Noses know secrets grown-ups forget — rain coming, bread baking. Let your child report what their nose finds.',
  metaDescription:'Meet the nose body parts flashcard: a little nose with the word nose, a sniff-three-things game and parent prompts. Free to download and print.'
 },
 'mouth':{
  word:'Mouth',
  cardTitle:'Mouth Flashcard — the big-smile card for Preschoolers',
  intro:'The mouth does the talking, the smiling, the humming and the lunch. The word mouth sits under a big open smile — an invitation to make every sound your face can hold.',
  say:'Mouth! Open wide — aaah! Now smile big!',
  try:'Make a small mouth, a big mouth, an O mouth and a wide smile. Which one looks like the card?',
  note:'The mouth is where the senses meet the words: it tastes the snack and then tells you about it.',
  metaDescription:'Meet the mouth body parts flashcard: a smiling open mouth with the word mouth, a mouth-shapes game and parent prompts. Free to download and print.'
 },
 'hands':{
  word:'Hands',
  cardTitle:'Hands Flashcard — the clap-along card for Preschoolers',
  intro:'Two hands in cozy striped sleeves — ready to clap, wave, build and help. The word hands sits under them, and the games that follow are endless.',
  say:'Hands! Clap, clap, clap! Can you wave one hello?',
  try:'Clap fast, clap slow, clap high, clap low — then hide your hands behind your back for a round of where did they go?',
  note:'Hands learn by doing: spoons, zips and crayons all teach them. Naming the hands while they work doubles the lesson.',
  metaDescription:'Meet the hands body parts flashcard: two open hands in striped sleeves with the word hands, a clap-fast-clap-slow game and parent prompts. Free to download and print.'
 },
 'feet':{
  word:'Feet',
  cardTitle:'Feet Flashcard — the stomp-and-jump card for Preschoolers',
  intro:'Bare feet on the card, wiggling toes and all. The word feet sits under them — an open invitation for the loudest, bounciest naming game in the set.',
  say:'Feet! Stomp, stomp! Can you jump with both feet?',
  try:'Stomp like a giant, tiptoe like a mouse, then freeze with both feet still. Freezing is the hard part — and the funny one.',
  note:'Shoes on, shoes off and socks with stripes are all feet conversations waiting to happen.',
  metaDescription:'Meet the feet body parts flashcard: two bare feet with the word feet, a stomp-and-freeze game and parent prompts. Free to download and print.'
 },
 'arms':{
  word:'Arms',
  cardTitle:'Arms Flashcard — the stretch-up-high card for Preschoolers',
  intro:'Two arms reaching up from a purple shirt, mid-hug or mid-hooray. The word arms sits under them, ready for a round of stretch-and-wrap.',
  say:'Arms! Reach up high! Now wrap them around yourself for a hug.',
  try:'Arms up like a tree, arms out like an airplane, arms around for a self-hug. Three shapes, one word.',
  note:'Sleeves make arms extra interesting: arm in, arm out, arm through — dressing time is arms practice.',
  metaDescription:'Meet the arms body parts flashcard: two arms reaching up from a purple shirt with the word arms, a tree-and-airplane game and parent prompts. Free to download and print.'
 },
 'legs':{
  word:'Legs',
  cardTitle:'Legs Flashcard — the marching card for Preschoolers',
  intro:'Two legs in purple shorts, standing by for action. The word legs sits under them — and legs games are the whole body’s favorite kind.',
  say:'Legs! March, march! Can you hop on one leg?',
  try:'March around the room, then hop, then sit with your legs stretched out and touch your own knees and toes.',
  note:'Legs carry the whole class: walking to the park, kicking a ball, climbing the slide. Every step can carry the word too.',
  metaDescription:'Meet the legs body parts flashcard: two legs in purple shorts with the word legs, a march-and-hop game and parent prompts. Free to download and print.'
 },
 'see':{
  word:'See',
  cardTitle:'See Flashcard — the five senses card for Preschoolers',
  intro:'Your eyes see — and this card proves it: a butterfly has landed right where the eyes can find it. The word see is one of the five sense words, and it is probably the one your child uses most.',
  say:'See! Open your eyes wide. What do you see first?',
  try:'Play I spy with colors: “I see something red.” Little clues, big finds, and the word see gets said every round.',
  note:'Seeing is the sense that never switches off — which is why a quiet “what do you see?” works anywhere, from the car seat to the checkout line.',
  metaDescription:'Meet the see five senses flashcard: eyes with a butterfly nearby and the word see, an I-spy game and parent prompts. Free to download and print.'
 },
 'hear':{
  word:'Hear',
  cardTitle:'Hear Flashcard — the five senses card for Preschoolers',
  intro:'Your ears hear — and this card shows it with sound waves rippling right out of the picture. The word hear turns ordinary noises into a game.',
  say:'Hear! Ears open. What do you hear right now?',
  try:'Close your eyes for five quiet seconds and count the sounds: a car, a bird, the fridge humming. Every one gets the word hear.',
  note:'Hearing games shine in the in-between moments — waiting rooms, bath time, the walk to the park. Ears need no toys.',
  metaDescription:'Meet the hear five senses flashcard: an ear with sound waves and the word hear, a listen-and-count game and parent prompts. Free to download and print.'
 },
 'smell':{
  word:'Smell',
  cardTitle:'Smell Flashcard — the five senses card for Preschoolers',
  intro:'Your nose smells — and on this card it is sniffing a purple flower, the fanciest smell a three-year-old will meet before lunch. The word smell makes snorting acceptable.',
  say:'Smell! Sniff, sniff, ssss — can you smell the flower?',
  try:'Sniff a banana, a soap, a book page and the air outside. Rank them: which smell wins?',
  note:'Sniffing is a sense game that needs permission for nothing — every smell in the house is fair game.',
  metaDescription:'Meet the smell five senses flashcard: a nose sniffing a flower with the word smell, a sniff-ranking game and parent prompts. Free to download and print.'
 },
 'fingers':{
  word:'Fingers',
  cardTitle:'Fingers Flashcard — the wiggle card for Preschoolers',
  intro:'An open hand with all five fingers on display — the counting set your child was born with. The word fingers sits under them, ready for a wiggle and a count.',
  say:'Fingers! Wiggle, wiggle! Can you count them — one, two, three, four, five?',
  try:'Wiggle each finger in turn, then hide them in a fist and let one peek out — can your child guess which one?',
  note:'Fingers do the fine work: buttons, zips, page turns. Counting them is often a child’s very first counting.',
  metaDescription:'Meet the fingers body parts flashcard: an open hand with five fingers and the word fingers, a wiggle-and-count game and parent prompts. Free to download and print.'
 },
 'toes':{
  word:'Toes',
  cardTitle:'Toes Flashcard — the ten-piggy card for Preschoolers',
  intro:'Ten little toes in a row — five per foot, all of them ticklish. The word toes sits under them, and this little piggy is waiting for an audience.',
  say:'Toes! Wiggle your toes. Can you count all ten?',
  try:'This little piggy went to market, one toe at a time — then a tickle race up from the toes to the tummy.',
  note:'Sock time, shoe time and bath time all pass through the toes. Ten toes are also the friendliest way into counting.',
  metaDescription:'Meet the toes body parts flashcard: ten little toes with the word toes, a this-little-piggy game and parent prompts. Free to download and print.'
 },
 'skin':{
  word:'Skin',
  cardTitle:'Skin Flashcard — the five senses card for Preschoolers',
  intro:'Skin covers everything — arms, cheeks, the tip of the nose — and it is the touch sense itself. This card shows a close-up patch of skin with the word skin, the quietest of the five senses.',
  say:'Skin! It covers you everywhere. Touch your own arm — soft!',
  try:'Press a hand to your cheek, then to the floor. Warm and soft, cool and hard — your skin told you which was which.',
  note:'Skin reports soft, bumpy, warm, cool and ouch. It is the sense that keeps children safe — and the reason a hug feels like a hug.',
  metaDescription:'Meet the skin five senses flashcard: a close-up patch of skin with the word skin, a warm-and-cool touch game and parent prompts. Free to download and print.'
 },
 'tongue':{
  word:'Tongue',
  cardTitle:'Tongue Flashcard — the peek-out card for Preschoolers',
  intro:'The tongue is the silliest body part to show on purpose — which is exactly why children love it. The word tongue sits under an open mouth mid-peek, ready for copying.',
  say:'Tongue! Can you stick yours out? Now hide it back in!',
  try:'Tongue up, tongue out, tongue side to side — then lick your lips like you just ate something yummy.',
  note:'The tongue does two jobs at once: it tastes the food and it shapes the words. The same muscle says llama and lollipop.',
  metaDescription:'Meet the tongue body parts flashcard: an open mouth with the tongue out and the word tongue, a tongue-up-tongue-out game and parent prompts. Free to download and print.'
 },
 'touch':{
  word:'Touch',
  cardTitle:'Touch Flashcard — the five senses card for Preschoolers',
  intro:'Your skin touches — and on this card a hand is resting on something soft and blue, the very picture of gentle. The word touch is the sense of the hands, the cheeks and the toes.',
  say:'Touch! Reach out slowly — soft or bumpy?',
  try:'Touch three things in the room: something soft, something smooth, something bumpy. Say the word touch for each one.',
  note:'Gentle hands are a skill, not a rule — practicing touch on a teddy or a blanket teaches soft better than any reminder.',
  metaDescription:'Meet the touch five senses flashcard: a hand touching something soft with the word touch, a soft-smooth-bumpy game and parent prompts. Free to download and print.'
 },
 'taste':{
  word:'Taste',
  cardTitle:'Taste Flashcard — the five senses card for Preschoolers',
  intro:'Your tongue tastes — and on this card it is meeting a lollipop, the official taste-test of childhood. The word taste belongs to snack time, which is when this game plays best.',
  say:'Taste! Yum! Is it sweet, salty, sour or yummy-all-over?',
  try:'Taste a small bite of three things and give each one a word: sweet banana, salty cracker, sour apple.',
  note:'Tasting is the one sense with a rule: only food, and only when a grown-up says it is okay. The game stays safe because you hold the menu.',
  metaDescription:'Meet the taste five senses flashcard: a mouth tasting a lollipop with the word taste, a sweet-salty-sour game and parent prompts. Free to download and print.'
 },
 'hair':{
  word:'Hair',
  cardTitle:'Hair Flashcard — the brush-and-style card for Preschoolers',
  intro:'Dark hair, freshly drawn on a friendly head. The word hair sits above it — a body part your child meets every single morning with a brush.',
  say:'Hair! Pat, pat your hair. Is it soft?',
  try:'Brush a teddy’s hair, then your own. Pat it smooth, ruffle it wild — hair does both.',
  note:'Hair comes in every color and curl in your child’s classroom. Comparing hair — short, long, curly, straight — is a gentle first conversation about how everyone is different.',
  metaDescription:'Meet the hair body parts flashcard: a boy with dark hair and the word hair, a brush-and-pat game and parent prompts. Free to download and print.'
 },
 'chin':{
  word:'Chin',
  cardTitle:'Chin Flashcard — the think-about-it card for Preschoolers',
  intro:'The chin: small, hard to see without a mirror, and great for thinking poses. On this card a little arrow points right to it on a smiling boy — exactly where your child’s finger should go.',
  say:'Chin! Tuck your finger under your chin — there it is!',
  try:'Find your chin with one finger, then hold it like a thinker: hmmmm. Big thoughts need a chin.',
  note:'The chin is a tricky one — many children point to the neck first. The arrow on this card settles it every time.',
  metaDescription:'Meet the chin body parts flashcard: a boy\u2019s face with an arrow pointing to his chin and the word chin, a find-your-chin game and parent prompts. Free to download and print.'
 },
 'cheeks':{
  word:'Cheeks',
  cardTitle:'Cheeks Flashcard — the rosy-pat card for Preschoolers',
  intro:'Two rosy cheeks on a smiling face — the softest stopping point on the whole body. The word cheeks sits under them, and the game is a gentle pat-pat.',
  say:'Cheeks! Pat, pat — can you pat your cheeks like this?',
  try:'Puff your cheeks up like a balloon, then let the air out — pbbbbfft! Puffy cheeks get giggles every time.',
  note:'Cheeks are where grandmas kiss and where cold weather shows up pink. A soft cheek pat is also the calmest way to reset a wobbly moment.',
  metaDescription:'Meet the cheeks body parts flashcard: a smiling face with rosy cheeks and the word cheeks, a puff-up-balloon game and parent prompts. Free to download and print.'
 },
 'look':{
  word:'Look',
  cardTitle:'Look Flashcard — the senses-in-action card for Preschoolers',
  intro:'A boy bending down, eyes locked on a red ball — that is looking with your whole body. The word look is the doing-word for eyes, and this card is it in action.',
  say:'Look! Bend down slowly… what do you see?',
  try:'Play the looking game: look up, look down, look behind you, look very closely at one tiny thing. Freeze between each look.',
  note:'Looking closely is a real skill — scientists call it observing, three-year-olds call it staring at a ladybug for ten minutes. Both are correct.',
  metaDescription:'Meet the look five senses flashcard: a boy looking closely at a red ball with the word look, a look-up-look-down game and parent prompts. Free to download and print.'
 },
 'listen':{
  word:'Listen',
  cardTitle:'Listen Flashcard — the senses-in-action card for Preschoolers',
  intro:'A boy cupping his hand behind his ear, listening hard for something interesting. The word listen is the doing-word for ears — and the hand cup makes it official.',
  say:'Listen! Cup your ear like this… what do you hear?',
  try:'Whisper a secret word across the room. Then stomp once and freeze — listening bodies are still bodies.',
  note:'The cupped ear is a wonderful prop: it makes listening visible and turns waiting into a pose your child can hold.',
  metaDescription:'Meet the listen five senses flashcard: a boy cupping his ear to listen with the word listen, a whisper-secrets game and parent prompts. Free to download and print.'
 },
 'feel':{
  word:'Feel',
  cardTitle:'Feel Flashcard — the senses-in-action card for Preschoolers',
  intro:'A hand resting on something soft and white, feeling it carefully. The word feel is the doing-word for skin — and this card is a whole texture hunt in one picture.',
  say:'Feel! Touch it gently… is it soft, smooth or bumpy?',
  try:'Fill a corner of the room with three textures — a blanket, a spoon, a sponge. Close one hand’s eyes and feel each one.',
  note:'Feelings live here too: “I feel happy” and “I feel the soft blanket” share one word. Your child will use both for the rest of their life.',
  metaDescription:'Meet the feel five senses flashcard: a hand feeling something soft with the word feel, a texture-hunt game and parent prompts. Free to download and print.'
 }
};
