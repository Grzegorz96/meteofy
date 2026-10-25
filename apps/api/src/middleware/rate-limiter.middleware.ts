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
  windowMs: RATE_LIMITER.windowMs,
  limit: RATE_LIMITER.apiLimit,
  standardHeaders: RATE_LIMITER.standardHeaders,
  legacyHeaders: false,
  skip: (req) => req.path === ROUTES.health,
  handler: (_req, res) => {
    const response = createErrorResponse(
      HTTP_STATUS.tooManyRequests,
      HTTP_MESSAGES.tooManyRequests
    );
    res.status(HTTP_STATUS.tooManyRequests).json(response);
  },
});
