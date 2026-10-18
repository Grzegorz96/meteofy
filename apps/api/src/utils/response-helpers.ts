/**
 * Error response structure.
 */
export interface ErrorResponse {
  status: number;
  message: string;
  data: null;
  timestamp: string;
}

/**
 * Creates standardized error response object.
 * @param status - HTTP status code.
 * @param message - Error message.
 * @returns Error response object.
 */
export function createErrorResponse(
  status: number,
  message: string
): ErrorResponse {
  return {
    status,
    message,
    data: null,
    timestamp: new Date().toISOString(),
  };
}
