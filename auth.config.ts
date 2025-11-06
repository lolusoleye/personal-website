import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const authConfig: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github') {
        return true
      }
      return false
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.sub
      }
      return session
    },
  },
  events: {
    async error(error) {
      console.error('NextAuth Error:', error)
    },
    async signIn({ user, account, profile }) {
      console.log('Sign in attempt:', { 
        user: user?.name,
        provider: account?.provider,
        error: account?.error
      })
    }
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdmin = auth?.user?.name === process.env.ADMIN_GITHUB_USERNAME
      const isAdminPage = nextUrl.pathname.startsWith('/admin')

      if (isAdminPage) {
        return isLoggedIn && isAdmin
      }

      return true
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.name = token.sub
      }
      return session
    }
  }
} satisfies NextAuthConfig