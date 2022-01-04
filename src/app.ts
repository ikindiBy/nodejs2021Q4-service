import fastify,  { FastifyInstance } from 'fastify';
import boardRoutes from './resources/boards/board.router';
import userRoutes from './resources/users/user.router';
import taskRoutes from './resources/tasks/task.router';
import { loggerConfig, logParamsAndBody } from './logsHandler/logger';
import { handleErrors } from './errorHandler/errorHandler';

const fastifyServer = fastify({
  logger: loggerConfig,
});

const build = (): FastifyInstance => {
  logParamsAndBody(fastifyServer);

  fastifyServer.register(boardRoutes);
  fastifyServer.register(userRoutes);
  fastifyServer.register(taskRoutes);

  handleErrors(fastifyServer);

  return fastifyServer;
};

export default build;
