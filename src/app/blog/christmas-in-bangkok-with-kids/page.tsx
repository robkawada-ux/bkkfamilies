import type { Metadata } from "next";
import Link from "next/link";
import { og, SITE } from "@/lib/seo";
import FestiveFinder, { Meter } from "@/components/ui/FestiveFinder";
import { daysUntil, itemListJsonLd } from "@/lib/festive";
import {
  CHECKED,
  CHRISTMAS_IMG_DIR as IMG_DIR,
  CHRISTMAS_PATH,
  CHRISTMAS_POSTERS as POSTERS,
  CHRISTMAS_SHARE_IMAGE,
  CHRISTMAS_YEAR,
  CHURCHES,
  DINNERS,
  DINNER_GROUPS,
  DINNER_METER,
  DINNER_PICKS,
  DINNER_TOGGLES,
  EVENTS,
  EVENT_GROUPS,
  EVENT_TOGGLES,
  FAQ,
  HOME_IDEAS,
  LAST_YEAR,
  MOVIES,
  TREE_TRAIL,
} from "@/lib/christmas";

// Re-render hourly so the countdown stays right.
export const revalidate = 3600;

const TITLE = "Christmas in Bangkok 2026 with Kids: Dinners, Santa and Lights";
const DESCRIPTION =
  "Christmas 2026 in Bangkok with kids: 28 family Christmas dinners and brunches with prices, where to meet Santa, the best lights, markets and church services.";
const OG_IMAGE = `${SITE}${CHRISTMAS_SHARE_IMAGE}`;
const URL = `${SITE}${CHRISTMAS_PATH}`;
const PUBLISHED = "2026-10-14T09:00:00+07:00";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "christmas in bangkok with kids",
    "christmas in bangkok 2026",
    "christmas dinner bangkok",
    "christmas brunch bangkok",
    "christmas lunch bangkok",
    "where to see santa in bangkok",
    "christmas events bangkok",
    "christmas market bangkok",
    "christmas lights bangkok",
  ],
  alternates: { canonical: CHRISTMAS_PATH },
  openGraph: {
    ...og({ title: TITLE, description: DESCRIPTION, path: CHRISTMAS_PATH, type: "article", image: OG_IMAGE }),
    publishedTime: PUBLISHED,
  } as Metadata["openGraph"],
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: "Christmas in Bangkok 2026 family guide: Christmas dinners, Santa and lights" }],
  },
};

const PINE = "#0f3b2e";

const JUMP = [
  { href: "#dinners", label: "Christmas dinner", icon: "🍗" },
  { href: "#santa", label: "Meet Santa", icon: "🎅" },
  { href: "#trail", label: "Tree trail", icon: "🎄" },
  { href: "#events", label: "Markets and shows", icon: "🎁" },
  { href: "#church", label: "Church", icon: "🔔" },
  { href: "#home", label: "At home", icon: "🏠" },
  { href: "#posters", label: "Posters", icon: "🖼️" },
  { href: "#faq", label: "FAQ", icon: "❓" },
];

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function SectionHead({ eyebrow, title, intro, id }: { eyebrow: string; title: string; intro?: string; id?: string }) {
  return (
    <div className="mb-6 max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-widest text-[#c62f3a]">{eyebrow}</p>
      <h2 id={id} className="mt-2 font-heading text-2xl font-bold text-[#0f3b2e] md:text-3xl">
        {title}
      </h2>
      {intro && <p className="mt-3 leading-relaxed text-neutral-700">{intro}</p>}
    </div>
  );
}

/** A string of fairy lights, used between sections. */
function Lights() {
  const colors = ["#c62f3a", "#f4b942", "#3EC1D3", "#8DC63F", "#F4831F"];
  return (
    <div aria-hidden="true" className="mx-auto my-2 max-w-6xl overflow-hidden px-4">
      <svg viewBox="0 0 1200 46" preserveAspectRatio="none" className="h-10 w-full">
        <path d="M0 6 Q 150 34 300 6 T 600 6 T 900 6 T 1200 6" fill="none" stroke="#1f2a24" strokeWidth="2" />
        {Array.from({ length: 24 }).map((_, i) => {
          const x = 25 + i * 50;
          const phase = ((x % 300) / 300) * Math.PI;
          const y = 6 + 28 * Math.sin(phase);
          return (
            <g key={i}>
              <rect x={x - 3} y={y} width="6" height="5" rx="1" fill="#1f2a24" />
              <ellipse cx={x} cy={y + 13} rx="6" ry="9" fill={colors[i % colors.length]} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Snow() {
  // Fixed positions so server and client render the same thing.
  const flakes = [
    [6, 12, 3], [14, 40, 2], [22, 8, 4], [31, 62, 2], [38, 22, 3], [47, 80, 2], [55, 14, 3], [61, 48, 2],
    [68, 6, 4], [74, 70, 2], [81, 30, 3], [88, 10, 2], [94, 56, 3], [10, 86, 2], [27, 92, 3], [52, 94, 2],
    [66, 88, 3], [85, 84, 2], [3, 54, 2], [44, 44, 2], [96, 30, 2], [18, 70, 3], [58, 66, 2], [78, 46, 2],
  ];
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
      {flakes.map(([x, y, r], i) => (
        <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="#fff" opacity={0.18 + (i % 4) * 0.08} />
      ))}
    </svg>
  );
}

export default function ChristmasGuidePage() {
  const days = daysUntil(`${CHRISTMAS_YEAR}-12-25`);
  const countdown =
    days > 1 ? `${days} sleeps until Christmas` : days === 1 ? "1 sleep until Christmas" : days === 0 ? "Merry Christmas!" : "See you next Christmas";
  const santaEvents = EVENTS.filter((e) => e.facets.type?.includes("santa"));
  const santaDinners = DINNERS.filter((d) => d.flags?.includes("santa"));

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
    about: [{ "@type": "Thing", name: "Christmas" }, { "@type": "Place", name: "Bangkok, Thailand" }],
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
    copyrightNotice: `© ${CHRISTMAS_YEAR} BKK Families (bkkfamilies.com)`,
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
      { "@type": "ListItem", position: 3, name: "Christmas in Bangkok with Kids", item: URL },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const eventLists = [
    itemListJsonLd(`Christmas dinners in Bangkok for families, ${CHRISTMAS_YEAR}`, DINNERS, OG_IMAGE),
    itemListJsonLd(`Christmas events in Bangkok for families, ${CHRISTMAS_YEAR}`, EVENTS, OG_IMAGE),
  ].filter(Boolean);

  return (
    <>
      {[articleJsonLd, breadcrumbJsonLd, faqJsonLd, ...eventLists, ...imagesJsonLd].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      {/* HERO */}
      <header className="relative overflow-hidden px-4 pb-14 pt-10 text-white md:pb-20" style={{ background: `linear-gradient(160deg, ${PINE} 0%, #0a2a20 70%)` }}>
        <Snow />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/60">
              <Link href="/" className="hover:text-[#f4b942]">Home</Link>
              <span className="mx-1.5">/</span>
              <Link href="/blog" className="hover:text-[#f4b942]">Blog</Link>
              <span className="mx-1.5">/</span>
              <span>Christmas in Bangkok</span>
            </nav>
            <p className="inline-block rounded-full bg-[#c62f3a] px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-white">
              Thursday 24 and Friday 25 December 2026
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight md:text-6xl">
              Christmas in Bangkok <span className="block italic text-[#f4b942]">2026, with kids</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              Santa in shorts, a mall tree the height of a small building and a turkey that won&rsquo;t fit in your condo oven. Here&rsquo;s
              every family Christmas dinner, Santa visit, light show and market in the city, with real prices, so you can book before
              the good tables go.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 font-heading text-lg font-bold text-[#f4b942]">
                {countdown}
              </span>
              <a href="#dinners" className="rounded-full bg-white px-5 py-2.5 font-semibold text-[#0f3b2e] transition hover:bg-white/90">
                Find a Christmas dinner
              </a>
              <a href="#santa" className="rounded-full border-2 border-white/70 px-5 py-2 font-semibold text-white transition hover:bg-white/10">
                Meet Santa
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
              className="h-auto w-full rotate-1 rounded-xl shadow-2xl ring-1 ring-white/10"
            />
            <figcaption className="mt-3 text-center text-xs text-white/60">
              Our one-page Christmas cheat sheet.{" "}
              <a href="#posters" className="underline hover:text-[#f4b942]">Download it and two more posters</a>.
            </figcaption>
          </figure>
        </div>
      </header>

      {/* JUMP TILES */}
      <nav aria-label="On this page" className="border-b border-black/5 bg-[#fdf8ef] px-4 py-5">
        <ul className="mx-auto grid max-w-6xl grid-cols-4 gap-2 sm:grid-cols-8">
          {JUMP.map((j) => (
            <li key={j.href}>
              <a
                href={j.href}
                className="flex h-full flex-col items-center gap-1 rounded-xl bg-white px-1 py-3 text-center text-xs font-bold text-[#0f3b2e] shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:ring-[#c62f3a]"
              >
                <span aria-hidden="true" className="text-2xl">{j.icon}</span>
                {j.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl px-4">
        {/* LAST YEAR NOTE */}
        <p className="mt-10 rounded-xl border-2 border-dashed border-[#f4b942] bg-[#fffaf0] px-5 py-4 text-[15px] leading-relaxed text-neutral-700">
          <b className="text-[#0f3b2e]">How this guide works:</b> every listing is what ran in {LAST_YEAR}, with {LAST_YEAR} prices, so you
          know what to expect and roughly what to budget. Bangkok&rsquo;s hotels and malls announce their {CHRISTMAS_YEAR} programmes in early
          to mid November, and we swap in the new details as they land. Anything already confirmed for {CHRISTMAS_YEAR} gets a green badge.
        </p>

        {/* QUICK FACTS */}
        <section className="py-12" aria-labelledby="when">
          <SectionHead id="when" eyebrow="The quick version" title="When is Christmas 2026 in Bangkok, and is it a holiday?" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">The big two days</p>
              <p className="mt-1 font-heading text-xl font-bold text-[#0f3b2e]">Thu 24 and Fri 25 Dec</p>
              <p className="mt-1 text-[15px] text-neutral-600">
                Christmas Day is <b>not</b> a public holiday in Thailand. Offices and banks open, so plenty of parents work.
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">School&rsquo;s out</p>
              <p className="mt-1 font-heading text-xl font-bold text-[#0f3b2e]">14 Dec to 12 Jan</p>
              <p className="mt-1 text-[15px] text-neutral-600">
                St Andrews breaks up first, Shrewsbury goes back last. Every school is on our{" "}
                <Link href="/school-breaks" className="font-semibold text-[#c62f3a] hover:underline">school holidays calendar</Link>.
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">The weather report</p>
              <p className="mt-1 font-heading text-xl font-bold text-[#0f3b2e]">The best of the year</p>
              <p className="mt-1 text-[15px] text-neutral-600">
                Cool season: blue skies, low 30s by day, lovely evenings. Smog can creep in, so see our{" "}
                <Link href="/blog/bangkok-smog-season-kids" className="font-semibold text-[#c62f3a] hover:underline">smog guide</Link>.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* DINNERS */}
      <section id="dinners" className="scroll-mt-20 bg-[#fdf8ef] px-4 py-14" aria-labelledby="dinners-h">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            id="dinners-h"
            eyebrow="Book it before November ends"
            title="Christmas dinner in Bangkok: 28 family dinners and brunches"
            intro="Every big hotel does a Christmas Eve dinner and a Christmas Day lunch or brunch, and the family-friendly ones sell out weeks ahead. Here's last year's line-up with real prices for grown-ups and kids, so you can shortlist now and book the moment 2026 menus go live."
          />

          <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DINNER_PICKS.map((p) => (
              <div key={p.award} className="relative overflow-hidden rounded-xl bg-[#0f3b2e] p-5 text-white shadow-sm">
                <span aria-hidden="true" className="absolute -right-3 -top-3 text-6xl opacity-15">🎄</span>
                <p className="text-xs font-bold uppercase tracking-widest text-[#f4b942]">{p.award}</p>
                <p className="mt-1 font-heading text-xl font-bold">{p.name}</p>
                <p className="mt-1 text-sm text-white/80">{p.detail}</p>
              </div>
            ))}
          </div>

          <div className="mb-6 flex flex-wrap gap-5 text-sm text-neutral-600">
            <span className="flex items-center gap-2"><Meter meter={DINNER_METER} level={1} theme="christmas" /> Under ฿2,000</span>
            <span className="flex items-center gap-2"><Meter meter={DINNER_METER} level={2} theme="christmas" /> ฿2,000 to ฿3,500</span>
            <span className="flex items-center gap-2"><Meter meter={DINNER_METER} level={3} theme="christmas" /> ฿3,500 and up, per adult</span>
          </div>

          <FestiveFinder
            items={DINNERS}
            groups={DINNER_GROUPS}
            toggles={DINNER_TOGGLES}
            meter={DINNER_METER}
            theme="christmas"
            label="Filter Christmas dinners"
            noun="Christmas dinners"
            empty="Nothing matches all of that. Try dropping a filter: Santa is a busy man."
            lastYear={LAST_YEAR}
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <h3 className="font-bold text-[#0f3b2e]">Book by the end of November</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">
                Early-bird deals of 10 to 15% ran until late November or mid December last year, and the family brunches filled first.
              </p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <h3 className="font-bold text-[#0f3b2e]">Lunch beats dinner with little ones</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">
                A Christmas Day brunch starts at a civilised hour, and you&rsquo;re home for a nap by three. A late Christmas Eve dinner with a
                three-year-old sounds lovely in October.
              </p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <h3 className="font-bold text-[#0f3b2e]">Decode the price</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">
                &ldquo;++&rdquo; means 10% service and 7% VAT on top, so ฿3,000++ is about ฿3,530. &ldquo;Net&rdquo; is the final price. Ask what
                age cut-offs apply and whether drinks are included.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Lights />

      <div className="mx-auto max-w-6xl px-4">
        {/* SANTA */}
        <section id="santa" className="scroll-mt-20 py-14" aria-labelledby="santa-h">
          <SectionHead
            id="santa-h"
            eyebrow="Ho ho ho"
            title="Where to meet Santa in Bangkok"
            intro="Santa keeps a busy Bangkok schedule, and almost all of it is free. Here's where he turned up last year. Mall times move, and some malls use a stand-in when the main man is booked, so check the mall's Facebook page the morning you go."
          />
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-[#c62f3a] p-6 text-white shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-white/70">At the malls and markets</p>
              <ul className="mt-3 divide-y divide-white/20">
                {santaEvents.map((e) => (
                  <li key={e.name} className="py-2.5">
                    <p className="font-bold">{e.venue.split(",")[0]}</p>
                    <p className="text-sm text-white/85">
                      {e.badges?.find((b) => b.tone === "santa")?.text ?? e.when}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#c62f3a]">At Christmas dinner</p>
              <ul className="mt-3 divide-y divide-black/10">
                {santaDinners.map((d) => (
                  <li key={d.name} className="py-2.5">
                    <p className="font-bold text-[#0f3b2e]">{d.venue.split(",")[0]}</p>
                    <p className="text-sm text-neutral-600">{d.name}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg bg-[#fdf8ef] px-4 py-3 text-sm text-neutral-700">
                <b>Toddler with a short fuse?</b> The weekend queues at the big malls can be long. The bazaars, Asiatique&rsquo;s evening slot and a
                Santa-at-dinner hotel are far gentler.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* TREE TRAIL */}
      <section id="trail" className="scroll-mt-20 relative overflow-hidden px-4 py-16 text-white" style={{ background: "#0a2a20" }} aria-labelledby="trail-h">
        <Snow />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#f4b942]">One evening, one BTS line</p>
          <h2 id="trail-h" className="mt-2 font-heading text-2xl font-bold md:text-3xl">The Bangkok Christmas tree trail</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/80">
            Bangkok&rsquo;s best Christmas lights sit along one stretch of the Sukhumvit BTS line. Start at Siam around 6pm, walk the skywalk,
            and finish with dinner at Phrom Phong. Go on a weekday to dodge the crowds.
          </p>
          <ol className="relative mt-10 grid gap-6 md:grid-cols-4">
            <div aria-hidden="true" className="absolute left-0 right-0 top-6 hidden h-4 rounded-full bg-[#2b2b2b] bg-[length:40px_3px] bg-center bg-repeat-x md:block" style={{ backgroundImage: "linear-gradient(90deg, #ffffff 0 20px, transparent 20px 40px)" }} />
            {TREE_TRAIL.map((s, i) => (
              <li key={s.stop} className="relative">
                <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#c62f3a] font-heading text-2xl font-bold ring-4 ring-[#0a2a20]">
                  {i + 1}
                </span>
                <p className="mt-3 font-heading text-xl font-bold">{s.stop}</p>
                <p className="text-xs font-bold uppercase tracking-wide text-[#f4b942]">{s.station}</p>
                <p className="mt-1 text-[15px] text-white/80">{s.what}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-white/70">
            Also worth the trip: <b className="text-white">ICONSIAM</b> on the river (free boat from BTS Saphan Taksin) and{" "}
            <b className="text-white">One Bangkok</b> at MRT Lumphini.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* EVENTS */}
        <section id="events" className="scroll-mt-20 py-14" aria-labelledby="events-h">
          <SectionHead
            id="events-h"
            eyebrow="What's on"
            title="Christmas events in Bangkok: lights, markets and shows"
            intro="Filter by what you fancy and when. Most of the mall displays run from mid November to early January, so there's no need to cram it all into Christmas week."
          />
          <FestiveFinder
            items={EVENTS}
            groups={EVENT_GROUPS}
            toggles={EVENT_TOGGLES}
            theme="christmas"
            label="Filter Christmas events"
            noun="events"
            empty="Nothing matches that. Try another week or type."
            lastYear={LAST_YEAR}
          />
          <p className="mt-6 rounded-lg bg-[#eef6f0] px-4 py-3 text-sm text-neutral-600">
            Last checked {fmt(CHECKED)}, against the organisers&rsquo; own posts from {LAST_YEAR}. Running a Christmas market or show for families? Email{" "}
            <a href="mailto:info@bkkfamilies.com" className="font-semibold text-[#c62f3a] hover:underline">info@bkkfamilies.com</a> and
            we&rsquo;ll add it.
          </p>
        </section>

        {/* CHURCH */}
        <section id="church" className="scroll-mt-20 grid gap-8 py-14 md:grid-cols-2" aria-labelledby="church-h">
          <SectionHead
            id="church-h"
            eyebrow="Silent night"
            title="English Christmas church services in Bangkok"
            intro="Christmas Eve services fill up well before they start, so arrive early if you want to sit together. Times change each year, so check the church's own page in December."
          />
          <ul className="divide-y divide-black/10 border-y border-black/10">
            {CHURCHES.map((c) => (
              <li key={c.name} className="py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-bold text-[#0f3b2e]">{c.name}</p>
                  <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-[#c62f3a]">{c.tag}</span>
                </div>
                <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{c.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Lights />

      <div className="mx-auto max-w-6xl px-4">
        {/* AT HOME */}
        <section id="home" className="scroll-mt-20 py-14" aria-labelledby="home-h">
          <SectionHead
            id="home-h"
            eyebrow="Christmas at the condo"
            title="Christmas at home in Bangkok: turkey, trees and tropical treats"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {HOME_IDEAS.map((h) => (
              <div key={h.title} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <h3 className="font-heading text-xl font-bold text-[#0f3b2e]">{h.title}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] text-neutral-700">
                  {h.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-heading text-xl font-bold text-[#0f3b2e]">Christmas movie night, by age</h3>
              <ul className="divide-y divide-black/10 border-y border-black/10">
                {MOVIES.map(([m, a]) => (
                  <li key={m} className="flex items-baseline justify-between gap-3 py-2.5">
                    <span className="font-semibold text-[#0f3b2e]">{m}</span>
                    <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-[#c62f3a]">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl bg-[#fdf8ef] p-5">
                <h3 className="font-heading text-xl font-bold text-[#0f3b2e]">Christmas Day ideas</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] text-neutral-700">
                  <li><b>Presents and the pool.</b> Christmas morning is quiet, because half your neighbours are at work.</li>
                  <li><b>Snow, sort of.</b> Snow Town at Dream World is the nearest white Christmas without a flight.</li>
                  <li><b>A morning in Lumpini.</b> Paddle boats on a cool December morning. See our <Link href="/blog/9-things-to-do-in-bangkok-with-kids" className="font-semibold text-[#c62f3a] hover:underline">things to do with kids</Link>.</li>
                  <li><b>Get out of town.</b> Khao Yai nights are properly chilly. Book early; hotels are fullest between Christmas and New Year.</li>
                </ul>
              </div>
              <div className="rounded-xl border-2 border-[#c62f3a]/30 p-5">
                <h3 className="font-heading text-xl font-bold text-[#0f3b2e]">Don&rsquo;t forget the people who help you</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">
                  If you employ a nanny or housekeeper, a year-end bonus is widely expected. We paid ours an extra month&rsquo;s salary, a common
                  arrangement among expat families. Many families also give an envelope to the building&rsquo;s security team and a card for
                  teachers. Our <Link href="/blog/how-to-find-a-nanny-in-bangkok" className="font-semibold text-[#c62f3a] hover:underline">nanny guide</Link> covers pay and bonuses.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-8 rounded-xl bg-[#eef6f0] px-5 py-4 text-[15px] text-neutral-700">
            <b className="text-[#0f3b2e]">Three weeks of winter break to fill?</b> Our <Link href="/camps" className="font-semibold text-[#c62f3a] hover:underline">holiday camps directory</Link> lists
            December and January camps with real prices. And for 31 December, see our{" "}
            <Link href="/blog/new-years-eve-in-bangkok-with-kids" className="font-semibold text-[#c62f3a] hover:underline">New Year&rsquo;s Eve with kids guide</Link>.
          </p>
        </section>

        {/* POSTERS */}
        <section id="posters" className="scroll-mt-20 py-14" aria-labelledby="posters-h">
          <SectionHead
            id="posters-h"
            eyebrow="Save it, share it, stick it on the fridge"
            title="Christmas in Bangkok 2026 posters"
            intro="Three free Christmas in Bangkok posters: a one-page cheat sheet, a square post with all 28 family Christmas dinners, and a story with every place to meet Santa. Share them in your class chat, condo LINE group or anywhere Bangkok parents gather, with a credit to BKK Families. Tap a poster for the full-size version."
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
                    <span className="block font-heading text-lg font-bold text-[#0f3b2e]">{p.title}</span>
                    <span className="block text-sm text-neutral-600">{p.use}</span>
                  </span>
                  <a
                    href={`${IMG_DIR}/${p.file}.jpg`}
                    download={`${p.file}.jpg`}
                    aria-label={`Download ${p.title} poster`}
                    className="shrink-0 rounded-full bg-[#c62f3a] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
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
          <SectionHead id="faq-h" eyebrow="Quick answers" title="Christmas in Bangkok FAQ" />
          <div className="max-w-3xl space-y-3">
            {FAQ.map((f) => (
              <details key={f.question} className="group rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-heading text-lg font-bold text-[#0f3b2e]">{f.question}</summary>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#c62f3a] px-6 py-8 text-white md:flex-row md:items-center md:px-10">
            <div>
              <p className="font-heading text-2xl font-bold">Running a Christmas event or dinner for families?</p>
              <p className="mt-1 text-white/85">Send us the details and we&rsquo;ll add it. We update this guide every few days through December.</p>
            </div>
            <a href="mailto:info@bkkfamilies.com" className="shrink-0 rounded-full bg-white px-6 py-3 font-semibold text-[#c62f3a] transition hover:opacity-90">
              info@bkkfamilies.com
            </a>
          </div>
          <p className="mt-6 text-[15px] text-neutral-700">
            Tell us your family&rsquo;s favourite Bangkok Christmas tradition in the{" "}
            <a href="https://www.facebook.com/groups/395501457186828" target="_blank" rel="noreferrer" className="font-semibold text-[#c62f3a] hover:underline">
              Bangkok Expat Families
            </a>{" "}
            group. The best ones go into next year&rsquo;s guide. Merry Christmas!
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
