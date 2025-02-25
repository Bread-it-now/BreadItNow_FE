'use client';

import { getPickupDeadlineFormat, RESERVATION_STATUS } from '@/components/reservation/ReservationCard';
import { reservationDetails } from '@/mocks/data/reservation';
import { getDate } from '@/utils/date';
import { useParams } from 'next/navigation';
import arrowRight from '@/assets/icons/arrow-right.svg';
import copy from '@/assets/icons/copy.svg';
import Image from 'next/image';
import ProductItem from '@/components/productItem/ProductItem';
import Stack from '@/components/common/stack/Stack';
import { comma } from '@/utils/comma';
import Button from '@/components/button/Button';

export default function Page() {
  const { id = 1 } = useParams();
  const reservationDetail = reservationDetails.filter((res) => res.reservation.reservationId === +id)[0];
  const { reservation, bakery } = reservationDetail;
  const { reservationNumber, reservationDate, status, totalPrice, reservationItems, pickupDeadline, cancelDetail } =
    reservation;
  const { name: bakeryName, address } = bakery;

  return (
    <>
      <section className="flex items-center p-5 gap-5 w-full">
        <p className="w-full text-title-content-m text-gray900">{RESERVATION_STATUS[status]}</p>
        <div className="flex justify-end items-center gap-[0.375rem] w-full h-full text-title-content-xs font-normal text-gray500">
          {reservationNumber && <p className="w-full text-nowrap">예약번호 {reservationNumber} •</p>}
          <p>{getDate(reservationDate)}</p>
        </div>
      </section>
      <section className="flex flex-col items-start gap-[0.625rem] w-full">
        <div className="flex flex-col justify-center px-[1.875rem] py-5 gap-6 w-full bg-white rounded-2xl">
          <div className="flex items-center gap-5 w-full">
            <div className="flex flex-col items-start gap-1 w-full h-full">
              <p className="text-title-content-l text-gray900">{bakeryName}</p>
              <div className="flex items-center gap-1 text-title-content-xs font-normal text-gray500">
                <span>{address}</span>
                <button className="p-0 flex items-center justify-center" onClick={() => {}}>
                  <Image src={copy} width={16} height={16} alt="address copy" />
                </button>
              </div>
            </div>
            <button className="p-0 flex items-center justify-center" onClick={() => {}}>
              <Image src={arrowRight} width={20} height={20} alt="move to bakerydetail page" />
            </button>
          </div>
          {(status === 'CANCELED' || status === 'APPROVED' || status === 'PARTIALLY_APPROVED') && (
            <div
              className={`flex justify-center items-center p-[0.75rem] gap-[0.375rem] w-full h-[43px] rounded-lg text-title-content-xs font-normal ${status === 'CANCELED' ? 'bg-gray50 text-gray500' : 'bg-[#FFF0EC] text-primary'}`}>
              {(status === 'APPROVED' || status === 'PARTIALLY_APPROVED') && (
                <span className="font-semibold text-primary">픽업일시</span>
              )}
              <span>
                {status === 'CANCELED'
                  ? cancelDetail
                  : pickupDeadline !== undefined
                    ? getPickupDeadlineFormat(pickupDeadline)
                    : ''}
              </span>
            </div>
          )}
        </div>
      </section>
      {status === 'CANCELED' && (
        <section className="flex flex-col items-start p-5 gap-5 w-full rounded-2xl bg-white">
          <p className="w-full text-title-content-m text-gray900">예약 취소 상품</p>
          <div className="flex flex-col gap-[1.875rem] w-full">
            <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
              {reservationItems.map((item) => (
                <ProductItem key={`${item.productId}-${item.name}`} {...item} />
              ))}
            </Stack>
          </div>
        </section>
      )}
      <section className="flex flex-col items-start p-5 gap-5 w-full rounded-2xl bg-white">
        <p className="w-full text-title-content-m text-gray900">예약 상품</p>
        <div className="flex flex-col gap-[1.875rem] w-full">
          <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
            {reservationItems.map((item) => (
              <ProductItem key={`${item.productId}-${item.name}`} {...item} />
            ))}
          </Stack>
        </div>
        <div className="flex items-center p-5 gap-5 w-full h-[66px] rounded-lg bg-gray50">
          <span className="text-title-content-s text-gray900 w-full">
            총 <span className="text-primary">{reservationItems.length}</span>건 상품 금액
          </span>
          <span className="text-right text-title-content-l text-primary w-full">{comma(totalPrice)}원</span>
        </div>
      </section>
      <section className="absolute left-0 bottom-0 p-5 w-full h-[92px] bg-white shadow-[0px-1px-20px-[rgba(28,30,32,0.08)] z-10">
        <Button variant="default" fullWidth onClick={() => {}}>
          예약취소
        </Button>
      </section>
    </>
  );
}
