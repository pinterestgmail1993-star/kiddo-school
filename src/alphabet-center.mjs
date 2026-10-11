// Kiddo School — the Alphabet Learning Center: page bodies for the upgraded
// /flashcards/alphabet/ hub, the 26 letter pages (/flashcards/alphabet/letter-x/),
// the three alphabet games under /activities/, the Activities cupboard shelf
// and the A-B-C intro for the preschool letter class.
// Everything renders from src/alphabet-data.mjs (real R2 assets, probed).
// Without JavaScript every page still teaches: the hub shows the A–Z grid,
// letter pages ship their full content, and the two sound/picture games
// use the site's existing data-tc-round engine with every round in the HTML.
import {LETTERS,LETTERS_BY_KEY,letterAt,R2_ALPHA} from './alphabet-data.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const letterPath=l=>`/flashcards/alphabet/letter-${l.letter}/`;
const crumbs=parts=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;

/* ------------------------------------------------------------ shared data */
// The card-viewer payload: five faces per letter, real files, real sizes.
export function alphabetCenterData(){
 return JSON.stringify({letters:LETTERS.map(l=>({
  letter:l.letter,upper:l.upper,word:l.word,
  faces:{
   up:{src:l.file('uppercase.png'),w:l.w,h:l.h,alt:`Uppercase letter ${l.upper} as large playful letter art`},
   lo:{src:l.file('lowercase.png'),w:l.w,h:l.h,alt:`Lowercase letter ${l.lower} as large playful letter art`},
   pic:{src:l.file(l.pictureFile),w:l.w,h:l.h,alt:l.pictureAlt},
   pair:{src:l.file('pair.png'),w:l.w,h:l.h,alt:`Letter pair card showing uppercase ${l.upper} and lowercase ${l.lower} together`},
   say:{src:l.file('sound.png'),w:l.w,h:l.h,alt:`Letter and picture association card: ${l.upper} ${l.lower} with ${l.pictureAlt.replace(/^The letters [A-Za-z ]+ beside /,'')}`}
  },
  page:letterPath(l)
 }))}).replaceAll('<','\\u003c');
}

const MODES=[
 ['up','Uppercase letters','Big letters, one at a time — say each letter’s name.'],
 ['lo','Lowercase letters','The little letters your child meets in every book.'],
 ['pic','Picture words','Name the picture, then find its first letter.'],
 ['pair','Letter pairs','Big and little together — two shapes, one letter.'],
 ['say','Letter &amp; picture','The association cards: letter and picture side by side.']
];
const MODE_LABEL={up:'Uppercase',lo:'Lowercase',pic:'Picture',pair:'Pair',say:'Letter & picture'};

/* ------------------------------------------------- the hub (Alphabet Center) */
export function alphabetCenterBody(){
 const grid=LETTERS.map(l=>`<a class="al-tile" href="${letterPath(l)}" data-al-tile="${l.letter}"><span class="al-tile-img"><img src="${l.file(l.pictureFile)}" width="${l.w}" height="${l.h}" alt="${esc(l.pictureAlt)}" loading="lazy"></span><span class="al-tile-word"><strong>${l.upper} ${l.lower}</strong><span>${esc(l.word)}</span></span></a>`).join('');
 return `<section class="wrap section compact al-center" id="alphabet-center" data-al-center>
  <span class="eyebrow">THE ALPHABET CENTER</span>
  <h2>Meet the alphabet, one card at a time.</h2>
  <p class="lesson-copy">Twenty-six letters, five kinds of cards and every picture from the school’s alphabet set. Choose a card kind below, move through the alphabet with the arrows, shuffle for surprise practice — or tap any letter in the big grid to jump straight to it.</p>
  <div class="al-viewer" data-al-viewer hidden>
   <div class="al-modes" role="group" aria-label="Choose a card kind" data-al-modes>
    ${MODES.map(([id,label,desc])=>`<button type="button" class="al-mode" data-al-mode="${id}" aria-pressed="false"><strong>${label}</strong><span>${desc}</span></button>`).join('')}
   </div>
   <figure class="al-card">
    <img data-al-img src="" width="1080" height="1350" alt="The alphabet card player — choose a card kind to begin" decoding="async">
    <figcaption><span class="al-card-kind" data-al-kind>Uppercase</span><strong class="al-card-word" data-al-word>A</strong><a class="al-card-page text-link" data-al-page href="">Open this letter’s page <span aria-hidden="true">↗</span></a></figcaption>
   </figure>
   <div class="al-controls" data-al-controls>
    <button type="button" class="button button-ghost" data-al-prev>Previous</button>
    <span class="al-count" data-al-count aria-live="polite" aria-atomic="true">Letter A of 26</span>
    <button type="button" class="button button-ghost" data-al-next>Next</button>
   </div>
   <div class="al-controls al-controls-row">
    <button type="button" class="button button-ghost" data-al-shuffle>Shuffle <span aria-hidden="true">⇄</span></button>
    <button type="button" class="button button-ghost" data-al-restart>Restart <span aria-hidden="true">↺</span></button>
   </div>
   <p class="fc-hint" data-al-hint hidden>Uppercase, lowercase, picture, pair and letter-&amp;-picture cards — one kind at a time, big and touch-friendly. Nothing here is scored or timed.</p>
  </div>
  <noscript><p class="fc-hint">The card player needs JavaScript. The whole alphabet still works below — tap any letter to open its page with every card on it.</p></noscript>
  <script type="application/json" data-al-center-data>${alphabetCenterData()}</script>
  <div class="al-grid" data-al-grid>
   <h3 class="al-grid-title">The A–Z grid</h3>
   <p class="fc-hint">Every letter on the shelf, in order. Tap to jump to it above — or open its letter page.</p>
   ${grid}
  </div>
 </section>`;
}

/* ------------------------------------------------------------ letter pages */
export function letterPageBody(L,prev,next){
 const l=L.letter,up=L.upper;
 const pic=L.file(L.pictureFile);
 const soundReveal=L.kind==='special'
  ?`<p class="lesson-note">X’s sound usually hides at the end of words — fox, box, six. Practice it there, where it really lives.</p>`
  :L.kind==='soft'
  ?`<p class="lesson-note">G keeps a second sound, the hard g in goat and game. Giraffe picked the j sound — both are correct.</p>`
  :L.kind==='long'
  ?`<p class="lesson-note">The little i also says its short ih sound, as in insect. Ice cream meets the long ie first — the one children already know.</p>`
  :'';
 const gameLinks=`<div class="lesson-linkrow">
  <a class="lesson-pill-link" href="/activities/beginning-sounds/">Play Beginning Sounds</a>
  <a class="lesson-pill-link" href="/activities/letter-matching/">Play Letter Matching</a>
  <a class="lesson-pill-link" href="/activities/guess-the-picture/">Play Guess the Picture</a>
 </div>`;
 return `${crumbs([['Flashcards','/flashcards/'],['Alphabet A–Z','/flashcards/alphabet/'],[`Letter ${up}`]])}
 <section class="wrap section compact al-letter-hero">
  <span class="eyebrow">ALPHABET CENTER · LETTER ${up}</span>
  <h1>Letter ${up} — ${esc(L.word)}<span class="title-dot">.</span></h1>
  <p class="mw-lede">${esc(L.intro)}</p>
  <p class="fc-hint">Meet the letter, hear its sound, then play. Everything on this page is free, gentle and paced for you.</p>
 </section>

 <section class="wrap section compact al-meet" aria-label="Meet the letter">
  <div class="al-meet-grid">
   <figure class="al-face"><img src="${L.file('uppercase.png')}" width="${L.w}" height="${L.h}" alt="Uppercase letter ${up} as large playful letter art" fetchpriority="high"><figcaption><span class="eyebrow">MEET THE UPPERCASE</span><strong>Big ${up}</strong><span>${esc(L.upperCopy)}</span></figcaption></figure>
   <figure class="al-face"><img src="${L.file('lowercase.png')}" width="${L.w}" height="${L.h}" alt="Lowercase letter ${l} as large playful letter art" loading="lazy"><figcaption><span class="eyebrow">MEET THE LOWERCASE</span><strong>Little ${l}</strong><span>${esc(L.lowerCopy)}</span></figcaption></figure>
   <figure class="al-face"><img src="${pic}" width="${L.w}" height="${L.h}" alt="${esc(L.pictureAlt)}" loading="lazy"><figcaption><span class="eyebrow">THE PICTURE WORD</span><strong>${esc(L.word)}</strong><span>${esc(L.word)} starts with ${l} — say it slowly together and listen for the first sound.</span></figcaption></figure>
   <figure class="al-face"><img src="${L.file('pair.png')}" width="${L.w}" height="${L.h}" alt="Letter pair card showing uppercase ${up} and lowercase ${l} together" loading="lazy"><figcaption><span class="eyebrow">THE LETTER PAIR</span><strong>${up} ${l}</strong><span>${esc(L.pairCopy)}</span></figcaption></figure>
  </div>
 </section>

 <section class="wrap section compact al-sound" aria-label="The letter sound">
  <span class="eyebrow">THE LETTER SOUND</span>
  <h2>What does ${up} say?</h2>
  <div class="al-sound-grid">
   <figure class="al-face"><img src="${L.file('sound.png')}" width="${L.w}" height="${L.h}" alt="Letter and picture association card: ${up} ${l} with ${esc(L.pictureAlt.charAt(0).toLowerCase()+L.pictureAlt.slice(1))}" loading="lazy"><figcaption><span class="eyebrow">ASSOCIATION CARD</span><strong>${up} ${l} — ${esc(L.word)}</strong></figcaption></figure>
   <div class="al-sound-copy">
    <p class="al-sound-say">&ldquo;${esc(L.soundSay)}&rdquo;</p>
    <p class="lesson-copy">${esc(L.soundCopy)}</p>
    ${soundReveal}
   </div>
  </div>
 </section>

 <section class="wrap section compact al-activity" aria-label="Off-screen activity">
  <span class="eyebrow">TAKE IT OFF SCREEN</span>
  <h2>${esc(L.activity.title)}.</h2>
  <p class="lesson-copy">Two minutes is plenty. Follow your child’s lead and stop while it is still fun — that is the whole method.</p>
  <ol class="fc-steps al-activity-steps">
   ${L.activity.steps.map((s,i)=>`<li><span class="fc-stepnum">${String(i+1).padStart(2,'0')}</span><div><p>${esc(s)}</p></div></li>`).join('')}
  </ol>
 </section>

 <section class="wrap section compact al-next" aria-label="Play and keep going">
  <span class="eyebrow">PLAY &amp; PRACTICE</span>
  <h2>Games that use this letter.</h2>
  <p class="lesson-copy">The games mix every letter — play them after meeting two or three letters, or any day your child asks. No scores, no timers, no wrong answers that count.</p>
  ${gameLinks}
  <div class="al-prevnext">
   <a class="al-pn" href="${letterPath(prev)}" rel="prev"><span aria-hidden="true">←</span> <strong>Letter ${prev.upper}</strong><span>${esc(prev.word)}</span></a>
   <a class="al-pn al-pn-next" href="${letterPath(next)}" rel="next"><strong>Letter ${next.upper}</strong> <span aria-hidden="true">→</span><span>${esc(next.word)}</span></a>
  </div>
  <div class="al-backrow"><a class="button button-ghost" href="/flashcards/alphabet/">Back to the Alphabet Center</a></div>
 </section>`;
}

export function letterSchema(site,L,prev,next){
 return [{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
  ['Home','/'],['Flashcards','/flashcards/'],['Alphabet A–Z','/flashcards/alphabet/'],[`Letter ${L.upper}`,letterPath(L)]
 ].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:site+path}))}];
}

/* ------------------------------------------------------- the three games */
export function matchGameBody(){
 const data=JSON.stringify({letters:LETTERS.map(l=>({
  letter:l.letter,upper:l.upper,word:l.word,
  up:{src:l.file('uppercase.png'),w:l.w,h:l.h},
  lo:{src:l.file('lowercase.png'),w:l.w,h:l.h},
  pic:{src:l.file(l.pictureFile),w:l.w,h:l.h,alt:l.pictureAlt}
 }))}).replaceAll('<','\\u003c');
 return `${crumbs([['Activities','/activities/'],['Letter Matching']])}
 <section class="wrap section compact al-game">
  <span class="eyebrow">ALPHABET GAMES · LETTER MATCHING</span>
  <h1>Letter Matching — big and little<span class="title-dot">.</span></h1>
  <p class="mw-lede">Tap a big letter, then find its little partner. Three pairs to start, six by the end — and every match names its picture word together.</p>
  <div class="amg-game" data-amg-game hidden>
   <div class="amg-head"><span class="amg-count" data-amg-count aria-live="polite" aria-atomic="true">Round 1 of 4</span><span class="amg-pairs" data-amg-pairs>3 pairs</span></div>
   <div class="amg-board" data-amg-board></div>
   <p class="amg-banner" data-amg-banner aria-live="polite"></p>
   <div class="amg-actions"><button type="button" class="button" data-amg-next hidden>Next round <span aria-hidden="true">→</span></button><button type="button" class="button button-ghost" data-amg-restart>Restart</button></div>
  </div>
  <noscript><p class="fc-hint">This game needs JavaScript. Letter practice still works everywhere else: the <a href="/flashcards/alphabet/">Alphabet Center</a> and every <a href="/flashcards/alphabet/letter-a/">letter page</a> play fine without it.</p></noscript>
  <section class="wrap lesson-section"><span class="eyebrow">HOW TO PLAY</span><h2>Two taps, one pair.</h2>
   <ol class="fc-steps"><li><span class="fc-stepnum">01</span><div><h3>Tap a big letter</h3><p>Any uppercase card turns on. Say its name and its sound out loud — the sounds do the teaching.</p></div></li>
   <li><span class="fc-stepnum">02</span><div><h3>Find its little partner</h3><p>Tap the lowercase card that belongs to it. A pair clicks together and names its picture word — A a, Apple!</p></div></li>
   <li><span class="fc-stepnum">03</span><div><h3>Match them all</h3><p>Clear the board to open the next round: four pairs, then five, then six. A miss is never a mistake — just try another card.</p></div></li></ol>
  </section>
  <div class="lesson-linkrow"><a class="lesson-pill-link" href="/activities/beginning-sounds/">Play Beginning Sounds</a><a class="lesson-pill-link" href="/flashcards/alphabet/">Back to the Alphabet Center</a></div>
  <script type="application/json" data-amg-data>${data}</script>
 </section>`;
}

const gameAsk=l=>l.kind==='special'
 ?'X is a tricky letter — Xx marks xylophone! Which picture goes with the letter X?'
 :l.kind==='soft'
 ?'Giraffe starts with G — and in giraffe, G says j! Which picture goes with the letter G?'
 :l.kind==='long'
 ?'I says its own name sound — ie, like ice cream! Which picture starts with ie?'
 :`Letter ${l.upper} ${l.lower} says ${l.soundSay.split(',')[0]}. Which picture starts with it?`;

export function soundsGameBody(){
 const reveals=LETTERS.map(l=>{
  if(l.kind==='special')return 'Xylophone! X usually says ks at the end — fox, box, six!';
  const v={a:'Aaa — apple! A says aaa.',b:'Buh — ball! B says buh.',c:'Kuh — cat! C says kuh.',d:'Duh — dog! D says duh.',e:'Eh — elephant! E says eh.',f:'Fff — fish! F says fff.',g:'Juh — giraffe! G says j here.',h:'Hhh — house! H says hhh.',i:'Ie — ice cream! I says its name sound.',j:'Juh — jellyfish! J says juh.',k:'Kuh — kite! K says kuh.',l:'Lll — leaf! L says lll.',m:'Mmm — moon! M says mmm.',n:'Nnn — nest! N says nnn.',o:'Oh — orange! O says oh.',p:'Puh — penguin! P says puh.',q:'Kwuh — quilt! Q brings u along.',r:'Rrr — rabbit! R says rrr.',s:'Sss — snake! S says sss.',t:'Tuh — turtle! T says tuh.',u:'Uh — umbrella! U says uh.',v:'Vvv — violin! V says vvv.',w:'Wuh — watermelon! W says wuh.',y:'Yuh — yo-yo! Y says yuh.',z:'Zzz — zebra! Z says zzz.'}[l.letter];
  return v;
 });
 const rounds=LETTERS.map(l=>{
  const isX=l.kind==='special';
  const ask=gameAsk(l);
  const d1=LETTERS_BY_KEY[l.beginningDistractors[0]],d2=LETTERS_BY_KEY[l.beginningDistractors[1]];
  const choices=[[l,true],[d1,false],[d2,false]].sort((a,b)=>a[0].letter.localeCompare(b[0].letter));
  return `<div class="tc-round" data-tc-round data-tc-ask="${esc(ask)}">
   <p class="tc-ask">${isX?ask:`Letter <strong>${l.upper} ${l.lower}</strong> — which picture starts with <strong>${esc(l.soundSay.split(',')[0])}</strong>?`}</p>
   <figure class="tc-target tc-target-letter"><span class="eyebrow">THE LETTER</span><img src="${l.file('uppercase.png')}" width="${l.w}" height="${l.h}" alt="Uppercase letter ${l.upper} as large playful letter art" loading="lazy"></figure>
   <div class="tc-choices" role="group" aria-label="${esc(ask)}">
    ${choices.map(([t,ok])=>`<button type="button" class="tc-choice tc-choice-pic"${ok?' data-tc-correct="true"':''} aria-label="${esc(t.word)}"><img src="${t.file(t.pictureFile)}" width="${t.w}" height="${t.h}" alt="${esc(t.pictureAlt)}" loading="lazy"><span>${esc(t.word)}</span></button>`).join('')}
   </div>
   <p class="tc-feedback" data-tc-feedback hidden></p>
  </div>`;
 }).join('\n');
 return `${crumbs([['Activities','/activities/'],['Beginning Sounds']])}
 <section class="wrap section compact al-game">
  <span class="eyebrow">ALPHABET GAMES · BEGINNING SOUNDS</span>
  <h1>Beginning Sounds — listen and find<span class="title-dot">.</span></h1>
  <p class="mw-lede">A letter on the left, three pictures to choose from: which one starts with that sound? Every round is phonetically honest — including X, which gets its own tricky-letter rules.</p>
  <section class="wrap lesson-section tc-game" data-tc-correct="${esc(reveals.join('|'))}" data-tc-incorrect="Not that one — say the sound slowly together, then tap.">
   ${rounds}
  </section>
  <section class="wrap lesson-section"><span class="eyebrow">HOW TO PLAY</span><h2>Say it, then find it.</h2>
   <ol class="fc-steps"><li><span class="fc-stepnum">01</span><div><h3>Say the letter’s sound</h3><p>The big card on the left is the letter. Grown-ups read the line aloud and stretch the sound: mmm…</p></div></li>
   <li><span class="fc-stepnum">02</span><div><h3>Tap the picture that starts with it</h3><p>Wrong taps are welcome — the game just invites another look. There are no scores and nothing is lost.</p></div></li>
   <li><span class="fc-stepnum">03</span><div><h3>Meet the tricky letters</h3><p>G says j in giraffe, I says its name in ice cream, and X rarely starts words at all — its ks sound hides at the end of fox and box. Every card tells the truth.</p></div></li></ol>
  </section>
  <div class="lesson-linkrow"><a class="lesson-pill-link" href="/activities/letter-matching/">Play Letter Matching</a><a class="lesson-pill-link" href="/activities/guess-the-picture/">Play Guess the Picture</a><a class="lesson-pill-link" href="/flashcards/alphabet/">Back to the Alphabet Center</a></div>
 </section>`;
}

export function pictureGameBody(){
 const reveals=LETTERS.map(l=>`It’s ${/^[aeiou]/i.test(l.word)?'an':'a'} ${l.word.toLowerCase()} — ${l.upper} is for ${l.word}!`);
 const rounds=LETTERS.map((l,i)=>{
  const opt1=LETTERS[(i+5)%26],opt2=LETTERS[(i+11)%26];
  const options=[[l.word,true],[opt1.word,false],[opt2.word,false]].sort((a,b)=>a[0].localeCompare(b[0]));
  return `<div class="tc-round" data-tc-round data-tc-ask="What do you see?">
   <figure class="tc-target gp-mystery"><span class="eyebrow">MYSTERY PICTURE</span><img src="${l.file(l.pictureFile)}" width="${l.w}" height="${l.h}" alt="A mystery picture from the alphabet set — what do you see?" loading="lazy"></figure>
   <p class="tc-ask">What do you see?</p>
   <div class="tc-choices" role="group" aria-label="What do you see? Choose the word.">
    ${options.map(([w,ok])=>`<button type="button" class="tc-choice tc-choice-word"${ok?' data-tc-correct="true"':''}>${esc(w)}</button>`).join('')}
   </div>
   <p class="tc-feedback" data-tc-feedback hidden></p>
  </div>`;
 }).join('\n');
 return `${crumbs([['Activities','/activities/'],['Guess the Picture']])}
 <section class="wrap section compact al-game">
  <span class="eyebrow">ALPHABET GAMES · GUESS THE PICTURE</span>
  <h1>Guess the Picture — what do you see?<span class="title-dot">.</span></h1>
  <p class="mw-lede">One picture at a time — some full of color, some drawn as outlines, some hiding their letters right in the artwork. Name it, tap the word, and meet its letter.</p>
  <section class="wrap lesson-section tc-game" data-tc-correct="${esc(reveals.join('|'))}" data-tc-incorrect="Not that one — look again together. What is it doing? What shape is it?">
   ${rounds}
  </section>
  <section class="wrap lesson-section"><span class="eyebrow">HOW TO PLAY</span><h2>Look, guess, name.</h2>
   <ol class="fc-steps"><li><span class="fc-stepnum">01</span><div><h3>Ask “What do you see?”</h3><p>Let your child study the picture first. Some are colorful, some are outlines — outlines are the best guessing games of all.</p></div></li>
   <li><span class="fc-stepnum">02</span><div><h3>Tap the word</h3><p>Three words to choose from. Grown-ups read them aloud for pre-readers — hearing the words is part of the game.</p></div></li>
   <li><span class="fc-stepnum">03</span><div><h3>Meet the letter</h3><p>Every reveal names the letter too: It’s a penguin — P is for penguin! That is the whole lesson, hidden inside a game.</p></div></li></ol>
  </section>
  <div class="lesson-linkrow"><a class="lesson-pill-link" href="/activities/beginning-sounds/">Play Beginning Sounds</a><a class="lesson-pill-link" href="/activities/letter-matching/">Play Letter Matching</a><a class="lesson-pill-link" href="/flashcards/alphabet/">Back to the Alphabet Center</a></div>
 </section>`;
}

/* ------------------------------------------- the Activities cupboard shelf */
export function alphabetShelf(){
 const cards=[
  ['/flashcards/alphabet/','The Alphabet Center','All 26 letters with five kinds of cards, the A–Z grid and every picture from the alphabet set.'],
  ['/activities/letter-matching/','Letter Matching','Tap a big letter, find its little partner — three pairs to start, six by the end.'],
  ['/activities/beginning-sounds/','Beginning Sounds','A letter and three pictures: which one starts with the sound? Phonics that tells the truth.'],
  ['/activities/guess-the-picture/','Guess the Picture','Name the picture — colorful, outline or mystery — and meet its letter.']
 ];
 return `<div class="dt-shelf al-shelf" id="alphabet"><div class="dt-shelf-head"><h2>The Alphabet Center</h2><p>Twenty-six letters, five card kinds and three gentle games — built from the school’s own alphabet artwork. Free, no sign-up.</p></div><div class="al-shelf-grid">${cards.map(([href,title,copy])=>`<a class="dt-card" href="${href}"><span class="dt-card-copy"><strong>${esc(title)}</strong><span>${esc(copy)}</span><span class="fc-open">Open <span aria-hidden="true">↗</span></span></span></a>`).join('')}</div></div>`;
}

/* ------------------------------- the A-B-C intro for the preschool class */
export function abcClassIntro(){
 const pick=['a','b','c'].map(k=>LETTERS_BY_KEY[k]);
 return `<section class="wrap lesson-section al-abc" id="todays-letters" aria-label="Today’s letters: A, B, C">
  <span class="eyebrow">TODAY’S LETTERS</span>
  <h2>Start with A, B and C.</h2>
  <p class="lesson-copy">Three letters is a whole lesson for a three-year-old. Meet them here with the school’s alphabet cards — big letter, little letter, picture word — and say each one slowly. The other twenty-three letters will be waiting on their own pages whenever your child asks for more.</p>
  <div class="al-abc-row">
   ${pick.map(l=>`<a class="al-abc-card" href="${letterPath(l)}"><img src="${l.file('sound.png')}" width="${l.w}" height="${l.h}" alt="Letter and picture association card: ${l.upper} ${l.lower} with ${esc(l.pictureAlt.charAt(0).toLowerCase()+l.pictureAlt.slice(1))}" loading="lazy"><span class="al-abc-word"><strong>${l.upper} ${l.lower}</strong><span>${esc(l.word)}</span><span class="al-abc-say">${esc(l.soundSay)}</span><span class="fc-open">Open Letter ${l.upper} <span aria-hidden="true">↗</span></span></span></a>`).join('')}
  </div>
  <div class="hero-actions al-abc-actions"><a class="button" href="/flashcards/alphabet/">Open the Alphabet Center <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="#learn-the-letters">See all 26 letter cards <span aria-hidden="true">↓</span></a></div>
  <p class="lesson-note">The full 26-card viewer below is optional practice — today’s class is really these three letters and the games. Stop whenever the fun stops.</p>
 </section>`;
}
