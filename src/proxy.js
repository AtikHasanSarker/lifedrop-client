import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;
  const pathname = request.nextUrl.pathname;

  // Login থাকা অবস্থায় login/register এ গেলে dashboard এ পাঠাবে
  if (user && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(
      new URL(`/dashboard/${user.role}`, request.url),
    );
  }

  // Public Routes
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/search",
    "/donation-requests",
  ];

  // Public Route হলে যেতে দিবে
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Login না থাকলে
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Admin Route
  if (pathname.startsWith("/dashboard/admin") && user.role !== "admin") {
    return NextResponse.redirect(
      new URL(`/dashboard/${user.role}`, request.url),
    );
  }

  // Donor Route
  if (pathname.startsWith("/dashboard/donor") && user.role !== "donor") {
    return NextResponse.redirect(
      new URL(`/dashboard/${user.role}`, request.url),
    );
  }

  // Volunteer Route
  if (
    pathname.startsWith("/dashboard/volunteer") &&
    user.role !== "volunteer"
  ) {
    return NextResponse.redirect(
      new URL(`/dashboard/${user.role}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/donation-requests/:path*"],
};
