'use client';

import RoundTab from '@/components/common/tabs/RoundTab';
import { CustomerNotification, NotificationType } from '@/types/notification';
import { useEffect, useRef, useState } from 'react';
import CustomerNotificationCard from '@/components/notifications/customernotificationcard/CustomerNotificationCard';
import setting from '@/assets/icons/setting.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useCustomerNotifications } from '@/lib/api/notification';
import EmptyState from '@/components/common/EmptyState';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<NotificationType | 'ALL'>('ALL');

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
          <CustomerNotificationList type={selectedCategory} />
        </div>
      </section>
    </>
  );
}

const CustomerNotificationList = ({ type }: { type: NotificationType | 'ALL' }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCustomerNotifications({
    type,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      {data?.pages[0].data.notifications.length !== 0 ? (
        data?.pages.map((page) =>
          page.data.notifications.map((notification: CustomerNotification) => (
            <CustomerNotificationCard {...notification} key={notification.notificationId} />
          )),
        )
      ) : (
        <EmptyState title="알림이 없습니다." message="알림 설정을 하세요." />
      )}
      <div ref={observerRef} />
      {isFetchingNextPage && <p />}
    </>
  );
};
