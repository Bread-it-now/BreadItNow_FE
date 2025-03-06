'use client';
import { useCallback } from 'react';
import { useImageSlider } from '@/hooks/useSlideEvent';
interface ImageSliderProps {
  images?: string[];
  startIndex?: number;
}

function TagPagination({ currentPage, lastPage }: { currentPage: number; lastPage: number }) {
  return (
    <div className="absolute bg-gray-900 backdrop-blur-[20px] bg-opacity-40 bottom-5 right-5 py-1 px-[14px] font-semibold rounded-2xl text-[11px]">
      {currentPage + 1}
      <span className="px-1">&#183;</span>
      {lastPage}
    </div>
  );
}

const ImageSlider = ({
  images = ['https://placehold.co/300x400', 'https://placehold.co/600x400', 'https://placehold.co/800x1000'],
  startIndex = 0,
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
          <div key={`slider-${index}`} className="min-w-full h-full">
            <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${image})` }} />
          </div>
        ))}
      </div>

      <TagPagination currentPage={currentIndex} lastPage={images.length} />
    </div>
  );
};

export default ImageSlider;
