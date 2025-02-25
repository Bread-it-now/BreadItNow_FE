export type ReservationStatus = 'WAITING' | 'APPROVED' | 'PARTIALLY_APPROVED' | 'CANCELED' | 'PAYMENT_COMPLETED';

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
