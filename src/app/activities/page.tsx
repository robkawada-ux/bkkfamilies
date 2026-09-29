import type { Metadata } from "next";
import { og } from "@/lib/seo";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import ActivitiesDirectory from "@/components/ui/ActivitiesDirectory";
import { ACTIVITIES } from "@/lib/activities";

const TITLE = "Things to Do With Kids in Bangkok";
const DESCRIPTION =
  "Days out and weekly classes for kids in Bangkok, from indoor playgrounds, aquariums and museums to swimming, football and dance, with real hours, ages and prices. Filter for indoor options on rainy or smoggy days.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.bkkfamilies.com/activities" },
  openGraph: og({ title: TITLE, description: DESCRIPTION, path: "/activities" }),
};

const SITE = "https://www.bkkfamilies.com";

const DAYS_OUT = ACTIVITIES.filter((a) => a.type === "Day out").length;
const CLASSES = ACTIVITIES.filter((a) => a.type === "Weekly class").length;

const FAQ = [
  {
    q: "What can I do with kids in Bangkok when it rains?",
    a: "Tick \"Indoors only\" in the directory above. Bangkok's malls carry most of the load: HarborLand, Playmondo and MELAND for big indoor play, SEA LIFE under Siam Paragon, trampolines at BOUNCE, and hands-on science at WOW Park. The same list works on smoggy days between December and March, and on the hottest afternoons in April and May.",
  },
  {
    q: "What is free to do with kids in Bangkok?",
    a: "Set the price filter to Free. The parks (Lumpini, with its free children's library, and Benjakitti), the Royal Thai Air Force Museum, BACC, MOCA for under 15s and the weekend markets are all free, and Museum Siam has historically let under 15s in free. The two Children's Discovery Museums are free too, but both closed on 1 October 2026 while the city appoints a new operator.",
  },
  {
    q: "Is KidZania Bangkok still open?",
    a: "No. KidZania Bangkok at Siam Paragon has closed permanently. MELAND, a large indoor theme park with a role-play town, opened on the 5th floor of Siam Paragon and is the nearest thing to it.",
  },
  {
    q: "How much does an indoor playground cost in Bangkok?",
    a: "Roughly 200 to 800 baht per child, usually for two or three hours, with adults paying a smaller fee or nothing. Smaller kids' cafes and neighbourhood play centres sit at the bottom of that range, and the big mall playgrounds like MEGA HarborLand, Playmondo CentralWorld and MELAND sit at the top.",
  },
  {
    q: "How do weekly classes work in Bangkok?",
    a: "Most swim schools, gymnastics clubs and football academies sell a term or a block of sessions rather than single classes, typically 6,000 to 11,000 baht for a term of swimming. Many offer a free or cheap trial class first, which is always worth asking for. Classes usually pause for school holidays and often run holiday camps instead; see our camps directory for those.",
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
      { "@type": "ListItem", position: 2, name: "Activities", item: `${SITE}/activities` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Things to do with kids in Bangkok",
    numberOfItems: ACTIVITIES.length,
    itemListElement: ACTIVITIES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.name,
      url: `${SITE}/activities/${a.slug}`,
    })),
  },
];

const ALSO = [
  {
    href: "/playgroups",
    title: "Playgroups",
    desc: "Baby and toddler groups by day, age and area.",
  },
  {
    href: "/camps",
    title: "Holiday camps",
    desc: "Camp weeks filtered by the dates your child is off school.",
  },
  {
    href: "/blog/top-museums-for-kids-in-bangkok",
    title: "Museums for kids",
    desc: "What is open, what it costs and what is closed right now.",
  },
  {
    href: "/blog/9-things-to-do-in-bangkok-with-kids",
    title: "9 things we loved",
    desc: "Our own family favourites, with honest tips.",
  },
];

export default function ActivitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Days out and weekly classes"
        title="Things to Do With Kids in Bangkok"
        subtitle={`${DAYS_OUT} days out and ${CLASSES} weekly classes, with real hours, ages and prices. Filter for indoors when the weather turns.`}
        color="green"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            Every Bangkok parent knows the Saturday morning question: it is 34
            degrees, it might rain, and the kids are already bouncing off the
            walls. So what now? This is the list we wish we had when ours were
            small. Days out for when you want a plan, weekly classes for when
            you want a routine, and an indoors filter for the days the weather
            or the air decides for you.
          </p>
          <p>
            Every card shows the ages, the price and the part of town. Where a
            place is closed right now we say so rather than quietly dropping
            it, and where a price is not published we say that too, rather
            than guessing. Prices change often in Bangkok, especially at the
            big attractions, so treat them as a guide and check before you go.
            Nobody pays to be listed.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ALSO.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl border border-black/5 bg-teal-50 p-4 transition hover:shadow-md"
            >
              <p className="font-heading font-bold text-purple-dark">{l.title}</p>
              <p className="mt-1 text-sm text-neutral-600">{l.desc}</p>
            </Link>
          ))}
        </div>

        <div id="directory" className="mt-12 scroll-mt-28">
          <ActivitiesDirectory />
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
            Run an activity, or know one we have missed?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            If your hours or prices have changed, your venue or class is
            missing, or something here is wrong, tell us and we will fix it.
            Listing is free and always will be.
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
