"use client";

import { useState } from "react";

interface SlideInfoCardProps {
  title: string;
  contentComponent: React.ReactNode;
}

function SlideInfoCard({ title, contentComponent }: SlideInfoCardProps) {
  const [visible, setVisible] = useState<boolean>(false);

  const onClick = () => setVisible(!visible);
  return (
    <article className="bg-white rounded-2xl px-5 py-[30px]">
      <div className="overflow-hidden">
        <div className="flex justify-between">
          <div className="font-semibold text-black text-md">{title}</div>
          <button onClick={onClick} className="ml-auto">
            검색
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
