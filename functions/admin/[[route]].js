// Kiddo School Admin (Pages Function) — /admin/*.
// ONE private admin panel for everything: Principal's Office, Sticky Notes,
// Art Wall, Reviews, Comments. The HTML shell is served ONLY after the
// request passes Cloudflare Access verification; with Access unconfigured
// this page is a locked door (503), never a login form. Client logic lives
// in the public /assets/admin.js (which contains no secrets — every admin
// capability sits behind the server-side Access check on the APIs).

import { requireAdmin } from '../lib/access.js';

export async function onRequest(context) {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Kiddo School Admin</title><style>
:root{--ink:#1e2a44;--paper:#fffdf7;--line:#d9d2c0;--sage:#5b7a63;--rust:#b4553c;--soft:#f4efe3}
*{box-sizing:border-box}body{margin:0;font:16px/1.55 Georgia,serif;background:var(--soft);color:var(--ink)}
.wrap{max-width:1060px;margin:0 auto;padding:0 20px}
header{background:var(--paper);border-bottom:2px solid var(--line);padding:18px 0}
h1{font-size:26px;margin:0}h1 small{display:block;font-size:13px;font-weight:400;color:#6b6553;margin-top:4px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin:26px 0}
.card{background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:16px;cursor:pointer;text-align:left;font:inherit}
.card:hover,.card:focus-visible{outline:3px solid var(--sage);outline-offset:2px}
.card strong{display:block;font-size:30px;font-family:Georgia,serif}
.card span{font-size:14px;color:#6b6553}
.queue{background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:20px;margin-bottom:28px}
.filters{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}
.filters button{font:inherit;padding:6px 14px;border-radius:99px;border:1px solid var(--line);background:#fff;cursor:pointer}
.filters button[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
select{font:inherit;padding:6px 10px;border-radius:8px;border:1px solid var(--line)}
.item{border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin:12px 0;background:#fff}
.item .meta{font-size:13px;color:#6b6553;margin:2px 0 8px}
.item .msg{white-space:pre-wrap;overflow-wrap:anywhere}
.badge{display:inline-block;font-size:12px;padding:2px 10px;border-radius:99px;border:1px solid var(--line);background:var(--soft)}
.badge.approved{border-color:var(--sage);color:var(--sage)}.badge.rejected{border-color:var(--rust);color:var(--rust)}
.artimg{max-width:280px;max-height:280px;border:1px solid var(--line);border-radius:8px;display:block;margin:8px 0}
.actions{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
.actions button{font:inherit;padding:8px 16px;border-radius:8px;border:1px solid var(--line);background:#fff;cursor:pointer}
.actions button.approve{border-color:var(--sage);color:var(--sage)}.actions button.reject{border-color:var(--rust);color:var(--rust)}
.actions button:hover,.actions button:focus-visible{outline:2px solid var(--ink);outline-offset:1px}
.empty{color:#6b6553;font-style:italic}
.note{font-size:13px;color:#6b6553}
h2{font-size:20px;margin:28px 0 4px}
@media(max-width:640px){.cards{grid-template-columns:1fr 1fr}}
</style></head><body>
<header><div class="wrap"><h1>Kiddo School Admin <small>One room for all community content — protected by Cloudflare Access</small></h1></div></header>
<main class="wrap">
 <p class="note" id="db-note" hidden></p>
 <section aria-label="Queues at a glance"><div class="cards">
  <button class="card" data-goto="principal"><strong id="c-principal">…</strong><span>New Principal Messages</span></button>
  <button class="card" data-goto="notes"><strong id="c-notes">…</strong><span>Pending Sticky Notes</span></button>
  <button class="card" data-goto="art"><strong id="c-art">…</strong><span>Pending Art</span></button>
  <button class="card" data-goto="reviews"><strong id="c-reviews">…</strong><span>Pending Reviews</span></button>
  <button class="card" data-goto="comments"><strong id="c-comments">…</strong><span>Pending Comments</span></button>
 </div></section>
 <section class="queue" id="queue" aria-live="polite"></section>
</main>
<script src="/assets/admin.js" defer></script>
</body></html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'same-origin',
      'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'unsafe-inline'; img-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'",
    },
  });
}
