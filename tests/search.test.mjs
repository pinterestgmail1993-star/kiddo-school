import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const html=readFileSync('dist/activities/index.html','utf8');
const code=readFileSync('dist/assets/site.js','utf8');
// Run the shipped script against controls and card attributes from the built HTML.
// This exercises filtering behavior; it does not replace a real-browser layout check.
function harness(search=''){
 const cards=[...html.matchAll(/<article class="activity-card" data-subject="([^"]+)" data-ages="([^"]+)" data-search="([^"]+)"/g)].map(m=>({dataset:{subject:m[1],ages:m[2],search:m[3]},hidden:false}));
 const control=(options=[])=>({value:'',options:options.map(value=>({value})),focus(){this.focused=true;}});
 const q=control(),subject=control(['','art','science','nature','maths','literacy','engineering']),age=control(['','3-5','6-8','9-12']);
 const events={};const clear={addEventListener(event,fn){this[event]=fn;}};
 const form={elements:{q,subject,age},addEventListener(event,fn){events[event]=fn;},reset(){q.value='';subject.value='';age.value='';events.reset();}};
 const count={},empty={};let lastUrl='';
 const catalogue={querySelector:s=>s==='form'?form:clear,querySelectorAll:()=>cards};
 const document={querySelector:s=>s==='[data-catalogue]'?catalogue:s==='#result-count'?count:empty};
 runInNewContext(code,{document,location:{search,pathname:'/activities/',hash:''},history:{replaceState(a,b,url){lastUrl=url;}},URLSearchParams,requestAnimationFrame:fn=>fn()});
 return{cards,q,subject,age,events,clear,count,empty,get visible(){return cards.filter(c=>!c.hidden);},get url(){return lastUrl;}};
}
test('keyword matching, whitespace/case normalization, combined filters and empty state',()=>{
 const ui=harness();assert.equal(ui.visible.length,10);
 ui.q.value='  BEAN  ';ui.events.input();assert.equal(ui.visible.length,1);assert.equal(ui.visible[0].dataset.subject,'science');
 ui.age.value='3-5';ui.events.change();assert.equal(ui.visible.length,0);assert.equal(ui.empty.hidden,false);assert.match(ui.count.textContent,/0 activities/);
 ui.clear.click();assert.equal(ui.visible.length,10);assert.equal(ui.url,'/activities/');assert.ok(ui.q.focused);
 ui.subject.value='art';ui.age.value='6-8';ui.q.value='paper shapes';ui.events.input();assert.equal(ui.visible.length,1);
 ui.q.value='<script>alert(1)</script>';ui.events.input();assert.equal(ui.visible.length,0);assert.match(ui.url,/%3Cscript%3E/);
});
test('deep-linked search, invalid filters, form submit and reset',()=>{
 const ui=harness('?q=bridge&subject=engineering&age=9-12');assert.equal(ui.visible.length,1);
 let prevented=false;ui.events.submit({preventDefault(){prevented=true;}});assert.ok(prevented);assert.match(ui.url,/subject=engineering/);
 ui.clear.click();assert.equal(ui.visible.length,10);assert.equal(ui.subject.value,'');assert.equal(ui.q.value,'');
 const bad=harness('?subject=unknown&age=999');assert.equal(bad.visible.length,10);
});
