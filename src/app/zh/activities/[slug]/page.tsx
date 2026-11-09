import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES } from "@/lib/articles";
import type { BranchContact } from "@/lib/branches";
import {
  ACTIVITIES_ZH,
  ZH_ACTIVITIES,
  CATEGORY_ZH,
  SETTING_ZH,
  TYPE_ZH,
  ZONE_ZH,
  ageLabelZh,
  priceLabelZh,
} from "@/lib/zh/activities";
import { COMMON_ZH, dateZh } from "@/lib/zh/common";
import { zhMetadata } from "@/lib/i18n";
import { SITE } from "@/lib/seo";

// Only activities with a Chinese translation get a /zh page.
export function generateStaticParams() {
  return ZH_ACTIVITIES.map((a) => ({ slug: a.slug }));
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
  const a = ZH_ACTIVITIES.find((x) => x.slug === slug);
  const zh = ACTIVITIES_ZH[slug];
  if (!a || !zh) return {};
  return zhMetadata({
    title: `${a.name}：曼谷亲子活动`,
    description: metaDescription(zh.description),
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
function BranchListZh({
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
            {location && <span className="text-neutral-500">，{location}</span>}
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
                  在 LINE 上咨询
                </a>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default async function ZhActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = ZH_ACTIVITIES.find((x) => x.slug === slug);
  const zh = ACTIVITIES_ZH[slug];
  if (!a || !zh) return notFound();

  const url = `${SITE}/zh/activities/${a.slug}`;
  const ages = ageLabelZh(a.minAge, a.maxAge);
  const cost = priceLabelZh(a.price);
  const article = a.relatedArticle
    ? ARTICLES.find((x) => x.slug === a.relatedArticle)
    : undefined;
  const hours = zh.hours ?? a.hours;
  const venue = zh.venue ?? a.venue;
  const transit = zh.transit ?? a.transit;
  const branchNames = zh.branches ?? a.branches;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: `${SITE}/zh` },
        { "@type": "ListItem", position: 2, name: "亲子活动", item: `${SITE}/zh/activities` },
        { "@type": "ListItem", position: 3, name: a.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url,
      name: a.name,
      inLanguage: "zh-Hans",
      dateModified: a.lastVerified,
      mainEntity: {
        "@type": a.type === "Weekly class" ? "SportsActivityLocation" : "TouristAttraction",
        name: a.name,
        description: zh.description,
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

  const related = ZH_ACTIVITIES.filter(
    (x) => x.category === a.category && x.slug !== a.slug,
  ).slice(0, 3);

  const contactRows: { label: string; node: ReactNode }[] = [];
  if (venue) contactRows.push({ label: "场地", node: venue });
  if (a.address) contactRows.push({ label: "地址", node: a.address });
  if (transit) contactRows.push({ label: "交通", node: transit });
  if (a.branchContacts?.length)
    contactRows.push({
      label: "分店",
      node: <BranchListZh branches={a.branchContacts} locations={zh.branchLocations} />,
    });
  else if (branchNames?.length)
    contactRows.push({ label: "地点", node: branchNames.join("、") });
  if (a.phone)
    contactRows.push({
      label: "电话",
      node: <a href={`tel:${a.phone.split(" (")[0].replace(/\s/g, "")}`}>{a.phone}</a>,
    });
  if (a.email)
    contactRows.push({ label: "邮箱", node: <a href={`mailto:${a.email}`}>{a.email}</a> });
  if (a.lineId) contactRows.push({ label: "LINE", node: a.lineId });
  if (a.facebook)
    contactRows.push({
      label: "Facebook",
      node: (
        <a href={a.facebook} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
          Facebook 主页
        </a>
      ),
    });
  if (a.bookingUrl)
    contactRows.push({
      label: "在线预订",
      node: (
        <a href={a.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
          {a.bookingUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </a>
      ),
    });
  if (a.website)
    contactRows.push({
      label: "官网",
      node: (
        <a href={a.website} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
          {a.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </a>
      ),
    });

  const verified = dateZh(a.lastVerified);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-green px-4 py-12 text-purple-dark">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/zh/activities"
            className="text-sm font-semibold text-purple-dark/80 hover:text-purple-dark"
          >
            返回亲子活动
          </Link>
          <p className="mt-4 text-xs font-bold tracking-widest text-purple-dark/80">
            {TYPE_ZH[a.type]} &middot; {CATEGORY_ZH[a.category]}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">{a.name}</h1>
          <p className="mt-2 text-purple-dark/90">
            {zh.district ?? a.district} &middot; {ZONE_ZH[a.zone]}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        {a.closedNote && zh.closedNote && (
          <div className="mb-6 rounded-xl border border-orange/40 bg-orange/10 p-4 text-sm leading-relaxed text-neutral-800">
            <strong className="font-semibold">目前关闭。</strong>
            {zh.closedNote}
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
              <strong className="font-semibold">已与运营方确认。</strong>
              {verified}直接向运营方确认。
            </>
          ) : a.status === "confirmed" ? (
            <>
              <strong className="font-semibold">已与运营方确认。</strong>
              {verified}对照运营方自己的页面核实。
            </>
          ) : (
            <>
              <strong className="font-semibold">出行前请先核实。</strong>
              这些信息来自近期的指南或名录，而不是运营方自己的页面。最后核实于{verified}。
            </>
          )}{" "}
          {a.sourceUrl && (
            <a
              href={a.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline"
            >
              信息来源
            </a>
          )}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Fact label="适合年龄" value={ages ?? "未公布"} />
          <Fact label="价格" value={cost ?? "价格未公布"} />
          {hours && <Fact label="开放时间" value={hours} />}
          {a.setting && <Fact label="环境" value={SETTING_ZH[a.setting]} />}
        </div>
        {zh.priceNote && (
          <p className="mt-3 text-xs leading-relaxed text-neutral-500">{zh.priceNote}</p>
        )}

        <p className="mt-8 leading-relaxed text-neutral-700">{zh.description}</p>

        {a.photo && (
          <figure className="mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.photo}
              alt={zh.photoAlt ?? a.name}
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-full max-w-sm rounded-xl"
            />
            {(zh.photoCredit ?? a.photoCredit) && (
              <figcaption className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-neutral-500">
                图片：{zh.photoCredit ?? a.photoCredit}。
              </figcaption>
            )}
          </figure>
        )}

        {zh.worthKnowing && (
          <div className="mt-8 rounded-xl border-l-4 border-orange bg-orange/5 p-5">
            <p className="text-xs font-bold text-orange">家长须知</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{zh.worthKnowing}</p>
          </div>
        )}

        {contactRows.length > 0 && (
          <div className="mt-10 rounded-xl border border-black/5 bg-neutral-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">地点与预约方式</h2>
            <dl className="mt-3 space-y-2 text-sm">
              {contactRows.map((r) => (
                <div key={r.label}>
                  <dt className="inline font-semibold text-neutral-500">{r.label}：</dt>
                  <dd className="inline text-neutral-700">{r.node}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {article && (
          <p className="mt-8 text-sm text-neutral-600">
            我们有一篇更详细的文章（英文）：
            <Link
              href={`/blog/${article.slug}`}
              lang="en"
              hrefLang="en"
              className="font-semibold text-teal hover:underline"
            >
              {article.title}
            </Link>
            。
          </p>
        )}

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              更多{CATEGORY_ZH[a.category]}
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/zh/activities/${r.slug}`}
                  className="rounded-xl border border-black/5 bg-white p-4 text-sm shadow-sm transition hover:shadow-md"
                >
                  <p className="font-semibold text-purple-dark">{r.name}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {ACTIVITIES_ZH[r.slug].district ?? r.district}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="mt-12 text-xs leading-relaxed text-neutral-500">
          {COMMON_ZH.translationNote}{" "}
          <Link
            href={`/activities/${a.slug}`}
            lang="en"
            hrefLang="en"
            className="underline"
          >
            {COMMON_ZH.backToEnglish}
          </Link>
        </p>

        <p className="mt-4 text-xs text-neutral-400">
          发现信息过时了？
          <Link href="/zh/contact" className="underline">
            请告诉我们
          </Link>
          ，我们会改正。
        </p>
      </div>
    </article>
  );
}
