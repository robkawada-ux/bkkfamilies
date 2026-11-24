import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CampsDirectoryTh from "@/components/th/CampsDirectoryTh";
import { CAMPS, upcomingSessions } from "@/lib/camps";
import { CAMPS_TH } from "@/lib/th/camps";
import { COMMON_TH } from "@/lib/th/common";
import { thMetadata } from "@/lib/i18n";

const TITLE = "แคมป์ปิดเทอมในกรุงเทพฯ";
const DESCRIPTION =
  "แคมป์ปิดเทอมของโรงเรียนในกรุงเทพฯ ที่เราตรวจสอบได้ พร้อมวัน อายุ และราคาจริง กรองตามสัปดาห์ที่ลูกหยุดเรียนจริง";

export const metadata: Metadata = thMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: "/camps",
});

// Re-render hourly so camps drop off the day after they finish.
export const revalidate = 86400; // daily: camp weeks drop off by date, so once a day is enough (CPU cost)

const SITE = "https://www.bkkfamilies.com";

const FAQ = [
  {
    q: "โรงเรียนในกรุงเทพฯ ปิดเทอมเมื่อไร",
    a: "ไม่มีคำตอบเดียว ไดเรกทอรีนี้จึงกรองตามวันที่ ไม่ใช่ตามชื่อช่วงปิดเทอม เฉพาะปิดเทอมกลางภาคเดือนตุลาคม โรงเรียนก็แบ่งเป็นสองสัปดาห์ต่างกัน และปิดเทอมฤดูใบไม้ผลิกระจายอยู่ในห้าสัปดาห์ทั่วเมือง หน้าวันปิดเทอมของโรงเรียนของเรา (ขณะนี้มีเฉพาะภาษาอังกฤษ) รวบรวมวันที่ตรวจสอบแล้วของแต่ละโรงเรียน",
  },
  {
    q: "แคมป์ปิดเทอมราคาเท่าไร",
    a: "แคมป์เต็มวันของโรงเรียนนานาชาติ รวมอาหารกลางวัน ช่วงที่พบบ่อยอยู่ที่ประมาณ 9,000 ถึง 15,000 บาทต่อสัปดาห์ ราคาต่ำกว่านี้มักเป็นสถานเลี้ยงเด็กหรือแคมป์ครึ่งวัน ส่วนราคาสูงกว่านี้มาก มักเป็นคอร์สเฉพาะทาง ผู้ดำเนินการภายนอก หรือค่าแบรนด์ ผู้จัดเพียงไม่กี่รายเผยแพร่ราคา รายที่เผยแพร่เราลงไว้ทั้งหมด",
  },
  {
    q: "ต้องเรียนที่โรงเรียนนั้นจึงจะเข้าแคมป์ได้ไหม",
    a: "มักไม่ต้อง แคมป์ของโรงเรียนนานาชาติในกรุงเทพฯ ส่วนใหญ่เปิดรับเด็กจากทุกโรงเรียน และบางแห่งรับเด็กนอกโรงเรียนอย่างจริงจัง ควรยืนยันตอนจอง เพราะบางโปรแกรมให้สิทธิ์นักเรียนของตนก่อน",
  },
  {
    q: "ทำไมบางแคมป์ระบุว่า \"ยังไม่ประกาศใหม่\"",
    a: "ผู้จัดแคมป์มักประกาศวันที่ช้ามาก บ่อยครั้งเพียงสี่ถึงหกสัปดาห์ล่วงหน้า แทนที่จะซ่อนแคมป์ที่จัดทุกปี เราลงวันที่จัดครั้งล่าสุดไว้และระบุให้ชัดเจน เพื่อบอกว่าควรติดตามใคร ซึ่งมีประโยชน์กว่าหน้าว่าง",
  },
  {
    q: "ควรจองเมื่อไร",
    a: "แคมป์สงกรานต์และแคมป์ฤดูร้อนควรจองตั้งแต่เดือนมกราคม ส่วนหนึ่งเพราะตรงกับช่วงเดินทางหนาแน่น และอีกส่วนเพราะโปรแกรมฤดูร้อนเปิดรับสมัครเร็วและมีราคาจองล่วงหน้า สำหรับแคมป์ปิดเทอมกลางภาคเดือนตุลาคมและฤดูใบไม้ผลิ มักจองล่วงหน้าสี่ถึงหกสัปดาห์ก็พอ",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "th",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE}/th` },
      {
        "@type": "ListItem",
        position: 2,
        name: "แคมป์ปิดเทอม",
        item: `${SITE}/th/camps`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    inLanguage: "th",
    name: "ผู้จัดแคมป์ปิดเทอมในกรุงเทพฯ",
    numberOfItems: CAMPS.filter((c) => CAMPS_TH[c.slug]).length,
    itemListElement: CAMPS.filter((c) => CAMPS_TH[c.slug]).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${SITE}/th/camps/${c.slug}`,
    })),
  },
];

export default function CampsPageTh() {
  const sessions = upcomingSessions();
  const weeks = sessions.filter((s) => CAMPS_TH[s.camp.slug]);
  const camps = new Set(weeks.map((s) => s.camp.slug));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="ปิดเทอม จัดให้ชัดในที่เดียว"
        title="แคมป์ปิดเทอมในกรุงเทพฯ"
        subtitle={`วัน อายุ และราคาจริง ${weeks.length} รอบจากผู้จัด ${camps.size} ราย ตรวจสอบทีละแห่งและอธิบายตามจริง`}
        color="purple"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            การหาแคมป์ปิดเทอมในกรุงเทพฯ มักวุ่นวาย ผู้จัดประกาศวันที่ช้า ราคาแทบไม่เปิดเผย ข้อมูลที่คุณค้นพบครึ่งหนึ่งเป็นของปีที่แล้ว และสิ่งที่ต้องรู้จริงๆ คือลูกของคุณหยุดเรียนสัปดาห์ไหน ซึ่งไม่เหมือนบ้านข้างๆ
          </p>
          <p>
            ไดเรกทอรีนี้จึงเรียงตามวันที่ ไม่ใช่ตามชื่อฤดูกาล แต่ละรายการคือหนึ่งรอบแคมป์ ได้แก่ เริ่มเมื่อไร เหมาะกับใคร ราคาเท่าไร และอยู่ที่ไหน กรองตามสัปดาห์ที่คุณต้องการและอายุของลูก ก็ได้รายชื่อให้พิจารณาในราวสามสิบวินาที
          </p>
          <p>
            ไม่มีผู้จัดรายใดจ่ายเงินเพื่อขึ้นรายการ หากไม่เผยแพร่ราคา เราบอกตามจริง ไม่เดา หากแคมป์จัดทุกปีแต่ปีนี้ยังไม่ประกาศวันที่ เราลงวันที่จัดครั้งล่าสุดและระบุให้ชัดเจน เพราะการรู้ว่าควรติดตามใครมีประโยชน์กว่ารายการที่สั้นลง
          </p>
        </div>

        <div id="directory" className="mt-12 scroll-mt-28">
          <CampsDirectoryTh sessions={sessions} />
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-teal-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            ไม่แน่ใจว่าลูกหยุดเรียนสัปดาห์ไหน
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            ปิดเทอมของโรงเรียนนานาชาติในกรุงเทพฯ ไม่ตรงกัน ปิดเทอมกลางภาคเดือนตุลาคมแบ่งเป็นสองสัปดาห์ต่างกันตามโรงเรียน และปิดเทอมฤดูใบไม้ผลิกระจายในห้าสัปดาห์ทั่วเมือง เราตรวจปฏิทินของแต่ละโรงเรียนให้ คุณไม่ต้องหาเอง
          </p>
          <Link
            href="/school-breaks"
            hrefLang="en"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            ดูวันปิดเทอมของโรงเรียน (หน้าภาษาอังกฤษ)
          </Link>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            คำถามที่ผู้ปกครองถามบ่อย
          </h2>
          <div className="mt-6 space-y-4">
            {FAQ.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <h3 className="font-heading font-bold text-purple-dark">
                  {f.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            จัดแคมป์อยู่ หรือพบว่าเราตกหล่นไปแห่งหนึ่งไหม
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            ไดเรกทอรีนี้มีประโยชน์เมื่อทันสมัยเท่านั้น หากวันที่ของคุณเปลี่ยน แคมป์ของคุณยังไม่อยู่ในรายการ หรือมีข้อผิดพลาดตรงไหน โปรดแจ้งเรา เราจะแก้ไขให้ การลงรายการฟรีเสมอ
          </p>
          <Link
            href="/th/contact"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            ส่งการแก้ไข
          </Link>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs text-neutral-500">
          {COMMON_TH.translationNote}{" "}
          <Link href="/camps" lang="en" hrefLang="en" className="font-semibold text-purple underline">
            {COMMON_TH.backToEnglish}
          </Link>
        </p>
      </div>
    </>
  );
}
