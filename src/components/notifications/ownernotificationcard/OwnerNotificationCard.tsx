'use client';

import { OwnerNotification } from '@/types/notification';
import reservation from '@/assets/icons/reservation.svg';
import Image from 'next/image';
import { getDateFormat, getElapsedTime } from '@/utils/date';
import { useRouter } from 'next/navigation';

const OwnerNotificationCard = ({
  reservationId,
  nickname,
  status,
  isRead,
  productsName,
  createdAt,
}: OwnerNotification) => {
  const router = useRouter();
  return (
    <div
      className="flex items-start p-5 gap-[0.375rem] w-full bg-white rounded-[0.625rem]"
      onClick={() => {
        router.push(`/owner/reservations/${reservationId}`);
      }}>
      <div className="w-[18px]">
        <Image src={reservation} width={18} height={18} layout="intrinsic" alt="notification" className="w-full" />
      </div>
      <div
        className={`flex flex-col items-start gap-[0.375rem] w-full h-full ${isRead ? 'opacity-50' : 'opacity-100'}`}>
        <div className="flex items-start gap-5 w-full h-[19px] text-title-content-xs font-normal text-gray500">
          <p className="w-full">{'예약'}</p>
          <span className="w-full text-end">{getElapsedTime(createdAt)}</span>
        </div>
        <div className="text-title-content-s text-gray900 w-full max-w-[270px]">
          <p className="font-semibold w-full">{`(${nickname}) ${productsName.length === 1 ? productsName[0] : `${productsName[0]} 외 ${productsName.length - 1}개`}의 예약이 [${status === 'CUSTOMER_CANCELED' || status === 'OWNER_REJECTED' ? '취소' : '요청'}] 되었습니다.`}</p>
          {(status === 'APPROVED' || status === 'PARTIAL_APPROVED' || status === 'WAITING') && (
            <p className="font-normal">{`${status === 'APPROVED' || status === 'PARTIAL_APPROVED' ? `예약번호 ${reservationId} / ` : ''}${getDateFormat(createdAt)}`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerNotificationCard;
