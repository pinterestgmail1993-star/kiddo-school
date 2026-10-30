/* First Glance page builder — one standalone page holding all 58 sheets.
   House system: cream paper, white cards, 1.5px ink borders + offset
   shadows, serif headings, white ink-border pills (round-3 language).
   Reuses the flashcard library's .fc-grid / .fc-card / .fc-pill CSS. */
import {FG_BASE,FG_W,FG_H,FG_LW,FG_LH,FG_AGES_2_3,FG_AGES_4_5,FG_TOTAL} from './first-glance-data.mjs';

const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const num=n=>n.toLocaleString('en-US');

const card=(c,folder,bandLabel)=>{
 const lw=c.lw,w=lw?FG_LW:FG_W,h=lw?FG_LH:FG_H;
 const file=`${c.n}-${c.slug}.webp`;
 const alt=`First Glance “${c.t}” sheet: ${c.w.join(', ')} — labelled picture cards.`;
 /* Owner cross-link (2026-10-22): the two Colors sheets carry a pointer to
    the Colors extra class — 'those four colors have a whole class of their
    own'. Renders on colors-1 and colors-2 only. */
 const more=c.slug==='colors-1'||c.slug==='colors-2'?`<a class="fg-more" href="/extra-classes/colors/">More colors in the Colors class <span aria-hidden="true">↗</span></a>`
  /* Owner cross-link (2026-10-30): the Staying-safe sheet points to the
     safety class — every word on this sheet has a card and a practice. */
  :c.slug==='safety'?`<a class="fg-more" href="/staying-safe/">Every one of these words has a card: Class 39 · Staying Safe <span aria-hidden="true">↗</span></a>`:'';
 return `<figure class="fc-card fg-card"><a href="${FG_BASE}${folder}/${file}" target="_blank" rel="noopener" aria-label="Open the ${e(c.t)} sheet full size in a new tab"><img src="${FG_BASE}${folder}/${file}" width="${w}" height="${h}" alt="${e(alt)}" loading="lazy"></a><figcaption><strong>${e(c.t)}</strong><span>${e(c.d)}</span><span class="fc-pillrow"><span class="fc-pill fc-pill-age">${e(bandLabel)}</span><span class="fc-pill fc-pill-subject">${e(c.sub)}</span></span><span class="fg-skills">Skills: ${e(c.sk)}</span>${more}</figcaption></figure>`;
};

const band=(b,id,dotN)=>{
 const pictures=b.cards.reduce((n,c)=>n+c.w.length,0);
 return `<section class="fg-sec wrap" id="${id}" aria-labelledby="${id}-h"><header class="fg-sec-head"><span class="fg-dot" style="background:${dotN}"></span><div><h2 id="${id}-h">${e(b.band)}</h2><p>${e(b.intro)}</p></div><span class="fg-badge">${num(b.cards.length)} sheets</span></header><p class="fg-sec-note">${num(b.cards.length)} sheets · ${num(pictures)} labelled pictures · tap any sheet to open it full size</p><div class="fc-grid fc-grid-2 fg-grid">${b.cards.map(c=>card(c,b.folder,b.band)).join('')}</div></section>`;
};

export function firstGlanceBody(){
 const pictures=FG_AGES_2_3.cards.reduce((n,c)=>n+c.w.length,0)+FG_AGES_4_5.cards.reduce((n,c)=>n+c.w.length,0);
 const crumb=`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">First Glance</span></nav>`;
 const head=`<div class="page-heading wrap"><span class="eyebrow">FIRST GLANCE · A FIRST LOOK AT EVERYTHING</span><h1>First Glance<span class="title-dot">.</span></h1><p>All ${FG_TOTAL} first-picture sheets on one page — ${num(pictures)} labelled pictures of the words children meet first. Tap any sheet to open it full size, then point, name and talk together.</p></div>`;
 const jumps=`<nav class="fg-jumps wrap" aria-label="Jump to an age group"><a href="#fg-2-3"><b>Ages 2–3</b><span>${FG_AGES_2_3.cards.length} first-word sheets</span></a><a href="#fg-4-5"><b>Ages 4–5</b><span>${FG_AGES_4_5.cards.length} bigger-idea sheets</span></a><a href="#fg-why"><b>Why First Glance?</b><span>the idea behind the sheets</span></a></nav>`;
 const why=`<section class="fg-why wrap" id="fg-why" aria-labelledby="fg-why-h"><div class="fg-why-copy"><span class="eyebrow">THE IDEA</span><h2 id="fg-why-h">Why we made First Glance<span class="title-dot">.</span></h2><p>Everything on this page comes from the same small moment: a child, a grown-up and a picture, saying a word together. Before classes and worksheets and learning paths, there is this — <em>a first glance</em> at the world, one labelled picture at a time.</p><p>We made these sheets because the very first words deserve very clear pictures. Every sheet holds a little family of things that belong together — pets, fruit, feelings, shapes — drawn big and bold with the word right underneath. No app, no login, no sound needed: open a sheet and start pointing.</p><p>The two groups follow how vocabulary really grows. <strong>Ages 2–3</strong> names the everyday world a toddler can see and touch. <strong>Ages 4–5</strong> stretches into ideas — seasons, jobs, positions, safety — the sheets that turn naming into asking and answering. Both meet your child wherever they are: there is no wrong sheet to start with.</p><p>Keep it short and keep it warm. One or two sheets, a few minutes, plenty of chat. That is the whole method — and it is the one that works.</p></div><figure class="fg-why-art"><a href="${FG_BASE}ages-2-3/01-pets.webp" target="_blank" rel="noopener"><img src="${FG_BASE}ages-2-3/01-pets.webp" width="${FG_W}" height="${FG_H}" alt="A First Glance pets sheet with four labelled cards: cat, dog, bird and fish." loading="lazy"></a><figcaption>The very first sheet — Cat · Dog · Bird · Fish.</figcaption></figure></section>`;
 const how=`<section class="fg-how wrap" aria-labelledby="fg-how-h"><h2 id="fg-how-h">How to use the sheets<span class="title-dot">.</span></h2><div class="fg-how-grid"><div><span>01</span><h3>Point and name</h3><p>Tap a sheet, then point at each picture and say the word clearly. Let your child point and say it back — echoing is learning.</p></div><div><span>02</span><h3>Ask little questions</h3><p>“Where is the cat?” “Which one do we eat?” Questions turn naming into thinking, and every answer earns a reply.</p></div><div><span>03</span><h3>Bring it to life</h3><p>Meet a dog after the pets sheet, stir the pot after the kitchen sheet. Words stick when the real thing shows up.</p></div><div><span>04</span><h3>Print and keep</h3><p>Every sheet opens full size — print it for the kitchen wall, the car ride or the waiting room. Repetition is the point.</p></div></div></section>`;
 return `${crumb}${head}${jumps}${band(FG_AGES_2_3,'fg-2-3','var(--yellow)')}${band(FG_AGES_4_5,'fg-4-5','var(--sage)')}${why}${how}`;
}
