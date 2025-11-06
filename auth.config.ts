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
    async jwt({ token, profile }) {
      if (profile) {
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
        return isLoggedIn && isAdmin
      }

      return true
    }
  },
} satisfies NextAuthConfig