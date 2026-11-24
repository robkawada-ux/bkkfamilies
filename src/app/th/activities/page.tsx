import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import ActivitiesDirectoryTh from "@/components/th/ActivitiesDirectoryTh";
import { TH_ACTIVITIES } from "@/lib/th/activities";
import { thMetadata } from "@/lib/i18n";
import { COMMON_TH } from "@/lib/th/common";
import { SITE } from "@/lib/seo";

const TITLE = "กิจกรรมสำหรับครอบครัวในกรุงเทพฯ: เสาร์อาทิตย์ไปไหนดี และคลาสสำหรับเด็ก";
const DESCRIPTION =
  "ที่เที่ยววันหยุดและคลาสประจำสัปดาห์สำหรับครอบครัวในกรุงเทพฯ ตั้งแต่สนามเด็กเล่นในร่ม พิพิธภัณฑ์สัตว์น้ำ พิพิธภัณฑ์ ไปจนถึงว่ายน้ำ ฟุตบอล และเต้น พร้อมเวลาเปิด อายุที่เหมาะสม และราคาจริง วันฝนตกหรือฝุ่นหนาเลือกดูเฉพาะในร่มได้";

export const metadata: Metadata = thMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: "/activities",
});

const DAYS_OUT = TH_ACTIVITIES.filter((a) => a.type === "Day out").length;
const CLASSES = TH_ACTIVITIES.filter((a) => a.type === "Weekly class").length;

const FAQ = [
  {
    q: "วันฝนตกในกรุงเทพฯ พาลูกไปไหนดี",
    a: "เลือก \"เฉพาะในร่ม\" ในไดเรกทอรีด้านบน ห้างสรรพสินค้าในกรุงเทพฯ รองรับที่เที่ยวในร่มเกือบทั้งหมด HarborLand, Playmondo และ MELAND เป็นสนามเด็กเล่นในร่มขนาดใหญ่ ชั้นใต้ดินของสยามพารากอนมี SEA LIFE BOUNCE มีแทรมโพลีน และ WOW Park มีวิทยาศาสตร์แบบลงมือทำ รายการเดียวกันนี้ใช้ได้กับวันฝุ่นหนาช่วงธันวาคมถึงมีนาคม และช่วงบ่ายที่ร้อนที่สุดของเดือนเมษายนและพฤษภาคม",
  },
  {
    q: "ที่เที่ยวสำหรับครอบครัวในกรุงเทพฯ ที่ไม่เสียค่าเข้ามีที่ไหนบ้าง",
    a: "ตั้งตัวกรองราคาเป็น \"ฟรี\" สวนสาธารณะ (สวนลุมพินีมีห้องสมุดเด็กที่เข้าฟรี และมีสวนเบญจกิติ) พิพิธภัณฑ์กองทัพอากาศ BACC MOCA ที่เด็กอายุต่ำกว่า 15 ปีเข้าฟรี และตลาดสุดสัปดาห์ ไม่เก็บค่าเข้า ส่วน Museum Siam ที่ผ่านมาก็ให้เด็กอายุต่ำกว่า 15 ปีเข้าฟรี พิพิธภัณฑ์เด็กเชิงสำรวจสองแห่งเดิมเข้าฟรีเช่นกัน แต่ปิดไปแล้วเมื่อวันที่ 1 ตุลาคม 2026 และกรุงเทพมหานครกำลังคัดเลือกผู้ดำเนินการรายใหม่",
  },
  {
    q: "KidZania กรุงเทพฯ ยังเปิดอยู่ไหม",
    a: "ไม่แล้ว KidZania Bangkok ที่สยามพารากอนปิดถาวรแล้ว ชั้น 5 ของสยามพารากอนมี MELAND สวนสนุกในร่มขนาดใหญ่แห่งใหม่ พร้อมเมืองจำลองให้เล่นบทบาทสมมติ ซึ่งเป็นตัวเลือกที่ใกล้เคียงที่สุดในตอนนี้",
  },
  {
    q: "สนามเด็กเล่นในร่มในกรุงเทพฯ ราคาเท่าไร",
    a: "ประมาณ 200 ถึง 800 บาทต่อเด็กหนึ่งคน ซึ่งมักเล่นได้สองถึงสามชั่วโมง ผู้ใหญ่เสียค่าเข้าถูกกว่าหรือไม่เสียเลย คาเฟ่สำหรับครอบครัวขนาดเล็กและศูนย์เด็กเล่นในชุมชนอยู่ช่วงราคาต่ำ ส่วนสนามเด็กเล่นในห้างขนาดใหญ่ เช่น MEGA HarborLand, Playmondo CentralWorld และ MELAND อยู่ช่วงราคาสูง",
  },
  {
    q: "คลาสประจำสัปดาห์ในกรุงเทพฯ คิดราคาอย่างไร",
    a: "โรงเรียนสอนว่ายน้ำ สโมสรยิมนาสติก และอะคาเดมีฟุตบอลส่วนใหญ่ขายเป็นภาคเรียนหรือแพ็กเกจหลายคลาส ไม่ขายเป็นครั้ง ค่าเรียนว่ายน้ำหนึ่งภาคเรียนมักอยู่ที่ 6,000 ถึง 11,000 บาท หลายแห่งมีคลาสทดลองฟรีหรือราคาถูกก่อน ควรสอบถาม คลาสมักพักช่วงปิดเทอมของโรงเรียนและเปลี่ยนเป็นแคมป์ปิดเทอม ดูได้ในไดเรกทอรีแคมป์ของเรา",
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
      { "@type": "ListItem", position: 2, name: "กิจกรรมสำหรับครอบครัว", item: `${SITE}/th/activities` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "กิจกรรมสำหรับครอบครัวในกรุงเทพฯ",
    inLanguage: "th",
    numberOfItems: TH_ACTIVITIES.length,
    itemListElement: TH_ACTIVITIES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.name,
      url: `${SITE}/th/activities/${a.slug}`,
    })),
  },
];

// Links to pages that exist in Chinese go to /th; the rest go to the English page.
const ALSO: { href: string; title: string; desc: string; en?: boolean }[] = [
  {
    href: "/th/playgroups",
    title: "เพลย์กรุ๊ปสำหรับครอบครัว",
    desc: "ค้นหาเพลย์กรุ๊ปสำหรับทารกและเด็กเล็กตามวัน อายุ และพื้นที่",
  },
  {
    href: "/th/camps",
    title: "แคมป์ปิดเทอม",
    desc: "กรองแคมป์ตามวันที่ลูกหยุดเรียน",
  },
  {
    href: "/blog/top-museums-for-kids-in-bangkok",
    title: "พิพิธภัณฑ์สำหรับเด็ก (ภาษาอังกฤษ)",
    desc: "ที่ไหนเปิด ราคาเท่าไร และที่ไหนปิดอยู่ตอนนี้",
    en: true,
  },
  {
    href: "/blog/9-things-to-do-in-bangkok-with-kids",
    title: "9 อย่างที่ครอบครัวเราชอบที่สุด (ภาษาอังกฤษ)",
    desc: "ที่ครอบครัวเราชอบจริงๆ พร้อมคำเตือนตรงไปตรงมา",
    en: true,
  },
];

export default function ThActivitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="ที่เที่ยววันหยุดและคลาสประจำสัปดาห์"
        title="กิจกรรมสำหรับครอบครัวในกรุงเทพฯ: เสาร์อาทิตย์ไปไหนดี"
        subtitle={`ที่เที่ยววันหยุด ${DAYS_OUT} แห่งและคลาสประจำสัปดาห์ ${CLASSES} คลาส พร้อมเวลาเปิด อายุที่เหมาะสม และราคาจริง เมื่ออากาศแย่ เลือกดูเฉพาะในร่มได้`}
        color="green"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            พ่อแม่ทุกคนในกรุงเทพฯ รู้จักคำถามเช้าวันเสาร์นี้ดี อากาศ 34 องศา อาจมีฝน เด็กๆ นั่งอยู่ในบ้านไม่ไหวแล้ว วันนี้จะไปไหนดี รายการนี้คือสิ่งที่เราอยากมีตอนลูกยังเล็ก ถ้าอยากได้แผนสำหรับวันหยุด ดูที่เที่ยววันหยุด ถ้าอยากได้จังหวะประจำ ดูคลาสประจำสัปดาห์ และเมื่ออากาศหรือฝุ่นไม่ให้ทางเลือก ใช้ตัวกรองในร่ม
          </p>
          <p>
            การ์ดทุกใบระบุอายุที่เหมาะสม ราคา และพื้นที่ หากที่ไหนปิดอยู่ตอนนี้ เราจะเขียนไว้ตรงๆ แทนที่จะลบออกเงียบๆ และหากไม่เปิดเผยราคา เราก็บอกตามจริงแทนที่จะเดา ราคาในกรุงเทพฯ เปลี่ยนบ่อย โดยเฉพาะสถานที่ใหญ่ๆ จึงควรถือเป็นแนวทางและยืนยันอีกครั้งก่อนไป ไม่มีใครต้องจ่ายเงินเพื่อให้ได้ลงรายการ
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ALSO.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              {...(l.en ? { lang: "en", hrefLang: "en" } : {})}
              className="rounded-xl border border-black/5 bg-teal-50 p-4 transition hover:shadow-md"
            >
              <p className="font-heading font-bold text-purple-dark">{l.title}</p>
              <p className="mt-1 text-sm text-neutral-600">{l.desc}</p>
            </Link>
          ))}
        </div>

        <div id="directory" className="mt-12 scroll-mt-28">
          <ActivitiesDirectoryTh />
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">คำถามที่ผู้ปกครองถามบ่อย</h2>
          <div className="mt-6 space-y-4">
            {FAQ.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <h3 className="font-heading font-bold text-purple-dark">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            คุณดำเนินกิจกรรมหรือรู้จักสถานที่ที่เรายังไม่ได้ลงไว้ไหม
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            หากเวลาหรือราคาของคุณเปลี่ยน สถานที่หรือคลาสของคุณยังไม่อยู่ในรายการ หรือมีข้อผิดพลาดตรงไหน โปรดแจ้งเรา เราจะแก้ไข การลงรายการไม่เสียค่าใช้จ่ายเสมอ
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
          <Link href="/activities" lang="en" hrefLang="en" className="underline">
            ดูฉบับภาษาอังกฤษ
          </Link>
        </p>
      </div>
    </>
  );
}
