import { CustomerNotification, OwnerNotification } from '@/types/notification';
import { CustomerReservationStatus, OwnerReservationStatus } from '@/types/reservation';
const getRandomTime = (): string => {
  const hour = Math.floor(Math.random() * 12) + 8; // 08~19시
  const minute = Math.floor(Math.random() * 60);
  const date = new Date(Date.UTC(2025, 1, 2, hour, minute)); // 2025-02-02
  return date.toISOString();
};

export const mockCustomerNotifications: CustomerNotification[] = Array.from({ length: 30 }).map((_, i) => {
  const isReservation = Math.random() > 0.5;
  const notificationId = i + 1;
  const bakeryId = (i % 10) + 1;
  const bakeryName = ['파리바게뜨', '뚜레쥬르', '이삭토스트', '김영모과자점', 'Bread & Butter'][i % 5];
  const productName = ['소보로', '크림빵', '앙버터', '마카롱', '바게트'].slice(0, Math.floor(Math.random() * 3) + 1);
  const createdAt = getRandomTime();
  const isRead = Math.random() > 0.5;

  if (isReservation) {
    const statusList: CustomerReservationStatus[] = [
      'WAITING',
      'APPROVED',
      'PARTIAL_APPROVED',
      'PAYMENT_COMPLETED',
      'CANCELED',
    ];
    const reservationStatus = statusList[Math.floor(Math.random() * statusList.length)];

    const baseNotification: CustomerNotification = {
      notificationId,
      type: 'RESERVATION',
      bakeryId,
      bakeryName,
      productName,
      isRead,
      reservationStatus,
      createdAt,
    };

    if (['APPROVED', 'PARTIAL_APPROVED'].includes(reservationStatus)) {
      return {
        ...baseNotification,
        pickupDeadline: getRandomTime(),
      };
    }

    return baseNotification;
  } else {
    return {
      notificationId,
      type: 'ALERT',
      bakeryId,
      bakeryName,
      productName,
      isRead,
      remainingCount: Math.floor(Math.random() * 10) + 1,
      alertCount: Math.floor(Math.random() * 5) + 1,
      createdAt,
    };
  }
});

const ownerStatuses: OwnerReservationStatus[] = [
  'WAITING',
  'APPROVED',
  'PARTIAL_APPROVED',
  'PAYMENT_COMPLETED',
  'OWNER_REJECTED',
  'CUSTOMER_CANCELED',
];

const productNames = ['소보로', '크림빵', '앙버터', '단팥빵', '마카롱', '치즈바게트', '크루아상'];
const nicknames = ['민수', '지영', '태현', '은지', '하준', '서윤', '도윤', '수아', '지원', '현우'];

let currentReservationId = 500;

export const mockOwnerNotifications: OwnerNotification[] = Array.from({ length: 30 }).map((_, i) => {
  const status = ownerStatuses[Math.floor(Math.random() * ownerStatuses.length)];
  const isWaiting = status === 'WAITING';

  const notification: OwnerNotification = {
    notificationId: i + 1,
    nickname: nicknames[i % nicknames.length],
    status,
    isRead: Math.random() > 0.5,
    productsName: productNames.slice(0, Math.floor(Math.random() * 3) + 1),
    createdAt: getRandomTime(),
    ...(isWaiting ? {} : { reservationId: currentReservationId++ }),
  };

  return notification;
});
