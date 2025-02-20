'use client';

import { cn } from '@/utils/cn';
import InfoField from '@/components/common/infofield/InfofFeld';
import arrowLeft from '@/assets/icons/arrow-left-sub.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import Stack from '@/components/common/stack/Stack';
import BreadNotificationSettingCard from '@/components/notifications/breadnotificationsettingcard/BreadNotificationSettingCard';
import { breadNotificationCardMockData } from '@/mocks/data/bakery';
import { SetStateAction, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <>
      <EditBtn isEdit={isEdit} handleEdit={setIsEdit} />
      <section className={cn('flex items-center px-5 pt-6 pb-[1.875rem] gap-5', 'w-full rounded-b-2xl bg-white')}>
        <InfoField title="방해금지 모드" content="주중 • 오전 10:00 - 오후 06:00" />
        <button
          className={cn('flex items-center justify-end gap-1', 'w-[37px] h-full', 'hover:opacity-70')}
          onClick={() => router.push(ROUTES.MYPAGE.DO_NOT_DISTURB)}>
          <span className={cn('w-full text-body-m text-gray500')}>켬</span>
          <Image src={arrowLeft} width={20} height={20} alt="방해금지 모드 페이지 이동 버튼" />
        </button>
      </section>
      <section className={cn('flex flex-row items-start px-5 py-[1.875rem]', 'w-full min-h-[673px] bg-white')}>
        <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
          {breadNotificationCardMockData.map((data) => (
            <BreadNotificationSettingCard key={data.id} {...data} isEdit={isEdit} />
          ))}
        </Stack>
      </section>
    </>
  );
}

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
