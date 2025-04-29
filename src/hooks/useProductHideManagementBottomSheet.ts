import { hideProducts } from '@/lib/api/bakery';
import useBaseBottomSheet from './useBaseBottomSheet';

const useProductHideManagementBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const hideProductsMutate = (bakeryId: number, productsIds: number[]) => {
    hideProducts(bakeryId, productsIds);
  };

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    hideProductsMutate,
  };
};

export default useProductHideManagementBottomSheet;
