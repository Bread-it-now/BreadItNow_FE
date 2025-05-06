import { BakeryCardProps } from '@/components/bakerycard/BakeryCard';
import bakery from '@/assets/images/bakery.png';
import bread from '@/assets/images/bread.png';
import {
  Bakery,
  FavoriteBakery,
  FavoriteProduct,
  HotBakery,
  HotProduct,
  OPERATING_STATUS,
  SearchAutoComplete,
} from '@/types/bakery';
import { NotificationSetting } from '@/types/notification';

export const bakeryCardMockData: BakeryCardProps = {
  bakeryId: 1,
  operatingStatus: 'OPEN',
  profileImage: bakery.src,
  name: '라 메종 뒤 팡 에 뒤 레브',
  distance: 1.5,
  size: 'large',
  isBookmarked: false,
};

export const mockNotificationSettings: NotificationSetting[] = Array.from({ length: 30 }, (_, i) => ({
  alertId: i + 1,
  productId: 100 + i + 1,
  productName: `테스트빵 ${i + 1}`,
  productImage: bread.src,
  releaseTime: ['08:00', '13:00', '17:00'].slice(0, (i % 3) + 1),
  bakeryId: 10 + (i % 5),
  bakeryName: `테스트베이커리 ${10 + (i % 5)}`,
  alertActive: i % 2 === 0,
  isBookmarked: false,
}));

export const mockBakeryInfos: Bakery[] = [
  {
    bakeryId: 1,
    name: '맛있는 빵집',
    address: '서울시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    openTime: '09:00-24:00',
    introduction: '최고의 빵을 제공합니다.',
    profileImage: 'default.png',
    additionalImages: ['bakery1.png', 'bakery2.png'],
    operatingStatus: 'OPEN',
    isFavorite: false,
    isBakeryFavorite: false,
    bakeryImages: [],
  },
  {
    bakeryId: 2,
    name: '맛있는 빵집',
    address: '서울시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    openTime: '09:00-21:00',
    introduction: '최고의 빵을 제공합니다.',
    profileImage: 'default.png',
    additionalImages: ['bakery1.png', 'bakery2.png'],
    operatingStatus: 'OPEN',
    isFavorite: false,
    isBakeryFavorite: false,
    bakeryImages: [],
  },
];

export const mockFavoriteBakeries: FavoriteBakery[] = Array.from({ length: 30 }, (_, i) => ({
  bakeryId: i + 1,
  name: `Bakery ${i + 1}`,
  profileImage: bakery.src,
  distance: parseFloat((Math.random() * 10).toFixed(2)), // 0.00 ~ 10.00km
  operatingStatus: (Object.keys(OPERATING_STATUS) as (keyof typeof OPERATING_STATUS)[])[Math.floor(Math.random() * 3)],
  isBakeryActive: Math.random() > 0.2, // 80% 확률로 true
}));

export const mockFavoriteProducts: FavoriteProduct[] = Array.from({ length: 30 }, (_, i) => ({
  productId: i + 1,
  bakeryId: (i % 10) + 1,
  name: `Bread ${i + 1}`,
  image: bread.src,
  price: Math.floor(Math.random() * 5000) + 1000,
  releaseTimes: ['08:00', '12:00', '16:00'].filter(() => Math.random() > 0.5),
  isFavorite: false,
  isBakeryFavorite: false,
  isBakeryActive: false,
  isBreadActive: true,
}));

export const mockHotProducts: HotProduct[] = Array.from({ length: 30 }, (_, i) => ({
  productId: i + 1,
  bakeryId: (i % 10) + 1,
  bakeryName: `인기 빵집 ${i + 1}`,
  productName: `맛있는 빵 ${i + 1}`,
  image: bread.src,
  price: 1000 + i * 100,
  stock: i * 4,
  isFavorite: false,
}));

export const mockHotBakeries: HotBakery[] = Array.from({ length: 20 }, (_, index) => ({
  bakeryId: index + 1,
  bakeryName: `맛있는 빵집 ${index + 1}`,
  profileImage: bakery.src,
  distance: Number((Math.random() * 5).toFixed(1)),
  isFavorite: false,
  operatingStatus: ['OPEN', 'CLOSED', 'TEMPORARY_CLOSED'][
    Math.floor(Math.random() * 3)
  ] as HotBakery['operatingStatus'],
}));

export const mockSearchAutoComplete: SearchAutoComplete[] = [
  { name: '식빵', type: 'PRODUCT' },
  { name: '크림빵', type: 'PRODUCT' },
  { name: '치즈빵', type: 'PRODUCT' },
  { name: '감자빵', type: 'PRODUCT' },
  { name: '호두빵', type: 'PRODUCT' },
  { name: '바나나빵', type: 'PRODUCT' },
  { name: '빵 갤러리', type: 'BAKERY' },
  { name: '서울베이커리', type: 'BAKERY' },
  { name: '단팥빵', type: 'PRODUCT' },
  { name: '우유식빵', type: 'PRODUCT' },
  { name: '바게트', type: 'PRODUCT' },
  { name: '마늘빵', type: 'PRODUCT' },
  { name: '찰보리빵', type: 'PRODUCT' },
  { name: '통밀식빵', type: 'PRODUCT' },
  { name: '제주빵집', type: 'BAKERY' },
  { name: '크로와상', type: 'PRODUCT' },
  { name: '롤케이크', type: 'PRODUCT' },
  { name: '앙버터빵', type: 'PRODUCT' },
  { name: '부산빵지순례', type: 'BAKERY' },
  { name: '우리동네빵집', type: 'BAKERY' },
];
