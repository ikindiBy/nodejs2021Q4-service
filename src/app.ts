import fastify,  { FastifyInstance } from 'fastify';
import boardRoutes from './resources/boards/board.router';
import userRoutes from './resources/users/user.router';
import taskRoutes from './resources/tasks/task.router';

const fastifyServer = fastify({
  logger: true
});

const build = (): FastifyInstance => {
  fastifyServer.register(boardRoutes);
  fastifyServer.register(userRoutes);
  fastifyServer.register(taskRoutes);

  return fastifyServer;
}

export default build;
