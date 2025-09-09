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
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'ring-1 ring-green-600' : ''}`}>
      <button
        className="w-full flex justify-between items-center p-6 text-left"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-${question.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <h3 className="font-bold text-xl text-gray-900">{question}</h3>
        <span className={`ml-4 flex-shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
        <div className="px-6 pb-6 -mt-2">
          <p className="text-gray-700">{answer}</p>
        </div>
      </div>
    </div>
  );
};
