import { CustomerReservationStatus, OwnerReservationStatusQuery } from '@/types/reservation';

export const BASE_KEY = {
  OWNER: 'OWNER',
  CUSTOMER: 'CUSTOMER',
  AUTH: 'AUTH',
};

export const BAKERY_QUERY_KEY = {
  BAKERY_INFO: (bakeryId: number) => [BASE_KEY.OWNER, 'BAKERY', bakeryId],
  BAKERY_PRODUCTS: (bakeryId: number) => [BASE_KEY.OWNER, 'BAKERY', bakeryId, 'PRODUCT'],
};

export const RESERVATION_QUERY_KEY = {
  CUSTOMER_RESERVATION: (status: CustomerReservationStatus | 'ALL') => [BASE_KEY.CUSTOMER, 'RESERVATION', status],
  CUSTOMER_RESERVATION_DETAIL: (reservationId: number) => [BASE_KEY.CUSTOMER, 'RESERVATION', reservationId],
  OWNER_RESERVATION: (status: OwnerReservationStatusQuery) => [BASE_KEY.OWNER, 'RESERVATION', status],
  OWNER_RESERVATION_DETAIL: (reservationId: number) => [BASE_KEY.OWNER, 'RESERVATION', reservationId],
};
