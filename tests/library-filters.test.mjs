// Library filter regression guards.
//
// The bug this pins down: shelf sections carry data-cat just like the filter
// chips do, so a selector of '[data-cat]' attached the chip click handler to
// every shelf section. Clicking any book card (cover, title, Read button)
// bubbled up to its shelf, whose handler called preventDefault() — killing
// the navigation — and toggled the category filter, collapsing the other
// shelves. Families had to right-click → open in a new tab to read a book.
//
// These tests run the SHIPPED dist/assets/library.js against the SHIPPED
// dist/learning-library/index.html structure and simulate real clicks,
// including a click that bubbles up from inside a shelf.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync('dist/learning-library/index.html','utf8');
const code=readFileSync('dist/assets/library.js','utf8');

/* Minimal DOM: enough for library.js — attributes, hidden, classList,
   listeners and click bubbling up a parent chain. */
let qsaFn=null; // late-bound selector engine, installed by harness()
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
  querySelectorAll:sel=>qsaFn?qsaFn(sel):[],
  querySelector:sel=>{
   if(sel==='[data-lib-section]:not([hidden])'){const open=qsaFn('[data-lib-section]').find(s=>!s.hidden);return open||null;}
   return null;
  },
  listeners
 };
 return node;
}
const click=target=>{const ev={target,prevented:false,preventDefault(){ev.prevented=true;}};target.dispatch('click',ev);return ev;};

/* Build the page structure out of the built HTML. */
function harness(){
 const root=el('section',{'data-library':'',id:'top'});
 const starts=[...html.matchAll(/<div class="lib-section lib-shelf" id="cat-([^"]+)" data-lib-section data-cat="([^"]+)">/g)];
 const nextMarker=html.indexOf('<p class="fc-hint">Looking for classes');
 const sections=starts.map((m,i)=>{
  const chunk=html.slice(m.index,i+1<starts.length?starts[i+1].index:nextMarker);
  const sec=el('div',{'data-lib-section':'','data-cat':m[2],id:'cat-'+m[1]},root);
  const cards=[...chunk.matchAll(/<article class="bookcard" data-lib-card data-age="([^"]+)"/g)]
   .map(cm=>{const card=el('article',{'data-lib-card':'','data-age':cm[1]},sec);
    // the Read link sits inside the card, inside the grid, inside the shelf
    const link=el('a',{href:'/library/books/'},card);
    card.link=link;return card;});
  sec.cards=cards;
  sec.hasEmpty=chunk.includes('data-lib-empty');
  return sec;
 });
 const chipAttrs=[...html.matchAll(/<a class="lib-age" href="#cat-([^"]+)" data-cat="([^"]+)"/g)].map(m=>m[2]);
 const catChips=chipAttrs.map(id=>el('a',{'data-cat':id,class:'lib-age'},root));
 const ageAttrs=[...html.matchAll(/data-age-chip="([^"]+)"/g)].map(m=>m[1]);
 const ageChips=ageAttrs.map(id=>el('a',{'data-age-chip':id,class:'lib-age'},root));
 const all=[root,...sections,...catChips,...ageChips,...sections.flatMap(s=>s.cards.flatMap(c=>[c,c.link]))];
 const matches=sel=>all.filter(n=>{
  if(sel==='[data-lib-section]')return 'data-lib-section' in n.attrs;
  if(sel==='[data-cat]')return 'data-cat' in n.attrs;
  if(sel==='a[data-cat]')return n.tag==='a'&&'data-cat' in n.attrs;
  if(sel==='[data-age-chip]')return 'data-age-chip' in n.attrs;
  if(sel==='a[data-age-chip]')return n.tag==='a'&&'data-age-chip' in n.attrs;
  return false;
 });
 qsaFn=matches; // every element (and document) shares one selector engine
 const document={
  querySelector:sel=>sel==='[data-library]'?root:null,
  querySelectorAll:sel=>matches(sel)
 };
 const ctx={document,window:{matchMedia:()=>({matches:true})}};
 runInNewContext(code,ctx);
 return {root,sections,catChips,ageChips};
}

test('filter chips select the four anchors only — never the shelf sections',()=>{
 const {sections,catChips,ageChips}=harness();
 assert.equal(sections.length,4,'four shelf sections');
 assert.equal(catChips.length,4,'four category chip anchors, sections excluded');
 assert.deepEqual(catChips.map(c=>c.getAttribute('data-cat')),['storybooks','educational','activity','life-skills']);
 assert.equal(ageChips.length,1,'one age chip anchor');
});

test('clicking a category chip filters the shelves; clicking again clears it',()=>{
 const {sections,catChips}=harness();
 const edu=catChips.find(c=>c.getAttribute('data-cat')==='educational');
 const ev=click(edu);
 assert.ok(ev.prevented,'chip click prevents the #anchor jump');
 const by=id=>sections.find(s=>s.getAttribute('data-cat')===id);
 assert.ok(!by('educational').hidden,'chosen shelf stays visible');
 for(const id of ['storybooks','activity','life-skills'])assert.ok(by(id).hidden,id+' shelf hides');
 assert.ok(edu.classList.contains('is-on'),'chip gains is-on');
 assert.equal(edu.getAttribute('aria-pressed'),'true');
 click(edu);
 for(const s of sections)assert.ok(!s.hidden,'second click clears the filter');
 assert.ok(!edu.classList.contains('is-on'));
 assert.ok(!edu.hasAttribute('aria-pressed'));
});

test('a click on a book card bubbles through the shelf without being swallowed',()=>{
 const {sections,catChips}=harness();
 const edu=sections.find(s=>s.getAttribute('data-cat')==='educational');
 const link=edu.cards[0].link;
 const ev=click(link);
 assert.ok(!ev.prevented,'the card link must navigate — preventDefault is fatal here');
 for(const s of sections)assert.ok(!s.hidden,'no shelf collapses from a card click');
 for(const c of catChips)assert.ok(!c.classList.contains('is-on'),'no chip activates');
});
