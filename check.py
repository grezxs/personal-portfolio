#!/usr/bin/env python3
"""
Portfolio sanity-check script.
Run: python3 check.py
Exits 0 if all checks pass, 1 if any fail.
"""

import os, re, sys, subprocess, datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).parent
MAIN = ROOT / "Portfolio.html"

GREEN = "\033[32m"
RED   = "\033[31m"
YELLOW= "\033[33m"
RESET = "\033[0m"

results = []

def ok(label, detail=""):
    print(f"  [{GREEN}PASS{RESET}] {label}" + (f"  ({detail})" if detail else ""))
    results.append(True)

def fail(label, detail=""):
    print(f"  [{RED}FAIL{RESET}] {label}" + (f"\n         → {detail}" if detail else ""))
    results.append(False)

def warn(label, detail=""):
    print(f"  [{YELLOW}WARN{RESET}] {label}" + (f"\n         → {detail}" if detail else ""))
    results.append(True)  # warnings don't block

# ─────────────────────────────────────────────────────────
# A. FILE EXISTENCE
# ─────────────────────────────────────────────────────────
print(f"\n{YELLOW}── A. File Existence ──────────────────────────────────────{RESET}")

for f in ["Portfolio.html", "colors_and_type.css", "quant.css", "data.js",
          "app.jsx", "tweaks-panel.jsx"]:
    p = ROOT / f
    (ok if p.exists() else fail)(f"{f} exists",
        "" if p.exists() else "file not found")

profile = ROOT / "uploads" / "profile_photo-1779107122001.png"
(ok if profile.exists() else fail)(
    "Profile photo exists  (uploads/profile_photo-1779107122001.png)",
    "" if profile.exists() else "upload your headshot to uploads/")

css_text = (ROOT / "colors_and_type.css").read_text()
font_urls = re.findall(r"url\('(fonts/[^']+)'\)", css_text)
missing_fonts = [u for u in font_urls if not (ROOT / u).exists()]
if missing_fonts:
    fail(f"Font files ({len(font_urls)} declared in colors_and_type.css)",
         f"Missing {len(missing_fonts)}: {missing_fonts[0]} …")
else:
    ok(f"Font files present  ({len(font_urls)} / {len(font_urls)})")

# ─────────────────────────────────────────────────────────
# B. HTML STRUCTURE
# ─────────────────────────────────────────────────────────
print(f"\n{YELLOW}── B. HTML Structure ──────────────────────────────────────{RESET}")

html = MAIN.read_text(encoding="utf-8")
clean = re.sub(r'</html>.*', '</html>', html, flags=re.DOTALL)

class HeadScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.lang = None; self.charset = False; self.viewport = False
        self.description = False; self.favicon = False
        self._title = False; self.title_text = ""
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "html":    self.lang = d.get("lang")
        if tag == "meta":
            if d.get("charset"): self.charset = True
            n = (d.get("name") or "").lower()
            if n == "viewport":    self.viewport    = True
            if n == "description": self.description = True
        if tag == "title": self._title = True
        if tag == "link":
            if "icon" in (d.get("rel") or "").lower(): self.favicon = True
    def handle_endtag(self, tag):
        if tag == "title": self._title = False
    def handle_data(self, data):
        if self._title: self.title_text += data

scan = HeadScan()
scan.feed(clean)

(ok if scan.lang           else fail)('html[lang] set',           'add lang="en" to <html>' if not scan.lang else f'lang="{scan.lang}"')
(ok if scan.charset        else fail)('meta charset present')
(ok if scan.viewport       else fail)('meta viewport present')
(ok if scan.title_text.strip() else fail)('title present & non-empty', scan.title_text.strip() or "title is empty")
(ok if scan.description    else fail)('meta description present', '' if scan.description else 'add <meta name="description" content="...">')
(ok if scan.favicon        else fail)('favicon link present',     '' if scan.favicon     else 'add <link rel="icon" ...>')

stray = bool(re.search(r'</html>\s*<style', html, re.DOTALL))
(warn if stray else ok)('No markup after </html>',
    '<style id="__om-edit-overrides"> sits outside </html> — move it into <head>' if stray else "")

empty_hrefs = len(re.findall(r'href\s*=\s*["\']["\']', html))
(ok if not empty_hrefs else fail)('No empty href attributes',
    f"{empty_hrefs} empty href(s) found" if empty_hrefs else "")

# ─────────────────────────────────────────────────────────
# C. INTERNAL LINK INTEGRITY
# ─────────────────────────────────────────────────────────
print(f"\n{YELLOW}── C. Internal Link Integrity ─────────────────────────────{RESET}")

broken = []
for ref in re.findall(r'(?:href|src)\s*=\s*["\']([^"\']+)["\']', html):
    p = urlparse(ref)
    if p.scheme in ("http", "https", "mailto", "data") or ref.startswith("#"):
        continue
    if not (ROOT / ref).exists():
        broken.append(ref)

(ok if not broken else fail)(
    "All relative paths resolve to files on disk",
    f"Broken: {broken}" if broken else "")

# ─────────────────────────────────────────────────────────
# D. CONTENT CHECKS
# ─────────────────────────────────────────────────────────
print(f"\n{YELLOW}── D. Content Checks ──────────────────────────────────────{RESET}")

typo = "Univeristy" in html
(ok if not typo else fail)(
    'No "Univeristy" typo',
    'Found in About → Academic Qualifications — should be "University"' if typo else "")

medium_ok = "medium.com/@pocket-investo" in html and "medium.com/@pocketinvesto" not in html
(ok if medium_ok else fail)(
    "Medium URL uses @pocket-investo consistently",
    "href or display text still has @pocketinvesto — should be @pocket-investo" if not medium_ok else "")

year = datetime.date.today().year
year_ok = f"© {year}" in html or f"© {year + 1}" in html
(ok if year_ok else warn)(
    f"Copyright year ({year} or {year+1})",
    "Check footer copyright year" if not year_ok else "")

empty_caption = bool(re.search(
    r'<div class="portrait-caption">[\s]*<span>[\s]*</span>[\s]*<span>[\s]*</span>',
    html))
(warn if empty_caption else ok)(
    "Portrait caption has content",
    "Two empty <span> tags in portrait-caption — populate or remove them" if empty_caption else "")

# ─────────────────────────────────────────────────────────
# E. JS SYNTAX
# ─────────────────────────────────────────────────────────
print(f"\n{YELLOW}── E. JavaScript Syntax ────────────────────────────────────{RESET}")

r = subprocess.run(["node", "--check", str(ROOT / "data.js")],
                   capture_output=True, text=True)
(ok if r.returncode == 0 else fail)(
    "data.js syntax OK",
    r.stderr.strip() if r.returncode != 0 else "")

for jsx in ["app.jsx", "tweaks-panel.jsx"]:
    src = (ROOT / jsx).read_text()
    opens, closes = src.count("{"), src.count("}")
    balanced = abs(opens - closes) <= 2
    (ok if balanced else fail)(
        f"{jsx} brace balance  ({opens}{{ / {closes}}})",
        "significant imbalance — check for syntax errors" if not balanced else "")

# ─────────────────────────────────────────────────────────
# SUMMARY
# ─────────────────────────────────────────────────────────
passed = sum(results); total = len(results); failed = total - passed
print(f"\n{YELLOW}── Summary ─────────────────────────────────────────────────{RESET}")
print(f"  {GREEN}{passed}{RESET}/{total} checks passed", end="")
if failed:
    print(f"  ({RED}{failed} failed{RESET})\n")
    sys.exit(1)
else:
    print(f"\n\n  {GREEN}All checks passed.{RESET} Site is ready for local smoke test.\n")
    sys.exit(0)
