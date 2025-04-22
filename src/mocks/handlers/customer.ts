import { http, HttpResponse } from 'msw';
import { MODULE, CONTROLLER, API_VERSION_PREFIX } from '@/constants/api';
import { CustomerReservationStatus } from '@/types/reservation';
import { customerReservationDetails, CustomerReservations } from '../data/reservation';
import { mockFavoriteBakeries, mockFavoriteProducts, mockNotificationSettings } from '../data/bakery';
import { FilterKey } from '@/types/bakery';

const getCustomerReservations = http.get(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}`,
  async ({ request }) => {
    const url = new URL(request.url);
    const status: CustomerReservationStatus | 'ALL' = url.searchParams.get('status') as
      | CustomerReservationStatus
      | 'ALL';
    const FilteredCustomerReservations =
      status !== 'ALL'
        ? CustomerReservations.filter((reservation) => reservation.status === status)
        : [...CustomerReservations];

    return new HttpResponse(
      JSON.stringify({
        data: {
          reservations: FilteredCustomerReservations,
          pageInfo: { totalElements: 20, totalPages: 2, currPage: 1, isLast: false },
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

    const reservationDetail = customerReservationDetails.filter(
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
];
