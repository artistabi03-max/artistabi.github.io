"""Regenerate gallery.json from all images in photos/. Run after adding new photos."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PHOTOS = ROOT / "photos"
EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif"}

def main():
    if not PHOTOS.is_dir():
        raise SystemExit("photos/ folder not found")
    files = sorted(
        f"photos/{p.name}"
        for p in PHOTOS.iterdir()
        if p.is_file() and p.suffix.lower() in EXT
    )
    out = ROOT / "gallery.json"
    out.write_text(json.dumps(files, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(files)} photos to gallery.json")

if __name__ == "__main__":
    main()
