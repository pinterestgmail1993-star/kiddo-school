// Kiddo School — EXTRA CLASS · Manners: ONE page at /manners/ (owner brief
// 2026-10-27, restated as a standing rule the same day: "no individual pages —
// talk everything on that specific page with the image"). So this module builds
// exactly one URL: the class page. Cover first (owner rule), then all 32 cards
// in file order — the artwork, the manner's practice tip, and a Download +
// Print control under every image. Print prints JUST that card (per-card
// isolation via assets/manners.js + @media print rules in style.css); download
// serves the full-size webp. No Greetings cards here: that deck is the owner's
// separate product and, per the owner (2026-10-27: "forget etsy — there is no
// link between etsy and website"), the site never mentions it — no Etsy link,
// no Etsy note anywhere. The 33 files were probed live on R2 at
// school/extra-classes/manners/flashcards/ (33/33 HTTP 200 image/webp, every
// card 800×1131 portrait — no landscape handling needed). Owner cross-links:
// Class 32 "Practice good manners", Class 38 "Kind actions: manners", the
// Cafeteria room (table-manner cards) and the Playground room (its five
// manners cards) point here, and this page links back to all four. Owner
// doctrine: the class page speaks teacher-to-parent — lesson voice and library
// usefulness on the same page, no per-card URLs anywhere.
import {R2} from './adventure-kit.mjs';

export const MN_PATH='/manners/';
export const MAN_BASE=R2+'school/extra-classes/manners/flashcards/';

/* File order, exactly as the owner uploaded them. */
export const MAN_ORDER=[
 'ask-first','be-honest','be-kind','be-patient','cheer-for-others','chew-quietly',
 'clean-up','cover-your-sneeze','do-not-interrupt','gentle-hands','give-a-seat',
 'help-others','hold-the-door','keep-hands-to-yourself','knock-first',
 'let-others-go-first','offer-to-share','pay-attention','push-in-your-chair',
 'put-things-back','quiet-voice','raise-your-hand','respect-personal-space',
 'return-what-you-borrow','sit-nicely','stand-in-line','take-turns','use-the-bin',
 'use-two-hands','wait-your-turn','walk-quietly','wipe-the-table'];

const W=800,H=1131;
/* slug → display word, alt (from the artwork on labeled contact sheets,
   scripts/probe-manners.py) and the practice tip — the teacher-to-parent line
   that gives this single page its value. Every tip is one concrete way to run
   the manner tonight; no two tips share a sentence. */
const CARDS=[
 ['ask-first','Ask First','A Kiddo School manners flashcard titled Ask First: a boy in an orange shirt raises his hand high, the other hand on his chest, ready to ask.','Practise the words together — \u201cMay I\u2026?\u201d Ask-first covers toys, snacks and hugs, and it sticks fastest when your child hears you ask before taking something of theirs.'],
 ['be-honest','Be Honest','A Kiddo School manners flashcard titled Be Honest: a boy in a yellow shirt holds up a plain white flag and winks with a playful grin.','When your child tells the truth about a spilled cup or a broken crayon, thank them for the honesty before fixing the mess. Truth needs to land softer than trouble.'],
 ['be-kind','Be Kind','A Kiddo School manners flashcard titled Be Kind: a boy in an orange shirt opens both arms wide with a big welcoming smile.','Kindness is catchable: say one kind thing at dinner and let everyone around the table add theirs. Small hands learn kind words by hearing yours first.'],
 ['be-patient','Be Patient','A Kiddo School manners flashcard titled Be Patient: a boy stands calmly with his eyes closed and his hands clasped in front of him.','Waiting is a muscle. Try thirty seconds of grown-up wait before snack time, then stretch it a little each week and celebrate the quiet out loud.'],
 ['cheer-for-others','Cheer for Others','A Kiddo School manners flashcard titled Cheer for Others: a boy leans forward clapping with a huge smile, cheering for a friend.','Practise on family game night: whoever loses gets the loudest cheer. Clapping for a sibling\u2019s tower is kindness in training.'],
 ['chew-quietly','Chew Quietly','A Kiddo School manners flashcard titled Chew Quietly: a boy closes his lips over puffed cheeks and chews without a sound.','Make it a game: bite, close, chew, swallow — can anyone hear you? Lips together is the whole trick, and dinner stays polite.'],
 ['clean-up','Clean Up','A Kiddo School manners flashcard titled Clean Up: a boy sweeps beside a toy box with purple toys spilling out around him.','One song\u2019s length is all it takes. Give every toy a home, race the tune, and the room resets without a single nag.'],
 ['cover-your-sneeze','Cover Your Sneeze','A Kiddo School manners flashcard titled Cover Your Sneeze: a boy sneezes into his bent elbow, eyes wide, keeping the germs to himself.','Elbow, not hand. Practise the vampire cough — arm up over the face — and your child guards the whole classroom from germs.'],
 ['do-not-interrupt','Do Not Interrupt','A Kiddo School manners flashcard titled Do Not Interrupt: a boy cups one hand by his ear and waits quietly, a finger resting on his chin.','Teach the quiet hand: a gentle touch on your arm means \u201cI\u2019m waiting.\u201d Answer it quickly at first and stretch the wait slowly — interrupting fades on its own.'],
 ['gentle-hands','Gentle Hands','A Kiddo School manners flashcard titled Gentle Hands: a boy cradles a small pink bunny carefully with both hands.','Let your child practise on a pet, a doll or a younger cousin: slow hands, soft touch. Stroke the bunny, don\u2019t squeeze it.'],
 ['give-a-seat','Give a Seat','A Kiddo School manners flashcard titled Give a Seat: a boy gestures toward a purple chair, offering it politely.','On the bus or at the table, offer seats to grandparents first. A child who gives a seat once starts offering it everywhere.'],
 ['help-others','Help Others','A Kiddo School manners flashcard titled Help Others: a boy carries a big cardboard box high over his head to lend a hand.','Ask for real help a small child can give: carry the light bag, fetch the spoon. Being useful is the door to being helpful.'],
 ['hold-the-door','Hold the Door','A Kiddo School manners flashcard titled Hold the Door: a boy winks and stretches his arm wide, holding the door open for the next person.','The next in line gets a held door and a smile. It costs three seconds, and it is the manner strangers notice most.'],
 ['keep-hands-to-yourself','Keep Hands to Yourself','A Kiddo School manners flashcard titled Keep Hands to Yourself: a boy stands tall with his hands tucked behind his back.','Hands have jobs: pockets, laps, behind the back. Practise the hands-in-hiding walk down a crowded shop aisle.'],
 ['knock-first','Knock First','A Kiddo School manners flashcard titled Knock First: a boy raises a smiling fist, ready to knock gently on a door.','Doors are for asking, even at home. Knock on your child\u2019s door before you enter, and they will copy the habit on yours.'],
 ['let-others-go-first','Let Others Go First','A Kiddo School manners flashcard titled Let Others Go First: a boy stands beside a doorway, waving someone through ahead of him.','\u201cYou first\u201d is a magic phrase at doors, slides and queues. Letting a friend go first costs nothing and buys a friendship.'],
 ['offer-to-share','Offer to Share','A Kiddo School manners flashcard titled Offer to Share: a boy opens both hands wide with a generous grin, offering what he holds.','Split the apple, halve the crackers. Sharing works best when it is offered, not ordered — praise the offer, not just the outcome.'],
 ['pay-attention','Pay Attention','A Kiddo School manners flashcard titled Pay Attention: a boy clasps his hands and looks up, listening with his whole face.','Eyes on the speaker, hands still. Tell a two-sentence story and ask what happened — listening is a skill you can see.'],
 ['push-in-your-chair','Push In Your Chair','A Kiddo School manners flashcard titled Push In Your Chair: a boy tucks a purple chair neatly under a yellow table.','Stand up, turn, tuck. A two-second habit that tidies the whole room, and it starts with your chair going in first.'],
 ['put-things-back','Put Things Back','A Kiddo School manners flashcard titled Put Things Back: a boy slides a book onto a purple bookshelf where it belongs.','Every toy has a house. The book lives on the shelf, the car in the bin — end of play means everything goes home.'],
 ['quiet-voice','Quiet Voice','A Kiddo School manners flashcard titled Quiet Voice: a boy holds one finger to his lips, asking for a whisper.','Whisper voices are for libraries, clinics and the baby\u2019s nap. Practise the one-metre voice: loud enough for me, quiet for the room.'],
 ['raise-your-hand','Raise Your Hand','A Kiddo School manners flashcard titled Raise Your Hand: a boy stretches one arm straight up, waiting for his turn to speak.','Hand up means turn taken. Play circle time at home — questions answered only with a raised hand make it a game, not a rule.'],
 ['respect-personal-space','Respect Personal Space','A Kiddo School manners flashcard titled Respect Personal Space: a boy stands inside a bubble with his hands up, keeping a friendly distance.','Arm\u2019s length is the bubble. Ask before hugs and watch faces for the answer — the bubble keeps friends comfortable.'],
 ['return-what-you-borrow','Return What You Borrow','A Kiddo School manners flashcard titled Return What You Borrow: one boy hands a toy rocket back to his smiling friend.','Borrowed means given back. Toys, books, crayons — returning them with a thank-you makes the next borrow easy.'],
 ['sit-nicely','Sit Nicely','A Kiddo School manners flashcard titled Sit Nicely: a boy sits still on a purple chair with his hands resting on his knees.','Criss-cross or both feet down, hands in laps. Thirty seconds of sitting nicely at the table is the rehearsal for school.'],
 ['stand-in-line','Stand in Line','A Kiddo School manners flashcard titled Stand in Line: a boy waits patiently with his hands behind his back beside a dotted line.','Lines move when everyone holds their spot. Queue up for a snack — first, second, third — and waiting becomes the game.'],
 ['take-turns','Take Turns','A Kiddo School manners flashcard titled Take Turns: a boy passes the relay baton to a girl as they run together.','One toy, two children, a timer nobody minds. Turns feel fair when they can be seen: a sand timer, a song, or a count of ten.'],
 ['use-the-bin','Use the Bin','A Kiddo School manners flashcard titled Use the Bin: a boy drops a crumpled paper into a tall purple bin.','Rubbish has one home. Wrappers, apple cores, scribbles — score a basket for every shot and tidiness becomes aim practice.'],
 ['use-two-hands','Use Two Hands','A Kiddo School manners flashcard titled Use Two Hands: a boy carries a plate carefully, one hand on each side.','Two hands for trays, plates and full cups. Fewer spills, prouder carries — one hand is for waving.'],
 ['wait-your-turn','Wait Your Turn','A Kiddo School manners flashcard titled Wait Your Turn: a boy stands patiently with his hands folded, smiling as he waits.','Waiting is easier with a job: count the plates, name the colours. Hands that are busy don\u2019t grab.'],
 ['walk-quietly','Walk Quietly','A Kiddo School manners flashcard titled Walk Quietly: a boy tiptoes past a sleeping baby with a finger to his lips.','Tiptoe past the sleeping baby. Soft steps, heels rolling, a finger to the lips — walking quietly is stealth practice the whole house enjoys.'],
 ['wipe-the-table','Wipe the Table','A Kiddo School manners flashcard titled Wipe the Table: a boy grins and wipes the table with a yellow cloth, top to bottom.','A cloth and a spray bottle turn cleanup into a favourite job. Top to bottom, round and round — done is better than perfect.']]
 .map(([slug,word,alt,tip])=>({slug,file:slug+'.webp',word,alt,tip}));

export const MAN_CARDS=CARDS;
export const bySlug=Object.fromEntries(CARDS.map(c=>[c.slug,c]));

export const MAN_COVER={file:'cover.webp',w:800,h:1131,
 alt:'Cover of the Kiddo School Manners Flashcards set: the words "Manners Flashcards" over a friendly boy in a yellow shirt with one hand on his heart and the other welcoming, standing in front of a yellow circle.'};

/* Guards: the deck must be exactly the owner's 32 uploads, in file order,
   every card complete. */
if(CARDS.length!==32)throw Error('manners: expected 32 cards, got '+CARDS.length);
if(CARDS.map(c=>c.slug).join('|')!==MAN_ORDER.join('|'))throw Error('manners: card order does not match MAN_ORDER');
for(const c of CARDS){
 if(c.alt.length<80)throw Error('manners: thin alt for '+c.slug);
 if(c.tip.length<40)throw Error('manners: thin tip for '+c.slug);
}

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

/* ---- The one and only Manners page --------------------------------------- */
function cardTile(c){
 return `<figure class="mn-card"><img src="${MAN_BASE}${c.file}" width="${W}" height="${H}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(c.word)}</strong><figcaption class="mn-tip">${esc(c.tip)}</figcaption><div class="mn-actions"><a class="button" href="${MAN_BASE}${c.file}" download="${c.slug}.webp">Download <span aria-hidden="true">\u2193</span></a><button type="button" class="button button-ghost" data-mn-print>Print <span aria-hidden="true">\u2399</span></button></div></figure>`;
}

export function mannersBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">EXTRA CLASS \u00b7 MANNERS \u00b7 32 CARDS \u00b7 AGES 3\u20135</span><h1>Manners flashcards — 32 good habits to print and practise.</h1><p class="lesson-lede">Thirty-two printable manners cards for ages three to five: the magic words, the waiting, the tidying, the table manners and the kind hands. Every card below prints free, downloads as a full-size image and carries one plain tip from the teacher on how to practise it tonight — the whole class lives on this single page.</p><div class="lesson-start"><a class="button" href="#the-cards">Open the cards <span aria-hidden="true">\u2193</span></a><a class="button button-ghost" href="/extra-classes/">More extra classes <span aria-hidden="true">\u2197</span></a></div></div><figure class="lesson-cover"><img src="${MAN_BASE}${MAN_COVER.file}" width="${MAN_COVER.w}" height="${MAN_COVER.h}" alt="${esc(MAN_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Print the card. Practise the manner. Catch them doing it.</h2><p class="lesson-copy">Pick one card a week and pin it to the fridge at your child\u2019s eye level. Name the manner at a calm moment — not mid-tantrum — act it out once together, then spend the week catching the real thing: \u201cYou waited your turn — that\u2019s the card!\u201d Children repeat what gets noticed, and a fridge card gets noticed every single day.</p><p class="lesson-copy">The cards run in file order from ask-first to wipe-the-table, but any order works: start with the manner your mornings need most. Print on A4 or Letter paper, cut along the border, and let your child pin up each card they earn — ownership is half of manners. Everything on this page is free to print at home, today.</p></section>`;
 const cards=`<section class="wrap lesson-section" id="the-cards"><span class="eyebrow">THE CARDS \u00b7 32 MANNERS</span><h2>Every manner, its tip, and the button to print it.</h2><p class="fc-hint">Each tile is the card itself: the artwork prints at full size with the Download button, and Print runs just that one card through your printer. The tip under each card is the whole lesson — one way to set it up tonight.</p><div class="mn-cards">${CARDS.map(cardTile).join('')}</div></section>`;
 const around=`<section class="wrap lesson-section"><span class="eyebrow">AROUND THE SCHOOL</span><h2>Where manners are practised next.</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/preschool/4-years/life-skills-and-good-habits/">Practise good manners in Class 32 <span>· Ages 4–5</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/preschool/4-years/feelings-and-kindness/">Kind actions in Class 38 <span>· Ages 4–5</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/cafeteria/">Table manners in the Cafeteria <span>· Ages 2–5</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/playground/">Fair play in the Playground <span>· The five manners</span> <span aria-hidden="true">\u2197</span></a><a class="lesson-pill-link" href="/extra-classes/">All the extra classes <span aria-hidden="true">\u2197</span></a></div><p class="lesson-copy">Class 32 builds the daily habits and Class 38 grows the kind words; the Cafeteria room names every food on the tray, and the Playground keeps the five manners that make play fair. This class prints the manners themselves — one card, one habit, one fridge at a time.</p></section>`;
 return `${hero}${how}${cards}${around}<p class="lesson-note"><strong>Manners are not a lecture.</strong> They are fifty small chances a day for a child to be proudly capable — the cards just help everyone remember to look for the chances.</p>`;
}

/* ---- Cross-links the owner asked for (2026-10-27) ------------------------- */
/* Appended to Class 32 · Life Skills & Good Habits. */
export const MAN_LIFE_SKILLS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">GOOD MANNERS NEXT</span><h2>Practise good manners.</h2><p class="lesson-copy">Class 32 builds the habits; the school\u2019s <a href="/manners/">Manners flashcards</a> drill them one card at a time: thirty-two printable manners for ages 3–5 — waiting turns, gentle hands, quiet voices, table manners — each with a one-line practice tip, a download button and one-tap printing, all on a single page. Habits here, manners next door: the two decks finish each other.</p></section>`;
/* Appended to Class 38 · Feelings & Kindness. */
export const MAN_KINDNESS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">KIND ACTIONS</span><h2>Kind actions: manners.</h2><p class="lesson-copy">Feeling words grow into kind actions — and the <a href="/manners/">Manners flashcards</a> print them: thirty-two good-manners cards for ages 3–5, from gentle hands and offer-to-share to cheering for others, every card carrying a practice tip, a download button and a print button on one free page. Naming feelings here, practising the kind version next door.</p></section>`;
/* Appended to the Cafeteria room. */
export const MAN_CAFETERIA_LINK=`<section class="wrap lesson-section"><span class="eyebrow">AT THE TABLE</span><h2>Table manners, printed.</h2><p class="lesson-copy">The Cafeteria names the food — the <a href="/manners/">Manners flashcards</a> mind the table: chew quietly, use two hands, wipe the table, offer to share. Thirty-two printable manners cards for ages 3–5, each with a how-to-practise tip, a download and a one-tap print on a single page. Print both decks and lunch gets louder in the best way.</p></section>`;
/* Appended to the Playground room. */
export const MAN_PLAYGROUND_LINK=`<section class="wrap lesson-section"><span class="eyebrow">PLAY FAIR</span><h2>The five manners meet thirty-two more.</h2><p class="lesson-copy">The Playground keeps five manners cards — the ones play needs most. The <a href="/manners/">Manners flashcards</a> next door carry the full set: take turns and let-others-go-first for the slide queue, quiet voices and walking feet for the halls — thirty-two cards for ages 3–5 with a tip, a download and a print button on each, all on one page.</p></section>`;
