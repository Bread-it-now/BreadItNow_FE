import { useCallback, useRef, TouchEvent, MouseEvent, useState } from 'react';

interface SlideEventProps {
  minSwipeDistance?: number;
  images: string[];
  startIndex: number;
}

export const useImageSlider = ({ images, minSwipeDistance = 50, startIndex = 0 }: SlideEventProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(startIndex);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  // 이미지 인덱스 변경 로직
  const updateIndex = useCallback(
    (direction: 'next' | 'prev') => {
      setCurrentIndex((prevIndex: number) => {
        if (direction === 'next') {
          return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        }
        return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      });
    },
    [images.length],
  );

  // 터치 시작 핸들러
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  // 터치 이동 핸들러
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      setTouchEnd(e.targetTouches[0].clientX);
    },
    [isDragging],
  );

  // 마우스 다운 핸들러
  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setTouchStart(e.clientX);
    setTouchEnd(e.clientX);
  };

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
      updateIndex(swipeDistance > 0 ? 'prev' : 'next');
    }

    setIsDragging(false);
    setTouchStart(0);
    setTouchEnd(0);
  }, [isDragging, minSwipeDistance, touchEnd, touchStart, updateIndex]);

  return {
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
  };
};
