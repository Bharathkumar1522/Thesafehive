// src/components/PolicyModal.tsx
import React from "react";

type PolicyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function PolicyModal({ isOpen, onClose, title, children }: PolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 py-6">
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>

        {/* Modal Content */}
        <div className="prose prose-sm max-w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
