'use client';

import { CustomerReservationStatus, CustomerReservation } from '@/types/reservation';
import Image from 'next/image';
import { comma } from '@/utils/comma';
import { getDate, getDateFormat } from '@/utils/date';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export const CUSTOMER_RESERVATION_STATUS: Record<CustomerReservationStatus, string> = {
  WAITING: '예약 대기',
  APPROVED: '예약 승인',
  PARTIAL_APPROVED: '예약 부분 승인',
  CANCELED: '예약 취소',
  PAYMENT_COMPLETED: '결제 완료',
};

const CustomerReservationCard = ({
  reservationId,
  reservationDate,
  reservationNumber,
  status,
  bakeryName,
  totalPrice,
  pickupDeadline,
  profileImage,
  totalReservationProducts,
  mainReservationProductName,
}: CustomerReservation) => {
  return (
    <Link
      href={`${ROUTES.MYPAGE.RESERVATIONS}/${reservationId}`}
      className="flex flex-col items-start p-6 gap-4 w-full bg-white rounded-2xl">
      <div className="flex items-center gap-5 w-full h-[22px]">
        <p className="w-full text-title-content-m text-gray900 text-nowrap">{CUSTOMER_RESERVATION_STATUS[status]}</p>
        <div className="flex justify-end items-center gap-[0.375rem] w-full h-full text-title-content-xs font-normal text-gray500">
          {reservationNumber && <p className="w-full text-nowrap">예약번호 {reservationNumber} •</p>}
          <p>{getDate(reservationDate)}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full h-[68px]">
        <div className="flex relative w-[6.125rem] h-[68px]">
          <Image src={profileImage} width={68} height={68} alt="bakery" className="h-full rounded-md" />
        </div>
        <div className="flex flex-col items-start gap-2 w-full max-w-[203px]">
          <div className="flex flex-col items-start gap-[0.125rem] w-full">
            <p className="w-full text-title-content-xs font-normal text-gray700">{bakeryName}</p>
            <p className="w-full text-title-content-s text-gray900 truncate">{`${mainReservationProductName} ${totalReservationProducts === 1 ? '' : `외 ${totalReservationProducts}건`}`}</p>
          </div>
          <p className="text-title-content-s font-normal text-gray900">{comma(totalPrice)}원</p>
        </div>
      </div>
      {(status === 'CANCELED' || status === 'APPROVED' || status === 'PARTIAL_APPROVED') && (
        <div
          className={`flex justify-center items-center p-[0.75rem] gap-[0.375rem] w-full h-[43px] rounded-lg text-title-content-xs font-normal ${status === 'CANCELED' ? 'bg-gray50 text-gray500' : 'bg-[#FFF0EC] text-primary'}`}>
          {(status === 'APPROVED' || status === 'PARTIAL_APPROVED') && (
            <span className="font-semibold text-primary">픽업일시</span>
          )}
          <span>
            {status === 'CANCELED' ? '예약 취소' : pickupDeadline !== undefined ? getDateFormat(pickupDeadline) : ''}
          </span>
        </div>
      )}
    </Link>
  );
};

export default CustomerReservationCard;
