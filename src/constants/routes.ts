const OWNER_PREFIX = 'owner';
const MYPAGE_PREFIX = 'mypage';
const BAKERY_PREFIX = 'bakery';

export const ROUTES = {
  HOME: {
    ROOT: '/',
    BREAD_LIST: '/breadlist',
    BAKERY_LIST: '/bakery',
  },
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
  },
  SEARCH: '/search',
  MYPAGE: {
    HOME: `/${MYPAGE_PREFIX}`,
    CHECK_PASSWPRD: `/${MYPAGE_PREFIX}/check-password`,
    PROFILE_SETTING: `/${MYPAGE_PREFIX}/settings/profile`,
    BREAD_NOTIFICATIONS_SETTING: `/${MYPAGE_PREFIX}/settings/bread-notifications`,
    APP_NOTIFICATIONS_SETTING: `/${MYPAGE_PREFIX}/settings/notifications`,
    DO_NOT_DISTURB: `/${MYPAGE_PREFIX}/settings/do-not-disturb`,
    NOTIFICATIONS: `/${MYPAGE_PREFIX}/notifications`,
    RESERVATIONS: `/${MYPAGE_PREFIX}/reservations`,
    RESERVATION_DETAIL: `/${MYPAGE_PREFIX}/reservations/[id]`,
    BOOKMARKS: `/${MYPAGE_PREFIX}/bookmarks`,
  },
  OWNER: {
    HOME: `/${OWNER_PREFIX}`,
    RESERVATIONS: `/${OWNER_PREFIX}/reservations`,
    RESERVATION_DETAIL: `/${OWNER_PREFIX}/reservations/[id]`,
    NOTIFICATIONS: `/${OWNER_PREFIX}/notifications`,
    MANAGE_BAKERY: {
      HOME: `/${OWNER_PREFIX}/${BAKERY_PREFIX}`,
      DELETE_MENU: `/${OWNER_PREFIX}/${BAKERY_PREFIX}/delete-menu`,
      REORDER_MENU: `/${OWNER_PREFIX}/${BAKERY_PREFIX}/reorder-menu`,
      ADD_MENU: `/${OWNER_PREFIX}/${BAKERY_PREFIX}/add-menu`,
      SETTING_HOME: `/${OWNER_PREFIX}/${BAKERY_PREFIX}/settings`,
      EDIT_PROFILE: `/${OWNER_PREFIX}/${BAKERY_PREFIX}/settings/edit-profile`,
    },
  },
} as const;

export const MYPAGE_TITLE: Record<keyof typeof ROUTES.MYPAGE, string> = {
  HOME: '마이페이지',
  CHECK_PASSWPRD: '비밀번호 확인',
  PROFILE_SETTING: '내 정보 수정',
  BREAD_NOTIFICATIONS_SETTING: '빵 알림 설정',
  APP_NOTIFICATIONS_SETTING: '알림 설정',
  DO_NOT_DISTURB: '방해금지 모드',
  NOTIFICATIONS: '알림',
  RESERVATIONS: '예약 내역',
  RESERVATION_DETAIL: '예약 상세',
  BOOKMARKS: '즐겨찾기',
};
