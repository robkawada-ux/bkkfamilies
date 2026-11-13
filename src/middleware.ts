import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Legacy WordPress and Lollipop-theme URLs with no equivalent on this site.
// 410 Gone, not 404: Google drops a 410 immediately and retries a 404 for months.
const GONE = [
  /^\/staff(\/|$)/,
  /^\/staff-cat\//,
  /^\/staff-tag\//,
  /^\/our-staff(\/|$)/,
  /^\/portfolio-masonry/,
  /^\/blog-masonry/,
  /^\/blog-showcase(\/|$)/,
  /^\/home[-_]/,
  /^\/pricing-tables(\/|$)/,
  /^\/recipes-list(\/|$)/,
  /^\/content-elements(\/|$)/,
  /^\/sample-page/,
  /^\/shop(\/|_|$)/,
  /^\/cart(\/|$)/,
  /^\/checkout(\/|$)/,
  /^\/my-account(\/|$)/,
  /^\/author\//,
  /^\/tag\//,
  /^\/s\d{9}(\/|$)/,
  /^\/feed(\/|$)/,
  /\/feed\/?$/,
  /^\/comments\/feed/,
  /^\/wp-json/,
  /^\/wp-admin/,
  /^\/wp-login\.php$/,
  /^\/xmlrpc\.php$/,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (GONE.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, { status: 410 });
  }
  return NextResponse.next();
}

// Run ONLY on the legacy paths above. Middleware is billed as server CPU on
// every request it matches, and with the old catch-all matcher it ran on every
// page view and bot hit: 85% of the Vercel CPU bill in Oct/Nov 2026. Keep this
// list in step with GONE; the function above still does the exact test.
export const config = {
  matcher: [
    "/(staff|staff-cat|staff-tag|our-staff|blog-showcase|pricing-tables|recipes-list|content-elements|shop|cart|checkout|my-account|feed|wp-json|wp-admin|author|tag|comments)/:path*",
    "/(portfolio-masonry|blog-masonry|sample-page|home-|home_|shop_|s\\d{9})(.*)",
    "/(wp-login\\.php|xmlrpc\\.php)",
    "/:path*/feed",
  ],
};
