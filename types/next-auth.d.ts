import { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = {
  id: string;
  role: UserRole;
  organizationId: string;
  organizationName: string;
  accessToken: string;
} & DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  interface User {
    id: string;
    role: UserRole;
    organizationId: string;
    organizationName: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    organizationId: string;
    organizationName: string;
    accessToken: string;
  }
}
