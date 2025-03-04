'use client';

import Image from 'next/image';
import bell from '@/assets/icons/bell.svg';
import profile from '@/assets/images/profile.png';
import smallArrow from '@/assets/icons/arrow-left-sub.svg';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const notificationCnt: number = 8;
const name: string = '빵잇나우';

export default function Page() {
  const router = useRouter();
  return (
    <>
      {/* 알림 컴포넌트  */}
      <button className="absolute right-5 top-[3.625rem]" onClick={() => {}}>
        <span
          className={'relative w-[1.5rem] h-[1.5rem] text-right text-body-m font-medium text-primary hover:opacity-70'}>
          <Image src={bell} width={24} height={24} alt="bell" />
          {notificationCnt !== 0 && (
            <div className="absolute top-[-4px] right-[-3px] px-[3px] pb-[1px] flex justify-center text-center items-center w-[15px] h-[15px] bg-primary rounded-full text-white text-[10px] font-semibold">
              {notificationCnt}
            </div>
          )}
        </span>
      </button>
      <section className="flex items-center px-5 pt-6 pb-[1.875rem] gap-4 w-full bg-white rounded-b-2xl">
        <div className="w-[3.75rem] h-]3.75rem]">
          <Image src={profile} width={60} height={60} alt="profile" className="border bg-gray50 rounded-full" />
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <p className="flex items-center gap-[2px] w-full h-[1.625rem] text-title-content-l">{name}</p>
          <button className="flex items-center gap-[2px]" onClick={() => router.push(ROUTES.MYPAGE.CHECK_PASSWPRD)}>
            <span className="text-title-content-xs font-normal text-gray500">내 정보 수정</span>
            <Image src={smallArrow} width={12} height={12} alt="arrow" />
          </button>
        </div>
      </section>
    </>
  );
}
