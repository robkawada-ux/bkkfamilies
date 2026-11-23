import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { thMetadata } from "@/lib/i18n";

const TITLE = "BKK Families คู่มือครอบครัวในกรุงเทพฯ";
const DESCRIPTION =
  "ข้อมูลโรงเรียนนานาชาติ เพลย์กรุ๊ป แคมป์ปิดเทอม กิจกรรมสำหรับครอบครัว และบริการสนับสนุนการเรียนรู้ในกรุงเทพฯ ราคา เวลา และช่วงอายุทั้งหมดตรวจสอบกับหน้าเว็บของแต่ละแห่งแล้ว";

export const metadata: Metadata = thMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: "/",
});

const SECTIONS = [
  {
    href: "/th/schools",
    title: "โรงเรียนนานาชาติ",
    text: "ดูโรงเรียนนานาชาติในกรุงเทพฯ ตามย่าน หลักสูตร และงบประมาณ พร้อมค่าเล่าเรียนและวันเปิดภาคเรียนที่โรงเรียนประกาศเอง",
    cls: "border-teal bg-teal-50",
  },
  {
    href: "/th/playgroups",
    title: "เพลย์กรุ๊ป",
    text: "ค้นหากลุ่มเล่นสำหรับเด็กเล็กและเด็กวัยหัดเดินในกรุงเทพฯ ตามวัน อายุเด็ก ย่าน และภาษา",
    cls: "border-teal bg-teal-50",
  },
  {
    href: "/th/camps",
    title: "แคมป์ปิดเทอม",
    text: "แคมป์เช้าไปเย็นกลับและแคมป์ค้างคืนช่วงปิดเทอม ค้นหาได้ตามวันที่ อายุ และหัวข้อ",
    cls: "border-green bg-green-50",
  },
  {
    href: "/th/activities",
    title: "กิจกรรมครอบครัว",
    text: "ที่เที่ยวสุดสัปดาห์และวันฝนตก รวมถึงคลาสรายสัปดาห์ที่เหมาะกับเด็ก",
    cls: "border-orange bg-orange-50",
  },
  {
    href: "/th/learning-support",
    title: "สนับสนุนการเรียนรู้",
    text: "นักแก้ไขการพูด นักจิตวิทยาการศึกษา ติวเตอร์ และหน่วยงานสนับสนุนอื่นๆ",
    cls: "border-purple bg-purple-50",
  },
] as const;

export default function ThHome() {
  return (
    <>
      <PageHero
        color="purple"
        eyebrow="คู่มือครอบครัวในกรุงเทพฯ"
        title="เลี้ยงลูกในกรุงเทพฯ หาข้อมูลได้ครบในที่เดียว"
        subtitle="ตั้งแต่ปี 2012 BKK Families รวบรวมข้อมูลท้องถิ่นให้ครอบครัวชาวต่างชาติและครอบครัวไทยในกรุงเทพฯ นี่คือฉบับภาษาไทย ปัจจุบันครอบคลุมโรงเรียนนานาชาติ เพลย์กรุ๊ป แคมป์ปิดเทอม กิจกรรมสำหรับครอบครัว และการสนับสนุนการเรียนรู้"
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`rounded-xl border-2 p-6 transition hover:-translate-y-0.5 hover:shadow-md ${s.cls}`}
            >
              <h2 className="font-heading text-xl font-bold text-purple-dark">{s.title}</h2>
              <p className="mt-2 text-sm text-neutral-700">{s.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-purple">ดูทั้งหมด →</span>
            </Link>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm text-neutral-600">
          ฉบับภาษาไทยแปลจากต้นฉบับภาษาอังกฤษ หากข้อมูลไม่ตรงกัน ให้ยึดฉบับภาษาอังกฤษเป็นหลัก ส่วนสุขภาพและบทความยังมีเฉพาะภาษาอังกฤษ{" "}
          <Link href="/" lang="en" hrefLang="en" className="font-semibold text-purple underline">
            ดูเว็บไซต์ภาษาอังกฤษ
          </Link>
        </p>
      </section>
    </>
  );
}
