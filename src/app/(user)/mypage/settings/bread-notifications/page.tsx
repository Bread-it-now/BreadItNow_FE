'use client';

import { cn } from '@/utils/cn';
import InfoField from '@/components/common/infofield/InfofFeld';
import arrowLeft from '@/assets/icons/arrow-left-sub.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import Stack from '@/components/common/stack/Stack';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import {
  deleteProductNotificationSetting,
  useDoNotDisturbSetting,
  useProductNotificationSettings,
} from '@/lib/api/notification';
import { ENG_TO_KOR_DAY } from '@/lib/shared/date';
import { getFormattedStartEnd } from '@/utils/date';
import { NotificationSetting } from '@/types/notification';
import ProductNotificationSettingCard from '@/components/notifications/productnotificationsettingcard/ProductNotificationSettingCard';
import { useQueryClient } from '@tanstack/react-query';
import { NOTIFICATION_QUERY_KEY } from '@/constants/queryKey';

export default function Page() {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data: doNotDisturb } = useDoNotDisturbSetting();
  const [checkedProductId, setcheckedProductId] = useState<number | null>(null);

  return (
    <>
      <EditBtn
        isEdit={isEdit}
        handleEdit={setIsEdit}
        checkedProductId={checkedProductId}
        handleCheckedProductId={setcheckedProductId}
      />
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
        <ProductNotificationSettingCardList
          isEdit={isEdit}
          checkedProductId={checkedProductId}
          handleChecked={setcheckedProductId}
        />
      </section>
    </>
  );
}

const ProductNotificationSettingCardList = ({
  isEdit,
  checkedProductId,
  handleChecked,
}: {
  isEdit: boolean;
  checkedProductId: number | null;
  handleChecked: React.Dispatch<SetStateAction<number | null>>;
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProductNotificationSettings({
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
            <ProductNotificationSettingCard
              key={notificationSetting.alertId}
              {...notificationSetting}
              isEdit={isEdit}
              checked={checkedProductId === notificationSetting.productId}
              handleChecked={handleChecked}
            />
          )),
        )}
        <div ref={observerRef} />
        {isFetchingNextPage && <p />}
      </Stack>
    </>
  );
};

interface EditBtnProps {
  isEdit: boolean;
  handleEdit: React.Dispatch<SetStateAction<boolean>>;
  checkedProductId: number | null;
  handleCheckedProductId: React.Dispatch<SetStateAction<number | null>>;
  size?: number;
}

const EditBtn = ({ checkedProductId, isEdit, handleEdit, handleCheckedProductId, size = 10 }: EditBtnProps) => {
  const queryClient = useQueryClient();
  return (
    <button
      className="absolute right-5 top-[3.625rem]"
      onClick={() => {
        if (checkedProductId === null) handleEdit((prev) => !prev);
        else {
          deleteProductNotificationSetting(checkedProductId);
          handleCheckedProductId(null);
          handleEdit(false);
          queryClient.invalidateQueries({ queryKey: [...NOTIFICATION_QUERY_KEY.PRODUCT_NOTIFICATION_SETTINGS(size)] });
        }
      }}>
      <span className={cn('w-[1.625rem] h-full text-right', 'text-body-m font-medium text-primary hover:opacity-70')}>
        {isEdit ? (checkedProductId ? '삭제' : '취소') : '편집'}
      </span>
    </button>
  );
};
