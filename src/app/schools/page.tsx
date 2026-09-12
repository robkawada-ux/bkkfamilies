import type { Metadata } from "next";
import { og } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import SchoolDirectory from "@/components/ui/SchoolDirectory";

export const metadata: Metadata = {
  alternates: { canonical: "/schools" },
  title: "International Schools in Bangkok",
  description:
    "Browse 50+ international schools in Bangkok, filterable by curriculum and budget.",
  openGraph: og({
    title: "International Schools in Bangkok",
    description:
      "Browse 50+ international schools in Bangkok, filterable by curriculum and budget.",
    path: "/schools",
  }),
};

export default function SchoolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Find the right fit"
        title="International Schools in Bangkok"
        subtitle="Searching for schools in Bangkok is daunting — filter by curriculum and budget to narrow it down fast."
        color="teal"
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <SchoolDirectory />
      </div>
    </>
  );
}
