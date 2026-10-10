// Kiddo School — baby stage flashcard sets, Classes 5–7.
// Explorer 1 (Animals & Everyday Objects), Explorer 2 (First Actions & Body
// Parts) and Toddler 1 (First Words: Food & Home). Every card points at the
// real R2 file in its lesson folder with real dimensions; the parent-facing
// words are written for each card. Nothing is invented.
const R2 = 'https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const B = R2 + 'flashcards/black-and-white-baby-cards/';

export const aeoMeta = {
  slug: 'animals-everyday-objects',
  group: 'baby',
  stageName: 'Explorer 1',
  stageHref: '/baby/6-9-months/',
  name: 'Animals & Everyday Objects',
  seoTitle: 'Animals & Everyday Objects Flashcards for Babies 6–9 Months',
  h1: 'Animals & Everyday Objects Flashcards',
  metaDescription: 'Free printable flashcards for babies 6–9 months: animals and everyday objects with sounds, pointing and naming games parents can lead in short happy sessions.',
  lede: 'Twelve cards for the Explorer 1 stage: six animals ready for sounds and six everyday things ready for pointing — your baby’s widening world, one card at a time.',
  hubBlurb: 'Animals with sounds and objects to point at, for 6–9 months.',
  ageLabel: '6–9 months',
  noun: 'Babies',
  useIdeas: [
    ['Animals make noise', 'For every animal card, add its sound. At this age the sound is the hook — your baby may laugh, copy or stare; all three are learning.'],
    ['Point, then wait', 'Tap the picture, say the word, then stay quiet. Pointing back at a card is a big 6–9-month milestone — give it room to happen.'],
    ['Real-world replays', 'Each card has a real twin somewhere: the dog on your street, the spoon in the drawer. Meeting the word twice is the lesson.'],
    ['Follow the stare', 'Whatever card your baby studies longest, do that one again tomorrow. Interest is the engine of the whole stage.']
  ],
  relatedSets: ['first-words-familiar-things', 'first-actions-body-parts'],
  coverFile: '01-cat.webp',
  coverAlt: 'The cat card fronting the Animals & Everyday Objects flashcards set for babies 6–9 months'
};

export const fabMeta = {
  slug: 'first-actions-body-parts',
  group: 'baby',
  stageName: 'Explorer 2',
  stageHref: '/baby/9-12-months/',
  name: 'First Actions & Body Parts',
  seoTitle: 'First Actions & Body Parts Flashcards for Babies 9–12 Months',
  h1: 'First Actions & Body Parts Flashcards',
  metaDescription: 'Free printable flashcards for babies 9–12 months: body parts and first actions — clapping, waving, eating, sleeping — with copy-me games parents can play right away.',
  lede: 'Twelve cards for the Explorer 2 stage: five body parts your baby owns and seven actions your baby can copy — the copy-me stage, made into a class.',
  hubBlurb: 'Body parts and copy-me actions, for 9–12 months.',
  ageLabel: '9–12 months',
  noun: 'Babies',
  useIdeas: [
    ['Copy me', 'This stage runs on imitation. Show the clapping card, then clap. Show the waving card, then wave. Your baby learns by doing it back.'],
    ['Name on the body', 'For every body-part card, touch that part on your baby gently — hands, nose, foot. The word lands where the part lives.'],
    ['Actions all day', 'Waving happens at goodbyes, clapping at fun moments. When the real action happens, name it once — that is the card coming to life.'],
    ['Celebrate every copy', 'A baby who claps back, even once, has done real work. Cheer warmly and let them lead the next round.']
  ],
  relatedSets: ['animals-everyday-objects', 'first-words-food-home'],
  coverFile: 'cover.webp',
  coverAlt: 'Cover of the First Actions & Body Parts flashcards set for babies 9–12 months, with an open hand card'
};

export const fwfhMeta = {
  slug: 'first-words-food-home',
  group: 'baby',
  stageName: 'Toddler 1',
  stageHref: '/toddler/12-18-months/',
  name: 'First Words: Food & Home',
  seoTitle: 'First Words: Food & Home Flashcards for Toddlers 12–18 Months',
  h1: 'First Words: Food & Home Flashcards',
  metaDescription: 'Free printable flashcards for toddlers 12–18 months: food and home words — apple, banana, bread, cup, spoon, shoe, sock, chair — with clear naming games for parents.',
  lede: 'Eleven cards for the Toddler 1 stage: the foods on the high-chair tray and the things in every room, named clearly so first words have somewhere to land.',
  hubBlurb: 'Food and home words for toddlers 12–18 months.',
  ageLabel: '12–18 months',
  noun: 'Toddlers',
  useIdeas: [
    ['Name it at the table', 'Food cards work best at real meals. Apple card at breakfast, banana card at snack — the word arrives with the taste.'],
    ['The pause is the point', 'Say the word, then wait three full seconds. First attempts sound like “ah!” and “mm!” — they count. Answer warmly.'],
    ['Two places per word', 'Show the shoe card in the morning, then name real shoes at the door. Words repeated in two places stick twice as well.'],
    ['Let the toddler win', 'Hand your toddler the card to hold, wave and crumple. A card that has been thoroughly loved is a card that has been learned.']
  ],
  relatedSets: ['first-actions-body-parts', 'first-concepts'],
  coverFile: 'cover.webp',
  coverAlt: 'Cover of the First Words: Food & Home flashcards set for toddlers 12–18 months, with a red apple card'
};

// ---- Animals & Everyday Objects (Explorer 1) ---------------------------------
export const aeoCardContent = {
  cat: {
    word: 'Cat',
    intro: 'A soft, watchy cat. Cats are a favourite first animal — small enough to feel safe, full of personality, and famous for a sound every baby can try.',
    say: 'Cat! A cat says meow.',
    try: 'Say meow softly and wait. If your baby makes any sound back, you have had your first animal conversation.',
    note: 'If a real cat is around, name it the same way. One word, many cats — that is how vocabulary grows.'
  },
  dog: {
    word: 'Dog',
    intro: 'A happy, tongue-out dog. Dogs bring their own sound and action — barking and tail-wagging are easy to act out, which makes this card a full mini-performance.',
    say: 'Dog! A dog says woof.',
    try: 'Do the woof, then pat your own head like floppy ears. Sound plus action gives the word two handles to hold.',
    note: 'Dogs vary — big, small, loud, quiet. Any friendly dog picture or real dog counts as a replay of this card.'
  },
  bird: {
    word: 'Bird',
    intro: 'A bright little bird. Birds move fast and catch the eye — naming them turns window-watching into a real language moment.',
    say: 'Bird! Tweet, tweet.',
    try: 'After the card, look outside together. One real bird, named once, beats ten rehearsals.',
    note: 'Bird is often among the first animal words babies understand — it comes with motion attached.'
  },
  fish: {
    word: 'Fish',
    intro: 'A round, friendly fish. Fish are calm and quiet — a nice change of pace in an animal set, and their gulping mouths are fun to imitate.',
    say: 'Fish! Glub glub.',
    try: 'Make fish faces and gentle gulping sounds. Babies at this stage watch your mouth as closely as the card.',
    note: 'If you have an aquarium or a fish picture anywhere, that is the real-world twin for this word.'
  },
  duck: {
    word: 'Duck',
    intro: 'A cheerful duck. With its sound, its waddle and its pond life, the duck is practically a ready-made baby game.',
    say: 'Duck! Quack, quack.',
    try: 'Quack twice and waddle your hand across the card. Physical comedy lands beautifully at this age.',
    note: 'Ducks appear in bath toys, books and parks — a word with many happy replays built in.'
  },
  cow: {
    word: 'Cow',
    intro: 'A big, gentle cow. Cow is a sound-and-size animal: huge, slow and famous for one long, easy-to-copy note.',
    say: 'Cow! Mooooo.',
    try: 'Hold the moo for as long as your baby stays interested. Long sounds are wonderfully funny at this age.',
    note: 'Animal-sound play is real phonological work — it trains the ears your baby will read with one day.'
  },
  ball: {
    word: 'Ball',
    intro: 'A bright, bouncy ball. The everyday half of the set begins: a thing your baby has probably already pushed, dropped and chased.',
    say: 'Ball! Roll the ball.',
    try: 'Roll a real ball slowly towards your baby and name it as it moves. Action words love moving objects.',
    note: 'Dropping things off the high chair is physics, not mischief — name the ball each time and the phase works for you.'
  },
  shoe: {
    word: 'Shoe',
    intro: 'A simple shoe. Shoes mark every outing, so this word comes with a built-in routine: shoes on, shoes off, all day long.',
    say: 'Shoe! Shoes on your feet.',
    try: 'At the next nappy change or doorway moment, touch a real shoe and say the word once.',
    note: 'Routine words are high-frequency words. Your baby will hear shoe dozens of times a week anyway.'
  },
  cup: {
    word: 'Cup',
    intro: 'An everyday cup, back from the earlier sets — familiarity is the point. Your baby now meets the same word in a new set, which is exactly how memory works.',
    say: 'Cup! Drink from the cup.',
    try: 'Let your baby hold their own cup during the card moment. Holding and naming go together now.',
    note: 'Repeated words across sets are not repetition waste — they are the spine of your baby’s first vocabulary.'
  },
  spoon: {
    word: 'Spoon',
    intro: 'A shiny spoon. Meals give this word a stage several times a day — no other card in the set gets so many live performances.',
    say: 'Spoon! Here is your spoon.',
    try: 'Hand over the spoon at mealtime and say the word as your baby takes it. The grab IS the understanding.',
    note: 'Follow your baby’s food journey with the words: spoon, cup, apple, banana — the set matches the menu.'
  },
  car: {
    word: 'Car',
    intro: 'A speedy little car. Cars whoosh past windows and parking lots all day — one of the most-repeated baby words in the world, and this card gives it a face.',
    say: 'Car! Vroom.',
    try: 'Slide the card through the air in a slow pass, then park it on your lap. Rides end; parking is a real concept.',
    note: 'Watch for your baby tracking real cars outside. That look is the card, alive.'
  },
  'teddy-bear': {
    word: 'Teddy bear',
    intro: 'A soft teddy bear closing the set. For many babies this word names an actual best friend — the strongest possible ending for the Explorer 1 stage.',
    say: 'Teddy bear! Hello, teddy.',
    try: 'Bring the real teddy to meet the card. From now on, teddy can be the one who “picks” which cards you do.',
    note: 'When a comfort object joins the routine, sessions often stretch happily longer. Follow that warmth.'
  }
};

// ---- First Actions & Body Parts (Explorer 2) ----------------------------------
export const fabCardContent = {
  hand: {
    word: 'Hand',
    intro: 'One open hand, drawn big and clear. Your baby owns two of these — which makes this the most interactive card in the set before you even start.',
    say: 'Hand! This is your hand.',
    try: 'Touch your baby’s palm gently, then press it lightly against the card. Hand on hand on card.',
    note: 'Body-part words work best on the body. The card introduces; your touch teaches.'
  },
  foot: {
    word: 'Foot',
    intro: 'A friendly bare foot. Feet are ticklish, useful and always nearby — a body-part word with built-in comedy.',
    say: 'Foot! One little foot.',
    try: 'Count toes after the word — one, two, three, all gone! Peak nose—or rather, peak toes.',
    note: 'A quick toe-tickle after naming makes the word memorable in the best possible way.'
  },
  eyes: {
    word: 'Eyes',
    intro: 'A pair of bright eyes. Your baby has been studying eyes since birth — this card simply names the thing they already love most.',
    say: 'Eyes! I see with my eyes.',
    try: 'Point to the card’s eyes, then to your eyes, then gently to your baby’s eyes. Three stops, one word.',
    note: 'Blink, wink and peek-a-boo all belong to this word — games keep it alive all day.'
  },
  nose: {
    word: 'Nose',
    intro: 'A small round nose. Noses are perfect for boops — this may become the silliest card in your week.',
    say: 'Nose! Boop your nose.',
    try: 'Boop the card, your own nose, then your baby’s nose. The giggle is the learning.',
    note: 'Little ritual games like the nose boop carry words better than any flashcard drill ever could.'
  },
  mouth: {
    word: 'Mouth',
    intro: 'A simple, friendly mouth. Eating, babbling, blowing raspberries — the mouth is your baby’s busiest place, and now it has a name.',
    say: 'Mouth! Your mouth says mamama.',
    try: 'Open and close your mouth slowly after naming it. Mouth-watching is a 9–12-month speciality.',
    note: 'This word quietly supports eating words later — mouth is where all that food goes.'
  },
  clapping: {
    word: 'Clapping',
    intro: 'Two hands meeting in a clap. Actions are new in this stage: the card shows the move, and your baby gets to perform it.',
    say: 'Clapping! Clap, clap, clap.',
    try: 'Clap slowly with your hands around your baby’s, then pause and wait. Many babies join in within days.',
    note: 'If your baby claps back, make a joyful fuss. Imitation at this age is a genuine milestone.'
  },
  waving: {
    word: 'Waving',
    intro: 'A hand waving hello or goodbye. Waving is social — the card connects directly to doorways, video calls and grandparents.',
    say: 'Waving! Wave bye-bye.',
    try: 'Wave at the card, then wave at something real — the window, a mirror, a leaving family member.',
    note: 'Waving often becomes a baby’s first gesture-on-request. Give it lots of happy uses.'
  },
  eating: {
    word: 'Eating',
    intro: 'A baby eating, spoon in hand. An action your baby performs three (or six) times a day, now with a word attached.',
    say: 'Eating! You are eating.',
    try: 'Say it at the next meal, mid-bite. Naming the moment while it happens is the strongest form of this card.',
    note: 'Action words (verbs) are rarer first words than names — but meal routines give them a real chance.'
  },
  drinking: {
    word: 'Drinking',
    intro: 'A baby drinking from a cup. Like eating, this happens on schedule all day — the card simply gives the routine a word.',
    say: 'Drinking! Sip, sip.',
    try: 'Name it as your baby drinks. Then name your own drink too — same word, bigger cup.',
    note: 'Pair it with the cup card across the week: the thing and the action, slowly separating in your baby’s mind.'
  },
  sleeping: {
    word: 'Sleeping',
    intro: 'A sleeping baby with closed eyes. The calmest card in the set — lovely just before naps, and a gentle first idea that actions end and begin.',
    say: 'Sleeping! Shhh, the baby is sleeping.',
    try: 'Add a soft shhh and lower your voice as you show it. Your baby will read the pace change instantly.',
    note: 'A quiet card before naps can become a lovely cue. Rituals like this make days easier, not just smarter.'
  },
  pointing: {
    word: 'Pointing',
    intro: 'A hand with one finger out, pointing. Pointing is about to become your baby’s superpower — the gesture that lets them ask without words.',
    say: 'Pointing! You point at things.',
    try: 'Point at the card, then at something across the room, saying its name. Your baby is learning that pointing = asking.',
    note: 'When your baby points, ALWAYS name what they point at. That answer is the whole game.'
  },
  smiling: {
    word: 'Smiling',
    intro: 'A big happy smile closing the set. A feeling and an action in one — and the perfect card to end on, because it is the one your baby can perform best.',
    say: 'Smiling! What a lovely smile.',
    try: 'Make the same smile back and hold it. Card, face, card, face — let your baby compare.',
    note: 'Ending card time with both of you smiling is not a gimmick. That warm ending is what makes tomorrow easy.'
  }
};

// ---- First Words: Food & Home (Toddler 1) -------------------------------------
export const fwfhCardContent = {
  apple: {
    word: 'Apple',
    intro: 'A red apple, leading the food cards. By 12–18 months many toddlers have held, gummed and thrown an apple — the word has a lot of history to attach to.',
    say: 'Apple. Can you say apple?',
    try: 'Offer a real apple slice as you name it. Taste plus word is the strongest pair there is.',
    note: 'Attempts like “ah-poo” deserve the same warm reply as the real word. Every try counts.'
  },
  banana: {
    word: 'Banana',
    intro: 'A yellow banana. Peelable, mashable and funny to say — banana often becomes a toddler favourite word purely on vibes.',
    say: 'Banana! A yellow banana.',
    try: 'Let your toddler hold the banana while you name it, then help peel. The peel is the ceremony.',
    note: 'Nana, nana, ba-na-na — whatever version your toddler lands on, answer as if they said it perfectly.'
  },
  orange: {
    word: 'Orange',
    intro: 'A bright orange. One word for the fruit and the colour — this card quietly teaches two ideas at once, the toddler way.',
    say: 'Orange! An orange, orange.',
    try: 'Say it while peeling a real orange — the smell is part of the lesson.',
    note: 'Colour and object sharing a name is confusing later and helpful now. Do not over-explain; just enjoy the word.'
  },
  'milk-cup': {
    word: 'Milk cup',
    intro: 'A cup of milk. For most toddlers this is the most meaningful object in the house — the card names the ritual.',
    say: 'Milk cup! Time for your milk.',
    try: 'Show the card right before a milk moment. The routine will teach this word almost by itself.',
    note: 'Two-part words like milk cup are real grammar seeds: your toddler is hearing how words combine.'
  },
  bread: {
    word: 'Bread',
    intro: 'A loaf of bread. Soft, warm at the right moments and present at nearly every meal — bread is a comfort word.',
    say: 'Bread! Soft bread.',
    try: 'Let your toddler touch real bread as you name it. Squish is data at this age.',
    note: 'Kitchen words grow fast because the kitchen is where toddlers already want to be.'
  },
  egg: {
    word: 'Egg',
    intro: 'A simple egg. Small, oval and everywhere at breakfast — a tidy little word with a clear shape.',
    say: 'Egg. One little egg.',
    try: 'Show the card at breakfast, then the real egg. Same word, same shape, twice.',
    note: 'Shape words like egg quietly prepare early sorting skills: round things, oval things, tray things.'
  },
  cup: {
    word: 'Cup',
    intro: 'The family cup, back again. Your toddler has met this word in earlier sets — now it stands with the food words, where it lives every day.',
    say: 'Cup. Drink from your cup.',
    try: 'Hand your toddler their cup and let them name it first if they can. Then confirm warmly.',
    note: 'A toddler who “reads” a card from memory is not cheating — that is exactly what reading is.'
  },
  spoon: {
    word: 'Spoon',
    intro: 'A trusty spoon. Another returning friend — spoon has been with your child since the first solids, and it is not going anywhere.',
    say: 'Spoon! Where is your spoon?',
    try: 'Ask the question and let your toddler look for it. Finding the real spoon after naming it is a complete game.',
    note: 'Where-is games turn vocabulary into little hunts — perfect for busy 12–18-month bodies.'
  },
  shoe: {
    word: 'Shoe',
    intro: 'A shoe, stepping over from the everyday set. Shoes mark transitions — outside, inside, off to the park — and toddlers feel those changes deeply.',
    say: 'Shoe! Shoes on.',
    try: 'Name each shoe as it goes on: one shoe, two shoes. Counting sneaks in through routine.',
    note: 'If your toddler repeats shoe at the door unprompted, celebrate loudly. That is spontaneous language.'
  },
  sock: {
    word: 'Sock',
    intro: 'A soft sock. Small, stretchy and often worn on hands as well as feet — sock is a word with texture in every sense.',
    say: 'Sock! A soft sock.',
    try: 'Peek-a-boo with a real sock over your hand, then onto the foot. Two games, one word.',
    note: 'Clothes words are daily words. Sock, shoe, coat — the dressing table is a classroom already.'
  },
  chair: {
    word: 'Chair',
    intro: 'A sturdy chair, closing the set. Your toddler’s throne at every meal — the biggest object in the set and a real milestone word: furniture!',
    say: 'Chair. Sit on your chair.',
    try: 'Name the chair as your toddler climbs up. Climbing plus naming sticks better than either alone.',
    note: 'With this card your toddler can name their food, their clothes and their seat — a genuine chunk of their world.'
  }
};
