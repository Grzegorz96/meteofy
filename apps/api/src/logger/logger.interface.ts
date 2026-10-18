/**
 * Logger port - defines contract for logging operations.
 */
export interface LoggerInterface {
  /**
   * Logs error message.
   * @param message - Error message.
   * @param error - Error object (optional).
   * @param meta - Additional metadata (optional).
   */
  error(
    message: string,
    error?: Error | unknown,
    meta?: Record<string, unknown>
  ): void;

  /**
   * Logs warning message.
   * @param message - Warning message.
   * @param meta - Additional metadata (optional).
   */
  warn(message: string, meta?: Record<string, unknown>): void;

  /**
   * Logs info message.
   * @param message - Info message.
   * @param meta - Additional metadata (optional).
   */
  info(message: string, meta?: Record<string, unknown>): void;

  /**
   * Logs debug message.
   * @param message - Debug message.
   * @param meta - Additional metadata (optional).
   */
  debug(message: string, meta?: Record<string, unknown>): void;
}
