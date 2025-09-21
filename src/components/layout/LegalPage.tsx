import React from 'react';

interface TocItem {
  label: string;
  href: string; // e.g., '#introduction'
}

interface LegalPageProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  toc?: TocItem[]; // optional table of contents
}

function HighlightBrand({ text }: { text: string }) {
  // Replace occurrences of The SafeHive or TheSafeHive with a green span
  const parts = text.split(/(The\s?SafeHive)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.match(/^The\s?SafeHive$/) ? (
          <span key={i} className="text-green-600">{part}</span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

export default function LegalPage({ title, children, description, toc }: LegalPageProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">
              <HighlightBrand text={title} />
            </h1>
            {description && (
              <p className="text-base md:text-lg text-gray-600">{description}</p>
            )}
          </header>
          {/* Optional anchor tag list */}
          {/* {toc && toc.length > 0 && (
            <nav aria-label="Table of contents" className="mb-6 md:mb-8">
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-5">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3">On this page</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {toc.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="text-blue-600 hover:underline">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )} */}

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 text-gray-800">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
