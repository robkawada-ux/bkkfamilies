import type { Metadata } from "next";
import Link from "next/link";
import { og, SITE } from "@/lib/seo";
import FestiveFinder, { Meter } from "@/components/ui/FestiveFinder";
import { daysUntil, itemListJsonLd } from "@/lib/festive";
import {
  BY_AGE,
  CHECKED,
  COUNTDOWNS,
  COUNTDOWN_GROUPS,
  COUNTDOWN_TOGGLES,
  CROWD_METER,
  DINNERS,
  DINNER_GROUPS,
  DINNER_TOGGLES,
  FAQ,
  LAST_YEAR,
  NYE_IMG_DIR as IMG_DIR,
  NYE_PATH,
  NYE_POSTERS as POSTERS,
  NYE_SHARE_IMAGE,
  NYE_YEAR,
  PRICE_METER,
  ROAD_CLOSURES,
  SAFETY_TIPS,
  TEMPLE,
  TIMEZONES,
} from "@/lib/nye";

// Re-render hourly so the countdown stays right.
export const revalidate = 3600;

const TITLE = "New Year's Eve in Bangkok 2026 with Kids: Fireworks and Countdowns";
const DESCRIPTION =
  "New Year's Eve 2026 in Bangkok with kids: every countdown rated by crowd level, family dinners and fireworks cruises with prices, getting home, and the 8pm midnight trick.";
const OG_IMAGE = `${SITE}${NYE_SHARE_IMAGE}`;
const URL = `${SITE}${NYE_PATH}`;
const PUBLISHED = "2026-10-14T09:00:00+07:00";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "new years eve bangkok",
    "new year's eve in bangkok with kids",
    "bangkok countdown 2027",
    "new year countdown bangkok",
    "bangkok new year fireworks",
    "iconsiam countdown",
    "centralworld countdown",
    "new year dinner bangkok",
    "new year's eve cruise bangkok",
  ],
  alternates: { canonical: NYE_PATH },
  openGraph: {
    ...og({ title: TITLE, description: DESCRIPTION, path: NYE_PATH, type: "article", image: OG_IMAGE }),
    publishedTime: PUBLISHED,
  } as Metadata["openGraph"],
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: "New Year's Eve in Bangkok 2026 family guide: fireworks, countdowns and the 8pm midnight trick" }],
  },
};

const NIGHT = "#141b44";

const JUMP = [
  { href: "#fireworks", label: "Fireworks", icon: "🎆" },
  { href: "#by-age", label: "By age", icon: "👨‍👩‍👧" },
  { href: "#dinners", label: "Dinners and cruises", icon: "🍽️" },
  { href: "#trick", label: "8pm trick", icon: "🕗" },
  { href: "#safety", label: "Crowd tips", icon: "🧭" },
  { href: "#home-time", label: "Getting home", icon: "🚇" },
  { href: "#posters", label: "Posters", icon: "🖼️" },
  { href: "#faq", label: "FAQ", icon: "❓" },
];

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function SectionHead({ eyebrow, title, intro, id, dark }: { eyebrow: string; title: string; intro?: string; id?: string; dark?: boolean }) {
  return (
    <div className="mb-6 max-w-2xl">
      <p className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-[#f5c451]" : "text-[#d6336c]"}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-2 font-heading text-2xl font-bold md:text-3xl ${dark ? "text-white" : "text-[#141b44]"}`}>
        {title}
      </h2>
      {intro && <p className={`mt-3 leading-relaxed ${dark ? "text-white/80" : "text-neutral-700"}`}>{intro}</p>}
    </div>
  );
}

/** Firework bursts and stars, decorative. */
function Sky() {
  // Coordinates in a 1000 x 600 box, cropped to fit like a background.
  const bursts = [
    { x: 860, y: 200, r: 90, c: "#f5c451" },
    { x: 950, y: 430, r: 55, c: "#d6336c" },
    { x: 680, y: 120, r: 45, c: "#3EC1D3" },
    { x: 40, y: 540, r: 40, c: "#8DC63F" },
  ];
  const stars = [
    [120, 360], [200, 180], [330, 70], [410, 420], [480, 140], [570, 310], [700, 480], [760, 240], [860, 530], [960, 50], [40, 500], [280, 530],
  ];
  const r1 = (n: number) => Math.round(n * 10) / 10;
  return (
    <svg aria-hidden="true" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
      {stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.2} fill="#fff" opacity={0.5} />
      ))}
      {bursts.map((b, i) => (
        <g key={i} opacity={0.35}>
          {Array.from({ length: 16 }).map((_, k) => {
            const a = (k / 16) * Math.PI * 2;
            return (
              <line
                key={k}
                x1={r1(b.x + Math.cos(a) * b.r * 0.35)}
                y1={r1(b.y + Math.sin(a) * b.r * 0.35)}
                x2={r1(b.x + Math.cos(a) * b.r)}
                y2={r1(b.y + Math.sin(a) * b.r)}
                stroke={b.c}
                strokeWidth="4"
                strokeLinecap="round"
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

function Sparkles() {
  return (
    <div aria-hidden="true" className="mx-auto my-4 flex max-w-6xl items-center justify-center gap-3 px-4 text-[#e0a526]">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#e0a526]/60" />
      <span className="text-lg">✦</span>
      <span className="text-2xl text-[#d6336c]">✦</span>
      <span className="text-lg">✦</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#e0a526]/60" />
    </div>
  );
}

export default function NyeGuidePage() {
  const days = daysUntil(`${NYE_YEAR}-12-31`);
  const next = NYE_YEAR + 1;
  const countdown =
    days > 1 ? `${days} sleeps until ${next}` : days === 1 ? `1 sleep until ${next}` : days === 0 ? "It's tonight!" : `Happy ${next}!`;

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
    about: [{ "@type": "Thing", name: "New Year's Eve" }, { "@type": "Place", name: "Bangkok, Thailand" }],
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
    copyrightNotice: `© ${NYE_YEAR} BKK Families (bkkfamilies.com)`,
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
      { "@type": "ListItem", position: 3, name: "New Year's Eve in Bangkok with Kids", item: URL },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const eventLists = [
    itemListJsonLd(`New Year's Eve countdowns in Bangkok, ${NYE_YEAR}`, COUNTDOWNS, OG_IMAGE),
    itemListJsonLd(`New Year's Eve dinners and cruises in Bangkok, ${NYE_YEAR}`, DINNERS, OG_IMAGE),
  ].filter(Boolean);

  return (
    <>
      {[articleJsonLd, breadcrumbJsonLd, faqJsonLd, ...eventLists, ...imagesJsonLd].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      {/* HERO */}
      <header className="relative overflow-hidden px-4 pb-14 pt-10 text-white md:pb-20" style={{ background: `radial-gradient(ellipse at 80% 10%, #2a3478 0%, ${NIGHT} 55%, #0b0f2b 100%)` }}>
        <Sky />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/60">
              <Link href="/" className="hover:text-[#f5c451]">Home</Link>
              <span className="mx-1.5">/</span>
              <Link href="/blog" className="hover:text-[#f5c451]">Blog</Link>
              <span className="mx-1.5">/</span>
              <span>New Year&rsquo;s Eve in Bangkok</span>
            </nav>
            <p className="inline-block rounded-full bg-[#f5c451] px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#141b44]">
              Thursday 31 December 2026
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight md:text-6xl">
              New Year&rsquo;s Eve in Bangkok <span className="block italic text-[#f5c451]">with kids</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              Fireworks over the river, half of Bangkok in one place, and a four-year-old who was asleep by nine. Every countdown rated by
              crowd level, family dinners and fireworks cruises with real prices, and how to actually get home afterwards.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 font-heading text-lg font-bold text-[#f5c451]">
                {countdown}
              </span>
              <a href="#fireworks" className="rounded-full bg-white px-5 py-2.5 font-semibold text-[#141b44] transition hover:bg-white/90">
                Find the fireworks
              </a>
              <a href="#trick" className="rounded-full border-2 border-white/70 px-5 py-2 font-semibold text-white transition hover:bg-white/10">
                The 8pm trick
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
              Our one-page New Year&rsquo;s Eve cheat sheet.{" "}
              <a href="#posters" className="underline hover:text-[#f5c451]">Download it and two more posters</a>.
            </figcaption>
          </figure>
        </div>
      </header>

      {/* JUMP TILES */}
      <nav aria-label="On this page" className="border-b border-black/5 bg-[#f6f4ff] px-4 py-5">
        <ul className="mx-auto grid max-w-6xl grid-cols-4 gap-2 sm:grid-cols-8">
          {JUMP.map((j) => (
            <li key={j.href}>
              <a
                href={j.href}
                className="flex h-full flex-col items-center gap-1 rounded-xl bg-white px-1 py-3 text-center text-xs font-bold text-[#141b44] shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:ring-[#e0a526]"
              >
                <span aria-hidden="true" className="text-2xl">{j.icon}</span>
                {j.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl px-4">
        <p className="mt-10 rounded-xl border-2 border-dashed border-[#e0a526] bg-[#fffaf0] px-5 py-4 text-[15px] leading-relaxed text-neutral-700">
          <b className="text-[#141b44]">How this guide works:</b> every listing is what ran on New Year&rsquo;s Eve {LAST_YEAR}, the countdown to{" "}
          {LAST_YEAR + 1}, with last year&rsquo;s prices. Line-ups for {NYE_YEAR} are announced through November and December, and we swap them
          in as they land. Anything already confirmed for {NYE_YEAR} gets a green badge.
        </p>

        {/* QUICK FACTS */}
        <section className="py-12" aria-labelledby="when">
          <SectionHead id="when" eyebrow="The quick version" title="New Year's Eve 2026 in Bangkok: the basics" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">A four-day weekend</p>
              <p className="mt-1 font-heading text-xl font-bold text-[#141b44]">Thu 31 Dec to Sun 3 Jan</p>
              <p className="mt-1 text-[15px] text-neutral-600">31 December and 1 January are both public holidays, landing on a Thursday and Friday this year.</p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">The great exodus</p>
              <p className="mt-1 font-heading text-xl font-bold text-[#141b44]">Half of Bangkok leaves</p>
              <p className="mt-1 text-[15px] text-neutral-600">Roads out jam in the days before. The city goes quiet, except the countdown spots, which go wild.</p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Trains run late</p>
              <p className="mt-1 font-heading text-xl font-bold text-[#141b44]">MRT until 2am</p>
              <p className="mt-1 text-[15px] text-neutral-600">
                That was last year, on four lines. See <a href="#home-time" className="font-semibold text-[#b7791f] hover:underline">getting home</a>.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* FIREWORKS */}
      <section id="fireworks" className="scroll-mt-20 bg-[#f6f4ff] px-4 py-14" aria-labelledby="fireworks-h">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            id="fireworks-h"
            eyebrow="Where to watch the fireworks"
            title="New Year's Eve countdowns in Bangkok, rated by crowd"
            intro="Last year Bangkok had ten big public countdowns. Filter by area and how much crowd you can handle. The mega ones are spectacular and best with teens; the cosy ones are where small children have the best night."
          />
          <div className="mb-6 flex flex-wrap gap-5 text-sm text-neutral-600">
            <span className="flex items-center gap-2"><Meter meter={CROWD_METER} level={1} theme="nye" /> Cosy: fine with little ones</span>
            <span className="flex items-center gap-2"><Meter meter={CROWD_METER} level={2} theme="nye" /> Busy: go early, leave early</span>
            <span className="flex items-center gap-2"><Meter meter={CROWD_METER} level={3} theme="nye" /> Mega: teens and brave parents</span>
          </div>
          <FestiveFinder
            items={COUNTDOWNS}
            groups={COUNTDOWN_GROUPS}
            toggles={COUNTDOWN_TOGGLES}
            meter={CROWD_METER}
            theme="nye"
            label="Filter New Year's Eve countdowns"
            noun="countdowns"
            empty="Nothing matches that. Try another area or crowd size."
            lastYear={LAST_YEAR}
          />
          <p className="mt-6 rounded-lg bg-white px-4 py-3 text-sm text-neutral-600 ring-1 ring-black/5">
            The Amazing Thailand Countdown that used to light up Wat Arun moved to Phayao for the {LAST_YEAR + 1} countdown. We&rsquo;ll note it
            here if it comes back to Bangkok. Skip the ticketed EDM festivals and Khao San Road unless your kids are adults: they aren&rsquo;t
            pretending to be family events.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* BY AGE */}
        <section id="by-age" className="scroll-mt-20 py-14" aria-labelledby="by-age-h">
          <SectionHead id="by-age-h" eyebrow="Choose your New Year's Eve on purpose" title="The best New Year's Eve in Bangkok for every age" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BY_AGE.map((a, i) => (
              <div key={a.title} className="relative overflow-hidden rounded-xl bg-[#141b44] p-5 text-white shadow-sm">
                <span aria-hidden="true" className="absolute -right-2 -top-3 text-6xl opacity-20">{["🌙", "🎈", "✨", "🎆"][i]}</span>
                <p className="text-xs font-bold uppercase tracking-wide text-[#f5c451]">{a.who}</p>
                <h3 className="mt-1 font-heading text-xl font-bold">{a.title}</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-white/85">
                  {a.picks.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Sparkles />

      <div className="mx-auto max-w-6xl px-4">
        {/* DINNERS */}
        <section id="dinners" className="scroll-mt-20 py-14" aria-labelledby="dinners-h">
          <SectionHead
            id="dinners-h"
            eyebrow="Dinner first, fireworks maybe"
            title="New Year's Eve dinners and fireworks cruises in Bangkok"
            intro="From an early buffet that's over by nine to a front-row fireworks cruise. Family-friendly tables go fast, so book in November."
          />
          <FestiveFinder
            items={DINNERS}
            groups={DINNER_GROUPS}
            toggles={DINNER_TOGGLES}
            meter={PRICE_METER}
            theme="nye"
            label="Filter New Year's Eve dinners"
            noun="dinners and cruises"
            empty="Nothing matches that. Try dropping a filter."
            lastYear={LAST_YEAR}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <h3 className="font-bold text-[#141b44]">Ask if your table faces the fireworks</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">
                Riverside restaurants sell &ldquo;fireworks view&rdquo; dinners at fireworks prices. A river view isn&rsquo;t always a fireworks view, so
                ask which way your table faces before you pay.
              </p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <h3 className="font-bold text-[#141b44]">Book an early seating</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">
                A 6pm table is the sweet spot with younger kids: the festive dinner, then fireworks or bed, whichever wins. Hosting at home? The
                supermarkets are rammed on 30 and 31 December, so shop earlier in the week.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 8PM TRICK */}
      <section id="trick" className="scroll-mt-20 relative overflow-hidden px-4 py-16 text-white" style={{ background: NIGHT }} aria-labelledby="trick-h">
        <Sky />
        <div className="relative mx-auto max-w-6xl">
          <SectionHead
            dark
            id="trick-h"
            eyebrow="The best parenting hack of the year"
            title="The 8pm midnight trick"
            intro="Small children don't know what time it is. Use that. In late December, Sydney is four hours ahead of Bangkok, so its famous midnight fireworks go off at 8pm here. Put the livestream on, count down together, bang some pots and pans, and have everyone in bed by half past eight, convinced they stayed up for New Year."
          />
          <ol className="mt-4 grid gap-3 sm:grid-cols-5">
            {TIMEZONES.map((t, i) => (
              <li
                key={t.city}
                className={`rounded-xl p-4 ring-1 ${i === 1 ? "bg-[#f5c451] text-[#141b44] ring-[#f5c451]" : i === TIMEZONES.length - 1 ? "bg-[#d6336c] ring-[#d6336c]" : "bg-white/[0.07] ring-white/10"}`}
              >
                <p className="font-heading text-3xl font-bold">{t.bkk}</p>
                <p className="mt-1 text-sm font-bold uppercase tracking-wide opacity-80">
                  {t.city === "Bangkok" ? "Here in Bangkok" : `Midnight in ${t.city}`}
                </p>
                <p className="mt-2 text-[15px] opacity-85">{t.note}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-white/70">Party poppers and glow sticks do the rest. Save the real thing for the year they ask for it.</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* SAFETY */}
        <section id="safety" className="scroll-mt-20 py-14" aria-labelledby="safety-h">
          <SectionHead
            id="safety-h"
            eyebrow="Crowd survival"
            title="Keeping kids safe in the New Year's Eve crowds"
            intro="The big countdowns are heavily policed and good-natured, and Bangkok is a safe city for families. But a midnight crowd is a midnight crowd."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {SAFETY_TIPS.map((t) => (
              <div key={t.title} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-[#141b44]">{t.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{t.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[15px] text-neutral-700">
            We learned the meeting-point rule the hard way, a story we tell in our{" "}
            <Link href="/blog/9-things-to-do-in-bangkok-with-kids" className="font-semibold text-[#b7791f] hover:underline">things to do in Bangkok with kids</Link>{" "}
            guide. More in <Link href="/blog/is-bangkok-safe-for-kids" className="font-semibold text-[#b7791f] hover:underline">is Bangkok safe for kids?</Link> and our{" "}
            <Link href="/blog/bangkok-smog-season-kids" className="font-semibold text-[#b7791f] hover:underline">smog season guide</Link>.
          </p>
        </section>

        {/* GETTING HOME */}
        <section id="home-time" className="scroll-mt-20 grid gap-8 py-14 md:grid-cols-2" aria-labelledby="home-h">
          <div>
            <SectionHead
              id="home-h"
              eyebrow="The hardest part of the night"
              title="Getting home after midnight"
              intro="Roads near the big venues close, taxis vanish and ride-hailing prices surge for an hour or more. The trains are your friend."
            />
            <ul className="list-disc space-y-2 pl-5 text-[15px] text-neutral-700">
              <li><b>MRT:</b> last year the Blue, Purple, Yellow and Pink lines ran until 2am. Check closer to the date.</li>
              <li><b>BTS:</b> has usually extended its hours too. Confirm in late December.</li>
              <li><b>Walk a stop or two</b> away from the fireworks before you board. It&rsquo;s often quicker than queuing.</li>
              <li><b>Driving?</b> Park well away from the venue and walk in.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-[#141b44] p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-[#f5c451]">Last year&rsquo;s CentralWorld road closures</p>
            <p className="mt-1 text-sm text-white/70">31 December, until about 2am (5am on the first stretch)</p>
            <ul className="mt-4 space-y-2.5">
              {ROAD_CLOSURES.map((r) => (
                <li key={r} className="flex gap-3 text-[15px]">
                  <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d6336c]" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* THAI NEW YEAR TRADITIONS */}
      <section className="bg-[#141b44] px-4 py-16 text-white" aria-labelledby="thai">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            dark
            id="thai"
            eyebrow="Only in Thailand"
            title="How Thai families see in the new year"
            intro="Not everyone in Bangkok is at a countdown. Many Thai families mark the new year quietly, at the temple. It's a lovely thing to show the kids."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLE.map((g) => (
              <div key={g.title} className="rounded-xl bg-white/[0.07] p-5 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-[#f5c451]">{g.thai}</p>
                <h3 className="mt-1 font-heading text-xl font-bold">{g.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* NEW YEAR'S DAY */}
        <section className="py-14" aria-labelledby="nyd">
          <SectionHead
            id="nyd"
            eyebrow="The secret"
            title="New Year's Day is the best day of the year to be in Bangkok"
            intro="With half the city out of town, 1 January is wonderfully quiet: empty roads, calm parks and usually lovely weather."
          />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-[#141b44]">A picnic in the park</h3>
              <p className="mt-1 text-[15px] text-neutral-600">Lumpini or Benchakitti Park, before the heat. Bring a frisbee and the leftover party snacks.</p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-[#141b44]">Do the thing you never do</h3>
              <p className="mt-1 text-[15px] text-neutral-600">
                The quiet roads make it the perfect day for one of our{" "}
                <Link href="/blog/9-things-to-do-in-bangkok-with-kids" className="font-semibold text-[#b7791f] hover:underline">things to do with kids</Link>.
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-[#141b44]">Fill the rest of the break</h3>
              <p className="mt-1 text-[15px] text-neutral-600">
                School goes back in the second week of January. See our{" "}
                <Link href="/camps" className="font-semibold text-[#b7791f] hover:underline">holiday camps</Link> and{" "}
                <Link href="/school-breaks" className="font-semibold text-[#b7791f] hover:underline">school holidays calendar</Link>.
              </p>
            </div>
          </div>
          <p className="mt-6 rounded-xl bg-[#f6f4ff] px-5 py-4 text-[15px] text-neutral-700">
            Still planning December? Our <Link href="/blog/christmas-in-bangkok-with-kids" className="font-semibold text-[#b7791f] hover:underline">Christmas in Bangkok with kids</Link> guide
            has 28 Christmas dinners, every place to meet Santa and the best lights.
          </p>
        </section>

        {/* POSTERS */}
        <section id="posters" className="scroll-mt-20 py-14" aria-labelledby="posters-h">
          <SectionHead
            id="posters-h"
            eyebrow="Save it, share it, stick it on the fridge"
            title="New Year's Eve in Bangkok 2026 posters"
            intro="Three free New Year's Eve posters: a one-page cheat sheet, the 8pm midnight trick, and the best plans by age. Share them in your class chat, condo LINE group or anywhere Bangkok parents gather, with a credit to BKK Families. Tap a poster for the full-size version."
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
                    <span className="block font-heading text-lg font-bold text-[#141b44]">{p.title}</span>
                    <span className="block text-sm text-neutral-600">{p.use}</span>
                  </span>
                  <a
                    href={`${IMG_DIR}/${p.file}.jpg`}
                    download={`${p.file}.jpg`}
                    aria-label={`Download ${p.title} poster`}
                    className="shrink-0 rounded-full bg-[#141b44] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
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
          <SectionHead id="faq-h" eyebrow="Quick answers" title="New Year's Eve in Bangkok FAQ" />
          <div className="max-w-3xl space-y-3">
            {FAQ.map((f) => (
              <details key={f.question} className="group rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-heading text-lg font-bold text-[#141b44]">{f.question}</summary>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#f5c451] px-6 py-8 text-[#141b44] md:flex-row md:items-center md:px-10">
            <div>
              <p className="font-heading text-2xl font-bold">Hosting a family-friendly New Year&rsquo;s Eve?</p>
              <p className="mt-1 text-[#141b44]/80">Send us the details and we&rsquo;ll add it. We update this guide every few days through December.</p>
            </div>
            <a href="mailto:info@bkkfamilies.com" className="shrink-0 rounded-full bg-[#141b44] px-6 py-3 font-semibold text-white transition hover:opacity-90">
              info@bkkfamilies.com
            </a>
          </div>
          <p className="mt-6 text-[15px] text-neutral-700">
            Found a great spot to watch the fireworks with kids? Share it in the{" "}
            <a href="https://www.facebook.com/groups/395501457186828" target="_blank" rel="noreferrer" className="font-semibold text-[#b7791f] hover:underline">
              Bangkok Expat Families
            </a>{" "}
            group. Sawasdee Pi Mai, and happy new year from all of us at BKK Families!
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
