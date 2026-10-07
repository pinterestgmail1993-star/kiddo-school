// Kiddo School admin authentication — session-cookie login.
//
// Replaces the previous Cloudflare Access JWT check. The operator sets TWO
// Cloudflare secrets in the Pages dashboard:
//
//   ADMIN_USERNAME       the login name (an email or username)
//   ADMIN_PASSWORD_HASH  a PBKDF2 hash string produced by
//                        scripts/hash-admin-password.mjs — NEVER a plaintext
//                        password (optionally ADMIN_SESSION_SECRET as an
//                        independent signing key; when unset the signing key
//                        is derived from ADMIN_PASSWORD_HASH, which is a
//                        high-entropy secret that never leaves the runtime).
//
// FAIL-CLOSED: with either secret unset every admin request is denied (503)
// — the admin area simply does not open until setup is finished. There is no
// bypass, no default account and no client-side check. Sessions are signed
// HMAC-SHA256 tokens in a Secure, HttpOnly, SameSite=Strict cookie with a
// 12-hour expiry; there is no session table, so the D1 schema is untouched.
//
// State-changing admin API requests additionally require the same-origin +
// custom-header guard (see the API router), so a cross-site page can neither
// read nor write anything in the admin.

import { verifyLoginPassword, normalizeUsername } from './passwords.js';

const SESSION_COOKIE = 'kiddo_admin_session';
const CSRF_COOKIE = 'kiddo_admin_csrf';
const SESSION_TTL_SECONDS = 12 * 60 * 60; // 12 hours
const CSRF_TTL_SECONDS = 10 * 60; // login form tokens live 10 minutes

function b64urlEncode(bytes) {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/_/g, '/').replace(/=+$/, '');
}

function b64urlDecode(str) {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/') + pad);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

export function adminConfigured(env) {
  return Boolean(env && env.ADMIN_USERNAME && env.ADMIN_PASSWORD_HASH);
}

async function signingKey(env) {
  let material = env.ADMIN_SESSION_SECRET;
  if (!material) {
    // Deterministic derivation from the password-hash secret. The hash string
    // contains a random salt and a random digest, so this key is high-entropy
    // and unknown to anyone without the secret.
    const base = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('kiddo-admin-session-v1:' + env.ADMIN_PASSWORD_HASH));
    material = b64urlEncode(new Uint8Array(base));
  }
  return crypto.subtle.importKey('raw', new TextEncoder().encode(material), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

async function hmac(env, message) {
  const key = await signingKey(env);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return b64urlEncode(new Uint8Array(sig));
}

// createSessionToken(env) → { token, maxAge }. Token format:
//   v1.<expiry-epoch>.<nonce-base64url>.<hmac-base64url>
export async function createSessionToken(env) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const nonce = b64urlEncode(crypto.getRandomValues(new Uint8Array(32)));
  const body = `v1.${exp}.${nonce}`;
  const sig = await hmac(env, body);
  return { token: `${body}.${sig}`, maxAge: SESSION_TTL_SECONDS };
}

// verifySessionToken(env, token) → { ok:true, exp } | { ok:false }
export async function verifySessionToken(env, token) {
  if (typeof token !== 'string' || !adminConfigured(env)) return { ok: false };
  const parts = token.split('.');
  if (parts.length !== 4 || parts[0] !== 'v1') return { ok: false };
  const exp = Number(parts[1]);
  if (!Number.isInteger(exp) || exp * 1000 < Date.now()) return { ok: false };
  const expected = await hmac(env, `${parts[0]}.${parts[1]}.${parts[2]}`);
  if (expected.length !== parts[3].length) return { ok: false };
  // constant-time compare
  const a = new TextEncoder().encode(expected);
  const b = new TextEncoder().encode(parts[3]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  if (diff !== 0) return { ok: false };
  return { ok: true, exp };
}

export function sessionCookieValue(token, maxAge) {
  return `${SESSION_COOKIE}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`;
}

export function clearSessionCookieValue() {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

function cookieValue(request, name) {
  const header = request.headers.get('Cookie');
  if (!header) return null;
  for (const part of header.split(/;\s*/)) {
    const eq = part.indexOf('=');
    if (eq > -1 && part.slice(0, eq) === name) return part.slice(eq + 1);
  }
  return null;
}

export function readSessionCookie(request) {
  return cookieValue(request, SESSION_COOKIE);
}

export function readCsrfCookie(request) {
  return cookieValue(request, CSRF_COOKIE);
}

// CSRF token for the login form (double-submit: cookie + hidden field).
export function newCsrfToken() {
  return b64urlEncode(crypto.getRandomValues(new Uint8Array(24)));
}

export function csrfCookieValue(token) {
  return `${CSRF_COOKIE}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${CSRF_TTL_SECONDS}`;
}

export function clearCsrfCookieValue() {
  return `${CSRF_COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

// verifyLogin(env, username, password) → true | false
export async function verifyLogin(env, username, password) {
  if (!adminConfigured(env)) return false;
  return verifyLoginPassword(env.ADMIN_PASSWORD_HASH, username, env.ADMIN_USERNAME, password);
}

// Guard used by every admin handler. Denies with 503 when the secrets are not
// configured yet, 401 when the session cookie is missing or invalid.
export async function requireAdmin(request, env) {
  if (!adminConfigured(env)) {
    return json503('The admin room is locked — admin login is not configured yet. See the deployment notes.');
  }
  const result = await verifySessionToken(env, readSessionCookie(request));
  if (!result.ok) return json401('Admin access denied.');
  return null; // authenticated
}

export function json503(error) {
  return new Response(JSON.stringify({ ok: false, error }), {
    status: 503,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
  });
}
export function json401(error) {
  return new Response(JSON.stringify({ ok: false, error }), {
    status: 401,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
  });
}

export { normalizeUsername };
