"use client";
import { useState } from "react";
import RoundTab from "../common/tabs/RoundTab";
import BreadReserveCard from "./BreadReserveCard";
import { Product } from "@/types/product";
// import BreadReserveCard from "@/components/breadStoreInfo/BreadReserveCard";
interface MenuCategoryProps {
  key: string;
  label: string;
}

const breadList: Product[] = [
  {
    productId: "1",
    bakery_id: "1",
    type: "BREAD",
    name: "소금빵",
    price: 1000,
    stock: 10,
    description: "소금빵 소개",
    image: "https://placehold.co/600x400/png",
    isActive: true,
  },
  {
    productId: "2",
    bakery_id: "1",
    type: "BREAD",
    name: "휘낭시에",
    price: 1000,
    stock: 10,
    description: "휘낭시에 소개",
    image: "https://placehold.co/600x400/png",
    isActive: true,
  },
  {
    productId: "3",
    bakery_id: "1",
    type: "BREAD",
    name: "마들렌",
    price: 1000,
    stock: 10,
    description: "마들렌 소개",
    image: "https://placehold.co/600x400/png",
    isActive: true,
  },
];
const menuCategories: MenuCategoryProps[] = [
  {
    key: "1",
    label: "빵류",
  },
  {
    key: "2",
    label: "기타",
  },
];
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
      setCheckProducts(
        checkedProducts.filter((product) => product.name !== item.name),
      );
    } else {
      setCheckProducts([...checkedProducts, item]);
    }
  };

  return (
    <div className="h-[630px] flex flex-col ">
      {reserveStep === 1 ? (
        <>
          <RoundTab
            categories={menuCategories}
            activeTab={category}
            onTabChange={onTabChange}
          />
          <div className="">
            {breadList.map((bread, index) => (
              <div key={`bread-${index}`}>
                <BreadReserveCard
                  openType="select"
                  isChecked={
                    checkedProducts.find(
                      (product) => product.name === bread.name,
                    )
                      ? true
                      : false
                  }
                  setIsChecked={() => setCheckProductsisCheckedProduct(bread)}
                  {...bread}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="bg-white  overflow-y-scroll">
            {checkedProducts.map((bread, index) => {
              return (
                <BreadReserveCard
                  openType="bookmark"
                  {...bread}
                  key={`brad-${index}`}
                />
              );
            })}
            <div className="mt-[30px] mb-[56px] bg-gray-50 font-semibold">
              <div className="px-5 py-[23px] flex justify-between items-center text-black">
                <div>
                  총
                  <span className="text-primary">{checkedProducts.length}</span>
                  건 상품 금액
                </div>
                <div className="text-primary">22,100원</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ReservationBottonSheet;
