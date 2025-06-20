import { ReservationProduct as ReservationProductType } from '@/types/reservation';
import { comma } from '@/utils/comma';
import Image from 'next/image';

const ReservationProduct = ({ name, quantity, unitPrice, totalPrice, breadImage }: ReservationProductType) => {
  return (
    <div className="flex items-center gap-4 w-full h-[68px]">
      <div className="flex relative w-[6.125rem] h-[68px] rounded-md">
        <Image src={breadImage} width={68} height={68} alt="product" className="rounded-md" />
      </div>
      <div className="flex items-center gap-5 w-full h-full">
        <div className="flex flex-col items-start gap-[0.25rem] w-full max-w-[166px] h-full truncate">
          <p className="text-title-content-s text-gray900 w-full">{name}</p>
          <p className="text-title-content-xs text-gray500 font-normal">{comma(unitPrice)}</p>
          <p className="text-title-content-xs text-gray700">{quantity}개</p>
        </div>
        <p className="flex justify-start text-body-m">{comma(totalPrice)}원</p>
      </div>
    </div>
  );
};

export default ReservationProduct;
