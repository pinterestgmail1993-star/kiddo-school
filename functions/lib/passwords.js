// Kiddo School admin password hashing (Pages Function runtime).
// PBKDF2-HMAC-SHA256 via WebCrypto with a per-hash random salt. The stored
// value is ALWAYS the hash string — never the password. Format:
//
//   pbkdf2-sha256$<iterations>$<salt-base64url>$<digest-base64url>
//
// The parameters travel inside the string, so the runtime honors whatever the
// operator generated (iterations can be raised or lowered without code
// changes). Hash generation is done ONCE, locally, with
// scripts/hash-admin-password.mjs, and pasted into the Cloudflare dashboard
// as the ADMIN_PASSWORD_HASH secret. The plaintext password never enters the
// repo, the logs, the database or any response.

const MIN_ITERATIONS = 10_000; // refuse to verify against a too-weak hash
const DEFAULT_ITERATIONS = 100_000;
const DIGEST_BITS = 256;

function b64urlEncode(bytes) {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(str) {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/') + pad);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

// Constant-time comparison for equal-length strings (length is not secret —
// the digest length is fixed by the format).
function timingSafeEqual(a, b) {
  const ab = new TextEncoder().encode(a);
  const bb = new TextEncoder().encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

export function normalizeUsername(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

async function pbkdf2(password, salt, iterations) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  return crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    key,
    DIGEST_BITS
  );
}

// hashPassword(password, iterations?) → the stored hash string.
// Used by scripts/hash-admin-password.mjs (operator-side) and by tests.
export async function hashPassword(password, iterations = DEFAULT_ITERATIONS) {
  if (typeof password !== 'string' || password.length < 12) {
    throw new Error('Use a long password (12+ characters).');
  }
  if (!Number.isInteger(iterations) || iterations < MIN_ITERATIONS || iterations > 1_000_000) {
    throw new Error(`Iterations must be between ${MIN_ITERATIONS} and 1,000,000.`);
  }
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const digest = await pbkdf2(password, salt, iterations);
  return `pbkdf2-sha256$${iterations}$${b64urlEncode(salt)}$${b64urlEncode(new Uint8Array(digest))}`;
}

// verifyLoginPassword(storedHash, givenUsername, storedUsername, givenPassword)
// → true only when username AND password match. The PBKDF2 work runs on EVERY
// attempt (even with an unknown username) so response timing cannot reveal
// whether the username exists.
export async function verifyLoginPassword(storedHash, givenUsername, storedUsername, givenPassword) {
  if (typeof storedHash !== 'string' || typeof givenPassword !== 'string' || !storedHash.includes('$')) return false;
  const [scheme, iterStr, saltB64, digestB64] = storedHash.split('$');
  if (scheme !== 'pbkdf2-sha256') return false;
  const iterations = Number(iterStr);
  if (!Number.isInteger(iterations) || iterations < MIN_ITERATIONS || iterations > 1_000_000) return false;
  let salt, digest;
  try {
    salt = b64urlDecode(saltB64);
    digest = b64urlDecode(digestB64);
  } catch {
    return false;
  }
  const given = new Uint8Array(await pbkdf2(givenPassword, salt, iterations));
  const usernameOk = timingSafeEqual(normalizeUsername(givenUsername), normalizeUsername(storedUsername || ''));
  const passwordOk = timingSafeEqual(b64urlEncode(given), digestB64);
  return usernameOk && passwordOk;
}
