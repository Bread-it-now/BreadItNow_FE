import { Bakery } from './bakery';

export type ReservationStatus = 'WAITING' | 'APPROVED' | 'PARTIAL_APPROVED' | 'PAYMENT_COMPLETED';
export type CustomerReservationStatus = ReservationStatus | 'CANCELED';
export type OwnerReservationStatus = ReservationStatus | 'OWNER_REJECTED' | 'CUSTOMER_CANCELED';

export interface Reservation {
  /** 예약 신청 Id */
  reservationId: number;
  /** 예약 신청 날짜 */
  reservationDate: string;
  /** 예약 접수 String */
  reservationNumber: number;
  /** 총 가격 */
  totalPrice: number;
  /** pickup 데드라인 */
  pickupDeadline?: string;
  /** 전체 상품 종류 */
  totalReservationProducts: 12;
  /** 대표 상품 이름 */
  mainReservationProductName: string;
}

export interface CustomerReservation extends Reservation {
  /** 예약 상태 */
  status: CustomerReservationStatus;
  bakeryId: number;
  bakeryName: string;
}
export interface OwnerReservation extends Reservation {
  /** 예약 상태 */
  status: OwnerReservationStatus;
  consumerNickname: string;
}

export interface ReservationProduct {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  breadImage: string;
}

export interface ReservationDetail {
  bakery: Pick<Bakery, 'name' | 'address' | 'phone'> & { bakeryId: number; profileImage: string };
  reservation: Reservation & {
    reservationItems: ReservationProduct[];
    /** 취소 사유 */
    cancelDetail?: string;
  };
}
