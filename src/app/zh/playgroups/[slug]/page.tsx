import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PLAYGROUPS } from "@/lib/playgroups";
import { zhMetadata } from "@/lib/i18n";
import { COMMON_ZH, dateZh, daysZh, timeZh } from "@/lib/zh/common";
import {
  FREQUENCY_ZH,
  KIND_ZH,
  ORGANISER_ZH,
  PLAYGROUPS_ZH,
  ZONE_SHORT_ZH,
  ageLabelZh,
  districtZh,
  languageZh,
  languagesZh,
  priceLabelZh,
  zhPlaygroups,
} from "@/lib/zh/playgroups";

const SITE = "https://www.bkkfamilies.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return zhPlaygroups().map((p) => ({ slug: p.slug }));
}

/** Chinese counts characters, not words: cut at a sentence end where possible. */
function metaDescription(text: string): string {
  if (text.length <= 80) return text;
  const cut = text.slice(0, 80);
  const stop = Math.max(cut.lastIndexOf("。"), cut.lastIndexOf("；"));
  return stop > 30 ? cut.slice(0, stop + 1) : `${cut}……`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pg = PLAYGROUPS.find((p) => p.slug === slug);
  const zh = PLAYGROUPS_ZH[slug];
  if (!pg || !zh) return {};
  return zhMetadata({
    title: `${pg.name} | 曼谷亲子游戏小组`,
    description: metaDescription(zh.description),
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

export default async function ZhPlaygroupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pg = PLAYGROUPS.find((p) => p.slug === slug);
  const zh = PLAYGROUPS_ZH[slug];
  if (!pg || !zh) return notFound();

  const url = `${SITE}/zh/playgroups/${pg.slug}`;
  const verified = dateZh(pg.lastVerified);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: `${SITE}/zh` },
        { "@type": "ListItem", position: 2, name: "亲子游戏小组", item: `${SITE}/zh/playgroups` },
        { "@type": "ListItem", position: 3, name: pg.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url,
      name: pg.name,
      inLanguage: "zh-Hans",
      dateModified: pg.lastVerified,
      mainEntity: {
        "@type": "ChildCare",
        name: pg.name,
        description: zh.description,
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

  const related = zhPlaygroups()
    .filter((p) => p.zone === pg.zone && p.slug !== pg.slug)
    .slice(0, 3);

  const contactRows: { label: string; node: ReactNode }[] = [];
  if (pg.address) contactRows.push({ label: "地址", node: pg.address });
  if (pg.transit || zh.transit)
    contactRows.push({ label: "交通", node: zh.transit ?? pg.transit });
  if (pg.phone)
    contactRows.push({
      label: "电话",
      node: <a href={`tel:${pg.phone.split(" ext")[0].replace(/\s/g, "")}`}>{pg.phone}</a>,
    });
  if (pg.email)
    contactRows.push({ label: "邮箱", node: <a href={`mailto:${pg.email}`}>{pg.email}</a> });
  if (pg.lineId) contactRows.push({ label: "LINE", node: pg.lineId });
  if (pg.facebook)
    contactRows.push({
      label: "Facebook",
      node: (
        <a href={pg.facebook} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
          Facebook 主页
        </a>
      ),
    });
  if (pg.website)
    contactRows.push({
      label: "网站",
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
          <Link href="/zh/playgroups" className="text-sm font-semibold text-white/80 hover:text-white">
            返回亲子游戏小组
          </Link>
          <p className="mt-4 text-xs font-bold tracking-widest text-white/80">
            {ORGANISER_ZH[pg.organiser]} &middot; {KIND_ZH[pg.kind]}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">{pg.name}</h1>
          <p className="mt-2 text-white/90">
            {pg.venue} &middot; {districtZh(pg.district)}
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
              <strong className="font-semibold">本学期已确认。</strong>{" "}
              {pg.confirmedByOrganiser
                ? `已于${verified}直接向机构确认。`
                : `已于${verified}在机构自己的页面上核对。`}
            </>
          ) : (
            <>
              <strong className="font-semibold">出行前请先核实。</strong>{" "}
              这个游戏小组仍在举办，但它最新公布的信息比较旧，或来自其他列表。
              最近一次核对在{verified}。
            </>
          )}{" "}
          {!/bambi/i.test(pg.sourceUrl) && (
            <a href={pg.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
              信息来源
            </a>
          )}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Fact label="区域" value={`${districtZh(pg.district)}，${ZONE_SHORT_ZH[pg.zone]}`} />
          <Fact label="语言" value={languagesZh(pg.languages)} />
          <Fact label="主办方" value={ORGANISER_ZH[pg.organiser]} />
          <Fact label="预约" value={pg.bookingRequired ? "需要预约" : "请先联系"} />
        </div>

        <div className="mt-8 space-y-4">
          <p className="leading-relaxed text-neutral-700">{zh.description}</p>
        </div>

        <div className="mt-10">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            {pg.sessions.length > 1 ? "场次" : "举办时间"}
          </h2>
          <div className="mt-3 space-y-3">
            {pg.sessions.map((s, i) => {
              const sz = zh.sessions[i] ?? {};
              const label = sz.label ?? s.label;
              const when = [daysZh(s.days), timeZh(s.start, s.end)].filter(Boolean).join("，");
              const ages = ageLabelZh(s.minAgeMonths, s.maxAgeMonths);
              const cost = priceLabelZh(s.price);
              return (
                <div key={i} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                  {label && <h3 className="font-heading font-bold text-purple-dark">{label}</h3>}
                  <dl className="mt-1 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="inline text-neutral-500">时间：</dt>
                      <dd className="inline font-semibold text-neutral-700">
                        {when || "日期和时间请咨询"}
                      </dd>
                    </div>
                    <div>
                      <dt className="inline text-neutral-500">频率：</dt>
                      <dd className="inline font-semibold text-neutral-700">
                        {FREQUENCY_ZH[s.frequency]}
                      </dd>
                    </div>
                    <div>
                      <dt className="inline text-neutral-500">年龄：</dt>
                      <dd className="inline font-semibold text-neutral-700">
                        {ages ?? "未公布"}
                      </dd>
                    </div>
                    <div>
                      <dt className="inline text-neutral-500">价格：</dt>
                      <dd className="inline font-semibold text-neutral-700">
                        {cost ?? "未公布"}
                      </dd>
                    </div>
                    {s.language && (
                      <div>
                        <dt className="inline text-neutral-500">语言：</dt>
                        <dd className="inline font-semibold text-neutral-700">
                          {languagesZh(s.language)}
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

        {zh.worthKnowing && (
          <div className="mt-8 rounded-xl border-l-4 border-orange bg-orange/5 p-5">
            <p className="text-xs font-bold text-orange">家长须知</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{zh.worthKnowing}</p>
          </div>
        )}

        {(pg.bookingUrl || contactRows.length > 0) && (
          <div className="mt-10 rounded-xl border border-black/5 bg-neutral-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">预约与联系方式</h2>
            {contactRows.length > 0 && (
              <dl className="mt-3 space-y-2 text-sm">
                {contactRows.map((r) => (
                  <div key={r.label}>
                    <dt className="inline font-semibold text-neutral-500">{r.label}：</dt>
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
                预约名额
              </a>
            )}
          </div>
        )}

        {zh.finePrint && <p className="mt-4 text-xs text-neutral-400">{zh.finePrint}</p>}

        {pg.schoolSlug && (
          <p className="mt-8 text-sm text-neutral-600">
            想了解学校本身？{" "}
            <Link
              href={`/schools/${pg.schoolSlug}`}
              lang="en"
              hrefLang="en"
              className="font-semibold text-teal hover:underline"
            >
              阅读学校介绍（英文）
            </Link>
            。
          </p>
        )}

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              {pg.zone === "Several locations"
                ? "曼谷的其他游戏小组"
                : `${ZONE_SHORT_ZH[pg.zone]}区域的其他游戏小组`}
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/zh/playgroups/${r.slug}`}
                  className="rounded-xl border border-black/5 bg-white p-4 text-sm shadow-sm transition hover:shadow-md"
                >
                  <p className="font-semibold text-purple-dark">{r.name}</p>
                  <p className="mt-1 text-xs text-neutral-500">{districtZh(r.district)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="mt-12 text-xs text-neutral-400">
          信息有误或已过时？{" "}
          <Link href="/contact" lang="en" hrefLang="en" className="underline">
            请告诉我们（联系页为英文）
          </Link>
          ，我们会更正。
        </p>

        <div className="mt-6 rounded-xl border border-black/5 bg-neutral-50 p-4 text-xs leading-relaxed text-neutral-500">
          <p>{COMMON_ZH.translationNote}</p>
          <p className="mt-2">
            <Link
              href={`/playgroups/${pg.slug}`}
              lang="en"
              hrefLang="en"
              className="font-semibold text-teal hover:underline"
            >
              {COMMON_ZH.backToEnglish}
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
