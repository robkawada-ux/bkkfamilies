import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CAMPS, campBySlug, isShown, isStale } from "@/lib/camps";
import { BREAK_WINDOWS } from "@/lib/schoolBreaks";
import { COMMON_ZH, verifiedZh } from "@/lib/zh/common";
import {
  CAMPS_ZH,
  CATEGORY_ZH,
  FORMAT_ZH,
  WINDOW_ZH,
  agesZh,
  areaZh,
  priceZh,
  rangeZh,
} from "@/lib/zh/camps";
import { zhMetadata } from "@/lib/i18n";


// Re-render hourly so camps drop off the day after they finish.
export const revalidate = 3600;
const SITE = "https://www.bkkfamilies.com";

export function generateStaticParams() {
  return CAMPS.filter((c) => CAMPS_ZH[c.slug]).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const camp = campBySlug(slug);
  const z = CAMPS_ZH[slug];
  if (!camp || !z) return {};

  const firstPara = z.description.split("\n\n")[0] ?? "";
  const description =
    firstPara.length <= 90 ? firstPara : `${firstPara.slice(0, 88)}……`;

  return zhMetadata({
    title: `${camp.name} | 曼谷假期营`,
    description,
    enPath: `/camps/${camp.slug}`,
  });
}

export default async function CampPageZh({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const camp = campBySlug(slug);
  const z = CAMPS_ZH[slug];
  if (!camp || !z) notFound();

  // Upcoming sessions only, grouped by break window in calendar order.
  const upcoming = camp.sessions.filter((s) => isShown(s));
  const grouped = BREAK_WINDOWS.map((w) => ({
    window: w,
    sessions: upcoming.filter((s) => s.window === w.id),
  })).filter((g) => g.sessions.length > 0);

  // Cross-links only to camps that have a Chinese page.
  const hosts = (camp.hosts ?? [])
    .map((s) => campBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c) && Boolean(CAMPS_ZH[c!.slug]));
  const hostedAt = (camp.hostedAt ?? [])
    .map((s) => campBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c) && Boolean(CAMPS_ZH[c!.slug]));

  const stale = isStale(camp.lastVerified);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: `${SITE}/zh` },
        { "@type": "ListItem", position: 2, name: "假期营", item: `${SITE}/zh/camps` },
        {
          "@type": "ListItem",
          position: 3,
          name: camp.name,
          item: `${SITE}/zh/camps/${camp.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: camp.name,
      url: camp.website,
      email: camp.email,
      telephone: camp.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: camp.area,
        addressCountry: "TH",
      },
    },
  ];

  const spooky = camp.theme === "halloween";
  const area = areaZh(camp.area);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        className={
          spooky
            ? "relative overflow-hidden bg-gradient-to-br from-[#12071d] via-purple-dark to-[#6b2a06] py-12 text-white"
            : "bg-purple py-10 text-white"
        }
      >
        {spooky && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
            <span className="absolute left-[4%] top-3 text-3xl opacity-70">🦇</span>
            <span className="absolute right-[8%] top-6 text-4xl opacity-80">🌕</span>
            <span className="absolute right-[22%] top-14 text-2xl opacity-60">🦇</span>
            <span className="absolute right-0 top-0 text-6xl opacity-40">🕸️</span>
            <span className="absolute bottom-2 right-[6%] text-5xl">🎃</span>
            <span className="absolute bottom-3 right-[18%] text-3xl opacity-80">👻</span>
            <span className="absolute bottom-2 left-[46%] text-2xl opacity-50">🕷️</span>
          </div>
        )}
        <div className="relative mx-auto max-w-4xl px-4">
          <Link href="/zh/camps" className="text-sm text-white/80 hover:text-white">
            &larr; 全部假期营
          </Link>
          <h1 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
            {spooky && <span aria-hidden="true">🎃 </span>}
            {camp.name}
            {spooky && <span aria-hidden="true"> 👻</span>}
          </h1>
          <p className="mt-2 text-white/90">{camp.mainVenue ?? area}</p>
          {z.tagline && (
            <p className={`mt-3 text-lg font-semibold ${spooky ? "text-orange" : "text-white"}`}>
              {spooky && <span aria-hidden="true">🕯️ </span>}
              {z.tagline}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
              {area}
            </span>
            {camp.outsideBangkok && (
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                曼谷以外
              </span>
            )}
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
              {upcoming.length === 0 ? "暂无即将开始的营期" : `共 ${upcoming.length} 个即将开始的营期`}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="space-y-4 leading-relaxed text-neutral-700">
          {z.description.split("\n\n").map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>

        {z.highlights && z.highlights.length > 0 && (
          <div className="mt-8">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              {spooky ? "🧙 魔法锅里煮着什么" : "活动亮点"}
            </h2>
            <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {z.highlights.map((h) => (
                <li
                  key={h}
                  className={
                    spooky
                      ? "rounded-xl border border-orange/40 bg-[#1c0f2b] px-4 py-3 text-sm font-medium text-orange-50"
                      : "rounded-xl border border-black/5 bg-purple-50 px-4 py-3 text-sm font-medium text-purple-dark"
                  }
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {z.worthKnowing && (
          <div className="mt-8 rounded-xl border border-black/5 bg-orange-50 p-5">
            <h2 className="font-heading font-bold text-purple-dark">
              {spooky && <span aria-hidden="true">🕸️ </span>}
              家长须知
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              {z.worthKnowing}
            </p>
          </div>
        )}

        {camp.photo && (
          <figure className="mt-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={camp.photo}
              alt={z.photoAlt ?? camp.name}
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-full max-w-sm rounded-xl"
            />
            <figcaption className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-neutral-500">
              {z.photoCaption}
              {camp.photoCredit && (
                <span className="block">图片：{z.photoCredit ?? camp.photoCredit}。</span>
              )}
            </figcaption>
          </figure>
        )}

        {spooky && (
          <p aria-hidden="true" className="mt-12 text-center text-3xl tracking-[0.4em]">
            🦇🎃👻🕷️🍬🧙
          </p>
        )}

        {/* Contact */}
        <div className="mt-12 rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            联系方式
          </h2>
          <ul className="mt-3 space-y-1 text-sm text-neutral-700">
            {camp.website && (
              <li>
                <a
                  href={camp.website}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-orange"
                >
                  营地官方页面
                </a>
              </li>
            )}
            {camp.email && (
              <li>
                邮箱：
                <a href={`mailto:${camp.email}`} className="text-orange">
                  {camp.email}
                </a>
              </li>
            )}
            {camp.phone && <li>电话：{camp.phone}</li>}
            {camp.lineId && <li>LINE：{camp.lineId}</li>}
            {camp.facebook && (
              <li>
                <a
                  href={camp.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-orange"
                >
                  Facebook
                </a>
              </li>
            )}
          </ul>
          {camp.branchContacts?.length ? (
            <div className="mt-4">
              <p className="text-sm font-semibold text-neutral-700">请向离您最近的分店预订</p>
              <ul className="mt-2 space-y-3 text-sm text-neutral-700">
                {camp.branchContacts.map((b) => {
                  const loc = z.branchLocations?.[b.name] ?? b.location;
                  return (
                    <li key={b.name}>
                      <span className="font-semibold">{b.name}</span>
                      {loc && <span className="text-neutral-500">，{loc}</span>}
                      <span className="block">
                        {b.phone && (
                          <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="text-teal hover:underline">
                            {b.phone}
                          </a>
                        )}
                        {b.phone && b.lineUrl && <span className="text-neutral-400"> · </span>}
                        {b.lineUrl && (
                          <a href={b.lineUrl} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
                            通过 LINE 联系
                          </a>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          <p className="mt-4 text-xs text-neutral-500">
            {verifiedZh(camp.lastVerified)}。
            {stale
              ? "距今已有一段时间，预订前请向主办方确认日期和价格。"
              : "预订前请务必向主办方确认。"}
          </p>
        </div>

        {/* Sessions */}
        <h2 className="mt-12 font-heading text-2xl font-bold text-purple-dark">
          营期
        </h2>
        {grouped.length === 0 && (
          <p className="mt-4 rounded-xl border-2 border-dashed border-black/10 p-6 text-neutral-600">
            最近一期营已经结束。主办方公布新日期后，我们会第一时间更新。
          </p>
        )}
        {grouped.map((g) => (
          <div key={g.window.id} className="mt-6">
            <h3 className="font-heading text-lg font-bold text-teal">
              {WINDOW_ZH[g.window.id].label}
            </h3>
            <div className="mt-3 space-y-3">
              {g.sessions.map((s) => {
                const zs = z.sessions[s.id];
                const dates = rangeZh(s.startDate, s.endDate);
                const cost = priceZh(s);
                const ages = agesZh(s.minAge, s.maxAge);
                const venue = zs?.venue ?? s.venue;
                return (
                  <div
                    key={s.id}
                    className={`rounded-xl border border-black/5 bg-white p-5 shadow-sm ${s.dateStatus !== "confirmed" ? "opacity-80" : ""}`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-heading font-bold text-purple-dark">
                        {zs?.programme ?? s.programme}
                      </h4>
                      <span className="text-sm font-semibold text-neutral-700">
                        {cost ?? (
                          <span className="font-normal text-neutral-400">
                            价格未公布
                          </span>
                        )}
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-teal">
                      {dates ?? "日期未公布"}
                    </p>
                    {s.dateStatus !== "confirmed" && (
                      <p className="text-xs text-neutral-500">
                        {zs?.previousRun
                          ? `上次举办：${zs.previousRun}。尚未重新公布。`
                          : "今年的日期尚未公布。"}
                      </p>
                    )}

                    <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm text-neutral-600 sm:grid-cols-2">
                      <div>
                        <dt className="inline font-semibold">年龄：</dt>
                        <dd className="inline">
                          {ages ?? (
                            <span className="text-neutral-400">
                              未公布，请咨询主办方
                            </span>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className="inline font-semibold">形式：</dt>
                        <dd className="inline">{FORMAT_ZH[s.format]}</dd>
                      </div>
                      {s.hours && (
                        <div>
                          <dt className="inline font-semibold">时间：</dt>
                          <dd className="inline">{zs?.hours ?? s.hours}</dd>
                        </div>
                      )}
                      {s.minimumBooking && (
                        <div>
                          <dt className="inline font-semibold">最少预订：</dt>
                          <dd className="inline">{zs?.minimumBooking ?? s.minimumBooking}</dd>
                        </div>
                      )}
                      {s.lunchIncluded !== undefined && (
                        <div>
                          <dt className="inline font-semibold">午餐：</dt>
                          <dd className="inline">
                            {s.lunchIncluded ? "含午餐" : "不含午餐"}
                          </dd>
                        </div>
                      )}
                      {s.nights !== undefined && (
                        <div>
                          <dt className="inline font-semibold">住宿晚数：</dt>
                          <dd className="inline">{s.nights}</dd>
                        </div>
                      )}
                      {s.supervisionRatio && (
                        <div>
                          <dt className="inline font-semibold">师生比：</dt>
                          <dd className="inline">{zs?.supervisionRatio ?? s.supervisionRatio}</dd>
                        </div>
                      )}
                      {venue && (
                        <div className="sm:col-span-2">
                          <dt className="inline font-semibold">地点：</dt>
                          <dd className="inline">{venue}</dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {s.categories.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal"
                        >
                          {CATEGORY_ZH[c]}
                        </span>
                      ))}
                    </div>

                    {s.note && (
                      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                        {zs?.note ?? s.note}
                      </p>
                    )}

                    {s.bookingUrl && (
                      <a
                        href={s.bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-sm font-semibold text-orange"
                      >
                        前往主办方预订 &rarr;
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Host relationships */}
        {hosts.length > 0 && (
          <div className="mt-8">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              同一校区内的其他营地
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              它们是独立的机构，价格和预订方式各不相同。
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              {hosts.map((h) => (
                <li key={h.slug}>
                  <Link
                    href={`/zh/camps/${h.slug}`}
                    className="font-semibold text-orange"
                  >
                    {h.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hostedAt.length > 0 && (
          <div className="mt-8">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              举办地点
            </h2>
            <ul className="mt-3 space-y-1 text-sm">
              {hostedAt.map((h) => (
                <li key={h.slug}>
                  <Link
                    href={`/zh/camps/${h.slug}`}
                    className="font-semibold text-orange"
                  >
                    {h.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/zh/camps"
            className="rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            返回全部假期营
          </Link>
          <Link
            href="/school-breaks"
            hrefLang="en"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:border-orange hover:text-orange"
          >
            学校假期日期（英文页面）
          </Link>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-neutral-500">
          {COMMON_ZH.translationNote}{" "}
          <Link
            href={`/camps/${camp.slug}`}
            lang="en"
            hrefLang="en"
            className="font-semibold text-purple underline"
          >
            {COMMON_ZH.backToEnglish}
          </Link>
        </p>
      </div>
    </>
  );
}
