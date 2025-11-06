import { createHash } from 'crypto'

export function createFingerprint(ip: string, userAgent: string, salt: string): string {
  const combined = `${ip}:${userAgent}:${salt}`
  return createHash('sha256').update(combined).digest('hex')
}

export function getClientIP(request: Request): string {
  // Try various headers
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  return 'unknown'
}

