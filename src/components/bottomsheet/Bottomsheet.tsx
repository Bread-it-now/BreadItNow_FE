"use client";

import { cn } from "@/utils/cn";
import React from "react";
import close from "@/assets/icons/close.svg";
import Image from "next/image";

interface BottomSheetHeaderProps {
  title?: string;
  hasCloseBtn?: boolean;
}

const BottomSheetHeader = ({
  title,
  hasCloseBtn = false,
}: BottomSheetHeaderProps) => {
  return (
    <div className={cn("flex justify-between w-full h-6 px-5")}>
      <p className={cn("text-lg font-semibold text-li")}>{title}</p>
      {hasCloseBtn && (
        <button className={cn("w-6 h-6")}>
          <Image src={close} width={24} height={24} />
        </button>
      )}
    </div>
  );
};

const BottomSheetContent = ({ children }: { children: React.ReactNode }) => {
  return <p className={cn("text-lg font-semibold text-li")}>{children}</p>;
};

const BottomSheetButtons = ({ children }: { children: React.ReactNode }) => {
  return <div className={cn("flex gap-2 h-[92px]")}>{children}</div>;
};
const BottomSheetContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "flex flex-col max-h-[752px] pt-[30px] bg-white rounded-t-xl",
      )}
    >
      {children}
    </div>
  );
};

const BottomSheet = Object.assign(BottomSheetContainer, {
  Container: BottomSheetContainer,
  Header: BottomSheetHeader,
  Content: BottomSheetContent,
  Buttons: BottomSheetButtons,
});

export default BottomSheet;
