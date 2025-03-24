'use client';

import ToggleSwitch from '@/components/common/toggleswitch/ToggleSwitch';
import useBaseBottomSheet from '@/hooks/useBaseBottomSheet';
import BottomSheet from '@/components/bottomsheet/Bottomsheet';
import DayPicker from '@/components/daypicker/DayPicker';
import { Day } from '@/types/date';
import Button from '@/components/button/Button';
import { useState } from 'react';

export default function Page() {
  const { isOpen: isStartTimePickerOpen, dispatch: startTimePickerDispatch } = useBaseBottomSheet();
  const { isOpen: isEndTimePickerOpen, dispatch: endTimePickerDispatch } = useBaseBottomSheet();
  const initDays: Day[] = [2, 3, 4, 5, 6];
  const [isChangeDays, setIsChangeDays] = useState<boolean>(false);
  const handleChangeDays = (days: Day[]) =>
    setIsChangeDays(initDays.length === days.length && initDays.every((day: Day) => days.includes(day)));

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
          {<ToggleSwitch checked />}
        </div>
      </section>
      <section className="flex flex-col items-start px-5 py-[1.875rem] gap-5 w-full bg-white rounded-2xl">
        <p className="text-title-content-m text-gray900">시간 설정</p>
        <div className="flex flex-col items-start gap-[0.625rem] w-full">
          <div className="flex justify-between items-center w-full h-[33px]">
            <span className="text-title-content-s font-medium">시작시간</span>
            <button
              className="flex items-center justify-center px-[0.375rem] py-[0.75rem] rounded-lg w-[90px] h-full gap-2 bg-gray50"
              onClick={() => startTimePickerDispatch.open()}>
              <span className="text-body-m text-gray900 font-normal">오전 10:00</span>
            </button>
          </div>
          <div className="flex justify-between items-center w-full h-[33px]">
            <span className="text-title-content-s font-medium">종료시간</span>
            <button
              className="flex items-center justify-center px-[0.375rem] py-[0.75rem] rounded-lg w-[90px] h-full gap-2 bg-gray50"
              onClick={() => endTimePickerDispatch.open()}>
              <span className="text-body-m text-gray900 font-normal">오후 18:00</span>
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-start px-5 py-[1.875rem] gap-5 w-full bg-white rounded-2xl">
        <p className="text-title-content-m text-gray900">요일 설정</p>
        <DayPicker initialDays={initDays} handleChangeDays={handleChangeDays} />
      </section>
      <section className="p-5 w-full h-[92px] bg-white shadow-[0px-1px-20px-[rgba(28,30,32,0.08)]">
        <Button variant="primary" scale="large" fullWidth onClick={() => {}} disabled={isChangeDays}>
          저장
        </Button>
      </section>

      <BottomSheet
        isOpen={isStartTimePickerOpen}
        title={'Time Picker'}
        cancelText="취소"
        confirmText="완료"
        onClose={startTimePickerDispatch.close}
        onConfirm={() => {}}>
        <div className="flex flex-col justify-end items-start py-5 gap-6 w-full h-[198px]"></div>
      </BottomSheet>
      <BottomSheet
        isOpen={isEndTimePickerOpen}
        title={'Time Picker'}
        cancelText="취소"
        confirmText="완료"
        onClose={endTimePickerDispatch.close}
        onConfirm={() => {}}>
        <div className="flex flex-col justify-end items-start py-5 gap-6 w-full h-[198px]"></div>
      </BottomSheet>
    </>
  );
}
