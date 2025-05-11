export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  endpoints: {
    chat: '/api/chat',
  },
} as const; 