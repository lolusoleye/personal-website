import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'

export default {
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
      const isAdminPage = nextUrl.pathname.startsWith('/admin')
      
      if (isAdminPage) {
        if (isLoggedIn && isAdmin) return true
        return false // Redirect unauthenticated users to login page
      }
      return true
    },
  },
  pages: {
    signIn: '/admin',
  },
} satisfies NextAuthConfig

