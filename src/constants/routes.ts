export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
  },
  SEARCH: "/search",
  NOTIFICATIONS: "/notifications",
  MYPAGE: {
    HOME: "/my",
    SETTINGS: "/my/settings",
    PROFILE: "/my/settings/profile",
    NOTIFICATIONS: "/my/settings/notifications",
  },
} as const;
