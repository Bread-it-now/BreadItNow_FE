import { http, HttpResponse } from 'msw';
import { Bakery } from '@/types/bakery';
import { mockBakeryInfos } from '../data/bakery';
import { mockProducts } from '../data/product';
import { MODULE, CONTROLLER, API_VERSION_PREFIX } from '@/constants/api';

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
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY}/bakery-product/:bakeryId`,
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
  `/${MODULE.OWNER}/${API_VERSION_PREFIX}/${CONTROLLER.OWNER.BAKERY}/bakery-product/:bakeryId/product/:productId/stock`,
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

export default [getBakeryInfo, getBakeryProoducts, changeStockQuantity];
