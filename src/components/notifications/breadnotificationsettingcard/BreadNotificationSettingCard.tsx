import { cn } from '@/utils/cn';
import Image from 'next/image';
import { Bread } from '@/types/bakery';
import Tag from '@/components/common/Tag';
import ToggleSwitch from '@/components/common/toggleswitch/ToggleSwitch';

export interface BreadNotificationCardProps
  extends Pick<Bread, 'id' | 'name' | 'imgUrl' | 'bakeryName' | 'bakeryName' | 'releaseTimes'> {
  isDoNotDistubMode?: boolean;
  checked: boolean;
}

const BreadNotificationCard = ({
  name,
  imgUrl,
  bakeryName,
  releaseTimes,
  isDoNotDistubMode = false,
  checked,
}: BreadNotificationCardProps) => {
  return (
    <div className={cn('flex items-center gap-4 w-full h-[68px] bg-white')}>
      <Image className="h-full" src={imgUrl} width={68} height={68} alt="bread" />
      <div className={cn('flex items-center justify-between gap-5 w-full h-full')}>
        <div className={cn('flex flex-col items-start gap-2')}>
          <div className={cn('flex flex-col items-start gap-1 w-full')}>
            <span className={cn('w-full', 'text-title-content-xs', 'text-gray700')}>{bakeryName}</span>
            <span className={cn('w-full', 'text-title-content-s', 'text-gray900')}>{name}</span>
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
            checked={checked}
            disabled={isDoNotDistubMode}
          />
        }
      </div>
    </div>
  );
};

export default BreadNotificationCard;
