"use client";

import { cn } from "@/utils/cn";
import React, { HTMLAttributes, PropsWithChildren } from "react";

interface BottomSheetContentProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  children: React.ReactNode;
}

interface BottomSheetContainerProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  children: React.ReactNode;
}

const BottomSheetHeader = () => {
  return <div className={cn("w-full h-[30px] bg-white rounded-t-xl")}></div>;
};

const BottomSheetContent = ({
  children,
  className,
}: BottomSheetContentProps) => {
  return (
    <p
      className={cn(
        "fixed top-[calc(100%-30px)] flex flex-col w-full bg-white gap-6 overflow-scroll",
        className,
      )}
    >
      {children}
    </p>
  );
};

const BottomSheet = ({ children, className }: BottomSheetContainerProps) => {
  return (
    <div
      className={cn(
        "absolute top-0 w-screen h-screen max-w-[375px] max-h-[812px] bg-black opacity-50",
        className,
      )}
    >
      <BottomSheetHeader />
      <BottomSheetContent>{children}</BottomSheetContent>
    </div>
  );
};

export default BottomSheet;
