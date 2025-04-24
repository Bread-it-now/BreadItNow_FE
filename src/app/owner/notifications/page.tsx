'use client';

import { OwnerNotification } from '@/types/notification';
import { useEffect, useRef } from 'react';
import { useOwnerNotifications } from '@/lib/api/notification';
import EmptyState from '@/components/common/EmptyState';
import OwnerNotificationCard from '@/components/notifications/ownernotificationcard/OwnerNotificationCard';

export default function Page() {
  return (
    <>
      <section className="flex flex-col justify-center items-start gap-4 px-5 pt-6 pb-[50px] w-full bg-gray50">
        <div className="flex flex-col items-center gap-[0.625rem] w-full justify-center">
          <OwnerNotificationList />
        </div>
      </section>
    </>
  );
}

const OwnerNotificationList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useOwnerNotifications({ size: 10 });

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
          page.data.notifications.map((notification: OwnerNotification) => (
            <OwnerNotificationCard {...notification} key={notification.notificationId} />
          )),
        )
      ) : (
        <EmptyState title="알림이 없습니다." message="" />
      )}
      <div ref={observerRef} />
      {isFetchingNextPage && <p />}
    </>
  );
};
