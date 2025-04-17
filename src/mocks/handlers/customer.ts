import { http, HttpResponse } from 'msw';
import { MODULE, CONTROLLER, API_VERSION_PREFIX } from '@/constants/api';
import { CustomerReservationStatus } from '@/types/reservation';
import { customerReservationDetails, CustomerReservations } from '../data/reservation';

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

export default [
  getCustomerReservations,
  getCustomerReservationDetail,
  cancelCustomerReservation,
  getDoNotDisturbSetting,
  onOffDoNotDisturbSetting,
  editDoNotDisturbSetting,
];
