'use client';
import HotBreadTab from '@/components/common/tabs/HotBreadTab';
import { useEffect, useRef, useState } from 'react';
import FilterDropdown from '@/components/search/FilterDropdown';
import EmptyState from '@/components/common/EmptyState';
import BakeryCard from '@/components/bakerycard/BakeryCard';
import { FavoriteBakery, FavoriteProduct, FilterKey } from '@/types/bakery';
import BreadCard from '@/components/bakerycard/BreadCard';
import { useFavoriteBakeryList, useFavoriteProductList } from '@/lib/api/bakery';
import useLocation from '@/hooks/useLocation';

const HEADER_TABS = [
  { key: 'bakery', label: '빵집' },
  { key: 'product', label: '빵' },
];

export default function Page() {
  const [totalElementsCnt, setTotalElementsCnt] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('bakery');
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>('popular');

  return (
    <div className="w-full h-[100%] flex flex-col gap-10 bg-white">
      <HotBreadTab tabs={HEADER_TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 overflow-y-auto scrollbar-hide text-gray900">
        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide px-5 text-gray900">
          <div className="flex items-center justify-between">
            <span>
              총 <span className="text-primary">{totalElementsCnt}</span> 개
            </span>
            <FilterDropdown handleSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} />
          </div>
          <div
            className={`flex ${activeTab === 'bakery' || totalElementsCnt === 0 ? 'flex-col gap-[30px]' : 'flex-row flex-wrap gap-x-[11px] gap-y-[30px]'} w-full`}>
            {activeTab === 'bakery' ? (
              <FavoriteBakeryList sort={selectedFilter} handleTotalElementsCnt={setTotalElementsCnt} />
            ) : (
              <div className="grid grid-cols-2 gap-4 w-full">
                <FavoriteProductList sort={selectedFilter} handleTotalElementsCnt={setTotalElementsCnt} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const FavoriteBakeryList = ({
  sort,
  handleTotalElementsCnt,
}: {
  sort: FilterKey;
  handleTotalElementsCnt: (value: number) => void;
}) => {
  const { latitude, longitude } = useLocation();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFavoriteBakeryList({
    sort,
    latitude: latitude ?? undefined,
    longitude: longitude ?? undefined,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);
  const totalElements = data?.pages[0]?.data?.pageInfo?.totalElements || 0;

  useEffect(() => {
    handleTotalElementsCnt(totalElements);
  }, [totalElements, handleTotalElementsCnt]);

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
      {data?.pages[0].data.favorites.length !== 0 ? (
        data?.pages.map((page) =>
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
            />
          )),
        )
      ) : (
        <EmptyState title="즐겨찾기한 빵집이 없습니다." message="자주 가는 빵집을 추가해 보세요." />
      )}
      <div ref={observerRef} />
      {isFetchingNextPage && <p />}
    </>
  );
};

const FavoriteProductList = ({
  sort,
  handleTotalElementsCnt,
}: {
  sort: FilterKey;
  handleTotalElementsCnt: (value: number) => void;
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFavoriteProductList({
    sort,
    latitude: 10,
    longitude: 10,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);
  const totalElements = data?.pages[0]?.data?.pageInfo?.totalElements || 0;

  useEffect(() => {
    handleTotalElementsCnt(totalElements);
  }, [totalElements, handleTotalElementsCnt]);

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
      {data?.pages[0].data.favorites.length !== 0 ? (
        data?.pages.map((page) =>
          page.data.favorites.map((product: FavoriteProduct) => (
            <BreadCard
              key={product.productId}
              id={product.productId}
              bakeryId={product.bakeryId}
              profileImgUrl={product.image}
              name={product.name}
              bakeryName="맛있는 빵집"
              direction="column"
              price={product.price}
              isBookmarked
              isShowBookmark
            />
          )),
        )
      ) : (
        <EmptyState title="즐겨찾기한 빵집이 없습니다." message="자주 가는 빵집을 추가해 보세요." />
      )}
      <div ref={observerRef} />
      {isFetchingNextPage && <p />}
    </>
  );
};
