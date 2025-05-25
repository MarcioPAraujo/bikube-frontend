export const LOCAL_STORAGE_KEYS = {
  token: '@bikube_token',
  refreshToken: '@bikube_refreshToken',
  user: '@bikube_user',
} as const;

export const SESSION_STORAGE_KEYS = {
  user: '@bikube_user_session',
  token: '@bikube_token_session',
} as const;
