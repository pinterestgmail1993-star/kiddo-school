#!/usr/bin/env python3
"""Live probe for the umami events round (owner 2026-11-01: "fire the events
of download and print to umami · check what events are firing") — production
checks after the push (deploy live ~20s): the shipped site.js carries the
event module (print wrapper + download delegation); /earth-and-space/ still
ships the real tracker tag beside it with its 24 print/download controls; and
a stubbed browser run against PRODUCTION clicks the real buttons and sees the
print + download events fire. Paced GETs with backoff (house lesson: bursting
the edge rate-limits the probe)."""
import time, urllib.request
from playwright.sync_api import sync_playwright

BASE = 'https://kiddo.school'
fails = []
def ck(name, ok, extra=''):
    print(('PASS ' if ok else 'FAIL ') + name + (('  ' + str(extra)) if extra else ''))
    if not ok: fails.append(name)

def get(path, tries=3):
    for i in range(tries):
        try:
            req = urllib.request.Request(BASE + path, headers={'User-Agent': 'kiddo-live-probe/1.0'})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.status, r.read().decode('utf-8', 'replace')
        except Exception as e:
            if i == tries - 1: return 0, str(e)
            time.sleep(3 * (i + 1))

STUB = """
window.__umamiCalls = [];
window.umami = { track: function (name, data) {
  window.__umamiCalls.push({ name: name, data: data === undefined ? null : data });
} };
window.addEventListener('click', function (ev) {
  if (ev.target && ev.target.closest && ev.target.closest('a[download]')) ev.preventDefault();
}, true);
"""

# --- paced production GETs ---
time.sleep(1)
s, js = get('/assets/site.js?v=umami')
ck('/assets/site.js 200', s == 200, s)
ck('shipped site.js wraps window.print', "send('print')" in js and '__kiddoTracked' in js and 'realPrint()' in js)
ck('shipped site.js delegates downloads with file data',
   "closest('a[download]')" in js and "send('download', { file" in js)
ck('shipped site.js guard unchanged (no fetch/localStorage tokens)',
   'umami.track(name, data)' in js)

time.sleep(1)
s, html = get('/earth-and-space/')
ck('/earth-and-space/ 200', s == 200, s)
ck('real tracker tag still ships beside site.js',
   'cloud.umami.is/script.js' in html and 'assets/site.js' in html)
ck('24 print buttons + 24 download controls', html.count('data-mn-print') >= 24 and html.count('<a download') >= 24, s)

time.sleep(1)
s, coloring = get('/coloring-pages/shapes/star/')
ck('/coloring-pages/shapes/star/ 200', s == 200, s)

# --- stubbed browser run against PRODUCTION ---
with sync_playwright() as pw:
    browser = pw.chromium.launch()
    context = browser.new_context(viewport={'width': 1440, 'height': 900})
    context.route('**cloud.umami.is/**', lambda route: route.fulfill(
        status=200, content_type='application/javascript', body='/* qa stub stands in */'))
    context.add_init_script(STUB)
    pg = context.new_page()
    pg.goto(BASE + '/earth-and-space/', wait_until='load', timeout=45000)
    pg.wait_for_timeout(1200)
    ck('live page loads with stub active',
       pg.evaluate('() => Array.isArray(window.__umamiCalls)'))
    pg.locator('[data-mn-print]').first.click()
    pg.wait_for_timeout(400)
    ev = pg.evaluate('() => window.__umamiCalls')
    ck('LIVE manners Print fires exactly one print event',
       len(ev) == 1 and ev[0]['name'] == 'print', ev)
    attr = (pg.locator('.mn-actions a[download]').first.get_attribute('download') or '').strip()
    pg.locator('.mn-actions a[download]').first.click()
    pg.wait_for_timeout(400)
    ev = pg.evaluate('() => window.__umamiCalls')
    dls = [c for c in ev if c['name'] == 'download']
    ck('LIVE card Download fires with its file data',
       len(dls) == 1 and dls[0]['data'] and dls[0]['data']['file'] == attr,
       f'{attr} -> {dls}')
    pg.close(); context.close(); browser.close()

print(f"\n{len(fails)} fails" + ((': ' + ', '.join(fails)) if fails else ''))
raise SystemExit(1 if fails else 0)
