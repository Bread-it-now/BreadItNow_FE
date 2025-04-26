import { useState } from 'react';
import useBaseBottomSheet from './useBaseBottomSheet';
import { deleteProducts } from '@/lib/api/bakery';

const useDeleteProductsBottomSheet = (bakeryId: number) => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const deleteSelectedProducts = () => {
    deleteProducts(bakeryId, selectedProductIds);

    setSelectedProductIds([]);
  };

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    handleSelectedProductIds: setSelectedProductIds,
    selectedProductIds,
    deleteProducts: deleteSelectedProducts,
  };
};

export default useDeleteProductsBottomSheet;
