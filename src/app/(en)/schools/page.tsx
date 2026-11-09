import type { Metadata } from "next";
import { og } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import SchoolDirectory from "@/components/ui/SchoolDirectory";
import { SCHOOLS } from "@/lib/schools";
import { SITE } from "@/lib/seo";
import Link from "next/link";
import { EARLY_YEARS_PATH } from "@/lib/earlyYears";

export const metadata: Metadata = {
  alternates: { canonical: "/schools" },
  title: "International Schools in Bangkok",
  description:
    `Browse ${SCHOOLS.length} international schools in Bangkok by location, curriculum and budget, with fees read from each school's own 2026/27 schedule where it publishes one.`,
  openGraph: og({
    title: "International Schools in Bangkok",
    description:
      `Browse ${SCHOOLS.length} international schools in Bangkok by location, curriculum and budget, with fees read from each school's own 2026/27 schedule where it publishes one.`,
    path: "/schools",
  }),
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Schools", item: `${SITE}/schools` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "International schools in Bangkok",
    numberOfItems: SCHOOLS.length,
    itemListElement: SCHOOLS.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${SITE}/schools/${s.slug}`,
    })),
  },
];

export default function SchoolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Find the right fit"
        title="International Schools in Bangkok"
        subtitle="Searching for schools in Bangkok is daunting. Filter by location, curriculum and budget to narrow it down fast."
        color="teal"
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-neutral-600">
          We list a school as international if it is licensed by OPEC (Thailand&apos;s Office
          of the Private Education Commission) as an international school, or if it is
          accredited by an OPEC-recognised body such as CIS, WASC, NEASC or COBIS. Bilingual
          and English Program schools that teach the Thai national curriculum are not
          included. The few schools we list that don&apos;t fully meet this standard say so
          on their page.
        </p>
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-neutral-700">
          Looking for a younger child? See our guide to{" "}
          <Link href={EARLY_YEARS_PATH} className="font-semibold text-teal hover:underline">
            international kindergartens and nurseries in Bangkok
          </Link>
          , with early years fees side by side. Want a British education? Our{" "}
          <Link href="/schools/british-curriculum-schools-bangkok" className="font-semibold text-teal hover:underline">
            British curriculum schools in Bangkok
          </Link>{" "}
          guide compares Year 1 fees.
        </p>
        <SchoolDirectory />
      </div>
    </>
  );
}
