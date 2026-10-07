// Kiddo School Admin (Pages Function) — /admin/*.
// ONE private admin panel for everything: Principal's Office, Sticky Notes,
// Art Wall, Reviews, Comments. Served via session-cookie login:
//
//   GET  /admin/         → login page (no session) or dashboard (valid session)
//   POST /admin/         → login: CSRF token + username + password + rate limit
//   POST /admin/logout   → clears the session cookie (same-origin only)
//
// FAIL-CLOSED: until ADMIN_USERNAME and ADMIN_PASSWORD_HASH secrets are set,
// this page is a locked door (503), never a working login form. The client
// logic in /assets/admin.js contains no secrets — every capability sits
// behind the server-side session check on the APIs. The session cookie is
// HttpOnly, Secure and SameSite=Strict; login is rate-limited per IP in D1.

import {
  requireAdmin, adminConfigured, verifyLogin, createSessionToken, sessionCookieValue,
  clearSessionCookieValue, newCsrfToken, csrfCookieValue, clearCsrfCookieValue, readCsrfCookie,
} from '../lib/access.js';
import { rateLimit } from '../lib/security.js';

const BASE_STYLES = `
:root{--ink:#1e2a44;--paper:#fffdf7;--line:#d9d2c0;--sage:#5b7a63;--rust:#b4553c;--soft:#f4efe3}
*{box-sizing:border-box}body{margin:0;font:16px/1.55 Georgia,serif;background:var(--soft);color:var(--ink)}
.wrap{max-width:1060px;margin:0 auto;padding:0 20px}
header{background:var(--paper);border-bottom:2px solid var(--line);padding:18px 0}
h1{font-size:26px;margin:0}h1 small{display:block;font-size:13px;font-weight:400;color:#6b6553;margin-top:4px}
.note{font-size:13px;color:#6b6553}`;

const SECURITY_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
  'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'unsafe-inline'; img-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
};

const ORIGIN_RE = /^https:\/\/([a-z0-9-]+\.)*kiddo-school\.pages\.dev$|^https:\/\/(www\.)?kiddo\.school$/;

function htmlResponse(html, status = 200, setCookies = []) {
  const headers = new Headers({ 'Content-Type': 'text/html; charset=utf-8', ...SECURITY_HEADERS });
  for (const c of setCookies) headers.append('Set-Cookie', c);
  return new Response(html, { status, headers });
}

function redirect(location, setCookies = []) {
  const headers = new Headers({ Location: location, ...SECURITY_HEADERS });
  for (const c of setCookies) headers.append('Set-Cookie', c);
  return new Response(null, { status: 303, headers });
}

function loginPage({ error = '', csrf = null } = {}) {
  const errorHtml = error ? `<p class="login-error" role="alert">${error}</p>` : '';
  const form = csrf ? `<form method="post" action="/admin/">
<input type="hidden" name="csrf" value="${csrf}">
<label for="f-user">Email or username</label>
<input id="f-user" name="username" type="text" autocomplete="username" required>
<label for="f-pass">Password</label>
<input id="f-pass" name="password" type="password" autocomplete="current-password" required>
${errorHtml}
<button type="submit">Log In</button>
</form>` : `${errorHtml}<p class="note"><a href="/admin/">Try again</a></p>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Kiddo School Admin — Log in</title><style>
${BASE_STYLES}
main{max-width:420px;margin:8vh auto 0;padding:0 20px}
.card{background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:28px}
label{display:block;font-size:14px;margin:14px 0 4px}
input{width:100%;font:inherit;padding:10px 12px;border:1px solid var(--line);border-radius:8px;background:#fff}
button{font:inherit;width:100%;margin-top:18px;padding:11px 16px;border:1px solid var(--ink);border-radius:8px;background:var(--ink);color:#fff;cursor:pointer}
button:hover,button:focus-visible{outline:3px solid var(--sage);outline-offset:2px}
.login-error{color:var(--rust);font-size:14px;margin:12px 0 0}
p{margin:10px 0 0}
</style></head><body>
<main><div class="card">
<h1>Kiddo School Admin</h1>
<p class="note">This room is for the school office only. Parents never need an account here — everything you can do as a family lives on the public site.</p>
${form}
</div></main>
</body></html>`;
}

function dashboardHtml() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Kiddo School Admin</title><style>
${BASE_STYLES}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin:26px 0}
.card{background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:16px;cursor:pointer;text-align:left;font:inherit}
.card:hover,.card:focus-visible{outline:3px solid var(--sage);outline-offset:2px}
.card strong{display:block;font-size:30px;font-family:Georgia,serif}
.card span{font-size:14px;color:#6b6553}
.queue{background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:20px;margin-bottom:28px}
.filters{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}
.filters button{font:inherit;padding:6px 14px;border-radius:99px;border:1px solid var(--line);background:#fff;cursor:pointer;width:auto;margin:0}
.filters button[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
select{font:inherit;padding:6px 10px;border-radius:8px;border:1px solid var(--line)}
.item{border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin:12px 0;background:#fff}
.item .meta{font-size:13px;color:#6b6553;margin:2px 0 8px}
.item .msg{white-space:pre-wrap;overflow-wrap:anywhere}
.badge{display:inline-block;font-size:12px;padding:2px 10px;border-radius:99px;border:1px solid var(--line);background:var(--soft)}
.badge.approved{border-color:var(--sage);color:var(--sage)}.badge.rejected{border-color:var(--rust);color:var(--rust)}
.artimg{max-width:280px;max-height:280px;border:1px solid var(--line);border-radius:8px;display:block;margin:8px 0}
.actions{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
.actions button{font:inherit;padding:8px 16px;border-radius:8px;border:1px solid var(--line);background:#fff;cursor:pointer;width:auto;margin:0}
.actions button.approve{border-color:var(--sage);color:var(--sage)}.actions button.reject{border-color:var(--rust);color:var(--rust)}
.actions button:hover,.actions button:focus-visible{outline:2px solid var(--ink);outline-offset:1px}
.empty{color:#6b6553;font-style:italic}
h2{font-size:20px;margin:28px 0 4px}
.logout{font:inherit;float:right;margin-top:4px;padding:7px 16px;border-radius:8px;border:1px solid var(--line);background:#fff;color:var(--ink);cursor:pointer;width:auto}
.logout:hover,.logout:focus-visible{outline:2px solid var(--rust);outline-offset:1px}
@media(max-width:640px){.cards{grid-template-columns:1fr 1fr}}
</style></head><body>
<header><div class="wrap"><button type="button" class="logout" id="logout" hidden>Log out</button><h1>Kiddo School Admin <small>One room for all community content — private login, everything moderated before it goes public</small></h1></div></header>
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
}

function lockedHtml() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><title>Kiddo School Admin</title><style>${BASE_STYLES}</style></head><body><main style="max-width:520px;margin:10vh auto;padding:0 20px"><h1>Kiddo School Admin</h1><p>The admin room is locked — admin login is not configured yet. The site owner can finish setup with the deployment notes.</p></main></body></html>`;
}

function jsonError(status, error) {
  return new Response(JSON.stringify({ ok: false, error }), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
  });
}

async function handleLoginPost(request, env) {
  if (!adminConfigured(env)) return htmlResponse(lockedHtml(), 503);

  // Layer 0: a browser form POST always carries Origin; a cross-site one is rejected.
  const origin = request.headers.get('Origin');
  if (origin && !ORIGIN_RE.test(origin)) return jsonError(403, 'Not allowed.');

  // Layer 1: rate limit BEFORE touching the password — brute force hits the window.
  const limited = await rateLimit(env, request, 'admin-login', 5);
  if (!limited.ok) {
    const csrf = newCsrfToken();
    return htmlResponse(loginPage({ error: 'Too many attempts. Please wait a little while and try again.', csrf }), 429, [csrfCookieValue(csrf)]);
  }

  // Layer 2: CSRF double-submit check (cookie + hidden field must match).
  const form = await request.formData().catch(() => null);
  if (!form) return htmlResponse(loginPage({ error: 'The login form could not be read. Please try again.' }), 400);
  const csrfField = String(form.get('csrf') || '');
  const csrfCookie = readCsrfCookie(request) || '';
  if (!csrfField || !csrfCookie || csrfField !== csrfCookie) {
    const csrf = newCsrfToken();
    return htmlResponse(loginPage({ error: 'This login form expired. Please try again.', csrf }), 403, [csrfCookieValue(csrf)]);
  }

  // Layer 3: verify credentials. Generic error — no hint about which half matched.
  const username = String(form.get('username') || '');
  const password = String(form.get('password') || '');
  const ok = await verifyLogin(env, username, password);
  if (!ok) {
    return htmlResponse(loginPage({ error: 'Wrong email or password.', csrf: csrfField }), 401, [csrfCookieValue(csrfCookie)]);
  }

  // Success: session cookie in, CSRF cookie out.
  const { token, maxAge } = await createSessionToken(env);
  return redirect('/admin/', [sessionCookieValue(token, maxAge), clearCsrfCookieValue()]);
}

export async function onRequest(context) {
  const { request, env } = context;
  const parts = context.params && context.params.route ? context.params.route : [];
  const route = Array.isArray(parts) ? parts.join('/') : String(parts || '');

  if (request.method === 'POST' && route === 'logout') {
    const origin = request.headers.get('Origin');
    if (origin && !ORIGIN_RE.test(origin)) return jsonError(403, 'Not allowed.');
    return redirect('/admin/', [clearSessionCookieValue()]);
  }

  if (request.method === 'POST') return handleLoginPost(request, env);

  if (request.method === 'GET') {
    if (!adminConfigured(env)) return htmlResponse(lockedHtml(), 503);
    const denied = await requireAdmin(request, env);
    if (!denied) return htmlResponse(dashboardHtml());
    const csrf = newCsrfToken();
    return htmlResponse(loginPage({ csrf }), 200, [csrfCookieValue(csrf)]);
  }

  return jsonError(405, 'Method not allowed.');
}
