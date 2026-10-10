// Kiddo School — baby stage flashcard sets, Classes 2–4.
// Every card points at the real file in its lesson folder on R2 with its real
// dimensions; the parent-facing words are written for each card. These sets
// exist so every learning-path class (1–31) has its own flashcard set with
// individual card pages, downloads and sharing — the owner's instruction.
const R2 = 'https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const B = R2 + 'flashcards/black-and-white-baby-cards/';

export const fvMeta = {
  slug: 'faces-and-visual-tracking',
  group: 'baby',
  stageName: 'Newborn 2',
  stageHref: '/newborn/6-12-weeks/',
  name: 'Faces & Visual Tracking',
  seoTitle: 'Faces & Visual Tracking Flashcards for Babies 6–12 Weeks',
  h1: 'Faces & Visual Tracking Flashcards',
  metaDescription: 'Free printable flashcards for babies 6–12 weeks: high-contrast faces, patterns and first colour cards with simple tracking activities to try together. No sign-up.',
  lede: 'Twelve cards for the second newborn stage: friendly faces, bold patterns and the very first hints of red, made for slow, close, parent-led looking.',
  hubBlurb: 'Faces, patterns and first colour for 6–12 weeks — one calm card at a time.',
  ageLabel: '6–12 weeks',
  noun: 'Babies',
  useIdeas: [
    ['Slow is the whole trick', 'Move a card a few centimetres side to side and let your baby’s eyes follow. At this age slow movement is fascinating — quick movement is invisible.'],
    ['Faces first', 'Babies love faces more than anything. Start with the face cards and let your baby study them before trying the patterns.'],
    ['Name what they see', 'Say the word softly as your baby looks — eyes, stripes, wavy. The words matter less than your voice staying warm and close.'],
    ['Stop while it is fun', 'Two or three cards is a full session at this age. Ending while your baby is still interested makes tomorrow’s session easy.']
  ],
  relatedSets: ['high-contrast-baby-cards', 'colors-and-first-objects'],
  coverFile: 'cover.webp',
  coverAlt: 'Cover of the Faces & Visual Tracking flashcards set for babies 6–12 weeks, with a bold spiral pattern card'
};

export const cfoMeta = {
  slug: 'colors-and-first-objects',
  group: 'baby',
  stageName: 'Infant 1',
  stageHref: '/baby/3-4-months/',
  name: 'Colors & First Objects',
  seoTitle: 'Colors & First Objects Flashcards for Babies 3–4 Months',
  h1: 'Colors & First Objects Flashcards',
  metaDescription: 'Free printable flashcards for babies 3–4 months: bold red, yellow and blue cards plus familiar first objects like a ball, cup and apple. Print and play at home.',
  lede: 'Twelve cards for the Infant 1 stage: three strong colours, everyday objects your baby already sees every day, and a gentle first teddy bear.',
  hubBlurb: 'Bold colours and familiar first objects for 3–4 months.',
  ageLabel: '3–4 months',
  noun: 'Babies',
  useIdeas: [
    ['One colour at a time', 'Show the red circle today, the yellow circle tomorrow. Babies learn colours by repetition, not by sorting through all three at once.'],
    ['Pair card with real thing', 'Show the cup card, then a real cup. The jump from picture to world is the lesson — and it takes ten seconds.'],
    ['Let them reach', 'Around this age babies reach for what interests them. Hold the card within gentle swiping distance and celebrate every bat.'],
    ['Say it, pause, wait', 'Name the card clearly, then stay quiet for a moment. Whatever comes back — a coo, a kick, a stare — is your baby’s turn.']
  ],
  relatedSets: ['faces-and-visual-tracking', 'first-words-familiar-things'],
  coverFile: 'cover.webp',
  coverAlt: 'Cover of the Colors & First Objects flashcards set for babies 3–4 months, with bold red, yellow and blue circles'
};

export const fwftMeta = {
  slug: 'first-words-familiar-things',
  group: 'baby',
  stageName: 'Infant 2',
  stageHref: '/baby/4-6-months/',
  name: 'First Words & Familiar Things',
  seoTitle: 'First Words & Familiar Things Flashcards for Babies 4–6 Months',
  h1: 'First Words & Familiar Things Flashcards',
  metaDescription: 'Free printable flashcards for babies 4–6 months: familiar first words — ball, cup, apple, cat, dog, car — with clear pictures and simple naming games for parents.',
  lede: 'Eleven cards for the Infant 2 stage: the things your baby already sees every single day, drawn clearly and named simply — the perfect first vocabulary.',
  hubBlurb: 'The everyday things babies already know, from 4–6 months.',
  ageLabel: '4–6 months',
  noun: 'Babies',
  useIdeas: [
    ['The daily things win', 'Babies’ first words are overwhelmingly the things they see most. Ball, cup, spoon, cat — these cards match your baby’s actual world.'],
    ['Same word, two places', 'Show the apple card, then an apple at lunch. Hearing the same word in two places teaches your baby that words belong to things everywhere.'],
    ['Follow the grab', 'If your baby grabs for a card, let them hold it (with you). crinkling, waving and mouthing the corner is real learning.'],
    ['Short and daily', 'Three cards after a nappy change beats twenty cards on Sunday. Little and often is exactly right at this stage.']
  ],
  relatedSets: ['colors-and-first-objects', 'animals-everyday-objects'],
  coverFile: 'cover.webp',
  coverAlt: 'Cover of the First Words & Familiar Things flashcards set for babies 4–6 months, with a bright ball card'
};

// ---- Faces & Visual Tracking (Newborn 2) ------------------------------------
export const fvCardContent = {
  eyes: {
    word: 'Eyes',
    intro: 'Two big friendly eyes, drawn in bold black and white. Faces are the first thing babies love to look at, and eyes are the part they study longest — this card gives your baby exactly that, up close.',
    say: 'Eyes! I see your eyes.',
    try: 'Hold the card close, then move your own face into your baby’s view and blink slowly. Card eyes, then your eyes — your baby will compare them both.',
    note: 'Eye contact is early conversation. If your baby holds your gaze, that is a full class already.'
  },
  'happy-face': {
    word: 'Happy face',
    intro: 'A big bold smiley face in high contrast. At 6–12 weeks many babies give their first real social smiles, and a clear happy face like this one often brings one out.',
    say: 'A happy face! Just like you.',
    try: 'Show the card, then copy the smile yourself and hold it. Let your baby look from the card to you and back again.',
    note: 'First smiles are gold — but a baby who only stares is working just as hard. Both count.'
  },
  'different-face': {
    word: 'Different face',
    intro: 'A second face with a different expression, so your baby can compare two faces side by side over the week. Noticing “same” and “different” is very early thinking, built one card at a time.',
    say: 'A different face! Hello again.',
    try: 'Show this card and the happy face card one after the other and watch which one holds your baby’s attention longer.',
    note: 'Babies often prefer one face over the other — a real preference is a real sign of looking.'
  },
  'face-pattern': {
    word: 'Face pattern',
    intro: 'A patterned face where the features are made of bold shapes. It is half face, half pattern — exactly the kind of image that keeps a 6–12-week baby fascinated.',
    say: 'Look — a pattern face!',
    try: 'Trace the patterns with your finger, slowly, while your baby watches. Your finger leads their eyes.',
    note: 'Do not worry about naming every shape. “Look at all these patterns” is plenty of words for one card.'
  },
  'concentric-circles': {
    word: 'Concentric circles',
    intro: 'Circles inside circles inside circles, in bold black and white. The gentle rings pull your baby’s eyes inward — lovely, calm tracking practice.',
    say: 'Circles, inside circles, inside circles!',
    try: 'Move the card slowly closer and further away. The rings seem to grow and shrink — babies find this quietly amazing.',
    note: 'Some babies go very still while watching this card. Stillness is deep concentration, not boredom.'
  },
  'wavy-lines': {
    word: 'Wavy lines',
    intro: 'Bold wavy lines rolling across the card. Waves are one of the easiest patterns for young eyes to follow, and they whisper an early idea: things can move smoothly, up and down.',
    say: 'Wavy lines — up, down, up, down.',
    try: 'Run your finger along a wave from left to right, then sway the card gently like a boat.',
    note: 'Your finger is the best teacher on this card. Follow one wave at a time; no need to do them all.'
  },
  zigzag: {
    word: 'Zigzag',
    intro: 'A bold zigzag with sharp corners and clear direction changes. After smooth waves, corners are new: your baby’s eyes get a tiny surprise at every turn.',
    say: 'Zigzag! Pointy, pointy zigzag.',
    try: 'Trace the zigzag with your finger and make a small “tick, tock” turn of your voice at every corner.',
    note: 'If your baby loses interest quickly here, that is normal — zigzags are busier than waves. Come back another day.'
  },
  'large-dots': {
    word: 'Large dots',
    intro: 'Big bold dots in a simple arrangement. Dots are friendly: no corners, no direction, just clear round shapes a young baby can rest their eyes on.',
    say: 'Dots! Big, round dots.',
    try: 'Touch each dot with your fingertip as you count them aloud — your baby will not count yet, but the rhythm is lovely.',
    note: 'Counting aloud now is planting a seed. The words matter less than the calm, silly music of your voice.'
  },
  'curved-path': {
    word: 'Curved path',
    intro: 'One long curved path sweeping across the card. Following a single line from one end to the other is real eye work — and the start of how reading will one day feel.',
    say: 'A long, curvy path.',
    try: 'Place your finger at the start of the path and travel it slowly to the end. Then let your baby “arrive” — a little cheer at the end is perfect.',
    note: 'Going slow matters more than finishing. Stopping halfway is still a complete look.'
  },
  'red-circle': {
    word: 'Red circle',
    intro: 'The first colour card of the set: one big red circle. Red is the colour young babies notice first, which makes this the gentlest possible bridge from black and white into colour.',
    say: 'Red! A big red circle.',
    try: 'Hold the red circle beside a black and white card and watch whether your baby’s eyes travel to the red. Many do.',
    note: 'Do not worry if red does not seem exciting yet. Colour vision grows at its own pace — the bold shape alone is worth the look.'
  },
  'red-and-black': {
    word: 'Red and black',
    intro: 'A card that pairs strong red with bold black, joining the two worlds your baby now sees. The familiar contrast is still there — with one big new colour folded in.',
    say: 'Red and black together!',
    try: 'Name the red parts, then the black parts, touching each as you go. Your finger sorts the card for your baby.',
    note: 'Mixed cards like this one are stepping stones. There is nothing to quiz — just look and name.'
  },
  'red-face-detail': {
    word: 'Red face detail',
    intro: 'A face with a bold red detail, bringing the set full circle: faces, patterns and colour in one last card. A friendly finish for the Newborn 2 stage.',
    say: 'A face with red! Look at that.',
    try: 'Name the face parts first, then the red detail last — ending on the newest thing gives it the best chance to be noticed.',
    note: 'This is a good card to finish a session on. When your baby looks away, the class is complete — no matter how long it took.'
  }
};

// ---- Colors & First Objects (Infant 1) --------------------------------------
export const cfoCardContent = {
  'red-circle': {
    word: 'Red circle',
    intro: 'One big bold red circle. Red reaches young eyes first, so this is the strongest colour card in the set — a lovely very-first colour lesson.',
    say: 'Red! A big red circle.',
    try: 'Find one red thing near you — a jumper, a toy, a book — and show it right after the card. Same word, two sizes.',
    note: 'One colour per day is plenty. Tomorrow can be yellow’s day.'
  },
  'yellow-circle': {
    word: 'Yellow circle',
    intro: 'The same friendly circle in bright yellow. Repeating the shape while changing the colour quietly teaches your baby what the word colour even means.',
    say: 'Yellow! A big yellow circle.',
    try: 'Hold the red circle card and this one side by side and say “red… yellow” as your baby looks between them.',
    note: 'If your baby seems to prefer one colour, follow that. Preference is attention, and attention is the lesson.'
  },
  'blue-circle': {
    word: 'Blue circle',
    intro: 'Three colours now: red, yellow and blue. Blue completes the classic bold trio that baby classes have used for generations.',
    say: 'Blue! A big blue circle.',
    try: 'Line up all three circle cards like traffic lights and name each colour as your baby’s eyes move along.',
    note: 'Do not expect your baby to match or name colours — that comes much later. Seeing and hearing is the whole class.'
  },
  'three-colors': {
    word: 'Three colors',
    intro: 'All three colours together on one bold card. A little celebration of the set: red, yellow and blue sharing the page.',
    say: 'Red, yellow, blue — three colours!',
    try: 'Point at each colour slowly, one per breath. Three colours, three slow breaths — a lovely wind-down card.',
    note: 'This is a good “review” card for the end of the week, not a first card of the day.'
  },
  ball: {
    word: 'Ball',
    intro: 'A bright, friendly ball. Most babies’ first favourite toy is a ball, which makes this card an instant connection to play your baby already knows.',
    say: 'Ball! Round and bouncy, ball.',
    try: 'Show the card, then roll a real ball gently near your baby. The card names it; the world shows it.',
    note: 'Reaching and batting at the card is great progress. An adult always holds the card.'
  },
  cup: {
    word: 'Cup',
    intro: 'A simple, everyday cup. Your baby sees cups at every feed, so this card connects straight to a thing they already know deeply.',
    say: 'Cup. You drink from a cup.',
    try: 'After the card, let your baby see your cup at mealtime and say cup again. Ten quiet seconds, every day if you like.',
    note: 'Everyday-object cards may feel plain, but familiarity is exactly what makes them work.'
  },
  spoon: {
    word: 'Spoon',
    intro: 'A bold, shiny-friendly spoon. Like the cup, it belongs to your baby’s daily rhythm — meals are full of chances to meet this word again.',
    say: 'Spoon. Here comes the spoon.',
    try: 'At the next meal, hold up the real spoon and say spoon with a smile. Watch for the flicker of recognition.',
    note: 'The magic of these cards is repetition in different places. Nothing else is required.'
  },
  apple: {
    word: 'Apple',
    intro: 'A bright round apple. It is a colour, a shape and a snack all at once — one of the richest first pictures you can show a small baby.',
    say: 'Apple! A shiny red apple.',
    try: 'Hold a real apple next to the card. Let your baby see the same shape twice — big and small.',
    note: 'Do not rush to taste-testing — that is a game for when your baby is eating solids.'
  },
  sun: {
    word: 'Sun',
    intro: 'A warm, smiling sun. The sun is possibly the first “thing” your baby ever notices out a window — this card makes it nameable.',
    say: 'Sun! Hello, sunshine.',
    try: 'On a bright day, carry this card to the window and look out together. Say sun once, softly.',
    note: 'Never look directly at the real sun — the card is for naming, the window is for light.'
  },
  'ball-and-cup': {
    word: 'Ball and cup',
    intro: 'Two familiar friends together on one card. When your baby knows each thing alone, putting two on one page is a gentle next step — and early “more than one” thinking.',
    say: 'A ball and a cup! Two things.',
    try: 'Name the ball, pause, then name the cup. Two names, one card — let your baby’s eyes do the walking.',
    note: 'Two-item cards are plenty at this age. More than that can wait for toddlerhood.'
  },
  'teddy-bear': {
    word: 'Teddy bear',
    intro: 'A soft, friendly teddy bear. For many babies this card points at an actual friend sitting on the shelf — which makes it the warmest card in the set.',
    say: 'Teddy bear! Where is your teddy?',
    try: 'Show the card, then bring the real teddy over for a hello. Card teddy, real teddy, your happy voice.',
    note: 'If teddy joins card time from now on, wonderful — routines with a comfort object are lovely at this age.'
  },
  'simple-face': {
    word: 'Simple face',
    intro: 'One clear, friendly face to close the set. Faces never stop being interesting to babies — and this one ties the whole set back to what your baby loves most: you.',
    say: 'A face! Just like the people you love.',
    try: 'Show the card, then bring your own face close and smile. The card is the rehearsal; you are the show.',
    note: 'Finishing the set is not the end — babies love repetition. Start again tomorrow; it is a new class every time.'
  }
};

// ---- First Words & Familiar Things (Infant 2) --------------------------------
export const fwftCardContent = {
  ball: {
    word: 'Ball',
    intro: 'A bright, round ball, the first card of the Infant 2 set. Balls are usually a baby’s first favourite toy, so this word often lands faster than any other.',
    say: 'Ball! Can you say ball?',
    try: 'Roll a real ball to your baby after the card. Play first, word second — the word sticks to the fun.',
    note: 'At 4–6 months the goal is hearing the word warmly, not repeating it. Replies come months later, on their own.'
  },
  cup: {
    word: 'Cup',
    intro: 'A clear everyday cup. Your baby sees this object many times a day, which makes cup one of the highest-value first words in any language.',
    say: 'Cup. Your cup.',
    try: 'Name your baby’s own cup at mealtime with the same warm voice you used for the card.',
    note: 'Same word, same tone, different moments — that is how words attach to things.'
  },
  spoon: {
    word: 'Spoon',
    intro: 'A friendly spoon. Mealtime is a natural classroom, and this card gives the word spoon a clear, calm face before the real thing arrives.',
    say: 'Spoon! Time to eat with the spoon.',
    try: 'Let the card sit on the table (out of grab range) during a meal and point at it once, casually.',
    note: 'Cards do not need to be a sit-down event. Ambient little meetings are perfectly real classes.'
  },
  bottle: {
    word: 'Bottle',
    intro: 'A baby bottle, drawn simply and clearly. For bottle-fed babies this may be the most meaningful card in the whole set — the thing they see more than anything.',
    say: 'Bottle! It is bottle time.',
    try: 'Show the card just before a feed and say bottle softly. The routine does the teaching for you.',
    note: 'Words tied to comfort and food are powerful first words. This one is doing quiet, deep work.'
  },
  apple: {
    word: 'Apple',
    intro: 'A shiny apple. Round, red and familiar from your kitchen — a first-words classic that pairs picture, colour and snack in one card.',
    say: 'Apple. A big red apple.',
    try: 'Hold a real apple beside the card and let your baby look between the two. Same word, two sizes.',
    note: 'Your baby cannot eat this yet — but they can absolutely learn its name.'
  },
  banana: {
    word: 'Banana',
    intro: 'A cheerful banana. A funny word, a funny shape and a smell your baby will know from the high chair — banana is a first word with personality.',
    say: 'Banana! A yellow banana.',
    try: 'Peel a banana slowly while saying the word. The peel is half the show at this age.',
    note: 'Silly words your grown-ups enjoy saying tend to get repeated more — and repetition is everything.'
  },
  cat: {
    word: 'Cat',
    intro: 'A friendly cat. Whether or not a cat lives at your house, cats fill books, streets and screens — a genuinely useful early word.',
    say: 'Cat! A cat says meow.',
    try: 'Add the meow. Sound effects double the fun and give the word a hook in your baby’s memory.',
    note: 'If a real cat walks by later and your baby stares, say the word once more. Real-life replay, done.'
  },
  dog: {
    word: 'Dog',
    intro: 'A happy dog with a wagging tail. Dogs are loud, lovely and everywhere — and this card comes with a sound and an action built in.',
    say: 'Dog! A dog says woof.',
    try: 'Do your best woof and wait. Any reaction — a startle, a grin, a kick — is your baby joining in.',
    note: 'Words with sounds attached are easier to remember. Woof is doing real teaching work here.'
  },
  bird: {
    word: 'Bird',
    intro: 'A small friendly bird. Birds are one of the first moving things babies notice outdoors — this card gives that fascination a name.',
    say: 'Bird! A bird goes flap, flap.',
    try: 'After the card, look out of the window together and wait. Even one bird earns the word again.',
    note: 'Naming things your baby has actually seen is the shortest path into language.'
  },
  car: {
    word: 'Car',
    intro: 'A bright, simple car. Cars rush past the window all day long — for many babies this becomes one of the most-repeated words in the house.',
    say: 'Car! Vroom, vroom.',
    try: 'Slide the card slowly across the air like a passing car, then say vroom. Movement plus sound equals attention.',
    note: 'Watch which cards your baby tracks longest — that is your baby telling you their interests.'
  },
  'teddy-bear': {
    word: 'Teddy bear',
    intro: 'A soft teddy bear, the last card of the set. It points straight at a friend your baby may already hug every night — the cosiest word in the set.',
    say: 'Teddy bear! Where is teddy?',
    try: 'Bring the real teddy to say hello to the card teddy. Then let teddy “watch” the rest of card time.',
    note: 'Ending with a comfort object makes card time feel safe. That feeling is what brings you both back tomorrow.'
  }
};
