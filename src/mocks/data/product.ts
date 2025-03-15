/** 빵집 메뉴 데이터 조회 API를 통해 조회된 데이터 */
import { ProductStockCardProps } from '@/components/productstockcard/ProductStockCard';
import bread from '@/assets/images/bread.png';
export const mockProducts: {
  breadProducts: ProductStockCardProps[];
  otherProducts: ProductStockCardProps[];
} = {
  breadProducts: [
    {
      id: 1,
      bakeryId: 1,
      productType: 'BREAD',
      name: '식빵',
      price: 3000,
      image: bread,
      description: '신선한 식빵입니다.',
      releaseTimes: ['08:00', '12:00', '16:00'],
      stock: 100,
      isActive: true,
      breadCategories: [
        {
          categoryId: 1,
          categoryName: '식빵',
        },
      ],
      displayOrder: 0,
    },
    {
      id: 2,
      bakeryId: 2,
      productType: 'BREAD',
      name: '식빵',
      price: 3000,
      image: bread,
      description: '신선한 식빵입니다.',
      releaseTimes: ['08:00', '12:00', '16:00'],
      stock: 100,
      isActive: true,
      breadCategories: [
        {
          categoryId: 1,
          categoryName: '식빵',
        },
      ],
      displayOrder: 0,
    },
    {
      id: 3,
      bakeryId: 3,
      productType: 'BREAD',
      name: '식빵',
      price: 3000,
      image: bread,
      description: '신선한 식빵입니다.',
      releaseTimes: ['08:00', '12:00', '16:00'],
      stock: 0,
      isActive: true,
      breadCategories: [
        {
          categoryId: 1,
          categoryName: '식빵',
        },
      ],
      displayOrder: 0,
    },
  ],
  otherProducts: [
    {
      id: 4,
      bakeryId: 4,
      productType: 'OTHER',
      name: '딸기잼',
      price: 3400,
      image: bread,
      description: '딸기 가득한 딸기잼입니다.',
      stock: 90,
      isActive: true,
      displayOrder: 3,
    },
  ],
};
