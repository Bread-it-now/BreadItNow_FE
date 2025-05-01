import useBaseBottomSheet from './useBaseBottomSheet';

export const useReservationBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();

  const handleAddReservation = () => {};

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    handleAddReservation,
    title: '예약하기',
  };
};
