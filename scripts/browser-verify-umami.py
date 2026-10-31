#!/usr/bin/env python3
"""Browser QA for the umami events round (owner 2026-11-01: "fire the events
of download and print to umami · check what events are firing"). site.js now
fires two house events into the tracker that already ships on every page:
PRINT via one wrapper on window.print (manners cards, coloring sheets,
worksheet generators, the Circle Time print view all funnel through it) and
DOWNLOAD via capture-phase delegation on every <a download>, with the file's
SEO name as the event's data (the anchor's download attribute wins — the
synthesized flows set it — else the href basename).

This QA stubs window.umami BEFORE any page script runs (and blocks the real
tracker script) so the calls are captured deterministically, then clicks the
REAL buttons. The download clicks wear a capture-phase preventDefault guard
in the stub so cross-origin card links never navigate the page away. Headless
Chrome at 1440 + 390."""
import subprocess, time, os
from playwright.sync_api import sync_playwright

ROOT = '/home/z/my-project/kiddo-school'
OUT = '/home/z/my-project/kiddo-school/scripts/umami-tmp'
os.makedirs(OUT, exist_ok=True)
srv = subprocess.Popen(['node', 'scripts/serve.mjs'], cwd=ROOT,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                       preexec_fn=os.setsid)
time.sleep(2)
fails = []
def ck(name, ok, extra=''):
    print(('PASS ' if ok else 'FAIL ') + name + (('  ' + str(extra)) if extra else ''))
    if not ok: fails.append(name)

BASE = 'http://localhost:4173'

STUB = """
window.__umamiCalls = [];
window.umami = { track: function (name, data) {
  window.__umamiCalls.push({ name: name, data: data === undefined ? null : data });
} };
/* QA-only guard: keep <a download> clicks from navigating away so the event
   list can be read afterwards. Runs BEFORE site.js's capture listener
   (window capture precedes document capture) and never stops propagation. */
window.addEventListener('click', function (ev) {
  if (ev.target && ev.target.closest && ev.target.closest('a[download]')) ev.preventDefault();
}, true);
"""

def dismiss_consent(pg):
    if pg.locator('#consent-banner').count():
        try:
            pg.get_by_role('button', name='Essential only').click(timeout=3000)
            pg.wait_for_timeout(300)
        except Exception:
            pass

def calls(pg):
    return pg.evaluate('() => window.__umamiCalls')

def errors(pg):
    return pg.evaluate('() => window.__qaErrors || []')

def run(pw, width):
    browser = pw.chromium.launch()
    context = browser.new_context(viewport={'width': width, 'height': 900})
    context.route('**cloud.umami.is/**', lambda route: route.fulfill(
        status=200, content_type='application/javascript', body='/* qa stub stands in */'))
    context.add_init_script(STUB)
    pg = context.new_page()
    console_fail = []
    # Bare 'Failed to load resource' console lines carry no URL and duplicate
    # the network channels below (which report the failing URL) — skip them.
    pg.on('console', lambda m: console_fail.append(m.text) if m.type == 'error' and 'Failed to load resource' not in m.text else None)
    # The sandbox cannot reach Google's ad edge — REQFAILs on
    # googlesyndication pings are a QA-environment artifact, not site damage.
    pg.on('requestfailed', lambda req: console_fail.append('REQFAIL ' + req.url) if 'cloud.umami.is' not in req.url and 'googlesyndication' not in req.url else None)
    pg.on('response', lambda res: console_fail.append('HTTP ' + str(res.status) + ' ' + res.url) if res.status >= 400 and '/api/' not in res.url else None)
    tag = f'{width}'

    # --- Class 43 page: 24 cards, real manners.js buttons + real R2 links ---
    r = pg.goto(BASE + '/earth-and-space/', wait_until='load', timeout=30000)
    ck(f'[{tag}] /earth-and-space/ 200', r.status == 200, r.status)
    dismiss_consent(pg)
    content = pg.content()
    ck(f'[{tag}] real umami tracker still ships',
       'cloud.umami.is/script.js' in content)
    ck(f'[{tag}] stub installed before page scripts',
       pg.evaluate('() => Array.isArray(window.__umamiCalls)'))
    n_print_btn = pg.locator('[data-mn-print]').count()
    n_dl = pg.locator('.mn-actions a[download]').count()
    ck(f'[{tag}] 24 print buttons + 24 download links present',
       n_print_btn == 24 and n_dl == 24, f'{n_print_btn}/{n_dl}')

    # PRINT via the manners.js card button: the button has its own listener
    # that calls window.print() — the wrapper must count EXACTLY once.
    pg.locator('[data-mn-print]').first.click()
    pg.wait_for_timeout(300)
    ev = calls(pg)
    ck(f'[{tag}] manners Print fires exactly one print event',
       len(ev) == 1 and ev[0]['name'] == 'print' and ev[0]['data'] is None, ev)

    # DOWNLOAD via a real R2 card link: file = the download attribute's save
    # name (what lands in the visitor's Downloads folder) — the build sets it
    # to the friendly card name; the SEO name stays in the href.
    attr1 = (pg.locator('.mn-actions a[download]').first.get_attribute('download') or '').strip()
    href1 = pg.locator('.mn-actions a[download]').first.get_attribute('href')
    want1 = attr1 or href1.split('/')[-1].split('?')[0]
    pg.locator('.mn-actions a[download]').first.click()
    pg.wait_for_timeout(300)
    ev = calls(pg)
    dls = [c for c in ev if c['name'] == 'download']
    ck(f'[{tag}] card Download fires with the save-name file data',
       len(dls) == 1 and dls[0]['data'] and dls[0]['data']['file'] == want1,
       f'{want1} -> {dls}')

    # A second card: per-file data, not one lump event.
    attr2 = (pg.locator('.mn-actions a[download]').nth(1).get_attribute('download') or '').strip()
    href2 = pg.locator('.mn-actions a[download]').nth(1).get_attribute('href')
    want2 = attr2 or href2.split('/')[-1].split('?')[0]
    pg.locator('.mn-actions a[download]').nth(1).click()
    pg.wait_for_timeout(300)
    dls = [c for c in calls(pg) if c['name'] == 'download']
    ck(f'[{tag}] second card downloads with its own file name',
       len(dls) == 2 and dls[1]['data']['file'] == want2,
       f'{want2} -> {[d["data"]["file"] for d in dls]}')

    # The download-attribute naming rule (what the synthesized flows —
    # coloring sheets, worksheet packs, life-skills, magic games — hit):
    # anchor.download wins over the href basename.
    got = pg.evaluate("""() => new Promise(res => {
      const a = document.createElement('a');
      a.href = '/assets/site.js'; a.download = 'qa-attr-test.webp';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => res(window.__umamiCalls), 150);
    })""")
    ck(f'[{tag}] download attribute wins over href basename',
       got and got[-1]['name'] == 'download' and got[-1]['data']['file'] == 'qa-attr-test.webp',
       got[-1] if got else 'no calls')

    # Direct window.print() still callable after the wrap (no breakage).
    pg.evaluate('() => window.print()')
    pg.wait_for_timeout(200)
    prints = [c for c in calls(pg) if c['name'] == 'print']
    ck(f'[{tag}] direct window.print() fires print too',
       len(prints) == 2, len(prints))
    ck(f'[{tag}] zero console errors on the class page', not console_fail, console_fail[:2])
    pg.close(); context.close(); browser.close()

def run_coloring(pw, width):
    """Second print flow through a DIFFERENT script (coloring.js)."""
    browser = pw.chromium.launch()
    context = browser.new_context(viewport={'width': width, 'height': 900})
    context.route('**cloud.umami.is/**', lambda route: route.fulfill(
        status=200, content_type='application/javascript', body='/* qa stub stands in */'))
    context.add_init_script(STUB)
    pg = context.new_page()
    console_fail = []
    # Bare 'Failed to load resource' console lines carry no URL and duplicate
    # the network channels below (which report the failing URL) — skip them.
    pg.on('console', lambda m: console_fail.append(m.text) if m.type == 'error' and 'Failed to load resource' not in m.text else None)
    # The sandbox cannot reach Google's ad edge — REQFAILs on
    # googlesyndication pings are a QA-environment artifact, not site damage.
    pg.on('requestfailed', lambda req: console_fail.append('REQFAIL ' + req.url) if 'cloud.umami.is' not in req.url and 'googlesyndication' not in req.url else None)
    pg.on('response', lambda res: console_fail.append('HTTP ' + str(res.status) + ' ' + res.url) if res.status >= 400 and '/api/' not in res.url else None)
    tag = f'{width}-coloring'
    r = pg.goto(BASE + '/coloring-pages/shapes/star/', wait_until='load', timeout=30000)
    ck(f'[{tag}] 200', r.status == 200, r.status)
    dismiss_consent(pg)
    ck(f'[{tag}] coloring.js print button present',
       pg.locator('[data-cp-print]').count() == 1)
    pg.locator('[data-cp-print]').click()
    pg.wait_for_timeout(300)
    ev = calls(pg)
    ck(f'[{tag}] coloring Print fires print through the same wrapper',
       len(ev) == 1 and ev[0]['name'] == 'print', ev)
    # Plain same-origin anchor without the attribute: href basename wins.
    got = pg.evaluate("""() => new Promise(res => {
      const a = document.createElement('a');
      a.href = '/assets/site.js?v=1'; a.download = '';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => res(window.__umamiCalls), 150);
    })""")
    ck(f'[{tag}] empty attribute falls back to href basename',
       got and got[-1]['name'] == 'download' and got[-1]['data']['file'] == 'site.js',
       got[-1] if got else 'no calls')
    # /api/ 404s are the community Pages Functions — they exist only on the
    # production edge (functions/api/community/[[route]].js), never on the
    # static preview server, so the local probe ignores them.
    ck(f'[{tag}] zero console errors on the coloring page', not console_fail, console_fail[:2])
    pg.close(); context.close(); browser.close()

with sync_playwright() as pw:
    try:
        run(pw, 1440)
        run(pw, 390)
        run_coloring(pw, 390)
    finally:
        try: os.killpg(os.getpgid(srv.pid), 15)
        except Exception: pass

print(f"\n{len(fails)} fails" + ((': ' + ', '.join(fails)) if fails else ''))
raise SystemExit(1 if fails else 0)
