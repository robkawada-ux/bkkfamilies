"""Render the Christmas and New Year's Eve posters for bkkfamilies.com.

Each poster is an HTML page rendered by headless Chromium at its exact pixel
size, then saved as a .jpg (download, sitemap, structured data) and a .webp
(on-page), both carrying EXIF and XMP title, description, creator and rights.

Usage: python3 festive_posters.py <repo root> [only-prefix]  (see README.md)
"""
import io
import math
import pathlib
import sys

from PIL import Image
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
FONTS = HERE / "node_modules" / "@fontsource"
REPO = pathlib.Path(sys.argv[1]).resolve()
ONLY = sys.argv[2] if len(sys.argv) > 2 else ""


def font(face, path, weight, style="normal"):
    import base64

    data = base64.b64encode((FONTS / path).read_bytes()).decode()
    return (
        f"@font-face{{font-family:'{face}';src:url(data:font/woff2;base64,{data}) format('woff2');"
        f"font-weight:{weight};font-style:{style};}}"
    )


BASE_CSS = "".join(
    [
        font("Fraunces", "fraunces/files/fraunces-latin-700-normal.woff2", 700),
        font("Fraunces", "fraunces/files/fraunces-latin-900-normal.woff2", 900),
        font("Fraunces", "fraunces/files/fraunces-latin-700-italic.woff2", 700, "italic"),
        font("Fraunces", "fraunces/files/fraunces-latin-900-italic.woff2", 900, "italic"),
        font("Figtree", "figtree/files/figtree-latin-400-normal.woff2", 400),
        font("Figtree", "figtree/files/figtree-latin-600-normal.woff2", 600),
        font("Figtree", "figtree/files/figtree-latin-800-normal.woff2", 800),
        font("DM Mono", "dm-mono/files/dm-mono-latin-500-normal.woff2", 500),
    ]
) + """
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;height:100%}
body{font-family:'Figtree','DejaVu Sans',sans-serif;-webkit-font-smoothing:antialiased;position:relative;overflow:hidden}
.serif{font-family:'Fraunces',Georgia,serif}
.mono{font-family:'DM Mono',monospace}
.abs{position:absolute}
.logo{display:flex;align-items:center;gap:18px}
.logo .mark{width:84px;height:84px;border-radius:50%;background:#fff;position:relative;flex:none}
.logo .mark i{position:absolute;width:20px;height:20px;border-radius:50%}
.logo b{display:block;font-family:'Fraunces',serif;font-weight:700;font-size:40px;color:#fff;line-height:1}
.logo small{display:block;margin-top:6px;font-weight:800;font-size:15px;letter-spacing:.2em}
.pill{display:inline-block;border-radius:999px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
"""

LOGO_DOTS = (
    '<i style="left:32px;top:12px;background:#F4831F"></i>'
    '<i style="left:12px;top:32px;background:#8DC63F"></i>'
    '<i style="left:52px;top:32px;background:#3EC1D3"></i>'
    '<i style="left:32px;top:52px;background:#5C2D91"></i>'
)


def logo(sub_color):
    return (
        f'<div class="logo"><span class="mark">{LOGO_DOTS}</span>'
        f'<span><b>BKK Families</b><small style="color:{sub_color}">BANGKOK EXPAT FAMILIES</small></span></div>'
    )


# ------------------------------------------------------------------ art

def snow(n=60, w=1080, h=1350, seed=7, opacity=0.35):
    import random

    rnd = random.Random(seed)
    dots = []
    for _ in range(n):
        x, y, r = rnd.uniform(0, w), rnd.uniform(0, h), rnd.choice([2, 2, 3, 3, 4, 5])
        o = rnd.uniform(0.25, 1) * opacity
        dots.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r}" fill="#fff" opacity="{o:.2f}"/>')
    return f'<svg class="abs" style="left:0;top:0" width="{w}" height="{h}">{"".join(dots)}</svg>'


def string_lights(x0, x1, y, sag, n, w, h, wire="#06180f"):
    colors = ["#c62f3a", "#f4b942", "#3EC1D3", "#8DC63F", "#F4831F", "#ffffff"]
    pts = []
    for i in range(101):
        t = i / 100
        pts.append(f"{x0 + (x1 - x0) * t:.1f},{y + sag * math.sin(math.pi * t):.1f}")
    out = [f'<polyline points="{" ".join(pts)}" fill="none" stroke="{wire}" stroke-width="3"/>']
    for i in range(n):
        t = (i + 0.5) / n
        x = x0 + (x1 - x0) * t
        yy = y + sag * math.sin(math.pi * t)
        c = colors[i % len(colors)]
        out.append(f'<rect x="{x - 6:.1f}" y="{yy:.1f}" width="12" height="10" rx="2" fill="{wire}"/>')
        out.append(f'<ellipse cx="{x:.1f}" cy="{yy + 30:.1f}" rx="26" ry="30" fill="{c}" opacity="0.25"/>')
        out.append(f'<ellipse cx="{x:.1f}" cy="{yy + 27:.1f}" rx="12" ry="18" fill="{c}"/>')
        out.append(f'<ellipse cx="{x - 4:.1f}" cy="{yy + 20:.1f}" rx="3" ry="6" fill="#fff" opacity="0.5"/>')
    return f'<svg class="abs" style="left:0;top:0" width="{w}" height="{h}">{"".join(out)}</svg>'


def xmas_tree(x, y, s=1.0):
    """A cartoon Christmas tree, top of star at (x, y)."""
    g = []
    tiers = [(0, 70, 110), (60, 105, 150), (130, 140, 190)]
    greens = ["#2f8f57", "#257a49", "#1d6a3e"]
    for (dy, half, height), col in zip(tiers, greens):
        top = 40 + dy
        g.append(
            f'<path d="M0 {top} L{half} {top + height} Q0 {top + height + 18} {-half} {top + height} Z" fill="{col}"/>'
        )
    g.append('<rect x="-22" y="350" width="44" height="46" rx="6" fill="#7a4a2a"/>')
    # garland
    g.append('<path d="M-60 175 Q0 210 70 160" stroke="#f4b942" stroke-width="6" fill="none" stroke-linecap="round"/>')
    g.append('<path d="M-95 260 Q0 300 100 245" stroke="#f4b942" stroke-width="6" fill="none" stroke-linecap="round"/>')
    for bx, by, c in [(-30, 140, "#c62f3a"), (35, 190, "#3EC1D3"), (-55, 230, "#f4b942"), (55, 270, "#c62f3a"),
                      (-10, 300, "#ffffff"), (-90, 320, "#3EC1D3"), (90, 315, "#f4b942"), (20, 110, "#ffffff")]:
        g.append(f'<circle cx="{bx}" cy="{by}" r="12" fill="{c}"/><circle cx="{bx - 4}" cy="{by - 4}" r="3.5" fill="#fff" opacity=".55"/>')
    # star
    pts = []
    for k in range(10):
        r = 34 if k % 2 == 0 else 14
        a = -math.pi / 2 + k * math.pi / 5
        pts.append(f"{r * math.cos(a):.1f},{20 + r * math.sin(a):.1f}")
    g.append(f'<polygon points="{" ".join(pts)}" fill="#f4b942"/>')
    return f'<g transform="translate({x} {y}) scale({s})">{"".join(g)}</g>'


def bauble(x, y, r, color, string_top=None):
    s = []
    if string_top is not None:
        s.append(f'<line x1="{x}" y1="{string_top}" x2="{x}" y2="{y - r - 14}" stroke="#f4b942" stroke-width="3"/>')
    s.append(f'<rect x="{x - r * 0.28}" y="{y - r - 16}" width="{r * 0.56}" height="18" rx="4" fill="#d9a33a"/>')
    s.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{color}"/>')
    s.append(f'<path d="M{x - r * 0.92} {y - r * 0.15} Q{x} {y + r * 0.35} {x + r * 0.92} {y - r * 0.15}" stroke="#fff" stroke-opacity=".45" stroke-width="{r * 0.09}" fill="none"/>')
    s.append(f'<circle cx="{x - r * 0.38}" cy="{y - r * 0.4}" r="{r * 0.16}" fill="#fff" opacity=".55"/>')
    return "".join(s)


def santa_hat(x, y, s=1.0):
    return (
        f'<g transform="translate({x} {y}) scale({s})">'
        '<path d="M-90 40 Q-60 -110 70 -70 Q30 -30 40 40 Z" fill="#c62f3a"/>'
        '<circle cx="80" cy="-70" r="26" fill="#fff"/>'
        '<rect x="-110" y="25" width="170" height="44" rx="22" fill="#fff"/>'
        "</g>"
    )


def burst(x, y, r, color, rays=18, width=5, opacity=1.0):
    out = []
    for k in range(rays):
        a = k / rays * 2 * math.pi
        x1, y1 = x + math.cos(a) * r * 0.3, y + math.sin(a) * r * 0.3
        x2, y2 = x + math.cos(a) * r, y + math.sin(a) * r
        out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" stroke-width="{width}" stroke-linecap="round"/>')
        out.append(f'<circle cx="{x2 + math.cos(a) * 10:.1f}" cy="{y2 + math.sin(a) * 10:.1f}" r="{width * 0.7:.1f}" fill="{color}"/>')
    return f'<g opacity="{opacity}">{"".join(out)}</g>'


def stars(n, w, h, seed=3):
    import random

    rnd = random.Random(seed)
    out = []
    for _ in range(n):
        x, y = rnd.uniform(0, w), rnd.uniform(0, h)
        out.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{rnd.choice([1.5, 2, 2.5, 3])}" fill="#fff" opacity="{rnd.uniform(.25, .8):.2f}"/>')
    return f'<svg class="abs" style="left:0;top:0" width="{w}" height="{h}">{"".join(out)}</svg>'


def people(level, on="#f5c451", hi="#d6336c", off="rgba(255,255,255,.18)", size=26):
    out = []
    for n in range(1, 4):
        fill = (hi if level == 3 else on) if n <= level else off
        out.append(
            f'<svg width="{size}" height="{size}" viewBox="0 0 20 20"><circle cx="10" cy="5.5" r="3.4" fill="{fill}"/>'
            f'<path fill="{fill}" d="M3.5 18.5c0-4.2 2.9-7.2 6.5-7.2s6.5 3 6.5 7.2Z"/></svg>'
        )
    return '<span style="display:inline-flex;gap:2px;vertical-align:middle">' + "".join(out) + "</span>"


def road(x, top, bottom, w=1080, h=1350, amp=18):
    pts = []
    steps = 60
    for i in range(steps + 1):
        t = i / steps
        yy = top + (bottom - top) * t
        xx = x + amp * math.sin(t * math.pi * 3)
        pts.append(f"{xx:.1f},{yy:.1f}")
    p = " ".join(pts)
    return (
        f'<svg class="abs" style="left:0;top:0" width="{w}" height="{h}">'
        f'<polyline points="{p}" fill="none" stroke="#2b2b2b" stroke-width="26" stroke-linecap="round"/>'
        f'<polyline points="{p}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="16 14"/></svg>'
    )


# ------------------------------------------------------------------ pages

def page(w, h, bg, body, extra_css=""):
    return (
        f"<!doctype html><html><head><meta charset='utf-8'><style>{BASE_CSS}"
        f"body{{width:{w}px;height:{h}px;background:{bg}}}{extra_css}</style></head><body>{body}</body></html>"
    )


CARD_CSS = """
.cards{position:absolute;left:56px;right:56px;display:grid;grid-template-columns:1fr 1fr;column-gap:84px;row-gap:22px}
.card{background:#fff;border-radius:20px;padding:18px 22px 16px;box-shadow:0 6px 0 rgba(0,0,0,.18)}
.card h3{display:flex;align-items:center;gap:12px;font-family:'Fraunces',serif;font-weight:700;font-size:26px;line-height:1.05}
.card h3 .n{flex:none;width:38px;height:38px;border-radius:50%;color:#fff;font-family:'Figtree';font-weight:800;font-size:19px;display:flex;align-items:center;justify-content:center}
.card dl{margin-top:10px;font-size:17.5px;line-height:1.32;color:#222}
.card dl div{display:flex;gap:8px}
.card dt{font-weight:800;flex:none}
.card p{margin-top:7px;font-size:16.5px;line-height:1.36;color:#444}
"""


def xmas_cheat():
    W, H = 1080, 1350
    cards = [
        ("Book Christmas dinner", "#c62f3a", [("Where", "28 hotels, pubs and cruises"), ("When", "Book by 30 November"), ("Cost", "฿995 to ฿8,900, kids about half")],
         "Our picks: The Mesh for little ones, The Sukhothai for Santa, Chatrium Riverside for the river."),
        ("Meet Santa, free", "#2f8f57", [("Where", "The big malls and markets"), ("When", "December weekend afternoons"), ("Cost", "Free")],
         "Last year: Paragon 2 to 4pm, CentralWorld 3 to 5pm, ICONSIAM 3:30pm, Asiatique 5pm."),
        ("The tree trail", "#d9a33a", [("Where", "BTS Siam to Phrom Phong"), ("When", "Weekday evenings, from 6pm"), ("Cost", "Free")],
         "Paragon's castle show, CentralWorld's giant tree, Central Embassy's elf hunt, then EM District."),
        ("Christmas markets", "#3EC1D3", [("Where", "Rembrandt, Goethe, Gaysorn"), ("When", "Late November to mid December")],
         "The Hope Fair, the German Christmas Market and the Danish Christmas Bazaar, which brings Santa too."),
        ("Christmas Day itself", "#c62f3a", [("When", "Friday 25 December"), ("Note", "Not a public holiday in Thailand")],
         "Presents and the pool, Snow Town at Dream World, or Lumpini's paddle boats."),
        ("Christmas church", "#2f8f57", [("Where", "Holy Redeemer, Christ Church, Assumption Cathedral, St Louis")],
         "Christmas Eve services fill fast. Arrive early to sit together."),
    ]
    items = []
    for i, (title, col, rows, text) in enumerate(cards):
        dl = "".join(f'<div><dt style="color:{col}">{k}</dt><dd>{v}</dd></div>' for k, v in rows)
        items.append(
            f'<div class="card"><h3 style="color:#0f3b2e"><span class="n" style="background:{col}">{i + 1}</span>{title}</h3>'
            f"<dl>{dl}</dl><p>{text}</p></div>"
        )
    body = f"""
    {snow(70, W, H)}
    {string_lights(380, 1100, -8, 46, 9, W, H)}
    <svg class="abs" style="left:0;top:0" width="{W}" height="{H}">{xmas_tree(915, 120, 0.7)}</svg>
    <div class="abs" style="left:56px;top:48px">{logo('#f4b942')}</div>
    <div class="abs" style="left:56px;top:156px">
      <span class="pill" style="background:#c62f3a;color:#fff;font-size:19px;padding:9px 20px">Thu 24 and Fri 25 December</span>
      <h1 class="serif" style="margin-top:16px;font-weight:900;font-size:84px;line-height:.98;color:#fdf8ef">Christmas<br>in Bangkok</h1>
      <p class="serif" style="margin-top:6px;font-style:italic;font-weight:900;font-size:46px;color:#f4b942">2026, with kids</p>
    </div>
    {road(540, 478, 1130, W, H)}
    <div class="cards" style="top:462px">{''.join(items)}</div>
    <div class="gtk abs" style="left:56px;right:56px;top:1134px;background:#c62f3a;border-radius:20px;padding:15px 26px;color:#fff">
      <p style="font-weight:800;letter-spacing:.16em;font-size:16px;opacity:.85">GOOD TO KNOW</p>
      <ul style="margin-top:4px;padding-left:22px;font-size:17px;line-height:1.38">
        <li>School&rsquo;s out from 14 December to 12 January, depending on the school.</li>
        <li>&ldquo;++&rdquo; prices add 17%. Under-4s or under-6s often eat free, so ask.</li>
        <li>Listings are what ran in 2025. We update them as 2026 is announced.</li>
      </ul>
    </div>
    <div class="abs" style="left:56px;bottom:30px;color:#fdf8ef">
      <p style="font-weight:800;letter-spacing:.2em;font-size:17px">YOUR BANGKOK ROADMAP</p>
      <p style="font-size:17px;opacity:.8;margin-top:4px">Join 40,000 parents in the Bangkok Expat Families group</p>
    </div>
    <div class="abs" style="right:56px;bottom:26px;text-align:right">
      <p style="font-size:16px;font-weight:600;color:#fdf8ef;opacity:.85">Full guide: 28 dinners, Santa, lights and markets</p>
      <p class="serif" style="font-weight:900;font-size:40px;color:#f4b942;line-height:1.05">bkkfamilies.com</p>
    </div>
    """
    return page(W, H, "linear-gradient(165deg,#0f3b2e 0%,#0a2a20 75%)", body, CARD_CSS)


def xmas_dinners():
    W, H = 1080, 1080
    tiers = [
        ("#3EC1D3", "Under ฿2,000", "Pub roasts and bargain buffets, from ฿995"),
        ("#f4b942", "฿2,000 to ฿3,500", "The big hotel buffets, many with Santa"),
        ("#c62f3a", "฿3,500 and up", "Riverside galas, brunches and dinner cruises"),
    ]
    rows = "".join(
        f'<div style="display:flex;align-items:center;gap:22px;margin-top:22px">'
        f'<svg width="74" height="86" viewBox="-40 -52 80 96">{bauble(0, 6, 34, c)}</svg>'
        f'<div><p class="serif" style="font-weight:900;font-size:40px;color:#fdf8ef;line-height:1">{t}</p>'
        f'<p style="font-size:22px;color:#fdf8ef;opacity:.82;margin-top:6px">{d}</p></div></div>'
        for c, t, d in tiers
    )
    hang = "".join(
        bauble(x, y, r, c, string_top=0)
        for x, y, r, c in [(780, 190, 52, "#c62f3a"), (880, 300, 40, "#f4b942"), (975, 160, 46, "#3EC1D3"), (690, 330, 34, "#8DC63F")]
    )
    body = f"""
    {snow(50, W, H, seed=11)}
    <svg class="abs" style="left:0;top:0" width="{W}" height="{H}">{hang}</svg>
    <p class="abs mono" style="left:64px;top:64px;font-size:24px;letter-spacing:.18em;color:#f4b942">BKK FAMILIES · CHRISTMAS 2026</p>
    <h1 class="abs serif" style="left:64px;top:118px;font-weight:900;font-size:100px;line-height:.95;color:#fdf8ef">Christmas<br>dinner in<br><span style="color:#f4b942">Bangkok</span></h1>
    <p class="abs" style="left:64px;top:450px;width:600px;font-size:30px;line-height:1.3;color:#fdf8ef;font-weight:600">28 family dinners and brunches, with real prices for grown-ups and kids.</p>
    <div class="abs" style="left:64px;top:520px">{rows}</div>
    <div class="abs" style="left:64px;right:64px;top:868px;display:flex;gap:12px;flex-wrap:wrap">
      <span class="pill" style="background:rgba(255,255,255,.12);color:#fff;font-size:21px;padding:10px 18px;letter-spacing:.04em;text-transform:none;font-weight:600">Santa at 9 of them</span>
      <span class="pill" style="background:rgba(255,255,255,.12);color:#fff;font-size:21px;padding:10px 18px;letter-spacing:.04em;text-transform:none;font-weight:600">7 with river views</span>
      <span class="pill" style="background:rgba(255,255,255,.12);color:#fff;font-size:21px;padding:10px 18px;letter-spacing:.04em;text-transform:none;font-weight:600">Little ones often free</span>
    </div>
    <div class="abs" style="left:0;right:0;bottom:0;height:120px;background:#c62f3a;display:flex;align-items:center;justify-content:space-between;padding:0 64px">
      <p style="font-size:30px;font-weight:800;color:#fff">Book by 30 November <span style="font-weight:600;opacity:.85">· kids about half price</span></p>
      <p class="mono" style="font-size:26px;color:#fff">bkkfamilies.com</p>
    </div>
    """
    return page(W, H, "linear-gradient(160deg,#0f3b2e 0%,#0a2a20 80%)", body)


def xmas_santa():
    W, H = 1080, 1920
    malls = [
        ("CentralWorld", "December weekends, 3pm to 5pm, plus 24 and 25 Dec"),
        ("Siam Paragon", "December weekends, 2pm to 4pm"),
        ("ICONSIAM", "December weekends, 3:30pm to 4:30pm"),
        ("Asiatique The Riverfront", "December evenings, 5pm to 7pm"),
        ("One Bangkok", "Santa photo corner, 25 to 28 Dec"),
    ]
    markets = [
        ("The Hope Fair, Rembrandt Hotel", "Wed 26 Nov, Santa at 3:30pm"),
        ("Bangkok Accueil Christmas Market", "Sun 30 Nov"),
        ("Danish Christmas Bazaar, Gaysorn", "Sat 6 Dec, Santa about 3pm"),
    ]
    dinners = ["InterContinental", "The Sukhothai", "Chatrium Riverside", "Marriott Marquis", "Anantara Siam", "Rosewood", "Shangri-La", "Millennium Hilton"]

    def block(title, color, rows, free=True):
        r = "".join(
            f'<div style="display:flex;justify-content:space-between;gap:20px;padding:13px 0;border-top:2px solid rgba(15,59,46,.12)">'
            f'<div><p style="font-weight:800;font-size:29px;color:#0f3b2e">{a}</p><p style="font-size:23px;color:#444;margin-top:2px">{b}</p></div>'
            + (f'<span class="pill" style="align-self:center;background:#e7f4ea;color:#1d6a3e;font-size:18px;padding:8px 14px">FREE</span>' if free else "")
            + "</div>"
            for a, b in rows
        )
        return (
            f'<div style="background:#fff;border-radius:28px;padding:24px 34px 8px;margin-top:24px">'
            f'<p style="font-weight:800;letter-spacing:.16em;font-size:21px;color:{color}">{title}</p>{r}</div>'
        )

    chips = "".join(
        f'<span class="pill" style="background:rgba(255,255,255,.12);color:#fff;font-size:21px;padding:10px 18px;margin:0 10px 12px 0;letter-spacing:.04em;text-transform:none;font-weight:600">{d}</span>'
        for d in dinners
    )
    body = f"""
    {snow(90, W, H, seed=21)}
    <svg class="abs" style="left:0;top:0" width="{W}" height="{H}">{santa_hat(870, 250, 1.2)}</svg>
    <div class="abs" style="left:64px;top:70px">{logo('#f4b942')}</div>
    <div class="abs" style="left:64px;right:64px;top:210px">
      <span class="pill" style="background:#f4b942;color:#0f3b2e;font-size:22px;padding:10px 22px">Christmas 2026</span>
      <h1 class="serif" style="margin-top:18px;font-weight:900;font-size:100px;line-height:.95;color:#fff">Where to<br>meet Santa<br><span style="color:#f4b942;font-style:italic">in Bangkok</span></h1>
      <p style="margin-top:18px;font-size:27px;line-height:1.35;color:#fff;opacity:.9">Last year&rsquo;s Santa schedule. Times move, so check on the day.</p>
      {block("AT THE MALLS", "#c62f3a", malls)}
      {block("AT THE CHRISTMAS MARKETS", "#2f8f57", markets)}
      <div class="chk-a" style="margin-top:28px">
        <p style="font-weight:800;letter-spacing:.16em;font-size:21px;color:#f4b942">SANTA AT CHRISTMAS DINNER</p>
        <div style="margin-top:16px;display:flex;flex-wrap:wrap">{chips}</div>
      </div>
    </div>
    <div class="chk-b abs" style="left:0;right:0;bottom:0;height:140px;background:#c62f3a;display:flex;align-items:center;justify-content:space-between;padding:0 64px">
      <p style="font-size:26px;font-weight:600;color:#fff;opacity:.95">Full guide and 2026 updates</p>
      <p class="serif" style="font-weight:900;font-size:46px;color:#fff">bkkfamilies.com</p>
    </div>
    """
    return page(W, H, "linear-gradient(170deg,#0f3b2e 0%,#0a2a20 70%)", body)


def xmas_share():
    W, H = 1200, 630
    body = f"""
    {snow(40, W, H, seed=5)}
    {string_lights(-20, 1220, -10, 34, 12, W, H)}
    <svg class="abs" style="left:0;top:0" width="{W}" height="{H}">{xmas_tree(1065, 175, 0.9)}</svg>
    <div class="abs" style="left:72px;top:96px">{logo('#f4b942')}</div>
    <div class="abs" style="left:72px;top:212px">
      <h1 class="serif" style="font-weight:900;font-size:74px;line-height:.98;color:#fdf8ef">Christmas in Bangkok</h1>
      <p class="serif" style="margin-top:8px;font-style:italic;font-weight:900;font-size:54px;color:#f4b942">2026, with kids</p>
      <p style="margin-top:22px;font-size:28px;color:#fdf8ef;opacity:.88;font-weight:600">28 family Christmas dinners · Santa · lights · markets</p>
    </div>
    <div class="abs" style="left:0;right:0;bottom:0;height:22px;display:flex">
      <i style="flex:1;background:#c62f3a"></i><i style="flex:1;background:#f4b942"></i><i style="flex:1;background:#2f8f57"></i><i style="flex:1;background:#3EC1D3"></i>
    </div>
    <p class="abs mono" style="right:72px;bottom:44px;font-size:24px;color:#f4b942">bkkfamilies.com</p>
    """
    return page(W, H, "linear-gradient(160deg,#0f3b2e 0%,#0a2a20 80%)", body)


# ---------------------------------------------------------------- NYE

def nye_sky(w, h, seed=3, big=True):
    bursts = [
        burst(w * 0.84, h * 0.12, 120, "#f5c451", 20, 6, 0.9),
        burst(w * 0.95, h * 0.28, 70, "#d6336c", 16, 5, 0.85),
        burst(w * 0.66, h * 0.07, 55, "#3EC1D3", 14, 4, 0.8),
    ] if big else [burst(w * 0.86, h * 0.3, 110, "#f5c451", 20, 6, 0.9), burst(w * 0.7, h * 0.18, 60, "#d6336c", 14, 4, 0.85)]
    return stars(80, w, h, seed) + f'<svg class="abs" style="left:0;top:0" width="{w}" height="{h}">{"".join(bursts)}</svg>'


def skyline(w, h, top, color="#070a1f"):
    import random

    rnd = random.Random(9)
    x, out = 0, []
    while x < w:
        bw = rnd.randint(50, 120)
        bh = rnd.randint(40, 170)
        out.append(f'<rect x="{x}" y="{top + 170 - bh}" width="{bw}" height="{bh + h}" fill="{color}"/>')
        for wy in range(top + 190 - bh, top + 170, 26):
            for wx in range(x + 10, x + bw - 10, 22):
                if rnd.random() < 0.28:
                    out.append(f'<rect x="{wx}" y="{wy}" width="8" height="10" fill="#f5c451" opacity=".55"/>')
        x += bw + rnd.randint(0, 8)
    return f'<svg class="abs" style="left:0;top:0" width="{w}" height="{h}">{"".join(out)}</svg>'


def nye_cheat():
    W, H = 1080, 1350
    cards = [
        ("ICONSIAM", 3, "#d6336c", [("When", "28 to 31 Dec, fireworks at midnight"), ("Cost", "Free riverside areas")],
         "The biggest fireworks and drone show, over the river. Arrive mid-afternoon. Best with teens."),
        ("CentralWorld", 3, "#d6336c", [("When", "31 Dec, concerts all evening"), ("Cost", "Free")],
         "Bangkok's Times Square moment. Roads close from 4pm. Hard with a stroller."),
        ("One Bangkok", 2, "#f5a524", [("When", "31 Dec"), ("Cost", "Free, register a QR code")],
         "Fireworks and lasers with more room. Bring ID that matches your registration."),
        ("Sukhumvit and Benchasiri", 2, "#f5a524", [("When", "31 Dec"), ("Cost", "Free")],
         "Drones, lasers and fireworks. Benchasiri Park gives kids grass to sit on."),
        ("Asiatique", 2, "#f5a524", [("When", "31 Dec, from 5pm"), ("Cost", "Free")],
         "River fireworks, concerts and a Ferris wheel. Come early, decide at 9pm."),
        ("Your balcony", 1, "#3EC1D3", [("When", "8pm, then midnight"), ("Cost", "Free")],
         "Count down with Sydney at 8pm, then catch the neighbourhood's at midnight."),
    ]
    items = []
    for title, lvl, col, rows, text in cards:
        dl = "".join(f'<div><dt style="color:#5b3fd1">{k}</dt><dd>{v}</dd></div>' for k, v in rows)
        meter = people(lvl, on="#f5a524", hi="#d6336c", off="#e3e5f2", size=24)
        items.append(
            f'<div class="card"><h3 style="color:#141b44;justify-content:space-between"><span>{title}</span>{meter}</h3>'
            f"<dl>{dl}</dl><p>{text}</p></div>"
        )
    legend = (
        f'<p class="abs" style="right:56px;top:388px;font-size:18px;color:#fff;background:rgba(11,15,43,.85);padding:8px 16px;border-radius:999px">'
        f'{people(1, size=20)} Cosy &nbsp;&nbsp; {people(2, size=20)} Busy &nbsp;&nbsp; {people(3, size=20)} Mega crowds</p>'
    )
    body = f"""
    {nye_sky(W, H)}
    <div class="abs" style="left:56px;top:48px">{logo('#f5c451')}</div>
    <div class="abs" style="left:56px;top:156px">
      <span class="pill" style="background:#f5c451;color:#141b44;font-size:19px;padding:9px 20px">Thursday 31 December 2026</span>
      <h1 class="serif" style="margin-top:16px;font-weight:900;font-size:78px;line-height:.98;color:#fff">New Year&rsquo;s Eve<br>in Bangkok</h1>
      <p class="serif" style="margin-top:6px;font-style:italic;font-weight:900;font-size:44px;color:#f5c451">with kids</p>
    </div>
    {legend}
    {road(540, 478, 1130, W, H)}
    <div class="cards" style="top:462px">{''.join(items)}</div>
    <div class="gtk abs" style="left:56px;right:56px;top:1134px;background:#f5c451;border-radius:20px;padding:15px 26px;color:#141b44">
      <p style="font-weight:800;letter-spacing:.16em;font-size:16px;opacity:.8">GOOD TO KNOW</p>
      <ul style="margin-top:4px;padding-left:22px;font-size:17px;line-height:1.38">
        <li>Last year the MRT ran until 2am. Walk a stop or two before boarding.</li>
        <li>Agree a meeting point, write your number on the kids, bring ear defenders.</li>
        <li>Listings are New Year&rsquo;s Eve 2025. We update them as 2026 is announced.</li>
      </ul>
    </div>
    <div class="abs" style="left:56px;bottom:30px;color:#fff">
      <p style="font-weight:800;letter-spacing:.2em;font-size:17px">YOUR BANGKOK ROADMAP</p>
      <p style="font-size:17px;opacity:.8;margin-top:4px">Join 40,000 parents in the Bangkok Expat Families group</p>
    </div>
    <div class="abs" style="right:56px;bottom:26px;text-align:right">
      <p style="font-size:16px;font-weight:600;color:#fff;opacity:.85">Full guide: 10 countdowns, dinners and cruises</p>
      <p class="serif" style="font-weight:900;font-size:40px;color:#f5c451;line-height:1.05">bkkfamilies.com</p>
    </div>
    """
    return page(W, H, "radial-gradient(ellipse at 85% 5%,#2a3478 0%,#141b44 45%,#0b0f2b 100%)", body, CARD_CSS)


def nye_trick():
    W, H = 1080, 1080
    zones = [("6pm", "Auckland", "#3EC1D3", False), ("8pm", "Sydney", "#f5c451", True), ("10pm", "Tokyo", "#8DC63F", False), ("Midnight", "Bangkok", "#d6336c", False)]
    tl = []
    x0, x1, y = 120, 960, 700
    tl.append(f'<line x1="{x0}" y1="{y}" x2="{x1}" y2="{y}" stroke="rgba(255,255,255,.35)" stroke-width="6" stroke-linecap="round"/>')
    labels = []
    for i, (t, city, c, hot) in enumerate(zones):
        x = x0 + (x1 - x0) * i / (len(zones) - 1)
        r = 34 if hot else 20
        tl.append(f'<circle cx="{x}" cy="{y}" r="{r + 12}" fill="{c}" opacity=".25"/><circle cx="{x}" cy="{y}" r="{r}" fill="{c}"/>')
        size = 54 if hot else 36
        labels.append(
            f'<div class="abs" style="left:{x - 110}px;width:220px;top:{y + (60 if hot else 44)}px;text-align:center">'
            f'<p class="serif" style="font-weight:900;font-size:{size}px;color:{c if hot else "#fff"};line-height:1">{t}</p>'
            f'<p style="font-size:{26 if hot else 22}px;color:#fff;opacity:.85;margin-top:6px;font-weight:{800 if hot else 600}">{city}</p></div>'
        )
    body = f"""
    {nye_sky(W, H, seed=8, big=False)}
    <p class="abs mono" style="left:64px;top:64px;font-size:24px;letter-spacing:.18em;color:#f5c451">BKK FAMILIES · NEW YEAR&rsquo;S EVE</p>
    <h1 class="abs serif" style="left:64px;top:118px;font-weight:900;font-size:108px;line-height:.95;color:#fff">The 8pm<br><span style="color:#f5c451;font-style:italic">midnight</span><br>trick</h1>
    <p class="abs" style="left:64px;top:470px;width:880px;font-size:31px;line-height:1.32;color:#fff;font-weight:600">Little ones can&rsquo;t make it to midnight? Count down with Sydney. Its fireworks go off at 8pm Bangkok time, and everyone&rsquo;s in bed by half past eight.</p>
    <svg class="abs" style="left:0;top:0" width="{W}" height="{H}">{''.join(tl)}</svg>
    {''.join(labels)}
    <div class="abs" style="left:0;right:0;bottom:0;height:110px;background:#f5c451;display:flex;align-items:center;justify-content:space-between;padding:0 64px">
      <p style="font-size:28px;font-weight:800;color:#141b44">Bang the pots and pans. Bed by 8:30.</p>
      <p class="mono" style="font-size:26px;color:#141b44">bkkfamilies.com</p>
    </div>
    """
    return page(W, H, "radial-gradient(ellipse at 80% 10%,#2a3478 0%,#141b44 50%,#0b0f2b 100%)", body)


def nye_ages():
    W, H = 1080, 1920
    ages = [
        ("Toddlers", "Lights out by nine", "#3EC1D3", ["The 8pm Sydney midnight trick", "An early buffet, 6pm to 9pm", "Balcony fireworks, if anyone's awake"]),
        ("Ages 4 to 9", "Early fireworks fans", "#8DC63F", ["Crowne Plaza's Carnival of Joy buffet", "Asiatique and the Ferris wheel", "Benchasiri Park's drone show"]),
        ("Ages 10 to 12", "Midnight or bust", "#f5a524", ["One Bangkok (register first)", "Seacon Square's free concert", "Topgolf Megacity's countdown"]),
        ("Teens", "The full countdown", "#d6336c", ["ICONSIAM by the river", "CentralWorld's street party", "A fireworks cruise on the river"]),
    ]
    blocks = "".join(
        f'<div style="background:#fff;border-radius:26px;padding:20px 32px 18px;margin-top:20px;border-left:16px solid {c}">'
        f'<p style="font-weight:800;letter-spacing:.14em;font-size:20px;color:{c if c != "#8DC63F" else "#5a8a1f"}">{who.upper()}</p>'
        f'<p class="serif" style="font-weight:900;font-size:42px;color:#141b44;margin-top:2px">{title}</p>'
        f'<ul style="margin-top:6px;padding-left:28px;font-size:25px;line-height:1.4;color:#333">{"".join(f"<li>{p}</li>" for p in picks)}</ul></div>'
        for who, title, c, picks in ages
    )
    body = f"""
    {nye_sky(W, H, seed=12)}
    <div class="abs" style="left:64px;top:70px">{logo('#f5c451')}</div>
    <div class="abs" style="left:64px;right:64px;top:210px">
      <span class="pill" style="background:#f5c451;color:#141b44;font-size:22px;padding:10px 22px">31 December 2026</span>
      <h1 class="serif" style="margin-top:18px;font-weight:900;font-size:88px;line-height:.96;color:#fff">New Year&rsquo;s Eve<br>in Bangkok<br><span style="color:#f5c451;font-style:italic">by age</span></h1>
      <p style="margin-top:14px;font-size:27px;line-height:1.35;color:#fff;opacity:.9">Choose your New Year&rsquo;s Eve on purpose.</p>
      <div class="chk-a">{blocks}</div>
    </div>
    {skyline(W, H, H - 290)}
    <div class="chk-b abs" style="left:0;right:0;top:{H - 220}px;height:1px"></div>
    <div class="abs" style="left:0;right:0;bottom:0;height:140px;display:flex;align-items:center;justify-content:space-between;padding:0 64px">
      <p style="font-size:26px;font-weight:600;color:#fff;opacity:.9">Full guide and 2026 updates</p>
      <p class="serif" style="font-weight:900;font-size:46px;color:#f5c451">bkkfamilies.com</p>
    </div>
    """
    return page(W, H, "linear-gradient(180deg,#0b0f2b 0%,#141b44 40%,#2a1f5c 100%)", body)


def nye_share():
    W, H = 1200, 630
    body = f"""
    {nye_sky(W, H, seed=4)}
    {skyline(W, H, H - 200)}
    <div class="abs" style="left:72px;top:72px">{logo('#f5c451')}</div>
    <div class="abs" style="left:72px;top:190px">
      <h1 class="serif" style="font-weight:900;font-size:68px;line-height:1;color:#fff">New Year&rsquo;s Eve in Bangkok</h1>
      <p class="serif" style="margin-top:8px;font-style:italic;font-weight:900;font-size:52px;color:#f5c451">2026, with kids</p>
      <p style="margin-top:20px;font-size:27px;color:#fff;opacity:.9;font-weight:600">Fireworks by crowd level · dinners and cruises · the 8pm trick</p>
    </div>
    <p class="abs mono" style="right:72px;bottom:40px;font-size:24px;color:#f5c451">bkkfamilies.com</p>
    """
    return page(W, H, "radial-gradient(ellipse at 80% 10%,#2a3478 0%,#141b44 50%,#0b0f2b 100%)", body)


# ---------------------------------------------------------------- output

def xmp(title, desc, url, subjects, year=2026):
    subj = "".join(f"<rdf:li>{s}</rdf:li>" for s in subjects)
    return (
        '<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>\n'
        '<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n'
        '<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/" '
        'xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/" xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/" '
        'xmlns:plus="http://ns.useplus.org/ldf/xmp/1.0/">\n'
        f'<dc:title><rdf:Alt><rdf:li xml:lang="x-default">{title}</rdf:li></rdf:Alt></dc:title>\n'
        f'<dc:description><rdf:Alt><rdf:li xml:lang="x-default">{desc}</rdf:li></rdf:Alt></dc:description>\n'
        "<dc:creator><rdf:Seq><rdf:li>BKK Families</rdf:li></rdf:Seq></dc:creator>\n"
        f'<dc:rights><rdf:Alt><rdf:li xml:lang="x-default">© {year} BKK Families (bkkfamilies.com). Free to share with credit.</rdf:li></rdf:Alt></dc:rights>\n'
        f"<dc:subject><rdf:Bag>{subj}</rdf:Bag></dc:subject>\n"
        "<photoshop:Credit>BKK Families</photoshop:Credit>\n"
        f"<xmpRights:WebStatement>{url}#posters</xmpRights:WebStatement>\n"
        f'<plus:Licensor><rdf:Seq><rdf:li rdf:parseType="Resource"><plus:LicensorURL>{url}#posters</plus:LicensorURL></rdf:li></rdf:Seq></plus:Licensor>\n'
        "</rdf:Description></rdf:RDF></x:xmpmeta>\n"
        '<?xpacket end="w"?>'
    ).encode("utf-8")


def save(png_bytes, out_base, title, desc, url, subjects, webp=True):
    im = Image.open(io.BytesIO(png_bytes)).convert("RGB")
    exif = Image.Exif()
    exif[270] = desc  # ImageDescription
    exif[315] = "BKK Families"  # Artist
    exif[33432] = "© 2026 BKK Families (bkkfamilies.com)"  # Copyright
    meta = xmp(title, desc, url, subjects)
    im.save(f"{out_base}.jpg", "JPEG", quality=86, optimize=True, progressive=True, exif=exif, xmp=meta)
    if webp:
        im.save(f"{out_base}.webp", "WEBP", quality=82, method=6, exif=exif, xmp=meta)


SITE = "https://www.bkkfamilies.com"
JOBS = [
    # (dir slug, file, html fn, w, h, title, desc, subjects, webp)
    ("christmas-in-bangkok-with-kids", "christmas-in-bangkok-2026-kids-cheat-sheet", xmas_cheat, 1080, 1350,
     "Christmas in Bangkok 2026 cheat sheet",
     "Christmas in Bangkok 2026 with kids cheat sheet: Christmas dinner, meeting Santa, the tree trail, markets, Christmas Day and church",
     ["Christmas in Bangkok", "Christmas 2026", "Bangkok kids", "Bangkok families"], True),
    ("christmas-in-bangkok-with-kids", "christmas-in-bangkok-2026-family-christmas-dinners", xmas_dinners, 1080, 1080,
     "28 family Christmas dinners in Bangkok",
     "Christmas dinner in Bangkok 2026: 28 family Christmas dinners and brunches, from ฿995 pub roasts to riverside galas",
     ["Christmas dinner Bangkok", "Christmas 2026", "Bangkok families"], True),
    ("christmas-in-bangkok-with-kids", "christmas-in-bangkok-2026-where-to-meet-santa", xmas_santa, 1080, 1920,
     "Where to meet Santa in Bangkok",
     "Where to meet Santa in Bangkok at Christmas 2026: malls, Christmas markets and Christmas Eve dinners with Santa",
     ["Santa Bangkok", "Christmas in Bangkok", "Bangkok kids"], True),
    ("christmas-in-bangkok-with-kids", "christmas-in-bangkok-2026-family-guide", xmas_share, 1200, 630,
     "Christmas in Bangkok 2026 family guide",
     "Christmas in Bangkok 2026 with kids: 28 family Christmas dinners, Santa, lights and markets",
     ["Christmas in Bangkok", "Bangkok families"], False),
    ("new-years-eve-in-bangkok-with-kids", "new-years-eve-bangkok-2026-family-countdown-cheat-sheet", nye_cheat, 1080, 1350,
     "New Year's Eve in Bangkok cheat sheet",
     "New Year's Eve in Bangkok 2026 with kids cheat sheet: six countdown spots rated by crowd level, plus getting home after midnight",
     ["New Year's Eve Bangkok", "Bangkok countdown", "Bangkok families"], True),
    ("new-years-eve-in-bangkok-with-kids", "new-years-eve-bangkok-2026-8pm-midnight-trick", nye_trick, 1080, 1080,
     "The 8pm midnight trick",
     "The 8pm midnight trick for New Year's Eve in Bangkok: Sydney's midnight fireworks happen at 8pm Bangkok time",
     ["New Year's Eve Bangkok", "New Year with kids", "Bangkok families"], True),
    ("new-years-eve-in-bangkok-with-kids", "new-years-eve-bangkok-2026-best-countdowns-by-age", nye_ages, 1080, 1920,
     "Best New Year's Eve plans by age",
     "Best New Year's Eve plans in Bangkok 2026 by age, from toddlers to teens",
     ["New Year's Eve Bangkok", "Bangkok kids", "Bangkok families"], True),
    ("new-years-eve-in-bangkok-with-kids", "new-years-eve-bangkok-2026-family-guide", nye_share, 1200, 630,
     "New Year's Eve in Bangkok 2026 family guide",
     "New Year's Eve in Bangkok 2026 with kids: fireworks by crowd level, dinners and cruises, and the 8pm midnight trick",
     ["New Year's Eve Bangkok", "Bangkok families"], False),
]


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for slug, file, fn, w, h, title, desc, subjects, webp in JOBS:
            if ONLY and not file.startswith(ONLY):
                continue
            out_dir = REPO / "public" / "images" / "articles" / slug
            out_dir.mkdir(parents=True, exist_ok=True)
            pg = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
            pg.set_content(fn(), wait_until="load")
            pg.evaluate("document.fonts.ready")
            pg.wait_for_timeout(150)
            clash = pg.evaluate("""() => {
                const c = document.querySelector('.cards, .chk-a'), g = document.querySelector('.gtk, .chk-b');
                if (!c || !g) return null;
                return [Math.round(c.getBoundingClientRect().bottom), Math.round(g.getBoundingClientRect().top)];
            }""")
            if clash and clash[0] > clash[1] - 12:
                print(f"  OVERLAP in {file}: cards end at {clash[0]}, box starts at {clash[1]}")
            elif clash:
                print(f"  ok {file}: {clash[1] - clash[0]}px clear")
            png = pg.screenshot(full_page=False)
            pg.close()
            save(png, str(out_dir / file), title, desc, f"{SITE}/blog/{slug}", subjects, webp)
            print("rendered", file)
        browser.close()


if __name__ == "__main__":
    main()
