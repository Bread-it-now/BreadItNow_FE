import { Notification } from '@/types/notification';
export const notificatinoMockData: Notification[] = [
  {
    notificationId: 100,
    bakeryId: 100,
    productId: 100,
    type: 'ALERT',
    content: '(소금 한 꼬집) 생크림 식빵이 갓 나왔습니다! [잔여 개수 NN개 / 함께 기다리는 사람 NN명]',
    isRead: false,
    createAt: '2025-02-01T12:10:00Z',
  },
  {
    notificationId: 101,
    bakeryId: 101,
    productId: 101,
    type: 'ALERT',
    content: '(소금 한 꼬집) 생크림 식빵이 갓 나왔습니다! [잔여 개수 NN개 / 함께 기다리는 사람 NN명]',
    isRead: true,
    createAt: '2025-02-01T12:10:00Z',
  },
  {
    notificationId: 102,
    bakeryId: 102,
    productId: 102,
    type: 'RESERVATION',
    content:
      '(소금 한 꼬집) 생크림 식빵, 팥빵… 예약이 [완료] 되었습니다.[2025.02.11(화) 오후 07:42 까지 픽업해주세요!]',
    isRead: false,
    createAt: '2025-02-01T12:10:00Z',
  },
  {
    notificationId: 103,
    bakeryId: 103,
    productId: 103,
    type: 'RESERVATION',
    content:
      '(소금 한 꼬집) 생크림 식빵, 팥빵… 예약이 [완료] 되었습니다.[2025.02.11(화) 오후 07:42 까지 픽업해주세요!]',
    isRead: true,
    createAt: '2025-02-01T12:10:00Z',
  },
  {
    notificationId: 104,
    bakeryId: 104,
    productId: 104,
    type: 'RESERVATION',
    content: '(소금 한 꼬집) 생크림 식빵 예약이 [취소] 되었습니다.',
    isRead: false,
    createAt: '2025-02-01T12:10:00Z',
  },
  {
    notificationId: 105,
    bakeryId: 105,
    productId: 105,
    type: 'RESERVATION',
    content: '(소금 한 꼬집) 생크림 식빵, 크루아상… 예약이 [완료/부분완료/취소]되었습니다.',
    isRead: true,
    createAt: '2025-02-01T12:10:00Z',
  },
];
