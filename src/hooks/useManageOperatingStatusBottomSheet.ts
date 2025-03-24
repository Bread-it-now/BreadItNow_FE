import { useState } from 'react';
import useBaseBottomSheet from './useBaseBottomSheet';
import { OPERATING_STATUS } from '@/types/bakery';

const useManageOperatingStatusBottomSheet = (operatingStatus: keyof typeof OPERATING_STATUS) => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const [breakTime, setBreakTime] = useState<number>(0);
  const [isTemporaryClosed, setIsTemporaryClosed] = useState<boolean>(operatingStatus === 'TEMPORARY_CLOSED');

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    isTemporaryClosed,
    setIsTemporaryClosed,
    breakTime,
    setBreakTime,
  };
};

export default useManageOperatingStatusBottomSheet;
