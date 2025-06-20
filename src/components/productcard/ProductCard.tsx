'use client';

import { Product } from '@/types/bakery';
import Image from 'next/image';
import Button from '../button/Button';
import { comma } from '@/utils/comma';
import { cn } from '@/utils/cn';
import Checkbox from '../common/checkbox/Checkbox';
import { ComponentProps, ForwardedRef, forwardRef, SetStateAction } from 'react';
import useProductStockBottomSheet from '@/hooks/useProductStockBottomSheet';
import BottomSheet from '@/components/bottomsheet/Bottomsheet';
import Reset from '@/assets/icons/reset.svg';
import Drag from '@/assets/icons/drag.svg';
import QuantityChip from '../common/chips/quantitychip/quantityChip';
import Modal from '@/components/common/modal/Modal';
import useModal from '@/hooks/useModal';
import { sendFreshProductNotification } from '@/lib/api/notification';

interface ProductCardProps extends Product {
  isEditProductActive?: boolean;
  handleProductActiveChange?: React.Dispatch<SetStateAction<number[]>>;
  handleChecked?: React.Dispatch<SetStateAction<number[]>>;
  checked?: boolean;
  isStockVisible?: boolean;
  isDescriptionVisible?: boolean;
  isReleaseTimesVisible?: boolean;
  isCategoryVisible?: boolean;
  isDraggable?: boolean;
  className?: string;
  profileSize?: 'large' | 'default';
  isProductInfoAlignStart?: boolean;
  onClick?: () => void;
}

const quantityOptions: number[] = [-10, -5, -1, 1, 5, 10];

const ProductCard = ({
  image,
  stock,
  name,
  price,
  isActive,
  productId,
  isEditProductActive,
  handleProductActiveChange,
  handleChecked,
  checked = false,
  bakeryId,
  releaseTimes,
  description,
  breadCategories,
  isStockVisible,
  isDescriptionVisible,
  isReleaseTimesVisible,
  isCategoryVisible,
  isDraggable,
  profileSize = 'default',
  isProductInfoAlignStart = false,
  onClick,
  className,
}: ProductCardProps) => {
  const {
    handleChangeProductStock,
    isOpen: isProductStockBottomSheetOpen,
    open: openProductStockBottomSheet,
    close: closeProductStockBottomSheet,
    handleStockQuantityInput,
    stockQuantityInput,
  } = useProductStockBottomSheet({ initStock: stock, bakeryId, productId });

  const { isOpen: isModalOpen, dispatch } = useModal();

  const handleCheckboxChange = () => {
    if (handleProductActiveChange) {
      handleProductActiveChange((prevIds) => {
        if (prevIds.includes(productId)) {
          return prevIds.filter((id) => id !== productId);
        }
        return [...prevIds, productId];
      });
    }

    if (handleChecked) {
      handleChecked((prevIds) => {
        if (prevIds.includes(productId)) {
          return prevIds.filter((id) => id !== productId);
        }
        return [...prevIds, productId];
      });
    }
  };

  const isSoldOut = stock === 0;

  return (
    <div
      onClick={onClick}
      className={cn(`flex ${isProductInfoAlignStart ? 'items-start' : 'items-center'} gap-4 w-full`, className)}>
      <div
        className={`flex relative w-[${profileSize === 'default' ? 68 : 90}px] min-w-[${profileSize === 'default' ? 68 : 90}px] h-[${profileSize === 'default' ? 68 : 90}px]`}>
        {image && (
          <>
            <Image
              src={image}
              alt="product"
              width={profileSize === 'default' ? 68 : 90}
              height={profileSize === 'default' ? 68 : 90}
              className={cn(isSoldOut ? 'opacity-70' : 'opacity-100', 'rounded-lg')}
            />
            {(isEditProductActive || handleChecked) && (
              <div className="absolute top-1 left-1 z-1">
                <Checkbox
                  id={String(productId)}
                  checked={isEditProductActive ? isActive : checked}
                  onChange={handleCheckboxChange}
                />
              </div>
            )}
          </>
        )}
        {isSoldOut && (
          <p
            className={`absolute flex text-center ${profileSize === 'default' ? 'top-[14px] left-[16px]' : 'top-[25px] left-[30px]'} h-[40px] w-[40px] text-title-content-s text-white`}>
            SOLD
            <br />
            OUT
          </p>
        )}
      </div>
      <div className="flex items-center gap-5 w-full max-w-[251px]">
        <div className="flex flex-col items-start gap-1 w-full">
          {breadCategories && isCategoryVisible && (
            <p className="w-full text-title-content-xs text-gray700 font-normal ">{breadCategories[0].categoryName}</p>
          )}
          <p className="w-full text-title-content-s text-gray900 font-semibold">{name}</p>
          {description && isDescriptionVisible && (
            <p className="w-full text-title-content-xs text-gray500 font-normal">{description}</p>
          )}
          {!isEditProductActive && isStockVisible && (
            <p className="w-full text-title-content-xs text-gray700 font-normal">{stock}개 남음</p>
          )}
          <p className="w-full text-title-content-s text-gray900 font-normal">{comma(price)}원</p>
          {releaseTimes && isReleaseTimesVisible && (
            <div className="flex items-start gap-[2px] w-full">
              {releaseTimes.map((releaseTime: string, index: number) => (
                <p
                  key={`${releaseTime}-${index}`}
                  className="flex justify-center items-center px-[6px] w-[40px] h-[18px] text-title-content-3xs font-medium rounded-[9px] bg-secondaryLight1 text-secondary">
                  {releaseTime}
                </p>
              ))}
            </div>
          )}
        </div>
        {!isEditProductActive && isStockVisible && (
          <Button
            variant="secondary"
            scale="xsmall"
            onClick={() => openProductStockBottomSheet()}
            className="w-[77px] min-w-[77px]">
            재고 변경
          </Button>
        )}
        {isDraggable && (
          <div className="flex justify-center items-center w-9 h-9 min-w-9 min-h-9 border border-gray100 rounded-full">
            <Image src={Drag} width={20} height={20} alt="drag" />
          </div>
        )}
      </div>
      {isProductStockBottomSheetOpen && (
        <BottomSheet
          isOpen={isProductStockBottomSheetOpen}
          onClose={() => {
            handleStockQuantityInput(String(stock));
            closeProductStockBottomSheet();
          }}
          title={name}
          confirmText="변경"
          confirmDisabled={stockQuantityInput === '' || stockQuantityInput === String(stock)}
          onConfirm={() => {
            handleChangeProductStock(Number(stockQuantityInput));
            dispatch.open();
          }}>
          <div className="flex flex-col items-start justify-center pb-5 gap-6 w-full">
            <QuantityInput
              name="재고 수량 결정"
              value={stockQuantityInput}
              placeholder="수량 입력"
              onChange={(e) => handleStockQuantityInput(e.target.value)}
              onReset={() => handleStockQuantityInput('')}
            />
            <div className="flex items-start justify-evenly w-full h-[36px] ">
              {quantityOptions.map((quantity) => (
                <QuantityChip
                  key={quantity}
                  quantity={quantity}
                  onClick={() => handleStockQuantityInput(String(Number(stockQuantityInput) + quantity))}
                />
              ))}
            </div>
          </div>
        </BottomSheet>
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={dispatch.close}
          confirmText="알림 전송"
          cancelText="건너뛰기"
          onConfirm={() => {
            sendFreshProductNotification(bakeryId, productId);
            dispatch.close();
          }}
          cancelBtnFullWidth>
          <div className="text-center text-title-content-s font-normal">
            대기 중인 고객에게
            <br />갓 구운 빵 소식을 전할까요?
          </div>
        </Modal>
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
              className={`h-[34px] w-[140px] text-[24px] outline-none caret-primary placeholder:font-bold font-bold leading-[34px] tracking-[-0.01em] ${value === '' ? 'text-center' : 'text-right w-[20%]'}`}
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

export default ProductCard;
