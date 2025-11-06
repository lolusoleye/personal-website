import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export default auth((req) => {
  try {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const isAdmin = req.auth?.user?.name === process.env.ADMIN_GITHUB_USERNAME

    // Always allow access to auth-related paths
    if (nextUrl.pathname.startsWith('/api/auth')) {
      return NextResponse.next()
    }

    // Check admin access
    if (nextUrl.pathname.startsWith('/admin')) {
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/api/auth/signin', nextUrl))
      }
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/', nextUrl))
      }
    }

    // Allow all other requests
    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    // In case of error, allow the request to proceed
    return NextResponse.next()
  }
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}

