'use client';

import { CUSTOMER_RESERVATION_STATUS } from '@/components/reservation/customerReservationCard/CustomerReservationCard';
import { getDate } from '@/utils/date';
import { useParams, useRouter } from 'next/navigation';
import arrowRight from '@/assets/icons/arrow-right.svg';
import copy from '@/assets/icons/copy.svg';
import Image from 'next/image';
import ReservationProduct from '@/components/reservation/reservationproduct/ReservationProduct';
import Stack from '@/components/common/stack/Stack';
import { comma } from '@/utils/comma';
import Button from '@/components/button/Button';
import { useCustomerReservationDetail } from '@/lib/api/reservation';

export default function Page() {
  const { id = 1 } = useParams();

  const { data: reservationDetail } = useCustomerReservationDetail(Number(id));

  const router = useRouter();

  return (
    <>
      {reservationDetail && reservationDetail.bakery && reservationDetail.reservation && (
        <>
          <section className="flex items-center p-5 gap-5 w-full">
            <p className="w-full text-title-content-m text-gray900">
              {CUSTOMER_RESERVATION_STATUS[reservationDetail.reservation.status]}
            </p>
            <div className="flex justify-end items-center gap-[0.375rem] w-full h-full text-title-content-xs font-normal text-gray500">
              <p className="w-full text-nowrap">예약번호 {reservationDetail.reservation.reservationNumber} •</p>
              <p>{getDate(reservationDetail.reservation.reservationDate)}</p>
            </div>
          </section>
          <section className="flex flex-col items-start gap-[0.625rem] w-full">
            <div className="flex flex-col justify-center px-5 py-[30px] gap-6 w-full bg-white rounded-2xl">
              <div className="flex items-center gap-5 w-full">
                <div className="flex flex-col items-start gap-1 w-full h-full">
                  <p className="text-title-content-l text-gray900">{reservationDetail.bakery.name}</p>
                  <div className="flex items-center gap-1 text-title-content-xs font-normal text-gray500">
                    <span>{reservationDetail.bakery.address}</span>
                    <button className="p-0 flex items-center justify-center" onClick={() => {}}>
                      <Image src={copy} width={16} height={16} alt="address copy" className="hover:opacity-50" />
                    </button>
                  </div>
                </div>
                <button
                  className="p-0 flex items-center justify-center"
                  onClick={() => router.push(`/bakery/${reservationDetail.bakery.bakeryId}`)}>
                  <Image src={arrowRight} width={20} height={20} alt="move to bakerydetail page" />
                </button>
              </div>

              {(reservationDetail.reservation.status === 'CANCELED' ||
                reservationDetail.reservation.status === 'APPROVED' ||
                reservationDetail.reservation.status === 'PARTIAL_APPROVED') && (
                <div
                  className={`flex justify-center items-center p-[0.75rem] gap-[0.375rem] w-full h-[43px] rounded-lg text-title-content-xs font-normal ${reservationDetail.reservation.status === 'CANCELED' ? 'bg-gray50 text-gray500' : 'bg-[#FFF0EC] text-primary'}`}>
                  {(reservationDetail.reservation.status === 'APPROVED' ||
                    reservationDetail.reservation.status === 'PARTIAL_APPROVED') && (
                    <span className="font-semibold text-primary">픽업일시</span>
                  )}
                  <span>
                    {reservationDetail.reservation.status === 'CANCELED'
                      ? reservationDetail.reservation.cancelDetail
                      : reservationDetail.reservation.pickupDeadline !== undefined
                        ? getDate(reservationDetail.reservation.pickupDeadline)
                        : ''}
                  </span>
                </div>
              )}
            </div>
          </section>
          {reservationDetail.reservation.status === 'CANCELED' && (
            <section className="flex flex-col items-start p-5 gap-5 w-full rounded-2xl bg-white">
              <p className="w-full text-title-content-m text-gray900">예약 취소 상품</p>
              <div className="flex flex-col gap-[1.875rem] w-full">
                <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
                  {reservationDetail.reservation.reservationItems.map((product) => (
                    <ReservationProduct key={`${product.productId}-${product.name}`} {...product} />
                  ))}
                </Stack>
              </div>
            </section>
          )}
          <section className="flex flex-col items-start p-5 gap-5 w-full rounded-2xl bg-white">
            <p className="w-full text-title-content-m text-gray900">예약 상품</p>
            <div className="flex flex-col gap-[1.875rem] w-full">
              <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
                {reservationDetail.reservation.reservationItems.map((product) => (
                  <ReservationProduct key={`${product.productId}-${product.name}`} {...product} />
                ))}
              </Stack>
            </div>
            <div className="flex items-center p-5 gap-5 w-full h-[66px] rounded-lg bg-gray50">
              <span className="text-title-content-s text-gray900 w-full">
                총 <span className="text-primary">{reservationDetail.reservation.reservationItems.length}</span>건 상품
                금액
              </span>
              <span className="text-right text-title-content-l text-primary w-full">
                {comma(reservationDetail.reservation.totalPrice)}원
              </span>
            </div>
          </section>
          {reservationDetail.reservation.status !== 'CANCELED' && (
            <section className="p-5 w-full h-[92px] bg-white shadow-[0px-1px-20px-[rgba(28,30,32,0.08)] z-10">
              <Button variant="default" scale="large" fullWidth onClick={() => {}}>
                예약취소
              </Button>
            </section>
          )}
        </>
      )}
    </>
  );
}
