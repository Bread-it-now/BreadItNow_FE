'use client';

import close from '@/assets/icons/close.svg';
import { createPortal } from 'react-dom';
import Button from '../button/Button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: string;
  fullHeight?: boolean;
  cancelText?: string;
  confirmText?: string;
  confirmDisabled?: boolean;
  maxHeight?: number;
  maxContentHeight?: number;
  bgColor?: string;
  className?: string;
  cancelBtnFullWidth?: boolean;
  needMarginBottom?: boolean;
}

const BottomSheet = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  children,
  title,
  cancelText,
  confirmText,
  confirmDisabled,
  fullHeight = false,
  maxHeight = 752,
  maxContentHeight = 630,
  bgColor = 'bg-white',
  className,
  cancelBtnFullWidth = false,
  needMarginBottom = true,
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
        <div className={cn('fixed max-w-[375px] bottom-0 w-full h-full z-20')}>
          {/* Backdrop */}
          {!fullHeight && (
            <div
              className={`absolute w-full h-full ${fullHeight ? 'bg-white' : 'bg-black'} ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`}
              onClick={onClose}
            />
          )}

          {/* Sheet */}
          <div
            className={cn(
              `absolute bottom-0`,
              `w-full overflow-y-auto ${fullHeight ? 'h-[calc(100vh-44px)]' : `max-h-[${maxHeight}px]`}`,
              `${bgColor} ${fullHeight ? '' : 'pt-[1.875rem] rounded-t-[1.5rem]'}`,
              isOpen ? 'animate-slideUp' : 'animate-slideDown',
            )}
            onAnimationEnd={handleBottomSheetAnimationEnd}>
            <div className="relative flex flex-col h-full">
              <div className={cn(`flex flex-col items-center h-full px-[1.25rem] gap-[1.5rem]`)}>
                {title && (
                  <div className="flex justify-between items-center w-full h-[1.5rem]">
                    <h2 className="text-gray-950 text-[18px] font-semibold">{title}</h2>
                    <button onClick={onClose}>
                      <Image src={close} width={24} height={24} alt="닫기" />
                    </button>
                  </div>
                )}
                <div
                  style={{
                    maxHeight: fullHeight ? 'calc(100% - 142px)' : `${maxContentHeight}px`,
                    marginBottom: needMarginBottom ? '92px' : 0,
                  }}
                  className={cn(
                    'flex flex-col',
                    `w-full overflow-y-auto h-full ${fullHeight ? 'max-h-[calc(100%-142px)]' : `max-h-[${maxContentHeight}px]`}`,
                    className,
                  )}>
                  {children}
                </div>
              </div>
              <div>
                {(cancelText || confirmText) && (
                  <div className="absolute bottom-0 flex gap-[0.5rem] w-full p-[1.25rem] bg-white">
                    {(cancelText || onCancel) && (
                      <Button onClick={onCancel ? onCancel : onClose} scale="large" fullWidth={cancelBtnFullWidth}>
                        {cancelText}
                      </Button>
                    )}
                    {confirmText && onConfirm && (
                      <Button onClick={onConfirm} scale="large" fullWidth variant="primary" disabled={confirmDisabled}>
                        {confirmText}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        bottomSheetRoot,
      )}
    </>
  );
};

export default BottomSheet;
