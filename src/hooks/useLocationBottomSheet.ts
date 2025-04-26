import { useState, useEffect } from 'react';
import useBaseBottomSheet from '@/hooks/useBaseBottomSheet';
import { initialRegions } from '@/hooks/useRegionsState';

export const useLocationBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();
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

  const resetSelection = () => {
    const resetRegions = initialRegions.map((region) => ({
      ...region,
      subRegions: region.subRegions.map((sub) => ({ ...sub, selected: false })),
    }));

    setRegions(resetRegions);
    setSelectedRegion(resetRegions[0]);
    setFilteredSubRegions(resetRegions[0].subRegions);
  };

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    title: '관심지역 설정',
    searchTerm,
    setSearchTerm,
    regions,
    setRegions,
    selectedRegion,
    setSelectedRegion,
    filteredSubRegions,
    setFilteredSubRegions,
    resetSelection,
  };
};
