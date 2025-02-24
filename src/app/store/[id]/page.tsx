"use client";
import ImageSlider from "@/components/common/slider/ImageSlider";
import StoreInfo from "@/components/breadStoreInfo/StoreInfo";
import Tag from "@/components/common/Tag";
import Image from "next/image";
import SlideInfoCard from "@/components/breadStoreInfo/SlideInfoCard";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { useRouter } from "next/navigation";
import BottomSheet from "@/components/bottomsheet/Bottomsheet";
import { useReservationBottomSheet } from "@/hooks/useReservationBottomSheet";
import Footer from "@/components/breadStoreInfo/Footer";
import MenuCategory from "@/components/breadStoreInfo/MenuCategory";
import ReservationBottonSheet from "@/components/breadStoreInfo/ReservationBottomSheet";
import { useState } from "react";
interface BreadInfo {
  url: string;
  name: string;
  subText: string;
  price: number;
  count: number;
  existReserveTime: boolean;
}

function BreadStoreImages({ images }: { images: string[] }) {
  //TODO... 이미지 마지막 이미지를 클릭했을 때 어떤 로직이 필요한지..?
  return (
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
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function BreadStoreOpenInfo({ info = [""] }: { info?: string[] }) {
  return (
    <div className="text-[13px] font-light mt-5 text-gray-700">
      <div>평일 | 오전 07:00 - 오후 10:00</div>
      <div>토요일 | 오전 07:00 - 오후 06:00</div>
      <div>*정기 휴무 매주 일요일</div>
    </div>
  );
}

function BreadComesOutInfo({
  comesOutInfo,
}: {
  comesOutInfo: { time: string; breads: string[] }[];
}) {
  return (
    <>
      {comesOutInfo.map(({ time, breads }) => {
        return (
          <div className="flex mt-5" key={time}>
            <Tag type="time" label={time} />
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
              {breads.map((bread, index) => (
                <Tag type="category" label={bread} key={`${bread}-${index}`} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

function Page() {
  const { isOpen, open, close } = useReservationBottomSheet();
  const router = useRouter();
  const [reserveStep, setReserveStep] = useState<number>(1);
  const onReservationStep = () => {
    if (reserveStep === 1) {
      setReserveStep(2);
    } else {
      //TODO...API 연결
      // close();
    }
  };

  const onCloseStep = () => {
    if (reserveStep === 1) {
      close();
    } else {
      setReserveStep(1);
    }
  };

  const obj = [
    {
      time: "07:00",
      breads: [
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
    },
    {
      time: "09:30",
      breads: ["크루아상", "생크림식빵", "마늘바게트"],
    },
    {
      time: "12:00",
      breads: ["크루아상"],
    },
    {
      time: "14:30",
      breads: ["크루아상", "생크림식빵", "마늘바게트", "소보루빵", "베이글"],
    },
    {
      time: "16:00",
      breads: ["크루아상", "생크림식빵", "마늘바게트", "소보루빵"],
    },
  ];
  const images = [
    "https://placehold.co/300x400/png",
    "https://placehold.co/600x400/png",
    "https://placehold.co/600x1000/png",
  ];
  const [checkedProducts, setCheckProducts] = useState<BreadInfo[]>([]);
  return (
    <div className="flex flex-col gap-[10px] overflow-y-scroll">
      <div className="h-[250px] relative rounded-b-2xl overflow-hidden">
        <Image
          onClick={() => router.back()}
          src={ArrowLeft}
          className="w-6 h-6 absolute left-5 top-[14px] z-10"
          alt="back"
        />
        <ImageSlider images={images} />
      </div>
      <StoreInfo />
      <SlideInfoCard
        title="영업 시간"
        contentComponent={<BreadStoreOpenInfo />}
      />
      <SlideInfoCard
        title="예상 빵 나오는 시간"
        contentComponent={<BreadComesOutInfo comesOutInfo={obj} />}
      />

      <SlideInfoCard
        title="이미지"
        contentComponent={<BreadStoreImages images={images} />}
      />
      <MenuCategory />

      <BottomSheet
        isOpen={isOpen}
        title="예약 상품 선택"
        cancelText={reserveStep === 1 ? "취소" : "이전"}
        confirmText={
          reserveStep === 1
            ? `총 ${checkedProducts.length}건 선택`
            : `총 ${checkedProducts.length}건 예약하기`
        }
        onClose={onCloseStep}
        onConfirm={onReservationStep}
      >
        <ReservationBottonSheet
          reserveStep={reserveStep}
          checkedProducts={checkedProducts}
          setCheckProducts={setCheckProducts}
        />
      </BottomSheet>
      <Footer onClick={open} />
    </div>
  );
}

export default Page;
