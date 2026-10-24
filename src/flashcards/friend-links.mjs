// Same word, two homes — the owner-pinned cross-links (audit 2026-10-15).
//
// A few words live in TWO sets on purpose: apple is a Class 28 phonics
// letter-sound card AND a Fruits & Vegetables vocabulary card. The owner's
// rule: the two pages clearly interlink in BOTH directions, yet never share
// body copy — each page keeps its own job and states why the other exists.
//
// LESSON_FRIEND_LINKS — rendered on the /learn/ lesson page, pointing at the
//   other set's card page. Key: lesson set slug + '/' + card slug.
// CARD_FRIEND_LINKS — rendered on the library card page, pointing at the
//   other set's lesson. Key: card set slug + '/' + card slug.
//
// Values are finished HTML, one sentence each, written fresh for its own
// direction — never copied from the lesson, the card, or each other. New
// pairs: add both directions here, then extend the rule-2 allowance in
// tests/page-types.test.mjs (it imports LESSON_FRIEND_LINKS directly, so no
// test edit is needed — only a rebuild).
export const LESSON_FRIEND_LINKS={
 'phonics-and-beginning-sounds/a-apple':'And when the lesson turns into snack time, the fruit itself has a card too: the <a href="/flashcards/fruits-and-vegetables/apple/">Apple flashcard in Fruits &amp; Vegetables</a> — that one is for naming the fruit, this lesson is for the letter A.'
};
export const CARD_FRIEND_LINKS={
 'fruits-and-vegetables/apple':'This card names the fruit. Learning letter sounds too? The <a href="/preschool/4-years/phonics-and-beginning-sounds/learn/a-apple/">letter A lesson</a> teaches the /a/ sound step by step — that one is for reading, this one is for naming.',
 // Look & Learn (owner 2026-10-24): "If a word page already exists (duck,
 // banana, carrot, grapes, strawberry), keep its URL and add the link only."
 // Five owner-pinned one-way links to the extra class — each sentence fresh,
 // each naming what THIS page does versus what the deck does.
 'fruits-and-vegetables/banana':'This card names the fruit; over in <a href="/look-and-learn/">Look &amp; Learn</a> the same banana becomes a game — pretend to peel it, say the word — on card 02 of a fifteen-card look-and-say deck.',
 'fruits-and-vegetables/carrot':'Naming the carrot is this card\u2019s whole job; <a href="/look-and-learn/">Look &amp; Learn</a> adds the move — pretend to pull a carrot from the ground — among fifteen picture cards for toddlers and preschoolers.',
 'fruits-and-vegetables/grapes':'This card is for naming the bunch; the <a href="/look-and-learn/">Look &amp; Learn class</a> plays the describing game instead — look closely at the grapes on card 12 and say their shape out loud.',
 'fruits-and-vegetables/strawberry':'Here the strawberry is for naming; in the <a href="/look-and-learn/">Look &amp; Learn deck</a> the same red strawberry asks for its colour and its shape — one of fifteen cards, four words each.',
 'animals-and-sounds/duck':'The duck quacks here with its sound; over in <a href="/look-and-learn/">Look &amp; Learn</a> the same yellow duckling waddles — card 03 of a fifteen-card deck where every picture has its own move.'
};
