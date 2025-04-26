'use client';
import React, { useRef, useState, useEffect, SetStateAction, Dispatch } from 'react';

interface WheelProps {
  items: (string | number)[];
  onChange?: (value: string | number) => void;
  initialIndex?: number;
  cyclic?: boolean;
  itemHeight?: number;
  visibleRange?: number;
}

const Wheel = ({
  items,
  itemHeight = 44,
  visibleRange = 3,
  onChange,
  initialIndex = 0,
  cyclic = false,
}: WheelProps) => {
  interface CustomDivElement extends HTMLDivElement {
    _scrollTimeout?: ReturnType<typeof setTimeout> | undefined;
  }
  const wrapperRef = useRef<(HTMLDivElement & { _scrollTimeout?: ReturnType<typeof setTimeout> | undefined }) | null>(
    null,
  );
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);

  const isAMPM = items.length === 2 && items.includes('AM') && items.includes('PM');

  useEffect(() => {
    const node = wrapperRef.current;
    if (node) {
      const scrollIndex = isAMPM ? initialIndex : visibleRange;
      node.scrollTop = scrollIndex * itemHeight;
      setSelectedIndex(initialIndex);
      onChange?.(items[initialIndex]);
    }
  }, [initialIndex]);

  const getItemAtIndex = (index: number) => {
    if (cyclic && !isAMPM) {
      const len = items.length;
      return items[((index % len) + len) % len];
    } else {
      return items[index] ?? null;
    }
  };

  const handleScroll = () => {
    const node = wrapperRef.current;
    if (!node) return;
    if (node._scrollTimeout !== undefined) {
      clearTimeout(node._scrollTimeout);
    }

    (node as CustomDivElement)._scrollTimeout = setTimeout(() => {
      const rawIndex = node.scrollTop / itemHeight;
      const offsetIndex = Math.round(rawIndex) - (isAMPM ? 0 : visibleRange);

      const newIndex =
        cyclic && !isAMPM
          ? (((selectedIndex + offsetIndex) % items.length) + items.length) % items.length
          : Math.max(0, Math.min(isAMPM ? offsetIndex : selectedIndex + offsetIndex, items.length - 1));

      setSelectedIndex(newIndex);
      const scrollTop = isAMPM ? newIndex * itemHeight : visibleRange * itemHeight;
      node.scrollTo({ top: scrollTop, behavior: 'smooth' });
      onChange?.(items[newIndex]);
    }, 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const node = wrapperRef.current;
    if (!node) return;
    isDragging.current = true;
    startY.current = e.clientY;
    startScrollTop.current = node.scrollTop;
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    const node = wrapperRef.current;
    if (!node || !isDragging.current) return;
    const dy = e.clientY - startY.current;
    node.scrollTop = startScrollTop.current - dy;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const displayedItems = isAMPM
    ? Array.from({ length: items.length }, (_, i) => {
        const item = items[i];
        const offset = i - selectedIndex;
        return { item, offset, key: i };
      })
    : Array.from({ length: visibleRange * 2 + 1 }, (_, i) => {
        const offset = i - visibleRange;
        const index = selectedIndex + offset;
        const item = getItemAtIndex(index);
        return { item, offset, key: index };
      });

  return (
    <div
      ref={wrapperRef}
      onScroll={handleScroll}
      onMouseDown={handleMouseDown}
      className="relative h-[220px] w-16 overflow-y-scroll no-scrollbar cursor-pointer overflow-hidden"
      style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="flex flex-col items-center py-[88px]">
        {displayedItems.map(({ item, offset, key }, index) => {
          if (item === null) return null;

          const opacity = isAMPM ? 1 : 1 - Math.abs(offset) * 0.2;
          const rotateX = isAMPM ? 0 : offset * 25;

          return (
            <div
              key={`${key}-${index}-${offset}`}
              className="h-[44px] flex items-center justify-center snap-center transition-all duration-200 ease-in-out"
              style={{
                transform: `rotateX(${rotateX}deg) scale(1)`,
                opacity,
                transformOrigin: 'center',
              }}>
              <span className={`text-[24px] ${offset === 0 ? 'text-black' : 'text-gray400'}`}>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface WheelTimePickerProps {
  handleSelectedTime: Dispatch<SetStateAction<{ hours: number; minutes: number; ampm: 'AM' | 'PM' }>>;
  initTime: { hours: number; minutes: number; ampm: 'AM' | 'PM' };
}
const WheelTimePicker = ({ handleSelectedTime, initTime }: WheelTimePickerProps) => {
  const hours = Array.from({ length: 12 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const ampmList = ['AM', 'PM'];

  return (
    <div className="flex justify-center items-center bg-gray50 w-full">
      <Wheel
        items={hours}
        initialIndex={initTime.hours}
        onChange={(v) => handleSelectedTime((prev) => ({ ...prev, hours: Number(v) }))}
        cyclic
      />
      <Wheel
        items={minutes}
        initialIndex={initTime.minutes}
        onChange={(v) => handleSelectedTime((prev) => ({ ...prev, minutes: Number(v) }))}
        cyclic
      />
      <Wheel
        items={ampmList}
        initialIndex={initTime.ampm === 'PM' ? 1 : 0}
        onChange={(v) => handleSelectedTime((prev) => ({ ...prev, ampm: v as 'AM' | 'PM' }))}
        cyclic={false}
      />
    </div>
  );
};

export default WheelTimePicker;
