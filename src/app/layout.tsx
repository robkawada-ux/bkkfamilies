import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://bkkfamilies.com"),
  title: {
    default: "BKK Families — Your Bangkok Roadmap",
    template: "%s | BKK Families",
  },
  description:
    "The largest, longest-running community for expat and Thai families in Bangkok. Find international schools, family activities, and health resources — plus a 35,700+ member Facebook community.",
  openGraph: {
    title: "BKK Families — Your Bangkok Roadmap",
    description:
      "Schools, activities, and healthcare resources for families in Bangkok, backed by a 35,700+ member community.",
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
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
