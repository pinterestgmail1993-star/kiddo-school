// Art Wall view-only enhancements (progressive, scoped to the wall).
// Casual download deterrence only — NOT image protection. Everything here is
// cosmetic: the page works without JavaScript, images keep their alt text,
// and no keyboard or screen-reader behavior is ever intercepted.
(function(){
 'use strict';
 var wall=document.querySelector('[data-aw-wall]');
 if(!wall)return;
 // Stop accidental image dragging (the images also carry draggable="false").
 wall.addEventListener('dragstart',function(e){
  if(e.target&&e.target.tagName==='IMG')e.preventDefault();
 });
 // Suppress the context menu inside the gallery area only — the rest of the
 // page keeps its normal right-click behavior.
 wall.addEventListener('contextmenu',function(e){e.preventDefault();});
})();
