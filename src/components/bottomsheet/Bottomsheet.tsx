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
  return <div className={cn("w-full h-[30px] bg-white rounded-t-3xl")}></div>;
};

const BottomSheetContent = ({ children }: BottomSheetContentProps) => {
  return (
    <div className={cn("flex flex-col w-full bg-white gap-6")}>{children}</div>
  );
};

const BottomSheet = ({ children, className }: BottomSheetContainerProps) => {
  return (
    <>
      <div
        className={cn(
          "absolute top-0 w-screen h-screen max-w-[375px] max-h-[812px] bg-[rgba(0, 0, 0, 0.5)]",
          className,
        )}
      >
        <div className="relative top-[60px] w-full">
          <BottomSheetHeader />
          <BottomSheetContent>{children}</BottomSheetContent>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
