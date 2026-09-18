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

export const config = {
  matcher: "/((?!_next/static|_next/image|images|favicon.ico).*)",
};
