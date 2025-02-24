'use client';

import { ReservationStatus } from '@/types/bakery';
import Image from 'next/image';
import { comma } from '@/utils/comma';

const RESERVATION_STATUS: Record<ReservationStatus, string> = {
  PENDING: '예약 대기',
  ACCEPTED: '예약 승인',
  PARTIALLY_ACCEPTED: '예약 부분 승인',
  CANCELED: '예약 취소',
  COMPLETED: '결제 완료',
};

export interface ReservationCardProps {
  /** 예약번호 */
  id?: number;
  /** 예약 상태 */
  status: ReservationStatus;
  /** 예약 날짜*/
  date: string;
  /** 빵집 이름 */
  bakeryName: string;
  /** 예약 빵 내역 */
  reservedBreads: string[];
  /** 예약 금액 */
  totalPrice: number;
  /** 픽업 시간 */
  pickupTime?: string;
  /** 취소 사유 */
  cancelDetail?: string;
  /** 빵집 이미지 */
  imgUrl: string;
}

const ReservationCard = ({
  id,
  status,
  date,
  bakeryName,
  reservedBreads,
  totalPrice,
  pickupTime,
  cancelDetail,
  imgUrl,
}: ReservationCardProps) => {
  return (
    <div className="flex flex-col items-start p-6 gap-4 w-full bg-white rounded-2xl">
      <div className="flex items-center gap-5 w-full h-[22px]">
        <p className="w-full text-title-content-m text-gray900">{RESERVATION_STATUS[status]}</p>
        <div className="flex justify-end items-center gap-[0.375rem] w-full h-full text-title-content-xs font-normal text-gray500">
          {id && <p className="w-full text-nowrap">예약번호 {id} •</p>}
          <p>{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full h-[68px]">
        <div className="flex relative w-[6.125rem] h-[68px]">
          <Image src={imgUrl} width={68} height={68} alt="bakery" className="h-full" />
        </div>
        <div className="flex flex-col items-start gap-2 w-full max-w-[203px]">
          <div className="flex flex-col items-start gap-[0.125rem] w-full">
            <p className="w-full text-title-content-xs font-normal text-gray700">{bakeryName}</p>
            <p className="w-full text-title-content-s text-gray900 truncate">
              {reservedBreads.length === 1
                ? reservedBreads[0]
                : `${reservedBreads[0]} 외 ${reservedBreads.length - 1}건`}
            </p>
          </div>
          <p className="text-title-content-s font-normal text-gray900">{comma(totalPrice)}원</p>
        </div>
      </div>
      {(status === 'CANCELED' || status === 'ACCEPTED' || status === 'PARTIALLY_ACCEPTED') && (
        <div
          className={`flex justify-center items-center p-[0.75rem gap-[0.375rem] w-full h-[43px] rounded-lg text-title-content-xs font-normal ${status === 'CANCELED' ? 'bg-gray50 text-gray500' : 'bg-[#FFF0EC] text-primary'}`}>
          {(status === 'ACCEPTED' || status === 'PARTIALLY_ACCEPTED') && (
            <span className="font-semibold text-primary">픽업일시</span>
          )}
          <span>{status === 'CANCELED' ? cancelDetail : pickupTime}</span>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
