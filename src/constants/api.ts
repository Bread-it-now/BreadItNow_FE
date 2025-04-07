import { CustomerReservationStatus, OwnerReservationStatusQuery } from '@/types/reservation';

const API_SUFFIX = 'api';
export const API_VERSION_PREFIX = 'api/v1';

export const MODULE = {
  AUTH: `auth-${API_SUFFIX}`,
  CUSTOMER: `customer-${API_SUFFIX}`,
  OWNER: `owner-${API_SUFFIX}`,
};

export const CONTROLLER = {
  AUTH: {
    AUTH: 'auth',
    TOKEN: 'token',
    EMAIL: 'email',
    PHONE: 'phone',
  },
  CUSTOMER: {
    CUSTOMER: 'customer',
    ALERT: 'alert',
    NOTIFICATION: 'notification',
    RESERVATION: 'reservation',
    REGION: 'region',
    SEARCH: 'search',
    BAKERY: 'bakery',
    PRODUCT: 'product',
  },
  OWNER: {
    OWNER: 'owner',
    BAKERY: 'bakery',
    BAKERY_PRODUCT: 'bakery-product',
    BREAD_CATEGORY: 'bread-category',
    NOTIFICATION: 'notification',
    RESERVATION: 'reservation',
  },
};

/** Module + API Version Prefix + Contorller + End-Point */
export const API_END_POINT = {
  /** AUTH */
  AUTH: {
    SIGN_IN: `${MODULE.AUTH}/${API_VERSION_PREFIX}/${CONTROLLER.AUTH.AUTH}/sign-in`,
    SIGN_UP: `${MODULE.AUTH}/${API_VERSION_PREFIX}/${CONTROLLER.AUTH.AUTH}/sign-up`,
  },
  /** CUSTOMER */

  // RESERVATION
  CUSTOMER_RESERVATIONS: (reservationStatus: CustomerReservationStatus | 'ALL', page: number, size: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}?status=${reservationStatus}&page=${page}&size=${size}`,
  CUSTOMER_RESERVATION_DETAIL: (reservationId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}/${reservationId}`,
  CUSTOMER_RESERVATION_CANCEL: (reservationId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}/${reservationId}/cancel`,
  CREATE_RESERVATION: () => `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}`,

  /** OWNER */
  // BAKERY
  BAKERY_INFO: (bakeryId: number) => `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY}/${bakeryId}`,
  BAKERY_PRODUCTS: (bakeryId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY}/bakery-product/${bakeryId}`,
  CHANGE_STOCK_QUANTITY: (bakeryId: number, productId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY}/bakery-product/${bakeryId}/product/${productId}/stock`,
  CHANGE_OPERATING_STATUS: (bakeryId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY}/${bakeryId}/operating-status`,

  // RESERVATION
  OWNER_RESERVATIONS: (reservationStatus: OwnerReservationStatusQuery, page: number, size: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.RESERVATION}?status=${reservationStatus}&page=${page}&size=${size}`,
  OWNER_RESERVATION_DETAIL: (reservationId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.RESERVATION}/${reservationId}`,
  CHANGE_RESERVATION_STATUS: (reservationId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.RESERVATION}/${reservationId}/status`,
};
