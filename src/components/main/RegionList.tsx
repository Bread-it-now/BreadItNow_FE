import { cn } from '@/utils/cn';
import { RegionListProps } from '@/types/location';

const RegionList = ({ regions, selectedRegion, setSelectedRegion }: RegionListProps) => {
  const regionsWithSelectedCount = regions.map((region) => ({
    ...region,
    selectedCount: region.subRegions.filter((subRegion) => subRegion.selected).length,
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

export default RegionList;
