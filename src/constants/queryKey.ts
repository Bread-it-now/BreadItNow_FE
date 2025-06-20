import { FilterKey, HotFilterKey } from '@/types/bakery';
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
  FAVORITE_PRODUCTS: (sort: FilterKey) => [BASE_KEY.CUSTOMER, 'BAKERY', 'FAVORITE', 'PRODUCT', sort],
  HOT_PRODUCTS: (sort: HotFilterKey) => [BASE_KEY.CUSTOMER, 'PRODUCT', 'HOT', sort],
  HOT_BAKERIES: (sort: HotFilterKey) => [BASE_KEY.CUSTOMER, 'BAKERY', 'HOT', sort],
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
  CUSTOMER_NOTIFICATIONS: (type: string) => [BASE_KEY.CUSTOMER, 'NOTIFICATION', type],
  OWNER_NOTIFICATIONS: () => [BASE_KEY.OWNER, 'NOTIFICATION'],
  TODAY_ALERT_PRODUCTS: () => [BASE_KEY.CUSTOMER, 'NOTIFICATION', 'TODAY_ALERT_PRODUCTS'],
};

export const SEARCH_QUERY_KEY = {
  AUTOCOMPLETE: (keyword: string) => [BASE_KEY.CUSTOMER, 'SEARCH', 'AUTOCOMPLETE', keyword],
  BAKERIES: (keyword: string, sort: FilterKey) => [BASE_KEY.CUSTOMER, 'SEARCH', 'BAKERIES', keyword, sort],
  PRODUCTS: (keyword: string, sort: FilterKey) => [BASE_KEY.CUSTOMER, 'SEARCH', 'PRODUCTS', keyword, sort],
};

export const REGION_QUERY_KEY = {
  SIDO_REGIONS: () => [BASE_KEY.CUSTOMER, 'REGION'],
  GUGUN_REGIONS: (sidoCode: string) => [BASE_KEY.CUSTOMER, 'REGION', sidoCode],
  LOCATION_REGION: (latitude: number, longitude: number) => [BASE_KEY.CUSTOMER, 'REGION', latitude, longitude],
};
