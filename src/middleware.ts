import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/services",
  "/tracking",
  "/contact",
  "/about",
  "/sign-in(.*)",
  "/sign-up(.*)",
  '/api/contact',
  "/api/tracking(.*)",   // 👈 allow tracking API without login
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    // Protect all non-public routes
    await auth.protect();
  }
});

// Apply middleware to all routes except static files and _next
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
