import type { Metadata } from "next";
import Link from "next/link";
import { og, SITE } from "@/lib/seo";
import FestiveFinder, { Meter } from "@/components/ui/FestiveFinder";
import { daysUntil, itemListJsonLd } from "@/lib/festive";
import {
  BEYOND,
  BY_AGE,
  CHECKED,
  CROWD_METER,
  FAQ,
  KRATHONG_COUNTS,
  LAST_YEAR,
  LOY_DAY,
  LOY_IMG_DIR as IMG_DIR,
  LOY_PATH,
  LOY_POSTERS as POSTERS,
  LOY_SHARE_IMAGE,
  LOY_YEAR,
  MAKE_STEPS,
  PLACES,
  PLACE_GROUPS,
  PLACE_TOGGLES,
  SAFETY_TIPS,
  TRADITIONS,
} from "@/lib/loykrathong";

// Re-render hourly so the countdown stays right.
export const revalidate = 3600;

const TITLE = "Loy Krathong 2026 in Bangkok with Kids: Where to Float";
const DESCRIPTION = `Loy Krathong ${LOY_YEAR} in Bangkok with kids: ${PLACES.length} places to float a krathong rated by crowd, city venues and dates, the traditions explained and how to make one.`;
const OG_IMAGE = `${SITE}${LOY_SHARE_IMAGE}`;
const URL = `${SITE}${LOY_PATH}`;
const PUBLISHED = "2026-11-03T09:00:00+07:00";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "loy krathong bangkok",
    "loy krathong 2026",
    "loy krathong 2026 bangkok",
    "loy krathong in bangkok",
    "loy krathong festival",
    "where to float krathong bangkok",
    "loy krathong with kids",
    "loy krathong meaning",
    "how to make a krathong",
    "loy krathong worksheet",
  ],
  alternates: { canonical: LOY_PATH },
  openGraph: {
    ...og({ title: TITLE, description: DESCRIPTION, path: LOY_PATH, type: "article", image: OG_IMAGE }),
    publishedTime: PUBLISHED,
  } as Metadata["openGraph"],
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: "Loy Krathong in Bangkok 2026 family guide: where to float a krathong with kids, rated by crowd" }],
  },
};

const RIVER = "#0d2a3f";

const JUMP = [
  { href: "#where", label: "Where to float", icon: "🪷" },
  { href: "#crowds", label: "Crowds", icon: "👥" },
  { href: "#traditions", label: "Traditions", icon: "🕯️" },
  { href: "#make", label: "Make one", icon: "🍃" },
  { href: "#by-age", label: "By age", icon: "👨‍👩‍👧" },
  { href: "#safety", label: "Safety", icon: "🧭" },
  { href: "#posters", label: "Posters", icon: "🖼️" },
  { href: "#faq", label: "FAQ", icon: "❓" },
];

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function SectionHead({ eyebrow, title, intro, id, dark }: { eyebrow: string; title: string; intro?: string; id?: string; dark?: boolean }) {
  return (
    <div className="mb-6 max-w-2xl">
      <p className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-[#f2b632]" : "text-[#b5487a]"}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-2 font-heading text-2xl font-bold md:text-3xl ${dark ? "text-white" : "text-[#0d2a3f]"}`}>
        {title}
      </h2>
      {intro && <p className={`mt-3 leading-relaxed ${dark ? "text-white/80" : "text-neutral-700"}`}>{intro}</p>}
    </div>
  );
}

/** Full moon, ripples and a few floating krathongs, decorative. */
function River() {
  const krathongs = [
    { x: 130, y: 500, s: 1 },
    { x: 380, y: 545, s: 0.75 },
    { x: 610, y: 515, s: 0.9 },
    { x: 900, y: 560, s: 0.7 },
  ];
  const ripples = [470, 505, 540, 575];
  return (
    <svg aria-hidden="true" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
      <circle cx="840" cy="120" r="70" fill="#fdf1c7" opacity="0.9" />
      <circle cx="840" cy="120" r="110" fill="#fdf1c7" opacity="0.08" />
      {ripples.map((y, i) => (
        <path
          key={y}
          d={`M0 ${y} Q 125 ${y - 10} 250 ${y} T 500 ${y} T 750 ${y} T 1000 ${y}`}
          fill="none"
          stroke="#7fb7c9"
          strokeWidth="2"
          opacity={0.25 - i * 0.04}
        />
      ))}
      {krathongs.map((k) => (
        <g key={k.x} transform={`translate(${k.x} ${k.y}) scale(${k.s})`} opacity="0.75">
          <ellipse cx="0" cy="8" rx="34" ry="8" fill="#3f8f4e" />
          {[-24, -12, 0, 12, 24].map((dx) => (
            <path key={dx} d={`M${dx - 7} 6 L${dx} -14 L${dx + 7} 6 Z`} fill="#5aa863" />
          ))}
          <circle cx="-8" cy="-6" r="6" fill="#f2b632" />
          <circle cx="8" cy="-6" r="6" fill="#e86a92" />
          <rect x="-2" y="-30" width="4" height="16" rx="1" fill="#fff6d8" />
          <ellipse cx="0" cy="-34" rx="3" ry="5" fill="#f2b632" />
        </g>
      ))}
    </svg>
  );
}

function Lotus() {
  return (
    <div aria-hidden="true" className="mx-auto my-4 flex max-w-6xl items-center justify-center gap-3 px-4 text-[#e86a92]">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#e86a92]/50" />
      <span className="text-2xl">🪷</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#e86a92]/50" />
    </div>
  );
}

export default function LoyKrathongGuidePage() {
  const days = daysUntil(LOY_DAY);
  const countdown =
    days > 1 ? `${days} sleeps to the full moon` : days === 1 ? "Tomorrow night!" : days === 0 ? "It's tonight!" : `See you in ${LOY_YEAR + 1}`;
  const latest = KRATHONG_COUNTS[KRATHONG_COUNTS.length - 1];
  const first = KRATHONG_COUNTS[0];
  const drop = Math.round((1 - latest.count / first.count) * 100);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    image: [OG_IMAGE, ...POSTERS.map((p) => `${SITE}${IMG_DIR}/${p.file}.jpg`)],
    datePublished: PUBLISHED,
    dateModified: `${CHECKED}T09:00:00+07:00`,
    author: { "@type": "Organization", name: "BKK Families", url: SITE },
    publisher: { "@type": "Organization", name: "BKK Families", url: SITE },
    mainEntityOfPage: { "@type": "WebPage", "@id": URL },
    about: [{ "@type": "Thing", name: "Loy Krathong" }, { "@type": "Place", name: "Bangkok, Thailand" }],
  };
  const imagesJsonLd = POSTERS.map((p, i) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: `${SITE}${IMG_DIR}/${p.file}.jpg`,
    thumbnailUrl: `${SITE}${IMG_DIR}/${p.file}.webp`,
    name: p.title,
    caption: p.alt,
    description: p.alt,
    width: p.w,
    height: p.h,
    encodingFormat: "image/jpeg",
    representativeOfPage: i === 0,
    creator: { "@type": "Organization", name: "BKK Families", url: SITE },
    creditText: "BKK Families",
    copyrightNotice: `© ${LOY_YEAR} BKK Families (bkkfamilies.com)`,
    copyrightHolder: { "@type": "Organization", name: "BKK Families", url: SITE },
    license: `${URL}#posters`,
    acquireLicensePage: `${URL}#posters`,
    datePublished: PUBLISHED,
  }));
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: "Loy Krathong in Bangkok with Kids", item: URL },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to make a krathong with kids",
    description: "Make a traditional krathong from natural materials for Loy Krathong, step by step.",
    image: `${SITE}${IMG_DIR}/${POSTERS[1].file}.jpg`,
    supply: ["Banana trunk slice", "Banana leaves", "Flowers", "Toothpicks or pins", "A short candle", "Three incense sticks"],
    step: MAKE_STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
  };
  const eventList = itemListJsonLd(`Loy Krathong ${LOY_YEAR} in Bangkok: where to float a krathong`, PLACES, OG_IMAGE);

  return (
    <>
      {[articleJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd, ...(eventList ? [eventList] : []), ...imagesJsonLd].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      {/* HERO */}
      <header className="relative overflow-hidden px-4 pb-14 pt-10 text-white md:pb-20" style={{ background: `radial-gradient(ellipse at 85% 10%, #1d4a63 0%, ${RIVER} 55%, #071824 100%)` }}>
        <River />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/60">
              <Link href="/" className="hover:text-[#f2b632]">Home</Link>
              <span className="mx-1.5">/</span>
              <Link href="/blog" className="hover:text-[#f2b632]">Blog</Link>
              <span className="mx-1.5">/</span>
              <span>Loy Krathong in Bangkok</span>
            </nav>
            <p className="inline-block rounded-full bg-[#f2b632] px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0d2a3f]">
              Tuesday 24 November {LOY_YEAR}
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight md:text-6xl">
              Loy Krathong in Bangkok <span className="block italic text-[#f2b632]">with kids</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              A candle, a raft of banana leaves and a wish, floated under the full moon. Here is every good place to float a krathong in
              Bangkok rated by crowd level, this year&rsquo;s city venues and dates, what it all means, and how to make one with your kids.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 font-heading text-lg font-bold text-[#f2b632]">
                {countdown}
              </span>
              <a href="#where" className="rounded-full bg-white px-5 py-2.5 font-semibold text-[#0d2a3f] transition hover:bg-white/90">
                Where to float
              </a>
              <a href="#make" className="rounded-full border-2 border-white/70 px-5 py-2 font-semibold text-white transition hover:bg-white/10">
                Make a krathong
              </a>
            </div>
            <p className="mt-6 text-sm text-white/60">by BKK Families · Updated {fmt(CHECKED)}</p>
          </div>
          <figure className="mx-auto w-full max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${IMG_DIR}/${POSTERS[0].file}.webp`}
              alt={POSTERS[0].alt}
              width={POSTERS[0].w}
              height={POSTERS[0].h}
              fetchPriority="high"
              className="h-auto w-full -rotate-1 rounded-xl shadow-2xl ring-1 ring-white/10"
            />
            <figcaption className="mt-3 text-center text-xs text-white/60">
              Our one-page Loy Krathong cheat sheet.{" "}
              <a href="#posters" className="underline hover:text-[#f2b632]">Download it and two more posters</a>.
            </figcaption>
          </figure>
        </div>
      </header>

      {/* JUMP TILES */}
      <nav aria-label="On this page" className="border-b border-black/5 bg-[#edf5f4] px-4 py-5">
        <ul className="mx-auto grid max-w-6xl grid-cols-4 gap-2 sm:grid-cols-8">
          {JUMP.map((j) => (
            <li key={j.href}>
              <a
                href={j.href}
                className="flex h-full flex-col items-center gap-1 rounded-xl bg-white px-1 py-3 text-center text-xs font-bold text-[#0d2a3f] shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:ring-[#e86a92]"
              >
                <span aria-hidden="true" className="text-2xl">{j.icon}</span>
                {j.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl px-4">
        {/* QUICK FACTS */}
        <section className="py-12" aria-labelledby="when">
          <SectionHead id="when" eyebrow="The quick version" title={`When is Loy Krathong ${LOY_YEAR}? Tuesday 24 November`} />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">The full moon</p>
              <p className="mt-1 font-heading text-xl font-bold text-[#0d2a3f]">Tue 24 November</p>
              <p className="mt-1 text-[15px] text-neutral-600">
                The full moon of the twelfth Thai lunar month. It is not a public holiday, so it is a school night.
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">The festival</p>
              <p className="mt-1 font-heading text-xl font-bold text-[#0d2a3f]">17 to 29 November</p>
              <p className="mt-1 text-[15px] text-neutral-600">
                Bangkok&rsquo;s official venues open from the 17th. Most events run 23 to 25 November, Monday to Wednesday.
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">The best time</p>
              <p className="mt-1 font-heading text-xl font-bold text-[#0d2a3f]">Around 6pm</p>
              <p className="mt-1 text-[15px] text-neutral-600">
                Dark enough for candles, before the 7pm to 10pm rush. See <a href="#crowds" className="font-semibold text-[#b5487a] hover:underline">crowds</a>.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* WHERE TO FLOAT */}
      <section id="where" className="scroll-mt-20 bg-[#edf5f4] px-4 py-14" aria-labelledby="where-h">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            id="where-h"
            eyebrow="Where to float a krathong"
            title={`Where to celebrate Loy Krathong in Bangkok, rated by crowd`}
            intro={`${PLACES.length} places to float a krathong in Bangkok, from quiet park ponds to the big river festivals. Filter by area, type and what you need. Listings marked ${LOY_YEAR} confirmed are announced for this year; the rest ran last year and we update them as this year's programmes land.`}
          />
          <div className="mb-6 flex flex-wrap gap-5 text-sm text-neutral-600">
            <span className="flex items-center gap-2"><Meter meter={CROWD_METER} level={1} theme="loy" caption={false} /> Calm: fine with toddlers</span>
            <span className="flex items-center gap-2"><Meter meter={CROWD_METER} level={2} theme="loy" caption={false} /> Busy: go early</span>
            <span className="flex items-center gap-2"><Meter meter={CROWD_METER} level={3} theme="loy" caption={false} /> Packed: teens and brave parents</span>
          </div>
          <FestiveFinder
            items={PLACES}
            groups={PLACE_GROUPS}
            toggles={PLACE_TOGGLES}
            meter={CROWD_METER}
            theme="loy"
            label="Filter places to celebrate Loy Krathong"
            noun="places"
            empty="Nothing matches that. Try another area or drop a filter."
            lastYear={LAST_YEAR}
          />
          <p className="mt-6 rounded-lg bg-white px-4 py-3 text-sm text-neutral-600 ring-1 ring-black/5">
            Simple krathongs sell for about 20 to 100 baht from stalls at every park, pier and temple on the night. You do not need a ticket
            to float one anywhere on this list except the hotel dinners. Know a family-friendly Loy Krathong event we have missed?{" "}
            <a href="mailto:info@bkkfamilies.com" className="font-semibold text-[#b5487a] hover:underline">Tell us</a>.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* CROWDS */}
        <section id="crowds" className="scroll-mt-20 grid gap-8 py-14 md:grid-cols-2" aria-labelledby="crowds-h">
          <div>
            <SectionHead
              id="crowds-h"
              eyebrow="How busy does it get?"
              title="How busy is Loy Krathong in Bangkok?"
              intro="Busy, but spread out. The city opened 110 floating points across all 50 districts last year, so crowds are thinnest away from the river."
            />
            <ul className="list-disc space-y-2 pl-5 text-[15px] text-neutral-700">
              <li><b>Busiest:</b> the river on the full moon night, especially Wat Arun, Phra Sumen Fort, ICONSIAM and Asiatique, from about 7pm to 10pm.</li>
              <li><b>In between:</b> Lumpini, Benchakitti and the old town festivals. Busy after 7pm, fine before.</li>
              <li><b>Calmest:</b> smaller parks like Benjasiri, the canal-side district festivals, and any venue on the nights before the full moon.</li>
              <li><b>Traffic:</b> it is a Tuesday this year, so the evening rush and the festival overlap. Take the MRT, BTS or a river boat.</li>
            </ul>
          </div>
          <div className="rounded-2xl p-6 text-white" style={{ background: RIVER }}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#f2b632]">Krathongs collected from Bangkok&rsquo;s waters</p>
            <p className="mt-1 text-sm text-white/70">Counted by the city the morning after</p>
            <ul className="mt-5 space-y-3">
              {KRATHONG_COUNTS.map((k) => (
                <li key={k.year}>
                  <div className="flex items-baseline justify-between text-[15px]">
                    <span className="font-bold">{k.year}</span>
                    <span className="font-heading text-xl font-bold text-[#f2b632]">{k.count.toLocaleString("en-US")}</span>
                  </div>
                  <div className="mt-1 h-2.5 rounded-full bg-white/10">
                    <div className="h-2.5 rounded-full bg-[#e86a92]" style={{ width: `${Math.round((k.count / first.count) * 100)}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-white/80">
              Down {drop}% in two years, as more families float one krathong per household. In {latest.year}, 83% were natural materials,
              7% foam and 10% bread.
            </p>
          </div>
        </section>
      </div>

      {/* TRADITIONS */}
      <section id="traditions" className="scroll-mt-20 relative overflow-hidden px-4 py-16 text-white" style={{ background: RIVER }} aria-labelledby="traditions-h">
        <div className="relative mx-auto max-w-6xl">
          <SectionHead
            dark
            id="traditions-h"
            eyebrow="What it all means"
            title="Loy Krathong traditions, explained for kids"
            intro="Loy Krathong is one of the gentlest festivals in the world to share with children: a thank you to the water, a chance to let go of the year's bad luck, and a wish on the full moon."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRADITIONS.map((g) => (
              <div key={g.title} className="rounded-xl bg-white/[0.07] p-5 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-[#f2b632]">{g.thai}</p>
                <h3 className="mt-1 font-heading text-xl font-bold">{g.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">{g.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/70">
            At school: many Bangkok schools mark Loy Krathong with Thai dress, krathong making and a Noppamas contest. Check the newsletter
            in mid November in case your child needs an outfit.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* MAKE ONE */}
        <section id="make" className="scroll-mt-20 py-14" aria-labelledby="make-h">
          <SectionHead
            id="make-h"
            eyebrow="The best part, honestly"
            title="How to make a krathong with kids"
            intro="Half an hour, a trip to the flower market and a kitchen table. Every material below rots away in the water, which is the point."
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {MAKE_STEPS.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3f8f4e] font-bold text-white">{i + 1}</span>
                <h3 className="mt-3 font-bold text-[#0d2a3f]">{s.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 rounded-xl bg-[#edf5f4] px-5 py-4 text-[15px] text-neutral-700">
            Short of time? Workshops at Mahakan Fort (23 to 25 November) teach krathong making from natural materials, and The Siam&rsquo;s dinner
            includes one. There is a printable version of these steps in the <a href="#posters" className="font-semibold text-[#b5487a] hover:underline">posters</a> below.
          </p>
        </section>
      </div>

      <Lotus />

      <div className="mx-auto max-w-6xl px-4">
        {/* BY AGE */}
        <section id="by-age" className="scroll-mt-20 py-14" aria-labelledby="by-age-h">
          <SectionHead id="by-age-h" eyebrow="Pick your Loy Krathong on purpose" title="The best Loy Krathong in Bangkok for every age" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BY_AGE.map((a, i) => (
              <div key={a.title} className="relative overflow-hidden rounded-xl p-5 text-white shadow-sm" style={{ background: RIVER }}>
                <span aria-hidden="true" className="absolute -right-2 -top-3 text-6xl opacity-20">{["🪷", "🍃", "🕯️", "🌕"][i]}</span>
                <p className="text-xs font-bold uppercase tracking-wide text-[#f2b632]">{a.who}</p>
                <h3 className="mt-1 font-heading text-xl font-bold">{a.title}</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-white/85">
                  {a.picks.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SAFETY */}
        <section id="safety" className="scroll-mt-20 py-14" aria-labelledby="safety-h">
          <SectionHead
            id="safety-h"
            eyebrow="Water, fire and crowds"
            title="Keeping kids safe on Loy Krathong night"
            intro="It is a calm, good-natured festival, but it combines three things small children find irresistible: water, fire and crowds after dark."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {SAFETY_TIPS.map((t) => (
              <div key={t.title} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-[#0d2a3f]">{t.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{t.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[15px] text-neutral-700">
            More in <Link href="/blog/is-bangkok-safe-for-kids" className="font-semibold text-[#b5487a] hover:underline">is Bangkok safe for kids?</Link>{" "}
            and our <Link href="/blog/9-things-to-do-in-bangkok-with-kids" className="font-semibold text-[#b5487a] hover:underline">things to do in Bangkok with kids</Link>.
          </p>
        </section>

        {/* BEYOND BANGKOK */}
        <section className="py-14" aria-labelledby="beyond">
          <SectionHead
            id="beyond"
            eyebrow="Worth the trip"
            title="Loy Krathong beyond Bangkok"
            intro="The same full moon is celebrated across the country. These are the three worth planning around."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {BEYOND.map((b) => (
              <div key={b.where} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">{b.when}</p>
                <h3 className="mt-1 font-heading text-xl font-bold text-[#0d2a3f]">{b.where}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* POSTERS */}
        <section id="posters" className="scroll-mt-20 py-14" aria-labelledby="posters-h">
          <SectionHead
            id="posters-h"
            eyebrow="Save it, print it, share it"
            title={`Loy Krathong ${LOY_YEAR} posters and printables`}
            intro="Three free Loy Krathong posters: a cheat sheet of where to float a krathong with kids, a printable how to make a krathong, and the traditions explained for kids. Share them in your class chat or condo LINE group with a credit to BKK Families. Tap a poster for the full-size version."
          />
          <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POSTERS.map((p) => (
              <figure key={p.file} className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
                <a href={`${IMG_DIR}/${p.file}.jpg`} target="_blank" rel="noopener" title={`${p.title} (full size)`} className="block overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG_DIR}/${p.file}.webp`} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" className="h-auto w-full transition hover:scale-[1.02]" />
                </a>
                <figcaption className="mt-3 flex items-center justify-between gap-3">
                  <span>
                    <span className="block font-heading text-lg font-bold text-[#0d2a3f]">{p.title}</span>
                    <span className="block text-sm text-neutral-600">{p.use}</span>
                  </span>
                  <a
                    href={`${IMG_DIR}/${p.file}.jpg`}
                    download={`${p.file}.jpg`}
                    aria-label={`Download ${p.title} poster`}
                    className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ background: RIVER }}
                  >
                    Download
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 py-14" aria-labelledby="faq-h">
          <SectionHead id="faq-h" eyebrow="Quick answers" title="Loy Krathong in Bangkok FAQ" />
          <div className="max-w-3xl space-y-3">
            {FAQ.map((f) => (
              <details key={f.question} className="group rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-heading text-lg font-bold text-[#0d2a3f]">{f.question}</summary>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#f2b632] px-6 py-8 text-[#0d2a3f] md:flex-row md:items-center md:px-10">
            <div>
              <p className="font-heading text-2xl font-bold">Hosting a family Loy Krathong event?</p>
              <p className="mt-1 text-[#0d2a3f]/80">Send us the details and we&rsquo;ll add it. We update this guide every few days until the full moon.</p>
            </div>
            <a href="mailto:info@bkkfamilies.com" className="shrink-0 rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-90" style={{ background: RIVER }}>
              info@bkkfamilies.com
            </a>
          </div>
          <p className="mt-6 text-[15px] text-neutral-700">
            Floating a krathong with the kids this year? Share your photos in the{" "}
            <a href="https://www.facebook.com/groups/395501457186828" target="_blank" rel="noreferrer" className="font-semibold text-[#b5487a] hover:underline">
              Bangkok Expat Families
            </a>{" "}
            group. Planning ahead for December? See our{" "}
            <Link href="/blog/christmas-in-bangkok-with-kids" className="font-semibold text-[#b5487a] hover:underline">Christmas in Bangkok with kids</Link> guide.
          </p>
          <p className="mt-10 text-sm font-extrabold uppercase tracking-widest text-purple-dark">Your Bangkok Roadmap</p>
          <div className="mt-8 border-t border-black/10 pt-6">
            <Link href="/blog" className="text-sm font-semibold text-orange">← Back to Blog</Link>
          </div>
        </section>
      </div>
    </>
  );
}
