'use client';

import RoundTab from '@/components/common/tabs/RoundTab';
import { NotificationType } from '@/types/notification';
import { useState } from 'react';
import { notificatinoMockData } from '@/mocks/data/notification';
import NotificationCard from '@/components/notifications/notificationCard';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<NotificationType | 'ALL'>('ALL');
  const notifications = notificatinoMockData.filter((notification) => {
    if (selectedCategory === 'ALL') return true;
    return notification.type === selectedCategory;
  });

  return (
    <>
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
