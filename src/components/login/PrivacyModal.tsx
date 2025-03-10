'use client';

import { ReactNode } from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function PrivacyModal({ isOpen, onClose, title, children, className = '' }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`w-[100%] max-w-[100%] px-5 pt-[30px] pb-5 bg-opacity-50 flex items-center justify-center z-50 ${className}`}>
      <div className="bg-white w-[90%] max-w-[400px] p-5 rounded-lg shadow-lg relative">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>
        <div className="mt-4 max-h-[300px] overflow-y-auto text-sm text-gray-700">{children}</div>
      </div>
    </div>
  );
}
