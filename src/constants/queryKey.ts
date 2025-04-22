import { FilterKey } from '@/types/bakery';
import { CustomerReservationStatus, OwnerReservationStatusQuery } from '@/types/reservation';

export const BASE_KEY = {
  OWNER: 'OWNER',
  CUSTOMER: 'CUSTOMER',
  AUTH: 'AUTH',
};

export const BAKERY_QUERY_KEY = {
  BAKERY_INFO: (bakeryId: number) => [BASE_KEY.OWNER, 'BAKERY', bakeryId],
  BAKERY_PRODUCTS: (bakeryId: number) => [BASE_KEY.OWNER, 'BAKERY', bakeryId, 'PRODUCT'],
  BAKERY_PRODUCT: (bakeryId: number, productId: number) => [BASE_KEY.OWNER, 'BAKERY', bakeryId, 'PRODUCT', productId],
  FAVORITE_BAKERIES: (sort: FilterKey) => [BASE_KEY.CUSTOMER, 'BAKERY', 'FAVORITE', sort],
};

export const RESERVATION_QUERY_KEY = {
  CUSTOMER_RESERVATION: (status: CustomerReservationStatus | 'ALL') => [BASE_KEY.CUSTOMER, 'RESERVATION', status],
  CUSTOMER_RESERVATION_DETAIL: (reservationId: number) => [BASE_KEY.CUSTOMER, 'RESERVATION', reservationId],
  OWNER_RESERVATION: (status: OwnerReservationStatusQuery) => [BASE_KEY.OWNER, 'RESERVATION', status],
  OWNER_RESERVATION_DETAIL: (reservationId: number) => [BASE_KEY.OWNER, 'RESERVATION', reservationId],
};

export const NOTIFICATION_QUERY_KEY = {
  DO_NOT_DISTURB: () => [BASE_KEY.CUSTOMER, 'NOTIFICATION', 'DO-NOT_DISTURB'],
  PRODUCT_NOTIFICATION_SETTINGS: (size: number) => [BASE_KEY.CUSTOMER, 'NOTIFICATION', 'DO-NOT_DISTURB', size],
};
