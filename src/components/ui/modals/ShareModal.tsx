import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2,
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Mail,
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
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
      },
      label: 'WhatsApp'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-700',
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      },
      label: 'Facebook'
    },
    {
      name: 'Twitter/X',
      icon: Twitter,
      color: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
      action: () => {
        const text = `${title}\n\n${description}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
      },
      label: 'Twitter/X'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-600',
      action: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      },
      label: 'LinkedIn'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-100 hover:bg-pink-200 text-pink-600',
      action: () => {
        // Instagram doesn't support direct URL sharing, so we copy the link
        handleCopyLink();
        alert('Link copied! You can paste it in your Instagram story or bio.');
      },
      label: 'Instagram'
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
      action: () => {
        const subject = encodeURIComponent(title);
        const body = encodeURIComponent(`${description}\n\nRead more: ${url}`);
        window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
      },
      label: 'Email'
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
          }).catch(console.error);
        } else {
          handleCopyLink();
        }
      },
      label: 'More'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white w-full sm:w-auto sm:max-w-md mx-4 rounded-t-2xl sm:rounded-2xl shadow-2xl transform transition-all duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Share2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Share Article</h3>
              <p className="text-sm text-gray-500">Choose how to share this article</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Share Options */}
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${option.color}`}
              >
                <div className="mb-2">
                  <option.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium text-center leading-tight">
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          {/* Article Preview */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
              {title}
            </h4>
            {description && (
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {description}
              </p>
            )}
            <div className="flex items-center text-xs text-gray-500">
              <ExternalLink className="h-3 w-3 mr-1" />
              <span className="truncate">{url}</span>
            </div>
          </div>
        </div>

        {/* Mobile Handle */}
        <div className="sm:hidden flex justify-center pb-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;