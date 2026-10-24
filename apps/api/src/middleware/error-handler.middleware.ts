import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import { type LoggerInterface } from '@/logger';
import { HTTP_STATUS, HTTP_MESSAGES } from '@/utils/constants';
import { createErrorResponse } from '@/utils/response-helpers';

/**
 * Creates error handler middleware with logger.
 * @param logger - Logger instance.
 * @returns Express error handler middleware function.
 */
export function createErrorHandlerMiddleware(
  logger: LoggerInterface
): ErrorRequestHandler {
  return (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    if (res.headersSent) {
      logger.error('Response already sent, cannot send error response', err, {
        method: req.method,
        url: req.url,
        ip: req.ip,
      });
      return;
    }

    let status: number;
    let message: string;

    if (err instanceof SyntaxError && 'body' in err) {
      status = HTTP_STATUS.badRequest;
      message = HTTP_MESSAGES.invalidJson;
      logger.warn('JSON parsing error occurred', {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        error: {
          name: err.name,
          message: err.message,
        },
      });
    } else {
      status = HTTP_STATUS.internalServerError;
      message = HTTP_MESSAGES.internalServerError;
      logger.error('Internal server error occurred', err, {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      });
    }

    const response = createErrorResponse(status, message);
    res.status(status).json(response);
  };
}
