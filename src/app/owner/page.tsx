'use client';
import OperatingStatusCard from '@/components/operatingstatuscard/OperatingStatusCard';
import ProductStockCard from '@/components/productstockcard/ProductStockCard';
import Stack from '@/components/common/stack/Stack';
import Button from '@/components/button/Button';
import { useBakeryInfo, useBakeryProducts } from '@/lib/api/bakery';
import { OperatingInfo, Product } from '@/types/bakery';
import { Fragment, useState } from 'react';
import useProductHideManagementBottomSheet from '@/hooks/useProductHideManagementBottomSheet';
import BottomSheet from '@/components/bottomsheet/Bottomsheet';

const bakeryId: number = 1;

/** 로그인 시 가져온 bakeryId를 통해 빵집 정보 호출 */

const OperatingSection = ({ name }: { bakeryId: number; operatingInfo: OperatingInfo; name: string }) => {
  return (
    <Fragment>
      <section className="w-full bg-white rounded-b-[0.625rem]">
        <OperatingStatusCard name={name} operatingStatus="TEMPORARY_CLOSED" type="GENERAL" />
      </section>
      <section className="w-full bg-white rounded-[0.625rem]">
        <OperatingStatusCard operatingStatus="TEMPORARY_CLOSED" type="TEMPORARY" />
      </section>
    </Fragment>
  );
};

export default function Page() {
  const { data: bakery } = useBakeryInfo(bakeryId);
  const { data: productsInfo } = useBakeryProducts(bakeryId);
  const [activeChangeProductIds, setActiveChangeProductIds] = useState<number[]>([]);

  const {
    isOpen: isProductHideManagementBottomSheetOpen,
    open: openProductHideManagementBottomSheet,
    close: closeProductHideManagementBottomSheet,
  } = useProductHideManagementBottomSheet();

  return (
    <div className="flex flex-col items-start gap-[10px] w-full bg-gray100">
      {bakery && (
        <OperatingSection
          bakeryId={bakeryId}
          operatingInfo={{ openTime: bakery?.openTime, operatingStatus: bakery?.operatingStatus }}
          name={bakery?.name}
        />
      )}
      {productsInfo && (
        <Fragment>
          <section className="flex flex-col items-start px-5 py-[1.875rem] gap-6 w-full bg-white rounded-2xl">
            <div className="flex justify-between items-center gap-[0.625rem] w-full">
              <p className="text-title-content-m text-gray900">예약 상품</p>
              <Button scale="xsmall" onClick={() => openProductHideManagementBottomSheet()} className="w-[105px]">
                메뉴 숨김 관리
              </Button>
            </div>
            <div className="flex flex-col items-start w-full">
              <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
                {productsInfo.breadProducts.map((product: Product) => (
                  <ProductStockCard
                    key={`${product.productId}-${product.name}`}
                    {...product}
                    handleProductActiveChange={setActiveChangeProductIds}
                  />
                ))}
                {productsInfo.otherProducts.map((product: Product) => (
                  <ProductStockCard
                    key={`${product.productId}-${product.name}`}
                    {...product}
                    handleProductActiveChange={setActiveChangeProductIds}
                  />
                ))}
              </Stack>
            </div>
          </section>
          <BottomSheet
            isOpen={isProductHideManagementBottomSheetOpen}
            onClose={closeProductHideManagementBottomSheet}
            fullHeight
            title="메뉴 숨김 관리"
            confirmText="확인"
            onConfirm={() => {}}
            confirmDisabled={activeChangeProductIds.length === 0}>
            <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
              {productsInfo.breadProducts.map((product: Product) => (
                <ProductStockCard
                  key={`${product.productId}-${product.name}`}
                  {...product}
                  isEditProductActive
                  isActive={activeChangeProductIds.includes(product.productId) ? !product.isActive : product.isActive}
                  handleProductActiveChange={setActiveChangeProductIds}
                />
              ))}
              {productsInfo.otherProducts.map((product: Product) => (
                <ProductStockCard
                  key={`${product.productId}-${product.name}`}
                  {...product}
                  isEditProductActive
                  isActive={activeChangeProductIds.includes(product.productId) ? !product.isActive : product.isActive}
                  handleProductActiveChange={setActiveChangeProductIds}
                />
              ))}
            </Stack>
          </BottomSheet>
        </Fragment>
      )}
    </div>
  );
}
