import { ENG_DAY } from './date';

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
