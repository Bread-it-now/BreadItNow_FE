'use client';

import close from '@/assets/icons/close.svg';
import { createPortal } from 'react-dom';
import Button from '../button/Button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onConfirm?: () => void;
  title?: string;
  cancelText?: string;
  confirmText?: string;
  confirmDisabled?: boolean;
  maxHeight?: number;
  maxContentHeight?: number;
  bgColor?: string;
}

const BottomSheet = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  title,
  cancelText,
  confirmText,
  maxHeight = 752,
  maxContentHeight = 630,
  bgColor = 'bg-white',
}: BottomSheetProps) => {
  const [bottomSheetRoot, setBottomSheetRoot] = useState<HTMLElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(isOpen);

  useEffect(() => {
    const rootElement = document.getElementById('bottomsheet-root');
    if (rootElement) {
      setBottomSheetRoot(rootElement);
    }
  }, []);

  useEffect(() => {
    if (isOpen && bottomSheetRoot) {
      setIsAnimating(true);
      bottomSheetRoot.style.setProperty('overflow', 'hidden');
    }
  }, [isOpen, bottomSheetRoot]);

  const handleBottomSheetAnimationEnd = () => {
    if (!isOpen && bottomSheetRoot) {
      setIsAnimating(false);
      bottomSheetRoot.style.setProperty('overflow', '');
    }
  };

  if (!bottomSheetRoot || !isAnimating) return null;

  return (
    <>
      {createPortal(
        <div className={cn('absolute bottom-0 w-full h-full z-10')}>
          {/* Backdrop */}
          <div
            className={`absolute w-full h-full bg-black ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`}
            onClick={onClose}
          />

          {/* Sheet */}
          <div
            className={cn(
              `absolute bottom-0`,
              `w-full overflow-y-auto max-h-[${maxHeight}px]`,
              `pt-[1.875rem] ${bgColor} rounded-t-[1.5rem]`,
              isOpen ? 'animate-slideUp' : 'animate-slideDown',
            )}
            onAnimationEnd={handleBottomSheetAnimationEnd}>
            <div className="flex flex-col items-center px-[1.25rem] gap-[1.5rem]">
              {title && (
                <div className="flex justify-between items-center w-full h-[1.5rem]">
                  <h2 className="text-gray-950 text-[18px] font-semibold">{title}</h2>
                  <button onClick={onClose}>
                    <Image src={close} width={24} height={24} alt="닫기" />
                  </button>
                </div>
              )}
              <div className={cn('flex flex-col', ` w-full overflow-y-auto max-h-[${maxContentHeight}px]`)}>
                {children}
              </div>
            </div>
            <div>
              {(cancelText || confirmText) && (
                <div className="absolute bottom-0 flex gap-[0.5rem] w-full p-[1.25rem] bg-white">
                  {cancelText && (
                    <Button onClick={onClose} scale="large" className="">
                      {cancelText}
                    </Button>
                  )}
                  {confirmText && onConfirm && (
                    <Button onClick={onConfirm} fullWidth variant="primary" className="">
                      {confirmText}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>,
        bottomSheetRoot,
      )}
    </>
  );
};

export default BottomSheet;
