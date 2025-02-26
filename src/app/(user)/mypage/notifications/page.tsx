'use client';

import RoundTab from '@/components/common/tabs/RoundTab';
import { NotificationType } from '@/types/notification';
import { useState } from 'react';
import { notificatinoMockData } from '@/mocks/data/notification';
import NotificationCard from '@/components/notifications/notificationCard';
import setting from '@/assets/icons/setting.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<NotificationType | 'ALL'>('ALL');
  const notifications = notificatinoMockData.filter((notification) => {
    if (selectedCategory === 'ALL') return true;
    return notification.type === selectedCategory;
  });

  const router = useRouter();

  return (
    <>
      <button
        className="absolute right-5 top-[3.625rem]"
        onClick={() => router.push(ROUTES.MYPAGE.APP_NOTIFICATIONS_SETTING)}>
        <span className={'w-[1.5rem] h-[1.5rem] text-right text-body-m font-medium text-primary hover:opacity-70'}>
          <Image src={setting} width={24} height={24} alt="setting" />
        </span>
      </button>
      <section className="flex items-center pl-5 py-[0.625rem] g-[0.375rem] h-[55px] overflow-y-auto bg-white border-b-[1px] border-b-gray100">
        <RoundTab
          categories={[
            { key: 'ALL', label: '전체' },
            { key: 'ALERT', label: '빵 알림' },
            { key: 'RESERVATION', label: '예약' },
          ]}
          activeTab={selectedCategory}
          onTabChange={setSelectedCategory}
          className="px-0 py-0"
        />
      </section>
      <section className="flex flex-col justify-center items-start gap-4 px-5 pt-6 pb-[50px] w-full">
        <div className="flex flex-col items-start gap-[0.625rem] w-full">
          {notifications.map((notification) => (
            <NotificationCard key={notification.notificationId} {...notification} />
          ))}
        </div>
      </section>
    </>
  );
}
