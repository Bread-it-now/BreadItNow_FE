'use client';

import { cn } from '@/utils/cn';
import InfoField from '@/components/common/infofield/InfofFeld';
import arrowLeft from '@/assets/icons/arrow-left-sub.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import Stack from '@/components/common/stack/Stack';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useDoNotDisturbSetting, useProductNotificationSettings } from '@/lib/api/notification';
import { ENG_TO_KOR_DAY } from '@/lib/shared/date';
import { getFormattedStartEnd } from '@/utils/date';
import { NotificationSetting } from '@/types/notification';
import ProductNotificationSettingCard from '@/components/notifications/productnotificationsettingcard/ProductNotificationSettingCard';

export default function Page() {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data: doNotDisturb } = useDoNotDisturbSetting();

  return (
    <>
      <EditBtn isEdit={isEdit} handleEdit={setIsEdit} />
      <section
        className={cn(
          'flex items-center px-5 pt-6 pb-[1.875rem] gap-5 min-h-[103px]',
          'w-full rounded-b-2xl bg-white',
        )}>
        {doNotDisturb && (
          <>
            <InfoField
              title="방해금지 모드"
              content={
                doNotDisturb.active
                  ? `${doNotDisturb.days.map((day) => ENG_TO_KOR_DAY[day]).join(', ')} • \n${getFormattedStartEnd(doNotDisturb.startTime, doNotDisturb.endTime)}`
                  : undefined
              }
              className={doNotDisturb.active ? 'h-full items-start' : 'h-full items-center'}
            />
            <button
              className={cn('flex items-center justify-end gap-1', 'w-[37px] h-full', 'hover:opacity-70')}
              onClick={() => router.push(ROUTES.MYPAGE.DO_NOT_DISTURB)}>
              <span className={cn('w-full text-body-m text-gray500')}>{doNotDisturb.active ? '켬' : '끔'}</span>
              <Image src={arrowLeft} width={20} height={20} alt="방해금지 모드 페이지 이동 버튼" />
            </button>
          </>
        )}
      </section>
      <section className={cn('flex flex-row items-start px-5 py-[1.875rem]', 'w-full min-h-[673px] bg-white')}>
        <ProductNotificationSettingCardList />
      </section>
    </>
  );
}

const ProductNotificationSettingCardList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProductNotificationSettings({
    page: 0,
    size: 10,
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
      <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
        {data?.pages.map((page) =>
          page.data.alerts.map((notificationSetting: NotificationSetting) => (
            <ProductNotificationSettingCard key={notificationSetting.alertId} {...notificationSetting} />
          )),
        )}
        <div ref={observerRef} />
        {isFetchingNextPage && <p>로딩중</p>}
      </Stack>
    </>
  );
};

interface EditBtnProps {
  isEdit: boolean;
  handleEdit: React.Dispatch<SetStateAction<boolean>>;
}

const EditBtn = ({ isEdit, handleEdit }: EditBtnProps) => {
  return (
    <button className="absolute right-5 top-[3.625rem]" onClick={() => handleEdit((prev) => !prev)}>
      <span className={cn('w-[1.625rem] h-full text-right', 'text-body-m font-medium text-primary hover:opacity-70')}>
        {isEdit ? '삭제' : '편집'}
      </span>
    </button>
  );
};
