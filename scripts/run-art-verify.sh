#!/usr/bin/env bash
# One-shot Art Room QA runner: serve dist on 4173, run the headless verify,
# always kill the server (trap EXIT).
set -u
cd /home/z/my-project/kiddo-school
node scripts/serve.mjs >/tmp/art-serve.log 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null; wait $SRV 2>/dev/null' EXIT
for i in $(seq 1 40); do
  if curl -sf -o /dev/null http://localhost:4173/art-room/; then break; fi
  sleep 0.25
done
python3 scripts/browser-verify-art.py
