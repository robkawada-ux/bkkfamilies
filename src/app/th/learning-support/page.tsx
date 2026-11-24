import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import LearningSupportDirectoryTh from "@/components/th/LearningSupportDirectoryTh";
import { PROVIDERS } from "@/lib/learningSupport";
import { PROVIDERS_TH } from "@/lib/th/learningSupport";
import { thMetadata, thPath } from "@/lib/i18n";
import { SITE } from "@/lib/seo";

const TITLE = "ไดเรกทอรีหน่วยงานสนับสนุนการเรียนรู้ในกรุงเทพฯ";
const DESCRIPTION =
  "ไดเรกทอรีหน่วยงานด้านการสนับสนุนการเรียนรู้ การประเมิน การบำบัด และความต้องการการศึกษาพิเศษในกรุงเทพฯ พร้อมคำแนะนำง่ายๆ ว่าควรเริ่มที่ไหน";

export const metadata: Metadata = thMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: "/learning-support",
});

const LISTED = PROVIDERS.filter((p) => PROVIDERS_TH[p.slug]);

const FAQ = [
  {
    q: "โรงเรียนบอกว่าลูกไม่มีปัญหา แต่ฉันยังไม่สบายใจ ควรทำอย่างไร",
    a: "โรงเรียนเห็นเด็กเพียงด้านเดียว ส่วนคุณมักเห็นด้านที่เหนื่อยล้าหลังเลิกเรียน คุณไม่จำเป็นต้องขออนุญาตโรงเรียนเพื่อให้หน่วยงานอิสระประเมิน และไม่ต้องบอกโรงเรียนว่ากำลังทำ หากการประเมินยืนยันความต้องการของลูก รายงานนั้นคือสิ่งที่โรงเรียนต้องตอบสนอง",
  },
  {
    q: "การประเมิน การบำบัด และการสอนพิเศษต่างกันอย่างไร",
    a: "การประเมินบอกว่าเกิดอะไรขึ้นและออกรายงาน การบำบัดทำงานกับความสามารถพื้นฐาน เช่น การพูด การควบคุมการเคลื่อนไหว การควบคุมอารมณ์ หรือพฤติกรรม โดยมักเป็นผู้เชี่ยวชาญทางคลินิกที่มีใบอนุญาต การสอนพิเศษสอนเนื้อหาวิชาที่เด็กตามไม่ทัน ทั้งสามอย่างไม่ทดแทนกัน การจ้างติวเตอร์ทั้งที่ปัญหาจริงคือความผิดปกติทางภาษา อาจเสียเวลาไปหลายปี",
  },
  {
    q: "ค่าใช้จ่ายประมาณเท่าไร",
    a: "การประเมินแบบเอกชนในกรุงเทพฯ มักอยู่ที่หลายหมื่นบาท และค่าบำบัดรายสัปดาห์ก็สะสมเร็ว ประกันสุขภาพของชาวต่างชาติส่วนใหญ่ไม่ครอบคลุมการประเมินพัฒนาการและการบำบัด แม้โรงพยาบาลจะอยู่ในเครือข่าย จึงควรตรวจเงื่อนไขกรมธรรม์ก่อนนัด สถาบันราชานุกูลเป็นเส้นทางของรัฐ ค่าใช้จ่ายต่ำกว่ามาก แต่บริการเป็นภาษาไทยและรอคิวนานกว่า",
  },
  {
    q: "ลูกต้องมีการวินิจฉัยหรือไม่",
    a: "ไม่จำเป็นเพื่อรับการสนับสนุน แต่มักจำเป็นสำหรับเรื่องที่เป็นทางการ การปรับสิ่งอำนวยความสะดวกในการสอบ เช่น เวลาเพิ่ม ที่นั่งในโปรแกรมเฉพาะทาง และการเคลมประกัน มักต้องมีรายงานจากผู้ประเมินที่มีคุณวุฒิ หากลูกกำลังจะสอบ IGCSE หรือ A Level ควรทำการประเมินให้เสร็จล่วงหน้าก่อนฤดูสอบนาน ไม่ใช่ในภาคเรียนก่อนสอบ",
  },
  {
    q: "ควรถามหน่วยงานอะไรก่อนนัด",
    a: "เจ้าหน้าที่ของคุณมีคุณวุฒิอะไร และใครเป็นผู้ขึ้นทะเบียนกำกับดูแล เคยดูแลเด็กที่มีสถานการณ์คล้ายลูกฉันมากี่คน คุณวัดอะไร และเราจะรู้ได้อย่างไรว่าได้ผล คุณจะติดต่อกับโรงเรียนของลูกไหม และถ้าสามเดือนแล้วไม่ได้ผลจะทำอย่างไร หน่วยงานที่ไว้ใจได้จะตอบทั้งห้าข้อนี้อย่างตรงไปตรงมา",
  },
  {
    q: "ลูกเป็นวัยรุ่นแล้ว สายไปไหม",
    a: "ไม่สาย แต่เป้าหมายเปลี่ยน สำหรับวัยรุ่นโต สิ่งที่มีคุณค่าที่สุดมักเป็นการโค้ชทักษะการบริหารจัดการ การปรับสิ่งอำนวยความสะดวกในการสอบ และการวางแผนเปลี่ยนผ่านสู่การทำงานหรือเรียนต่อ ไม่ใช่การแก้ทักษะตั้งแต่เด็ก ทั้ง Steps และ CARE มีโปรแกรมสำหรับคนหนุ่มสาว ซึ่งหาได้ยากในกรุงเทพฯ",
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
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE}${thPath("/")}` },
      {
        "@type": "ListItem",
        position: 2,
        name: "การสนับสนุนการเรียนรู้",
        item: `${SITE}${thPath("/learning-support")}`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "หน่วยงานสนับสนุนการเรียนรู้ในกรุงเทพฯ",
    numberOfItems: LISTED.length,
    itemListElement: LISTED.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${SITE}${thPath(`/learning-support/${p.slug}`)}`,
    })),
  },
];

const STEPS = [
  {
    t: "จดสิ่งที่คุณเห็นจริง",
    d: "ตัวอย่างที่เจาะจงและมีวันที่ ดีกว่าความรู้สึกกว้างๆ อ่านจบบรรทัดแล้วหาที่อ่านไม่เจอ ล้มเหลวทางอารมณ์หลังเลิกเรียนทุกวันอังคารและพฤหัสบดี มองกระดานไม่ชัดจึงลอกไม่ทัน ผู้ประเมินที่ดีจะขอรายการนี้ก่อนเป็นอย่างแรก และเป็นสิ่งที่ทำให้โรงเรียนจริงจังกับคุณ",
  },
  {
    t: "คุยกับโรงเรียนและขอคำตอบเป็นลายลักษณ์อักษร",
    d: "โรงเรียนนานาชาติในกรุงเทพฯ ส่วนใหญ่มีการสนับสนุนการเรียนรู้ในระดับหนึ่ง ถามว่าสังเกตเห็นอะไร ในชั้นเรียนให้การสนับสนุนอะไรได้ และใครเป็นผู้ประสานงาน ขอให้ตอบทางอีเมลเพื่อมีบันทึก",
  },
  {
    t: "เมื่อยังไม่ชัดเจน ให้ประเมินก่อน",
    d: "ถ้าต้องการความเห็นทางการแพทย์ ไปหากุมารแพทย์หรือจิตแพทย์เด็ก ถ้าต้องการเข้าใจรูปแบบการเรียนรู้ ไปหานักจิตวิทยาการศึกษาหรือผู้ประเมินเฉพาะทาง หลายครอบครัวข้ามขั้นตอนนี้บ่อยที่สุด ทั้งที่เป็นขั้นตอนที่ประหยัดที่สุดในระยะยาว",
  },
  {
    t: "แล้วจึงเลือกวิธีแทรกแซง ไม่ใช่ก่อน",
    d: "การบำบัด การสอนเฉพาะทาง การย้ายโรงเรียน หรือแค่ให้โรงเรียนเดิมปรับให้ดีขึ้น การประเมินจะบอกว่าควรเลือกอะไร การเลือกวิธีก่อนประเมิน คือเหตุผลที่หลายครอบครัวเดินมาสองปี เสียเงินหลายแสนบาท และยังอยู่บนเส้นทางที่ผิด",
  },
  {
    t: "หาผู้ปกครองคนอื่น",
    d: "The Rainbow Room และ LEAP Bangkok ตั้งขึ้นเพื่อสิ่งนี้ ไม่เสียค่าใช้จ่าย และช่วยประหยัดเวลาได้มากกว่าการค้นหาใดๆ การถามในกลุ่ม Facebook ของเราก็เช่นกัน หลายครอบครัวเคยเดินบนเส้นทางที่คุณกำลังเดิน",
  },
];

export default function ThLearningSupportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="คุณไม่ได้อยู่คนเดียว"
        title="ไดเรกทอรีหน่วยงานสนับสนุนการเรียนรู้ในกรุงเทพฯ"
        subtitle={`การประเมิน การบำบัด โรงเรียนการศึกษาพิเศษ และการสนับสนุนผู้ปกครอง ไว้ในที่เดียว ${LISTED.length} หน่วยงาน ตรวจสอบข้อมูลแล้ว และเขียนตามจริง`}
        color="purple"
        image="/images/learning-support/mother-comforting-son-bangkok-park.jpg"
        imageAlt="คุณแม่นั่งยองๆ กอดลูกชายตัวเล็กในสวนสาธารณะในกรุงเทพฯ ทั้งสองสงบ มีทะเลสาบและต้นไม้อยู่ด้านหลัง"
      />

      <div className="border-b border-black/5 bg-neutral-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-5 sm:flex-row sm:justify-between">
          <p className="text-sm text-neutral-600">รู้แล้วว่าต้องการหาอะไร</p>
          <a
            href="#directory"
            className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            ไปที่ไดเรกทอรีหน่วยงานเลย
            <span aria-hidden="true">&darr;</span>
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            มีบางอย่างไม่ถูกต้อง บางทีเด็กคนอื่นในห้องก้าวไปข้างหน้าแล้ว แต่การอ่านของลูกหยุดอยู่กับที่ บางทีครูพูดถึงคำว่า สมาธิ ซ้ำๆ บางทีลูกสามขวบยังไม่พูด และแม่สามีบอกอยู่เสมอว่าเด็กผู้ชายก็พูดช้าแบบนี้แหละ หรือบางทีคุณรู้ดีอยู่แล้วว่าเผชิญอะไร แต่เพิ่งมาถึงเมืองใหม่และไม่รู้จักเบอร์โทรสักเบอร์
          </p>
          <p>
            การหาความช่วยเหลือในกรุงเทพฯ ยากกว่าที่ควรเป็น หน่วยงานดีๆ มักไม่โฆษณา ไดเรกทอรีที่มีอยู่ส่วนใหญ่เป็นการลงรายการแบบจ่ายเงิน และความต่างระหว่างนักบำบัดการพูดกับคลาสพูดและการแสดง มักเข้าใจหลังเสียเวลาและเงินไปกับตัวเลือกที่ผิด เราจึงสร้างไดเรกทอรีนี้ เขียนทุกหน่วยงานสนับสนุนการเรียนรู้ที่เราตรวจสอบได้ด้วยภาษาง่ายๆ และเก็บข้อควรระวังไว้ ไม่ตัดออก
          </p>
          <p>
            ไม่มีหน่วยงานใดจ่ายเงินเพื่อให้ได้ลงรายการ สิ่งที่เรายืนยันไม่ได้ เราจะบอกตามจริง และหากหน่วยงานใดจัดหมวดผิดหรือเว็บไซต์ใช้ไม่ได้ เราก็จะบอกเช่นกัน
          </p>
          <p className="text-sm text-neutral-500">
            หน้านี้แปลจากต้นฉบับภาษาอังกฤษ ชื่อหน่วยงาน ที่อยู่ เบอร์โทร และ URL คงไว้ตามเดิม หากมีความต่างให้ยึดฉบับภาษาอังกฤษ
          </p>
        </div>

        <div id="directory" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">ไดเรกทอรีหน่วยงาน</h2>
          <p className="mb-8 mt-2 max-w-3xl text-neutral-600">
            กรองตามประเภทการสนับสนุนที่ต้องการ พื้นที่ หรือความเชี่ยวชาญ ทุกหน่วยงานมีหน้าของตนเอง พร้อมช่องทางติดต่อ และบอกตามจริงว่าที่นี่ทำอะไรได้และทำอะไรไม่ได้
          </p>
          <LearningSupportDirectoryTh />
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">เริ่มที่ไหน เรียงตามลำดับ</h2>
          <ol className="mt-4 space-y-4">
            {STEPS.map((s, i) => (
              <li
                key={s.t}
                className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-purple-dark">{s.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{s.d}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/learning-support/mother-helping-son-with-homework-bangkok.jpg"
              alt="คุณแม่นั่งข้างลูกชายที่โต๊ะในกรุงเทพฯ ชี้ไปที่สมุดการบ้าน ขณะที่เขาเท้าคางและมองไปทางอื่น"
              width={1400}
              height={1022}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-sm leading-relaxed text-neutral-500">
            การทำการบ้านกลายเป็นการทะเลาะกันทุกคืน เป็นหนึ่งในเหตุผลที่พบบ่อยที่สุดที่ครอบครัวเริ่มหาความช่วยเหลือ แทบไม่ใช่เพราะไม่พยายามพอ และแทบไม่เคยเป็นการต่อสู้ด้วยความตั้งใจ แม้ตอนนั้นจะรู้สึกเช่นนั้น
          </figcaption>
        </figure>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">คำถามที่ผู้ปกครองถามจริงๆ</h2>
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

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">ที่อื่นที่ควรดู</h2>
          <ul className="mt-4 space-y-3 text-neutral-700">
            <li>
              <a
                href="https://bangkokcommunityresources.isb.ac.th/"
                target="_blank"
                rel="noreferrer"
                lang="en"
                className="font-semibold text-orange"
              >
                Bangkok Community Resources
              </a>
              ไดเรกทอรีสาธารณะฟรีที่ดูแลโดย International School Bangkok ครอบคลุมการให้คำปรึกษา จิตเวช บริการสุขภาพที่เกี่ยวข้อง และความต้องการด้านการเรียนรู้ เปิดให้ทุกคน ไม่จำกัดเฉพาะครอบครัว ISB (ภาษาอังกฤษ)
            </li>
            <li>
              <Link href="/th/schools" className="font-semibold text-orange">
                ไดเรกทอรีโรงเรียนของเรา
              </Link>
              เหมาะเมื่อคำตอบคือเปลี่ยนโรงเรียน ไม่ใช่เปลี่ยนนักบำบัด
            </li>
            <li>
              <a
                href="https://www.facebook.com/groups/395501457186828"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-orange"
              >
                กลุ่ม Bangkok Expat Families บน Facebook
              </a>
              ที่คุณถามผู้ปกครองที่เคยใช้บริการของหน่วยงานส่วนใหญ่ในหน้านี้ได้ (กลุ่มภาษาอังกฤษ)
            </li>
          </ul>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">พบข้อผิดพลาดหรือมีสิ่งที่ตกหล่นไหม</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            ข้อมูลเปลี่ยนแปลง หน่วยงานย้ายที่ และคนก็ย้ายงาน หากคุณพบข้อผิดพลาด รู้จักหน่วยงานที่เรายังไม่ได้ลง หรือดำเนินบริการเหล่านี้เองและอยากอัปเดตรายการ โปรดแจ้งเรา เราจะแก้ไข หน้านี้มีประโยชน์ก็ต่อเมื่อถูกต้อง
          </p>
          <Link
            href="/th/contact"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            ส่งการแก้ไข
          </Link>
        </div>
      </div>
    </>
  );
}
