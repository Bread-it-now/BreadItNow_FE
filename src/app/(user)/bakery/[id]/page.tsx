'use client';
import ImageSlider from '@/components/common/slider/ImageSlider';
import Tag from '@/components/common/Tag';
import Image from 'next/image';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { useRouter } from 'next/navigation';
import BakeryImages from '@/components/bakeryInfo/BakeryImage';
import BottomSheet from '@/components/bottomsheet/Bottomsheet';
import { useReservationBottomSheet } from '@/hooks/useReservationBottomSheet';
import Footer from '@/components/bakeryInfo/Footer';
import MenuCategory from '@/components/bakeryInfo/MenuCategory';
import ReservationBottonSheet from '@/components/bakeryInfo/ReservationBottomSheet';
import { useState } from 'react';
import { Product } from '@/types/bakery';
import Accordion from '@/components/accordion/Accordion';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import KakaoIcon from '@/assets/images/kakao.png';
import NaverIcon from '@/assets/images/naver.png';
import CopyIcon from '@/assets/icons/copy.svg';
import { useBakeryInfo, useBakeryProducts } from '@/lib/api/bakery';
import { useParams } from 'next/navigation';

function BakeryOpenInfo({ openInfo }: { openInfo: string }) {
  return (
    <div className="text-[13px] font-light mt-5 text-gray-700">
      <div>{openInfo}</div>
    </div>
  );
}

function BakeryComesOutInfo({ comesOutInfo }: { comesOutInfo: { time: string; breads: string[] }[] }) {
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
                ">
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
  const params = useParams();
  const bakeryId = params.id;
  const { data: bakery } = useBakeryInfo(Number(bakeryId));
  const { data: bakeryProducts } = useBakeryProducts(Number(bakeryId));
  //API
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
      time: '07:00',
      breads: [
        '크루아상',
        '생크림식빵',
        '마늘바게트',
        '소보루빵',
        '베이글',
        '크루아상',
        '생크림식빵',
        '마늘바게트',
        '소보루빵',
        '베이글',
      ],
    },
    {
      time: '09:30',
      breads: ['크루아상', '생크림식빵', '마늘바게트'],
    },
    {
      time: '12:00',
      breads: ['크루아상'],
    },
    {
      time: '14:30',
      breads: ['크루아상', '생크림식빵', '마늘바게트', '소보루빵', '베이글'],
    },
    {
      time: '16:00',
      breads: ['크루아상', '생크림식빵', '마늘바게트', '소보루빵'],
    },
  ];
  const [checkedProducts, setCheckProducts] = useState<Product[]>([]);

  //주소 바텀 sheet
  const [isOpenAddressBottomSheet, setIsOpenAddressBottomSheet] = useState(false);
  const onOpenAddressBottomSheet = () => {
    setIsOpenAddressBottomSheet(true);
  };
  const onCloseAddressBottomSheet = () => {
    setIsOpenAddressBottomSheet(false);
  };

  if (!bakery) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-[10px] overflow-y-scroll text-black bg-gray-100">
      <div className="h-[250px] relative rounded-b-2xl overflow-hidden">
        <Image
          onClick={() => router.back()}
          src={ArrowLeft}
          className="w-6 h-6 absolute left-5 top-[14px] z-10"
          alt="back"
        />
        {/* TODO 빵집 섬네일은 1개인데 슬라이더가 필요한가? */}
        <ImageSlider images={bakery?.bakeryImages} />
      </div>
      {/* <StoreInfo bakery={bakery} /> */}
      <Accordion title="영업 시간">
        <BakeryOpenInfo openInfo={bakery.openTime} />
      </Accordion>
      <Accordion title="예상 빵 나오는 시간">
        <BakeryComesOutInfo comesOutInfo={obj} />
      </Accordion>
      {/* TODO 마지막 이미지 클릭한 후 이동할 페이지 필요  */}
      {/* 이미지 어디서 가져오나? */}
      <Accordion title="이미지">
        <BakeryImages images={bakery.additionalImages ? bakery.additionalImages : []} />
      </Accordion>

      <div className="flex flex-col gap-[10px] px-5 py-[30px] bg-white rounded-2xl">
        <div className="flex gap-5">
          <div className="grow">
            <div className="text-title-subtitle">주소</div>
            <div className="text-[13px] font-normal text-gray-500 mt-1">{bakery.address}</div>
          </div>
          <Image onClick={onOpenAddressBottomSheet} src={ArrowRight} alt="arrow" width={20} height={20} />
        </div>
        <hr className="my-5" />
        <div className="flex gap-5">
          <div className="grow">
            <div className="text-title-subtitle">전화번호</div>
            <div className="text-[13px] font-normal text-gray-500 mt-1">{bakery.phone}</div>
          </div>
          <Image onClick={onOpenAddressBottomSheet} src={ArrowRight} alt="arrow" width={20} height={20} />
        </div>
      </div>

      <MenuCategory bakeryProducts={bakeryProducts} />
      <Footer onClick={open} />
      <BottomSheet
        isOpen={isOpen}
        title="예약 상품 선택"
        cancelText={reserveStep === 1 ? '취소' : '이전'}
        confirmText={
          reserveStep === 1 ? `총 ${checkedProducts.length}건 선택` : `총 ${checkedProducts.length}건 예약하기`
        }
        onClose={onCloseStep}
        onConfirm={onReservationStep}>
        <ReservationBottonSheet
          reserveStep={reserveStep}
          checkedProducts={checkedProducts}
          setCheckProducts={setCheckProducts}
        />
      </BottomSheet>

      <BottomSheet isOpen={isOpenAddressBottomSheet} onClose={onCloseAddressBottomSheet} bgColor="bg-gray-50">
        <div className="bg-gray-50 w-full h-full">
          <div className="px-5 py-[30px] text-gray-900 rounded-[10px]">
            <div className="p-5 bg-white rounded-[10px]">
              <div className="flex gap-5 items-center justify-between">
                <div className="text-md font-medium grow">카카오맵</div>
                <Image src={KakaoIcon} alt="kakao" width={20} height={20} />
              </div>
              <div className="flex gap-5 items-center justify-between mt-6">
                <div className="text-md font-medium grow">네이버 지도</div>
                <Image src={NaverIcon} alt="naver" width={20} height={20} />
              </div>
            </div>
            <div className="mt-[10px] flex gap-5 items-center justify-between p-5 bg-white rounded-[10px]">
              <div className="text-md font-medium grow">복사</div>
              <Image src={CopyIcon} alt="copy" width={20} height={20} />
            </div>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

export default Page;
