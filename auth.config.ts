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
    }
  },
  pages: {
    signIn: '/api/auth/signin',
  },
} satisfies NextAuthConfig

