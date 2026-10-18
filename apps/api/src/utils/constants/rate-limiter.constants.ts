/**
 * Rate limiter configuration constants.
 */
export const RATE_LIMITER = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes.
  API_LIMIT: 100,
  STANDARD_HEADERS: 'draft-8',
} as const;
