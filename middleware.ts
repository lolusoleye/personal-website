import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple middleware for logging and basic protection
export async function middleware(request: NextRequest) {
  // Log request details
  console.log('Middleware executing for:', request.nextUrl.pathname)
  
  if (request.nextUrl.pathname === '/admin') {
    // Simple redirect to sign in
    const signInUrl = new URL('/api/auth/signin', request.url)
    console.log('Redirecting to:', signInUrl.toString())
    return NextResponse.redirect(signInUrl)
  }

  console.log('Proceeding with request')
  return NextResponse.next()
}

// Only run on /admin
export const config = {
  matcher: '/admin'
}

