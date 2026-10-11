// Shared security helpers for all Kiddo School Pages Functions.
// Everything a visitor submits is UNTRUSTED: validate server-side, bind every
// value through D1 prepared statements, never render submitted HTML, never
// leak stack traces or SQL errors.

export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
};

const MAX_JSON_BYTES = 8192;      // 8 KB cap on JSON bodies
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB cap on artwork uploads

export function resp(body, { status = 200, headers = {} } = {}) {
  return new Response(body, {
    status,
    headers: { ...SECURITY_HEADERS, 'Cache-Control': 'no-store', ...headers },
  });
}
export function json(data, { status = 200, headers = {} } = {}) {
  return resp(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers } });
}
export const badRequest = (error, fields) => json({ ok: false, error, ...(fields ? { fields } : {}) }, { status: 400 });
export const tooLarge = (error) => json({ ok: false, error }, { status: 413 });
export const unsupported = (error) => json({ ok: false, error }, { status: 415 });
export const tooFast = (error) => json({ ok: false, error }, { status: 429 });
export const unavailable = (error) => json({ ok: false, error }, { status: 503 });
export const serverError = () => json({ ok: false, error: 'Something went wrong on our side. Please try again.' }, { status: 500 });

export function methodGuard(request, allowed) {
  if (!allowed.includes(request.method)) {
    return json({ ok: false, error: 'Method not allowed.' }, { status: 405, headers: { Allow: allowed.join(', ') } });
  }
  return null;
}

// ---- CSRF / same-origin protection -------------------------------------
// Layer 1: browser POSTs must originate from our own hosts.
// Layer 2: a custom header that cross-origin forms/fetches cannot add without
// a CORS preflight we never approve. No cookies are used for identities, so
// this is appropriate CSRF protection for these anonymous endpoints.
const ALLOWED_ORIGIN_RE = /^https:\/\/([a-z0-9-]+\.)*kiddo-school\.pages\.dev$|^https:\/\/(www\.)?kiddo\.school$/;
export function originGuard(request) {
  const origin = request.headers.get('Origin');
  if (origin && !ALLOWED_ORIGIN_RE.test(origin)) {
    return json({ ok: false, error: 'Not allowed.' }, { status: 403 });
  }
  if (request.headers.get('X-Kiddo-Community') !== '1') {
    return json({ ok: false, error: 'Missing required header.' }, { status: 403 });
  }
  return null;
}

export async function readJson(request) {
  const length = Number(request.headers.get('Content-Length') || 0);
  if (length > MAX_JSON_BYTES) return { error: tooLarge('That is too much data. Please keep it short.') };
  let raw;
  try { raw = await request.text(); } catch { return { error: badRequest('We could not read that submission.') }; }
  if (raw.length > MAX_JSON_BYTES) return { error: tooLarge('That is too much data. Please keep it short.') };
  let data;
  try { data = JSON.parse(raw); } catch { return { error: badRequest('We could not read that submission.') }; }
  if (typeof data !== 'object' || data === null || Array.isArray(data)) return { error: badRequest('We could not read that submission.') };
  return { data };
}

// ---- Text sanitization --------------------------------------------------
// Plain text in, plain text out. Strips control characters (keeping newlines
// for message bodies), collapses whitespace, enforces the maximum length.
// Values are only ever rendered client-side via textContent or server-side
// via escapeHtml — never as raw HTML.
export function cleanText(value, max, { multiline = false } = {}) {
  if (typeof value !== 'string') return null;
  let text = value.replace(/\r\n/g, '\n').replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '');
  if (!multiline) text = text.replace(/\s+/g, ' ');
  text = text.trim();
  if (!text) return null;
  if (text.length > max) return undefined; // undefined signals "too long"
  return text;
}

export function cleanEmail(value) {
  if (typeof value !== 'string') return null;
  const email = value.trim();
  if (!email) return null;
  if (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return undefined;
  return email;
}

// Honeypot: hidden field that only bots fill in.
export function honeypot(data) {
  const v = data.company ?? data.website;
  return typeof v === 'string' && v.trim() !== '';
}

// ---- Rate limiting (per IP + route, sliding 10-minute window) -----------
const WINDOW_MS = 10 * 60 * 1000;
export async function rateLimit(env, request, route, limit) {
  if (!env.DB) return { ok: true }; // fail-open only when D1 is absent entirely; endpoints still require DB for writes
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const now = Date.now();
  const nowIso = new Date(now).toISOString();
  const cutoff = new Date(now - WINDOW_MS).toISOString();
  try {
    // Prepared statements only — the ip/route values are always bound, never interpolated.
    const row = await env.DB.prepare('SELECT window_start, count FROM rate_limits WHERE route = ?1 AND ip = ?2').bind(route, ip).first();
    if (!row || row.window_start < cutoff) {
      await env.DB.prepare(
        'INSERT INTO rate_limits (route, ip, window_start, count) VALUES (?1, ?2, ?3, 1) ON CONFLICT (route, ip) DO UPDATE SET window_start = ?3, count = 1'
      ).bind(route, ip, nowIso).run();
      // opportunistic cleanup of long-dead windows
      await env.DB.prepare('DELETE FROM rate_limits WHERE window_start < ?1').bind(cutoff).run();
      return { ok: true };
    }
    if (row.count >= limit) {
      return { ok: false, response: tooFast('That was a few too many, too quickly. Please try again a little later.') };
    }
    await env.DB.prepare('UPDATE rate_limits SET count = count + 1 WHERE route = ?1 AND ip = ?2').bind(route, ip).run();
    return { ok: true };
  } catch {
    // If rate limiting fails (e.g. tables not migrated yet) we let the request
    // continue — the write itself will honestly fail later if D1 is not ready.
    return { ok: true };
  }
}

// ---- Turnstile (optional; enabled only when the secret is configured) ----
export async function turnstileGuard(env, token) {
  if (!env.TURNSTILE_SECRET_KEY) return null; // not configured → skip
  if (!token || typeof token !== 'string') return badRequest('Please complete the human check.');
  try {
    const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const result = await verify.json();
    if (!result.success) return badRequest('The human check did not pass. Please try again.');
  } catch {
    return serverError();
  }
  return null;
}

// ---- HTML escaping for server-rendered admin pages ----------------------
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export const LIMITS = { MAX_JSON_BYTES, MAX_UPLOAD_BYTES };
