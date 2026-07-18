import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/session";

// Define route categories
const protectedRoutePrefixes = [
  "/dashboard",
  "/chat",
  "/analyzer",
  "/reviewer",
  "/appointments",
  "/reminders",
  "/history",
  "/library",
  "/worker",
  "/family",
  "/analytics",
  "/settings",
  "/translation",
];

const authRoutes = ["/login", "/signup"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Check if it's a protected route
  const isProtectedRoute = protectedRoutePrefixes.some((prefix) =>
    path.startsWith(prefix)
  );
  
  // Check if it's an auth route (login/signup)
  const isAuthRoute = authRoutes.includes(path);

  // Get session from cookies
  const sessionCookie = req.cookies.get("session")?.value;
  const session = sessionCookie ? decrypt(sessionCookie) : null;

  // If visiting protected route and not logged in, redirect to login
  if (isProtectedRoute && !session?.userId) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    // Optionally preserve the current URL to redirect back after login
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  }

  // If visiting login/signup and already logged in, redirect to dashboard
  if (isAuthRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
}

// Specify where the proxy should run
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico)$).*)",
  ],
};
