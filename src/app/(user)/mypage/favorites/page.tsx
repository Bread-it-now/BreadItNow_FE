'use client';
import HotBreadTab from '@/components/common/tabs/HotBreadTab';
import { useEffect, useRef, useState } from 'react';
import FilterDropdown from '@/components/search/FilterDropdown';
import EmptyState from '@/components/common/EmptyState';
import BakeryCard from '@/components/bakerycard/BakeryCard';
import { FavoriteBakery, FavoriteProduct, FilterKey } from '@/types/bakery';
import BreadCard from '@/components/bakerycard/BreadCard';
import { useFavoriteBakeryList } from '@/lib/api/bakery';

const HEADER_TABS = [
  { key: 'bakery', label: '빵집' },
  { key: 'product', label: '빵' },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>('bakery');
  return (
    <div className="w-full h-[100%] flex flex-col gap-10 bg-white">
      <HotBreadTab tabs={HEADER_TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 overflow-y-auto scrollbar-hide text-gray900">
        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide px-5 text-gray900">
          <div className="flex items-center justify-between">
            <span>
              총{' '}
              <span className="text-primary">
                {activeTab === 'bakery' ? filteredBakeryList.length : filteredBreadList.length}
              </span>{' '}
              개
            </span>
            <FilterDropdown />
          </div>
          <div className="flex flex-col gap-[30px] w-full">
            {activeTab === 'bakery' ? (
              <FavoritBakeryList sort="popular" />
            ) : filteredBreadList.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 p-4">
                {filteredBreadList.map((bread) => (
                  <BreadCard
                    key={bread.productId}
                    id={bread.productId}
                    profileImgUrl={bread.image}
                    description="Delicious bread"
                    {...bread}
                    isBookmarked
                    onToggleBookmark={() => {}}
                  />
                ))}
              </div>
            ) : (
              <EmptyState title="즐겨찾기한 빵이 없습니다." message="자주 가는 빵을 추가해 보세요." />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const filteredBakeryList: FavoriteBakery[] = [];
const filteredBreadList: FavoriteProduct[] = [];

const FavoritBakeryList = ({ sort }: { sort: FilterKey }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFavoriteBakeryList({
    sort,
    latitude: 10,
    longitude: 10,
  });

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

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      {data?.pages.map((page) =>
        page.data.favorites.map((bakery: FavoriteBakery) => (
          <BakeryCard
            key={bakery.bakeryId}
            bakeryId={bakery.bakeryId}
            profileImage={bakery.profileImage}
            name={bakery.name}
            distance={bakery.distance}
            operatingStatus={bakery.operatingStatus}
            size="large"
            isBookmarked
            onToggleBookmark={() => {}}
          />
        )),
      )}
      <div ref={observerRef} />
      {isFetchingNextPage && (
        <p>
          <EmptyState title="즐겨찾기한 빵집이 없습니다." message="자주 가는 빵집을 추가해 보세요." />
        </p>
      )}
    </>
  );
};
