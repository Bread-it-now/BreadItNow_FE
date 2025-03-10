'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full h-full`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            className={`bg-white w-[90%] max-w-[340px] p-6 rounded-2xl shadow-lg relative ${className}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <button className="text-gray-500 hover:text-gray-700 text-xl" onClick={onClose}>
                ✕
              </button>
            </div>
            <div className="mt-4 max-h-[320px] overflow-y-auto text-sm text-gray-700 leading-relaxed">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
