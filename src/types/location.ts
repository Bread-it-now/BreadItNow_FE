export interface LocationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  cancelText?: string;
  confirmText?: string;
  confirmDisabled?: boolean;
  maxHeight?: number;
  maxContentHeight?: number;
  children?: React.ReactNode;
}

export interface Region {
  id: number;
  name: string;
  subRegions: SubRegion[];
}

export interface RegionListProps {
  regions: Region[];
  selectedRegion: Region;
  setSelectedRegion: (region: Region) => void;
}

export interface SubRegion {
  id: number;
  name: string;
  selected: boolean;
}

export interface SubRegionListProps {
  filteredSubRegions: SubRegion[];
  setFilteredSubRegions: (subRegions: SubRegion[]) => void;
  setRegions: React.Dispatch<React.SetStateAction<Region[]>>;
  selectedRegion: Region;
  setSelectedRegion: (region: Region) => void;
}
