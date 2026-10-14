// Contact, Disclaimer, Terms, Privacy and About copy for Kiddo.school.
// Rule for this file: every topic lives on exactly ONE page and is never
// repeated on another. Contact = how to reach us. Privacy = data. Terms =
// use of the site, copyright, purchases (Paddle) and community posts.
// Disclaimer = safety and no-guarantee notice. About = who we are and why.
export const SITE_EMAIL='hello@kiddo.school';
const mail=`<a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a>`;
export const LEGAL_UPDATED='13 October 2026';

export const contactBody=()=>`<div class="contact-layout">
<form class="po-form" data-contact-form action="#" method="post" novalidate>
<label class="po-field" for="ct-name">Your name <span class="po-req">Required</span>
<input type="text" id="ct-name" name="name" required maxlength="80" autocomplete="name"></label>
<label class="po-field" for="ct-email">Your email <span class="po-req">Required</span>
<input type="email" id="ct-email" name="email" required maxlength="200" autocomplete="email" placeholder="you@example.com"></label>
<label class="po-field" for="ct-topic">What is this about? <span class="po-req">Required</span>
<select id="ct-topic" name="topic" required>
<option value="question">A question</option>
<option value="feedback">Feedback</option>
<option value="suggestion">A suggestion</option>
<option value="technical_problem">A technical problem</option>
<option value="complaint">A complaint</option>
<option value="request">Partnership, copyright or privacy request</option>
</select></label>
<label class="po-field" for="ct-message">Your message <span class="po-req">Required</span>
<textarea id="ct-message" name="message" rows="7" required maxlength="3800"></textarea></label>
<p class="po-privacy">This form is for grown-ups. Please do not include a child’s name, age, photo or school.</p>
<p class="po-hp" aria-hidden="true"><label for="ct-company">Company</label><input type="text" id="ct-company" name="company" tabindex="-1" autocomplete="off"></p>
<div class="po-actions"><button type="submit" class="button">Send message</button><p class="po-status" data-contact-status role="status" aria-live="polite"></p></div>
</form>
<aside class="contact-side"><h2>Email us directly</h2><p>${mail}</p><p>We read every message and aim to reply within a few working days.</p></aside>
</div>`;

export const disclaimerBody=()=>`<p>Last updated: ${LEGAL_UPDATED}.</p>
<h2>General information only</h2>
<p>Everything on Kiddo.school is published in good faith for general information and family learning. We do not guarantee that it is complete, accurate or suitable for every child. Anything you do with it is at your own risk, and we are not liable for any loss or damage arising from the use of this website.</p>
<h2>Not professional advice</h2>
<p>Classes, activities and worksheets are not medical, developmental, therapeutic or teaching advice. Age ranges are guides, never tests or deadlines. If you have a concern about your child’s health or development, please speak with a qualified professional.</p>
<h2>Adult supervision</h2>
<p>Some activities use scissors, small objects, seeds, water, paint or kitchen items. Choose what suits your child, stay close, and keep small parts away from children who still put things in their mouths. You are responsible for the safety of the children you look after.</p>
<h2>Links to other websites</h2>
<p>We may link to other websites. We do not control their content, and a link is not an endorsement of everything on that site. Their owners and content may change without notice, and their own privacy policies and terms apply once you leave Kiddo.school.</p>
<h2>Consent</h2>
<p>By using this website you agree to this disclaimer.</p>
<h2>Updates</h2>
<p>If we change this page, the new version will be posted here with a new date.</p>
<h2>Questions</h2>
<p>To ask about this disclaimer, please <a href="/contact/">contact us</a>.</p>`;

export const termsBody=()=>`<p>Last updated: ${LEGAL_UPDATED}.</p>
<h2>Welcome</h2>
<p>These terms explain the rules for using Kiddo.school. By using the website you accept them. If you do not agree, please do not continue to use it. “We”, “us” and “our” mean Kiddo.school; “you” means the person using the website.</p>
<h2>Using the website</h2>
<p>You may browse, print and use our worksheets, flashcards, coloring pages and activities for personal and classroom use with your own children or students.</p>
<p>You must not republish, sell, rent, sub-license, redistribute or claim our material as your own, or upload it to another website, app or marketplace.</p>
<h2>Copyright</h2>
<p>© 2026 Kiddo.school. All rights reserved. Unless stated otherwise, we and our licensors own the copyright and other intellectual property in all text, illustrations, worksheets, flashcards, code and design on this website. The Kiddo.school name and logo may not be used without our written permission.</p>
<h2>Premium products and payments</h2>
<p>Any premium products we offer are sold through Paddle, our payment provider and merchant of record. Paddle handles checkout, payment, taxes and receipts, and its own terms apply to your purchase. The price, what is included and any refund terms are shown at checkout before you pay.</p>
<h2>Posts and messages from you</h2>
<p>Some areas, such as the Sticky Note Wall and Art Wall, let you send in notes or artwork. You confirm that what you send is yours to share, is suitable for a family audience, and contains no personal details about a child. We review submissions before they appear, may edit or remove anything that breaks these terms, and you give us a non-exclusive licence to display what you send on Kiddo.school. Posts show the views of the person who wrote them, not ours.</p>
<h2>Linking to us</h2>
<p>You are welcome to link to our pages as long as the link is accurate, does not suggest that we endorse you, and fits the context of your site. Please do not place our pages inside frames, and do not use our logo for linking without permission. We may ask you to remove a link at any time.</p>
<h2>Availability and liability</h2>
<p>We work to keep the website accurate and available, but we do not promise that it will always be error-free or online. To the fullest extent the law allows, we are not liable for any loss or damage of any kind arising from your use of the website. Nothing in these terms excludes liability that cannot be excluded by law. Our <a href="/disclaimer/">disclaimer</a> and <a href="/privacy/">privacy policy</a> form part of these terms.</p>
<h2>Changes</h2>
<p>We may update these terms from time to time. The current version is always on this page, and continued use means you accept it.</p>
<h2>Questions</h2>
<p>Please <a href="/contact/">contact us</a> with any question about these terms.</p>`;

export const privacyBody=()=>`<p>Last updated: ${LEGAL_UPDATED}.</p>
<h2>Information we collect</h2>
<p>We collect only what you choose to send us. If you write to us through the contact form, the Principal’s Office or another form, we receive your message and any name or email address you add. We use it to read and reply, and for nothing else. Please never include details about a child.</p>
<h2>What stays on your device</h2>
<p>To remember your place, the website stores small items in your browser’s own storage, such as classes you have finished, saved choices and drawings you have kept. This stays on your device and is never uploaded to us. Clearing your browser data removes it. Handwriting, drawings and typed answers on activity pages exist only in your browser’s memory until you save or close them.</p>
<h2>Log files and hosting</h2>
<p>Our hosting provider, Cloudflare, records ordinary technical details such as IP address, browser type, date and time and the pages requested, in order to deliver and protect the website. We do not link these to who you are.</p>
<h2>Cookies and tracking</h2>
<p>We do not use analytics cookies or tracking pixels. Our host, Cloudflare, may count page views with a cookie-free web analytics script that does not follow visitors across sites. This site shows advertising through Google AdSense. Google, as a third-party vendor, and its partners use cookies and similar technologies to deliver and measure ads. Because our content is made for families with young children, we ask Google to treat the site as child-directed: ads are non-personalised, and no interest-based advertising or ad remarketing is used here, whatever you choose in the cookie notice. You can read how Google uses data from sites that use its services at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">policies.google.com/technologies/partner-sites</a>, manage Google ad settings at <a href="https://adssettings.google.com" rel="noopener">adssettings.google.com</a>, or opt out of third-party vendors’ personalised advertising at <a href="https://www.aboutads.info" rel="noopener">aboutads.info</a>. Where a form shows a human check (Cloudflare Turnstile), that service may set its own cookie to tell people from bots. A cookie notice lets you choose between essential storage only and optional cookies. Your choice is saved in your browser on your own device, and you can change it at any time with the Cookie settings link in the footer of every page.</p>
<h2>Payments</h2>
<p>If you buy a premium product, Paddle processes the payment as merchant of record. Your card and billing details go to Paddle and never reach us. We receive only what Paddle shares to deliver your purchase, such as your email address, country and order details. Paddle’s own privacy notice explains how it uses your data.</p>
<h2>Your rights</h2>
<p>Depending on where you live, you may ask us to give you a copy of the personal data we hold about you, correct it, delete it, restrict or object to how we use it, or move it to another service. We do not sell personal information. To make a request, <a href="/contact/">contact us</a>; we will reply within one month.</p>
<h2>Children</h2>
<p>Kiddo.school is written for parents, carers and teachers to use with children. We do not knowingly collect personal information from children under 13. If you believe a child has sent us any, please contact us and we will remove it promptly.</p>
<h2>Changes</h2>
<p>If we add new services, such as analytics, we will update this page before they start. The date at the top shows the latest version.</p>`;

export const aboutBody=(img)=>`<div class="brand-duo"><div class="brand-art"><img src="${img}" width="1748" height="1240" alt="Three children in purple school uniforms wave and read in front of the school building, from the Kiddo.school welcome illustration." loading="lazy"></div></div>
<h2>Who we are</h2>
<p>Kiddo.school is an independent digital school for curious children and the adults learning alongside them. The journey begins at birth with short, parent-led baby and toddler classes and grows into hands-on classrooms in art, science, nature, maths, stories and engineering. Thirty-five classes from birth to age five are ready today, with more on the drawing table.</p>
<h2>Why we started</h2>
<p>Young children learn best by touching, drawing, counting and talking with someone they love, yet most online learning pulls them toward a screen and leaves parents guessing what to do next. We started Kiddo.school to put the grown-up back in the teacher’s seat: clear steps, printable pages and short classes that fit into a real day, so a few playful minutes together can be enough.</p>
<h2>What you will find here</h2>
<p>Age-guided classes, printable worksheets, flashcards, coloring pages and drawing lessons, each with parent guidance and simple adaptations. A crooked collage, a bridge that bends or a seed that has not sprouted can all begin a useful conversation. The aim is to notice, try, question and make something your own.</p>
<h2 id="principal">From the Principal’s Office</h2>
<p>Welcome to Kiddo.school. This school is a little different: you are the teacher, and we are the helper. Two promises from the school office: age ranges here are guides, never tests or developmental deadlines, and nothing on Kiddo School is a score. Children learn at their own pace, and noticing one red thing together already counts as a class.</p>
<p><a class="text-link" href="/principals-office/">Write to the Principal’s Office <span aria-hidden="true">↗</span></a></p>
<p><a class="button" href="/learning-path/">Explore the Learning Path ↗</a></p>
<h2>Get in touch</h2>
<p>We would love to hear how your family uses the school. Visit the <a href="/contact/">contact page</a> or write to ${mail}.</p>`;
