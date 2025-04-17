import { cn } from '@/utils/cn';
import Image from 'next/image';
import Tag from '@/components/common/Tag';
import ToggleSwitch from '@/components/common/toggleswitch/ToggleSwitch';
import Checkbox from '@/components/common/checkbox/Checkbox';
import { useId, useState } from 'react';
import { NotificationSetting } from '@/types/notification';

export interface ProductNotificationSettingCardProps extends NotificationSetting {
  isEdit: boolean;
}

const ProductNotificationSettingCard = ({
  isEdit,
  productName,
  productImage,
  releaseTime,
  bakeryName,
  alertActive,
}: ProductNotificationSettingCardProps) => {
  const [checked, setChecked] = useState(false);
  const checkboxId = useId();
  return (
    <div className={cn('flex items-center gap-4 w-full h-[68px] bg-white')}>
      <div className={'relative w-[68px] h-full'}>
        <Image src={productImage} width={68} height={68} alt="bread" />
        {isEdit && (
          <div className="absolute top-1 left-1 z-1">
            <Checkbox id={String(checkboxId)} checked={checked} onChange={() => setChecked((prev) => !prev)} />
          </div>
        )}
      </div>
      <div className={cn('flex items-center gap-5 h-full')}>
        <div className={cn('flex flex-col items-start gap-2 min-w-[180px] h-full')}>
          <div className={cn('flex flex-col items-start gap-[0.125rem] w-full')}>
            <span className="text-[13px] font-normal text-gray700 w-full">{bakeryName}</span>
            <span className="text-title-content-s text-gray900 w-full ">{productName}</span>
          </div>
          <div className={cn('flex items-start gap-[2px] h-[18px]')}>
            {releaseTime.map((time, idx) => (
              <Tag key={`${bakeryName}-${time}-${idx}`} label={time} type={'time'} />
            ))}
          </div>
        </div>
        {<ToggleSwitch className={`${isEdit && 'invisible'} `} checked={alertActive} />}
      </div>
    </div>
  );
};

export default ProductNotificationSettingCard;
