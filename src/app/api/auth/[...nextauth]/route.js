import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'select_account', 
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // allow all users for now
      return true;
    },
    async redirect({ url, baseUrl }) {
      // redirect to dashboard after login
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      // Optional: attach token data
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
    callback: '/dashboard', 
  },  
})

export { handler as GET, handler as POST }