import type { Metadata } from "next";
import { og } from "@/lib/seo";
import Link from "next/link";
import StatCard from "@/components/ui/StatCard";
import ArticleCard from "@/components/ui/ArticleCard";
import { ARTICLES } from "@/lib/articles";
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
      "Schools, activities, and healthcare resources for families in Bangkok, backed by a 40,000+ member community.",
    path: "/",
  }),
};

export default function HomePage() {
  const latest = ARTICLES.slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="bg-orange px-4 py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-base font-extrabold uppercase tracking-widest text-white">
            Your Bangkok Roadmap
          </p>
          <h1 className="max-w-2xl font-heading text-4xl font-bold leading-tight md:text-6xl">
            The community every Bangkok family finds eventually.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            40,000+ expat and Thai families sharing what actually works:
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
      </section>

      {/* STATS */}
      <section className="mx-auto -mt-10 max-w-6xl px-4">
        <div className="relative">
          <StatRoads />
        <div className="relative z-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard value="40,000+" label="Facebook Members" color="green" />
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
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {latest.map((a) => (
                <ArticleCard key={a.slug} article={a} />
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
            Reach 40,000+ Bangkok Families
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Banner placements, sponsored features, and Facebook promotion,
            always clearly labelled. We will help you find the right fit.
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
