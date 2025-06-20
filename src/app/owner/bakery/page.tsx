'use client';
import HotBreadTab from '@/components/common/tabs/HotBreadTab';
import { useState } from 'react';
import BottomSheet, { BottomSheetProps } from '@/components/bottomsheet/Bottomsheet';
import { useReservationBottomSheet } from '@/hooks/useReservationBottomSheet';
import EditBakeryTab from '@/components/common/tabs/EditBakeryTab';
import Button from '@/components/button/Button';
import { useBakeryProducts } from '@/lib/api/bakery';
import Stack from '@/components/common/stack/Stack';
import { Product } from '@/types/bakery';
import ProductCard from '@/components/productcard/ProductCard';
import useEditProductBottomSheet from '@/hooks/useEditProductBottomSheet';
import Edit from '@/assets/icons/edit.svg';
import Delete from '@/assets/icons/delete.svg';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { BAKERY_QUERY_KEY } from '@/constants/queryKey';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import useDeleteProductsBottomSheet from '@/hooks/useDeleteProductsBottomSheet';
import useReorderProductsBottomSheet from '@/hooks/useReorderProductsBottomSheet';
import ReorderProductsBottomSheet from '@/components/bottomsheet/ReorderProductsBottomSheet/ReorderProductsBottomSheet';

const HEADER_TABS = [
  { key: 'bakeryInfo', label: '빵집정보' },
  { key: 'bakeryProducts', label: '빵집 메뉴' },
];

const bakeryId = 1;

const BottomSheetContainer = ({
  isOpen,
  close,
  bototmSheetProps,
}: {
  isOpen: boolean;
  close: () => void;
  bototmSheetProps: BottomSheetProps | undefined;
}) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={close}
      onConfirm={bototmSheetProps?.onConfirm}
      title={bototmSheetProps?.title}
      cancelText={bototmSheetProps?.cancelText}
      confirmText={bototmSheetProps?.confirmText}
      maxContentHeight={500}
      fullHeight={false}
      bgColor={bototmSheetProps?.bgColor}>
      {bototmSheetProps?.children}
    </BottomSheet>
  );
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>('bakeryProducts');
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: productsInfo } = useBakeryProducts(bakeryId);

  const {
    isOpen: isEditProductBottomSheetOpen,
    open: openEditProductBottomSheet,
    close: closeEditProductBottomSheet,
    handleEditProductId,
    deleteProduct,
    moveEditPage,
  } = useEditProductBottomSheet(bakeryId);
  const {
    isOpen: isDeleteProductsBottomSheetOpen,
    open: openDeleteProductsBottomSheet,
    close: closeDeleteProductsBottomSheet,
    handleSelectedProductIds,
    selectedProductIds,
    deleteProducts,
  } = useDeleteProductsBottomSheet(bakeryId);

  const {
    open: openReorderProductsBottomSheet,
    isOpen: isReorderProductsBottomSheetOpen,
    close: closeReorderProductsBottomSheet,
    reorderProducts,
  } = useReorderProductsBottomSheet(bakeryId);

  const { isOpen, open, close } = useReservationBottomSheet();
  const [bototmSheetProps, setBottomSheetProps] = useState<BottomSheetProps>();
  return (
    <div className={`bg-gray-100 flex flex-col ${activeTab === 'bakeryInfo' ? 'gap-[10px]' : ''}`}>
      <HotBreadTab tabs={HEADER_TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'bakeryInfo' ? (
        <>
          <BottomSheetContainer isOpen={isOpen} close={close} bototmSheetProps={bototmSheetProps} />
          <EditBakeryTab open={open} setBottomSheetProps={setBottomSheetProps} close={close} />
        </>
      ) : (
        <div className="flex flex-col bg-gray-50 w-full">
          <section className="flex items-center justify-between pt-6 px-5 pb-[30px] gap-5 rounded-b-2xl bg-white">
            <div className="flex items-center gap-2">
              <Button variant="default" onClick={() => openReorderProductsBottomSheet()} className="w-[77px] h-9">
                순서변겅
              </Button>
              <Button variant="default" onClick={() => openDeleteProductsBottomSheet()} className="w-[77px] h-9">
                메뉴삭제
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                onClick={() => router.push(ROUTES.OWNER.BAKERY.ADD_MENU)}
                className="w-[100px] h-9">
                + 메뉴 추가
              </Button>
            </div>
          </section>
          <section className="flex flex-col items-start bg-gray50">
            <div className="flex flex-start p-5 text-title-content-s">
              총 &nbsp;<span className="text-primary font-semibold">{productsInfo?.totalCount || 0}</span>개
            </div>
          </section>
          <section className="flex flex-col items-start gap-[10px]">
            <div className="flex flex-col itmes-center px-5 py-[30px] gap-6 w-full rounded-2xl bg-white">
              <p className="text-title-content-l font-semibold">빵류</p>
              <div className="flex flex-col justify-center items-start gap-4 w-full h-full min-[133px]">
                {productsInfo && (
                  <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
                    {productsInfo?.breadProducts.map((product: Product) => (
                      <ProductCard
                        key={`${product.productId}-${product.name}`}
                        {...product}
                        isCategoryVisible
                        isDescriptionVisible
                        isReleaseTimesVisible
                        isProductInfoAlignStart
                        profileSize="large"
                        className="hover:cursor-pointer"
                        onClick={() => {
                          openEditProductBottomSheet();
                          handleEditProductId(product.productId);
                        }}
                      />
                    ))}
                  </Stack>
                )}
              </div>
            </div>
            <div className="flex flex-col itmes-center px-5 py-[30px] gap-6 w-full rounded-2xl bg-white">
              <p className="text-title-content-l font-semibold">기타</p>
              <div className="flex flex-col justify-center items-start gap-4 w-full h-full min-[133px]">
                {productsInfo && (
                  <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
                    {productsInfo?.otherProducts.map((product: Product) => (
                      <ProductCard
                        key={`${product.productId}-${product.name}`}
                        {...product}
                        isCategoryVisible
                        isDescriptionVisible
                        isReleaseTimesVisible
                        isProductInfoAlignStart
                        profileSize="large"
                        onClick={() => {
                          openEditProductBottomSheet();
                          handleEditProductId(product.productId);
                        }}
                        className="hover:cursor-pointer"
                      />
                    ))}
                  </Stack>
                )}
              </div>
            </div>
          </section>
          {isEditProductBottomSheetOpen && (
            <BottomSheet
              isOpen={isEditProductBottomSheetOpen}
              onClose={closeEditProductBottomSheet}
              bgColor="bg-gray50"
              className="mb-0 pb-5">
              <div className="flex flex-col items-start gap-[10px] w-full ">
                <div
                  className="flex justify-between p-5 w-full h-[[64px] bg-white rounded-[10px] text-title-subtitle font-medium hover:cursor-pointer hover:opacity-70"
                  onClick={() => moveEditPage()}>
                  <span>수정</span>
                  <Image src={Edit} width={24} height={24} alt="edit" />
                </div>
                <div
                  className="flex justify-between p-5 w-full h-[[64px] bg-white rounded-[10px] text-title-subtitle font-medium hover:cursor-pointer hover:opacity-70"
                  onClick={() => {
                    deleteProduct();
                    closeEditProductBottomSheet();
                    queryClient.invalidateQueries({
                      queryKey: [...BAKERY_QUERY_KEY.BAKERY_PRODUCTS(bakeryId)],
                    });
                  }}>
                  <span>삭제</span>
                  <Image src={Delete} width={24} height={24} alt="delete" />
                </div>
              </div>
            </BottomSheet>
          )}
          {isDeleteProductsBottomSheetOpen && (
            <BottomSheet
              isOpen={isDeleteProductsBottomSheetOpen}
              onClose={closeDeleteProductsBottomSheet}
              fullHeight
              title="메뉴 삭제"
              confirmText="삭제"
              onConfirm={() => {
                deleteProducts();
                closeDeleteProductsBottomSheet();
                queryClient.invalidateQueries({
                  queryKey: [...BAKERY_QUERY_KEY.BAKERY_PRODUCTS(bakeryId)],
                });
              }}
              confirmDisabled={selectedProductIds.length === 0}>
              {productsInfo && (
                <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
                  {productsInfo.breadProducts.map((product: Product) => (
                    <ProductCard
                      key={`${product.productId}-${product.name}`}
                      {...product}
                      checked={selectedProductIds.includes(product.productId)}
                      handleChecked={handleSelectedProductIds}
                    />
                  ))}
                  {productsInfo.otherProducts.map((product: Product) => (
                    <ProductCard
                      key={`${product.productId}-${product.name}`}
                      {...product}
                      checked={selectedProductIds.includes(product.productId)}
                      handleChecked={handleSelectedProductIds}
                    />
                  ))}
                </Stack>
              )}
            </BottomSheet>
          )}
          {productsInfo && isReorderProductsBottomSheetOpen && (
            <ReorderProductsBottomSheet
              productsInfo={productsInfo}
              close={closeReorderProductsBottomSheet}
              isOpen={isReorderProductsBottomSheetOpen}
              reorderProducts={reorderProducts}
              bakeryId={bakeryId}
            />
          )}
        </div>
      )}
    </div>
  );
}
