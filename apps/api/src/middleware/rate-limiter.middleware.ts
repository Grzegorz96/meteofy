import { rateLimit } from 'express-rate-limit';
import {
  HTTP_STATUS,
  HTTP_MESSAGES,
  RATE_LIMITER,
  ROUTES,
} from '@/utils/constants';
import { createErrorResponse } from '@/utils/response-helpers';

/**
 * API rate limiter - limits requests per IP.
 * 100 requests per 15 minutes per IP.
 * Returns 429 Too Many Requests when limit is exceeded.
 */
export const apiRateLimiter = rateLimit({
  windowMs: RATE_LIMITER.WINDOW_MS,
  limit: RATE_LIMITER.API_LIMIT,
  standardHeaders: RATE_LIMITER.STANDARD_HEADERS,
  legacyHeaders: false,
  skip: (req) => req.path === ROUTES.HEALTH,
  handler: (_req, res) => {
    const response = createErrorResponse(
      HTTP_STATUS.TOO_MANY_REQUESTS,
      HTTP_MESSAGES.TOO_MANY_REQUESTS
    );
    res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json(response);
  },
});
