import React from 'react';
import { TornPaper } from '../ui/OrganicSectionDividers';

interface TocItem {
  label: string;
  href: string;
}

interface LegalPageProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  toc?: TocItem[];
}

function HighlightBrand({ text }: { text: string }) {
  const parts = text.split(/(The\s?THESAFEHIVE)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.match(/^The\s?THESAFEHIVE$/) ? (
          <span key={i} className="text-umber">{part}</span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

export default function LegalPage({ title, children, description }: LegalPageProps) {
  return (
    <>
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-10 md:mb-14">
              <h1 className="text-3xl md:text-4xl font-heading text-charcoal mb-4">
                <HighlightBrand text={title} />
              </h1>
              {description && (
                <p className="text-base md:text-lg text-charcoal/70 font-light">{description}</p>
              )}
            </header>

            <div className="bg-offWhite rounded-[2rem] shadow-sm p-6 md:p-10 text-charcoal/80 border border-taupe/10 leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </section>

      {/* ── Torn paper: vanilla (cream) → terracotta (Footer transition) ─────────────── */}
      <TornPaper from="#FAF5E4" to="#F0E7DB" height={72} />
    </>
  );
}
