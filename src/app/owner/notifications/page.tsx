'use client';

import { CustomerNotification, NotificationType } from '@/types/notification';
import { useEffect, useRef } from 'react';
import CustomerNotificationCard from '@/components/notifications/customernotificationcard/CustomerNotificationCard';
import { useCustomerNotifications } from '@/lib/api/notification';
import EmptyState from '@/components/common/EmptyState';

export default function Page() {
  return (
    <>
      <section className="flex flex-col justify-center items-start gap-4 px-5 pt-6 pb-[50px] w-full bg-gray50">
        <div className="flex flex-col items-start gap-[0.625rem] w-full">
          <CustomerNotificationList type={'ALL'} />
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
        <EmptyState title="즐겨찾기한 빵집이 없습니다." message="자주 가는 빵집을 추가해 보세요." />
      )}
      <div ref={observerRef} />
      {isFetchingNextPage && <p />}
    </>
  );
};
