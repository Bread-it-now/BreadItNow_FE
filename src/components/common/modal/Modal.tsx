'use client';

import close from '@/assets/icons/close.svg';
import { createPortal } from 'react-dom';
import Button from '@/components/button/Button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface ModalProps {
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

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  children,
  title,
  cancelText,
  confirmText,
  confirmDisabled,
  className,
  cancelBtnFullWidth = false,
}: ModalProps) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const rootElement = document.getElementById('bottomsheet-root');
    if (rootElement) {
      setModalRoot(rootElement);
    }
  }, []);

  return (
    <div className="fixed flex items-center justify-center w-full h-full">
      {modalRoot &&
        createPortal(
          <div className={'fixed flex items-center justify-center max-w-[375px] bottom-0 w-full h-full z-20'}>
            {/* Backdrop */}
            <div
              className={`absolute w-full h-full bg-black ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`}
              onClick={onClose}
            />

            {/* Sheet */}
            <div className="flex bg-white z-10 w-full mx-5 rounded-2xl">
              <div className="flex flex-col w-full h-full gap-[30px] px-5 pt-[30px] pb-5">
                <div className="flex flex-col items-center justify-center w-full h-full px-[1.25rem] gap-[1.5rem]">
                  {title && (
                    <div className="flex justify-between items-center w-full h-[1.5rem]">
                      <h2 className="text-gray-950 text-[18px] font-semibold">{title}</h2>
                      <button onClick={onClose}>
                        <Image src={close} width={24} height={24} alt="닫기" />
                      </button>
                    </div>
                  )}
                  <div className={`flex flex-col w-full ${className}`}>{children}</div>
                </div>
                <div>
                  {(cancelText || confirmText) && (
                    <div className="flex gap-[0.5rem] w-full min-h-[48px] bg-white">
                      {(cancelText || onCancel) && (
                        <Button onClick={onCancel ? onCancel : onClose} scale="large" fullWidth={cancelBtnFullWidth}>
                          {cancelText}
                        </Button>
                      )}
                      {confirmText && onConfirm && (
                        <Button
                          onClick={onConfirm}
                          scale="large"
                          fullWidth
                          variant="primary"
                          disabled={confirmDisabled}>
                          {confirmText}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>,
          modalRoot,
        )}
    </div>
  );
};

export default Modal;
