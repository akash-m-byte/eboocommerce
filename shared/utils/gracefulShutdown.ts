import { logger } from './logger';

export function setupGracefulShutdown(server: any, cleanup: () => Promise<void>) {
  const shutdown = async (signal: string) => {
    logger.info({ signal }, 'Shutdown signal received');
    server.close(() => {
      logger.info('HTTP server closed');
    });

    try {
      await cleanup();
      logger.info('Cleanup completed');
      process.exit(0);
    } catch (error) {
      logger.error({ error }, 'Error during cleanup');
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('unhandledRejection', (reason, promise) => {
    logger.error({ reason, promise }, 'Unhandled rejection');
  });

  process.on('uncaughtException', (error) => {
    logger.error({ error }, 'Uncaught exception');
    shutdown('uncaughtException');
  });
}
