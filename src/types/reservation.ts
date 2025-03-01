import { Bakery } from './bakery';

export type ReservationStatus = 'WAITING' | 'APPROVED' | 'PARTIALLY_APPROVED' | 'CANCELED' | 'PAYMENT_COMPLETED';

/** 예약 상품의 이름 배열(ReservationItemsNames) 필요 */
export interface Reservation {
  /** 예약 신청 Id */
  reservationId: number;
  /** 예약 신청 날짜 */
  reservationDate: string;
  /** 예약 접수 String */
  reservationNumber?: string;
  /** 예약 상태 */
  status: ReservationStatus;
  /** 빵집 ID */
  bakeryId: number;
  /** 빵집 이름 */
  bakeryName: string;
  /** 총 가격 */
  totalPrice: number;
  /** pickup 데드라인 */
  pickupDeadline?: string;
}

export interface ReservationItem {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  breadImage: string;
}

export interface ReservationDetail {
  bakery: Pick<Bakery, 'name' | 'address' | 'phone'> & { bakeryId: number; profileImage: string };
  reservation: Omit<Reservation, 'bakeryName' | 'bakeryId'> & {
    reservationItems: ReservationItem[];
    /** 취소 사유 */
    cancelDetail?: string;
  };
}
