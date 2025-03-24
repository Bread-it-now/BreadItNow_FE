import { useState } from 'react';
import useBaseBottomSheet from './useBaseBottomSheet';

const useManageOperatingStatusBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const [temporaryClosingTimeStep, setTemporaryClosingTimeStep] = useState<number>(0);
  const [temporaryClosingTime, setTemporaryClosingTime] = useState<string>('');

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    temporaryClosingTimeStep,
    setTemporaryClosingTimeStep,
    temporaryClosingTime,
    setTemporaryClosingTime,
  };
};

export default useManageOperatingStatusBottomSheet;
