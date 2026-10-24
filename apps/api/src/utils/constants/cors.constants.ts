/**
 * CORS configuration constants.
 */
export const CORS = {
  allOrigins: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'] as string[],
  allowedHeaders: ['Content-Type', 'Authorization'] as string[],
} as const;
