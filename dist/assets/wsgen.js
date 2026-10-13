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
 math:null  /* last built math {problems,title,count} */
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
 var s=state.ws,host=$('wsgen-ws-sheet');
 host.textContent='';
 var hits=withKey?wsCellSet():null;
 var head=el('div','wsgen-sheet-head');
 var h=el('h3','wsgen-sheet-title',s.title);
 var sub=el('p','wsgen-sheet-sub','Name: ______________        Date: ____________');
 head.appendChild(h);head.appendChild(sub);
 var grid=el('div','wsgen-grid wsgen-grid-'+s.size);
 for(var r=0;r<s.size;r++)for(var c=0;c<s.size;c++){
  var cell=el('span','wsgen-cell'+(hits&&hits[r+','+c]?' wsgen-hit':''),s.grid[r][c]);
  grid.appendChild(cell);
 }
 var listWrap=el('div','wsgen-wordlist');
 var lh=el('p','wsgen-list-head','Find these '+s.words.length+' words:');
 listWrap.appendChild(lh);
 var chips=el('div','wsgen-chips');
 s.words.forEach(function(w){chips.appendChild(el('span','wsgen-chip',w));});
 listWrap.appendChild(chips);
 var foot=el('p','wsgen-sheet-foot','Made free at kiddo.school');
 host.appendChild(head);host.appendChild(grid);host.appendChild(listWrap);host.appendChild(foot);
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
 state.math={problems:problems,title:title};
 renderMath(false);
 var status=$('wsgen-math-status');
 status.textContent='';
}

function renderMath(withKey){
 var m=state.math,host=$('wsgen-math-sheet');
 host.textContent='';
 var head=el('div','wsgen-sheet-head');
 head.appendChild(el('h3','wsgen-sheet-title',m.title));
 head.appendChild(el('p','wsgen-sheet-sub','Name: ______________        Date: ____________'));
 var grid=el('div','wsgen-math');
 m.problems.forEach(function(p){
  var line=el('span','wsgen-problem');
  line.appendChild(document.createTextNode(p.a+' '+p.op+' '+p.b+' = '));
  if(withKey)line.appendChild(el('span','wsgen-answer',String(p.answer)));
  else line.appendChild(el('span','wsgen-blank'));
  grid.appendChild(line);
 });
 var foot=el('p','wsgen-sheet-foot','Made free at kiddo.school');
 host.appendChild(head);host.appendChild(grid);host.appendChild(foot);
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
 x.fillText('Made free at kiddo.school',PAGE_W/2,PAGE_H-60);
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
 f.textContent='Made free at kiddo.school';
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

function initTabs(){
 listen('wsgen-tab-words',function(){
  $('wsgen-tab-words').classList.add('is-active');$('wsgen-tab-words').setAttribute('aria-selected','true');
  $('wsgen-tab-math').classList.remove('is-active');$('wsgen-tab-math').setAttribute('aria-selected','false');
  $('wsgen-panel-words').classList.remove('is-hidden');
  $('wsgen-panel-math').classList.add('is-hidden');
 });
 listen('wsgen-tab-math',function(){
  $('wsgen-tab-math').classList.add('is-active');$('wsgen-tab-math').setAttribute('aria-selected','true');
  $('wsgen-tab-words').classList.remove('is-active');$('wsgen-tab-words').setAttribute('aria-selected','false');
  $('wsgen-panel-math').classList.remove('is-hidden');
  $('wsgen-panel-words').classList.add('is-hidden');
 });
}

function init(){
 initTabs();
 onChange('wsgen-theme',themeChanged);
 onInput('wsgen-custom',function(){buildWordSearch(false);});
 onInput('wsgen-ws-title',function(){buildWordSearch(false);});
 listen('wsgen-ws-shuffle',function(){buildWordSearch(true);});
 listen('wsgen-ws-print',function(){doPrint('ws');});
 listen('wsgen-ws-png',function(){downloadCanvas('ws',false);});
 listen('wsgen-ws-png-key',function(){downloadCanvas('ws',true);});
 listen('wsgen-math-shuffle',function(){buildMath(true);});
 listen('wsgen-math-title',function(){buildMath(false);});
 listen('wsgen-math-print',function(){doPrint('math');});
 listen('wsgen-math-png',function(){downloadCanvas('math',false);});
 listen('wsgen-math-png-key',function(){downloadCanvas('math',true);});
 ['wsgen-size','wsgen-dirs'].forEach(function(n){
  document.querySelectorAll('input[name="'+n+'"]').forEach(function(r){r.addEventListener('change',function(){buildWordSearch(false);});});
 });
 ['wsgen-op','wsgen-level','wsgen-count'].forEach(function(n){
  document.querySelectorAll('input[name="'+n+'"]').forEach(function(r){r.addEventListener('change',function(){buildMath(false);});});
 });
 buildWordSearch(false);
 buildMath(false);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();
