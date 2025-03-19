import useBaseBottomSheet from './useBaseBottomSheet';

const useProductHideManagementBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
  };
};

export default useProductHideManagementBottomSheet;
