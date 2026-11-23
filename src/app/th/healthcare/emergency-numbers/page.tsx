import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { thMetadata, thPath } from "@/lib/i18n";
import { SITE } from "@/lib/seo";

const EN_PATH = "/healthcare/emergency-numbers";
const PATH = thPath(EN_PATH);
// No Thai card yet, so the Thai page offers the English one.
const PDF = "/downloads/bkk-families-emergency-card.pdf";
const CHECKED = "9 พฤศจิกายน 2569";
const CHECKED_ISO = "2026-11-09";

const TITLE = "เบอร์โทรฉุกเฉินในประเทศไทยและกรุงเทพฯ (2026)";
const DESCRIPTION =
  "รวมเบอร์โทรฉุกเฉินของไทย: 1669 รถพยาบาล 191 ตำรวจ 199 เหตุเพลิงไหม้ 1155 ตำรวจท่องเที่ยว (ภาษาอังกฤษ) และเบอร์รถพยาบาลของโรงพยาบาลเอกชนในกรุงเทพฯ พร้อมการ์ดพิมพ์ได้ฟรี";

export const metadata: Metadata = thMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: EN_PATH,
  type: "article",
});

const MAIN = [
  { n: "1669", label: "รถพยาบาลและเหตุฉุกเฉินทางการแพทย์", note: "ใช้ได้ทั่วประเทศ โทรฟรี ดำเนินการโดยสถาบันการแพทย์ฉุกเฉินแห่งชาติ ไม่รับประกันว่ามีเจ้าหน้าที่พูดภาษาอังกฤษ", color: "bg-[#d9342b]" },
  { n: "191", label: "ตำรวจ", note: "แจ้งเหตุอาชญากรรม อันตราย และเหตุฉุกเฉินทั่วไป มีรายงานว่าโทร 911 ก็ติดเช่นกัน", color: "bg-purple" },
  { n: "199", label: "เหตุเพลิงไหม้", note: "แจ้งไฟไหม้และการกู้ภัยจากเหตุไฟไหม้", color: "bg-orange" },
  { n: "1155", label: "ตำรวจท่องเที่ยว (ภาษาอังกฤษ)", note: "เจ้าหน้าที่พูดภาษาอังกฤษได้และช่วยโอนสายไปยังหน่วยงานที่เกี่ยวข้อง เป็นทางเลือกที่ดีที่สุดเมื่อสื่อสารกันไม่ได้จริงๆ", color: "bg-teal" },
];

const HOSPITALS = [
  { name: "Bumrungrad International", num: "1378 หรือ +66 2011 5222", what: "รถพยาบาล 24 ชั่วโมง" },
  { name: "Bangkok Hospital", num: "1724", what: "ห้องฉุกเฉินและศูนย์อุบัติเหตุ" },
  { name: "BNH Hospital", num: "+66 2 632 1000", what: "ห้องฉุกเฉินและรถพยาบาล" },
  { name: "MedPark Hospital", num: "+66 2 090 3000", what: "รถพยาบาล" },
  { name: "Vejthani Hospital", num: "+66 2 734 0001", what: "รถพยาบาล" },
  { name: "Samitivej", num: "+66 2022 2222", what: "ศูนย์บริการลูกค้า 24 ชั่วโมง" },
  { name: "Phyathai 2 Hospital", num: "1772", what: "สายด่วนโรงพยาบาล" },
  { name: "Praram 9 Hospital", num: "1270", what: "สายด่วนโรงพยาบาล" },
];

const OTHER = [
  { k: "รถพยาบาลกรุงเทพฯ (กทม.)", n: "1646", note: "ศูนย์เอราวัณ ดำเนินการโดยกรุงเทพมหานคร" },
  { k: "รถพยาบาลกรุงเทพฯ (วชิรพยาบาล)", n: "1554", note: "หน่วยแพทย์กู้ชีพวชิรพยาบาล" },
  { k: "ศูนย์พิษวิทยาหรืองูกัด", n: "1367", note: "ศูนย์พิษวิทยา โรงพยาบาลรามาธิบดี 24 ชั่วโมง LINE @rpc1367" },
  { k: "วิกฤตสุขภาพจิต", n: "1323", note: "สายด่วนสุขภาพจิต กรมสุขภาพจิต" },
  { k: "ความรุนแรงต่อเด็กหรือความรุนแรงในครอบครัว", n: "1300", note: "ศูนย์ช่วยเหลือสังคม โทรฟรี 24 ชั่วโมง ภาษาไทยและอังกฤษ" },
  { k: "เด็กและเยาวชน", n: "1387", note: "สายด่วนเด็ก (Childline Thailand) 24 ชั่วโมง" },
  { k: "อุบัติเหตุบนทางหลวง", n: "1193", note: "ตำรวจทางหลวง" },
  { k: "อุบัติเหตุทางน้ำ", n: "1196", note: "สายด่วนอุบัติเหตุทางน้ำ" },
  { k: "แจ้งเตือนภัยพิบัติ", n: "1860", note: "ศูนย์เตือนภัยพิบัติแห่งชาติ" },
  { k: "รถพยาบาลอากาศ", n: "089 922 3300", note: "Siam Air Care" },
];

const WHICH = [
  { s: "ที่บ้านในกรุงเทพฯ ลูกหยุดหายใจ ชัก หรือบาดเจ็บสาหัส", a: "โทรเบอร์รถพยาบาลของโรงพยาบาลที่ครอบครัวใช้ ถ้าโทรไม่ติดภายในหนึ่งนาทีให้โทร 1669" },
  { s: "เกิดอุบัติเหตุบนถนน หรืออยู่นอกกรุงเทพฯ", a: "โทร 1669 หากเกิดอุบัติเหตุบนทางหลวงโทร 1193 เพื่อติดต่อตำรวจทางหลวง" },
  { s: "อีกฝ่ายฟังคุณไม่เข้าใจ", a: "โทร 1155 ตำรวจท่องเที่ยวพูดภาษาอังกฤษได้และจะช่วยโอนสายให้" },
  { s: "ลูกกินของมีพิษเข้าไป หรือถูกงูกัด", a: "โทรศูนย์พิษวิทยา 1367 เพื่อขอคำแนะนำ และโทร 1669 หรือโรงพยาบาลของคุณเพื่อเรียกรถพยาบาล" },
  { s: "เกิดอาชญากรรม โจรขึ้นบ้าน หรือมีคนข่มขู่คุณ", a: "โทร 191" },
  { s: "มีไฟไหม้หรือควัน", a: "ออกจากที่เกิดเหตุก่อน แล้วโทร 199" },
];

const FAQ = [
  { q: "เบอร์โทรฉุกเฉินในประเทศไทยคืออะไร", a: "ประเทศไทยไม่มีเบอร์ฉุกเฉินเดียวสำหรับทุกกรณี เรียกรถพยาบาลหรือเหตุฉุกเฉินทางการแพทย์โทร 1669 แจ้งตำรวจโทร 191 แจ้งเหตุเพลิงไหม้โทร 199 และต้องการความช่วยเหลือภาษาอังกฤษโทร 1155 ตำรวจท่องเที่ยว ในกรุงเทพฯ หากครอบครัวใช้โรงพยาบาลเอกชนแห่งใดเป็นประจำ เบอร์รถพยาบาลของโรงพยาบาลนั้นมักเป็นทางที่เร็วที่สุดที่จะได้คุยกับเจ้าหน้าที่ที่พูดภาษาอังกฤษได้" },
  { q: "เบอร์รถพยาบาลในกรุงเทพฯ คืออะไร", a: "1669 เป็นเบอร์รถพยาบาลทั่วประเทศและใช้ในกรุงเทพฯ ได้ นอกจากนี้ยังมี 1646 (ศูนย์เอราวัณ) และ 1554 (วชิรพยาบาล) โรงพยาบาลเอกชนมีรถพยาบาลของตัวเอง เช่น Bumrungrad โทร 1378 และ Bangkok Hospital โทร 1724" },
  { q: "โทร 911 ในประเทศไทยได้ไหม", a: "มีรายงานว่าโทร 911 ติดสายตำรวจ แต่ไม่ควรพึ่งพาเบอร์นี้ ให้บันทึก 1669, 191 และ 1155 ไว้ในโทรศัพท์" },
  { q: "เจ้าหน้าที่สาย 1669 พูดภาษาอังกฤษหรือภาษาจีนได้ไหม", a: "บางครั้งพูดภาษาอังกฤษได้ แต่ไม่รับประกัน และไม่ควรคาดหวังว่าจะมีบริการภาษาจีน หากสื่อสารไม่ได้ให้โทร 1155 ตำรวจท่องเที่ยว ซึ่งพูดภาษาอังกฤษได้และช่วยโอนสายให้ได้ สายรถพยาบาลของโรงพยาบาลเอกชนมักมีเจ้าหน้าที่ที่พูดภาษาอังกฤษได้" },
  { q: "เรียกรถพยาบาลในประเทศไทยต้องจ่ายเงินไหม", a: "การโทร 1669 ไม่มีค่าใช้จ่าย รถพยาบาลของโรงพยาบาลเอกชนมักรวมอยู่ในใบเรียกเก็บเงินหรือเบิกจากประกันได้ จึงควรตรวจสอบล่วงหน้าว่ากรมธรรม์ของคุณครอบคลุมหรือไม่" },
  { q: "รถพยาบาลจะพาไปโรงพยาบาลไหน", a: "รถพยาบาลของโรงพยาบาลเอกชนจะพาไปโรงพยาบาลนั้น ส่วนทีมกู้ชีพของ 1669 หรืออาสาสมัครกู้ภัยมักพาผู้ป่วยไปโรงพยาบาลที่เหมาะสมที่ใกล้ที่สุด ซึ่งอาจเป็นโรงพยาบาลรัฐ ควรบอกให้ชัดว่าต้องการไปโรงพยาบาลไหน และโทรหาโรงพยาบาลของคุณเองด้วย" },
  { q: "อาสาสมัครกู้ภัยคือใคร", a: "การกู้ภัยริมถนนในกรุงเทพฯ จำนวนมากดำเนินการโดยมูลนิธิอาสาสมัคร เช่น ป่อเต็กตึ๊งและร่วมกตัญญู พวกเขามักไปถึงที่เกิดเหตุก่อนและทำงานสำคัญมาก แต่ไม่ใช่รถพยาบาลของโรงพยาบาลที่คุณใช้ และมีรายงานว่าเคยมีเหตุทะเลาะกันระหว่างทีมกู้ภัยเรื่องพื้นที่ หากเลือกได้ ให้โทรหาโรงพยาบาลของคุณเอง" },
  { q: "เบอร์ศูนย์พิษวิทยาของไทยคืออะไร", a: "ศูนย์พิษวิทยาของไทยคือ 1367 ศูนย์พิษวิทยา โรงพยาบาลรามาธิบดี ให้คำแนะนำเรื่องสารพิษ งูกัด และยาถอนพิษตลอด 24 ชั่วโมง หากต้องการรถพยาบาลให้โทร 1669 หรือโรงพยาบาลของคุณ" },
  { q: "ใช้เบอร์โทรต่างประเทศโทรสายด่วนสี่หลักได้ไหม", a: "สายด่วนสี่หลักออกแบบไว้สำหรับเบอร์มือถือไทย หากใช้ซิมต่างประเทศแบบโรมมิ่งอาจโทรไม่ติด ควรบันทึกเบอร์ +66 แบบเต็มของโรงพยาบาลที่ใช้ และทำซิมไทยทันทีที่มาถึง" },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "th",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE}/th` },
      { "@type": "ListItem", position: 2, name: "เบอร์โทรฉุกเฉิน", item: `${SITE}${PATH}` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: "th",
    headline: "เบอร์โทรฉุกเฉินในประเทศไทยและกรุงเทพฯ",
    description: DESCRIPTION,
    url: `${SITE}${PATH}`,
    datePublished: CHECKED_ISO,
    dateModified: CHECKED_ISO,
    author: { "@type": "Organization", name: "BKK Families", url: SITE },
    publisher: { "@type": "Organization", name: "BKK Families", url: SITE },
  },
  {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: "การ์ดเบอร์โทรฉุกเฉินของ BKK Families (PDF พิมพ์ได้ ภาษาอังกฤษ)",
    inLanguage: "en",
    url: `${SITE}${PDF}`,
    encodingFormat: "application/pdf",
    isAccessibleForFree: true,
    dateModified: CHECKED_ISO,
  },
];

function Download({ className = "" }: { className?: string }) {
  return (
    <a
      href={PDF}
      download
      className={`inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 ${className}`}
    >
      ดาวน์โหลดการ์ดพิมพ์ได้ฟรี (PDF ภาษาอังกฤษ)
    </a>
  );
}

export default function ThEmergencyNumbersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow={`ตรวจสอบเมื่อ ${CHECKED}`}
        title="เบอร์โทรฉุกเฉินในประเทศไทยและกรุงเทพฯ"
        subtitle="เรียกรถพยาบาล แจ้งตำรวจ หรือแจ้งเหตุเพลิงไหม้ต้องโทรเบอร์ไหน โรงพยาบาลในกรุงเทพฯ แห่งไหนมีสายตรงรถพยาบาลของตัวเอง พร้อมการ์ดฟรีที่ติดตู้เย็นและใส่กระเป๋าสตางค์ของทุกคนในบ้านได้"
        color="teal"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-xl bg-purple-dark p-6 text-white">
          <h2 className="font-heading text-lg font-bold">คำตอบสั้นๆ</h2>
          <p className="mt-2 leading-relaxed text-white/90">
            เบอร์โทรฉุกเฉินหลักของไทยคือ รถพยาบาล <strong>1669</strong> ตำรวจ <strong>191</strong> เหตุเพลิงไหม้{" "}
            <strong>199</strong> และตำรวจท่องเที่ยวที่พูดภาษาอังกฤษได้ <strong>1155</strong> ในกรุงเทพฯ หากครอบครัวใช้โรงพยาบาลเอกชนแห่งใดเป็นประจำ ให้โทรเบอร์รถพยาบาลของโรงพยาบาลนั้นก่อน เจ้าหน้าที่พูดภาษาอังกฤษได้ และจะพาคุณไปโรงพยาบาลที่ประกันคุ้มครอง
          </p>
          <Download className="mt-5" />
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MAIN.map((m) => (
            <a key={m.n} href={`tel:${m.n}`} className={`rounded-xl p-5 text-white ${m.color}`}>
              <p className="font-heading text-4xl font-bold">{m.n}</p>
              <p className="mt-1 font-bold">{m.label}</p>
              <p className="mt-1 text-sm text-white/90">{m.note}</p>
            </a>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">ควรโทรเบอร์ไหน</h2>
          <div className="mt-5 space-y-3">
            {WHICH.map((w) => (
              <div key={w.s} className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-purple-dark">{w.s}</h3>
                <p className="mt-1 text-sm text-neutral-600">{w.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">เบอร์รถพยาบาลของโรงพยาบาลเอกชนในกรุงเทพฯ</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            เบอร์ทั้งหมดนี้ตรวจสอบกับเว็บไซต์ทางการของแต่ละโรงพยาบาลเมื่อ {CHECKED} หากโรงพยาบาลประกาศเฉพาะสายด่วนทั่วไป เราจะระบุไว้ เบอร์สี่หลักต้องโทรจากเบอร์มือถือไทย
          </p>
          <div className="mt-5 overflow-x-auto rounded-xl border border-black/5 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-teal-50 text-purple-dark">
                <tr><th className="px-4 py-3">โรงพยาบาล</th><th className="px-4 py-3">เบอร์โทร</th><th className="px-4 py-3">หมายเหตุ</th></tr>
              </thead>
              <tbody>
                {HOSPITALS.map((h) => (
                  <tr key={h.name} className="border-t border-black/5">
                    <td className="px-4 py-3 font-semibold text-purple-dark">{h.name}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-purple-dark">{h.num}</td>
                    <td className="px-4 py-3 text-neutral-600">{h.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-neutral-600">
            อยากรู้จักโรงพยาบาลแต่ละแห่ง ดู{" "}
            <Link href="/healthcare/hospitals" hrefLang="en" lang="en" className="font-semibold text-teal hover:underline">รายชื่อโรงพยาบาลในกรุงเทพฯ (หน้าภาษาอังกฤษ)</Link>。
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">เบอร์ฉุกเฉินอื่นๆ และสายด่วนช่วยเหลือ</h2>
          <div className="mt-5 overflow-x-auto rounded-xl border border-black/5 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <tbody>
                {OTHER.map((o) => (
                  <tr key={o.k} className="border-t border-black/5 first:border-t-0">
                    <td className="px-4 py-3 font-semibold text-purple-dark">{o.k}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-purple-dark">{o.n}</td>
                    <td className="px-4 py-3 text-neutral-600">{o.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">ทำไม 191 ไม่ใช่ตัวเลือกที่ดีที่สุดเสมอไป</h2>
          <p>
            ประเทศไทยไม่มีเบอร์ฉุกเฉินเดียวที่รับทุกกรณี 191 ต่อสายตำรวจ ส่วน 1669 ต่อระบบรถพยาบาลของประเทศ ทั้งสองเป็นคนละระบบ การโทรหาตำรวจเมื่อเกิดเหตุฉุกเฉินทางการแพทย์อาจทำให้เสียเวลา
          </p>
          <p>
            ในกรุงเทพฯ ยังมีอีกเรื่องหนึ่ง การกู้ภัยริมถนนจำนวนมากดำเนินการโดยมูลนิธิอาสาสมัคร เช่น ป่อเต็กตึ๊งและร่วมกตัญญู พวกเขามักไปถึงก่อนและทำงานสำคัญมาก แต่มักพาผู้ป่วยไปโรงพยาบาลที่ใกล้ที่สุด และมีรายงานว่าเคย{" "}
            <a href="https://thethaiger.com/hot-news/crime/bangkok-rescue-volunteers-brawl-over-territory" className="font-semibold text-teal hover:underline" rel="noopener noreferrer" target="_blank">ทะเลาะกันเรื่องพื้นที่</a> โรงพยาบาลเอกชนมีรถพยาบาลและเจ้าหน้าที่ที่พูดภาษาอังกฤษได้ และจะพาคุณไปโรงพยาบาลที่ครอบครัวใช้เป็นประจำ
          </p>
          <p>
            ดังนั้นคำแนะนำที่ใช้ได้จริงสำหรับครอบครัวชาวต่างชาติในกรุงเทพฯ คือ บันทึกเบอร์รถพยาบาลของโรงพยาบาลที่คุณใช้ เกิดเหตุให้โทรเบอร์นั้นก่อน และมี 1669 กับ 1155 เป็นตัวสำรอง
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-6">
          <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-purple-dark">ควรบอกอะไรเมื่อโทร</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
              <li>เกิดอะไรขึ้น ใครได้รับบาดเจ็บ</li>
              <li>คุณอยู่ที่ไหน: ที่อยู่ ชื่ออาคาร ซอย และสถานที่สำคัญใกล้เคียง</li>
              <li>เบอร์โทรของคุณ และรักษาสายให้ว่างไว้</li>
              <li>โรงพยาบาลที่คุณต้องการไป</li>
            </ol>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-xl border-l-4 border-teal bg-teal-50 p-6">
          <h2 className="font-heading text-xl font-bold text-purple-dark">เตรียมพร้อมวันนี้ อย่ารอให้ถึงตอนที่ต้องใช้</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
            <li>บันทึกเบอร์รถพยาบาลของโรงพยาบาลที่คุณใช้ 1669 และ 1155 ไว้ในโทรศัพท์ของทุกคนในครอบครัว</li>
            <li>ดาวน์โหลดแอป Thai EMS 1669 ซึ่งส่งพิกัด GPS ของคุณและมีแชตข้อความ</li>
            <li>เขียนที่อยู่บ้านเป็นภาษาไทย วางไว้ใกล้ประตูและเก็บไว้ในโทรศัพท์</li>
            <li>เก็บบัตรประกันและเอกสารไว้ด้วยกัน และบอกแม่บ้านหรือพี่เลี้ยงว่าครอบครัวใช้โรงพยาบาลไหน</li>
            <li>รู้เส้นทางไปห้องฉุกเฉินที่เปิด 24 ชั่วโมงที่ใกล้ที่สุด</li>
            <li>พิมพ์การ์ดด้านล่างแล้วติดไว้ที่ตู้เย็น</li>
          </ul>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-2xl bg-purple-dark px-6 py-10 text-center text-white">
          <h2 className="font-heading text-2xl font-bold">การ์ดเบอร์โทรฉุกเฉินพิมพ์ได้ฟรี</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/80">
            สติกเกอร์ติดตู้เย็นขนาด A4 หนึ่งหน้า รวมเบอร์ทั้งหมดในหน้านี้ พร้อมการ์ดใส่กระเป๋าสตางค์สี่ใบ ให้ทุกคนในบ้านมีคนละใบ เขียนชื่อโรงพยาบาล ที่อยู่ภาษาไทย และข้อมูลการแพ้ได้
          </p>
          <Download className="mt-6" />
          <p className="mt-3 text-xs text-white/60">
            PDF 2 หน้า A4 ภาษาอังกฤษ ตรวจสอบเบอร์เมื่อ {CHECKED}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">คำถามที่พ่อแม่ถามบ่อย</h2>
          <div className="mt-6 space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <h3 className="font-heading font-bold text-purple-dark">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs leading-relaxed text-neutral-500">
          ตรวจสอบเบอร์กับข้อมูลของรัฐบาลไทยและเว็บไซต์ทางการของโรงพยาบาลเมื่อ {CHECKED} เบอร์อาจเปลี่ยนแปลง หากพบเบอร์ที่โทรไม่ติด โปรดแจ้งเราที่ info@bkkfamilies.com หน้านี้ให้ข้อมูลทั่วไปเท่านั้น ไม่ใช่คำแนะนำทางการแพทย์ และไม่ได้เป็นการแนะนำหรือคัดค้านหน่วยงานใดๆ{" "}
          <Link href={EN_PATH} hrefLang="en" lang="en" className="underline">English version</Link>
        </p>
      </div>
    </>
  );
}
