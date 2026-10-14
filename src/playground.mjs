// Kiddo School — The Playground: the school's fourth room, beside the Library,
// the School Garden and the Music Room. One page holds the whole playground:
// the action words, the equipment on the ground and the manners that make play
// work together — every tile links its own flashcard page in the Playground
// set. The page body is built FROM the flashcard set (src/flashcards/index.mjs),
// so tiles, URLs and artwork can never drift from the library they come from.
// The Playground is a SCHOOL ROOM, not a class: it stays off the Learning Path
// (owner request) and lives here at /playground/ with the other rooms.
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const tiles=cards=>cards.map(c=>`<a class="lp-tile" href="${c.url}"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong></a>`).join('');

export function playgroundBody(set){
 const actions=set.cards.filter(c=>c.file.startsWith('action-'));
 const equipment=set.cards.filter(c=>c.file.startsWith('equipment-'));
 const manners=set.cards.filter(c=>c.file.startsWith('manner-'));
 return `
 <section class="wrap fc-section"><span class="eyebrow">THE ACTION WORDS</span><h2>Fifteen words our bodies do at the playground.</h2><p class="fc-hint">Balance on the bench edge, catch the big ball, dig to the middle of the earth, run everywhere: every action word gets its own card, and every card is a game the body already wants to play. Tap any word to open it — what it means, how the body does it and how to practise tonight.</p><div class="lp-tiles">${tiles(actions)}</div></section>
 <section class="wrap fc-section"><span class="eyebrow">ON THE GROUND</span><h2>Twelve things you meet at the playground.</h2><p class="fc-hint">The ball that never says no, the slide that waits at the top, the sandbox with a square of beach inside it: the playground\u2019s own furniture, one card each. Name the place before you go and the trip gets a whole vocabulary louder.</p><div class="lp-tiles">${tiles(equipment)}</div></section>
 <section class="wrap fc-section"><span class="eyebrow">HOW WE PLAY TOGETHER</span><h2>Five manners that make the playground kind.</h2><p class="fc-hint">Help, share, stop, take turns, wait — the five words that turn a playground full of wanters into a playground full of friends. Each card gives the word, the words to say and one way to practise it before you even get there.</p><div class="lp-tiles">${tiles(manners)}</div></section>
 <section class="wrap fc-section"><span class="eyebrow">PRINT &amp; PLAY</span><h2>Take the whole playground home.</h2><p class="fc-hint">All thirty-two cards live in the <a href="${set.url}">Playground flashcard set</a> — every card page has a download button with the full-size image. The Playground sits in <a href="/rooms/">School Rooms</a> beside the <a href="/learning-library/">Library</a>, the <a href="/toddler/2-years/school-garden/">School Garden</a> and the <a href="/music-room/">Music Room</a>.</p></section>`;
}
