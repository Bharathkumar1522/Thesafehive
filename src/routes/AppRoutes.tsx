// src/routes/AppRoutes.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { ErrorBoundary } from "../components/ui/ErrorBoundary";

/* -------- Lazy-loaded pages (one chunk per page) -------- */
const Home           = lazy(() => import("../pages/Home"));
const Blog           = lazy(() => import("../pages/Blog"));
const BlogPost       = lazy(() => import("../pages/BlogPost"));
const Learn          = lazy(() => import("../pages/learn"));
const About          = lazy(() => import("../pages/About"));
const Contact        = lazy(() => import("../pages/Contact"));
const CookiePolicy   = lazy(() => import("../pages/cookie-policy"));
const PrivacyPolicy  = lazy(() => import("../pages/privacy-policy"));
const TermsOfService = lazy(() => import("../pages/terms-of-service"));
const NotFound       = lazy(() => import("../pages/NotFound"));

/* -------- Scroll to top on route change (keeps hash behavior) -------- */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ block: "start" });
      return;
    }
    // Valid values: "auto" | "smooth"
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}

/* -------- Accessible fallback while a route chunk loads -------- */
function RouteFallback() {
  return (
    <div
      className="p-8 text-center text-gray-600"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      Loading…
    </div>
  );
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <ErrorBoundary fallback={<RouteFallback />}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {/* Core */}
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Legal */}
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
