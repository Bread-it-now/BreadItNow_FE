"use client";
import { useState } from "react";
import RoundTab from "../common/tabs/RoundTab";
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

// const breadInfo =   {
//   url: "https://placehold.co/300x400/png",
//   name: "크루아상",
//   subText: "1000원",
//   price: 1000,
//   count: 1,
//   existReserveTime: true
// }
// const breadList = [breadInfo, breadInfo, breadInfo, breadInfo];
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
}: {
  reserveStep: number;

  checkedProducts: BreadInfo[];

  setCheckedProducts: (item: BreadInfo) => void;
}) {
  const [category, setCategory] = useState<string>(menuCategories[0].key);
  const onTabChange = (key: string) => {
    const item = menuCategories.find((item) => item.key === key);
    if (item) {
      setCategory(item.key);
    }
  };

  // const isCheckedProduct = (id:string):boolean => {
  //   return !!checkedProducts.find((item) => item?.url === id);
  // }

  return (
    <div className="h-[630px] flex flex-col overflow-y-scroll">
      {reserveStep === 1 ? (
        <>
          <RoundTab
            categories={menuCategories}
            activeTab={category}
            onTabChange={onTabChange}
          />
          <div className="bg-white  overflow-y-scroll h-[500px]">
            {/* {
              breadList.map((bread, index) => {
                return <BreadReserveCard isChecked={isCheckedProduct(bread.url)} setIsChecked={setCheckedProducts}  {...bread} key={`brad-${index}`} />
              })
            } */}
          </div>
        </>
      ) : (
        <>
          <div className="bg-white  overflow-y-scroll h-[500px]">
            {/* {
              breadList.map((bread, index) => {
                return <BreadReserveCard isChecked={isCheckedProduct(bread.url)} setIsChecked={setCheckedProducts} {...bread} key={`brad-${index}`} />
              })
            } */}
            <div className="mt-[30px] mb-[56px] bg-gray-50 font-semibold">
              <div className="px-5 py-[23px] flex justify-between items-center text-black">
                <div>
                  총{" "}
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
