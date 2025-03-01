'use client';

import { cn } from '@/utils/cn';

interface Category<T extends string> {
  key: T;
  label: string;
}

interface RoundTabProps<T extends string> {
  categories: Category<T>[];
  activeTab: T;
  onTabChange?: (key: T) => void;
  className?: string;
}

export default function RoundTab<T extends string>({
  categories,
  activeTab,
  onTabChange,
  className,
}: RoundTabProps<T>) {
  return (
    <div className={cn('w-full h-[34px] flex items-center gap-1.5 overflow-x-auto px-5', className)}>
      {categories.map(({ key, label }) => (
        <div
          key={key}
          className={`px-4 py-1 rounded-[99px] flex justify-center items-center cursor-pointer 
            ${activeTab === key ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-400'}`}
          onClick={() => onTabChange?.(key)}>
          <span className="text-sm font-semibold text-nowrap">{label}</span>
        </div>
      ))}
    </div>
  );
}
