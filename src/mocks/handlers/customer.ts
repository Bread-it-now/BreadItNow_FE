import { http, HttpResponse } from 'msw';
import { MODULE, CONTROLLER, API_VERSION_PREFIX } from '@/constants/api';
import { CustomerReservationStatus } from '@/types/reservation';
import { CustomerReservations } from '../data/reservation';

const getCustomerReservations = http.get(
  `/${MODULE.CUSTOMER}/${API_VERSION_PREFIX}/${CONTROLLER.CUSTOMER.RESERVATION}`,
  async ({ request }) => {
    const url = new URL(request.url);
    const status: CustomerReservationStatus | null = url.searchParams.get('status') as CustomerReservationStatus | null;
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

export default [getCustomerReservations];
