'use client';

import RoundTab from '@/components/common/tabs/RoundTab';
import { ReservationStatus } from '@/types/reservation';
import ReservationCard from '@/components/reservation/ReservationCard';
import { useState } from 'react';
import { ResservationInfo } from '@/mocks/data/reservation';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<ReservationStatus | 'ALL'>('ALL');
  const selectedReservationCards = ResservationInfo.filter((reservation) => {
    if (selectedCategory === 'ALL') return true;
    return reservation.status === selectedCategory;
  });

  return (
    <>
      <section className="flex items-center pl-5 py-[0.625rem] g-[0.375rem] h-[55px] overflow-y-auto bg-white border-b-[1px] border-b-gray100">
        <RoundTab
          categories={[
            { key: 'ALL', label: '전체' },
            { key: 'WAITING', label: '예약 대기' },
            { key: 'APPROVED', label: '예약 승인' },
            { key: 'PARTIALLY_APPROVED', label: '예약 부분 승인' },
            { key: 'CANCELED', label: '예약 취소' },
            { key: 'PAYMENT_COMPLETED', label: '결제 완료' },
          ]}
          activeTab={selectedCategory}
          onTabChange={setSelectedCategory}
          className="px-0 py-0"
        />
      </section>
      <section className="flex flex-col justify-center items-start gap-4 px-5 pt-6 pb-[50px] w-full">
        <p className="flex justify-start w-full text-title-content-s font-normal text-gray900">
          총&nbsp;<span className="text-primary"> {selectedReservationCards.length}</span>개
        </p>
        <div className="flex flex-col items-start gap-[0.625rem] w-full">
          {selectedReservationCards.map((reservation) => (
            <ReservationCard key={reservation.reservationId} {...reservation} />
          ))}
        </div>
      </section>
    </>
  );
}
