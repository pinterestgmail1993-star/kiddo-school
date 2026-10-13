/* Kiddo worksheet generator — tracing & matching machines (page logic).
   Consumes globalThis.WSGEN. CSP law kept: external file, addEventListener
   only, no inline styles/handlers — SVG uses attributes, never style. */
(function(){
'use strict';
var W=window.WSGEN;
if(!W)return;

/* ---------- tiny helpers ---------- */
function $(id){return document.getElementById(id);}
function el(tag,cls,text){
 var e=document.createElement(tag);
 if(cls)e.className=cls;
 if(text!==undefined)e.textContent=text;
 return e;
}
function listen(id,fn){var e=$(id);if(e)e.addEventListener('click',fn);}
function onChange(id,fn){var e=$(id);if(e)e.addEventListener('change',fn);}
function onInput(id,fn){var e=$(id);if(e)e.addEventListener('input',fn);}
function slug(t){
 return String(t).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'worksheet';
}

/* ---------- state ---------- */
var state={
 seed:1,
 trace:null,  traceSolveIdx:0, traceDone:{},
 match:null,  matchSolve:false, matchDone:{}, matchPick:null
};

/* ================= TRACING ================= */
function titleCase(name){
 return name.split(' ').map(function(w){return w?w.charAt(0)+w.slice(1).toLowerCase():w;}).join(' ');
}
function traceRows(){
 var mode=document.querySelector('input[name="wsgen-tmode"]:checked').value;
 var rows=[];
 if(mode==='letters'){
  var raw=W.parseTrace($('wsgen-tletters').value.replace(/[^A-Za-z]/g,''),10).replace(/ /g,'');
  var lower=document.querySelector('input[name="wsgen-tcase"]:checked').value==='lower';
  rows=(raw||'ABCDEFGH').split('').map(function(ch){return {text:lower?ch.toLowerCase():ch,kind:'char'};});
 }else if(mode==='numbers'){
  rows='0123456789'.split('').map(function(ch){return {text:ch,kind:'char'};});
 }else if(mode==='name'){
  var name=W.parseTrace($('wsgen-tname').value,12);
  rows=[{text:name?titleCase(name):'Kiddo',kind:'name'},
        {text:name?titleCase(name):'Kiddo',kind:'name'},
        {text:name?titleCase(name):'Kiddo',kind:'name'}];
 }else{
  var shelf=W.TRACE_SHELVES[$('wsgen-tshelf').value]||W.TRACE_SHELVES.colors;
  rows=shelf.map(function(w2){return {text:w2,kind:'word'};});
 }
 return rows;
}

/* one tracing row as SVG: solid example + dashed shapes to follow.
   Layout slots: chars solid x=24, dashes 190/330/470 · words solid 24,
   dashes 234/430 · names solid 24, dash 330 (bigger letters). */
var SVGNS='http://www.w3.org/2000/svg';
function svgNode(tag){return document.createElementNS(SVGNS,tag);}
function traceRowSvg(row){
 var t=row.text;
 var svg=svgNode('svg');
 svg.setAttribute('viewBox','0 0 640 88');
 svg.setAttribute('class','wsgen-trace-row');
 svg.setAttribute('role','img');
 svg.setAttribute('aria-label','Trace '+t);
 var base=svgNode('line');
 base.setAttribute('x1','14');base.setAttribute('y1','74');
 base.setAttribute('x2','626');base.setAttribute('y2','74');
 base.setAttribute('stroke','#e7ddc8');base.setAttribute('stroke-width','2');
 svg.appendChild(base);
 var fs;
 if(row.kind==='char')fs=64;
 else if(row.kind==='name')fs=Math.max(26,Math.min(58,Math.floor(290/(t.length*0.62))));
 else fs=Math.max(26,Math.min(62,Math.floor(180/(t.length*0.62))));
 var dashes=row.kind==='char'?[190,330,470]:(row.kind==='name'?[330]:[234,430]);
 var solid=svgNode('text');
 solid.setAttribute('x','24');solid.setAttribute('y','74');
 solid.setAttribute('font-size',String(fs));
 solid.setAttribute('font-family','system-ui, sans-serif');
 solid.setAttribute('font-weight','600');
 solid.setAttribute('fill','#2b2b2b');
 solid.textContent=t;
 svg.appendChild(solid);
 dashes.forEach(function(dx){
  var d=svgNode('text');
  d.setAttribute('x',String(dx));d.setAttribute('y','74');
  d.setAttribute('font-size',String(fs));
  d.setAttribute('font-family','system-ui, sans-serif');
  d.setAttribute('font-weight','600');
  d.setAttribute('fill','none');
  d.setAttribute('stroke','#8a8172');
  d.setAttribute('stroke-width','2.5');
  d.setAttribute('stroke-dasharray','7 7');
  d.textContent=t;
  svg.appendChild(d);
 });
 return svg;
}

function buildTrace(fresh){
 if(fresh)state.seed=(Math.random()*4294967296)>>>0;
 state.trace={rows:traceRows(),title:$('wsgen-ttitle').value.trim()||'Tracing Practice'};
 state.traceDone={};state.traceSolveIdx=0;
 renderTrace();
 renderTraceChips();
 drawPad();
 $('wsgen-trace-status').textContent='';
}
function renderTrace(){
 var t=state.trace;if(!t)return;
 var host=$('wsgen-trace-sheet');
 host.textContent='';
 var head=el('div','wsgen-sheet-head');
 head.appendChild(el('h3','wsgen-sheet-title',t.title));
 head.appendChild(el('p','wsgen-sheet-sub','Name: ______________        Date: ____________'));
 host.appendChild(head);
 t.rows.forEach(function(row){host.appendChild(traceRowSvg(row));});
 host.appendChild(el('p','wsgen-sheet-foot','Made at kiddo.school'));
}
function renderTraceChips(){
 var t=state.trace;if(!t)return;
 var wrap=$('wsgen-trace-chips');
 wrap.textContent='';
 t.rows.forEach(function(row,i){
  var b=el('button','wsgen-trace-chip'+(i===state.traceSolveIdx?' is-cur':'')+(state.traceDone[i]?' is-done':''),row.text);
  b.type='button';
  b.setAttribute('aria-label','Trace '+row.text);
  b.addEventListener('click',function(){
   state.traceSolveIdx=i;renderTraceChips();drawPad();
  });
  wrap.appendChild(b);
 });
}

/* ---------- the finger-tracing pad ---------- */
function padFont(t){
 return Math.min(230,Math.floor(500/(Math.max(1,t.length)*0.62)));
}
function drawPad(){
 var cv=$('wsgen-trace-canvas');if(!cv||!state.trace)return;
 var x=cv.getContext('2d');
 x.setLineDash([]);x.globalAlpha=1;
 x.fillStyle='#ffffff';x.fillRect(0,0,cv.width,cv.height);
 x.strokeStyle='#e7ddc8';x.lineWidth=3;
 x.beginPath();x.moveTo(20,cv.height-46);x.lineTo(cv.width-20,cv.height-46);x.stroke();
 var t=state.trace.rows[state.traceSolveIdx]?state.trace.rows[state.traceSolveIdx].text:'A';
 x.font='600 '+padFont(t)+'px system-ui, sans-serif';
 x.textAlign='center';x.textBaseline='middle';
 x.setLineDash([10,12]);x.strokeStyle='#8a8172';x.lineWidth=3;
 x.strokeText(t,cv.width/2,cv.height/2-14);
 x.setLineDash([]);
}
function padPos(e){
 var cv=$('wsgen-trace-canvas');
 var r=cv.getBoundingClientRect();
 return {x:(e.clientX-r.left)*cv.width/r.width,y:(e.clientY-r.top)*cv.height/r.height};
}
function padStatus(msg){
 var t=state.trace;if(!t)return;
 var n=Object.keys(state.traceDone).length;
 $('wsgen-trace-status').textContent=msg||(n+' of '+t.rows.length+' traced — follow the dashed shape.');
}
function initPad(){
 var cv=$('wsgen-trace-canvas');if(!cv)return;
 var drawing=false,last=null,moved=0;
 cv.addEventListener('pointerdown',function(e){
  drawing=true;moved=0;last=padPos(e);
  try{cv.setPointerCapture(e.pointerId);}catch(err){}
 });
 cv.addEventListener('pointermove',function(e){
  if(!drawing)return;
  var p=padPos(e);
  moved+=Math.abs(p.x-last.x)+Math.abs(p.y-last.y);
  var x=cv.getContext('2d');
  x.globalAlpha=0.5;x.strokeStyle='#e2574c';x.lineWidth=30;
  x.lineCap='round';x.lineJoin='round';
  x.beginPath();x.moveTo(last.x,last.y);x.lineTo(p.x,p.y);x.stroke();
  x.globalAlpha=1;
  last=p;
 });
 function finish(){
  if(drawing&&moved>60){
   state.traceDone[state.traceSolveIdx]=true;
   renderTraceChips();
   var t=state.trace,n=Object.keys(state.traceDone).length;
   if(n===t.rows.length)padStatus('You traced them all — great writing!');
   else padStatus('Nice tracing! '+(n+' of '+t.rows.length+' done.'));
  }
  drawing=false;
 }
 cv.addEventListener('pointerup',finish);
 cv.addEventListener('pointercancel',finish);
 listen('wsgen-trace-clear',function(){drawPad();});
 listen('wsgen-trace-next',function(){
  var t=state.trace;if(!t)return;
  state.traceSolveIdx=(state.traceSolveIdx+1)%t.rows.length;
  renderTraceChips();drawPad();
 });
}

/* ---------- tracing: PNG (A4 @150dpi) + print ---------- */
var PAGE_W=1240,PAGE_H=1754,MARGIN=90;
function traceCanvas(){
 var t=state.trace;
 var c=document.createElement('canvas');
 c.width=PAGE_W;c.height=PAGE_H;
 var x=c.getContext('2d');
 x.fillStyle='#ffffff';x.fillRect(0,0,PAGE_W,PAGE_H);
 x.fillStyle='#1f1f1f';x.textAlign='center';x.textBaseline='alphabetic';
 x.font='700 54px system-ui, sans-serif';
 x.fillText(t.title,PAGE_W/2,120);
 x.font='400 30px system-ui, sans-serif';x.textAlign='left';
 x.fillText('Name: ______________        Date: ____________',MARGIN,180);
 var top=250,availH=PAGE_H-top-220;
 var s=Math.min(1.656,availH/(88*t.rows.length));
 var rowH=88*s;
 t.rows.forEach(function(row,i){
  var by=top+i*rowH+74*s;
  x.strokeStyle='#e7ddc8';x.lineWidth=2;
  x.beginPath();x.moveTo(MARGIN,by+12*s);x.lineTo(PAGE_W-MARGIN,by+12*s);x.stroke();
  var txt=row.text,fs;
  if(row.kind==='char')fs=64;
  else if(row.kind==='name')fs=Math.max(26,Math.min(58,Math.floor(290/(txt.length*0.62))));
  else fs=Math.max(26,Math.min(62,Math.floor(180/(txt.length*0.62))));
  var dashes=row.kind==='char'?[190,330,470]:(row.kind==='name'?[330]:[234,430]);
  var f=fs*s;
  x.font='600 '+Math.round(f)+'px system-ui, sans-serif';
  x.fillStyle='#2b2b2b';
  x.fillText(txt,MARGIN+24*s,by);
  x.setLineDash([7,8]);x.strokeStyle='#8a8172';x.lineWidth=2.5;
  dashes.forEach(function(dx){x.strokeText(txt,MARGIN+dx*s,by);});
  x.setLineDash([]);
 });
 x.fillStyle='#8a8172';x.font='400 26px system-ui, sans-serif';x.textAlign='center';
 x.fillText('Made at kiddo.school',PAGE_W/2,PAGE_H-60);
 return c;
}
function tracePrintRows(sheet){
 state.trace.rows.forEach(function(row){sheet.appendChild(traceRowSvg(row));});
}
function doPrintTrace(){
 var t=state.trace;if(!t)return;
 var old=$('wsgen-print');if(old)old.remove();
 var root=document.createElement('div');root.id='wsgen-print';
 var sheet=document.createElement('div');sheet.className='wsgen-print-sheet';
 var h=document.createElement('h1');h.textContent=t.title;
 var sub=document.createElement('p');sub.className='wsgen-print-sub';
 sub.textContent='Name: ______________        Date: ____________';
 sheet.appendChild(h);sheet.appendChild(sub);
 var rows=document.createElement('div');rows.className='wsgen-print-trace';
 tracePrintRows(rows);
 sheet.appendChild(rows);
 var f=document.createElement('p');f.className='wsgen-print-foot';
 f.textContent='Made at kiddo.school';
 sheet.appendChild(f);
 root.appendChild(sheet);
 document.body.appendChild(root);
 window.print();
}

/* ================= MATCHING ================= */
var PALETTE=['#d9822b','#7a9e43','#4f86c6','#b05f8c','#81543e','#3f8f7a','#c2543d','#7d6bb5'];
function buildMatch(fresh){
 if(fresh)state.seed=(Math.random()*4294967296)>>>0;
 var shelf=$('wsgen-mshelf').value;
 var count=parseInt(document.querySelector('input[name="wsgen-mcount"]:checked').value,10);
 var title=$('wsgen-mtitle').value.trim()||'Matching Pairs';
 state.match={data:W.makePairs(shelf,count,W.mulberry32(state.seed)),count:count,title:title};
 state.matchDone={};state.matchPick=null;
 if(state.matchSolve)renderBoard();else renderMatch();
 $('wsgen-match-status').textContent='';
}
function matchHost(){return $('wsgen-match-sheet');}
function matchHead(){
 var head=el('div','wsgen-sheet-head');
 head.appendChild(el('h3','wsgen-sheet-title',state.match.title));
 head.appendChild(el('p','wsgen-sheet-sub','Name: ______________        Date: ____________'));
 return head;
}
function renderMatch(){
 var m=state.match;if(!m)return;
 var host=matchHost();
 host.textContent='';
 host.appendChild(matchHead());
 var cols=el('div','wsgen-match-cols');
 var lc=el('div','wsgen-match-col');
 var rc=el('div','wsgen-match-col');
 m.data.left.forEach(function(t){lc.appendChild(el('div','wsgen-match-item',t));});
 m.data.right.forEach(function(t){rc.appendChild(el('div','wsgen-match-item',t));});
 cols.appendChild(lc);cols.appendChild(rc);
 host.appendChild(cols);
 host.appendChild(el('p','wsgen-sheet-foot','Made at kiddo.school'));
}

/* ---------- matching: solve on screen (tap two cards) ---------- */
function matchStatus(msg){
 var m=state.match;if(!m)return;
 var n=Object.keys(state.matchDone).length;
 $('wsgen-match-status').textContent=msg||(n+' of '+m.count+' matched — tap two cards that belong together.');
}
function boardCenter(btn,board){
 var b=btn.getBoundingClientRect(),r=board.getBoundingClientRect();
 return {x:b.left-r.left+b.width/2,y:b.top-r.top+b.height/2};
}
function renderBoard(){
 var m=state.match;if(!m)return;
 var host=matchHost();
 host.textContent='';
 host.appendChild(matchHead());
 var board=el('div','wsgen-match-cols wsgen-match-board');
 var lc=el('div','wsgen-match-col');
 var rc=el('div','wsgen-match-col');
 m.data.left.forEach(function(t,i){
  var b=el('button','wsgen-match-item'+(state.matchDone['L'+i]?' is-matched':''),t);
  b.type='button';
  if(state.matchDone['L'+i])b.disabled=true;
  else b.addEventListener('click',function(){boardTap('L',i,b);});
  lc.appendChild(b);
 });
 m.data.right.forEach(function(t,i){
  var b=el('button','wsgen-match-item'+(state.matchDone['R'+i]?' is-matched':''),t);
  b.type='button';
  if(state.matchDone['R'+i])b.disabled=true;
  else b.addEventListener('click',function(){boardTap('R',i,b);});
  rc.appendChild(b);
 });
 board.appendChild(lc);board.appendChild(rc);
 var overlay=svgNode('svg');
 overlay.setAttribute('class','wsgen-match-lines');
 overlay.setAttribute('aria-hidden','true');
 board.appendChild(overlay);
 host.appendChild(board);
 host.appendChild(el('p','wsgen-sheet-foot','Made at kiddo.school'));
 state.matchOverlay=overlay;state.matchBoard=board;
 /* redraw any pairs already matched (e.g. after a window resize) */
 for(var li=0;li<m.count;li++)if(state.matchDone['L'+li])drawBoardLine(li,m.data.solution[li],PALETTE[li%PALETTE.length]);
 matchStatus();
}
function drawBoardLine(li,ri,color){
 var overlay=state.matchOverlay,board=state.matchBoard;
 if(!overlay||!board)return;
 var lBtn=board.querySelectorAll('.wsgen-match-col')[0].children[li];
 var rBtn=board.querySelectorAll('.wsgen-match-col')[1].children[ri];
 var a=boardCenter(lBtn,board),b2=boardCenter(rBtn,board);
 var line=svgNode('line');
 line.setAttribute('x1',String(a.x));line.setAttribute('y1',String(a.y));
 line.setAttribute('x2',String(b2.x));line.setAttribute('y2',String(b2.y));
 line.setAttribute('stroke',color);line.setAttribute('stroke-width','5');
 line.setAttribute('stroke-linecap','round');line.setAttribute('opacity','0.85');
 overlay.appendChild(line);
}
function boardTap(side,i,btn){
 var m=state.match;if(!m)return;
 var pick=state.matchPick;
 if(pick&&pick.side===side&&pick.i===i){
  btn.classList.remove('wsgen-pick');state.matchPick=null;return;
 }
 if(!pick||pick.side===side){
  if(pick&&pick.btn)pick.btn.classList.remove('wsgen-pick');
  state.matchPick={side:side,i:i,btn:btn};
  btn.classList.add('wsgen-pick');
  return;
 }
 /* attempt: pick (opposite side) vs btn */
 var ok;
 if(side==='R')ok=m.data.solution[pick.i]===i;
 else ok=m.data.solution[i]===pick.i;
 if(ok){
  var li=side==='L'?i:pick.i, ri=side==='R'?i:pick.i;
  state.matchDone['L'+li]=true;state.matchDone['R'+ri]=true;
  pick.btn.classList.remove('wsgen-pick');
  pick.btn.disabled=true;pick.btn.classList.add('is-matched');
  btn.disabled=true;btn.classList.add('is-matched');
  drawBoardLine(li,ri,PALETTE[li%PALETTE.length]);
  state.matchPick=null;
  var n=Object.keys(state.matchDone).length/2;
  if(n===m.count)matchStatus('All '+m.count+' pairs matched — brilliant!');
  else matchStatus('Matched! '+(n+' of '+m.count+'.'));
 }else{
  btn.classList.add('is-wrong');pick.btn.classList.add('is-wrong');
  var pbtn=pick.btn;
  setTimeout(function(){btn.classList.remove('is-wrong');pbtn.classList.remove('is-wrong');},450);
 }
}
function matchSolveToggle(){
 state.matchSolve=!state.matchSolve;
 state.matchPick=null;
 var b=$('wsgen-match-solve');
 if(b){b.textContent=state.matchSolve?'Back to the paper sheet':'Solve on screen';b.setAttribute('aria-pressed',state.matchSolve?'true':'false');}
 if(state.matchSolve)renderBoard();else renderMatch();
}

/* ---------- matching: PNG (A4 @150dpi) + print ---------- */
function fitFont(x,t,max){
 var fs=34;
 x.font='600 '+fs+'px system-ui, sans-serif';
 while(x.measureText(t).width>max&&fs>18){fs--;x.font='600 '+fs+'px system-ui, sans-serif';}
 return fs;
}
function matchCanvas(withKey){
 var m=state.match;
 var c=document.createElement('canvas');
 c.width=PAGE_W;c.height=PAGE_H;
 var x=c.getContext('2d');
 x.fillStyle='#ffffff';x.fillRect(0,0,PAGE_W,PAGE_H);
 x.fillStyle='#1f1f1f';x.textAlign='center';x.textBaseline='alphabetic';
 x.font='700 54px system-ui, sans-serif';
 x.fillText(m.title+(withKey?' — Answer key':''),PAGE_W/2,120);
 x.font='400 30px system-ui, sans-serif';x.textAlign='left';
 x.fillText('Name: ______________        Date: ____________',MARGIN,180);
 var top=260,areaH=PAGE_H-top-330;
 var rowH=Math.min(160,areaH/m.count);
 var boxW=380,leftX=MARGIN,rightX=PAGE_W-MARGIN-boxW;
 var boxH=Math.min(96,rowH-20);
 for(var i=0;i<m.count;i++){
  var y=top+i*rowH+(rowH-boxH)/2;
  x.strokeStyle='#2b2b2b';x.lineWidth=2;
  x.strokeRect(leftX,y,boxW,boxH);
  x.strokeRect(rightX,y,boxW,boxH);
  x.fillStyle='#1f1f1f';
  x.font='600 34px system-ui, sans-serif';
  x.textAlign='center';
  fitFont(x,m.data.left[i],boxW-40);
  x.fillText(m.data.left[i],leftX+boxW/2,y+boxH/2+12);
  fitFont(x,m.data.right[i],boxW-40);
  x.fillText(m.data.right[i],rightX+boxW/2,y+boxH/2+12);
 }
 if(withKey){
  x.lineWidth=4;x.setLineDash([]);
  for(var k=0;k<m.count;k++){
   var yl=top+k*rowH+rowH/2,yr=top+m.data.solution[k]*rowH+rowH/2;
   x.strokeStyle=PALETTE[k%PALETTE.length];
   x.beginPath();x.moveTo(leftX+boxW,yl);x.lineTo(rightX,yr);x.stroke();
  }
 }
 x.fillStyle='#8a8172';x.font='400 26px system-ui, sans-serif';x.textAlign='center';
 x.fillText('Made at kiddo.school',PAGE_W/2,PAGE_H-60);
 return c;
}
function downloadCanvas(kind,withKey){
 if(kind==='trace'&&!state.trace)return;
 if(kind==='match'&&!state.match)return;
 var c=kind==='trace'?traceCanvas():matchCanvas(withKey);
 var name=slug(kind==='trace'?state.trace.title:state.match.title)+(withKey?'-answers':'')+'.png';
 if(c.toBlob){
  c.toBlob(function(blob){
   var url=URL.createObjectURL(blob);
   var a=document.createElement('a');
   a.href=url;a.download=name;
   document.body.appendChild(a);a.click();a.remove();
   setTimeout(function(){URL.revokeObjectURL(url);},4000);
  },'image/png');
 }else{
  var a2=document.createElement('a');
  a2.href=c.toDataURL('image/png');a2.download=name;
  document.body.appendChild(a2);a2.click();a2.remove();
 }
}
function doPrintMatch(){
 var m=state.match;if(!m)return;
 var key=$('wsgen-match-key').checked;
 var old=$('wsgen-print');if(old)old.remove();
 var root=document.createElement('div');root.id='wsgen-print';
 var sheet=document.createElement('div');sheet.className='wsgen-print-sheet';
 var h=document.createElement('h1');h.textContent=m.title;
 var sub=document.createElement('p');sub.className='wsgen-print-sub';
 sub.textContent='Name: ______________        Date: ____________';
 sheet.appendChild(h);sheet.appendChild(sub);
 var cols=document.createElement('div');cols.className='wsgen-print-cols';
 var lc=document.createElement('div');lc.className='wsgen-print-col';
 var rc=document.createElement('div');rc.className='wsgen-print-col';
 m.data.left.forEach(function(t){
  var d=document.createElement('div');d.className='wsgen-print-item';d.textContent=t;lc.appendChild(d);
 });
 m.data.right.forEach(function(t){
  var d=document.createElement('div');d.className='wsgen-print-item';d.textContent=t;rc.appendChild(d);
 });
 cols.appendChild(lc);cols.appendChild(rc);
 sheet.appendChild(cols);
 var f=document.createElement('p');f.className='wsgen-print-foot';
 f.textContent='Made at kiddo.school';
 sheet.appendChild(f);
 root.appendChild(sheet);
 if(key){
  var keyDiv=document.createElement('div');
  keyDiv.className='wsgen-print-sheet wsgen-print-key';
  var kh=document.createElement('h1');kh.textContent=m.title+' — Answer key';
  keyDiv.appendChild(kh);
  var list=document.createElement('div');list.className='wsgen-print-keylist';
  m.data.left.forEach(function(t,i){
   var p=document.createElement('p');p.className='wsgen-print-keypair';
   p.textContent=t+'  —  '+m.data.right[m.data.solution[i]];
   list.appendChild(p);
  });
  keyDiv.appendChild(list);
  root.appendChild(keyDiv);
 }
 document.body.appendChild(root);
 window.print();
}

/* ================= wiring ================= */
function traceModeChanged(){
 var mode=document.querySelector('input[name="wsgen-tmode"]:checked').value;
 $('wsgen-tletters-wrap').classList.toggle('is-hidden',mode!=='letters');
 $('wsgen-tname-wrap').classList.toggle('is-hidden',mode!=='name');
 $('wsgen-twords-wrap').classList.toggle('is-hidden',mode!=='words');
 buildTrace(false);
}
function init(){
 if($('wsgen-trace-sheet')){
  document.querySelectorAll('input[name="wsgen-tmode"]').forEach(function(r){
   r.addEventListener('change',traceModeChanged);
  });
  document.querySelectorAll('input[name="wsgen-tcase"]').forEach(function(r){
   r.addEventListener('change',function(){buildTrace(false);});
  });
  onInput('wsgen-tletters',function(){buildTrace(false);});
  onInput('wsgen-tname',function(){buildTrace(false);});
  onChange('wsgen-tshelf',function(){buildTrace(false);});
  onInput('wsgen-ttitle',function(){buildTrace(false);});
  listen('wsgen-trace-shuffle',function(){buildTrace(true);});
  listen('wsgen-trace-print',doPrintTrace);
  listen('wsgen-trace-png',function(){downloadCanvas('trace',false);});
  initPad();
  buildTrace(false);
  padStatus();
 }
 if($('wsgen-match-sheet')){
  onChange('wsgen-mshelf',function(){buildMatch(false);});
  document.querySelectorAll('input[name="wsgen-mcount"]').forEach(function(r){
   r.addEventListener('change',function(){buildMatch(false);});
  });
  onInput('wsgen-mtitle',function(){buildMatch(false);});
  listen('wsgen-match-shuffle',function(){buildMatch(true);});
  listen('wsgen-match-solve',matchSolveToggle);
  listen('wsgen-match-print',doPrintMatch);
  listen('wsgen-match-png',function(){downloadCanvas('match',false);});
  listen('wsgen-match-png-key',function(){downloadCanvas('match',true);});
  window.addEventListener('resize',function(){if(state.matchSolve)renderBoard();});
  buildMatch(false);
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();
