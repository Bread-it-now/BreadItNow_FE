export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
  },
  SEARCH: '/search',
  MYPAGE: {
    HOME: '/mypage',
    PROFILE_SETTING: '/mypage/settings',
    BREAD_NOTIFICATIONS_SETTING: '/mypage/settings/bread-notifications',
    APP_NOTIFICATIONS_SETTING: '/mypage/settings/notifications',
    DO_NOT_DISTURB: '/mypage/settings/do-not-disturb',
    NOTIFICATIONS: '/mypage/notifications',
    RESERVATIONS: '/mypage/reservations',
    RESERVATION_DETAIL: '/mypage/reservations/[id]',
  },
} as const;

export const MYPAGE_TITLE: Record<keyof typeof ROUTES.MYPAGE, string> = {
  HOME: '마이페이지-홈',
  PROFILE_SETTING: '프로필 설정',
  BREAD_NOTIFICATIONS_SETTING: '빵 알림 설정',
  APP_NOTIFICATIONS_SETTING: '알림 설정',
  DO_NOT_DISTURB: '방해금지 모드',
  NOTIFICATIONS: '알림',
  RESERVATIONS: '예약 내역',
  RESERVATION_DETAIL: '예약 상세',
};
