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
 // Cafeteria (owner 2026-10-26): "If a page for the same word already exists
 // (banana, carrot, grapes, strawberry, apple), keep its URL and add a link
 // to the cafeteria version instead of creating a duplicate." These five
 // pages already carried a friend link (the letter-A lesson on apple, Look
 // & Learn on the other four), so each value carries BOTH links in one
 // fresh sentence — the older links must never be overwritten by the newer.
 'fruits-and-vegetables/apple':'This card names the fruit for naming. Learning letter sounds too? The <a href="/preschool/4-years/phonics-and-beginning-sounds/learn/a-apple/">letter A lesson</a> teaches the /a/ sound step by step — and at lunchtime the same apple has a <a href="/cafeteria/apple/">Cafeteria page</a> on a sixty-two-food tray.',
 'fruits-and-vegetables/banana':'This card names the fruit; over in <a href="/look-and-learn/">Look &amp; Learn</a> the same banana becomes a game — pretend to peel it, say the word — and at lunchtime it counts itself in the <a href="/cafeteria/banana/">Cafeteria room</a>: one banana, one finger, among sixty-two tray foods.',
 'fruits-and-vegetables/carrot':'Naming the carrot is this card\u2019s whole job; <a href="/look-and-learn/">Look &amp; Learn</a> adds the move — pretend to pull a carrot from the ground — and the <a href="/cafeteria/carrots/">Cafeteria room</a> counts it: three carrots and a rabbit crunch.',
 'fruits-and-vegetables/grapes':'This card is for naming the bunch; the <a href="/look-and-learn/">Look &amp; Learn class</a> plays the describing game instead, and the <a href="/cafeteria/grapes/">Cafeteria room</a> points at one grape inside the crowd and counts three into a cup.',
 'fruits-and-vegetables/strawberry':'Here the strawberry is for naming; in the <a href="/look-and-learn/">Look &amp; Learn deck</a> the same red strawberry asks for its colour and its shape, and the <a href="/cafeteria/strawberries/">Cafeteria room</a> shows off its outside seeds and counts to four.',
 'animals-and-sounds/duck':'The duck quacks here with its sound; over in <a href="/look-and-learn/">Look &amp; Learn</a> the same yellow duckling waddles — card 03 of a fifteen-card deck where every picture has its own move.'
};
