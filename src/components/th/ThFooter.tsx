import Link from "next/link";
import Logo from "../ui/Logo";

export default function ThFooter() {
  return (
    <footer className="bg-purple-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Logo size={28} />
              <span className="font-heading text-lg font-bold">BKK Families</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-white/70">
              <span className="font-bold text-white">คู่มือชีวิตในกรุงเทพฯ ของคุณ</span>{" "}
              ตั้งแต่ปี 2012 ครอบครัวชาวต่างชาติและครอบครัวไทยเกือบ 40,000 ครอบครัวใช้ที่นี่แบ่งปันข้อมูลโรงเรียน กิจกรรม และการดูแลสุขภาพในกรุงเทพฯ
            </p>
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold text-orange">เลือกดู</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li><Link href="/th/schools" className="hover:text-white">โรงเรียนนานาชาติ</Link></li>
              <li><Link href="/th/playgroups" className="hover:text-white">เพลย์กรุ๊ป</Link></li>
              <li><Link href="/th/camps" className="hover:text-white">แคมป์ปิดเทอม</Link></li>
              <li><Link href="/th/activities" className="hover:text-white">กิจกรรมครอบครัว</Link></li>
              <li><Link href="/th/learning-support" className="hover:text-white">สนับสนุนการเรียนรู้</Link></li>
              <li><Link href="/th/healthcare/emergency-numbers" className="hover:text-white">เบอร์โทรฉุกเฉิน</Link></li>
              <li>
                <Link href="/" lang="en" hrefLang="en" className="hover:text-white">
                  English version
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold text-orange">ติดต่อเรา</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li><Link href="/th/contact" className="font-semibold text-teal hover:text-white">หน้าติดต่อเรา</Link></li>
              <li>info@bkkfamilies.com</li>
              <li>
                <a
                  href="https://line.me/ti/p/~bachsuites"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  LINE: bachsuites
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/groups/395501457186828"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  กลุ่ม Facebook: Bangkok Expat Families
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} BKK Families สงวนลิขสิทธิ์
        </div>
      </div>
    </footer>
  );
}
