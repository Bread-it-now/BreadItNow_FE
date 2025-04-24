import { CustomerNotification } from '@/types/notification';
import { CustomerReservationStatus } from '@/types/reservation';
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
