import Link from "next/link";

// Shown when a page calls notFound(), e.g. an unknown /blog/<slug>.
// Renders inside the English layout, so Nav and Footer are already there.
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-heading text-4xl font-bold text-purple-dark">404</h1>
      <p className="mt-3 text-lg text-neutral-700">This page could not be found.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-purple px-6 py-2 text-sm font-semibold text-white"
      >
        Back to the homepage
      </Link>
    </div>
  );
}
