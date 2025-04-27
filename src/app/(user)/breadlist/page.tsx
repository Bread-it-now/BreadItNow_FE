'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Back from '@/assets/icons/back.svg';
import HotBreadTab from '@/components/common/tabs/HotBreadTab';
import BreadCard from '@/components/bakerycard/BreadCard';
import { useHotProducts } from '@/lib/api/bakery';
import { HotFilterKey, HotProduct } from '@/types/bakery';
import EmptyState from '@/components/common/EmptyState';

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<HotFilterKey>('reservation');

  return (
    <div className="w-full h-[100%] flex flex-col">
      <div className="sticky top-0 z-20">
        <div className="flex items-center p-4">
          <Image src={Back} alt="Back" className="w-6 h-6 cursor-pointer" onClick={() => router.push('/')} />
        </div>

        <HotBreadTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={[
            { key: 'reservation', label: '핫한 빵' },
            { key: 'favorite', label: '인기 빵' },
          ]}
        />
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div>
          <h2 className="text-xl font-bold text-gray900 mt-4 mb-1">
            {activeTab === 'reservation' ? '핫한 빵' : '인기 빵'}
          </h2>
          <p className="mb-4 text-gray500 text-[13px]">
            {activeTab === 'reservation' ? '최근 한 달 간 예약이 많은 순' : '즐겨찾기 많은 순'}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <ProductList filterKey={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductList = ({ filterKey }: { filterKey: HotFilterKey }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useHotProducts({ size: 10, sort: filterKey });
  const observerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  return (
    <>
      {data?.pages[0].data.hotProducts.length !== 0 ? (
        data?.pages.map((page) =>
          page.data.hotProducts.map((product: HotProduct) => (
            <BreadCard
              key={product.productId}
              id={product.productId}
              bakeryId={product.bakeryId}
              profileImgUrl={product.image}
              name={product.productName}
              bakeryName={product.bakeryName}
              price={product.price}
              isShowBookmark
              stock={product.stock}
              direction="column"
              isBookmarked={product.isFavorite}
            />
          )),
        )
      ) : (
        <EmptyState title={`${filterKey === 'favorite' ? '핫한 빵' : '인기 빵'}이 없습니다.`} />
      )}
      <div ref={observerRef} />
      {isFetchingNextPage && <p />}
    </>
  );
};
