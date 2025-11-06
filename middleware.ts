import { NextResponse } from 'next/server'
import { auth } from '@/auth'

// Minimal middleware that only protects admin routes
export default auth((req) => {
  return NextResponse.next()
})

// Only run middleware on admin routes
export const config = {
  matcher: ['/admin/:path*']
}

