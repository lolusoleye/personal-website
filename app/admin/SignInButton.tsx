'use client'

import { signIn } from 'next-auth/react'

export default function SignInButton() {
  const handleSignIn = () => {
    signIn('github', { callbackUrl: '/admin' })
  }

  return (
    <div className="admin-container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1>Admin - Sign In</h1>
      <p className="muted" style={{ marginBottom: '2rem' }}>
        You need to sign in with GitHub to create posts.
      </p>
      <button
        onClick={handleSignIn}
        className="btn primary"
        style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
      >
        Sign in with GitHub
      </button>
    </div>
  )
}

