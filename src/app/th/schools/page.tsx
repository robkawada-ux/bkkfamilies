import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SchoolDirectoryTh from "@/components/th/SchoolDirectoryTh";
import { SCHOOLS } from "@/lib/schools";
import { SCHOOLS_TH } from "@/lib/th/schools";
import { thMetadata } from "@/lib/i18n";
import { COMMON_TH } from "@/lib/th/common";

const SITE = "https://www.bkkfamilies.com";
const LIST = SCHOOLS.filter((s) => SCHOOLS_TH[s.slug]?.description);

const TITLE = "โรงเรียนนานาชาติในกรุงเทพฯ";
const DESCRIPTION = `ดูโรงเรียนนานาชาติ ${LIST.length} แห่งในกรุงเทพฯ ตามย่าน หลักสูตร และงบประมาณ โรงเรียนที่ประกาศตารางค่าเล่าเรียนปีการศึกษา 2026/27 เราใช้ตัวเลขจากตารางของโรงเรียนโดยตรง`;

export const metadata: Metadata = thMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: "/schools",
});

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE}/th` },
      { "@type": "ListItem", position: 2, name: "โรงเรียนนานาชาติ", item: `${SITE}/th/schools` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "โรงเรียนนานาชาติในกรุงเทพฯ",
    inLanguage: "th",
    numberOfItems: LIST.length,
    itemListElement: LIST.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${SITE}/th/schools/${s.slug}`,
    })),
  },
];

export default function SchoolsPageTh() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        color="teal"
        eyebrow="หาโรงเรียนที่ใช่"
        title="โรงเรียนนานาชาติในกรุงเทพฯ"
        subtitle="การเลือกโรงเรียนในกรุงเทพฯ ไม่ใช่เรื่องง่าย กรองตามย่าน หลักสูตร และงบประมาณ จะช่วยให้ตัดตัวเลือกได้เร็ว"
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-neutral-600">
          {COMMON_TH.translationNote}
        </p>
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-neutral-600">
          โรงเรียนนานาชาติที่เรารวบรวมต้องได้รับอนุญาตจาก OPEC (สำนักงานคณะกรรมการส่งเสริมการศึกษาเอกชน) ให้เป็นโรงเรียนนานาชาติ หรือได้รับการรับรองจากหน่วยงานที่ OPEC ยอมรับ เช่น CIS, WASC, NEASC หรือ COBIS โรงเรียนสองภาษาและโรงเรียนหลักสูตร English Program ที่ใช้หลักสูตรแกนกลางของไทยไม่อยู่ในขอบเขตนี้ โรงเรียนที่ไม่ตรงตามเกณฑ์นี้ทั้งหมดจะมีหมายเหตุไว้ในหน้าของโรงเรียนนั้น
        </p>
        <SchoolDirectoryTh />
      </div>
    </>
  );
}
