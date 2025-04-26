'use client';

import Button from '@/components/button/Button';
import Stack from '@/components/common/stack/Stack';
import ToggleSwitch from '@/components/common/toggleswitch/ToggleSwitch';
import { cn } from '@/utils/cn';
import { useState } from 'react';

export default function Page() {
  const [appNotificationSetting, setAppNotificationSetting] = useState<{
    isAppNotificationOn: boolean;
    isPushNotificationOn: boolean;
    isProductNotificationOn: boolean;
    isReservationNotificationOn: boolean;
  }>({
    isAppNotificationOn: false,
    isPushNotificationOn: false,
    isProductNotificationOn: false,
    isReservationNotificationOn: false,
  });
  return (
    <>
      {!appNotificationSetting.isAppNotificationOn && (
        <section className="flex flex-col justfiy-center items-start px-5 pt-6 pb-[1.875rem] gap-[1.875rem] w-full rounded-b-2xl bg-white">
          <div className="flex flex-col items-start gap-1 w-full h-[3.25rem]">
            <p className="text-title-content-xl text-gray900">따끈한 빵 소식을 놓치지 마세요!</p>
            <p className="text-title-content-s text-gray500 font-normal">
              앱 알림을 켜두면 따끈한 빵 소식을 바로 받을 수 있어요.
            </p>
          </div>
          <Button
            variant="primary"
            scale="small"
            type="button"
            fullWidth
            aria-label="앱 알림 켜기"
            onClick={() => {
              setAppNotificationSetting((prev) => ({
                ...prev,
                isAppNotificationOn: true,
              }));
            }}>
            앱 알림 켜기
          </Button>
        </section>
      )}
      <section
        className={cn(
          'rounded-2xl w-full bg-white',
          appNotificationSetting.isAppNotificationOn ? 'rounded-t-none' : '',
        )}>
        <div
          className={cn(
            'flex items-center gap-5 px-5 py-[1.875rem] rounded-2xl w-full bg-white',
            appNotificationSetting.isAppNotificationOn ? '' : 'opacity-50',
          )}>
          <div className={'flex flex-col items-start gap-[0.625rem] w-full'}>
            <p className="text-title-content-m text-gray900">푸시 수신</p>
            <p className="text-title-content-xs text-gray500 font-normal">
              중요한 소식을 앱 실행 없이 실시간으로 알 수 있어요.
            </p>
          </div>
          {
            <ToggleSwitch
              disabled={!appNotificationSetting.isAppNotificationOn}
              checked={appNotificationSetting.isPushNotificationOn}
            />
          }
        </div>
      </section>
      <section className="px-5 py-[1.875rem] rounded-2xl w-full bg-white">
        <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
          <div
            className={cn(
              'flex items-center gap-5 w-full bg-white',
              appNotificationSetting.isAppNotificationOn ? '' : 'opacity-50',
            )}>
            <div className={'flex flex-col items-start gap-[0.625rem] w-full'}>
              <p className="text-title-content-m text-gray900 w-full">빵 알림</p>
            </div>
            {
              <ToggleSwitch
                disabled={!appNotificationSetting.isAppNotificationOn}
                checked={appNotificationSetting.isProductNotificationOn}
              />
            }
          </div>
          <div
            className={cn(
              'flex items-center gap-5 w-full bg-white',
              appNotificationSetting.isAppNotificationOn ? '' : 'opacity-50',
            )}>
            <div className={'flex flex-col items-start gap-[0.625rem] w-full'}>
              <p className="text-title-content-m text-gray900">예약</p>
            </div>
            {
              <ToggleSwitch
                disabled={!appNotificationSetting.isAppNotificationOn}
                checked={appNotificationSetting.isReservationNotificationOn}
              />
            }
          </div>
        </Stack>
      </section>
    </>
  );
}
