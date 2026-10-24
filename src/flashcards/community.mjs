// Kiddo School — the shared family-feedback mount (reactions, moderated
// parent reviews, moderated parent comments). One implementation for every
// page type: flashcard sets and cards, worksheets, coloring pages and the
// Learning Path activity pages. The runtime wiring lives in
// /assets/flashcards-community.js + /assets/community-api.js, which talk to
// the same /api/community/* endpoints as the rest of the school.
//
// Kept in its own module so templates that cannot import flashcards/index.mjs
// (the alphabet letter sets — index.mjs imports THEM) mount the same block.
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const REACTIONS=[['love','😍','Loved it'],['like','😊','Liked it'],['okay','😐','It was okay'],['not_for_us','😕','Not for us']];

// ---- Reactions + reviews + comments (three separate things, kept separate) --
// Reactions: one tap, no text, counted live. Reviews: star rating + optional
// text, moderated. Comments: text only, moderated. Each has its own storage
// (page_reactions / page_reviews / page_comments) and its own block here.
export function fcCommunityMount(path){
 return `<section class="wrap lesson-section cm" data-fc-root data-page-path="${esc(path)}" aria-label="Family feedback">
 <span class="eyebrow">REACTIONS</span>
 <h2>How did it go?</h2>
 <p class="lesson-copy">One tap, no writing, no name. Pick the face that matches how it went — reactions are counted instantly and stay anonymous.</p>
 <noscript><p class="fc-hint">Tapping a reaction needs JavaScript. Everything else on this page works without it — and you are always welcome to write to the <a href="/principals-office/">Principal&rsquo;s Office</a> instead.</p></noscript>
 <div class="fc2-reactions" data-fc-reactions hidden role="group" aria-label="How did your kiddo like this? Choose one.">
  ${REACTIONS.map(([v,emoji,label])=>`<button type="button" class="cm-btn" data-fc-reaction="${v}" aria-pressed="false"><span class="cm-emoji" aria-hidden="true">${emoji}</span><span>${label}</span><span class="fc2-count" data-fc-count="${v}" hidden aria-hidden="true"></span></button>`).join('')}
 </div>
 <p class="fc2-inline" data-fc-reacted hidden role="status" aria-live="polite"></p>

 <div class="fc2-block">
  <span class="eyebrow">PARENT REVIEWS</span>
  <h2>Parent reviews.</h2>
  <p class="lesson-copy">A different thing from the quick faces above: a star rating for the grown-ups, plus an optional line about how it went.</p>
  <noscript><p class="fc-hint">Sending a review needs JavaScript. The cards themselves work fine without it.</p></noscript>
  <div class="fc2-listwrap" data-fc-reviews-box hidden>
   <ul class="cm-list" data-fc-reviews></ul>
  </div>
  <p class="cm-empty" data-fc-reviews-empty>No parent reviews yet — yours could be the first.</p>
  <form class="cm-form" data-fc-review-form hidden novalidate>
   <fieldset class="fc2-stars">
    <legend>Your rating <span class="cm-optional">(required)</span></legend>
    <div class="fc2-star-row" role="radiogroup" aria-label="Rating from 1 to 5 stars">
     ${[1,2,3,4,5].map(n=>`<label class="fc2-star"><input type="radio" name="fc-rating" value="${n}" data-fc-star><span aria-hidden="true">★</span><span class="fc2-star-text">${n} star${n>1?'s':''}</span></label>`).join('')}
    </div>
   </fieldset>
   <label for="fc-review-text">Anything to add? <span class="cm-optional">(optional)</span></label>
   <textarea id="fc-review-text" name="comment" data-fc-review-comment rows="3" maxlength="300" placeholder="What worked, what did not — a sentence or two is plenty."></textarea>
   <label for="fc-review-name">Your name <span class="cm-optional">(optional — a first name, nickname or initials)</span></label>
   <input type="text" id="fc-review-name" name="displayName" data-fc-review-name maxlength="40" autocomplete="off">
   <p class="fc-hint">Reviews are read by the school office before they appear. Don&rsquo;t include private information — no surnames, ages or addresses.</p>
   <label class="cm-confirm"><input type="checkbox" data-fc-review-confirm> I&rsquo;m the grown-up, and I&rsquo;m okay with this review being read for the Kiddo School community.</label>
   <p class="cm-status" data-fc-review-status role="status" aria-live="polite"></p>
   <button type="submit" class="button" data-fc-review-send>Send review</button>
  </form>
 </div>

 <div class="fc2-block">
  <span class="eyebrow">PARENT COMMENTS</span>
  <h2>Parent comments.</h2>
  <p class="lesson-copy">How did you use this page? Share the game, the moment or the trick that worked in your house — your ideas, never details about your child.</p>
  <noscript><p class="fc-hint">Sending a comment needs JavaScript. The cards themselves work fine without it.</p></noscript>
  <div class="fc2-listwrap" data-fc-comments-box hidden>
   <ul class="cm-list" data-fc-comments></ul>
  </div>
  <p class="cm-empty" data-fc-comments-empty>No parent comments yet — yours could be the first.</p>
  <form class="cm-form" data-fc-comment-form hidden novalidate>
   <label for="fc-comment-text">Your comment <span class="cm-optional">(required)</span></label>
   <textarea id="fc-comment-text" name="comment" data-fc-comment-text rows="3" maxlength="300" placeholder="A sentence or two is plenty."></textarea>
   <label for="fc-comment-name">Your name <span class="cm-optional">(optional — a first name, nickname or initials)</span></label>
   <input type="text" id="fc-comment-name" name="displayName" data-fc-comment-name maxlength="40" autocomplete="off">
   <p class="fc-hint">Please don&rsquo;t include private information — no surnames, ages, addresses or anything private about your child.</p>
   <label class="cm-confirm"><input type="checkbox" data-fc-comment-confirm> I&rsquo;m the grown-up, and I&rsquo;m okay with this comment being read for the Kiddo School community.</label>
   <p class="cm-status" data-fc-comment-status role="status" aria-live="polite"></p>
   <button type="submit" class="button" data-fc-comment-send>Send comment</button>
  </form>
 </div>
 </section>`;
}
