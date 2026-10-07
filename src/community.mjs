// Kiddo School — Our School Community (/school-community/) plus the shared
// family-feedback markup used on activity/class pages. The page itself is
// static; approved community content (reviews, comments, notes, artwork) is
// fetched at runtime from /api/community/* and only ever shown AFTER a
// grown-up submission has been reviewed and approved in the private admin.
// Nothing here fabricates testimonials: until real reviews are approved the
// Family Reviews section truthfully says there are none yet.
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const crumbNav=parts=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${href}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
// The four reactions use EXACTLY these values: love | like | okay | not_for_us.
// Emoji are never the only label — each button has an accessible text name.
const REACTIONS=[['love','😍','Loved it'],['like','😊','Liked it'],['okay','😐','It was okay'],['not_for_us','😕','Not for us']];
export function communityMount(path,heading){
 const h=heading||'How was this activity?';
 return `<section class="wrap lesson-section cm" data-cm-root data-page-path="${esc(path)}" aria-label="Family feedback">
 <span class="eyebrow">FAMILY FEEDBACK</span>
 <h2>${h}</h2>
 <p class="lesson-copy">Your feedback helps us make Kiddo School better. This is feedback about the activity, for the grown-ups who make it — it is never about a child.</p>
 <noscript><p class="fc-hint">Sending feedback needs JavaScript. You can still enjoy the class together — and you are always welcome to write to the <a href="/principals-office/">Principal&rsquo;s Office</a> instead.</p></noscript>
 <div class="cm-reactions" data-cm-reactions hidden role="group" aria-label="${h} Choose one.">
  ${REACTIONS.map(([v,emoji,label])=>`<button type="button" class="cm-btn" data-cm-reaction="${v}" aria-pressed="false"><span class="cm-emoji" aria-hidden="true">${emoji}</span><span>${label}</span></button>`).join('')}
 </div>
 <form class="cm-form" data-cm-form hidden novalidate>
  <p class="cm-chosen" data-cm-chosen aria-live="polite"></p>
  <label for="cm-comment">Anything you&rsquo;d like to tell us? <span class="cm-optional">(optional)</span></label>
  <textarea id="cm-comment" name="comment" data-cm-comment rows="3" maxlength="300" placeholder="A sentence or two is plenty."></textarea>
  <label for="cm-name">Your name <span class="cm-optional">(optional — a first name, nickname or initials)</span></label>
  <input type="text" id="cm-name" name="displayName" data-cm-name maxlength="40" autocomplete="off">
  <p class="fc-hint">Comments stay short and are read by the school office before they appear. Don&rsquo;t include private information — no surnames, ages or addresses.</p>
  <label class="cm-confirm"><input type="checkbox" data-cm-confirm> I&rsquo;m okay with this comment being reviewed for the Kiddo School community.</label>
  <p class="cm-status" data-cm-status role="status" aria-live="polite"></p>
  <button type="submit" class="button" data-cm-send>Send feedback</button>
 </form>
 <div class="cm-comments" data-cm-comments hidden>
  <h3>Comments from our school community</h3>
  <ul class="cm-list" data-cm-list></ul>
 </div>
</section>`;
}
export function schoolCommunityBody(){
 const cards=`<div class="fc-stages">
  <a class="fc-stage lesson-card-link" href="/art-wall/"><div class="fc-stage-pills"><span class="fc-age">On the wall</span><span class="fc-class">Artwork</span></div><h3>Our Art Wall</h3><p>Classroom drawings on display — and, after a quick review, artwork sent in by families.</p><span class="fc-open">Visit the Art Wall <span aria-hidden="true">↗</span></span></a>
  <a class="fc-stage lesson-card-link" href="/sticky-note-wall/"><div class="fc-stage-pills"><span class="fc-age">On the wall</span><span class="fc-class">Little notes</span></div><h3>Sticky Note Wall</h3><p>Short, friendly notes from families. Every note is read by the school office before it goes up.</p><span class="fc-open">Visit the Sticky Note Wall <span aria-hidden="true">↗</span></span></a>
  <a class="fc-stage lesson-card-link" href="#family-reviews"><div class="fc-stage-pills"><span class="fc-age">From families</span><span class="fc-class">Reviews</span></div><h3>Family Reviews</h3><p>What families say after trying a class or activity together — shown only after a review by the school office.</p><span class="fc-open">Read family reviews <span aria-hidden="true">↓</span></span></a>
 </div>`;
 return `${crumbNav([['School Community']])}
 <section class="wrap section compact">
  <p class="mw-lede" style="margin-top:6px">See what families are making, learning and sharing at Kiddo School.</p>
  <p class="lesson-copy">Kiddo School stays small and safe on purpose. There are no accounts, no profiles, no following and no private messages here — just three simple places where families can take part, with the school office reading everything before it appears. Grown-ups send things in; little learners stay out of it.</p>
  ${cards}
 </section>
 <section class="wrap section compact" id="family-reviews" aria-label="Family reviews">
  <span class="eyebrow">FAMILY REVIEWS</span>
  <h2>What families are saying.</h2>
  <p class="lesson-copy">After trying a class or activity, parents can leave a quick reaction and an optional comment. Nothing appears here until it has been reviewed and approved by the school office.</p>
  <div class="cm-family" data-cm-family>
   <noscript><p class="fc-hint">Loading family reviews needs JavaScript. Everything else on this page works as it is.</p></noscript>
   <p class="cm-empty" data-cm-family-empty>No family reviews yet.</p>
   <ul class="cm-list" data-cm-family-list hidden></ul>
  </div>
 </section>
 <section class="wrap section compact">
  <span class="eyebrow">THE HOUSE RULES</span>
  <h2>How this space stays kind and safe.</h2>
  <ul class="po-rules">
   <li><strong>Grown-ups only submit.</strong> Reviews, comments, notes and artwork are sent in by a parent or guardian — the school doesn&rsquo;t ask children for anything.</li>
   <li><strong>Everything is reviewed first.</strong> Nothing appears on the site until the school office has read it and approved it.</li>
   <li><strong>Keep it private.</strong> A first name, nickname or initials is plenty. Don&rsquo;t include surnames, ages, addresses, or anything else private about a child.</li>
   <li><strong>No letters to the Principal here.</strong> Private notes live in the <a href="/principals-office/">Principal&rsquo;s Office</a> and are never shown publicly — not here, not anywhere.</li>
  </ul>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>Where next?</h2><div class="lesson-linkrow"><a class="lesson-pill-link" href="/my-classroom/">My Classroom</a><a class="lesson-pill-link" href="/learning-path/">Learning Path</a><a class="lesson-pill-link" href="/principals-office/">Principal&rsquo;s Office</a></div></section>`;
}
