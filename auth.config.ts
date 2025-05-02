import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import { env } from "@/env.mjs";

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
          access_type: "offline",
        },
      },
    }),
  ],
} satisfies NextAuthConfig;