'use client';
import ImageSlider from '@/components/common/slider/ImageSlider';
import CloseWhite from '@/assets/icons/close-white.svg';
import Image from 'next/image';
import Button from '@/components/button/Button';
import AddIcon from '@/assets/icons/add.svg';
interface EditBakeryImageProps {
  images: string[];
}

function EditBakeryImage({ images }: EditBakeryImageProps) {
  return (
    <div>
      <div className="w-full h-[223px]">
        <ImageSlider
          images={images}
          showPagination={false}
          floatingButton={
            <button className="absolute bg-opacity-50 z-10 top-[10px] right-[10px] bg-gray-900 border-none !w-[22px] !h-[22px] !rounded-full">
              <Image className="mx-auto" src={CloseWhite} alt="삭제" width={12} height={12} />
            </button>
          }
        />
      </div>
      <div className="mt-3">
        <Button fullWidth onClick={() => {}} variant="secondary">
          <div className="text-primary flex gap-[6px]">
            <div className="flex justify-center items-center w-5 h-5 bg-primary rounded-full">
              <Image src={AddIcon} alt="빵집 이미지" width={20} height={20} />
            </div>
            <span className="ml-[6px]"> 빵집 이미지</span>
          </div>
        </Button>
        <div className="text-gray-500 text- mt-1">*3:2 비율로 이미지가 크롭되어 보여집니다.</div>
      </div>
    </div>
  );
}

export default EditBakeryImage;
