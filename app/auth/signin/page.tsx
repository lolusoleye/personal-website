'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function SignIn() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  
  const handleSignIn = async () => {
    try {
      await signIn('github', {
        callbackUrl: 'https://www.iresoleye.me/admin',
        redirect: true,
      })
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Sign In</h1>
      {error && (
        <div style={{ 
          color: 'red', 
          margin: '1rem 0', 
          padding: '0.5rem', 
          background: 'rgba(255,0,0,0.1)' 
        }}>
          Error: {error}
        </div>
      )}
      <button
        onClick={handleSignIn}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Sign in with GitHub
      </button>
    </div>
  )
}