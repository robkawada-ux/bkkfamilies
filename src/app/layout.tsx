import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://bkkfamilies.com"),
  title: {
    default: "BKK Families — Your Bangkok Roadmap",
    template: "%s | BKK Families",
  },
  description:
    "The largest, longest-running community for expat and Thai families in Bangkok. Find international schools, family activities, and health resources — plus a 40,000+ member Facebook community.",
  openGraph: {
    title: "BKK Families — Your Bangkok Roadmap",
    description:
      "Schools, activities, and healthcare resources for families in Bangkok, backed by a 40,000+ member community.",
    url: "https://bkkfamilies.com",
    siteName: "BKK Families",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
