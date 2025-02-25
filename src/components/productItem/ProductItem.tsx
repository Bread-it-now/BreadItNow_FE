import { ReservationItem } from '@/types/reservation';
import { comma } from '@/utils/comma';
import Image from 'next/image';

const ProductItem = ({ name, quantity, unitPrice, totalPrice, breadImage }: ReservationItem) => {
  return (
    <div className="flex items-center gap-4 w-full h-[68px]">
      <div className="flex relative w-[6.125rem] h-[68px]">
        <Image src={breadImage} width={68} height={68} alt="product" />
      </div>
      <div className="flex items-center gap-5 w-full h-full">
        <div className="flex flex-col items-start gap-[0.25rem] w-[166px] h-full">
          <p className="text-title-content-s text-gray900">{name}</p>
          <p className="text-title-content-xs text-gray500 font-normal">{comma(unitPrice)}</p>
          <p className="text-title-content-xs text-gray700">{quantity}게</p>
        </div>
        <p className="text-body-m">{comma(totalPrice)}원</p>
      </div>
    </div>
  );
};

export default ProductItem;
