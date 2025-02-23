"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import ArrowUp from "@/assets/icons/arrow-up.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
interface SlideInfoCardProps {
  title: string;
  contentComponent: React.ReactNode;
}

function SlideInfoCard({ title, contentComponent }: SlideInfoCardProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const arrowIcon = useMemo(() => {
    return visible ? ArrowUp : ArrowDown;
  }, [visible]);
  const onClick = () => setVisible(!visible);
  return (
    <article className="bg-white rounded-2xl px-5 py-[30px]">
      <div className="overflow-hidden">
        <div className="flex justify-between">
          <div className="font-semibold text-black text-md">{title}</div>
          <button onClick={onClick} className="ml-auto">
            <Image src={arrowIcon} alt="arrow-up" />
          </button>
        </div>
        <div
          className={`
        text-[13px]
        font-light
        text-left
        transition-all
        duration-300 
        ease-in-out 
        origin-top 
        overflow-hidden
        ${visible ? "max-h-screen" : "max-h-0"}
      `}
        >
          {contentComponent}
        </div>
      </div>
    </article>
  );
}

export default SlideInfoCard;
