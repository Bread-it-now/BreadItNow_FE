'use client';

import { OPERATING_STATUS } from '@/types/bakery';
import ToggleSwitch from '../common/toggleswitch/ToggleSwitch';
import { isCurTimeBetweenOpeningTimeAndClosingTime } from '@/utils/date';

export interface OperatingStatusCardProps {
  name?: string;
  operatingStatus: keyof typeof OPERATING_STATUS;
  opentime: string;
  /** 운영 상태 유형 */
  type: 'GENERAL' | 'TEMPORARY';
}

const OperatingStatusCard = ({ name, operatingStatus, type, opentime }: OperatingStatusCardProps) => {
  const [openingTime, closingTime] = opentime.split('-');

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
              : '설정한 영업 중지 시간이 경과하면, 자동으로 영업이재개됩니다.'}
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
          />
        }
      </div>
      {(type !== 'TEMPORARY' || operatingStatus === 'TEMPORARY_CLOSED') && (
        <div
          className={`flex justify-center items-center p-3 gap-[6px] w-full rounded-lg text-title-content-xs ${operatingStatus === 'OPEN' ? 'text-secondary bg-[#DFFAF3]' : operatingStatus === 'CLOSED' || (operatingStatus === 'TEMPORARY_CLOSED' && type === 'GENERAL') ? 'text-gray500 bg-gray50' : 'text-primary bg-[#FFF0EC]'}`}>
          {type === 'GENERAL' && operatingStatus === 'TEMPORARY_CLOSED'
            ? OPERATING_STATUS['CLOSED']
            : OPERATING_STATUS[operatingStatus]}
        </div>
      )}
    </div>
  );
};

export default OperatingStatusCard;
