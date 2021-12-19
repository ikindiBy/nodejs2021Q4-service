import fastify from 'fastify';
// import userRoutes from './resources/users/user.router';
import boardRoutes from './resources/boards/board.router';

const fastifyServer = fastify({
  logger: true
});

const build = () => {
  fastifyServer.register(boardRoutes);
  // fastifyServer.register(require('./resources/boards/board.router'));

  return fastifyServer;
}

export default build;
