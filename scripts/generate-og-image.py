"""Generate BRANDABLE OG image at 1200x630."""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT_PNG = ROOT / "public" / "og-image.png"
OUT_JPG = ROOT / "public" / "og-image.jpg"
GEN = Path(
    r"C:\Users\Saad Amjad\.cursor\projects\c-Users-Saad-Amjad-Documents-personal-project-brandable\assets\og-image.png"
)

W, H = 1200, 630
BG = (248, 244, 236)
GREEN = (20, 61, 43)
BRASS = (166, 140, 90)


def find_font(names: list[str]) -> str | None:
    windir = Path(os.environ.get("WINDIR", r"C:\Windows")) / "Fonts"
    for name in names:
        path = windir / name
        if path.exists():
            return str(path)
    return None


def cover_resize(src: Image.Image, tw: int, th: int) -> Image.Image:
    sw, sh = src.size
    scale = max(tw / sw, th / sh)
    nw, nh = int(sw * scale), int(sh * scale)
    resized = src.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - tw) // 2
    top = (nh - th) // 2
    return resized.crop((left, top, left + tw, top + th))


def draw_brand(img: Image.Image) -> None:
    d = ImageDraw.Draw(img)
    serif = find_font(["georgiab.ttf", "Georgia.ttf", "timesbd.ttf", "times.ttf"])
    sans = find_font(["segoeui.ttf", "arial.ttf", "calibri.ttf"])
    title_font = ImageFont.truetype(serif, 96) if serif else ImageFont.load_default()
    tag_font = ImageFont.truetype(sans, 28) if sans else ImageFont.load_default()

    title = "BRANDABLE"
    tag = "Women's Western Wear"

    tb = d.textbbox((0, 0), title, font=title_font)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    tx = (W - tw) // 2
    ty = H // 2 - th - 16
    d.text((tx, ty), title, font=title_font, fill=GREEN)

    ly = ty + th + 28
    lw = 120
    d.line([(W // 2 - lw // 2, ly), (W // 2 + lw // 2, ly)], fill=BRASS, width=2)

    tb2 = d.textbbox((0, 0), tag, font=tag_font)
    tw2 = tb2[2] - tb2[0]
    d.text(((W - tw2) // 2, ly + 22), tag, font=tag_font, fill=GREEN)


def main() -> None:
    if GEN.exists():
        src = Image.open(GEN).convert("RGB")
        img = cover_resize(src, W, H)
        # Prefer exact brand render for crisp text at correct size
        img = Image.new("RGB", (W, H), BG)
        draw_brand(img)
    else:
        img = Image.new("RGB", (W, H), BG)
        draw_brand(img)

    OUT_PNG.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT_PNG, "PNG", optimize=True)
    img.save(OUT_JPG, "JPEG", quality=92, optimize=True)
    print(f"Wrote {OUT_PNG} and {OUT_JPG} at {img.size}")


if __name__ == "__main__":
    main()
