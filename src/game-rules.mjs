// Kiddo School — Kids Games rules: the /games/ hub and one short page per
// game at /games/<slug>/ (owner 2026-10-24, slug = the R2 file name). The
// hub shows cover.webp FIRST, then the 35 rule cards in file order; every
// game page shows the card, a short how-to-play text and a link back to
// /games/. Nothing on these pages reuses the Kids Games class (/extra-
// classes/kids-games/) or its /learn/ lessons — those URLs stay untouched.
// Cross-links per owner: Class 37 (Sports, Movement & Play) points here via
// GR_CLASS_LINK (appended in scripts/build.mjs) and this page links back to
// Class 37 and to the Kids Games class.
import {GR_BASE,GR_GAMES,GR_COVER} from './gr-cards.mjs';
import {GR_COPY} from './gr-copy.mjs';

export {GR_BASE,GR_GAMES,GR_COVER};

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export const GR_PATH='/games/';
const grBySlug=Object.fromEntries(GR_GAMES.map(g=>[g.slug,g]));
const copyOf=slug=>{const c=GR_COPY[slug];if(!c)throw Error('game-rules: no copy for '+slug);return c;};

/* ---- The /games/ hub ---------------------------------------------------- */
export function gamesHubBody(){
 const hero=`<article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy"><span class="eyebrow">KIDS GAMES \u00b7 GAME RULES \u00b7 35 CARDS \u00b7 AGES 3\u20138</span><h1>How to play every game in the deck.</h1><p class="lesson-lede">Thirty-five classic children\u2019s games, one short page each: the rules card itself, the three steps printed on it, what you need, and one fresh way to play it tonight. Duck Duck Goose, Hopscotch, Simon Says, Tag, Treasure Hunt and thirty more \u2014 the answers to \u201chow do you play that?\u201d, all in one place.</p><div class="lesson-start"><a class="button" href="#the-games">Pick a game <span aria-hidden="true">\u2193</span></a><span class="lesson-start-hint">Cover first, then every rule card in file order.</span></div></div><figure class="lesson-cover"><img src="${GR_BASE}${GR_COVER.file}" width="${GR_COVER.w}" height="${GR_COVER.h}" alt="${esc(GR_COVER.alt)}"></figure></article>`;
 const how=`<section class="wrap lesson-section"><span class="eyebrow">HOW THE RULES PAGES WORK</span><h2>The card is the rules. The page is the grown-up\u2019s quiet answer.</h2><p class="lesson-copy">Every rule card in the Kids Games deck does the same three things: names the game, shows children playing it, and prints a HOW TO PLAY panel with three numbered steps and a skill the game quietly practices \u2014 Imagine + Move, Stop + Go, Watch + Remember. Each page below shows the card first, quotes its three steps word for word, and adds what the card cannot fit: what to gather before you start, one safety-and-sanity note for grown-ups, and a fresh twist for tomorrow.</p><p class="lesson-copy">These rules pages belong to the school\u2019s <a href="/extra-classes/kids-games/">Kids Games extra class</a>, where every card also opens a full how-to-play guide written for a kid to follow. The two shelves sit side by side: come here for the rules of a game you are about to play, and visit the class when you want the whole game afternoon laid out in tour order. If your child is working on <a href="/preschool/4-years/sports-movement-and-play/">Sports, Movement &amp; Play \u2014 Class 37</a>, these games are its playground cousins.</p></section>`;
 const tiles=GR_GAMES.map(g=>`<a class="lp-tile" href="${GR_PATH}${g.slug}/"><img src="${GR_BASE}${g.file}" width="900" height="1200" alt="${esc(g.alt)}" loading="lazy"><strong>How to Play ${esc(g.name)}</strong></a>`).join('');
 const grid=`<section class="wrap lesson-section" id="the-games"><span class="eyebrow">ALL THIRTY-FIVE GAMES</span><h2>Pick a game, read the rules, play it today.</h2><p class="fc-hint">Every rule card in file order, from Animal Walks to Tunnel Crawl. Tap any card to open its rules page.</p><div class="lp-tiles">${tiles}</div></section>`;
 const fit=`<section class="wrap lesson-section"><span class="eyebrow">WHERE THIS SHELF FITS</span><h2>Two shelves, one game cupboard.</h2><p class="lesson-copy">The <a href="/extra-classes/kids-games/">Kids Games extra class</a> walks the older twenty-six-card deck in tour order \u2014 throwing games first, then chasing, table, quiet and acting games, and the sidewalk classics at the end \u2014 with a lesson a kid can follow on every page. This shelf adds the newer rule cards beside them, one short rules page per game. And for the classes already on the Learning Path, <a href="/preschool/4-years/sports-movement-and-play/">Class 37 \u00b7 Sports, Movement &amp; Play</a> teaches forty named sports skills, step by step \u2014 these games are what the whole family plays between lessons.</p></section>`;
 return `${hero}${how}${grid}${fit}<p class="lesson-note"><strong>Rules bend at your house.</strong> Every version here is the friendly starter version \u2014 change the words, shorten the course and stop while it is still fun.</p>`;
}

/* ---- One short page per game -------------------------------------------- */
export function grPageBody(slug){
 const g=grBySlug[slug], c=copyOf(slug);
 return `${crumbGR(g.name)}
 <div class="page-heading wrap"><span class="eyebrow">KIDS GAMES \u00b7 GAME RULES \u00b7 ACTIVE PLAY</span><h1>How to Play ${esc(g.name)}.</h1><p>${c.intro}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main"><figure class="fc2-hero"><img src="${GR_BASE}${g.file}" width="900" height="1200" alt="${esc(g.alt)}"><figcaption><strong>How to Play ${esc(g.name)}</strong><span>The rule card \u00b7 Kids Games flashcards</span></figcaption></figure>
  <section class="fc2-learn" aria-label="The rules of ${esc(g.name)}">
   <div class="fc2-do"><h2>The card\u2019s three rules</h2><ol>${g.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><p class="fc-hint">Skill practiced: <strong>${esc(g.skill)}</strong> \u2014 printed on the card.</p></div>
   <div class="fc2-do"><h2>What you need</h2><p>${c.need}</p></div>
   <div class="fc2-do"><h2>For grown-ups</h2><p>${c.tip}</p></div>
   <div class="fc2-do fc2-note"><h2>Make it fresh tomorrow</h2><p>${c.fresh}</p></div>
  </section></div>
  <aside class="fc2-rail" aria-label="More games"><section class="fc2-block fc2-first-block"><span class="eyebrow">PART OF KIDS GAMES</span><h2>Thirty-four games to go.</h2><p class="fc-hint">${esc(g.name)} is one of 35 rule cards on the games shelf.</p><a class="button" href="${GR_PATH}">Back to all games <span aria-hidden="true">\u2197</span></a><a class="button button-ghost" href="/extra-classes/kids-games/">The Kids Games class <span aria-hidden="true">\u2197</span></a></section></aside>
 </div>`;
}
function crumbGR(name){return `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="${GR_PATH}">Games</a><span aria-hidden="true">/</span><span aria-current="page">${esc(name)}</span></nav>`;}

/* Helpers for scripts/build.mjs page() registrations. */
export const grTitle=g=>`How to Play ${g.name} \u2014 Rules for Kids`;
export const grDesc=g=>{const m=GR_COPY[g.slug].intro.match(/^[^.]+\./);return (m?m[0]:GR_COPY[g.slug].intro).trim()+' The card\u2019s three rules, what you need, and a fresh way to play \u2014 one short page per game.';};
export const grCardImg=g=>GR_BASE+g.file;
export const grCardAlt=g=>g.alt;

/* ---- Cross-link appended to Class 37 (owner 2026-10-24: "Link from
   Class 37 to /games/ and back") ------------------------------------------ */
export const GR_CLASS_LINK=`<section class="wrap lesson-section"><span class="eyebrow">AFTER THE LESSON</span><h2>Then play the playground classics.</h2><p class="lesson-copy">Class 37 teaches forty named sports skills; the school\u2019s <a href="/games/">game rules shelf</a> holds the games children play between them \u2014 Duck Duck Goose, Hopscotch, Simon Says, Tag, Red Light Green Light and thirty more, each with the three rules printed on its card, what you need, and one fresh twist. When today\u2019s sport lesson ends, let the rules shelf pick the game that runs off the last of the wiggles.</p></section>`;
