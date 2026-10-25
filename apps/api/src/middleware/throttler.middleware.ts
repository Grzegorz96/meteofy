import { slowDown } from 'express-slow-down';
import { THROTTLER } from '@/utils/constants';

/**
 * API throttler - slows down requests after a certain number.
 * After 50 requests in 15 minutes, each extra request adds 100ms delay (up to 2s).
 */
export const apiThrottler = slowDown({
  windowMs: THROTTLER.windowMs,
  delayAfter: THROTTLER.apiDelayAfter,
  delayMs: (used) => {
    return (used - THROTTLER.apiDelayAfter) * THROTTLER.apiDelayMs;
  },
  maxDelayMs: THROTTLER.apiMaxDelayMs,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
});
