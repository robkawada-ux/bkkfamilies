# bkkfamilies.com — Project Context

## Overview
Rebuild of bkkfamilies.com (site for the Bangkok Expat Families community) from WordPress to Next.js/TypeScript. The old WordPress site had a security compromise (injected spam/gambling links, hijacked page title, a backdoor file, and an exposed wp-config.php1) plus stale content, which prompted the rebuild rather than a repair.

## Repo & local setup
- GitHub repo: `robkawada-ux/bkkfamilies`
- Local path: `/Users/robertkawada/Projects/bkkfamilies` (on Roberts-iMac-2). Two stale copies exist in `~/Downloads` — "bkkfamilies 2" and "bkkfamiliespublichtml" — neither is the working repo, ignore them.
- Same GitHub-to-Vercel workflow as the autonomousboston project (repo at `~/Projects/autonomousboston`).
- Build/deploy is run locally via Terminal.

## Deployment
- Two Vercel projects build from this same repo on every push:
  - **bkkfamilies** — the real one, holds `bkkfamilies.com`, `www.bkkfamilies.com`, `bkkfamilies.vercel.app`
  - **bkk_families** — an unintentional duplicate (`bkkfamilies-nu.vercel.app`), never cleaned up, still rebuilds on push
- Canonical host is `www.bkkfamilies.com`. Apex `bkkfamilies.com` 308-redirects to www but still shows a "DNS Change Recommended" warning in Vercel, unaddressed.
- Domain registered at Namecheap (active through Dec 2026), DNS via Namecheap Advanced DNS, switched over from the old GoDaddy WordPress host (IP 208.109.60.161, cPanel, customer #44007323). Old WordPress files were deleted entirely via GoDaddy File Manager after downloading a backup zip.
- Google Search Console is set up as a URL-prefix property for `https://www.bkkfamilies.com`, verified via HTML meta tag in `layout.tsx` (`metadata.verification.google`) since GA verification failed (gtag loads via `next/script` in body, not head). Sitemap submitted and reads Success (134 discovered pages).

## Site architecture
- **Articles are NOT markdown.** They're TypeScript objects in `src/lib/articles.ts`. `Article` interface: `slug, title, category, date, excerpt, body[]` (array of plain paragraph strings — no markdown/bold/tables/inline links render), `heroImage, images[{src,alt,afterParagraph}], headings[{beforeParagraph,text}], faq, relatedSchools, metaDescription, keywords`.
- Rendered at `src/app/blog/[slug]/page.tsx`, each body paragraph as plain text in a `<p>`. Byline always renders as "by BKK Families".
- Article images live in `public/images/articles/<slug>/`.
- Categories in use: Schools, Local Life, Fitness/Health.
- `src/app/sitemap.ts` and `src/app/robots.ts` (added 2026-09-10) generate the sitemap from `SCHOOLS` and `ARTICLES` arrays so it never goes stale — currently 6 static pages, 9 articles, 119 school pages.
- The "Browse all N schools" link reads `SCHOOLS.length` dynamically, not a hardcoded number.

## Schools directory
- 119 schools (started at 58, expanded to 121 via international-schools-database.com, then trimmed: IPC International Kindergarten deleted after confirmed closure, UWC Thailand still under discussion — it's actually in Phuket, not Bangkok, so may not belong in a Bangkok-specific directory).
- 120 of 121 schools have full write-ups (description, curriculum, age range, language of instruction, website link where available).
- Individual detail pages at `/schools/[slug]` exist for a first batch of 14 major/premium schools (Bangkok Patana, NIST, ISB, Shrewsbury, Harrow, Bangkok Prep, Brighton College, Wellington, RIS, KIS, Concordian, Bromsgrove, St Andrews, King's College) with full descriptions, age range, language of instruction, and exact fee range (sourced from international-schools-database.com, paraphrased/factual only — did NOT reproduce their proprietary schema like admissions contacts, class sizes, facilities lists).
- Detail pages use a purple header band (school name + curriculum tags) instead of a photo, to avoid copyright issues from rehosting school website images.
- **In progress:** emailing schools' marketing/admissions teams asking for a photo to replace the purple band, with photo guidelines and a credit/backlink offer. First batch of 14 Gmail drafts created 2026-08-28, not yet sent.
- Known open item: VERSO International School closed in 2026 and its campus reopened as Wycombe Abbey International School Bangkok — already noted in VERSO's listing.
- Minor cleanups already done: removed IPC name-drops from 5 sibling descriptions, dropped KiddyKare's website field (no working site), pointed Bright Skies at its Instagram, fixed Lycée Français URL, upgraded Global Indian International School and Pan-Asia to https. Global English School deliberately keeps its Facebook page as its listed site.

## Content published so far
- Nanny hiring guide (`how-to-find-a-nanny-in-bangkok`, Local Life) — draws on the family's own 2011-2020 Bangkok experience, lists nanny agencies neutrally without recommending any (deliberately independent positioning).
- Third culture kids article (`third-culture-kids-bangkok-moving-back`, Local Life, ~2,500 words, 7 FAQ entries, 11 headings, 6 relatedSchools) — positioned as a competitor to bkkkids.com's TCK piece but focused on the "return leg" (moving back), which competitors skip. Draws on the family's 2020 move from Bangkok to Massachusetts. Still has no images.

## Tools
- Link-checker script at `scripts/linkcheck.sh` for external school website URLs. Run with `bash ~/Projects/bkkfamilies/scripts/linkcheck.sh`. Default parallelism of 12 causes timeout false positives — use 4 instead.

## Open decisions waiting on Rob
1. UWC Thailand — remove from directory (it's in Phuket) or keep?
2. Whether/when to send the 14 school photo-request email drafts.
3. Vercel "DNS Change Recommended" warning on the apex domain — unaddressed.
4. Duplicate Vercel project `bkk_families` — never cleaned up.
