import { useState, useRef, useEffect } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, answer]);

  return (
    <div className={`bg-transparent rounded-xl transition-all duration-300 ease-in-out border-b border-taupe/20 last:border-0 ${isOpen ? 'bg-cream/50' : 'hover:bg-cream/30'}`}>
      <button
        className="w-full flex justify-between items-center p-6 lg:p-8 text-left group"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-${question.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <h3 className="font-serif text-xl md:text-2xl text-charcoal group-hover:text-umber transition-colors">{question}</h3>
        <span className={`ml-6 flex-shrink-0 text-umber transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        id={`faq-${question.toLowerCase().replace(/\s+/g, '-')}`}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ height: `${height}px` }}
        role="region"
      >
        <div className="px-6 lg:px-8 pb-8 pt-2">
          <p className="text-charcoal/80 font-light text-lg leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};
