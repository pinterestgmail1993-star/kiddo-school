#!/usr/bin/env python3
"""Resolve the two rebase conflicts for the Question Words round:
- scripts/build.mjs: keep the remote de-index comment block (both sides made
  the same {noindex:true} edits; only the comment placement clashed).
- tests/site.test.mjs: sitemap lock = 3869 (their de-index) + 2 (QW pages)
  = 3871; keep their history note and append the Question Words one."""
import re, sys

# ---- build.mjs: keep the HEAD (remote) side of the only conflict ----
src = open('scripts/build.mjs', encoding='utf-8').read()
def keep_head(m):
    return m.group(1)
resolved, n = re.subn(r'<<<<<<< HEAD\n(.*?)=======\n.*?>>>>>>> [^\n]*\n',
                      keep_head, src, flags=re.S)
if n != 1:
    print('build.mjs: expected 1 conflict, got', n); sys.exit(1)
open('scripts/build.mjs', 'w', encoding='utf-8').write(resolved)
print('ok scripts/build.mjs (kept the de-index comment)')

# ---- site.test.mjs: merge history notes, lock 3871 ----
t = open('tests/site.test.mjs', encoding='utf-8').read()
m = re.search(r'<<<<<<< HEAD\n(.*?)=======\n(.*?)>>>>>>> [^\n]*\n', t, flags=re.S)
if not m:
    print('site.test.mjs: conflict not found'); sys.exit(1)
theirs, mine = m.group(1), m.group(2)
# their side ends with the de-index note + the 3869 lock; mine with the QW note + 3871 lock
QW_NOTE = ("; +2 for the Question Words extra class (owner 2026-10-28, the manners "
           "one-page treatment: \u201csame \u2014 no individual pages\u201d): the /question-words/ "
           "class page (cover.webp first, then the six core questions who/what/when/where/"
           "why/how, then the rest \u2014 all 16 cards with ask-it-tonight tips, downloads and "
           "per-card printing on the ONE page) + the /flashcards/question-words/ parents\u2019 "
           "shelf \u2014 zero per-card URLs anywhere.")
theirs_merged = theirs.rstrip('\n')
# append the QW note to the tail of THEIR history comment (their comment ends before the assert lines)
theirs_merged = theirs_merged.replace(
    'the flashcards wall and activities filters are client-side only.',
    'the flashcards wall and activities filters are client-side only' + QW_NOTE + '.')
merged = theirs_merged + '\n' + \
    'assert.equal(links.length,3871);assert.equal(new Set(links).size,3871);\n'
t = t[:m.start()] + merged + t[m.end():]
open('tests/site.test.mjs', 'w', encoding='utf-8').write(t)
print('ok tests/site.test.mjs (3871 + merged history notes)')
