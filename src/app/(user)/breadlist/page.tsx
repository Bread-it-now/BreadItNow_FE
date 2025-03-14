'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Back from '@/assets/icons/back.svg';
import Bread from '@/assets/images/bread.png';
import HotBreadTab from '@/components/common/tabs/HotBreadTab';
import BreadCard from '@/components/bakerycard/BreadCard';

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'hot' | 'popular'>('hot');

  const hotBreads = [
    { id: 1, name: '크로와상', description: '겉바속촉 크로와상', price: '3,500원', img: Bread.src },
    { id: 2, name: '소금빵', description: '고소하고 짭짤한 소금빵', price: '3,000원', img: Bread.src },
    { id: 3, name: '앙버터 바게트', description: '버터와 팥이 조화로운 빵', price: '4,000원', img: Bread.src },
    { id: 4, name: '마카롱', description: '달콤한 프랑스 디저트', price: '2,500원', img: Bread.src },
  ];

  const popularBreads = [
    { id: 5, name: '마카롱', description: '달콤한 프랑스 디저트', price: '2,500원', img: Bread.src },
    { id: 6, name: '베이글', description: '쫄깃한 뉴욕 스타일 베이글', price: '3,200원', img: Bread.src },
    { id: 7, name: '식빵', description: '담백한 기본 식빵', price: '2,000원', img: Bread.src },
    { id: 8, name: '크로와상', description: '겉바속촉 크로와상', price: '3,500원', img: Bread.src },
  ];

  return (
    <div className="w-full h-[100%] flex flex-col">
      <div className="sticky top-0 z-20">
        <div className="flex items-center p-4">
          <Image src={Back} alt="Back" className="w-6 h-6 cursor-pointer" onClick={() => router.push('/')} />
        </div>

        <HotBreadTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={[
            { key: 'hot', label: '핫한 빵' },
            { key: 'popular', label: '인기 빵' },
          ]}
        />
      </div>

      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'hot' ? (
          <BreadList title="핫한 빵" subtitle="최근 한 달 간 예약이 많은 순" breadData={hotBreads} />
        ) : (
          <BreadList title="인기 빵" subtitle="즐겨찾기 많은 순" breadData={popularBreads} />
        )}
      </div>
    </div>
  );
}

function BreadList({
  title,
  subtitle,
  breadData,
}: {
  title: string;
  subtitle: string;
  breadData: { id: number; name: string; description: string; price: string; img: string }[];
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray900 mt-4 mb-1">{title}</h2>
      <p className="mb-4 text-gray500 text-[13px]">{subtitle}</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {breadData.map((bread) => (
          <BreadCard
            key={bread.id}
            id={bread.id}
            profileImgUrl={bread.img}
            name={bread.name}
            description={bread.description}
            price={bread.price}
          />
        ))}
      </div>
    </div>
  );
}
