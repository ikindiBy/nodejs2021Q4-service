const fastify = require('fastify')({
  logger: true
});

fastify.register(require('./resources/users/user.router'));

module.exports = fastify;
