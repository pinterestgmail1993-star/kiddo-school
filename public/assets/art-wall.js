// Art Wall client enhancements (progressive, scoped):
//   1. Casual download deterrence inside the classroom-example gallery —
//      cosmetic only, never interferes with keyboard or screen readers.
//   2. The "Add your artwork" submission form → /api/community/art (multipart).
//      Success is claimed ONLY when the server confirms the upload was stored
//      for review. Without JavaScript the form stays hidden and the honest
//      no-JS note shows instead.
//   3. The "From our families" gallery, filled only from the server's
//      APPROVED list. Pending or rejected artwork is never reachable here.
(function(){
 'use strict';
 // ---- 1. view-only deterrence for the pinned wall ------------------------
 var wall=document.querySelector('[data-aw-wall]');
 if(wall){
  wall.addEventListener('dragstart',function(e){
   if(e.target&&e.target.tagName==='IMG')e.preventDefault();
  });
  wall.addEventListener('contextmenu',function(e){e.preventDefault();});
 }
 // ---- 2. submission form --------------------------------------------------
 var api=window.KiddoCommunity;
 var form=document.querySelector('[data-aw-form]');
 if(form&&api){
  form.hidden=false;
  var status=form.querySelector('[data-aw-status]');
  var sendBtn=form.querySelector('button[type="submit"]');
  var turnstileGetter=null;
  if(api.ensureTurnstile)api.ensureTurnstile(form).then(function(g){turnstileGetter=g;});
  form.addEventListener('submit',function(event){
   event.preventDefault();
   var file=document.getElementById('aw-image');
   var confirmBox=form.querySelector('input[name="confirm"]');
   var title=document.getElementById('aw-title');
   var name=document.getElementById('aw-name');
   var company=document.getElementById('aw-company');
   if(!file||!file.files||!file.files.length){status.textContent='Please choose a picture of the artwork first.';file.focus();return;}
   if(!confirmBox.checked){status.textContent='Please tick the parent confirmation box first.';confirmBox.focus();return;}
   var data=new FormData();
   data.append('image',file.files[0]);
   data.append('title',title?title.value:'');
   data.append('display_name',name?name.value:'');
   data.append('company',company?company.value:'');
   data.append('confirm','true');
   data.append('turnstileToken',turnstileGetter?turnstileGetter():'');
   if(sendBtn)sendBtn.disabled=true;
   status.textContent='Sending…';
   api.postForm('/api/community/art',data).then(function(res){
    if(res.ok&&res.data&&res.data.ok){
     form.reset();
     status.textContent='Thanks! The artwork will go up after the school office reviews it.';
    }else{
     if(sendBtn)sendBtn.disabled=false;
     status.textContent=api.errorText(res,'We couldn\u2019t send that. Please try again.');
    }
   }).catch(function(){
    if(sendBtn)sendBtn.disabled=false;
    status.textContent='We couldn\u2019t send that. Please try again.';
   });
  });
 }
 // ---- 3. approved family artwork -----------------------------------------
 var familyWrap=document.querySelector('[data-aw-family-wrap]');
 var familyList=document.querySelector('[data-aw-family]');
 if(familyWrap&&familyList){
  fetch('/api/community/art').then(function(r){return r.json();}).then(function(data){
   if(!data||!data.ok||!data.art||!data.art.length)return;
   familyList.textContent='';
   data.art.forEach(function(piece){
    var li=document.createElement('li');
    li.className='aw-piece aw-piece-family';
    var img=document.createElement('img');
    img.src='/api/community/art/'+piece.id+'/image';
    img.alt=(piece.title?piece.title:'Artwork')+' — reviewed artwork from a Kiddo School family';
    img.width=800;img.height=1132; // approximate portrait ratio; intrinsic size arrives with the image
    img.loading='lazy';img.decoding='async';img.setAttribute('draggable','false');
    li.appendChild(img);
    var metaLine=piece.title||piece.display_name;
    if(metaLine){
     var cap=document.createElement('p');
     cap.className='aw-family-meta';
     cap.textContent=piece.title?(piece.title+(piece.display_name?' — '+piece.display_name:'')):piece.display_name;
     li.appendChild(cap);
    }
    familyList.appendChild(li);
   });
   familyWrap.hidden=false;
  }).catch(function(){});
 }
})();
