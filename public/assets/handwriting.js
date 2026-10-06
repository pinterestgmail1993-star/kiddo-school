
(()=>{
 const canvas=document.getElementById('handwriting'); if(!canvas)return; const ctx=canvas.getContext('2d');
 const practice=document.getElementById('practice'),status=document.getElementById('writing-status'),undo=document.getElementById('undo');
 let pen='#803bab',size=6,showGuides=true,strokes=[],history=[],active=null,width=900,height=310;
 const prompts={a:'Start at the top. Down one side, down the other, then across.',numbers:'Trace the numbers, then try writing them in your own space.',name:'Say each letter of your name as you write it. Take your time.',free:'Write a word, draw a shape, or tell a tiny story with pictures.'};
 function snapshot(){history.push({strokes:JSON.parse(JSON.stringify(strokes)),practice:practice.value});if(history.length>60)history.shift();undo.disabled=false;}
 function render(){
  ctx.clearRect(0,0,width,height);ctx.fillStyle='#fffefb';ctx.fillRect(0,0,width,height);
  if(showGuides){ctx.lineWidth=1;ctx.strokeStyle='#dfc5ec';for(let y=75;y<height;y+=70){ctx.beginPath();ctx.moveTo(18,y);ctx.lineTo(width-18,y);ctx.stroke();ctx.setLineDash([5,6]);ctx.beginPath();ctx.moveTo(18,y-35);ctx.lineTo(width-18,y-35);ctx.stroke();ctx.setLineDash([]);}ctx.strokeStyle='#f1b8d7';ctx.beginPath();ctx.moveTo(35,10);ctx.lineTo(35,height-10);ctx.stroke();}
  if(practice.value==='a'||practice.value==='numbers'){ctx.fillStyle='#e6d9ee';ctx.font='bold '+Math.min(width*.26,160)+'px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(practice.value==='a'?'A  a':'1  2  3',width/2,height*.46);}
  for(const stroke of strokes){ctx.strokeStyle=stroke.color;ctx.fillStyle=stroke.color;ctx.lineWidth=stroke.size;ctx.lineCap='round';ctx.lineJoin='round';const pts=stroke.points;if(!pts.length)continue;ctx.beginPath();ctx.moveTo(pts[0].x*width,pts[0].y*height);for(const p of pts.slice(1))ctx.lineTo(p.x*width,p.y*height);ctx.stroke();if(pts.length===1){ctx.beginPath();ctx.arc(pts[0].x*width,pts[0].y*height,stroke.size/2,0,Math.PI*2);ctx.fill();}}
 }
 function resize(){const rect=canvas.getBoundingClientRect(),dpr=window.devicePixelRatio||1;width=rect.width;height=rect.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);render();}
 function point(e){const r=canvas.getBoundingClientRect();return{x:Math.min(1,Math.max(0,(e.clientX-r.left)/r.width)),y:Math.min(1,Math.max(0,(e.clientY-r.top)/r.height))};}
 canvas.addEventListener('pointerdown',e=>{if(active!==null||(e.pointerType==='mouse'&&e.button!==0))return;e.preventDefault();snapshot();active=e.pointerId;canvas.setPointerCapture(e.pointerId);strokes.push({color:pen,size,points:[point(e)]});render();});
 canvas.addEventListener('pointermove',e=>{if(e.pointerId!==active)return;e.preventDefault();const events=e.getCoalescedEvents?e.getCoalescedEvents():[e];for(const ev of events.length?events:[e])strokes.at(-1).points.push(point(ev));render();});
 function finish(e){if(e.pointerId!==active)return;active=null;status.textContent='Nice exploring. Keep going, or save your picture.';}
 canvas.addEventListener('pointerup',finish);canvas.addEventListener('pointercancel',finish);canvas.addEventListener('lostpointercapture',finish);
 document.querySelectorAll('[data-pen]').forEach(button=>button.addEventListener('click',()=>{pen=button.dataset.pen;document.querySelectorAll('[data-pen]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
 document.getElementById('pen-size').addEventListener('change',e=>size=Number(e.target.value));
 undo.addEventListener('click',()=>{if(!history.length)return;active=null;const last=history.pop();strokes=last.strokes;practice.value=last.practice;previousPractice=last.practice;document.getElementById('practice-prompt').textContent=prompts[practice.value];undo.disabled=!history.length;render();status.textContent='Undone. You can try again.';});
 document.getElementById('clear').addEventListener('click',()=>{snapshot();active=null;strokes=[];render();status.textContent='A fresh page. Undo can bring your drawing back.';});
 let previousPractice=practice.value;
 practice.addEventListener('change',()=>{history.push({strokes:JSON.parse(JSON.stringify(strokes)),practice:previousPractice});if(history.length>60)history.shift();undo.disabled=false;previousPractice=practice.value;active=null;strokes=[];document.getElementById('practice-prompt').textContent=prompts[practice.value];render();status.textContent='New activity ready. Undo can bring your previous page back.';});
 document.getElementById('guides').addEventListener('click',e=>{showGuides=!showGuides;e.target.setAttribute('aria-pressed',String(showGuides));e.target.textContent='Guide lines: '+(showGuides?'on':'off');render();});
 document.getElementById('save').addEventListener('click',()=>{canvas.toBlob(blob=>{if(!blob){status.textContent='Could not save. Please try again.';return;}const link=document.createElement('a'),url=URL.createObjectURL(blob);link.href=url;link.download='my-kiddo-writing.png';link.click();setTimeout(()=>URL.revokeObjectURL(url),1500);status.textContent='Your picture is ready to download as a PNG image.';},'image/png');});
 new ResizeObserver(resize).observe(canvas);resize();
})();
