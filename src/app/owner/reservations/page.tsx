'use client';

import RoundTab from '@/components/common/tabs/RoundTab';
import OwnerReservationCard from '@/components/reservation/ownerReservationCard/OwnerReservationCard';
import { useState } from 'react';
import { OwnerReservationStatusQuery } from '@/types/reservation';
import { useOwnerReservations } from '@/lib/api/reservation';
import Empty from '@/assets/icons/empty.svg';
import Image from 'next/image';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<OwnerReservationStatusQuery>('WAITING');
  const { data } = useOwnerReservations({ reservationStatus: selectedCategory, page: 0, size: 10 });
  const reservations = data?.reservations;

  return (
    <>
      <section className="flex items-center pl-5 py-[0.625rem] g-[0.375rem] h-[55px] bg-white border-b-[1px] border-b-gray100">
        <RoundTab
          categories={[
            { key: 'WAITING', label: `승인 대기` },
            { key: 'APPROVED', label: `접수 완료` },
            { key: 'PAYMENT_COMPLETED', label: `결제 완료` },
            { key: 'CANCELED', label: `취소` },
          ]}
          activeTab={selectedCategory}
          onTabChange={setSelectedCategory}
          className="px-0 py-0"
        />
      </section>

      <section className="flex flex-col justify-center items-start gap-[0.625rem] px-5 pt-6 pb-[50px] w-full bg-gray50">
        {/* 무한스크롤로 수정 필요 */}
        {reservations && reservations.length !== 0 ? (
          reservations.map((reservation) => <OwnerReservationCard key={reservation.reservationId} {...reservation} />)
        ) : (
          /* no-data */
          <div className="flex flex-col justify-center items-center gap-4 w-full h-full">
            <Image src={Empty} width={70} height={70} alt="empty" />
            <div className="flex flex-col items-center gap-[6px] w-full h-full text-gray500">
              <p className="text-title-content-s font-medium">예약 내역이 없습니다.</p>
              <p className="text-title-content-2xs">원하는 빵을 미리 예약해 보세요.</p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
