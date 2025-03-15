'use client';

import { useState } from 'react';
import Button from '@/components/button/Button';
import CategoryButton from '@/components/button/CategoryButton';
import Link from 'next/link';
import Topbar from '../topbar/Topbar';

const categories = [
  '식빵',
  '베이글',
  '크루아상',
  '단팥빵',
  '소금빵',
  '크림빵',
  '치아바타',
  '소보로빵',
  '깜빠뉴',
  '바게트',
];

export default function BreadCategorySelection({ onComplete }: { onComplete: () => void }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <Topbar
        classname="whitespace-nowrap"
        hasBackBtn
        rightItems={
          <Link href="/signup" className="text-primary font-semibold">
            건너뛰기
          </Link>
        }
      />
      <div className="flex-grow px-5 pt-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          좋아하는 빵 카테고리를 <br /> 선택해주세요.
        </h1>

        <div className="grid grid-cols-2 gap-3 mt-6">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              selected={selectedCategories.includes(category)}
              onClick={() => toggleCategory(category)}>
              {category}
            </CategoryButton>
          ))}
        </div>
      </div>
      <div className="w-full px-5 py-3 bg-white shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)]">
        <Button fullWidth variant="primary" disabled={selectedCategories.length === 0} onClick={onComplete}>
          완료
        </Button>
      </div>
    </div>
  );
}
