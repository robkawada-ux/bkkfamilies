import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact & Advertising",
  description:
    "Get in touch with BKK Families, or explore advertising opportunities to reach our 40,000+ member community.",
};

const FB_RATES = [
  { name: "Top Banner (sole ownership, not carousel)", biannual: "70,000 THB", monthly: "15,000 THB" },
  { name: "Pinned Post (2-day pin, stays after; min. 2 posts)", biannual: "—", monthly: "2,900 THB/post" },
];

const HOMEPAGE_RATES = [
  { name: "Top Banner (sole ownership)", annual: "50,000 THB", monthly: "6,000 THB" },
  { name: "Sidebar Top", annual: "30,000 THB", monthly: "3,600 THB" },
  { name: "Sidebar Middle", annual: "25,000 THB", monthly: "3,000 THB" },
  { name: "Sidebar Bottom", annual: "19,000 THB", monthly: "2,500 THB" },
];

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

        {/* Advertising rates */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Advertising Opportunities
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            Our community is close-knit and high-spending-power. Reach
            40,000+ family decision-makers through Facebook, homepage
            placements, sponsored reviews, and group emails.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <RateTable
              title="Facebook Advertising"
              cols={["Placement", "Bi-Annually", "Monthly"]}
              rows={FB_RATES.map((r) => [r.name, r.biannual, r.monthly])}
            />
            <RateTable
              title="Homepage Placement"
              cols={["Placement", "Annually", "Monthly"]}
              rows={HOMEPAGE_RATES.map((r) => [r.name, r.annual, r.monthly])}
            />
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">
                Reviews Package
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                <li>✓ On-site visit</li>
                <li>✓ Writer's review</li>
                <li>✓ Blog post with your URL</li>
                <li>✓ Facebook pinned post</li>
                <li>✓ Email blast</li>
              </ul>
              <p className="mt-4 font-heading text-2xl font-bold text-orange">
                20,900 THB
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">
                Group Emails
              </h3>
              <p className="mt-3 text-sm text-neutral-600">
                Direct-to-inbox campaigns for events, open houses, or brand
                news. Max 4 emails/month.
              </p>
              <p className="mt-4 font-heading text-2xl font-bold text-orange">
                9,900 THB{" "}
                <span className="text-sm font-normal text-neutral-500">
                  /email
                </span>
              </p>
              <p className="text-sm text-neutral-500">
                or 31,900 THB for a 4-email bundle
              </p>
            </div>
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

function RateTable({
  title,
  cols,
  rows,
}: {
  title: string;
  cols: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/5 shadow-sm">
      <div className="bg-purple-dark px-5 py-3">
        <h3 className="font-heading text-base font-bold text-white">{title}</h3>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-neutral-50 text-left text-neutral-500">
            {cols.map((c) => (
              <th key={c} className="px-4 py-2 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-black/5">
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-neutral-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
