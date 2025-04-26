import { useEffect, useState } from 'react';
import { LocationProps } from '@/types/location';
import { initialRegions } from '@/hooks/useRegionsState';

interface SubRegion {
  id: number;
  name: string;
  selected: boolean;
}

export const useSearchSubRegions = (
  selectedRegion: LocationProps['selectedRegion'],
  regions: typeof initialRegions,
) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredSubRegions, setFilteredSubRegions] = useState<SubRegion[]>(selectedRegion.subRegions);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSubRegions(selectedRegion.subRegions);
    } else {
      const allSubRegions: SubRegion[] = regions.flatMap((region) => region.subRegions);

      const uniqueSubRegions: SubRegion[] = Array.from(
        new Map<string, SubRegion>(allSubRegions.map((subRegion: SubRegion) => [subRegion.name, subRegion])).values(),
      );

      setFilteredSubRegions(
        uniqueSubRegions.filter((subRegion) => subRegion.name.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }
  }, [searchTerm, selectedRegion, regions]);

  return { searchTerm, setSearchTerm, filteredSubRegions, setFilteredSubRegions };
};
