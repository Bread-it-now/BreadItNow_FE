'use client';

import RoundTab from '@/components/common/tabs/RoundTab';
import OwnerReservationCard, {
  OwnerReservationCardProps,
} from '@/components/reservation/ownerReservationCard.tsx/OwnerReservationCard';
import { useState } from 'react';
import { mockOwnerResservationCards } from '@/mocks/data/reservation';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<'WAITING' | 'PAYMENT_COMPLETED' | 'CANCELED' | 'APPROVED'>(
    'WAITING',
  );
  const selectedReservationCards = mockOwnerResservationCards.filter((ownerReservation: OwnerReservationCardProps) => {
    const status = ownerReservation.status;
    if (selectedCategory === 'WAITING' || selectedCategory === 'PAYMENT_COMPLETED') return status === selectedCategory;
    if (selectedCategory === 'APPROVED') return status === 'APPROVED' || status === 'PARTIAL_APPROVED';
    return status === 'CUSTOMER_CANCELED' || status === 'OWNER_REJECTED';
  });

  return (
    <>
      <section className="flex items-center pl-5 py-[0.625rem] g-[0.375rem] h-[55px] bg-white border-b-[1px] border-b-gray100">
        <RoundTab
          categories={[
            { key: 'WAITING', label: `승인 대기 ${selectedReservationCards.length}` },
            { key: 'APPROVED', label: `접수 완료 ${selectedReservationCards.length}` },
            { key: 'PAYMENT_COMPLETED', label: `결제 완료 ${selectedReservationCards.length}` },
            { key: 'CANCELED', label: `취소 ${selectedReservationCards.length}` },
          ]}
          activeTab={selectedCategory}
          onTabChange={setSelectedCategory}
          className="px-0 py-0"
        />
      </section>

      <section className="flex flex-col justify-center items-start gap-[0.625rem] px-5 pt-6 pb-[50px] w-full bg-gray50">
        {selectedReservationCards.map((reservation) => (
          <OwnerReservationCard key={reservation.reservationId} {...reservation} />
        ))}
      </section>
    </>
  );
}
