'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Authentication Error</h1>
      <div style={{ 
        padding: '1rem', 
        border: '1px solid #fee2e2', 
        borderRadius: '0.375rem',
        background: '#fef2f2'
      }}>
        <h2 style={{ color: '#991b1b', marginBottom: '0.5rem' }}>Error: {error}</h2>
        {message && <p style={{ marginBottom: '1rem' }}>Message: {message}</p>}
        <pre style={{ 
          background: '#fff', 
          padding: '0.5rem', 
          borderRadius: '0.25rem',
          fontSize: '0.875rem',
          whiteSpace: 'pre-wrap'
        }}>
          {JSON.stringify({ error, message, query: searchParams.toString() }, null, 2)}
        </pre>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Link href="/auth/signin" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          Try signing in again
        </Link>
      </div>
    </div>
  )
}