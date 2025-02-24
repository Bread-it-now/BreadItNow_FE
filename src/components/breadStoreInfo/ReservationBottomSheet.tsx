"use client";
import { useState } from "react";
import RoundTab from "../common/tabs/RoundTab";
import BreadReserveCard from "./BreadReserveCard";
// import BreadReserveCard from "@/components/breadStoreInfo/BreadReserveCard";
interface MenuCategoryProps {
  key: string;
  label: string;
}
interface BreadInfo {
  url: string;
  name: string;
  subText: string;
  price: number;
  count: number;
  existReserveTime: boolean;
}

const breadList: BreadInfo[] = [
  {
    url: "https://placehold.co/300x400/png",
    name: "소금빵",
    subText: "1000원",
    price: 1000,
    count: 1,
    existReserveTime: true,
  },
  {
    url: "https://placehold.co/300x400/png",
    name: "휘낭시에",
    subText: "1000원",
    price: 1000,
    count: 1,
    existReserveTime: true,
  },
  {
    url: "https://placehold.co/300x400/png",
    name: "마들렌",
    subText: "1000원",
    price: 1000,
    count: 1,
    existReserveTime: true,
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
  checkedProducts: BreadInfo[];
  setCheckProducts: (item: BreadInfo[]) => void;
}) {
  const [category, setCategory] = useState<string>(menuCategories[0].key);
  const onTabChange = (key: string) => {
    const item = menuCategories.find((item) => item.key === key);
    if (item) {
      setCategory(item.key);
    }
  };

  const setCheckProductsisCheckedProduct = (breadInfo: BreadInfo): void => {
    if (checkedProducts.find((product) => product.name === breadInfo.name)) {
      setCheckProducts(
        checkedProducts.filter((product) => product.name !== breadInfo.name),
      );
    } else {
      setCheckProducts([...checkedProducts, breadInfo]);
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
              return <BreadReserveCard {...bread} key={`brad-${index}`} />;
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
