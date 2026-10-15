"""Render the Thanksgiving poster and share image, and convert the venue photos.

Writes into public/images/articles/thanksgiving-dinner-bangkok/:
  thanksgiving-in-bangkok-2026-happy-turkey-day     (.jpg + .webp, 1080x1350)
  thanksgiving-dinner-bangkok-2026-family-guide.jpg  (1200x630 share image)
  plus the venue photos converted to .webp (pass their folder as argument 2).

Usage: python3 thanksgiving_posters.py <repo root> [venue photo folder]
Fonts come from node_modules (npm install in this folder, see README.md).
"""
import base64
import pathlib
import sys

from PIL import Image
from playwright.sync_api import sync_playwright

from festive_posters import save  # same JPG/WebP + EXIF/XMP writer as the festive posters

HERE = pathlib.Path(__file__).resolve().parent
FONTS = HERE / "node_modules" / "@fontsource"
REPO = pathlib.Path(sys.argv[1]).resolve()
PHOTOS = pathlib.Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else None
SLUG = "thanksgiving-dinner-bangkok"
OUT = REPO / "public" / "images" / "articles" / SLUG
URL = f"https://www.bkkfamilies.com/blog/{SLUG}"


def font(face, path, weight):
    data = base64.b64encode((FONTS / path).read_bytes()).decode()
    return (f"@font-face{{font-family:'{face}';src:url(data:font/woff2;base64,{data}) "
            f"format('woff2');font-weight:{weight};}}")


CSS = "".join([
    font("Fredoka", "fredoka/files/fredoka-latin-600-normal.woff2", 600),
    font("Fredoka", "fredoka/files/fredoka-latin-700-normal.woff2", 700),
    font("Nunito", "nunito/files/nunito-latin-600-normal.woff2", 600),
    font("Nunito", "nunito/files/nunito-latin-800-normal.woff2", 800),
]) + """
*{box-sizing:border-box;margin:0;padding:0}
body{background:#FFF4E4;color:#3D1E5C;font-family:'Nunito',sans-serif;-webkit-font-smoothing:antialiased;position:relative;overflow:hidden}
.f{font-family:'Fredoka',sans-serif}
.abs{position:absolute}
.pill{display:inline-block;background:#5C2D91;color:#fff;border-radius:999px;font-family:'Fredoka',sans-serif;font-weight:600;letter-spacing:3px}
.bubble{background:#fff;border:4px solid #3D1E5C;border-radius:28px;text-align:center;font-family:'Fredoka',sans-serif;font-weight:600;line-height:1.1}
"""

TURKEY = """<svg viewBox="0 0 560 520" width="{w}" height="{h}" class="abs" style="left:{x}px;top:{y}px"><g transform="translate(280 300)">
<ellipse cx="0" cy="-150" rx="52" ry="150" fill="#F4831F" transform="rotate(-75)"/>
<ellipse cx="0" cy="-150" rx="52" ry="150" fill="#3EC1D3" transform="rotate(-50)"/>
<ellipse cx="0" cy="-150" rx="52" ry="150" fill="#8DC63F" transform="rotate(-25)"/>
<ellipse cx="0" cy="-150" rx="52" ry="150" fill="#5C2D91"/>
<ellipse cx="0" cy="-150" rx="52" ry="150" fill="#8DC63F" transform="rotate(25)"/>
<ellipse cx="0" cy="-150" rx="52" ry="150" fill="#3EC1D3" transform="rotate(50)"/>
<ellipse cx="0" cy="-150" rx="52" ry="150" fill="#F4831F" transform="rotate(75)"/>
<ellipse cx="0" cy="-120" rx="30" ry="105" fill="#fff" opacity=".22" transform="rotate(-50)"/>
<ellipse cx="0" cy="-120" rx="30" ry="105" fill="#fff" opacity=".22"/>
<ellipse cx="0" cy="-120" rx="30" ry="105" fill="#fff" opacity=".22" transform="rotate(50)"/>
<path d="M-40 118 L-40 168 M-40 168 L-62 182 M-40 168 L-40 186 M-40 168 L-18 182" stroke="#E8941F" stroke-width="11" stroke-linecap="round" fill="none"/>
<path d="M40 118 L40 168 M40 168 L18 182 M40 168 L40 186 M40 168 L62 182" stroke="#E8941F" stroke-width="11" stroke-linecap="round" fill="none"/>
<ellipse cx="0" cy="30" rx="118" ry="112" fill="#8A5530"/>
<ellipse cx="0" cy="58" rx="72" ry="70" fill="#B97A47"/>
<ellipse cx="-112" cy="40" rx="34" ry="58" fill="#6F4224" transform="rotate(18 -112 40)"/>
<ellipse cx="128" cy="-28" rx="30" ry="56" fill="#6F4224" transform="rotate(-38 128 -28)"/>
<circle cx="0" cy="-92" r="72" fill="#9A6136"/>
<ellipse cx="-30" cy="-102" rx="19" ry="23" fill="#fff"/><ellipse cx="30" cy="-102" rx="19" ry="23" fill="#fff"/>
<circle cx="-26" cy="-98" r="12" fill="#2A1630"/><circle cx="34" cy="-98" r="12" fill="#2A1630"/>
<circle cx="-22" cy="-103" r="4.5" fill="#fff"/><circle cx="38" cy="-103" r="4.5" fill="#fff"/>
<ellipse cx="-52" cy="-66" rx="15" ry="9" fill="#F48FA0" opacity=".85"/><ellipse cx="52" cy="-66" rx="15" ry="9" fill="#F48FA0" opacity=".85"/>
<path d="M-18 -74 L18 -74 L0 -46 Z" fill="#F7B32B" stroke="#E8941F" stroke-width="4" stroke-linejoin="round"/>
<path d="M8 -54 C26 -50 28 -24 14 -14 C2 -6 -6 -22 2 -36 Z" fill="#E2483D"/>
<path d="M-62 -150 C-40 -186 40 -186 62 -150 Z" fill="#3D1E5C"/>
<rect x="-84" y="-156" width="168" height="16" rx="8" fill="#3D1E5C"/>
<rect x="-30" y="-176" width="60" height="18" rx="4" fill="#F7C948"/>
<rect x="-16" y="-171" width="32" height="8" rx="3" fill="#3D1E5C"/>
</g></svg>"""


def leaf(x, y, rot, fill, vein, s=1.0):
    return (f'<g transform="translate({x} {y}) rotate({rot}) scale({s})"><path d="M0 -26 C16 -18 22 0 0 26 '
            f'C-22 0 -16 -18 0 -26 Z" fill="{fill}"/><path d="M0 -20 L0 22" stroke="{vein}" stroke-width="2.5" '
            f'stroke-linecap="round"/></g>')


def frangipani(x, y, s=1.0):
    petals = "".join(f'<circle cx="{cx}" cy="{cy}" r="9" fill="#fff"/>'
                     for cx, cy in [(0, -12), (11, -4), (7, 10), (-7, 10), (-11, -4)])
    return f'<g transform="translate({x} {y}) scale({s})">{petals}<circle r="6" fill="#F7C948"/></g>'


def road(w, h, y0, pins):
    """Cartoon black road with a dashed centre line and map pins, on a purple hill."""
    mid = f"M-20 {y0} C{w*.19} {y0-80} {w*.33} {y0+50} {w*.52} {y0-20} C{w*.7} {y0-90} {w*.83} {y0} {w+20} {y0-50}"
    hill = mid.replace(f"M-20 {y0}", f"M-20 {y0+28}", 1)
    out = (f'<svg class="abs" style="left:0;top:0" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
           f'<path d="{hill} L{w+20} {h} L-20 {h} Z" fill="#5C2D91"/>'
           f'<path d="{mid}" stroke="#1C1C1C" stroke-width="44" fill="none" stroke-linecap="round"/>'
           f'<path d="{mid}" stroke="#F7C948" stroke-width="5" fill="none" stroke-dasharray="26 20"/>')
    for px, py, c in pins:
        out += (f'<g transform="translate({px} {py})"><path d="M0 0 C-18 -20 -22 -34 -22 -44 A22 22 0 0 1 22 -44 '
                f'C22 -34 18 -20 0 0 Z" fill="{c}" stroke="#1C1C1C" stroke-width="4"/><circle cy="-44" r="8" fill="#fff"/></g>')
    return out + "</svg>"


def page(w, h, body):
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body style="width:{w}px;height:{h}px">{body}</body></html>'


def poster():
    deco = ('<svg class="abs" style="left:0;top:0" width="1080" height="1350">'
            + leaf(96, 250, -24, "#F4831F", "#B9530A") + leaf(980, 300, 30, "#8DC63F", "#5E8F22", 1.15)
            + leaf(150, 690, 18, "#3EC1D3", "#1F8C9B", .85) + leaf(940, 720, -36, "#F4831F", "#B9530A", .92)
            + frangipani(70, 470) + frangipani(1010, 520)
            + '<circle cx="230" cy="150" r="7" fill="#3EC1D3"/><circle cx="860" cy="140" r="6" fill="#8DC63F"/>'
            '<circle cx="900" cy="600" r="5" fill="#5C2D91"/><circle cx="190" cy="580" r="6" fill="#F4831F"/></svg>')
    body = deco + f"""
<div class="abs" style="left:0;top:64px;width:1080px;text-align:center">
  <span class="pill" style="font-size:26px;padding:12px 30px">THANKSGIVING 2026 · BANGKOK</span>
  <h1 class="f" style="margin-top:18px;font-weight:700;font-size:118px;line-height:.98;letter-spacing:-1px;padding:0 60px">Happy Turkey Day, Bangkok!</h1>
</div>
{TURKEY.format(w=500, h=464, x=250, y=390)}
<div class="abs bubble" style="left:720px;top:400px;width:250px;padding:18px 20px;font-size:30px">Gobble gobble, sawasdee krap!
  <svg class="abs" style="left:28px;bottom:-44px" width="60" height="50"><path d="M4 0 L56 0 L10 46 Z" fill="#fff" stroke="#3D1E5C" stroke-width="4" stroke-linejoin="round"/><path d="M8 -2 L52 -2" stroke="#fff" stroke-width="8"/></svg>
</div>
<div class="abs" style="left:0;top:884px;width:1080px;text-align:center">
  <div class="f" style="font-weight:700;font-size:56px;line-height:1;color:#B9530A">Thursday, November 26</div>
  <p style="margin:14px auto 0;max-width:820px;font-size:30px;line-height:1.35;font-weight:600">The 5 best Thanksgiving dinners in town, plus where to buy your turkey and fixings to cook at home.</p>
</div>
{road(1080, 1350, 1192, [(250, 1166, "#F4831F"), (560, 1172, "#3EC1D3"), (840, 1166, "#8DC63F")])}
<div class="abs" style="left:72px;top:1236px;width:936px;display:flex;align-items:center;justify-content:space-between;color:#fff">
  <div><div class="f" style="font-weight:700;font-size:44px;line-height:1">bkkfamilies.com</div><div style="font-size:22px;font-weight:600;margin-top:4px">Bangkok Expat Families</div></div>
  <div class="f" style="font-weight:700;font-size:30px;letter-spacing:3px">YOUR BANGKOK ROADMAP</div>
</div>"""
    return page(1080, 1350, body)


def share():
    deco = ('<svg class="abs" style="left:0;top:0" width="1200" height="630">'
            + leaf(1165, 220, 30, "#8DC63F", "#5E8F22", .9) + leaf(690, 56, -24, "#F4831F", "#B9530A", .8)
            + frangipani(1160, 330, .9) + '</svg>')
    body = deco + f"""
<div class="abs" style="left:64px;top:56px;width:640px">
  <span class="pill" style="font-size:20px;padding:9px 22px">THANKSGIVING 2026 · BANGKOK</span>
  <h1 class="f" style="margin-top:20px;font-weight:700;font-size:74px;line-height:1">Thanksgiving Dinner in Bangkok</h1>
  <p style="margin-top:18px;font-size:27px;line-height:1.3;font-weight:600">The 5 best places for turkey, plus how to cook the feast at home.</p>
  <div class="f" style="margin-top:16px;font-weight:700;font-size:32px;color:#B9530A">Thursday, November 26</div>
</div>
{TURKEY.format(w=420, h=390, x=730, y=60)}
<div class="abs bubble" style="left:1008px;top:22px;width:172px;padding:10px 12px;font-size:21px;border-width:3px">Gobble gobble, sawasdee krap!</div>
{road(1200, 630, 548, [(300, 528, "#F4831F"), (640, 532, "#3EC1D3"), (930, 524, "#8DC63F")])}
<div class="abs" style="left:64px;top:572px;width:1072px;display:flex;justify-content:space-between;align-items:center;color:#fff">
  <div class="f" style="font-weight:700;font-size:30px">bkkfamilies.com</div>
  <div class="f" style="font-weight:700;font-size:20px;letter-spacing:3px">YOUR BANGKOK ROADMAP</div>
</div>"""
    return page(1200, 630, body)


JOBS = [
    ("thanksgiving-in-bangkok-2026-happy-turkey-day", poster, 1080, 1350,
     "Happy Turkey Day, Bangkok: Thanksgiving 2026",
     "Thanksgiving in Bangkok 2026 poster: a cartoon turkey says gobble gobble, sawasdee krap. Thursday 26 November, the 5 best Thanksgiving dinners and where to buy a turkey",
     ["Thanksgiving Bangkok", "Thanksgiving 2026", "Bangkok families"], True),
    ("thanksgiving-dinner-bangkok-2026-family-guide", share, 1200, 630,
     "Thanksgiving dinner in Bangkok 2026",
     "Thanksgiving dinner in Bangkok 2026: the 5 best places for turkey, plus how to cook the feast at home",
     ["Thanksgiving dinner Bangkok", "Bangkok families"], False),
]

# (source file in the photo folder, output name, alt/description, credit)
PHOTOS_OUT = [
    ("landmark-bangkok.jpg", "thanksgiving-dinner-bangkok-the-landmark-hotel-sukhumvit",
     "The Landmark Bangkok hotel entrance on Sukhumvit Road, a classic spot for Thanksgiving dinner in Bangkok",
     "The Landmark Bangkok"),
    ("bourbon-street-ekkamai.jpg", "thanksgiving-dinner-bangkok-bourbon-street-ekkamai",
     "Bourbon Street Restaurant and Oyster Bar on Sukhumvit Soi 63, Ekkamai, Bangkok", "Bourbon St. Bangkok"),
    ("shangri-la-horizon-cruise-night.webp", "thanksgiving-dinner-bangkok-shangri-la-horizon-cruise-wat-arun",
     "Shangri-La Horizon dinner cruise lit up at night in front of Wat Arun on the Chao Phraya River", "tiket.com"),
    ("shangri-la-horizon-cruise-buffet.webp", "thanksgiving-dinner-bangkok-shangri-la-horizon-cruise-buffet",
     "Chef preparing the buffet aboard the Shangri-La Horizon dinner cruise on the Chao Phraya River", "tiket.com"),
]


def convert_photos():
    for src, name, desc, credit in PHOTOS_OUT:
        im = Image.open(PHOTOS / src).convert("RGB")
        if im.width > 1400:
            im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
        exif = Image.Exif()
        exif[270] = desc
        exif[315] = credit
        exif[33432] = f"© {credit}. Used with permission on bkkfamilies.com"
        im.save(OUT / f"{name}.webp", "WEBP", quality=82, method=6, exif=exif)
        print("converted", name, im.size)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for file, fn, w, h, title, desc, subjects, webp in JOBS:
            pg = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
            pg.set_content(fn(), wait_until="load")
            pg.evaluate("document.fonts.ready")
            pg.wait_for_timeout(150)
            png = pg.screenshot(full_page=False)
            pg.close()
            save(png, str(OUT / file), title, desc, URL, subjects, webp)
            print("rendered", file)
        browser.close()
    if PHOTOS:
        convert_photos()


if __name__ == "__main__":
    main()
