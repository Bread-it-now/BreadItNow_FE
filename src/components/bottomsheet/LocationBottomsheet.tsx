import { useSearchSubRegions } from '@/hooks/useSearchSubRegions';
import { useRegionsState } from '@/hooks/useRegionsState';
import BottomSheet from './Bottomsheet';
import Image from 'next/image';
import Button from '../button/Button';
import { LocationProps } from '@/types/location';
import close from '@/assets/icons/close.svg';
import SearchBar from '@/components/main/SearchLocation';
import LocationIcon from '@/assets/icons/location.svg';
import RegionList from '@/components/main/RegionList';
import SubRegionList from '@/components/main/SubRegionList';
import { initialRegions } from '@/hooks/useRegionsState';

const LocationBottomSheet = ({ isOpen, onClose, onConfirm }: LocationProps) => {
  const { regions, setRegions, selectedRegion, setSelectedRegion, resetSelection } = useRegionsState(initialRegions);
  const { searchTerm, setSearchTerm, filteredSubRegions, setFilteredSubRegions } = useSearchSubRegions(
    selectedRegion,
    regions,
  );

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full items-center gap-4 flex-1 overflow-y-auto min-h-[70vh]">
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
          <SubRegionList
            filteredSubRegions={filteredSubRegions}
            setFilteredSubRegions={setFilteredSubRegions}
            setRegions={setRegions}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
        </div>
      </div>

      <div className="sticky bottom-0 left-0 w-full p-5 bg-white border-t border-gray-300 z-10">
        <div className="flex gap-2">
          <Button onClick={resetSelection} scale="large" className="w-1/2 border border-gray-300">
            초기화
          </Button>
          <Button onClick={onConfirm ?? (() => {})} fullWidth scale="large" variant="primary">
            관심지역 설정 완료
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default LocationBottomSheet;
