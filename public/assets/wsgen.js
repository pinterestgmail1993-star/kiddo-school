/* Kiddo worksheet generator — page logic (consumes globalThis.WSGEN).
   CSP law kept: external file, addEventListener only, never writes an
   inline style attribute, downloads via object URLs. */
(function(){
'use strict';
var W=window.WSGEN;
if(!W)return;

/* ---------- data: the word shelves (tied to our classes) ---------- */
var THEMES={
 habitats:{title:'Animal Word Search',
  words:['RABBIT','CAMEL','WHALE','PANDA','LION','FOX','OWL','FROG','DOLPHIN','PENGUIN'],
  note:'Animals & their homes · Class 36'},
 helpers:{title:'Helper Word Search',
  words:['DOCTOR','NURSE','FARMER','TEACHER','BAKER','PILOT','DENTIST','VET','COACH','POLICE'],
  note:'Community Helpers · Class 33'},
 weather:{title:'Weather Word Search',
  words:['SUNNY','RAINY','WINDY','SNOWY','CLOUDY','STORMY','FOGGY','RAINBOW','THUNDER','SEASONS'],
  note:'Weather words · Class 34'},
 colors:{title:'Colors & Shapes Word Search',
  words:['RED','BLUE','GREEN','YELLOW','PURPLE','CIRCLE','SQUARE','TRIANGLE','HEART','STAR'],
  note:'Colors & shapes'},
 sounds:{title:'First Words Word Search',
  words:['CAT','DOG','SUN','HAT','MAP','CUP','BED','FISH','STAR','MOON','TREE','BOOK'],
  note:'First words & sounds'}
};

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

/* ---------- state ---------- */
var state={
 seed:1,
 ws:null,   /* last built word search {grid,placements,words,size,diagonals,title} */
 math:null, /* last built math {problems,title,count,level} */
 wsSolve:false, wsSel:null, wsFound:{}, wsFoundCells:{},
 mathSolve:false, mathDone:[], mathChoices:[]
};

/* ================= WORD SEARCH ================= */
function collectWords(){
 var theme=$('wsgen-theme').value;
 if(theme==='custom'){
  return W.parseWords($('wsgen-custom').value,12,12);
 }
 return THEMES[theme].words.slice();
}

function buildWordSearch(fresh){
 if(fresh)state.seed=(Math.random()*4294967296)>>>0;
 var size=parseInt(document.querySelector('input[name="wsgen-size"]:checked').value,10);
 var diagonals=document.querySelector('input[name="wsgen-dirs"]:checked').value==='hard';
 var words=collectWords();
 var status=$('wsgen-ws-status');
 status.textContent='';
 var title=$('wsgen-ws-title').value.trim()||'Word Search';
 if(words.length<2){
  status.textContent='Add at least two words — letters only, up to 12, and 12 words at most.';
  $('wsgen-ws-sheet').textContent='';
  state.ws=null;
  return;
 }
 var rng=W.mulberry32(state.seed);
 var built=W.buildWordSearch(words,size,diagonals,rng);
 if(!built){
  status.textContent='Those words will not fit a '+size+' by '+size+' grid — try a bigger puzzle or shorter words.';
  state.ws=null;
  return;
 }
 W.fillGrid(built.grid,W.mulberry32(state.seed^0x9e3779b9));
 state.ws={grid:built.grid,placements:built.placements,words:words,size:size,diagonals:diagonals,title:title};
 renderWordSearch(false);
}

function wsCellSet(){
 var set={};
 state.ws.placements.forEach(function(p){
  W.wordCells(p).forEach(function(c){set[c[0]+','+c[1]]=true;});
 });
 return set;
}

function renderWordSearch(withKey){
 var s=state.ws;if(!s)return;
 var host=$('wsgen-ws-sheet');
 host.textContent='';
 var hits=withKey?wsCellSet():null;
 var solve=state.wsSolve&&!withKey;
 var head=el('div','wsgen-sheet-head');
 var h=el('h3','wsgen-sheet-title',s.title);
 var sub=el('p','wsgen-sheet-sub','Name: ______________        Date: ____________');
 head.appendChild(h);head.appendChild(sub);
 var grid=el('div','wsgen-grid wsgen-grid-'+s.size+(solve?' wsgen-live':''));
 for(var r=0;r<s.size;r++)for(var c=0;c<s.size;c++){
  var cls='wsgen-cell'+(hits&&hits[r+','+c]?' wsgen-hit':'')+(solve&&state.wsFoundCells[r+','+c]?' wsgen-found':'');
  var cell=el('span',cls,s.grid[r][c]);
  if(solve){
   (function(rr,cc){cell.addEventListener('click',function(){wsTap(rr,cc);});})(r,c);
  }
  grid.appendChild(cell);
 }
 var listWrap=el('div','wsgen-wordlist');
 var lh=el('p','wsgen-list-head','Find these '+s.words.length+' words:');
 listWrap.appendChild(lh);
 var chips=el('div','wsgen-chips');
 s.words.forEach(function(w){
  var chip=el('span','wsgen-chip'+(solve&&state.wsFound[w]?' is-done':''),w);
  if(solve)chip.setAttribute('data-word',w);
  chips.appendChild(chip);
 });
 listWrap.appendChild(chips);
 var foot=el('p','wsgen-sheet-foot','Made at kiddo.school');
 host.appendChild(head);host.appendChild(grid);host.appendChild(listWrap);host.appendChild(foot);
 if(solve)wsStatus();
}

/* ---------- word search: solve on screen ---------- */
function wsStatus(msg){
 var s=state.ws;if(!s)return;
 var n=Object.keys(state.wsFound).length;
 $('wsgen-ws-status').textContent=msg||(n+' of '+s.words.length+' found — tap the first and last letter of a word.');
}
function wsCellEl(r,c){
 var g=$('wsgen-ws-sheet').querySelector('.wsgen-grid');
 return g.children[r*state.ws.size+c];
}
function wsNope(a,b){
 [a,b].forEach(function(p){var e=wsCellEl(p[0],p[1]);if(e)e.classList.add('wsgen-nope');});
 setTimeout(function(){
  [a,b].forEach(function(p){var e=wsCellEl(p[0],p[1]);if(e)e.classList.remove('wsgen-nope');});
 },450);
 state.wsSel=null;
}
function wsTap(r,c){
 var s=state.ws;if(!s)return;
 var sel=state.wsSel;
 if(!sel){
  state.wsSel=[r,c];
  wsCellEl(r,c).classList.add('wsgen-pick');
  return;
 }
 if(sel[0]===r&&sel[1]===c){
  wsCellEl(r,c).classList.remove('wsgen-pick');
  state.wsSel=null;
  return;
 }
 var r0=sel[0],c0=sel[1],r1=r,c1=c,dr=r1-r0,dc=c1-c0;
 if(dr<0||(dr===0&&dc<0)){
  var tr=r0,tc=c0;r0=r1;c0=c1;r1=tr;c1=tc;dr=-dr;dc=-dc;
 }
 var straight=(dr===0&&dc!==0)||(dc===0&&dr!==0)||(dr===dc&&dr!==0)||((dr===-dc)&&dr!==0);
 if(!straight){wsNope(sel,[r,c]);return;}
 var len=(dr===0?Math.abs(dc):Math.abs(dr))+1;
 var ddr=Math.sign(dr),ddc=Math.sign(dc),str='';
 for(var i=0;i<len;i++)str+=s.grid[r0+ddr*i][c0+ddc*i];
 var hit=null;
 for(var k=0;k<s.placements.length;k++){
  var p=s.placements[k];
  if(!state.wsFound[p.word]&&p.word===str&&p.row===r0&&p.col===c0&&p.dr===ddr&&p.dc===ddc){hit=p;break;}
 }
 if(hit){
  state.wsFound[hit.word]=true;
  W.wordCells(hit).forEach(function(cc){
   state.wsFoundCells[cc[0]+','+cc[1]]=true;
   var e2=wsCellEl(cc[0],cc[1]);
   if(e2){e2.classList.remove('wsgen-pick');e2.classList.add('wsgen-found');}
  });
  var chip=$('wsgen-ws-sheet').querySelector('.wsgen-chip[data-word="'+hit.word+'"]');
  if(chip)chip.classList.add('is-done');
  state.wsSel=null;
  var n=Object.keys(state.wsFound).length;
  if(n===s.words.length)wsStatus('You found all '+s.words.length+' words — amazing!');
  else wsStatus('You found '+hit.word+'! '+(n+' of '+s.words.length+'. Tick the next one off the list.'));
 }else{
  wsNope(sel,[r,c]);
 }
}
function wsSolveToggle(){
 state.wsSolve=!state.wsSolve;
 state.wsSel=null;
 var b=$('wsgen-ws-solve');
 if(b){b.textContent=state.wsSolve?'Back to the paper sheet':'Solve on screen';b.setAttribute('aria-pressed',state.wsSolve?'true':'false');}
 renderWordSearch(false);
}

/* ================= MATH ================= */
function buildMath(fresh){
 if(fresh)state.seed=(Math.random()*4294967296)>>>0;
 var op=document.querySelector('input[name="wsgen-op"]:checked').value;
 var level=parseInt(document.querySelector('input[name="wsgen-level"]:checked').value,10);
 var count=parseInt(document.querySelector('input[name="wsgen-count"]:checked').value,10);
 var title=$('wsgen-math-title').value.trim()||'Math Practice';
 var rng=W.mulberry32(state.seed);
 var problems=W.makeMath(op,level,count,rng);
 var crng=W.mulberry32(state.seed^0x5bf03635);
 state.math={problems:problems,title:title,level:level};
 state.mathDone=problems.map(function(){return false;});
 state.mathChoices=problems.map(function(p){return W.makeChoices(p.answer,level,crng);});
 renderMath(false);
 var status=$('wsgen-math-status');
 status.textContent='';
}

function renderMath(withKey){
 var m=state.math;if(!m)return;
 var host=$('wsgen-math-sheet');
 host.textContent='';
 var solve=state.mathSolve&&!withKey;
 var head=el('div','wsgen-sheet-head');
 head.appendChild(el('h3','wsgen-sheet-title',m.title));
 head.appendChild(el('p','wsgen-sheet-sub','Name: ______________        Date: ____________'));
 var grid=el('div','wsgen-math');
 m.problems.forEach(function(p,i){
  var line=el('span','wsgen-problem'+(solve?' wsgen-solve':'')+(solve&&state.mathDone[i]?' is-done':''));
  line.appendChild(document.createTextNode(p.a+' '+p.op+' '+p.b+' = '));
  if(withKey)line.appendChild(el('span','wsgen-answer',String(p.answer)));
  else if(solve){
   var bubbles=el('span','wsgen-bubbles');
   state.mathChoices[i].forEach(function(v){
    var b=el('button','wsgen-bubble'+(state.mathDone[i]&&v===p.answer?' is-right':''),String(v));
    b.type='button';
    if(state.mathDone[i])b.disabled=true;
    else b.addEventListener('click',function(){mathTap(i,p,v,b);});
    bubbles.appendChild(b);
   });
   line.appendChild(bubbles);
  }
  else line.appendChild(el('span','wsgen-blank'));
  grid.appendChild(line);
 });
 var foot=el('p','wsgen-sheet-foot','Made at kiddo.school');
 host.appendChild(head);host.appendChild(grid);host.appendChild(foot);
 if(solve)mathStatus();
}

/* ---------- math: solve on screen ---------- */
function mathStatus(msg){
 var m=state.math;if(!m)return;
 var n=state.mathDone.filter(Boolean).length;
 $('wsgen-math-status').textContent=msg||(n+' of '+m.problems.length+' done — tap the right answer.');
}
function mathTap(i,p,v,btn){
 if(state.mathDone[i])return;
 if(v===p.answer){
  state.mathDone[i]=true;
  btn.classList.add('is-right');
  btn.parentElement.querySelectorAll('.wsgen-bubble').forEach(function(b){b.disabled=true;});
  btn.parentElement.parentElement.classList.add('is-done');
  var done=state.mathDone.filter(Boolean).length;
  if(done===state.math.problems.length)mathStatus('All '+state.math.problems.length+' right — brilliant!');
  else mathStatus(p.a+' '+p.op+' '+p.b+' = '+p.answer+' — right! '+(done+' of '+state.math.problems.length+'. '));
 }else{
  btn.classList.add('is-wrong');
  setTimeout(function(){btn.classList.remove('is-wrong');},450);
 }
}
function mathSolveToggle(){
 state.mathSolve=!state.mathSolve;
 var b=$('wsgen-math-solve');
 if(b){b.textContent=state.mathSolve?'Back to the paper sheet':'Solve on screen';b.setAttribute('aria-pressed',state.mathSolve?'true':'false');}
 renderMath(false);
}

/* ================= PNG export (A4 @150dpi) ================= */
var PAGE_W=1240,PAGE_H=1754,MARGIN=90;

function slug(t){
 return String(t).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'worksheet';
}

function canvasSheet(kind,withKey){
 var c=document.createElement('canvas');
 c.width=PAGE_W;c.height=PAGE_H;
 var x=c.getContext('2d');
 x.fillStyle='#ffffff';x.fillRect(0,0,PAGE_W,PAGE_H);
 x.fillStyle='#1f1f1f';
 x.textAlign='center';x.textBaseline='alphabetic';
 var title,sub='Name: ______________        Date: ____________';
 if(kind==='ws'){
  var s=state.ws;
  title=s.title+(withKey?' — Answer key':'');
  x.font='700 54px system-ui, sans-serif';
  x.fillText(title,PAGE_W/2,120);
  x.font='400 30px system-ui, sans-serif';x.textAlign='left';
  x.fillText(sub,MARGIN,180);
  drawWsGrid(x,s,withKey);
  drawWordList(x,s);
 }else{
  var m=state.math;
  title=m.title+(withKey?' — Answer key':'');
  x.font='700 54px system-ui, sans-serif';
  x.fillText(title,PAGE_W/2,120);
  x.font='400 30px system-ui, sans-serif';x.textAlign='left';
  x.fillText(sub,MARGIN,180);
  drawMath(x,m,withKey);
 }
 x.fillStyle='#8a8172';x.font='400 26px system-ui, sans-serif';x.textAlign='center';
 x.fillText('Made at kiddo.school',PAGE_W/2,PAGE_H-60);
 return c;
}

function drawWsGrid(x,s,withKey){
 var top=240,availW=PAGE_W-2*MARGIN,cell=Math.min(availW/s.size,(PAGE_H-700)/s.size);
 var ox=(PAGE_W-cell*s.size)/2;
 var hits=null;
 if(withKey){hits={};s.placements.forEach(function(p){W.wordCells(p).forEach(function(cc){hits[cc[0]+','+cc[1]]=true;});});}
 x.lineWidth=2;x.strokeStyle='#2b2b2b';
 for(var r=0;r<s.size;r++)for(var c=0;c<s.size;c++){
  var px=ox+c*cell,py=top+r*cell;
  if(hits&&hits[r+','+c]){x.fillStyle='#ffe9a8';x.fillRect(px,py,cell,cell);x.fillStyle='#1f1f1f';}
  x.strokeRect(px,py,cell,cell);
  x.font='600 '+Math.round(cell*0.5)+'px system-ui, sans-serif';
  x.textAlign='center';x.textBaseline='middle';
  x.fillText(s.grid[r][c],px+cell/2,py+cell/2+1);
 }
 x.textBaseline='alphabetic';
 return top+cell*s.size;
}

function drawWordList(x,s){
 var y=PAGE_H-330;
 x.fillStyle='#1f1f1f';x.textAlign='left';
 x.font='700 30px system-ui, sans-serif';
 x.fillText('Find these '+s.words.length+' words:',MARGIN,y-16);
 x.font='600 30px system-ui, sans-serif';
 var colW=(PAGE_W-2*MARGIN)/2;
 s.words.forEach(function(w,i){
  var cx=MARGIN+(i%2)*colW,cy=y+34+Math.floor(i/2)*44;
  x.fillText(w,cx,cy);
 });
}

function drawMath(x,m,withKey){
 var cols=3,rows=Math.ceil(m.problems.length/cols);
 var top=280,colW=(PAGE_W-2*MARGIN)/cols,rowH=120;
 x.font='500 40px system-ui, sans-serif';
 x.textAlign='left';x.textBaseline='alphabetic';
 x.strokeStyle='#2b2b2b';x.lineWidth=2;
 m.problems.forEach(function(p,i){
  var cx=MARGIN+(i%cols)*colW,cy=top+Math.floor(i/cols)*rowH;
  var label=p.a+' '+p.op+' '+p.b+' = ';
  x.fillStyle='#1f1f1f';
  x.fillText(label,cx,cy);
  var w=x.measureText(label).width;
  if(withKey){
   x.font='700 40px system-ui, sans-serif';
   x.fillText(String(p.answer),cx+w,cy);
   x.font='500 40px system-ui, sans-serif';
  }else{
   x.beginPath();x.moveTo(cx+w,cy+6);x.lineTo(cx+w+120,cy+6);x.stroke();
  }
 });
}

function downloadCanvas(kind,withKey){
 if(kind==='ws'&&!state.ws||kind==='math'&&!state.math)return;
 var c=canvasSheet(kind,withKey);
 var name='kiddo-'+slug(kind==='ws'?state.ws.title:state.math.title)+(withKey?'-answers':'')+'.png';
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

/* ================= print (builds a clean body-level sheet) ================= */
function printTable(kind,withKey){
 var t=document.createElement('table');
 t.className='wsgen-print-table';
 if(kind==='ws'){
  var s=state.ws;
  var hits=null;
  if(withKey){hits={};s.placements.forEach(function(p){W.wordCells(p).forEach(function(cc){hits[cc[0]+','+cc[1]]=true;});});}
  for(var r=0;r<s.size;r++){
   var tr=document.createElement('tr');
   for(var c=0;c<s.size;c++){
    var td=document.createElement('td');
    td.textContent=s.grid[r][c];
    if(hits&&hits[r+','+c])td.className='wsgen-print-hit';
    tr.appendChild(td);
   }
   t.appendChild(tr);
  }
 }
 return t;
}

function doPrint(kind){
 var s=kind==='ws'?state.ws:state.math;
 if(!s)return;
 var key=kind==='ws'?$('wsgen-ws-key').checked:$('wsgen-math-key').checked;
 var old=$('wsgen-print');
 if(old)old.remove();
 var root=document.createElement('div');
 root.id='wsgen-print';
 var sheet=document.createElement('div');
 sheet.className='wsgen-print-sheet';
 var h=document.createElement('h1');h.textContent=s.title;
 var sub=document.createElement('p');sub.className='wsgen-print-sub';
 sub.textContent='Name: ______________        Date: ____________';
 sheet.appendChild(h);sheet.appendChild(sub);
 if(kind==='ws'){
  sheet.appendChild(printTable('ws',false));
  var lw=document.createElement('p');lw.className='wsgen-print-words';
  lw.textContent='Find these '+s.words.length+' words:  '+s.words.join('   ·   ');
  sheet.appendChild(lw);
 }else{
  var mt=document.createElement('table');
  mt.className='wsgen-print-math';
  var cols=3,rows=Math.ceil(s.problems.length/cols);
  for(var r=0;r<rows;r++){
   var tr=document.createElement('tr');
   for(var c=0;c<cols;c++){
    var td=document.createElement('td');
    var i=r*cols+c;
    if(i<s.problems.length){var p=s.problems[i];td.textContent=p.a+' '+p.op+' '+p.b+' =';}
    tr.appendChild(td);
   }
   mt.appendChild(tr);
  }
  sheet.appendChild(mt);
 }
 var f=document.createElement('p');f.className='wsgen-print-foot';
 f.textContent='Made at kiddo.school';
 sheet.appendChild(f);
 root.appendChild(sheet);
 if(key){
  var keyDiv=document.createElement('div');
  keyDiv.className='wsgen-print-sheet wsgen-print-key';
  var kh=document.createElement('h1');kh.textContent=s.title+' — Answer key';
  keyDiv.appendChild(kh);
  if(kind==='ws')keyDiv.appendChild(printTable('ws',true));
  else{
   var kt=document.createElement('table');kt.className='wsgen-print-math';
   var krows=Math.ceil(s.problems.length/cols);
   for(var kr=0;kr<krows;kr++){
    var ktr=document.createElement('tr');
    for(var kc=0;kc<cols;kc++){
     var ktd=document.createElement('td');
     var ki=kr*cols+kc;
     if(ki<s.problems.length){var kp=s.problems[ki];ktd.textContent=kp.a+' '+kp.op+' '+kp.b+' = '+kp.answer;}
     ktr.appendChild(ktd);
    }
    kt.appendChild(ktr);
   }
   keyDiv.appendChild(kt);
  }
  root.appendChild(keyDiv);
 }
 document.body.appendChild(root);
 window.print();
}

/* ================= wiring ================= */
function themeChanged(){
 var custom=$('wsgen-theme').value==='custom';
 $('wsgen-custom-wrap').classList.toggle('is-hidden',!custom);
 var t=THEMES[$('wsgen-theme').value];
 if(t)$('wsgen-ws-title').value=t.title;
 buildWordSearch(false);
}

function init(){
 if($('wsgen-ws-sheet')){
  onChange('wsgen-theme',themeChanged);
  onInput('wsgen-custom',function(){buildWordSearch(false);});
  onInput('wsgen-ws-title',function(){buildWordSearch(false);});
  listen('wsgen-ws-shuffle',function(){buildWordSearch(true);});
  listen('wsgen-ws-solve',wsSolveToggle);
  listen('wsgen-ws-print',function(){doPrint('ws');});
  listen('wsgen-ws-png',function(){downloadCanvas('ws',false);});
  listen('wsgen-ws-png-key',function(){downloadCanvas('ws',true);});
  ['wsgen-size','wsgen-dirs'].forEach(function(n){
   document.querySelectorAll('input[name="'+n+'"]').forEach(function(r){r.addEventListener('change',function(){buildWordSearch(false);});});
  });
  buildWordSearch(false);
 }
 if($('wsgen-math-sheet')){
  listen('wsgen-math-shuffle',function(){buildMath(true);});
  onInput('wsgen-math-title',function(){buildMath(false);});
  listen('wsgen-math-solve',mathSolveToggle);
  listen('wsgen-math-print',function(){doPrint('math');});
  listen('wsgen-math-png',function(){downloadCanvas('math',false);});
  listen('wsgen-math-png-key',function(){downloadCanvas('math',true);});
  ['wsgen-op','wsgen-level','wsgen-count'].forEach(function(n){
   document.querySelectorAll('input[name="'+n+'"]').forEach(function(r){r.addEventListener('change',function(){buildMath(false);});});
  });
  buildMath(false);
 }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();
