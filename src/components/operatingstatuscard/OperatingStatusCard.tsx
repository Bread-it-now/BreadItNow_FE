'use client';

import { OPERATING_STATUS } from '@/types/bakery';
import ToggleSwitch from '../common/toggleswitch/ToggleSwitch';
import { getFormattingDate, isCurTimeBetweenOpeningTimeAndClosingTime } from '@/utils/date';
import BottomSheet from '../bottomsheet/Bottomsheet';
import useManageOperatingStatusBottomSheet from '@/hooks/useManageOperatingStatusBottomSheet';
import TimeStepChip from '../common/chips/timestepchip/TimeStepChip';
import { changeOperatingStatus } from '@/lib/api/bakery';
import { useQueryClient } from '@tanstack/react-query';
import { BAKERY_QUERY_KEY } from '@/constants/queryKey';

export interface OperatingStatusCardProps {
  name: string;
  operatingStatus: keyof typeof OPERATING_STATUS;
  opentime: string;
  bakeryId: number;
  /** 운영 상태 유형 */
  type: 'GENERAL' | 'TEMPORARY';
}

const TEMORARY_CLOSING_TIME_STEPS = [10, 60, 120, 1440];

const OperatingStatusCard = ({ name, operatingStatus, type, opentime, bakeryId }: OperatingStatusCardProps) => {
  const [openingTime, closingTime] = opentime.split('-');

  const {
    isOpen: isManageOperatingStatusBottomSheetOpen,
    open: openManageOperatingStatusBottomSheet,
    close: closeManageOperatingStatusBottomSheet,
    temporaryClosingTimeStep,
    setTemporaryClosingTimeStep,
    saveTemporaryClosingTime,
  } = useManageOperatingStatusBottomSheet(bakeryId, name);

  const temporaryClosingTime =
    temporaryClosingTimeStep === 1440
      ? getFormattingDate(new Date()).split(' ').slice(0, 2).join(' ') + ` ${closingTime}`
      : getFormattingDate(new Date(), temporaryClosingTimeStep);
  const queryClient = useQueryClient();

  return (
    <div className="flex flex-col justfiy-center items-start px-6 pt-5 pb-[1.875rem] gap-6 w-full bg-white rounded-[0.625rem]">
      <div className="flex items-center gap-5 w-full">
        <div className="flex flex-col items-start gap-1 w-full">
          {type === 'GENERAL' ? (
            <p className="text-title-content-l text-gray900">{name}</p>
          ) : (
            <p className="text-title-content-m text-gray900">{'영업 일시 중지'}</p>
          )}

          <p className="text-title-content-xs text-gray500 font-normal">
            {type === 'GENERAL'
              ? '매장 운영 시작, 종료시 설정해주세요.'
              : '설정한 영업 중지 시간이 경과하면, 자동으로 영업이 재개됩니다.'}
          </p>
        </div>

        {
          <ToggleSwitch
            checked={
              type === 'GENERAL'
                ? isCurTimeBetweenOpeningTimeAndClosingTime(openingTime, closingTime) &&
                  (operatingStatus === 'OPEN' || operatingStatus === 'TEMPORARY_CLOSED')
                : operatingStatus === 'TEMPORARY_CLOSED'
            }
            disabled={type === 'TEMPORARY' && operatingStatus === 'CLOSED'}
            toggleMutate={
              type === 'TEMPORARY'
                ? () => {
                    if (operatingStatus === 'OPEN') openManageOperatingStatusBottomSheet();
                  }
                : () => {
                    if (operatingStatus === 'OPEN') {
                      changeOperatingStatus(bakeryId, 'CLOSED');
                    } else {
                      changeOperatingStatus(bakeryId, 'OPEN');
                    }
                    queryClient.invalidateQueries({ queryKey: [...BAKERY_QUERY_KEY.BAKERY_INFO(bakeryId)] });
                  }
            }
          />
        }
      </div>
      {(type !== 'TEMPORARY' || operatingStatus === 'TEMPORARY_CLOSED') && (
        <div
          className={`flex justify-center items-center p-3 gap-[6px] w-full rounded-lg text-title-content-xs ${
            type === 'GENERAL'
              ? isCurTimeBetweenOpeningTimeAndClosingTime(openingTime, closingTime) &&
                (operatingStatus === 'OPEN' || operatingStatus === 'TEMPORARY_CLOSED')
                ? 'text-secondary bg-[#DFFAF3]'
                : 'text-gray500 bg-gray50'
              : operatingStatus === 'TEMPORARY_CLOSED'
                ? 'text-primary bg-[#FFF0EC]'
                : 'text-gray500 bg-gray50'
          }`}>
          {type === 'GENERAL' ? (
            isCurTimeBetweenOpeningTimeAndClosingTime(openingTime, closingTime) &&
            (operatingStatus === 'OPEN' || operatingStatus === 'TEMPORARY_CLOSED') ? (
              OPERATING_STATUS['OPEN']
            ) : (
              OPERATING_STATUS['CLOSED']
            )
          ) : (
            <>
              <span>{OPERATING_STATUS['TEMPORARY_CLOSED']}</span>
              <span className="font-normal min-w-[100px]">{`${temporaryClosingTime}까지`}</span>
            </>
          )}
        </div>
      )}
      {type === 'TEMPORARY' && isManageOperatingStatusBottomSheetOpen && (
        <BottomSheet
          isOpen={isManageOperatingStatusBottomSheetOpen}
          onClose={() => {
            closeManageOperatingStatusBottomSheet();
            setTemporaryClosingTimeStep(0);
          }}
          onConfirm={() => {
            saveTemporaryClosingTime(temporaryClosingTime);
            closeManageOperatingStatusBottomSheet();
            changeOperatingStatus(bakeryId, 'TEMPORARY_CLOSED');
            queryClient.invalidateQueries({ queryKey: [...BAKERY_QUERY_KEY.BAKERY_INFO(bakeryId)] });
            queryClient.invalidateQueries({ queryKey: [...BAKERY_QUERY_KEY.BAKERY_INFO(bakeryId)] });
          }}
          confirmDisabled={temporaryClosingTimeStep === 0}
          confirmText="영업 일시중지"
          title="영업 일시중지">
          <div className="flex flex-col items-start pb-5 gap-6 w-full">
            <div className="flex flex-wrap items-center content-center gap-2 w-full">
              {TEMORARY_CLOSING_TIME_STEPS.map((timeStep: number) => (
                <TimeStepChip
                  key={timeStep}
                  step={timeStep}
                  checked={timeStep === temporaryClosingTimeStep}
                  onClick={() => setTemporaryClosingTimeStep(timeStep)}
                  className="w-[163px]"
                />
              ))}
            </div>
            {temporaryClosingTimeStep !== 0 && (
              <div className="flex justify-center items-center p-3 gap-[6px] w-full bg-primaryLight1 rounded-lg text-title-content-xs text-primary">
                <span>일시중지</span>
                <span className="font-normal min-w-[100px]">{`${temporaryClosingTime}까지`}</span>
              </div>
            )}
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

export default OperatingStatusCard;
