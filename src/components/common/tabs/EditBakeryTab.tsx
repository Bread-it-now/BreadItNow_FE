import EditIcon from '@/assets/icons/edit.svg';
import IconButton from '@/components/button/IconButton';
import BakeryImages from '@/components/bakeryInfo/BakeryImage';
import ImageSlider from '@/components/common/slider/ImageSlider';
import { useState, lazy, memo, useEffect } from 'react';
import { BottomSheetProps } from '@/components/bottomsheet/Bottomsheet';

interface EditBakeryTabProps {
  open: () => void;
  setBottomSheetProps: (props: BottomSheetProps) => void;
  close: () => void;
}

const images = [
  'https://placehold.co/10x10/WebP',
  'https://placehold.co/10x10/WebP',
  'https://placehold.co/10x10/WebP',
];
const LazyEditBakeryTumbnail = lazy(() => import('@/components/bakeryInfo/EditBakeryTumbnail'));
const LazyEditBakeryNameAndIntroduction = lazy(() => import('@/components/bakeryInfo/EditBakeryNameAndIntroduction'));
const LazyEditOpenInfo = lazy(() => import('@/components/bakeryInfo/EditOpenInfo'));
const LazyEditBakeryImage = lazy(() => import('@/components/bakeryInfo/EditBakeryImage'));
const LazyEditBakeryAddress = lazy(() => import('@/components/bakeryInfo/EditBakeryAddress'));
const LazyEditBakeryPhone = lazy(() => import('@/components/bakeryInfo/EditBakeryPhone'));
const DEFAULT_BOTTOM_SHEET_PROPS = {
  isOpen: true,
  cancelText: '취소',
  confirmText: '저장',
};

const BakeryInfoContainer = memo(
  ({
    children,
    title,
    iconText,
    onClick,
  }: {
    children: React.ReactNode;
    title: string;
    iconText: string;
    onClick: () => void;
  }) => {
    return (
      <div className="bg-white rounded-2xl px-5 py-[30px] text-black">
        <div className="flex justify-between items-start">
          <div className="grow text-xl font-semibold">{title}</div>
          <IconButton
            buttonClass="border-none"
            iconText={iconText}
            icon={EditIcon}
            iconWidth={20}
            iconHeight={20}
            onClick={onClick}
          />
        </div>
        <div className="text-xs mt-5 font-normal text-gray-500">{children}</div>
      </div>
    );
  },
);
BakeryInfoContainer.displayName = 'BakeryInfoContainer';

function EditBakeryTab({ open, setBottomSheetProps, close }: EditBakeryTabProps) {
  const [bakeryImages, setBakeryImages] = useState<string[]>([...images]);

  const setBottomSheetContent = (tab: string) => {
    switch (tab) {
      case 'tumbnail':
        setBottomSheetProps({
          ...DEFAULT_BOTTOM_SHEET_PROPS,
          title: '빵집 이미지 수정',
          onClose: close,
          onConfirm: () => {},
          children: <LazyEditBakeryTumbnail images={bakeryImages} />,
        });
        break;
      case 'store':
        setBottomSheetProps({
          ...DEFAULT_BOTTOM_SHEET_PROPS,
          title: '빵집 이름/소개글 수정',
          onClose: close,
          onConfirm: () => {},
          children: <LazyEditBakeryNameAndIntroduction />,
        });
        break;
      case 'openInfo':
        setBottomSheetProps({
          ...DEFAULT_BOTTOM_SHEET_PROPS,
          title: '영업시간 수정',
          onClose: close,
          onConfirm: () => {},
          children: <LazyEditOpenInfo defaultOpenInfo="평일 10:00 - 18:00, 주말 10:00 - 18:00" />,
        });
        break;
      case 'image':
        setBottomSheetProps({
          ...DEFAULT_BOTTOM_SHEET_PROPS,
          title: '이미지 추가 삭제',
          onClose: close,
          onConfirm: () => {},
          children: <LazyEditBakeryImage images={bakeryImages} setImages={setBakeryImages} />,
        });
        break;
      case 'address':
        setBottomSheetProps({
          ...DEFAULT_BOTTOM_SHEET_PROPS,
          title: '주소 수정',
          onClose: close,
          onConfirm: () => {},
          children: (
            <LazyEditBakeryAddress
              zipCode="12345"
              address="서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층"
              detailAddress="101호"
            />
          ),
        });
        break;
      case 'phone':
        setBottomSheetProps({
          ...DEFAULT_BOTTOM_SHEET_PROPS,
          title: '전화번호 수정',
          onClose: close,
          onConfirm: () => {},
          children: <LazyEditBakeryPhone phone="010-1234-5678" />,
        });
        break;
      default:
        break;
    }
    open();
  };

  useEffect(() => {
    setBottomSheetContent('image');
  }, [bakeryImages]);
  return (
    <>
      <div className="w-full h-[250px] rounded-b-2xl overflow-hidden relative">
        <IconButton
          buttonClass="absolute w-9 h-9 z-10 top-5 right-5 bg-white bg-opacity-80"
          iconText="수정"
          icon={EditIcon}
          iconWidth={20}
          iconHeight={20}
          onClick={() => setBottomSheetContent('tumbnail')}
        />
        <ImageSlider images={images} />
      </div>
      <div className="flex flex-col gap-[10px] mt-[10px]">
        <BakeryInfoContainer title="빵집 이름" iconText="수정" onClick={() => setBottomSheetContent('store')}>
          <div className="text-xs mt-5 font-normal text-gray-500">빵집 소개</div>
        </BakeryInfoContainer>
        <BakeryInfoContainer title="영업 시간" iconText="수정" onClick={() => setBottomSheetContent('openInfo')}>
          <div className="text-xs mt-5 font-normal text-gray-500">빵집 주소</div>
        </BakeryInfoContainer>
        <BakeryInfoContainer title="이미지" iconText="수정" onClick={() => setBottomSheetContent('image')}>
          <BakeryImages images={[]} />
        </BakeryInfoContainer>
        <div className="bg-white rounded-2xl px-5 py-[30px] text-black">
          <div className="flex justify-between items-center">
            <div className="grow text-[15px] font-semibold">
              <div>주소</div>
              <div className="text-[13px] mt-1 font-normal text-gray-500">
                대전광역시 중구 대종로480번길 15 (은행동)
              </div>
            </div>
            <IconButton
              buttonClass="border-none"
              iconText="수정"
              icon={EditIcon}
              iconWidth={20}
              iconHeight={20}
              onClick={() => setBottomSheetContent('address')}
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
              onClick={() => setBottomSheetContent('phone')}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBakeryTab;
