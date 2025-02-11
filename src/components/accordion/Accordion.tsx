"use client";

import { cn } from "@/utils/cn";
import arrowUp from "@/assets/icons/arrow-up.svg";
import Image from "next/image";
import { useState } from "react";

interface AccordionProps {
  /** 아코디언 써머리 영역에 나타날 제목 */
  title: string;

  /** 아코디언을 펼쳤을 때 나타날 내용 */
  children: React.ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col items-start",
        "px-5 py-[30px] w-full",
        "bg-white rounded-2xl border ",
        `${isOpen && "g-5"}`,
      )}
    >
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex justify-between items-start",
          "w-full h-[81px]",
          "cursor-pointer",
        )}
      >
        <span className={cn("text-body-m", "text-gray-900")}>{title}</span>
        <Image src={arrowUp} alt="arrow-up" width={20} height={20} />
      </div>
      <AccordionDetail $isOpen={isOpen}>{children}</AccordionDetail>
    </div>
  );
};

interface AccordionDetailProps {
  /** Accordion의 open여부를 나타내는 상태 */
  $isOpen: boolean;

  /** 아코디언을 펼쳤을 때 나타날 내용 */
  children: React.ReactNode;
}

const AccordionDetail = ({ children, $isOpen }: AccordionDetailProps) => {
  return (
    <div
      className={
        (cn("text-gray900 font-Pretendard text-body-m"),
        `${$isOpen ? "visible" : "invisible"}`)
      }
    >
      {children}
    </div>
  );
};

export default Accordion;
