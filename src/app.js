const fastify = require('fastify')({
  logger: true
});

fastify.register(require('./resources/users/user.router'));
fastify.register(require('./resources/boards/board.router'));

module.exports = fastify;
