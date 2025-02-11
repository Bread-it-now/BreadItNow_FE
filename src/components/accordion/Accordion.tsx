"use client";

import { cn } from "@/utils/cn";
import arrowUp from "@/assets/icons/arrow-up.svg";
import Image from "next/image";
import { useRef, useState } from "react";

interface AccordionProps {
  /** 아코디언 써머리 영역에 나타날 제목 */
  title: string;

  /** 아코디언을 펼쳤을 때 나타날 내용 */
  children: React.ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentHeight = isOpen
    ? `${contentRef?.current?.scrollHeight}px`
    : "0px";

  return (
    <div
      className={cn(
        "flex flex-col items-start",
        `px-5 py-[30px] w-full`,
        "bg-white rounded-2xl border",
        "transition-all duration-500 ease-in-out",
        isOpen ? "gap-5" : "gap-0",
      )}
    >
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex justify-between items-start",
          " w-full min-h-[21px] ",
          "cursor-pointer",
        )}
      >
        <span className={cn("text-gray-900", "text-body-m")}>{title}</span>
        <Image src={arrowUp} alt="arrow-up" width={20} height={20} />
      </div>
      <div
        ref={contentRef}
        className={cn(
          "w-full",
          "overflow-hidden transition-all duration-500 ease-in-out",
        )}
        style={{
          height: contentHeight,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
