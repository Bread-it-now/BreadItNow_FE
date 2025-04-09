'use client';
import { memo, useCallback } from 'react';
import { useImageSlider } from '@/hooks/useSlideEvent';
import Image from 'next/image';
interface ImageSliderProps {
  images?: string[];
  startIndex?: number;
  showPagination?: boolean;
  floatingButton?: React.ReactNode;
}

const TagPagination = ({ currentPage, lastPage }: { currentPage: number; lastPage: number }) => {
  return (
    <div className="absolute text-white bg-gray-900/40 backdrop-blur-sm  bottom-5 right-5 py-1 px-[14px] font-semibold rounded-2xl text-[11px]">
      <span className="">{currentPage + 1}</span>
      <span className="mx-1 opacity-50">&#183;</span>
      <span className="opacity-50">{lastPage}</span>
    </div>
  );
};
TagPagination.displayName = 'TagPagination';

// 개별 슬라이드 컴포넌트 분리 및 메모이제이션
const SlideItem = memo(
  ({
    image,
    index,
    floatingButton,
  }: {
    image: string;
    index: number;
    currentIndex: number;
    floatingButton?: React.ReactNode;
  }) => (
    <div className="min-w-full h-full flex-shrink-0 relative">
      <Image
        src={image}
        alt={`slider image ${index + 1}`}
        priority={index === 0} // 현재 이미지와 다음 이미지만 priority
        fill
        objectFit="cover"
        draggable={false}
      />
      {floatingButton}
    </div>
  ),
);

SlideItem.displayName = 'SlideItem';

const ImageSlider = ({
  images = ['https://placehold.co/400'],
  startIndex = 0,
  showPagination = true,
  floatingButton,
}: ImageSliderProps) => {
  const {
    currentIndex,
    touchStart,
    touchEnd,
    isDragging,
    sliderRef,
    handleTouchStart,
    handleTouchMove,
    handleDragEnd,
    handleMouseDown,
    handleMouseMove,
  } = useImageSlider({ images, startIndex });

  // 드래그시 트랜스폼 스타일 계산
  const getTransformStyle = useCallback<() => string>(() => {
    if (isDragging) {
      const dragDistance = touchEnd - touchStart;
      const baseTransform = -currentIndex * 100;
      const dragPercentage = (dragDistance / (sliderRef.current?.offsetWidth ?? 1)) * 100;
      return `translateX(${baseTransform + dragPercentage}%)`;
    }
    return `translateX(-${currentIndex * 100}%)`;
  }, [currentIndex, isDragging, sliderRef, touchEnd, touchStart]);

  return (
    <div className="slider-container">
      <div
        ref={sliderRef}
        className="slider-wrapper"
        style={{
          transform: getTransformStyle(),
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}>
        {images.map((image, index) => (
          <SlideItem
            key={`slider-${index}`}
            image={image}
            index={index}
            currentIndex={currentIndex}
            floatingButton={floatingButton}
          />
        ))}
      </div>

      {showPagination && <TagPagination currentPage={currentIndex} lastPage={images.length} />}
    </div>
  );
};

export default ImageSlider;
