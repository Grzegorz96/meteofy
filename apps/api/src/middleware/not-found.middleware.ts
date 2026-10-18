import { Request, Response, NextFunction } from 'express';
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
    HTTP_STATUS.NOT_FOUND,
    HTTP_MESSAGES.ROUTE_NOT_FOUND
  );
  res.status(HTTP_STATUS.NOT_FOUND).json(response);
}
