import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROVIDERS, type ProviderCategory } from "@/lib/learningSupport";
import {
  PROVIDERS_ZH,
  CATEGORY_ZH,
  TAG_ZH,
  DELIVERY_ZH,
  areaZh,
  languageZh,
  checkedZh,
  metaDescriptionZh,
} from "@/lib/zh/learningSupport";
import { COMMON_ZH } from "@/lib/zh/common";
import { zhMetadata, zhPath } from "@/lib/i18n";
import { SITE } from "@/lib/seo";

/** Closest schema.org type for each kind of provider (same map as the English page). */
const SCHEMA_TYPE: Record<ProviderCategory, string> = {
  "Assessment & diagnosis": "MedicalBusiness",
  "Therapy clinic": "MedicalBusiness",
  "ABA & behaviour support": "MedicalBusiness",
  "Hospital clinic": "MedicalClinic",
  "Specialist school": "EducationalOrganization",
  "School learning support": "EducationalOrganization",
  "Tutoring & mentoring": "EducationalOrganization",
  "Vocational & transition": "EducationalOrganization",
  "Enrichment & general learning": "EducationalOrganization",
  "Government service": "GovernmentOrganization",
  "Parent support": "Organization",
  "Special Needs Support and Consultancy": "EducationalOrganization",
};

// Only providers with a Chinese write-up get a Chinese page.
const LISTED = PROVIDERS.filter((p) => PROVIDERS_ZH[p.slug]);

export function generateStaticParams() {
  return LISTED.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const provider = LISTED.find((p) => p.slug === slug);
  if (!provider) return {};
  const zh = PROVIDERS_ZH[slug];
  return zhMetadata({
    title: `${provider.name} | 曼谷学习支持`,
    description: metaDescriptionZh(zh.description),
    enPath: `/learning-support/${provider.slug}`,
  });
}

function Fact({ label, value, lang }: { label: string; value: string; lang?: string }) {
  return (
    <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
      <p className="text-xs text-neutral-400">{label}</p>
      <p lang={lang} className="text-sm font-semibold text-purple-dark">
        {value}
      </p>
    </div>
  );
}

export default async function ZhProviderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = LISTED.find((p) => p.slug === slug);
  if (!provider) return notFound();
  const zh = PROVIDERS_ZH[slug];

  const url = `${SITE}${zhPath(`/learning-support/${provider.slug}`)}`;
  const sameAs = [provider.facebook, provider.instagram].filter(Boolean);
  // Street addresses stay in English; prose addresses have a Chinese reading.
  const address = zh.address ?? provider.address;
  const addressLang = zh.address ? undefined : "en";
  const paragraphs = zh.description.split("\n\n");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: `${SITE}${zhPath("/")}` },
        {
          "@type": "ListItem",
          position: 2,
          name: "学习支持",
          item: `${SITE}${zhPath("/learning-support")}`,
        },
        { "@type": "ListItem", position: 3, name: provider.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url,
      name: provider.name,
      inLanguage: "zh-Hans",
      mainEntity: {
        "@type": SCHEMA_TYPE[provider.category],
        name: provider.name,
        description: paragraphs[0],
        areaServed: provider.area,
        ...(provider.website ? { url: provider.website } : {}),
        ...(provider.phone ? { telephone: provider.phone } : {}),
        ...(provider.email ? { email: provider.email } : {}),
        ...(provider.address
          ? {
              address: {
                "@type": "PostalAddress",
                streetAddress: provider.address,
                addressCountry: "TH",
              },
            }
          : {}),
        ...(provider.languages?.length ? { availableLanguage: provider.languages } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
    },
  ];

  const related = LISTED.filter(
    (p) => p.category === provider.category && p.slug !== provider.slug,
  ).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-purple px-4 py-12 text-white">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/zh/learning-support"
            className="text-sm font-semibold text-white/80 hover:text-white"
          >
            返回学习支持
          </Link>
          <p className="mt-4 text-xs font-bold tracking-widest text-white/70">
            {CATEGORY_ZH[provider.category]}
          </p>
          <h1 lang="en" className="mt-2 font-heading text-3xl font-bold md:text-4xl">
            {provider.name}
          </h1>
          {provider.tags && provider.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {provider.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium"
                >
                  {TAG_ZH[t]}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-12">
        <div className="grid gap-3 sm:grid-cols-2">
          <Fact label="区域" value={areaZh(provider.area)} />
          {zh.ages && <Fact label="年龄" value={zh.ages} />}
          {provider.languages && provider.languages.length > 0 && (
            <Fact label="服务语言" value={provider.languages.map(languageZh).join("、")} />
          )}
          {provider.delivery && provider.delivery.length > 0 && (
            <Fact label="服务方式" value={provider.delivery.map((d) => DELIVERY_ZH[d]).join("、")} />
          )}
        </div>

        <div className="mt-8 space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="leading-relaxed text-neutral-700">
              {para}
            </p>
          ))}
        </div>

        {zh.note && (
          <div className="mt-8 rounded-xl border-l-4 border-orange bg-orange/5 p-5">
            <p className="text-xs font-bold text-orange">家长须知</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{zh.note}</p>
          </div>
        )}

        <div className="mt-10">
          <h2 className="font-heading text-lg font-bold text-purple-dark">提供的服务</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {zh.services.map((s) => (
              <li
                key={s}
                className="rounded-lg border border-black/5 bg-white px-3 py-2 text-sm text-neutral-700 shadow-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">联系方式</h2>
          <dl className="mt-3 space-y-2 text-sm">
            {address && (
              <div>
                <dt className="inline font-semibold text-neutral-500">地址：</dt>
                <dd lang={addressLang} className="inline text-neutral-700">
                  {address}
                </dd>
              </div>
            )}
            {provider.phone && (
              <div>
                <dt className="inline font-semibold text-neutral-500">电话：</dt>
                <dd className="inline text-neutral-700">
                  <a href={`tel:${provider.phone.replace(/\s/g, "")}`}>{provider.phone}</a>
                </dd>
              </div>
            )}
            {provider.email && (
              <div>
                <dt className="inline font-semibold text-neutral-500">邮箱：</dt>
                <dd className="inline text-neutral-700">
                  <a href={`mailto:${provider.email}`}>{provider.email}</a>
                </dd>
              </div>
            )}
            {provider.facebook && (
              <div>
                <dt className="inline font-semibold text-neutral-500">Facebook：</dt>
                <dd className="inline">
                  <a
                    href={provider.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange"
                  >
                    查看主页
                  </a>
                </dd>
              </div>
            )}
            {provider.instagram && (
              <div>
                <dt className="inline font-semibold text-neutral-500">Instagram：</dt>
                <dd className="inline">
                  <a
                    href={provider.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange"
                  >
                    查看主页
                  </a>
                </dd>
              </div>
            )}
          </dl>

          {provider.website ? (
            <a
              href={provider.website}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              访问官方网站
            </a>
          ) : (
            <p className="mt-5 text-sm text-neutral-500">
              未列出官方网站，请使用上方的联系方式。
            </p>
          )}

          <p className="mt-4 text-xs text-neutral-400">
            信息最后核实于{checkedZh(provider.checked)}。出行前请务必直接与机构确认。
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-purple-dark">用过这家机构吗？</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            其他家庭很想听听你的体验。欢迎到 Bangkok Expat Families 社群分享你的经历，城里成千上万的家长在那里互相交流（英文社群）。
          </p>
          <a
            href="https://www.facebook.com/groups/395501457186828"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-semibold text-orange"
          >
            到 Bangkok Expat Families 提问
          </a>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-lg font-bold text-purple-dark">类似的机构</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/zh/learning-support/${r.slug}`}
                  className="block rounded-xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 lang="en" className="font-heading text-sm font-bold text-purple-dark">
                    {r.name}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">{areaZh(r.area)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="mt-10 text-xs leading-relaxed text-neutral-400">{COMMON_ZH.translationNote}</p>

        <div className="mt-8 border-t border-black/10 pt-8">
          <Link href="/zh/learning-support" className="text-sm font-semibold text-orange">
            返回全部学习支持机构
          </Link>
        </div>
      </div>
    </article>
  );
}
