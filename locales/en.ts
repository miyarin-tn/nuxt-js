export default async (context: any, locale: string) => {
  if (process.env.NODE_ENV !== 'production') {
    return await Promise.resolve(en)
  }
  return await context.$axios.$get(`/translations/${locale}`)
}

export const en = {
  VERSION: 'Version',
  DOCUMENTATION: 'Documentation',
  LOGIN: 'Login',
  LOGOUT: 'Logout',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  ITEM: 'no item | 1 item | {count} items',
  ERROR: 'Error',
  TOKEN_EXPIRED: 'Token is expired',
  UNAUTHORIZED: 'Unauthorized'
}
