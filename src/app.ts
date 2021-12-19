import fastify from 'fastify';
import boardRoutes from './resources/boards/board.router';
import userRoutes from './resources/users/user.router';

const fastifyServer = fastify({
  logger: true
});

const build = () => {
  fastifyServer.register(boardRoutes);
  fastifyServer.register(userRoutes);

  return fastifyServer;
}

export default build;
