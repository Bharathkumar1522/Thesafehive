interface LegalPageProps {
  title: string;
  children: React.ReactNode;
  description?: string;
}

export default function LegalPage({ title, children, description }: LegalPageProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">
              {title}
            </h1>
            {description && (
              <p className="text-base md:text-lg text-gray-600">{description}</p>
            )}
          </header>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 text-gray-800">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
