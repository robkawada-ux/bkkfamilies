import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";

// 404 page for any URL that matches no route. Next renders this on its own,
// outside both root layouts, so it carries the English site chrome itself.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.bkkfamilies.com"),
  title: "Page not found | BKK Families",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-body">
        <Nav />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="font-heading text-4xl font-bold text-purple-dark">404</h1>
          <p className="mt-3 text-lg text-neutral-700">This page could not be found.</p>
          <Link
            href="/"
            className="mt-6 rounded-full bg-purple px-6 py-2 text-sm font-semibold text-white"
          >
            Back to the homepage
          </Link>
        </main>
        <Footer />
      </body>
    </html>
  );
}
