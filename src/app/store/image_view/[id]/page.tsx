'use client';
import IconButton from '@/components/button/IconButton';
import CloseIcon from '@/assets/icons/close.svg';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import ImageSlider from '@/components/common/slider/ImageSlider';
import { useRouter } from 'next/navigation';
function Page() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // 이미지 크게보기 모달 오픈
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const lastImageRef = useRef<HTMLDivElement>(null);
  const images = [
    'https://placehold.co/300x400/png',
    'https://placehold.co/600x400/png',
    'https://placehold.co/600x1000/png',
    'https://placehold.co/300x400/png',
    'https://placehold.co/600x400/png',
    'https://placehold.co/600x1000/png',
    'https://placehold.co/300x400/png',
    'https://placehold.co/600x400/png',
    'https://placehold.co/600x1000/png',
    'https://placehold.co/300x400/png',
    'https://placehold.co/600x400/png',
    'https://placehold.co/600x1000/png',
    'https://placehold.co/300x400/png',
    'https://placehold.co/600x400/png',
    'https://placehold.co/600x1000/png',
    'https://placehold.co/300x400/png',
    'https://placehold.co/600x400/png',
    'https://placehold.co/600x1000/png',
  ];

  const onClickImage = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (lastImageRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // console.log('isIntersecting');
          }
        });
      });
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  const closePage = () => {
    router.back();
  };
  return (
    <div className="h-full">
      <div className="px-5 py-[13px] text-black font-semibold flex">
        <div className="text-lg grow">이미지 모아보기</div>
        <Image src={CloseIcon} alt="close" width={24} height={24} onClick={closePage} />
      </div>
      <div className="grid grid-cols-3 gap-1">
        {images.map((image, index) => {
          return (
            <div
              onClick={() => onClickImage(index)}
              className="rounded-md relative aspect-square overflow-hidden"
              key={index}>
              <Image src={image} alt="image" fill className="object-cover bg-no-repeat" />
            </div>
          );
        })}
        <div ref={lastImageRef} className="col-span-3">
          <div className="h-[1px] bg-gray-100"></div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-white flex flex-col">
          <div className="px-5 py-[13px] text-black font-semibold text-right fixed top-0 left-0 w-full">
            <IconButton
              buttonClass="border-none !bg-transparent"
              icon={CloseIcon}
              iconText="닫기"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="bg-white w-full my-auto  flex justify-center items-center">
            <div className=" aspect-square w-full">
              {currentIndex}
              <ImageSlider images={images} startIndex={currentIndex} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
