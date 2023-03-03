export { default } from 'next-auth/middleware'

export const config = { matcher: [
  '/',
  '/dashboard/:path*',
  '/category/:path*',
  '/user-profile/:path*',
  '/information/:path*',
  '/search/:path*',
  '/create-pin'
] }