"use client";

import close from "@/assets/icons/close.svg";
import { createPortal } from "react-dom";
import Button from "../button/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onConfirm?: () => void;
  title?: string;
  cancelText?: string;
  confirmText?: string;
  confirmDisabled?: boolean;
}

const BottomSheet = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  title,
  cancelText,
  confirmText,
}: BottomSheetProps) => {
  const [bottomSheetRoot, setBottomSheetRoot] = useState<Element | null>(null);

  useEffect(() => {
    const rootElement = document.getElementById("bottomsheet-root");
    if (rootElement) {
      setBottomSheetRoot(rootElement);
    }
  }, []);

  if (!bottomSheetRoot) return null;
  return (
    <>
      {createPortal(
        <div
          className={cn(
            "absolute bottom-0 w-full h-full z-10",
            isOpen ? "visible" : "hidden",
          )}
        >
          {/* Backdrop */}
          <div
            className={`absolute w-full h-full bg-black ${isOpen ? "bg-opacity-50" : "bg-opacity-0"}`}
            onClick={onClose}
          />

          {/* Sheet */}
          <div
            className={cn(
              `absolute bottom-0 w-full max-h-[752px] pt-[1.875rem] bg-white rounded-t-[1.5rem] overflow-scroll`,
              isOpen ? "animate-slideUp" : "anmiate-slideDown",
            )}
          >
            <div className="flex flex-col items-center px-[1.25rem] gap-[1.5rem]">
              {title && (
                <div className="flex justify-between items-center w-full h-[1.5rem]">
                  <h2 className="text-gray-950 text-[18px] font-semibold">
                    {title}
                  </h2>
                  <button onClick={onClose}>
                    <Image src={close} width={24} height={24} alt="닫기" />
                  </button>
                </div>
              )}
              <div className="flex flex-col w-full overflow-scroll">
                {children}
              </div>
            </div>
            <div>
              {(cancelText || confirmText) && (
                <div className="absolute bottom-0 flex gap-[0.5rem] w-full p-[1.25rem] bg-white">
                  {cancelText && (
                    <Button onClick={onClose} className="">
                      {cancelText}
                    </Button>
                  )}
                  {confirmText && onConfirm && (
                    <Button
                      onClick={onConfirm}
                      fullWidth
                      variant="primary"
                      className=""
                    >
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
