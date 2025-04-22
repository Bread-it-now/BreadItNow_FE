import { BakeryCardProps } from '@/components/bakerycard/BakeryCard';
import bakery from '@/assets/images/bakery.png';
import bread from '@/assets/images/bread.png';
import { Bakery, FavoriteBakery, OPERATING_STATUS } from '@/types/bakery';
import { NotificationSetting } from '@/types/notification';

export const bakeryCardMockData: BakeryCardProps = {
  bakeryId: 1,
  operatingStatus: 'OPEN',
  profileImage: bakery,
  name: '라 메종 뒤 팡 에 뒤 레브',
  distance: 1.5,
  size: 'large',
};

export const mockNotificationSettings: NotificationSetting[] = Array.from({ length: 30 }, (_, i) => ({
  alertId: i + 1,
  productId: 100 + i + 1,
  productName: `테스트빵 ${i + 1}`,
  productImage: bread,
  releaseTime: ['08:00', '13:00', '17:00'].slice(0, (i % 3) + 1),
  bakeryId: 10 + (i % 5),
  bakeryName: `테스트베이커리 ${10 + (i % 5)}`,
  alertActive: i % 2 === 0,
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
  },
];

export const mockFavoriteBakeries: FavoriteBakery[] = Array.from({ length: 30 }, (_, i) => ({
  bakeryId: i + 1,
  name: `Bakery ${i + 1}`,
  profileImage: bakery,
  distance: parseFloat((Math.random() * 10).toFixed(2)), // 0.00 ~ 10.00km
  operatingStatus: (Object.keys(OPERATING_STATUS) as (keyof typeof OPERATING_STATUS)[])[Math.floor(Math.random() * 3)],
  isBakeryActive: Math.random() > 0.2, // 80% 확률로 true
}));
