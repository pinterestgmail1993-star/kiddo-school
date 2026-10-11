/* Kiddo School — Alphabet Center card player (on /flashcards/alphabet/).
   The page ships the A–Z grid and the five-mode viewer mount; this script
   fills the viewer from the page's JSON mount: one large card at a time,
   five card kinds (uppercase, lowercase, picture, pair, letter & picture),
   Previous/Next with an aria-live counter, Shuffle and Restart. Grid tiles
   jump the viewer to their letter; without JavaScript the tiles stay plain
   links to the letter pages and the mount stays hidden. No scores, no
   timers, no storage, no fetches. */
(function(){
 'use strict';
 var root=document.querySelector('[data-al-center]');
 if(!root||typeof document.querySelectorAll!=='function')return;
 var viewer=root.querySelector('[data-al-viewer]');
 var mount=document.querySelector('script[data-al-center-data]')||document.querySelector('[data-al-center] script[type="application/json"]');
 if(!viewer||!mount)return;
 var DATA;
 try{DATA=JSON.parse(mount.textContent);}catch(e){return;}
 var letters=DATA.letters||[];
 if(!letters.length)return;
 var MODES=['up','lo','pic','pair','say'];
 var MODE_LABEL={up:'Uppercase',lo:'Lowercase',pic:'Picture',pair:'Pair',say:'Letter & picture'};
 var img=viewer.querySelector('[data-al-img]');
 var kindEl=viewer.querySelector('[data-al-kind]');
 var wordEl=viewer.querySelector('[data-al-word]');
 var pageEl=viewer.querySelector('[data-al-page]');
 var countEl=viewer.querySelector('[data-al-count]');
 var modeBtns=[].slice.call(viewer.querySelectorAll('[data-al-mode]'));
 var tiles=[].slice.call(root.querySelectorAll('[data-al-tile]'));
 if(!img||!countEl||!modeBtns.length)return;
 var idx=0,mode='up';

 /* reveal the player now that it can actually run */
 viewer.hidden=false;
 var hint=viewer.querySelector('[data-al-hint]');
 if(hint)hint.hidden=false;

 function render(){
  var L=letters[idx];
  var face=L.faces[mode];
  img.src=face.src;
  img.width=face.w;img.height=face.h;
  img.alt=face.alt;
  kindEl.textContent=MODE_LABEL[mode];
  wordEl.textContent=mode==='pic'?L.word:(mode==='pair'||mode==='say'?L.upper+' '+L.letter+(mode==='say'?' — '+L.word:''):mode==='lo'?L.letter:L.upper);
  pageEl.href=L.page;
  pageEl.innerHTML='Open Letter '+L.upper+'’s page <span aria-hidden="true">↗</span>';
  countEl.textContent='Letter '+L.upper+' of '+letters.length;
  modeBtns.forEach(function(btn){
   var on=btn.getAttribute('data-al-mode')===mode;
   btn.classList.toggle('is-on',on);
   btn.setAttribute('aria-pressed',on?'true':'false');
  });
  /* keep the neighbours ready: preload the adjacent letters of this mode */
  [1,-1].forEach(function(off){
   var n=letters[(idx+off+letters.length)%letters.length];
   if(n&&n.faces[mode]){var pre=new Image();pre.src=n.faces[mode].src;}
  });
 }
 function go(step){idx=(idx+step+letters.length)%letters.length;render();}
 function jump(letter){
  var i=letters.findIndex(function(l){return l.letter===letter;});
  if(i>=0){idx=i;render();}
 }
 modeBtns.forEach(function(btn){
  btn.addEventListener('click',function(){mode=btn.getAttribute('data-al-mode');render();});
 });
 viewer.querySelector('[data-al-prev]').addEventListener('click',function(){go(-1);});
 viewer.querySelector('[data-al-next]').addEventListener('click',function(){go(1);});
 viewer.querySelector('[data-al-shuffle]').addEventListener('click',function(){
  if(letters.length<2)return;
  var n=idx;
  while(n===idx)n=Math.floor(Math.random()*letters.length);
  idx=n;render();
 });
 viewer.querySelector('[data-al-restart]').addEventListener('click',function(){idx=0;mode='up';render();});
 tiles.forEach(function(tile){
  tile.addEventListener('click',function(e){
   e.preventDefault();
   jump(tile.getAttribute('data-al-tile'));
   viewer.scrollIntoView({behavior:window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  });
 });
 document.addEventListener('keydown',function(e){
  if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;
  var r=viewer.getBoundingClientRect();
  if(r.top>=innerHeight||r.bottom<=0)return;
  var t=e.target;
  if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'))return;
  go(e.key==='ArrowRight'?1:-1);
 });
 render();
})();
