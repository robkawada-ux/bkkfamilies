import type { Metadata } from "next";
import { og } from "@/lib/seo";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import PlaygroupsDirectory from "@/components/ui/PlaygroupsDirectory";
import { PLAYGROUPS } from "@/lib/playgroups";

const TITLE = "Playgroups in Bangkok";
const DESCRIPTION =
  "Every baby and toddler playgroup we can find in Bangkok, with days, times, ages and prices checked against the organisers' own pages. Filter by day, age, area and language.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.bkkfamilies.com/playgroups" },
  openGraph: og({ title: TITLE, description: DESCRIPTION, path: "/playgroups" }),
};

const SITE = "https://www.bkkfamilies.com";

const CONFIRMED = PLAYGROUPS.filter((p) => p.status === "confirmed").length;

const FAQ = [
  {
    q: "How much does a playgroup cost in Bangkok?",
    a: "Most drop-in playgroups cost between 200 and 500 baht a session, usually per family or per child with one adult. A few school playgroups are free, BAMBI members pay 150 to 300 baht, and specialist sessions such as forest school or music classes run from about 1,000 to 1,250 baht. Termly programmes like Harrow's Lion Cubs are priced per year and are a different thing altogether.",
  },
  {
    q: "What is BAMBI and do I need to join?",
    a: "BAMBI (Bangkok Mothers and Babies International) is a volunteer-run parents' association that organises around ten weekly, fortnightly and monthly playgroups around the city and negotiates member discounts at school playgroups. You do not need to join to attend, but membership cuts roughly a third off every BAMBI session and gets you into free pop-up playgroups, so it pays for itself quickly if you go weekly.",
  },
  {
    q: "Can my nanny take my child to a playgroup?",
    a: "Often, but not everywhere. Shrewsbury's playgroups require a parent or grandparent and do not admit nannies alone, and several BAMBI venues allow only one adult per family. Where a playgroup has a rule like this we note it on its page.",
  },
  {
    q: "What age can my baby start a playgroup?",
    a: "Several playgroups take babies from birth, including Ascot's Little Lion, St Andrews' Little Bunnies, Kira Kira and the Christ Church group, and a handful start at six or eight months. Most are aimed at one to three year olds. For three to fives the choice thins out: Bangkok Prep's Big Pups, Firefly Forest's Saturday Explorers, Wycombe Abbey's Little Doves and the Neilson Hays Saturday story time are the main options.",
  },
  {
    q: "Are there playgroups at weekends?",
    a: "Yes, though far fewer than on weekdays. Use the Weekend option in the Day filter. Bangkok Prep, Kids Kingdom Ruamrudee, Annabel's, HEI's Music Club, Firefly Forest and Kids' Academy Ekkamai all run Saturday sessions, and BAMBI holds one Saturday playgroup a month.",
  },
  {
    q: "Do playgroups run during school holidays and bad air days?",
    a: "Most school-run playgroups follow the school term and stop for holidays, so check around October half term, Christmas, Songkran and the long summer break. BAMBI automatically cancels its playgroups between December and March when PM2.5 pollution passes its air quality threshold.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Playgroups", item: `${SITE}/playgroups` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Playgroups in Bangkok",
    numberOfItems: PLAYGROUPS.length,
    itemListElement: PLAYGROUPS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${SITE}/playgroups/${p.slug}`,
    })),
  },
];

export default function PlaygroupsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Babies and toddlers"
        title="Playgroups in Bangkok"
        subtitle={`${PLAYGROUPS.length} playgroups across the city, with real days, times, ages and prices. ${CONFIRMED} confirmed for this term on the organisers' own pages.`}
        color="teal"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            Bangkok is not an easy city to be outside with a toddler. It is hot,
            it rains, the pavements are an obstacle course, and for half the
            year the air is not great either. So playgroups carry more weight
            here than they would at home. They are where babies meet other
            babies, where new parents meet each other, and very often where a
            family first sees inside the school their child ends up at.
          </p>
          <p>
            The trouble is that the information is scattered. Schools bury
            their playgroups in admissions pages, BAMBI&rsquo;s calendar lives
            on a separate booking site, and most listings online are a year or
            two out of date. We went through them one by one. Filter by the day
            you are free, the age of your child and the part of town you live
            in, and every card shows when it runs, who it is for and what it
            costs.
          </p>
          <p>
            Anything marked <strong>Confirmed this term</strong> we read on the
            organiser&rsquo;s own current page or BAMBI&rsquo;s live calendar.
            Anything marked <strong>Check before going</strong> is a playgroup
            that runs, but whose latest published details are older or come
            from another listing, so message them first. Nobody pays to be
            listed.
          </p>
        </div>

        <div id="directory" className="mt-12 scroll-mt-28">
          <PlaygroupsDirectory />
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-teal-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Using a playgroup to choose a school?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            A school playgroup is the cheapest, lowest-pressure way to see an
            Early Years department from the inside, meet the teachers and talk
            to parents who are already there. Our schools directory covers
            fees, curricula and age ranges for more than a hundred Bangkok
            international schools.
          </p>
          <Link
            href="/schools"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Browse the schools directory
          </Link>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Questions parents ask
          </h2>
          <div className="mt-6 space-y-4">
            {FAQ.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <h3 className="font-heading font-bold text-purple-dark">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Run a playgroup, or spotted one we have missed?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Playgroups change every term. If your times or prices have changed,
            your playgroup is missing, or something here is wrong, tell us and
            we will fix it. Listing is free and always will be.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Send us a correction
          </Link>
        </div>
      </div>
    </>
  );
}
