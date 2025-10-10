import React, { useEffect, useRef, useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  description?: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ 
  isOpen, 
  onClose, 
  url, 
  title, 
  description = '' 
}) => {
  const [copied, setCopied] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Lock background scroll & handle mount animation
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // next tick to ensure transition runs
      const t = setTimeout(() => setAnimateIn(true), 0);

      // focus the close button for accessibility
      const f = setTimeout(() => closeBtnRef.current?.focus(), 30);

      // Escape to close
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', onKeyDown);

      return () => {
        document.body.style.overflow = prevOverflow;
        clearTimeout(t);
        clearTimeout(f);
        setAnimateIn(false);
        document.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: copied ? Check : Copy,
      color: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
      action: handleCopyLink,
      label: copied ? 'Copied!' : 'Copy Link'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-100 hover:bg-green-200 text-green-700',
      action: () => {
        const text = `${title}\n\n${description}\n\n${url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
      },
      label: 'WhatsApp'
    },
    {
      name: 'More Options',
      icon: ExternalLink,
      color: 'bg-purple-100 hover:bg-purple-200 text-purple-700',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: title,
            text: description,
            url: url,
          }).catch(() => {/* user cancelled or unsupported */});
        } else {
          handleCopyLink();
        }
      },
      label: 'More'
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      aria-labelledby="share-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-200 ease-out ${animateIn ? 'opacity-50' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={[
          "relative bg-white w-full sm:w-auto sm:max-w-md md:max-w-lg mx-0 sm:mx-4",
          "rounded-t-2xl sm:rounded-2xl shadow-2xl",
          "transition-transform transition-opacity duration-300 ease-out",
          // Slide up on mobile, subtle scale on tablet/desktop
          "motion-safe:will-change-transform",
          animateIn
            ? "opacity-100 translate-y-0 sm:translate-y-0 sm:scale-100"
            : "opacity-0 translate-y-6 sm:translate-y-0 sm:scale-95"
        ].join(' ')}
        // Pad for safe area on iOS
        style={{
          paddingBottom: 'max(0px, env(safe-area-inset-bottom))'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Share2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 id="share-title" className="text-base sm:text-lg font-semibold text-gray-900">
                Share Article
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">Choose how to share this article</p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
            aria-label="Close share dialog"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Share Options */}
        <div className="p-5 sm:p-6">
          {/* Mobile-first grid: 2 cols on small phones, 3 on >=sm for balance */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className={[
                  "flex flex-col items-center justify-center rounded-xl",
                  "transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500",
                  "min-h-[72px] sm:min-h-[84px] px-3 py-3 sm:px-4 sm:py-4",
                  option.color
                ].join(' ')}
              >
                <div className="mb-2">
                  <option.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-center leading-tight">
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          {/* Article Preview */}
          <div className="mt-5 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
              {title}
            </h4>
            {description && (
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {description}
              </p>
            )}
            <div className="flex items-center text-[11px] sm:text-xs text-gray-500">
              <ExternalLink className="h-3 w-3 mr-1" />
              <span className="truncate">{url}</span>
            </div>
          </div>
        </div>

        {/* Mobile Handle */}
        <div className="sm:hidden flex justify-center pb-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
