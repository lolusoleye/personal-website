import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isAdmin = req.auth?.user?.name === process.env.ADMIN_GITHUB_USERNAME
  const isAdminPage = nextUrl.pathname.startsWith('/admin')

  if (isAdminPage && (!isLoggedIn || !isAdmin)) {
    // Allow access to /admin for sign-in, but redirect other admin pages
    if (nextUrl.pathname !== '/admin') {
      return NextResponse.redirect(new URL('/admin', nextUrl))
    }
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}

