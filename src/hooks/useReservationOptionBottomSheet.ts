import { OwnerReservationStatus, ReservationOptionStep } from '@/types/reservation';
import useBaseBottomSheet from './useBaseBottomSheet';
import { useState } from 'react';

const useReservationOptionBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const [reservationOptionStep, setReservationOptionStep] = useState<ReservationOptionStep>('APPOVE_STEP');
  const [selectedReservationStatus, setSelectedReservationStatus] =
    useState<Exclude<OwnerReservationStatus, 'WAITING' | 'PAYMENT_COMPLETED' | 'CUSTOMER_CANCELED'>>('APPROVED');

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    reservationOptionStep,
    handleReservationStep: setReservationOptionStep,
    selectedReservationStatus,
    handleSelectedReservationStatus: setSelectedReservationStatus,
  };
};

export default useReservationOptionBottomSheet;
