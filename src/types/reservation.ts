import { Bakery } from './bakery';

export type ReservationStatus = 'WAITING' | 'APPROVED' | 'PARTIAL_APPROVED' | 'PAYMENT_COMPLETED';
export type CustomerReservationStatus = ReservationStatus | 'CANCELED';
export type OwnerReservationStatus = ReservationStatus | 'OWNER_REJECTED' | 'CUSTOMER_CANCELED';
export type OwnerReservationStatusQuery = Exclude<ReservationStatus, 'PARTIAL_APPROVED'> | 'CANCELED';

export interface Reservation {
  /** 예약 신청 Id */
  reservationId: number;
  /** 예약 신청 날짜 */
  reservationDate: string;
  /** 예약 접수 String */
  reservationNumber?: string;
  /** 총 가격 */
  totalPrice: number;
  /** pickup 데드라인 */
  pickupDeadline?: string;
  /** 전체 상품 종류 수 */
  totalReservationProducts?: number;
  /** 대표 상품 이름 */
  mainReservationProductName?: string;
}

export interface CustomerReservation extends Reservation {
  /** 예약 상태 */
  status: CustomerReservationStatus;
  bakeryId: number;
  bakeryName: string;
  profileImage: string;
  cancelDetail?: string;
}
export interface OwnerReservation extends Reservation {
  /** 예약 상태 */
  status: OwnerReservationStatus;
  consumerNickname: string;
  cancelDetail?: string;
  approveDate?: string;
}

export interface ReservationProduct {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  breadImage: string;
}

export interface CustomerReservationDetail {
  bakery: Pick<Bakery, 'name' | 'address' | 'phone'> & { bakeryId: number; profileImage: string };
  reservation: Omit<CustomerReservation, 'bakeryId' | 'bakeryName' | 'profileImage'> & {
    reservationItems: ReservationProduct[];
  };
}

export interface OwnerReservationDetail extends OwnerReservation {
  reservationItems: ReservationProduct[];
  paymentDate?: string;
  consumerPhone: string;
}

export interface PageInfo {
  totalElements: number;
  totalPages: number;
  currPage: number;
  isLast: boolean;
}

export interface CustomerReservations {
  reservations: CustomerReservation[];
  pageInfo: PageInfo;
}

export interface OwnerReservations {
  reservations: OwnerReservation[];
  pageInfo: PageInfo;
}

export interface ApprovedReservationInfo {
  status: 'APPROVED' | 'PARTIAL_APPROVED';
  reservationItems: Pick<ReservationProduct, 'productId' | 'quantity'>[];
}

export interface CancelReservationInfo {
  status: 'OWNER_REJECTED';
  reason: string;
}

export type ReservationOptionStep = 'APPOVE_STEP' | 'QUANTITY_STEP' | 'REASON_STEP';
