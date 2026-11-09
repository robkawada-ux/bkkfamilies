import type { Metadata } from "next";
import Link from "next/link";
import { og } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";

const SITE = "https://www.bkkfamilies.com";
const PATH = "/healthcare/emergency-numbers";
const PDF = "/downloads/bkk-families-emergency-card.pdf";
const CHECKED = "9 November 2026";
const CHECKED_ISO = "2026-11-09";

const TITLE = "Thailand & Bangkok Emergency Numbers (2026)";
const DESCRIPTION =
  "Every emergency number in Thailand on one page: 1669 ambulance, 191 police, 199 fire, 1155 English-speaking tourist police, plus Bangkok private hospital ambulance lines. Free printable card for your fridge and wallet.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}${PATH}` },
  openGraph: og({ title: TITLE, description: DESCRIPTION, path: PATH, type: "article" }),
};

const MAIN = [
  { n: "1669", label: "Ambulance and medical emergency", note: "Nationwide and free. Run by the National Institute for Emergency Medicine. English is not guaranteed.", color: "bg-[#d9342b]" },
  { n: "191", label: "Police", note: "Crime, danger and general emergencies. 911 is also reported to connect.", color: "bg-purple" },
  { n: "199", label: "Fire", note: "Fire and fire rescue.", color: "bg-orange" },
  { n: "1155", label: "Tourist Police (English)", note: "English-speaking officers who will connect you to the right service. The best fallback if you are stuck.", color: "bg-teal" },
];

const HOSPITALS = [
  { name: "Bumrungrad International", slug: "bumrungrad-international-hospital", num: "1378 or +66 2011 5222", what: "Ambulance, 24 hours" },
  { name: "Bangkok Hospital", slug: "bangkok-hospital-headquarters", num: "1724", what: "Emergency and trauma centre" },
  { name: "BNH Hospital", slug: "bnh-hospital", num: "+66 2 632 1000", what: "Emergency and ambulance" },
  { name: "MedPark Hospital", slug: "medpark-hospital", num: "+66 2 090 3000", what: "Ambulance" },
  { name: "Vejthani Hospital", slug: "vejthani-hospital", num: "+66 2 734 0001", what: "Ambulance" },
  { name: "Samitivej", slug: "samitivej-sukhumvit-hospital", num: "+66 2022 2222", what: "24-hour call centre" },
  { name: "Phyathai 2 Hospital", slug: "phyathai-2-hospital", num: "1772", what: "Hospital hotline" },
  { name: "Praram 9 Hospital", slug: "praram-9-hospital", num: "1270", what: "Hospital hotline" },
];

const OTHER = [
  { k: "Bangkok ambulance (city)", n: "1646", note: "Erawan Medical Centre, run by the Bangkok Metropolitan Administration" },
  { k: "Bangkok ambulance (Vajira)", n: "1554", note: "Vajira Hospital medical rescue unit" },
  { k: "Poisoning or snake bite", n: "1367", note: "Ramathibodi Poison Center, 24 hours. LINE @rpc1367" },
  { k: "Mental health crisis", n: "1323", note: "Department of Mental Health hotline" },
  { k: "Child abuse or family violence", n: "1300", note: "Social assistance centre, free, 24 hours, Thai and English" },
  { k: "Children and young people", n: "1387", note: "Childline Thailand, 24 hours" },
  { k: "Highway accident", n: "1193", note: "Highway Police" },
  { k: "Water accident", n: "1196", note: "Water accident line" },
  { k: "Disaster warnings", n: "1860", note: "National Disaster Warning Center" },
  { k: "Air ambulance", n: "089 922 3300", note: "Siam Air Care" },
];

const WHICH = [
  { s: "Your child stops breathing, has a seizure or is badly hurt at home in Bangkok", a: "Call your own hospital's ambulance line. If you cannot get through within a minute, call 1669." },
  { s: "A road accident, or you are outside Bangkok", a: "Call 1669. For accidents on a highway, 1193 reaches the Highway Police." },
  { s: "You cannot make yourself understood", a: "Call 1155. The Tourist Police speak English and will pass your call on." },
  { s: "Your child has swallowed something or been bitten by a snake", a: "Call 1367 for advice, and 1669 or your hospital for an ambulance." },
  { s: "A crime, a break-in or someone threatening you", a: "Call 191." },
  { s: "Fire or smoke", a: "Get out first, then call 199." },
];

const PHRASES = [
  { en: "Help!", kar: "chuay duay!", th: "ช่วยด้วย" },
  { en: "I need an ambulance", kar: "dtong gaan rot pa-yaa-baan", th: "ต้องการรถพยาบาล" },
  { en: "Take us to ___ Hospital", kar: "paa bpai rohng pa-yaa-baan ___", th: "พาไปโรงพยาบาล ___" },
  { en: "I can't speak Thai", kar: "poot paa-saa tai mai dai", th: "พูดภาษาไทยไม่ได้" },
  { en: "Do you speak English?", kar: "poot paa-saa ang-grit dai mai?", th: "พูดภาษาอังกฤษได้ไหม" },
];

const FAQ = [
  { q: "What is the emergency number in Thailand?", a: "There is no single number. Call 1669 for an ambulance or medical emergency, 191 for the police, 199 for fire and 1155 for the English-speaking Tourist Police. In Bangkok, if your family uses a private hospital, its own ambulance line is often the fastest way to get English-speaking help." },
  { q: "What is the ambulance number in Bangkok?", a: "1669 is the national ambulance number and works in Bangkok. The city also has 1646 (Erawan Medical Centre) and 1554 (Vajira Hospital). Private hospitals run their own ambulances, for example Bumrungrad on 1378 and Bangkok Hospital on 1724." },
  { q: "Does 911 work in Thailand?", a: "911 is reported to connect to the police, but do not rely on it. Save 1669, 191 and 1155 in your phone instead." },
  { q: "Do 1669 operators speak English?", a: "Sometimes, but it is not guaranteed. If you cannot make yourself understood, call 1155, the Tourist Police, who speak English and can connect you. Private hospital ambulance lines usually have English-speaking staff." },
  { q: "Is calling an ambulance free in Thailand?", a: "Calling 1669 is free. A private hospital ambulance is normally charged to your bill or your insurance, so check what your policy covers before you need it." },
  { q: "Which hospital will the ambulance take me to?", a: "A private hospital ambulance takes you to that hospital. A 1669 crew or a volunteer rescue team usually takes patients to the nearest suitable hospital, which may be a public hospital. Say clearly which hospital you want, and call your own hospital as well." },
  { q: "Who are the volunteer rescue teams?", a: "Much of Bangkok's roadside rescue is done by volunteer foundations such as Poh Teck Tung and Ruamkatanyu. They often arrive first and do vital work, but they are not your hospital's ambulance, and teams have been reported competing over territory. If you have a choice, call your own hospital." },
  { q: "What number do I call for poisoning or a snake bite?", a: "Call the Ramathibodi Poison Center on 1367, open 24 hours, for advice on poisons, snake bites and antidotes. For an ambulance, call 1669 or your hospital." },
  { q: "Do four-digit hotlines work from a foreign phone?", a: "Short hotlines are designed for Thai phone numbers and may not connect from a foreign SIM on roaming. Save the full +66 number for your hospital, and get a Thai SIM as soon as you arrive." },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Healthcare", item: `${SITE}/healthcare` },
      { "@type": "ListItem", position: 3, name: "Emergency numbers", item: `${SITE}${PATH}` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Emergency Numbers in Thailand and Bangkok",
    description: DESCRIPTION,
    url: `${SITE}${PATH}`,
    dateModified: CHECKED_ISO,
    datePublished: CHECKED_ISO,
    image: `${SITE}${PATH}/opengraph-image.png`,
    author: { "@type": "Organization", name: "BKK Families", url: SITE },
    publisher: { "@type": "Organization", name: "BKK Families", url: SITE },
    about: ["Emergency telephone numbers in Thailand", "Ambulance services in Bangkok"],
  },
  {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: "BKK Families emergency numbers card (printable PDF)",
    url: `${SITE}${PDF}`,
    encodingFormat: "application/pdf",
    isAccessibleForFree: true,
    dateModified: CHECKED_ISO,
  },
];

function Download({ className = "" }: { className?: string }) {
  return (
    <a
      href={PDF}
      download
      className={`inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 ${className}`}
    >
      Download the free printable card (PDF)
    </a>
  );
}

export default function EmergencyNumbersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow={`Checked ${CHECKED}`}
        title="Emergency Numbers in Thailand and Bangkok"
        subtitle="Who to call for an ambulance, the police or a fire, which Bangkok hospitals have their own ambulance line, and a free card to print for your fridge and your family's wallets."
        color="teal"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Quick answer, written to be quotable */}
        <div className="mx-auto max-w-3xl rounded-xl bg-purple-dark p-6 text-white">
          <h2 className="font-heading text-lg font-bold">The short answer</h2>
          <p className="mt-2 leading-relaxed text-white/90">
            Thailand&rsquo;s main emergency numbers are <strong>1669</strong> for an ambulance,{" "}
            <strong>191</strong> for the police, <strong>199</strong> for fire and <strong>1155</strong> for
            the English-speaking Tourist Police. In Bangkok, if your family uses a private hospital, call
            that hospital&rsquo;s own ambulance line first: you get English-speaking staff and you go to the
            hospital your insurance covers.
          </p>
          <Download className="mt-5" />
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MAIN.map((m) => (
            <a key={m.n} href={`tel:${m.n}`} className={`rounded-xl p-5 text-white ${m.color}`}>
              <p className="font-heading text-4xl font-bold">{m.n}</p>
              <p className="mt-1 font-bold">{m.label}</p>
              <p className="mt-1 text-sm text-white/90">{m.note}</p>
            </a>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">Which number should I call?</h2>
          <div className="mt-5 space-y-3">
            {WHICH.map((w) => (
              <div key={w.s} className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
                <p className="font-semibold text-purple-dark">{w.s}</p>
                <p className="mt-1 text-sm text-neutral-600">{w.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">Bangkok private hospital ambulance numbers</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Each number below was checked on the hospital&rsquo;s own website on {CHECKED}. Where a hospital
            publishes only a general hotline, we say so. Four-digit numbers work from Thai phone numbers.
          </p>
          <div className="mt-5 overflow-x-auto rounded-xl border border-black/5 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-teal-50 text-purple-dark">
                <tr><th className="px-4 py-3">Hospital</th><th className="px-4 py-3">Number</th><th className="px-4 py-3">What it is</th></tr>
              </thead>
              <tbody>
                {HOSPITALS.map((h) => (
                  <tr key={h.name} className="border-t border-black/5">
                    <td className="px-4 py-3"><Link href={`/healthcare/hospitals/${h.slug}`} className="font-semibold text-teal hover:underline">{h.name}</Link></td>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-purple-dark">{h.num}</td>
                    <td className="px-4 py-3 text-neutral-600">{h.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-neutral-600">
            Not sure which hospital to use? See our guide to the{" "}
            <Link href="/blog/top-5-hospitals-in-bangkok" className="font-semibold text-teal hover:underline">best hospitals in Bangkok for foreigners</Link>{" "}
            and the full <Link href="/healthcare/hospitals" className="font-semibold text-teal hover:underline">hospital directory</Link>.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">Other emergency and helpline numbers</h2>
          <div className="mt-5 overflow-x-auto rounded-xl border border-black/5 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <tbody>
                {OTHER.map((o) => (
                  <tr key={o.k} className="border-t border-black/5 first:border-t-0">
                    <td className="px-4 py-3 font-semibold text-purple-dark">{o.k}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-purple-dark">{o.n}</td>
                    <td className="px-4 py-3 text-neutral-600">{o.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">Why 191 is not always the best call</h2>
          <p>
            Thailand does not have one emergency number that routes everything. 191 reaches the police, 1669
            reaches the national ambulance system, and the two are separate. Calling the police about a
            medical emergency costs you time.
          </p>
          <p>
            In Bangkok there is a second layer. Much of the city&rsquo;s roadside rescue is done by volunteer
            foundations such as Poh Teck Tung and Ruamkatanyu. They are often first on the scene and do
            vital work, but they usually take patients to the nearest hospital, and rival teams have been
            reported{" "}
            <a href="https://thethaiger.com/hot-news/crime/bangkok-rescue-volunteers-brawl-over-territory" className="font-semibold text-teal hover:underline" rel="noopener noreferrer" target="_blank">clashing over territory</a>.
            Private hospitals run their own ambulances with English-speaking staff, and they take you to
            the hospital your family already uses.
          </p>
          <p>
            So the practical rule for expat families in Bangkok: save your own hospital&rsquo;s ambulance
            line, call it first, and keep 1669 and 1155 as your backups.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-purple-dark">What to say when you call</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
              <li>What happened, and who is hurt.</li>
              <li>Where you are: address, building, soi and a landmark.</li>
              <li>Your phone number. Keep the line free.</li>
              <li>Which hospital you want to go to.</li>
            </ol>
          </div>
          <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-purple-dark">Emergency Thai phrases</h2>
            <p className="mt-1 text-xs text-neutral-500">Say the line in red. Show the Thai script if they do not understand.</p>
            <ul className="mt-3 space-y-2 text-sm">
              {PHRASES.map((p) => (
                <li key={p.en}>
                  <span className="text-neutral-700">{p.en}</span>
                  <span className="block font-bold text-[#d9342b]">{p.kar}</span>
                  <span className="block text-neutral-500" lang="th">{p.th}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-xl border-l-4 border-teal bg-teal-50 p-6">
          <h2 className="font-heading text-xl font-bold text-purple-dark">Do this today, before you need it</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
            <li>Save your hospital&rsquo;s ambulance line, 1669 and 1155 in every family phone.</li>
            <li>Download the Thai EMS 1669 app, which sends your GPS location and has a chat option.</li>
            <li>Write your home address in Thai and keep it by the door and in your phone.</li>
            <li>Keep insurance cards with your ID, and tell your helper or nanny which hospital you use.</li>
            <li>Know the route to your nearest 24-hour emergency department.</li>
            <li>Print the card below and put it on the fridge.</li>
          </ul>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-2xl bg-purple-dark px-6 py-10 text-center text-white">
          <h2 className="font-heading text-2xl font-bold">Free printable emergency card</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/80">
            One A4 page for the fridge with every number on this page, plus four wallet cards for each
            family member, with space to write in your hospital, your address in Thai and allergies.
          </p>
          <Download className="mt-6" />
          <p className="mt-3 text-xs text-white/60">PDF, 2 pages, A4. Numbers checked {CHECKED}.</p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">Questions families ask</h2>
          <div className="mt-6 space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <h3 className="font-heading font-bold text-purple-dark">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-sm text-neutral-600">
          <h2 className="font-heading text-lg font-bold text-purple-dark">Related</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><Link href="/healthcare/paediatrics" className="font-semibold text-teal hover:underline">Paediatric care in Bangkok: where to take a sick child</Link></li>
            <li><Link href="/healthcare/hospitals" className="font-semibold text-teal hover:underline">Bangkok hospital directory</Link></li>
            <li><Link href="/healthcare/insurance" className="font-semibold text-teal hover:underline">Family health insurance in Thailand</Link></li>
          </ul>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs leading-relaxed text-neutral-500">
          Numbers checked {CHECKED} against Thai government sources and each hospital&rsquo;s own website.
          Numbers change, so tell us at info@bkkfamilies.com if one stops working. This page is general
          information, not medical advice, and not a recommendation to use or avoid any provider.
        </p>
      </div>
    </>
  );
}
