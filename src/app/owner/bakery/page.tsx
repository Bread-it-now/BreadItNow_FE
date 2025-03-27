'use client';
import HotBreadTab from '@/components/common/tabs/HotBreadTab';
import ImageSlider from '@/components/common/slider/ImageSlider';
import { useState, lazy } from 'react';
import EditIcon from '@/assets/icons/edit.svg';
import IconButton from '@/components/button/IconButton';
import BakeryImages from '@/components/bakeryInfo/BakeryImage';
import BottomSheet, { BottomSheetProps } from '@/components/bottomsheet/Bottomsheet';
import { useReservationBottomSheet } from '@/hooks/useReservationBottomSheet';

const HEADER_TABS = [
  { key: 'bakeryInfo', label: '빵집정보' },
  { key: 'bakeryProducts', label: '빵집 메뉴' },
];
const images = [
  'https://placehold.co/300x400/png',
  'https://placehold.co/600x400/png',
  'https://placehold.co/600x1000/png',
];
export default function Page() {
  const [activeTab, setActiveTab] = useState<string>('bakeryInfo');
  const { isOpen, open, close } = useReservationBottomSheet();
  // const [bottomSheetContent, setBottomSheetContent] = useState<React.ReactNode>(null);
  const [bototmSheetProps, setBottomSheetProps] = useState<BottomSheetProps>();
  const LazyEditBakeryImage = lazy(() => import('@/components/bakeryInfo/EditBakeryImage'));
  const EditBakeryNameAndIntroduction = lazy(() => import('@/components/bakeryInfo/EditBakeryNameAndIntroduction'));
  const setBottomSheetContent = (tab: string) => {
    switch (tab) {
      case 'image':
        // setBottomSheetContent(<LazyEditBakeryImage images={images} />);
        setBottomSheetProps({
          isOpen: true,
          title: '빵집 이미지 수정',
          cancelText: '취소',
          confirmText: '저장',
          onClose: close,
          onConfirm: () => {},
          children: <LazyEditBakeryImage images={images} />,
        });
        break;
      case 'store':
        setBottomSheetProps({
          isOpen: true,
          title: '빵집 이름/소개글 수정',
          cancelText: '취소',
          confirmText: '저장',
          onClose: close,
          onConfirm: () => {},
          children: <EditBakeryNameAndIntroduction />,
        });
        break;
      default:
        break;
    }
    open();
  };

  return (
    <div className="bg-gray-100 flex flex-col gap-[10px]">
      <HotBreadTab tabs={HEADER_TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-full h-[250px] rounded-b-2xl overflow-hidden relative">
        <IconButton
          buttonClass="absolute w-9 h-9 z-10 top-5 right-5 bg-white bg-opacity-80"
          iconText="수정"
          icon={EditIcon}
          iconWidth={20}
          iconHeight={20}
          onClick={() => {}}
        />
        <ImageSlider images={images} />
      </div>
      <div className="bg-white rounded-2xl px-5 py-[30px] text-black">
        <div className="flex justify-between items-start">
          <div className="grow text-[22px] font-semibold">빵집 이름</div>
          <IconButton
            buttonClass="border-none"
            iconText="수정"
            icon={EditIcon}
            iconWidth={20}
            iconHeight={20}
            onClick={() => setBottomSheetContent('store')}
          />
        </div>
        <div className="text-xs mt-5 font-normal text-gray-500">빵집 주소</div>
      </div>
      <div className="bg-white rounded-2xl px-5 py-[30px] text-black">
        <div className="flex justify-between items-start">
          <div className="grow text-[22px] font-semibold">영업 시간</div>
          <IconButton
            buttonClass="border-none"
            iconText="수정"
            icon={EditIcon}
            iconWidth={20}
            iconHeight={20}
            onClick={() => {}}
          />
        </div>
        <div className="text-xs mt-5 font-normal text-gray-500">빵집 주소</div>
      </div>
      <div className="bg-white rounded-2xl px-5 py-[30px] text-black">
        <div className="flex justify-between items-start">
          <div className="grow text-[22px] font-semibold">이미지</div>
          <IconButton
            buttonClass="border-none"
            iconText="수정"
            icon={EditIcon}
            iconWidth={20}
            iconHeight={20}
            onClick={() => setBottomSheetContent('image')}
          />
        </div>
        <BakeryImages images={[]} />
      </div>
      <div className="bg-white rounded-2xl px-5 py-[30px] text-black">
        <div className="flex justify-between items-center">
          <div className="grow text-[15px] font-semibold">
            <div>주소</div>
            <div className="text-[13px] mt-1 font-normal text-gray-500">대전광역시 중구 대종로480번길 15 (은행동)</div>
          </div>
          <IconButton
            buttonClass="border-none"
            iconText="수정"
            icon={EditIcon}
            iconWidth={20}
            iconHeight={20}
            onClick={() => {}}
          />
        </div>
        <hr className="my-5" />
        <div className="flex justify-between items-center">
          <div className="grow text-[15px] font-semibold">
            <div>전화번호</div>
            <div className="text-[13px] mt-1 font-normal text-gray-500">010-1234-5678</div>
          </div>
          <IconButton
            buttonClass="border-none"
            iconText="수정"
            icon={EditIcon}
            iconWidth={20}
            iconHeight={20}
            onClick={() => {}}
          />
        </div>
      </div>
      <BottomSheet
        isOpen={isOpen}
        onClose={close}
        onConfirm={bototmSheetProps?.onConfirm}
        title={bototmSheetProps?.title}
        cancelText={bototmSheetProps?.cancelText}
        confirmText={bototmSheetProps?.confirmText}
        bgColor={bototmSheetProps?.bgColor}>
        {bototmSheetProps?.children}
      </BottomSheet>
    </div>
  );
}
