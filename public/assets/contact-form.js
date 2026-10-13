// Contact form: sends through the school's existing message box
// (/api/community/principal). Success is claimed only when the server
// confirms the message was stored; otherwise the draft stays in the form.
(function(){
'use strict';
var api=window.KiddoCommunity;
var form=document.querySelector('[data-contact-form]');
if(!form)return;
var status=form.querySelector('[data-contact-status]');
var sendBtn=form.querySelector('button[type="submit"]');
var getToken=null;
var labels={question:'Question',feedback:'Feedback',suggestion:'Suggestion',technical_problem:'Technical problem',complaint:'Complaint',request:'Partnership, copyright or privacy request'};
function say(t){if(status)status.textContent=t||'';}
function val(id){var el=form.querySelector(id);return el?el.value.trim():'';}
if(api&&api.ensureTurnstile){api.ensureTurnstile(form).then(function(g){getToken=g;});}
form.addEventListener('submit',function(e){
 e.preventDefault();
 if(!api){say('This message couldn\u2019t be sent \u2014 the form needs JavaScript. You can also email hello@kiddo.school.');return;}
 var name=val('#ct-name'),email=val('#ct-email'),topic=val('#ct-topic'),message=val('#ct-message');
 if(!name){say('Please enter your name.');return;}
 if(!email||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){say('Please enter a valid email address.');return;}
 if(!message){say('Please write your message.');return;}
 if(sendBtn)sendBtn.disabled=true;
 say('Sending\u2026');
 api.postJson('/api/community/principal',{
  category:labels[topic]?topic:'question',
  message:'['+(labels[topic]||'Question')+']\n\n'+message,
  parent_name:name,
  email:email,
  company:val('#ct-company'),
  turnstileToken:getToken?getToken():null
 }).then(function(res){
  if(res.ok&&res.data&&res.data.ok){form.reset();if(sendBtn)sendBtn.disabled=false;say('Thank you. Your message has been sent and we will reply by email.');}
  else{if(sendBtn)sendBtn.disabled=false;say(api.errorText(res,'We couldn\u2019t send that. Please try again or email hello@kiddo.school.'));}
 }).catch(function(){if(sendBtn)sendBtn.disabled=false;say('We couldn\u2019t send that. Please try again or email hello@kiddo.school.');});
});
})();
