import { DAY } from '@/lib/shared/date';

export type NotificationType = 'ALERT' | 'RESERVATION';

export interface Notification {
  notificationId: number;
  bakeryId: number;
  productId: number;
  type: NotificationType;
  content: string;
  isRead: boolean;
  createAt: string;
}

// export interface CustomerNotification {
//   notificationId: number;
//   type: NotificationType;
//   bakeryId: number;
//   bakeryName: string;
//   productName: string[];
//   productSize?: number;
//   remainingCount?: number;
//   alertCount?: number;
//   isRead: boolean;
//   createAt: string;
//   reservationStatus: CustomerReservationStatus;
//   pickupDeadline?: string;
// }

export interface NotificationPageInfo {
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  currPage: number;
}

export interface DoNotDisturb {
  active: boolean;
  days: (keyof typeof DAY)[];
  startTime: string;
  endTime: string;
}
