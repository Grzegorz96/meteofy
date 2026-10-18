import cors from 'cors';
import { CORS } from '@/utils/constants';

/**
 * CORS middleware configuration.
 * Configures Cross-Origin Resource Sharing for the application.
 */
export const corsMiddleware = cors({
  origin: CORS.ALL_ORIGINS,
  methods: CORS.METHODS,
  allowedHeaders: CORS.ALLOWED_HEADERS,
});
