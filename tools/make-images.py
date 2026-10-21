"""make-images.py: the smaller copies the site serves in place of its originals.

Run from the repository root after adding or replacing a picture:

    python tools/make-images.py            # make what is missing
    python tools/make-images.py --force    # remake everything

What it makes, all WebP, beside or mirroring the original's path:

  photos  A camera photograph (JPEG, or a PNG listed in PHOTO_PNGS) wider
          than 1800px or heavier than 300 KB gets <name>-1800.jpg at 1800px
          on its long side and <name>-900.jpg at 900px: progressive JPEG,
          quality 80, turned upright from its EXIF orientation. The pages
          and site.js point at <name>-1800.jpg; static pages also list the
          900px copy in srcset for phones. JPEG, not WebP: Chrome embeds a
          JPEG in a printed PDF as it is, while some WebP photos (and the
          12-megapixel originals) stalled its PDF export outright. Re-encoding
          also drops EXIF, so no location data can come back with a photo.
  thumbs  thumbs/<path>.webp (the photo's own name, without -1800) for
          every figure in a project's gallery, sized
          for the 124 x 62 thumbnail cell at 2x (fits in 248 x 124).
  cards   cards/<path>.webp for every picture the home page shows as a
          card (the ledger frame and its phone thumbnails, the hand-built
          rows), at most 1000px wide.

Plots, renders and drawing sheets (PNG) keep their exact pixels: they get
thumbnails and cards, but the full figure is served as it is.
Originals are never changed or deleted. Requires Pillow.
"""
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent / "project"
FORCE = "--force" in sys.argv
# PNG files that are photographs, not plots: encoded lossy like the JPEGs.
PHOTO_PNGS = {"figures/about/bouldering.png"}


def save(im, out, quality=78, lossless=False):
    out.parent.mkdir(parents=True, exist_ok=True)
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
    if lossless:
        im.save(out, "WEBP", lossless=True, method=6)
    else:
        im.save(out, "WEBP", quality=quality, method=6)
    return out.stat().st_size


def fit(im, w, h):
    im = im.copy()
    im.thumbnail((w, h), Image.LANCZOS)
    return im


def open_upright(path):
    im = Image.open(path)
    return ImageOps.exif_transpose(im)  # phone photos carry their rotation in EXIF


def save_jpeg(im, out):
    out.parent.mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(out, "JPEG", quality=80, optimize=True, progressive=True)
    return out.stat().st_size


def is_photo(rel):
    return rel.lower().endswith((".jpg", ".jpeg")) or rel in PHOTO_PNGS


def webp_name(rel):
    # A photo's copies are named for the original: x-1800.jpg -> x.webp.
    return re.sub(r"(-1800)?\.[A-Za-z0-9]+$", ".webp", rel)


def sized(rel, w):
    return re.sub(r"\.[A-Za-z0-9]+$", f"-{w}.jpg", rel)


def main():
    js = (ROOT / "site.js").read_text(encoding="utf-8")
    pages = "".join((ROOT / p).read_text(encoding="utf-8")
                    for p in ("portfolio-light.html", "projects.html", "internships.html", "about.html"))
    # Every gallery figure (and video poster) in PROJECTS, and every picture
    # the home page shows as a card.
    gallery = set(re.findall(r"(?:src|poster):\s*'([^']+\.(?:jpg|jpeg|png|webp))'", js))
    gallery = {g for g in gallery if not g.startswith("logos/")}  # the tool logos are not figures
    cards = set(re.findall(r"gridThumb:\s*'([^']+)'", js))
    for block in re.findall(r"views:\s*\[(.*?)\n    \]", js, re.S):
        first = re.search(r"(?:src|poster):\s*'([^']+)'", block)
        if first:
            cards.add(first.group(1))
    # Photos named anywhere on the site.
    named = set(re.findall(r"(figures/[^\"'\s)]+\.(?:jpg|jpeg|png))", js + pages))
    made = 0
    for rel in sorted(named | gallery):
        src = ROOT / rel
        if not src.exists() or not is_photo(rel) or re.search(r"-(1800|900)\.jpg$", rel):
            continue
        if src.stat().st_size < 300 * 1024 and max(Image.open(src).size) <= 1800:
            continue
        big, small = ROOT / sized(rel, 1800), ROOT / sized(rel, 900)
        if FORCE or not big.exists():
            im = open_upright(src)
            size = save_jpeg(fit(im, 1800, 1800), big)
            # An original already well compressed stays as it is: a copy
            # that saves less than 15% is not worth a second file.
            if size > src.stat().st_size * 0.85:
                big.unlink()
                print(f"kept   {rel}  ({src.stat().st_size // 1024} KB; a copy would be {size // 1024} KB)")
                continue
            kb2 = save_jpeg(fit(im, 900, 900), small) // 1024
            print(f"photo  {rel}  {src.stat().st_size // 1024} KB -> {size // 1024} KB (+{kb2} KB at 900px)")
            made += 1
    for rel in sorted(gallery):
        src = ROOT / rel
        if not src.exists():
            continue
        out = ROOT / "thumbs" / webp_name(rel)
        if FORCE or not out.exists():
            save(fit(open_upright(src), 248, 124), out, quality=72)
            made += 1
    for rel in sorted(cards):
        src = ROOT / rel
        if not src.exists():
            continue
        out = ROOT / "cards" / webp_name(rel)
        if FORCE or not out.exists():
            im = open_upright(src)
            kb = save(fit(im, 1000, 1000), out, quality=80, lossless=False) // 1024
            print(f"card   {rel} -> {kb} KB")
            made += 1
    print(f"{made} file(s) written")


if __name__ == "__main__":
    main()
