import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Button from '../button/Button';
import { cn } from '@/utils/cn';

import close from '@/assets/icons/close.svg';
import SearchBar from '@/components/main/SearchLocation';
import LocationIcon from '@/assets/icons/location.svg';
import { LocationProps } from '@/types/location';

import RegionList from '@/components/main/RegionList';
import SubRegionList from '@/components/main/SubRegionList';

const initialRegions = [
  {
    id: 1,
    name: '전국',
    subRegions: [
      '해운대',
      '서울 전체',
      '강남',
      '서초',
      '잠실/송파/강동',
      '영등포/여의도/강서',
      '건대/성수/왕십리',
      '종로/중구',
    ],
  },
  {
    id: 2,
    name: '수도권',
    subRegions: [
      '수도권(서울/경기/인천/) 전체',
      '서울 전체',
      '강남',
      '서초',
      '잠실/송파/강동',
      '영등포/여의도/강서',
      '건대/성수/왕십리',
      '종로/중구',
    ],
  },
  { id: 3, name: '부산', subRegions: ['해운대', '서면'] },
  { id: 4, name: '제주', subRegions: ['제주시', '서귀포시'] },
  { id: 5, name: '울산', subRegions: [] },
  { id: 6, name: '경남', subRegions: [] },
  { id: 7, name: '대구', subRegions: [] },
  { id: 8, name: '경북', subRegions: [] },
  { id: 9, name: '강원', subRegions: [] },
  { id: 10, name: '대전', subRegions: [] },
  { id: 11, name: '충남/충북', subRegions: [] },
  { id: 12, name: '세종', subRegions: [] },
  { id: 13, name: '광주', subRegions: [] },
  { id: 14, name: '전남/전북', subRegions: [] },
].map((region) => ({
  ...region,
  subRegions: region.subRegions.map((name, index) => ({
    id: region.id * 100 + index,
    name,
    selected: false,
  })),
}));

const LocationBottomSheet = ({ isOpen, onClose, onConfirm }: LocationProps) => {
  const [bottomSheetRoot, setBottomSheetRoot] = useState<HTMLElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(isOpen);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [regions, setRegions] = useState<typeof initialRegions>(initialRegions);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [filteredSubRegions, setFilteredSubRegions] = useState(selectedRegion.subRegions);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSubRegions(selectedRegion.subRegions);
    } else {
      const allSubRegions = regions.flatMap((region) => region.subRegions);
      const uniqueSubRegions = Array.from(
        new Map(allSubRegions.map((subRegion) => [subRegion.name, subRegion])).values(),
      );
      setFilteredSubRegions(
        uniqueSubRegions.filter((subRegion) => subRegion.name.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }
  }, [searchTerm, selectedRegion, regions]);

  useEffect(() => {
    const rootElement = document.getElementById('bottomsheet-root');
    if (rootElement) {
      setBottomSheetRoot(rootElement);
    }
  }, []);

  useEffect(() => {
    if (isOpen && bottomSheetRoot) {
      setIsAnimating(true);
      bottomSheetRoot.style.setProperty('overflow', 'hidden');
    }
  }, [isOpen, bottomSheetRoot]);

  const handleBottomSheetAnimationEnd = () => {
    if (!isOpen && bottomSheetRoot) {
      setIsAnimating(false);
      bottomSheetRoot.style.setProperty('overflow', '');
    }
  };

  if (!bottomSheetRoot || !isAnimating) return null;

  return createPortal(
    <div className={cn('absolute bottom-0 w-full h-full z-10')}>
      <div className="absolute w-full h-full bg-black bg-opacity-50" onClick={onClose} />

      <div
        className={cn(
          'absolute bottom-0 w-full overflow-y-auto h-[85vh] max-h-[85vh] pt-[1.875rem] bg-white rounded-t-[1.5rem]',
          isOpen ? 'animate-slideUp' : 'animate-slideDown',
        )}
        onAnimationEnd={handleBottomSheetAnimationEnd}>
        <div className="flex flex-col h-full items-center gap-4 flex-1 overflow-y-auto">
          <div className="flex px-5 justify-between items-center w-full">
            <h2 className="text-gray-900 text-lg font-semibold">관심지역 설정</h2>
            <button onClick={onClose}>
              <Image src={close} width={24} height={24} alt="닫기" />
            </button>
          </div>

          <div className="w-[100%] px-5">
            <SearchBar
              name="search"
              placeholder="지역 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
            />
          </div>

          <div className="w-[100%] px-5">
            <button className="px-5 h-[40px] text-gray900 w-full flex items-center justify-center gap-2 py-3 border border-gray200 rounded-lg text-sm font-medium">
              <Image src={LocationIcon} width={20} height={20} alt="위치" />
              현재 위치로 설정
            </button>
          </div>

          <div className="flex w-full flex-1 overflow-y-auto border-t border-gray200">
            {searchTerm.length === 0 && (
              <RegionList regions={regions} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
            )}
            <SubRegionList filteredSubRegions={filteredSubRegions} setRegions={setRegions} />
          </div>
        </div>

        <div className="w-full p-5 bg-white border-t border-gray-300 sticky bottom-0 left-0">
          <div className="flex gap-2">
            <Button onClick={onClose} className="w-1/2 border border-gray-300">
              초기화
            </Button>
            <Button onClick={onConfirm ?? (() => {})} fullWidth variant="primary">
              관심지역 설정 완료
            </Button>
          </div>
        </div>
      </div>
    </div>,
    bottomSheetRoot,
  );
};

export default LocationBottomSheet;
