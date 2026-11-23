import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import ThNav from "@/components/th/ThNav";
import ThFooter from "@/components/th/ThFooter";
import { Analytics } from "@vercel/analytics/react";
import { TH_LAUNCHED, ZH_LAUNCHED } from "@/lib/i18n";
import { zhTwinPaths } from "@/lib/zh/twins";

// Third root layout (English is the (en) group, Chinese is /zh), so the HTML
// shell can say lang="th" in the server-rendered markup.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.bkkfamilies.com"),
  title: {
    default: "BKK Families คู่มือครอบครัวในกรุงเทพฯ: โรงเรียน กิจกรรม และสุขภาพ",
    template: "%s | BKK Families",
  },
  description:
    "ข้อมูลเพลย์กรุ๊ป แคมป์ปิดเทอม กิจกรรมสำหรับครอบครัว และบริการสนับสนุนการเรียนรู้ สำหรับครอบครัวชาวต่างชาติและครอบครัวไทยในกรุงเทพฯ จากกลุ่ม Facebook ที่มีสมาชิกเกือบ 40,000 คน",
  // Pages set their own robots too; this is the safety net for any page that forgets.
  robots: TH_LAUNCHED ? { index: true, follow: true } : { index: false, follow: true },
};

export default function ThRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="flex min-h-screen flex-col font-body">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QMXV649DCH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QMXV649DCH');
          `}
        </Script>
        <ThNav zhTwins={ZH_LAUNCHED ? zhTwinPaths() : undefined} />
        <main className="flex-1">{children}</main>
        <ThFooter />
        <Analytics />
      </body>
    </html>
  );
}
