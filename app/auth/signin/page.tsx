'use client'

import { signIn } from 'next-auth/react'

export default function SignIn() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Sign In</h1>
      <button
        onClick={() => signIn('github')}
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