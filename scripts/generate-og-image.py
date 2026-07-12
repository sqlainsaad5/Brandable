"""Generate WhatsApp-friendly OG image with circular logo + BRANDABLE wordmark."""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "public" / "images" / "logo.png"
OUT_JPG = ROOT / "public" / "og-image.jpg"
OUT_PNG = ROOT / "public" / "og-image.png"

W, H = 1200, 630
BG = (248, 244, 236)
GREEN = (20, 61, 43)
BRASS = (166, 140, 90)


def find_font(names: list[str], size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    windir = Path(os.environ.get("WINDIR", r"C:\Windows")) / "Fonts"
    for name in names:
        path = windir / name
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def circular_logo(size: int) -> Image.Image:
    src = Image.open(LOGO).convert("RGBA")
    w, h = src.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    cropped = src.crop((left, top, left + side, top + side)).resize(
        (size, size), Image.Resampling.LANCZOS
    )
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(cropped, (0, 0))
    out.putalpha(mask)
    return out


def main() -> None:
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    logo_size = 168
    logo = circular_logo(logo_size)
    lx = (W - logo_size) // 2
    ly = 118
    img.paste(logo, (lx, ly), logo)

    # Thin brass ring around logo
    pad = 6
    d.ellipse(
        (lx - pad, ly - pad, lx + logo_size + pad, ly + logo_size + pad),
        outline=BRASS,
        width=3,
    )

    title_font = find_font(["georgiab.ttf", "Georgia.ttf", "timesbd.ttf"], 72)
    tag_font = find_font(["segoeui.ttf", "arial.ttf"], 28)

    title = "BRANDABLE"
    tag = "Women's Western Wear"

    tb = d.textbbox((0, 0), title, font=title_font)
    tw = tb[2] - tb[0]
    ty = ly + logo_size + 36
    d.text(((W - tw) // 2, ty), title, font=title_font, fill=GREEN)

    line_y = ty + (tb[3] - tb[1]) + 22
    lw = 100
    d.line([(W // 2 - lw // 2, line_y), (W // 2 + lw // 2, line_y)], fill=BRASS, width=2)

    tb2 = d.textbbox((0, 0), tag, font=tag_font)
    tw2 = tb2[2] - tb2[0]
    d.text(((W - tw2) // 2, line_y + 18), tag, font=tag_font, fill=GREEN)

    OUT_JPG.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT_JPG, "JPEG", quality=92, optimize=True)
    img.save(OUT_PNG, "PNG", optimize=True)
    print(f"Wrote {OUT_JPG} and {OUT_PNG} at {img.size}")


if __name__ == "__main__":
    main()
