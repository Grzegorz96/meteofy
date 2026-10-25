/**
 * HTTP status codes constants.
 */
export const HTTP_STATUS = {
  ok: 200,
  badRequest: 400,
  notFound: 404,
  tooManyRequests: 429,
  internalServerError: 500,
} as const;

/**
 * HTTP status messages constants.
 */
export const HTTP_MESSAGES = {
  ok: 'ok',
  routeNotFound: 'Route not found',
  validationError: 'Validation error',
  invalidJson: 'Invalid JSON format',
  internalServerError: 'Internal server error',
  tooManyRequests: 'Too many requests from this IP, please try again later',
} as const;
