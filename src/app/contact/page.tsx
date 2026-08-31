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

        {/* Advertising opportunities */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Advertising Opportunities
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            Our community is close-knit and high-spending-power. Reach
            40,000+ family decision-makers through Facebook and homepage
            placements, or a sponsored review.
          </p>

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

          <p className="mt-10 text-sm text-neutral-500">
            Have something more specific in mind? Email{" "}
            <a href="mailto:info@bkkfamilies.com" className="font-semibold text-orange">
              info@bkkfamilies.com
            </a>{" "}
            and we'll put together a custom package.
          </p>
        </div>
      </div>
    </>
  );
}
