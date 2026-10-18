import { slowDown } from 'express-slow-down';
import { THROTTLER } from '@/utils/constants';

/**
 * API throttler - slows down requests after a certain number.
 * After 50 requests in 15 minutes, delay each request by 500ms.
 * Each additional request adds 500ms delay (up to maxDelayMs).
 */
export const apiThrottler = slowDown({
  windowMs: THROTTLER.WINDOW_MS,
  delayAfter: THROTTLER.API_DELAY_AFTER,
  delayMs: (used) => {
    return (used - THROTTLER.API_DELAY_AFTER) * THROTTLER.API_DELAY_MS;
  },
  maxDelayMs: THROTTLER.API_MAX_DELAY_MS,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
});
