// Kiddo School — School Rooms: the six places of the school on one shelf.
// The Library (the bookshelf), the School Garden (the outdoor class), the
// Playground (action words, equipment and manners), the Music Room
// (Class 23), the Art Room (art-activity cards, ages 2–5) and the Clubs
// (extra-curricular activity cards, ages 3–12). The ROOMS constant is the
// single source of truth: the /rooms/
// hub page and the homepage School Rooms section are both built from it, so
// names, covers, art and links can never drift between home and hub.
// Covers are each room's own live artwork (book cover, garden flashcard set
// cover, playground and music-room set covers) — nothing invented.
export const ROOMS=[
 {name:'School Library',href:'/learning-library/',cover:'https://assets.kiddo.school/books/age-2/bunny-finds-a-friend/cover.webp',w:2000,h:1545,
  alt:'Bunny Finds a Friend book cover: a smiling rabbit in a garden with a butterfly — the first book on the School Library shelf.',
  blurb:'The school bookshelf. Real picture books to read online — organized by age and category, every page turn on its own reader.',
  link:'Visit the School Library'},
 {name:'School Garden',href:'/toddler/2-years/school-garden/',cover:'https://assets.kiddo.school/flashcards/toddler-learning-cards/garden-bugs-and-friends-age-2/cover.webp',w:2000,h:1294,
  alt:'Cover of the Garden Bugs & Friends flashcard set: garden bugs and their friends, painted in bright playground colours.',
  blurb:'Real garden lessons and collections: bugs and insects, garden animals and friends, garden flowers, and the things you find outside.',
  link:'Visit the School Garden'},
 {name:'Playground',href:'/playground/',cover:'https://assets.kiddo.school/school/playground/flashcards/cover.webp',w:1728,h:2304,
  alt:'Cover of the Playground flashcards set: the words "Playground — Vocabulary Flashcards" over a play tower with a red roof and a red slide.',
  blurb:'Action words, playground equipment and the five manners that make play kind — thirty-two cards, from balance and swing to share and take turns.',
  link:'Visit the Playground'},
 {name:'Music Room',href:'/music-room/',cover:'https://assets.kiddo.school/school/music-room/flashcards/cover.webp',w:1414,h:2000,
  alt:'Cover of the Music Room flashcards set: the title "Music Words — Music, Rhythm & Instruments" over two smiling children singing into microphones.',
  blurb:'Instruments, music words and the people who make music — fifty-three cards to print, from accordion to xylophone, with the beat and volume words on the wall.',
  link:'Visit the Music Room'},
 {name:'Art Room',href:'/art-room/',cover:'https://assets.kiddo.school/school/art-room/cover.webp',w:800,h:1131,
  alt:'Cover of the Art Activity Flashcards set: the words "Art Activity Flashcards — Create, explore, and have fun" over a red paintbrush, a yellow paint palette, a blue pencil and a glue bottle.',
  blurb:'Twenty-seven art-activity cards for little hands: crayons, paint, clay and scissors — every card prints its own make-it activity, from draw a picture with shapes to cut out simple shapes.',
  link:'Visit the Art Room'},
 {name:'Clubs',href:'/clubs/',cover:'https://assets.kiddo.school/school/club/cover.webp',w:800,h:1131,
  alt:'Cover of the Extra-Curricular Activities flashcards set: the words "Extra-Curricular Activities" over five smiling children holding a guitar, a soccer ball, a paintbrush and a paint palette.',
  blurb:'Forty-five after-school clubs for ages 3–12: art, music and baking for the youngest members, then chess, coding and fencing for ages 6 and up — every card prints the two skills its club trains.',
  link:'Join the Clubs'},
 {name:'Cafeteria',href:'/cafeteria/',cover:'https://assets.kiddo.school/school/cafeteria/cover.webp',w:800,h:1132,
  alt:'Cover of the School Cafeteria Flashcards set: the words "School Cafeteria Flashcards" over a line-drawn lunch tray holding a milk carton, an apple, a sandwich and a fork.',
  blurb:'Sixty-two lunch-tray foods for ages 2–5: fruits, mains, breakfasts, drinks and snacks — every card prints its own pointing, counting or matching activity, and every food has a lesson and a printable twin.',
  link:'Visit the Cafeteria'}
];

const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* The homepage School Rooms section: seven covered cards plus the
   "Explore the School" button into the hub at /rooms/. */
export function homeRoomsSection(){
 return `<section class="section wrap" id="school-rooms"><div class="section-heading"><div><span class="eyebrow">SCHOOL ROOMS</span><h2>Walk around the school.</h2></div><a class="text-link" href="/rooms/">Explore the School <span aria-hidden="true">↗</span></a></div><p class="mw-lede">Seven rooms to wander into — a library to read in, a garden to grow in, a playground to run in, a music room to play in, an art room to make in, a clubs room to join and a cafeteria to taste.</p><div class="room-grid">${ROOMS.map(r=>`<a class="room-card" href="${r.href}"><span class="room-cover"><img src="${r.cover}" width="${r.w}" height="${r.h}" alt="${esc(r.alt)}" loading="lazy"></span><span class="room-body"><span class="explore-eyebrow">SCHOOL ROOM</span><h3>${esc(r.name)}</h3><p>${esc(r.blurb)}</p><span class="text-link">${esc(r.link)} <span aria-hidden="true">↗</span></span></span></a>`).join('')}</div><div class="hero-actions"><a class="button" href="/rooms/">Explore the School <span aria-hidden="true">↗</span></a></div></section>`;
}

/* The /rooms/ hub: the same seven rooms, room-sized. */
export function roomsHubBody(){
 return `<section class="wrap section compact"><div class="room-grid room-grid-hub">${ROOMS.map(r=>`<a class="room-card" href="${r.href}"><span class="room-cover"><img src="${r.cover}" width="${r.w}" height="${r.h}" alt="${esc(r.alt)}" loading="lazy"></span><span class="room-body"><span class="explore-eyebrow">SCHOOL ROOM</span><h2>${esc(r.name)}</h2><p>${esc(r.blurb)}</p><span class="text-link">${esc(r.link)} <span aria-hidden="true">↗</span></span></span></a>`).join('')}</div><p class="fc-hint">Every room\u2019s cards and pages live inside the rooms themselves — the classes and lessons keep their own shelves on the <a href="/learning-path/">Learning Path</a>, the printable card library sits at <a href="/flashcards/">Flashcards</a>, and the book reader lives in the <a href="/learning-library/">Library</a>.</p></section>`;
}
