export const MODE_THEME: string[] = ['light', 'dark']

export const NAMESPACE = {
  settings: 'settings'
}

export const AUTH_ACCESS_TOKEN_KEY = 'yuu._access_token'
export const AUTH_REFRESH_TOKEN_KEY = 'yuu._refresh_token'
export const COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  secure:
    (process.env.COOKIE_SECURE_FLAG &&
      process.env.COOKIE_SECURE_FLAG.toString() === 'true') ||
    false
}
