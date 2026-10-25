import type { Express, Request, Response } from 'express';
import express from 'express';
import {
  createErrorHandlerMiddleware,
  notFoundMiddleware,
  apiRateLimiter,
  apiThrottler,
  securityMiddleware,
  corsMiddleware,
} from '@/middleware';
import type { LoggerInterface } from '@/logger';
import { Logger } from '@/logger';
import { HTTP_STATUS, HTTP_MESSAGES, ROUTES, SERVER } from '@/utils/constants';

/**
 * Application module - configures Express application, middleware and routes.
 */
export class AppModule {
  private readonly app: Express;
  private readonly logger: LoggerInterface;

  /**
   * Creates application module.
   */
  constructor() {
    this.app = express();
    this.logger = new Logger();
    this.logger.info('Application module initialized successfully');
  }

  /**
   * Initializes Express middleware.
   */
  public initializeMiddlewares(): void {
    this.app.use(securityMiddleware);
    this.app.use(corsMiddleware);
    this.app.use(express.json());
    this.app.use(apiRateLimiter);
    this.app.use(apiThrottler);
  }

  /**
   * Initializes application routes.
   */
  public initializeRoutes(): void {
    this.app.get(ROUTES.health, (_req: Request, res: Response): void => {
      res.status(HTTP_STATUS.ok).json({ status: HTTP_MESSAGES.ok });
    });
  }

  /**
   * Initializes error handling middleware.
   */
  public initializeErrorHandling(): void {
    this.app.use(notFoundMiddleware);
    this.app.use(createErrorHandlerMiddleware(this.logger));
  }

  /**
   * Starts the application server.
   * @param port - Port number (optional, defaults to 3000 or from env).
   */
  public start(port?: number): void {
    const serverPort = port || Number(process.env.PORT) || SERVER.defaultPort;

    this.app.listen(serverPort, () => {
      this.logger.info(`Server running on http://localhost:${serverPort}`, {
        port: serverPort,
      });
    });
  }
}
