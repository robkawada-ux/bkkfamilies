import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES } from "@/lib/articles";
import type { BranchContact } from "@/lib/branches";
import {
  ACTIVITIES_TH,
  TH_ACTIVITIES,
  CATEGORY_TH,
  SETTING_TH,
  TYPE_TH,
  ZONE_TH,
  ageLabelTh,
  priceLabelTh,
} from "@/lib/th/activities";
import { COMMON_TH, dateTh } from "@/lib/th/common";
import { thMetadata } from "@/lib/i18n";
import { SITE } from "@/lib/seo";

// Only activities with a Chinese translation get a /th page.
export function generateStaticParams() {
  return TH_ACTIVITIES.map((a) => ({ slug: a.slug }));
}

function metaDescription(text: string): string {
  // Chinese has no spaces, so cut by characters.
  return text.length <= 110 ? text : `${text.slice(0, 108)}……`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = TH_ACTIVITIES.find((x) => x.slug === slug);
  const th = ACTIVITIES_TH[slug];
  if (!a || !th) return {};
  return thMetadata({
    title: `${a.name}: กิจกรรมสำหรับครอบครัวในกรุงเทพฯ`,
    description: metaDescription(th.description),
    enPath: `/activities/${a.slug}`,
  });
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
      <p className="text-xs text-neutral-400">{label}</p>
      <p className="text-sm font-semibold text-purple-dark">{value}</p>
    </div>
  );
}

/** Chinese twin of BranchList: same links, "Chat on LINE" in Chinese. */
function BranchListTh({
  branches,
  locations,
}: {
  branches: BranchContact[];
  locations?: Record<string, string>;
}) {
  return (
    <ul className="mt-2 space-y-3 text-sm text-neutral-700">
      {branches.map((b) => {
        const location = locations?.[b.name] ?? b.location;
        return (
          <li key={b.name}>
            <span className="font-semibold">{b.name}</span>
            {location && <span className="text-neutral-500">{`, ${location}`}</span>}
            <span className="block">
              {b.phone && (
                <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="text-teal hover:underline">
                  {b.phone}
                </a>
              )}
              {b.phone && b.lineUrl && <span className="text-neutral-400"> · </span>}
              {b.lineUrl && (
                <a
                  href={b.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:underline"
                >
                  สอบถามทาง LINE
                </a>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default async function ThActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = TH_ACTIVITIES.find((x) => x.slug === slug);
  const th = ACTIVITIES_TH[slug];
  if (!a || !th) return notFound();

  const url = `${SITE}/th/activities/${a.slug}`;
  const ages = ageLabelTh(a.minAge, a.maxAge);
  const cost = priceLabelTh(a.price);
  const article = a.relatedArticle
    ? ARTICLES.find((x) => x.slug === a.relatedArticle)
    : undefined;
  const hours = th.hours ?? a.hours;
  const venue = th.venue ?? a.venue;
  const transit = th.transit ?? a.transit;
  const branchNames = th.branches ?? a.branches;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE}/th` },
        { "@type": "ListItem", position: 2, name: "กิจกรรมสำหรับครอบครัว", item: `${SITE}/th/activities` },
        { "@type": "ListItem", position: 3, name: a.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url,
      name: a.name,
      inLanguage: "th",
      dateModified: a.lastVerified,
      mainEntity: {
        "@type": a.type === "Weekly class" ? "SportsActivityLocation" : "TouristAttraction",
        name: a.name,
        description: th.description,
        ...(a.website ? { url: a.website } : {}),
        ...(a.phone ? { telephone: a.phone } : {}),
        ...(a.address
          ? {
              address: {
                "@type": "PostalAddress",
                streetAddress: a.address,
                addressLocality: "Bangkok",
                addressCountry: "TH",
              },
            }
          : {}),
        ...(a.price?.free ? { isAccessibleForFree: true } : {}),
      },
    },
  ];

  const related = TH_ACTIVITIES.filter(
    (x) => x.category === a.category && x.slug !== a.slug,
  ).slice(0, 3);

  const contactRows: { label: string; node: ReactNode }[] = [];
  if (venue) contactRows.push({ label: "สถานที่", node: venue });
  if (a.address) contactRows.push({ label: "ที่อยู่", node: a.address });
  if (transit) contactRows.push({ label: "การเดินทาง", node: transit });
  if (a.branchContacts?.length)
    contactRows.push({
      label: "สาขา",
      node: <BranchListTh branches={a.branchContacts} locations={th.branchLocations} />,
    });
  else if (branchNames?.length)
    contactRows.push({ label: "สถานที่ตั้ง", node: branchNames.join(", ") });
  if (a.phone)
    contactRows.push({
      label: "โทรศัพท์",
      node: <a href={`tel:${a.phone.split(" (")[0].replace(/\s/g, "")}`}>{a.phone}</a>,
    });
  if (a.email)
    contactRows.push({ label: "อีเมล", node: <a href={`mailto:${a.email}`}>{a.email}</a> });
  if (a.lineId) contactRows.push({ label: "LINE", node: a.lineId });
  if (a.facebook)
    contactRows.push({
      label: "Facebook",
      node: (
        <a href={a.facebook} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
          หน้า Facebook
        </a>
      ),
    });
  if (a.bookingUrl)
    contactRows.push({
      label: "จองออนไลน์",
      node: (
        <a href={a.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
          {a.bookingUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </a>
      ),
    });
  if (a.website)
    contactRows.push({
      label: "เว็บไซต์",
      node: (
        <a href={a.website} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
          {a.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </a>
      ),
    });

  const verified = dateTh(a.lastVerified);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-green px-4 py-12 text-purple-dark">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/th/activities"
            className="text-sm font-semibold text-purple-dark/80 hover:text-purple-dark"
          >
            กลับไปที่กิจกรรมสำหรับครอบครัว
          </Link>
          <p className="mt-4 text-xs font-bold tracking-widest text-purple-dark/80">
            {TYPE_TH[a.type]} &middot; {CATEGORY_TH[a.category]}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">{a.name}</h1>
          <p className="mt-2 text-purple-dark/90">
            {th.district ?? a.district} &middot; {ZONE_TH[a.zone]}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        {a.closedNote && th.closedNote && (
          <div className="mb-6 rounded-xl border border-orange/40 bg-orange/10 p-4 text-sm leading-relaxed text-neutral-800">
            <strong className="font-semibold">ปิดอยู่ตอนนี้</strong>
            {th.closedNote}
          </div>
        )}

        <div
          className={`rounded-xl p-4 text-sm leading-relaxed text-neutral-700 ${
            a.status === "confirmed"
              ? "border border-green/30 bg-green/10"
              : "border border-orange/30 bg-orange/5"
          }`}
        >
          {a.status === "confirmed" && a.confirmedByOperator ? (
            <>
              <strong className="font-semibold">ยืนยันกับผู้ดำเนินการแล้ว</strong>
              ยืนยันกับผู้ดำเนินการโดยตรงเมื่อ {verified}
            </>
          ) : a.status === "confirmed" ? (
            <>
              <strong className="font-semibold">ยืนยันกับผู้ดำเนินการแล้ว</strong>
              ตรวจสอบกับหน้าของผู้ดำเนินการเองเมื่อ {verified}
            </>
          ) : (
            <>
              <strong className="font-semibold">ควรตรวจสอบก่อนเดินทาง</strong>
              ข้อมูลนี้มาจากคู่มือหรือไดเรกทอรีล่าสุด ไม่ใช่จากหน้าของผู้ดำเนินการเอง ตรวจสอบล่าสุดเมื่อ {verified}
            </>
          )}{" "}
          {a.sourceUrl && (
            <a
              href={a.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline"
            >
              แหล่งข้อมูล
            </a>
          )}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Fact label="อายุที่เหมาะสม" value={ages ?? "ไม่ระบุ"} />
          <Fact label="ราคา" value={cost ?? "ไม่เปิดเผยราคา"} />
          {hours && <Fact label="เวลาเปิด" value={hours} />}
          {a.setting && <Fact label="สภาพแวดล้อม" value={SETTING_TH[a.setting]} />}
        </div>
        {th.priceNote && (
          <p className="mt-3 text-xs leading-relaxed text-neutral-500">{th.priceNote}</p>
        )}

        <p className="mt-8 leading-relaxed text-neutral-700">{th.description}</p>

        {a.photo && (
          <figure className="mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.photo}
              alt={th.photoAlt ?? a.name}
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-full max-w-sm rounded-xl"
            />
            {(th.photoCredit ?? a.photoCredit) && (
              <figcaption className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-neutral-500">
                ภาพ: {th.photoCredit ?? a.photoCredit}
              </figcaption>
            )}
          </figure>
        )}

        {th.worthKnowing && (
          <div className="mt-8 rounded-xl border-l-4 border-orange bg-orange/5 p-5">
            <p className="text-xs font-bold text-orange">ควรรู้</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{th.worthKnowing}</p>
          </div>
        )}

        {contactRows.length > 0 && (
          <div className="mt-10 rounded-xl border border-black/5 bg-neutral-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">สถานที่และวิธีติดต่อ</h2>
            <dl className="mt-3 space-y-2 text-sm">
              {contactRows.map((r) => (
                <div key={r.label}>
                  <dt className="inline font-semibold text-neutral-500">{r.label}:</dt>
                  <dd className="inline text-neutral-700">{r.node}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {article && (
          <p className="mt-8 text-sm text-neutral-600">
            เรามีบทความที่ละเอียดกว่า (ภาษาอังกฤษ): 
            <Link
              href={`/blog/${article.slug}`}
              lang="en"
              hrefLang="en"
              className="font-semibold text-teal hover:underline"
            >
              {article.title}
            </Link>
          </p>
        )}

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              {CATEGORY_TH[a.category]} เพิ่มเติม
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/th/activities/${r.slug}`}
                  className="rounded-xl border border-black/5 bg-white p-4 text-sm shadow-sm transition hover:shadow-md"
                >
                  <p className="font-semibold text-purple-dark">{r.name}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {ACTIVITIES_TH[r.slug].district ?? r.district}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="mt-12 text-xs leading-relaxed text-neutral-500">
          {COMMON_TH.translationNote}{" "}
          <Link
            href={`/activities/${a.slug}`}
            lang="en"
            hrefLang="en"
            className="underline"
          >
            {COMMON_TH.backToEnglish}
          </Link>
        </p>

        <p className="mt-4 text-xs text-neutral-400">
          พบว่าข้อมูลล้าสมัยไหม 
          <Link href="/th/contact" className="underline">
            แจ้งเรา
          </Link>
          แล้วเราจะแก้ไข
        </p>
      </div>
    </article>
  );
}
