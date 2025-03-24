import { changeStockQuantity } from '@/lib/api/bakery';
import useBaseBottomSheet from './useBaseBottomSheet';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const useProductStockBottomSheet = ({
  initStock,
  bakeryId,
  productId,
}: {
  initStock: number;
  bakeryId: number;
  productId: number;
}) => {
  const [stockQuantityInput, setStockQuantityInput] = useState<string>(String(initStock));
  const { isOpen, dispatch } = useBaseBottomSheet();
  const queryClient = useQueryClient();

  const handleChangeProductStock = (stock: number) => {
    // 빵집 상품 stock 변경 API 호출
    changeStockQuantity(bakeryId, productId, stock);
    dispatch.close();
    // 삥집 메뉴 api 호출
    queryClient.invalidateQueries({ queryKey: ['bakery', bakeryId, 'products'] });
  };

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    handleChangeProductStock,
    handleStockQuantityInput: setStockQuantityInput,
    stockQuantityInput,
  };
};

export default useProductStockBottomSheet;
