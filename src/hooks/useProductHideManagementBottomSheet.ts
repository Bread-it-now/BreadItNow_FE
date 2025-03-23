import useBaseBottomSheet from './useBaseBottomSheet';

const useProductHideManagementBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const hideMenuMutate = () => {};

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    hideMenuMutate,
  };
};

export default useProductHideManagementBottomSheet;
