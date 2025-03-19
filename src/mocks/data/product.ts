/** 빵집 메뉴 데이터 조회 API를 통해 조회된 데이터 */
import bread from '@/assets/images/bread.png';
import coffee from '@/assets/images/coffee.png';
import { Product } from '@/types/bakery';
export const mockProducts: {
  breadProducts: Product[];
  otherProducts: Product[];
} = {
  breadProducts: [
    {
      productId: 1,
      bakeryId: 1,
      productType: 'BREAD',
      name: '식빵',
      price: 3000,
      image: bread,
      description: '신선한 식빵입니다.',
      releaseTimes: ['08:00', '12:00', '16:00'],
      stock: 0,
      isActive: false,
      breadCategories: [
        {
          categoryId: 1,
          categoryName: '식빵',
        },
      ],
      displayOrder: 1,
    },
    {
      productId: 2,
      bakeryId: 1,
      productType: 'BREAD',
      name: '꽈배기',
      price: 3000,
      image: bread,
      description: '신선한 꽈배기입니다.',
      releaseTimes: ['08:00', '12:00', '16:00'],
      stock: 100,
      isActive: true,
      breadCategories: [
        {
          categoryId: 2,
          categoryName: '꽈배기',
        },
      ],
      displayOrder: 2,
    },
    {
      productId: 3,
      bakeryId: 1,
      productType: 'BREAD',
      name: '소보로',
      price: 3000,
      image: bread,
      description: '신선한 소보로입니다.',
      releaseTimes: ['08:00', '12:00', '16:00'],
      stock: 100,
      isActive: false,
      breadCategories: [
        {
          categoryId: 3,
          categoryName: '소보로',
        },
      ],
      displayOrder: 3,
    },
    {
      productId: 4,
      bakeryId: 1,
      productType: 'BREAD',
      name: '도넛츠',
      price: 3000,
      image: bread,
      description: '신선한 도넛츠입니다.',
      releaseTimes: ['08:00', '12:00', '16:00'],
      stock: 100,
      isActive: true,
      breadCategories: [
        {
          categoryId: 4,
          categoryName: '도넛츠',
        },
      ],
      displayOrder: 4,
    },
    {
      productId: 5,
      bakeryId: 1,
      productType: 'BREAD',
      name: '소금빵',
      price: 3000,
      image: bread,
      description: '신선한 소금빵입니다.',
      releaseTimes: ['08:00', '12:00', '16:00'],
      stock: 100,
      isActive: true,
      breadCategories: [
        {
          categoryId: 5,
          categoryName: '소금빵',
        },
      ],
      displayOrder: 5,
    },
    {
      productId: 6,
      bakeryId: 1,
      productType: 'BREAD',
      name: '피자빵',
      price: 3000,
      image: bread,
      description: '신선한 피자빵입니다.',
      releaseTimes: ['08:00', '12:00', '16:00'],
      stock: 100,
      isActive: true,
      breadCategories: [
        {
          categoryId: 6,
          categoryName: '피자빵',
        },
      ],
      displayOrder: 6,
    },
    {
      productId: 7,
      bakeryId: 1,
      productType: 'BREAD',
      name: '팥빵',
      price: 3000,
      image: bread,
      description: '신선한 팥빵입니다.',
      releaseTimes: ['08:00', '12:00', '16:00'],
      stock: 100,
      isActive: true,
      breadCategories: [
        {
          categoryId: 7,
          categoryName: '팥빵',
        },
      ],
      displayOrder: 7,
    },
  ],
  otherProducts: [
    {
      productId: 10,
      bakeryId: 1,
      productType: 'OTHER',
      name: '커피-1',
      price: 3000,
      image: coffee,
      description: '커피 한잔 하세요',
      stock: 100,
      isActive: true,
      breadCategories: [
        {
          categoryId: 10,
          categoryName: '커피',
        },
      ],
      displayOrder: 0,
    },
    {
      productId: 11,
      bakeryId: 1,
      productType: 'OTHER',
      name: '커피-2',
      price: 3000,
      image: coffee,
      description: '커피 한잔 하세요',
      stock: 100,
      isActive: true,
      breadCategories: [
        {
          categoryId: 10,
          categoryName: '커피',
        },
      ],
      displayOrder: 1,
    },
    {
      productId: 12,
      bakeryId: 1,
      productType: 'OTHER',
      name: '커피-3',
      price: 3000,
      image: coffee,
      description: '커피 한잔 하세요',
      stock: 100,
      isActive: true,
      breadCategories: [
        {
          categoryId: 10,
          categoryName: '커피',
        },
      ],
      displayOrder: 2,
    },
    {
      productId: 14,
      bakeryId: 1,
      productType: 'OTHER',
      name: '커피-4',
      price: 3000,
      image: coffee,
      description: '커피 한잔 하세요',
      stock: 100,
      isActive: true,
      breadCategories: [
        {
          categoryId: 10,
          categoryName: '커피',
        },
      ],
      displayOrder: 3,
    },
  ],
};
