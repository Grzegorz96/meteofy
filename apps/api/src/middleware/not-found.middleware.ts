import type { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS, HTTP_MESSAGES } from '@/utils/constants';
import { createErrorResponse } from '@/utils/response-helpers';

/**
 * Not found middleware - handles 404 errors for unmatched routes.
 * Should be placed after all routes but before error handler.
 */
export function notFoundMiddleware(
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const response = createErrorResponse(
    HTTP_STATUS.notFound,
    HTTP_MESSAGES.routeNotFound
  );
  res.status(HTTP_STATUS.notFound).json(response);
}
