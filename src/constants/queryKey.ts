export const BASE_KEY = {
  OWNER: 'OWNER',
  CUSTOMER: 'CUSTOMER',
  AUTH: 'AUTH',
};

export const BAKERY_QUERY_KEY = {
  BAKERY_INFO: (bakeryId: number) => [BASE_KEY.OWNER, 'BAKERY', bakeryId],
  BAKERY_PRODUCTS: (bakeryId: number) => [BASE_KEY.OWNER, 'BAKERY', bakeryId, 'PRODUCT'],
};
