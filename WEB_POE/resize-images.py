"""
resize-images.py – generates the responsive image versions used by srcset / <picture>.

For every image in the images/ folder (e.g. Espresso.jpg) it creates:
    Espresso-400.jpg   Espresso-800.jpg   (Espresso-1200.jpg for the large images)
    Espresso-400.webp  Espresso-800.webp  (Espresso-1200.webp)

The original file is NEVER changed – it stays as the default `src` fallback.

How to run (once, from the project root, next to index.html):
    pip install pillow
    python resize-images.py
"""

from pathlib import Path
from PIL import Image

IMAGES_DIR = Path(__file__).parent / "images"
WIDTHS = (400, 800, 1200)          # 1200 is only used by cafe-interior.jpg
EXTENSIONS = {".jpg", ".jpeg", ".png"}


def is_generated(path: Path) -> bool:
    """True for files this script created earlier (name ends in -400, -800 or -1200)."""
    suffix = path.stem.rsplit("-", 1)[-1]
    return suffix.isdigit() and int(suffix) in WIDTHS


def main() -> None:
    if not IMAGES_DIR.exists():
        raise SystemExit(f"Folder not found: {IMAGES_DIR}")

    originals = [p for p in sorted(IMAGES_DIR.iterdir())
                 if p.suffix.lower() in EXTENSIONS and not is_generated(p)]

    if not originals:
        raise SystemExit("No images found in the images/ folder.")

    for path in originals:
        with Image.open(path) as img:
            img = img.convert("RGB")
            for width in WIDTHS:
                # Never upscale: small originals are simply saved at their own size
                target_w = min(width, img.width)
                target_h = round(img.height * target_w / img.width)
                resized = img.resize((target_w, target_h), Image.LANCZOS)

                resized.save(IMAGES_DIR / f"{path.stem}-{width}.jpg", "JPEG",
                             quality=82, optimize=True, progressive=True)
                resized.save(IMAGES_DIR / f"{path.stem}-{width}.webp", "WEBP",
                             quality=80, method=6)
        print(f"OK  {path.name}")

    print(f"\nDone: {len(originals)} images processed.")


if __name__ == "__main__":
    main()
