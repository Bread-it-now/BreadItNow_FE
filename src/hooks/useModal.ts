import { useMemo, useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const dispatch = useMemo(
    () => ({ open, close }),

    [],
  );

  return {
    isOpen,
    dispatch,
  };
};

export default useModal;
