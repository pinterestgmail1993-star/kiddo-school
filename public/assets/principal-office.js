// Principal's Office form handling — connected to the school's private
// records room (Cloudflare D1) through /api/community/principal. The server
// decides what is true: the client shows success only when the server
// confirmed the message was stored. If the mailbox is not reachable (for
// example before the database migration has run), the form says so honestly
// and keeps the draft. Messages are private by design — nothing here
// publishes anything, and no success may be claimed without a server
// confirmation.
(function(){
'use strict';
var api=window.KiddoCommunity;
var form=document.querySelector('[data-po-form]');
if(!form)return;
var status=form.querySelector('[data-po-status]');
var turnstileGetter=null;
var sendBtn=form.querySelector('button[type="submit"]');
function setStatus(text){if(status)status.textContent=text||'';}
if(api&&api.ensureTurnstile){
 // Hidden human check appears only when the server enables Turnstile.
 api.ensureTurnstile(form).then(function(getter){turnstileGetter=getter;});
}
form.addEventListener('submit',function(event){
 event.preventDefault();
 if(!api){ // helper missing (very old browser): stay honest, send nothing
  setStatus('This message couldn\u2019t be sent \u2014 the form needs a browser with JavaScript enabled. Your draft is still here in the form.');
  return;
 }
 var categoryInput=form.querySelector('input[name="po-category"]:checked');
 var subject=form.querySelector('#po-subject');
 var message=form.querySelector('#po-message');
 var name=form.querySelector('#po-name');
 var email=form.querySelector('#po-email');
 if(!categoryInput||!message){setStatus('Please pick a category and write your message.');return;}
 if(sendBtn)sendBtn.disabled=true;
 setStatus('Sending…');
 // The records room stores one message field: the subject line leads it.
 var composed=message.value;
 if(subject&&subject.value.trim())composed=subject.value.trim()+'\n\n'+composed;
 api.postJson('/api/community/principal',{
  category:categoryInput.value,
  message:composed,
  parent_name:name?name.value:'',
  email:email?email.value:'',
  company:(form.querySelector('#po-company')||{}).value||'',
  turnstileToken:turnstileGetter?turnstileGetter():null
 }).then(function(res){
  if(res.ok&&res.data&&res.data.ok){
   form.reset();
   setStatus('Thanks. Your message has been sent to the Principal\u2019s Office.');
  }else{
   if(sendBtn)sendBtn.disabled=false;
   setStatus(api.errorText(res,'We couldn\u2019t send that. Please try again.'));
  }
 }).catch(function(){
  if(sendBtn)sendBtn.disabled=false;
  setStatus('We couldn\u2019t send that. Please try again.');
 });
});
})();
