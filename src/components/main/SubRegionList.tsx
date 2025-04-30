import { SubRegionListProps, Region } from '@/types/location';

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

export default SubRegionList;
