import { useEffect, useState } from 'react';

export const useBottomSheetAnimation = (isOpen: boolean) => {
  const [bottomSheetRoot, setBottomSheetRoot] = useState<HTMLElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(isOpen);

  useEffect(() => {
    const rootElement = document.getElementById('bottomsheet-root');
    if (rootElement) {
      setBottomSheetRoot(rootElement);
    }
  }, []);

  useEffect(() => {
    if (isOpen && bottomSheetRoot) {
      setIsAnimating(true);
      bottomSheetRoot.style.setProperty('overflow', 'hidden');
    }
  }, [isOpen, bottomSheetRoot]);

  const handleBottomSheetAnimationEnd = () => {
    if (!isOpen && bottomSheetRoot) {
      setIsAnimating(false);
      bottomSheetRoot.style.setProperty('overflow', '');
    }
  };

  return { bottomSheetRoot, isAnimating, handleBottomSheetAnimationEnd };
};
