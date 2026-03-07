import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userName: { label: "UserName", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.userName || !credentials?.password) return null;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`, {
          method: 'POST',
          body: JSON.stringify({
            userName: credentials.userName,
            password: credentials.password
          }),
          headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        // Token is at data.data.accessToken, User is at data.data.admin
        const token = data.data?.accessToken;
        const user = data.data?.admin;

        if (res.ok && token) {
          return {
            id: user?._id || user?.id || 'admin-user',
            name: user?.username,
            access_token: token
          };
        }
        throw new Error(data.message || 'Invalid login credentials');
      }
    })
  ],
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 }, // 24 Hours
  pages: { signIn: '/login' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session as any).accessToken = token.accessToken;
        (session as any).user.id = token.id;
      }
      return session;
    }
  }
};
