import { http, HttpResponse } from 'msw';
import { Bakery } from '@/types/bakery';
import { mockBakeryInfos } from '../data/bakery';
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

export default [getBakeryInfo];
