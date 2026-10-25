/**
 * Rate limiter configuration constants.
 */
export const RATE_LIMITER = {
  windowMs: 15 * 60 * 1000, // 15 minutes.
  apiLimit: 100,
  standardHeaders: 'draft-8',
} as const;
