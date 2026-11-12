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

## Share images (Facebook previews), required on every page
- Every page must emit an og:image. Rob wants a photo preview whenever any page is shared on Facebook.
- `og()` in `src/lib/seo.ts` attaches the nearest section card automatically (`SECTION_CARDS` list), falling back to the homepage card. A page-specific image can be passed as `og({ ..., image })`.
- A page that sets openGraph does NOT inherit a parent folder's `opengraph-image.png`, which is why detail pages used to share with no picture.
- New section: add a 1200x630 `opengraph-image.png` plus `opengraph-image.alt.txt` to `src/app/<section>/`, NOT inside `(en)` (see Chinese version below; same purple card style as /camps and /playgroups) and add the path to `SECTION_CARDS`.
- After deploying, re-scrape the URL in Facebook's Sharing Debugger (developers.facebook.com/tools/debug) because Facebook caches previews.

## Schools directory
- 119 schools (started at 58, expanded to 121 via international-schools-database.com, then trimmed: IPC International Kindergarten and VERSO deleted after closing, UWC Thailand removed because it is in Phuket, Brighton College Vibhavadi added).
- 120 of 121 schools have full write-ups (description, curriculum, age range, language of instruction, website link where available).
- Individual detail pages at `/schools/[slug]` exist for a first batch of 14 major/premium schools (Bangkok Patana, NIST, ISB, Shrewsbury, Harrow, Bangkok Prep, Brighton College, Wellington, RIS, KIS, Concordian, Bromsgrove, St Andrews, King's College) with full descriptions, age range, language of instruction, and exact fee range (sourced from international-schools-database.com, paraphrased/factual only — did NOT reproduce their proprietary schema like admissions contacts, class sizes, facilities lists).
- Detail pages use a purple header band (school name + curriculum tags) instead of a photo, to avoid copyright issues from rehosting school website images.
- **In progress:** emailing schools' marketing/admissions teams asking for a photo to replace the purple band, with photo guidelines and a credit/backlink offer. First batch of 14 Gmail drafts created 2026-08-28, not yet sent.
- VERSO International School (closed 2026, campus now Wycombe Abbey) was removed on 2026-10-02 and its URL 301s to Wycombe Abbey. UWC Thailand (Phuket) is out of the directory and its URL 301s to /schools. Brighton College Bangkok Vibhavadi (opened Aug 2025) added as its own entry; the original Brighton entry is the Krungthep Kreetha campus. Traill's site is traillschool.com.
- Added 4 Nov 2026 after parents named them in the International Schools in Thailand Chat Facebook group: RIS Ratchapruek Campus (Nonthaburi), Chindamanee School, Bangkok Bilingual School, Interkids Bilingual School, Satit Prasarnmit International Programme (SPIP) and Kids Kingdom International Kindergarten, each with a Chinese entry. Facts from the schools' own sites or listings; no fees shown (Chindamanee's own schedule is 2024/25, Interkids' 2024/25 IBIP per term). Websites risr.ac.th, spip.in.th and kidskingdom.ac.th could not be loaded from the research environment; run the link checker.
- **Listing standard (Nov 2026):** a school is listed only if it is licensed by OPEC as an international school, or accredited by an OPEC-recognised body (CIS, WASC, NEASC, COBIS and the others ISAT lists). Bilingual / English Program schools on the Thai national curriculum are not listed. The standard is stated at the top of /schools and /zh/schools. Rob's exceptions that don't fully meet it (SPIP, WeLearn) carry a closing paragraph on their page saying so; Amnuay Silpa (CIS) and KMIDS (WASC) pass.
- Removed 5 Nov 2026 under that standard, each 301ing to /schools (and /zh/schools): Chindamanee, Bangkok Bilingual School, Interkids, Sarasas Ektra, Lertlah (Thai Basic Education Core Curriculum, not Canadian), Satit Pattana, SBS Rangsit. Global English School removed as a duplicate of ICSN (its former name) and 301s to ICSN. Beaconhouse Yamsaard trimmed to the Pattanakarn international campus (BYIS); Ladprao/Rangsit/Hua Hin are bilingual. Purple Elephant 55 retagged Canadian (ELC is Ontario curriculum, CIS/WASC). Tiny Seeds is independent, not ELC; its licence and website are unconfirmed.
- Minor cleanups already done: removed IPC name-drops from 5 sibling descriptions, dropped KiddyKare's website field (no working site), pointed Bright Skies at its Instagram, fixed Lycée Français URL, upgraded Global Indian International School and Pan-Asia to https. Global English School deliberately keeps its Facebook page as its listed site.

## School fees (single source of truth, added 2026-10-02)
- `src/lib/schoolFees.ts` holds fees read from 30 schools' own 2026/27 schedules on 18 Sept 2026, per year group, with one-time fees, extras, inclusions, source link and verified date. `feesOnEnquiry` lists 6 schools that publish nothing (NIST, Dulwich, Concordian, Anglo Singapore, Sarasas Ektra, Bromsgrove). Raw research notes: `data/school-fees-research-notes.md`.
- School pages build their fee card and full fee table from it (`feeSummary`). Headline is the first primary-stage row (Year 1 / Grade 1), never a min/max comparison.
- Budget tags for those 30 schools are recomputed from the primary-stage fee (`verifiedBudget`), overriding the tag in `schools.ts`.
- `feeRange` in `schools.ts` is now third-party indicative data only (18 schools) and renders with an "unverified" label. Never add `feeRange` to a school that is in `schoolFees.ts` or `feesOnEnquiry`.
- To update a school's fees: edit `schoolFees.ts` only. Articles quoting fees (`what-does-international-school-actually-cost-bangkok-2026`) must be updated by hand and given a new `updated` date.

## Content published so far
- Nanny hiring guide (`how-to-find-a-nanny-in-bangkok`, Local Life) — draws on the family's own 2012-2020 Bangkok experience (Rob lived in Thailand from 2003, spent 2011-2012 in the US, then returned 2012-2020; daughter born at Nonthavej 2010, son born in Cambridge MA 2012), lists nanny agencies neutrally without recommending any (deliberately independent positioning).
- Third culture kids article (`third-culture-kids-bangkok-moving-back`, Local Life, ~2,500 words, 7 FAQ entries, 11 headings, 6 relatedSchools) — positioned as a competitor to bkkkids.com's TCK piece but focused on the "return leg" (moving back), which competitors skip. Draws on the family's 2020 move from Bangkok to Massachusetts. Still has no images.

## Chinese version (/zh), added 2026-11-02
- Simplified Chinese lives under `/zh`: homepage, schools (all 121, with fee tables and term dates), playgroups, camps, activities, learning support (153 listings). Healthcare, blog, school-breaks and contact are English only (zh pages link to those English pages with `hrefLang="en"`).
- **Two root layouts.** The English site is the `src/app/(en)` route group (URLs unchanged); `src/app/zh/layout.tsx` is the second root so the server-rendered HTML says `lang="zh-Hans"`. Because of that, `experimental.globalNotFound` is on in `next.config.mjs` and `src/app/global-not-found.tsx` renders the 404 for unmatched URLs. New English pages go inside `(en)`.
- **OG image files stay OUTSIDE `(en)`.** `src/app/<section>/opengraph-image.png` must not sit in the route group, or Next adds a hash suffix to the URL and `shareImage()` 404s. Pages live in `(en)/<section>/`, the PNG in `<section>/`. A "metadataBase not set" build warning is expected and harmless (no localhost URLs in built HTML).
- **LIVE since 2026-11-02.** `ZH_LAUNCHED` in `src/lib/i18n.ts` is true: /zh pages are indexable, the sitemap pairs every English/Chinese page with hreflang alternates (`x-default` is English), zh heads carry reciprocal alternates, and English pages show a 中文 link in the header when a twin exists (`zhTwinPaths()` in `src/lib/zh/twins.ts` drives both the sitemap and the link, so add new translated sections there). Setting the flag false hides everything again (noindex, no sitemap entries, no links). Native-reader review of `data/zh-review-notes/` is still outstanding; fixes go into the `src/lib/zh/*` files.
- Schools translations: `src/lib/zh/schools/part1..6.ts` merged in `src/lib/zh/schools.ts` (also area, curriculum and budget labels); fee words in `src/lib/zh/schoolFees.ts`; term-date words in `src/lib/zh/schoolBreaks.ts`. A new school needs a Chinese entry or it is absent from /zh. `SchoolAreaMap` takes a `zh` prop; `SchoolDirectoryZh` is a copy of `SchoolDirectory`.
- Translations live in `src/lib/zh/<directory>.ts` (`*_ZH` maps keyed by English slug). Facts (prices, ages, times, dates, phones, URLs) are read from the English data; only free text is translated. A listing with no entry is absent from /zh (no mixed-language pages). Glossary and style rules are at the top of `src/lib/zh/common.ts`. Zh directory components in `src/components/zh/` are copies of the English ones, so a change to English filter logic must be mirrored by hand.
- When English listing text changes, update the Chinese entry too. Reviewer notes (terms to double-check) are in `data/zh-review-notes/`.

## Do not contact (check before ANY outreach email, draft, newsletter or listing check)
These people asked not to be emailed. Never email, draft to, or add them to any list unless they write to us first; replying to a message they send is fine. The full list lives in the project doc `claude/do-not-contact.md`.
- Kids Kingdom International Kindergarten, Sukhumvit 47: Lily Narula (Director), lily@kidskingdom.ac.th and info@kidskingdom.ac.th. Asked 12 Nov 2026. Newsletter contacts sheet row set to Unsubscribed. Her free playgroup and school listings stay up. Other Kids Kingdom branches (Ruamrudee, Sukhumvit 26) have their own contacts and are not covered.

## Tools
- Link-checker script at `scripts/linkcheck.sh` for external school website URLs. Run with `bash ~/Projects/bkkfamilies/scripts/linkcheck.sh`. Default parallelism of 12 causes timeout false positives — use 4 instead.

## Open decisions waiting on Rob
1. Whether/when to send the 14 school photo-request email drafts.
2. Vercel "DNS Change Recommended" warning on the apex domain — unaddressed.
3. Duplicate Vercel project `bkk_families` — never cleaned up.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
