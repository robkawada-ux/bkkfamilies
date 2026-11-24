import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROVIDERS, type ProviderCategory } from "@/lib/learningSupport";
import {
  PROVIDERS_TH,
  CATEGORY_TH,
  TAG_TH,
  DELIVERY_TH,
  areaTh,
  languageTh,
  checkedTh,
  metaDescriptionTh,
} from "@/lib/th/learningSupport";
import { COMMON_TH } from "@/lib/th/common";
import { thMetadata, thPath } from "@/lib/i18n";
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
const LISTED = PROVIDERS.filter((p) => PROVIDERS_TH[p.slug]);

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
  const th = PROVIDERS_TH[slug];
  return thMetadata({
    title: `${provider.name} | ศูนย์สนับสนุนการเรียนรู้ในกรุงเทพฯ`,
    description: metaDescriptionTh(th.description),
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

export default async function ThProviderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = LISTED.find((p) => p.slug === slug);
  if (!provider) return notFound();
  const th = PROVIDERS_TH[slug];

  const url = `${SITE}${thPath(`/learning-support/${provider.slug}`)}`;
  const sameAs = [provider.facebook, provider.instagram].filter(Boolean);
  // Street addresses stay in English; prose addresses have a Chinese reading.
  const address = th.address ?? provider.address;
  const addressLang = th.address ? undefined : "en";
  const paragraphs = th.description.split("\n\n");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE}${thPath("/")}` },
        {
          "@type": "ListItem",
          position: 2,
          name: "การสนับสนุนการเรียนรู้",
          item: `${SITE}${thPath("/learning-support")}`,
        },
        { "@type": "ListItem", position: 3, name: provider.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url,
      name: provider.name,
      inLanguage: "th",
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
            href="/th/learning-support"
            className="text-sm font-semibold text-white/80 hover:text-white"
          >
            กลับไปที่การสนับสนุนการเรียนรู้
          </Link>
          <p className="mt-4 text-xs font-bold tracking-widest text-white/70">
            {CATEGORY_TH[provider.category]}
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
                  {TAG_TH[t]}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-12">
        <div className="grid gap-3 sm:grid-cols-2">
          <Fact label="พื้นที่" value={areaTh(provider.area)} />
          {th.ages && <Fact label="อายุ" value={th.ages} />}
          {provider.languages && provider.languages.length > 0 && (
            <Fact label="ภาษาที่ให้บริการ" value={provider.languages.map(languageTh).join(", ")} />
          )}
          {provider.delivery && provider.delivery.length > 0 && (
            <Fact label="รูปแบบบริการ" value={provider.delivery.map((d) => DELIVERY_TH[d]).join(", ")} />
          )}
        </div>

        <div className="mt-8 space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="leading-relaxed text-neutral-700">
              {para}
            </p>
          ))}
        </div>

        {th.note && (
          <div className="mt-8 rounded-xl border-l-4 border-orange bg-orange/5 p-5">
            <p className="text-xs font-bold text-orange">ควรรู้</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{th.note}</p>
          </div>
        )}

        <div className="mt-10">
          <h2 className="font-heading text-lg font-bold text-purple-dark">บริการที่ให้</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {th.services.map((s) => (
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
          <h2 className="font-heading text-lg font-bold text-purple-dark">ช่องทางติดต่อ</h2>
          <dl className="mt-3 space-y-2 text-sm">
            {address && (
              <div>
                <dt className="inline font-semibold text-neutral-500">ที่อยู่:</dt>
                <dd lang={addressLang} className="inline text-neutral-700">
                  {address}
                </dd>
              </div>
            )}
            {provider.phone && (
              <div>
                <dt className="inline font-semibold text-neutral-500">โทรศัพท์:</dt>
                <dd className="inline text-neutral-700">
                  <a href={`tel:${provider.phone.replace(/\s/g, "")}`}>{provider.phone}</a>
                </dd>
              </div>
            )}
            {provider.email && (
              <div>
                <dt className="inline font-semibold text-neutral-500">อีเมล:</dt>
                <dd className="inline text-neutral-700">
                  <a href={`mailto:${provider.email}`}>{provider.email}</a>
                </dd>
              </div>
            )}
            {provider.facebook && (
              <div>
                <dt className="inline font-semibold text-neutral-500">Facebook:</dt>
                <dd className="inline">
                  <a
                    href={provider.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange"
                  >
                    ดูหน้าเพจ
                  </a>
                </dd>
              </div>
            )}
            {provider.instagram && (
              <div>
                <dt className="inline font-semibold text-neutral-500">Instagram:</dt>
                <dd className="inline">
                  <a
                    href={provider.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange"
                  >
                    ดูหน้าเพจ
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
              เยี่ยมชมเว็บไซต์ทางการ
            </a>
          ) : (
            <p className="mt-5 text-sm text-neutral-500">
              ไม่มีเว็บไซต์ทางการในรายการ โปรดใช้ช่องทางติดต่อด้านบน
            </p>
          )}

          <p className="mt-4 text-xs text-neutral-400">
            ตรวจสอบข้อมูลล่าสุดเมื่อ {checkedTh(provider.checked)} ควรยืนยันกับหน่วยงานโดยตรงก่อนไป
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-purple-dark">เคยใช้บริการที่นี่ไหม</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            ครอบครัวอื่นอยากฟังประสบการณ์ของคุณ ยินดีมาแบ่งปันในกลุ่ม Bangkok Expat Families ที่ผู้ปกครองหลายพันคนในเมืองแลกเปลี่ยนกัน (กลุ่มภาษาอังกฤษ)
          </p>
          <a
            href="https://www.facebook.com/groups/395501457186828"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-semibold text-orange"
          >
            ถามในกลุ่ม Bangkok Expat Families
          </a>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-lg font-bold text-purple-dark">หน่วยงานที่คล้ายกัน</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/th/learning-support/${r.slug}`}
                  className="block rounded-xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 lang="en" className="font-heading text-sm font-bold text-purple-dark">
                    {r.name}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">{areaTh(r.area)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="mt-10 text-xs leading-relaxed text-neutral-400">{COMMON_TH.translationNote}</p>

        <div className="mt-8 border-t border-black/10 pt-8">
          <Link href="/th/learning-support" className="text-sm font-semibold text-orange">
            กลับไปที่หน่วยงานสนับสนุนการเรียนรู้ทั้งหมด
          </Link>
        </div>
      </div>
    </article>
  );
}
