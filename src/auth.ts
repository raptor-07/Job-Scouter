import NextAuth from "next-auth"
import { db } from "./libs/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(db),
  ...authConfig,
})