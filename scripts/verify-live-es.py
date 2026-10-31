#!/usr/bin/env python3
"""Live production probe for Class 43 · Our Earth & Space — run AFTER the
deploy lands (~20s after the push). Paced GETs with backoff (house lesson:
bursting the edge rate-limits the probe)."""
import re, subprocess, sys, time, urllib.request

BASE = "https://kiddo.school"
fails = []

def get(url, binary=False, tries=3):
    delay = 1.5
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (kiddo-live-probe)"})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
                return r.status, (data if binary else data.decode("utf-8", "replace"))
        except Exception as e:
            if i == tries - 1:
                return -1, str(e)[:120]
            time.sleep(delay)
            delay *= 2

def ck(name, ok, extra=""):
    print(("PASS " if ok else "FAIL ") + name + (("  " + str(extra)) if extra else ""))
    if not ok: fails.append(name)

def main():
    # 1) the class page is live
    s, html = get(BASE + "/earth-and-space/")
    ck("/earth-and-space/ 200", s == 200, s)
    if s == 200:
        ck("title", "Our Earth & Space Flashcards" in html)
        ck("24 tiles", html.count('class="mn-card"') == 24, html.count('class="mn-card"'))
        ck("24 download buttons", html.count("download=") >= 24)
        ck("24 print buttons", html.count("data-mn-print") == 24)
        ck("cover og:image", "our-earth-and-space-flashcards-for-kids-cover.webp" in html)
        ck("CLASS 43 eyebrow", "CLASS 43" in html)
        ck("links back to the four inbound sources + LP",
           all(f'href="{h}"' in html for h in ["/preschool/4-years/science-nature-and-discovery/",
              "/preschool/4-years/weather-seasons-and-what-we-wear/", "/time-and-daily-routine/",
              "/science-at-a-glance/", "/learning-path/"]))
        ck("no per-card links", not re.search(r'href="/earth-and-space/[a-z0-9-]+/"', html))
        low = html.lower()
        ck("word-ban holds", not any(b in low for b in ["no sign up", "no paywall", "free to use", "no account", "free forever"]))
    time.sleep(1.2)

    # 2) the Learning Path
    s, lp = get(BASE + "/learning-path/")
    ck("LP 200", s == 200, s)
    if s == 200:
        ck("LP row 43", "Class 43: <a href=\"/earth-and-space/\">Our Earth &amp; Space</a>" in lp)
        rows = [int(m) for m in re.findall(r'lp-class">Class (\d+):', lp)]
        ck("LP sequence 1–43", rows == list(range(1, 44)), rows[-3:])
        ck("LP says forty-three", "orty-three" in lp)
        ck("LP magic games say Class 17/20", "(Class 17)" in lp and "(Class 20)" in lp)
    time.sleep(1.2)

    # 3) inbound pages link the class
    for path, name in [("/preschool/4-years/science-nature-and-discovery/", "Class 31"),
                       ("/preschool/4-years/weather-seasons-and-what-we-wear/", "Class 34"),
                       ("/time-and-daily-routine/", "Class 41"),
                       ("/science-at-a-glance/", "Science at a Glance")]:
        s, html = get(BASE + path)
        ck(f"{name} links Class 43", s == 200 and 'href="/earth-and-space/"' in html, s)
        time.sleep(1.2)

    # 4) the Age 3 hub magic labels
    s, hub = get(BASE + "/preschool/3-years/")
    ck("Age 3 hub 200", s == 200, s)
    if s == 200:
        ck("hub says Plays with Class 17", "Plays with Class 17" in hub)
        ck("hub says Plays with Class 20", "Plays with Class 20" in hub)
        ck("hub no stale Class 3/6 labels", "Plays with Class 3" not in hub and "Plays with Class 6" not in hub)
    time.sleep(1.2)

    # 5) sitemap: 3927 locs, earth-and-space in, old URLs untouched
    s, xml = get(BASE + "/sitemap.xml")
    ck("sitemap 200", s == 200, s)
    if s == 200:
        locs = re.findall(r"<loc>(.*?)</loc>", xml)
        ck("sitemap 3927 locs", len(locs) == 3927, len(locs))
        ck("earth-and-space in sitemap", "https://kiddo.school/earth-and-space/" in locs)
        ck("image sitemap has the cover", "our-earth-and-space-flashcards-for-kids-cover.webp" in xml)
        ck("existing URLs intact (spot check)",
           all(u in locs for u in ["https://kiddo.school/measuring-and-money/", "https://kiddo.school/time-and-daily-routine/",
              "https://kiddo.school/staying-safe/", "https://kiddo.school/healthy-food/", "https://kiddo.school/science-at-a-glance/"]))
    time.sleep(1.2)

    # 6) one R2 card image really serves
    s, _ = get("https://assets.kiddo.school/school/learning-path/our-earth-and-space/flashcards/sun-moon-earth-flashcard-for-kids.webp", binary=True)
    ck("R2 card image 200", s == 200, s)

    # 7) the neighbors are untouched
    for path in ["/measuring-and-money/", "/staying-safe/", "/healthy-food/"]:
        s, html = get(BASE + path)
        ck(f"{path} still 200", s == 200, s)
        time.sleep(1.2)

    print(f"\n{len(fails)} fails" + ((": " + ", ".join(fails)) if fails else ""))
    sys.exit(1 if fails else 0)

if __name__ == "__main__":
    main()
