/**
 * Throttler configuration constants.
 * Soft ramp: +100ms per request after delayAfter, capped at 2s.
 */
export const THROTTLER = {
  windowMs: 15 * 60 * 1000, // 15 minutes.
  apiDelayAfter: 50,
  apiDelayMs: 100,
  apiMaxDelayMs: 2000,
} as const;
