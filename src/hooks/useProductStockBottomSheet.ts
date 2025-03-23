import useBaseBottomSheet from './useBaseBottomSheet';

const useProductStockBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const changeStockMutate = () => {};

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    changeStockMutate,
  };
};

export default useProductStockBottomSheet;
