'use client';
import ImageSlider from '@/components/common/slider/ImageSlider';
import Tag from '@/components/common/Tag';
import Image from 'next/image';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { useRouter } from 'next/navigation';
import BakeryImages from '@/components/bakeryInfo/BakeryImage';
import BottomSheet from '@/components/bottomsheet/Bottomsheet';
import { useReservationBottomSheet } from '@/hooks/useReservationBottomSheet';
import MenuCategory from '@/components/bakeryInfo/MenuCategory';
import { lazy, useState } from 'react';
import { Product } from '@/types/bakery';
import Accordion from '@/components/accordion/Accordion';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import { useBakeryInfo, useBakeryProducts } from '@/lib/api/bakery';
import { useParams } from 'next/navigation';
import Button from '@/components/button/Button';
import { createReservation } from '@/lib/api/bakery';
import StoreInfo from '@/components/bakeryInfo/StoreInfo';
const LazyReservationBottomSheet = lazy(() => import('@/components/bakeryInfo/ReservationBottomSheet'));
const LazyBakeryAddressBottomSheet = lazy(() => import('@/components/bakeryInfo/BakeryAddressBottomSheet'));
interface CheckedProduct extends Product {
  quantity: number;
}

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
  const { isOpen: isOpenReservation, open: openReservation, close: closeReservation } = useReservationBottomSheet();
  const { isOpen: isOpenAddress, open: openAddress, close: closeAddress } = useReservationBottomSheet();
  const router = useRouter();
  const [reserveStep, setReserveStep] = useState<number>(1);
  const onReservationStep = async () => {
    if (reserveStep === 1) {
      setReserveStep(2);
    } else {
      if (checkedProducts.length === 0) return;
      //TODO...API 연결
      try {
        await createReservation({
          bakeryId: Number(bakeryId),
          reservationProducts: [
            ...checkedProducts.map((product) => ({
              productId: product.productId,
              quantity: product.quantity,
            })),
          ],
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // console.error(error);
      } finally {
        close();
      }
    }
  };

  const onCloseStep = () => {
    if (reserveStep === 1) {
      closeReservation();
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
  const [checkedProducts, setCheckProducts] = useState<CheckedProduct[]>([]);
  const onCloseReservationBottomSheet = () => {
    setCheckProducts([]);
    setReserveStep(1);
    closeReservation();
  };
  if (!bakery) return <div>Loading...</div>;
  return (
    <div>
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
        <StoreInfo bakery={bakery} />
        <Accordion title="영업 시간">
          <BakeryOpenInfo openInfo={bakery.openTime} />
        </Accordion>
        <Accordion title="예상 빵 나오는 시간">
          <BakeryComesOutInfo comesOutInfo={obj} />
        </Accordion>
        <Accordion title="이미지">
          <BakeryImages images={bakery.additionalImages ? bakery.additionalImages : []} />
        </Accordion>

        <div className="flex flex-col gap-[10px] px-5 py-[30px] bg-white rounded-2xl">
          <div onClick={openAddress} className="flex gap-5">
            <div className="grow">
              <div className="text-title-subtitle">주소</div>
              <div className="text-[13px] font-normal text-gray-500 mt-1">{bakery.address}</div>
            </div>
            <Image src={ArrowRight} alt="arrow" width={20} height={20} />
          </div>
          <hr className="my-5" />
          <div className="flex gap-5">
            <div className="grow">
              <div className="text-title-subtitle">전화번호</div>
              <div className="text-[13px] font-normal text-gray-500 mt-1">{bakery.phone}</div>
            </div>
            <Image onClick={openAddress} src={ArrowRight} alt="arrow" width={20} height={20} />
          </div>
        </div>

        <MenuCategory bakeryProducts={bakeryProducts} />
        <div className="sticky bottom-0 z-10 w-full p-5 bg-white">
          <Button onClick={openReservation} fullWidth variant="primary" scale="large" className="">
            <div>예약하기</div>
          </Button>
        </div>
      </div>
      <BottomSheet
        isOpen={isOpenReservation}
        title="예약 상품 선택"
        cancelText={reserveStep === 1 ? '취소' : '이전'}
        confirmText={
          reserveStep === 1 ? `총 ${checkedProducts.length}건 선택` : `총 ${checkedProducts.length}건 예약하기`
        }
        onClose={onCloseReservationBottomSheet}
        onCancel={onCloseStep}
        onConfirm={onReservationStep}>
        <LazyReservationBottomSheet
          reserveStep={reserveStep}
          checkedProducts={checkedProducts}
          setCheckProducts={setCheckProducts}
          product={bakeryProducts}
        />
      </BottomSheet>
      <BottomSheet
        isOpen={isOpenAddress}
        onClose={closeAddress}
        bgColor="!bg-gray-50"
        maxHeight={256}
        needMarginBottom={false}>
        <LazyBakeryAddressBottomSheet address={bakery?.address} />
      </BottomSheet>
    </div>
  );
}

export default Page;
