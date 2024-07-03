import { Role, UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  first_name: string;
  last_name: string;
  org: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
