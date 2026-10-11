// Generate the ADMIN_PASSWORD_HASH secret for the Kiddo School admin login.
//
// Usage:  node scripts/hash-admin-password.mjs
// (prompts silently on stdin — the password never touches the shell history,
//  argv, the repo or any log; only the HASH is printed)
//
// Then paste the printed value into Cloudflare Pages → Settings → Environment
// variables → Add → type "Secret":
//   ADMIN_PASSWORD_HASH = pbkdf2-sha256$…$…$…
// and set ADMIN_USERNAME the same way. Redeploy afterwards — environment
// variables are baked into NEW deployments only.

import { hashPassword } from '../functions/lib/passwords.js';
import { createInterface } from 'node:readline';

const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: false });

const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

const iterationsArg = Number(process.argv[process.argv.indexOf('--iterations') + 1]);
const iterations = Number.isInteger(iterationsArg) ? iterationsArg : 100_000;

const password = await ask('Admin password (input is visible here — type carefully, 12+ chars): ');
if (!password || password.length < 12) {
  console.error('Refusing: the password must be at least 12 characters.');
  process.exit(1);
}
const again = await ask('Repeat the same password: ');
rl.close();
if (password !== again) {
  console.error('Refusing: the two entries do not match.');
  process.exit(1);
}

const hash = await hashPassword(password, iterations);
console.log('\nADMIN_PASSWORD_HASH (paste this as a Secret in the Cloudflare Pages dashboard):\n');
console.log(hash);
console.log(`\nParameters: PBKDF2-HMAC-SHA256, ${iterations} iterations, 16-byte random salt.`);
console.log('Never commit this file’s output. Never store the password itself anywhere.');
