'use client';
import { useMemo, useState } from 'react';
import RoundTab from '../common/tabs/RoundTab';
import ProductReserveCard from './ProductReserveCard';
import Spinner from '@/components/spinner/Spinner';
import Checkbox from '@/components/common/checkbox/Checkbox';
import { comma } from '@/utils/comma';
import { Product } from '@/types/bakery';
interface MenuCategoryProps {
  key: string;
  label: string;
}

interface CheckedProduct extends Product {
  quantity: number;
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
  disabled,
}: {
  name: string;
  isChecked: boolean;
  onCheckboxChange: () => void;
  disabled: boolean;
}) {
  return (
    <div className="absolute z-10 top-2 left-2 w-8 h-8">
      <Checkbox disabled={disabled} id={name} checked={isChecked} onChange={onCheckboxChange} />
    </div>
  );
}

function SpinnerInfoComponent({
  price,
  stock,
  onChange,
}: {
  name: string;
  price: number;
  stock: number;
  onChange: (quantity: number) => void;
}) {
  return (
    <div className="flex items-center w-full mt-4">
      <Spinner onQuantityChange={onChange} minQuantity={0} maxQuantity={stock} ininitialQuantity={0} />
      <div className="ml-auto">{comma(price)}원</div>
    </div>
  );
}
function ReservationBottonSheet({
  reserveStep,
  checkedProducts,
  setCheckProducts,
  breadMenu,
  otherMenu,
}: {
  reserveStep: number;
  checkedProducts: CheckedProduct[];
  setCheckProducts: (item: CheckedProduct[]) => void;
  breadMenu: Product[];
  otherMenu: Product[];
}) {
  const [category, setCategory] = useState<string>(menuCategories[0].key);
  const onTabChange = (key: string) => {
    const item = menuCategories.find((item) => item.key === key);
    if (item) {
      setCategory(item.key);
    }
  };

  const isCheckedProduct = (item: Product): void => {
    if (checkedProducts.find((product) => product.name === item.name)) {
      setCheckProducts(checkedProducts.filter((product) => product.name !== item.name));
    } else {
      setCheckProducts([...checkedProducts, { ...item, quantity: 0 }]);
    }
  };

  const onProductQuantityChange = (index: number, quantity: number): void => {
    const newCheckedProducts = [...checkedProducts];
    newCheckedProducts[index].quantity = quantity;
    setCheckProducts(newCheckedProducts);
  };

  const totalPrice = useMemo<string>(() => {
    const totalPrice = checkedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
    return `${comma(totalPrice)}원`;
  }, [checkedProducts]);

  return (
    <div>
      {reserveStep === 1 ? (
        <>
          <div className="py-[10px]">
            <RoundTab categories={menuCategories} activeTab={category} onTabChange={onTabChange} />
          </div>
          <div key={'category-1'} className="flex flex-col gap-2 max-h-[559px] overflow-y-scroll">
            {category === '1' && breadMenu.length
              ? breadMenu.map((p, index) => (
                  <div key={`${p.bakeryId}-${p.name}`}>
                    <ProductReserveCard
                      ImageIconButton={
                        <BreadCheckBox
                          name={p.name}
                          disabled={p.stock === 0}
                          isChecked={
                            checkedProducts.find((checkedPropduct) => checkedPropduct.name === p.name) ? true : false
                          }
                          onCheckboxChange={() => isCheckedProduct(p)}
                        />
                      }
                      {...p}
                    />
                    {index !== breadMenu.length - 1 && <hr className="w-full my-5" />}
                  </div>
                ))
              : otherMenu.map((p, index) => (
                  <div key={`${p.bakeryId}-${p.name}`}>
                    <ProductReserveCard
                      ImageIconButton={
                        <BreadCheckBox
                          name={p.name}
                          disabled={p.stock === 0}
                          isChecked={
                            checkedProducts.find((checkedPropduct) => checkedPropduct.name === p.name) ? true : false
                          }
                          onCheckboxChange={() => isCheckedProduct(p)}
                        />
                      }
                      {...p}
                    />
                    {index !== otherMenu.length - 1 && <hr className="w-full my-5" />}
                  </div>
                ))}
          </div>
        </>
      ) : (
        <>
          <div className="bg-white  overflow-y-scroll">
            {checkedProducts.map((product, index) => {
              return (
                <>
                  <ProductReserveCard
                    moreInfoComponent={
                      <SpinnerInfoComponent
                        onChange={(quantity: number) => onProductQuantityChange(index, quantity)}
                        name={product.name}
                        price={product.price}
                        stock={product.stock}
                      />
                    }
                    {...product}
                    key={`bread-${index}`}
                  />
                  {index !== checkedProducts.length - 1 && <hr className="w-full my-5" />}
                </>
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
