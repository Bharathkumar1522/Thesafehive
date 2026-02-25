// src/pages/NotFound.tsx
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { TornPaper } from '../components/ui/OrganicSectionDividers';

export default function NotFound() {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-cream px-6">
        <div className="max-w-2xl text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-taupe/15 p-5 rounded-full shadow-inner">
              <AlertTriangle className="h-16 w-16 text-umber" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[clamp(3rem,6vw,5rem)] font-heading text-charcoal mb-4 leading-[0.95] tracking-tighter">
            404 — <span className="text-umber italic font-light">Page Not Found</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-charcoal/70 mb-10 leading-relaxed font-light max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist.
            It seems this bee flew out of the hive 🐝.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="px-8 py-3.5 bg-charcoal text-cream font-medium rounded-full hover:bg-umber transition-all duration-500 no-underline shadow-sm hover:shadow-md"
            >
              Back to Home
            </Link>
            <Link
              to="/blog"
              className="px-8 py-3.5 bg-taupe/15 text-charcoal font-medium rounded-full hover:bg-taupe/25 transition-all duration-500 no-underline border border-taupe/15"
            >
              Explore Blog
            </Link>
          </div>
        </div>
      </main>

      {/* ── Torn paper: vanilla (cream) → terracotta (Footer transition) ─────────────── */}
      <TornPaper from="#FAF5E4" to="#F0E7DB" height={72} />
    </>
  );
}
