export default async (context: any, locale: string) => {
  if (process.env.NODE_ENV !== 'production') {
    return await Promise.resolve(vi)
  }
  return await context.$axios.$get(`/translations/${locale}`)
}

export const vi = {
  VERSION: 'Phiên bản',
  DOCUMENTATION: 'Tài liệu',
  LOGIN: 'Đăng nhập',
  LOGOUT: 'Đăng xuất',
  EMAIL: 'Email',
  PASSWORD: 'Mật khẩu',
  ITEM: 'không có mục nào | 1 mục | {count} mục',
  ERROR: 'Lỗi',
  TOKEN_EXPIRED: 'Mã đã hết hạn',
  UNAUTHORIZED: 'Chưa xác thực'
}
