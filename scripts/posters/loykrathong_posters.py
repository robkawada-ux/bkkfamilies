"""Render the Loy Krathong posters and share image for bkkfamilies.com.

Same toolchain as festive_posters.py (fonts from node_modules, headless
Chromium, JPG + WebP with EXIF/XMP credit). Run from anywhere:

    python3 loykrathong_posters.py ~/Projects/bkkfamilies [only-prefix]

Poster text lives in the functions below. Every fact on a poster also
appears as text on the page, because text inside images is not indexed.
"""
import sys

from playwright.sync_api import sync_playwright

# festive_posters reads the repo root and prefix from sys.argv at import.
from festive_posters import CARD_CSS, REPO, ONLY, SITE, logo, page, people, save, stars

SLUG = "loy-krathong-in-bangkok-with-kids"
NIGHT = "#0d2a3f"
GOLD = "#f2b632"
PINK = "#e86a92"
LEAF = "#3f8f4e"


def moon(x, y, r=90):
    return (
        f'<svg class="abs" style="left:{x - r * 2}px;top:{y - r * 2}px" width="{r * 4}" height="{r * 4}">'
        f'<circle cx="{r * 2}" cy="{r * 2}" r="{r * 1.6}" fill="#fdf1c7" opacity=".08"/>'
        f'<circle cx="{r * 2}" cy="{r * 2}" r="{r}" fill="#fdf1c7" opacity=".92"/></svg>'
    )


def krathong(x, y, s=1.0, opacity=1.0):
    """A krathong in a 120 x 90 box, drawn at (x, y) scaled by s."""
    petals = "".join(
        f'<path d="M{dx - 10} 58 L{dx} 24 L{dx + 10} 58 Z" fill="{c}"/>'
        for dx, c in [(20, "#5aa863"), (40, "#4c9a57"), (60, "#5aa863"), (80, "#4c9a57"), (100, "#5aa863")]
    )
    return (
        f'<svg class="abs" style="left:{x}px;top:{y}px;opacity:{opacity}" width="{120 * s}" height="{90 * s}" viewBox="0 0 120 90">'
        f'<ellipse cx="60" cy="66" rx="56" ry="13" fill="{LEAF}"/>{petals}'
        f'<circle cx="46" cy="44" r="10" fill="{GOLD}"/><circle cx="74" cy="44" r="10" fill="{PINK}"/>'
        '<rect x="57" y="12" width="6" height="26" rx="2" fill="#fff6d8"/><ellipse cx="60" cy="7" rx="5" ry="8" fill="#f2b632"/>'
        '<line x1="30" y1="40" x2="26" y2="14" stroke="#c9a27a" stroke-width="2.5"/><line x1="34" y1="40" x2="34" y2="12" stroke="#c9a27a" stroke-width="2.5"/>'
        '<line x1="38" y1="40" x2="42" y2="14" stroke="#c9a27a" stroke-width="2.5"/></svg>'
    )


def ripples(w, top, n=5, color="#7fb7c9"):
    lines = []
    for i in range(n):
        y = top + i * 34
        lines.append(
            f'<path d="M0 {y} Q {w / 8} {y - 12} {w / 4} {y} T {w / 2} {y} T {w * 3 / 4} {y} T {w} {y}" '
            f'fill="none" stroke="{color}" stroke-width="3" opacity="{0.3 - i * 0.05:.2f}"/>'
        )
    return f'<svg class="abs" style="left:0;top:0" width="{w}" height="{top + n * 40}">{"".join(lines)}</svg>'


def footer(dark=True, right="Full guide: 17 places rated by crowd"):
    c = "#fff" if dark else NIGHT
    return f"""
    <div class="abs" style="left:56px;bottom:30px;color:{c}">
      <p style="font-weight:800;letter-spacing:.2em;font-size:17px">YOUR BANGKOK ROADMAP</p>
      <p style="font-size:17px;opacity:.8;margin-top:4px">Join 40,000 parents in the Bangkok Expat Families group</p>
    </div>
    <div class="abs" style="right:56px;bottom:26px;text-align:right">
      <p style="font-size:16px;font-weight:600;color:{c};opacity:.85">{right}</p>
      <p class="serif" style="font-weight:900;font-size:40px;color:{GOLD if dark else '#b5487a'};line-height:1.05">bkkfamilies.com</p>
    </div>"""


def loy_cheat():
    W, H = 1080, 1350
    cards = [
        ("Mahakan Fort", 2, [("When", "23 to 25 Nov, 5 to 10pm"), ("Cost", "Free")],
         "Krathong workshops, puppet shows, free Thai costume and a kids' Noppamas pageant."),
        ("Lumpini Park", 2, [("When", "Full moon night"), ("Cost", "Free")],
         "The family default: float on the lake. Go at 6pm, before the crowds."),
        ("Benjasiri Park", 1, [("When", "Full moon night"), ("Cost", "Free")],
         "Small pond, playground next door, BTS Phrom Phong. Easiest with toddlers."),
        ("Bambini Villa", 1, [("When", "Tue 24 Nov, 10am to 6pm"), ("Cost", "Walk in")],
         "A daytime kids' festival with crafts, games and a krathong pond."),
        ("Wat Saket", 2, [("When", "17 to 29 Nov"), ("Cost", "Free")],
         "Temple fair under the Golden Mount. Pair it with Mahakan Fort."),
        ("Wat Arun", 3, [("When", "23 to 24 Nov"), ("Cost", "Ferry from Tha Tien")],
         "The most beautiful and the busiest. Best with teens."),
    ]
    items = []
    for title, lvl, rows, text in cards:
        dl = "".join(f'<div><dt style="color:#b5487a">{k}</dt><dd>{v}</dd></div>' for k, v in rows)
        meter = people(lvl, on=GOLD, hi=PINK, off="#dfe8e7", size=24)
        items.append(
            f'<div class="card"><h3 style="color:{NIGHT};justify-content:space-between"><span>{title}</span>{meter}</h3>'
            f"<dl>{dl}</dl><p>{text}</p></div>"
        )
    legend = (
        f'<p class="abs" style="right:56px;top:388px;font-size:18px;color:#fff;background:rgba(7,24,36,.85);padding:8px 16px;border-radius:999px">'
        f'{people(1, on=GOLD, hi=PINK, size=20)} Calm &nbsp;&nbsp; {people(2, on=GOLD, hi=PINK, size=20)} Busy &nbsp;&nbsp; '
        f'{people(3, on=GOLD, hi=PINK, size=20)} Packed</p>'
    )
    body = f"""
    {stars(50, W, 460, seed=5)}
    {moon(930, 130, 80)}
    {krathong(820, 300, 1.1, .9)}
    <div class="abs" style="left:56px;top:48px">{logo(GOLD)}</div>
    <div class="abs" style="left:56px;top:156px">
      <span class="pill" style="background:{GOLD};color:{NIGHT};font-size:19px;padding:9px 20px">Tuesday 24 November 2026</span>
      <h1 class="serif" style="margin-top:16px;font-weight:900;font-size:78px;line-height:.98;color:#fff">Loy Krathong<br>in Bangkok</h1>
      <p class="serif" style="margin-top:6px;font-style:italic;font-weight:900;font-size:44px;color:{GOLD}">with kids</p>
    </div>
    {legend}
    <div class="cards" style="top:462px">{''.join(items)}</div>
    <div class="gtk abs" style="left:56px;right:56px;top:1134px;background:{GOLD};border-radius:20px;padding:15px 26px;color:{NIGHT}">
      <p style="font-weight:800;letter-spacing:.16em;font-size:16px;opacity:.8">GOOD TO KNOW</p>
      <ul style="margin-top:4px;padding-left:22px;font-size:17px;line-height:1.38">
        <li>Not a public holiday: it is a school night. Busiest 7pm to 10pm.</li>
        <li>No lanterns, fireworks or foam krathongs in Bangkok. Natural materials only.</li>
        <li>Hold hands at the water, mind the candles, agree a meeting point.</li>
      </ul>
    </div>
    {footer()}
    """
    return page(W, H, f"linear-gradient(180deg,#1d4a63 0%,{NIGHT} 40%,#071824 100%)", body, CARD_CSS)


def loy_make():
    W, H = 1080, 1350
    steps = [
        ("Cut a base", "A slice of banana trunk, about two fingers thick. Skip bread and foam."),
        ("Fold the leaves", "Fold strips of banana leaf into points and pin them round the edge."),
        ("Decorate", "Marigolds, orchids, jasmine, leaves from the garden. Nothing plastic."),
        ("Candle and incense", "A short candle in the middle and three incense sticks. A grown-up lights them."),
        ("Add your wish", "A strand of hair, a nail clipping or a coin, then make a wish as it floats away."),
    ]
    rows = "".join(
        f'<div style="display:flex;gap:22px;align-items:flex-start;background:#fff;border-radius:20px;padding:15px 26px;box-shadow:0 5px 0 rgba(13,42,63,.12)">'
        f'<span style="flex:none;width:56px;height:56px;border-radius:50%;background:{LEAF};color:#fff;font-weight:800;font-size:28px;'
        f'display:flex;align-items:center;justify-content:center">{i + 1}</span>'
        f'<span><b class="serif" style="display:block;font-size:30px;color:{NIGHT}">{t}</b>'
        f'<span style="display:block;margin-top:2px;font-size:20px;line-height:1.35;color:#333">{d}</span></span></div>'
        for i, (t, d) in enumerate(steps)
    )
    need = ["Banana trunk", "Banana leaves", "Flowers", "Toothpicks or pins", "A short candle", "3 incense sticks"]
    chips = "".join(
        f'<span style="display:inline-block;margin:0 8px 8px 0;padding:6px 14px;border-radius:999px;background:#edf5f4;color:{NIGHT};font-weight:700;font-size:18px">{n}</span>'
        for n in need
    )
    body = f"""
    <div class="abs" style="left:56px;top:48px">{logo('#b5487a')}</div>
    <style>.logo b{{color:{NIGHT}}}</style>
    {krathong(800, 70, 1.8)}
    <div class="abs" style="left:56px;top:170px;right:56px">
      <span class="pill" style="background:{LEAF};color:#fff;font-size:18px;padding:8px 18px">Loy Krathong 2026 printable</span>
      <h1 class="serif" style="margin-top:14px;font-weight:900;font-size:74px;line-height:1;color:{NIGHT}">How to make<br>a krathong</h1>
      <p class="serif" style="margin-top:4px;font-style:italic;font-weight:900;font-size:42px;color:#b5487a">with kids</p>
      <div style="margin-top:18px">{chips}</div>
    </div>
    <div class="chk-a abs" style="left:56px;right:56px;top:540px;display:grid;row-gap:14px">{rows}</div>
    <div class="chk-b abs" style="left:56px;right:56px;top:1168px;background:{NIGHT};border-radius:20px;padding:13px 26px;color:#fff">
      <p style="font-size:19px;line-height:1.4"><b style="color:{GOLD}">Float it safely:</b> a grown-up at the water&rsquo;s edge,
      long hair tied back, and a park lake rather than the river with little ones.</p>
    </div>
    {footer(dark=False, right="Where to float it: 17 places rated by crowd")}
    """
    return page(W, H, "#fbf6ea", body)


def loy_traditions():
    W, H = 1080, 1920
    items = [
        ("ลอยกระทง", "Loy means float", "A krathong is a little raft of banana trunk, leaves and flowers, floated on the full moon of the twelfth Thai month."),
        ("พระแม่คงคา", "Thank you, water", "It is an offering to Phra Mae Khongkha, goddess of water: thanks for the water, and sorry for polluting it."),
        ("ปล่อยทุกข์", "Let it go", "A strand of hair or a nail clipping floats away the bad luck of the past year. Then you make a wish."),
        ("นางนพมาศ", "Nang Noppamas", "Legend says she made the first lotus krathong at the court of Sukhothai. That is why there is a Noppamas queen."),
        ("ยี่เป็ง", "Lanterns? Up north", "Sky lanterns are Yi Peng in Chiang Mai. Bangkok bans lanterns and fireworks: here we float on water."),
    ]
    blocks = "".join(
        f'<div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:22px;padding:24px 30px">'
        f'<p style="font-size:24px;color:{GOLD};font-weight:600">{th}</p>'
        f'<p class="serif" style="margin-top:4px;font-size:44px;font-weight:900;color:#fff;line-height:1.05">{t}</p>'
        f'<p style="margin-top:8px;font-size:25px;line-height:1.4;color:rgba(255,255,255,.85)">{d}</p></div>'
        for th, t, d in items
    )
    body = f"""
    {stars(45, W, 480, seed=8)}
    {moon(900, 220, 100)}
    {ripples(W, 1700)}
    {krathong(140, 1690, 1.3, .9)}
    {krathong(520, 1740, 1.0, .8)}
    {krathong(820, 1700, 1.15, .85)}
    <div class="abs" style="left:64px;top:64px">{logo(GOLD)}</div>
    <div class="abs" style="left:64px;top:200px;right:64px">
      <span class="pill" style="background:{PINK};color:#fff;font-size:22px;padding:10px 22px">Tuesday 24 November 2026</span>
      <h1 class="serif" style="margin-top:18px;font-weight:900;font-size:96px;line-height:.98;color:#fff">Loy Krathong</h1>
      <p class="serif" style="margin-top:6px;font-style:italic;font-weight:900;font-size:56px;color:{GOLD}">explained for kids</p>
    </div>
    <div class="abs" style="left:64px;right:64px;top:520px;display:grid;row-gap:20px">{blocks}</div>
    <p class="abs serif" style="left:64px;right:64px;bottom:60px;text-align:center;font-weight:900;font-size:40px;color:{GOLD}">bkkfamilies.com</p>
    """
    return page(W, H, f"linear-gradient(180deg,#1d4a63 0%,{NIGHT} 35%,#071824 100%)", body)


def loy_share():
    W, H = 1200, 630
    body = f"""
    {stars(60, W, 380, seed=6)}
    {moon(1040, 140, 80)}
    {ripples(W, 470, 4)}
    {krathong(780, 430, 1.2, .95)}
    {krathong(980, 470, .9, .85)}
    <div class="abs" style="left:72px;top:72px">{logo(GOLD)}</div>
    <div class="abs" style="left:72px;top:190px">
      <h1 class="serif" style="font-weight:900;font-size:72px;line-height:1;color:#fff">Loy Krathong in Bangkok</h1>
      <p class="serif" style="margin-top:8px;font-style:italic;font-weight:900;font-size:52px;color:{GOLD}">2026, with kids</p>
      <p style="margin-top:20px;font-size:27px;color:#fff;opacity:.9;font-weight:600">Where to float, rated by crowd · traditions · make your own</p>
    </div>
    <p class="abs mono" style="left:72px;bottom:40px;font-size:24px;color:{GOLD}">bkkfamilies.com</p>
    """
    return page(W, H, f"radial-gradient(ellipse at 85% 10%,#1d4a63 0%,{NIGHT} 50%,#071824 100%)", body)


JOBS = [
    ("loy-krathong-in-bangkok-2026-where-to-float-with-kids", loy_cheat, 1080, 1350,
     "Where to float a krathong with kids",
     "Loy Krathong in Bangkok 2026 cheat sheet: six family places to float a krathong rated by crowd level, Tuesday 24 November",
     ["Loy Krathong Bangkok", "Loy Krathong 2026", "Bangkok kids", "Bangkok families"], True),
    ("loy-krathong-2026-how-to-make-a-krathong-with-kids", loy_make, 1080, 1350,
     "How to make a krathong with kids",
     "How to make a krathong with kids for Loy Krathong 2026: five steps from banana trunk base to candle, incense and a wish",
     ["How to make a krathong", "Loy Krathong", "Loy Krathong worksheet", "Bangkok kids"], True),
    ("loy-krathong-2026-traditions-explained-for-kids", loy_traditions, 1080, 1920,
     "Loy Krathong explained for kids",
     "Loy Krathong traditions explained for kids: thanking the water goddess, letting go of bad luck, Nang Noppamas and why Bangkok has no lanterns",
     ["Loy Krathong meaning", "Loy Krathong traditions", "Thai festivals for kids"], True),
    ("loy-krathong-in-bangkok-2026-family-guide", loy_share, 1200, 630,
     "Loy Krathong in Bangkok 2026 family guide",
     "Loy Krathong in Bangkok 2026 family guide: where to float a krathong with kids, rated by crowd",
     ["Loy Krathong Bangkok", "Bangkok families"], False),
]


def main():
    out_dir = REPO / "public" / "images" / "articles" / SLUG
    out_dir.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for file, fn, w, h, title, desc, subjects, webp in JOBS:
            if ONLY and not file.startswith(ONLY):
                continue
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
                print(f"  OVERLAP in {file}: content ends at {clash[0]}, box starts at {clash[1]}")
            elif clash:
                print(f"  ok {file}: {clash[1] - clash[0]}px clear")
            png = pg.screenshot(full_page=False)
            pg.close()
            save(png, str(out_dir / file), title, desc, f"{SITE}/blog/{SLUG}", subjects, webp)
            print("rendered", file)
        browser.close()


if __name__ == "__main__":
    main()
