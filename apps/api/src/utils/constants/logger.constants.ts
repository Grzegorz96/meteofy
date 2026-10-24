/**
 * Logger configuration constants.
 */
export const LOGGER = {
  defaultLevel: 'info',
  logLevelError: 'error',
  maxFileSize: 5242880, // 5MB.
  maxFiles: 5,
  timestampFormat: 'YYYY-MM-DD HH:mm:ss',
  logFiles: {
    combined: 'combined.log',
    error: 'error.log',
  },
} as const;
