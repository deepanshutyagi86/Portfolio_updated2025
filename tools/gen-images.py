#!/usr/bin/env python3
"""Regenerate the responsive WebP set in assets/images/opt/.

    python3 tools/gen-images.py

Add new source photos to SRCS below. Needs Pillow: pip3 install Pillow
"""
import os, json
from PIL import Image

ROOT = os.environ.get("ROOT") or os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets/images/opt")
os.makedirs(OUT, exist_ok=True)

SRCS = [
    "assets/images/featured/trickyman.jpg",
    "assets/images/featured/haMum26.jpeg",
    "assets/images/featured/tasc.jpeg",
    "assets/images/featured/school.jpg",
    "assets/images/featured/HAfinal26.jpeg",
    "assets/images/featured/hackathon.jpg",
    "assets/images/featured/ignite.jpg",
    "assets/images/featured/innova.jpg",
    "assets/images/featured/mum26.jpeg",
    "assets/images/featured/sirma.jpeg",
    "assets/images/profile.jpg",
]
WIDTHS = [480, 960, 1600]
report = []
for rel in SRCS:
    src = os.path.join(ROOT, rel)
    if not os.path.exists(src):
        report.append({"src": rel, "error": "missing"}); continue
    stem = os.path.splitext(os.path.basename(rel))[0]
    im = Image.open(src).convert("RGB")
    ow, oh = im.size
    orig_kb = round(os.path.getsize(src)/1024)
    made = []
    for w0 in WIDTHS:
        w = min(w0, ow)
        h = round(oh * w / ow)
        dst = os.path.join(OUT, f"{stem}-{w}.webp")
        if not os.path.exists(dst):
            im.resize((w, h), Image.LANCZOS).save(dst, "WEBP", quality=78, method=6)
        made.append({"w": w, "kb": round(os.path.getsize(dst)/1024),
                     "file": f"assets/images/opt/{stem}-{w}.webp"})
    seen, uniq = set(), []
    for m in made:
        if m["w"] not in seen: seen.add(m["w"]); uniq.append(m)
    report.append({"src": rel, "stem": stem, "orig": f"{ow}x{oh}", "origKB": orig_kb, "variants": uniq})
    print("ok", stem, flush=True)
with open(os.path.join(ROOT, "assets/images/opt/_report.json"), "w") as f:
    json.dump(report, f, indent=1)
tot_o = sum(r.get("origKB",0) for r in report)
tot_mob = sum(min(v["kb"] for v in r["variants"]) for r in report if r.get("variants"))
print(f"DONE originals={tot_o}KB smallest-webp(mobile)={tot_mob}KB")
