'use client';

import { SetStateAction, useState } from 'react';
import Checkbox from '../common/checkbox/Checkbox';
import Spinner from '../spinner/Spinner';

interface ProductQuantityProps {
  name: string;
  initQuantity: number;
  id: number;
  handleUpdatedItems: React.Dispatch<SetStateAction<{ productId: number; quantity: number }[]>>;
  updatedReservationItems: { productId: number; quantity: number }[];
}

const ProductQuantity = ({
  name,
  initQuantity,
  id,
  handleUpdatedItems,
  updatedReservationItems,
}: ProductQuantityProps) => {
  const [quantity, setQuantity] = useState<number>(initQuantity);

  const handleActiveChange = () => {
    if (updatedReservationItems.filter((item) => item.productId === id).length !== 0) {
      handleUpdatedItems((prev) => prev.filter((item) => item.productId !== id));
    } else {
      handleUpdatedItems((prev) => [...prev, { productId: id, quantity }]);
    }
  };

  const handleQuantity = (updatedQuantity: number) => {
    if (updatedReservationItems.filter((item) => item.productId === id).length !== 0) {
      handleUpdatedItems((prev) =>
        prev.map((item) => {
          if (item.productId === id) {
            return { productId: id, quantity: updatedQuantity };
          } else {
            return { ...item };
          }
        }),
      );
    }
    setQuantity(updatedQuantity);
  };

  return (
    <div className="flex gap-2 w-full">
      <Checkbox
        id={String(id)}
        checked={updatedReservationItems.filter((item) => item.productId === id).length !== 0}
        onChange={handleActiveChange}
      />
      <div className="flex justify-between items-center gap-2 w-full">
        <div className="flex flex-col">
          <p className="text-title-content-s text-gray900">{name}</p>
          <p className="text-title-content-xs font-medium text-gray700">{`고객 주문 ${quantity}개`}</p>
        </div>
        <Spinner ininitialQuantity={quantity} onQuantityChange={handleQuantity} />
      </div>
    </div>
  );
};

export default ProductQuantity;
