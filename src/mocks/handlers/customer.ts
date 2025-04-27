import { http, HttpResponse } from 'msw';
import { MODULE, CONTROLLER, API_VERSION_PREFIX } from '@/constants/api';
import { CustomerReservation, CustomerReservationStatus } from '@/types/reservation';
import { mockCustomerReservationDetailList, mockCustomerReservations } from '../data/reservation';
import { mockFavoriteBakeries, mockFavoriteProducts, mockHotProducts, mockNotificationSettings } from '../data/bakery';
import { FilterKey, HotFilterKey } from '@/types/bakery';
import { NotificationType } from '@/types/notification';
import { mockCustomerNotifications } from '../data/notification';

const getCustomerReservations = http.get(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}`,
  async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') as string);
    const size = parseInt(url.searchParams.get('size') as string);
    const status: CustomerReservationStatus | 'ALL' = url.searchParams.get('status') as
      | CustomerReservationStatus
      | 'ALL';

    const reservationsByStatus: CustomerReservation[] =
      status === 'ALL'
        ? [...mockCustomerReservations]
        : mockCustomerReservations.filter((reservation) => reservation.status === status);

    const start = page * size;
    const end = start + size;

    const reservations = reservationsByStatus.slice(start, end);
    const totalElements = reservationsByStatus.length;
    const totalPages = Math.ceil(totalElements / size);
    const isLast = page + 1 >= totalPages;

    return new HttpResponse(
      JSON.stringify({
        data: {
          reservations,
          pageInfo: {
            totalElements,
            totalPages,
            currPage: page,
            isLast,
          },
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const getCustomerReservationDetail = http.get(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}/:reservationId`,
  async ({ params }) => {
    const reservationId: number = Number(params?.reservationId);

    const reservationDetail = mockCustomerReservationDetailList.filter(
      (reservationDetail) => reservationDetail.reservation.reservationId === reservationId,
    )[0];

    return new HttpResponse(
      JSON.stringify({
        data: {
          ...reservationDetail,
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const cancelCustomerReservation = http.patch(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}/:reservationId/cancel`,
  async ({ params }) => {
    const reservationId: number = Number(params?.reservationId);

    const cancelResponseData: {
      reservationId: number;
      status: CustomerReservationStatus;
    } = {
      reservationId: reservationId,
      status: 'CANCELED',
    };

    return new HttpResponse(
      JSON.stringify({
        data: {
          ...cancelResponseData,
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const getDoNotDisturbSetting = http.get(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/do-not-disturb`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        data: {
          active: true,
          days: ['MON', 'TUE', 'WED'],
          startTime: '22:00',
          endTime: '07:00',
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const onOffDoNotDisturbSetting = http.patch(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/do-not-disturb`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        data: {
          active: false,
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const editDoNotDisturbSetting = http.put(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/do-not-disturb`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        data: null,
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const getProductNotificationSettings = http.get(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/product`,
  async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') as string);
    const size = parseInt(url.searchParams.get('size') as string);

    const start = page * size;
    const end = start + size;

    const alerts = mockNotificationSettings.slice(start, end);
    const totalElements = mockNotificationSettings.length;
    const totalPages = Math.ceil(totalElements / size);
    const isLast = page + 1 >= totalPages;

    return new HttpResponse(
      JSON.stringify({
        data: {
          alerts,
          pageInfo: {
            totalElements,
            totalPages,
            currPage: page,
            isLast,
          },
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const onOffProductNotificationbSetting = http.patch(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/product/:productId/toggle`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        data: {
          active: false,
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const deleteProductNotificationSetting = http.delete(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/product/:productId`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        data: null,
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const getFavoriteBakeryList = http.get(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.BAKERY}/favorite`,
  async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') as string);
    const size = parseInt(url.searchParams.get('size') as string);
    const sort: FilterKey = url.searchParams.get('sort') as FilterKey;

    const sortedFavorites = [...mockFavoriteBakeries];

    switch (sort) {
      case 'distance':
        sortedFavorites.sort((a, b) => a.distance - b.distance);
        break;

      default:
        break; // 정렬 없음
    }

    const start = page * size;
    const end = start + size;

    const favorites = sortedFavorites.slice(start, end);
    const totalElements = sortedFavorites.length;
    const totalPages = Math.ceil(totalElements / size);
    const isLast = page + 1 >= totalPages;

    return new HttpResponse(
      JSON.stringify({
        data: {
          favorites,
          pageInfo: {
            totalElements,
            totalPages,
            currPage: page,
            isLast,
          },
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const addFavoriteBakery = http.post(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.BAKERY}/:bakeryId/favorite`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        data: null,
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const deleteFavoriteBakery = http.delete(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.BAKERY}/:bakeryId/favorite`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        data: null,
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const getFavoriteProductList = http.get(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.PRODUCT}/favorite`,
  async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') as string);
    const size = parseInt(url.searchParams.get('size') as string);

    const sortedFavoriteProducts = [...mockFavoriteProducts];

    const start = page * size;
    const end = start + size;

    const favorites = sortedFavoriteProducts.slice(start, end);
    const totalElements = sortedFavoriteProducts.length;
    const totalPages = Math.ceil(totalElements / size);
    const isLast = page + 1 >= totalPages;

    return new HttpResponse(
      JSON.stringify({
        data: {
          favorites,
          pageInfo: {
            totalElements,
            totalPages,
            currPage: page,
            isLast,
          },
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const addFavoriteProduct = http.post(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.PRODUCT}/:productId/favorite`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        data: null,
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const deleteFavoriteProduct = http.delete(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.PRODUCT}/:productId/favorite`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        data: null,
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const getCustomerNotifications = http.get(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.NOTIFICATION}`,
  async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') as string);
    const size = parseInt(url.searchParams.get('size') as string);
    const type = url.searchParams.get('type') as NotificationType | 'ALL';

    const mockNotifications =
      type === 'ALL'
        ? mockCustomerNotifications
        : mockCustomerNotifications.filter((notification) => notification.type === type);

    const start = page * size;
    const end = start + size;

    const notifications = mockNotifications.slice(start, end);
    const totalElements = mockNotifications.length;
    const totalPages = Math.ceil(totalElements / size);
    const isLast = page + 1 >= totalPages;

    return new HttpResponse(
      JSON.stringify({
        data: {
          notifications,
          pageInfo: {
            totalElements,
            totalPages,
            currPage: page,
            isLast,
          },
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const readCustomerNotification = http.patch(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.NOTIFICATION}/:notificationId/read`,
  async ({ params }) => {
    const notificationId: number = Number(params?.notificationId);

    return new HttpResponse(
      JSON.stringify({
        data: {
          notificationId,
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const deleteCustomerNotification = http.patch(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.NOTIFICATION}/:notificationId`,
  async ({ params }) => {
    const notificationId: number = Number(params?.notificationId);

    return new HttpResponse(
      JSON.stringify({
        data: {
          notificationId,
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const getTodayAlertProducts = http.get(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.ALERT}/today`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        data: {
          alerts: [
            {
              bakeryId: 1,
              bakeryName: '달콤한 아침',
              productId: 1,
              productName: '모카 크림빵',
              releaseTimes: ['8:00', '10:00'],
            },
            {
              bakeryId: 2,
              bakeryName: '라 메종 뒤 팡',
              productId: 2,
              productName: '생크림 식빵',
              releaseTimes: ['8:00', '10:00', '14:00'],
            },
            {
              bakeryId: 3,
              bakeryName: '빵굽는 집',
              productId: 3,
              productName: '크루아상',
              releaseTimes: ['8:00', '10:00'],
            },
          ],
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const getHotProducts = http.get(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.PRODUCT}/hot`,
  async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') as string);
    const size = parseInt(url.searchParams.get('size') as string);
    const sort: HotFilterKey = url.searchParams.get('sort') as HotFilterKey;

    const sortedHotProducts =
      sort === 'reservation' ? [...mockHotProducts] : mockHotProducts.slice().sort((a, b) => b.price - a.price);

    const start = page * size;
    const end = start + size;

    const hotProducts = sortedHotProducts.slice(start, end);
    const totalElements = sortedHotProducts.length;
    const totalPages = Math.ceil(totalElements / size);
    const isLast = page + 1 >= totalPages;

    return new HttpResponse(
      JSON.stringify({
        data: {
          hotProducts,
          pageInfo: {
            totalElements,
            totalPages,
            currPage: page,
            isLast,
          },
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

export default [
  getCustomerReservations,
  getCustomerReservationDetail,
  cancelCustomerReservation,
  getDoNotDisturbSetting,
  onOffDoNotDisturbSetting,
  editDoNotDisturbSetting,
  getProductNotificationSettings,
  onOffProductNotificationbSetting,
  deleteProductNotificationSetting,
  getFavoriteBakeryList,
  addFavoriteBakery,
  deleteFavoriteBakery,
  getFavoriteProductList,
  addFavoriteProduct,
  deleteFavoriteProduct,
  getCustomerNotifications,
  readCustomerNotification,
  deleteCustomerNotification,
  getTodayAlertProducts,
  getHotProducts,
];
