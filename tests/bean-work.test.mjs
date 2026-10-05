import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {beanPages} from '../src/bean-project.mjs';
test('seven independent project pages provide drawing and typed answers',()=>{
 assert.equal(beanPages.length,7);
 for(const p of beanPages){const html=readFileSync(`dist/science/grow-a-bean/${p.slug}/index.html`,'utf8');assert.match(html,/class="bean-canvas"/);assert.match(html,/<textarea/);assert.match(html,/data-export/);assert.match(html,/role="status"/);assert.equal([...html.matchAll(/<canvas /g)].length,p.tasks.length);}
});
test('pointer drawing, undo, clear and exported typed text use the shipped script',()=>{
 const events=()=>({handlers:{},addEventListener(t,f){this.handlers[t]=f;},click(){this.handlers.click?.();}});
 const paths=[],exported=[];
 const context={setTransform(){},clearRect(){paths.length=0;},fillRect(){},beginPath(){},moveTo(){},lineTo(x,y){paths.push([x,y]);},stroke(){},arc(){paths.push(['dot']);},fill(){},strokeRect(){},drawImage(){exported.push('drawing');},measureText(t){return{width:t.length*12};},fillText(t){exported.push(t);}};
 const canvas={...events(),getContext:()=>context,getBoundingClientRect:()=>({width:800,height:260,left:0,top:0}),setPointerCapture(){},toBlob(fn){fn({});}};
 const undo=events(),clear=events(),save=events(),status={};let clicked=false;
 const answer={id:'answer-0-0',value:'I see two green leaves.'};
 const section={querySelector:s=>s==='canvas'?canvas:s==='[data-undo]'?undo:s==='[data-clear]'?clear:s==='h2'?{textContent:'First look'}:{firstChild:{textContent:'I notice'}},querySelectorAll:()=>[answer]};
 const root={dataset:{beanWork:'my-plant-diary'},querySelector:s=>s==='.bean-status'?status:s==='#bean-pen'?{value:'#803bab'}:s==='#bean-size'?{value:'6'}:save,querySelectorAll:()=>[section]};
 const doc={querySelector:s=>s==='[data-bean-work]'?root:{textContent:'My Plant Diary'},createElement:t=>t==='canvas'?canvas:{click(){clicked=true;}}};
 runInNewContext(readFileSync('public/assets/bean-work.js','utf8'),{document:doc,devicePixelRatio:1,ResizeObserver:class{constructor(fn){this.fn=fn;}observe(){this.fn();}},URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},setTimeout:fn=>fn()});
 const event=(x,y,type='pen')=>({pointerId:1,pointerType:type,button:0,clientX:x,clientY:y,preventDefault(){}});
 canvas.handlers.pointerdown(event(50,50));canvas.handlers.pointermove(event(90,90));canvas.handlers.pointerup(event(90,90));assert.ok(paths.some(p=>p[0]===90));
 clear.click();assert.equal(paths.length,0);assert.equal(answer.value,'I see two green leaves.');undo.click();assert.ok(paths.some(p=>p[0]===90));
 save.click();assert.ok(clicked);assert.ok(exported.includes(answer.value));assert.ok(exported.includes('drawing'));assert.match(status.textContent,/download together/);
});
