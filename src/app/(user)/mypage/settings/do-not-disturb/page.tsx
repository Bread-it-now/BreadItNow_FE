'use client';

import ToggleSwitch from '@/components/common/toggleswitch/ToggleSwitch';

export default function Page() {
  return (
    <>
      <section>
        <div className="flex items-center gap-5 px-5 py-[1.875rem] rounded-b-2xl w-full bg-white">
          <div className={'flex flex-col items-start gap-[0.625rem] w-full'}>
            <p className="text-title-content-m text-gray900">방해 금지 모드</p>
            <p className="text-title-content-xs text-gray500 font-normal">
              설정한 요일, 시간동안 모든 빵 알림이 오지 않습니다.
            </p>
          </div>
          {<ToggleSwitch type="APP_NOTIFICATION" checked />}
        </div>
      </section>
      <section className="flex flex-col items-start px-5 py-[1.875rem] gap-5 w-full bg-white rounded-2xl">
        <p className="text-title-content-m text-gray900">시간 설정</p>
        <div className="flex flex-col items-start gap-[0.625rem] w-full">
          <div className="flex justify-between items-center w-full h-[33px]">
            <span className="text-title-content-s font-medium">시작시간</span>
            <button className="flex items-center justify-center px-[0.375rem] py-[0.75rem] rounded-lg w-[90px] h-full gap-2 bg-gray50">
              <span className="text-body-m text-gray900 font-normal">오전 10:00</span>
            </button>
          </div>
          <div className="flex justify-between items-center w-full h-[33px]">
            <span className="text-title-content-s font-medium">종료시간</span>
            <button className="flex items-center justify-center px-[0.375rem] py-[0.75rem] rounded-lg w-[90px] h-full gap-2 bg-gray50 ">
              <span className="text-body-m text-gray900 font-normal">오전 10:00</span>
            </button>
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
}
