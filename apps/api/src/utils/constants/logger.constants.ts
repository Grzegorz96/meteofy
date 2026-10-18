/**
 * Logger configuration constants.
 */
export const LOGGER = {
  DEFAULT_LEVEL: 'info',
  LOG_LEVEL_ERROR: 'error',
  MAX_FILE_SIZE: 5242880, // 5MB.
  MAX_FILES: 5,
  TIMESTAMP_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  LOG_FILES: {
    COMBINED: 'combined.log',
    ERROR: 'error.log',
  },
} as const;
