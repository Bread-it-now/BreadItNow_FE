'use client';
import { BakeryProducts, Product, ProductOrder } from '@/types/bakery';
import { useQueryClient } from '@tanstack/react-query';
import { SetStateAction, useEffect, useState } from 'react';
import BottomSheet from '../Bottomsheet';
import { BAKERY_QUERY_KEY } from '@/constants/queryKey';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ProductCard from '@/components/productcard/ProductCard';
import Stack from '@/components/common/stack/Stack';

const ReorderProductsBottomSheet = ({
  productsInfo,
  close,
  isOpen,
  reorderProducts,
  bakeryId,
}: {
  productsInfo: BakeryProducts;
  close: () => void;
  isOpen: boolean;
  reorderProducts: (productOrders: ProductOrder[]) => void;
  bakeryId: number;
}) => {
  const [reorderedBreadProducts, setReorderedBreadProducts] = useState<ProductOrder[]>([]);
  const [reorderedOtherProducts, setReorderedOtherProducts] = useState<ProductOrder[]>([]);
  const { breadProducts, otherProducts } = productsInfo;
  const queryClient = useQueryClient();

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={close}
      fullHeight
      title="메뉴 순서 변경"
      confirmText="적용"
      onConfirm={() => {
        reorderProducts([...reorderedBreadProducts, ...reorderedOtherProducts]);
        close();
        queryClient.invalidateQueries({
          queryKey: [...BAKERY_QUERY_KEY.BAKERY_PRODUCTS(bakeryId)],
        });
      }}
      confirmDisabled={reorderedBreadProducts.length === 0 && reorderedOtherProducts.length === 0}>
      <div className="flex flex-col itmes-center gap-[30px] w-full bg-white">
        <>
          <SortedProductsList
            initProducts={breadProducts}
            title="빵류"
            startIdx={0}
            handleReorder={setReorderedBreadProducts}
          />
          <SortedProductsList
            initProducts={otherProducts}
            title="기타"
            startIdx={breadProducts.length}
            handleReorder={setReorderedOtherProducts}
          />
        </>
      </div>
    </BottomSheet>
  );
};

const SortableProduct = ({ product }: { product: Product }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: product.productId });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="w-full"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}>
      <ProductCard
        key={`${product.productId}-${product.name}`}
        {...product}
        isDraggable
        className="hover:cursor-pointer"
      />
    </div>
  );
};

const SortedProductsList = ({
  title,
  initProducts,
  startIdx,
  handleReorder,
}: {
  title: string;
  initProducts: Product[];
  startIdx: number;
  handleReorder: React.Dispatch<SetStateAction<ProductOrder[]>>;
}) => {
  const [products, setProducts] = useState<Product[]>([...initProducts]);

  useEffect(() => {
    handleReorderedProducts();
  }, [products]);

  const handleReorderedProducts = () => {
    const _reorderedProducts: { productId: number; order: number }[] = products
      .map((product: Product, idx) => {
        return { productId: product.productId, order: idx + startIdx };
      })
      .filter(({ productId }, idx) => productId !== initProducts[idx].productId);
    handleReorder([..._reorderedProducts]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) return;

    const prevIdx = products.findIndex((product: Product) => product.productId === active.id);
    const newIdx = products.findIndex((product: Product) => product.productId === over?.id);

    if (prevIdx === -1 || newIdx === -1) return;

    setProducts(arrayMove(products, prevIdx, newIdx));
    handleReorderedProducts();
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* 빵류 제품 */}
      <div className="flex flex-col gap-6 w-full rounded-2xl bg-white">
        <p className="text-title-content-l font-semibold">{title}</p>
        <div className="flex flex-col justify-center items-start gap-4 w-full h-full min-[133px]">
          <SortableContext items={products.map((product) => product.productId)} strategy={verticalListSortingStrategy}>
            <Stack divider={<div className="w-full h-[1px] bg-gray-100"></div>}>
              {products.map((product: Product) => (
                <SortableProduct key={`${product.productId}-${product.name}`} product={product} />
              ))}
            </Stack>
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

export default ReorderProductsBottomSheet;
