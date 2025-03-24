'use client';

import { Product } from '@/types/bakery';
import Image from 'next/image';
import Button from '../button/Button';
import { comma } from '@/utils/comma';
import { cn } from '@/utils/cn';
import Checkbox from '../common/checkbox/Checkbox';
import { ComponentProps, ForwardedRef, forwardRef, Fragment, SetStateAction, useState } from 'react';
import useProductStockBottomSheet from '@/hooks/useProductStockBottomSheet';
import BottomSheet from '@/components/bottomsheet/Bottomsheet';
import Reset from '@/assets/icons/reset.svg';
import QuantityChip from '../common/chips/quantitychip/quantityChip';

interface ProductStockCardProps extends Product {
  isEditProductActive?: boolean;
  handleProductActiveChange?: React.Dispatch<SetStateAction<number[]>>;
}

const quantityOptions: number[] = [-10, -5, -1, 1, 5, 10];

const ProductStockCard = ({
  image,
  stock,
  name,
  price,
  isActive,
  productId,
  isEditProductActive,
  handleProductActiveChange,
}: ProductStockCardProps) => {
  const [productStockInput, setProductStockInput] = useState<string>(String(stock));

  const {
    changeStockMutate,
    isOpen: isProductStockBottomSheetOpen,
    open: openProductStockBottomSheet,
    close: closeProductStockBottomSheet,
  } = useProductStockBottomSheet();

  const handleActiveChange = () => {
    if (handleProductActiveChange) {
      handleProductActiveChange((prevIds) => {
        if (prevIds.includes(productId)) {
          return prevIds.filter((id) => id !== productId);
        }
        return [...prevIds, productId];
      });
    }
  };

  const isSoldOut = stock === 0;

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex relative w-[68px] min-w-[68px] h-[68px]">
        {image && (
          <>
            <Image
              src={image}
              alt="product"
              width={68}
              height={68}
              className={cn(isSoldOut ? 'opacity-70' : 'opacity-100', 'rounded-lg')}
            />
            {isEditProductActive && (
              <div className="absolute top-1 left-1 z-1">
                <Checkbox id={String(productId)} checked={!isActive} onChange={handleActiveChange} />
              </div>
            )}
          </>
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
          {!isEditProductActive && (
            <p className="w-full text-title-content-xs text-gray700 font-normal">{stock}개 남음</p>
          )}
          <p className="w-full text-title-content-s text-gray900 font-normal">{comma(price)}원</p>
        </div>
        {!isEditProductActive && (
          <Button
            variant="secondary"
            scale="xsmall"
            onClick={() => openProductStockBottomSheet()}
            className="w-[77px] min-w-[77px]">
            재고 변경
          </Button>
        )}
      </div>
      {isProductStockBottomSheetOpen && (
        <BottomSheet
          isOpen={isProductStockBottomSheetOpen}
          onClose={closeProductStockBottomSheet}
          title={name}
          confirmText="변경"
          confirmDisabled
          onConfirm={() => {
            // 재고 수량 변경 API 호출
            changeStockMutate();
            closeProductStockBottomSheet();
          }}>
          <div className="flex flex-col items-start justify-center pb-5 gap-6 w-full">
            <QuantityInput
              name="재고 수량 결정"
              value={productStockInput}
              placeholder="수량 입력"
              onChange={(e) => setProductStockInput(e.target.value)}
              onReset={() => setProductStockInput('')}
            />
            <div className="flex items-start justify-evenly w-full h-[36px] ">
              {quantityOptions.map((quantity) => (
                <QuantityChip
                  key={quantity}
                  quantity={quantity}
                  onClick={() => setProductStockInput(String(Number(productStockInput) + quantity))}
                />
              ))}
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

interface QuantityInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onReset?: () => void;
}

const QuantityInput = forwardRef<HTMLInputElement, ComponentProps<'input'> & QuantityInputProps>(
  (
    { name = '재고 수량', placeholder = '수량 입력', onChange, value, onReset },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <label htmlFor={name} className="flex justify-center items-center py-[10px] gap-[10px] w-full h-full mx-auto">
        <div className="flex w-full items-center justify-center gap-[2px]">
          <div className="flex w-full items-center justify-center gap-[1px]">
            <input
              type="number"
              placeholder={placeholder}
              className={`h-[34px] w-full text-[24px] outline-none caret-primary placeholder:font-bold font-bold leading-[34px] tracking-[-0.01em] ${value === '' ? 'text-center' : 'text-right w-[20%]'}`}
              onChange={onChange}
              value={value}
              ref={ref}
            />
            {value && (
              <div className="flex gap-2">
                <div className="h-[34px] w-[full] text-[24px] leading-[34px] tracking-[-0.01em] font-bold ">개</div>
                <div className="flex items-center justify-center">
                  {value && (
                    <button onClick={onReset} className="w-full">
                      <Image src={Reset} alt="reset-input" width={22} height={22} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </label>
    );
  },
);

QuantityInput.displayName = 'QuantityInput';

export default ProductStockCard;
