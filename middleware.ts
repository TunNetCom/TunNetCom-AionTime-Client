import NextAuth from "next-auth";
import authConfig from "./auth.config"; // Import the Edge-safe config

// Initialize NextAuth for the middleware using ONLY the edge-safe config
const { auth: middleware } = NextAuth(authConfig);

export { middleware }; // Export the middleware function

// Add your matcher config if needed, for example:
// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

