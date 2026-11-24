import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import PlaygroupsDirectoryTh from "@/components/th/PlaygroupsDirectoryTh";
import { thPlaygroups } from "@/lib/th/playgroups";
import { thMetadata } from "@/lib/i18n";
import { COMMON_TH } from "@/lib/th/common";

const SITE = "https://www.bkkfamilies.com";

const TITLE = "เพลย์กรุ๊ปสำหรับเด็กเล็กในกรุงเทพฯ";
const DESCRIPTION =
  "เพลย์กรุ๊ปสำหรับทารกและเด็กเล็กในกรุงเทพฯ เท่าที่เราหาพบ ตรวจสอบวัน เวลา อายุ และราคากับหน้าของผู้จัดเอง กรองตามวัน อายุเด็ก ย่าน และภาษาได้";

export const metadata: Metadata = thMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: "/playgroups",
});

const LISTED = thPlaygroups();
const CONFIRMED = LISTED.filter((p) => p.status === "confirmed").length;

const FAQ = [
  {
    q: "เพลย์กรุ๊ปในกรุงเทพฯ ราคาเท่าไร",
    a: "เพลย์กรุ๊ปแบบเข้าร่วมได้เลยส่วนใหญ่คิดครั้งละ 200 ถึง 500 บาท มักคิดต่อครอบครัวหรือต่อเด็กหนึ่งคนพร้อมผู้ใหญ่หนึ่งคน เพลย์กรุ๊ปของโรงเรียนบางแห่งฟรี ส่วนคอร์สเฉพาะทาง เช่น โรงเรียนป่าหรือคลาสดนตรี ราคาประมาณ 1,000 ถึง 1,250 บาท โปรแกรมรายภาคเรียนอย่าง Lion Cubs ของ Harrow คิดเป็นรายปี และเป็นคนละประเภทกันโดยสิ้นเชิง",
  },
  {
    q: "พี่เลี้ยงพาเด็กไปเพลย์กรุ๊ปได้ไหม",
    a: "มักได้ แต่ไม่ใช่ทุกที่ เพลย์กรุ๊ปของ Shrewsbury ต้องมีผู้ปกครองหรือปู่ย่าตายายเข้าร่วม ไม่รับพี่เลี้ยงพาเด็กมาเอง และบางสถานที่อนุญาตผู้ใหญ่เพียงหนึ่งคนต่อครอบครัว เราระบุกฎเหล่านี้ไว้ในหน้าของเพลย์กรุ๊ปที่มี",
  },
  {
    q: "ลูกอายุเท่าไรเริ่มไปเพลย์กรุ๊ปได้",
    a: "เพลย์กรุ๊ปบางแห่งรับทารกตั้งแต่แรกเกิด รวมถึง Little Lion ของ Ascot, Little Bunnies ของ St Andrews, Kira Kira และกลุ่มของ Christ Church และอีกไม่กี่แห่งรับตั้งแต่หกหรือแปดเดือน ส่วนใหญ่เหมาะกับเด็กหนึ่งถึงสามขวบ สำหรับเด็กสามถึงห้าขวบมีตัวเลือกน้อยกว่า ตัวเลือกหลักคือ Big Pups ของ Bangkok Prep, Saturday Explorers ของ Firefly Forest, Little Doves ของ Wycombe Abbey และเวลานิทานวันเสาร์ของ Neilson Hays",
  },
  {
    q: "มีเพลย์กรุ๊ปช่วงสุดสัปดาห์ไหม",
    a: "มี แต่น้อยกว่าวันธรรมดามาก เลือก \"สุดสัปดาห์\" ในตัวกรองวัน Bangkok Prep, Kids Kingdom ร่วมฤดี, Annabel's, Music Club ของ HEI, Firefly Forest และ Kids' Academy เอกมัย มีรอบวันเสาร์ และมีเพลย์กรุ๊ปวันเสาร์ที่ผู้ปกครองจัดเองเดือนละครั้งในสาทร",
  },
  {
    q: "เพลย์กรุ๊ปเปิดช่วงปิดเทอมและวันที่มลพิษทางอากาศสูงไหม",
    a: "เพลย์กรุ๊ปของโรงเรียนส่วนใหญ่ตามปฏิทินภาคเรียนและหยุดช่วงปิดเทอม จึงควรยืนยันก่อนช่วงปิดกลางภาคเดือนตุลาคม คริสต์มาส สงกรานต์ และปิดเทอมฤดูร้อนที่ยาว ระหว่างเดือนธันวาคมถึงมีนาคม เพลย์กรุ๊ปบางแห่งยกเลิกในวันที่ PM2.5 สูง ควรตรวจสอบก่อนออกจากบ้าน",
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
      { "@type": "ListItem", position: 2, name: "เพลย์กรุ๊ป", item: `${SITE}/th/playgroups` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: TITLE,
    inLanguage: "th",
    numberOfItems: LISTED.length,
    itemListElement: LISTED.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${SITE}/th/playgroups/${p.slug}`,
    })),
  },
];

export default function ThPlaygroupsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="ทารกและเด็กเล็ก"
        title="เพลย์กรุ๊ปสำหรับเด็กเล็กในกรุงเทพฯ"
        subtitle={`เพลย์กรุ๊ป ${LISTED.length} แห่งทั่วเมือง พร้อมวัน เวลา อายุ และราคาจริง ${CONFIRMED} แห่งตรวจสอบกับหน้าของผู้จัดเองแล้วว่ายังจัดอยู่ในภาคเรียนนี้`}
        color="teal"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            การพาเด็กเล็กออกไปข้างนอกในกรุงเทพฯ ไม่ใช่เรื่องง่าย อากาศร้อน ฝนตกบ่อย ทางเท้าเหมือนสนามอุปสรรค และครึ่งปีที่คุณภาพอากาศไม่ดี เพลย์กรุ๊ปจึงสำคัญที่นี่มากกว่าที่บ้านเกิด เป็นที่ที่ทารกได้รู้จักทารกคนอื่น พ่อแม่มือใหม่ได้รู้จักกัน และหลายครอบครัวได้เห็นโรงเรียนที่ลูกจะเข้าเรียนจากข้างในเป็นครั้งแรก
          </p>
          <p>
            ปัญหาคือข้อมูลกระจัดกระจาย โรงเรียนซ่อนเพลย์กรุ๊ปไว้ลึกในหน้ารับสมัคร กลุ่มผู้ปกครองเก็บปฏิทินไว้ในเว็บจองของตัวเอง และรายการออนไลน์ส่วนใหญ่ล้าสมัยไปหนึ่งหรือสองปี เราตามตรวจสอบทีละแห่ง คุณกรองตามวันที่ว่าง อายุของลูก และย่านที่อยู่ได้ แต่ละการ์ดบอกว่าจัดเมื่อไร เหมาะกับใคร และราคาเท่าไร
          </p>
          <p>
            รายการที่ระบุว่า<strong>ยืนยันแล้วในภาคเรียนนี้</strong> เราอ่านพบข้อมูลจากหน้าล่าสุดของผู้จัดเองหรือปฏิทินการจองที่เป็นปัจจุบัน ส่วนรายการที่ระบุว่า<strong>โปรดตรวจสอบก่อนไป</strong> เป็นเพลย์กรุ๊ปที่มีอยู่จริง แต่ข้อมูลล่าสุดที่เผยแพร่ค่อนข้างเก่าหรือมาจากรายการอื่น ควรติดต่อก่อนไป ไม่มีผู้จัดรายใดจ่ายเงินเพื่อขึ้นรายการ
          </p>
          <p>
            คุณอาจสังเกตว่าการจองของเพลย์กรุ๊ปบางแห่งลิงก์ไปที่ชุมชนชื่อ BAMBI BAMBI เป็นชุมชนที่น่าเชื่อถือซึ่งช่วยจัดเพลย์กรุ๊ปหลายแห่งทั่วกรุงเทพฯ
          </p>
        </div>

        <div id="directory" className="mt-12 scroll-mt-28">
          <PlaygroupsDirectoryTh />
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-teal-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            ใช้เพลย์กรุ๊ปช่วยเลือกโรงเรียนหรือไม่
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            เพลย์กรุ๊ปของโรงเรียนเป็นวิธีที่ราคาถูกและกดดันน้อยที่สุดในการดูแผนกปฐมวัยจากข้างใน พบครู และคุยกับผู้ปกครองที่ลูกเรียนอยู่ ไดเรกทอรีโรงเรียนของเรารวมค่าเล่าเรียน หลักสูตร และช่วงอายุของโรงเรียนนานาชาติในกรุงเทพฯ กว่าร้อยแห่ง
          </p>
          <Link
            href="/th/schools"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            ดูไดเรกทอรีโรงเรียน
          </Link>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-purple-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            อยากรู้จักคุณแม่คนอื่นนอกเหนือจากเพลย์กรุ๊ปไหม
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            เพลย์กรุ๊ปมีไว้สำหรับเด็กเล็ก แต่ผู้ปกครองก็ต้องมีกลุ่มของตัวเองเช่นกัน โดยเฉพาะในปีแรกของการอยู่เมืองใหม่ The Village เป็นชุมชนบน WhatsApp ที่คุณแม่ในประเทศไทยแบ่งปันคำแนะนำ ถามคำถาม และหาเพื่อน พร้อมจัดนัดพบเฉพาะคุณแม่ในกรุงเทพฯ
          </p>
          <a
            href="https://thevillage.mom/mom-groups-bangkok"
            target="_blank"
            rel="noopener"
            className="mt-4 inline-block rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            เยี่ยมชม The Village (ภาษาอังกฤษ)
          </a>
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
            จัดเพลย์กรุ๊ปอยู่ หรือพบว่าเราตกหล่นไปแห่งหนึ่งไหม
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            เพลย์กรุ๊ปเปลี่ยนไปทุกภาคเรียน หากเวลาหรือราคาของคุณเปลี่ยน เพลย์กรุ๊ปของคุณยังไม่อยู่ในรายการ หรือมีข้อผิดพลาดตรงไหน โปรดแจ้งเรา เราจะแก้ไขให้ การลงรายการฟรีเสมอ
          </p>
          <Link
            href="/th/contact"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            ส่งการแก้ไข
          </Link>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs text-neutral-400">
          {COMMON_TH.translationNote}{" "}
          <Link href="/playgroups" lang="en" hrefLang="en" className="underline">
            {COMMON_TH.backToEnglish}
          </Link>
        </p>
      </div>
    </>
  );
}
