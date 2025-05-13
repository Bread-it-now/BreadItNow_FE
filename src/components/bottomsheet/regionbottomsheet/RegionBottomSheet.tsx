import BottomSheet from '../Bottomsheet';
import Image from 'next/image';
import { GuGunRegion, SidoRegion } from '@/types/location';
import LocationIcon from '@/assets/icons/location.svg';
import { cn } from '@/utils/cn';
import { Dispatch, SetStateAction, useState } from 'react';
import { updateRegion, useGuGunRegions, useLocationRegion } from '@/lib/api/region';

export const sidoRegions: SidoRegion[] = [
  { sidoCode: '11', sidoName: '서울' },
  { sidoCode: '26', sidoName: '부산' },
  { sidoCode: '27', sidoName: '대구' },
  { sidoCode: '28', sidoName: '인천' },
  { sidoCode: '29', sidoName: '광주' },
  { sidoCode: '30', sidoName: '대전' },
  { sidoCode: '31', sidoName: '울산' },
  { sidoCode: '36', sidoName: '세종' },
  { sidoCode: '41', sidoName: '경기' },
  { sidoCode: '43', sidoName: '충북' },
  { sidoCode: '44', sidoName: '충남' },
  { sidoCode: '46', sidoName: '전남' },
  { sidoCode: '47', sidoName: '경북' },
  { sidoCode: '48', sidoName: '경남' },
  { sidoCode: '50', sidoName: '제주' },
  { sidoCode: '51', sidoName: '강원' },
  { sidoCode: '52', sidoName: '전북' },
];

const SidoRegionList = ({
  handleSelectedSidoRegion,
  selectedGuGunRegions,
  selectedSidoRegion,
}: {
  handleSelectedSidoRegion: Dispatch<SetStateAction<SidoRegion>>;
  selectedGuGunRegions: GuGunRegion[];
  selectedSidoRegion: SidoRegion;
}) => {
  return (
    <div className="flex flex-col  w-1/3 overflow-y-auto border-r border-gray-300">
      {sidoRegions.map((sidoRegion: SidoRegion) => (
        <div
          key={sidoRegion.sidoCode}
          className={cn(
            'flex px-5 py-4 cursor-pointer text-[15px] gap-2 items-center bg-gray50',
            selectedSidoRegion.sidoCode === sidoRegion.sidoCode ? 'bg-white' : 'bg-gray50',
          )}
          onClick={() => {
            handleSelectedSidoRegion({
              sidoCode: sidoRegion.sidoCode,
              sidoName: sidoRegion.sidoName,
            });
          }}>
          <span>{sidoRegion.sidoName}</span>
          {selectedGuGunRegions.length !== 0 && selectedGuGunRegions[0].sidoCode === sidoRegion.sidoCode && (
            <div className="flex items-center w-4 h-4 justify-center text-[10px] font-semibold text-white rounded-full bg-primary ">
              <span>{selectedGuGunRegions.length}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const GuGunList = ({
  selectedSidoRegion,
  selectedGuGunRegions,
  handleSelectedGuGunRegions,
}: {
  selectedSidoRegion: SidoRegion;
  selectedGuGunRegions: GuGunRegion[];
  handleSelectedGuGunRegions: (gugunRegion: GuGunRegion) => void;
}) => {
  const { data: gugunRegions } = useGuGunRegions(selectedSidoRegion.sidoCode);
  return (
    <div className="w-2/3 flex flex-col overflow-y-auto">
      {gugunRegions &&
        gugunRegions.map((gugunRegion: GuGunRegion) => (
          <div
            key={gugunRegion.gugunCode}
            className="px-5 py-[6.8%] flex items-center justify-start gap-2 text-gray900 text-sm cursor-pointer"
            onClick={() => handleSelectedGuGunRegions(gugunRegion)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 8.66667L8.66667 14L16 6"
                stroke={
                  selectedGuGunRegions
                    .map((gugunRegion: GuGunRegion) => gugunRegion.gugunCode)
                    .includes(gugunRegion.gugunCode)
                    ? '#FF7651'
                    : '#D7D9DB'
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-semibold">{gugunRegion.gugunName}</span>
          </div>
        ))}
    </div>
  );
};

const RegionBottomSheet = ({
  isOpen,
  close,
  handleRegionTitle,
  latitude,
  longitude,
}: {
  isOpen: boolean;
  close: () => void;
  handleRegionTitle: (title: string) => void;
  latitude: number;
  longitude: number;
}) => {
  const [selectedSidoRegion, setSelectedSidoRegion] = useState<SidoRegion>({ ...sidoRegions[0] });
  const [selectedGuGunRegions, setSelectedGuGunRegions] = useState<GuGunRegion[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { data: locationRegion } = useLocationRegion(latitude, longitude);

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={close}
      onCancel={() => {
        setSelectedGuGunRegions([]);
        setSelectedSidoRegion({ ...sidoRegions[0] });
      }}
      title="관심지역 설정"
      confirmText="관심지역 설정 완료"
      cancelText="초기화"
      onConfirm={() => {
        if (isChecked && locationRegion) {
          handleRegionTitle(`${locationRegion.sidoName} ${locationRegion.gugunName}`);
          close();
          return;
        }
        if (selectedGuGunRegions.length === 0) {
          close();
          return;
        }
        const sidoCode = selectedGuGunRegions[0].sidoCode;
        const guguncodes = selectedGuGunRegions.map((gugunRegion: GuGunRegion) => gugunRegion.gugunCode);
        updateRegion(sidoCode, guguncodes);
        handleRegionTitle(
          selectedGuGunRegions.length === 1
            ? selectedGuGunRegions[0].gugunName
            : `${selectedGuGunRegions[0].gugunName} 외 ${selectedGuGunRegions.length - 1}건`,
        );
        close();
      }}>
      <div className="flex flex-col items-center gap-8 flex-1 overflow-y-auto">
        <div className="w-[100%] px-5">
          <button
            className={`px-5 h-[40px] text-gray900 w-full flex items-center justify-center gap-2 py-3 border border-gray200 rounded-lg text-sm font-medium ${isChecked ? 'bg-gray50 text-gray500' : 'bg-white'}`}
            onClick={() => setIsChecked((prev) => !prev)}>
            <Image src={LocationIcon} width={20} height={20} alt="위치" />
            현재 위치로 설정
          </button>
        </div>

        <div className="flex w-full max-h-[400px] overflow-y-auto border-t border-gray200">
          <SidoRegionList
            selectedSidoRegion={selectedSidoRegion}
            handleSelectedSidoRegion={setSelectedSidoRegion}
            selectedGuGunRegions={selectedGuGunRegions}
          />
          <GuGunList
            selectedSidoRegion={selectedSidoRegion}
            selectedGuGunRegions={selectedGuGunRegions}
            handleSelectedGuGunRegions={(gugunRegion: GuGunRegion) => {
              if (selectedGuGunRegions.length > 0 && selectedGuGunRegions[0].sidoCode === gugunRegion.sidoCode) {
                setSelectedGuGunRegions((prev) => [...prev, gugunRegion]);
              } else {
                setSelectedGuGunRegions([gugunRegion]);
              }
            }}
          />
        </div>
      </div>
    </BottomSheet>
  );
};

export default RegionBottomSheet;
