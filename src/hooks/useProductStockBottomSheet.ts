import { changeStockQuantity } from '@/lib/api/bakery';
import useBaseBottomSheet from './useBaseBottomSheet';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { BAKERY_QUERY_KEY } from '@/constants/queryKey';

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
    queryClient.invalidateQueries({ queryKey: [...BAKERY_QUERY_KEY.BAKERY_PRODUCTS(bakeryId)] });
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
