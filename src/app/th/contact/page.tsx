import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { SLOT_SPECS } from "@/lib/ads";
import { thMetadata } from "@/lib/i18n";

export const metadata: Metadata = thMetadata({
  title: "ติดต่อเราและลงโฆษณากับเรา",
  description:
    "ติดต่อ BKK Families หรือดูวิธีลงโฆษณาเพื่อเข้าถึงชุมชนครอบครัวในกรุงเทพฯ ที่มีสมาชิกเกือบ 40,000 คน",
  enPath: "/contact",
});

export default function ThContactPage() {
  return (
    <>
      <PageHero
        eyebrow="หาแนวทางที่เหมาะกับคุณ"
        title="ติดต่อเรา"
        subtitle="แจ้งแก้ไขข้อมูล ขอลงรายชื่อ หรือสอบถามเรื่องโฆษณา ยินดีให้บริการทุกเรื่อง เราปรับแพ็กเกจโฆษณาให้เหมาะกับความต้องการของคุณได้"
        color="purple"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="mailto:info@bkkfamilies.com"
            className="rounded-xl bg-teal p-6 text-center text-white transition hover:opacity-90"
          >
            <p className="text-xs uppercase tracking-wide text-white/80">อีเมล</p>
            <p className="mt-1 font-heading text-lg font-bold">info@bkkfamilies.com</p>
          </a>
          <a
            href="https://line.me/ti/p/~bachsuites"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-orange p-6 text-center text-white transition hover:opacity-90"
          >
            <p className="text-xs uppercase tracking-wide text-white/80">LINE</p>
            <p className="mt-1 font-heading text-lg font-bold">bachsuites</p>
          </a>
          <a
            href="https://www.facebook.com/groups/395501457186828"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-green p-6 text-center text-white transition hover:opacity-90"
          >
            <p className="text-xs uppercase tracking-wide text-white/80">กลุ่ม Facebook</p>
            <p className="mt-1 font-heading text-lg font-bold">Bangkok Expat Families</p>
          </a>
        </div>

        <p className="mt-6 text-sm text-neutral-600">
          เรามักตอบเป็นภาษาอังกฤษ คุณจะเขียนมาเป็นภาษาไทยก็ได้ เราจะพยายามตอบกลับ
        </p>

        {/* Corrections and listings */}
        <div className="mt-16 rounded-2xl bg-purple-50 p-8">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">แจ้งแก้ไขข้อมูลหรือขอลงรายชื่อ</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
            หากพบว่าข้อมูลของโรงเรียน เพลย์กรุ๊ป แคมป์ หรือกิจกรรมผิดพลาดหรือล้าสมัย หรืออยากให้หน่วยงานของคุณได้รับการลงรายชื่อ โปรดส่งอีเมลมาพร้อมลิงก์หน้านั้นและข้อมูลที่ถูกต้อง การลงรายชื่อไม่มีค่าใช้จ่าย และโฆษณาที่จ่ายเงินไม่มีผลต่อรายชื่อที่แสดงหรือลำดับการจัดเรียง
          </p>
        </div>

        {/* Why advertise */}
        <div id="advertise" className="mt-20 scroll-mt-32">
          <p className="text-xs font-bold uppercase tracking-wide text-orange">ลงโฆษณากับเรา</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-purple-dark md:text-4xl">
            ให้เกือบ 40,000 ครอบครัวได้เห็นแบรนด์ของคุณ ในช่วงที่พวกเขากำลังตัดสินใจเลือกบริการอย่างที่คุณให้
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-neutral-600">
            Bangkok Expat Families เป็นชุมชนประเภทเดียวกันที่ใหญ่และเก่าแก่ที่สุดในกรุงเทพฯ ทั้งครอบครัวชาวต่างชาติและครอบครัวไทยมาแลกเปลี่ยนกันเรื่องที่พ่อแม่ทุกคนต้องตัดสินใจ ไม่ว่าจะเลือกโรงเรียนไหน หาหมอคนไหน ไปทำกิจกรรมอะไร หรือซื้อประกันแบบไหน เมื่อสมาชิกค้นหาข้อมูลเรื่องเหล่านี้ พวกเขามาถามที่นี่ก่อน
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-purple p-6 text-white">
              <p className="font-heading text-3xl font-bold">เกือบ 40,000</p>
              <p className="mt-1 text-sm text-white/80">สมาชิก และมีครอบครัวใหม่เข้ามาราว 120 ครอบครัวต่อสัปดาห์</p>
            </div>
            <div className="rounded-xl bg-teal p-6 text-white">
              <p className="font-heading text-3xl font-bold">81%</p>
              <p className="mt-1 text-sm text-white/80">
                ของสมาชิกมีลูก
                <span className="mt-2 block text-xs text-white/70">ที่มา: แบบสำรวจสมาชิก BKK Families</span>
              </p>
            </div>
            <div className="rounded-xl bg-green p-6 text-white">
              <p className="font-heading text-3xl font-bold">14 ปี</p>
              <p className="mt-1 text-sm text-white/80">
                ความไว้วางใจของชุมชนที่สร้างมาตั้งแต่ปี 2012 ไม่ใช่กลุ่มผู้ชมที่เช่าเป็นรายเดือน
              </p>
            </div>
          </div>
        </div>

        {/* Who it's for */}
        <div className="mt-20">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">สำหรับธุรกิจที่ครอบครัวกำลังมองหาจริงๆ</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">โรงเรียน</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                ทุกสัปดาห์มีพ่อแม่ถามในกลุ่มว่าควรเลือกโรงเรียนไหน วิทยาเขตนี้คุ้มกับค่าเล่าเรียนหรือไม่ และที่ไหนยังมีที่นั่งว่างกลางปีการศึกษา โรงเรียนของคุณสามารถเป็นคำตอบแรกที่พวกเขาเห็น
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">คลินิกและประกันสุขภาพ</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                ครอบครัวที่เพิ่งย้ายมากรุงเทพฯ ต้องการกุมารแพทย์ ทันตแพทย์ และประกันสุขภาพแทบจะทันที และพวกเขาเชื่อคำแนะนำจากพ่อแม่คนอื่นมากกว่าโฆษณาออนไลน์ ความไว้วางใจนี้คือรากฐานของชุมชนแห่งนี้
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">บริการสำหรับครอบครัวและอื่นๆ</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                ติวเตอร์ ศูนย์กิจกรรม นายหน้าอสังหาริมทรัพย์ บริษัทขนย้าย ช่างภาพ ร้านอาหารที่ต้อนรับเด็กๆ ไม่ว่าครอบครัวในกรุงเทพฯ ต้องการอะไร ตอนนี้สมาชิกของเราก็กำลังถามหาคำแนะนำกันอยู่
              </p>
            </div>
          </div>
        </div>

        {/* How to reach them */}
        <div className="mt-20">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">รูปแบบโฆษณา</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">โฆษณาในกลุ่ม Facebook</h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                <li>✓ โพสต์สนับสนุนปักหมุด (ครั้งละหนึ่งสัปดาห์)</li>
                <li>✓ แบนเนอร์บนภาพปกกลุ่ม (ผู้ลงโฆษณาหนึ่งรายต่อเดือน)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">โฆษณาบนหน้าแรกของเว็บไซต์</h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                <li>✓ แบนเนอร์ด้านบน (แสดงเพียงรายเดียว ไม่สลับหมุนเวียน)</li>
                <li>✓ พื้นที่โฆษณาแถบข้าง (ตำแหน่งบน กลาง และล่าง)</li>
              </ul>
              <p className="mt-3 text-xs text-neutral-500">
                ขนาดแบนเนอร์: แบนเนอร์ด้านบน {SLOT_SPECS["home-top"].size}, แถบข้าง {SLOT_SPECS["home-sidebar-top"].size} แบนเนอร์ทั้งหมดระบุว่าเป็นเนื้อหาสนับสนุน
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-neutral-600">
            เราไม่ขายรีวิว บทความสนับสนุนเขียนโดยผู้ลงโฆษณาและเราเป็นผู้แก้ไข เนื้อหาที่จ่ายเงินทั้งหมดระบุชัดเจนว่าเป็นเนื้อหาสนับสนุน
          </p>
          <a
            href="/bkk-families-media-kit.pdf"
            hrefLang="en"
            className="mt-6 inline-block rounded-full bg-orange px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            ดาวน์โหลดสื่อประชาสัมพันธ์ (PDF ภาษาอังกฤษ)
          </a>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-2xl bg-purple-dark px-8 py-12 text-center text-white">
          <h2 className="font-heading text-3xl font-bold">ให้ครอบครัวในกรุงเทพฯ ได้รู้จักธุรกิจของคุณ</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            บอกเราว่าคุณให้บริการอะไร เราจะออกแบบแพ็กเกจที่เหมาะกับเป้าหมายและงบประมาณของคุณ
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:info@bkkfamilies.com"
              className="rounded-full bg-orange px-8 py-3 font-semibold text-white transition hover:opacity-90"
            >
              ส่งอีเมลถึง info@bkkfamilies.com
            </a>
            <a
              href="https://line.me/ti/p/~bachsuites"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-purple-dark"
            >
              แอด LINE: bachsuites
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
