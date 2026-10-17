// Hub filter regression guards for /flashcards/ and /worksheets/.
//
// The owner asked for four filter axes — age, level, subject, skill — on
// both library walls, with easy navigation. These tests pin three things:
//
//  1. The taxonomy is complete: every set/category card on a wall carries
//     data-filters with at least one token from EACH of the four groups, and
//     every chip on the page matches at least one card (no dead chips).
//  2. The shipped markup is wired: bar, groups, chips with no-JS anchors,
//     count, clear button, empty state, and the hub-filters.js script tag.
//  3. The SHIPPED dist/assets/hub-filters.js behaves on the SHIPPED dist
//     pages: chips filter cards in place (AND across rows), empty shelves
//     fold away, the count stays honest, clear resets everything — and a
//     click on a card link bubbles through WITHOUT being swallowed
//     (the exact bug that once killed book navigation on the library).
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const GROUPS=['age','level','subject','skill'];
const PREFIX={age:'age-',level:'lvl-',subject:'subj-',skill:'skill-'};
const fcHtml=readFileSync('dist/flashcards/index.html','utf8');
const wsHtml=readFileSync('dist/worksheets/index.html','utf8');
const code=readFileSync('dist/assets/hub-filters.js','utf8');

const tokensOf=card=>card.getAttribute('data-filters').split(/\s+/).filter(Boolean);

/* ---- minimal DOM: attributes, hidden, classList, listeners, bubbling ----
   Every node shares ONE late-bound selector engine (matchesFn), installed by
   harness() — the real page queries at document AND root/section level. */
let matchesFn=null;
function el(tag,attrs={},parent=null){
 const listeners={};
 const classes=new Set();
 const node={
  tag,attrs,parent,hidden:false,scrolled:false,
  classList:{
   toggle:(c,on)=>{ if(on===undefined){classes.has(c)?classes.delete(c):classes.add(c);} else {on?classes.add(c):classes.delete(c);} },
   add:c=>classes.add(c),
   remove:c=>classes.delete(c),
   contains:c=>classes.has(c)
  },
  getAttribute:n=>(n in attrs)?attrs[n]:null,
  hasAttribute:n=>n in attrs,
  setAttribute:(n,v)=>{attrs[n]=String(v);},
  removeAttribute:n=>{delete attrs[n];},
  addEventListener:(t,fn)=>{(listeners[t]=listeners[t]||[]).push(fn);},
  dispatch(t,ev){ (listeners[t]||[]).forEach(fn=>fn(ev)); if(node.parent)node.parent.dispatch(t,ev); },
  scrollIntoView(){node.scrolled=true;},
  // sections answer their OWN [data-filters] children; everything else
  // delegates to the shared engine (root answers chips, document the rest)
  querySelectorAll:sel=>(node.cards&&sel==='[data-filters]')?node.cards:(matchesFn?matchesFn(sel):[]),
  querySelector:sel=>(matchesFn?matchesFn(sel)[0]:null)||null,
  listeners
 };
 return node;
}
const click=target=>{const ev={target,prevented:false,preventDefault(){ev.prevented=true;}};target.dispatch('click',ev);return ev;};

/* Build a hub out of the built HTML: bar chips, wall cards grouped into
   sections (flashcards) or flat (worksheets), count, clear, empty. */
function harness(html,{sectioned}){
 const root=el('div',{'data-hub-filters':'','data-unit':sectioned?'sets':'categories'});
 const chips=[...html.matchAll(/<a class="hub-chip" href="([^"]*)" data-filter="([^"]+)" data-group="([^"]+)">/g)]
  .map(m=>{const c=el('a',{href:m[1],'data-filter':m[2],'data-group':m[3],class:'hub-chip'},root);return c;});
 const countText=html.match(/<span class="hub-count" data-filter-count aria-live="polite">([^<]+)</)[1];
 const count=el('span',{'data-filter-count':'','aria-live':'polite'});
 count.textContent=countText;
 const clear=/data-filter-clear/.test(html)?el('button',{'data-filter-clear':'',hidden:true},root):null;
 const empty=/data-filters-empty/.test(html)?el('div',{'data-filters-empty':'',hidden:true}):null;
 // cards, assigned to their section by slicing the HTML between section starts
 const secStarts=sectioned
  ?[...html.matchAll(/<section class="fc-stage-sec" id="(fc-stage-\d+)" data-hub-section>/g)]
  :[];
 const sections=[];
 let all=[];
 const cursor=sectioned?secStarts.map(m=>m.index):[html.indexOf('class="ws-cats"')];
 const end=sectioned?html.indexOf('</main>'):html.indexOf('class="lesson-note"');
 const wall=html.slice(cursor[0],end>cursor[0]?end:undefined);
 secStarts.forEach((m,i)=>{
  // boundaries are relative to the wall slice, not the whole document
  const start=i===0?0:secStarts[i].index-cursor[0];
  const stop=i+1<secStarts.length?secStarts[i+1].index-cursor[0]:wall.length;
  const chunk=wall.slice(start,stop);
  const sec=el('section',{'data-hub-section':'',id:m[1]});
  const cards=[...chunk.matchAll(/<a class="fc-setcard" href="([^"]+)" data-filters="([^"]+)">/g)]
   .map(cm=>el('a',{class:'fc-setcard',href:cm[1],'data-filters':cm[2]},sec));
  sec.cards=cards;sections.push(sec);all=all.concat(cards);
 });
 if(!sectioned){
  const cards=[...wall.matchAll(/<a class="ws-cat[^"]*" href="([^"]+)" data-filters="([^"]+)">/g)]
   .map(cm=>el('a',{class:'ws-cat',href:cm[1],'data-filters':cm[2]}));
  all=cards;
 }
 const nodes=[root,...chips,...sections,...all,count,clear,empty].filter(Boolean);
 const matches=sel=>{
  if(sel==='[data-hub-filters]')return nodes.filter(n=>n===root);
  if(sel==='a[data-filter]')return chips;
  if(sel==='[data-filters]')return all;
  if(sel==='[data-hub-section]')return sections;
  if(sel==='[data-filter-count]')return [count];
  if(sel==='[data-filter-clear]')return clear?[clear]:[];
  if(sel==='[data-filters-empty]')return empty?[empty]:[];
  return [];
 };
 matchesFn=matches; // install the shared engine for every node
 const document={
  querySelector:sel=>matches(sel)[0]||null,
  querySelectorAll:sel=>matches(sel)
 };
 runInNewContext(code,{document,window:{matchMedia:()=>({matches:true})}});
 return {root,chips,sections,cards:all,count,clear,empty};
}

/* ---- 1. taxonomy completeness, on both walls ---- */
for(const [name,html,cardRe] of [
 ['flashcards hub',fcHtml,/<a class="fc-setcard" href="([^"]+)" data-filters="([^"]+)">/g],
 ['worksheets hub',wsHtml,/<a class="ws-cat[^"]*" href="([^"]+)" data-filters="([^"]+)">/g]
]){
 test(name+': every card carries age, level, subject AND skill tokens',()=>{
  const cards=[...html.matchAll(cardRe)];
  assert.ok(cards.length>=14,name+' has tagged cards');
  for(const [,href,tags] of cards){
   const toks=tags.split(/\s+/);
   for(const g of GROUPS)assert.ok(toks.some(t=>t.startsWith(PREFIX[g])),href+' is missing a '+g+' token');
  }
 });
 test(name+': every chip matches at least one card (no dead chips)',()=>{
  const chipToks=[...html.matchAll(/data-filter="([^"]+)" data-group="([^"]+)"/g)].map(m=>m[1]);
  assert.ok(chipToks.length>=20,'the bar ships a real chip set');
  const cardToks=[...html.matchAll(cardRe)].map(m=>m[2].split(/\s+/)).flat();
  for(const t of chipToks)assert.ok(cardToks.includes(t),'chip '+t+' matches nothing');
 });
 test(name+': chip hrefs are honest no-JS anchors',()=>{
  for(const m of html.matchAll(/<a class="hub-chip" href="([^"]*)" data-filter="[^"]+" data-group="([^"]+)">/g)){
   const [,href,g]=m;
   if(name==='flashcards hub'){
    assert.ok(/^#(fc-stage-\d+|all-sets)$/.test(href),g+' chip href '+href+' jumps to a real shelf');
   }else if(g==='subject'){
    assert.ok(/^\/(worksheets|worksheet-generator)\//.test(href),'subject chip opens its category page: '+href);
   }else{
    assert.equal(href,'#worksheet-cats',g+' chip jumps to the wall');
   }
  }
 });
}

/* ---- 2. shipped structure ---- */
test('flashcards hub: bar, four groups, nine shelves, count, clear, empty, script',()=>{
 const bar=fcHtml.match(/<div class="hub-filters" data-hub-filters data-unit="sets"[^>]*>/);
 assert.ok(bar,'the filter bar exists');
 assert.ok(bar[0].includes('aria-label="Filter the flashcard sets"'),'labelled for AT');
 for(const g of GROUPS)assert.ok(fcHtml.includes(`data-filter-group="${g}"`),'group '+g+' present');
 assert.equal([...fcHtml.matchAll(/data-hub-section/g)].length,9,'nine stage shelves');
 for(let i=0;i<9;i++)assert.ok(fcHtml.includes(`id="fc-stage-${i}"`),'shelf fc-stage-'+i+' has its anchor');
 assert.ok(fcHtml.includes('Showing all 49 sets'),'count says 49 sets');
 assert.ok(/<button type="button" class="hub-clear" data-filter-clear hidden>/.test(fcHtml),'clear ships hidden');
 assert.ok(fcHtml.includes('data-filters-empty'),'empty state present');
 assert.ok(/<script src="\/assets\/hub-filters\.js(\?v=\d+)?" defer><\/script>/.test(fcHtml),'script tag ships');
 assert.ok(fcHtml.includes('href="/worksheets/"'),'cross-link to the worksheets hub');
 assert.ok(!/<a class="fc-setcard" href="[^"]*">/.test(fcHtml),'no set card ships untagged');
});
test('worksheets hub: bar, four groups, fourteen tagged categories, script',()=>{
 const bar=wsHtml.match(/<div class="hub-filters" data-hub-filters data-unit="categories"[^>]*>/);
 assert.ok(bar,'the filter bar exists');
 for(const g of GROUPS)assert.ok(wsHtml.includes(`data-filter-group="${g}"`),'group '+g+' present');
 assert.equal([...wsHtml.matchAll(/<a class="ws-cat[^"]*" href="[^"]+" data-filters="/g)].length,14,'14 tagged category cards (8 subjects + 5 collections + generator)');
 assert.ok(wsHtml.includes('Showing all 14 categories'),'count says 14 categories');
 assert.ok(wsHtml.includes('data-filters-empty'),'empty state present');
 assert.ok(/<script src="\/assets\/hub-filters\.js(\?v=\d+)?" defer><\/script>/.test(wsHtml),'script tag ships');
 assert.ok(wsHtml.includes('href="/flashcards/"'),'cross-link to the flashcard wall');
});

/* ---- 3. behaviour of the SHIPPED script on the SHIPPED page ---- */
test('chips filter cards in place and fold empty shelves away',()=>{
 const h=harness(fcHtml,{sectioned:true});
 const age=h.chips.find(c=>c.getAttribute('data-filter')==='age-0-1');
 const ev=click(age);
 assert.ok(ev.prevented,'chip click prevents the anchor jump');
 const visible=h.cards.filter(c=>!c.hidden).map(c=>c.getAttribute('href'));
 assert.equal(visible.length,6,'six 0–1 sets stay visible');
 assert.ok(visible.includes('/flashcards/black-and-white-baby-cards/'));
 assert.ok(!visible.includes('/flashcards/sight-words/'),'sight words hide');
 assert.ok(h.sections[0].getAttribute('id')==='fc-stage-0');
 for(let i=0;i<3;i++)assert.ok(!h.sections[i].hidden,'shelf '+i+' stays (newborn, infant and baby sets are all 0–1)');
 for(let i=3;i<9;i++)assert.ok(h.sections[i].hidden,'shelf '+i+' folds away');
 assert.equal(h.count.textContent,'Showing 6 of 49 sets','count stays honest');
 assert.ok(age.classList.contains('is-on')&&age.getAttribute('aria-pressed')==='true','chip shows its on state');
 assert.ok(!h.clear.hidden,'clear appears');
 assert.ok(h.empty.hidden,'empty state stays hidden');
});
test('chips from different rows team up (AND), tapping again lets go',()=>{
 const h=harness(fcHtml,{sectioned:true});
 click(h.chips.find(c=>c.getAttribute('data-filter')==='age-4-5'));
 const animals=h.chips.find(c=>c.getAttribute('data-filter')==='subj-animals');
 click(animals);
 const visible=h.cards.filter(c=>!c.hidden).map(c=>c.getAttribute('href'));
 assert.deepEqual(visible,['/flashcards/animals-and-their-habitats/'],'Ages 4–5 + animals = the habitat set only');
 assert.equal(h.count.textContent,'Showing 1 of 49 sets');
 // tap the subject chip again — back to the age filter alone
 click(animals);
 const after=h.cards.filter(c=>!c.hidden);
 assert.equal(after.length,17,'seventeen Ages 4–5 sets return');
 assert.ok(!animals.classList.contains('is-on'),'chip let go');
 // tap the age chip again — everything back
 click(h.chips.find(c=>c.getAttribute('data-filter')==='age-4-5'));
 assert.equal(h.cards.filter(c=>!c.hidden).length,49,'whole wall returns');
 assert.ok(h.count.textContent.startsWith('Showing all 49'),'count resets');
 assert.ok(h.clear.hidden,'clear hides again');
 for(const s of h.sections)assert.ok(!s.hidden,'all shelves unfold');
});
test('a mix that matches nothing shows the empty state, never a blank wall',()=>{
 const h=harness(fcHtml,{sectioned:true});
 click(h.chips.find(c=>c.getAttribute('data-filter')==='age-0-1'));
 click(h.chips.find(c=>c.getAttribute('data-filter')==='subj-alphabet'));
 assert.equal(h.cards.filter(c=>!c.hidden).length,0,'baby + alphabet is honestly nothing');
 assert.ok(!h.empty.hidden,'empty state appears');
 assert.ok(h.sections.every(s=>s.hidden),'every shelf folds');
 assert.equal(h.count.textContent,'Showing 0 of 49 sets');
});
test('clear all filters resets everything in one tap',()=>{
 const h=harness(fcHtml,{sectioned:true});
 click(h.chips.find(c=>c.getAttribute('data-filter')==='skill-counting'));
 assert.ok(h.cards.some(c=>c.hidden));
 click(h.clear);
 assert.ok(h.cards.every(c=>!c.hidden),'every card visible again');
 for(const c of h.chips){assert.ok(!c.classList.contains('is-on'),'chip '+c.getAttribute('data-filter')+' released');}
 assert.ok(h.empty.hidden);
});
test('a click on a set card bubbles through without being swallowed',()=>{
 const h=harness(fcHtml,{sectioned:true});
 const card=h.cards.find(c=>c.getAttribute('href')==='/flashcards/phonics-and-beginning-sounds/');
 const ev=click(card);
 assert.ok(!ev.prevented,'the set link must navigate — preventDefault is fatal here');
 assert.ok(h.cards.every(c=>!c.hidden),'no card collapses from a card click');
 assert.ok(h.chips.every(c=>!c.classList.contains('is-on')),'no chip activates');
});
test('the worksheets hub filters its categories the same way',()=>{
 const h=harness(wsHtml,{sectioned:false});
 assert.equal(h.cards.length,14,'14 category cards under the bar');
 click(h.chips.find(c=>c.getAttribute('data-filter')==='age-1-2'));
 const visible=h.cards.filter(c=>!c.hidden).map(c=>c.getAttribute('href'));
 assert.deepEqual(visible,['/worksheets/toddler/matching-and-sorting/'],'Age 2 leaves the toddler collection only');
 assert.equal(h.count.textContent,'Showing 1 of 14 categories');
 click(h.chips.find(c=>c.getAttribute('data-filter')==='skill-matching'));
 assert.equal(h.cards.filter(c=>!c.hidden).length,1,'toddler matching also carries the matching skill');
 const ev=click(h.cards[0]);
 assert.ok(!ev.prevented,'category links navigate normally');
 click(h.clear);
 assert.equal(h.cards.filter(c=>!c.hidden).length,14);
});
