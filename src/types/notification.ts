export type NotificationType = 'ALERT' | 'RESERVATION';

export interface Notification {
  notificationId: number;
  bakeryId: number;
  prooductId: number;
  type: NotificationType;
  content: string;
  isRead: boolean;
  creatdAt: string;
}
