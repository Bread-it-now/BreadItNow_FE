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
  CUSTOMNER: {
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

  /** CUSTOMER */

  /** OWNER */
  // BAKERY
  BAKERY_INFO: (bakeryId: number) => `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY}/${bakeryId}`,
  BAKERY_PRODUCTS: (bakeryId: number) =>
    `${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY}/bakery-product/${bakeryId}`,
};
