"""Generate circular favicon assets from public/images/logo.png."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "public" / "images" / "logo.png"
PUBLIC = ROOT / "public"


def circular_icon(img: Image.Image, size: int, bg: tuple[int, int, int, int] | None = None) -> Image.Image:
    """Crop logo to square, resize, then mask into a circle."""
    img = img.convert("RGBA")
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    cropped = img.crop((left, top, left + side, top + side))
    resized = cropped.resize((size, size), Image.Resampling.LANCZOS)

    # Soft inset so circle edge doesn't clip the logo wordmark harshly
    inset = max(1, size // 32)
    inner = size - inset * 2
    content = resized.resize((inner, inner), Image.Resampling.LANCZOS)

    if bg is None:
        canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    else:
        canvas = Image.new("RGBA", (size, size), bg)

    canvas.paste(content, (inset, inset), content)

    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size - 1, size - 1), fill=255)

    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(canvas, (0, 0))
    out.putalpha(mask)
    return out


def main() -> None:
    src = Image.open(LOGO)
    PUBLIC.mkdir(parents=True, exist_ok=True)

    # Transparent circular PNG for modern browsers / PWA
    circular_icon(src, 512).save(PUBLIC / "icon.png", "PNG", optimize=True)

    # Apple touch: circle on ivory so home-screen tile isn't empty corners
    ivory = (248, 244, 236, 255)
    circular_icon(src, 180, bg=ivory).save(PUBLIC / "apple-icon.png", "PNG", optimize=True)

    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_images = [circular_icon(src, s[0]) for s in ico_sizes]
    ico_images[-1].save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=ico_sizes,
        append_images=ico_images[:-1],
    )

    print("Wrote circular favicon.ico, icon.png (512), apple-icon.png (180)")


if __name__ == "__main__":
    main()
