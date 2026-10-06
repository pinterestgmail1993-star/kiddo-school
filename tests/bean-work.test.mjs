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

test('sink or float pages have one worksheet preview, working export controls and correct safety',async()=>{
 const {sinkPages}=await import('../src/sink-project.mjs');
 for(const p of sinkPages){
  const html=readFileSync(`dist/science/sink-or-float/${p.slug}/index.html`,'utf8');
  assert.match(html,/data-export/);assert.match(html,/<textarea/);assert.match(html,/Keep your screen dry/);assert.doesNotMatch(html,/untreated planting beans/);
  assert.equal([...html.matchAll(new RegExp('<img[^>]+src="[^"]+/'+p.slug+'\\.webp"','g'))].length,1);
 }
 const html=readFileSync('dist/science/sink-or-float/index.html','utf8');assert.match(html,/sink-or-float-cover.webp/);assert.match(html,/foil-boat-challenge\//);
});

test('weather pages lead with one preview before the writing controls',async()=>{
 const {weatherPages}=await import('../src/weather-project.mjs');
 for(const p of weatherPages){
  const html=readFileSync(`dist/science/weather-journal/${p.slug}/index.html`,'utf8');
  assert.equal([...html.matchAll(new RegExp('<img[^>]+src="[^"]+/'+p.slug+'\\.webp"','g'))].length,1);
  assert.ok(html.indexOf('class="weather-visual"')<html.indexOf('class="bean-work-controls"'));
  assert.match(html,/data-export/);assert.match(html,/<textarea/);assert.match(html,/Never look directly at the sun/);
 }
});

test('colour activities use one portrait preview and paint-specific guidance',async()=>{
 const {colourPages}=await import('../src/colour-project.mjs');
 for(const p of colourPages){const html=readFileSync(`dist/art/mixing-colours/${p.slug}/index.html`,'utf8');
 assert.match(html,/activities\/art\/mixing-colours\//);assert.match(html,/washable child-safe paint/);assert.match(html,/data-export/);assert.match(html,/<textarea/);
 assert.equal([...html.matchAll(new RegExp('<img[^>]+src="[^"]+/'+p.slug+'\\.webp"','g'))].length,1);
 }
});

 test('shape pages keep one preview and provide drawing, typing and art guidance',async()=>{
 const {shapePages}=await import('../src/shape-project.mjs');
 for(const p of shapePages){const html=readFileSync(`dist/art/paper-shape-collage/${p.slug}/index.html`,'utf8');
 assert.match(html,/activities\/art\/shape-collage\//);assert.match(html,/adult helps with cutting/);assert.match(html,/data-export/);assert.match(html,/<textarea/);assert.match(html,/<canvas/);
 assert.equal([...html.matchAll(new RegExp('<img[^>]+src="[^"]+/'+p.slug+'\\.webp"','g'))].length,1);
 }
 });

test('sound activities use one preview, listening guidance and drawing controls',async()=>{
 const {soundPages}=await import('../src/sound-project.mjs');
 for(const p of soundPages){const html=readFileSync(`dist/nature/sound-map/${p.slug}/index.html`,'utf8');
 assert.match(html,/Never follow a sound/);assert.match(html,/data-export/);assert.match(html,/<textarea/);assert.match(html,/<canvas/);
 assert.equal([...html.matchAll(new RegExp('<img[^>]+src="[^"]+/'+p.slug+'\\.webp"','g'))].length,1);
 }
});

test('story activities offer one image preview, typing, drawing and save controls',async()=>{
 const {storyPages}=await import('../src/story-project.mjs');
 for(const p of storyPages){const html=readFileSync(`dist/literacy/story-map/${p.slug}/index.html`,'utf8');
 assert.match(html,/An adult helps cut character cards/);assert.match(html,/data-export/);assert.match(html,/<textarea/);assert.match(html,/<canvas/);
 assert.equal([...html.matchAll(new RegExp('<img[^>]+src="[^"]+/'+p.slug+'\\.webp"','g'))].length,1);
 }
});

test('bridge activities provide one preview, safe testing and recording controls',async()=>{
 const {bridgePages}=await import('../src/bridge-project.mjs');
 for(const p of bridgePages){const html=readFileSync(`dist/engineering/paper-bridge/${p.slug}/index.html`,'utf8');
 assert.match(html,/large lightweight blocks/);assert.match(html,/data-export/);assert.match(html,/<textarea/);assert.match(html,/<canvas/);
 assert.equal([...html.matchAll(new RegExp('<img[^>]+src="[^"]+/'+p.slug+'\\.webp"','g'))].length,1);
 }
});
