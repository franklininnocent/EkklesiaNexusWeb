#!/usr/bin/env python3
"""Generate branded Open Graph image (1200×630). No fake stats; official navy + logo + slogan."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
LOGO_PATH = ROOT / "public/logos/ekklesianexus-horizontal.png"
OUT_PNG = ROOT / "public/images/og/og-preview.png"
OUT_WEBP = ROOT / "public/images/og/og-preview.webp"

W, H = 1200, 630
NAVY = (0, 48, 112)  # #003070
GOLD = (224, 168, 48)  # #e0a830
WHITE = (255, 255, 255)
MUTED = (203, 213, 225)  # slate-300 on navy

# Keep in sync with src/content/contract.ts
SLOGAN = "The Next Generation of Church Management System."
SUPPORTING = "One connected church. Complete 360° management."


def load_font(size: int, serif: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = (
        [
            "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
        ]
        if serif
        else [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        ]
    )
    for path in candidates:
        if Path(path).is_file():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def main() -> None:
    canvas = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(canvas)

    # Subtle top accent
    draw.rectangle((0, 0, W, 6), fill=GOLD)

    logo = Image.open(LOGO_PATH).convert("RGBA")
    max_logo_w = 520
    scale = min(max_logo_w / logo.width, 1.0)
    logo = logo.resize((int(logo.width * scale), int(logo.height * scale)), Image.Resampling.LANCZOS)
    lx = (W - logo.width) // 2
    ly = 72
    canvas.paste(logo, (lx, ly), logo)

    slogan_font = load_font(34, serif=True)
    support_font = load_font(26, serif=False)

    slogan_y = ly + logo.height + 48
    support_y = slogan_y + 56

    def centered_text(text: str, y: int, font: ImageFont.FreeTypeFont | ImageFont.ImageFont, fill: tuple[int, int, int]) -> None:
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        draw.text(((W - tw) // 2, y), text, font=font, fill=fill)

    centered_text(SLOGAN, slogan_y, slogan_font, WHITE)
    centered_text(SUPPORTING, support_y, support_font, MUTED)

    OUT_PNG.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT_PNG, "PNG", optimize=True)
    canvas.save(OUT_WEBP, "WEBP", quality=88, method=6)
    print(f"Wrote {OUT_PNG} and {OUT_WEBP}")


if __name__ == "__main__":
    main()
