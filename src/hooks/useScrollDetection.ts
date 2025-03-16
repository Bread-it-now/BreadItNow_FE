import { useEffect, useState, RefObject } from 'react';

export function useScrollDetection(ref: RefObject<HTMLDivElement | null>) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollElement = ref.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      setIsScrolled(scrollElement.scrollTop > 50);
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return isScrolled;
}
