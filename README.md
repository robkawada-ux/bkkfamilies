# BKK Families

Next.js/TypeScript rebuild of bkkfamilies.com — replacing the legacy
WordPress site.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- No database — content lives in `src/lib/schools.ts` and `src/lib/articles.ts`

## Pages
- `/` — Home
- `/schools` — Filterable directory of 50+ international schools
- `/activities` — Family activities
- `/fitness-health` — Health/fitness articles
- `/blog` — Blog index + `/blog/[slug]` article pages
- `/contact` — Contact + advertising rate card

## Local development
```bash
npm install
npm run dev
```

## Content editing
- To add/edit a school: edit `src/lib/schools.ts`
- To add/edit a blog article: edit `src/lib/articles.ts` (add a new object
  to the `ARTICLES` array — the page is generated automatically)

## Deploying
Push to GitHub, then import the repo in Vercel — it auto-detects Next.js
and deploys on every push to `main`. Add `bkkfamilies.com` as a custom
domain in Vercel's project settings once you're ready to cut over DNS.
