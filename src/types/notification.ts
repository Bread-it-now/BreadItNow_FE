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
