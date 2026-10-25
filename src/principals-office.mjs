// Kiddo School Principal's Office: a private note box for parents and
// grown-ups, connected to the school's private records room (Cloudflare D1).
// Submissions are stored with status 'new', read only in the protected admin
// panel — never published anywhere on the site. Email is OPTIONAL and is
// used only if the parent wants a reply; there is no other collection. The
// form is for grown-ups: nothing here asks for a child's name, age or any
// details about a child. The client (principal-office.js) claims success
// ONLY when the server confirms the message was stored.
export function principalOfficeBody(){
 const cats=[['Question','question'],['Request','request'],['Feedback','feedback'],['Suggestion','suggestion'],['Complaint','complaint'],['Technical Problem','technical_problem']];
 const catField=cats.map((c,i)=>`<span class="po-cat"><input type="radio" id="po-cat-${i}" name="po-category" value="${c[1]}"${i===0?' checked':''}><label for="po-cat-${i}">${c[0]}</label></span>`).join('');
 return `<section class="wrap section compact">
 <div class="po-room">
  <div class="tc-note-block tc-principal po-hello">
   <span class="eyebrow">FROM THE PRINCIPAL’S DESK</span>
   <p class="tc-say">“Welcome in. This school is a little different: you are the teacher, and we are the helper. If something here works well for your family — or if something doesn’t — I would genuinely like to hear it.”</p>
   <p class="tc-who">— The Principal, Kiddo.school</p>
  </div>
  <form class="po-form" data-po-form action="#" method="post">
   <p class="po-offline"><strong>This note goes straight to the Principal.</strong> Your email is optional — it is used only if you’d like a reply.</p>
   <fieldset class="po-cats">
    <legend>What kind of note is it?</legend>
    ${catField}
   </fieldset>
   <label class="po-field" for="po-subject">What is this about? <span class="po-req">Required</span>
    <input type="text" id="po-subject" name="po-subject" required maxlength="140" autocomplete="off" placeholder="One short line is plenty">
   </label>
   <label class="po-field" for="po-message">Your message <span class="po-req">Required</span>
    <textarea id="po-message" name="po-message" rows="6" required maxlength="4000" placeholder="A sentence or two is plenty."></textarea>
   </label>
   <label class="po-field" for="po-name">Parent name <span class="po-opt">Optional</span>
    <input type="text" id="po-name" name="po-name" maxlength="80" autocomplete="name" placeholder="However you like to be called">
   </label>
   <label class="po-field" for="po-email">Your email <span class="po-opt">Optional — only if you’d like a reply</span>
    <input type="email" id="po-email" name="po-email" maxlength="200" autocomplete="email" placeholder="you@example.com">
   </label>
   <p class="po-privacy"><strong>Please keep private details out of your message.</strong> This form is for grown-ups and never asks for anything about a child.</p>
   <p class="po-hp" aria-hidden="true"><label for="po-company">Company</label><input type="text" id="po-company" name="company" tabindex="-1" autocomplete="off"></p>
   <div class="po-actions">
    <button type="submit" class="button">Send to the Principal’s Office</button>
    <p class="po-status" data-po-status role="status" aria-live="polite"></p>
   </div>
  </form>
 </div>
 </section>
 <section class="wrap section compact po-promises">
  <span class="eyebrow">THE OFFICE RULES</span>
  <h2>What happens to a note here</h2>
  <ul class="po-rules">
   <li><strong>Only the Principal reads it.</strong> Messages sent through this page go to the Principal’s Office — not to teachers, not to other parents.</li>
   <li><strong>Complaints are never public.</strong> A complaint is never published, never quoted and never added to any wall on this site.</li>
   <li><strong>No child details, ever.</strong> The school doesn’t collect children’s names, ages, photos or school names through this page.</li>
  </ul>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>Where next?</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/my-classroom/">My Classroom</a><a class="lesson-pill-link" href="/school-community/">School Community</a><a class="lesson-pill-link" href="/about/">About the school</a></div></section>`;
}
