import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";
import { Role } from "@prisma/client";
import { updateRole } from "./actions/update-curr-user-role";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id);
      if (!existingUser) return false;
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.role = token.role as Role;
        session.user.first_name = token.first_name as string;
        session.user.last_name = token.last_name as string;
        session.user.org = token.org as string;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token, trigger, session }) {
      if (!token.sub) return token;

      if (trigger == "update") {
        await updateRole(token.sub, session.role);
      }
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // token.name = existingUser.username;
      token.email = existingUser.email;
      token.first_name = existingUser.first_name;
      token.last_name = existingUser.last_name;
      token.org = existingUser.organization_name;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
