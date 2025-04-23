'use client';

import RoundTab from '@/components/common/tabs/RoundTab';
import { CustomerReservation, CustomerReservationStatus } from '@/types/reservation';
import { useEffect, useRef, useState } from 'react';
import CustomerReservationCard from '@/components/reservation/customerReservationCard/CustomerReservationCard';
import { useCustomerReservations } from '@/lib/api/reservation';
import EmptyState from '@/components/common/EmptyState';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<CustomerReservationStatus | 'ALL'>('ALL');
  const [totalElementsCnt, setTotalElementsCnt] = useState<number>(0);

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
          총&nbsp;<span className="text-primary"> {totalElementsCnt}</span>개
        </p>
        <div
          className={`flex flex-col items-start gap-[0.625rem] w-full min-h-[240px] ${totalElementsCnt === 0 && 'center'}`}>
          <CustomerReservationList category={selectedCategory} handleTotalElementsCnt={setTotalElementsCnt} />
        </div>
      </section>
    </>
  );
}

const CustomerReservationList = ({
  category,
  handleTotalElementsCnt,
}: {
  category: CustomerReservationStatus | 'ALL';
  handleTotalElementsCnt: (value: number) => void;
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCustomerReservations({
    reservationStatus: category,
    size: 10,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);
  const totalElements = data?.pages[0]?.data?.pageInfo?.totalElements || 0;

  useEffect(() => {
    handleTotalElementsCnt(totalElements);
  }, [totalElements, handleTotalElementsCnt]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      {data?.pages[0].data.reservations.length !== 0 ? (
        data?.pages?.flatMap((page: { data: { reservations: CustomerReservation[] } }) =>
          page.data.reservations.map((reservation: CustomerReservation) => (
            <CustomerReservationCard
              key={reservation.reservationId}
              status={reservation.status}
              bakeryId={reservation.bakeryId}
              bakeryName={reservation.bakeryName}
              profileImage={reservation.profileImage}
              reservationDate={reservation.reservationDate}
              totalReservationProducts={reservation.totalReservationProducts}
              totalPrice={reservation.totalPrice}
              reservationId={reservation.reservationId}
              reservationNumber={reservation.reservationNumber}
              mainReservationProductName={reservation.mainReservationProductName}
              pickupDeadline={reservation.pickupDeadline}
            />
          )),
        )
      ) : (
        <EmptyState title="예약 내역이 없습니다." message="원하는 빵을 미리 예약해 보세요." />
      )}
      <div ref={observerRef} />
      {isFetchingNextPage && <p />}
    </>
  );
};
