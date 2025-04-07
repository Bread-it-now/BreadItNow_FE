import { useState } from 'react';
import useBaseBottomSheet from './useBaseBottomSheet';
import { deleteProduct } from '@/lib/api/bakery';
import { useRouter } from 'next/navigation';
import { BAKERY_PREFIX, OWNER_PREFIX } from '@/constants/routes';

const useEditProductBottomSheet = (bakeryId: number) => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const router = useRouter();
  const [editProductId, setEditProductId] = useState<number | null>(null);

  const deleteSelectedProduct = () => {
    if (editProductId) {
      deleteProduct(bakeryId, editProductId);
    }
    setEditProductId(null);
  };

  const moveEditPage = () => {
    router.push(`/${OWNER_PREFIX}/${BAKERY_PREFIX}/edit-menu/${editProductId}`);
    setEditProductId(null);
  };

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    deleteProduct: deleteSelectedProduct,
    handleEditProductId: setEditProductId,
    moveEditPage,
  };
};

export default useEditProductBottomSheet;
