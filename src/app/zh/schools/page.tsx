import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SchoolDirectoryZh from "@/components/zh/SchoolDirectoryZh";
import { SCHOOLS } from "@/lib/schools";
import { SCHOOLS_ZH } from "@/lib/zh/schools";
import { zhMetadata } from "@/lib/i18n";
import { COMMON_ZH } from "@/lib/zh/common";

const SITE = "https://www.bkkfamilies.com";
const LIST = SCHOOLS.filter((s) => SCHOOLS_ZH[s.slug]?.description);

const TITLE = "曼谷国际学校";
const DESCRIPTION = `按区域、课程体系和预算浏览曼谷的 ${LIST.length} 所国际学校。凡学校公布了2026/27学年收费表的，学费都直接取自学校自己的收费表。`;

export const metadata: Metadata = zhMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: "/schools",
});

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: `${SITE}/zh` },
      { "@type": "ListItem", position: 2, name: "国际学校", item: `${SITE}/zh/schools` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "曼谷国际学校",
    inLanguage: "zh-Hans",
    numberOfItems: LIST.length,
    itemListElement: LIST.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${SITE}/zh/schools/${s.slug}`,
    })),
  },
];

export default function SchoolsPageZh() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        color="teal"
        eyebrow="找到合适的学校"
        title="曼谷国际学校"
        subtitle="在曼谷选学校并不容易。按区域、课程体系和预算筛选，可以很快缩小范围。"
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-neutral-600">
          {COMMON_ZH.translationNote}
        </p>
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-neutral-600">
          我们收录的国际学校，须经 OPEC（泰国私立教育委员会办公室）许可为国际学校，或获得 CIS、WASC、NEASC
          或 COBIS 等 OPEC 认可机构的认证。采用泰国国家课程的双语学校和 English Program 学校不在收录范围内。少数未完全符合这一标准的学校，会在其页面上注明。
        </p>
        <SchoolDirectoryZh />
      </div>
    </>
  );
}
