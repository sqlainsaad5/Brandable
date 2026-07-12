import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { user, supabaseResponse } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLoginRoute = pathname === "/admin/login";

  // Server-side gate for all admin pages (not client-only)
  if (isAdminRoute && !isLoginRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isLoginRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/products";
    return NextResponse.redirect(url);
  }

  if (pathname === "/admin") {
    const url = request.nextUrl.clone();
    url.pathname = user ? "/admin/products" : "/admin/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all paths including /admin/* except static assets.
     * Explicitly covers admin so protection cannot be skipped by a narrow matcher.
     */
    "/admin",
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)",
  ],
};
