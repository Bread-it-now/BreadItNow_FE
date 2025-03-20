'use client';
import { useMemo, useState } from 'react';
import RoundTab from '../common/tabs/RoundTab';
import ProductReserveCard from './ProductReserveCard';
import { Product } from '@/types/product';
import Spinner from '@/components/spinner/Spinner';
import Checkbox from '@/components/common/checkbox/Checkbox';
import { comma } from '@/utils/comma';

interface MenuCategoryProps {
  key: string;
  label: string;
}

const productList: Product[] = [
  {
    productId: '1',
    bakery_id: '1',
    type: 'BREAD',
    name: '소금빵',
    price: 1000,
    stock: 10,
    description: '소금빵 소개',
    image: 'https://placehold.co/600x400/png',
    isActive: true,
  },
  {
    productId: '2',
    bakery_id: '1',
    type: 'BREAD',
    name: '휘낭시에',
    price: 1000,
    stock: 10,
    description: '휘낭시에 소개',
    image: 'https://placehold.co/600x400/png',
    isActive: true,
  },
  {
    productId: '3',
    bakery_id: '1',
    type: 'BREAD',
    name: '마들렌',
    price: 1000,
    stock: 10,
    description: '마들렌 소개',
    image: 'https://placehold.co/600x400/png',
    isActive: true,
  },
];
const menuCategories: MenuCategoryProps[] = [
  {
    key: '1',
    label: '빵류',
  },
  {
    key: '2',
    label: '기타',
  },
];

function BreadCheckBox({
  name,
  isChecked,
  onCheckboxChange,
}: {
  name: string;
  isChecked: boolean;
  onCheckboxChange: () => void;
}) {
  return (
    <div className="absolute z-10 top-2 left-2 w-8 h-8">
      <Checkbox id={name} checked={isChecked} onChange={onCheckboxChange} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SpinnerInfoComponent({ name, price, stock }: { name: string; price: number; stock: number }) {
  return (
    <div className="flex items-center w-full mt-4">
      <Spinner minQuantity={0} maxQuantity={10} ininitialQuantity={1} />
      <div className="ml-auto">{comma(price)}원</div>
    </div>
  );
}
function ReservationBottonSheet({
  reserveStep,
  checkedProducts,
  setCheckProducts,
}: {
  reserveStep: number;
  checkedProducts: Product[];
  setCheckProducts: (item: Product[]) => void;
}) {
  const [category, setCategory] = useState<string>(menuCategories[0].key);
  const onTabChange = (key: string) => {
    const item = menuCategories.find((item) => item.key === key);
    if (item) {
      setCategory(item.key);
    }
  };

  const setCheckProductsisCheckedProduct = (item: Product): void => {
    if (checkedProducts.find((product) => product.name === item.name)) {
      setCheckProducts(checkedProducts.filter((product) => product.name !== item.name));
    } else {
      setCheckProducts([...checkedProducts, item]);
    }
  };

  const totalPrice = useMemo<string>(() => {
    const totalPrice = checkedProducts.reduce((acc, product) => acc + product.price, 0);
    return `${comma(totalPrice)}원`;
  }, [checkedProducts]);

  return (
    <div className="h-[630px] flex flex-col pb-[56px]">
      {reserveStep === 1 ? (
        <>
          <RoundTab categories={menuCategories} activeTab={category} onTabChange={onTabChange} />
          <div className="flex flex-col gap-2">
            {category === '1' ? (
              productList.map((product, index) => (
                <ProductReserveCard
                  ImageIconButton={
                    <BreadCheckBox
                      name={product.name}
                      isChecked={checkedProducts.find((product) => product.name === product.name) ? true : false}
                      onCheckboxChange={() => setCheckProductsisCheckedProduct(product)}
                    />
                  }
                  key={`product-${index}`}
                  {...product}
                />
              ))
            ) : (
              <div>기타</div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="bg-white  overflow-y-scroll">
            {checkedProducts.map((product, index) => {
              return (
                <ProductReserveCard
                  moreInfoComponent={
                    <SpinnerInfoComponent name={product.name} price={product.price} stock={product.stock} />
                  }
                  {...product}
                  key={`bread-${index}`}
                />
              );
            })}
            <div className="mt-[30px] mb-[56px] bg-gray-50 font-semibold">
              <div className="px-5 py-[23px] flex justify-between items-center text-black">
                <div>
                  총<span className="text-primary">{checkedProducts.length}</span>건 상품 금액
                </div>
                <div className="text-primary">{totalPrice}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ReservationBottonSheet;
