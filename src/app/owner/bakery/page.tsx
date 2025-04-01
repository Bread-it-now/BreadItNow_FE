'use client';
import HotBreadTab from '@/components/common/tabs/HotBreadTab';
import { useState } from 'react';
import BottomSheet, { BottomSheetProps } from '@/components/bottomsheet/Bottomsheet';
import { useReservationBottomSheet } from '@/hooks/useReservationBottomSheet';
import EditBakeryTab from '@/components/common/tabs/EditBakeryTab';
const HEADER_TABS = [
  { key: 'bakeryInfo', label: '빵집정보' },
  { key: 'bakeryProducts', label: '빵집 메뉴' },
];

const BottomSheetContainer = ({
  isOpen,
  close,
  bototmSheetProps,
}: {
  isOpen: boolean;
  close: () => void;
  bototmSheetProps: BottomSheetProps | undefined;
}) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={close}
      onConfirm={bototmSheetProps?.onConfirm}
      title={bototmSheetProps?.title}
      cancelText={bototmSheetProps?.cancelText}
      confirmText={bototmSheetProps?.confirmText}
      maxContentHeight={500}
      fullHeight={false}
      bgColor={bototmSheetProps?.bgColor}>
      {bototmSheetProps?.children}
    </BottomSheet>
  );
};
// BottomSheetContainer.displayName = 'BottomSheetContainer';

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>('bakeryInfo');
  const { isOpen, open, close } = useReservationBottomSheet();
  const [bototmSheetProps, setBottomSheetProps] = useState<BottomSheetProps>();

  return (
    <div className="bg-gray-100 overflow-y-auto">
      <HotBreadTab tabs={HEADER_TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'bakeryInfo' ? (
        <EditBakeryTab open={open} setBottomSheetProps={setBottomSheetProps} close={close} />
      ) : (
        <div>메뉴수정</div>
      )}
      <BottomSheetContainer isOpen={isOpen} close={close} bototmSheetProps={bototmSheetProps} />
    </div>
  );
}
