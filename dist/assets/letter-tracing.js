/* Kiddo School — letter tracing player (on /flashcards/alphabet/letter-x/).
   Every letter page ships two static SVG guides (uppercase + lowercase)
   built from verified letterforms, with a JSON mount describing each
   stroke's path, numbered start and direction. This script upgrades each
   guide into a step-by-step tracing player:

   - strokes must be traced in teaching order; the current stroke is the
     only one listening, its outline softly highlighted;
   - the child traces with finger, stylus or mouse (Pointer Events,
     touch-action none, coalesced events so fast fingers stay accurate);
   - a stroke completes when its traced coverage passes a forgiving
     threshold, snaps to the true letterform and the next stroke unlocks;
   - Clear resets everything; status lines stay calm and specific.
   Without JavaScript the static guides remain the whole lesson. No scores,
   no timers, nothing stored. */
(function(){
 'use strict';
 if(typeof document.querySelectorAll!=='function')return; // search test harness
 var blocks=[].slice.call(document.querySelectorAll('[data-at-block]'));
 if(!blocks.length)return;
 var SVGNS='http://www.w3.org/2000/svg';
 var REVEAL='#2f7d4f';
 var ACTIVE='#e0a63c';
 var TRAIL='#c9452c';

 blocks.forEach(function(block){
  var letter=block.getAttribute('data-at-letter');
  var which=block.getAttribute('data-at-case');
  var mount=block.querySelector('script[type="application/json"][data-at-data]');
  var stage=block.querySelector('[data-at-stage]');
  var status=block.querySelector('[data-at-status]');
  var clearBtn=block.querySelector('[data-at-clear]');
  if(!mount||!stage)return;
  var layout;
  try{layout=JSON.parse(mount.textContent);}catch(e){return;}
  var strokes=layout.strokes||[];
  if(!strokes.length)return;

  /* build the interactive svg from the same layout the static svg used */
  var svg=document.createElementNS(SVGNS,'svg');
  svg.setAttribute('viewBox','0 0 '+layout.w+' '+layout.h);
  svg.setAttribute('class','at-svg at-live');
  svg.setAttribute('role','img');
  svg.setAttribute('aria-label','Interactive tracing: '+(which==='up'?'uppercase':'lowercase')+' '+(which==='up'?letter.toUpperCase():letter)+', trace stroke '+1+' of '+strokes.length);
  function el(name,attrs){var n=document.createElementNS(SVGNS,name);for(var k in attrs)n.setAttribute(k,attrs[k]);return n;}
  var guides=el('g',{'class':'at-guides','aria-hidden':'true'});
  var topLine=which==='up'?28:68;
  guides.appendChild(el('line',{x1:8,x2:strokes[0].w-8,y1:topLine,y2:topLine}));
  guides.appendChild(el('line',{x1:8,x2:strokes[0].w-8,y1:128,y2:128}));
  svg.appendChild(guides);
  var gDone=el('g',{'class':'at-strokes','aria-hidden':'true'});
  var gMarks=el('g',{'class':'at-marks','aria-hidden':'true'});
  var gTrail=el('g',{'class':'at-trail','aria-hidden':'true'});
  svg.appendChild(gDone);svg.appendChild(gTrail);svg.appendChild(gMarks);

  var state=strokes.map(function(s){return{d:s,samples:[],covered:[],done:false,len:0};});
  var current=0,trail=null,lastPt=null;

  /* a hidden path per stroke to sample points with getPointAtLength */
  var measurer=el('svg',{width:0,height:0,style:'position:absolute','aria-hidden':'true'});
  var mroot=el('g',{});
  measurer.appendChild(mroot);
  var measure=strokes.map(function(s){
   var p=el('path',{d:s.d});
   mroot.appendChild(p);
   var len=p.getTotalLength(),n=Math.max(24,Math.round(len/5)),pts=[];
   for(var i=0;i<=n;i++){var pt=p.getPointAtLength(len*i/n);pts.push({x:pt.x,y:pt.y});}
   return{len:len,pts:pts};
  });
  state.forEach(function(st,i){st.samples=measure[i].pts;st.len=measure[i].len;st.covered=st.samples.map(function(){return false;});});
  var measWrap=el('div',{style:'width:0;height:0;overflow:hidden','aria-hidden':'true'});
  measWrap.appendChild(measurer);
  stage.appendChild(measWrap);

  function guidePathEl(){
   var g=el('g',{});
   state.forEach(function(st,i){
    var cls=st.done?'at-stroke-done':(i===current?'at-guide at-current':'at-guide');
    g.appendChild(el('path',{d:st.d,'class':cls}));
   });
   return g;
  }
  function marksEl(){
   var g=el('g',{'aria-hidden':'true'});
   state.forEach(function(st,i){
    var s=st.d;
    if(st.done||i===current){
     g.appendChild(el('line',{'class':'at-arrowline',x1:s.ax1,y1:s.ay1,x2:s.ax2,y2:s.ay2}));
     g.appendChild(el('polygon',{'class':'at-arrow',points:s.ap}));
     g.appendChild(el('circle',{'class':'at-num'+(i===current?' at-cur':''),cx:s.nx,cy:s.ny,r:11}));
     var t=document.createElementNS(SVGNS,'text');
     t.setAttribute('class','at-numtext');t.setAttribute('x',s.nx);t.setAttribute('y',s.ny+4.5);
     t.setAttribute('text-anchor','middle');t.textContent=i+1;
     g.appendChild(t);
    }
   });
   return g;
  }
  function drawStatic(){gDone.replaceChildren?gDone.replaceChildren(guidePathEl()):gDone.innerHTML='';gMarks.replaceChildren?gMarks.replaceChildren(marksEl()):gMarks.innerHTML='';}
  function say(msg){if(status)status.textContent=msg;}
  function announce(){
   svg.setAttribute('aria-label','Interactive tracing: '+(which==='up'?'uppercase':'lowercase')+' '+(which==='up'?letter.toUpperCase():letter)+', stroke '+(current+1)+' of '+state.length);
  }
  function doneAll(){return state.every(function(st){return st.done;});}
  function finishStroke(){
   var st=state[current];
   st.done=true;
   gTrail.replaceChildren?gTrail.replaceChildren(el('g',{})):gTrail.innerHTML='';
   trail=null;lastPt=null;
   if(current<state.length-1){
    current++;
    drawStatic();
    announce();
    say('Stroke '+current+' of '+state.length+' done. Now stroke '+(current+1)+' — start at the number '+(current+1)+'.');
   }else{
    drawStatic();
    announce();
    say('You traced the '+(which==='up'?'uppercase':'lowercase')+' '+letter+'! Clear it and trace it again anytime.');
    if(clearBtn)clearBtn.hidden=false;
   }
  }
  function svgPoint(evt){
   var pt=svg.createSVGPoint();pt.x=evt.clientX;pt.y=evt.clientY;
   return pt.matrixTransform(svg.getScreenCTM().inverse());
  }
  function markAround(p){
   var st=state[current];if(!st||st.done)return;
   var R=13,R2=R*R,hit=false;
   var pts=st.samples,cov=st.covered;
   for(var i=0;i<pts.length;i++){
    var dx=pts[i].x-p.x,dy=pts[i].y-p.y;
    if(dx*dx+dy*dy<=R2&&!cov[i]){cov[i]=true;hit=true;}
   }
   var covered=0;for(var j=0;j<cov.length;j++)if(cov[j])covered++;
   if(covered/cov.length>=0.8){finishStroke();return;}
   if(hit&&trail){
    trail.points.push({x:p.x,y:p.y});
    trail.el.setAttribute('points',trail.points.map(function(q){return q.x.toFixed(1)+','+q.y.toFixed(1);}).join(' '));
   }
  }
  function startTrail(p){
   gTrail.replaceChildren?gTrail.replaceChildren(el('g',{})):gTrail.innerHTML='';
   var pl=el('polyline',{fill:'none',stroke:TRAIL,'stroke-width':10,'stroke-linecap':'round','stroke-linejoin':'round',points:''});
   gTrail.appendChild(pl);
   trail={el:pl,points:[{x:p.x,y:p.y}]};
  }
  svg.addEventListener('pointerdown',function(e){
   var st=state[current];
   if(!st||st.done)return;
   e.preventDefault();
   try{svg.setPointerCapture(e.pointerId);}catch(err){}
   var p=svgPoint(e);
   startTrail(p);lastPt=p;markAround(p);
  });
  svg.addEventListener('pointermove',function(e){
   if(!trail)return;
   e.preventDefault();
   var evs=e.getCoalescedEvents?e.getCoalescedEvents():[e];
   if(!evs.length)evs=[e];
   for(var i=0;i<evs.length;i++){
    var p=svgPoint(evs[i]);
    /* bridge fast motion: sample between the previous and current point */
    if(lastPt){
     var dx=p.x-lastPt.x,dy=p.y-lastPt.y,d=Math.hypot(dx,dy),steps=Math.ceil(d/6);
     for(var s=1;s<=steps;s++)markAround({x:lastPt.x+dx*s/steps,y:lastPt.y+dy*s/steps});
     if(state[current]&&state[current].done){lastPt=null;return;}
    }
    lastPt=p;
   }
  });
  function endTrail(e){if(trail){trail=null;lastPt=null;}}
  svg.addEventListener('pointerup',endTrail);
  svg.addEventListener('pointercancel',endTrail);
  svg.addEventListener('lostpointercapture',endTrail);

  function reset(){
   current=0;trail=null;lastPt=null;
   state.forEach(function(st){st.covered=st.covered.map(function(){return false;});st.done=false;});
   drawStatic();
   gTrail.replaceChildren?gTrail.replaceChildren(el('g',{})):gTrail.innerHTML='';
   announce();
   say('Cleared. Start again at the number 1.');
  }
  if(clearBtn){
   clearBtn.hidden=false;
   clearBtn.addEventListener('click',reset);
  }
  /* the interactive board replaces the shipped static guide */
  stage.replaceChildren(svg);
  drawStatic();
  announce();
  say('Start at the number 1 and follow the arrow.');
 });
})();
