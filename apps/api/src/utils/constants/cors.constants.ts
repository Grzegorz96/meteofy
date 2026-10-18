/**
 * CORS configuration constants.
 */
export const CORS = {
  ALL_ORIGINS: '*',
  METHODS: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'] as string[],
  ALLOWED_HEADERS: ['Content-Type', 'Authorization'] as string[],
} as const;
