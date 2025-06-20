import { FilterKey, HotFilterKey } from '@/types/bakery';
import { NotificationType } from '@/types/notification';
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
    FAVORITE: 'favorite',
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
  /** CUSTMOMER - BAKERY */
  FAVORITE_BAKERIES: (page: number, size: number, sort: FilterKey, latitude: number, longitude: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.BAKERY}/favorite?page=${page}&size=${size}&sort=${sort}&latitude=${latitude}&longitude=${longitude}`,
  ADD_FAVORITE_BAKERY: (bakeryId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.BAKERY}/${bakeryId}/favorite`,
  DELETE_FAVORITE_BAKERY: (bakeryId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.BAKERY}/${bakeryId}/favorite`,

  RESERVATION: (reservationId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}/${reservationId}`,
  /** CUSTOMER - PRODUCT */
  FAVORITE_PRODUCTS: (page: number, size: number, sort: FilterKey, latitude: number, longitude: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.PRODUCT}/favorite?page=${page}&size=${size}&sort=${sort}&latitude=${latitude}&longitude=${longitude}`,
  ADD_FAVORITE_PRODUCT: (productId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.PRODUCT}/${productId}/favorite`,
  DELETE_FAVORITE_PRODUCT: (productId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.BAKERY}/${productId}/favorite`,
  HOT_PRODUCTS: (page: number, size: number, sort: HotFilterKey) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.PRODUCT}/hot?page=${page}&size=${size}&sort=${sort}`,

  MY_INFO: () => `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.CUSTOMER}/me/info`,

  /** CUSTOMER - REGION */
  SIDO_REGIONS: () => `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.REGION}/sido`,
  GUGUN_REGIONS: (sidoCode: string) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.REGION}/sido/${sidoCode}/gugun`,
  UPDATE_REGION: () => `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.CUSTOMER}/me/region`,
  LOCATION_REGION: (latitude: number, longitude: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.REGION}/location?latitude=${latitude}&longitude=${longitude}`,

  /** CUSTOMER - SEARCH */
  SEARCH_AUTOCOMPLETE: (keyword: string) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.SEARCH}/autocomplete?keyword=${keyword}`,
  SEARCH_BAKERIES: (
    page: number,
    size: number,
    sort: FilterKey,
    keyword: string,
    latitude: number,
    longitude: number,
  ) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.SEARCH}/bakery?page=${page}&size=${size}&sort=${sort}&keyword=${keyword}&latitude=${latitude}&longitude=${longitude}`,
  SEARCH_PRODUCTS: (
    page: number,
    size: number,
    sort: FilterKey,
    keyword: string,
    latitude: number,
    longitude: number,
  ) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.SEARCH}/product?page=${page}&size=${size}&sort=${sort}&keyword=${keyword}&latitude=${latitude}&longitude=${longitude}`,

  /** CUSTOMER - BAKERY */
  HOT_BAKERIES: (page: number, size: number, sort: HotFilterKey, latitude: number, longitude: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.BAKERY}/hot?page=${page}&size=${size}&sort=${sort}&latitude=${latitude}&longitude=${longitude}`,

  /** AUTH */
  AUTH: {
    SIGN_IN: `${MODULE.AUTH}/${API_VERSION_PREFIX}/${CONTROLLER.AUTH.AUTH}/sign-in`,
    SIGN_UP: `${MODULE.AUTH}/${API_VERSION_PREFIX}/${CONTROLLER.AUTH.AUTH}/sign-up`,
    LOGOUT: `${MODULE.AUTH}/${API_VERSION_PREFIX}/${CONTROLLER.AUTH.AUTH}/logout`,
  },

  /** CUSTOMER */
  CUSTOMER_INIT: `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.CUSTOMER}/me/init`,

  // ALERT
  ADD_NOTFICATION_SETTING: (productId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/product/${productId}`,
  DELETE_PRODUCT_NOTFICATION_SETTING: (productId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/product/${productId}`,
  ONOFF_PRODUCT_NOTIFICATION_SETTING: (productId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/product/${productId}/toggle`,
  PRODUCT_NOTIFICATION_SETTINGS: (page: number, size: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/product?page=${page}&size=${size}`,
  DO_NOT_DISTURB_SETTING: () => `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/do-not-disturb`,
  EDIT_DO_NOT_DISTURB_SETTING: () =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/do-not-disturb`,
  ONOFF_DO_NOT_DISTURB_SETTING: () =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/do-not-disturb/toggle`,
  TODAY_ALERT_PRODUCT: () => `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/today`,

  /** CUSTOMER - NOTIFICATION */
  CUSTOMER_NOTIFICATIONS: (page: number, size: number, type: NotificationType | 'ALL') =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.NOTIFICATION}?type=${type}&page=${page}&size=${size}&sort=createdAt`,
  READ_CUSTOMER_NOTIFICATION: (notificationId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.NOTIFICATION}/${notificationId}/read`,
  DELETE_CUSTOMER_NOTIFICATION: (notificationId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.NOTIFICATION}/${notificationId}`,

  /** ALERT */
  ALERT_PRODUCT: (productId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/${CONTROLLER.CUSTOMER.PRODUCT}/${productId}`,
  CANCEL_ALERT_PRODUCT: (productId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/${CONTROLLER.CUSTOMER.PRODUCT}/${productId}`,

  /** FAVORITE */
  BOOKMARK_PRODUCT: (productId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.PRODUCT}/${productId}/${CONTROLLER.CUSTOMER.FAVORITE}`,
  CANCEL_BOOKMARK_PRODUCT: (productId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.PRODUCT}/${productId}/${CONTROLLER.CUSTOMER.FAVORITE}`,

  BAKERY_BOOKMARK: (bakeryId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.BAKERY}/${bakeryId}/${CONTROLLER.CUSTOMER.FAVORITE}`,
  BAKERY_CANCEL_BOOKMARK: (bakeryId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.BAKERY}/${bakeryId}/${CONTROLLER.CUSTOMER.FAVORITE}`,

  // RESERVATION
  CUSTOMER_RESERVATIONS: (reservationStatus: CustomerReservationStatus | 'ALL', page: number, size: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}?status=${reservationStatus}&page=${page}&size=${size}`,
  CUSTOMER_RESERVATION_DETAIL: (reservationId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}/${reservationId}`,
  CUSTOMER_RESERVATION_CANCEL: (reservationId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}/${reservationId}/cancel`,
  CREATE_RESERVATION: () => `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}`,

  CUSTOMER_BAKERY_DETAIL_INFO: (customerId: number) =>
    `${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.BAKERY}/${customerId}/detail`,

  /** OWNER */
  OWNER_INIT: `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY}`,
  OWNER_EDIT_PASSWORD: () => `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.OWNER}/me/password`,

  // BAKERY
  BAKERY_INFO: (bakeryId: number) => `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY}/${bakeryId}`,
  CHANGE_OPERATING_STATUS: (bakeryId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY}/${bakeryId}/operating-status`,

  // BAKERY_PRODUCT
  CREATE_PRODUCT: (bakeryId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/${bakeryId}`,
  EDIT_PRODUCT: (bakeryId: number, productId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/${bakeryId}/product/${productId}`,
  DELETE_PRODUCT: (bakeryId: number, productId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/${bakeryId}/product/${productId}`,
  DELETE_PRODUCTS: (bakeryId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/${bakeryId}/products`,
  HIDE_PRODUCTS: (bakeryId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/${bakeryId}/products/hide`,
  BAKERY_PRODUCT: (bakeryId: number, productId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/${bakeryId}/product/${productId}`,
  BAKERY_PRODUCTS: (bakeryId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/${bakeryId}`,
  REORDER_PRODUCTS: (bakeryId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/${bakeryId}/order`,
  CHANGE_STOCK_QUANTITY: (bakeryId: number, productId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/${bakeryId}/product/${productId}/stock`,

  // RESERVATION
  OWNER_RESERVATIONS: (reservationStatus: OwnerReservationStatusQuery, page: number, size: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.RESERVATION}?status=${reservationStatus}&page=${page}&size=${size}`,
  OWNER_RESERVATION_DETAIL: (reservationId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.RESERVATION}/${reservationId}`,
  CHANGE_RESERVATION_STATUS: (reservationId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.RESERVATION}/${reservationId}/status`,

  /** OWNER - NOTIFICATION */
  OWNER_NOTIFICATIONS: (page: number, size: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.NOTIFICATION}?page=${page}&size=${size}&sort=createdAt`,
  READ_OWNER_NOTIFICATION: (notificationId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.NOTIFICATION}/${notificationId}/read`,
  DELETE_OWNER_NOTIFICATION: (notificationId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.NOTIFICATION}/${notificationId}`,
  SEND_FRESH_PRODUCT_NOTIFICATION: () => `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.NOTIFICATION}`,
};
