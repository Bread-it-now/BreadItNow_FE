import { useState } from 'react';
import useBaseBottomSheet from './useBaseBottomSheet';
import { saveTemporaryData } from '@/utils/localStorage';

const useManageOperatingStatusBottomSheet = (bakeryId: number, name: string) => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const [temporaryClosingTimeStep, setTemporaryClosingTimeStep] = useState<number>(0);
  const saveTemporaryClosingTime = (temporaryClosingTime: string) => {
    saveTemporaryData(`${bakeryId}-${name}`, JSON.stringify({ temporaryClosingTime }));
  };

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    temporaryClosingTimeStep,
    setTemporaryClosingTimeStep,
    saveTemporaryClosingTime,
  };
};

export default useManageOperatingStatusBottomSheet;
