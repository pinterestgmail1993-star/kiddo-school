/* Kiddo School — Letter Matching game (on /activities/letter-matching/).
   Tap an uppercase card, then its lowercase partner. Four rounds of 3, 4,
   5 and 6 pairs; the letters are re-drawn from the whole alphabet every
   round so replaying feels fresh. A matched pair locks in and names its
   picture word — A a, Apple! — with the real artwork. Wrong pairs simply
   shake and step back: no scores, no timers, no locks, nothing stored.
   Without JavaScript the page explains the game and links to the letter
   pages, which all work without it. */
(function(){
 'use strict';
 var game=document.querySelector('[data-amg-game]');
 var mount=document.querySelector('script[type="application/json"][data-amg-data]');
 if(!game||!mount||typeof document.querySelectorAll!=='function')return;
 var DATA;
 try{DATA=JSON.parse(mount.textContent);}catch(e){return;}
 var letters=DATA.letters||[];
 if(!letters.length)return;
 var board=game.querySelector('[data-amg-board]');
 var countEl=game.querySelector('[data-amg-count]');
 var pairsEl=game.querySelector('[data-amg-pairs]');
 var banner=game.querySelector('[data-amg-banner]');
 var nextBtn=game.querySelector('[data-amg-next]');
 var restartBtn=game.querySelector('[data-amg-restart]');
 if(!board||!countEl||!banner||!nextBtn||!restartBtn)return;
 var SIZES=[3,4,5,6];
 var round=0,open=[],matched=0,needed=0,busy=false;

 function shuffle(arr){
  var a=arr.slice();
  for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}
  return a;
 }
 function pick(size){
  var pool=shuffle(letters.map(function(_,i){return i;})).slice(0,size);
  var cards=[];
  pool.forEach(function(i){
   cards.push({i:i,face:'up'});
   cards.push({i:i,face:'lo'});
  });
  return shuffle(cards);
 }
 function cardEl(card){
  var L=letters[card.i];
  var face=card.face==='up'?L.up:L.lo;
  var b=document.createElement('button');
  b.type='button';
  b.className='amg-card amg-'+card.face;
  b.setAttribute('data-amg-card','');
  b.setAttribute('data-i',String(card.i));
  b.setAttribute('data-face',card.face);
  b.setAttribute('aria-label',(card.face==='up'?'Uppercase ':'Lowercase ')+'letter '+L.upper);
  var img=document.createElement('img');
  img.src=face.src;img.width=face.w;img.height=face.h;
  img.alt='';img.decoding='async';
  b.appendChild(img);
  return b;
 }
 function say(msg){banner.textContent=msg;}
 function renderCount(){countEl.textContent='Round '+(round+1)+' of '+SIZES.length;pairsEl.textContent=SIZES[round]+' pairs';}
 function startRound(){
  var cards=pick(SIZES[round]);
  matched=0;needed=SIZES[round];open=[];busy=false;
  board.innerHTML='';
  var frag=document.createDocumentFragment();
  cards.forEach(function(c){frag.appendChild(cardEl(c));});
  board.appendChild(frag);
  renderCount();
  nextBtn.hidden=true;
  say('Round '+(round+1)+': find '+needed+' pairs. Tap a big letter to begin.');
  /* warm the next round's images while the child plays */
  if(round+1<SIZES.length){
   pick(SIZES[round+1]).forEach(function(c){
    var L=letters[c.i],pre=new Image();
    pre.src=(c.face==='up'?L.up:L.lo).src;
   });
  }
 }
 function completeRound(){
  if(round+1<SIZES.length){
   nextBtn.hidden=false;
   say('You matched all '+needed+' pairs! Tap Next round for '+(SIZES[round+1])+' more.');
  }else{
   nextBtn.hidden=true;
   say('You matched the whole alphabet — '+needed+' pairs on the hardest round! Tap Restart to play again with new letters.');
  }
 }
 board.addEventListener('click',function(e){
  var btn=e.target.closest?e.target.closest('[data-amg-card]'):null;
  if(!btn||busy)return;
  if(btn.classList.contains('is-matched'))return;
  var i=btn.getAttribute('data-i'),face=btn.getAttribute('data-face');
  var already=open.indexOf(btn);
  if(already>=0){ /* tapped the same card again: gently unselect */
   btn.classList.remove('is-open');btn.removeAttribute('aria-pressed');
   open.splice(already,1);
   return;
  }
  if(open.length>=2){ /* two wrong cards were open: clear them first */
   open.forEach(function(c){c.classList.remove('is-open','is-no');c.removeAttribute('aria-pressed');});
   open=[];
  }
  btn.classList.add('is-open');
  btn.setAttribute('aria-pressed','true');
  open.push(btn);
  if(open.length<2)return;
  var a=open[0],b=open[1];
  if(a.getAttribute('data-i')===b.getAttribute('data-i')&&a.getAttribute('data-face')!==b.getAttribute('data-face')){
   var L=letters[Number(i)];
   a.classList.remove('is-open');b.classList.remove('is-open');
   a.classList.add('is-matched');b.classList.add('is-matched');
   a.disabled=true;b.disabled=true;
   open=[];matched++;
   say(L.upper+' '+L.letter+' — '+L.word+'! '+(needed-matched>0?(needed-matched)+' pair'+(needed-matched>1?'s':'')+' to go.':''));
   if(matched===needed)completeRound();
  }else{
   busy=true;
   a.classList.add('is-no');b.classList.add('is-no');
   say('Not a pair yet — look again. Which little letter belongs to '+letters[Number(a.getAttribute('data-i'))].upper+'?');
   setTimeout(function(){
    [a,b].forEach(function(c){c.classList.remove('is-open','is-no');c.removeAttribute('aria-pressed');});
    open=[];busy=false;
   },900);
  }
 });
 nextBtn.addEventListener('click',function(){round++;startRound();});
 restartBtn.addEventListener('click',function(){round=0;startRound();});
 game.hidden=false;
 startRound();
})();
