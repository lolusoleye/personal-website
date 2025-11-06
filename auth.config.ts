import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'

export default {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.id
        token.login = profile.login
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.login as string
      }
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdmin = auth?.user?.name === process.env.ADMIN_GITHUB_USERNAME
      
      // Allow public access to auth endpoints
      if (nextUrl.pathname.startsWith('/api/auth')) {
        return true
      }

      // Protect admin routes
      if (nextUrl.pathname.startsWith('/admin')) {
        return isLoggedIn && isAdmin
      }

      // Protect API routes
      if (nextUrl.pathname.startsWith('/api/posts') || 
          nextUrl.pathname.startsWith('/api/upload')) {
        return isLoggedIn && isAdmin
      }

      // Allow access to everything else
      return true
    }
  }
} satisfies NextAuthConfig

