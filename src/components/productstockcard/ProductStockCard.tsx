'use client';

import { Product, ProductType } from '@/types/product';
import Image from 'next/image';
import Button from '../button/Button';
import { comma } from '@/utils/comma';
export interface ProductStockCardProps extends Omit<Product, 'productId' | 'bakery_id' | 'type' | 'releaseTime'> {
  id: number;
  bakeryId: number;
  breadCategories?: { categoryId: number; categoryName: string }[];
  displayOrder: number;
  productType: ProductType;
  releaseTimes?: string[];
}

const ProductStockCard = ({ image, stock, name, price }: ProductStockCardProps) => {
  const isSoldOut = stock === 0;
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex relative w-[68px] min-w-[68px] h-[68px]">
        {image && (
          <Image
            src={image}
            alt="product"
            width={68}
            height={68}
            className={isSoldOut ? 'opacity-70' : 'opacity-100'}
          />
        )}
        {isSoldOut && (
          <p className="absolute flex text-center top-[15px] left-[16px] text-title-content-s text-white">
            SOLD
            <br />
            OUT
          </p>
        )}
      </div>
      <div className="flex items-center gap-5 w-full max-w-[251px]">
        <div className="flex flex-col items-start gap-1 w-full">
          <p className="w-full text-title-content-s text-gray900">{name}</p>
          <p className="w-full text-title-content-xs text-gray700 font-normal">{stock}개 남음</p>
          <p className="w-full text-title-content-s text-gray900 font-normal">{comma(price)}원</p>
        </div>
        <Button variant="secondary" scale="xsmall" onClick={() => {}} className="w-[77px] min-w-[77px]">
          재고 변경
        </Button>
      </div>
    </div>
  );
};

export default ProductStockCard;
