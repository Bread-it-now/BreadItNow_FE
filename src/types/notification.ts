import { ENG_DAY } from './date';
import { CustomerReservationStatus, OwnerReservationStatus } from './reservation';

export type NotificationType = 'ALERT' | 'RESERVATION';

export interface CustomerNotification {
  notificationId: number;
  type: NotificationType;
  bakeryId: number;
  bakeryName: string;
  productName: string[];
  remainingCount?: number;
  alertCount?: number;
  isRead: boolean;
  reservationStatus?: CustomerReservationStatus;
  pickupDeadline?: string;
  createdAt: string;
}

export interface OwnerNotification {
  notificationId: number;
  reservationId: number;
  nickname: string;
  status: OwnerReservationStatus;
  isRead: boolean;
  productsName: string[];
  createdAt: string;
}

export interface NotificationSetting {
  alertId: number;
  productId: number;
  productName: string;
  productImage: string;
  releaseTime: string[];
  bakeryId: number;
  bakeryName: string;
  alertActive: boolean;
}

export interface PageInfo {
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  currPage: number;
}

export interface DoNotDisturb {
  active: boolean;
  days: ENG_DAY[];
  startTime: string;
  endTime: string;
}

export interface DoNotDisturbForm {
  days: ENG_DAY[];
  startTime: string;
  endTime: string;
}
