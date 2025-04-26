'use client';

import { useState } from 'react';
import Image from 'next/image';
import arrowUp from '@/assets/icons/arrow-up.svg';
import arrowDown from '@/assets/icons/arrow-down.svg';
import { FilterKey } from '@/types/bakery';

const FILTER_OPTIONS = [
  { key: 'latest', label: '최신순' },
  { key: 'popular', label: '인기순' },
  { key: 'distance', label: '거리순' },
];

const FilterDropdown = ({
  selectedFilter,
  handleSelectedFilter,
}: {
  selectedFilter: 'latest' | 'popular' | 'distance';
  handleSelectedFilter: (key: FilterKey) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (key: FilterKey) => {
    handleSelectedFilter(key);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button className="flex items-center text-gray900 text-sm font-semibold" onClick={() => setIsOpen(!isOpen)}>
        {FILTER_OPTIONS.find((option) => option.key === selectedFilter)?.label}
        <Image src={isOpen ? arrowUp : arrowDown} alt="Toggle" width={16} height={16} className="ml-2" />
      </button>

      {isOpen && (
        <div className="z-10 absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-xl border border-gray200 py-2">
          {FILTER_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleSelect(key as FilterKey)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                selectedFilter === key ? 'text-gray900 font-semibold' : 'text-gray400'
              }`}>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
