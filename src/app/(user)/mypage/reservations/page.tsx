'use client';

import RoundTab from '@/components/common/tabs/RoundTab';
import { CustomerReservationStatus } from '@/types/reservation';
import { useState } from 'react';
import CustomerReservationCard from '@/components/reservation/customerReservationCard/CustomerReservationCard';
import { useCustomerReservations } from '@/lib/api/reservation';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<CustomerReservationStatus>('ALL');
  const { data } = useCustomerReservations({ reservationStatus: selectedCategory, page: 0, size: 10 });
  const reservations = data?.reservations;

  return (
    <>
      <section className="flex items-center pl-5 py-[0.625rem] g-[0.375rem] h-[55px] overflow-y-auto bg-white border-b-[1px] border-b-gray50">
        <RoundTab
          categories={[
            { key: 'ALL', label: '전체' },
            { key: 'WAITING', label: '예약 대기' },
            { key: 'APPROVED', label: '예약 승인' },
            { key: 'PARTIAL_APPROVED', label: '예약 부분 승인' },
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
          총&nbsp;<span className="text-primary"> {reservations ? reservations.length : 0}</span>개
        </p>
        <div className="flex flex-col items-start gap-[0.625rem] w-full min-h-[240px]">
          {reservations &&
            reservations.map((reservation) => (
              <CustomerReservationCard key={reservation.reservationId} {...reservation} />
            ))}
        </div>
      </section>
    </>
  );
}
