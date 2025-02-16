"use client";
import { useCallback } from "react";
import { useImageSlider } from "@/hooks/useSlideEvent";
interface ImageSliderProps {
  images?: string[];
}

const ImageSlider = ({
  images = [
    "https://placehold.co/300x600",
    "https://placehold.co/600x400",
    "https://placehold.co/800x1000",
  ],
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
  } = useImageSlider({ images });

  // 드래그시 트랜스폼 스타일 계산
  const getTransformStyle = useCallback<() => string>(() => {
    if (isDragging) {
      const dragDistance = touchEnd - touchStart;
      const baseTransform = -currentIndex * 100;
      const dragPercentage =
        (dragDistance / (sliderRef.current?.offsetWidth ?? 1)) * 100;
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
        onMouseLeave={handleDragEnd}
      >
        {images.map((image) => (
          <div key={image} className="min-w-full h-full">
            <div
              className="w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div>
          {currentIndex}.{images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
