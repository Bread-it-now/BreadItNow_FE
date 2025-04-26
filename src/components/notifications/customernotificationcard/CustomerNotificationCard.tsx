'use client';

import { CustomerNotification } from '@/types/notification';
import reservation from '@/assets/icons/reservation.svg';
import bread from '@/assets/icons/bread.svg';
import Image from 'next/image';
import { getDateFormat, getElapsedTime } from '@/utils/date';
import { useRouter } from 'next/navigation';
import { readCustomerNotification } from '@/lib/api/notification';

const CustomerNotificationCard = ({
  type,
  isRead,
  createdAt,
  productName,
  bakeryName,
  remainingCount,
  alertCount,
  reservationStatus,
  pickupDeadline,
  bakeryId,
  notificationId,
}: CustomerNotification) => {
  const router = useRouter();
  return (
    <div
      className="flex items-start p-5 gap-[0.375rem] w-full bg-white rounded-[0.625rem]"
      onClick={() => {
        router.push(type === 'ALERT' ? `/bakery/${bakeryId}` : '/mypage/reservations');
        readCustomerNotification(notificationId);
      }}>
      <div className="w-[18px]">
        <Image
          src={type === 'ALERT' ? bread : reservation}
          width={18}
          height={18}
          layout="intrinsic"
          alt="notification"
          className="w-full"
        />
      </div>
      <div
        className={`flex flex-col items-start gap-[0.375rem] w-full h-full ${isRead ? 'opacity-50' : 'opacity-100'}`}>
        <div className="flex items-start gap-5 w-full h-[19px] text-title-content-xs font-normal text-gray500">
          <p className="w-full">{type === 'ALERT' ? '빵 알림' : '예약'}</p>
          <span className="w-full text-end">{getElapsedTime(createdAt)}</span>
        </div>
        <div className="text-title-content-s text-gray900 w-full max-w-[270px]">
          <p className="font-semibold w-full">
            {type === 'ALERT'
              ? `(${bakeryName}) ${productName[0]}${productName.length === 1 ? '빵이' : ` 외 ${productName.length - 1}개의 빵이`} 갓 나왔습니다.`
              : reservationStatus === 'APPROVED' ||
                  reservationStatus === 'PARTIAL_APPROVED' ||
                  reservationStatus === 'CANCELED'
                ? `(${bakeryName}) ${productName[0]}${productName.length === 1 ? ' 예약이' : ` 외 ${productName.length - 1}개의 예약이`} [${reservationStatus === 'APPROVED' ? '완료' : reservationStatus === 'PARTIAL_APPROVED' ? '부분 완료' : '취소'}] 되었습니다.`
                : reservationStatus === 'PAYMENT_COMPLETED'
                  ? `(${bakeryName}) ${productName[0]}${productName.length === 1 ? '' : ` 외 ${productName.length - 1}개`}의 결제가 완료되었습니다.`
                  : `(${bakeryName}) ${productName[0]}${productName.length === 1 ? '' : ` 외 ${productName.length - 1}개`}의 예약이 대기중입니다.`}
          </p>
          <p className="font-normal">
            {type === 'ALERT'
              ? `[잔여개수 ${remainingCount}개 / 함께 기다리는 사람 ${alertCount}명]`
              : pickupDeadline && `[${getDateFormat(pickupDeadline)}까지 픽업해주세요!]`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerNotificationCard;
