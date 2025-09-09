// src/routes/prefetch.ts
// Map route paths => function that imports the lazy chunk used by that route.
// Keep these in sync with AppRoutes.tsx lazy() calls.

export const routePrefetchers: Record<string, () => Promise<unknown>> = {
  "/": () => import("../pages/Home"),
  "/blog": () => import("../pages/Blog"),
  "/about": () => import("../pages/About"),
  "/contact": () => import("../pages/Contact"),
  "/learn": () => import("../pages/learn"),
  "/cookie-policy": () => import("../pages/cookie-policy"),
  "/privacy-policy": () => import("../pages/privacy-policy"),
  "/terms-of-service": () => import("../pages/terms-of-service"),
  // For dynamic routes, you can prefetch the list page or a shell:
  // "/blog/:slug": () => import("../pages/BlogPost"),
};
