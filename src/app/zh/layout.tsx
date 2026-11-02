import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import ZhNav from "@/components/zh/ZhNav";
import ZhFooter from "@/components/zh/ZhFooter";
import { Analytics } from "@vercel/analytics/react";
import { ZH_LAUNCHED } from "@/lib/i18n";

// Second root layout (the English site is the (en) route group), so the HTML
// shell can say lang="zh-Hans" in the server-rendered markup. Chrome and
// screen readers read that attribute.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.bkkfamilies.com"),
  title: {
    default: "BKK Families 曼谷家庭指南：学校、活动与医疗",
    template: "%s | BKK Families",
  },
  description:
    "为在曼谷生活的外籍家庭和泰国家庭整理的游戏小组、假期营、亲子活动和学习支持信息，背后是近4万人的 Facebook 社群。",
  // Pages set their own robots too; this is the safety net for any page that forgets.
  robots: ZH_LAUNCHED ? { index: true, follow: true } : { index: false, follow: true },
};

export default function ZhRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
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
        <ZhNav />
        <main className="flex-1">{children}</main>
        <ZhFooter />
        <Analytics />
      </body>
    </html>
  );
}
