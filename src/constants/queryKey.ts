import { CustomerReservationStatus } from '@/types/reservation';

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
  CUSTOMER_RESERVATION_QUERY_KEY: (status: CustomerReservationStatus) => [BASE_KEY.CUSTOMER, 'RESERVATION', status],
};
