'use client';

import { cn } from '@/utils/cn';
import InfoField from '@/components/common/infofield/InfofFeld';
import arrowLeft from '@/assets/icons/arrow-left-sub.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const EditBtn = () => {
  return (
    <button className="absolute right-5 top-[3.625rem]">
      <span className={cn('w-[1.625rem] h-full text-right', 'text-body-m font-medium text-primary hover:opacity-70')}>
        편집
      </span>
    </button>
  );
};

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-[0.625rem] bg-gray100 w-full h-full">
      <EditBtn />
      <section className={cn('flex items-center px-5 pt-6 pb-[1.875rem] gap-5', 'w-full rounded-b-2xl bg-white')}>
        <InfoField title="방해금지 모드" content="주중 • 오전 10:00 - 오후 06:00" />
        <button
          className={cn('flex items-center justify-end gap-1', 'w-[37px] h-full', 'hover:opacity-70')}
          onClick={() => router.push(ROUTES.MYPAGE.DO_NOT_DISTURB)}>
          <span className={cn('w-full text-body-m text-gray500')}>켬</span>
          <Image src={arrowLeft} width={20} height={20} alt="방해금지 모드 페이지 이동 버트" />
        </button>
      </section>
    </div>
  );
}
