'use client';
import Image from 'next/image';
import { comma } from '@/utils/comma';
import { Product } from '@/types/product';
interface ProductReserveCardProps extends Product {
  isChecked?: boolean;
  setIsChecked?: (value: string) => void;
  existReserveTime?: boolean;
  ImageIconButton?: React.ReactNode;
  FloatingButton?: React.ReactNode;
  moreInfoComponent?: React.ReactNode;
  showCount?: boolean;
}
function ProductReserveCardProps({
  name,
  price,
  stock,
  description,
  image,
  FloatingButton = null,
  ImageIconButton = null,
  moreInfoComponent = null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showCount = false,
}: ProductReserveCardProps) {
  return (
    <div className="flex gap-4 border-b py-5 relative">
      <div className="min-w-[90px] w-[90px] h-[90px] relative shrink-0">
        <Image src={image ? image : ''} alt="bread" className="object-cover rounded-lg" fill />
        {ImageIconButton && ImageIconButton}
      </div>
      <div className="flex flex-col grow gap-1 line-height text-gray-900 font-medium">
        <div className="font-semibold text-sm">{name}</div>
        <div className="text-[13px] font-normal text-gray-500">{description}</div>
        <div className="text-[13px] text-gray-700">{stock}개 남음</div>
        <div className="text-sm">{comma(price) ? comma(price) : '0'}원</div>
        {moreInfoComponent && moreInfoComponent}
      </div>
      {FloatingButton && FloatingButton}
    </div>
  );
}

export default ProductReserveCardProps;
