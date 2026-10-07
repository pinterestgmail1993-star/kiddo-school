// Principal's Office form handling — HONEST BY DESIGN.
// This static site has no backend: there is nowhere to send a message and
// nowhere to store one. So the submit handler never fakes success. It repeats
// the honest notice and leaves the draft on screen (nothing is cleared,
// nothing is transmitted, nothing is saved). No success message exists here,
// and none may be added until a real, verified mailbox backend exists.
(function(){
'use strict';
var form=document.querySelector('[data-po-form]');
if(!form)return;
var status=form.querySelector('[data-po-status]');
form.addEventListener('submit',function(event){
 event.preventDefault();
 if(status){
  status.textContent='This message couldn\u2019t be sent \u2014 the Principal\u2019s mailbox isn\u2019t connected yet, so nothing was sent or saved. Your draft is still here in the form.';
 }
});
})();
