import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // stash the Google‑ID‑token
        token.idToken = account.id_token
      }
      return token
    },
    async session({ session, token }) {
      // expose it to the client
      session.idToken = token.idToken
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }