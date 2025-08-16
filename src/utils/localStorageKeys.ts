export const LOCAL_STORAGE_KEYS = {
  token: '@bikube_token',
  refreshToken: '@bikube_refreshToken',
  user: '@bikube_user',
  email: '@bikube_email',
} as const;

export const SESSION_STORAGE_KEYS = {
  user: '@bikube_user_session',
  token: '@bikube_token_session',
  email: '@bikube_email_session',
} as const;
