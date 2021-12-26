import { FastifyInstance } from 'fastify';
import NotFoundError from './NotFoundError';

export const handleErrors = (server: FastifyInstance): void => {
  server.setErrorHandler((error, req, reply) => {
    server.log.error(error);
    if (error instanceof NotFoundError) {
      reply.status(error.statusCode || 404).send(error.message);
    } else {
      reply.status(500).send(error.message);
      process.exit(1);
    }
  });
};
