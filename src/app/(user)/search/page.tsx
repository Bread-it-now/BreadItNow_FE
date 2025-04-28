'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/common/SearchBar';
import Back from '@/assets/icons/back.svg';
import SearchIcon from '@/components/common/Icons/SearchIcon';
import HotBreadTab from '@/components/common/tabs/HotBreadTab';
import FilterDropdown from '@/components/search/FilterDropdown';
import BakeryCard from '@/components/bakerycard/BakeryCard';
// import BreadCard from '@/components/bakerycard/BreadCard';
import EmptyState from '@/components/common/EmptyState';
import { FilterKey, SearchAutoComplete, SearchBakery } from '@/types/bakery';
import { useSearchAutoCompletes, useSearchBakeries } from '@/lib/api/bakery';
import useLocation from '@/hooks/useLocation';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'bakery' | 'product'>('bakery');
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>('popular');
  const [totalCnt, setTotalCnt] = useState<number>(0);

  return (
    <div className="relative flex flex-col items-stasrt w-full max-h-[100%] bg-white">
      <div className="flex items-center justify-between w-full py-[13px] px-5">
        <button className="p-0 flex items-center justify-center" onClick={() => window.history.back()}>
          <Image src={Back} alt="Back" className="w-6 h-6 cursor-pointer" />
        </button>

        <SearchBar
          name="search"
          placeholder="빵, 빵집으로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
          onEnter={() => setIsResultVisible(true)}
          handleVisibleResult={setIsResultVisible}
        />
      </div>

      {!isResultVisible ? (
        <KeywordsSection
          keyword={searchTerm}
          selectAutoComplete={(autoComplete: string) => setSearchTerm(autoComplete)}
        />
      ) : (
        <div className="flex flex-col gap-8 h-full overflow-hidden w-full">
          <HotBreadTab
            tabs={[
              { key: 'bakery', label: '빵집' },
              { key: 'product', label: '빵' },
            ]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="flex-1 overflow-y-auto scrollbar-hide text-gray900">
            <div className="flex items-center justify-between px-5 pb-4">
              <span>
                총 <span className="text-primary">{totalCnt}</span> 개
              </span>
              <FilterDropdown handleSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} />
            </div>
            {activeTab === 'bakery' ? (
              <div className="flex flex-col gap-[30px] w-full px-5">
                <BakeryList sort={selectedFilter} keyword={searchTerm} handleTotalCnt={setTotalCnt} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const KeywordsSection = ({
  keyword,
  selectAutoComplete,
}: {
  keyword: string;
  selectAutoComplete: (autocomplete: string) => void;
}) => {
  const { data: searchAutoCompletes } = useSearchAutoCompletes(keyword);

  return (
    <div className="flex w-full justify-end px-5">
      {keyword && searchAutoCompletes && searchAutoCompletes.length !== 0 && (
        <div className="w-full max-w-[300px] overflow-y-scroll scrollbar-hide border border-gray200 rounded-[8px] bg-white">
          <ul>
            {searchAutoCompletes?.map((searchAutoComplete: SearchAutoComplete, idx: number) => (
              <li
                key={`${searchAutoComplete}-${idx}`}
                className="flex px-4 gap-[5px] items-center py-2 text-title-content-s hover:cursor-pointer hover:bg-gray100"
                onClick={() => selectAutoComplete(searchAutoComplete.name)}>
                <SearchIcon color="#b2b4b6" size={20} />
                <span className="text-gray900">{searchAutoComplete.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const BakeryList = ({
  keyword,
  sort,
  handleTotalCnt,
}: {
  keyword: string;
  sort: FilterKey;
  handleTotalCnt: (value: number) => void;
}) => {
  const { latitude, longitude } = useLocation();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchBakeries({
    size: 10,
    sort: sort,
    keyword,
    latitude: latitude ?? undefined,
    longitude: longitude ?? undefined,
  });
  const observerRef = useRef<HTMLDivElement | null>(null);
  const totalElements = data?.pages[0]?.data?.pageInfo?.totalElements || 0;

  useEffect(() => {
    handleTotalCnt(totalElements);
  }, [totalElements, handleTotalCnt]);

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
      {data?.pages[0].data.searchBakeries.length !== 0 ? (
        data?.pages.map((page) =>
          page.data.searchBakeries.map((bakery: SearchBakery) => (
            <BakeryCard
              key={bakery.bakeryId}
              bakeryId={bakery.bakeryId}
              name={bakery.bakeryName}
              operatingStatus={bakery.operatingStatus}
              distance={bakery.distance}
              profileImage={bakery.profileImage}
              isShowBookmark
              isBookmarked={bakery.isFavorite}
              size="large"
            />
          )),
        )
      ) : (
        <EmptyState title={`${keyword}에 대한 검색 결과가 없습니다.`} />
      )}
      <div ref={observerRef} />
      {isFetchingNextPage && <p />}
    </>
  );
};
