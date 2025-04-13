'use client';
import { useMemo, useState } from 'react';
import RoundTab from '../common/tabs/RoundTab';
import ProductReserveCard from './ProductReserveCard';
import Spinner from '@/components/spinner/Spinner';
import Checkbox from '@/components/common/checkbox/Checkbox';
import { comma } from '@/utils/comma';
import { BakeryProducts, Product } from '@/types/bakery';
interface MenuCategoryProps {
  key: string;
  label: string;
}

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
  product,
}: {
  reserveStep: number;
  checkedProducts: Product[];
  setCheckProducts: (item: Product[]) => void;
  product?: BakeryProducts;
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
    <div>
      {reserveStep === 1 ? (
        <>
          <div className="py-[10px]">
            <RoundTab categories={menuCategories} activeTab={category} onTabChange={onTabChange} />
          </div>
          <div className="flex flex-col gap-2 max-h-[559px] overflow-y-scroll">
            {category === '1'
              ? product?.breadProducts.map((product, index) => (
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
              : product?.otherProducts.map((product, index) => (
                  <ProductReserveCard key={`product-${index}`} {...product} />
                ))}
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
