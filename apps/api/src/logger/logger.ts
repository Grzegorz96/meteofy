import winston from 'winston';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { LoggerInterface } from './logger.interface';
import { LOGGER } from '@/utils/constants';

/**
 * Logger configuration.
 */
interface LoggerConfig {
  level: string;
  enableConsole: boolean;
  enableFile: boolean;
}

/**
 * Logger class - handles application logging.
 * Supports logging to console and file with formatted output.
 */
export class Logger implements LoggerInterface {
  private readonly logger: winston.Logger;
  private readonly config: LoggerConfig;
  private readonly logDir: string;

  constructor(config?: Partial<LoggerConfig>) {
    // ESM-compatible __dirname: src/logger -> apps/api/logs
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    this.logDir = path.resolve(currentDir, '..', '..', 'logs');

    this.config = {
      level: process.env.LOG_LEVEL || LOGGER.defaultLevel,
      enableConsole: process.env.LOG_CONSOLE !== 'false',
      enableFile: process.env.LOG_FILE !== 'false',
      ...config,
    };

    if (this.config.enableFile && !fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }

    this.logger = this.createLogger();
    this.logger.info('Logger initialized successfully');
  }

  /**
   * Creates Winston logger instance with configured transports.
   * @returns Winston logger instance.
   */
  private createLogger(): winston.Logger {
    const transports: winston.transport[] = [];

    if (this.config.enableConsole) {
      transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: LOGGER.timestampFormat }),
            winston.format.printf(({ timestamp, level, message, ...meta }) => {
              const metaString =
                Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
              return `[${String(timestamp)}] ${String(level)}: ${String(message)}${metaString}`;
            })
          ),
        })
      );
    }

    if (this.config.enableFile) {
      transports.push(
        new winston.transports.File({
          filename: path.join(this.logDir, LOGGER.logFiles.combined),
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message, ...meta }) => {
              return JSON.stringify({ timestamp, level, message, ...meta });
            })
          ),
          maxsize: LOGGER.maxFileSize,
          maxFiles: LOGGER.maxFiles,
        })
      );

      transports.push(
        new winston.transports.File({
          filename: path.join(this.logDir, LOGGER.logFiles.error),
          level: LOGGER.logLevelError,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message, ...meta }) => {
              return JSON.stringify({ timestamp, level, message, ...meta });
            })
          ),
          maxsize: LOGGER.maxFileSize,
          maxFiles: LOGGER.maxFiles,
        })
      );
    }

    return winston.createLogger({
      level: this.config.level,
      transports,
      exitOnError: false,
    });
  }

  public error(
    message: string,
    error?: unknown,
    meta?: Record<string, unknown>
  ): void {
    const logData: Record<string, unknown> = { ...meta };

    if (error instanceof Error) {
      logData.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    } else if (error) {
      logData.error = error;
    }

    this.logger.error(message, logData);
  }

  public warn(message: string, meta?: Record<string, unknown>): void {
    this.logger.warn(message, meta);
  }

  public info(message: string, meta?: Record<string, unknown>): void {
    this.logger.info(message, meta);
  }

  public debug(message: string, meta?: Record<string, unknown>): void {
    this.logger.debug(message, meta);
  }
}
