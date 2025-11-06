import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export default auth((req) => {
  return NextResponse.next()
})

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin',
    '/api/posts/:path*',
    '/api/upload/:path*'
  ]
}

