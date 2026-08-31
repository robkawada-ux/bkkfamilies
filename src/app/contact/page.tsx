import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact & Advertising",
  description:
    "Get in touch with BKK Families, or explore advertising opportunities to reach our 40,000+ member community.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Find the right solution for you"
        title="Contact Us"
        subtitle="We're happy to customize an advertising package that suits your needs."
        color="purple"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="mailto:info@bkkfamilies.com"
            className="rounded-xl bg-teal p-6 text-center text-white transition hover:opacity-90"
          >
            <p className="text-xs uppercase tracking-wide text-white/80">Email</p>
            <p className="mt-1 font-heading text-lg font-bold">
              info@bkkfamilies.com
            </p>
          </a>
          <a
            href="tel:021365038"
            className="rounded-xl bg-orange p-6 text-center text-white transition hover:opacity-90"
          >
            <p className="text-xs uppercase tracking-wide text-white/80">Phone</p>
            <p className="mt-1 font-heading text-lg font-bold">02-136-5038</p>
          </a>
          <a
            href="https://www.facebook.com/groups/395501457186828"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-green p-6 text-center text-white transition hover:opacity-90"
          >
            <p className="text-xs uppercase tracking-wide text-white/80">Facebook</p>
            <p className="mt-1 font-heading text-lg font-bold">
              Bangkok Expat Families
            </p>
          </a>
        </div>

        {/* Why advertise */}
        <div className="mt-20">
          <p className="text-xs font-bold uppercase tracking-wide text-orange">
            Advertise With Us
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-purple-dark md:text-4xl">
            Get in front of 40,000+ families who are already spending on
            exactly what you sell.
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-neutral-600">
            Bangkok Expat Families is the largest and longest-running
            community of its kind in the city, expat and Thai households
            together, built around the decisions every parent has to make:
            which school, which doctor, which activities, which insurance.
            When our members are researching those decisions, they're
            asking us first.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-purple p-6 text-white">
              <p className="font-heading text-3xl font-bold">40,000+</p>
              <p className="mt-1 text-sm text-white/80">
                Members, growing by roughly 120 new families every week
              </p>
            </div>
            <div className="rounded-xl bg-teal p-6 text-white">
              <p className="font-heading text-3xl font-bold">80%</p>
              <p className="mt-1 text-sm text-white/80">
                Have children under 10, the exact window when school,
                healthcare, and family spending decisions are made
              </p>
            </div>
            <div className="rounded-xl bg-green p-6 text-white">
              <p className="font-heading text-3xl font-bold">14 yrs</p>
              <p className="mt-1 text-sm text-white/80">
                Of trust built in this community since 2012, not a paid
                audience you're renting for a month
              </p>
            </div>
          </div>
        </div>

        {/* Who it's perfect for */}
        <div className="mt-20">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Built for the businesses families actually search for
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">
                Schools
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Every week, parents in our group ask which school to
                choose, whether a specific campus is worth the fees, and
                who has a spot open mid-year. Your school can be the
                answer they see first, not the fifth search result they
                click through to find you.
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">
                Medical Clinics &amp; Health Insurance
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Families relocating to Bangkok need a pediatrician, a
                dentist, and a health insurance plan almost immediately,
                and they trust recommendations from other parents far more
                than an ad on Google. That trust is exactly what this
                community runs on.
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">
                Family Services &amp; Beyond
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Tutors, activity centers, real estate agents, movers,
                photographers, restaurants that welcome kids. If a family
                relocating to or living in Bangkok needs it, our members
                are asking each other for a recommendation right now.
              </p>
            </div>
          </div>
        </div>

        {/* How to reach them */}
        <div className="mt-20">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            How You Can Reach Them
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">
                Facebook Advertising
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                <li>✓ Top banner placement (sole ownership, not a rotating carousel)</li>
                <li>✓ Pinned post placements</li>
              </ul>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">
                Homepage Placement
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                <li>✓ Top banner (sole ownership)</li>
                <li>✓ Sidebar placements (top, middle, or bottom)</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-black/5 bg-white p-6 shadow-sm sm:max-w-md">
            <h3 className="font-heading text-lg font-bold text-purple-dark">
              Reviews Package
            </h3>
            <ul className="mt-3 space-y-1 text-sm text-neutral-600">
              <li>✓ On-site visit</li>
              <li>✓ Writer's review</li>
              <li>✓ Blog post with your URL</li>
              <li>✓ Facebook pinned post</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-2xl bg-purple-dark px-8 py-12 text-center text-white">
          <h2 className="font-heading text-3xl font-bold">
            Let's put your business in front of Bangkok's families.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Tell us a bit about what you offer, and we'll put together a
            package that actually fits your goals and budget.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:info@bkkfamilies.com"
              className="rounded-full bg-orange px-8 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Email info@bkkfamilies.com
            </a>
            <a
              href="https://line.me/ti/p/~bachsuites"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-purple-dark"
            >
              Add us on LINE: bachsuites
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
