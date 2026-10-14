// Kiddo School — The Music Room (Class 23): the school's third room, beside
// the Library and the School Garden. One page holds the whole room: the
// instrument shelf, the words on the wall and the people who fill the room
// with sound — every tile links its own flashcard page in the Music Room set.
// The page body is built FROM the flashcard set (src/flashcards/index.mjs), so
// tiles, URLs and artwork can never drift from the library they come from.
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const tiles=cards=>cards.map(c=>`<a class="lp-tile" href="${c.url}"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong></a>`).join('');

export function musicRoomBody(set){
 const instruments=set.cards.filter(c=>c.file.startsWith('instrument-'));
 const words=set.cards.filter(c=>c.file.startsWith('word-'));
 const people=set.cards.filter(c=>c.file.startsWith('person-'));
 return `
 <section class="wrap fc-section"><span class="eyebrow">THE INSTRUMENT SHELF</span><h2>Thirty-three instruments, from accordion to xylophone.</h2><p class="fc-hint">Everything on the room\u2019s shelves, one card each: strings you bow, keys you press, drums you boom and the small ones you shake, click and squeeze. Tap any instrument to open its card — what it is, what it sounds like and how to play a home version tonight.</p><div class="lp-tiles">${tiles(instruments)}</div></section>
 <section class="wrap fc-section"><span class="eyebrow">THE WORDS ON THE WALL</span><h2>Thirteen music words, from beat to volume.</h2><p class="fc-hint">The words music uses every day — beat, tempo, melody, pitch, volume — each one on its own card with the meaning in child-size words, where to hear it and a game to play it. Learn the words and every song you meet gets easier to talk about.</p><div class="lp-tiles">${tiles(words)}</div></section>
 <section class="wrap fc-section"><span class="eyebrow">WHO\u2019S IN THE ROOM</span><h2>Seven ways people make music together.</h2><p class="fc-hint">The singer who goes first, the duet that shares, the band that divides, the chorus that joins in, the conductor who leads with a stick, the solo that takes the spotlight and the orchestra that is all of it at once — seven cards about making music with other people.</p><div class="lp-tiles">${tiles(people)}</div></section>
 <section class="wrap fc-section"><span class="eyebrow">PRINT &amp; PLAY</span><h2>Take the whole room home.</h2><p class="fc-hint">All fifty-three cards live in the <a href="${set.url}">Music Room flashcard set</a> — every card page has a download button with the full-size image. The room sits on the <a href="/learning-path/">Learning Path</a> as Class 23, and the instruments also browse from the shelves of the <a href="/learning-library/">School Library</a>.</p></section>`;
}
