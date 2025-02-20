import { BakeryCardProps } from '@/components/bakerycard/BakeryCard';
import bakery from '@/assets/images/bakery.png';
import bread from '@/assets/images/bread.png';
import { BreadNotificationSettingCardProps } from '@/components/notifications/breadnotificationsettingcard/BreadNotificationSettingCard';

export const bakeryCardMockData: BakeryCardProps = {
  id: 1,
  operatingStatus: 'OPEN',
  profileImgUrl: bakery,
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
