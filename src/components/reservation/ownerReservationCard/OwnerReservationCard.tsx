'use client';

import { OwnerReservationStatus, OwnerReservation } from '@/types/reservation';
import { comma } from '@/utils/comma';
import { getDateFormat } from '@/utils/date';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export const OWNER_RESERVATION_STATUS: Record<OwnerReservationStatus, string> = {
  WAITING: '승인 대기',
  APPROVED: '접수 완료',
  PARTIAL_APPROVED: '접수 부분 완료',
  CUSTOMER_CANCELED: '고객 예약 취소',
  OWNER_REJECTED: '예약 취소',
  PAYMENT_COMPLETED: '결제 완료',
};

const OwnerReservationCard = ({
  reservationId,
  reservationDate,
  reservationNumber,
  status,
  consumerNickname,
  totalPrice,
  approveDate,
}: OwnerReservation) => {
  return (
    <Link
      href={`${ROUTES.OWNER.RESERVATIONS}/${reservationId}`}
      className="flex flex-col items-start p-6 gap-4 w-full bg-white rounded-2xl">
      <div className="flex items-center w-full h-[22px]">
        <p className="text-title-content-m text-gray900 w-full text-nowrap">{OWNER_RESERVATION_STATUS[status]}</p>
        <div className="flex justify-start items-center gap-[0.375rem] w-full h-full text-title-content-xs font-normal text-gray500">
          <p className="flex justify-end w-full text-nowrap">
            예약번호 {reservationNumber} • {consumerNickname}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-3 w-full">
        <div className="flex flex-col items-start gap-1 w-full">
          <p className="w-full text-title-content-s text-gray900 truncate">내역은 최대 한줄 이후말줄임... 외 5건</p>
          <p className="text-title-content-s font-normal text-gray900">{comma(totalPrice)}원</p>
        </div>
        {status !== 'PAYMENT_COMPLETED' && (
          <div
            className={`flex justify-center items-center p-[0.75rem] gap-[0.375rem] w-full h-[43px] rounded-lg text-title-content-xs font-normal bg-gray50`}>
            <span className="font-semibold text-gray500">
              {status === 'WAITING'
                ? '예약일시'
                : status === 'APPROVED' || status === 'PARTIAL_APPROVED'
                  ? '접수일시'
                  : status === 'CUSTOMER_CANCELED'
                    ? '고객'
                    : ''}
            </span>
            <span className="text-gray500">
              {status === 'WAITING'
                ? getDateFormat(reservationDate)
                : status === 'APPROVED' || status === 'PARTIAL_APPROVED'
                  ? approveDate && getDateFormat(approveDate)
                  : status === 'CUSTOMER_CANCELED'
                    ? '요청으로 예약 취소'
                    : '판매자 사정으로 예약 취소'}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default OwnerReservationCard;
