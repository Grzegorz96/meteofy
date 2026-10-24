import cors from 'cors';
import { CORS } from '@/utils/constants';

/**
 * CORS middleware configuration.
 * Configures Cross-Origin Resource Sharing for the application.
 */
export const corsMiddleware = cors({
  origin: CORS.allOrigins,
  methods: CORS.methods,
  allowedHeaders: CORS.allowedHeaders,
});
