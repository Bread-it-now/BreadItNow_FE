import { sidoRegions } from '@/hooks/useRegionsState';
import BottomSheet from '../Bottomsheet';
import Image from 'next/image';
import { SidoRegionWithSelectedCnt } from '@/types/location';
import LocationIcon from '@/assets/icons/location.svg';
import { cn } from '@/utils/cn';

const RegionList = () => {
  const sidoRegionsWithSelectedCnt: SidoRegionWithSelectedCnt[] = sidoRegions.map((region) => ({
    ...region,
    selectedCnt: 0,
  }));

  return (
    <div className="w-1/3 flex flex-col overflow-y-auto border-r border-gray-300">
      {sidoRegionsWithSelectedCnt.map((sidoRegionWithSelectedCnt: SidoRegionWithSelectedCnt) => (
        <div
          key={sidoRegionWithSelectedCnt.sidoCode}
          className={cn('px-5 py-4 cursor-pointer text-[15px] flex justify-between items-center')}
          onClick={() => {}}>
          <span>{sidoRegionWithSelectedCnt.sidoName}</span>
          {sidoRegionWithSelectedCnt.selectedCnt > 0 && (
            <span className="bg-primary text-white text-xs px-[6px] py-[2px] rounded-full">
              {sidoRegionWithSelectedCnt.selectedCnt}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

// const SubRegionList = ({ filteredSubRegions, setRegions, selectedRegion, setSelectedRegion }: SubRegionListProps) => {
//   return (
//     <div className="w-2/3 flex flex-col overflow-y-auto">
//       {filteredSubRegions.map((subRegion) => (
//         <div
//           key={subRegion.id}
//           className="px-5 py-[6.8%] flex items-center justify-start gap-2 text-gray900 text-sm cursor-pointer"
//           onClick={() => {
//             setRegions((prevRegions: Region[]) => {
//               const updatedRegions = prevRegions.map((region) => ({
//                 ...region,
//                 subRegions: region.subRegions.map((item) =>
//                   item.id === subRegion.id ? { ...item, selected: !item.selected } : item,
//                 ),
//               }));

//               const newSelectedRegion = updatedRegions.find((region) => region.id === selectedRegion.id);
//               if (newSelectedRegion) {
//                 setSelectedRegion(newSelectedRegion);
//               }

//               return updatedRegions;
//             });
//           }}>
//           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path
//               d="M4 8.66667L8.66667 14L16 6"
//               stroke={subRegion.selected ? '#FF7651' : '#D7D9DB'}
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           <span className={subRegion.selected ? 'font-semibold' : 'font-medium'}>{subRegion.name}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

const LocationBottomSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="관심지역 설정"
      confirmText="관심지역 설정 완료"
      cancelText="초기화"
      onConfirm={() => {}}>
      <div className="flex flex-col items-center gap-8 flex-1 overflow-y-auto">
        <div className="w-[100%] px-5">
          <button
            className="px-5 h-[40px] text-gray900 w-full flex items-center justify-center gap-2 py-3 border border-gray200 rounded-lg text-sm font-medium"
            onClick={() => {}}>
            <Image src={LocationIcon} width={20} height={20} alt="위치" />
            현재 위치로 설정
          </button>
        </div>

        <div className="flex w-full max-h-[400px] overflow-y-auto border-t border-gray200">
          <RegionList />
        </div>
      </div>
    </BottomSheet>
  );
};

export default LocationBottomSheet;
