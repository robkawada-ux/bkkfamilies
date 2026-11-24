import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PLAYGROUPS } from "@/lib/playgroups";
import { SCHOOLS_TH } from "@/lib/th/schools";
import { thMetadata } from "@/lib/i18n";
import { COMMON_TH, dateTh, daysTh, timeTh } from "@/lib/th/common";
import {
  FREQUENCY_TH,
  KIND_TH,
  ORGANISER_TH,
  PLAYGROUPS_TH,
  ZONE_SHORT_TH,
  ageLabelTh,
  districtTh,
  languageTh,
  languagesTh,
  priceLabelTh,
  thPlaygroups,
} from "@/lib/th/playgroups";

const SITE = "https://www.bkkfamilies.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return thPlaygroups().map((p) => ({ slug: p.slug }));
}

/** Thai has no spaces between words: cut at a space near the limit. */
function metaDescription(text: string): string {
  if (text.length <= 150) return text;
  const cut = text.slice(0, 150);
  const stop = cut.lastIndexOf(" ");
  return `${stop > 60 ? cut.slice(0, stop) : cut}...`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pg = PLAYGROUPS.find((p) => p.slug === slug);
  const th = PLAYGROUPS_TH[slug];
  if (!pg || !th) return {};
  return thMetadata({
    title: `${pg.name} | เพลย์กรุ๊ปในกรุงเทพฯ`,
    description: metaDescription(th.description),
    enPath: `/playgroups/${pg.slug}`,
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

export default async function ThPlaygroupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pg = PLAYGROUPS.find((p) => p.slug === slug);
  const th = PLAYGROUPS_TH[slug];
  if (!pg || !th) return notFound();

  const url = `${SITE}/th/playgroups/${pg.slug}`;
  const verified = dateTh(pg.lastVerified);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE}/th` },
        { "@type": "ListItem", position: 2, name: "เพลย์กรุ๊ป", item: `${SITE}/th/playgroups` },
        { "@type": "ListItem", position: 3, name: pg.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url,
      name: pg.name,
      inLanguage: "th",
      dateModified: pg.lastVerified,
      mainEntity: {
        "@type": "ChildCare",
        name: pg.name,
        description: th.description,
        ...(pg.website ? { url: pg.website } : {}),
        ...(pg.phone ? { telephone: pg.phone } : {}),
        ...(pg.email ? { email: pg.email } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: pg.address ?? pg.venue,
          addressLocality: "Bangkok",
          addressCountry: "TH",
        },
        availableLanguage: pg.languages,
      },
    },
  ];

  const related = thPlaygroups()
    .filter((p) => p.zone === pg.zone && p.slug !== pg.slug)
    .slice(0, 3);

  const contactRows: { label: string; node: ReactNode }[] = [];
  if (pg.address) contactRows.push({ label: "ที่อยู่", node: pg.address });
  if (pg.transit || th.transit)
    contactRows.push({ label: "การเดินทาง", node: th.transit ?? pg.transit });
  if (pg.phone)
    contactRows.push({
      label: "โทรศัพท์",
      node: <a href={`tel:${pg.phone.split(" ext")[0].replace(/\s/g, "")}`}>{pg.phone}</a>,
    });
  if (pg.email)
    contactRows.push({ label: "อีเมล", node: <a href={`mailto:${pg.email}`}>{pg.email}</a> });
  if (pg.lineId) contactRows.push({ label: "LINE", node: pg.lineId });
  if (pg.facebook)
    contactRows.push({
      label: "Facebook",
      node: (
        <a href={pg.facebook} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
          เพจ Facebook
        </a>
      ),
    });
  if (pg.website)
    contactRows.push({
      label: "เว็บไซต์",
      node: (
        <a href={pg.website} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
          {pg.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </a>
      ),
    });

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-teal px-4 py-12 text-white">
        <div className="mx-auto max-w-3xl">
          <Link href="/th/playgroups" className="text-sm font-semibold text-white/80 hover:text-white">
            กลับไปหน้าเพลย์กรุ๊ป
          </Link>
          <p className="mt-4 text-xs font-bold tracking-widest text-white/80">
            {ORGANISER_TH[pg.organiser]} &middot; {KIND_TH[pg.kind]}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">{pg.name}</h1>
          <p className="mt-2 text-white/90">
            {pg.venue} &middot; {districtTh(pg.district)}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div
          className={`rounded-xl p-4 text-sm leading-relaxed ${
            pg.status === "confirmed"
              ? "border border-green/30 bg-green/10 text-neutral-700"
              : "border border-orange/30 bg-orange/5 text-neutral-700"
          }`}
        >
          {pg.status === "confirmed" ? (
            <>
              <strong className="font-semibold">ยืนยันแล้วในภาคเรียนนี้</strong>{" "}
              {pg.confirmedByOrganiser
                ? `ยืนยันกับผู้จัดโดยตรงเมื่อ ${verified}`
                : `ตรวจสอบกับหน้าของผู้จัดเองเมื่อ ${verified}`}
            </>
          ) : (
            <>
              <strong className="font-semibold">โปรดตรวจสอบก่อนไป</strong>{" "}
              เพลย์กรุ๊ปนี้ยังจัดอยู่ แต่ข้อมูลล่าสุดที่เผยแพร่ค่อนข้างเก่าหรือมาจากรายการอื่น
              ตรวจสอบล่าสุดเมื่อ {verified}
            </>
          )}{" "}
          {!/bambi/i.test(pg.sourceUrl) && (
            <a href={pg.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
              แหล่งข้อมูล
            </a>
          )}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Fact label="ย่าน" value={`${districtTh(pg.district)} ${ZONE_SHORT_TH[pg.zone]}`} />
          <Fact label="ภาษา" value={languagesTh(pg.languages)} />
          <Fact label="ผู้จัด" value={ORGANISER_TH[pg.organiser]} />
          <Fact label="การจอง" value={pg.bookingRequired ? "ต้องจองล่วงหน้า" : "โปรดติดต่อก่อน"} />
        </div>

        <div className="mt-8 space-y-4">
          <p className="leading-relaxed text-neutral-700">{th.description}</p>
        </div>

        <div className="mt-10">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            {pg.sessions.length > 1 ? "รอบ" : "เวลาจัดกิจกรรม"}
          </h2>
          <div className="mt-3 space-y-3">
            {pg.sessions.map((s, i) => {
              const sz = th.sessions[i] ?? {};
              const label = sz.label ?? s.label;
              const when = [daysTh(s.days), timeTh(s.start, s.end)].filter(Boolean).join(" ");
              const ages = ageLabelTh(s.minAgeMonths, s.maxAgeMonths);
              const cost = priceLabelTh(s.price);
              return (
                <div key={i} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                  {label && <h3 className="font-heading font-bold text-purple-dark">{label}</h3>}
                  <dl className="mt-1 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="inline text-neutral-500">เวลา:</dt>
                      <dd className="inline font-semibold text-neutral-700">
                        {when || "สอบถามวันและเวลา"}
                      </dd>
                    </div>
                    <div>
                      <dt className="inline text-neutral-500">ความถี่:</dt>
                      <dd className="inline font-semibold text-neutral-700">
                        {FREQUENCY_TH[s.frequency]}
                      </dd>
                    </div>
                    <div>
                      <dt className="inline text-neutral-500">อายุ:</dt>
                      <dd className="inline font-semibold text-neutral-700">
                        {ages ?? "ไม่ประกาศ"}
                      </dd>
                    </div>
                    <div>
                      <dt className="inline text-neutral-500">ราคา:</dt>
                      <dd className="inline font-semibold text-neutral-700">
                        {cost ?? "ไม่ประกาศ"}
                      </dd>
                    </div>
                    {s.language && (
                      <div>
                        <dt className="inline text-neutral-500">ภาษา:</dt>
                        <dd className="inline font-semibold text-neutral-700">
                          {languagesTh(s.language)}
                        </dd>
                      </div>
                    )}
                  </dl>
                  {s.price?.note && (
                    <p className="mt-2 text-xs text-neutral-500">{sz.priceNote ?? s.price.note}</p>
                  )}
                  {s.note && <p className="mt-1 text-xs text-neutral-500">{sz.note ?? s.note}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {th.worthKnowing && (
          <div className="mt-8 rounded-xl border-l-4 border-orange bg-orange/5 p-5">
            <p className="text-xs font-bold text-orange">ข้อควรรู้สำหรับผู้ปกครอง</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{th.worthKnowing}</p>
          </div>
        )}

        {(pg.bookingUrl || contactRows.length > 0) && (
          <div className="mt-10 rounded-xl border border-black/5 bg-neutral-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">การจองและช่องทางติดต่อ</h2>
            {contactRows.length > 0 && (
              <dl className="mt-3 space-y-2 text-sm">
                {contactRows.map((r) => (
                  <div key={r.label}>
                    <dt className="inline font-semibold text-neutral-500">{r.label}:</dt>
                    <dd className="inline text-neutral-700">{r.node}</dd>
                  </div>
                ))}
              </dl>
            )}
            {pg.bookingUrl && (
              <a
                href={pg.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                จองที่นั่ง
              </a>
            )}
          </div>
        )}

        {th.finePrint && <p className="mt-4 text-xs text-neutral-400">{th.finePrint}</p>}

        {pg.schoolSlug && (
          <p className="mt-8 text-sm text-neutral-600">
            อยากรู้จักโรงเรียนมากขึ้น{" "}
            <Link
              href={SCHOOLS_TH[pg.schoolSlug]?.description ? `/th/schools/${pg.schoolSlug}` : `/schools/${pg.schoolSlug}`}
              {...(SCHOOLS_TH[pg.schoolSlug]?.description ? {} : { lang: "en", hrefLang: "en" })}
              className="font-semibold text-teal hover:underline"
            >
              {SCHOOLS_TH[pg.schoolSlug]?.description ? "อ่านข้อมูลโรงเรียน" : "อ่านข้อมูลโรงเรียน (ภาษาอังกฤษ)"}
            </Link>
          </p>
        )}

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              {pg.zone === "Several locations"
                ? "เพลย์กรุ๊ปอื่นในกรุงเทพฯ"
                : `เพลย์กรุ๊ปอื่นในย่าน${ZONE_SHORT_TH[pg.zone]}`}
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/th/playgroups/${r.slug}`}
                  className="rounded-xl border border-black/5 bg-white p-4 text-sm shadow-sm transition hover:shadow-md"
                >
                  <p className="font-semibold text-purple-dark">{r.name}</p>
                  <p className="mt-1 text-xs text-neutral-500">{districtTh(r.district)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="mt-12 text-xs text-neutral-400">
          ข้อมูลผิดหรือล้าสมัยหรือไม่{" "}
          <Link href="/th/contact" className="underline">
            แจ้งเรา
          </Link>{" "}
          เราจะแก้ไขให้
        </p>

        <div className="mt-6 rounded-xl border border-black/5 bg-neutral-50 p-4 text-xs leading-relaxed text-neutral-500">
          <p>{COMMON_TH.translationNote}</p>
          <p className="mt-2">
            <Link
              href={`/playgroups/${pg.slug}`}
              lang="en"
              hrefLang="en"
              className="font-semibold text-teal hover:underline"
            >
              {COMMON_TH.backToEnglish}
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
