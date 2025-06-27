import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Mock authentication - in real app, validate against database
        if (
          credentials?.email === "admin@hr.com" &&
          credentials?.password === "admin123"
        ) {
          return {
            id: "1",
            email: "admin@hr.com",
            name: "HR Admin",
            role: "admin",
          };
        }
        if (
          credentials?.email === "user@hr.com" &&
          credentials?.password === "user123"
        ) {
          return {
            id: "2",
            email: "user@hr.com",
            name: "HR User",
            role: "user",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
