import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "next-auth";
import { UserRole } from "@prisma/client";

interface CustomUser extends Omit<User, 'role'> {
  accessToken: string;
  role: UserRole;
  organizationId: string;
  organizationName: string;
}

// Function to decode JWT token
function decodeJwtToken(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

export default {
  providers: [
    Credentials({
      id: "custom-api",
      name: "Custom API",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        try {
          if (!credentials?.username || !credentials?.password) {
            console.error("Missing credentials");
            return null;
          }

          const email = credentials.username as string;
          console.log("Attempting login with:", { email });
          
          const requestBody = {
            email,
            password: credentials.password,
          };
          console.log("Request body:", { ...requestBody, password: "[REDACTED]" });
          
          const response = await fetch("https://tunnetcomaiontimeidentityserviceapi20250502153.azurewebsites.net/Login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(requestBody),
          });

          console.log("API Response status:", response.status);
          const data = await response.json();
          console.log("API Response data:", data);

          if (!response.ok) {
            console.error("Login failed:", {
              status: response.status,
              statusText: response.statusText,
              data
            });
            return null;
          }

          if (!data.token) {
            console.error("No token in response:", data);
            return null;
          }

          // Decode the JWT token to get the sub field
          const decodedToken = decodeJwtToken(data.token);
          console.log("Decoded JWT token:", decodedToken);

          // Return the user data with the token
          const user: CustomUser = {
            id: data.userId || email,
            email: email,
            name: data.name || email,
            accessToken: data.token,
            role: (data.role as UserRole) || "USER",
            organizationId: data.organizationId || "1",
            organizationName: decodedToken?.sub || ""
          };

          // Log the user object
          console.log("User object with organization name:", user);

          return user;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.organizationId = user.organizationId;
        token.organizationName = user.organizationName;
      } else if (token) {
        // If we're refreshing the token, decode it to get the sub field
        const decodedToken = decodeJwtToken(token.accessToken as string);
        token.organizationName = decodedToken?.sub || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.role = token.role;
        session.user.organizationId = token.organizationId;
        session.user.organizationName = token.organizationName;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If the user is already authenticated and tries to access the login page,
      // redirect them to the dashboard
      if (url.startsWith(baseUrl) && url.includes("/login")) {
        return `${baseUrl}/dashboard`;
      }
      // For all other cases, allow the default behavior
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  events: {
    async signIn({ user }) {
      console.log("User signed in:", user.email);
    },
  },
} satisfies NextAuthConfig;