'use client';
import Button from '@/components/button/Button';
import HotBreadTab from '@/components/common/tabs/HotBreadTab';
import { useBakeryProducts } from '@/lib/api/bakery';
import { useState } from 'react';
import Stack from '@/components/common/stack/Stack';
import { Product } from '@/types/bakery';
import ProductCard from '@/components/productcard/ProductCard';

const HEADER_TABS = [
  { key: 'bakeryInfo', label: '빵집정보' },
  { key: 'bakeryProducts', label: '빵집 메뉴' },
];

const bakeryId = 1;

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>('bakeryProducts');
  const { data: productsInfo } = useBakeryProducts(bakeryId);
  return (
    <div className={`bg-gray-100 flex flex-col ${activeTab === 'bakeryInfo' ? 'gap-[10px]' : ''}`}>
      <HotBreadTab tabs={HEADER_TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'bakeryInfo' ? (
        <div></div>
      ) : (
        <div className="flex flex-col bg-gray-50 w-full">
          <section className="flex items-center justify-between pt-6 px-5 pb-[30px] gap-5 rounded-b-2xl bg-white">
            <div className="flex items-center gap-2">
              <Button variant="default" onClick={() => {}} className="w-[77px] h-9">
                순서변겅
              </Button>
              <Button variant="default" onClick={() => {}} className="w-[77px] h-9">
                메뉴삭제
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="primary" onClick={() => {}} className="w-[100px] h-9">
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
                      />
                    ))}
                  </Stack>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
