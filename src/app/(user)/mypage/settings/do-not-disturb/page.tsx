'use client';

import ToggleSwitch from '@/components/common/toggleswitch/ToggleSwitch';
import useBaseBottomSheet from '@/hooks/useBaseBottomSheet';
import BottomSheet from '@/components/bottomsheet/Bottomsheet';
import DayPicker from '@/components/daypicker/DayPicker';
import Button from '@/components/button/Button';
import { useState } from 'react';
import { DoNotDisturbForm } from '@/types/notification';
import { editDoNotDisturbSetting, useDoNotDisturbSetting, useOnOffDoNotDisturbSetting } from '@/lib/api/notification';
import { Controller, useForm } from 'react-hook-form';
import { LabelForm } from '@/components/common/labelform/LabelForm';
import { formatToHour, getFormattedTime, getHoursMinutesAMPM } from '@/utils/date';
import WheelTimePicker from '@/components/wheeltimepicker/WheelTimePicker';
import {} from '@/lib/shared/date';
import { ENG_DAY } from '@/types/date';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export interface DoNotDisturbFormProps {
  initValue: DoNotDisturbForm;
  mutate: (data: DoNotDisturbForm) => void;
}

const DoNotDisturbSettingForm = ({ initValue, mutate }: DoNotDisturbFormProps) => {
  const { isOpen: isStartTimePickerOpen, dispatch: startTimePickerDispatch } = useBaseBottomSheet();
  const { isOpen: isEndTimePickerOpen, dispatch: endTimePickerDispatch } = useBaseBottomSheet();
  const [selectedStartTime, setSelectedStartTime] = useState<{ hours: number; minutes: number; ampm: 'AM' | 'PM' }>({
    ...getHoursMinutesAMPM(initValue.startTime),
    ampm: getHoursMinutesAMPM(initValue.startTime).ampm as 'AM' | 'PM',
  });
  const [selectedEndTime, setSelectedEndTime] = useState<{ hours: number; minutes: number; ampm: 'AM' | 'PM' }>({
    ...getHoursMinutesAMPM(initValue.endTime),
    ampm: getHoursMinutesAMPM(initValue.endTime).ampm as 'AM' | 'PM',
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty },
    register,
  } = useForm<DoNotDisturbForm>({
    defaultValues: initValue || {
      productType: undefined,
      breadCategoryIds: [],
      name: '',
      price: undefined,
      description: '',
      releaseTimes: [],
    },
  });
  const data = watch();
  const router = useRouter();

  return (
    <>
      <form
        className="flex flex-col items-start gap-[0.625rem] w-full bg-gray100"
        onSubmit={handleSubmit(() => {
          mutate({ ...data });
          router.push(ROUTES.MYPAGE.BREAD_NOTIFICATIONS_SETTING);
        })}>
        <div className="flex flex-col items-start gap-[0.625rem] w-full bg-white rounded-2xl">
          <LabelForm
            name="startTime"
            label="시간 설정"
            errors={errors}
            className="gap-5 w-full bg-white px-5 pt-[1.875rem] rounded-t-2xl"
            labelSize="LARGE">
            <Controller
              control={control}
              rules={{ required: '시작 시간을 입력해주세요.' }}
              {...register('startTime')}
              render={({ field }) => {
                return (
                  <>
                    <div className="flex justify-between items-center w-full h-[33px]">
                      <span className="text-title-content-s font-medium">시작시간</span>
                      <button
                        type="button"
                        className="flex items-center justify-center rounded-lg w-[90px] h-full gap-2 bg-gray50"
                        onClick={() => startTimePickerDispatch.open()}>
                        <span className="text-body-m text-gray900 font-normal">{formatToHour(field.value)}</span>
                      </button>
                    </div>
                    <BottomSheet
                      isOpen={isStartTimePickerOpen}
                      title={'시작 시간'}
                      cancelText="취소"
                      confirmText="완료"
                      onClose={startTimePickerDispatch.close}
                      onConfirm={() => {
                        startTimePickerDispatch.close();
                        field.onChange(
                          getFormattedTime(selectedStartTime.hours, selectedStartTime.minutes, selectedStartTime.ampm),
                        );
                      }}>
                      <WheelTimePicker
                        handleSelectedTime={(time) => setSelectedStartTime(time)}
                        initTime={{
                          ...getHoursMinutesAMPM(field.value),
                          ampm: getHoursMinutesAMPM(field.value).ampm as 'AM' | 'PM',
                        }}
                      />
                    </BottomSheet>
                  </>
                );
              }}
            />
          </LabelForm>
          <LabelForm name="endTime" errors={errors} className="gap-5 w-full bg-white px-5 pb-[1.875rem] rounded-b-2xl">
            <Controller
              control={control}
              rules={{ required: '종료 시간을 입력해주세요.' }}
              {...register('endTime')}
              render={({ field }) => {
                return (
                  <>
                    <div className="flex flex-col items-start gap-[0.625rem] w-full">
                      <div className="flex justify-between items-center w-full h-[33px]">
                        <span className="text-title-content-s font-medium">종료시간</span>
                        <button
                          type="button"
                          className="flex items-center justify-center px-[0.375rem] py-[0.75rem] rounded-lg w-[90px] h-full gap-2 bg-gray50"
                          onClick={() => endTimePickerDispatch.open()}>
                          <span className="text-body-m text-gray900 font-normal">{formatToHour(field.value)}</span>
                        </button>
                      </div>
                    </div>
                    <BottomSheet
                      isOpen={isEndTimePickerOpen}
                      title={'종료 시간'}
                      cancelText="취소"
                      confirmText="완료"
                      onClose={endTimePickerDispatch.close}
                      onConfirm={() => {
                        endTimePickerDispatch.close();

                        field.onChange(
                          getFormattedTime(selectedEndTime.hours, selectedEndTime.minutes, selectedEndTime.ampm),
                        );
                      }}>
                      <WheelTimePicker
                        handleSelectedTime={(time) => setSelectedEndTime(time)}
                        initTime={{
                          ...getHoursMinutesAMPM(field.value),
                          ampm: getHoursMinutesAMPM(field.value).ampm as 'AM' | 'PM',
                        }}
                      />
                    </BottomSheet>
                  </>
                );
              }}
            />
          </LabelForm>
        </div>
        <div className="flex flex-col items-start gap-[0.625rem] px-5 py-[1.875rem] w-full bg-white rounded-2xl">
          <LabelForm label="요일 설정" name="days" errors={errors} className="gap-5 w-full" labelSize="LARGE">
            <Controller
              control={control}
              rules={{ required: '요일을 설정해주세요.' }}
              {...register('days')}
              render={({ field }) => {
                return (
                  <DayPicker
                    initialDays={[...field.value]}
                    handleChangeDays={(day: ENG_DAY) => {
                      if (field.value.includes(day)) {
                        field.onChange(field.value.filter((_day: ENG_DAY) => _day !== day));
                      } else {
                        field.onChange([...field.value, day]);
                      }
                    }}
                  />
                );
              }}
            />
          </LabelForm>
        </div>

        <section className="absolute bottom-0 p-5 w-full h-[92px] bg-white shadow-[0px-1px-20px-[rgba(28,30,32,0.08)]">
          <Button type="submit" variant="primary" scale="large" fullWidth onClick={() => {}} disabled={!isDirty}>
            저장
          </Button>
        </section>
      </form>
    </>
  );
};

export default function Page() {
  const { data: doNotDisturb } = useDoNotDisturbSetting();
  const onOffDoNotDisturbMutation = useOnOffDoNotDisturbSetting();

  return (
    <>
      <section>
        {doNotDisturb && (
          <div className="flex items-center gap-5 px-5 py-[1.875rem] rounded-b-2xl w-full bg-white">
            <div className={'flex flex-col items-start gap-[0.625rem] w-full'}>
              <p className="text-title-content-m text-gray900">방해 금지 모드</p>
              <p className="text-title-content-xs text-gray500 font-normal">
                설정한 요일, 시간동안 모든 빵 알림이 오지 않습니다.
              </p>
            </div>
            {<ToggleSwitch checked={doNotDisturb?.active} toggleMutate={() => onOffDoNotDisturbMutation.mutate()} />}
          </div>
        )}
      </section>
      {doNotDisturb && doNotDisturb?.active && (
        <DoNotDisturbSettingForm
          initValue={{
            days: doNotDisturb.days,
            endTime: doNotDisturb.endTime,
            startTime: doNotDisturb.startTime,
          }}
          mutate={(doNotDisturbSettingForm: DoNotDisturbForm) => editDoNotDisturbSetting(doNotDisturbSettingForm)}
        />
      )}
    </>
  );
}
