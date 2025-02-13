"use client";

import { useState } from "react";

interface Category {
  key: string;
  label: string;
}

interface RoundTabProps {
  categories: Category[];
  onTabChange?: (key: string) => void;
}

export default function RoundTab({ categories, onTabChange }: RoundTabProps) {
  const [activeTab, setActiveTab] = useState(categories[0].key);

  const handleTabClick = (key: string) => {
    setActiveTab(key);
    onTabChange?.(key);
  };

  return (
    <div className="w-full h-[34px] flex items-center gap-1.5 overflow-x-auto px-5">
      {categories.map(({ key, label }) => (
        <div
          key={key}
          className={`px-4 py-1 rounded-[99px] flex justify-center items-center cursor-pointer ${
            activeTab === key
              ? "bg-primary text-white"
              : "bg-white border border-gray200 text-gray400"
          }`}
          onClick={() => handleTabClick(key)}
        >
          <span className="text-sm font-semibold">{label}</span>
        </div>
      ))}
    </div>
  );
}
