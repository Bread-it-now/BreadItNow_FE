"use client";
import ImageSlider from "@/components/common/slider/ImageSlider";
import StoreInfo from "@/components/breadStoreInfo/StoreInfo";
import Tag from "@/components/common/Tag";
import Image from "next/image";
import SlideInfoCard from "@/components/breadStoreInfo/SlideInfoCard";
import RoundTab from "@/components/common/tabs/RoundTab";
import { useState } from "react";

import BreadReserveCard from "@/components/breadStoreInfo/BreadReserveCard";
interface MenuCategoryProps {
  key: string;
  label: string;
}
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

function Page() {
  const obj = {
    "07:00": [
      "크루아상",
      "생크림식빵",
      "마늘바게트",
      "소보루빵",
      "베이글",
      "크루아상",
      "생크림식빵",
      "마늘바게트",
      "소보루빵",
      "베이글",
    ],
    "09:30": ["크루아상", "생크림식빵", "마늘바게트"],
    "12:00": ["크루아상"],
    "14:30": ["크루아상", "생크림식빵", "마늘바게트", "소보루빵", "베이글"],
    "16:00": ["크루아상", "생크림식빵", "마늘바게트", "소보루빵"],
  };
  const images = [
    "https://placehold.co/300x400/png",
    "https://placehold.co/600x400/png",
    "https://placehold.co/600x1000/png",
  ];
  const [category, setCategory] = useState<string>(menuCategories[0].key);
  const onTabChange = (key: string) => {
    const item = menuCategories.find((item) => item.key === key);
    if (item) {
      setCategory(item.key);
    }
  };
  return (
    <div className="flex flex-col gap-[10px] overflow-y-scroll">
      <div className="h-[250px] rounded-b-2xl overflow-hidden">
        <ImageSlider images={images} />
      </div>
      <StoreInfo />
      <SlideInfoCard
        title="영업 시간"
        contentComponent={
          <div className="text-[13px] font-light mt-5 text-gray-700">
            <div>평일 | 오전 07:00 - 오후 10:00</div>
            <div>토요일 | 오전 07:00 - 오후 06:00</div>
            <div>*정기 휴무 매주 일요일</div>
          </div>
        }
      />
      <SlideInfoCard
        title="예상 빵 나오는 시간"
        contentComponent={
          <>
            {Object.entries(obj).map(([key, value]) => {
              return (
                <div className="flex mt-5" key={key}>
                  <Tag type="time" label={key} />
                  <div
                    className="
                  relative 
                  before:absolute 
                  before:-left-[10px]
                  before:w-[1px] 
                  before:bg-gray-200 
                  before:rounded-full 
                  before:contents-[''] 
                  before:h-full 
                  ml-[20px]          
                  flex
                  flex-wrap 
                  gap-x-1 
                  gap-y-1.5
                "
                  >
                    {value.map((bread, index) => (
                      <Tag
                        type="category"
                        label={bread}
                        key={`${bread}-${index}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        }
      />

      <SlideInfoCard
        title="이미지"
        contentComponent={
          <div className="flex gap-[10px] h-[105px] mt-5">
            {images.slice(0, 3).map((image, index) => (
              <div key={`image-${index}`} className="relative w-full h-[105px]">
                <Image
                  src={`${image}`}
                  alt={`빵집 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 2 && images.length - 3 > 0 && (
                  <div className="absolute inset-0 z-10 bg-black bg-opacity-30 rounded-lg h-full ">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-md">
                      {images.length - 3} +
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        }
      />
      <RoundTab
        categories={menuCategories}
        activeTab={category}
        onTabChange={onTabChange}
      />
      <article className="bg-white rounded-2xl px-5 py-[30px]">
        <div className="flex justify-between">
          <div className="font-semibold text-black text-md">빵류</div>
        </div>
        <BreadReserveCard
          name="크루아상"
          subText="1000원"
          price={1000}
          count={1}
        />
        <BreadReserveCard
          name="크루아상"
          subText="1000원"
          price={1000}
          count={1}
        />
        <BreadReserveCard
          name="크루아상"
          subText="1000원"
          price={1000}
          count={1}
        />
        <BreadReserveCard
          name="크루아상"
          subText="1000원"
          price={1000}
          count={1}
        />
        <BreadReserveCard
          name="크루아상"
          subText="1000원"
          price={1000}
          count={1}
        />
        <BreadReserveCard
          name="크루아상"
          subText="1000원"
          price={1000}
          count={1}
        />
        <BreadReserveCard
          name="크루아상"
          subText="1000원"
          price={1000}
          count={1}
        />
        <BreadReserveCard
          name="크루아상"
          subText="1000원"
          price={1000}
          count={1}
        />
      </article>
    </div>
  );
}

export default Page;
