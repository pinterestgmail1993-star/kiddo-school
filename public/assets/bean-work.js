(()=>{
 const root=document.querySelector('[data-bean-work]');if(!root)return;
 const status=root.querySelector('.bean-status'),pen=root.querySelector('#bean-pen'),size=root.querySelector('#bean-size');
 const boards=[];
 root.querySelectorAll('[data-task]').forEach(section=>{
  const canvas=section.querySelector('canvas'),ctx=canvas.getContext('2d'),undo=section.querySelector('[data-undo]');
  let strokes=[],history=[],active=null,w=800,h=260;
  function draw(){ctx.clearRect(0,0,w,h);ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);for(const s of strokes){ctx.strokeStyle=s.color;ctx.fillStyle=s.color;ctx.lineWidth=s.size;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();s.points.forEach((p,i)=>i?ctx.lineTo(p.x*w,p.y*h):ctx.moveTo(p.x*w,p.y*h));ctx.stroke();if(s.points.length===1){ctx.beginPath();ctx.arc(s.points[0].x*w,s.points[0].y*h,s.size/2,0,Math.PI*2);ctx.fill();}}}
  function resize(){const r=canvas.getBoundingClientRect();w=r.width;h=r.height;const d=devicePixelRatio||1;canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);draw();}
  function remember(){history.push(JSON.parse(JSON.stringify(strokes)));if(history.length>60)history.shift();undo.disabled=false;}
  function point(e){const r=canvas.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),y:Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))};}
  canvas.addEventListener('pointerdown',e=>{if(active!==null||(e.pointerType==='mouse'&&e.button!==0))return;e.preventDefault();remember();active=e.pointerId;canvas.setPointerCapture(active);strokes.push({color:pen.value,size:Number(size.value),points:[point(e)]});draw();});
  canvas.addEventListener('pointermove',e=>{if(e.pointerId!==active)return;e.preventDefault();const events=e.getCoalescedEvents?e.getCoalescedEvents():[e];for(const p of events.length?events:[e])strokes.at(-1).points.push(point(p));draw();});
  function end(e){if(e.pointerId===active){active=null;status.textContent='Keep exploring. Save your whole activity to keep your drawings and words.';}}
  ['pointerup','pointercancel','lostpointercapture'].forEach(t=>canvas.addEventListener(t,end));
  undo.addEventListener('click',()=>{if(!history.length)return;active=null;strokes=history.pop();undo.disabled=!history.length;draw();status.textContent='Drawing restored.';});
  section.querySelector('[data-clear]').addEventListener('click',()=>{remember();active=null;strokes=[];draw();status.textContent='Drawing cleared. Undo restores it. Your typed answers are unchanged.';});
  new ResizeObserver(resize).observe(canvas);resize();boards.push({section,canvas,hasMarks:()=>strokes.length>0});
 });
 function wrap(ctx,text,maxWidth){const lines=[];for(const paragraph of text.split('\n')){let line='';for(const char of paragraph){if(ctx.measureText(line+char).width>maxWidth){lines.push(line);line=char;}else line+=char;}lines.push(line);}return lines;}
 root.querySelector('[data-export]').addEventListener('click',()=>{
  const out=document.createElement('canvas');out.width=1400;const ctx=out.getContext('2d');ctx.font='24px Arial';
  const title=document.querySelector('h1').textContent;const records=boards.map(({section,canvas})=>({title:section.querySelector('h2').textContent,canvas,fields:[...section.querySelectorAll('textarea')].map(t=>({label:section.querySelector('label[for="'+t.id+'"]').firstChild.textContent,lines:wrap(ctx,t.value||'(not filled in)',1240)}))}));
  out.height=200+records.reduce((n,r)=>n+465+r.fields.reduce((a,f)=>a+45+f.lines.length*32,0),0)+80;
  ctx.fillStyle='white';ctx.fillRect(0,0,out.width,out.height);ctx.fillStyle='#713276';ctx.font='bold 44px Arial';ctx.fillText(title,60,80);ctx.font='24px Arial';ctx.fillText('kiddo.school · My plant investigation',60,125);let y=185;
  for(const r of records){ctx.fillStyle='#713276';ctx.font='bold 30px Arial';ctx.fillText(r.title,60,y);y+=25;ctx.strokeStyle='#dfc4e8';ctx.strokeRect(60,y,1280,340);const scale=Math.min(1270/r.canvas.width,330/r.canvas.height);const dw=r.canvas.width*scale,dh=r.canvas.height*scale;ctx.drawImage(r.canvas,65+(1270-dw)/2,y+5+(330-dh)/2,dw,dh);y+=375;for(const f of r.fields){ctx.fillStyle='#713276';ctx.font='bold 23px Arial';ctx.fillText(f.label,60,y);y+=33;ctx.fillStyle='#46334d';ctx.font='24px Arial';for(const line of f.lines){ctx.fillText(line,60,y);y+=32;}y+=12;}y+=35;}
  ctx.fillStyle='#713276';ctx.font='22px Arial';ctx.fillText('kiddo.school',60,out.height-35);
  out.toBlob(blob=>{if(!blob){status.textContent='The image could not be saved. Try your browser Print command instead.';return;}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=root.dataset.beanWork+'-my-work.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);status.textContent='Your drawings and typed answers are ready to download together.';},'image/png');
 });
})();
