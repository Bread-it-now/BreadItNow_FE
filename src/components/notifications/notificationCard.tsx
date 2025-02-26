'use client';

import { Notification } from '@/types/notification';
import reservation from '@/assets/icons/reservation.svg';
import bread from '@/assets/icons/bread.svg';
import Image from 'next/image';
import { getElapsedTime } from '@/utils/date';

const NotificationCard = ({ type, content, isRead, createAt }: Notification) => {
  return (
    <div className="flex items-start p-5 gap-[0.375rem] w-full bg-white rounded-[0.625rem]">
      <div className="w-[18px]">
        <Image
          src={type === 'ALERT' ? bread : reservation}
          width={18}
          height={18}
          layout="intrinsic"
          alt="notification"
        />
      </div>
      <div
        className={`flex flex-col items-start gap-[0.375rem] w-full h-full ${isRead ? 'opacity-50' : 'opacity-100'}`}>
        <div className="flex items-start gap-5 w-full h-[19px] text-title-content-xs font-normal text-gray500">
          <p className="w-full">{type === 'ALERT' ? '빵 알림' : '예약'}</p>
          <span className="w-full text-end">{getElapsedTime(createAt)}</span>
        </div>
        <div className=" text-title-content-s font-normal text-gray900">{content}</div>
      </div>
    </div>
  );
};

export default NotificationCard;
