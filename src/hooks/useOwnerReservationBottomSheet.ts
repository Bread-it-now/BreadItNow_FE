import { OwnerReservationStatus, ReservationOptionStep } from '@/types/reservation';
import useBaseBottomSheet from './useBaseBottomSheet';
import { useState } from 'react';

const useOwnerReservationBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const [reservationOptionStep, setReservationOptionStep] = useState<ReservationOptionStep>('APPOVE_STEP');
  const [selectedReservationStatus, setSelectedReservationStatus] =
    useState<Exclude<OwnerReservationStatus, 'WAITING' | 'PAYMENT_COMPLETED' | 'CUSTOMER_CANCELED'>>('APPROVED');
  const [updatedReservationItems, setUpdatedReservationItems] = useState<{ productId: number; quantity: number }[]>([]);
  const [reservationReason, setReservationReason] = useState<'재고 부족' | '매장 사정' | '기타'>('재고 부족');
  const [reasonDetail, setReasonDetail] = useState<string>('');

  const resetReservation = () => {
    setSelectedReservationStatus('APPROVED');
    setReservationOptionStep('APPOVE_STEP');
    setUpdatedReservationItems([]);
    setReservationReason('재고 부족');
    setReasonDetail('');
  };

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    reservationOptionStep,
    handleReservationOptionStep: setReservationOptionStep,
    selectedReservationStatus,
    handleSelectedReservationStatus: setSelectedReservationStatus,
    handleUpdatedReservationItems: setUpdatedReservationItems,
    updatedReservationItems,
    handleReservationReason: setReservationReason,
    handleReasonDetail: setReasonDetail,
    reservationReason,
    reasonDetail,
    reset: resetReservation,
  };
};

export default useOwnerReservationBottomSheet;
