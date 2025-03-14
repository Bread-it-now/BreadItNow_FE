'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BakeryCard from '@/components/bakerycard/BakeryCard';
import HotBreadTab from '@/components/common/tabs/HotBreadTab';
import Back from '@/assets/icons/back.svg';
import Bakery from '@/assets/images/bakery.png';

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'hot' | 'popular'>('hot');

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
            { key: 'hot', label: '핫한 빵집' },
            { key: 'popular', label: '인기 빵집' },
          ]}
        />
      </div>

      <div className="flex-1 overflow-auto text-gray900 p-4">
        {activeTab === 'hot' ? (
          <BakeryList title="핫한 빵집" subtitle="최근 한 달 간 예약이 많은 순" bakeryData={hotBakeries} />
        ) : (
          <BakeryList title="인기 빵집" subtitle="즐겨찾기 많은 순" bakeryData={popularBakeries} />
        )}
      </div>
    </div>
  );
}

const hotBakeries = [
  {
    id: 1,
    name: '크로와상 베이커리',
    profileImgUrl: Bakery.src,
    operatingStatus: 'OPEN' as const,
    distance: 1.2,
    rank: 1,
  },
  { id: 2, name: '소금빵 명가', profileImgUrl: Bakery.src, operatingStatus: 'CLOSED' as const, distance: 2.5, rank: 2 },
  {
    id: 3,
    name: '앙버터 전문점',
    profileImgUrl: Bakery.src,
    operatingStatus: 'TEMPORARY_CLOSED' as const,
    distance: 3.1,
    rank: 3,
  },
];

const popularBakeries = [
  { id: 4, name: '마카롱 명가', profileImgUrl: Bakery.src, operatingStatus: 'OPEN' as const, distance: 0.8, rank: 1 },
  {
    id: 5,
    name: '베이글 하우스',
    profileImgUrl: Bakery.src,
    operatingStatus: 'CLOSED' as const,
    distance: 1.5,
    rank: 2,
  },
  { id: 6, name: '프랑스 빵집', profileImgUrl: Bakery.src, operatingStatus: 'OPEN' as const, distance: 2.2, rank: 3 },
];

function BakeryList({
  title,
  subtitle,
  bakeryData,
}: {
  title: string;
  subtitle: string;
  bakeryData: {
    id: number;
    name: string;
    profileImgUrl: string;
    operatingStatus: 'OPEN' | 'CLOSED' | 'TEMPORARY_CLOSED';
    distance: number;
    rank: number;
  }[];
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray900 mt-4 mb-1">{title}</h2>
      <p className="mb-4 text-gray500 text-[13px]">{subtitle}</p>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {bakeryData.map((bakery) => (
          <BakeryCard size="large" key={bakery.id} {...bakery} />
        ))}
      </div>
    </div>
  );
}
