import { http, HttpResponse } from 'msw';
import { Bakery, Product } from '@/types/bakery';
import { mockBakeryInfos } from '../data/bakery';
import { mockProducts, mockProductsList } from '../data/product';
import { MODULE, CONTROLLER, API_VERSION_PREFIX } from '@/constants/api';
import { OwnerReservationStatusQuery } from '@/types/reservation';
import { OwnerReservationDetails, OwnerReservations } from '../data/reservation';

const getBakeryInfo = http.get(
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY}/:bakeryId`,
  async ({ params }) => {
    const bakeryId: number = Number(params?.bakeryId);
    const bakeryInfo: Bakery[] = mockBakeryInfos.filter((bakeryInfo: Bakery) => bakeryInfo.bakeryId === bakeryId);

    if (bakeryInfo.length === 0) return new HttpResponse('Not Found', { status: 404 });
    return new HttpResponse(
      JSON.stringify({
        data: {
          ...bakeryInfo[0],
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const getBakeryProoducts = http.get(
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/:bakeryId`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        data: {
          totalCount: mockProducts.breadProducts.length + mockProducts.otherProducts.length,
          breadProducts: mockProducts.breadProducts,
          otherProducts: mockProducts.otherProducts,
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const changeStockQuantity = http.patch(
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/:bakeryId/product/:productId/stock`,
  async ({ request }) => {
    const body = (await request.json()) as { stock: number };
    const stock: number = Number(body.stock);

    return new HttpResponse(
      JSON.stringify({
        data: {
          stock: stock,
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const changeOperatingStatus = http.patch(
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY}/:bakeryId/operating-status`,
  async ({ params }) => {
    const bakeryId = params.bakeryId;

    return new HttpResponse(
      JSON.stringify({
        data: {
          bakeryId,
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const getOwnerReservations = http.get(
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.RESERVATION}`,
  async ({ request }) => {
    const url = new URL(request.url);
    const status: OwnerReservationStatusQuery = url.searchParams.get('status') as OwnerReservationStatusQuery;
    const FilteredCustomerReservations =
      status === 'APPROVED'
        ? OwnerReservations.filter(
            (reservation) => reservation.status === 'APPROVED' || reservation.status === 'PARTIAL_APPROVED',
          )
        : status === 'CANCELED'
          ? OwnerReservations.filter(
              (reservation) => reservation.status === 'CUSTOMER_CANCELED' || reservation.status === 'OWNER_REJECTED',
            )
          : OwnerReservations.filter((reservation) => reservation.status === status);

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

const getOwnerReservationDetail = http.get(
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.RESERVATION}/:reservationId`,
  async ({ params }) => {
    const reservationId: number = Number(params?.reservationId);

    const reservationDetail = OwnerReservationDetails.filter(
      (reservationDetail) => reservationDetail.reservationId === reservationId,
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

const changeReservationStatus = http.patch(
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.RESERVATION}/:reservationId/status`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        stauts: 'SUCCESS',
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const deleteProduct = http.delete(
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/:bakeryId/product/:productId`,
  async ({ params }) => {
    const productId: number = Number(params?.productId);
    return new HttpResponse(
      JSON.stringify({
        data: {
          productId,
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const deleteProducts = http.delete(
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/:bakeryId/products`,
  async ({ request }) => {
    const body = (await request.json()) as { productIds: number[] };

    return new HttpResponse(
      JSON.stringify({
        data: {
          deletedCount: body.productIds.length,
        },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const reorderProducts = http.patch(
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/:bakeryId/order`,
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

const getBakeryProoduct = http.get(
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/:bakeryId/product/:productId`,
  async ({ params }) => {
    const productId: number = Number(params?.productId);
    const product = mockProductsList.filter((product: Product) => product.productId === productId)[0];
    return new HttpResponse(
      JSON.stringify({
        data: product,
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const createProduct = http.post(
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/:bakeryId`,

  async () => {
    return new HttpResponse(
      JSON.stringify({
        data: { productId: mockProductsList.length + 1 },
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

const editProduct = http.put(
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY_PRODUCT}/:bakeryId/product/:productId`,

  async ({ params }) => {
    const productId: number = Number(params?.productId);
    return new HttpResponse(
      JSON.stringify({
        data: mockProductsList.filter((product: Product) => product.productId === productId)[0],
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

export default [
  getBakeryInfo,
  getBakeryProoducts,
  changeStockQuantity,
  changeOperatingStatus,
  getOwnerReservations,
  getOwnerReservationDetail,
  changeReservationStatus,
  deleteProduct,
  deleteProducts,
  reorderProducts,
  getBakeryProoduct,
  createProduct,
  editProduct,
];
