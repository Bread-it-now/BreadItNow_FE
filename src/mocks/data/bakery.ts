import { BakeryCardProps } from '@/components/bakerycard/BakeryCard';
import bakery from '@/assets/images/bakery.png';
import bread from '@/assets/images/bread.png';
import { BreadNotificationSettingCardProps } from '@/components/notifications/breadnotificationsettingcard/BreadNotificationSettingCard';
import { Bakery } from '@/types/bakery';

export const bakeryCardMockData: BakeryCardProps = {
  bakeryId: 1,
  operatingStatus: 'OPEN',
  profileImage: bakery,
  name: '라 메종 뒤 팡 에 뒤 레브',
  distance: 1.5,
  size: 'large',
};

export const breadNotificationCardMockData: BreadNotificationSettingCardProps[] = [
  {
    id: 1,
    name: '크루아상',
    imgUrl: bread,
    bakeryName: '파리바게뜨',
    releaseTimes: ['07:00', '09:30', '12:00'],
    isNotificationOn: true,
  },
  {
    id: 2,
    name: '크루아상',
    imgUrl: bread,
    bakeryName: '파리바게뜨',
    releaseTimes: ['07:00', '09:30', '12:00'],
    isNotificationOn: false,
  },
  {
    id: 3,
    name: '크루아상',
    imgUrl: bread,
    bakeryName: '파리바게뜨',
    releaseTimes: ['07:00', '09:30', '12:00'],
    isNotificationOn: false,
  },
  {
    id: 4,
    name: '크루아상',
    imgUrl: bread,
    bakeryName: '파리바게뜨',
    releaseTimes: ['07:00', '09:30', '12:00'],
    isNotificationOn: false,
  },
  {
    id: 5,
    name: '크루아상',
    imgUrl: bread,
    bakeryName: '파리바게뜨',
    releaseTimes: ['07:00', '09:30', '12:00'],
    isNotificationOn: false,
  },

  {
    id: 6,
    name: '크루아상',
    imgUrl: bread,
    bakeryName: '파리바게뜨',
    releaseTimes: ['07:00', '09:30', '12:00'],
    isNotificationOn: false,
  },
];

export const mockBakeryInfos: Bakery[] = [
  {
    bakeryId: 1,
    name: '맛있는 빵집',
    address: '서울시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    openTime: '09:00-21:00',
    introduction: '최고의 빵을 제공합니다.',
    profileImage: 'default.png',
    additionalImages: ['bakery1.png', 'bakery2.png'],
    operatingStatus: 'TEMPORARY_CLOSED',
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
