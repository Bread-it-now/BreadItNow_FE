'use client';

import { useState } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/common/SearchBar';
import Back from '@/assets/icons/back.svg';
import SearchIcon from '@/components/common/Icons/SearchIcon';
import HotBreadTab from '@/components/common/tabs/HotBreadTab';
import FilterDropdown from '@/components/search/FilterDropdown';
// import BakeryCard from '@/components/bakerycard/BakeryCard';
// import BreadCard from '@/components/bakerycard/BreadCard';
// import EmptyState from '@/components/common/EmptyState';
import { FilterKey, SearchAutoComplete } from '@/types/bakery';
import { useSearchAutoCompletes } from '@/lib/api/bakery';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'빵집' | '빵'>('빵집');
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>('popular');

  const handleSearchEnter = (): void => {
    setIsSearchActive(true);
  };

  return (
    <div className="relative flex flex-col items-stasrt w-full max-h-[100%] bg-white px-5">
      <div className="flex items-center justify-between w-full py-[13px]">
        <button className="p-0 flex items-center justify-center" onClick={() => window.history.back()}>
          <Image src={Back} alt="Back" className="w-6 h-6 cursor-pointer" />
        </button>

        <SearchBar
          name="search"
          placeholder="빵, 빵집으로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
          onEnter={handleSearchEnter}
        />
      </div>

      {!isSearchActive ? (
        <KeywordsSection
          keyword={searchTerm}
          selectAutoComplete={(autoComplete: string) => setSearchTerm(autoComplete)}
        />
      ) : (
        <div className="w-full flex flex-col h-full overflow-hidden">
          <HotBreadTab
            tabs={[
              { key: '빵집', label: '빵집' },
              { key: '빵', label: '빵' },
            ]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="flex-1 overflow-y-auto scrollbar-hide text-gray900">
            <div className="flex items-center justify-between p-4">
              <span>
                총 <span className="text-primary">{activeTab === '빵집' ? 0 : 0}</span> 개
              </span>
              <FilterDropdown handleSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} />
            </div>

            {/* {activeTab === '빵집' ? (
              filteredBakeryList.length > 0 ? (
                <div className="p-4 space-y-4">
                  {filteredBakeryList.map((bakery) => (
                    <BakeryCard
                      key={bakery.id}
                      bakeryId={bakery.id}
                      profileImage={bakery.profileImgUrl}
                      name={bakery.name}
                      distance={bakery.distance}
                      operatingStatus={bakery.operatingStatus}
                      size="large"
                    />
                  ))}
                </div>
              ) : (
                <EmptyState message="다른 키워드로 검색해보세요." searchTerm={searchTerm} />
              )
            ) : filteredBreadList.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 p-4">
                {filteredBreadList.map((bread) => (
                  <BreadCard
                    key={bread.id}
                    {...bread}
                    price={Number(bread.price)}
                    isBookmarked={bookmarkedBreads.includes(bread.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState message="다른 키워드로 검색해보세요." searchTerm={searchTerm} />
            )} */}
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
    <div className="flex w-full justify-end">
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
