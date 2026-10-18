import dotenv from 'dotenv';
import { AppModule } from '@/app.module';
import { SERVER } from '@/utils/constants';

dotenv.config();

/**
 * Bootstrap function - creates application, initializes middleware, routes and starts server.
 */
function bootstrap(): void {
  try {
    const appModule = new AppModule();

    appModule.initializeMiddlewares();
    appModule.initializeRoutes();
    appModule.initializeErrorHandling();
    appModule.start();
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(SERVER.EXIT_CODE_ERROR);
  }
}

bootstrap();
