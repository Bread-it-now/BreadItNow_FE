"use client";
import { useState, useRef, TouchEvent, MouseEvent, useCallback } from "react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  // 이미지 인덱스 변경 로직
  const updateIndex = useCallback(
    (direction: "next" | "prev") => {
      setCurrentIndex((prevIndex) => {
        if (direction === "next") {
          return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        }
        return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      });
    },
    [images.length],
  );

  // 터치 시작 핸들러
  const handleTouchStart = useCallback((e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
    setIsDragging(true);
  }, []);

  // 터치 이동 핸들러
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      setTouchEnd(e.targetTouches[0].clientX);
    },
    [isDragging],
  );

  // 마우스 다운 핸들러
  const handleMouseDown = useCallback((e: MouseEvent) => {
    setIsDragging(true);
    setTouchStart(e.clientX);
    setTouchEnd(e.clientX);
  }, []);

  // 마우스 이동 핸들러
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setTouchEnd(e.clientX);
    },
    [isDragging],
  );

  // 드래그 종료 처리
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    // 터치 이동 거리 계산
    const swipeDistance = touchEnd - touchStart;
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      updateIndex(swipeDistance > 0 ? "prev" : "next");
    }

    setIsDragging(false);
    setTouchStart(0);
    setTouchEnd(0);
  }, [isDragging, touchEnd, touchStart, updateIndex]);

  // 트랜지션 스타일 계산
  const getTransformStyle = useCallback(() => {
    if (isDragging) {
      const dragDistance = touchEnd - touchStart;
      const baseTransform = -currentIndex * 100;
      const dragPercentage =
        (dragDistance / (sliderRef.current?.offsetWidth ?? 1)) * 100;
      return `translateX(${baseTransform + dragPercentage}%)`;
    }
    return `translateX(-${currentIndex * 100}%)`;
  }, [currentIndex, isDragging, touchEnd, touchStart]);

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
          {" "}
          {currentIndex}.{images.length}
        </div>
        {/* {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full cursor-pointer transition-colors
              ${currentIndex === index ? "bg-white" : "bg-white/50"}`}
          />
        ))} */}
      </div>
    </div>
  );
};

export default ImageSlider;
