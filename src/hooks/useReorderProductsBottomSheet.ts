import { ProductOrder } from '@/types/bakery';
import useBaseBottomSheet from './useBaseBottomSheet';
import { reorderProducts } from '@/lib/api/bakery';

const useReorderProductsBottomSheet = (bakeryId: number) => {
  const { isOpen, dispatch } = useBaseBottomSheet();

  const reorder = (productOrders: ProductOrder[]) => {
    reorderProducts(bakeryId, productOrders);
  };

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    reorderProducts: reorder,
  };
};

export default useReorderProductsBottomSheet;
