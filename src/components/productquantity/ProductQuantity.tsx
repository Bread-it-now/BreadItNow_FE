'use client';

import Checkbox from '../common/checkbox/Checkbox';
import Spinner from '../spinner/Spinner';

interface ProductQuantityProps {
  name: string;
  quantity: number;
  id: number;
}

const ProductQuantity = ({ name, quantity, id }: ProductQuantityProps) => {
  return (
    <div className="flex gap-2 w-full">
      <Checkbox id={String(id)} checked onChange={() => {}} />
      <div className="flex justify-between items-center gap-2 w-full">
        <div className="flex flex-col">
          <p className="text-title-content-s text-gray900">{name}</p>
          <p className="text-title-content-xs font-medium text-gray700">{`고객 주문 ${quantity}개`}</p>
        </div>
        <Spinner />
      </div>
    </div>
  );
};

export default ProductQuantity;
