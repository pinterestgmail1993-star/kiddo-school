// Kiddo School — the shared hub-filter taxonomy for /flashcards/ and /worksheets/.
//
// The owner asked for filters of AGE, LEVEL, SUBJECT and SKILL on the two
// library walls, with easy navigation. The walls stay static HTML (no URLs
// change — the clean-URL rule holds): every set/category card carries a
// data-filters token list, a chip bar filters them in place with JavaScript,
// and without JavaScript every chip is still a plain anchor to the matching
// shelf (flashcards) or category page (worksheets).
//
// Tokens use <group>-<id> so a chip and a card can never be confused with a
// section or each other, and so the four axes stay readable in the HTML.
// Multi-membership is honest: a card may carry several age/subject/skill
// tokens (the Kitchen set really does serve a 3-year-old and a 5-year-old).
export const FC_FILTERS={
 age:[
  ['age-0-1','Baby · 0–1','#fc-stage-0'],
  ['age-1-2','Toddler · 1–2','#fc-stage-3'],
  ['age-3','Preschool · 3','#fc-stage-4'],
  ['age-4-5','Ages 4–5','#fc-stage-5']
 ],
 level:[
  ['lvl-newborn','Newborn · 0–3 months','#fc-stage-0'],
  ['lvl-infant','Infant · 3–6 months','#fc-stage-1'],
  ['lvl-baby','Baby · 6–12 months','#fc-stage-2'],
  ['lvl-toddler','Toddler · 1–2 years','#fc-stage-3'],
  ['lvl-preschool','Preschool · Age 3','#fc-stage-4'],
  ['lvl-prek','Preschool · Ages 4–5','#fc-stage-5'],
  ['lvl-rooms','School Rooms','#fc-stage-6']
 ],
 subject:[
  ['subj-first-words','First words & concepts','#all-sets'],
  ['subj-alphabet','Alphabet & letters','#all-sets'],
  ['subj-numbers','Numbers & counting','#all-sets'],
  ['subj-colors-shapes','Colors & shapes','#all-sets'],
  ['subj-reading','Phonics & reading','#all-sets'],
  ['subj-animals','Animals & nature','#all-sets'],
  ['subj-science','Science & discovery','#all-sets'],
  ['subj-feelings','Feelings & good habits','#all-sets'],
  ['subj-people','People & helpers','#all-sets'],
  ['subj-music','Music','#all-sets'],
  ['subj-sports','Sports & movement','#all-sets'],
  ['subj-vehicles','Vehicles','#all-sets'],
  ['subj-thinking','Thinking & puzzles','#all-sets']
 ],
 skill:[
  ['skill-vocab','Naming words','#all-sets'],
  ['skill-sounds','Letter & animal sounds','#all-sets'],
  ['skill-counting','Counting','#all-sets'],
  ['skill-matching','Matching & sorting','#all-sets'],
  ['skill-thinking','Thinking & memory','#all-sets'],
  ['skill-talking','Talking together','#all-sets'],
  ['skill-routines','Daily routines','#all-sets'],
  ['skill-movement','Moving & playing','#all-sets']
 ]
};

/* One tag list per set card on the wall — the 42 sets plus the six alphabet
   letter variants and the black-and-white baby set. Every entry needs at
   least one token from EACH group: build() throws if a slug is missing, so
   a new set can never ship unfiltered. */
export const FC_TAGS={
 // Newborn · birth to 12 weeks
 'black-and-white-baby-cards':['age-0-1','lvl-newborn','subj-first-words','skill-talking','skill-thinking'],
 'faces-and-visual-tracking':['age-0-1','lvl-newborn','subj-first-words','skill-talking','skill-thinking'],
 // Infants · 3–6 months
 'colors-and-first-objects':['age-0-1','lvl-infant','subj-first-words','subj-colors-shapes','skill-vocab'],
 'first-words-familiar-things':['age-0-1','lvl-infant','subj-first-words','skill-vocab','skill-talking'],
 // Babies · 6–12 months
 'animals-everyday-objects':['age-0-1','lvl-baby','subj-animals','subj-first-words','skill-vocab'],
 'first-actions-body-parts':['age-0-1','lvl-baby','subj-first-words','skill-vocab','skill-movement'],
 // Toddlers · 12–24 months
 'toddler-room':['age-1-2','age-3','lvl-toddler','subj-first-words','skill-vocab','skill-routines'],
 'first-words-food-home':['age-1-2','lvl-toddler','subj-first-words','skill-vocab','skill-talking'],
 'first-concepts':['age-1-2','lvl-toddler','subj-first-words','subj-thinking','skill-thinking','skill-vocab'],
 'colors-and-shapes':['age-1-2','lvl-toddler','subj-colors-shapes','skill-matching','skill-vocab'],
 'matching-and-sorting':['age-1-2','lvl-toddler','subj-thinking','skill-matching','skill-thinking'],
 'animals-and-sounds':['age-1-2','lvl-toddler','subj-animals','skill-sounds','skill-vocab'],
 'vehicles-and-sounds':['age-1-2','lvl-toddler','subj-vehicles','skill-sounds','skill-vocab'],
 'emotions-and-feelings':['age-1-2','lvl-toddler','subj-feelings','skill-talking'],
 'garden-bugs-and-friends':['age-1-2','lvl-toddler','subj-animals','skill-vocab'],
 'garden-friends':['age-1-2','lvl-toddler','subj-animals','skill-vocab'],
 'garden-flowers':['age-1-2','lvl-toddler','subj-animals','skill-vocab'],
 'garden-things':['age-1-2','lvl-toddler','subj-animals','skill-vocab'],
 // Preschool · Age 3
 'alphabet':['age-3','lvl-preschool','subj-alphabet','skill-vocab'],
 'alphabet-uppercase':['age-3','lvl-preschool','subj-alphabet','skill-vocab'],
 'alphabet-lowercase':['age-3','lvl-preschool','subj-alphabet','skill-vocab'],
 'alphabet-letters':['age-3','lvl-preschool','subj-alphabet','skill-vocab'],
 'alphabet-objects':['age-3','lvl-preschool','subj-alphabet','skill-vocab'],
 'alphabet-sounds':['age-3','lvl-preschool','subj-alphabet','skill-sounds'],
 'alphabet-tracing':['age-3','lvl-preschool','subj-alphabet','skill-vocab','skill-thinking'],
 'numbers-and-counting':['age-3','lvl-preschool','subj-numbers','skill-counting'],
 'shapes':['age-3','lvl-preschool','subj-colors-shapes','skill-matching'],
 'colors':['age-3','lvl-preschool','subj-colors-shapes','skill-vocab'],
 'opposites':['age-3','lvl-preschool','subj-first-words','subj-thinking','skill-thinking','skill-vocab'],
 'animal-sounds':['age-3','lvl-preschool','subj-animals','skill-sounds'],
 'body-parts-and-five-senses':['age-3','lvl-preschool','subj-first-words','subj-science','skill-vocab'],
 'fruits-and-vegetables':['age-3','lvl-preschool','subj-first-words','skill-vocab'],
 // Pre-K · Ages 4–5
 'life-skills-and-good-habits':['age-4-5','lvl-prek','subj-feelings','skill-routines','skill-talking'],
 'science-nature-and-discovery':['age-4-5','lvl-prek','subj-science','skill-thinking'],
 'community-helpers-and-our-neighborhood':['age-4-5','lvl-prek','subj-people','skill-vocab','skill-talking'],
 'weather-seasons-and-what-we-wear':['age-4-5','lvl-prek','subj-science','skill-vocab'],
 'numbers-counting-and-early-math':['age-4-5','lvl-prek','subj-numbers','skill-counting','skill-thinking'],
 'animals-and-their-habitats':['age-4-5','lvl-prek','subj-animals','subj-science','skill-thinking'],
 'sight-words':['age-4-5','lvl-prek','subj-reading','skill-vocab','skill-thinking'],
 'phonics-and-beginning-sounds':['age-4-5','lvl-prek','subj-reading','subj-alphabet','skill-sounds'],
 'sports':['age-4-5','lvl-prek','subj-sports','skill-movement'],
 'transportation-and-vehicles':['age-4-5','lvl-prek','subj-vehicles','skill-vocab'],
 // Extra classes and rooms (their real age spans ride along)
 'kitchen':['age-3','age-4-5','lvl-preschool','lvl-prek','subj-first-words','skill-vocab','skill-routines'],
 'doctor-visit':['age-3','age-4-5','lvl-preschool','lvl-prek','subj-people','skill-talking','skill-routines'],
 'who-works-at-my-school':['age-3','age-4-5','lvl-preschool','lvl-prek','subj-people','skill-vocab','skill-talking'],
 'home-and-daily-life':['age-3','age-4-5','lvl-preschool','lvl-prek','subj-first-words','skill-vocab','skill-routines'],
 // EXTRA CLASS · Kids Games: classic games for preschoolers — throwing and
 // freezing games sit with sports & movement, the sit-down grid games with
 // thinking; playing IS the movement skill.
 'kids-games':['age-3','age-4-5','lvl-preschool','lvl-prek','subj-sports','subj-thinking','skill-movement','skill-thinking','skill-matching'],
 // School Rooms
 'music-room':['age-3','age-4-5','lvl-rooms','subj-music','skill-sounds'],
 'playground':['age-1-2','age-3','age-4-5','lvl-rooms','subj-sports','skill-movement','skill-talking'],
 'classroom':['age-1-2','age-3','age-4-5','lvl-rooms','subj-first-words','subj-feelings','skill-routines','skill-vocab']
};

/* Worksheet-wall tags, keyed by the card's own href so the five hand-written
   collection cards and the generator card are keyed exactly like the page
   emits them. */
export const WS_FILTERS={
 age:[
  ['age-1-2','Toddler · Age 2','#worksheet-cats'],
  ['age-4-5','Ages 4–5','#worksheet-cats']
 ],
 level:[
  ['lvl-toddler','Toddler classes','#worksheet-cats'],
  ['lvl-age4','Age 4 classes','#worksheet-cats'],
  ['lvl-age45','Ages 4–5 classes','#worksheet-cats'],
  ['lvl-all','Any level','#worksheet-cats']
 ],
 subject:[
  ['subj-maths','Maths','/worksheets/maths/'],
  ['subj-shapes','Shapes & patterns','/worksheets/shapes/'],
  ['subj-colors','Colors & creativity','/worksheets/colors/'],
  ['subj-writing','Writing & pencil control','/worksheets/writing/'],
  ['subj-phonics','Phonics','/worksheets/phonics/'],
  ['subj-reading','Reading & stories','/worksheets/reading/'],
  ['subj-logic','Logic & puzzles','/worksheets/logic/'],
  ['subj-science','Science','/worksheets/science/'],
  ['subj-life','Life skills & habits','/worksheets/life-skills/'],
  ['subj-community','Community helpers','/worksheets/community-helpers-and-our-neighborhood/'],
  ['subj-weather','Weather & seasons','/worksheets/weather-seasons-and-what-we-wear/'],
  ['subj-habitats','Animals & habitats','/worksheets/animals-and-their-habitats/'],
  ['subj-matching','Matching & sorting','/worksheets/toddler/matching-and-sorting/'],
  ['subj-generator','Make your own','/worksheet-generator/']
 ],
 skill:[
  ['skill-counting','Counting','#worksheet-cats'],
  ['skill-tracing','Tracing & pencil control','#worksheet-cats'],
  ['skill-matching','Matching & sorting','#worksheet-cats'],
  ['skill-patterns','Patterns','#worksheet-cats'],
  ['skill-phonics','Phonics & sounds','#worksheet-cats'],
  ['skill-reading','Reading & stories','#worksheet-cats'],
  ['skill-logic','Logic & puzzles','#worksheet-cats'],
  ['skill-science','Science & discovery','#worksheet-cats'],
  ['skill-coloring','Coloring & creating','#worksheet-cats'],
  ['skill-life','Life skills & habits','#worksheet-cats']
 ]
};

export const WS_TAGS={
 '/worksheet-generator/':['age-3','age-4-5','lvl-all','subj-generator','skill-matching','skill-counting','skill-tracing'],
 '/worksheets/maths/':['age-4-5','lvl-age4','subj-maths','skill-counting','skill-tracing'],
 '/worksheets/shapes/':['age-4-5','lvl-age4','subj-shapes','skill-matching','skill-patterns'],
 '/worksheets/colors/':['age-4-5','lvl-age4','subj-colors','skill-coloring','skill-patterns'],
 '/worksheets/writing/':['age-4-5','lvl-age4','subj-writing','skill-tracing'],
 '/worksheets/phonics/':['age-4-5','lvl-age45','subj-phonics','skill-phonics','skill-tracing'],
 '/worksheets/reading/':['age-4-5','lvl-age45','subj-reading','skill-reading'],
 '/worksheets/logic/':['age-4-5','lvl-age45','subj-logic','skill-logic','skill-patterns'],
 '/worksheets/science/':['age-4-5','lvl-age45','subj-science','skill-science'],
 '/worksheets/life-skills/':['age-4-5','lvl-age4','subj-life','skill-life'],
 '/worksheets/community-helpers-and-our-neighborhood/':['age-4-5','lvl-age4','subj-community','skill-life'],
 '/worksheets/weather-seasons-and-what-we-wear/':['age-4-5','lvl-age4','subj-weather','skill-science'],
 '/worksheets/animals-and-their-habitats/':['age-4-5','lvl-age4','subj-habitats','skill-science','skill-matching'],
 '/worksheets/toddler/matching-and-sorting/':['age-1-2','lvl-toddler','subj-matching','skill-matching']
};

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* data-filters attribute value for a tag list */
export const tagsAttr=tokens=>tokens.join(' ');

/* The chip bar both hubs share. Groups render in the given order; each chip
   is a real anchor so the bar still navigates without JavaScript. */
export function filterBarHTML({filters,unit,label,intro,count,emptyTitle,emptyBody,cross}){
 const groups=Object.entries(filters).map(([group,chips])=>
  `<div class="hub-filter-row" data-filter-group="${esc(group)}"><span class="hub-filter-label" id="hub-filter-${esc(group)}">${esc(group)}</span><div class="hub-chips" role="group" aria-labelledby="hub-filter-${esc(group)}">${chips.map(([token,text,href])=>`<a class="hub-chip" href="${esc(href)}" data-filter="${esc(token)}" data-group="${esc(group)}">${esc(text)}</a>`).join('')}</div></div>`).join('');
 return `<div class="hub-filters" data-hub-filters data-unit="${esc(unit)}" role="group" aria-label="${esc(label)}">
 <div class="hub-filters-head"><span class="eyebrow">FIND THE RIGHT ONE</span><p class="fc-hint">${intro}</p></div>
 ${groups}
 <div class="hub-filter-meta"><span class="hub-count" data-filter-count aria-live="polite">Showing all ${count} ${esc(unit)}</span><button type="button" class="hub-clear" data-filter-clear hidden>Clear all filters</button>${cross?`<a class="hub-cross" href="${esc(cross.href)}">${esc(cross.text)} <span aria-hidden="true">↗</span></a>`:''}</div>
</div>
<div class="hub-empty" data-filters-empty hidden><strong>${esc(emptyTitle)}</strong><p>${esc(emptyBody)}</p></div>`;
}
