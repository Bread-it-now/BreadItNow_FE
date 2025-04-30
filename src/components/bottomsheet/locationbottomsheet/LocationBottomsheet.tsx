import { useRegionsState } from '@/hooks/useRegionsState';
import BottomSheet from '../Bottomsheet';
import Image from 'next/image';
import Button from '@/components/button/Button';
import { LocationProps, RegionListProps, SidoRegion, SubRegionListProps } from '@/types/location';
import close from '@/assets/icons/close.svg';
import LocationIcon from '@/assets/icons/location.svg';
import { initialRegions } from '@/hooks/useRegionsState';
import { cn } from '@/utils/cn';
import { Region } from '@/types/location';

export const SidoRegions: SidoRegion[] = [
  { sidoCode: '11', sidoName: '서울특별시' },
  { sidoCode: '26', sidoName: '부산광역시' },
  { sidoCode: '27', sidoName: '대구광역시' },
  { sidoCode: '28', sidoName: '인천광역시' },
  { sidoCode: '29', sidoName: '광주광역시' },
  { sidoCode: '30', sidoName: '대전광역시' },
  { sidoCode: '31', sidoName: '울산광역시' },
  { sidoCode: '36', sidoName: '세종특별자치시' },
  { sidoCode: '41', sidoName: '경기도' },
  { sidoCode: '43', sidoName: '충청북도' },
  { sidoCode: '44', sidoName: '충청남도' },
  { sidoCode: '46', sidoName: '전라남도' },
  { sidoCode: '47', sidoName: '경상북도' },
  { sidoCode: '48', sidoName: '경상남도' },
  { sidoCode: '50', sidoName: '제주특별자치도' },
  { sidoCode: '51', sidoName: '강원특별자치도' },
  { sidoCode: '52', sidoName: '전북특별자치도' },
];

const RegionList = ({ regions, selectedRegion, setSelectedRegion }: RegionListProps) => {
  const regionsWithSelectedCount = regions.map((region) => ({
    ...region,
    selectedCount: region.subRegions.reduce((count, subRegion) => count + (subRegion.selected ? 1 : 0), 0),
  }));

  return (
    <div className="w-1/3 flex flex-col overflow-y-auto border-r border-gray-300">
      {regionsWithSelectedCount.map((region) => (
        <div
          key={region.id}
          className={cn(
            'px-5 py-4 cursor-pointer text-[15px] flex justify-between items-center',
            selectedRegion.id === region.id
              ? 'bg-gray50 font-semibold text-gray900'
              : 'bg-white font-normal text-gray900',
          )}
          onClick={() => setSelectedRegion(region)}>
          <span>{region.name}</span>
          {region.selectedCount > 0 && (
            <span className="bg-primary text-white text-xs px-[6px] py-[2px] rounded-full">{region.selectedCount}</span>
          )}
        </div>
      ))}
    </div>
  );
};

const SubRegionList = ({ filteredSubRegions, setRegions, selectedRegion, setSelectedRegion }: SubRegionListProps) => {
  return (
    <div className="w-2/3 flex flex-col overflow-y-auto">
      {filteredSubRegions.map((subRegion) => (
        <div
          key={subRegion.id}
          className="px-5 py-[6.8%] flex items-center justify-start gap-2 text-gray900 text-sm cursor-pointer"
          onClick={() => {
            setRegions((prevRegions: Region[]) => {
              const updatedRegions = prevRegions.map((region) => ({
                ...region,
                subRegions: region.subRegions.map((item) =>
                  item.id === subRegion.id ? { ...item, selected: !item.selected } : item,
                ),
              }));

              const newSelectedRegion = updatedRegions.find((region) => region.id === selectedRegion.id);
              if (newSelectedRegion) {
                setSelectedRegion(newSelectedRegion);
              }

              return updatedRegions;
            });
          }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 8.66667L8.66667 14L16 6"
              stroke={subRegion.selected ? '#FF7651' : '#D7D9DB'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={subRegion.selected ? 'font-semibold' : 'font-medium'}>{subRegion.name}</span>
        </div>
      ))}
    </div>
  );
};

const LocationBottomSheet = ({ isOpen, onClose, onConfirm }: LocationProps) => {
  const { regions, setRegions, selectedRegion, setSelectedRegion, resetSelection } = useRegionsState(initialRegions);

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
          <button
            className="px-5 h-[40px] text-gray900 w-full flex items-center justify-center gap-2 py-3 border border-gray200 rounded-lg text-sm font-medium"
            onClick={() => {}}>
            <Image src={LocationIcon} width={20} height={20} alt="위치" />
            현재 위치로 설정
          </button>
        </div>

        <div className="flex w-full flex-1 overflow-y-auto border-t border-gray200">
          <RegionList regions={regions} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
          <SubRegionList
            filteredSubRegions={[]}
            setFilteredSubRegions={() => {}}
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
