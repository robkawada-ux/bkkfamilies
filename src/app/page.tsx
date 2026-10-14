import type { Metadata } from "next";
import { og } from "@/lib/seo";
import Link from "next/link";
import StatCard from "@/components/ui/StatCard";
import ArticleCard from "@/components/ui/ArticleCard";
import { listedArticles, isFeatured } from "@/lib/articles";
import { HALLOWEEN_PATH, daysToHalloween, isHalloweenSeason } from "@/lib/halloween";
import { daysUntil, inWindow } from "@/lib/festive";
import {
  CHRISTMAS_PATH,
  CHRISTMAS_YEAR,
  PROMO_FROM as XMAS_FROM,
  PROMO_UNTIL as XMAS_UNTIL,
} from "@/lib/christmas";
import { NYE_PATH, NYE_YEAR, PROMO_FROM as NYE_FROM, PROMO_UNTIL as NYE_UNTIL } from "@/lib/nye";
import { SCHOOLS } from "@/lib/schools";
import { TopBanner, SidebarSlot } from "@/components/ui/AdSlot";
import { StatRoads, Roundabout } from "@/components/ui/Road";

// Re-render hourly so booked banners start and end on their dates.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "BKK Families: Schools, Healthcare and Family Life in Bangkok" },
  alternates: { canonical: "/" },
  openGraph: og({
    title: "BKK Families: Schools, Healthcare and Family Life in Bangkok",
    description:
      "Schools, activities, and healthcare resources for families in Bangkok, backed by a community of nearly 40,000 members.",
    path: "/",
  }),
};

export default function HomePage() {
  // Seasonal pieces published early stay off the homepage until featureFrom.
  const latest = listedArticles().filter((a) => isFeatured(a)).slice(0, 6);
  // Seasonal box in the hero; switches itself off after 1 November.
  const halloween = isHalloweenSeason();
  const sleeps = daysToHalloween();
  // Christmas from 2 November, then New Year's Eve from 26 December.
  const christmas = !halloween && inWindow(XMAS_FROM, XMAS_UNTIL);
  const newYear = !halloween && !christmas && inWindow(NYE_FROM, NYE_UNTIL);
  const seasonal = halloween || christmas || newYear;
  const xmasSleeps = daysUntil(`${CHRISTMAS_YEAR}-12-25`);
  const nyeSleeps = daysUntil(`${NYE_YEAR}-12-31`);

  return (
    <>
      {/* HERO */}
      <section className="bg-orange px-4 py-20 text-white md:py-28">
        <div
          className={`mx-auto max-w-6xl ${
            seasonal ? "grid items-center gap-10 lg:grid-cols-[1fr_340px]" : ""
          }`}
        >
          <div>
          <p className="mb-3 text-base font-extrabold uppercase tracking-widest text-white">
            Your Bangkok Roadmap
          </p>
          <h1 className="max-w-2xl font-heading text-4xl font-bold leading-tight md:text-6xl">
            The community every Bangkok family finds eventually.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            Nearly 40,000 expat and Thai families sharing what actually works:
            schools, activities, healthcare, and everything in between.
            Community since 2012.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/schools"
              className="rounded-full bg-white px-6 py-3 font-semibold text-orange transition hover:bg-white/90"
            >
              Browse Schools
            </Link>
            <a
              href="https://www.facebook.com/groups/395501457186828"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Join the Facebook Group
            </a>
          </div>
          </div>

          {halloween && (
            <Link
              href={HALLOWEEN_PATH}
              className="group relative block overflow-hidden rounded-2xl bg-purple-dark p-7 text-white shadow-2xl ring-1 ring-black/10 transition hover:-translate-y-1"
            >
              {/* Bats and moon, decorative */}
              <svg aria-hidden="true" viewBox="0 0 340 120" className="pointer-events-none absolute inset-x-0 top-0 h-28 w-full opacity-90">
                <circle cx="290" cy="38" r="22" fill="#FEF3E8" />
                <circle cx="281" cy="32" r="22" fill="#3D1E5C" />
                <path fill="#120a1c" d="M190 58c5-5 8-5 11 0 2-3 4-3 6 0 3-5 6-5 11 0-5 1-7 3-9 6-1-2-3-2-5 0-2-2-4-2-5 0-2-3-4-5-9-6Z" />
                <path fill="#120a1c" d="M120 18c4-4 6-4 8 0 1-2 3-2 4 0 2-4 4-4 8 0-4 1-5 2-6 5-1-2-2-2-4 0-1-2-3-2-4 0-1-3-3-4-6-5Z" />
              </svg>
              <div className="relative">
                <span className="inline-block rounded-full bg-orange px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-purple-dark">
                  Halloween 2026
                </span>
                <div className="mt-12 flex items-end gap-3">
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-14 w-14 shrink-0 transition group-hover:rotate-6">
                    <path fill="#F4831F" d="M10 4.2c-.4-1.4.2-2.6 1.6-3l.5 1c-.8.3-1.1.9-.9 1.8 2.9-.9 6.8 1.3 6.8 6.6 0 4.4-3 7.4-8 7.4s-8-3-8-7.4c0-5.3 3.9-7.5 6.8-6.6Z" />
                    <path fill="#3D1E5C" d="M6.2 9.2 8 10.4H5.6ZM13.8 9.2l.6 1.2H12ZM6 13c1.2 1 2.6 1.4 4 1.4s2.8-.4 4-1.4l-1 .2-.6.6-.8-.6-.8.6-.8-.6-.8.6-.6-.6Z" />
                  </svg>
                  <p className="font-heading text-2xl font-bold leading-tight">
                    What to do in Bangkok for Halloween with kids
                  </p>
                </div>
                <p className="mt-3 text-sm text-white/80">
                  28 family events rated by fright level, plus trick-or-treat spots, costumes and spooky treats.
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  {sleeps >= 0 && (
                    <span className="font-heading text-lg font-bold text-orange">
                      {sleeps === 0 ? "It's tonight!" : `${sleeps} ${sleeps === 1 ? "sleep" : "sleeps"} to go`}
                    </span>
                  )}
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-purple-dark transition group-hover:bg-orange group-hover:text-white">
                    See the guide →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {christmas && (
            <Link
              href={CHRISTMAS_PATH}
              className="group relative block overflow-hidden rounded-2xl bg-[#0f3b2e] p-7 text-white shadow-2xl ring-1 ring-black/10 transition hover:-translate-y-1"
            >
              {/* Fairy lights, decorative */}
              <svg aria-hidden="true" viewBox="0 0 340 60" className="pointer-events-none absolute inset-x-0 top-0 h-14 w-full">
                <path d="M0 4 Q 85 30 170 4 T 340 4" fill="none" stroke="#06180f" strokeWidth="2" />
                {[20, 55, 90, 125, 160, 195, 230, 265, 300, 330].map((x, i) => {
                  const y = 4 + 22 * Math.sin(((x % 170) / 170) * Math.PI);
                  return <ellipse key={x} cx={x} cy={y + 9} rx="5" ry="7" fill={["#c62f3a", "#f4b942", "#3EC1D3", "#8DC63F"][i % 4]} />;
                })}
              </svg>
              <div className="relative">
                <span className="mt-8 inline-block rounded-full bg-[#c62f3a] px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white">
                  Christmas 2026
                </span>
                <p className="mt-4 font-heading text-2xl font-bold leading-tight">Christmas in Bangkok with kids</p>
                <p className="mt-3 text-sm text-white/80">
                  28 family Christmas dinners with prices, where to meet Santa, the best lights and markets.
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  {xmasSleeps >= 0 && (
                    <span className="font-heading text-lg font-bold text-[#f4b942]">
                      {xmasSleeps === 0 ? "Merry Christmas!" : `${xmasSleeps} ${xmasSleeps === 1 ? "sleep" : "sleeps"} to go`}
                    </span>
                  )}
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f3b2e] transition group-hover:bg-[#c62f3a] group-hover:text-white">
                    See the guide →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {newYear && (
            <Link
              href={NYE_PATH}
              className="group relative block overflow-hidden rounded-2xl bg-[#141b44] p-7 text-white shadow-2xl ring-1 ring-black/10 transition hover:-translate-y-1"
            >
              <div className="relative">
                <span className="inline-block rounded-full bg-[#f5c451] px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#141b44]">
                  New Year&rsquo;s Eve 2026
                </span>
                <p className="mt-4 font-heading text-2xl font-bold leading-tight">New Year&rsquo;s Eve in Bangkok with kids</p>
                <p className="mt-3 text-sm text-white/80">
                  Every countdown rated by crowd level, family dinners, fireworks cruises and the 8pm midnight trick.
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  {nyeSleeps >= 0 && (
                    <span className="font-heading text-lg font-bold text-[#f5c451]">
                      {nyeSleeps === 0 ? "It's tonight!" : `${nyeSleeps} ${nyeSleeps === 1 ? "sleep" : "sleeps"} to go`}
                    </span>
                  )}
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#141b44] transition group-hover:bg-[#f5c451]">
                    See the guide →
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto -mt-10 max-w-6xl px-4">
        <div className="relative">
          <StatRoads />
        <div className="relative z-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard value="Nearly 40K" label="Facebook Members" color="green" />
          <StatCard value="+120/wk" label="New Members" color="teal" />
          <StatCard value="5+/day" label="New Posts" color="purple" />
          <StatCard value="14 yrs" label="Community Since 2012" color="orange" />
        </div>
        </div>
      </section>

      {/* TOP BANNER (paid slot, see lib/ads.ts) */}
      <section className="mx-auto mt-10 max-w-6xl px-4">
        <TopBanner />
      </section>

      {/* COMMUNITY BUILDS TRUST */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-purple-dark">
              Community Builds Trust
            </h2>
            <p className="mt-4 text-neutral-700">
              Being a parent in Thailand can be an extraordinary experience
              filled with trials and tribulations. We're a community built
              around resources on education, family activities, and
              healthcare, helping minimize the headaches while maximizing
              the positive experience of raising a family in Bangkok.
            </p>
            <p className="mt-4 text-neutral-700">
              We started as a Facebook group for parents comparing
              homeschooling and school options. Since then we've grown into
              the largest, longest-running expat family community in the
              city.
            </p>
          </div>
          <div className="relative">
          <Roundabout />
          <div className="relative z-10 grid grid-cols-2 gap-4 md:auto-rows-fr md:gap-10">
            <Link
              href="/schools"
              className="rounded-xl bg-teal p-6 text-white transition hover:opacity-90"
            >
              <h3 className="font-heading text-xl font-bold">Schools</h3>
              <p className="mt-1 text-sm text-white/90">
                {SCHOOLS.length} international schools, with verified fees
                where schools publish them.
              </p>
            </Link>
            <Link
              href="/activities"
              className="rounded-xl bg-green p-6 text-white transition hover:opacity-90"
            >
              <h3 className="font-heading text-xl font-bold">Activities</h3>
              <p className="mt-1 text-sm text-white/90">
                Things to do with kids, from playgrounds to theme parks.
              </p>
            </Link>
            <Link
              href="/healthcare"
              className="rounded-xl bg-purple p-6 text-white transition hover:opacity-90"
            >
              <h3 className="font-heading text-xl font-bold">
                Healthcare
              </h3>
              <p className="mt-1 text-sm text-white/90">
                Hospitals, maternity, dentists and health insurance.
              </p>
            </Link>
            <Link
              href="/camps"
              className="rounded-xl bg-orange p-6 text-white transition hover:opacity-90"
            >
              <h3 className="font-heading text-xl font-bold">Camps</h3>
              <p className="mt-1 text-sm text-white/90">
                Holiday camps with real dates, ages and prices.
              </p>
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="bg-neutral-50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-heading text-3xl font-bold text-purple-dark">
              From the Blog
            </h2>
            <Link href="/blog" className="text-sm font-semibold text-orange">
              View all →
            </Link>
          </div>
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_300px]">
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {latest.map((a, i) => (
                // Six articles fill the column beside the sidebar on wide
                // screens; where the column is a single stack, show three.
                <div
                  key={a.slug}
                  className={i < 3 ? "flex" : "hidden md:flex lg:hidden xl:flex"}
                >
                  <ArticleCard article={a} />
                </div>
              ))}
            </div>
            {/* SIDEBAR (paid slots, see lib/ads.ts) */}
            <aside aria-label="Featured" className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:content-start">
              <SidebarSlot slot="home-sidebar-top" />
              <SidebarSlot slot="home-sidebar-middle" />
              <SidebarSlot slot="home-sidebar-bottom" />
            </aside>
          </div>
        </div>
      </section>

      {/* ADVERTISE CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-2xl bg-purple px-8 py-12 text-center text-white">
          <h2 className="font-heading text-3xl font-bold">
            Reach Nearly 40,000 Bangkok Families
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Pinned posts and the cover banner in the group, plus banners on
            the site, always clearly labelled. We will help you find the right fit.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-orange px-8 py-3 font-semibold text-white transition hover:opacity-90"
          >
            See Advertising Options
          </Link>
        </div>
      </section>
    </>
  );
}
