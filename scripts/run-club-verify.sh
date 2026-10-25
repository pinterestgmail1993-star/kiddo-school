#!/bin/bash
# One-shot: serve dist on 4173, run the clubs headless verify, kill server.
cd /home/z/my-project/kiddo-school
node scripts/serve.mjs &
SRV=$!
trap "kill $SRV 2>/dev/null" EXIT
for i in $(seq 1 30); do curl -s -o /dev/null http://localhost:4173/ && break; sleep 0.5; done
python3 scripts/browser-verify-clubs.py
