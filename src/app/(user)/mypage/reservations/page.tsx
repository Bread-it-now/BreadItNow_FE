'use client';
import RoundTab from '@/components/common/tabs/RoundTab';
import { ReservationStatus } from '@/types/bakery';
import { useState } from 'react';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<ReservationStatus | 'ALL'>('ALL');
  return (
    <>
      <section className="flex items-center pl-5 py-[0.625rem] g-[0.375rem] h-[55px] overflow-y-auto bg-white border-b-[1px] border-b-gray100">
        <RoundTab
          categories={[
            { key: 'ALL', label: '전체' },
            { key: 'PENDING', label: '예약 대기' },
            { key: 'ACCEPTED', label: '예약 승인' },
            { key: 'PARTIALLY_APPROVED', label: '예약 부분 승인' },
            { key: 'CANCELED', label: '예약 취소' },
            { key: 'COMPLETED', label: '결제 완료' },
          ]}
          activeTab={selectedCategory}
          onTabChange={setSelectedCategory}
          className="px-0 py-0"
        />
      </section>
    </>
  );
}
