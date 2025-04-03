import useBaseBottomSheet from './useBaseBottomSheet';

const useReorderProductsBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();

  const handleDragStart = () => {};
  const reorderProducts = () => {};

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    reorderProducts,
    handleDragStart,
  };
};

export default useReorderProductsBottomSheet;
