'use client';

import Image from 'next/image';
import bell from '@/assets/icons/bell.svg';

const notificationCnt: number = 8;

export default function Page() {
  return (
    <>
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
    </>
  );
}
