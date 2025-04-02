'use client';
import Image from 'next/image';
import { comma } from '@/utils/comma';
import { Product } from '@/types/product';
interface CompletedReservationCardProps extends Product {
  isChecked?: boolean;
  setIsChecked?: (value: string) => void;
  existReserveTime?: boolean;
  ImageIconButton?: React.ReactNode;
  FloatingButton?: React.ReactNode;
  moreInfoComponent?: React.ReactNode;
  showCount?: boolean;
}
function CompletedReservationCard({
  name,
  price,
  stock,
  image,
  FloatingButton = null,
  ImageIconButton = null,
  moreInfoComponent = null,
}: CompletedReservationCardProps) {
  return (
    <div className="flex gap-4 relative items-center">
      <div className=" w-[68px] h-[68px] relative shrink-0">
        <Image src={image ? image : ''} alt="bread" className="object-cover rounded-lg" fill />
        {ImageIconButton && ImageIconButton}
      </div>
      <div className="flex flex-col grow gap-1 line-height text-gray-900 font-medium">
        <div className="font-semibold text-sm">{name}</div>
        <div className="text-[13px] text-gray-700 font-normal">{comma(price) ? comma(price) : '0'}원</div>
        <div className="text-[13px]  font-medium">{stock}개</div>
        {moreInfoComponent && moreInfoComponent}
      </div>
      <div className="text-[15px] font-semibold">{comma(price * stock) ? comma(price * stock) : '0'}원</div>
      {FloatingButton && FloatingButton}
    </div>
  );
}

export default CompletedReservationCard;
