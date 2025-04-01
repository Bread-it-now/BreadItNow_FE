import { useState } from 'react';
import useBaseBottomSheet from './useBaseBottomSheet';
import { deleteProduct } from '@/lib/api/bakery';

const useEditProductBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const deleteSelectedProduct = (bakeryId: number) => {
    if (editProductId) {
      deleteProduct(bakeryId, editProductId);
    }
    setEditProductId(null);
  };

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    deleteProduct: deleteSelectedProduct,
    handleEditProductId: setEditProductId,
  };
};

export default useEditProductBottomSheet;
