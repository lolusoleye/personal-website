import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isAdmin = req.auth?.user?.name === process.env.ADMIN_GITHUB_USERNAME
  const isAdminPage = nextUrl.pathname.startsWith('/admin')

  if (isAdminPage) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/api/auth/signin', nextUrl))
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', nextUrl))
    }
  }
  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*']
}

