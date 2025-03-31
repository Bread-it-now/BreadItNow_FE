import { OwnerReservationStatus, ReservationOptionStep } from '@/types/reservation';
import useBaseBottomSheet from './useBaseBottomSheet';
import { useState } from 'react';

const useOwnerReservationBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  /** 예약 단계 */
  const [reservationOptionStep, setReservationOptionStep] = useState<ReservationOptionStep>('APPOVE_STEP');
  /** 선택한 예약 상태(접수, 부분접수, 예약 거부) */
  const [selectedReservationStatus, setSelectedReservationStatus] =
    useState<Exclude<OwnerReservationStatus, 'WAITING' | 'PAYMENT_COMPLETED' | 'CUSTOMER_CANCELED'>>('APPROVED');
  /** 갱신된 예약 items */
  const [updatedReservationItems, setUpdatedReservationItems] = useState<{ productId: number; quantity: number }[]>([]);
  /** 예약 거부 또는 부분 승인 사유 */
  const [reservationReason, setReservationReason] = useState<'재고 부족' | '매장 사정' | '기타'>('재고 부족');
  /** 사유 detail */
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
