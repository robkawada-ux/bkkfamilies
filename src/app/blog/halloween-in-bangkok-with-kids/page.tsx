import type { Metadata } from "next";
import Link from "next/link";
import { og, SITE } from "@/lib/seo";
import HalloweenEventFinder, { FrightMeter } from "@/components/ui/HalloweenEventFinder";
import {
  CHECKED,
  EVENTS,
  FAQ,
  HALLOWEEN_IMG_DIR,
  HALLOWEEN_PATH,
  HALLOWEEN_POSTERS as POSTERS,
  HALLOWEEN_SHARE_IMAGE,
  daysToHalloween,
} from "@/lib/halloween";

// Re-render hourly so the countdown stays right.
export const revalidate = 3600;

const TITLE = "Halloween in Bangkok 2026 with Kids: 28 Family Events";
const DESCRIPTION =
  "Halloween 2026 in Bangkok with kids: 28 family events rated by fright level, plus trick-or-treat spots, costume shops, spooky treats and parent tips.";
const IMG_DIR = HALLOWEEN_IMG_DIR;
const OG_IMAGE = `${SITE}${HALLOWEEN_SHARE_IMAGE}`;
const URL = `${SITE}${HALLOWEEN_PATH}`;
const PUBLISHED = "2026-10-14T09:00:00+07:00";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "halloween bangkok",
    "halloween in bangkok 2026",
    "halloween events bangkok kids",
    "trick or treat bangkok",
    "halloween costumes bangkok",
    "haunted house bangkok",
    "halloween bangkok family",
  ],
  alternates: { canonical: HALLOWEEN_PATH },
  openGraph: {
    ...og({ title: TITLE, description: DESCRIPTION, path: HALLOWEEN_PATH, type: "article", image: OG_IMAGE }),
    publishedTime: PUBLISHED,
  } as Metadata["openGraph"],
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: "Halloween in Bangkok 2026 family guide: 28 events rated by fright level" }],
  },
};

const AGES = [
  { who: "Toddlers and preschool", title: "Little pumpkins", picks: ["Neilson Hays Library Halloween Story Time", "Wild Spooky Rumpus at theCOMMONS Thonglor", "Wicked Hallow balloon village, The Mall Tha Phra"] },
  { who: "Ages 5 to 9", title: "Little monsters", picks: ["Bambini Villa Little Wizards Halloween Academy", "Chocolate Ville Spooky Town after dark", "EM District Spooky Parade on 31 Oct"] },
  { who: "Ages 10 to 12", title: "Brave-ish", picks: ["PlayED Halloween sleepover with campfire and movie", "Wonder Woods Haunted Wonder maze", "Kensington Learning Space Midnight Museum"] },
  { who: "Teens", title: "Bring it on", picks: ["MEGA Bangna Haunted University (13+)", "The Ghost Halloween at The Mall Bangkapi (12+)", "Siam Halloween street festival, Siam Square"] },
];

const COSTUMES = [
  { name: "Ri-Tah-Rae Costume Shop", href: "https://www.facebook.com/RitahRaeCostumeShop/", tag: "Sukhumvit 50", text: "Homemade kids' costumes, fairy tales and animals, plus custom orders. About 300 m from BTS On Nut exit 2. Tel 02-715-9945, LINE @ritahrae." },
  { name: "Petit Mask", href: "https://www.facebook.com/petitmask", tag: "Order online", text: "Classic, well-made children's costumes by two Bangkok designer mums. Pumpkins, owls, pirates and more." },
  { name: "Cinderella Fancy", href: "https://www.facebook.com/cinderellafancy", tag: "2,000+ styles", text: "Matching family sets and every witch and wizard variation imaginable." },
  { name: "Alex Costume", href: "https://www.facebook.com/AlexCosPratunam/", tag: "Rental", text: "Three branches (Pratunam, Thonburi, Sukhumvit 101). Ask for photos of current stock." },
  { name: "Enjoy Suite and Dreambox", href: "https://www.facebook.com/enjoysuite", tag: "Rental", text: "Hundreds of movie and game character rentals, plus designer-made oddities." },
  { name: "Platinum Fashion Mall", href: "https://www.facebook.com/ThePlatinumFashionMallBangkok", tag: "Pratunam", text: "The last-minute lifesaver. The 5th floor has costume and party shops, and the accessories floors sell hats, wigs and capes cheaply." },
  { name: "Godmami", href: "https://www.facebook.com/godmamimakeup", tag: "Face paint", text: "Gentle kids' makeup and glue-free glitter, handy for sensitive skin." },
];

const DECOR = [
  { name: "Sampeng Lane, Chinatown", tag: "Wholesale", text: "The bargain motherlode near Ratchawong Pier: cobwebs, fake pumpkins, wigs, capes, plastic fangs and costumes by the bag. Roy Raan at 100 Sampeng Lane is a good first stop." },
  { name: "Daiso, Terminal 21 Asok", tag: "LG floor", text: "Cheap small decorations that fit a condo balcony." },
  { name: "Viva Loco", href: "https://www.facebook.com/VivaLocoThailand/", tag: "Terminal 21, Samyan", text: "Party accessories and novelty props. Terminal 21 Asok 3F and Samyan Mitrtown 1F." },
  { name: "Ju No Craft", href: "https://www.facebook.com/Junocraftbkk/", tag: "Craft supplies", text: "Door wreaths, pumpkins for outside the door and hanging decorations." },
  { name: "Pahurat, Little India", tag: "Next to Chinatown", text: "Fabric and trims for homemade costumes, plus kids' Thai costumes if someone wants to go as a Rama V-era aristocrat." },
];

const TREATS = [
  { name: "Krispy Kreme x Looney Tunes", href: "https://www.facebook.com/krispykremethailandfanpage", tag: "6 to 31 Oct", text: "Character doughnuts (Bugs, Tweety and Sylvester, Lola, Taz) at participating stores." },
  { name: "It Happened (A Pink Rabbit + Bob)", href: "https://www.facebook.com/pinkrabbitandbob", tag: "฿490 for 5", text: "Cute Halloween doughnuts. Pre-order on LINE @itshappened, pick up at It Happened Silom from Mon 26 Oct to Sun 1 Nov." },
  { name: "Drop By Dough", href: "https://www.facebook.com/dropbydough", tag: "4 flavours", text: "Mummy, monster and pumpkin sourdough doughnuts. Sukhumvit 101/2, CentralWorld, Lumpini Park, or Grab and LINE MAN." },
  { name: "Dropdead Gingerbread", href: "https://www.facebook.com/DropdeadGingerbread", tag: "฿1,000 a set", text: "Spooky Set or Autumn Pumpkin Set of 12, or a DIY decorating box with icing and sprinkles (the best rainy-afternoon activity on this page)." },
  { name: "Butter, InterContinental Bangkok", href: "https://bangkok.intercontinental.com/special-offers-and-experiences/butter-sweetens-halloween-this-october", tag: "26 to 31 Oct", text: "Monster chocolate and vampire red velvet cookies, plus a Midnight Haunted Chocolate Cake." },
  { name: "Kanom Indy", href: "https://www.facebook.com/indykanomthai", tag: "Order by 25 Oct", text: "Thai alua sweets in ghost and pumpkin shapes, from ฿90 a box of six. Great for class parties." },
  { name: "Krawan Allure Homemade", href: "https://lin.ee/bGC1hsZ", tag: "฿390 a set", text: "Handmade alua sweets: a Spooky Cat set, and a Horror set for teens with strong stomachs. Order 2 to 3 days ahead, free shipping." },
  { name: "Le Cherine", href: "https://www.facebook.com/lecherine.cake", tag: "All branches", text: "Haunted macarons in four Halloween flavours, also on Grab and LINE MAN." },
  { name: "Villa Market delivery", href: "https://villamarket.onelink.me/wYZf/azm3xez9", tag: "Code TREATS26", text: "Trick-or-treat bags without the supermarket trip. Free regular delivery on selected Halloween sweets with a ฿1,500 minimum, until 31 Oct." },
];

const GHOSTS = [
  { thai: "แม่นาค · Mae Nak", title: "The loyal ghost wife", text: "Bangkok's most famous ghost story. Nak waited faithfully in Phra Khanong for her husband to come home from war, even after she had died. Her shrine at Wat Mahabut, near On Nut, still gets visitors and gifts of dresses and toys.", scare: "Sad more than scary" },
  { thai: "กระสือ · Krasue", title: "The floating head", text: "A head that drifts about at night with its glowing insides dangling underneath. Yes, really. Kids think this is the best one. Parents may prefer to describe it after dinner.", scare: "Delightfully gross" },
  { thai: "นางตานี · Nang Tani", title: "The banana tree spirit", text: "A gentle lady spirit who lives in wild banana trees. When you see colourful cloth tied around a big old tree, that's a sign of respect for the spirit living there.", scare: "Mostly polite" },
  { thai: "ศาลพระภูมิ · San Phra Phum", title: "The spirit houses", text: "The little houses outside nearly every building give the land's guardian spirit its own home, so it doesn't move into yours. Look for offerings of garlands, fruit and red fizzy drinks with a straw in.", scare: "Zero, very cosy" },
  { thai: "ผีกองกอย · Phi Kong Koi", title: "The one-legged hopper", text: "A forest ghost who hops along on one leg. Perfect for a Halloween party game: everyone hops, last one standing wins.", scare: "Exhausting" },
  { thai: "A note on manners", title: "Respect the real ones", text: "Many Thai friends and nannies take spirits seriously. Keep costumes and props away from spirit houses and shrines, and don't touch the offerings, however tempting the strawberry soda looks.", scare: "Auntie disapproval" },
];

const TIPS = [
  { title: "Dress for 32 °C", text: "Your child will insist on the full-body dinosaur suit. Put a thin T-shirt and shorts underneath so the head can come off by 4pm, pack a fan and a spare top, and set low expectations for the face paint." },
  { title: "Have a rain plan", text: "Late October can still bring a proper downpour. Mall events are the safe bet. For outdoor parties, a cheap poncho over the costume beats a soggy witch." },
  { title: "Book the ride home early", text: "Halloween is a Saturday night, and every vampire on Sukhumvit will open Grab at exactly the same moment. Leave before the costume contest results, or take the BTS." },
  { title: "Bring mosquito spray", text: "Dusk events in gardens and markets mean mosquitoes. Spray everyone before the costumes go on, not after." },
  { title: "Sign the Candy Treaty", text: "Agree before you leave the house: a fixed number of sweets tonight, the rest go in the tin. Negotiations reopen on Sunday." },
  { title: "Check the scare level", text: "The big mall haunted houses (MEGA Bangna, The Mall Bangkapi, The Mall Bangkae) are built for teens and adults. Little ones are happier at balloon villages and storytimes." },
];

const MEALS = [
  { name: "The Haunted Feast, Avani Ratchada", href: "https://www.avanihotels.com/en/ratchada-bangkok/offers/halloween-dinner", tag: "29 to 31 Oct", text: "Halloween dinner at One Ratchada. Costumes encouraged." },
  { name: "Halloween Feast, Bangkok Marriott Sukhumvit", href: "https://megatix.in.th/events/halloween-feast-at-bangkok-marriott-hotel-sukhumvit", tag: "31 Oct", text: "A dinner-first Halloween night in a dressed-up dining room." },
  { name: "25 Degrees burger bar", href: "https://megatix.in.th/events/halloween-to-house-no-25", tag: "30 to 31 Oct", text: "Skull-bun burger and a pumpkin-chocolate shake. On Halloween night, 5pm to 10pm: free face painting, live portraits and lucky draws." },
  { name: "Movies Under the Stars, Innside by Meliá", href: "https://www.ticketmelon.com/sipwarehouse/movies-halloween-2026", tag: "31 Oct", text: "Open-air Halloween screening on Sukhumvit. Check the film before bringing younger kids." },
];

const GROWNUPS = [
  { name: "W Brunch, Halloween Edition", href: "https://megatix.in.th/events/w-does-brunch-halloween-edition", tag: "31 Oct", text: "Costumed daytime brunch at W Bangkok." },
  { name: "Beer Republic", href: "https://www.beerrepublicbkk.com/halloween", tag: "29 to 31 Oct", text: "Craft beer, bat wings and a charcoal-bun zombie burger." },
  { name: "Burning City Bangkok", href: "https://www.ticketmelon.com/burningcitybangkok/burningcitybkk-2026", tag: "30 to 31 Oct", text: "The city-wide party crawl, for parents who still remember what midnight looks like." },
  { name: "Ghost Circle at Cloud 11", href: "https://www.ticketmelon.com/thecommons-cloud11/ghost-circle", tag: "31 Oct", text: "A talk with Thai horror director Banjong Pisanthanakun about making ghost films. Great with a horror-loving teen." },
];

const MOVIES = [
  ["It's the Great Pumpkin, Charlie Brown", "All ages"],
  ["Room on the Broom", "2+"],
  ["Hotel Transylvania", "5+"],
  ["Coco", "6+"],
  ["The Nightmare Before Christmas", "7+"],
  ["Monster House", "8+"],
  ["Coraline", "9+"],
  ["Pee Mak (Thai horror-comedy retelling of Mae Nak)", "13+"],
];

type Row = { name: string; href?: string; tag: string; text: string };

function RowList({ rows }: { rows: Row[] }) {
  return (
    <ul className="divide-y divide-black/10 border-y border-black/10">
      {rows.map((r) => (
        <li key={r.name} className="py-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-bold text-purple-dark">
              {r.href ? (
                <a href={r.href} target="_blank" rel="noopener" className="hover:text-orange hover:underline">
                  {r.name}
                </a>
              ) : (
                r.name
              )}
            </p>
            <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-orange">{r.tag}</span>
          </div>
          <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{r.text}</p>
        </li>
      ))}
    </ul>
  );
}

function SectionHead({ eyebrow, title, intro, id }: { eyebrow: string; title: string; intro?: string; id?: string }) {
  return (
    <div className="mb-6 max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-widest text-orange">{eyebrow}</p>
      <h2 id={id} className="mt-2 font-heading text-2xl font-bold text-purple-dark md:text-3xl">
        {title}
      </h2>
      {intro && <p className="mt-3 leading-relaxed text-neutral-700">{intro}</p>}
    </div>
  );
}

function RoadDivider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto my-2 h-5 max-w-6xl rounded-full bg-[#2b2b2b] bg-[length:50px_3px] bg-center bg-repeat-x"
      style={{ backgroundImage: "linear-gradient(90deg, #ffffff 0 26px, transparent 26px 50px)" }}
    />
  );
}

export default function HalloweenGuidePage() {
  const days = daysToHalloween();
  const countdown =
    days > 1 ? `${days} sleeps until Halloween` : days === 1 ? "1 sleep until Halloween" : days === 0 ? "Halloween is today" : "See you next Halloween";

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
    about: [{ "@type": "Thing", name: "Halloween" }, { "@type": "Place", name: "Bangkok, Thailand" }],
  };
  const imagesJsonLd = POSTERS.map((p) => ({
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
    representativeOfPage: p === POSTERS[0],
    creator: { "@type": "Organization", name: "BKK Families", url: SITE },
    creditText: "BKK Families",
    copyrightNotice: "© 2026 BKK Families (bkkfamilies.com)",
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
      { "@type": "ListItem", position: 3, name: "Halloween in Bangkok with Kids", item: URL },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const eventsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Halloween events in Bangkok for families, 2026",
    itemListElement: EVENTS.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: e.name,
        description: e.blurb,
        startDate: e.start,
        endDate: e.end,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: e.venue.split(",")[0],
          address: { "@type": "PostalAddress", streetAddress: e.venue, addressLocality: "Bangkok", addressCountry: "TH" },
        },
        ...(e.link ? { url: e.link } : {}),
        ...(e.free ? { isAccessibleForFree: true } : {}),
      },
    })),
  };

  return (
    <>
      {[articleJsonLd, breadcrumbJsonLd, faqJsonLd, eventsJsonLd, ...imagesJsonLd].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      {/* HERO */}
      <header className="relative overflow-hidden bg-purple-dark px-4 pb-14 pt-10 text-white md:pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/60">
              <Link href="/" className="hover:text-orange">Home</Link>
              <span className="mx-1.5">/</span>
              <Link href="/blog" className="hover:text-orange">Blog</Link>
              <span className="mx-1.5">/</span>
              <span>Halloween in Bangkok</span>
            </nav>
            <p className="inline-block rounded-full bg-orange px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-purple-dark">
              Saturday 31 October 2026
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight md:text-6xl">
              Halloween in Bangkok <span className="block italic text-orange">2026, with kids</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              Every haunted house, mall parade, trick-or-treat trail, costume shop and spooky snack in the city, sorted by your
              kids&rsquo; ages and by how much screaming you can personally handle.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 font-heading text-lg font-bold text-orange">
                {countdown}
              </span>
              <a href="#events" className="rounded-full bg-white px-5 py-2.5 font-semibold text-purple-dark transition hover:bg-white/90">
                Find an event
              </a>
            </div>
            <p className="mt-6 text-sm text-white/60">
              by BKK Families · Updated{" "}
              {new Date(CHECKED).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}
            </p>
          </div>
          <figure className="mx-auto w-full max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${IMG_DIR}/${POSTERS[0].file}.webp`}
              alt={POSTERS[0].alt}
              width={1080}
              height={1350}
              fetchPriority="high"
              className="h-auto w-full rounded-xl shadow-2xl ring-1 ring-white/10"
            />
            <figcaption className="mt-2 text-center text-xs text-white/60">
              Our one-page Halloween 2026 cheat sheet.{" "}
              <a href="#posters" className="underline hover:text-orange">Download it and two more posters</a>.
            </figcaption>
          </figure>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4">
        {/* QUICK FACTS */}
        <section className="py-14" aria-labelledby="when">
          <SectionHead
            id="when"
            eyebrow="The quick version"
            title="When is Halloween 2026 in Bangkok? Saturday 31 October"
            intro="Translation: the whole weekend is Halloween, and so is the one before it. Most of the city's big family events cluster on Friday 30 October to Sunday 1 November, with the mall displays running all month."
          />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">The big weekend</p>
              <p className="mt-1 font-heading text-xl font-bold text-purple-dark">Fri 30 Oct to Sun 1 Nov</p>
              <p className="mt-1 text-[15px] text-neutral-600">Parties, parades and haunted houses everywhere. Book the ticketed kids&rsquo; events now.</p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Bonus long weekend</p>
              <p className="mt-1 font-heading text-xl font-bold text-purple-dark">Fri 23 to Sun 25 Oct</p>
              <p className="mt-1 text-[15px] text-neutral-600">
                Chulalongkorn Day is Friday 23 October. Check your school&rsquo;s October break on our{" "}
                <Link href="/school-breaks" className="font-semibold text-orange hover:underline">school holidays calendar</Link>.
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">The weather report</p>
              <p className="mt-1 font-heading text-xl font-bold text-purple-dark">Hot, maybe wet</p>
              <p className="mt-1 text-[15px] text-neutral-600">
                Expect low 30s °C and the odd late-rainy-season downpour. See the{" "}
                <a href="#tips" className="font-semibold text-orange hover:underline">survival tips</a>.
              </p>
            </div>
          </div>
        </section>
      </div>

      <RoadDivider />

      <div className="mx-auto max-w-6xl px-4">
        {/* BY AGE */}
        <section className="py-14" aria-labelledby="by-age">
          <SectionHead
            id="by-age"
            eyebrow="Short on time? Pick your monster"
            title="Best Halloween events in Bangkok by age"
          />
          <p className="-mt-3 mb-6 max-w-2xl leading-relaxed text-neutral-700">
            Our top three for each age group. Full details are in the event finder below, and if the kids are off school that week, our{" "}
            <Link href="/camps" className="font-semibold text-orange hover:underline">October break camps</Link> list has more to fill the days.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AGES.map((a) => (
              <div key={a.title} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-orange">{a.who}</p>
                <h3 className="mt-1 font-heading text-xl font-bold text-purple-dark">{a.title}</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-neutral-700">
                  {a.picks.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* EVENTS */}
        <section id="events" className="scroll-mt-20 py-14" aria-labelledby="events-h">
          <SectionHead
            id="events-h"
            eyebrow="Event finder: what's on, and how scary is it?"
            title="Halloween events in Bangkok for kids and teens"
            intro="Filter by day and by who's coming. Every listing gets a fright rating, so nobody gets dragged into a haunted doll factory by accident."
          />
          <div className="mb-6 flex flex-wrap gap-5 text-sm text-neutral-600">
            <span className="flex items-center gap-2"><FrightMeter level={1} /> Giggle: toddler safe</span>
            <span className="flex items-center gap-2"><FrightMeter level={2} /> Shiver: spooky but fun</span>
            <span className="flex items-center gap-2"><FrightMeter level={3} /> Scream: teens only</span>
          </div>
          <HalloweenEventFinder events={EVENTS} />
          <p className="mt-6 rounded-lg bg-purple-50 px-4 py-3 text-sm text-neutral-600">
            Listings checked against organisers&rsquo; own posts on{" "}
            {new Date(CHECKED).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}. Dates and prices do
            change, so confirm with the venue before you load everyone into a Grab.
          </p>
        </section>

        {/* TRICK OR TREAT */}
        <section className="grid gap-8 py-14 md:grid-cols-2" aria-labelledby="tot">
          <SectionHead
            id="tot"
            eyebrow="The big question"
            title="Can you trick-or-treat in Bangkok?"
            intro="Yes, just not door to door down the soi. Bangkok trick-or-treating happens in four places."
          />
          <div>
            <RowList
              rows={[
                { name: "Your condo building", tag: "Ask juristic", text: "Many expat-heavy condos run a floor-by-floor trail. Ask the juristic office or check the building LINE group. Participating doors usually get a pumpkin sign." },
                { name: "Moo baan housing estates", tag: "Gate light on", text: "Gated villages with lots of international families often organise a route and a meeting time. Neighbours with sweets leave the gate light on." },
                { name: "Organised trails", tag: "2026", text: "Carroll Prep's party trick-or-treats around Bon Marché market, Little Pea runs trick-or-treat trains at theCOMMONS, and Bambini Villa has a trail on site." },
                { name: "School events", tag: "PTA fairs", text: "Most international schools hold a Halloween day or PTA fair. Bangkok Prep's FOBP Spooktacular is on Friday 30 October." },
              ]}
            />
            <p className="mt-4 rounded-lg bg-orange-50 px-4 py-3 text-sm text-neutral-700">
              Is your building or village doing trick-or-treat? Post it in the{" "}
              <a href="https://www.facebook.com/groups/395501457186828" target="_blank" rel="noreferrer" className="font-semibold text-orange hover:underline">
                Bangkok Expat Families
              </a>{" "}
              Facebook group so other families can find a friendly floor.
            </p>
          </div>
        </section>
      </div>

      <RoadDivider />

      <div className="mx-auto max-w-6xl px-4">
        {/* COSTUMES */}
        <section className="py-14" aria-labelledby="costumes">
          <SectionHead
            id="costumes"
            eyebrow="Dress up"
            title="Where to buy Halloween costumes and decorations in Bangkok"
            intro="Bangkok can costume anything, from a shop-bought witch hat to a full rented superhero suit. Shop details carry over from previous seasons, so message before you trek across town."
          />
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-heading text-xl font-bold text-purple-dark">Buy or rent a costume</h3>
              <RowList rows={COSTUMES} />
            </div>
            <div>
              <h3 className="mb-3 font-heading text-xl font-bold text-purple-dark">Decorate the condo</h3>
              <RowList rows={DECOR} />
            </div>
          </div>
        </section>

        {/* TREATS */}
        <section className="py-14" aria-labelledby="treats">
          <SectionHead
            id="treats"
            eyebrow="Treats worth the sugar crash"
            title="Halloween treats, cakes and doughnuts in Bangkok"
            intro="Bangkok bakeries go all in for October. Most of these are pre-order and sell out, so order a week ahead."
          />
          <div className="grid gap-x-10 md:grid-cols-2">
            <RowList rows={TREATS.slice(0, 5)} />
            <RowList rows={TREATS.slice(5)} />
          </div>
        </section>
      </div>

      {/* THAI GHOSTS */}
      <section className="bg-purple-dark px-4 py-16 text-white" aria-labelledby="ghosts">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-orange">Only in Thailand</p>
          <h2 id="ghosts" className="mt-2 font-heading text-2xl font-bold md:text-3xl">Thai ghosts for kids: Mae Nak, Krasue and friends</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/80">
            Thailand has a whole cast of its own spirits, and kids who have lived here a while will already know a few. Here&rsquo;s a friendly
            introduction for the dinner table.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GHOSTS.map((g) => (
              <div key={g.title} className="rounded-xl bg-white/[0.07] p-5 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-orange">{g.thai}</p>
                <h3 className="mt-1 font-heading text-xl font-bold">{g.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">{g.text}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-white/50">Scare level: {g.scare}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* AT HOME */}
        <section className="py-14" aria-labelledby="home">
          <SectionHead
            id="home"
            eyebrow="Staying in"
            title="Halloween party ideas at home in Bangkok"
            intro="For the rainy-night plan, the condo party, or the year everyone has a cold."
          />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-purple-dark">Party games</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] text-neutral-700">
                <li><b>Mummy wrap race.</b> Teams wrap one player in toilet paper. Fastest full mummy wins.</li>
                <li><b>Phi Kong Koi hop-off.</b> Hop on one leg like the forest ghost. Last one hopping wins.</li>
                <li><b>Glow-stick ghost hunt.</b> Hide glow sticks around the darkened condo. Most found wins.</li>
                <li><b>Pass the pumpkin.</b> Musical pass-the-parcel with a sweet in every layer.</li>
                <li><b>Freeze, zombie!</b> Dance until the music stops, then hold your scariest pose.</li>
              </ol>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-purple-dark">Tropical spooky snacks</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] text-neutral-700">
                <li><b>Lychee eyeballs.</b> Peeled lychees with a blueberry or raisin pushed into the hole. Deeply upsetting, very popular.</li>
                <li><b>Rambutan monsters.</b> Add two candy eyes to an unpeeled rambutan. Instant hairy beast.</li>
                <li><b>Dragon fruit brains.</b> Scoop out red dragon fruit and serve it in the skin with a spoon.</li>
                <li><b>Mandarin pumpkins.</b> Peel a som and stick a sliver of cucumber on top as the stalk.</li>
                <li><b>Banana ghosts.</b> Half a banana, two chocolate chips. Nang Tani would approve.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-purple-dark">The pumpkin problem</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
                Imported orange carving pumpkins turn up at Villa and Tops in October, priced like a small luxury. Thai pumpkins (fak thong) are rock
                hard and will laugh at your knife.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] text-neutral-700">
                <li><b>Paint, don&rsquo;t carve</b> the fak thong. Acrylics and googly eyes work well.</li>
                <li><b>Carve a watermelon</b> or a pomelo instead. Softer, cheaper, and you eat the leftovers.</li>
                <li><b>Use LED tea lights,</b> not candles, near curtains and small hands.</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 max-w-xl">
            <h3 className="mb-3 font-heading text-xl font-bold text-purple-dark">Halloween movie night, by age</h3>
            <ul className="divide-y divide-black/10 border-y border-black/10">
              {MOVIES.map(([m, a]) => (
                <li key={m} className="flex items-baseline justify-between gap-3 py-2.5">
                  <span className="font-semibold text-purple-dark">{m}</span>
                  <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-orange">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <RoadDivider />

      <div className="mx-auto max-w-6xl px-4">
        {/* TIPS */}
        <section id="tips" className="scroll-mt-20 py-14" aria-labelledby="tips-h">
          <SectionHead id="tips-h" eyebrow="The parents' survival guide" title="Tips for Halloween in Bangkok with kids" />
          <div className="grid gap-4 md:grid-cols-2">
            {TIPS.map((t) => (
              <div key={t.title} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-purple-dark">{t.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{t.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-heading text-xl font-bold text-purple-dark">Family Halloween dinners in Bangkok</h3>
              <RowList rows={MEALS} />
            </div>
            <div>
              <h3 className="mb-3 font-heading text-xl font-bold text-purple-dark">Halloween parties for parents (grandparents, nannies, assemble)</h3>
              <RowList rows={GROWNUPS} />
            </div>
          </div>
        </section>

        {/* POSTERS */}
        <section id="posters" className="scroll-mt-20 py-14" aria-labelledby="posters-h">
          <SectionHead
            id="posters-h"
            eyebrow="Save it, share it, stick it on the fridge"
            title="Halloween in Bangkok 2026 posters"
            intro="Three free Halloween in Bangkok posters for 2026: a one-page cheat sheet, a square post with all 28 family events by fright level, and a story with the best Halloween events by age. Share them in your class chat, condo LINE group or anywhere Bangkok parents gather, with a credit to BKK Families. Tap a poster for the full-size version."
          />
          <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POSTERS.map((p) => (
              <figure key={p.file} className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
                <a href={`${IMG_DIR}/${p.file}.jpg`} target="_blank" rel="noopener" title={`${p.title} (full size)`} className="block overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${IMG_DIR}/${p.file}.webp`}
                    alt={p.alt}
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full transition hover:scale-[1.02]"
                  />
                </a>
                <figcaption className="mt-3 flex items-center justify-between gap-3">
                  <span>
                    <span className="block font-heading text-lg font-bold text-purple-dark">{p.title}</span>
                    <span className="block text-sm text-neutral-600">{p.use}</span>
                  </span>
                  <a
                    href={`${IMG_DIR}/${p.file}.jpg`}
                    download={`${p.file}.jpg`}
                    aria-label={`Download ${p.title} poster`}
                    className="shrink-0 rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Download
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14" aria-labelledby="faq">
          <SectionHead id="faq" eyebrow="Quick answers" title="Halloween in Bangkok FAQ" />
          <div className="max-w-3xl space-y-3">
            {FAQ.map((f) => (
              <details key={f.question} className="group rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-heading text-lg font-bold text-purple-dark">{f.question}</summary>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-orange px-6 py-8 text-purple-dark md:flex-row md:items-center md:px-10">
            <div>
              <p className="font-heading text-2xl font-bold">Running a Halloween event for families?</p>
              <p className="mt-1 text-purple-dark/80">Send us the details and we&rsquo;ll add it to this guide. We update it every few days until 1 November.</p>
            </div>
            <a href="mailto:info@bkkfamilies.com" className="shrink-0 rounded-full bg-purple-dark px-6 py-3 font-semibold text-white transition hover:opacity-90">
              info@bkkfamilies.com
            </a>
          </div>
          <p className="mt-10 text-sm font-extrabold uppercase tracking-widest text-purple-dark">Your Bangkok Roadmap</p>
          <p className="mt-1 text-sm text-neutral-500">Next up on the family calendar: Loy Krathong on Tuesday 24 November 2026.</p>
          <div className="mt-8 border-t border-black/10 pt-6">
            <Link href="/blog" className="text-sm font-semibold text-orange">← Back to Blog</Link>
          </div>
        </section>
      </div>
    </>
  );
}
