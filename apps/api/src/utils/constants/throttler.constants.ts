/**
 * Throttler configuration constants.
 */
export const THROTTLER = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes.
  API_DELAY_AFTER: 50,
  API_DELAY_MS: 500,
  API_MAX_DELAY_MS: 2000,
} as const;
