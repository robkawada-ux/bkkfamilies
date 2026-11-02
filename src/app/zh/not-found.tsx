import Link from "next/link";

// Shown when a /zh page calls notFound(), e.g. a listing with no translation.
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-heading text-4xl font-bold text-purple-dark">404</h1>
      <p className="mt-3 text-lg text-neutral-700">找不到这个页面。</p>
      <Link
        href="/zh"
        className="mt-6 rounded-full bg-purple px-6 py-2 text-sm font-semibold text-white"
      >
        返回中文首页
      </Link>
    </div>
  );
}
