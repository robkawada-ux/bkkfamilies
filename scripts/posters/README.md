# Festive posters

Renders the Christmas and New Year's Eve posters and share images into
`public/images/articles/<slug>/` as JPG and WebP with EXIF/XMP credit.

One-time setup (fonts and a headless browser):

    cd ~/Projects/bkkfamilies/scripts/posters
    npm install
    pip3 install playwright pillow
    python3 -m playwright install chromium

Render everything, or only files starting with a prefix:

    python3 festive_posters.py ~/Projects/bkkfamilies
    python3 festive_posters.py ~/Projects/bkkfamilies christmas-in-bangkok-2026-kids

Poster text lives in the functions in festive_posters.py (xmas_cheat,
xmas_dinners, xmas_santa, nye_cheat, nye_trick, nye_ages and the two share
cards). The script prints an OVERLAP warning if a card grid runs into the box
below it.
