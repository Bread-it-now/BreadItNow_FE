import { useState } from 'react';

export const initialRegions = [
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

export const useRegionsState = (initialRegionsData = initialRegions) => {
  const [regions, setRegions] = useState<typeof initialRegions>(initialRegionsData);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);

  const resetSelection = () => {
    const resetRegions = initialRegionsData.map((region) => ({
      ...region,
      subRegions: region.subRegions.map((sub) => ({ ...sub, selected: false })),
    }));

    setRegions(resetRegions);
    setSelectedRegion(resetRegions[0]);
  };

  return { regions, setRegions, selectedRegion, setSelectedRegion, resetSelection };
};
