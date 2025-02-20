import { cn } from '@/utils/cn';
import Image from 'next/image';
import { Bread } from '@/types/bakery';
import Tag from '@/components/common/Tag';
import ToggleSwitch from '@/components/common/toggleswitch/ToggleSwitch';

export interface BreadNotificationSettingCardProps
  extends Pick<Bread, 'id' | 'name' | 'imgUrl' | 'bakeryName' | 'bakeryName' | 'releaseTimes'> {
  isDoNotDistubMode?: boolean;
  isNotificationOn: boolean;
}

const BreadNotificationSettingCard = ({
  name,
  imgUrl,
  bakeryName,
  releaseTimes,
  isDoNotDistubMode = false,
  isNotificationOn,
}: BreadNotificationSettingCardProps) => {
  return (
    <div className={cn('flex items-center gap-4 w-full h-[68px] bg-white')}>
      <div className={'w-[68px] h-full'}>
        <Image src={imgUrl} width={68} height={68} alt="bread" />
      </div>
      <div className={cn('flex items-center gap-5 h-full')}>
        <div className={cn('flex flex-col items-start gap-2 min-w-[180px]')}>
          <div className={cn('flex flex-col items-start gap-1 w-full')}>
            <span className="text-[13px] font-normal text-gray700 w-full">{bakeryName}</span>
            <span className="text-title-content-s text-gray900 w-full ">{name}</span>
          </div>
          <div className={cn('flex items-start gap-[2px] h-[18px]')}>
            {releaseTimes.map((time, idx) => (
              <Tag key={`${bakeryName}-${time}-${idx}`} label={time} type={'time'} />
            ))}
          </div>
        </div>
        {
          <ToggleSwitch
            className={`${isDoNotDistubMode && 'invisible'} `}
            type="BREAD_NOTIFICATION"
            checked={isNotificationOn}
            disabled={isDoNotDistubMode}
          />
        }
      </div>
    </div>
  );
};

export default BreadNotificationSettingCard;
