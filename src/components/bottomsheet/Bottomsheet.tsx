"use client";

import { cn } from "@/utils/cn";
import React, { HTMLAttributes, PropsWithChildren } from "react";
import close from "@/assets/icons/close.svg";
import Image from "next/image";

interface BottomSheetHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  hasCloseBtn?: boolean;
}

interface BottomSheetContentProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  children: React.ReactNode;
}

interface BottomSheetButtonsProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  children: React.ReactNode;
}

interface BottomSheetContainerProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  children: React.ReactNode;
}

const BottomSheetHeader = ({
  title,
  hasCloseBtn = false,
  className,
}: BottomSheetHeaderProps) => {
  return (
    <div className={cn("flex justify-between w-full h-6 px-5", className)}>
      <p className={cn("text-lg font-semibold text-li")}>{title}</p>
      {hasCloseBtn && (
        <button className={cn("w-6 h-6")}>
          <Image src={close} width={24} height={24} alt="close" />
        </button>
      )}
    </div>
  );
};

const BottomSheetContent = ({
  children,
  className,
}: BottomSheetContentProps) => {
  return (
    <p className={cn("text-lg font-semibold text-li px-5", className)}>
      {children}
    </p>
  );
};

const BottomSheetButtons = ({
  children,
  className,
}: BottomSheetButtonsProps) => {
  return <div className={cn("flex gap-2 h-[92px]", className)}>{children}</div>;
};
const BottomSheetContainer = ({
  children,
  className,
}: BottomSheetContainerProps) => {
  return (
    <div
      className={cn(
        "flex flex-col max-h-[752px] pt-[30px] bg-white rounded-t-xl gap-6 overflow-scroll",
        className,
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
