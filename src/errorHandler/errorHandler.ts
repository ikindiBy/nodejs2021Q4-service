import { FastifyInstance } from 'fastify';
import NotFoundError from './NotFoundError';

export const handleErrors = (server: FastifyInstance): void => {
  server.setErrorHandler((error, req, reply) => {
    server.log.error(error);
    if (error instanceof NotFoundError) {
      reply.status(error.statusCode || 404).send(error.message);
    }
  });

  process.on('uncaughtException', () => {
    server.log.error('uncaughtException');
    setTimeout(() => {
      process.exit(1);
    }, 100);
  });

  process.on('unhandledRejection', () => {
    server.log.error('unhandledRejection');
    setTimeout(() => {
      process.exit(1);
    }, 100);
  });
};
